// Procedural planet-surface textures, generated client-side on a canvas.
// Every texture is horizontally tileable so the sphere can "rotate" by
// sliding the map. Colors come from each body's gradient so the scene
// palette stays coherent while the surfaces read as realistic.

export type TextureKind = "banded" | "rocky" | "terran" | "ice" | "gas";

interface TextureOptions {
  kind: TextureKind;
  /** [light, mid, dark] hex stops. */
  colors: [string, string, string];
  seed: number;
  width?: number;
  height?: number;
}

type RGB = [number, number, number];

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** 0 → light, 0.5 → mid, 1 → dark. */
function ramp(light: RGB, mid: RGB, dark: RGB, t: number): RGB {
  return t < 0.5 ? mix(light, mid, t * 2) : mix(mid, dark, (t - 0.5) * 2);
}

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(a: number, b: number, v: number) {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

/** Value noise whose x-axis wraps at `period` lattice cells → tileable. */
function makeNoise(seed: number) {
  const val = (ix: number, iy: number) => {
    let h = seed ^ Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  return (x: number, y: number, period: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const x0 = ((xi % period) + period) % period;
    const x1 = (x0 + 1) % period;
    const sx = xf * xf * (3 - 2 * xf);
    const sy = yf * yf * (3 - 2 * yf);
    const a = val(x0, yi);
    const b = val(x1, yi);
    const c = val(x0, yi + 1);
    const d = val(x1, yi + 1);
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };
}

export function generatePlanetTexture(opts: TextureOptions): string {
  const { kind, colors, seed } = opts;
  const w = opts.width ?? 512;
  const h = opts.height ?? 256;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const rand = mulberry32(seed);
  const noise = makeNoise(seed);
  // fbm over (u, y): u ∈ [0,1) wraps horizontally at every octave.
  const fbm = (u: number, y: number, base: number, octaves: number) => {
    let sum = 0;
    let amp = 0.5;
    let freq = base;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noise(u * freq, y * freq, freq);
      amp *= 0.5;
      freq *= 2;
    }
    return sum / (1 - Math.pow(0.5, octaves));
  };

  const [light, mid, dark] = colors.map(hexToRgb) as [RGB, RGB, RGB];
  const img = ctx.createImageData(w, h);
  const data = img.data;
  const phase = rand() * Math.PI * 2;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    // aspect-corrected vertical coordinate (texture is 2:1)
    const vy = v * 0.5;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      let c: RGB;

      switch (kind) {
        case "banded": {
          // Turbulence-warped latitude bands, à la Jupiter.
          const warp = fbm(u, vy, 5, 4) - 0.5;
          const lat = v + warp * 0.09;
          const band = Math.sin(lat * Math.PI * 13 + phase) * 0.5 + 0.5;
          const detail = fbm(u + 0.31, vy + 0.77, 12, 4) - 0.5;
          const t = clamp01(band * 0.82 + 0.09 + detail * 0.26);
          c = ramp(light, mid, dark, t);
          // polar dimming
          const pole = smoothstep(0.36, 0.5, Math.abs(v - 0.5));
          c = mix(c, dark, pole * 0.55);
          break;
        }
        case "rocky": {
          // Dusty regolith with tonal patches; craters stamped afterwards.
          const e = fbm(u, vy, 7, 5);
          const patch = fbm(u + 0.57, vy + 0.13, 3, 3);
          const t = clamp01(0.42 + (0.5 - e) * 0.85 + (patch - 0.5) * 0.35);
          c = ramp(light, mid, dark, t);
          break;
        }
        case "terran": {
          // Continents + oceans + polar caps + cloud deck.
          const e = fbm(u, vy, 4, 6);
          const sea = 0.52;
          if (e < sea) {
            const depth = (sea - e) / sea;
            c = mix(mid, dark, clamp01(0.3 + depth * 2.2));
          } else {
            const elev = (e - sea) / (1 - sea);
            const rough = fbm(u + 0.21, vy + 0.43, 14, 3) - 0.5;
            c = ramp(light, mid, dark, clamp01(0.42 - elev * 0.75 + rough * 0.2));
          }
          const cap = smoothstep(0.4, 0.485, Math.abs(v - 0.5));
          c = mix(c, [235, 244, 252], cap * 0.9);
          const cloud = smoothstep(0.56, 0.78, fbm(u + 0.73, vy + 0.31, 6, 4));
          c = mix(c, [255, 255, 255], cloud * 0.72);
          break;
        }
        case "ice": {
          // Bright marbled crust criss-crossed by dark fracture lines.
          const m = fbm(u, vy, 5, 5);
          c = ramp(light, mid, dark, clamp01(0.12 + (m - 0.5) * 0.9));
          const ridge = Math.abs(fbm(u + 0.11, vy + 0.67, 9, 4) * 2 - 1);
          if (ridge < 0.09) c = mix(c, dark, (1 - ridge / 0.09) * 0.65);
          const streak = Math.abs(fbm(u + 0.45, vy + 0.05, 4, 3) * 2 - 1);
          if (streak < 0.14) c = mix(c, mid, (1 - streak / 0.14) * 0.35);
          break;
        }
        case "gas":
        default: {
          // Soft, slowly swirling cloudscape.
          const m1 = fbm(u, vy, 3, 5);
          const m2 = fbm(u + 0.37, vy + 0.61, 6, 4);
          const t = clamp01(m1 * 0.85 + (m2 - 0.5) * 0.55 + 0.08);
          c = mix(ramp(light, mid, dark, t), mid, 0.18);
          const wisp = smoothstep(0.62, 0.85, m2);
          c = mix(c, light, wisp * 0.35);
          break;
        }
      }

      const i = (y * w + x) * 4;
      data[i] = c[0];
      data[i + 1] = c[1];
      data[i + 2] = c[2];
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);

  // --- post passes (drawn thrice at x-w / x / x+w to stay tileable) ---
  const stamp3 = (draw: (dx: number) => void) => {
    for (const dx of [-w, 0, w]) draw(dx);
  };

  if (kind === "rocky") {
    const craters = 46;
    for (let i = 0; i < craters; i++) {
      const cx = rand() * w;
      const cy = h * (0.08 + rand() * 0.84);
      const r = 2 + rand() * rand() * 15;
      stamp3((dx) => {
        const g = ctx.createRadialGradient(cx + dx, cy, 0, cx + dx, cy, r);
        g.addColorStop(0, "rgba(0,0,0,0.34)");
        g.addColorStop(0.75, "rgba(0,0,0,0.18)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx + dx, cy, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.lineWidth = Math.max(0.6, r * 0.1);
        ctx.beginPath();
        ctx.arc(cx + dx, cy, r * 0.92, -Math.PI * 0.95, Math.PI * 0.05);
        ctx.stroke();
      });
    }
  }

  if (kind === "banded") {
    // A couple of great-storm ovals.
    const storms = 2 + Math.floor(rand() * 2);
    for (let i = 0; i < storms; i++) {
      const sx = rand() * w;
      const sy = h * (0.3 + rand() * 0.4);
      const r = 12 + rand() * 20;
      stamp3((dx) => {
        ctx.save();
        ctx.translate(sx + dx, sy);
        ctx.scale(1, 0.45);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
        const [lr, lg, lb] = light;
        g.addColorStop(0, `rgba(${lr | 0},${lg | 0},${lb | 0},0.6)`);
        g.addColorStop(0.7, `rgba(${lr | 0},${lg | 0},${lb | 0},0.22)`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.28)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.72, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
    }
  }

  return canvas.toDataURL();
}

// Textures are deterministic per body, so cache the data URLs for the session.
const cache = new Map<string, string>();

export function getPlanetTexture(
  id: string,
  kind: TextureKind,
  colors: [string, string, string],
): string {
  const hit = cache.get(id);
  if (hit) return hit;
  const url = generatePlanetTexture({ kind, colors, seed: hashSeed(id) });
  cache.set(id, url);
  return url;
}
