import type { Metadata } from "next";
import { DocBody, DocPage } from "@/components/doc-page";
import { localizedMetadata } from "@/lib/i18n";
import { privacyPolicyHtml } from "@/lib/androp-docs";

const path = "/projects/androp/privacy";

export const metadata: Metadata = localizedMetadata(
  "プライバシーポリシー — anDrop",
  "anDropのファイル転送、ローカル保存、診断と配布経路別の更新通信について。",
  path,
);

export default function AndropPrivacy() {
  return (
    <DocPage
      path={path}
      eyebrow="PRIVACY"
      title="anDropのプライバシーポリシー"
      backPath="/projects/androp"
      backLabel="anDropに戻る"
    >
      <div className="doc-wrap wrap">
        <article className="doc-card">
          <DocBody html={privacyPolicyHtml()} />
        </article>
      </div>
    </DocPage>
  );
}
