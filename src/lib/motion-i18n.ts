// UI copy for the "Motion Field" design (src/components/motion/*).
// Language list, principles, and product copy are reused from journey-i18n;
// only strings the new layout needs are defined here.

import type { Language } from "@/lib/journey-i18n";

export const MOTION_COPY = {
  en: {
    nav: { principles: "Principles", contact: "Contact" },
    hero: {
      kicker: "Takeru Fujii · Product designer & builder",
      statement: ["I make complex", "things feel clear."],
      caption:
        "I design and build products for language learning and AI—from the learning model and interaction design to working software.",
      scroll: "Explore the work",
      local: "Local time",
    },
    chapter: { label: "Chapter", live: "Live", building: "In development" },
    principles: { kicker: "How I work", title: ["Clarity is", "the product."] },
    footer: {
      title: ["Have something", "hard to simplify?"],
      body: "If you are building a learning product, an AI tool, or an interface for a difficult idea, I would like to hear about it.",
      built: "Designed and built by Takeru Fujii",
    },
    a11y: { language: "Language", openMenu: "Open menu", closeMenu: "Close menu", home: "Back to top" },
  },
  ja: {
    nav: { principles: "原則", contact: "コンタクト" },
    hero: {
      kicker: "藤井 武 · プロダクトデザイン / 開発",
      statement: ["複雑なことを、", "自然に使える形へ。"],
      caption:
        "言語学習とAIの領域で、学びの仕組みからインターフェース、動くソフトウェアまでを一貫して設計・開発しています。",
      scroll: "プロダクトを見る",
      local: "現地時刻",
    },
    chapter: { label: "チャプター", live: "公開中", building: "開発中" },
    principles: { kicker: "仕事の進め方", title: ["わかりやすさも、", "プロダクトの一部。"] },
    footer: {
      title: ["複雑な課題を、", "一緒にほどく。"],
      body: "学びのプロダクト、AIツール、難しい概念を扱うインターフェースをつくっている方は、ぜひ声をかけてください。",
      built: "藤井 武によるデザインと開発",
    },
    a11y: { language: "言語", openMenu: "メニューを開く", closeMenu: "メニューを閉じる", home: "トップへ戻る" },
  },
  zh: {
    nav: { principles: "原则", contact: "联系" },
    hero: {
      kicker: "藤井武 · 产品设计与开发",
      statement: ["把复杂的问题，", "变成自然的体验。"],
      caption: "专注语言学习与AI产品，从学习机制、交互设计到可运行的软件，完整地设计并构建产品。",
      scroll: "查看产品",
      local: "本地时间",
    },
    chapter: { label: "章节", live: "已上线", building: "开发中" },
    principles: { kicker: "工作方式", title: ["清晰本身，", "就是产品。"] },
    footer: {
      title: ["有一个复杂问题，", "值得一起解决？"],
      body: "如果你正在构建学习产品、AI工具，或需要解释复杂概念的界面，欢迎联系。",
      built: "藤井武设计与开发",
    },
    a11y: { language: "语言", openMenu: "打开菜单", closeMenu: "关闭菜单", home: "返回顶部" },
  },
} as const;

export type MotionCopy = (typeof MOTION_COPY)[Language];
