"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Planet from "@/components/Planet";
import { UNIVERSE, type CelestialBody } from "@/lib/universe";

interface UniverseMapProps {
  onSelect: (body: CelestialBody) => void;
  interactive: boolean;
}

// Constellation layout — x / y as a percentage of the scene box.
const LAYOUT: Record<string, { x: number; y: number }> = {
  hanlu: { x: 50, y: 15 },
  language: { x: 25, y: 35 },
  ai: { x: 74, y: 53 },
  economics: { x: 28, y: 72 },
  future: { x: 72, y: 89 },
};

// Order used to draw the path connecting the bodies.
const ORDER = ["hanlu", "language", "ai", "economics", "future"];

function buildPath() {
  const pts = ORDER.map((id) => LAYOUT[id]);
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const midY = (prev.y + cur.y) / 2;
    // Smooth S-curve between successive bodies.
    d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`;
  }
  return d;
}

export default function UniverseMap({ onSelect, interactive }: UniverseMapProps) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Subtle scroll-driven camera: gentle scale as the map enters/leaves view.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const camScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.97]);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive, mx, my]);

  const path = buildPath();

  return (
    <section ref={sectionRef} id="universe" className="universe-scene relative">
      {/* Intro label */}
      <div className="sticky top-0 z-10 flex justify-center pt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">The Map</p>
          <h2 className="text-gradient mt-2 font-display text-3xl font-bold sm:text-4xl">
            Explore the universe
          </h2>
          <p className="mt-2 text-sm text-white/45">Hover to glow · click a body to dock in</p>
        </motion.div>
      </div>

      {/* Constellation field */}
      <motion.div
        className="relative mx-auto h-[210vh] w-full max-w-6xl"
        style={reduce ? undefined : { scale: camScale }}
      >
        {/* Connector lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.0" />
              <stop offset="35%" stopColor="#6366f1" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5eead4" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#orbit-line)" strokeWidth="0.18" vectorEffect="non-scaling-stroke" />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#orbit-line)"
            strokeWidth="0.35"
            strokeDasharray="0.6 3"
            vectorEffect="non-scaling-stroke"
            animate={reduce ? undefined : { strokeDashoffset: [0, -36] }}
            transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Planets */}
        {UNIVERSE.map((body, i) => {
          const pos = LAYOUT[body.id];
          return (
            <div
              key={body.id}
              id={`body-${body.id}`}
              className="absolute"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, scrollMarginTop: "40vh" }}
            >
              <Planet body={body} index={i} mx={mx} my={my} onSelect={onSelect} />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
