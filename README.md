# Takeru Universe

A cinematic, interactive personal site for **Takeru Fujii** — identity, projects, and
interests rendered as a deep-space universe of planets, moons, stations, orbits, and
nebulae rather than a standard portfolio.

> Building tools for language learners. Explore my universe.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** 3.4 (custom space theme + glass utilities)
- **Framer Motion** 11 (scroll camera, parallax, transitions, panels)
- Canvas-based parallax **starfield** + CSS **nebula** (2.5D — no heavy WebGL libs)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Experience

- **Hero** — universe entrance: starfield, nebula, animated title + CTA.
- **Universe map** — a scrollable constellation. Each celestial body rotates, floats,
  reacts to the mouse, glows + reveals a label on hover, and opens a glass detail panel
  on click. Connector lines trace the path between them.
- **OrbitNav** — a side rail that highlights the body nearest center and jumps to any of them.
- **Outro** — closing section with a GitHub link.

### Celestial bodies

| Body | Represents |
| --- | --- |
| **Hanlu** (planet) | Flagship: a Chinese-learning app for Japanese speakers |
| **Language** (moon) | Mandarin, HSK, language-learning interest |
| **AI Station** | ChatGPT Lab @ Waseda, AI projects + workshops |
| **Economics** (orbit) | First-year economics at Waseda University |
| **Future** (nebula) | Ideas and experiments to come |

## Accessibility & performance

- Full **`prefers-reduced-motion`** support — disables float, parallax, rotation, the
  cursor glow, and renders a static starfield.
- Mouse parallax + cursor glow are **disabled on touch** devices.
- Canvas caps DPR, runs a single rAF loop, and pauses when the tab is hidden.
- Responsive: bodies scale down via a CSS variable while their layout stays percentage-based.

## Editing content

All copy and visual config live in [`src/lib/universe.ts`](src/lib/universe.ts).

> **TODO:** replace the placeholder URLs at the top of that file:
> - `HANLU_URL` → the live Hanlu app / landing page
> - `GITHUB_URL` → Takeru's real GitHub profile

## Structure

```
src/
  app/            layout (fonts, metadata) · page (composition) · globals.css
  components/     Starfield · Nebula · CursorGlow · Hero · Planet
                  UniverseMap · DetailPanel · OrbitNav · Outro
  lib/            universe.ts (content) · hooks/ (mouse, touch)
```
