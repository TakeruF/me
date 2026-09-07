import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n";
import { DocPage, DocBody } from "@/components/doc-page";
import { sectionedDoc } from "@/lib/token-meter-docs";

const path = "/projects/token-meter/claude-sign-in";

export const metadata: Metadata = localizedMetadata(
  "Claude Codeのサインイン — Token Meter",
  "Token MeterのClaude連携で使う、サインインとキーチェーン許可の手順。",
  path,
);

export default function TokenMeterClaudeSignIn() {
  return (
    <DocPage
      path={path}
      eyebrow="SETUP GUIDE"
      title="Claude Codeのサインインとキーチェーン許可"
      lead="Token MeterのClaude連携で使う、サインインとキーチェーン許可の手順。"
    >
      <div className="doc-wrap wrap">
        <article className="doc-card">
          <DocBody html={sectionedDoc("claude-sign-in")} />
        </article>
      </div>
    </DocPage>
  );
}
