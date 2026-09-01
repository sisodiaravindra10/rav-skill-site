import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Menu, X } from "lucide-react";

const REPO = "https://github.com/sisodiaravindra10/rav-skill";

const NAV = [
  { label: "Evidence", href: "#catches" },
  { label: "Moves", href: "#run" },
  { label: "Reference", href: `${REPO}/tree/main/reference` },
];

const INSTALL = "git clone https://github.com/sisodiaravindra10/rav-skill ~/.claude/skills/rav";

// Every pair below is a real edit from one audit in this repo's history, quoted
// from the diff. Nothing here is illustrative.
const CAUGHT = [
  {
    tell: "reveal gate with no fallback",
    why: "Content hidden by CSS and revealed only by a CDN script. If the CDN fails, the page is blank.",
    before: ".fade { opacity: 0 }",
    after: "visible by default, reveal opt-in, 4s watchdog",
    metric: "46",
    unit: "elements at risk",
  },
  {
    tell: "text under the contrast floor",
    why: "Secondary ink picked by eye. Measured against the real ground, it failed AA.",
    before: "--ink-deep: #555      2.82:1",
    after: "--ink-deep: #7a7a7a   4.75:1",
    metric: "17",
    unit: "usages, one token",
  },
  {
    tell: "enumerated section label",
    why: "Its position on the page already says which section this is. The number is decoration.",
    before: 'sec__no > "section 01 / context"',
    after: 'sec__no > "context"',
    metric: "6",
    unit: "labels cut",
  },
  {
    tell: "invented evidence",
    why: "Figures with no source, on a page whose whole argument was evidentiary honesty.",
    before: "4,217 cases . 318h footage . 372 avoided",
    after: "removed, illustrative data labelled as such",
    metric: "6",
    unit: "metrics with no source",
  },
];

// The skill's actual interface: sixteen scoped verbs, grouped by what they do.
const MOVES = [
  {
    group: "refine",
    items: [
      ["polish", "final pass before shipping"],
      ["bolder", "raise a section to the conviction the rest implies"],
      ["quieter", "reduce intensity, keep the point of view"],
      ["distill", "strip what does not earn its place"],
      ["harden", "long text, i18n, RTL, errors, offline"],
      ["onboard", "first run, empty states, activation"],
    ],
  },
  {
    group: "enhance",
    items: [
      ["animate", "motion with a stated thesis"],
      ["colorize", "colour as hierarchy and meaning"],
      ["typeset", "hierarchy, scale, measure, delivery"],
      ["layout", "structure, grouping, rhythm, density"],
      ["delight", "one earned moment of character"],
      ["overdrive", "past conventional limits, on your pick"],
    ],
  },
  {
    group: "fix",
    items: [
      ["clarify", "UX copy, labels, errors"],
      ["adapt", "one device or breakpoint class"],
      ["optimize", "diagnose and fix UI performance"],
    ],
  },
  {
    group: "evaluate",
    items: [["review-motion", "critique motion that already ships"]],
  },
];

