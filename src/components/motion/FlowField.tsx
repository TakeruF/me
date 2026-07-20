"use client";

import { useEffect, useRef } from "react";

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const v = hex.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  life: number;
  bright: boolean;
};

type Star = { x: number; y: number; r: number; phase: number; speed: number };

/**
 * Fullscreen generative background, three layers deep:
 *  - twinkling stars (static positions, sinusoidal alpha)
 *  - a flow-field particle stream riding a trig-based vector field, pushed by
 *    the pointer and vertically drifted by scroll velocity
 *  - faint plexus links between nearby particles on a small subset
 * The stroke color lerps toward the `accent` prop so the whole field re-tints
 * as the active chapter changes.
 */
export default function FlowField({ accent }: { accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accent);
  accentRef.current = accent;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let lastScroll = window.scrollY;
    let scrollBoost = 0;
    let current = hexToRgb(accentRef.current);
    const pointer = { x: -9999, y: -9999, active: false };

    let particles: Particle[] = [];
    let brightParticles: Particle[] = [];
    let stars: Star[] = [];

    const spawn = (): Particle => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      return { x, y, px: x, py: y, vx: 0, vy: 0, life: 60 + Math.random() * 200, bright: false };
    };

    const paintBase = () => {
      ctx.fillStyle = "#050507";
      ctx.fillRect(0, 0, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(Math.max((w * h) / 8000, 170), 520));
      particles = Array.from({ length: count }, (_, index) => {
        const particle = spawn();
        particle.bright = index % 5 === 0;
        return particle;
      });
      brightParticles = particles.filter((particle) => particle.bright);

      const starCount = Math.round(Math.min(Math.max((w * h) / 16000, 50), 150));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
      }));

      paintBase();
    };

    // Cheap layered-trig stand-in for a noise field.
    const field = (x: number, y: number, time: number) =>
      Math.sin(x * 0.0021 + time * 0.32) +
      Math.cos(y * 0.0017 - time * 0.21) +
      Math.sin((x + y) * 0.0009 + time * 0.12);

    const drawStars = (time: number, twinkle: boolean) => {
      ctx.fillStyle = "rgba(244,242,236,1)";
      for (const star of stars) {
        ctx.globalAlpha = twinkle
          ? 0.16 + 0.32 * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase))
          : 0.3;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const advance = (particle: Particle) => {
      const angle = field(particle.x, particle.y, t) * Math.PI;
      particle.vx += Math.cos(angle) * 0.06;
      particle.vy += Math.sin(angle) * 0.06 + scrollBoost * 0.02;

      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > 0.01 && d2 < 160 * 160) {
          const d = Math.sqrt(d2);
          const force = (1 - d / 160) * 0.9;
          particle.vx += (dx / d) * force;
          particle.vy += (dy / d) * force;
        }
      }

      particle.vx *= 0.96;
      particle.vy *= 0.96;
      particle.px = particle.x;
      particle.py = particle.y;
      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.life -= 1;
      if (
        particle.life <= 0 ||
        particle.x < -20 ||
        particle.x > w + 20 ||
        particle.y < -20 ||
        particle.y > h + 20
      ) {
        Object.assign(particle, spawn(), { bright: particle.bright });
      }
    };

    const step = () => {
      t += 0.008;

      const sy = window.scrollY;
      scrollBoost += (sy - lastScroll) * 0.06;
      lastScroll = sy;
      scrollBoost *= 0.9;

      const target = hexToRgb(accentRef.current);
      current = [
        current[0] + (target[0] - current[0]) * 0.04,
        current[1] + (target[1] - current[1]) * 0.04,
        current[2] + (target[2] - current[2]) * 0.04,
      ];
      const [r, g, b] = current.map(Math.round);

      // Trail fade toward the base color.
      ctx.fillStyle = "rgba(5,5,7,0.08)";
      ctx.fillRect(0, 0, w, h);

      drawStars(t * 1.6, true);

      // Plexus links on a small subset, before positions advance.
      const linkCount = Math.min(64, particles.length);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < linkCount; i++) {
        const a = particles[i];
        for (let j = i + 1; j < linkCount; j++) {
          const bq = particles[j];
          const dx = a.x - bq.x;
          const dy = a.y - bq.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 10000) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - Math.sqrt(d2) / 100) * 0.13})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bq.x, bq.y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) advance(particle);

      // Dust: one batched thin stroke.
      ctx.strokeStyle = `rgba(${r},${g},${b},0.42)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const particle of particles) {
        if (particle.bright) continue;
        ctx.moveTo(particle.px, particle.py);
        ctx.lineTo(particle.x, particle.y);
      }
      ctx.stroke();

      // Bright particles: thicker, more opaque trails, also batched.
      ctx.strokeStyle = `rgba(${r},${g},${b},0.68)`;
      ctx.lineWidth = 1.7;
      ctx.beginPath();
      for (const particle of brightParticles) {
        ctx.moveTo(particle.px, particle.py);
        ctx.lineTo(particle.x, particle.y);
      }
      ctx.stroke();

      raf = requestAnimationFrame(step);
    };

    const drawStatic = () => {
      // Reduced motion: one calm, static scatter and no loop.
      paintBase();
      drawStars(0, false);
      const [r, g, b] = current;
      ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
      for (const particle of particles) {
        const size = particle.bright ? 2 : 1.2;
        ctx.fillRect(particle.x, particle.y, size, size);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      drawStatic();
      window.addEventListener("resize", drawStatic);
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", drawStatic);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
