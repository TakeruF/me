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
              <span className="detail-platform">0.1.1 · Android 8.0 及以上 · 5.2 MB</span>
              <a className="primary-cta" href="/nagi/nagi-0.1.1.apk" download="nagi-0.1.1.apk">下载 Android APK<Download size={18} aria-hidden="true" /></a>
              <div className="detail-links"><a href="https://github.com/TakeruF/android-tab-browser/releases/tag/v0.1.1">查看 0.1.1 更新说明<ArrowUpRight size={13} aria-hidden="true" /></a><a href="https://github.com/TakeruF/android-tab-browser">查看源码与功能说明<ArrowUpRight size={13} aria-hidden="true" /></a></div>
            </div>
          </div>
        </section>
        <ul className="story-facts wrap"><li>已使用开发者发布密钥签名</li><li>推荐在平板横屏使用</li><li>更新于 2026 年 10 月 6 日</li></ul>
        <section className="detail-features wrap" aria-labelledby="install-title">
          <div className="detail-section-label"><span className="section-index">01 / 开始使用</span><h2 id="install-title">三步，<br />开始浏览。</h2></div>
          <div>
            <article className="feature-row"><span className="feature-number">01</span><div><h3>下载 APK</h3><p>点击上方的下载按钮，将安装文件保存到 Android 设备。</p></div></article>
            <article className="feature-row"><span className="feature-number">02</span><div><h3>打开安装文件</h3><p>在浏览器的下载记录或文件管理器中，打开 nagi-0.1.1.apk。</p></div></article>
            <article className="feature-row"><span className="feature-number">03</span><div><h3>完成安装</h3><p>按照系统提示，允许此来源安装应用，然后点击安装。安装完成后即可打开 Nagi。</p></div></article>
          </div>
        </section>
        <section className="detail-features wrap" aria-labelledby="release-title">
          <div className="detail-section-label"><span className="section-index">02 / 0.1.1 更新</span><h2 id="release-title">浏览更顺手，<br />更新更方便。</h2></div>
          <div>
            <article className="feature-row"><span className="feature-number">01</span><div><h3>书签与网页操作</h3><p>保存、查看和删除书签；长按或右键点击链接、图片，可打开新标签页、复制或分享链接，以及保存图片。</p></div></article>
            <article className="feature-row"><span className="feature-number">02</span><div><h3>清理网站数据，保留工作空间</h3><p>可清除 Cookie、网站存储和网页缓存，同时保留 Space、标签页、书签与浏览历史。</p></div></article>
            <article className="feature-row"><span className="feature-number">03</span><div><h3>跨功能修复与应用内更新</h3><p>修复双窗格键盘焦点、正在显示的页面被归档、大写 HTTPS 搜索模板和文件上传扩展名问题。改善加载超时后的恢复，调整地址栏按钮间距与 Space 选中边框，并加入经过校验的 APK 更新流程。</p></div></article>
          </div>
        </section>
        <section className="detail-notes wrap" aria-labelledby="notes-title">
          <div><span className="section-index">03 / 安装说明</span><h2 id="notes-title">安装前须知</h2></div>
          <div>
            <ul><li>此版本通过 APK 直接分发，支持 Android 8.0 及以上版本。</li><li>已从本站安装 0.1.0 的用户，可直接打开 0.1.1 APK 覆盖更新；无需卸载，Space、标签页和书签会保留。</li><li>0.1.0 尚无应用内更新功能，首次升级需手动安装此 APK。升级后，可在设置中的“应用更新”检查、下载并安装后续版本。</li><li>本地 Debug 版或旧的 com.orbit.browser 使用不同签名或应用标识，无法直接覆盖为此发布版本。</li></ul>
            <p><a href="https://takeruf.com/zh/nagi/privacy">隐私政策</a> · <a href="mailto:me@takeruf.com">联系开发者</a></p>
            <details className="nagi-checksum"><summary>查看文件 SHA-256</summary><code>cda3dee9a7aaa83268f745b67a2599dc4774219de824c51735fc42bcc42959f9</code></details>
          </div>
        </section>
      </main>
      <SiteFooter path="/nagi" chineseOnly />
    </>
  );
}
