"use client";

import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { getPlanetTexture } from "@/lib/planetTexture";
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
  const tilt = 8 * depth;
  const shift = 16 * depth;
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-tilt, tilt]), SPRING);
  const rotateX = useSpring(useTransform(my, [-1, 1], [tilt, -tilt]), SPRING);
  const tx = useSpring(useTransform(mx, [-1, 1], [-shift, shift]), SPRING);
  const ty = useSpring(useTransform(my, [-1, 1], [-shift, shift]), SPRING);

  // Procedural surface map, generated once on the client.
  const [texture, setTexture] = useState<string | null>(null);
  useEffect(() => {
    setTexture(getPlanetTexture(body.id, body.texture, body.gradient));
  }, [body.id, body.texture, body.gradient]);

  // Bigger worlds rotate more slowly.
  const spinDuration = useMemo(() => Math.round(34 + size * 0.32), [size]);

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
      {/* Tilt / parallax layer — zooms in while hovered or focused */}
      <motion.div
        className="preserve-3d relative h-full w-full transition-transform"
        style={reduce ? undefined : { rotateX, rotateY, x: tx, y: ty }}
        whileHover={{ scale: 1.55 }}
        whileFocus={{ scale: 1.55 }}
        whileTap={{ scale: 1.4 }}
        transition={{ type: "spring", stiffness: 150, damping: 19 }}
      >
        {/* Glow halo */}
        <div
          className="absolute -inset-6 rounded-full opacity-40 blur-2xl transition-all duration-500 group-hover:-inset-10 group-hover:opacity-90 group-focus-visible:opacity-90"
          style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
          aria-hidden="true"
        />

        {/* Planetary ring (behind sphere center, in 3D) */}
        {body.ring && (
          <>
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "182%",
                height: "182%",
                transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(9deg)",
                border: `1px solid ${glow}66`,
                boxShadow: `0 0 24px -8px ${glow}88`,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: "168%",
                height: "168%",
                transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(9deg)",
                border: `5px solid ${glow}2e`,
                boxShadow: `inset 0 0 18px -6px ${glow}77`,
              }}
            />
          </>
        )}

        {/* Sphere body */}
        <div
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{
            // fallback while the texture is generated
            backgroundImage: `radial-gradient(circle at 32% 28%, ${gradient[1]}, ${gradient[2]} 85%)`,
          }}
        >
          {/* Rotating surface map (seamless slide = planetary spin) */}
          {texture && (
            <div
              className="animate-planet-slide absolute inset-y-0 left-0 w-[200%]"
              style={{
                backgroundImage: `url(${texture})`,
                backgroundSize: "50% 100%",
                backgroundRepeat: "repeat-x",
                animationDuration: `${spinDuration}s`,
              }}
              aria-hidden="true"
            />
          )}
          {/* Sunlit limb */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.3), rgba(255,255,255,0) 48%)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />
          {/* Day/night terminator + limb darkening */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, transparent 40%, rgba(3,4,10,0.32) 72%, rgba(0,0,3,0.9) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Specular highlight */}
          <div
            className="absolute rounded-full opacity-60 blur-[3px]"
            style={{
              top: "14%",
              left: "18%",
              width: "26%",
              height: "20%",
              background: "radial-gradient(circle, rgba(255,255,255,0.75), transparent 72%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Atmosphere rim */}
        <div
          className="absolute -inset-px rounded-full"
          style={{
            boxShadow: `inset 0 0 ${Math.round(size * 0.09)}px ${glow}59, 0 0 ${Math.round(size * 0.16)}px ${Math.round(-size * 0.05)}px ${glow}73`,
          }}
          aria-hidden="true"
        />

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
