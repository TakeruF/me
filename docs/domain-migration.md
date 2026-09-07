# Product introductions on takeruf.com

The site is a product-introduction portfolio, not an application host. `/work` lists 16 products and `/projects/<slug>` provides their features, requirements, screenshots and links to their existing application or download destinations.

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
