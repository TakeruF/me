import { readFileSync } from "node:fs";
import path from "node:path";
import { currentLocale, type Locale } from "@/lib/i18n";

export const legalDocuments = ["privacy", "terms"] as const;
export type LegalDocument = (typeof legalDocuments)[number];

const root = path.join(process.cwd(), "src/content/furigana-keyboard");

/** Furigana Keyboard had a Simplified-Chinese legal page; the portfolio's zh route is Simplified Chinese. */
function documentLocale(locale: Locale): "ja" | "en" | "zh" | "ko" {
  return locale;
}

export function legalLines(
  document: LegalDocument,
  locale: Locale = currentLocale(),
): string[] {
  return readFileSync(path.join(root, `${document}.${documentLocale(locale)}.txt`), "utf8")
    .split(/\r?\n/)
    .filter(Boolean);
}
