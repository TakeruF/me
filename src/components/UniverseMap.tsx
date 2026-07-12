"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import ISS from "@/components/ISS";
import Planet from "@/components/Planet";
import { UNIVERSE, type CelestialBody } from "@/lib/universe";

interface UniverseMapProps {
  onSelect: (body: CelestialBody) => void;
  interactive: boolean;
}

// Orbital parameters per body: radii as % of the scene box, start angle in
// degrees, angular speed in deg/s, and a small tilt of each orbital plane.
// The ry/rx ratio + perspective projection give the system its 3D look.
const ORBITS: Record<
  string,
  { rx: number; ry: number; start: number; speed: number; tilt: number }
> = {
  hanlu: { rx: 25, ry: 11, start: 205, speed: 1.5, tilt: -4 },
  language: { rx: 32, ry: 14, start: 338, speed: 1.2, tilt: 3 },
  ai: { rx: 38, ry: 17, start: 62, speed: 0.95, tilt: -2 },
  economics: { rx: 43, ry: 19.5, start: 148, speed: 0.75, tilt: 5 },
  future: { rx: 48, ry: 22, start: 266, speed: 0.6, tilt: -3 },
};

const DEG = Math.PI / 180;
// Perspective strength: how much the near side of an orbit swells toward the
// camera (position, planet scale) and the far side recedes.
const PERSP = 0.32;

/** Project an orbital angle to screen space (% offsets from the center). */
function project(a: number, cfg: { rx: number; ry: number; tilt: number }) {
  const sin = Math.sin(a);
  const cos = Math.cos(a);
  const p = 1 / (1 - PERSP * sin); // sin > 0 → near side → magnified
  const x = cos * cfg.rx * p;
  const y = sin * cfg.ry * p;
  const t = cfg.tilt * DEG;
  return {
    x: x * Math.cos(t) - y * Math.sin(t),
    y: x * Math.sin(t) + y * Math.cos(t),
    depth: sin, // -1 far … 1 near
    scale: p,
  };
}

/** SVG path (in a 0–100 box) for the near or far half of an orbit. */
function ringPath(cfg: { rx: number; ry: number; tilt: number }, half: "near" | "far") {
  const from = half === "near" ? 0 : 180;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const a = (from + i * 3) * DEG;
    const { x, y } = project(a, cfg);
    pts.push(`${(50 + x).toFixed(2)} ${(50 + y).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export default function UniverseMap({ onSelect, interactive }: UniverseMapProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const bodyRefs = useRef(new Map<string, HTMLDivElement>());
  const hoveredId = useRef<string | null>(null);
  const applyRef = useRef<(() => void) | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Subtle scroll-driven camera: gentle scale as the map enters/leaves view.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const camScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.96]);

  // Mouse-driven camera tilt → the whole system reads as a 3D scene.
  const TILT_SPRING = { stiffness: 60, damping: 20, mass: 1 } as const;
  const camRotX = useSpring(useTransform(my, [-1, 1], [3.5, -3.5]), TILT_SPRING);
  const camRotY = useSpring(useTransform(mx, [-1, 1], [-3.5, 3.5]), TILT_SPRING);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, mx, my]);

  // Orbital motion driver: positions every body around the ISS each frame.
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    let w = 0;
    let h = 0;
    const measure = () => {
      w = field.offsetWidth;
      h = field.offsetHeight;
    };
    measure();

    const angles = new Map<string, number>(
      UNIVERSE.map((b) => [b.id, (ORBITS[b.id]?.start ?? 0) * DEG]),
    );
    const zCache = new Map<string, string>();

    const apply = () => {
      for (const b of UNIVERSE) {
        const el = bodyRefs.current.get(b.id);
        const cfg = ORBITS[b.id];
        if (!el || !cfg) continue;
        const { x, y, depth, scale } = project(angles.get(b.id)!, cfg);
        el.style.transform = `translate3d(${(x / 100) * w}px, ${(y / 100) * h}px, 0) scale(${scale.toFixed(3)})`;
        // Depth cues: farther → dimmer; z-order tracks depth continuously.
        el.style.filter = `brightness(${(0.72 + 0.34 * (depth + 1) * 0.5).toFixed(3)})`;
        const z = hoveredId.current === b.id ? "40" : String(7 + Math.round((depth + 1) * 9));
        if (zCache.get(b.id) !== z) {
          el.style.zIndex = z;
          zCache.set(b.id, z);
        }
      }
    };
    applyRef.current = apply;

    if (reduce) {
      apply();
      const onResize = () => {
        measure();
        apply();
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        applyRef.current = null;
      };
    }

    let raf = 0;
    let last = performance.now();
    let flow = 1; // eases to 0 while a body is hovered → orbits pause gently

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      flow += ((hoveredId.current ? 0 : 1) - flow) * 0.06;
      for (const b of UNIVERSE) {
        const cfg = ORBITS[b.id];
        if (!cfg) continue;
        angles.set(b.id, angles.get(b.id)! + cfg.speed * DEG * dt * flow);
      }
      apply();
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => measure();
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
      applyRef.current = null;
    };
  }, [reduce]);

  const setHovered = (id: string | null) => {
    hoveredId.current = id;
    applyRef.current?.();
  };

  const ringLayer = (half: "near" | "far") => (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: half === "near" ? 17 : 6 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {UNIVERSE.map((b) => {
        const cfg = ORBITS[b.id];
        if (!cfg) return null;
        return (
          <path
            key={b.id}
            d={ringPath(cfg, half)}
            fill="none"
            stroke={half === "near" ? "rgba(165,180,252,0.3)" : "rgba(165,180,252,0.1)"}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );

  return (
    <section ref={sectionRef} id="universe" className="universe-scene relative overflow-hidden py-24">
      {/* Intro label */}
      <div className="relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">The Station</p>
          <h2 className="text-gradient animate-aurora mt-2 font-display text-3xl font-bold sm:text-4xl">
            Explore the universe
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Everything orbits the ISS · hover to zoom in · click a body to dock in
          </p>
        </motion.div>
      </div>

      {/* Orbital field (inside a perspective camera) */}
      <div className="perspective">
        <motion.div
          ref={fieldRef}
          className="relative mx-auto mt-8 h-[100vh] min-h-[640px] w-full max-w-6xl"
          style={
            reduce
              ? undefined
              : interactive
                ? { scale: camScale, rotateX: camRotX, rotateY: camRotY }
                : { scale: camScale }
          }
        >
          {/* Far halves of the orbits (behind the station) */}
          {ringLayer("far")}

          {/* ISS at the center of it all */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 16 }}
          >
            <ISS />
          </div>

          {/* Near halves of the orbits (in front of the station) */}
          {ringLayer("near")}

          {/* Orbiting bodies */}
          {UNIVERSE.map((body, i) => (
            <div
              key={body.id}
              id={`body-${body.id}`}
              ref={(el) => {
                if (el) bodyRefs.current.set(body.id, el);
                else bodyRefs.current.delete(body.id);
              }}
              className="absolute left-1/2 top-1/2"
              style={{ scrollMarginTop: "40vh", zIndex: 16 }}
              onPointerEnter={() => setHovered(body.id)}
              onPointerLeave={() => setHovered(null)}
            >
              <Planet body={body} index={i} mx={mx} my={my} onSelect={onSelect} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
