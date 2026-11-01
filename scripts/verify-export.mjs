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
const andropPolicyIntro = {
 en: 'anDrop is developed and provided by',
 ja: 'anDrop は',
 zh: 'anDrop 由',
 ko: 'anDrop는',
};
const f1 = read('public/projects/f1-harmony.html');
const originalStyle = f1.match(/<style>([\s\S]*?)<\/style>/)[1];
const originalScript = f1.match(/<script>([\s\S]*?)<\/script>/)[1];
let checked = 0;
for (const locale of locales) {
 const pages = ['index.html', 'work.html', ...readdirSync(`out/${locale}/projects`).filter(p=>p.endsWith('.html')&&p!=='hanlu.html'&&!['flight-market.html','japan-rail-mcp.html'].includes(p)).map(p=>`projects/${p}`)];
 assert.equal(pages.length, 17);
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
 const androp = read(`out/${locale}/projects/androp.html`);
 assert.ok(androp.includes(`href="/${locale}/projects/androp/privacy"`), `${locale} anDrop privacy link`);
 assert.ok(androp.includes('https://github.com/TakeruF/androp/releases/latest'), `${locale} anDrop download`);
 assert.ok(read(`out/${locale}/work.html`).match(/<section[^>]*id="everyday"[\s\S]*?androp[\s\S]*?<\/section>/), `${locale} anDrop everyday category`);
 assert.ok(read('out/sitemap.xml').includes(`https://takeruf.com/${locale}/projects/androp`));
 assert.equal((androp.match(/class="screen-slide /g)||[]).length, 4, `${locale} anDrop demo gallery`);
 assert.ok(androp.includes('OPPO Find X9 Pro') && androp.includes('OPPO Pad 4 Pro'), `${locale} tested anDrop devices`);
 assert.ok(androp.includes('1.3.0') && androp.includes('Pura 70'), `${locale} anDrop release coverage`);
 assert.ok(androp.includes('https://github.com/TakeruF/androp/releases/tag/v1.3.0'), `${locale} anDrop release notes`);
 assert.ok(!androp.includes('TakeruF/cn-android-share'), `${locale} current anDrop repository`);
 assert.ok(androp.includes('App Sandbox') && androp.includes('4 MiB'), `${locale} anDrop sandbox and physical test scope`);
 const andropCopy = {
  en: ['Notifications clear themselves after three minutes.', 'Receive automatically from trusted devices.', 'Share Live Photos as files, too.'],
  ja: ['通知は3分で、自動的に片づく。', '信頼した相手からは、自動で受信。', 'Live Photoも、ファイルとして共有。'],
  zh: ['通知，3分钟后自动清理。', '来自信任的设备，自动接收。', '实况照片，也能作为文件共享。'],
  ko: ['알림은 3분 뒤 자동으로 정리됩니다.', '신뢰하는 기기에서 자동으로 수신하세요.', 'Live Photo도 파일로 공유하세요.'],
 };
 for (const copy of andropCopy[locale]) assert.ok(androp.includes(copy), `${locale} anDrop current features: ${copy}`);
 for (const scene of ['recipients', 'sending', 'trusted', 'settings']) {
  assert.ok(androp.includes(`androp-120-${scene}-${locale === 'zh' ? 'zh' : 'en'}.webp`), `${locale} localized anDrop ${scene}`);
 }
 const inapp = read(`out/${locale}/projects/inapp-alt-tab.html`);
 assert.ok(inapp.includes('https://github.com/TakeruF/inapp-alt-tab/releases/latest'), `${locale} InApp download`);
 assert.ok(read(`out/${locale}/work.html`).match(/<section[^>]*id="everyday"[\s\S]*?inapp-alt-tab[\s\S]*?<\/section>/), `${locale} InApp everyday category`);
 assert.ok(read('out/sitemap.xml').includes(`https://takeruf.com/${locale}/projects/inapp-alt-tab`));
 const token = read(`out/${locale}/projects/token-meter.html`);
 assert.equal((token.match(/class="screen-slide /g)||[]).length,3);
 assert.equal((token.match(/class="story-section /g)||[]).length,6);
 const racing=read(`out/${locale}/projects/f1-harmony.html`);
 assert.ok(racing.includes(originalStyle),'F1 original design');
 assert.ok(racing.includes(originalScript),'F1 original motion');
 assert.ok(racing.includes(`href="/${locale}/work"`), `${locale} F1 back-to-work link`);
 assert.equal((racing.match(/<section\b/g)||[]).length,7);
 assert.ok(read(`out/${locale}/index.html`).includes('https://hanlu.app/about'));
 const work = read(`out/${locale}/work.html`);
 assert.ok(!/Markdown Docs|mddocs-five|markdown-docs/.test(work), `${locale} retired Markdown Docs absent`);
 assert.ok(!existsSync(`out/${locale}/projects/markdown-docs.html`), `${locale} retired Markdown Docs route absent`);
 const renderedWork = work.match(/<body[^>]*>([\s\S]*?)<script/)[1];
 assert.ok(!work.includes('MAGcup'));
 assert.ok(work.includes(locale === 'ja' ? '英単語マスター' : 'Eitango Master'));
 assert.ok(read(`out/${locale}/404.html`).includes(`href="/${locale}/work"`), `${locale} 404 work link`);
 assert.ok(!work.includes('keyboard.hanlu.app'));
 assert.ok(read(`out/${locale}/projects/furigana-keyboard.html`).includes('https://downloads.takeruf.com/furigana-keyboard/1.0.0-rc.5.apk'));
 for (const [slug, target] of Object.entries({
  'flight-market': 'https://flight-market.vercel.app',
  'japan-rail-mcp': 'https://github.com/TakeruF/japan-rail-mcp',
 })) {
  assert.ok(existsSync(`out/${locale}/projects/${slug}.html`));
  assert.ok(read(`out/${locale}/projects/${slug}.html`).includes(target), `${locale}/${slug} legacy route target`);
  assert.ok(read(`out/${locale}/projects/${slug}.html`).includes(`rel="canonical" href="${new URL(target).href}"`), `${locale}/${slug} legacy canonical`);
  assert.ok(!work.includes(`href="/${locale}/projects/${slug}"`));
 }
 assert.equal((renderedWork.match(new RegExp(locale === 'zh' ? '开发中' : 'UNDER DEVELOPMENT','g'))||[]).length,2);
}
for (const locale of locales) {
 {
  const route = '/projects/androp/privacy';
  const html = read(`out/${locale}${route}.html`);
  assert.ok(html.includes(`<html lang="${locale==='zh'?'zh-CN':locale}"`), `${locale}${route} document language`);
  assert.ok(html.includes(`href="https://takeruf.com/${locale}${route}"`), `${locale}${route} canonical`);
  for (const language of locales) assert.ok(html.includes(`href="/${language}${route}"`), `${route} switch to ${language}`);
  assert.ok(html.includes(`href="/${locale}/projects/androp"`), `${route} product link`);
  assert.ok(html.includes(andropPolicyIntro[locale]), `${locale}${route} localized policy body`);
  assert.ok(html.includes('Mac App Store') && html.includes('Sparkle'), `${locale}${route} both distribution channels`);
  assert.ok(html.includes('href="mailto:support@takeruf.com"'), `${locale}${route} privacy contact`);
  assert.ok(read('out/sitemap.xml').includes(`https://takeruf.com/${locale}${route}`), `${locale}${route} sitemap`);
 }
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
 assert.equal((notes.match(/class="release-card"/g)||[]).length, 25, `${locale} release notes`);
 assert.ok(!read(`out/${locale}/projects/token-meter.html`).includes('takeruf.github.io/token_meter'));
}
assert.equal((read('out/sitemap.xml').match(/<url>/g)||[]).length,100);
assert.ok(read('out/projects/androp/privacy.html').includes('/en/projects/androp/privacy'));
assert.ok(read('out/nagi.html').includes('0;url=/en/projects/nagi'));
assert.ok(read('out/nagi.html').includes('navigator.languages'));
assert.ok(read('out/androp.html').includes('0;url=/en/projects/androp'));
assert.ok(read('out/androp.html').includes('navigator.languages'));
for (const locale of locales) {
 const html = read(`out/${locale}/projects/nagi.html`);
 assert.ok(html.includes('https://play.google.com/store/apps/details?id=com.takeruf.nagi'));
 assert.ok(!/android-tab-browser\/releases\/download\//.test(html), `${locale} no Nagi APK download`);
 assert.ok(html.includes('Google Play') && !html.includes('84.3 MB'));
 assert.ok(html.includes({en:'Official installs and updates: Google Play',ja:'公式配布・更新：Google Play',zh:'官方安装与更新：Google Play',ko:'공식 설치 및 업데이트: Google Play'}[locale]));
 assert.ok(html.includes({en:'Fits the size of your screen.',ja:'画面の広さに合わせて。',zh:'随屏幕大小而变。',ko:'화면 크기에 맞춰서.'}[locale]));
 assert.equal((html.match(/section-index">\d+<!-- --> \/ (THE DETAILS|詳しく見る|详细介绍|자세히 보기)/g)||[]).length, 1, `${locale} single details label`);
 assert.ok(!html.includes('befa7d79d107dbedae664ad6ef54332c3ffea67972bac40b4cbc5e9d427ed253'));
 assert.ok(!html.includes('0.2.1 · 5.2 MB'), `${locale} stale Nagi story metadata`);
 assert.ok(read(`out/${locale}/work.html`).includes(`/${locale}/projects/nagi`));
 assert.ok(read(`out/${locale}/index.html`).includes(`/${locale}/projects/nagi`));
 assert.ok(read(`out/${locale}/index.html`).includes('https://play.google.com/store/apps/details?id=com.takeruf.nagi'), `${locale} homepage Play link`);
 assert.ok(!/android-tab-browser\/releases\/download\//.test(read(`out/${locale}/index.html`)), `${locale} no homepage Nagi APK`);
 assert.ok(!read(`out/${locale}/index.html`).includes('nagi-1.0.0.apk'), `${locale} no stale homepage APK`);
 assert.ok(read('out/sitemap.xml').includes(`https://takeruf.com/${locale}/projects/nagi`));
}
for (const version of ['0.1.0', '0.1.1', '0.1.2', '0.1.3', '0.2.0', '0.2.1', '0.3.0', '1.0.0']) {
 assert.ok(existsSync(`out/nagi/nagi-${version}.apk`));
}
assert.equal(createHash('sha256').update(readFileSync('out/nagi/nagi-1.0.0.apk')).digest('hex'),
 '82580f438c047e735761b1ab2b45b52e03f9da4082e0ddb4bb36a819f529c525');
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
