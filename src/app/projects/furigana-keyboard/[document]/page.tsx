import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/doc-page";
import { localize, localizedMetadata } from "@/lib/i18n";
import { legalDocuments, legalLines, type LegalDocument } from "@/lib/furigana-keyboard-legal";

type Props = { params: Promise<{ document: string }> };

function isLegalDocument(value: string): value is LegalDocument {
  return legalDocuments.includes(value as LegalDocument);
}

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ document }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { document } = await params;
  if (!isLegalDocument(document)) notFound();
  const title = document === "privacy" ? "プライバシーポリシー" : "利用規約";
  return localizedMetadata(
    `${title} — Furigana Keyboard`,
    "Furigana Keyboardの利用規約、プライバシーと問い合わせ先。",
    `/projects/furigana-keyboard/${document}`,
  );
}

export default async function FuriganaKeyboardLegalPage({ params }: Props) {
  const { document } = await params;
  if (!isLegalDocument(document)) notFound();
  const title = document === "privacy" ? "プライバシーポリシー" : "利用規約";
  const eyebrow = document === "privacy" ? "PRIVACY" : "TERMS OF USE";

  return localize(
    <DocPage
      path={`/projects/furigana-keyboard/${document}`}
      eyebrow={eyebrow}
      title={title}
      backPath="/projects/furigana-keyboard"
      backLabel="Furigana Keyboardに戻る"
    >
      <div className="doc-wrap wrap">
        <article className="doc-card furigana-legal">
          {legalLines(document).map((line, index) => {
            if (index === 0) return <p className="doc-legal-name" key={line}>{line}</p>;
            if (/^施行日|^Effective date|^生效日期|^시행일/.test(line)) return <p className="doc-legal-effective" key={line}>{line}</p>;
            if (/^\d+\./.test(line)) return <h2 key={line}>{line}</h2>;
            if (line === "support@takeruf.com") return <p key={line}><a href="mailto:support@takeruf.com">support@takeruf.com</a></p>;
            return <p key={`${index}-${line}`}>{line}</p>;
          })}
        </article>
      </div>
    </DocPage>,
  );
}
