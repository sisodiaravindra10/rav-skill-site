# Deploying the rav skill site on ZopCloud

A Vite/React site built into a static nginx container. ZopCloud builds the
`Dockerfile` in this repo and runs it, on a Kubernetes cluster or a plain Linux VM.

The image is already built and verified locally: every route, the custom 404, the
health endpoint, the fingerprinted assets and the video all return correctly from
the container, not just from the dev server.

## Blocked on one thing

ZopCloud builds from a connected git repository. This directory is not a repo yet,
so the console has nothing to point at. Create it, push, then follow the steps below.

```bash
cd ~/rav/sites/rav-skill
git init && git add -A && git commit -m "rav skill site v2.0.0"
gh repo create sisodiaravindra10/rav-skill-site --public --source=. --push
```

The site's own links (nav, both CTAs, the install line) point at
`github.com/sisodiaravindra10/rav-skill`, which is the **skill** repo, a separate one.
Those links 404 until that repo exists too.

## What the platform owner connects first (one-time, org level)

ZopCloud is a control plane over your own infrastructure. Before any deploy the
workspace needs one of:

- a connected cloud account plus a registered Kubernetes cluster, or
- a plain Linux VM target (ZopCloud installs Docker and Caddy onto it itself).

The VM route is the cheaper one for a single static site.

## Steps in the console

1. Sign in at <https://zop.dev/signin>.
2. **Projects, New project**, name it `rav-skill-site`.
3. **New environment**, pick the cluster or VM target and a namespace.
4. **Add deployment**, repository `https://github.com/sisodiaravindra10/rav-skill-site`, branch `main`.
5. It detects the `Dockerfile` and builds. If it asks for service settings:
   - **Container port:** `8080` (the image also honours an injected `$PORT`)
   - **Health check path:** `/healthz`, returns `200 ok`
6. **Deploy**, then watch the pipeline through to **Active**.
7. Open the environment's access URL. Without a hostname it derives one under the
   space's domain, in the shape `https://rav-skill-site.zopcloud.zop.dev`.
8. Run `./verify.sh <url>` against it.

## After it is live

Point these at the real hostname, then redeploy:

- `index.html` — `og:image` is currently the relative `/hero-poster.jpg`. Most link-preview
  scrapers require an absolute URL, so social cards stay blank until this is
  `https://<host>/hero-poster.jpg`.
- `verify.sh` — run it against the deployed URL, not localhost.

## Container facts

| Setting | Value |
|---|---|
| Build | `node:20-alpine`, `npm ci` then `vite build` |
| Runtime | `nginx:1.27-alpine` |
| Image size | 77.7MB |
| Listen port | `8080` (override with `PORT`) |
| Health endpoint | `/healthz`, returns `200 ok` |
| Custom 404 | yes, unknown paths 404 rather than falling back to the homepage |
| Asset caching | `/assets/*` immutable for a year, video 30 days, html no-cache |

## Running it locally

```bash
docker build -t rav-skill-site:2.0.0 .
docker run --rm -p 8795:8080 rav-skill-site:2.0.0
```
