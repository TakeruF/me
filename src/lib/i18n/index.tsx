import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";
import en from "./en.json";
import ja from "./ja.json";
import zh from "./zh.json";

export const locales = ["en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const localeNames = { en: "English", ja: "日本語", zh: "中文" };
export function currentLocale(): Locale {
  const locale = process.env.SITE_LOCALE;
  return locale === "en" || locale === "zh" ? locale : "ja";
}
export function basePath() { return process.env.SITE_BASE_PATH || ""; }
const dictionaries: Record<Locale, Record<string, string>> = { en, ja, zh };
export function t(source: string, locale = currentLocale()): string {
  const key = source.trim().replace(/\s+/g, " ");
  const translated = dictionaries[locale][key];
  if (translated !== undefined) return source.replace(source.trim(), translated);
  return source;
}
export function localizedHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (/^\/(en|ja|zh)(\/|$|#|\?)/.test(href)) return href;
  return `${basePath()}${href === "/" ? "" : href}` || "/";
}
export function alternateLanguages(path: string) {
  return Object.fromEntries(locales.map(locale => [locale === "zh" ? "zh-CN" : locale, `https://takeruf.com/${locale}${path === "/" ? "" : path}`]));
}
export function localizedMetadata(title: string, description: string, path: string) {
  const locale = currentLocale();
  return {
    title: t(title), description: t(description),
    alternates: { canonical: localizedHref(path), languages: { ...alternateLanguages(path), "x-default": `https://takeruf.com/ja${path === "/" ? "" : path}` } },
    openGraph: { title: t(title), description: t(description), url: `https://takeruf.com${localizedHref(path)}`, locale: { en: "en_US", ja: "ja_JP", zh: "zh_CN" }[locale], alternateLocale: locales.filter(l=>l!==locale).map(l=>({en:"en_US",ja:"ja_JP",zh:"zh_CN"})[l]) },
  };
}

/** Translate server-rendered copy and accessible labels together. No DOM rewriting. */
export function localize(node: ReactNode): ReactNode {
  return Children.map(node, child => {
    if (typeof child === "string") return t(child);
    if (!isValidElement(child)) return child;
    const element = child as ReactElement<Record<string, unknown>>;
    const props = element.props;
    if (props["data-preserve-language"]) return child;
    const next: Record<string, unknown> = {};
    for (const key of ["alt", "title", "aria-label", "aria-roledescription"]) {
      if (typeof props[key] === "string") next[key] = t(props[key]);
    }
    for (const key of ["href", "src"]) {
      if (typeof props[key] === "string" && (key === "src" || typeof element.type === "string")) next[key] = localizedHref(props[key]);
    }
    if (props.children !== undefined) next.children = localize(props.children as ReactNode);
    return cloneElement(element, next);
  });
}
