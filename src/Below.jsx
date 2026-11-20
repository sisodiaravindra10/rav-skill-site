import { ArrowRight } from "lucide-react";

/* Everything under the hero. The page keeps walking into the night after the
   dusk sky: ink ground, one orange accent, the raven turning up in each part,
   and a single switch to a full orange field at the close. */

const Wrap = ({ id, children, className = "" }) => (
  <section id={id} className={`relative px-6 py-24 md:px-12 md:py-32 lg:px-16 ${className}`}>
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);
const Kicker = ({ children }) => (
  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</p>
);
const H2 = ({ children, className = "" }) => (
  <h2 className={`text-4xl font-medium leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl ${className}`} style={{ textWrap: "balance" }}>{children}</h2>
);
const Px = ({ src, size, className = "" }) => (
  <img src={`/mascot/${src}.svg`} alt="" aria-hidden="true" width={size} height={size} className={`pixel shrink-0 ${className}`} style={{ width: size, height: size }} />
);

/* A band of ordered dither between two flat colours, drawn as an SVG pattern. */
const Dither = ({ from, to, flip = false }) => (
  <svg aria-hidden="true" className="pixel block h-6 w-full" preserveAspectRatio="none" style={{ background: from, transform: flip ? "scaleY(-1)" : undefined }}>
    <defs>
      <pattern id={`d1${flip ? "f" : ""}`} width="24" height="24" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="6" height="6" fill={to} />
        <rect x="12" y="6" width="6" height="6" fill={to} />
        <rect x="0" y="12" width="6" height="6" fill={to} /><rect x="12" y="12" width="6" height="6" fill={to} />
        <rect x="6" y="18" width="6" height="6" fill={to} /><rect x="18" y="18" width="6" height="6" fill={to} /><rect x="0" y="18" width="6" height="6" fill={to} /><rect x="12" y="18" width="6" height="6" fill={to} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#d1${flip ? "f" : ""})`} />
  </svg>
);

/* ── the interview ─────────────────────────────────────────────────── */
const QA = [
  { q: "Before you opened any tool on the last thing you built from nothing, what did you do first?", a: "I start from a feeling. A place or a memory." },
  { q: "When you had three moodboards, what made the losing two lose?", a: "They looked like something I'd seen before." },
];
const PROFILE = [["starts from", "a place or a memory"], ["chooses by", "several moodboards, never one"], ["builds first", "the hero, finished properly"], ["judges by", "stepping away, then the first look"], ["refuses", "stock photos, boring layouts"]];

function Ask() {
  return (
    <Wrap id="ask">
      <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Kicker>/rav setup</Kicker>
          <H2 className="mt-5">It asks before it designs.</H2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            Ten questions, one at a time, about real projects of yours. Where a design starts for you,
            how you choose between directions, what you refuse to ship. Rough answers are fine.
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            The answers become a file on your machine. From then on it is read before anything is built.
          </p>
        </div>

        <div>
          <ol className="space-y-4">
            {QA.map((x) => (
              <li key={x.q} className="space-y-4">
                <div className="flex items-end gap-3">
                  <Px src="raven-tile" size={40} className="rounded-lg" />
                  <p className="max-w-xl rounded-3xl rounded-bl-md border border-white/12 bg-white/[0.04] px-5 py-4 text-base leading-snug text-white md:text-lg">{x.q}</p>
                </div>
                <p className="ml-auto w-fit max-w-md rounded-3xl rounded-br-md bg-[#f6f3ee] px-5 py-4 text-base leading-snug text-ink md:text-lg">{x.a}</p>
              </li>
            ))}
          </ol>

          <div className="relative mt-12 rounded-2xl border border-accent bg-white/[0.03]">
            <Px src="raven-sit-orange" size={56} className="absolute -top-[53px] right-8" />
            <div className="flex items-center justify-between gap-4 border-b border-white/12 px-6 py-4">
              <span className="font-mono text-sm text-accent">profile/process.md</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">outranks the rules</span>
            </div>
            <dl className="px-6 py-2">
              {PROFILE.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-white/10 py-3.5 first:border-t-0">
                  <dt className="font-mono text-xs text-white/45">{k}</dt>
                  <dd className="text-base text-white md:text-lg">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-sm text-white/45">A real profile. These are the answers of the designer who made this.</p>
        </div>
      </div>
    </Wrap>
  );
}

/* ── two layers ────────────────────────────────────────────────────── */
function Layers() {
  const chips = ["SKILL.md", "world", "layouts", "fonts", "voice", "micro", "tells", "verify.mjs"];
  return (
    <Wrap id="layers" className="border-t border-white/10">
      <div className="max-w-3xl">
        <H2>Two layers. Yours wins.</H2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          Rules shared by everyone make pages everyone has seen. So the rules are the floor, and your own process sits on top of them.
        </p>
      </div>
      <div className="mt-16">
        <div className="relative z-10 rounded-2xl border border-accent bg-[#1d130e] p-7 md:w-[64%] md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">Your profile</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">private, written by setup</span>
          </div>
          <p className="mt-3 text-base leading-relaxed text-white/70">Where your designs start, how you choose, what you refuse, your own defaults.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["profile/process.md", "profile/dna.md"].map((c) => <li key={c} className="rounded-md border border-accent/50 px-2.5 py-1 font-mono text-xs text-accent">{c}</li>)}
          </ul>
        </div>
        <div className="mt-4 rounded-2xl border border-white/12 bg-white/[0.03] p-7 md:-mt-10 md:ml-[16%] md:p-10 md:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">The core</h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">shared, the floor</span>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">Three laws, colour, type, layout, imagery, copy, motion, sixteen scoped moves, and a checker that runs.</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map((c) => <li key={c} className="rounded-md border border-white/12 px-2.5 py-1 font-mono text-xs text-white/70">{c}</li>)}
          </ul>
        </div>
      </div>
    </Wrap>
  );
}

