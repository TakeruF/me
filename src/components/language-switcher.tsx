import { currentLocale, locales, localeNames } from "@/lib/i18n";

export function LanguageSwitcher({ path = "/" }: { path?: string }) {
  const current = currentLocale();
  return <div className="language-switcher" role="group" aria-label={{en:"Language",ja:"言語",zh:"语言"}[current]}>
    {locales.map(locale=><a key={locale} href={`/${locale}${path === "/" ? "" : path}`} hrefLang={locale === "zh" ? "zh-CN" : locale} lang={locale === "zh" ? "zh-CN" : locale} aria-current={current === locale ? "true" : undefined}>{localeNames[locale]}</a>)}
  </div>;
}
