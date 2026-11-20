import { useEffect, useRef } from "react";

/* The hero ground: dusk over Jodhpur, drawn pixel by pixel in the raven's own
   grain. Nothing here is an image. A small canvas is painted with an ordered
   dither between eight sky colours, then scaled up with crisp edges.

   Light sits low on the right, so the left column, where the type is, stays
   in the dark half of the sky and on the fort's silhouette. */

const SKY = ["#0b0b0c", "#12101f", "#1d1430", "#34183a", "#5e2340", "#a3412f", "#e06d33", "#f58549", "#ffcf8a"];
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const SKY_RGB = SKY.map(hex);
const GROUND = hex("#070709"), HOUSE = hex("#111a3a"), LAMP = hex("#f58549"), SUN = hex("#ffe1b0"), STAR = hex("#e9e4ff");
const rnd = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };

/* Ridge line with the fort on it, as a height above the bottom edge (0..1 of h).
   On a narrow screen the land is lifted, so the sun sets in view and the text
   below the headline sits on the dark hillside. */
let LIFT = 0;
function ridge(u) {
  let h = LIFT + 0.13 + 0.05 * Math.sin(u * 3.1 + 0.6) + 0.02 * Math.sin(u * 11.0);
  // the rock the fort stands on
  const rock = Math.max(0, 1 - Math.abs((u - 0.27) / 0.26));
  h += 0.15 * Math.pow(rock, 0.7);
  return h;
}
function fort(u, w) {
  // walls and towers, in ridge-relative height, only across the rock
  if (u < 0.1 || u > 0.44) return 0;
  const x = Math.floor(u * w);
  let wall = 0.05;                                   // one long curtain wall
  const towers = [[0.115, 0.022], [0.185, 0.03], [0.265, 0.05], [0.335, 0.03], [0.415, 0.022]];
  for (const [c, t] of towers) if (Math.abs(u - c) < 0.021) wall += t;   // squat bastions
  if (Math.abs(u - 0.265) < 0.008) wall += 0.022;    // the palace block on the keep
  if (x % 4 < 2) wall += 0.007;                      // battlements
  return wall;
}

