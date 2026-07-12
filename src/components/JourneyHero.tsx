"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Compass,
  Languages,
  Layers3,
  Menu,
  MapPin,
  Ticket,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { DESTINATIONS, PROFILE_LINKS } from "@/lib/journey";
import {
  LANGUAGES,
  UI_COPY,
  localizeDestination,
  type Language,
} from "@/lib/journey-i18n";

const ease = [0.22, 1, 0.36, 1] as const;
const NOTES_INDEX = DESTINATIONS.length;
type TimeOfDay = "dawn" | "day" | "dusk" | "night";

const BRIDGES = [
  {
    image: "/journey/transition-tunnel.webp",
  },
  {
    image: "/journey/transition-rainforest.webp",
  },
  {
    image: "/journey/transition-city.webp",
  },
] as const;

const JOURNEY_NOTE_META = [
  {
    icon: Languages,
    number: "01",
    color: "#dce7cf",
  },
  {
    icon: Layers3,
    number: "02",
    color: "#efbd91",
  },
  {
    icon: Compass,
    number: "03",
    color: "#bcd8df",
  },
];

export default function JourneyHero() {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const curtainAreaRef = useRef<HTMLDivElement>(null);
  const curtainProgressRef = useRef(0);
  const curtainStartYRef = useRef(0);
  const curtainMovedRef = useRef(false);
  const curtainDraggingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stationProgress, setStationProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [clock, setClock] = useState("--:--");
  const [curtainProgress, setCurtainProgress] = useState(0);
  const [isCurtainDragging, setIsCurtainDragging] = useState(false);
  const ui = UI_COPY[language];
  const destinations = useMemo(
    () => DESTINATIONS.map((destination) => localizeDestination(destination, language)),
    [language],
  );
  const activeDestination = destinations[Math.min(activeIndex, destinations.length - 1)];

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem("takeru-language", nextLanguage);
  };

  const setCurtain = (progress: number) => {
    const safeProgress = Math.min(Math.max(progress, 0), 100);
    curtainProgressRef.current = safeProgress;
    setCurtainProgress(safeProgress);
  };

  const updateCurtainFromPointer = (clientY: number) => {
    const area = curtainAreaRef.current;
    if (!area) return;
    const bounds = area.getBoundingClientRect();
    setCurtain(((clientY - bounds.top) / Math.max(bounds.height, 1)) * 100);
  };

  const onCurtainPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    curtainStartYRef.current = event.clientY;
    curtainMovedRef.current = false;
    curtainDraggingRef.current = true;
    setIsCurtainDragging(true);
  };

  const onCurtainPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!curtainDraggingRef.current) return;
    if (Math.abs(event.clientY - curtainStartYRef.current) > 4) curtainMovedRef.current = true;
    updateCurtainFromPointer(event.clientY);
  };

  const onCurtainPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!curtainDraggingRef.current) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    curtainDraggingRef.current = false;
    setIsCurtainDragging(false);
    if (curtainMovedRef.current) setCurtain(curtainProgressRef.current > 46 ? 100 : 0);
  };

  const scrollToSlide = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const safeIndex = Math.max(0, Math.min(index, NOTES_INDEX));
      const target = track.querySelector<HTMLElement>(`[data-stop-index="${safeIndex}"]`);
      if (!target) return;
      target.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      setStationProgress(0);
      track.scrollTo({
        left: target.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      setMenuOpen(false);
    },
    [reducedMotion],
  );

  const scrollToStation = useCallback(
    (index: number, showStation: boolean) => {
      const track = trackRef.current;
      const target = track?.querySelector<HTMLElement>(`[data-stop-index="${index}"]`);
      if (!target) return;
      target.scrollTo({
        top: showStation ? target.clientHeight : 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  const updateStationProgress = (index: number, element: HTMLElement) => {
    if (activeIndexRef.current !== index) return;
    const progress = Math.min(Math.max(element.scrollTop / Math.max(element.clientHeight, 1), 0), 1);
    setStationProgress(progress);
  };

  useEffect(() => {
    const saved = window.localStorage.getItem("takeru-language");
    if (saved === "en" || saved === "ja" || saved === "zh") setLanguage(saved);
  }, []);

  useEffect(() => {
    const htmlLanguage = LANGUAGES.find(({ id }) => id === language)?.htmlLang ?? "en";
    document.documentElement.lang = htmlLanguage;
  }, [language]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours() + now.getMinutes() / 60;
      const phase: TimeOfDay = hour >= 5 && hour < 9
        ? "dawn"
        : hour >= 9 && hour < 17
          ? "day"
          : hour >= 17 && hour < 20
            ? "dusk"
            : "night";
      setTimeOfDay(phase);
      setClock(
        new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : language === "ja" ? "ja-JP" : "en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
    };
    updateTime();
    const timer = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(timer);
  }, [language]);

  useEffect(() => {
    [...DESTINATIONS.map(({ image }) => image), ...BRIDGES.map(({ image }) => image)].forEach((image) => {
      const preload = new Image();
      preload.src = image;
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const width = Math.max(track.clientWidth, 1);
      const viewportCenter = track.scrollLeft + width / 2;
      const stops = Array.from(track.querySelectorAll<HTMLElement>("[data-stop-index]"));
      const nearest = stops.reduce(
        (best, stop) => {
          const distance = Math.abs(stop.offsetLeft + stop.offsetWidth / 2 - viewportCenter);
          return distance < best.distance
            ? { index: Number(stop.dataset.stopIndex), distance }
            : best;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY },
      );
      const nextIndex = Math.max(0, Math.min(nearest.index, NOTES_INDEX));
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      const activeStop = stops.find((stop) => Number(stop.dataset.stopIndex) === nextIndex);
      setStationProgress(
        nextIndex === NOTES_INDEX || !activeStop
          ? 0
          : Math.min(activeStop.scrollTop / Math.max(activeStop.clientHeight, 1), 1),
      );
      const maxScroll = Math.max(track.scrollWidth - width, 1);
      setScrollProgress(track.scrollLeft / maxScroll);
    };

    const onWheel = (event: WheelEvent) => {
      if (!event.shiftKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      track.scrollBy({ left: event.deltaY * 1.15, behavior: "auto" });
    };

    const onResize = () => {
      const target = track.querySelector<HTMLElement>(`[data-stop-index="${activeIndexRef.current}"]`);
      if (target) track.scrollTo({ left: target.offsetLeft, behavior: "auto" });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "ArrowRight") scrollToSlide(activeIndex + 1);
      if (event.key === "ArrowLeft") scrollToSlide(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, scrollToSlide]);

  return (
    <main
      data-language={language}
      data-time={timeOfDay}
      className="journey relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#111411]"
    >
      <h1 className="sr-only">Takeru Fujii — products from Japan to the world</h1>

      <div
        className="train-window-shell pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
        style={{
          opacity: Math.max(0, 1 - stationProgress * 1.75),
          transform: `translate3d(0, ${stationProgress * -15}%, 0)`,
        }}
        aria-hidden="true"
      >
        <div
          ref={curtainAreaRef}
          className="curtain-aperture pointer-events-none absolute z-[1]"
        >
          <div
            className={`curtain-fabric absolute inset-x-0 top-0 overflow-hidden ${isCurtainDragging ? "" : "transition-[height] duration-700 ease-out"}`}
            style={{ height: `${curtainProgress}%` }}
          >
            <div className="curtain-weave absolute inset-0" />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                curtainProgress > 58 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[9px] font-extrabold uppercase tracking-[0.32em] text-[#35413b]/45">
                {ui.quietMode}
              </span>
            </div>
          </div>
          <button
            type="button"
            role="slider"
            aria-label={ui.curtain}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(curtainProgress)}
            onPointerDown={onCurtainPointerDown}
            onPointerMove={onCurtainPointerMove}
            onPointerUp={onCurtainPointerUp}
            onPointerCancel={onCurtainPointerUp}
            onClick={() => {
              if (!curtainMovedRef.current) setCurtain(curtainProgressRef.current > 50 ? 0 : 100);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") setCurtain(100);
              if (event.key === "ArrowUp") setCurtain(0);
            }}
            className={`curtain-handle absolute left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 touch-none ${
              stationProgress > 0.45 ? "pointer-events-none" : "pointer-events-auto"
            } ${
              isCurtainDragging
                ? "cursor-grabbing"
                : "cursor-ns-resize transition-[top] duration-700 ease-out"
            }`}
            style={{ top: `${curtainProgress}%` }}
          >
            <span className="sr-only">{ui.curtain}</span>
            <span className="curtain-grip" aria-hidden="true" />
          </button>
        </div>
        <div
          className="train-window absolute inset-0 z-[2] bg-cover bg-center"
          style={{
            backgroundImage: "url(/journey/high-speed-window-v2.png)",
            animationPlayState: reducedMotion ? "paused" : "running",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[21] shadow-[inset_0_0_150px_rgba(0,0,0,0.28)] transition-opacity duration-200"
        style={{ opacity: Math.max(0, 1 - stationProgress * 1.6) }}
      />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-9">
        <button
          type="button"
          onClick={() => scrollToSlide(0)}
          className="brand-mark liquid-glass pointer-events-auto relative z-[60] rounded-full bg-white/45 px-4 py-1.5 text-2xl italic text-[#173026] shadow-lg sm:text-[1.75rem]"
          aria-label="Go to first destination"
        >
          Takeru.
        </button>

        <nav className="liquid-glass pointer-events-auto hidden items-center rounded-full bg-black/35 p-1.5 md:flex" aria-label="Main navigation">
          {destinations.map((destination, index) => (
            <button
              key={destination.id}
              type="button"
              onClick={() => scrollToSlide(index)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition duration-300 ${
                index === activeIndex ? "bg-white text-[#18201b]" : "text-white/80 hover:text-white"
              }`}
              aria-current={index === activeIndex ? "page" : undefined}
            >
              {destination.name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollToSlide(NOTES_INDEX)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition duration-300 ${
              activeIndex === NOTES_INDEX ? "bg-white text-[#18201b]" : "text-white/80 hover:text-white"
            }`}
          >
            {ui.notes}
          </button>
          <a
            href={PROFILE_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#18201b]"
          >
            GitHub <ArrowUpRight size={13} />
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="liquid-glass pointer-events-auto relative z-[60] flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <Menu
            size={20}
            className={`absolute transition duration-300 ${
              menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <X
            size={20}
            className={`absolute transition duration-300 ${
              menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"
            }`}
          />
        </button>
      </header>

      <div
        ref={trackRef}
        className="journey-track relative z-10 flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        aria-label="Product journey"
      >
        {destinations.map((destination, index) => {
          const isActive = activeIndex === index;
          const isDarkText = destination.textTone === "dark";
          return (
            <div className="contents" key={destination.id}>
              <section
                id={`stop-${destination.id}`}
                data-stop-index={index}
                className="destination-column relative h-full min-w-full snap-center snap-always overflow-y-auto overflow-x-hidden"
                onScroll={(event) => updateStationProgress(index, event.currentTarget)}
                aria-label={`${destination.name}, ${destination.location}`}
              >
                <div className="journey-stop relative flex h-full min-h-full w-full items-center justify-center overflow-hidden px-5 pb-28 pt-24 sm:px-10 sm:pb-24 sm:pt-28">
              <div className="absolute inset-0" aria-hidden="true">
                <div
                  className="journey-pan absolute -inset-[3%] bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${destination.image})`,
                    animationPlayState: reducedMotion ? "paused" : "running",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(4,7,5,0.32)_100%)]" />
                <div className="time-atmosphere absolute inset-0" />
              </div>

                <article
                  className={`product-copy relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center px-3 text-center transition-all duration-700 sm:px-8 ${
                    isDarkText ? "product-copy-light text-[#10271e]" : "product-copy-dark text-[#fffaf0]"
                  } ${isActive ? "copy-is-visible" : "copy-is-hidden"}`}
                >
                <div
                  className={`liquid-glass mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.2em] shadow-lg sm:text-[10px] ${
                    isDarkText
                      ? "liquid-glass-dark bg-white/20 text-[#14241c]"
                      : "bg-black/15 text-white"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current opacity-65" />
                  {destination.status} · {destination.eyebrow}
                </div>

                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-75 sm:text-xs">
                  {destination.name}
                </p>
                <h2 className="journey-title product-title text-balance tracking-[-0.045em]">
                  {destination.title[0]}
                  <br />
                  <em>{destination.title[1]}</em>
                </h2>

                <p
                  className={`product-description mt-4 max-w-xl text-balance text-[13px] font-bold leading-relaxed sm:mt-5 sm:text-[15px] ${
                    destination.id === "keyboard" || destination.id === "hanlu"
                      ? "product-description-white text-white"
                      : ""
                  }`}
                >
                  {destination.description}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
                  {destination.href ? (
                    <a
                      href={destination.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex min-w-40 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#18201b] shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:gap-3 hover:bg-white/90"
                    >
                      {destination.cta} <ArrowUpRight size={16} />
                    </a>
                  ) : (
                    <span
                      className="rounded-full px-6 py-3 text-sm font-bold text-[#14241c] shadow-lg"
                      style={{ backgroundColor: destination.accent }}
                    >
                      {destination.cta}
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">
                    {destination.location}
                  </span>
                </div>
                </article>

                <button
                  type="button"
                  onClick={() => scrollToStation(index, true)}
                  className={`station-scroll-cue absolute bottom-24 right-5 z-10 flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.2em] sm:right-[8%] ${
                    isDarkText ? "text-[#10271e]" : "text-white"
                  }`}
                >
                <span className="hidden sm:inline">{ui.stepOff(destination.station.name)}</span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#14241c] shadow-lg"
                    style={{ backgroundColor: destination.accent }}
                  >
                    <ArrowDown size={15} />
                  </span>
                </button>

              <div
                className={`platform-sign absolute left-[7%] top-1/2 z-[9] hidden -translate-y-1/2 flex-col text-white lg:flex ${
                  isActive ? "platform-sign-visible" : ""
                }`}
                aria-hidden="true"
              >
                <span className="font-mono text-[10px] tracking-[0.22em] text-white/55">{ui.stop}</span>
                <span className="journey-title mt-1 text-5xl italic">{destination.index}</span>
                <span className="mt-3 h-14 w-px bg-gradient-to-b from-white/60 to-transparent" />
              </div>
                </div>

                <div
                  className="station-stop relative flex h-full min-h-full w-full items-center overflow-hidden px-5 pb-12 pt-16 sm:px-10 sm:pb-20 sm:pt-28 lg:px-16"
                  style={{
                    justifyContent: destination.station.align === "left" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    className="station-image absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${destination.station.image})` }}
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute inset-0 ${
                      destination.station.align === "left"
                        ? "bg-gradient-to-r from-black/55 via-black/12 to-transparent"
                        : "bg-gradient-to-l from-black/55 via-black/12 to-transparent"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="time-atmosphere absolute inset-0" aria-hidden="true" />

                  <article
                    className="station-board relative z-10 w-full max-w-[560px] p-5 sm:p-8 lg:p-10"
                    style={{ backgroundColor: destination.station.color, color: destination.station.ink }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-current/20 pb-4">
                      <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.22em]">
                        <MapPin size={13} /> {ui.arrived} · {destination.location}
                      </div>
                      <span className="font-mono text-[9px] font-bold tracking-[0.18em] opacity-55">
                        {destination.station.code}
                      </span>
                    </div>

                    <p className="mt-5 text-[9px] font-extrabold uppercase tracking-[0.25em] opacity-55">
                      {ui.productStation}
                    </p>
                    <h3 className="journey-title mt-1 text-4xl leading-none sm:text-5xl">
                      {destination.station.name}
                    </h3>
                    <p className="mt-4 text-sm font-semibold leading-relaxed opacity-80 sm:text-[15px]">
                      {destination.station.intro}
                    </p>

                    <p className="journey-title mt-4 border-l-2 border-current/35 pl-3 text-lg italic leading-tight opacity-75 sm:text-xl">
                      {destination.station.note}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 border-y border-current/20 py-3">
                      {destination.station.facts.map((fact) => (
                        <div key={fact.label} className="border-r border-current/15 px-2 first:pl-0 last:border-r-0 last:pr-0">
                          <dt className="text-[7px] font-extrabold uppercase tracking-[0.17em] opacity-45 sm:text-[8px]">
                            {fact.label}
                          </dt>
                          <dd className="mt-1 text-[9px] font-extrabold leading-tight sm:text-[10px]">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-4">
                      <p className="text-[7px] font-extrabold uppercase tracking-[0.2em] opacity-45 sm:text-[8px]">
                        {ui.coreExperience}
                      </p>
                      <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                        {destination.station.features.map((feature, featureIndex) => (
                          <li key={feature} className="flex items-start gap-2 text-[9px] font-bold leading-snug sm:text-[10px]">
                            <span className="mt-0.5 font-mono text-[8px] opacity-45">0{featureIndex + 1}</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {destination.href ? (
                        <a
                          href={destination.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-white shadow-lg transition hover:gap-3"
                          style={{ backgroundColor: destination.station.ink }}
                        >
                          {ui.explore(destination.name)} <ArrowUpRight size={14} />
                        </a>
                      ) : (
                        <span
                          className="rounded-full px-5 py-3 text-xs font-extrabold text-white shadow-lg"
                          style={{ backgroundColor: destination.station.ink }}
                        >
                          {ui.inDevelopment}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => scrollToStation(index, false)}
                        className="inline-flex items-center gap-2 px-2 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] opacity-65 transition hover:opacity-100"
                      >
                        <ArrowUp size={13} /> {ui.backToWindow}
                      </button>
                    </div>
                  </article>

                  <div className="station-nameplate absolute bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-center text-white drop-shadow-xl">
                    <p className="text-[8px] font-extrabold uppercase tracking-[0.28em] text-white/60">{ui.nowStanding}</p>
                    <p className="journey-title mt-1 text-2xl italic">{destination.station.name}</p>
                  </div>
                </div>
              </section>

              {index < BRIDGES.length && (
                <aside
                  className="journey-bridge relative h-full min-w-[54vw] overflow-hidden md:min-w-[42vw]"
                  aria-label={`${ui.bridgePlaces[index][0]} → ${ui.bridgePlaces[index][1]}`}
                >
                  <div
                    className="bridge-image absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${BRIDGES[index].image})` }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/45" />
                  <div className="time-atmosphere absolute inset-0 z-[1]" />
                  <div className="bridge-streak bridge-streak-one" aria-hidden="true" />
                  <div className="bridge-streak bridge-streak-two" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-[18%] z-10 flex items-center justify-center px-6 text-white">
                    <div className="flex items-center gap-3 text-[9px] font-extrabold uppercase tracking-[0.22em] drop-shadow-lg sm:text-[10px]">
                      <span>{ui.bridgePlaces[index][0]}</span>
                      <span className="h-px w-12 bg-white/60" />
                      <span className="journey-title text-xl italic normal-case tracking-normal">
                        {ui.bridgeLabels[index]}
                      </span>
                      <span className="h-px w-12 bg-white/60" />
                      <span>{ui.bridgePlaces[index][1]}</span>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          );
        })}

        <section
          data-stop-index={NOTES_INDEX}
          className="journey-stop journey-notes relative flex h-full min-w-full snap-center snap-always items-center justify-center overflow-hidden px-5 pb-28 pt-24 text-white sm:px-10 sm:pb-24 sm:pt-28"
        >
          <div className="journey-notes-bg absolute inset-0" aria-hidden="true">
            <div className="tunnel-light tunnel-light-one" />
            <div className="tunnel-light tunnel-light-two" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(23,45,36,0.18),rgba(4,8,7,0.88)_72%)]" />
          </div>

          <div
            className={`relative z-10 w-full max-w-5xl transition-all duration-700 ${
              activeIndex === NOTES_INDEX ? "copy-is-visible" : "copy-is-hidden"
            }`}
          >
            <div className="text-center">
              <div className="liquid-glass mx-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Ticket size={13} /> {ui.notesBadge}
              </div>
              <h2 className="journey-title mt-4 text-4xl leading-none sm:text-5xl md:text-6xl">
                {ui.notesTitle[0]} <em>{ui.notesTitle[1]}</em>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/70">
                {ui.notesIntro}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
              {JOURNEY_NOTE_META.map(({ icon: Icon, number, color }, index) => (
                <motion.article
                  key={number}
                  initial={false}
                  animate={
                    activeIndex === NOTES_INDEX
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 22 }
                  }
                  transition={{ delay: index * 0.1, duration: 0.55, ease }}
                  className="note-ticket rounded-2xl p-4 text-left text-[#13231c] sm:p-5"
                  style={{ backgroundColor: color }}
                >
                  <div className="flex items-center justify-between text-[#13231c]/55">
                    <Icon size={17} />
                    <span className="font-mono text-[9px] tracking-[0.18em]">{ui.noteLabel} {number}</span>
                  </div>
                  <h3 className="journey-title mt-5 text-2xl leading-[1.05]">{ui.principles[index][0]}</h3>
                  <p className="mt-3 text-xs font-semibold leading-relaxed text-[#13231c]/70">{ui.principles[index][1]}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-5 flex justify-center">
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#18201b] transition hover:gap-4"
              >
                {ui.seeNext} <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-5 pb-5 transition-all duration-300 sm:px-8 sm:pb-7 lg:px-12 lg:pb-9"
        style={{
          opacity: Math.max(0, 1 - stationProgress * 1.5),
          transform: `translate3d(0, ${stationProgress * 20}px, 0)`,
        }}
      >
        <div className="mb-3 h-px w-full overflow-hidden bg-white/15">
          <div
            className="h-full bg-white transition-[width] duration-150"
            style={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
          />
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="hidden min-w-[160px] text-white sm:block">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/50">
              {activeIndex === NOTES_INDEX ? ui.journeyLog : ui.nowPassing}
            </p>
            <p className="mt-1 text-xs font-semibold text-white/90">
              {activeIndex === NOTES_INDEX ? ui.nextHorizon : activeDestination.location}
            </p>
            <p className="mt-0.5 font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-white/45">
              {clock} · {ui.timeLabels[timeOfDay]}
            </p>
          </div>

          <div className="pointer-events-auto mx-auto flex items-center gap-1 rounded-full bg-black/35 p-1 backdrop-blur-sm sm:mx-0" role="tablist" aria-label="Choose a destination">
            {destinations.map((destination, index) => (
              <button
                key={destination.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => scrollToSlide(index)}
                className={`route-stop group flex h-9 items-center gap-2 rounded-full px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-500 sm:h-10 sm:px-4 ${
                  index === activeIndex
                    ? "liquid-glass min-w-[104px] bg-white/10 opacity-100 sm:min-w-[128px]"
                    : "opacity-55 hover:opacity-100"
                }`}
              >
                <span className="font-mono text-[8px] opacity-70">{destination.index}</span>
                <span className={index === activeIndex ? "inline" : "hidden md:inline"}>{destination.name}</span>
                {index === activeIndex && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: destination.accent }} />
                )}
              </button>
            ))}
            <button
              type="button"
              role="tab"
              aria-selected={activeIndex === NOTES_INDEX}
              onClick={() => scrollToSlide(NOTES_INDEX)}
              className={`route-stop flex h-9 items-center gap-2 rounded-full px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-all duration-500 sm:h-10 sm:px-4 ${
                activeIndex === NOTES_INDEX ? "liquid-glass bg-white/10 opacity-100" : "opacity-55 hover:opacity-100"
              }`}
            >
              <span className="font-mono text-[8px] opacity-70">05</span>
              <span className={activeIndex === NOTES_INDEX ? "inline" : "hidden md:inline"}>{ui.notes}</span>
            </button>
          </div>

          <div className="language-switcher liquid-glass pointer-events-auto flex items-center rounded-full bg-black/35 p-1 text-white" aria-label={ui.language}>
            {LANGUAGES.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => changeLanguage(option.id)}
                aria-pressed={language === option.id}
                title={option.label}
                className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-extrabold tracking-[0.08em] transition sm:min-w-10 ${
                  language === option.id ? "bg-white text-[#173026]" : "text-white/65 hover:text-white"
                }`}
              >
                {option.short}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-[#111713]/94 px-7 pb-9 pt-24 text-white backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="my-auto space-y-1">
              {destinations.map((destination, index) => (
                <motion.button
                  key={destination.id}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.5, ease }}
                  className="flex w-full items-baseline gap-4 border-b border-white/10 py-3.5 text-left"
                >
                  <span className="font-mono text-[10px] text-white/40">{destination.index}</span>
                  <span className="journey-title text-3xl">{destination.name}</span>
                  <span className="ml-auto text-[10px] text-white/45">{destination.location}</span>
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => scrollToSlide(NOTES_INDEX)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease }}
                className="flex w-full items-baseline gap-4 border-b border-white/10 py-3.5 text-left"
              >
                <span className="font-mono text-[10px] text-white/40">05</span>
                <span className="journey-title text-3xl">{ui.journeyNotes}</span>
              </motion.button>
            </div>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-[#18201b]"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
