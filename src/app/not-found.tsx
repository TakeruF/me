import Link from "next/link";
import { localize } from "@/lib/i18n";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
export default function NotFound() {
  return localize(<><SiteHeader /><main id="main" className="wrap catalog-hero"><span className="section-index">404</span><h1>ページが見つかりません。</h1><p>プロダクト一覧から、お探しのページをご覧ください。</p><Link href="/work">プロダクト一覧へ →</Link></main><SiteFooter /></>);
}
