import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

const root = path.join(process.cwd(), "src/content/per-app-language");

/** A static, app-owned legal document authored with the portfolio source. */
export function privacyPolicyHtml(): string {
  const markdown = readFileSync(path.join(root, "privacy.md"), "utf8");
  return marked.parse(markdown.trim(), { async: false, gfm: true })
    .replace(/<a href="(https?:)/g, '<a target="_blank" rel="noopener noreferrer" href="$1');
}
