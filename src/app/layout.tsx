import type { Metadata, Viewport } from "next";
import {
  Manrope,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const japaneseBody = Noto_Sans_JP({
  weight: "variable",
  variable: "--font-ja-body",
  display: "swap",
  preload: false,
});

const chineseBody = Noto_Sans_SC({
  weight: "variable",
  variable: "--font-zh-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Takeru Fujii — Product Designer & Builder",
  description:
    "Takeru Fujii designs and builds language-learning products and AI-native software, from product thinking to working code.",
  keywords: ["Takeru Fujii", "Product Design", "Language Learning", "AI", "Keyboard", "Hanlu"],
  authors: [{ name: "Takeru Fujii" }],
  openGraph: {
    title: "Takeru Fujii — Product Designer & Builder",
    description: "Language-learning products and AI-native software, designed from idea to working product.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eeeae0",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${japaneseBody.variable} ${chineseBody.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
