import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

const description = "Nagi 是为 Android 平板打造的工作空间浏览器。用侧边栏整理标签页，通过 Space 切换任务，使用双窗格并排浏览。下载已签名的 Android APK。";
export const metadata: Metadata = {
  title: "Nagi — Android 工作空间浏览器",
  description,
  alternates: { canonical: "https://takeruf.com/nagi", languages: {} },
  openGraph: { title: "Nagi — Android 工作空间浏览器", description, url: "https://takeruf.com/nagi", locale: "zh_CN", alternateLocale: [] },
  twitter: { card: "summary_large_image", title: "Nagi — Android 工作空间浏览器", description },
};

export default function NagiPage() {
  return (
    <>
      <SiteHeader path="/nagi" chineseOnly />
      <main id="main">
        <section className="detail-hero wrap">
          <a className="back-to-work" href="/zh/work"><ArrowLeft size={15} aria-hidden="true" />全部作品<span>/ Android</span></a>
          <div className="detail-title-row">
            <div><span className="section-index">ANDROID / 工作空间浏览器</span><h1>Nagi<span className="blue-period">.</span></h1></div>
            <span className="detail-star" aria-hidden="true">✳</span>
          </div>
          <div className="detail-summary">
            <div>
              <h2>让标签井然有序，让浏览从容自在。</h2>
              <p>专为 Android 平板打造的工作空间浏览器。用侧边栏整理网页，通过 Space 切换不同任务，使用双窗格并排浏览，让需要的页面触手可及。</p>
            </div>
            <div className="detail-actions">
              <span className="detail-platform">0.1.0 · 初期版本 · Android 8.0 及以上 · 5.1 MB</span>
              <a className="primary-cta" href="/nagi/nagi-0.1.0.apk" download="nagi-0.1.0.apk">下载 Android APK<Download size={18} aria-hidden="true" /></a>
              <div className="detail-links"><a href="https://github.com/TakeruF/android-tab-browser">查看源码与功能说明<ArrowUpRight size={13} aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>
        <ul className="story-facts wrap"><li>已使用开发者发布密钥签名</li><li>推荐在平板横屏使用</li><li>更新于 2026 年 10 月 6 日</li></ul>
        <section className="detail-features wrap" aria-labelledby="install-title">
          <div className="detail-section-label"><span className="section-index">01 / 开始使用</span><h2 id="install-title">三步，<br />开始浏览。</h2></div>
          <div>
            <article className="feature-row"><span className="feature-number">01</span><div><h3>下载 APK</h3><p>点击上方的下载按钮，将安装文件保存到 Android 设备。</p></div></article>
            <article className="feature-row"><span className="feature-number">02</span><div><h3>打开安装文件</h3><p>在浏览器的下载记录或文件管理器中，打开 nagi-0.1.0.apk。</p></div></article>
            <article className="feature-row"><span className="feature-number">03</span><div><h3>完成安装</h3><p>按照系统提示，允许此来源安装应用，然后点击安装。安装完成后即可打开 Nagi。</p></div></article>
          </div>
        </section>
        <section className="detail-notes wrap" aria-labelledby="notes-title">
          <div><span className="section-index">02 / 安装说明</span><h2 id="notes-title">安装前须知</h2></div>
          <div>
            <ul><li>此版本通过 APK 直接分发，支持 Android 8.0 及以上版本。</li><li>如果已安装 Debug 版，由于签名不同，需要先卸载旧版。卸载会删除应用内数据。</li><li>这是初期版本。更多功能、支持范围与当前限制，可在项目说明中查看。</li></ul>
            <details className="nagi-checksum"><summary>查看文件 SHA-256</summary><code>b0efc8eabb61f2f1b78d5f4129ead93bc4a2ea5a9e9d340436e28dd772f08bd1</code></details>
          </div>
        </section>
      </main>
      <SiteFooter path="/nagi" chineseOnly />
    </>
  );
}
