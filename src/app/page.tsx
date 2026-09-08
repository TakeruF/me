import { SiteHeader } from "@/components/site-chrome";
import { currentLocale, localize, t } from "@/lib/i18n";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Globe2,
  Layers3,
  Mail,
  TrainFront,
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Hanlu",
    kind: "LANGUAGE LEARNING",
    theme: "hanlu",
    headline: "中国語を、毎日の習慣に。",
    description:
      "HSK単語、クイズ、音声で学ぶ中国語アプリ。学習の記録はデバイスを越えて、いつもの続きから。",
    platforms: ["Web", "iOS", "Android"],
    url: "https://hanlu.app/about",
    image: "/projects/hanlu.webp",
    alt: "Hanluの学習統計を表示したパソコン、タブレット、スマートフォン",
    width: 2880,
    height: 1800,
    links: [
      { label: "Web app", url: "https://hanlu.app/learn" },
      {
        label: "App Store",
        url: "https://apps.apple.com/jp/app/hanlu/id6760371605",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.hanlu.app",
      },
    ],
  },
  {
    number: "02",
    name: "Token Meter",
    kind: "DEVELOPER TOOL",
    theme: "token",
    headline: "AIの使用量を、ひと目で。",
    description:
      "Claude Code、Codex、Copilot CLIの利用状況を可視化。日々の使用量からレート制限まで、ネイティブアプリで確認。",
    platforms: ["macOS"],
    url: "/projects/token-meter",
    image: "/projects/token-meter.webp",
    alt: "Token Meterのメニューバーとウィジェットに表示されたClaude CodeとCodexの使用量",
    width: 2880,
    height: 1800,
    links: [
      {
        label: "Download",
        url: "https://github.com/TakeruF/token_meter/releases/latest",
      },
      { label: "GitHub", url: "https://github.com/TakeruF/token_meter" },
    ],
  },
  {
    number: "03",
    name: "Furigana Keyboard",
    kind: "JAPANESE INPUT",
    theme: "furigana",
    headline: "書いて、読んで、日本語をつなぐ。",
    description:
      "手書きとローマ字に対応する日本語キーボード。ふりがな付きの変換候補で、読みを確かめながら入力。オフラインでも使えます。",
    platforms: ["Android", "iOS"],
    url: "/projects/furigana-keyboard",
    image: "/projects/furigana-pixel-10-pro-v2.png",
    alt: "手書きの日本語とふりがな付き変換候補を表示するFurigana Keyboard",
    width: 512,
    height: 1080,
    links: [
      {
        label: "Android download",
        url: "https://downloads.takeruf.com/furigana-keyboard/1.0.0-rc.5.apk",
      },
      { label: "GitHub", url: "https://github.com/TakeruF/furigana_keyboard" },
    ],
  },
  {
    number: "04",
    name: "Per-App Language",
    kind: "ANDROID UTILITY",
    theme: "language",
    headline: "このアプリは、この言語で。",
    description:
      "Androidのアプリごとに表示言語を設定。標準の言語設定に表示されないアプリも、Shizukuを通じて切り替えられます。",
    platforms: ["Android 13+", "Shizuku"],
    url: "/projects/per-app-language",
    image: "/projects/per-app-list.webp",
    alt: "Per-App Languageのアプリ一覧と、それぞれに設定された表示言語",
    width: 538,
    height: 1200,
    links: [
      {
        label: "Download",
        url: "https://github.com/TakeruF/android-perapp-language-selector/releases/latest",
      },
      {
        label: "GitHub",
        url: "https://github.com/TakeruF/android-perapp-language-selector",
      },
    ],
  },
];

const openSource = [
  {
    name: "China Rail MCP",
    category: "TRANSPORT",
    description:
      "中国鉄道12306の公式情報へ。駅・時刻表・運賃・空席・停車駅を読み取り専用で検索。",
    icon: TrainFront,
    repo: "china-rail-mcp",
  },
  {
    name: "Japan Rail MCP",
    category: "TRANSPORT",
    description:
      "新幹線を中心に日本の鉄道を検索。駅カタログに加え、駅すぱあとAPIキーで時刻表や運賃を取得。",
    icon: TrainFront,
    repo: "japan-rail-mcp",
    underDevelopment: true,
  },
  {
    name: "MCP Mail Core",
    category: "COMMUNICATION",
    description:
      "Gmail・QQ Mail・iCloud Mail連携のための、安全性を重視したマルチアカウント対応メール基盤。",
    icon: Mail,
    repo: "mcp-mail-core",
  },
  {
    name: "Silkroad MCP",
    category: "ECOSYSTEM",
    description:
      "アジアのサービスやデバイスとAIをつなぐ、MCPサーバー・再利用可能な部品・テンプレートのカタログ。",
    icon: Layers3,
    repo: "silkroad-mcp",
  },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return localize(
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
      <span className="sr-only">（新しいタブで開く）</span>
    </a>
  );
}

