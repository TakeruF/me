"use client";

import {
  animate,
  createDraggable,
  createScope,
  createSpring,
  createTimeline,
  stagger,
  svg,
} from "animejs";
import { ArrowDown, ArrowUpRight, Menu, Play, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { DESTINATIONS, PROFILE_LINKS } from "@/lib/journey";
import { LANGUAGES, UI_COPY, localizeDestination, type Language } from "@/lib/journey-i18n";
import { MOTION_COPY } from "@/lib/motion-i18n";

const GLYPHS: Record<string, string[]> = {
  keyboard: ["あ", "A", "か", "K", "読", "↵"],
  hanlu: ["汉", "語", "声", "意", "中", "↗"],
  shiru: ["知", "る", "記", "憶", "耳", "○"],
  "ai-studio": ["AI", "{ }", "01", "fn", "→", "✳"],
};

const SIGNAL_DOTS = Array.from({ length: 121 });
const FOOTER_DOTS = Array.from({ length: 72 });
const ORBIT_TICKS = Array.from({ length: 24 });
const MARQUEE_WORDS = ["PRODUCT", "INTERACTION", "LANGUAGE", "AI", "CODE"];

const SYSTEM_COPY = {
  en: {
    work: "Selected work",
    workTitle: "Products that turn friction into fluency.",
    project: "Project",
    status: "Status",
    replay: "Replay motion",
    drag: "Drag to explore",
    available: "Open to product and design collaborations",
    menu: "Menu",
  },
  ja: {
    work: "プロダクト",
    workTitle: "つまずきを減らし、理解と行動を前へ進める。",
    project: "プロジェクト",
    status: "公開状況",
    replay: "モーションを再生",
    drag: "ドラッグして動かす",
    available: "プロダクト・デザインの相談を受付中",
    menu: "メニュー",
  },
  zh: {
    work: "产品",
    workTitle: "减少阻力，让理解与行动继续向前。",
    project: "项目",
    status: "状态",
    replay: "重播动效",
    drag: "拖动探索",
    available: "开放产品与设计合作",
    menu: "菜单",
  },
} as const;

function CharacterLine({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span className={`anime-line ${accent ? "anime-line-accent" : ""}`} aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span className="anime-char-shell" aria-hidden="true" key={`${character}-${index}`}>
          <span className="anime-char">{character === " " ? "\u00a0" : character}</span>
        </span>
      ))}
    </span>
  );
}

function MotionMarquee() {
  const sequence = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="motion-marquee" aria-hidden="true">
      <div className="motion-marquee-track">
        {sequence.map((word, index) => (
          <span className="motion-marquee-word" key={`${word}-${index}`}>
            {word}<i />
          </span>
        ))}
      </div>
    </div>
  );
}

function PrinciplesGraphic() {
  return (
    <div className="principles-graphic" aria-hidden="true">
      <svg viewBox="0 0 1200 760" preserveAspectRatio="none">
        <path className="principle-wave" d="M-80 512C124 145 310 738 515 366C684 61 863 626 1280 162" />
        <path className="principle-wave" d="M-120 632C142 278 361 768 604 322C775 8 970 515 1272 258" />
        <path className="principle-wave principle-wave-accent" d="M-44 405C167 72 345 612 582 238C805-113 949 498 1268 88" />
        <path className="principle-wave" d="M-92 704C213 374 403 817 682 464C898 191 1052 529 1284 382" />
      </svg>
    </div>
  );
}

function MotionStage({ label }: { label: string }) {
  return (
    <div className="kinetic-stage" aria-label={label}>
      <div className="stage-grid" aria-hidden="true" />
      <div className="signal-grid" aria-hidden="true">
        {SIGNAL_DOTS.map((_, index) => <span className="signal-dot" key={index} />)}
      </div>
      <div className="orbit-ticks" aria-hidden="true">
        {ORBIT_TICKS.map((_, index) => (
          <span key={index} style={{ "--tick": index } as CSSProperties} />
        ))}
      </div>
      <svg className="stage-orbits" viewBox="0 0 640 640" aria-hidden="true">
        <circle className="hero-orbit-path orbit-a" cx="320" cy="320" r="238" />
        <ellipse className="hero-orbit-path orbit-b" cx="320" cy="320" rx="274" ry="118" />
        <path className="hero-orbit-path orbit-c" d="M94 404C185 151 414 98 552 302C644 437 504 579 317 528C169 488 127 340 225 222" />
      </svg>
      <div className="stage-axis stage-axis-x" aria-hidden="true" />
      <div className="stage-axis stage-axis-y" aria-hidden="true" />
      <div className="stage-core" aria-hidden="true">
        <span>TF</span>
        <small>2026</small>
      </div>
      <div className="stage-satellite satellite-one" aria-hidden="true" />
      <div className="stage-satellite satellite-two" aria-hidden="true" />
      <button className="drag-orb" type="button" aria-label={label} data-cursor>
        <span />
      </button>
      <p className="stage-instruction">
        <span className="stage-pulse" /> {label}
      </p>
      <div className="stage-spec" aria-hidden="true">
        <span>STAGGER / 11×11</span>
        <span>TIMELINE / ACTIVE</span>
      </div>
    </div>
  );
}

