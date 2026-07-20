"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Per-product living glyph sets: the product's own writing system / vocabulary
// becomes the visual, replacing photography.
const GLYPHS: Record<string, string[]> = {
  keyboard: ["あ", "か", "さ", "た", "な", "ま", "や", "ら", "ん", "ア", "カ", "サ", "A", "K", "S", "N"],
  hanlu: ["汉", "语", "寒", "露", "字", "桥", "声", "意", "学", "文", "中", "问"],
  shiru: ["知る", "言葉", "ことば", "覚える", "語", "意味", "読む", "話す", "耳", "習う"],
  "ai-studio": ["{ }", "01", "→", "AI", "&&", "fn", "::", "++", "< >", "✳", "run", "0x"],
};

const GLYPH_COUNT = 16;

/** Deterministic pseudo-random in [0, 1) so SSR and client agree. */
function seeded(n: number) {
  const s = Math.sin(n) * 43758.5453;
  return s - Math.floor(s);
}

export default function GlyphField({ id, accent }: { id: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yFar = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const yNear = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const layers = [yFar, yMid, yNear];

  const set = GLYPHS[id] ?? GLYPHS.keyboard;
  const mono = id === "ai-studio";

  const glyphs = Array.from({ length: GLYPH_COUNT }, (_, i) => ({
    char: set[i % set.length],
    layer: i % 3,
    left: 4 + seeded(i * 7 + 1) * 88,
    top: 6 + seeded(i * 13 + 3) * 84,
    size: 13 + seeded(i * 5 + 2) * 42,
    opacity: 0.12 + seeded(i * 11 + 5) * 0.34,
    duration: 7 + seeded(i * 3 + 7) * 6,
    delay: -seeded(i * 17 + 11) * 9,
  }));

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {layers.map((y, layerIndex) => (
        <motion.div key={layerIndex} className="absolute inset-0" style={{ y }}>
          {glyphs
            .filter((glyph) => glyph.layer === layerIndex)
            .map((glyph, glyphIndex) => (
              <span
                key={glyphIndex}
                className={`glyph-float absolute whitespace-nowrap ${mono ? "font-mono" : "motion-title"} ${
                  layerIndex === 0 ? "blur-[1.5px]" : ""
                }`}
                style={{
                  left: `${glyph.left}%`,
                  top: `${glyph.top}%`,
                  fontSize: glyph.size,
                  color: accent,
                  opacity: glyph.opacity,
                  animationDuration: `${glyph.duration}s`,
                  animationDelay: `${glyph.delay}s`,
                }}
              >
                {glyph.char}
              </span>
            ))}
        </motion.div>
      ))}
    </div>
  );
}
