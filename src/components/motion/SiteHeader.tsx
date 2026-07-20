"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { PROFILE_LINKS, type Destination } from "@/lib/journey";
import { LANGUAGES, type Language } from "@/lib/journey-i18n";
import type { MotionCopy } from "@/lib/motion-i18n";

const ease = [0.22, 1, 0.36, 1] as const;

type NavItem = { id: string; name: string; href: string };

export default function SiteHeader({
  copy,
  language,
  onLanguageChange,
  destinations,
  activeId,
}: {
  copy: MotionCopy;
  language: Language;
  onLanguageChange: (next: Language) => void;
  destinations: Destination[];
  activeId: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items: NavItem[] = [
    ...destinations.map((d) => ({ id: d.id, name: d.name, href: `#chapter-${d.id}` })),
    { id: "principles", name: copy.nav.principles, href: "#principles" },
    { id: "contact", name: copy.nav.contact, href: "#contact" },
  ];

  const languageSwitch = (
    <div
      className="flex items-center rounded-full border border-white/15 p-1"
      role="group"
      aria-label={copy.a11y.language}
    >
      {LANGUAGES.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onLanguageChange(option.id)}
          aria-pressed={language === option.id}
          title={option.label}
          className={`flex h-7 min-w-8 items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold tracking-[0.08em] transition ${
            language === option.id ? "bg-[#f4f2ec] text-[#050507]" : "text-white/60 hover:text-white"
          }`}
        >
          {option.short}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <a
          href="#top"
          aria-label={copy.a11y.home}
          className="motion-title keep-italic text-2xl italic leading-none text-[#f4f2ec]"
        >
          Takeru.
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`group relative font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                activeId === item.id ? "text-[#f4f2ec]" : "text-white/45 hover:text-white/85"
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-current transition-transform duration-300 ${
                  activeId === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {languageSwitch}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
          >
            <Menu
              size={18}
              className={`absolute transition duration-300 ${
                menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              size={18}
              className={`absolute transition duration-300 ${
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
              }`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-[#050507]/92 px-7 pb-9 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="my-auto space-y-1" aria-label="Mobile navigation">
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.45, ease }}
                  className="flex w-full items-baseline gap-4 border-b border-white/10 py-3.5"
                >
                  <span className="font-mono text-[10px] text-white/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="motion-title text-3xl text-[#f4f2ec]">{item.name}</span>
                </motion.a>
              ))}
            </nav>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#f4f2ec] px-6 py-4 text-sm font-bold text-[#050507]"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