/* ── the flight path ───────────────────────────────────────────────── */
const STEPS = [
  ["Reads first", "Opens the project, so it never asks what the folder already answers."],
  ["Asks once", "One short round, at most four questions, each with options."],
  ["Shows directions", "More than one, and cuts any you have seen before."],
  ["Hero, then stops", "Finishes the first screen and waits for your reaction."],
  ["Checks itself", "Runs a script over the result, then a list of AI tells."],
];
function Flight() {
  return (
    <Wrap id="flight" className="border-t border-white/10">
      <H2 className="max-w-3xl">What it does on a new page.</H2>
      <ol className="relative mt-20 grid gap-10 md:grid-cols-5 md:gap-6">
        <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-[2px] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.3)_0_6px,transparent_6px_12px)] md:left-0 md:top-[7px] md:h-[2px] md:w-full md:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.3)_0_6px,transparent_6px_12px)]" />
        {STEPS.map(([t, d], i) => {
          const hot = i === 3;
          return (
            <li key={t} className="relative pl-9 md:pl-0 md:pt-10">
              <span aria-hidden="true" className={`absolute left-0 top-1 block h-4 w-4 md:top-0 ${hot ? "bg-accent" : "bg-white/35"}`} />
              {hot && <Px src="raven-sit-orange" size={52} className="absolute -top-[48px] left-[-18px] hidden md:block" />}
              <h3 className={`text-xl font-medium tracking-tight md:text-2xl ${hot ? "text-accent" : "text-white"}`}>{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60 md:text-base">{d}</p>
            </li>
          );
        })}
      </ol>
    </Wrap>
  );
}

