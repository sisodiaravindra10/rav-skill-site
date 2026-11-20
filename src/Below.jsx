import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Scene from "./Pixel.jsx";

/* Everything under the hero. The page keeps walking into the night after the
   dusk sky: ink ground, one orange accent, the raven turning up in each part,
   and a single switch to a full orange field at the close. */

const Wrap = ({ id, children, className = "" }) => (
  <section id={id} className={`relative scroll-mt-16 px-6 py-24 md:px-12 md:py-32 lg:px-16 ${className}`}>
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
  <img src={`/mascot/${src}.svg`} alt="" aria-hidden="true" draggable={false} width={size} height={size} className={`pixel pointer-events-none shrink-0 ${className}`} style={{ width: size, height: size }} />
);

/* A typed line in a quiet frame: the way every section shows what you would type. */
const Cmd = ({ children, sign = "$", className = "" }) => (
  <p className={`w-fit max-w-full overflow-x-auto whitespace-nowrap rounded-xl border border-white/[0.12] bg-white/[0.03] px-5 py-3.5 font-mono text-xs text-white/75 sm:text-sm ${className}`} tabIndex={0}>
    <span className="mr-2 text-accent">{sign}</span>{children}
  </p>
);
/* One large orange figure with its unit, as in the proof and the checker. */
const Figure = ({ n, label, note }) => (
  <div>
    <p className="font-pixel text-7xl leading-none text-accent tabular-nums md:text-8xl">{n}</p>
    <p className="mt-3 text-base font-medium text-white">{label}</p>
    {note && <p className="mt-1 text-sm text-white/55">{note}</p>}
  </div>
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
          <div className="mt-10 grid max-w-md grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <Figure n="10" label="questions" note="one at a time" />
            <Figure n="1" label="file" note="on your machine, never uploaded" />
          </div>
        </div>

        <div>
          <ol className="space-y-4">
            {QA.map((x) => (
              <li key={x.q} className="space-y-4">
                <div className="flex items-end gap-3">
                  <Px src="raven-tile" size={40} className="rounded-lg" />
                  <p className="max-w-xl rounded-3xl rounded-bl-md border border-white/[0.12] bg-white/[0.04] px-5 py-4 text-base leading-snug text-white md:text-lg">{x.q}</p>
                </div>
                <p className="ml-auto w-fit max-w-md rounded-3xl rounded-br-md bg-[#f6f3ee] px-5 py-4 text-base leading-snug text-ink md:text-lg">{x.a}</p>
              </li>
            ))}
          </ol>

          <div className="relative mt-12 rounded-2xl border border-accent bg-white/[0.03]">
            <Px src="raven-sit-orange" size={56} className="absolute -top-[53px] right-8" />
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.12] px-6 py-4">
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
      <Scene kind="moon" px={5} className="pointer-events-none absolute right-6 top-10 hidden h-40 w-40 md:block lg:right-16" />
      <div className="max-w-3xl">
        <Kicker>profile/ over reference/</Kicker>
        <H2 className="mt-5">Two layers. Yours wins.</H2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
          Rules shared by everyone make pages everyone has seen. So the rules are the floor, and your own process sits on top of them.
        </p>
      </div>
      <div className="mt-16 grid gap-6 lg:grid-cols-[5fr_7fr] lg:gap-10">
        <div className="relative overflow-hidden rounded-xl border border-white/[0.14]">
          <Scene kind="strata" className="h-72 w-full lg:h-full lg:min-h-[26rem]" />
          <span className="absolute left-4 top-[34%] rounded bg-[#0b0b0c]/85 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">your profile</span>
          <span className="absolute left-4 top-[70%] rounded bg-[#0b0b0c]/85 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">the core</span>
        </div>
        <div className="mt-12 flex flex-col gap-4 lg:mt-0">
          <div className="relative rounded-2xl border border-accent bg-[#1d130e] p-7 md:p-9">
            <Px src="raven-sit-orange" size={56} className="absolute -top-[53px] right-10" />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">Your profile</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">private, written by setup</span>
            </div>
            <p className="mt-3 text-base leading-relaxed text-white/70">Where your designs start, how you choose, what you refuse, your own defaults. It sits on top, and it is the part people see.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {["profile/process.md", "profile/dna.md"].map((c) => <li key={c} className="rounded-md border border-accent/50 px-2.5 py-1 font-mono text-xs text-accent">{c}</li>)}
            </ul>
          </div>
          <div className="flex-1 rounded-2xl border border-white/[0.12] bg-[#0b0b0c]/70 p-7 md:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">The core</h3>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">shared, the floor</span>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/60">Three laws, colour, type, layout, imagery, copy, motion, sixteen scoped moves, and a checker that runs. The bedrock everything stands on.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => <li key={c} className="rounded-md border border-white/[0.12] px-2.5 py-1 font-mono text-xs text-white/70">{c}</li>)}
            </ul>
          </div>
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
      <Kicker>a new build</Kicker>
      <H2 className="mt-5 max-w-3xl">What it does on a new page.</H2>
      <div className="relative mt-12 overflow-hidden rounded-xl border border-white/[0.14]">
        <Scene kind="flight" className="h-44 w-full sm:h-56 md:h-64" />
        <Px src="raven-fly-orange" size={64} className="absolute left-[70%] top-[10%] -translate-x-[10%]" />
      </div>
      <ol className="mt-8 grid gap-8 md:grid-cols-5 md:gap-0">
        {STEPS.map(([t, d], i) => {
          const hot = i === 3;
          return (
            <li key={t} className={`border-l-2 pl-5 md:border-l-0 md:border-t-2 md:px-4 md:pt-5 md:text-center ${hot ? "border-accent" : "border-white/15"}`}>
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
/* One frame, two pages. The divider wipes between them and the raven rides it. */
function Compare() {
  const [split, setSplit] = useState(50);
  const pane = useRef(null), dragging = useRef(false);
  const set = (x) => { const r = pane.current.getBoundingClientRect(); setSplit(Math.min(96, Math.max(4, ((x - r.left) / r.width) * 100))); };
  return (
    <div
      ref={pane}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-xl border border-white/[0.14] bg-black"
      onPointerDown={(e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); set(e.clientX); }}
      onPointerMove={(e) => dragging.current && set(e.clientX)}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
      onDragStart={(e) => e.preventDefault()}
    >
      <img src="/kiln-with.png" alt="The page built with rav: a cobalt field, a wide grotesk headline and a rendered clay pot on a wheel." width="1200" height="750" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <img src="/kiln-without.png" alt="The page built with no skill: a cream ground, serif italics and a terracotta accent, with prices shown." width="1200" height="750" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }} />

      <span className="pointer-events-none absolute left-2 top-2 rounded bg-[#0b0b0c]/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 sm:left-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[11px]">Without</span>
      <span className="pointer-events-none absolute right-2 top-2 rounded bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#140803] sm:right-3 sm:top-3 sm:px-2.5 sm:py-1.5 sm:text-[11px]">With rav</span>

      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-accent" style={{ left: `${split}%` }} />
      <div
        role="slider" tabIndex={0} aria-label="Slide between the page without the skill and the page with rav"
        aria-valuemin={4} aria-valuemax={96} aria-valuenow={Math.round(split)}
        onKeyDown={(e) => { const d = e.key === "ArrowRight" ? 4 : e.key === "ArrowLeft" ? -4 : 0; if (!d) return; e.preventDefault(); setSplit((v) => Math.min(96, Math.max(4, v + d))); }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.86] cursor-ew-resize rounded-lg shadow-[0_0_0_4px_rgba(11,11,12,0.75)] focus-visible:outline-offset-4 sm:scale-100"
        style={{ left: `${split}%` }}
      >
        <Px src="raven-tile" size={52} className="rounded-lg" />
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded bg-[#0b0b0c]/85 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 sm:block">drag the raven</span>
    </div>
  );
}

function Proof({ repo }) {
  const tally = [
    ["3", "0", "Invented prices"],
    ["3", "0", "Invented contact facts", "a phone number, a street address, a founding year"],
  ];
  return (
    <Wrap id="proof" className="border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-end lg:gap-20">
        <div>
          <Kicker>proof/kiln</Kicker>
          <H2 className="mt-5">One prompt, with and without.</H2>
        </div>
        <p className="rounded-xl border border-white/[0.12] bg-white/[0.03] px-5 py-4 font-mono text-xs leading-relaxed text-white/75 sm:text-sm">
          <span className="text-accent">&gt;</span> landing page for Kiln, a small ceramics studio in Jaipur that sells handmade tableware online and runs weekend wheel-throwing classes.
        </p>
      </div>

      <div className="mt-12"><Compare /></div>

      {/* What differs, read straight across: the fact, then each page's answer
          under the same two labels the panel above uses. */}
      <div className="mt-12" role="table" aria-label="What differs between the two pages">
        <div role="row" className="hidden grid-cols-[1.3fr_1fr_1fr] gap-6 pb-3 sm:grid">
          <span role="columnheader" aria-label="What was counted" />
          <span role="columnheader"><span className="rounded bg-white/10 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">Without the skill</span></span>
          <span role="columnheader"><span className="rounded bg-accent px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#140803]">With rav</span></span>
        </div>
        {tally.map(([a, b, label, note]) => (
          <div key={label} role="row" className="grid grid-cols-2 items-center gap-x-6 gap-y-3 border-t border-white/[0.12] py-6 sm:grid-cols-[1.3fr_1fr_1fr]">
            <div role="rowheader" className="col-span-2 sm:col-span-1">
              <p className="text-lg font-medium text-white md:text-xl">{label}</p>
              {note && <p className="mt-1 text-sm text-white/55">{note}</p>}
            </div>
            <div role="cell">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 sm:hidden">Without the skill</p>
              <p className="font-pixel text-6xl leading-none text-white/70 tabular-nums md:text-7xl">{a}</p>
            </div>
            <div role="cell">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:hidden">With rav</p>
              <p className="font-pixel text-6xl leading-none text-accent tabular-nums md:text-7xl">{b}</p>
            </div>
          </div>
        ))}
        <div role="row" className="grid grid-cols-2 items-start gap-x-6 gap-y-3 border-y border-white/[0.12] py-6 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div role="rowheader" className="col-span-2 sm:col-span-1"><p className="text-lg font-medium text-white md:text-xl">The look</p></div>
          <div role="cell">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50 sm:hidden">Without the skill</p>
            <p className="text-base leading-snug text-white/70 md:text-lg">Cream, serif italics, terracotta</p>
          </div>
          <div role="cell">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent sm:hidden">With rav</p>
            <p className="text-base font-medium leading-snug text-white md:text-lg">A cobalt field, a wide grotesk, one ochre accent</p>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/50">
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
          <Cmd className="mt-8">node scripts/verify.mjs --source src/</Cmd>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {caught.map((c) => (
            <li key={c.tell}>
              <p className="font-pixel text-7xl leading-none text-accent tabular-nums md:text-8xl">{c.metric}</p>
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
        <div>
          <Kicker>/rav &lt;move&gt;</Kicker>
          <H2 className="mt-5 max-w-2xl">Sixteen verbs, one scope each.</H2>
        </div>
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
      <Scene kind="dawn" className="h-44 w-full sm:h-56 md:h-72" />
      <section id="get" className="scroll-mt-16 bg-accent px-6 pb-20 pt-16 text-[#140803] md:px-12 md:pb-28 md:pt-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
            <Px src="raven-sit-inkbone" size={168} className="-mb-2" />
            <p className="text-[7rem] font-semibold leading-[0.8] tracking-[-0.06em] sm:text-[10rem] lg:text-[13rem]">rav</p>
            <p className="pb-3 font-mono text-sm leading-relaxed md:text-base">as in raven.<br />as in Ravindra.</p>
          </div>
          <h2 className="mt-12 max-w-4xl text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">A design skill that learns your taste.</h2>
          <div className="mt-10 flex flex-col items-start gap-5 lg:flex-row lg:items-center">
            <Install plain />
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
      <div className="relative">
        <Scene kind="night" px={3} className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="relative">
          <Ask />
          <Layers />
          <Flight />
          <Proof repo={repo} />
          <Checker caught={caught} />
          <Moves Explorer={Explorer} />
        </div>
      </div>
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
