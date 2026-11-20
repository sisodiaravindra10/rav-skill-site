import { useEffect, useRef, useState } from "react";

/* Flies in once and perches on the word marked #perch. The raven is positioned
   in the hero's own coordinate space, so it stays on the word through resizes. */
export default function HeroRaven() {
  const ref = useRef(null);
  const [phase, setPhase] = useState("wait"); // wait -> fly -> sit
  const [pos, setPos] = useState(null);
  const [size, setSize] = useState(72);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const host = el.offsetParent;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const place = () => {
      const word = document.getElementById("perch"); if (!word || !host) return null;
      const w = word.getBoundingClientRect(), h = host.getBoundingClientRect();
      const cs = getComputedStyle(word), fs = parseFloat(cs.fontSize);
      const s = Math.round(Math.max(34, Math.min(84, fs * 0.9)));
      setSize(s);
      // Find the real top of the letters: the baseline from a zero-size probe,
      // and the height of an "l" above it from the font's own metrics.
      const probe = document.createElement("span");
      probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
      word.appendChild(probe); const baseline = probe.getBoundingClientRect().top; word.removeChild(probe);
      const m = document.createElement("canvas").getContext("2d");
      m.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const ascent = m.measureText("l").actualBoundingBoxAscent;
      const top = baseline - ascent;               // top edge of the two l's
      const mid = (w.left + w.right) / 2;          // centre of the two l's
      // The sprite's feet are in its bottom row, centred about 37% from its left.
      return { x: mid - h.left - s * 0.37, y: top - h.top - s + 1 };
    };
    let t1, t2;
    const start = () => {
      const p = place(); if (!p) return;
      if (still) { setPos(p); setPhase("sit"); return; }
      setPos({ x: -140, y: p.y - 90 });
      t1 = setTimeout(() => { setPhase("fly"); setPos(p); }, 900);
      t2 = setTimeout(() => setPhase("sit"), 900 + 2650);
    };
    (document.fonts?.ready ?? Promise.resolve()).then(start);
    const onResize = () => { const p = place(); if (p) setPos((cur) => (cur && cur.x < 0 ? cur : p)); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div ref={ref} className="hero-raven" data-phase={phase} aria-hidden="true"
      style={{ transform: pos ? `translate(${pos.x}px, ${pos.y}px)` : "translate(-200px, 0)", opacity: pos ? 1 : 0 }}>
      <img className="pixel" alt="" width={size} height={size}
        src={phase === "sit" ? "/mascot/raven-sit-orange.svg" : "/mascot/raven-fly-orange.svg"} />
    </div>
  );
}
