import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main">
        本文へ移動
      </a>
      <header className="site-header wrap">
        <Link className="wordmark" href="/" aria-label="Takeru ホーム">
          takeru<span className="logo-dot">.</span>
        </Link>
        <nav aria-label="メインナビゲーション">
          <Link href="/work">Work</Link>
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
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
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
          <Link href="/work" className="footer-cta">
            Explore all work <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="wordmark">
            takeru<span>.</span>
          </Link>
          <span>Made with curiosity in Tokyo.</span>
          <div>
            <a
              href="https://github.com/TakeruF/cn"
              target="_blank"
              rel="noopener noreferrer"
            >
              简体中文 <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