/* ── the proof ─────────────────────────────────────────────────────── */
function Proof({ repo }) {
  const rows = [["look", "cream, serif italics, terracotta", "cobalt field, wide grotesk, one ochre accent"], ["invented prices", "3", "0"], ["invented phone, address, founding year", "all three", "none"]];
  return (
    <Wrap id="proof" className="border-t border-white/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <H2>One prompt, with and without.</H2>
          <p className="mt-5 font-mono text-xs leading-relaxed text-white/50 sm:text-sm">"landing page for Kiln, a small ceramics studio in Jaipur that sells handmade tableware online and runs weekend wheel-throwing classes."</p>
        </div>
        <Px src="raven-fly-up-orange" size={84} className="hidden md:block" />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[["Without the skill", "/kiln-without.png", false, "The page built with no skill: a cream ground, serif italics and a terracotta accent, with prices shown."], ["With rav", "/kiln-with.png", true, "The page built with rav: a cobalt field, a wide grotesk headline and a rendered clay pot on a wheel."]].map(([label, src, hot, alt]) => (
          <figure key={label} className={`overflow-hidden rounded-xl border ${hot ? "border-accent" : "border-white/14"}`}>
            <figcaption className={`border-b border-white/12 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] ${hot ? "text-accent" : "text-white/50"}`}>{label}</figcaption>
            <img src={src} alt={alt} width="1200" height="750" loading="lazy" className="block h-auto w-full" />
          </figure>
        ))}
      </div>

      <div className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label="Comparison of the two pages">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-base">
          <tbody>
            {rows.map(([k, a, b]) => (
              <tr key={k} className="border-t border-white/10">
                <th scope="row" className="w-1/3 py-3.5 pr-4 font-mono text-xs font-normal text-white/45">{k}</th>
                <td className="w-1/3 py-3.5 pr-4 text-white/70">{a}</td>
                <td className="w-1/3 py-3.5 text-white">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/50">
        One run each, same model. Both pages are competent; this shows a narrow, checkable difference, not a verdict.{" "}
        <a href={`${repo}/tree/main/proof/kiln`} className="text-white/80 underline underline-offset-4 hover:text-white">Open both pages in the repo</a>.
      </p>
    </Wrap>
  );
}

/* ── the checker ───────────────────────────────────────────────────── */
function Checker({ caught }) {
  return (
    <Wrap id="catches" className="border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <Kicker>scripts/verify.mjs</Kicker>
          <H2 className="mt-5">It checks its own work.</H2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
            Rules a model reads get broken. Rules a script runs do not. These four came out of one audit of a page that already looked finished.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {caught.map((c) => (
            <li key={c.tell}>
              <p className="font-mono text-6xl leading-none tracking-tight text-accent tabular-nums md:text-7xl">{c.metric}</p>
              <p className="mt-2 font-mono text-xs text-white/45">{c.unit}</p>
              <h3 className="mt-5 text-lg font-medium tracking-tight text-white">{c.tell.charAt(0).toUpperCase() + c.tell.slice(1)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{c.why}</p>
              <div className="mt-4 space-y-1.5 border-l border-white/20 pl-4">
                <code tabIndex={0} className="block overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/45 line-through decoration-white/25">{c.before}</code>
                <code tabIndex={0} className="block overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/90">{c.after}</code>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Wrap>
  );
}

/* ── the moves ─────────────────────────────────────────────────────── */
function Moves({ Explorer }) {
  return (
    <Wrap id="run" className="border-t border-white/10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <H2 className="max-w-2xl">Sixteen verbs, one scope each.</H2>
        <p className="font-mono text-sm text-white/50"><span className="text-accent">$</span> /rav quieter the pricing table</p>
      </div>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">Name the move and it stays inside it. Everything outside what you named is left exactly as it was.</p>
      <div className="mt-14"><Explorer /></div>
    </Wrap>
  );
}

/* ── the close ─────────────────────────────────────────────────────── */
function Close({ Install, repo, madeBy }) {
  return (
    <>
      <Dither from="#0b0b0c" to="#f58549" />
      <section id="get" className="bg-accent px-6 pb-20 pt-16 text-[#140803] md:px-12 md:pb-28 md:pt-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <Px src="raven-sit-inkbone" size={168} className="-mb-2" />
            <p className="text-[7rem] font-semibold leading-[0.8] tracking-[-0.06em] sm:text-[10rem] lg:text-[13rem]">rav</p>
            <p className="pb-3 font-mono text-sm leading-relaxed md:text-base">as in raven.<br />as in Ravindra.</p>
          </div>
          <h2 className="mt-12 max-w-4xl text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">A design skill that learns your taste.</h2>
          <div className="mt-10 flex flex-col items-start gap-5 lg:flex-row lg:items-center">
            <div className="max-w-full rounded-xl bg-[#0b0b0c] px-4 py-2"><Install /></div>
            <a href={repo} className="inline-flex min-h-[44px] items-center gap-2 text-base font-medium underline-offset-4 hover:underline">
              Read it on GitHub <ArrowRight size={18} />
            </a>
          </div>
          <p className="mt-6 font-mono text-sm">Then, in Claude Code: <span className="font-medium">/rav setup</span></p>

          <div className="mt-16 flex flex-col gap-3 border-t-2 border-[#140803] pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium">Made by Ravindra Sisodia, a product designer in Jodhpur.</span>
            <span className="flex flex-wrap gap-x-6">
              {madeBy.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center font-medium underline underline-offset-4 hover:no-underline">{l.label}</a>
              ))}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Below({ Explorer, Install, caught, repo, madeBy, version }) {
  return (
    <>
      <Ask />
      <Layers />
      <Flight />
      <Proof repo={repo} />
      <Checker caught={caught} />
      <Moves Explorer={Explorer} />
      <Close Install={Install} repo={repo} madeBy={madeBy} />
      <footer className="bg-ink px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-3"><Px src="raven-sit-orange" size={20} />rav v{version} . open source, MIT</span>
          <span>Built with the skill it documents.</span>
        </div>
      </footer>
    </>
  );
}
