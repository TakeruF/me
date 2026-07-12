"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/lib/universe";

export default function Outro() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      {/* Galactic-core glow rising behind the sign-off */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[58%] h-[80vh] w-[120vw] -translate-x-1/2 mix-blend-screen blur-3xl"
          style={{
            background:
              "radial-gradient(48% 42% at 50% 50%, rgba(168,85,247,0.22), rgba(99,102,241,0.12) 45%, transparent 72%), radial-gradient(30% 26% at 46% 46%, rgba(253,224,171,0.12), transparent 70%)",
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">End of the map</p>
        <h2 className="text-balance mt-4 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl">
          The universe is still <span className="text-gradient animate-aurora">expanding</span>.
        </h2>
        <p className="mt-5 max-w-md text-balance text-white/55">
          Building Hanlu, studying economics, and exploring what language learning
          can become. Let&apos;s build something across the stars.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white outline-none backdrop-blur-md transition hover:border-white/30 focus-visible:ring-2 focus-visible:ring-nebula-cyan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
            </svg>
            GitHub
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white outline-none backdrop-blur-md transition hover:border-white/30 focus-visible:ring-2 focus-visible:ring-nebula-cyan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
            </svg>
            LinkedIn
          </a>
        </div>

        <p className="mt-16 text-xs text-white/30">
          © {new Date().getFullYear()} {PROFILE.name} · Takeru Universe
        </p>
      </motion.div>
    </section>
  );
}
