"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useIsTouch } from "@/lib/hooks/useIsTouch";

/**
 * Custom cursor: a precise dot plus a lagging ring that expands over
 * interactive elements. Disabled entirely on touch devices.
 */
export default function CursorGlow() {
  const isTouch = useIsTouch();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.7 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.7 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest?.("a, button, [data-cursor]")));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-[#f4f2ec] mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border border-white/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 54 : 32,
          height: hovering ? 54 : 32,
          opacity: visible ? (hovering ? 1 : 0.55) : 0,
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />
    </>
  );
}
