#!/usr/bin/env node
// Walks src/content/docs/, reads frontmatter, and emits two artifacts in
// public/ for any LLM that visits the site:
//   - llms.txt       — curated table of contents (title, description, URL)
//   - llms-full.txt  — full corpus, every page concatenated with its URL
// See https://llmstxt.org for the spec.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/docs');
const PUBLIC_DIR = join(ROOT, 'public');

// Order top-level sections to match the Starlight sidebar. Unknown sections
// fall through to alphabetical at the end.
const SECTION_ORDER = [
  'getting-started',
  'resources',
  'guides',
  'showcase',
  'community',
];

function readSiteConfig() {
  const cfg = readFileSync(join(ROOT, 'astro.config.mjs'), 'utf8');
  const site = cfg.match(/site:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
  const base = cfg.match(/base:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
  const title = cfg.match(/title:\s*['"]([^'"]+)['"]/)?.[1] ?? 'Site';
  const description = cfg.match(/description:\s*['"]([^'"]+)['"]/)?.[1] ?? '';
  return { site, base, title, description };
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// Minimal YAML frontmatter parser — handles the flat `key: value` pairs the
// docs use today (title, description). Nested keys are ignored on purpose.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  let inNested = false;
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s+/.test(line)) { inNested = true; continue; }
    inNested = false;
    const km = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (!km) continue;
    let v = km[2].trim();
    if (!v) continue; // nested block opener like `hero:` — skip
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    data[km[1]] = v;
  }
  return { data, body: m[2] };
}

function fileToRoute(file) {
  const rel = relative(CONTENT_DIR, file).split(sep).join('/');
  let route = rel.replace(/\.(md|mdx)$/, '');
  if (route === 'index') return '/';
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return '/' + route + '/';
}

function buildUrl({ site, base }, route) {
  const cleanSite = site.replace(/\/+$/, '');
  const cleanBase = base.replace(/\/+$/, '');
  // route already starts with '/'
  return cleanSite + cleanBase + route;
}

function sectionKey(route) {
  if (route === '/') return '';
  return route.split('/').filter(Boolean)[0];
}

function titleCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Strip MDX `import` statements so llms-full.txt stays prose-friendly. Leave
// JSX components alone — their text content is still useful for LLMs.
function cleanBody(body) {
  return body
    .replace(/^\s*import\s+[^\n]*from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function main() {
  const config = readSiteConfig();
  const files = walk(CONTENT_DIR).sort();

  const docs = await Promise.all(files.map(async (file) => {
    const raw = await readFile(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const route = fileToRoute(file);
    return {
      file,
      route,
      url: buildUrl(config, route),
      section: sectionKey(route),
      title: data.title ?? titleCase(route.split('/').filter(Boolean).pop() ?? 'Home'),
      description: data.description ?? '',
      body: cleanBody(body),
    };
  }));

  const root = docs.find(d => d.route === '/');
  const siteTitle = root?.title ?? config.title;
  const siteDescription = root?.description ?? config.description;

  // ---- llms.txt (TOC) ----
  const sections = new Map();
  for (const d of docs) {
    if (d.route === '/') continue;
    if (!sections.has(d.section)) sections.set(d.section, []);
    sections.get(d.section).push(d);
  }
  const orderedKeys = [
    ...SECTION_ORDER.filter(k => sections.has(k)),
    ...[...sections.keys()].filter(k => !SECTION_ORDER.includes(k)).sort(),
  ];

  const toc = [];
  toc.push(`# ${siteTitle}`);
  toc.push('');
  if (siteDescription) {
    toc.push(`> ${siteDescription}`);
    toc.push('');
  }
  for (const key of orderedKeys) {
    const items = sections.get(key);
    // Section index page first, then alphabetical.
    items.sort((a, b) => {
      const aIdx = a.route === `/${key}/`;
      const bIdx = b.route === `/${key}/`;
      if (aIdx && !bIdx) return -1;
      if (!aIdx && bIdx) return 1;
      return a.title.localeCompare(b.title);
    });
    const sectionTitle = items.find(i => i.route === `/${key}/`)?.title ?? titleCase(key);
    toc.push(`## ${sectionTitle}`);
    toc.push('');
    for (const item of items) {
      const desc = item.description ? `: ${item.description}` : '';
      toc.push(`- [${item.title}](${item.url})${desc}`);
    }
    toc.push('');
  }

  // ---- llms-full.txt (full corpus) ----
  const full = [];
  full.push(`# ${siteTitle}`);
  full.push('');
  if (siteDescription) {
    full.push(`> ${siteDescription}`);
    full.push('');
  }
  full.push(`Source: ${buildUrl(config, '/')}`);
  full.push('');
  full.push('---');
  full.push('');

  // Same ordering as TOC: home page first, then sectioned content.
  const ordered = [];
  if (root) ordered.push(root);
  for (const key of orderedKeys) ordered.push(...sections.get(key));

  for (const d of ordered) {
    full.push(`# ${d.title}`);
    full.push('');
    full.push(`URL: ${d.url}`);
    if (d.description) full.push(`Description: ${d.description}`);
    full.push('');
    full.push(d.body);
    full.push('');
    full.push('---');
    full.push('');
  }

  await mkdir(PUBLIC_DIR, { recursive: true });
  await writeFile(join(PUBLIC_DIR, 'llms.txt'), toc.join('\n') + '\n');
  await writeFile(join(PUBLIC_DIR, 'llms-full.txt'), full.join('\n') + '\n');

  console.log(`Wrote public/llms.txt and public/llms-full.txt (${docs.length} docs across ${orderedKeys.length} sections).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
