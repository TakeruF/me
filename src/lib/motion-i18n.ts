// UI copy for the "Motion Field" design (src/components/motion/*).
// Language list, principles, and product copy are reused from journey-i18n;
// only strings the new layout needs are defined here.

import type { Language } from "@/lib/journey-i18n";

export const MOTION_COPY = {
  en: {
    nav: { principles: "Principles", contact: "Contact" },
    hero: {
      kicker: "Takeru Fujii · Portfolio",
      statement: ["Products", "in motion."],
      caption:
        "First-year Economics student at Waseda, building tools for language learners — where language, AI, and product design meet.",
      scroll: "Scroll to move",
      local: "Local time",
    },
    chapter: { label: "Chapter", live: "Live", building: "In development" },
    principles: { kicker: "Principles", title: ["What I carry", "into every build."] },
    footer: {
      title: ["The next", "horizon."],
      body: "New routes are already drafting themselves. Follow along — or reach out and build the next one with me.",
      built: "Designed & built in motion",
    },
    a11y: { language: "Language", openMenu: "Open menu", closeMenu: "Close menu", home: "Back to top" },
  },
  ja: {
    nav: { principles: "原則", contact: "コンタクト" },
    hero: {
      kicker: "Takeru Fujii · ポートフォリオ",
      statement: ["プロダクトを、", "動き続けるものに。"],
      caption:
        "早稲田大学で経済学を学びながら、言語学習者のための道具をつくっています。言語・AI・プロダクトデザインの交差点で。",
      scroll: "スクロールして進む",
      local: "現地時刻",
    },
    chapter: { label: "チャプター", live: "公開中", building: "開発中" },
    principles: { kicker: "原則", title: ["ものづくりに、", "持ち込むもの。"] },
    footer: {
      title: ["次の地平へ、", "進もう。"],
      body: "新しい路線は、すでに描かれ始めています。最新情報をフォロー、または次のプロダクトを一緒につくりませんか。",
      built: "動きの中でデザイン・構築",
    },
    a11y: { language: "言語", openMenu: "メニューを開く", closeMenu: "メニューを閉じる", home: "トップへ戻る" },
  },
  zh: {
    nav: { principles: "原则", contact: "联系" },
    hero: {
      kicker: "Takeru Fujii · 作品集",
      statement: ["让产品", "持续运动。"],
      caption: "在早稻田大学攻读经济学，同时为语言学习者打造工具——游走在语言、AI 与产品设计的交汇处。",
      scroll: "滚动前行",
      local: "本地时间",
    },
    chapter: { label: "章节", live: "已上线", building: "开发中" },
    principles: { kicker: "原则", title: ["每件作品", "背后的坚持。"] },
    footer: {
      title: ["驶向", "下一地平线。"],
      body: "新的路线已在绘制中。欢迎关注最新动态，或与我一起构建下一个产品。",
      built: "于运动中设计与构建",
    },
    a11y: { language: "语言", openMenu: "打开菜单", closeMenu: "关闭菜单", home: "返回顶部" },
  },
} as const;

export type MotionCopy = (typeof MOTION_COPY)[Language];
