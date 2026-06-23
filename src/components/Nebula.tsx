"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Blob {
  className: string;
  color: string;
  drift: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}

const BLOBS: Blob[] = [
  {
    className: "left-[-10%] top-[2%] h-[55vh] w-[55vh]",
    color: "rgba(124, 58, 237, 0.40)", // purple
    drift: { x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 26,
  },
  {
    className: "right-[-8%] top-[18%] h-[60vh] w-[60vh]",
    color: "rgba(34, 211, 238, 0.28)", // cyan
    drift: { x: [0, -50, 30, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 32,
  },
  {
    className: "left-[20%] bottom-[-12%] h-[65vh] w-[65vh]",
    color: "rgba(59, 130, 246, 0.30)", // blue
    drift: { x: [0, 40, -40, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 1, 1] },
    duration: 38,
  },
  {
    className: "right-[14%] bottom-[2%] h-[45vh] w-[45vh]",
    color: "rgba(217, 70, 239, 0.22)", // magenta
    drift: { x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.05, 0.92, 1] },
    duration: 30,
  },
];

export default function Nebula() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-screen blur-[90px] ${b.className}`}
          style={{
            background: `radial-gradient(circle at 50% 50%, ${b.color}, transparent 68%)`,
          }}
          animate={
            reduce
              ? undefined
              : { x: b.drift.x, y: b.drift.y, scale: b.drift.scale }
          }
          transition={
            reduce
              ? undefined
              : { duration: b.duration, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
      {/* Subtle vignette to anchor the foreground content. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_55%,rgba(3,4,10,0.85))]" />
    </div>
  );
}
