import type { Metadata } from "next";
import { DocBody, DocPage } from "@/components/doc-page";
import { localizedMetadata } from "@/lib/i18n";
import { privacyPolicyHtml } from "@/lib/per-app-language-docs";

const path = "/projects/per-app-language/privacy";

export const metadata: Metadata = localizedMetadata(
  "Privacy Policy — Per-App Language",
  "How Per-App Language accesses, uses, stores, and protects information on your device.",
  path,
);

export default function PerAppLanguagePrivacy() {
  return (
    <DocPage
      path={path}
      eyebrow="PRIVACY"
      title="Privacy Policy for Per-App Language"
      backPath="/projects/per-app-language"
      backLabel="Back to Per-App Language"
    >
      <div className="doc-wrap wrap">
        <article className="doc-card">
          <DocBody html={privacyPolicyHtml()} />
        </article>
      </div>
    </DocPage>
  );
}
