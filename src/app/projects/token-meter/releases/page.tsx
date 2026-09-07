import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/i18n";
import { DocPage, DocBody } from "@/components/doc-page";
import { releaseNotes } from "@/lib/token-meter-docs";

const path = "/projects/token-meter/releases";

export const metadata: Metadata = localizedMetadata(
  "リリースノート — Token Meter",
  "Token Meterの全バージョンの変更点、動作環境、インストール方法。",
  path,
);

export default function TokenMeterReleases() {
  return (
    <DocPage
      path={path}
      eyebrow="RELEASE HISTORY"
      title="リリースノート"
      lead="Token Meterの全バージョンの変更点、動作環境、インストール方法。"
    >
      <div className="doc-wrap wrap">
        {releaseNotes().map(({ version, html }) => (
          <article className="release-card" key={version}>
            <h2>Token Meter {version}</h2>
            <DocBody html={html} />
          </article>
        ))}
      </div>
    </DocPage>
  );
}
