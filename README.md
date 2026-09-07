# Takeru — Portfolio

A product-focused portfolio based on [TakeruF's GitHub profile](https://github.com/TakeruF/TakeruF).
Japanese descriptions, expressive typography, real product screenshots, and a responsive layout.

## Content

- **Products:** Hanlu, Token Meter, Furigana Keyboard, Per-App Language
- **Open source:** China Rail MCP, Japan Rail MCP, MCP Mail Core, Silkroad MCP
- **About:** introduction and technology stack

Product descriptions and destinations were checked against the profile README on 2026-09-07.
Screenshots in `public/projects/` come from the product assets linked in that README.

## Development

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run build
npm start
```

Built with Next.js, React, TypeScript, and Lucide. Typography uses DM Sans and Noto Sans JP through `next/font`.
The page is rendered as a Server Component. Motion uses CSS and respects reduced-motion preferences.

- `src/app/page.tsx`: product content, links, and page sections
- `src/app/globals.css`: visual system and responsive layouts
- `src/app/layout.tsx`: fonts, document language, and metadata
- `public/projects/`: optimized WebP versions of the original product screenshots

Development and production use separate build directories so running a build does not corrupt a live preview.

## EdgeOne deployment

Production domain: **https://takeruf.com**

EdgeOne Makers project `takeruf` is connected to `TakeruF/me`, production branch `main`.

- Framework preset: Next SSG
- Root directory: `./`
- Install command: `npm ci`
- Build command: `npm run build:edgeone`
- Output directory: `out`
- Acceleration region: Global (Chinese mainland excluded)

The EdgeOne build exports static HTML, CSS, JavaScript, fonts, and optimized images.
It does not require a running Node.js server, API keys, or runtime environment variables.
Every push to `main` automatically triggers a new production deployment.
