import { currentLocale, locales, localeNames } from "@/lib/i18n";

export function LanguageSwitcher({ path = "/" }: { path?: string }) {
  const current = currentLocale();
  const label = { en: "Language", ja: "言語", zh: "语言", ko: "언어" }[current];

  return (
    <details className="language-switcher">
      <summary aria-label={`${localeNames[current]}: ${label}`}>{localeNames[current]}</summary>
      <nav className="language-menu" aria-label={label}>
        {locales.map((locale) => (
          <a
            key={locale}
            href={`/${locale}${path === "/" ? "" : path}`}
            hrefLang={locale === "zh" ? "zh-CN" : locale}
            lang={locale === "zh" ? "zh-CN" : locale}
            aria-current={current === locale ? "true" : undefined}
          >
            {localeNames[locale]}
          </a>
        ))}
      </nav>
    </details>
  );
}