function Nav({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
      <div className="flex items-center gap-10">
        <a
          href="#top"
          className="flex min-h-[44px] items-center gap-2.5 text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          rav
          <span aria-hidden="true" className="block h-2.5 w-2.5 bg-accent" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="flex min-h-[44px] items-center text-sm text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <a
        href={REPO}
        className="hidden min-h-[44px] items-center rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex"
      >
        Get the skill
      </a>

      <button
        type="button"
        onClick={() => setMobileMenuOpen((o) => !o)}
        aria-expanded={mobileMenuOpen}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        className="relative z-50 flex h-10 w-10 items-center justify-center transition-transform before:absolute before:-inset-0.5 before:content-[''] active:scale-90 md:hidden"
      >
        <Menu
          size={22}
          className={`absolute text-white transition-all duration-300 ${
            mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <X
          size={22}
          className={`absolute text-white transition-all duration-300 ${
            mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
          }`}
        />
      </button>
    </nav>
  );
}

function InstallLine() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-lg border border-white/15 bg-black/50 py-2 pl-4 pr-2 sm:w-auto">
      <code
        tabIndex={0}
        role="region"
        aria-label="Install command"
        className="overflow-x-auto whitespace-nowrap rounded-sm font-mono text-xs text-white/80 sm:text-sm"
      >
        {INSTALL}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Install command copied" : "Copy install command"}
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white/60 transition-colors before:absolute before:-inset-1 before:content-[''] hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <div id="top" className="w-full bg-ink font-geist">
      {/* Fold 1: the film */}
      <section className="h-viewport relative w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover [object-position:70%_center]"
          src="/hero.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* One scrim, angled off the side the type sits on and tinted to the water
            rather than flat black. Its stops are lengths, not percentages, so the
            dark zone tracks the text column instead of the viewport. Measured
            across all 11 sampled frames of the loop, nothing drops below AA. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,16,0.86)_0%,rgba(4,10,16,0.74)_45%,rgba(4,10,16,0.80)_100%)] md:bg-[linear-gradient(100deg,rgba(4,10,16,0.93)_0px,rgba(4,10,16,0.87)_520px,rgba(4,10,16,0.64)_860px,rgba(4,10,16,0.10)_1400px)]"
        />

        <Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        <div
          {...(mobileMenuOpen ? {} : { inert: "" })}
          className={`fixed inset-0 z-20 overflow-hidden bg-black/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className={`flex h-full flex-col justify-center px-8 transition-all delay-100 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[56px] items-center text-3xl font-medium text-white/90 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={REPO}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-6 inline-flex min-h-[52px] items-center justify-center self-start rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform hover:scale-105"
            >
              Get the skill
            </a>
          </div>
        </div>

        <main
          {...(mobileMenuOpen ? { inert: "" } : {})}
          className="h-viewport-below-nav relative z-10 flex flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
          <div className="max-w-3xl">
            <p className="hero-reveal mb-4 animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs text-white/90 sm:mb-6 sm:text-sm">
              A personal design skill for Claude Code
            </p>
            <h1 className="hero-reveal animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Catches the defaults
              <br />
              you were about
              <br />
              to ship.
            </h1>
          </div>

          <div>
            <p className="hero-reveal mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
              Three registers, sixteen scoped moves, and sixty-one production tells that
              run as the last filter before anything ships.
            </p>
            <a
              href="#catches"
              className="hero-reveal inline-flex min-h-[44px] animate-[fadeSlideUp_0.8s_ease_0.9s_both] items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3"
            >
              See what it caught
              <ArrowRight size={16} />
            </a>
          </div>
        </main>
      </section>

      {/* Fold 2: proof, not assertion. Each row is the tell, then the line that
          shipped, then the line that replaced it. */}
      <section
        id="catches"
        className="scroll-mt-4 border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl">
              One audit, four defects,
              <br />
              quoted from the diff.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
              Run against a finished landing page that looked done. Every line below is
              the real before and the real after.
            </p>
          </div>

          <div className="mt-12 border-t border-white/10 md:mt-16">
            {CAUGHT.map((c) => (
              <article
                key={c.tell}
                className="grid gap-x-10 gap-y-5 border-b border-white/10 py-8 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:py-10"
              >
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                    {c.tell}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{c.why}</p>
                  <p className="mt-3 font-mono text-xs text-white/45">
                    <span className="tabular-nums text-white/75">{c.metric}</span> {c.unit}
                  </p>
                </div>

                <div className="min-w-0 space-y-2.5">
                  <div className="flex min-w-0 gap-3 border-l border-white/25 pl-4">
                    <span className="shrink-0 select-none font-mono text-xs leading-6 text-white/35">
                      was
                    </span>
                    <code className="min-w-0 overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/50 line-through decoration-white/25 sm:text-[13px]">
                      {c.before}
                    </code>
                  </div>
                  <div className="flex min-w-0 gap-3 border-l border-accent pl-4">
                    <span className="shrink-0 select-none font-mono text-xs leading-6 text-accent/70">
                      now
                    </span>
                    <code className="min-w-0 overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/90 sm:text-[13px]">
                      {c.after}
                    </code>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fold 3: the interface you actually type, then the door out. */}
      <section
        id="run"
        className="scroll-mt-4 border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium leading-[1.15] tracking-tight text-white sm:text-3xl md:text-4xl">
              Sixteen verbs,
              <br />
              one scope each.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
              Name the move and it stays inside it. Everything outside what you named is
              left exactly as it was.
            </p>
          </div>

          <p className="mt-8 font-mono text-xs text-white/45 sm:text-sm">
            <span className="text-accent">$</span> /rav quieter the pricing table
          </p>

          <div className="mt-12 grid gap-x-10 gap-y-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {MOVES.map((g) => (
              <div key={g.group}>
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-white/45">
                  {g.group}
                </h3>
                <dl className="mt-5 space-y-4">
                  {g.items.map(([verb, gloss]) => (
                    <div key={verb}>
                      <dt className="font-mono text-sm text-accent">{verb}</dt>
                      <dd className="mt-1 text-sm leading-snug text-white/60">{gloss}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <InstallLine />
            <a
              href={REPO}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              Read the skill on GitHub
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <span>rav v2.0.0 . a personal design skill</span>
          <span>Built with the skill it documents.</span>
        </div>
      </footer>
    </div>
  );
}
