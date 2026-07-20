"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { Destination } from "@/lib/journey";
import type { MotionCopy } from "@/lib/motion-i18n";
import GlyphField from "@/components/motion/GlyphField";
import KineticText from "@/components/motion/KineticText";

export default function Chapter({
  destination,
  copy,
  position,
}: {
  destination: Destination;
  copy: MotionCopy;
  /** 0-based order; drives left/right alternation. */
  position: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], [90, -90]);

  const flip = position % 2 === 1;

  return (
    <section
      ref={ref}
      id={`chapter-${destination.id}`}
      data-chapter={destination.id}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-28 sm:px-10 lg:px-16"
      aria-label={destination.name}
    >
      <GlyphField id={destination.id} accent={destination.accent} />

      <motion.span
        aria-hidden="true"
        className={`motion-title pointer-events-none absolute top-1/2 select-none text-[34vw] italic leading-none md:text-[26vw] ${
          flip ? "left-[-3%]" : "right-[-3%]"
        }`}
        style={{
          y: numberY,
          translateY: "-50%",
          color: "transparent",
          WebkitTextStroke: "1px rgba(244,242,236,0.13)",
        }}
      >
        {destination.index}
      </motion.span>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl md:grid-cols-2">
        <motion.div
          className={flip ? "md:col-start-1" : "md:col-start-2"}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-white/50">
            <span>
              {copy.chapter.label} {destination.index}
            </span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: destination.accent }} />
            <span className="text-white/75">{destination.eyebrow}</span>
          </div>

          <h2 className="motion-title mt-6 text-[clamp(2.4rem,6vw,4.9rem)] leading-[1.02] tracking-[-0.025em] text-[#f4f2ec]">
            <KineticText text={destination.title[0]} className="block" />
            <span style={{ color: destination.accent }}>
              <KineticText text={destination.title[1]} className="block italic" delay={0.12} />
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-sm font-medium leading-relaxed text-white/65 sm:text-[15px]">
            {destination.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {destination.station.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/15 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.06em] text-white/70"
              >
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            {destination.href ? (
              <a
                href={destination.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#0a0a0f] transition hover:gap-3.5"
                style={{ backgroundColor: destination.accent }}
              >
                {destination.cta}
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white/80">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: destination.accent }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: destination.accent }}
                  />
                </span>
                {copy.chapter.building}
              </span>
            )}
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              {destination.location} · {destination.coordinates}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
