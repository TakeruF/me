"use client";

import { motion } from "framer-motion";
import type { MotionCopy } from "@/lib/motion-i18n";
import KineticText from "@/components/motion/KineticText";

export default function Principles({
  copy,
  principles,
}: {
  copy: MotionCopy;
  principles: readonly (readonly [string, string])[];
}) {
  return (
    <section
      id="principles"
      data-chapter=""
      className="relative px-5 py-28 sm:px-10 sm:py-36 lg:px-16"
      aria-label={copy.principles.kicker}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          {copy.principles.kicker}
        </p>
        <h2 className="motion-title mt-5 text-[clamp(2.4rem,6.5vw,5.5rem)] leading-[1.02] tracking-[-0.025em] text-[#f4f2ec]">
          <KineticText text={copy.principles.title[0]} className="block" />
          <KineticText text={copy.principles.title[1]} className="accent-text block italic" delay={0.14} />
        </h2>

        <div className="mt-16 border-b border-white/12">
          {principles.map(([title, body], index) => (
            <motion.div
              key={title}
              className="grid items-baseline gap-3 border-t border-white/12 py-8 sm:grid-cols-[72px_1.1fr_1fr] sm:gap-8 sm:py-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="accent-text font-mono text-sm font-bold tracking-[0.2em]">
                0{index + 1}
              </span>
              <h3 className="motion-title text-2xl leading-tight text-[#f4f2ec] sm:text-3xl">
                {title}
              </h3>
              <p className="text-sm font-medium leading-relaxed text-white/60">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
