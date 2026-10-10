import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const read = path => readFileSync(path, 'utf8');
const locales = ['en', 'ja', 'zh', 'ko'];
const policyIntro = {
 en: 'Per-App Language is developed by TakeruF.',
 ja: 'Per-App Language は TakeruF が開発しています。',
 zh: 'Per-App Language 由 TakeruF 开发。',
 ko: 'Per-App Language는 TakeruF가 개발합니다.',
};
const f1 = read('public/projects/f1-harmony.html');
const originalStyle = f1.match(/<style>([\s\S]*?)<\/style>/)[1];
const originalScript = f1.match(/<script>([\s\S]*?)<\/script>/)[1];
let checked = 0;
for (const locale of locales) {
 const pages = ['index.html', 'work.html', ...readdirSync(`out/${locale}/projects`).filter(p=>p.endsWith('.html')&&p!=='hanlu.html').map(p=>`projects/${p}`)];
 assert.equal(pages.length, 15);
 for (const page of pages) {
  const html = read(`out/${locale}/${page}`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}/${page} document language`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}/${page} footer contact`);
  const route = page === 'index.html' ? '' : '/'+page.replace(/\.html$/, '');
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}/${page} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${page} switch to ${language}`);
  for (const [,url] of html.matchAll(/(?:href|src)="(\/[^" ]*)"/g)) {
   if(url.startsWith('//'))continue;
   const file='out'+decodeURIComponent(url.split(/[?#]/)[0]);
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
  assert.ok(html.includes(policyIntro[locale]), `${locale}${route} localized app policy content`);
  assert.ok(html.includes('href="mailto:me@takeruf.com"'), `${locale}${route} footer contact`);
 }
 const notes = read(`out/${locale}/projects/token-meter/releases.html`);
 assert.equal((notes.match(/class="release-card"/g)||[]).length, 22, `${locale} release notes`);
 assert.ok(!read(`out/${locale}/projects/token-meter.html`).includes('takeruf.github.io/token_meter'));
}
assert.equal((read('out/sitemap.xml').match(/<url>/g)||[]).length,88);
assert.ok(read('out/nagi.html').includes('0;url=/en/projects/nagi'));
assert.ok(read('out/nagi.html').includes('navigator.languages'));
for (const locale of locales) {
 const html = read(`out/${locale}/projects/nagi.html`);
 assert.ok(html.includes('https://takeruf.com/nagi/nagi-0.3.0.apk'));
 assert.ok(html.includes('9d258ca8d3b9ae14c781c5bd6c258a90acc26fdbac0a2b293668a4ef53aca8a0'));
 assert.ok(read(`out/${locale}/work.html`).includes(`/${locale}/projects/nagi`));
 assert.ok(read(`out/${locale}/index.html`).includes(`/${locale}/projects/nagi`));
 assert.ok(read('out/sitemap.xml').includes(`https://takeruf.com/${locale}/projects/nagi`));
}
for (const version of ['0.1.0', '0.1.1', '0.1.2', '0.1.3', '0.2.0', '0.2.1', '0.3.0']) {
 assert.ok(existsSync(`out/nagi/nagi-${version}.apk`));
}
assert.equal(createHash('sha256').update(readFileSync('out/nagi/nagi-0.3.0.apk')).digest('hex'),
 '9d258ca8d3b9ae14c781c5bd6c258a90acc26fdbac0a2b293668a4ef53aca8a0');
assert.ok(read('out/index.html').includes('0;url=/en'));
assert.ok(read('out/index.html').includes('<html lang="en">'));
assert.ok(read('out/index.html').includes("navigator.languages"));
assert.ok(read('out/index.html').includes("['en','ja','zh','ko']"));
assert.ok(read('out/sitemap.xml').includes('hreflang="x-default" href="https://takeruf.com/en"'));
console.log(`Verified ${checked} localized pages, links/assets, language alternates, original galleries and F1 design.`);

// Nagi legal pages must contain translated policy bodies and canonical routes.
for (const [locale, phrase] of Object.entries({ en: 'Data stored on your device', ja: '端末に保存する情報', zh: '保存在设备上的信息', ko: '기기에 저장하는 정보' })) {
 const html = readFileSync(`out/${locale}/nagi/privacy.html`, 'utf8');
 assert.ok(html.includes(phrase), `Nagi policy body missing for ${locale}`);
 assert.ok(html.includes(`https://takeruf.com/${locale}/nagi/privacy`));
 assert.ok(html.includes('support@takeruf.com'));
 assert.ok(html.includes('easylist.to') && html.includes('filters.adtidy.org'));
}
assert.ok(readFileSync('out/nagi/privacy.html', 'utf8').includes('/en/nagi/privacy'));
