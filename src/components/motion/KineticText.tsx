"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const charVariants: Variants = {
  hidden: { y: "115%", rotate: 5 },
  visible: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Splits text into characters and reveals them one by one (masked slide-up)
 * when scrolled into view. Each character nudges upward on hover.
 * Renders plain text when reduced motion is preferred.
 */
export default function KineticText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  /** Extra delay before the stagger starts, in seconds. */
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.028, delayChildren: delay } },
  };

  return (
    <span className={className} aria-label={text} role="text">
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={container}
      >
        {Array.from(text).map((char, index) => (
          // Horizontal/vertical padding (cancelled by negative margins) gives
          // italic overhangs and descenders room so the mask never clips them.
          <span
            key={index}
            className="inline-block overflow-hidden align-bottom px-[0.09em] pb-[0.12em] -mx-[0.09em] -mb-[0.12em]"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={charVariants}
              whileHover={{ y: "-12%", transition: { duration: 0.22, ease: "easeOut" } }}
            >
              {char === " " ? " " : char}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
