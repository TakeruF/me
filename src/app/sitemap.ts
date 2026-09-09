import type { MetadataRoute } from "next";
import { hasDetailPage, products, productPath } from "@/lib/products";
import { locales, alternateLanguages } from "@/lib/i18n";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work", ...products.filter(p => p.slug !== "hanlu" && hasDetailPage(p)).map(p => productPath(p.slug)),
    // App-owned documents are published here rather than on separate product sites.
    "/projects/token-meter/releases", "/projects/token-meter/privacy", "/projects/token-meter/claude-sign-in",
    "/projects/furigana-keyboard/privacy", "/projects/furigana-keyboard/terms",
    "/projects/per-app-language/privacy",
  ].flatMap(path => locales.map(locale => ({
    url: `https://takeruf.com/${locale}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    alternates: { languages: { ...alternateLanguages(path), "x-default": `https://takeruf.com/en${path === "/" ? "" : path}` } },
  })));
}
