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
      color: accent ? ACCENTS[(Math.random() * ACCENTS.length) | 0] : "#ffffff",
    });
  }
  return stars;
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
    const mouse = { x: 0, y: 0 }; // target, normalized -1..1
    const smooth = { x: 0, y: 0 }; // eased pointer
    let raf = 0;

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
      if (reducedMotion) draw(0); // single static paint
    };

    const draw = (time: number) => {
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
