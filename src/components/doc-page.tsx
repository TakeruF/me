import { localize } from "@/lib/i18n";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

/**
 * Long-form layout for Token Meter's own documents (release notes, privacy
 * policy, setup guides). Body HTML is rendered from the app repository's
 * Markdown at build time, so it stays outside the phrase dictionaries.
 */
export function DocPage({
  path,
  eyebrow,
  title,
  lead,
  children,
}: {
  path: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return localize(
    <>
      <SiteHeader path={path} />
      <main id="main">
        <section className="doc-hero wrap" id="top">
          <Link className="back-to-work" href="/projects/token-meter">
            <ArrowLeft size={15} aria-hidden="true" /> Token Meterに戻る
          </Link>
          <span className="section-index">{eyebrow}</span>
          <h1>
            {title}
            <span className="blue-period">.</span>
          </h1>
          {lead && <p className="doc-lead">{lead}</p>}
        </section>
        {children}
      </main>
      <SiteFooter path={path} />
    </>
  );
}

/** Rendered Markdown. Content is authored in this repo, not user input. */
export function DocBody({ html }: { html: string }) {
  return <div className="doc-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
