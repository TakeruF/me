# Takeru — Products in Motion

A fullscreen, cinematic portfolio for Takeru Fujii. Each product is a stop on a
train journey, with a landscape chosen for its place and story:

- **Keyboard** — a spring morning below Mt. Fuji, Japan
- **Hanlu** — the Li River and karst mountains, China
- **Shiru** — a quiet autumn local line in Kyoto, Japan
- **AI Studio** — Tokyo Bay after dark

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

The experience is intentionally contained in one viewport. Destinations can be
changed from the top navigation, route switcher, mobile menu, or left/right arrow
keys. Reduced-motion preferences disable the continuous train and scenery movement.

Product content lives in [`src/lib/journey.ts`](src/lib/journey.ts), and the primary
experience is implemented in [`src/components/JourneyHero.tsx`](src/components/JourneyHero.tsx).
