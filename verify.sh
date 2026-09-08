#!/bin/bash
# Point this at the deployed URL once ZopCloud reports Active.
#   ./verify.sh https://rav-skill-site.zopcloud.zop.dev
H="${1:-http://127.0.0.1:8795}"
pass=0; fail=0
ok(){ printf "  \033[32mok\033[0m   %s\n" "$1"; pass=$((pass+1)); }
no(){ printf "  \033[31mFAIL\033[0m %s\n" "$1"; fail=$((fail+1)); }
code(){ curl -s -o /dev/null -m 25 -w '%{http_code}' "$H$1"; }

echo "▸ routes"
for p in / /healthz /hero.mp4 /hero-poster.jpg; do
  c=$(code "$p"); [ "$c" = "200" ] && ok "$p" || no "$p returned $c"
done
c=$(code /definitely-not-here); [ "$c" = "404" ] && ok "unknown path 404s" || no "unknown path returned $c"
curl -s -m 20 "$H/nope" | grep -q "That page is not here" && ok "custom 404 body" || no "custom 404 body missing"

echo "▸ the build actually shipped"
PAGE=$(curl -s -m 25 "$H/")
for p in $(printf '%s' "$PAGE" | grep -o '/assets/[^"]*' | sort -u); do
  c=$(code "$p"); [ "$c" = "200" ] && ok "$p" || no "$p returned $c"
done
# The page is client-rendered, so the served HTML is a shell. Prove the folds
# shipped by looking inside the bundle rather than the document.
BUNDLE=$(printf '%s' "$PAGE" | grep -o '/assets/[^"]*\.js' | head -1)
JS=$(curl -s -m 30 "$H$BUNDLE")
grep -q '"catches"' <<<"$JS" && ok "fold 2 in the bundle" || no "fold 2 missing from the bundle"
grep -q '"run"'     <<<"$JS" && ok "fold 3 in the bundle" || no "fold 3 missing from the bundle"
grep -q 'sixty-three production tells' <<<"$JS" && ok "hero copy is current" || no "hero copy is stale"

echo "▸ things that quietly rot"
grep -q 'href="#"' <<<"$PAGE" && no "a dead href=# shipped" || ok "no dead links"
grep -qE '—|–' <<<"$PAGE" && no "an em or en dash shipped" || ok "no em dashes"
[ "$(curl -s -m 20 "$H/healthz" | tr -d '[:space:]')" = "ok" ] && ok "healthz body" || no "healthz body wrong"

echo
printf "  %d passed, %d failed\n" "$pass" "$fail"
exit $fail
