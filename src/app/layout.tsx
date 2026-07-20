import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  Inter,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Noto_Serif_JP,
  Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const japaneseDisplay = Noto_Serif_JP({
  weight: "variable",
  variable: "--font-ja-display",
  display: "swap",
  preload: false,
});

const japaneseBody = Noto_Sans_JP({
  weight: "variable",
  variable: "--font-ja-body",
  display: "swap",
  preload: false,
});

const chineseDisplay = Noto_Serif_SC({
  weight: "variable",
  variable: "--font-zh-display",
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
  title: "Takeru Fujii — Products in Motion",
  description:
    "A kinetic, generative portfolio of Takeru Fujii's products: Keyboard, Hanlu, Shiru, and AI Studio.",
  keywords: ["Takeru Fujii", "Keyboard", "Hanlu", "Shiru", "AI Studio", "Product Design"],
  authors: [{ name: "Takeru Fujii" }],
  openGraph: {
    title: "Takeru Fujii — Products in Motion",
    description: "A kinetic portfolio of products built for language, learning, and AI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${japaneseDisplay.variable} ${japaneseBody.variable} ${chineseDisplay.variable} ${chineseBody.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
