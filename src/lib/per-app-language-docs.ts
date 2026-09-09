import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { currentLocale, type Locale } from "@/lib/i18n";

const root = path.join(process.cwd(), "src/content/per-app-language");

const policyFiles: Record<Locale, string> = {
  en: "privacy.en.md",
  ja: "privacy.ja.md",
  zh: "privacy.zh.md",
  ko: "privacy.ko.md",
};

/** A static, app-owned legal document, authored separately for every locale. */
export function privacyPolicyHtml(locale: Locale = currentLocale()): string {
  const markdown = readFileSync(path.join(root, policyFiles[locale]), "utf8");
  return marked.parse(markdown.trim(), { async: false, gfm: true })
    .replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1');
}
