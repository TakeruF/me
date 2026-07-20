# Takeru — Products in Motion

A kinetic, generative portfolio for Takeru Fujii. No photography: the page is
driven by a flow-field particle canvas that reacts to the pointer and scroll
velocity, kinetic typography, and per-product "glyph fields" — each product is
drawn in its own writing system:

- **Keyboard** — floating kana and romaji
- **Hanlu** — drifting hanzi
- **Shiru** — Japanese vocabulary in slow orbit
- **AI Studio** — code fragments and nodes

Each product chapter re-tints the whole page (particles, accents, cursor) with
its own color as you scroll.

## Stack

- Next.js 15 / React 19 / TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Instrument Serif and Inter via `next/font`

## Run locally

```bash
npm install
npm run dev
```

The experience is a single vertical scroll: hero statement, product marquee,
four chapters, principles, and contact. English / 日本語 / 中文 are switchable
from the header. Reduced-motion preferences still the canvas, the skew, and
the character reveals.

Product content lives in [`src/lib/journey.ts`](src/lib/journey.ts), UI copy in
[`src/lib/motion-i18n.ts`](src/lib/motion-i18n.ts), and the experience is
implemented in [`src/components/motion/`](src/components/motion/). The previous
"train journey" design (`src/components/JourneyHero.tsx`) and the earlier
"universe" components are kept for reference but no longer rendered.
