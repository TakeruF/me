import type { Metadata } from "next";
import { DocBody, DocPage } from "@/components/doc-page";
import { currentLocale, localizedMetadata } from "@/lib/i18n";
import { privacyPolicyHtml } from "@/lib/nagi-docs";

const path = "/nagi/privacy";
const copy = {
  en: { title: "Nagi Privacy Policy", description: "How Nagi stores and handles your information.", back: "Back to Nagi" },
  ja: { title: "Nagiのプライバシーポリシー", description: "Nagiによる情報の保存と取り扱いについて。", back: "Nagiに戻る" },
  zh: { title: "Nagi 隐私政策", description: "Nagi 如何保存和处理您的信息。", back: "返回 Nagi" },
  ko: { title: "Nagi 개인정보 처리방침", description: "Nagi의 정보 저장 및 처리 방법입니다.", back: "Nagi로 돌아가기" },
};
const text = copy[currentLocale()];
export const metadata: Metadata = localizedMetadata(text.title, text.description, path);

export default function NagiPrivacy() {
  return (
    <DocPage path={path} eyebrow="PRIVACY" title={text.title} backPath="/projects/nagi" backLabel={text.back}>
      <div className="doc-wrap wrap"><article className="doc-card"><DocBody html={privacyPolicyHtml()} /></article></div>
    </DocPage>
  );
}
