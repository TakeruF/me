import type { MetadataRoute } from "next";
import { products, productPath } from "@/lib/products";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/work",
    ...products
      .filter((product) => product.slug !== "hanlu")
      .map((product) => productPath(product.slug)),
  ].map((path) => ({
    url: `https://takeruf.com${path}`,
    changeFrequency: "monthly",
  }));
}
