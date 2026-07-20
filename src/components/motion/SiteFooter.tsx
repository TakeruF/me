"use client";

import { ArrowUpRight } from "lucide-react";
import { PROFILE_LINKS } from "@/lib/journey";
import type { MotionCopy } from "@/lib/motion-i18n";
import KineticText from "@/components/motion/KineticText";

export default function SiteFooter({ copy }: { copy: MotionCopy }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" data-chapter="" className="relative px-5 pb-10 pt-28 sm:px-10 sm:pt-36 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="motion-title text-[clamp(2.8rem,9vw,8rem)] leading-[0.98] tracking-[-0.03em] text-[#f4f2ec]">
          <KineticText text={copy.footer.title[0]} className="block" />
          <KineticText text={copy.footer.title[1]} className="accent-text block italic" delay={0.15} />
        </h2>

        <p className="mt-7 max-w-lg text-sm font-medium leading-relaxed text-white/60 sm:text-[15px]">
          {copy.footer.body}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[#f4f2ec] px-6 py-3 text-sm font-bold text-[#050507] transition hover:gap-3.5"
          >
            GitHub
            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
          </a>
          <a
            href={PROFILE_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white/85 transition hover:gap-3.5 hover:border-white/60"
          >
            LinkedIn
            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <div className="mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-white/12 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          <p>© {year} Takeru Fujii</p>
          <p>{copy.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
