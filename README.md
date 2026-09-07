# Takeru — Portfolio

A product-focused portfolio based on [TakeruF's GitHub profile](https://github.com/TakeruF/TakeruF).
Complete English, Japanese and Simplified Chinese introductions, expressive typography, original product screenshots, and a responsive layout.

## Content

- **Products:** Hanlu, Token Meter, Furigana Keyboard, Per-App Language
- **Open source:** China Rail MCP, Japan Rail MCP, MCP Mail Core, Silkroad MCP
- **About:** introduction and technology stack
- **All work:** `/work` lists 16 products by category
- **Product introductions:** `/projects/<slug>` explains features, supported platforms and requirements, then links to the existing app, documentation or download destination

Product descriptions and destinations were checked against the profile README on 2026-09-07.
Screenshots in `public/projects/` come from the product assets linked in that README and the corresponding repositories. Current product READMEs were checked on 2026-09-07; Token Meter is supported on macOS only.

This domain is for product introductions. Application hosting, local browser data, OAuth settings, release feeds and privacy-policy URLs are preserved. See [migration decisions](docs/domain-migration.md).

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
- `src/lib/products.ts`: the 16-product introduction catalog
- `src/app/work/page.tsx`: product directory
- `src/app/projects/[slug]/page.tsx`: statically generated product introductions
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

The old Vercel portfolio uses `vercel.json` to permanently redirect to the matching path on takeruf.com. It uses the same static build and does not host another application.

## Languages

- `/en`, `/ja`, `/zh`: localized homepages, collections and product introductions.
- The header and footer switch language while retaining the current product.
- Original product names, screenshot contents and signature copy such as “Curiosity, made useful.” remain in their original language.
- `src/lib/i18n/`: authored translations for visible copy, accessible labels and metadata. Server-rendered translation keeps content readable before JavaScript loads; only the gallery controls hydrate.
- `scripts/build-locales.mjs`: builds three isolated static exports, assembles them under their locale prefixes, preserves legacy URLs, and creates the 51-URL sitemap with language alternates.
- F1 Harmony uses the complete original standalone page with translated text and a matching language selector. Its original CSS, animation script and screenshots are preserved.
- Hanlu continues to link directly to `hanlu.app/about`. Product applications and lightweight tools keep their original hosting.

Run `npm run build:edgeone` then `npm run verify:export` to check the deployed artifact. A single-language development preview uses `SITE_LOCALE=zh SITE_BASE_PATH=/zh npm run dev` (replace `zh` as needed); use the assembled static output to test all three languages together.
