import { currentLocale, locales, localeNames } from "@/lib/i18n";

export function LanguageSwitcher({ path = "/" }: { path?: string }) {
  const current = currentLocale();
  const label = { en: "Language", ja: "言語", zh: "语言", ko: "언어" }[current];

  return (
    <details className="language-switcher">
      <summary aria-label={label}>{localeNames[current]}</summary>
      <div className="language-menu" role="menu" aria-label={label}>
        {locales.map((locale) => (
          <a
            key={locale}
            href={`/${locale}${path === "/" ? "" : path}`}
            hrefLang={locale === "zh" ? "zh-CN" : locale}
            lang={locale === "zh" ? "zh-CN" : locale}
            aria-current={current === locale ? "true" : undefined}
            role="menuitem"
          >
            {localeNames[locale]}
          </a>
        ))}
      </div>
    </details>
  );
}
