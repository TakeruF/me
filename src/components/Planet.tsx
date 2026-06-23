"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMemo } from "react";
import type { CelestialBody } from "@/lib/universe";

interface PlanetProps {
  body: CelestialBody;
  index: number;
  /** Normalized pointer (-1..1) from the scene, as motion values. */
  mx: MotionValue<number>;
  my: MotionValue<number>;
  onSelect: (body: CelestialBody) => void;
}

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 } as const;

export default function Planet({ body, index, mx, my, onSelect }: PlanetProps) {
  const reduce = useReducedMotion();
  const { gradient, glow, size, depth } = body;

  // Mouse-reactive tilt + parallax, scaled by depth (closer = reacts more).
  const tilt = 9 * depth;
  const shift = 26 * depth;
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-tilt, tilt]), SPRING);
  const rotateX = useSpring(useTransform(my, [-1, 1], [tilt, -tilt]), SPRING);
  const tx = useSpring(useTransform(mx, [-1, 1], [-shift, shift]), SPRING);
  const ty = useSpring(useTransform(my, [-1, 1], [-shift, shift]), SPRING);

  // Per-planet organic float timing.
  const float = useMemo(
    () => ({
      amplitude: 6 + depth * 10,
      duration: 7 + (index % 4) * 1.4,
      delay: index * 0.5,
    }),
    [depth, index],
  );

  const moons = body.moons ?? 0;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(body)}
      aria-label={`${body.name} — ${body.designation}. ${body.tagline}. Open details.`}
      className="group perspective absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full outline-none"
      style={{ width: `calc(${size}px * var(--planet-scale, 1))`, height: `calc(${size}px * var(--planet-scale, 1))` }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Float layer */}
      <motion.div
        className="relative h-full w-full"
        animate={reduce ? undefined : { y: [0, -float.amplitude, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: float.duration, delay: float.delay, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Tilt / parallax layer */}
        <motion.div
          className="preserve-3d relative h-full w-full transition-transform"
          style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", ...SPRING }}
        >
          {/* Glow halo */}
          <div
            className="absolute -inset-6 rounded-full opacity-50 blur-2xl transition-all duration-500 group-hover:-inset-10 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
            aria-hidden="true"
          />

          {/* Planetary ring (behind sphere center, in 3D) */}
          {body.ring && (
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "168%",
                height: "168%",
                transform: "translate(-50%, -50%) rotateX(74deg) rotateZ(8deg)",
                border: `2px solid ${glow}55`,
                boxShadow: `0 0 28px -6px ${glow}aa, inset 0 0 22px -8px ${glow}aa`,
              }}
            />
          )}

          {/* Sphere body */}
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              backgroundImage: `radial-gradient(circle at 32% 28%, ${gradient[0]}, ${gradient[1]} 52%, ${gradient[2]} 100%)`,
              boxShadow: `inset -14px -16px 34px rgba(0,0,0,0.55), inset 10px 12px 26px ${gradient[0]}33`,
            }}
          >
            {/* Rotating surface bands → sense of spin */}
            <div
              className="absolute inset-[-30%] animate-spin-slow opacity-40"
              style={{
                background: `repeating-linear-gradient(118deg, ${gradient[0]}22 0 10px, transparent 10px 26px), radial-gradient(circle at 70% 30%, ${gradient[0]}33, transparent 45%)`,
                mixBlendMode: "soft-light",
              }}
              aria-hidden="true"
            />
            {/* Day/night terminator */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle at 74% 78%, transparent 38%, rgba(0,0,0,0.6) 100%)" }}
              aria-hidden="true"
            />
            {/* Specular highlight */}
            <div
              className="absolute rounded-full blur-[3px]"
              style={{
                top: "13%",
                left: "17%",
                width: "30%",
                height: "24%",
                background: "radial-gradient(circle, rgba(255,255,255,0.8), transparent 72%)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Orbiting moons */}
          {Array.from({ length: moons }).map((_, m) => {
            const dur = 16 + m * 9;
            const radius = 64 + m * 14; // % of sphere from center
            return (
              <div
                key={m}
                aria-hidden="true"
                className="absolute inset-0"
                style={
                  reduce
                    ? { transform: `rotate(${m * 120}deg)` }
                    : { animation: `spin-slow ${dur}s linear infinite`, animationDelay: `${m * -4}s` }
                }
              >
                <span
                  className="absolute left-1/2 top-1/2 block rounded-full"
                  style={{
                    width: `calc(${8 + m * 2}px * var(--planet-scale, 1))`,
                    height: `calc(${8 + m * 2}px * var(--planet-scale, 1))`,
                    transform: `translate(-50%, -50%) translateY(-${radius}%)`,
                    background: `radial-gradient(circle at 35% 30%, #fff, ${glow})`,
                    boxShadow: `0 0 12px -2px ${glow}`,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Label */}
      <div className="pointer-events-none absolute left-1/2 top-full mt-5 w-max -translate-x-1/2 text-center">
        <div className="text-sm font-semibold tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
          {body.name}
        </div>
        <div className="mt-1 max-w-[15rem] overflow-hidden text-xs text-white/0 opacity-0 transition-all duration-300 group-hover:text-nebula-cyan group-hover:opacity-100 group-focus-visible:text-nebula-cyan group-focus-visible:opacity-100">
          {body.tagline}
        </div>
      </div>

      {/* Focus ring for keyboard users */}
      <span className="pointer-events-none absolute -inset-3 rounded-full ring-2 ring-transparent transition group-focus-visible:ring-white/40" aria-hidden="true" />
    </motion.button>
  );
}
