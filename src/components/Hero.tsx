"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "@/lib/universe";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  };

  const goExplore = () => {
    document.getElementById("universe")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="glass-soft mb-8 flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-nebula-cyan" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-nebula-cyan" />
          </span>
          Takeru Universe
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={item}
          className="text-balance font-display text-6xl font-bold leading-[0.95] tracking-tightest sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient">{PROFILE.name}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-balance text-lg font-light text-white/75 sm:text-xl md:text-2xl"
        >
          {PROFILE.tagline}
        </motion.p>

        <motion.p variants={item} className="mt-4 max-w-md text-balance text-sm leading-relaxed text-white/45">
          {PROFILE.intro}
        </motion.p>

        {/* CTA */}
        <motion.div variants={item} className="mt-10">
          <button
            type="button"
            onClick={goExplore}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold tracking-wide text-white outline-none backdrop-blur-md transition hover:border-white/30 focus-visible:ring-2 focus-visible:ring-nebula-cyan"
          >
            <span
              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(100deg, rgba(168,85,247,0.35), rgba(34,211,238,0.35))" }}
              aria-hidden="true"
            />
            Explore my universe
            <svg
              className="transition-transform duration-300 group-hover:translate-y-0.5"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="block h-1.5 w-1 rounded-full bg-white/70"
            animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
