import type { MetadataRoute } from "next";
import { products, productPath } from "@/lib/products";
import { locales, alternateLanguages } from "@/lib/i18n";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/work", ...products.filter(p => p.slug !== "hanlu").map(p => productPath(p.slug))].flatMap(path => locales.map(locale => ({
    url: `https://takeruf.com/${locale}${path === "/" ? "" : path}`,
    changeFrequency: "monthly" as const,
    alternates: { languages: { ...alternateLanguages(path), "x-default": `https://takeruf.com/ja${path === "/" ? "" : path}` } },
  })));
}
