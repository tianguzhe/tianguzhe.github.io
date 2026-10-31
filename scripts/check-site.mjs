import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve('dist');
const slugs = ['devpocket', 'macclean', 'languageswitcher', 'quietlock', 'procscope'];
const appNames = ['DevPocket', 'MacClean', 'LanguageSwitcher', 'QuietLock', 'ProcScope'];
const htmlFiles = [];
function walk(path) {
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const full = join(path, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(root);
assert.equal(htmlFiles.length, slugs.length + 3, 'Expected homepage, product pages, today calendar and 404');
const titles = new Set();
const errors = [];
let references = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Missing or duplicate title: ${file}`);
  titles.add(title);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one h1: ${file}`);
  assert.match(html, /<html lang="zh-CN"/, `Missing language: ${file}`);
  assert.match(html, /name="description" content="[^"]+"/, `Missing description: ${file}`);
  assert.match(html, /name="viewport"/, `Missing viewport: ${file}`);
  assert.match(html, /rel="canonical" href="https:\/\/tianguzhe\.github\.io\//, `Missing canonical: ${file}`);
  const shareImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(shareImage, `Missing share image: ${file}`);
  assert.ok(existsSync(join(root, new URL(shareImage).pathname)), `Missing share image asset: ${file}`);
  assert.match(html, /property="og:image:alt" content="[^"]+"/, `Missing share image description: ${file}`);
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(tag[0], /\balt(?:="[^"]*")?(?=\s|>)/, `Missing image alt: ${file}`);
    assert.match(tag[0], /\bwidth="\d+"/, `Missing image width: ${file}`);
    assert.match(tag[0], /\bheight="\d+"/, `Missing image height: ${file}`);
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const source = candidate.trim().split(/\s+/)[0];
      assert.ok(existsSync(join(root, source)), `Missing responsive image: ${source}`);
      references++;
    }
  }
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    references++;
    const [pathWithQuery, fragment] = value.split('#');
    const path = pathWithQuery.split('?')[0];
    let target = path ? (path.startsWith('/') ? join(root, path) : resolve(dirname(file), path)) : file;
    if (target.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) { errors.push(`${file}: missing ${value}`); continue; }
    if (fragment && target.endsWith('.html')) {
      if (!readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(fragment)}"`)) errors.push(`${file}: missing anchor ${value}`);
    }
  }
}
for (const [index, slug] of slugs.entries()) {
  const html = readFileSync(join(root, slug, 'index.html'), 'utf8');
  const appName = appNames[index];
  assert.ok(html.includes(`https://github.com/tianguzhe/${appName}/releases/latest/download/${appName}.dmg`), `Missing stable download URL: ${slug}`);
  assert.ok(html.includes(`https://github.com/tianguzhe/${appName}/issues`), `Missing feedback URL: ${slug}`);
  const jsonLd = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  assert.ok(jsonLd, `Missing JSON-LD: ${slug}`);
  assert.equal(JSON.parse(jsonLd).name, appName);
  assert.ok(html.includes('Apple 公证'), `Missing installation information: ${slug}`);
}
assert.match(readFileSync(join(root, '404.html'), 'utf8'), /name="robots" content="noindex"/);
assert.equal((readFileSync(join(root, 'sitemap.xml'), 'utf8').match(/<url>/g) || []).length, slugs.length + 2);
assert.ok(existsSync(join(root, 'robots.txt')));
assert.ok(readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('https://tianguzhe.github.io/today/'));
assert.ok(existsSync(join(root, 'today', 'index.html')));
assert.deepEqual(errors, [], 'Broken internal links or assets');
console.log(`Verified ${htmlFiles.length} pages, ${references} local references, metadata, downloads and structured data.`);
