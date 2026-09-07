import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const staging = path.join(root, '.locale-export');
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging);
const locales = ['en', 'ja', 'zh'];
for (const locale of locales) {
  execFileSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], { stdio: 'inherit', env: { ...process.env, EDGEONE_STATIC_EXPORT: '1', SITE_LOCALE: locale, SITE_BASE_PATH: `/${locale}` } });
  cpSync(path.join(root, 'out'), path.join(staging, locale), { recursive: true });
}
rmSync('out', { recursive: true, force: true });
mkdirSync('out');
for (const locale of locales) cpSync(path.join(staging, locale), `out/${locale}`, { recursive: true });
const f1 = readFileSync('public/projects/f1-harmony.html', 'utf8');
const translations = JSON.parse(readFileSync('src/lib/i18n/f1.json', 'utf8'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const paths = ['/', '/work', ...readdirSync('out/ja/projects').filter(x => x.endsWith('.html') && x !== 'hanlu.html').map(x => `/projects/${x.slice(0, -5)}`)];
for (const locale of locales) {
 let html = f1;
 // Translate text and accessible metadata only. The original CSS and scripts stay intact.
 if (locale !== 'zh') {
  const dictionary = translations[locale];
  html = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>)|>([^<]+)</g, (all, untouched, text) => {
   if (untouched) return untouched;
   const key = text.trim();
   return dictionary[key] ? `>${text.replace(key, escape(dictionary[key]))}<` : all;
  });
  html = html.replace(/(content|alt|aria-label|title)="([^"]*)"/g, (all, attr, value) => dictionary[value] ? `${attr}="${escape(dictionary[value])}"` : all);
 }
 html = html.replace(/<html lang="[^"]*"/, `<html lang="${locale === 'zh' ? 'zh-CN' : locale}"`)
 .replaceAll('/projects/f1-harmony/assets/', `/${locale}/projects/f1-harmony/assets/`)
 .replace('content="assets/shots/schedule.jpg"', `content="https://takeruf.com/${locale}/projects/f1-harmony/assets/shots/schedule.jpg"`)
 .replace('https://takeruf.com/projects/f1-harmony', `https://takeruf.com/${locale}/projects/f1-harmony`);
 const switches = locales.map(l => `<a lang="${l === 'zh' ? 'zh-CN' : l}" hreflang="${l === 'zh' ? 'zh-CN' : l}" href="/${l}/projects/f1-harmony" ${l === locale ? 'aria-current="true"' : ''}>${{en:'English',ja:'日本語',zh:'中文'}[l]}</a>`).join('');
 html = html.replace('</head>', `${locales.map(l => `<link rel="alternate" hreflang="${l === 'zh' ? 'zh-CN' : l}" href="https://takeruf.com/${l}/projects/f1-harmony">`).join('')}<link rel="alternate" hreflang="x-default" href="https://takeruf.com/ja/projects/f1-harmony"><style>.locale-nav{position:sticky;top:calc(var(--nav) + env(safe-area-inset-top));z-index:101;display:flex;justify-content:flex-end;gap:4px;padding:8px max(20px,calc((100vw - 1200px)/2));background:#0b0b0d;color:#ddd;font:12px system-ui}.locale-nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 12px;color:inherit;text-decoration:none;border-radius:24px}.locale-nav a[aria-current]{background:#29292d;color:white}</style></head>`)
 .replace(/(<body[^>]*>)/, `$1<nav class="locale-nav" aria-label="${{en:'Language',ja:'言語',zh:'语言'}[locale]}">${switches}</nav>`);
 writeFileSync(`out/${locale}/projects/f1-harmony.html`, html);
}
function redirect(target) { return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${target}"><link rel="canonical" href="https://takeruf.com${target}"><title>Takeru</title><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script></head><body><a href="${target}">日本語 · Continue</a> · <a href="/en">English</a> · <a href="/zh">中文</a></body></html>`; }
for (const route of [...paths, '/projects/hanlu']) {
 const file = route === '/' ? 'out/index.html' : `out${route}.html`;mkdirSync(path.dirname(file), { recursive: true });writeFileSync(file, redirect(`/ja${route === '/' ? '' : route}`));
}
const urls = paths.flatMap(route => locales.map(locale => `<url><loc>https://takeruf.com/${locale}${route === '/' ? '' : route}</loc>${locales.map(l => `<xhtml:link rel="alternate" hreflang="${l === 'zh' ? 'zh-CN' : l}" href="https://takeruf.com/${l}${route === '/' ? '' : route}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="https://takeruf.com/ja${route === '/' ? '' : route}"/></url>`));
writeFileSync('out/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`);
cpSync('out/ja/404.html', 'out/404.html');
writeFileSync('out/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://takeruf.com/sitemap.xml\n');
rmSync(staging, { recursive: true, force: true });
