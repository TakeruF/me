"use client";

import { useEffect, useState } from "react";

/**
 * True on coarse-pointer / touch devices (no precise hover available).
 * SSR-safe: starts false, resolves after mount.
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isTouch;
}