export default function Page() {
  const locale = currentLocale();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Takeru",
    url: `https://takeruf.com/${locale}`,
    jobTitle: {
      en: "Student Developer & Product Builder",
      ja: "学生開発者・プロダクトビルダー",
      zh: "学生开发者与产品构建者",
      ko: "학생 개발자 · 프로덕트 빌더",
    }[locale],
    description: t("東京を拠点にWeb・モバイル・AIのプロダクトをつくる学生開発者、Takeruのポートフォリオ。Hanlu、Token Meter、Furigana Keyboard、Per-App Languageとオープンソースの取り組み。"),
    sameAs: ["https://github.com/TakeruF"],
    homeLocation: { "@type": "City", name: "Tokyo, Japan" },
  };

  return localize(
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main id="main">
        <section className="hero wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-eyebrow">
            <span className="status-dot" /> INDEPENDENT DEVELOPER & PRODUCT
            BUILDER
            <span className="hero-location">
              TOKYO, JP <Globe2 size={14} aria-hidden="true" />
            </span>
          </div>
          <h1 id="hero-title">
            Curiosity,
            <br />
            made <em>useful.</em>
            <span className="hero-asterisk" aria-hidden="true">
              ✳
            </span>
          </h1>
          <div className="hero-bottom">
            <a className="work-jump" href="#work">
              <span className="round-arrow">
                <ArrowDown size={22} aria-hidden="true" />
              </span>
              Explore my work
            </a>
            <div className="hero-intro">
              <p className="intro-name">Hi, I’m Takeru.</p>
              <p>
                東京を拠点に、Web・モバイル・AIのプロダクトをつくる学生開発者。
                <br className="desktop-break" />
                学ぶこと、つくること。日常の小さな不便を、使えるかたちに。
              </p>
            </div>
          </div>
        </section>
        <section
          className="work-section wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <div>
              <span className="section-index">01 / SELECTED WORK</span>
              <h2 id="work-title">
                Built for the everyday<span className="blue-period">.</span>
              </h2>
            </div>
            <span className="section-note">
              4 products, a little less friction.
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article
                className={`project project-${project.theme}`}
                key={project.number}
              >
                <a
                  className="project-visual"
                  href={project.url}
                  aria-label={`${project.name}の紹介ページ`}
                >
                  <div className="visual-topline">
                    <span>
                      {project.number} / {project.kind}
                    </span>
                    <span className="visual-arrow">
                      <ArrowUpRight size={20} aria-hidden="true" />
                    </span>
                  </div>
                  {project.theme === "furigana" ||
                  project.theme === "language" ? (
                    <div className="phone-composition">
                      <div className="visual-type" aria-hidden="true">
                        {project.theme === "furigana" ? (
                          <>
                            <span className="ruby-text">ことば</span>
                            <span>言葉</span>
                            <small>Write. Read. Connect.</small>
                          </>
                        ) : (
                          <>
                            <span>Hello.</span>
                            <span>你好。</span>
                            <span>こんにちは。</span>
                            <small>Your apps. Your language.</small>
                          </>
                        )}
                      </div>
                      {project.theme === "furigana" ? (
                        <Image
                          className="figma-phone-render"
                          src="/projects/furigana-pixel-10-pro-v2.png"
                          alt={project.alt}
                          width={512}
                          height={1080}
                          sizes="(max-width: 760px) 38vw, 19vw"
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          className="figma-phone-render figma-phone-render-language"
                          src="/projects/per-app-pixel-10-pro.png"
                          alt={project.alt}
                          width={512}
                          height={1080}
                          sizes="(max-width: 760px) 36vw, 18vw"
                          loading="lazy"
                        />
                      )}
                    </div>
                  ) : (
                    <Image
                      className="desktop-screenshot"
                      src={project.image}
                      alt={project.alt}
                      width={project.width}
                      height={project.height}
                      sizes="(max-width: 760px) 100vw, 50vw"
                      loading={project.number === "01" ? "eager" : "lazy"}
                    />
                  )}
                  <div className="visual-bottomline">
                    <span>{project.name}</span>
                    <span>{project.platforms.join(" / ")}</span>
                  </div>
                </a>
                <div className="project-info">
                  <div className="project-title-row">
                    <h3>
                      <a href={project.url}>{project.name}</a>
                    </h3>
                    <span className="platform-label">
                      {project.platforms.join(" · ")}
                    </span>
                  </div>
                  <p className="project-headline">{project.headline}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-links">
                    {project.links.map((link) => (
                      <ExternalLink href={link.url} key={link.label}>
                        {link.label}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Link className="all-work-link" href="/work">
            すべてのプロダクトを見る{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </section>
        <section
          className="open-section"
          id="open-source"
          aria-labelledby="open-title"
        >
          <div className="wrap open-layout">
            <div className="open-intro">
              <span className="section-index">02 / OPEN SOURCE</span>
              <h2 id="open-title">
                Better,
                <br />
                when shared<span className="blue-period">.</span>
              </h2>
              <p>
                AIと、ふだん使う世界をつなぐ。
                <br />
                鉄道、メール、アジアのサービス。
                <br />
                実用的な連携をオープンソースで。
              </p>
              <ExternalLink
                href="https://github.com/TakeruF?tab=repositories"
                className="text-link"
              >
                Explore GitHub
              </ExternalLink>
            </div>
            <div className="repo-list">
              {openSource.map((repo) => {
                const content = (
                  <>
                    <span className="repo-icon">
                      <repo.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div className="repo-copy">
                      <span className="repo-category">{repo.category}</span>
                      <h3>{repo.name}</h3>
                      <p>{repo.description}</p>
                    </div>
                    {repo.underDevelopment ? (
                      <span className="development-badge">
                        UNDER DEVELOPMENT
                      </span>
                    ) : (
                      <ArrowUpRight
                        className="repo-arrow"
                        size={22}
                        aria-hidden="true"
                      />
                    )}
                  </>
                );

                return repo.underDevelopment ? (
                  <article
                    key={repo.repo}
                    className="repo-row is-under-development"
                  >
                    {content}
                  </article>
                ) : (
                  <a
                    key={repo.repo}
                    className="repo-row"
                    href={`/projects/${repo.repo}`}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
        <section
          className="about-section wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-copy">
            <span className="section-index">03 / A LITTLE ABOUT ME</span>
            <h2 id="about-title">
              Always learning.
              <br />
              Always building<span className="blue-period">.</span>
            </h2>
            <p>
              語学を学ぶためのアプリ、開発を支えるツール、AIを日常に取り入れる仕組み。自分の好奇心から出発して、誰かの毎日に役立つプロダクトをつくっています。
            </p>
            <div className="about-signature">
              <span className="signature">Takeru</span>
              <span>
                Student developer
                <br />& product builder in Tokyo
              </span>
            </div>
            <a className="about-email" href="mailto:me@takeruf.com">
              me@takeruf.com
            </a>
          </div>
          <div className="toolbox">
            <span className="toolbox-label">MY TOOLBOX</span>
            {[
              [
                "01",
                "Mobile",
                "Swift / SwiftUI / Kotlin / Android / Jetpack Compose",
              ],
              ["02", "Web", "TypeScript / React / Next.js"],
              ["03", "AI & Backend", "Python / MCP / Supabase"],
              ["04", "Infrastructure", "Vercel / EdgeOne"],
            ].map(([number, title, tools]) => (
              <div className="toolbox-row" key={title}>
                <span className="toolbox-number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{tools}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
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
            <ExternalLink
              href="https://github.com/TakeruF"
              className="footer-cta"
            >
              Follow along on GitHub
            </ExternalLink>
          </div>
          <div className="footer-bottom">
            <a className="wordmark" href="#top">
              takeru<span>.</span>
            </a>
            <span>Made with curiosity in Tokyo.</span>
            <div>
              <a href="#top">
                Back to top <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
