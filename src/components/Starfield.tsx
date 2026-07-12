"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkle: number; // phase offset
  color: string;
}

interface Flare {
  x: number;
  y: number;
  r: number;
  phase: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
}

interface LayerConfig {
  density: number; // stars per ~1000px² (scaled)
  parallax: number; // scroll multiplier
  mouse: number; // px of drift at pointer extremes
  size: [number, number];
  twinkleSpeed: number;
  accentChance: number; // chance of a colored star
}

const LAYERS: LayerConfig[] = [
  { density: 0.00009, parallax: 0.012, mouse: 6, size: [0.4, 0.9], twinkleSpeed: 0.6, accentChance: 0 },
  { density: 0.00006, parallax: 0.045, mouse: 16, size: [0.7, 1.6], twinkleSpeed: 1.0, accentChance: 0.04 },
  { density: 0.000022, parallax: 0.11, mouse: 30, size: [1.2, 2.7], twinkleSpeed: 1.6, accentChance: 0.16 },
];

const ACCENTS = ["#a855f7", "#22d3ee", "#6366f1", "#5eead4"];

// Star color temperatures (real skies aren't pure white): blue-white giants,
// sun-like whites, and a scatter of warm orange dwarfs.
const TEMPS: [string, number][] = [
  ["#ffffff", 0.6],
  ["#cfe4ff", 0.22],
  ["#ffedd2", 0.12],
  ["#ffc89e", 0.06],
];

function pickTemp(): string {
  let r = Math.random();
  for (const [c, p] of TEMPS) {
    if ((r -= p) <= 0) return c;
  }
  return "#ffffff";
}

function makeStars(layer: LayerConfig, w: number, h: number): Star[] {
  const count = Math.min(900, Math.max(20, Math.round(w * h * layer.density)));
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const accent = Math.random() < layer.accentChance;
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
      baseAlpha: 0.35 + Math.random() * 0.6,
      twinkle: Math.random() * Math.PI * 2,
      color: accent ? ACCENTS[(Math.random() * ACCENTS.length) | 0] : pickTemp(),
    });
  }
  return stars;
}

// A handful of bright stars with diffraction spikes, like a telescope image.
function makeFlares(w: number, h: number): Flare[] {
  const count = Math.min(11, Math.max(5, Math.round((w * h) / 240000)));
  const flares: Flare[] = [];
  for (let i = 0; i < count; i++) {
    flares.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1.3 + Math.random() * 1.3,
      phase: Math.random() * Math.PI * 2,
      color: pickTemp(),
    });
  }
  return flares;
}

interface StarfieldProps {
  reducedMotion?: boolean;
  interactive?: boolean;
}

export default function Starfield({ reducedMotion = false, interactive = true }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let layers: Star[][] = [];
    let flares: Flare[] = [];
    const meteors: Meteor[] = [];
    let meteorTimer = 2 + Math.random() * 3;
    const mouse = { x: 0, y: 0 }; // target, normalized -1..1
    const smooth = { x: 0, y: 0 }; // eased pointer
    let raf = 0;
    let prevTime = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layers = LAYERS.map((l) => makeStars(l, w, h));
      flares = makeFlares(w, h);
      if (reducedMotion) draw(0); // single static paint
    };

    const spawnMeteor = () => {
      const dir = Math.random() < 0.5 ? -1 : 1;
      const angle = (16 + Math.random() * 22) * (Math.PI / 180);
      const speed = 700 + Math.random() * 520;
      meteors.push({
        x: Math.random() * w * 0.9 + w * 0.05,
        y: Math.random() * h * 0.38,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        age: 0,
        life: 0.7 + Math.random() * 0.5,
      });
    };

    const draw = (time: number) => {
      const dt = prevTime ? Math.min((time - prevTime) / 1000, 0.05) : 0;
      prevTime = time;

      ctx.clearRect(0, 0, w, h);
      const scrollY = window.scrollY;
      smooth.x += (mouse.x - smooth.x) * 0.06;
      smooth.y += (mouse.y - smooth.y) * 0.06;

      for (let li = 0; li < layers.length; li++) {
        const cfg = LAYERS[li];
        const stars = layers[li];
        const offX = interactive ? smooth.x * cfg.mouse : 0;
        const offY = (reducedMotion ? 0 : scrollY * cfg.parallax) + (interactive ? smooth.y * cfg.mouse : 0);

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          // Wrap within the viewport so the field feels endless on scroll.
          const x = (((s.x + offX) % w) + w) % w;
          const y = (((s.y - offY) % h) + h) % h;
          const alpha = reducedMotion
            ? s.baseAlpha
            : s.baseAlpha * (0.55 + 0.45 * Math.sin(time * 0.001 * cfg.twinkleSpeed + s.twinkle));

          ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(x, y, s.r, 0, Math.PI * 2);
          ctx.fill();

          // Soft halo for the brightest near-layer stars.
          if (li === LAYERS.length - 1 && s.r > 1.8) {
            ctx.globalAlpha = ctx.globalAlpha * 0.18;
            ctx.beginPath();
            ctx.arc(x, y, s.r * 3.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Bright stars with diffraction spikes (parallax with the far layer).
      const fOffY = reducedMotion ? 0 : scrollY * 0.03;
      for (const f of flares) {
        const x = f.x;
        const y = (((f.y - fOffY) % h) + h) % h;
        const tw = reducedMotion ? 0.8 : 0.62 + 0.38 * Math.sin(time * 0.0006 + f.phase);
        const spike = f.r * 11 * tw;

        ctx.globalAlpha = 0.85 * tw;
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.arc(x, y, f.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.12 * tw;
        ctx.beginPath();
        ctx.arc(x, y, f.r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.5 * tw;
        ctx.strokeStyle = f.color;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(x - spike, y);
        ctx.lineTo(x + spike, y);
        ctx.moveTo(x, y - spike);
        ctx.lineTo(x, y + spike);
        ctx.stroke();
      }

      // Shooting stars.
      if (!reducedMotion) {
        meteorTimer -= dt;
        if (meteorTimer <= 0 && meteors.length < 3) {
          spawnMeteor();
          meteorTimer = 3 + Math.random() * 5;
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.age += dt;
          if (m.age >= m.life) {
            meteors.splice(i, 1);
            continue;
          }
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          const k = Math.sin((m.age / m.life) * Math.PI); // fade in → out
          const tailT = 0.16;
          const tx = m.x - m.vx * tailT;
          const ty = m.y - m.vy * tailT;

          const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
          grad.addColorStop(0, `rgba(255,255,255,${0.9 * k})`);
          grad.addColorStop(0.3, `rgba(186,209,255,${0.45 * k})`);
          grad.addColorStop(1, "rgba(134,168,255,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineCap = "round";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          ctx.globalAlpha = 0.9 * k;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(m.x, m.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      raf = window.requestAnimationFrame(loop);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reducedMotion && !raf) {
        prevTime = 0;
        raf = requestAnimationFrame(loop);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("mousemove", onMouse, { passive: true });

    if (reducedMotion) {
      draw(0);
    } else {
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
