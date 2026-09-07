import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { basePath, currentLocale, type Locale } from "@/lib/i18n";

const root = path.join(process.cwd(), "src/content/token-meter");

/** Heading each document uses for a language section, as authored in the app repo. */
const sectionHeading: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  zh: "中文",
  ko: "한국어",
};

/**
 * Pull one language out of a document written as `## English` / `## 日本語` /
 * `## 中文` / `## 한국어` sections, the format Token Meter's release notes and
 * manual guides already use. Missing sections fall back to English.
 */
function extractSection(markdown: string, locale: Locale): string {
  const wanted = sectionHeading[locale];
  const lines = markdown.split(/\r?\n/);
  const collected: string[] = [];
  let inside = false;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      inside = line.slice(3).trim() === wanted;
      continue;
    }
    if (line.startsWith("# ")) continue;
    if (inside) collected.push(line);
  }
  if (collected.join("").trim() === "") {
    return locale === "en" ? markdown : extractSection(markdown, "en");
  }
  return collected.join("\n");
}

/** Lift `###`/`####` by one level so a page's own <h1> stays the only top heading. */
function promoteHeadings(markdown: string): string {
  return markdown.replace(/^(#{3,4}) /gm, (_, hashes: string) => `${hashes.slice(1)} `);
}

/** Links written for the app repository's file layout, resolved for this site. */
const relativeLinks: Record<string, string> = {
  "../privacy.md": "/projects/token-meter/privacy",
  "../data-sources.md": "https://github.com/TakeruF/token_meter/blob/main/docs/data-sources.md",
};

function toHtml(markdown: string): string {
  let html = marked.parse(markdown.trim(), { async: false, gfm: true });
  for (const [from, to] of Object.entries(relativeLinks)) {
    html = html.replaceAll(`href="${from}"`, `href="${to.startsWith("/") ? basePath() + to : to}"`);
  }
  return (
    html
      // Documents link out to GitHub and Anthropic; match the site's external-link behaviour.
      .replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1')
      // Wide comparison tables scroll on their own rather than widening the page.
      .replace(/<table>/g, '<div class="doc-table-scroll"><table>')
      .replace(/<\/table>/g, "</table></div>")
  );
}

function read(file: string): string {
  return readFileSync(path.join(root, file), "utf8");
}

/** Newest first, e.g. v1.2.9 before v1.2.10 is wrong, so compare numerically. */
export const releaseVersions: string[] = readdirSync(path.join(root, "releases"))
  .filter((file) => file.endsWith(".md"))
  .map((file) => file.slice(1, -3))
  .sort((a, b) => {
    const left = a.split(".").map(Number);
    const right = b.split(".").map(Number);
    return right[0] - left[0] || right[1] - left[1] || right[2] - left[2];
  });

export type ReleaseNote = { version: string; html: string };

export function releaseNotes(locale: Locale = currentLocale()): ReleaseNote[] {
  return releaseVersions.map((version) => ({
    version,
    html: toHtml(extractSection(read(`releases/v${version}.md`), locale)),
  }));
}

/**
 * Strip the title and the "published at" pointer the app repository keeps at
 * the top of each document, so a re-synced file renders as the page body only.
 */
function stripFrontMatter(markdown: string): string {
  return markdown.replace(/^# .*$/m, "").replace(/^>.*$/gm, "");
}

/** A single-language document per file, one file per locale. */
export function localizedDoc(name: string, locale: Locale = currentLocale()): string {
  return toHtml(stripFrontMatter(read(`${name}.${locale}.md`)));
}

/** A multi-language document in one file. */
export function sectionedDoc(name: string, locale: Locale = currentLocale()): string {
  return toHtml(promoteHeadings(extractSection(read(`${name}.md`), locale)));
}
