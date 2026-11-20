import { useEffect, useRef } from "react";

/* Pixel scenes for the page below the hero, in the hero's own grain and
   palette. The page is one night: dusk in the hero, stars and a moon through
   the middle, a sunrise into the orange close. Every scene is painted once on
   a small canvas and scaled up with hard edges. Nothing here animates. */

const SKY = ["#0b0b0c", "#12101f", "#1d1430", "#34183a", "#5e2340", "#a3412f", "#e06d33", "#f58549", "#ffcf8a"];
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const S = SKY.map(hex);
const GROUND = hex("#070709"), STAR = hex("#e9e4ff"), BONE = hex("#f6f3ee"), SUN = hex("#ffe1b0"), LAMP_OFF = hex("#4a4a55"), HOUSE = hex("#111a3a");
const rnd = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };
/* pick a sky colour for a 0..1 value, dithered between its two neighbours */
const shade = (v, x, y, top = S.length - 1) => { const f = Math.min(1, Math.max(0, v)) * top, lo = Math.floor(f); return S[Math.min(top, lo + (f - lo > (BAYER[y & 3][x & 3] + 0.5) / 16 ? 1 : 0))]; };

const SCENES = {
  /* a few stars on a clear ground: sparse, small and dim enough to be texture,
     never something the eye lands on before the type */
  night({ w, h, set }) {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      if (rnd(x * 1.3 + 7, y * 2.1 + 3) > 0.9993) set(x, y, STAR, 26 + Math.floor(rnd(y, x) * 46));
    }
  },

  /* a crescent moon with a soft dithered halo, on a clear ground */
  moon({ w, h, set }) {
    const R = Math.round(Math.min(w, h) * 0.24), cx = Math.round(w / 2), cy = Math.round(h / 2);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - cy), cut = Math.hypot(x - (cx + R * 0.52), y - (cy - R * 0.22));
      if (d <= R && cut > R * 0.94) set(x, y, BONE, 255);
      else if (d < R * 2 && (BAYER[y & 3][x & 3] + 0.5) / 16 < 0.55 * (1 - d / (R * 2))) set(x, y, S[3], 170);
    }
  },

  /* a night road with five lamps; the fourth is lit, where the build stops */
  flight({ w, h, set }) {
    const posts = [0.1, 0.3, 0.5, 0.7, 0.9], lit = 3, lx = Math.round(posts[lit] * w);
    const hill = (u) => 0.2 + 0.05 * Math.sin(u * 5.2 + 1) + 0.025 * Math.sin(u * 13.7);
    const poleH = Math.max(10, Math.round(h * 0.36)), lampY = Math.round(h * (1 - hill(posts[lit]))) - poleH;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const u = x / w, gy = (h - y) / h;
      if (gy < hill(u)) { set(x, y, gy < hill(u) * 0.5 && rnd(Math.floor(x / 3), Math.floor(y / 3)) > 0.8 ? HOUSE : GROUND); continue; }
      const dx = (x - lx) / w, dy = (y - lampY) / h, glow = Math.exp(-(dx * dx * 60 + dy * dy * 16));
      const v = 0.05 + 0.3 * Math.pow(y / h, 2) + glow * 0.55;
      set(x, y, shade(v, x, y, 7));
      if (v < 0.14 && rnd(x * 1.7, y * 2.3) > 0.9965) set(x, y, STAR);
    }
    posts.forEach((p, i) => {
      const x = Math.round(p * w), base = Math.round(h * (1 - hill(p)));
      for (let y = base - poleH; y < base; y++) { set(x, y, GROUND); set(x + 1, y, GROUND); }
      for (let dy = -3; dy < 0; dy++) for (let dx2 = -2; dx2 <= 3; dx2++) set(x + dx2, base - poleH + dy, i === lit ? S[8] : LAMP_OFF);
    });
  },

  /* a cut through the ground: the lit town on top, your layer under it, the core below */
  strata({ w, h, set }) {
    const top = Math.round(h * 0.26), mid = Math.round(h * 0.56);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const u = x / w, wob = Math.round(2 * Math.sin(u * 9 + 1) + 1.5 * Math.sin(u * 23));
      if (y < top) {
        const hgt = 2 + Math.floor(rnd(Math.floor(x / 4), 3) * 7) + (Math.abs(u - 0.3) < 0.07 ? 6 : 0);
        if (top - y <= hgt) set(x, y, rnd(x, y) > 0.9 && (top - y) > 1 ? S[7] : GROUND);
        else { set(x, y, shade(0.06 + 0.5 * Math.pow(y / top, 3), x, y, 5)); if (rnd(x * 1.9, y * 2.7) > 0.992 && y < top * 0.6) set(x, y, STAR); }
      } else if (y < mid + wob) {
        set(x, y, shade(0.62 + 0.3 * (1 - (y - top) / (mid - top)) + (rnd(x, y) - 0.5) * 0.12, x, y, 8));
        if (y === top || y === top + 1) set(x, y, S[8]);
      } else {
        const t = (y - mid) / (h - mid), band = Math.floor(t * 4 + 0.3 * Math.sin(u * 7 + t * 5));
        set(x, y, shade(0.42 - band * 0.085 + (rnd(x * 3.1, y * 1.3) - 0.5) * 0.05, x, y, 8));
        if (rnd(Math.floor(x / 2), Math.floor(y / 2) + 40) > 0.985) set(x, y, S[1]);
      }
    }
  },

  /* first light: the night sky warms downward until it is the orange of the close */
  dawn({ w, h, set }) {
    const cx = w * 0.74, R = Math.max(10, w * 0.075);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const d = Math.hypot(x - cx, y - h), glow = Math.exp(-Math.pow(d / (R * 3.2), 2));
      const v = Math.pow(y / h, 1.5) * 0.86 + glow * 0.3;
      set(x, y, y >= h - 1 ? S[7] : shade(v, x, y, 7));
      if (d < R) set(x, y, (h - y) % 5 === 1 && h - y < R * 0.6 ? S[7] : SUN);
      else if (v < 0.1 && rnd(x * 1.7, y * 2.3) > 0.996) set(x, y, STAR);
    }
    for (let b = 0; b < 4; b++) { const bx = Math.round(w * (0.28 + b * 0.085)), by = Math.round(h * (0.34 + (b % 2) * 0.1)); set(bx, by, GROUND); set(bx + 1, by, GROUND); set(bx - 1, by - 1, GROUND); set(bx + 2, by - 1, GROUND); }
  },
};

export default function Scene({ kind, className = "", px }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return; const ctx = cv.getContext("2d");
    let pending = 0;
    const paint = () => {
      const r = cv.getBoundingClientRect(); if (!r.width || !r.height) return;
      const p = px || (r.width < 700 ? 4 : r.width < 1400 ? 5 : 6);
      const w = Math.max(20, Math.ceil(r.width / p)), h = Math.max(8, Math.ceil(r.height / p));
      cv.width = w; cv.height = h;
      const img = ctx.createImageData(w, h), d = img.data;
      const set = (x, y, c, a = 255) => { x |= 0; y |= 0; if (x < 0 || y < 0 || x >= w || y >= h) return; const i = (y * w + x) * 4; d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = a; };
      SCENES[kind]({ w, h, set }); ctx.putImageData(img, 0, 0);
    };
    paint();
    const ro = new ResizeObserver(() => { cancelAnimationFrame(pending); pending = requestAnimationFrame(paint); });
    ro.observe(cv);
    return () => { ro.disconnect(); cancelAnimationFrame(pending); };
  }, [kind, px]);
  return <canvas ref={ref} aria-hidden="true" className={`pixel block ${className}`} />;
}
