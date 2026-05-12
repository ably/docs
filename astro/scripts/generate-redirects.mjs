#!/usr/bin/env node
/**
 * Walk all MDX files in ../src/pages/docs and extract the `redirect_from`
 * frontmatter into an object suitable for astro.config.mjs's `redirects`
 * field:
 *
 *   { '/docs/products/chat': '/docs/chat', ... }
 *
 * Writes JSON to src/generated/redirects.json (which astro.config.mjs can
 * import) and prints a summary to stdout.
 *
 * Doesn't touch the existing nginx-redirects.conf. The real migration
 * should merge this output with that file — out of scope for the PoC.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = resolve(here, '../../src/pages/docs');
const OUT = resolve(here, '../src/generated/redirects.json');

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.mdx')) out.push(full);
  }
  return out;
};

const parseFrontmatter = (src) => {
  const match = src.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  let currentKey = null;
  const arr = [];
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      if (currentKey === 'redirect_from' && arr.length) fm[currentKey] = [...arr];
      currentKey = kv[1];
      arr.length = 0;
      const value = kv[2].trim();
      if (value) fm[currentKey] = value.replace(/^["']|["']$/g, '');
    } else {
      const item = line.match(/^\s*-\s+(.*)$/);
      if (item) arr.push(item[1].trim());
    }
  }
  if (currentKey === 'redirect_from' && arr.length) fm[currentKey] = [...arr];
  return fm;
};

const slugFor = (filePath) => {
  const rel = relative(DOCS_ROOT, filePath).replace(/\.mdx$/, '');
  return '/docs/' + rel.replace(/\/index$/, '');
};

const main = async () => {
  const files = await walk(DOCS_ROOT);
  const redirects = {};
  let count = 0;
  let pagesWithRedirects = 0;
  for (const file of files) {
    const src = await readFile(file, 'utf8');
    const fm = parseFrontmatter(src);
    if (!fm.redirect_from || !Array.isArray(fm.redirect_from)) continue;
    const to = slugFor(file);
    pagesWithRedirects++;
    for (const from of fm.redirect_from) {
      const cleaned = from.replace(/^["']|["']$/g, '').trim();
      if (!cleaned || cleaned === to) continue;
      redirects[cleaned] = to;
      count++;
    }
  }
  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(redirects, null, 2) + '\n');
  console.log(
    `Wrote ${count} redirects from ${pagesWithRedirects} pages → ${relative(process.cwd(), OUT)}`,
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
