import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = path => readFileSync(path, 'utf8');
const locales = ['en', 'ja', 'zh', 'ko'];
const f1 = read('public/projects/f1-harmony.html');
const originalStyle = f1.match(/<style>([\s\S]*?)<\/style>/)[1];
const originalScript = f1.match(/<script>([\s\S]*?)<\/script>/)[1];
let checked = 0;
for (const locale of locales) {
 const pages = ['index.html', 'work.html', ...readdirSync(`out/${locale}/projects`).filter(p=>p.endsWith('.html')&&p!=='hanlu.html').map(p=>`projects/${p}`)];
 assert.equal(pages.length, 14);
 for (const page of pages) {
  const html = read(`out/${locale}/${page}`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}/${page} document language`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}/${page} footer contact`);
  const route = page === 'index.html' ? '' : '/'+page.replace(/\.html$/, '');
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}/${page} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${page} switch to ${language}`);
  for (const [,url] of html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)) {
   if(url.startsWith('//'))continue;
   const file='out'+url.split(/[?#]/)[0];
   assert.ok(existsSync(file)||existsSync(file+'.html'),`${page}: missing ${url}`);
  }
  checked++;
 }
 const token = read(`out/${locale}/projects/token-meter.html`);
 assert.equal((token.match(/class="screen-slide /g)||[]).length,3);
 assert.equal((token.match(/class="story-section /g)||[]).length,6);
 const racing=read(`out/${locale}/projects/f1-harmony.html`);
 assert.ok(racing.includes(originalStyle),'F1 original design');
 assert.ok(racing.includes(originalScript),'F1 original motion');
 assert.equal((racing.match(/<section\b/g)||[]).length,6);
 assert.ok(read(`out/${locale}/index.html`).includes('https://hanlu.app/about'));
 const work = read(`out/${locale}/work.html`);
 const renderedWork = work.match(/<body[^>]*>([\s\S]*?)<script/)[1];
 assert.ok(!work.includes('MAGcup'));
 assert.ok(!work.includes('英単語マスター'));
 assert.ok(!work.includes('keyboard.hanlu.app'));
 assert.ok(read(`out/${locale}/projects/furigana-keyboard.html`).includes('https://downloads.takeruf.com/furigana-keyboard/1.0.0-rc.5.apk'));
 for (const slug of ['markdown-docs', 'flight-market', 'japan-rail-mcp']) {
  assert.ok(!existsSync(`out/${locale}/projects/${slug}.html`));
  assert.ok(!work.includes(`href="/${locale}/projects/${slug}"`));
 }
 assert.equal((renderedWork.match(/UNDER DEVELOPMENT/g)||[]).length,3);
}
for (const locale of locales) {
 for (const doc of ['releases', 'privacy', 'claude-sign-in']) {
  const route = `/projects/token-meter/${doc}`;
  const html = read(`out/${locale}${route}.html`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}${route} document language`);
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}${route} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${route} switch to ${language}`);
  assert.ok(html.includes(`href="/${locale}/projects/token-meter"`), `${route} links back to the product page`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}${route} footer contact`);
 }
 for (const doc of ['privacy', 'terms']) {
  const route = `/projects/furigana-keyboard/${doc}`;
  const html = read(`out/${locale}${route}.html`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}${route} document language`);
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}${route} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${route} switch to ${language}`);
  assert.ok(html.includes('support@takeruf.com'), `${route} support contact`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}${route} footer contact`);
 }
 {
  const route = '/projects/per-app-language/privacy';
  const html = read(`out/${locale}${route}.html`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}${route} document language`);
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}${route} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${route} switch to ${language}`);
  assert.ok(html.includes(`href="/${locale}/projects/per-app-language"`), `${route} links back to the product page`);
  assert.ok(html.includes('Per-App Language is developed by TakeruF.'), `${locale}${route} app policy content`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}${route} footer contact`);
 }
 const notes = read(`out/${locale}/projects/token-meter/releases.html`);
 assert.equal((notes.match(/class="release-card"/g)||[]).length, 22, `${locale} release notes`);
 assert.ok(!read(`out/${locale}/projects/token-meter.html`).includes('takeruf.github.io/token_meter'));
}
assert.equal((read('out/sitemap.xml').match(/<url>/g)||[]).length,80);
assert.ok(read('out/index.html').includes('0;url=/en'));
assert.ok(read('out/index.html').includes('<html lang="en">'));
assert.ok(read('out/index.html').includes("navigator.languages"));
assert.ok(read('out/index.html').includes("['en','ja','zh','ko']"));
assert.ok(read('out/sitemap.xml').includes('hreflang="x-default" href="https://takeruf.com/en"'));
console.log(`Verified ${checked} localized pages, links/assets, language alternates, original galleries and F1 design.`);
