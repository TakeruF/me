"use client";

import { motion, useReducedMotion } from "framer-motion";

// Film grain (SVG turbulence, tiled). Kills gradient banding and adds texture.
const GRAIN =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.6'/></svg>`,
  );

interface Blob {
  className: string;
  background: string;
  drift: { x: number[]; y: number[]; scale: number[] };
  duration: number;
}

// Nebula clouds — layered, vivid cores fading into cold space.
const BLOBS: Blob[] = [
  {
    className: "left-[-12%] top-[-4%] h-[70vh] w-[70vh]",
    background:
      "radial-gradient(circle at 42% 45%, rgba(168,85,247,0.5), rgba(124,58,237,0.26) 42%, transparent 70%)",
    drift: { x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 26,
  },
  {
    className: "right-[-10%] top-[12%] h-[74vh] w-[74vh]",
    background:
      "radial-gradient(circle at 55% 45%, rgba(34,211,238,0.34), rgba(14,116,144,0.18) 46%, transparent 72%)",
    drift: { x: [0, -50, 30, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.1, 1] },
    duration: 32,
  },
  {
    className: "left-[16%] bottom-[-16%] h-[80vh] w-[80vh]",
    background:
      "radial-gradient(circle at 50% 55%, rgba(59,130,246,0.36), rgba(30,58,138,0.2) 44%, transparent 72%)",
    drift: { x: [0, 40, -40, 0], y: [0, -40, 20, 0], scale: [1, 1.1, 1, 1] },
    duration: 38,
  },
  {
    className: "right-[10%] bottom-[-6%] h-[52vh] w-[52vh]",
    background:
      "radial-gradient(circle at 48% 50%, rgba(217,70,239,0.3), rgba(134,25,143,0.14) 46%, transparent 70%)",
    drift: { x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 1.05, 0.92, 1] },
    duration: 30,
  },
  {
    // A warm star-forming region — the small amber heart that makes the
    // palette feel like a telescope photo instead of a flat duotone.
    className: "left-[54%] top-[38%] h-[30vh] w-[30vh]",
    background:
      "radial-gradient(circle at 50% 50%, rgba(253,186,116,0.2), rgba(194,111,52,0.08) 45%, transparent 70%)",
    drift: { x: [0, 24, -16, 0], y: [0, -18, 12, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 34,
  },
];

export default function Nebula() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Milky-way band sweeping diagonally across the sky */}
      <motion.div
        className="absolute left-[-30%] top-[24%] h-[54vh] w-[160%] mix-blend-screen blur-3xl"
        style={{
          rotate: -16,
          background: [
            "radial-gradient(60% 42% at 30% 50%, rgba(226,232,255,0.10), transparent 70%)",
            "radial-gradient(50% 34% at 55% 46%, rgba(199,210,254,0.12), transparent 70%)",
            "radial-gradient(44% 30% at 74% 55%, rgba(165,243,252,0.08), transparent 70%)",
            "radial-gradient(24% 20% at 44% 52%, rgba(233,213,255,0.10), transparent 70%)",
            "linear-gradient(90deg, transparent 4%, rgba(148,163,216,0.055) 28%, rgba(191,201,255,0.085) 52%, rgba(148,163,216,0.05) 76%, transparent 96%)",
          ].join(","),
        }}
        animate={reduce ? undefined : { x: [0, 50, -30, 0] }}
        transition={reduce ? undefined : { duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Dark dust lane inside the band — real milky-way shots are split by it */}
      <div
        className="absolute left-[-20%] top-[38%] h-[9vh] w-[150%] blur-2xl"
        style={{
          rotate: "-16deg",
          background:
            "linear-gradient(90deg, transparent 8%, rgba(3,4,10,0.5) 34%, rgba(3,4,10,0.62) 55%, rgba(3,4,10,0.42) 78%, transparent 94%)",
        }}
      />

      {/* Distant spiral galaxy, slowly turning */}
      <motion.div
        className="absolute right-[6%] top-[7%] h-[36vh] w-[36vh] mix-blend-screen"
        style={{ opacity: 0.5 }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 240, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-full w-full rounded-full blur-xl"
          style={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(255,244,214,0.5) 0%, rgba(255,226,183,0.16) 7%, transparent 16%)",
              "conic-gradient(from 0deg, transparent 0deg, rgba(199,210,254,0.20) 40deg, transparent 110deg, transparent 180deg, rgba(186,230,253,0.18) 220deg, transparent 290deg)",
            ].join(","),
            transform: "scaleY(0.48) rotate(24deg)",
          }}
        />
      </motion.div>

      {/* Nebula clouds */}
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full mix-blend-screen blur-[90px] ${b.className}`}
          style={{ background: b.background }}
          animate={reduce ? undefined : { x: b.drift.x, y: b.drift.y, scale: b.drift.scale }}
          transition={reduce ? undefined : { duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Vignette to anchor the foreground content */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_50%,rgba(2,3,8,0.9))]" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
