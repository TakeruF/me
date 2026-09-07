import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const japanese = Noto_Sans_JP({
  weight: ["400", "500", "600"],
  variable: "--font-ja-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://takeruf.com"),
  alternates: { canonical: "/" },
  title: "Takeru — Developer & Product Builder",
  description:
    "東京を拠点にWeb・モバイル・AIのプロダクトをつくる学生開発者、Takeruのポートフォリオ。Hanlu、Token Meter、Furigana Keyboard、Per-App Languageとオープンソースの取り組み。",
  authors: [{ name: "Takeru", url: "https://github.com/TakeruF" }],
  openGraph: {
    url: "https://takeruf.com",
    title: "Takeru — Developer & Product Builder",
    description:
      "Curiosity, made useful. 語学学習アプリ、開発者ツール、実用的なAIワークフロー。",
    type: "website",
    locale: "ja_JP",
  },
};
export const viewport: Viewport = {
  themeColor: "#fcfdfb",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${body.variable} ${japanese.variable}`}>
      <body>{children}</body>
    </html>
  );
}
