import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

/** Authorize scripts in the trusted build output, not request-time/user-supplied HTML. */
export function secureExport(directory = 'out') {
  const root = path.resolve(directory);
  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const hashes = new Set();
      let html = readFileSync(file, 'utf8').replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attributes, content) => {
        const src = attributes.match(/\bsrc="([^"]+)"/i)?.[1];
        if (src) {
          const url = new URL(src, 'https://takeruf.com/');
          if (url.origin !== 'https://takeruf.com') throw new Error(`Unexpected external script: ${src}`);
          const script = path.resolve(root, '.' + decodeURIComponent(url.pathname));
          if (!script.startsWith(root + path.sep)) throw new Error(`Invalid script path: ${src}`);
          const hash = 'sha256-' + createHash('sha256').update(readFileSync(script)).digest('base64');
          hashes.add(`'${hash}'`);
          return `<script${attributes} integrity="${hash}" crossorigin="anonymous">${content}</script>`;
        }
        hashes.add(`'sha256-${createHash('sha256').update(content).digest('base64')}'`);
        return tag;
      });
      // CSP checks preloads too; their integrity and CORS mode must match the script.
      html = html.replace(/<link\b[^>]*>/gi, tag => {
        if (!/\bas="script"/i.test(tag) && !/\brel="modulepreload"/i.test(tag)) return tag;
        const src = tag.match(/\bhref="([^"]+)"/i)?.[1];
        if (!src) return tag;
        const url = new URL(src, 'https://takeruf.com/');
        if (url.origin !== 'https://takeruf.com') throw new Error(`Unexpected script preload: ${src}`);
        const hash = 'sha256-' + createHash('sha256')
          .update(readFileSync(path.join(root, decodeURIComponent(url.pathname)))).digest('base64');
        hashes.add(`'${hash}'`);
        return tag.replace(/\s*\/?>$/, ` integrity="${hash}" crossorigin="anonymous"/>`);
      });
      const policy = [
        `script-src 'self' ${[...hashes].join(' ')} 'strict-dynamic' 'report-sample'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:", "font-src 'self'", "connect-src 'self'",
        "object-src 'none'", "base-uri 'none'", "form-action 'self'",
      ].join('; ');
      // Keep the charset first and enforce the per-page hashes before any script is parsed.
      html = html.replace(/(<head>\s*(?:<meta\s+charset="[^"]+"\s*\/?>)?)/i,
        `$1<meta http-equiv="Content-Security-Policy" content="${policy}">`);
      writeFileSync(file, html);
    }
  }
  visit(root);
}
