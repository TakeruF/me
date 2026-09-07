# Token Meter documents

Token Meter's release notes, privacy policy and Claude Code sign-in guide are
published on takeruf.com, not on GitHub Pages. The files here are synced copies
from [`TakeruF/token_meter`](https://github.com/TakeruF/token_meter), which
remains the place they are authored:

| Here | Source in the app repository | Page |
|---|---|---|
| `releases/v*.md` | `docs/releases/v*.md` | `/{locale}/projects/token-meter/releases` |
| `privacy.{en,ja,zh,ko}.md` | `docs/privacy.md` (Japanese original) | `/{locale}/projects/token-meter/privacy` |
| `claude-sign-in.md` | `docs/claude-sign-in.md` | `/{locale}/projects/token-meter/claude-sign-in` |

Release notes and the sign-in guide carry their four languages in one file as
`## English` / `## 日本語` / `## 中文` / `## 한국어` sections; the privacy policy
is one file per locale. `src/lib/token-meter-docs.ts` selects the section for
the locale being built and renders it at build time.

After shipping a Token Meter release, copy the new `docs/releases/v<version>.md`
into `releases/` here and rebuild.
