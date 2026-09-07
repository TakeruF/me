# Product introductions on takeruf.com

The site is a product-introduction portfolio, not an application host. `/work` lists 16 products. Hanlu links directly to `hanlu.app/about`; the remaining products have introductions under `/projects/<slug>` with their existing application and download destinations.

## Hosting decisions

- All introduction pages are static HTML on the existing EdgeOne project, built from `main`.
- PDF Organizer retains its lightweight Vite application and on-device processing at its existing Vercel URL. No framework, theme library, fonts, analytics or JavaScript are added to the app.
- Markdown Docs and the English vocabulary tool retain their current origins and local data. No storage migration or backup feature is necessary.
- Flight Market, MAGcup, syllabus search and all MCP APIs retain their hosts, authentication, callback URLs and application UI.
- Hanlu, AI Dict and Furigana Keyboard retain their product domains.
- Existing release notes, Sparkle appcast feeds, privacy policies, setup guides and the Silkroad documentation remain reachable at their original URLs.
- Legacy F1 Web/Pulse prototypes and group sites are not presented as maintained personal products.

## Introduction migration

GitHub repository homepage links and portfolio READMEs now point to the relevant `https://takeruf.com/projects/<slug>` after production verification. Existing application links remain labeled as application links. Old introduction pages may point visitors to the new canonical introduction; app and update endpoints must not redirect.

Product facts were checked against current repository READMEs and publicly visible application pages on 2026-09-07. Token Meter currently supports macOS only; Windows development and distribution are frozen.

## Verification

Verified on 2026-09-07:

- Commit `9e8fa10` passed lint, TypeScript, static export and GitHub CI. EdgeOne serves all 18 sitemap URLs over valid HTTPS with the correct canonical URL and one main heading per page.
- All 16 introductions and the directory were checked at 390px: no horizontal overflow, broken images or browser errors. Desktop screenshots were also reviewed. All 33 unique external destinations returned HTTP 200.
- GitHub homepage links were changed for 13 products plus the three portfolio repositories. Hanlu, AI Dict and Furigana Keyboard retain their established product domains.
- The English and Chinese portfolio READMEs link to the new directory. F1 Harmony and Token Meter retain their detailed pages and link to the new introduction. Token Meter PR #18 passed required `build-test`, merged, and its Pages deployment succeeded.
- The old `takeruf.github.io` root now forwards to takeruf.com. No GitHub Pages CNAME was added, preserving child project URLs.
- The published Token Meter update feed at `raw.githubusercontent.com/TakeruF/token_meter/main/appcast.xml` is byte-for-byte unchanged. Release history and static v1.2.9 release notes still return HTTP 200.
- The paused Vercel `me` project was resumed for legacy redirects. Its public alias is `me-teal-alpha.vercel.app`; the team/preview aliases keep their existing access protection. Path redirects preserve the query string. An explicit root redirect is included alongside the wildcard rule.

Application repositories and application UI were not migrated. The changes outside this repository are limited to product-entry links, portfolio READMEs and the legacy portfolio root redirect.

## Content and product identity

- Preserve the substance and distinctive interactions of existing product introductions. The common visual system is not a reason to compress each product into three short features.
- Token Meter retains all three original promotional slides in a horizontal, manually controlled gallery, plus four original feature/setup screenshots. Its original overview, provider selection, menu-bar modes, widgets, privacy, setup and download guidance remain visible. The original four-language page and release notes stay linked.
- Per-App Language retains all four screenshots, setup steps, application/reset behavior and compatibility limits. AI Dict and Furigana Keyboard retain fuller feature and privacy explanations.
- Hanlu is an outbound introduction link only. There is no duplicated Hanlu feature or FAQ page; the previously published `/projects/hanlu` URL forwards to `https://hanlu.app/about` and is omitted from the sitemap.
- F1 Harmony keeps its complete original page and visual identity as a standalone static document at `/projects/f1-harmony`. The HTML, CSS, motion and all 14 source assets are preserved; only relative asset URLs and the canonical URL change. It is deliberately excluded from the shared Next page template. Catalog links use full document navigation so the standalone page receives its own styles and scripts.
- The sitemap now contains 17 canonical pages: home, directory, and 15 product introductions.

Content restoration checks: Token Meter's three-slide gallery was verified with next/previous controls, Home/End keys and pointer drag at a 390px viewport. It contains seven original screenshots and six full detail sections. F1 Harmony was checked at desktop and 390px widths, including navigation from the catalog. A source comparison confirms its styles/scripts and all assets are unchanged from `TakeruF/f1-harmony` commit `1ae8d4a`; only asset URLs and canonical metadata differ. Hanlu's directory entry goes directly to its original about page.
