"use client";

import Image from "@/components/responsive-image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { StoryImage } from "@/lib/product-stories";

export function GalleryInteractive({
  name,
  images,
  labels,
}: {
  name: string;
  images: StoryImage[];
  labels: Record<string, string>;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pending = useRef<number | null>(null);
  const [announced, setAnnounced] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = viewport.current;
    const slide = el?.children[active];
    if (!el || !slide) return;

    // Mixed portrait and landscape slides should only reserve the current height.
    const resize = () => {
      el.style.height = `${slide.getBoundingClientRect().height}px`;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active]);

  const closest = useCallback(() => {
    const el = viewport.current;
    const first = el?.firstElementChild;
    if (!el || !first) return 0;
    const stride = first.getBoundingClientRect().width +
      (parseFloat(getComputedStyle(el).columnGap) || 0);
    return Math.max(0, Math.min(images.length - 1, Math.round(el.scrollLeft / stride)));
  }, [images.length]);

  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    let lastSettled = 0;
    const nativeScrollEnd = "onscrollend" in el;
    const settle = () => {
      const index = closest();
      // A previous scroll can finish after the user has already requested the next one.
      if (pending.current !== null && index !== pending.current) return;
      pending.current = null;
      setActive(index);
      if (index !== lastSettled) {
        lastSettled = index;
        setAnnounced(index);
      }
    };
    const scroll = () => {
      if (pending.current === null && !frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          if (pending.current === null) setActive(closest());
        });
      }
      if (!nativeScrollEnd) {
        clearTimeout(timer);
        timer = setTimeout(settle, 150);
      }
    };
    const interrupt = () => { pending.current = null; };
    el.addEventListener("scroll", scroll, { passive: true });
    if (nativeScrollEnd) el.addEventListener("scrollend", settle);
    el.addEventListener("wheel", interrupt, { passive: true });
    el.addEventListener("pointerdown", interrupt, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      el.removeEventListener("scroll", scroll);
      el.removeEventListener("scrollend", settle);
      el.removeEventListener("wheel", interrupt);
      el.removeEventListener("pointerdown", interrupt);
    };
  }, [closest]);
  function goTo(index: number, instant = false) {
    const el = viewport.current;
    if (!el) return;
    const next = Math.max(0, Math.min(images.length - 1, index));
    const left =
      el.scrollLeft +
      el.children[next].getBoundingClientRect().left -
      el.getBoundingClientRect().left;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (Math.abs(el.scrollLeft - left) < 1) {
      pending.current = null;
      setActive(next);
      return;
    }
    pending.current = next;
    setActive(next);
    el.scrollTo({ left, behavior: instant || reduce ? "instant" : "smooth" });
  }
  function endDrag() {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    goTo(closest(), true);
  }

  return (
    <section
      className={`screen-gallery wrap${name === "anDrop" ? " screen-gallery-androp" : ""}`}
      aria-label={`${name}: ${labels.screenshots}`}
      aria-roledescription={labels.carousel}
    >
      <div className="gallery-heading-row">
        <div>
          <span className="section-index">{labels.eyebrow}</span>
          <h2>{labels.heading}</h2>
        </div>
        <p>{labels.hint}</p>
      </div>
      <div
        ref={viewport}
        className={`screen-viewport ${dragging ? "is-dragging" : ""}`}
        tabIndex={0}
        role="group"
        aria-label={labels.keys}
        onKeyDown={(event) => {
          const targets: Record<string, number> = {
            ArrowLeft: (pending.current ?? closest()) - 1,
            ArrowRight: (pending.current ?? closest()) + 1,
            Home: 0,
            End: images.length - 1,
          };
          if (event.key in targets) {
            event.preventDefault();
            goTo(targets[event.key], true);
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            x: event.clientX,
            scroll: event.currentTarget.scrollLeft,
          };
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (drag.current)
            event.currentTarget.scrollLeft =
              drag.current.scroll - (event.clientX - drag.current.x);
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        {images.map((shot, index) => (
          <figure
            key={shot.src}
            className={`screen-slide ${shot.portrait ? "screen-portrait" : ""}`}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${index + 1} / ${images.length}`}
          >
            <div className="screen-image">
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(max-width: 700px) 90vw, 1100px"
                draggable={false}
              />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="screen-controls">
        <button
          type="button"
          className="screen-arrow"
          onClick={() => goTo((pending.current ?? closest()) - 1)}
          disabled={active === 0}
          aria-label={labels.previous}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="screen-dots" role="group" aria-label={labels.select}>
          {images.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              aria-label={`${index + 1}: ${shot.caption}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="screen-arrow"
          onClick={() => goTo((pending.current ?? closest()) + 1)}
          disabled={active === images.length - 1}
          aria-label={labels.next}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        <span className="screen-counter" aria-hidden="true">
          {active + 1} / {images.length}
        </span>
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {announced === null ? "" : `${announced + 1} / ${images.length}`}
        </span>
      </div>
    </section>
  );
}
