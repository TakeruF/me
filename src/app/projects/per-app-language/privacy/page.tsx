import type { Metadata } from "next";
import { DocBody, DocPage } from "@/components/doc-page";
import { localizedMetadata } from "@/lib/i18n";
import { privacyPolicyHtml } from "@/lib/per-app-language-docs";

const path = "/projects/per-app-language/privacy";

export const metadata: Metadata = localizedMetadata(
  "プライバシーポリシー — Per-App Language",
  "Per-App Languageが端末上でアクセス、利用、保存、保護する情報について。",
  path,
);

export default function PerAppLanguagePrivacy() {
  return (
    <DocPage
      path={path}
      eyebrow="PRIVACY"
      title="Per-App Languageのプライバシーポリシー"
      backPath="/projects/per-app-language"
      backLabel="Per-App Languageに戻る"
    >
      <div className="doc-wrap wrap">
        <article className="doc-card">
          <DocBody html={privacyPolicyHtml()} />
        </article>
      </div>
    </DocPage>
  );
}
