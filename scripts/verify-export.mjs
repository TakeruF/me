import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = path => readFileSync(path, 'utf8');
const locales = ['en', 'ja', 'zh'];
const f1 = read('public/projects/f1-harmony.html');
const originalStyle = f1.match(/<style>([\s\S]*?)<\/style>/)[1];
const originalScript = f1.match(/<script>([\s\S]*?)<\/script>/)[1];
let checked = 0;
for (const locale of locales) {
 const pages = ['index.html', 'work.html', ...readdirSync(`out/${locale}/projects`).filter(p=>p.endsWith('.html')&&p!=='hanlu.html').map(p=>`projects/${p}`)];
 assert.equal(pages.length, 17);
 for (const page of pages) {
  const html = read(`out/${locale}/${page}`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}/${page} document language`);
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
}
assert.equal((read('out/sitemap.xml').match(/<url>/g)||[]).length,51);
assert.ok(read('out/index.html').includes('0;url=/ja'));
console.log(`Verified ${checked} localized pages, links/assets, language alternates, original galleries and F1 design.`);
