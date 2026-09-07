import Link from "next/link";
import { t } from "@/lib/i18n";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * A product resource: either an outbound link (new tab, announced to screen
 * readers) or a page on this site, such as Token Meter's own documents.
 */
export function ResourceLink({
  href,
  label,
  internal,
  size = 15,
}: {
  href: string;
  label: string;
  internal?: boolean;
  size?: number;
}) {
  if (internal) {
    return (
      <Link href={href}>
        {t(label)}
        <ArrowRight size={size} aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {t(label)}
      <ArrowUpRight size={size} aria-hidden="true" />
      <span className="sr-only">{t("（新しいタブで開く）")}</span>
    </a>
  );
}
