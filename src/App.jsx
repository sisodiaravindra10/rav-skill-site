import DuskSky from "./DuskSky.jsx";
import HeroRaven from "./HeroRaven.jsx";
import Below from "./Below.jsx";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Menu, MoveHorizontal, X } from "lucide-react";
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
  return (
    <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
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
  );
}

function MoveExplorer() {
  const [active, setActive] = useState(0);
  const [split, setSplit] = useState(52);
  const railRef = useRef(null);
  const paneRef = useRef(null);
  const dragging = useRef(false);
  const m = MOVES[active];

  // Arrow keys walk the rail, so the whole thing works without a pointer.
  const onRailKey = (e) => {
    const d = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + MOVES.length) % MOVES.length;
    setActive(next);
    const el = railRef.current?.querySelectorAll("[role=option]")[next];
    el?.focus();
  };

  const setFromPointer = (clientX) => {
    const r = paneRef.current?.getBoundingClientRect();
    if (!r) return;
    setSplit(Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100)));
  };

  useEffect(() => {
    const move = (e) => dragging.current && setFromPointer(e.clientX ?? e.touches?.[0]?.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:gap-14">
      {/* the rail: focus resolves by distance from the selection */}
      <div
        ref={railRef}
        role="listbox"
        aria-label="Moves"
        tabIndex={-1}
        onKeyDown={onRailKey}
        className="move-rail flex gap-x-5 gap-y-1 overflow-x-auto pb-2 lg:block lg:overflow-visible lg:pb-0"
      >
        {MOVES.map((mv, i) => {
          const d = Math.abs(i - active);
          const on = i === active;
          return (
            <button
              key={mv.verb}
              role="option"
              aria-selected={on}
              onClick={() => setActive(i)}
              style={{ "--d": d }}
              className={`move-rail__item flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-left font-mono transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block lg:min-h-0 lg:w-full lg:py-1 ${
                on ? "text-accent" : "text-white/85 hover:text-white"
              }`}
            >
              {mv.verb}
            </button>
          );
        })}
      </div>

      <div className="grid min-w-0 gap-10 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] md:gap-12">
        {/* the detail, keyed so it re-enters on change */}
        <div key={m.verb} className="move-detail min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">{m.group}</p>
          <p className="mt-4 font-mono text-sm text-white/45">/rav</p>
          <h3 className="font-mono text-3xl leading-none text-accent md:text-4xl">{m.verb}</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{m.gloss}</p>
          <p className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/45">
            <span>combines with</span>
            {m.combines.map((c) => (
              <button
                key={c}
                onClick={() => setActive(MOVES.findIndex((x) => x.verb === c))}
                className="relative rounded border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-accent/80 transition-colors before:absolute before:-inset-y-2 before:-inset-x-1 before:content-[''] hover:border-white/25 hover:text-accent"
              >
                /{c}
              </button>
            ))}
          </p>
        </div>

        {/* the split: before underneath, after revealed by the divider */}
        <div className="min-w-0">
          <div
            ref={paneRef}
            className="relative h-60 min-w-0 cursor-ew-resize touch-none select-none overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:h-64"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture?.(e.pointerId);
              setFromPointer(e.clientX);
            }}
          >
            <div
              key={m.verb + "-b"}
              className="move-face absolute inset-0 flex items-center justify-center overflow-hidden px-5 py-9 grayscale"
              style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
            >
              {SPECIMENS[m.verb].was}
            </div>
            <div
              key={m.verb + "-a"}
              className="move-face absolute inset-0 flex items-center justify-center overflow-hidden bg-ink px-5 py-9"
              style={{ clipPath: `inset(0 0 0 ${split}%)` }}
            >
              {SPECIMENS[m.verb].now}
            </div>

            <div
              className="absolute inset-y-0 w-px bg-accent"
              style={{ left: `${split}%` }}
              aria-hidden="true"
            />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Reveal the result"
              aria-valuemin={8}
              aria-valuemax={92}
              aria-valuenow={Math.round(split)}
              onKeyDown={(e) => {
                const d = e.key === "ArrowRight" ? 4 : e.key === "ArrowLeft" ? -4 : 0;
                if (!d) return;
                e.preventDefault();
                setSplit((v) => Math.min(92, Math.max(8, v + d)));
              }}
              style={{ left: `${split}%` }}
              className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-accent bg-ink text-accent shadow-[0_0_0_4px_rgba(11,11,12,0.7)] focus-visible:outline-offset-4"
            >
              <MoveHorizontal size={15} />
            </div>

            <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              was
            </span>
            <span className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
              now
            </span>
          </div>
          <p key={m.verb + "-c"} className="move-detail mt-4 text-center text-xs text-white/50">
            {m.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstallLine({ className = "" }) {
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
      className={`flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-accent bg-[#0b0b0c] py-2 pl-5 pr-2 shadow-[0_0_0_4px_rgba(245,133,73,0.14)] sm:w-fit ${className}`}
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
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,11,12,0.9)_0%,rgba(11,11,12,0.78)_22%,rgba(11,11,12,0)_40%)] md:bg-[linear-gradient(90deg,rgba(11,11,12,0.55)_0%,rgba(11,11,12,0.25)_38%,rgba(11,11,12,0)_62%)]" />

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
