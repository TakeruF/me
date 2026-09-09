import Link from "next/link";
import { ArrowUpRight, CornerDownLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header className="not-found-header wrap">
        <Link className="wordmark" href="/" aria-label="Takeru home">
          takeru<span className="logo-dot">.</span>
        </Link>
        <Link className="not-found-home-link" href="/">
          Home <CornerDownLeft size={15} aria-hidden="true" />
        </Link>
      </header>

      <main id="main" className="not-found-main wrap">
        <section className="not-found-content" aria-labelledby="not-found-title">
          <div className="not-found-copy">
            <p className="not-found-kicker">
              <Sparkles size={14} aria-hidden="true" /> 404 / PAGE NOT FOUND
            </p>
            <h1 id="not-found-title">
              Wrong turn.<br />
              <em>Good taste.</em>
            </h1>
            <p className="not-found-description">
              The page you were looking for has moved, changed, or never made
              it into the build. The good stuff is still close by.
            </p>
            <div className="not-found-actions">
              <Link className="not-found-primary" href="/work">
                Explore the work <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link className="not-found-secondary" href="/">
                Return home
              </Link>
            </div>
          </div>

          <div className="not-found-mark" aria-hidden="true">
            <span>404</span>
            <p>CURIOUSLY<br />OFF COURSE</p>
          </div>
        </section>
      </main>

      <footer className="not-found-footer wrap">
        <span>TAKERU — DEVELOPER &amp; PRODUCT BUILDER</span>
        <span>Tokyo, Japan</span>
      </footer>
    </div>
  );
}
