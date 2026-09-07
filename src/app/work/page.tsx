import { localize, localizedMetadata } from "@/lib/i18n";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductVisual } from "@/components/product-visual";
import { categories, categoryIds, products, productHref } from "@/lib/products";

export const metadata: Metadata = localizedMetadata("All work — Takeru", "日々の道具、語学学習アプリ、開発者ツール、MCP。Takeruがつくる16のプロダクトを紹介します。", "/work");

export default function WorkPage() {
  return localize(
    <>
      <SiteHeader path="/work" />
      <main id="main">
        <section className="catalog-hero wrap" id="top">
          <span className="section-index">
            THE COLLECTION / {String(products.length).padStart(2, "0")} PROJECTS
          </span>
          <h1>
            Made to be <em>used.</em>
          </h1>
          <div className="catalog-intro">
            <p>
              日々の小さな不便から、
              <br />
              あったらいいなと思う道具を。
            </p>
            <p>
              使い方も、かたちも、それぞれ。
              <br />
              気になるプロダクトから、のぞいてみてください。
            </p>
          </div>
          <nav className="category-nav" aria-label="プロダクトカテゴリー">
            {categories.map((category, index) => (
              <a href={`#${categoryIds[index]}`} key={category}>
                {category}
                <span>
                  {products.filter((p) => p.category === category).length}
                </span>
              </a>
            ))}
          </nav>
        </section>
        {categories.map((category, index) => (
          <section
            className="catalog-section wrap"
            id={categoryIds[index]}
            key={category}
            aria-labelledby={`title-${categoryIds[index]}`}
          >
            <div className="section-heading">
              <div>
                <span className="section-index">
                  0{index + 1} / THE COLLECTION
                </span>
                <h2 id={`title-${categoryIds[index]}`}>
                  {category}
                  <span className="blue-period">.</span>
                </h2>
              </div>
            </div>
            <div className="catalog-grid">
              {products
                .filter((p) => p.category === category)
                .map((product) => (
                  <a
                    href={productHref(product.slug)}
                    key={product.slug}
                    className="catalog-card"
                  >
                    <ProductVisual product={product} compact />
                    <div className="catalog-card-title">
                      <h3>{product.name}</h3>
                      <ArrowUpRight size={23} aria-hidden="true" />
                    </div>
                    <p>{product.headline}</p>
                    <span className="catalog-platform">
                      {product.platforms}
                    </span>
                  </a>
                ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter path="/work" />
    </>
  );
}
