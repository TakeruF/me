"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/lib/journey-i18n";
import type { MotionCopy } from "@/lib/motion-i18n";
import KineticText from "@/components/motion/KineticText";

export default function Hero({ copy, language }: { copy: MotionCopy; language: Language }) {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const locale = language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : "en-GB";
    const update = () =>
      setClock(
        new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [language]);

  return (
    <section
      id="top"
      data-chapter=""
      className="relative flex min-h-[100svh] flex-col justify-center px-5 pb-24 pt-28 sm:px-10 lg:px-16"
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 sm:text-xs">
        {copy.hero.kicker}
      </p>

      <h1 className="motion-title mt-6 text-balance text-[clamp(3.1rem,11.5vw,10rem)] leading-[0.98] tracking-[-0.03em] text-[#f4f2ec]">
        <KineticText text={copy.hero.statement[0]} className="block" />
        <KineticText
          text={copy.hero.statement[1]}
          className="accent-text block italic"
          delay={0.18}
        />
      </h1>

      <p className="mt-8 max-w-md text-sm font-medium leading-relaxed text-white/60 sm:text-[15px]">
        {copy.hero.caption}
      </p>

      <div className="absolute inset-x-5 bottom-8 flex items-end justify-between sm:inset-x-10 lg:inset-x-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <p>{copy.hero.local}</p>
          <p className="mt-1 text-sm font-bold tracking-[0.12em] text-white/80" suppressHydrationWarning>
            {clock}
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-white/40">
            {copy.hero.scroll}
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-white/15" aria-hidden="true">
            <span className="cue-dot absolute left-0 top-0 h-full w-full bg-[#f4f2ec]" />
          </span>
        </div>
      </div>
    </section>
  );
}
