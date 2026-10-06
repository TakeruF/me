import { currentLocale, localizedMetadata } from "@/lib/i18n";
import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://takeruf.com"),
  ...localizedMetadata("Takeru — Developer & Product Builder", "東京を拠点にWeb・モバイル・AIのプロダクトをつくる学生開発者、Takeruのポートフォリオ。Hanlu、Token Meter、Furigana Keyboard、Per-App Languageとオープンソースの取り組み。", "/"),
  authors: [{ name: "Takeru", url: "https://github.com/TakeruF" }],
  creator: "Takeru",
  publisher: "Takeru",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang={currentLocale() === "zh" ? "zh-CN" : currentLocale()}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem("takeru-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()` }} />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
