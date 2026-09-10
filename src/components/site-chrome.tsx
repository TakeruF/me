import { LanguageSwitcher } from "./language-switcher";
import { ThemeSwitcher } from "./theme-switcher";
import { currentLocale, localize } from "@/lib/i18n";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader({ path = "/" }: { path?: string }) {
  return localize(
    <>
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Takeru ホーム">
          takeru<span className="logo-dot">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <a
            href="https://github.com/TakeruF"
            target="_blank"
            rel="noopener noreferrer"
            className="header-github"
          >
            GitHub <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">（新しいタブで開く）</span>
          </a>
        </nav>
        <LanguageSwitcher path={path} />
        <details className="nav-menu">
          <summary className="nav-toggle" aria-label="メニュー">
            <span className="nav-toggle-icon" aria-hidden="true" />
          </summary>
          <nav aria-label="メインナビゲーション">
            <Link href="/#work">Work</Link>
            <Link href="/#about">About</Link>
            <a
              href="https://github.com/TakeruF"
              target="_blank"
              rel="noopener noreferrer"
              className="header-github"
            >
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only">（新しいタブで開く）</span>
            </a>
          </nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter({ path = "/" }: { path?: string }) {
  return localize(
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <span className="section-index">
              GOOD THINGS START WITH CURIOSITY.
            </span>
            <p>
              See what’s <em>next.</em>
            </p>
          </div>
          <a href="mailto:me@takeruf.com" className="footer-contact-link">
            Contact me <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="wordmark">
            takeru<span>.</span>
          </Link>
          <span>Made with curiosity in Tokyo.</span>
          <div>
            <FooterThemeSwitcher />
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterThemeSwitcher() {
  return (
        <ThemeSwitcher labels={{
          en: { label: "Appearance", system: "System", light: "Light", dark: "Dark" },
          ja: { label: "外観", system: "システム", light: "ライト", dark: "ダーク" },
          zh: { label: "外观", system: "跟随系统", light: "浅色", dark: "深色" },
          ko: { label: "화면 모드", system: "시스템", light: "라이트", dark: "다크" },
        }[currentLocale()]} />
  );
}
