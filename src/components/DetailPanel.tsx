"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { CelestialBody } from "@/lib/universe";

interface DetailPanelProps {
  body: CelestialBody | null;
  onClose: () => void;
}

export default function DetailPanel({ body, onClose }: DetailPanelProps) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!body) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [body, onClose]);

  return (
    <AnimatePresence>
      {body && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-void-900/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="panel-title"
            className="glass relative w-full max-w-lg overflow-hidden rounded-3xl p-7 sm:p-9"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 26 }}
          >
            {/* Accent wash keyed to the body */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-3xl"
              style={{ background: `radial-gradient(circle, ${body.glow}, transparent 70%)` }}
            />

            <div className="relative flex items-start gap-4">
              {/* Mini emblem */}
              <div
                className="mt-1 h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 32% 28%, ${body.gradient[0]}, ${body.gradient[1]} 55%, ${body.gradient[2]} 100%)`,
                  boxShadow: `0 0 20px -4px ${body.glow}`,
                }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-nebula-cyan">
                  {body.designation}
                </p>
                <h2 id="panel-title" className="text-gradient mt-1 font-display text-3xl font-bold leading-tight">
                  {body.name}
                </h2>
                <p className="mt-1 text-sm text-white/60">{body.role}</p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <p className="relative mt-6 text-[15px] leading-relaxed text-white/75">
              {body.description}
            </p>

            <div className="relative mt-6 flex flex-wrap gap-2">
              {body.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>

            {body.href && (
              <a
                href={body.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-void-900 outline-none transition hover:gap-3 focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {body.cta ?? "Open"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
