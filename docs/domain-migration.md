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

GitHub repository homepage links and portfolio READMEs should point to the relevant `https://takeruf.com/projects/<slug>` after production verification. Existing application links remain labeled as application links. Old introduction pages may point visitors to the new canonical introduction; app and update endpoints must not redirect.

Product facts were checked against current repository READMEs and publicly visible application pages on 2026-09-07. Token Meter currently supports macOS only; Windows development and distribution are frozen.

## Verification

Production checks and publication status will be recorded after deployment.