export default function AnimeSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [replayToken, setReplayToken] = useState(0);
  const [activeId, setActiveId] = useState("keyboard");
  const copy = MOTION_COPY[language];
  const systemCopy = SYSTEM_COPY[language];
  const destinations = useMemo(
    () => DESTINATIONS.map((destination) => localizeDestination(destination, language)),
    [language],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("takeru-language");
    if (saved === "en" || saved === "ja" || saved === "zh") setLanguage(saved);
  }, []);

  useEffect(() => {
    const htmlLanguage = LANGUAGES.find(({ id }) => id === language)?.htmlLang ?? "en";
    document.documentElement.lang = htmlLanguage;
  }, [language]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const scope = createScope({ root }).add(() => {
      const intro = createTimeline({ defaults: { ease: "outExpo" } });
      intro
        .add(".site-header", { opacity: [0, 1], y: [-20, 0], duration: 900 })
        .add(".hero-kicker", { opacity: [0, 1], y: [18, 0], duration: 700 }, "-=620")
        .add(
          ".anime-char",
          {
            opacity: [0, 1],
            y: ["115%", "0%"],
            rotate: [6, 0],
            duration: 1050,
            delay: stagger(34),
          },
          "-=560",
        )
        .add(".hero-caption", { opacity: [0, 1], y: [22, 0], duration: 760 }, "-=700")
        .add(".hero-meta", { opacity: [0, 1], y: [16, 0], duration: 650 }, "-=560")
        .add(".kinetic-stage", { opacity: [0, 1], scale: [0.94, 1], duration: 1100 }, "-=920");

      const drawablePaths = svg.createDrawable(".hero-orbit-path");
      animate(drawablePaths, {
        draw: ["0 0", "0 1"],
        duration: 1800,
        delay: stagger(160),
        ease: "inOutQuad",
      });

      animate(".orbit-a", { rotate: "1turn", duration: 24000, loop: true, ease: "linear" });
      animate(".orbit-b", { rotate: "-1turn", duration: 18000, loop: true, ease: "linear" });
      animate(".stage-core", {
        scale: [1, 1.045, 1],
        duration: 3200,
        loop: true,
        ease: "inOutSine",
      });
      animate(".satellite-one", {
        rotate: "1turn",
        duration: 9500,
        loop: true,
        ease: "linear",
      });
      animate(".satellite-two", {
        rotate: "-1turn",
        duration: 13000,
        loop: true,
        ease: "linear",
      });
      animate(".orbit-ticks", { rotate: "1turn", duration: 32000, loop: true, ease: "linear" });
      animate(".signal-dot", {
        opacity: [0.12, 0.9, 0.12],
        scale: [0.55, 1.8, 0.55],
        delay: stagger(34, { grid: [11, 11], from: "center" }),
        duration: 1900,
        loop: true,
        ease: "inOutSine",
      });

      animate(".motion-marquee-track", {
        x: ["0%", "-50%"],
        duration: 26000,
        loop: true,
        ease: "linear",
      });
      animate(".motion-marquee-word", {
        y: [0, -6, 0],
        delay: stagger(120),
        duration: 2200,
        loop: true,
        ease: "inOutSine",
      });

      animate(".visual-ring-one", {
        rotate: "1turn",
        duration: 18000,
        loop: true,
        ease: "linear",
      });
      animate(".visual-ring-two", {
        rotate: "-1turn",
        duration: 12000,
        loop: true,
        ease: "linear",
      });
      animate(".project-orbit-track", {
        rotate: "1turn",
        duration: 10000,
        delay: stagger(700),
        loop: true,
        ease: "linear",
      });
      animate(".project-scanline", {
        y: ["-110%", "110%"],
        duration: 3600,
        delay: stagger(420),
        loop: true,
        ease: "inOutQuad",
      });
      animate(".visual-number", {
        scale: [1, 1.025, 1],
        duration: 4600,
        delay: stagger(500),
        loop: true,
        ease: "inOutSine",
      });

      const principleDrawables = svg.createDrawable(".principle-wave");
      animate(principleDrawables, {
        draw: ["0 0", "0 1", "1 1"],
        duration: 5200,
        delay: stagger(320),
        loop: true,
        ease: "inOutQuad",
      });

      animate(".footer-motion-dot", {
        opacity: [0.16, 0.72, 0.16],
        scale: [0.7, 1.65, 0.7],
        delay: stagger(42, { grid: [12, 6], from: "last" }),
        duration: 2300,
        loop: true,
        ease: "inOutSine",
      });

      createDraggable(".drag-orb", {
        container: ".kinetic-stage",
        releaseEase: createSpring({ stiffness: 150, damping: 13 }),
        cursor: true,
      });

      const cards = Array.from(root.querySelectorAll<HTMLElement>(".work-card"));
      cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(54px)";
      });

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const card = entry.target as HTMLElement;
            animate(card, { opacity: [0, 1], y: [54, 0], duration: 1050, ease: "outExpo" });
            animate(card.querySelectorAll(".project-glyph"), {
              opacity: [0, 1],
              scale: [0.4, 1],
              rotate: () => `${Math.round(Math.random() * 30 - 15)}deg`,
              delay: stagger(70, { from: "center" }),
              duration: 900,
              ease: "outBack",
            });
            animate(card.querySelectorAll(".project-glyph"), {
              y: () => [0, Math.round(Math.random() * 14 - 7), 0],
              x: () => [0, Math.round(Math.random() * 10 - 5), 0],
              delay: stagger(130),
              duration: 3200,
              loop: true,
              ease: "inOutSine",
            });
            revealObserver.unobserve(card);
          });
        },
        { threshold: 0.24 },
      );
      cards.forEach((card) => revealObserver.observe(card));

      const projectVisuals = Array.from(root.querySelectorAll<HTMLElement>(".project-visual"));
      const onVisualEnter = (event: Event) => {
        const visual = event.currentTarget as HTMLElement;
        animate(visual.querySelectorAll(".project-glyph"), {
          scale: [1, 1.14],
          duration: 520,
          delay: stagger(45, { from: "center" }),
          ease: "outBack",
        });
      };
      const onVisualLeave = (event: Event) => {
        const visual = event.currentTarget as HTMLElement;
        animate(visual.querySelectorAll(".project-glyph"), {
          scale: 1,
          duration: 700,
          delay: stagger(35, { from: "last" }),
          ease: "outExpo",
        });
      };
      projectVisuals.forEach((visual) => {
        visual.addEventListener("pointerenter", onVisualEnter);
        visual.addEventListener("pointerleave", onVisualLeave);
      });

      const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-work-id]"));
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveId((visible.target as HTMLElement).dataset.workId ?? "keyboard");
        },
        { threshold: [0.3, 0.55, 0.8] },
      );
      sections.forEach((section) => sectionObserver.observe(section));

      let frame = 0;
      const updateScroll = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(() => {
          const distance = document.documentElement.scrollHeight - window.innerHeight;
          const progress = distance > 0 ? window.scrollY / distance : 0;
          root.style.setProperty("--scroll-progress", String(progress));
          frame = 0;
        });
      };
      updateScroll();
      window.addEventListener("scroll", updateScroll, { passive: true });

      return () => {
        revealObserver.disconnect();
        sectionObserver.disconnect();
        projectVisuals.forEach((visual) => {
          visual.removeEventListener("pointerenter", onVisualEnter);
          visual.removeEventListener("pointerleave", onVisualLeave);
        });
        window.removeEventListener("scroll", updateScroll);
        window.cancelAnimationFrame(frame);
      };
    });

    return () => scope.revert();
  }, [language, replayToken]);

  useEffect(() => {
    if (!menuOpen) return;
    const panel = document.querySelector(".mobile-menu-panel");
    const links = document.querySelectorAll(".mobile-menu-link");
    if (!panel) return;
    const panelAnimation = animate(panel, { opacity: [0, 1], duration: 320, ease: "outQuad" });
    const linkAnimation = animate(links, {
      opacity: [0, 1],
      y: [20, 0],
      delay: stagger(55),
      duration: 650,
      ease: "outExpo",
    });
    return () => {
      panelAnimation.revert();
      linkAnimation.revert();
    };
  }, [menuOpen]);

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    window.localStorage.setItem("takeru-language", next);
  };

  return (
    <div
      ref={rootRef}
      className="anime-site"
      data-language={language}
      style={{ "--active-accent": destinations.find(({ id }) => id === activeId)?.accent } as CSSProperties}
    >
      <div className="scroll-rail" aria-hidden="true">
        <span />
      </div>

      <header className="site-header">
        <a className="anime-brand" href="#top" aria-label={copy.a11y.home}>
          <span>T</span>
          <span className="brand-word">Takeru Fujii</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">{systemCopy.work}</a>
          <a href="#principles">{copy.nav.principles}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switch" role="group" aria-label={copy.a11y.language}>
            {LANGUAGES.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => changeLanguage(option.id)}
                aria-pressed={language === option.id}
              >
                {option.short}
              </button>
            ))}
          </div>
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? copy.a11y.closeMenu : copy.a11y.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu-panel">
          <p>{systemCopy.menu}</p>
          <nav aria-label="Mobile navigation">
            {[
              [systemCopy.work, "#work"],
              [copy.nav.principles, "#principles"],
              [copy.nav.contact, "#contact"],
            ].map(([label, href], index) => (
              <a className="mobile-menu-link" href={href} key={href} onClick={() => setMenuOpen(false)}>
                <small>0{index + 1}</small>
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}

      <main>
        <section className="anime-hero" id="top">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span /> {copy.hero.kicker}
            </p>
            <h1 className="hero-title">
              <CharacterLine text={copy.hero.statement[0]} />
              <CharacterLine text={copy.hero.statement[1]} accent />
            </h1>
            <p className="hero-caption">{copy.hero.caption}</p>
            <div className="hero-meta">
              <button type="button" className="replay-button" onClick={() => setReplayToken((value) => value + 1)}>
                <Play size={12} fill="currentColor" /> {systemCopy.replay}
              </button>
              <a href="#work" className="scroll-button">
                {copy.hero.scroll} <ArrowDown size={14} />
              </a>
            </div>
          </div>
          <MotionStage label={systemCopy.drag} />
        </section>

        <MotionMarquee />

        <section className="work-intro" id="work">
          <p>{systemCopy.work}</p>
          <h2>{systemCopy.workTitle}</h2>
          <div className="work-index" aria-label={systemCopy.work}>
            {destinations.map((destination) => (
              <a
                key={destination.id}
                href={`#project-${destination.id}`}
                className={activeId === destination.id ? "is-active" : ""}
              >
                <span>{destination.index}</span>
                {destination.name}
              </a>
            ))}
          </div>
        </section>

        <section className="work-list" aria-label={systemCopy.work}>
          {destinations.map((destination, position) => (
            <article
              className="work-card"
              id={`project-${destination.id}`}
              data-work-id={destination.id}
              key={destination.id}
              style={{ "--project-accent": destination.accent } as CSSProperties}
            >
              <div className="project-topline">
                <span>{systemCopy.project} / {destination.index}</span>
                <span>{systemCopy.status} / {destination.status}</span>
              </div>

              <div className="project-layout">
                <div className="project-copy">
                  <p className="project-eyebrow">{destination.eyebrow}</p>
                  <h3>
                    <span>{destination.title[0]}</span>
                    <em>{destination.title[1]}</em>
                  </h3>
                  <p className="project-description">{destination.description}</p>
                  <ul>
                    {destination.station.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  {destination.href ? (
                    <a className="project-cta" href={destination.href} target="_blank" rel="noreferrer">
                      {destination.cta} <ArrowUpRight size={18} />
                    </a>
                  ) : (
                    <span className="project-cta project-cta-disabled">{copy.chapter.building}</span>
                  )}
                </div>

                <div className={`project-visual visual-${position + 1}`} aria-hidden="true">
                  <div className="project-scanline" />
                  <div className="visual-ring visual-ring-one" />
                  <div className="visual-ring visual-ring-two" />
                  <div className="project-orbit-track"><span /></div>
                  <span className="visual-number">{destination.index}</span>
                  {GLYPHS[destination.id].map((glyph, index) => (
                    <span className={`project-glyph glyph-${index + 1}`} key={`${glyph}-${index}`}>{glyph}</span>
                  ))}
                  <div className="visual-label">{destination.name} / SYSTEM</div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="principles-section" id="principles">
          <PrinciplesGraphic />
          <div className="principles-heading">
            <p>{copy.principles.kicker}</p>
            <h2>{copy.principles.title[0]} <em>{copy.principles.title[1]}</em></h2>
          </div>
          <div className="principles-list">
            {UI_COPY[language].principles.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="anime-footer" id="contact">
        <div className="footer-motion-grid" aria-hidden="true">
          {FOOTER_DOTS.map((_, index) => <span className="footer-motion-dot" key={index} />)}
        </div>
        <p className="footer-availability"><span /> {systemCopy.available}</p>
        <h2>{copy.footer.title[0]} <em>{copy.footer.title[1]}</em></h2>
        <p className="footer-body">{copy.footer.body}</p>
        <div className="footer-links">
          <a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18} /></a>
          <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={18} /></a>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Takeru Fujii</span>
          <span>Next.js × Anime.js</span>
        </div>
      </footer>
    </div>
  );
}
