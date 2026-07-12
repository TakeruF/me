"use client";

import { useEffect, useRef } from "react";

interface CursorCometProps {
  enabled?: boolean;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  life: number;
  r: number;
  color: [number, number, number];
}

const TRAIL_LIFE = 0.5; // seconds a trail point survives
const SPARK_COLORS: [number, number, number][] = [
  [255, 255, 255], // white
  [165, 180, 252], // indigo-300
  [103, 232, 249], // cyan-300
  [253, 230, 138], // amber-200
];

/**
 * A shooting-star cursor: a bright comet head that trails a tapering,
 * glowing tail and sheds tiny sparks as it moves. Canvas + rAF, additive
 * blending. Rendered only when `enabled` (desktop, fine pointer, motion ok).
 */
export default function CursorComet({ enabled = true }: CursorCometProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const target = { x: w / 2, y: h / 2 };
    const head = { ...target };
    const trail: TrailPoint[] = [];
    const sparks: Spark[] = [];
    let present = false; // pointer is over the page and has moved
    let visible = 0; // eased master opacity
    let raf = 0;
    let last = performance.now();

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!present) {
        present = true;
        head.x = target.x;
        head.y = target.y;
      }
    };
    const onLeave = () => {
      present = false;
    };

    const loop = (nowMs: number) => {
      const now = nowMs / 1000;
      const dt = Math.min((nowMs - last) / 1000, 0.05);
      last = nowMs;

      const px = head.x;
      const py = head.y;
      head.x += (target.x - head.x) * 0.35;
      head.y += (target.y - head.y) * 0.35;
      const dx = head.x - px;
      const dy = head.y - py;
      const speed = Math.hypot(dx, dy); // px per frame

      visible += ((present ? 1 : 0) - visible) * 0.08;

      // record the path
      if (present) trail.push({ x: head.x, y: head.y, t: now });
      while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift();
      if (trail.length > 90) trail.splice(0, trail.length - 90);

      // shed sparks when moving fast, like a meteor breaking up
      if (present && speed > 4 && sparks.length < 140) {
        const n = Math.min(3, 1 + Math.floor(speed / 14));
        for (let i = 0; i < n; i++) {
          const back = 1 + Math.random() * 2.5;
          sparks.push({
            x: head.x - dx * back + (Math.random() - 0.5) * 8,
            y: head.y - dy * back + (Math.random() - 0.5) * 8,
            vx: -dx * (2.5 + Math.random() * 3) + (Math.random() - 0.5) * 50,
            vy: -dy * (2.5 + Math.random() * 3) + (Math.random() - 0.5) * 50 + 14,
            born: now,
            life: 0.35 + Math.random() * 0.55,
            r: 0.6 + Math.random() * 1.5,
            color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
          });
        }
      }

      ctx.clearRect(0, 0, w, h);

      if (visible > 0.01) {
        ctx.globalCompositeOperation = "lighter";
        ctx.lineCap = "round";

        // tail: wide colored glow pass, then a hot white core pass
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 1; i < trail.length; i++) {
            const p0 = trail[i - 1];
            const p1 = trail[i];
            const k = 1 - (now - p1.t) / TRAIL_LIFE;
            if (k <= 0) continue;
            const e = k * k;
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            if (pass === 0) {
              ctx.strokeStyle = `rgba(129,140,248,${(0.24 * e * visible).toFixed(3)})`;
              ctx.lineWidth = 14 * e + 2.5;
            } else {
              ctx.strokeStyle = `rgba(255,255,255,${(0.7 * e * visible).toFixed(3)})`;
              ctx.lineWidth = 3.6 * e + 0.5;
            }
            ctx.stroke();
          }
        }

        // sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          const age = (now - s.born) / s.life;
          if (age >= 1) {
            sparks.splice(i, 1);
            continue;
          }
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.vx *= 0.96;
          s.vy = s.vy * 0.96 + 26 * dt; // slight gravity, like falling embers
          const a = Math.pow(1 - age, 1.6) * visible;
          ctx.globalAlpha = a;
          ctx.fillStyle = `rgb(${s.color[0]},${s.color[1]},${s.color[2]})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * (1 - age * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // comet head
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 26);
        glow.addColorStop(0, `rgba(255,255,255,${0.85 * visible})`);
        glow.addColorStop(0.22, `rgba(186,196,255,${0.4 * visible})`);
        glow.addColorStop(0.6, `rgba(103,232,249,${0.12 * visible})`);
        glow.addColorStop(1, "rgba(103,232,249,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = "source-over";
      }

      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
