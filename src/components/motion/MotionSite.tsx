"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { DESTINATIONS } from "@/lib/journey";
import { LANGUAGES, UI_COPY, localizeDestination, type Language } from "@/lib/journey-i18n";
import { MOTION_COPY } from "@/lib/motion-i18n";
import Chapter from "@/components/motion/Chapter";
import CursorGlow from "@/components/motion/CursorGlow";
import FlowField from "@/components/motion/FlowField";
import Hero from "@/components/motion/Hero";
import Marquee from "@/components/motion/Marquee";
import Principles from "@/components/motion/Principles";
import SiteFooter from "@/components/motion/SiteFooter";
import SiteHeader from "@/components/motion/SiteHeader";

const DEFAULT_ACCENT = "#818cf8";

export default function MotionSite() {
  const reducedMotion = useReducedMotion();
  const [language, setLanguage] = useState<Language>("en");
  const [activeId, setActiveId] = useState("");

  const copy = MOTION_COPY[language];
  const destinations = useMemo(
    () => DESTINATIONS.map((destination) => localizeDestination(destination, language)),
    [language],
  );
  const accent = DESTINATIONS.find((destination) => destination.id === activeId)?.accent ?? DEFAULT_ACCENT;

  // Scroll velocity → subtle skew on the whole content column.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-1600, 1600], [2.2, -2.2]);

  useEffect(() => {
    const saved = window.localStorage.getItem("takeru-language");
    if (saved === "en" || saved === "ja" || saved === "zh") setLanguage(saved);
  }, []);

  useEffect(() => {
    const htmlLanguage = LANGUAGES.find(({ id }) => id === language)?.htmlLang ?? "en";
    document.documentElement.lang = htmlLanguage;
  }, [language]);

  // Track which section is in view → re-tint the flow field + header nav.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute("data-chapter") ?? "");
          }
        }
      },
      { threshold: 0.35 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("takeru-language", next);
  };

  return (
    <div
      className="motion-site relative min-h-screen"
      data-language={language}
      style={{ "--accent": accent } as CSSProperties}
    >
      <FlowField accent={accent} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="aurora-blob aurora-blob-one" />
        <div className="aurora-blob aurora-blob-two" />
        <div className="aurora-blob aurora-blob-three" />
      </div>
      <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[2]" />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60]" />
      <CursorGlow />
      <SiteHeader
        copy={copy}
        language={language}
        onLanguageChange={changeLanguage}
        destinations={destinations}
        activeId={activeId}
      />
      <motion.main className="relative z-10" style={reducedMotion ? undefined : { skewY }}>
        <Hero copy={copy} language={language} />
        <Marquee items={DESTINATIONS.map(({ name, accent: itemAccent }) => ({ name, accent: itemAccent }))} />
        {destinations.map((destination, index) => (
          <Chapter key={destination.id} destination={destination} copy={copy} position={index} />
        ))}
        <Principles copy={copy} principles={UI_COPY[language].principles} />
        <SiteFooter copy={copy} />
      </motion.main>
    </div>
  );
}
