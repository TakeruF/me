"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { UNIVERSE } from "@/lib/universe";

export default function OrbitNav() {
  const [active, setActive] = useState<string | null>(null);

  // Highlight the body nearest the viewport center.
  useEffect(() => {
    const targets = UNIVERSE.map((b) => document.getElementById(`body-${b.id}`)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.replace("body-", ""));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(`body-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.nav
      aria-label="Universe navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <ul className="flex flex-col items-end gap-4">
        {UNIVERSE.map((b) => {
          const isActive = active === b.id;
          return (
            <li key={b.id} className="group flex items-center gap-3">
              <span
                className={`pointer-events-none whitespace-nowrap text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive ? "text-white opacity-100" : "text-white/60 opacity-0 group-hover:opacity-100"
                }`}
              >
                {b.name}
              </span>
              <button
                type="button"
                onClick={() => jump(b.id)}
                aria-label={`Jump to ${b.name}`}
                aria-current={isActive ? "true" : undefined}
                className="relative flex h-3 w-3 items-center justify-center outline-none"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive ? "h-3 w-3" : "h-2 w-2 bg-white/40 group-hover:bg-white/70"
                  }`}
                  style={isActive ? { background: b.glow, boxShadow: `0 0 12px ${b.glow}` } : undefined}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
