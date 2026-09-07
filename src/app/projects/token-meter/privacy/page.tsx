import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n";
import { DocPage, DocBody } from "@/components/doc-page";
import { localizedDoc } from "@/lib/token-meter-docs";

const path = "/projects/token-meter/privacy";

export const metadata: Metadata = localizedMetadata(
  "プライバシーポリシー — Token Meter",
  "Token Meterが扱うデータ、外部送信、ローカル保存、ユーザーによる制御について。",
  path,
);

export default function TokenMeterPrivacy() {
  return (
    <DocPage path={path} eyebrow="PRIVACY" title="プライバシーポリシー">
      <div className="doc-wrap wrap">
        <article className="doc-card">
          <DocBody html={localizedDoc("privacy")} />
        </article>
      </div>
    </DocPage>
  );
}
