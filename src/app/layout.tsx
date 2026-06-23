import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Takeru Fujii — Takeru Universe",
  description:
    "An interactive universe of Takeru Fujii: building Hanlu, a Chinese-learning app for Japanese learners, and exploring language, AI, and product.",
  keywords: ["Takeru Fujii", "Hanlu", "Chinese learning", "Waseda", "AI", "ChatGPT Lab"],
  authors: [{ name: "Takeru Fujii" }],
  openGraph: {
    title: "Takeru Fujii — Takeru Universe",
    description: "Building tools for language learners. Explore my universe.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#03040a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
