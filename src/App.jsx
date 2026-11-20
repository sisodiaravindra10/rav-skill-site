import DuskSky from "./DuskSky.jsx";
import HeroRaven from "./HeroRaven.jsx";
import Below from "./Below.jsx";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Menu, X } from "lucide-react";
import { SPECIMENS } from "./specimens.jsx";

const REPO = "https://github.com/sisodiaravindra10/rav-skill";

const NAV = [
  { label: "Setup", href: "#ask" },
  { label: "Proof", href: "#proof" },
  { label: "Moves", href: "#run" },
];

const INSTALL = "git clone https://github.com/sisodiaravindra10/rav-skill ~/.claude/skills/rav";

const MADE_BY = [
  { label: "Portfolio", href: "https://ravindra-siso.vercel.app/" },
  { label: "Dribbble", href: "https://dribbble.com/sisodiaravindra" },
  { label: "Behance", href: "https://www.behance.net/ravindrasisodia" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ravindra-sisodia/" },
];


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
    before: 'sec__no > "section 01 / context"', // rav-verify-ignore quoted as evidence
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

// The skill's actual interface. Each pair is a short illustrative example of the
// transformation, not a claim about any product. `optimize` uses this page's own
// real numbers.
const MOVES = [
  { verb: "polish", group: "refine", gloss: "final pass before shipping",
    combines: ["harden", "clarify"],
    before: "button: default", after: "button: default, hover, focus, active, disabled, loading, error",
    caption: "Half a component becomes a whole one" },
  { verb: "bolder", group: "refine", gloss: "raise a section to the conviction the rest implies",
    combines: ["typeset", "layout"],
    before: "text-2xl font-normal text-white/70", after: "text-6xl font-medium tracking-tight text-white",
    caption: "One section rises to meet its neighbours" },
  { verb: "quieter", group: "refine", gloss: "reduce intensity, keep the point of view",
    combines: ["colorize", "distill"],
    before: "bg-red-500 text-white shadow-xl animate-pulse", after: "bg-red-500/12 text-red-200 border border-red-500/25",
    caption: "Intensity drops, the point of view survives" },
  { verb: "distill", group: "refine", gloss: "strip what does not earn its place",
    combines: ["clarify", "layout"],
    before: "6 CTAs, 3 cards, 2 modals", after: "1 primary action, 2 supporting",
    caption: "Fewer obstacles, the same capability" },
  { verb: "harden", group: "refine", gloss: "long text, i18n, RTL, errors, offline",
    combines: ["adapt", "clarify"],
    before: '<div class="w-24">{name}</div>', after: '<div class="min-w-0 px-4">{name}</div>',
    caption: "Survives a 40-character name and an RTL locale" },
  { verb: "onboard", group: "refine", gloss: "first run, empty states, activation",
    combines: ["clarify", "delight"],
    before: "No data", after: "No cases yet. Submit your first, or browse the archive.",
    caption: "An empty state that teaches the interface" },

  { verb: "animate", group: "enhance", gloss: "motion with a stated thesis",
    combines: ["delight", "optimize"],
    before: "transition: all 0.3s ease-in-out", after: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
    caption: "A curve with a reason, on a property that is cheap" },
  { verb: "colorize", group: "enhance", gloss: "colour as hierarchy and meaning",
    combines: ["typeset", "quieter"],
    before: "text-gray-500 on everything", after: "accent owns action, muted owns metadata",
    caption: "Colour starts encoding state instead of decorating" },
  { verb: "typeset", group: "enhance", gloss: "hierarchy, scale, measure, delivery",
    combines: ["layout", "bolder"],
    before: "text-lg / text-base / text-sm", after: "display clamp, 65ch measure, tabular numerals",
    caption: "Roles become distinguishable without reading the copy" },
  { verb: "layout", group: "enhance", gloss: "structure, grouping, rhythm, density",
    combines: ["distill", "adapt"],
    before: "gap-4 on everything", after: "tight groups, generous separation",
    caption: "Proximity does the grouping, not boxes" },
  { verb: "delight", group: "enhance", gloss: "one earned moment of character",
    combines: ["animate", "clarify"],
    before: 'alert("Done")', after: "the icon swaps to a check for 1.8s",
    caption: "One moment, at a point that earned it" },
  { verb: "overdrive", group: "enhance", gloss: "past conventional limits, on your pick",
    combines: ["optimize", "animate"],
    before: "100,000 rows in the DOM", after: "virtualised, 60fps, keyboard-navigable",
    caption: "Past what a visitor expected a page could do" },

  { verb: "clarify", group: "fix", gloss: "UX copy, labels, errors",
    combines: ["polish", "onboard"],
    before: "Error 422: unprocessable entity", after: "That date is in the past. Pick a later one.",
    caption: "The message names the problem and the recovery" },
  { verb: "adapt", group: "fix", gloss: "one device or breakpoint class",
    combines: ["layout", "harden"],
    before: "grid-cols-4", after: "grid-cols-1 at 375, focus order intact",
    caption: "Structure reflows, reading order survives" },
  { verb: "optimize", group: "fix", gloss: "diagnose and fix UI performance",
    combines: ["animate", "adapt"],
    before: "7.3MB autoplay hero", after: "677KB plus a 40KB poster",
    caption: "The real numbers from this page's own hero" },

  { verb: "review-motion", group: "evaluate", gloss: "critique motion that already ships",
    combines: ["animate", "optimize"],
    before: "12 animated moments", after: "1 authored moment, 11 cut",
    caption: "Motion judged against a craft bar, not vibes" },
];

function Nav({ mobileMenuOpen, setMobileMenuOpen }) {
  // The bar stays with you. It is clear over the sky and takes a dark ground
  // once the page has moved, watched with an observer on a marker at the top
  // of the page, not a scroll listener.
  const [moved, setMoved] = useState(false);
  const mark = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setMoved(!e.isIntersecting));
    if (mark.current) io.observe(mark.current);
    return () => io.disconnect();
  }, []);
  return (
    <>
    <span ref={mark} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-6 w-px" />
    <div aria-hidden="true" className="h-[84px] shrink-0" />
    <nav className={`fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-12 lg:px-16 ${moved && !mobileMenuOpen ? "border-b border-white/10 bg-[#0b0b0c]/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="flex items-center gap-10">
        <a
          href="#top"
          className="flex min-h-[44px] items-center gap-2.5 text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          <img src="/mascot/raven-tile.svg" alt="" width="28" height="28" className="pixel h-7 w-7" />
          rav
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
        className="hidden min-h-[44px] items-center rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.97] md:inline-flex"
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
    </>
  );
}

/* The moves, as something you run. Pick a verb and the raven flies the change
   across the stage: the "was" example is wiped into the "now" one behind it.
   Flip between the two with the switch, or run it again. */
const GROUPS = ["refine", "enhance", "fix", "evaluate"];
function MoveExplorer() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("now"); // which example is showing
  const [run, setRun] = useState(0);         // bumps to replay the flight
  const listRef = useRef(null);
  const m = MOVES[active];

  const pick = (i, focus = false) => {
    setActive(i); setPhase("now"); setRun((r) => r + 1);
    if (focus) listRef.current?.querySelectorAll("[role=option]")[i]?.focus();
  };
  const onKey = (e) => {
    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    pick((active + d + MOVES.length) % MOVES.length, true);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14">
      {/* what you type, and the sixteen things you can type */}
      <div>
        <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-2xl text-white/45 sm:text-3xl" aria-live="polite">
          <span className="text-accent">&gt;</span>
          <span>/rav</span>
          <span key={m.verb} className="move-detail text-accent">{m.verb}</span>
          <span aria-hidden="true" className="move-caret -ml-1 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-accent" />
        </p>
        <p key={m.verb + "-g"} className="move-detail mt-4 min-h-[3.25rem] max-w-md text-base leading-relaxed text-white/65 md:text-lg">{m.gloss}</p>

        <div ref={listRef} role="listbox" aria-label="The sixteen moves" aria-orientation="horizontal" onKeyDown={onKey} className="mt-8 space-y-5">
          {GROUPS.map((g) => (
            <div key={g} className="grid grid-cols-[5.5rem_1fr] items-start gap-3">
              <span className="pt-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">{g}</span>
              <div className="flex flex-wrap gap-2">
                {MOVES.map((mv, i) => mv.group !== g ? null : (
                  <button
                    key={mv.verb} type="button" role="option" aria-selected={i === active} tabIndex={i === active ? 0 : -1}
                    onClick={() => pick(i)}
                    className={`min-h-[44px] rounded-lg border px-3.5 font-mono text-sm transition-colors ${i === active ? "border-accent bg-accent text-[#140803]" : "border-white/14 text-white/75 hover:border-white/40 hover:text-white"}`}
                  >
                    {mv.verb}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* the stage */}
      <div className="min-w-0">
        <div className="relative h-72 overflow-hidden rounded-xl border border-white/14 bg-black/40 sm:h-80">
          <div key={m.verb + "-was"} className="move-face absolute inset-0 flex items-center justify-center px-6 pb-8 pt-16 grayscale">
            <div className="sm:scale-150">{SPECIMENS[m.verb].was}</div>
          </div>
          {phase === "now" && (
            <div key={m.verb + "-now-" + run} className="move-now absolute inset-0 flex items-center justify-center bg-ink px-6 pb-8 pt-16">
              <div className="sm:scale-150">{SPECIMENS[m.verb].now}</div>
            </div>
          )}
          {phase === "now" && (
            <div key={"fly-" + run} aria-hidden="true" className="move-flyer pointer-events-none absolute inset-y-0 w-[3px] bg-accent">
              <img src="/mascot/raven-fly-orange.svg" alt="" draggable={false} width="56" height="56" className="pixel absolute left-1/2 top-1/2 h-14 w-14 max-w-none -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}

          <div role="group" aria-label="Which example to show" className="absolute left-3 top-3 flex overflow-hidden rounded-lg border border-white/14 bg-[#0b0b0c]/90 font-mono text-[11px] uppercase tracking-[0.16em]">
            <button type="button" aria-pressed={phase === "was"} onClick={() => setPhase("was")} className={`min-h-[44px] px-3 ${phase === "was" ? "bg-white/15 text-white" : "text-white/55 hover:text-white"}`}>Was</button>
            <button type="button" aria-pressed={phase === "now"} onClick={() => { setPhase("now"); setRun((r) => r + 1); }} className={`min-h-[44px] px-3 ${phase === "now" ? "bg-accent text-[#140803]" : "text-white/55 hover:text-white"}`}>Now</button>
          </div>
          <button type="button" onClick={() => { setPhase("now"); setRun((r) => r + 1); }} className="absolute right-3 top-3 min-h-[44px] rounded-lg border border-white/14 bg-[#0b0b0c]/90 px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70 hover:text-white">
            Run it again
          </button>
        </div>

        <div key={m.verb + "-d"} className="move-detail mt-5">
          <p className="text-base font-medium text-white md:text-lg">{m.caption}</p>
          <div className="mt-4 space-y-1.5 border-l border-white/20 pl-4">
            <code tabIndex={0} className="block overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/45 line-through decoration-white/25 sm:text-[13px]">{m.before}</code>
            <code tabIndex={0} className="block overflow-x-auto whitespace-pre font-mono text-xs leading-6 text-white/90 sm:text-[13px]">{m.after}</code>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
            <span>combines with</span>
            {m.combines.map((c) => (
              <button key={c} type="button" onClick={() => pick(MOVES.findIndex((x) => x.verb === c))} className="min-h-[44px] rounded-md border border-white/14 px-2.5 text-accent hover:border-accent">
                /{c}
              </button>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstallLine({ className = "", plain = false }) {
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
    <div
      className={`flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border bg-[#0b0b0c] py-2 pl-5 pr-2 sm:w-fit ${plain ? "border-[#0b0b0c]" : "border-accent shadow-[0_0_0_4px_rgba(245,133,73,0.14)]"} ${className}`}
    >
      <span aria-hidden="true" className="select-none font-mono text-sm font-medium text-accent sm:text-base">$</span>
      <code
        tabIndex={0}
        role="region"
        aria-label="Install command"
        className="overflow-x-auto whitespace-nowrap rounded-sm font-mono text-sm text-white sm:text-base"
      >
        {INSTALL}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Install command copied" : "Copy install command"}
        className="relative flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-4 font-mono text-sm font-medium text-[#140803] hover:bg-[#ff9a63]"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <section className="h-viewport relative flex w-full flex-col overflow-hidden">
        {/* Dusk over Jodhpur, drawn in pixels. The light is low on the right, so
            the type column sits in the dark half of the sky. */}
        <DuskSky />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,12,0.7)_0%,rgba(11,11,12,0.5)_24%,rgba(11,11,12,0)_34%)] md:bg-[linear-gradient(90deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.25)_38%,rgba(11,11,12,0)_62%)]" />

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
              className="mt-6 inline-flex min-h-[52px] items-center justify-center self-start rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.97]"
            >
              Get the skill
            </a>
          </div>
        </div>

        <main
          {...(mobileMenuOpen ? { inert: "" } : {})}
          className="relative z-10 flex min-h-0 flex-1 flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
          {/* The mascot crosses the first screen once after load, then leaves. */}
          <HeroRaven />
          <div className="max-w-3xl">
            <p className="hero-reveal mb-4 animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_both] text-xs text-white/90 sm:mb-6 sm:text-sm">
              A design skill for Claude Code
            </p>
            <h1 className="hero-reveal animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_both] text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              A design ski<span id="perch">ll</span>
              <br />
              that learns
              <br />
              <span className="text-accent">your</span> taste.
            </h1>
          </div>

          <div>
            {/* tell count: grep -c '^- ' reference/tells.md in the skill repo,
                minus the 3 hex-value bullets under Palette bans. Recount on bump. */}
            <p className="hero-reveal mb-5 max-w-sm animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
              Ten questions about how you work become a profile. It sits on top of three
              registers, sixteen scoped moves and sixty-six production tells, and it outranks them.
            </p>
            <InstallLine className="hero-reveal animate-[fadeSlideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.9s_both]" />
          </div>
        </main>
      </section>

      <Below Explorer={MoveExplorer} Install={InstallLine} caught={CAUGHT} repo={REPO} madeBy={MADE_BY} version="4.1.0" />
    </div>
  );
}