export default function DuskSky({ className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, last = 0, w = 0, h = 0, base = null, stars = [], lamps = [], sun = null, clouds = [];

    const build = () => {
      const r = cv.getBoundingClientRect();
      const px = r.width < 700 ? 4 : r.width < 1400 ? 5 : 6;
      w = Math.max(60, Math.ceil(r.width / px)); h = Math.max(60, Math.ceil(r.height / px));
      cv.width = w; cv.height = h;
      const img = ctx.createImageData(w, h); const d = img.data; stars = []; lamps = [];
      const narrow = r.width < 700; LIFT = narrow ? 0.2 : 0;
      const sx = (narrow ? 0.78 : 0.8) * w, sr = Math.max(9, w * (narrow ? 0.15 : 0.085));
      // The sun is a whole disc whose centre sits just below the ridge line at its
      // own x, so the land in front covers its lower part. It sets behind the hill.
      const su = Math.min(0.999, sx / w), ridgeY = h * (1 - (ridge(su) + fort(su, w)));
      const horizon = ridgeY + sr * 0.3;
      for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        const u = x / w, i = (y * w + x) * 4;
        const gy = (h - y) / h;                       // height above the bottom
        const rh = ridge(u), top = rh + fort(u, w);
        let c;
        if (gy < top) {
          c = GROUND;
          // the old city at the foot of the rock: a few blue walls, a few lit windows
          if (gy < (rh - LIFT) * 0.62 + LIFT * 0.55 && u > 0.02) {
            const bx = Math.floor(x / 3), by = Math.floor(y / 3), k = rnd(bx, by);
            if (k > 0.72 && u > 0.06) c = HOUSE;
            if (k > 0.975 && x % 3 === 1 && y % 3 === 1) { c = LAMP; lamps.push([x, y, k * 50]); }
          }
        } else {
          const dx = (x - sx) / w, dy = (y - horizon) / h;
          const glow = Math.exp(-(dx * dx * (narrow ? 6 : 5.5) + dy * dy * (narrow ? 20 : 9)));
          const down = Math.pow(y / horizon, 2.1);
          let v = Math.min(1, Math.max(0, down * 0.42 + glow * 0.66));
          const f = v * (SKY_RGB.length - 1), lo = Math.floor(f), t = f - lo;
          c = SKY_RGB[Math.min(SKY_RGB.length - 1, lo + (t > (BAYER[y & 3][x & 3] + 0.5) / 16 ? 1 : 0))];
          const ddx = x - sx, ddy = y - horizon;
          if (ddx * ddx + ddy * ddy < sr * sr) c = (y % 5 === 4 && y > horizon - sr * 0.55) ? SKY_RGB[7] : SUN;
          else if (v < 0.16 && rnd(x * 1.7, y * 2.3) > 0.9986) stars.push([x, y, rnd(x, y) * 6.28]);
        }
        d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
      }
      sun = { x: sx, y: horizon, r: sr };
      clouds = [0.5, 0.58, 0.66].map((f, i) => ({ y: Math.floor(h * f), len: Math.floor(w * (0.16 + i * 0.05)), off: i * 0.37, speed: 5200 + i * 1700 }));
      base = img; draw(0);
    };
    const draw = (t) => {
      if (!base) return;
      ctx.putImageData(base, 0, 0);
      if (!still && sun) {
        // the sun's bands slide down slowly, like light through haze
        const band = Math.floor(t / 420) % 5, d = base.data;
        ctx.fillStyle = "#f58549";
        for (let y = Math.max(0, Math.floor(sun.y - sun.r * 0.6)); y < Math.min(h, sun.y + sun.r); y++) if ((y + band) % 5 === 0) {
          const half = Math.floor(Math.sqrt(Math.max(0, sun.r * sun.r - (y - sun.y) * (y - sun.y))));
          for (let x = Math.max(0, Math.floor(sun.x - half)); x < Math.min(w, sun.x + half); x++) {
            const i = (y * w + x) * 4;                      // sun pixels only: pale disc or its static band
            if (d[i] > 230 && d[i + 2] > 60) ctx.fillRect(x, y, 1, 1);
          }
        }
        // thin cloud streaks drifting across the glow
        ctx.fillStyle = "rgba(52,24,58,0.55)";
        for (const c of clouds) {
          const x0 = Math.floor((((t / c.speed + c.off) % 1.4) - 0.2) * w);
          for (let i = 0; i < c.len; i += 2) ctx.fillRect(x0 + i, c.y + ((i >> 3) & 1), 2, 1);
        }
        // a few windows in the old city flicker
        for (const [x, y, ph] of lamps) if (Math.sin(t / 380 + ph) > 0.86) { ctx.fillStyle = "#070709"; ctx.fillRect(x, y, 1, 1); }
      }
      for (const [x, y, ph] of stars) {
        const a = still ? 0.55 : 0.2 + 0.5 * Math.abs(Math.sin(t / 900 + ph));
        ctx.fillStyle = `rgba(${STAR[0]},${STAR[1]},${STAR[2]},${a.toFixed(2)})`; ctx.fillRect(x, y, 1, 1);
      }
      // three far birds drifting home, two pixels each
      if (!still) for (let b = 0; b < 3; b++) {
        const bx = Math.floor(((t / 260 + b * 61) % (w + 40)) - 20), by = Math.floor(h * (0.3 + b * 0.07) + Math.sin(t / 700 + b) * 2);
        const up = Math.floor(t / 220 + b) % 2;
        ctx.fillStyle = "#0b0b0c"; ctx.fillRect(bx, by, 2, 1); ctx.fillRect(bx - 1, by + (up ? -1 : 1), 1, 1); ctx.fillRect(bx + 2, by + (up ? -1 : 1), 1, 1);
      }
    };
    const loop = (t) => { if (visible && t - last > 110) { last = t; draw(t); } raf = requestAnimationFrame(loop); };
    build();
    const ro = new ResizeObserver(build); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(cv);
    const onVis = () => { visible = !document.hidden; }; document.addEventListener("visibilitychange", onVis);
    if (!still) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={`pixel absolute inset-0 h-full w-full ${className}`} />;
}
