import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductStory } from "@/components/product-story";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { productStories } from "@/lib/product-stories";
import { ProductVisual } from "@/components/product-visual";
import {
  products,
  findProduct,
  productPath,
  productHref,
} from "@/lib/products";

export const dynamicParams = false;
export function generateStaticParams() {
  return products
    .filter(({ slug }) => slug !== "f1-harmony")
    .map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  return {
    title: `${product.name} — Takeru`,
    description: product.description,
    alternates: { canonical: productHref(product.slug) },
    openGraph: {
      title: `${product.name} — Takeru`,
      description: product.description,
      url: `https://takeruf.com${productPath(product.slug)}`,
      ...(product.image
        ? { images: [{ url: product.image.src, alt: product.image.alt }] }
        : {}),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  if (product.slug === "hanlu") {
    return (
      <>
        <meta httpEquiv="refresh" content="0;url=https://hanlu.app/about" />
        <main className="wrap">
          <h1>Hanlu</h1>
          <p>
            <a href="https://hanlu.app/about">Hanluの紹介ページを開く →</a>
          </p>
        </main>
      </>
    );
  }
  const story = productStories[product.slug];
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="detail-hero wrap" id="top">
          <Link className="back-to-work" href="/work">
            <ArrowLeft size={15} aria-hidden="true" /> All work{" "}
            <span>/ {product.category}</span>
          </Link>
          <div className="detail-title-row">
            <div>
              <span className="section-index">{product.eyebrow}</span>
              <h1>
                {product.name}
                <span className="blue-period">.</span>
              </h1>
            </div>
            <span className="detail-star" aria-hidden="true">
              ✳
            </span>
          </div>
          <div className="detail-summary">
            <div>
              <h2>{product.headline}</h2>
              <p>{product.description}</p>
            </div>
            <div className="detail-actions">
              <span className="detail-platform">{product.platforms}</span>
              <a
                className="primary-cta"
                href={product.primary.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.primary.label}
                <ArrowUpRight size={18} aria-hidden="true" />
                <span className="sr-only">（新しいタブで開く）</span>
              </a>
              <div className="detail-links">
                {product.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ArrowUpRight size={13} aria-hidden="true" />
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        {story?.facts && (
          <ul className="story-facts wrap">
            {story.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        )}
        {story?.intro && (
          <section className="story-intro wrap">
            <h2>{story.intro.title}</h2>
            <p>{story.intro.text}</p>
          </section>
        )}
        {story?.gallery ? (
          <ScreenshotGallery name={product.name} images={story.gallery} />
        ) : (
          <div className="wrap detail-image">
            <ProductVisual product={product} />
          </div>
        )}
        {story ? (
          <ProductStory story={story} />
        ) : (
          <section
            className="detail-features wrap"
            aria-labelledby="features-title"
          >
            <div className="detail-section-label">
              <span className="section-index">01 / THE DETAILS</span>
              <h2 id="features-title">
                Small details.
                <br />
                <em>Real difference.</em>
              </h2>
            </div>
            <div>
              {product.features.map((feature, i) => (
                <article className="feature-row" key={feature.title}>
                  <span className="feature-number">0{i + 1}</span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="detail-notes wrap" aria-labelledby="notes-title">
          <div>
            <span className="section-index">
              {story
                ? String(story.sections.length + 1).padStart(2, "0")
                : "02"}{" "}
              / BEFORE YOU START
            </span>
            <h2 id="notes-title">
              Good to know<span className="blue-period">.</span>
            </h2>
          </div>
          <ul>
            {product.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
        <section className="detail-start wrap" aria-labelledby="start-title">
          <div>
            <span className="section-index">WHEN YOU’RE READY</span>
            <h2 id="start-title">
              Give it <em>a try.</em>
            </h2>
          </div>
          <a
            className="primary-cta"
            href={product.primary.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {product.primary.label}
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only">（新しいタブで開く）</span>
          </a>
        </section>
        {related.length > 0 && (
          <section
            className="related-section wrap"
            aria-labelledby="related-title"
          >
            <div className="section-heading">
              <h2 id="related-title">
                A little more to explore<span className="blue-period">.</span>
              </h2>
              <Link className="text-link" href="/work">
                All work <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="related-grid">
              {related.map((p) => (
                <a
                  className="related-card"
                  href={productHref(p.slug)}
                  key={p.slug}
                >
                  <span>
                    {p.name}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <p>{p.headline}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
