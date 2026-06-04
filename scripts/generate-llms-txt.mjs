#!/usr/bin/env node
// Walks src/content/docs/, reads frontmatter and per-entry metadata, and
// emits artifacts split between PUBLIC (for external LLM consumption) and
// INTERNAL (for wiki-maintenance agents only, not web-served):
//
//   public/llms/llms.txt                   — curated TOC (title, description, URL)
//   public/llms/llms-full.txt              — full corpus, every page (and entry)
//   public/llms/llms-<section>.txt         — one file per top-level public section,
//                                            for use as Custom GPT knowledge files
//   artifacts/llms-internal/llms-<section>.txt — wiki-internal sections (CLAUDE.md
//                                            authoring rules, log audit trail);
//                                            NOT served by Astro, generated for
//                                            local agent consumption only
//
// Curated resource pages can use a per-entry metadata pattern:
//
//   ### Resource Title
//
//   - **URL:** https://...
//   - **Authority:** official | independent | community
//   - **Audience:** families, kids, teachers
//   - **Level:** beginner | intermediate | advanced
//   - **Tags:** fll, python
//   - **Use when:** <one sentence>
//
//   <description>
//
// The generator detects the pattern and emits each entry as a structured,
// agent-navigable block. Pages without the pattern fall back to whole-page
// inclusion (good for prose like guides).
//
// See https://llmstxt.org for the underlying convention.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/docs');
const PUBLIC_DIR = join(ROOT, 'public/llms');
const INTERNAL_DIR = join(ROOT, 'artifacts/llms-internal');

// Sections that are wiki-internal (CLAUDE.md authoring rules; log audit trail).
// These are never uploaded to the Custom GPT and not meant for external LLM
// consumption. They're still generated so agents working on the wiki locally
// can read them as structured artifacts.
const INTERNAL_SECTIONS = new Set(['CLAUDE', 'log']);

const SECTION_ORDER = [
  'getting-started',
  'resources',
  'guides',
  'for-educators',
  'showcase',
  'community',
];

const ENTRY_FIELD_ORDER = ['url', 'authority', 'audience', 'level', 'tags', 'use_when'];
const ENTRY_FIELD_LABEL = {
  url: 'URL',
  authority: 'Authority',
  audience: 'Audience',
  level: 'Level',
  tags: 'Tags',
  use_when: 'Use when',
};

// ---------- IO helpers ----------

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

// ---------- Markdown parsing ----------

// Minimal frontmatter parser — handles flat `key: value` pairs the docs use
// (title, description, tags-as-string). Nested keys are skipped.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\s+/.test(line)) continue; // skip nested
    const km = line.match(/^([a-zA-Z_][\w-]*)\s*:\s*(.*)$/);
    if (!km) continue;
    let v = km[2].trim();
    if (!v) continue;
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    data[km[1]] = v;
  }
  return { data, body: m[2] };
}

// Tokenize a markdown body into a flat list of either a single line or a
// fenced code block (kept as one token so structural parsing skips inside).
function tokenize(body) {
  const tokens = [];
  const lines = body.split('\n');
  let i = 0;
  while (i < lines.length) {
    if (/^```/.test(lines[i])) {
      let j = i + 1;
      while (j < lines.length && !/^```/.test(lines[j])) j++;
      tokens.push({ type: 'fence', content: lines.slice(i, j + 1).join('\n') });
      i = j + 1;
    } else {
      tokens.push({ type: 'line', content: lines[i] });
      i++;
    }
  }
  return tokens;
}

// Look for the curated-entry pattern: H3 heading followed by `- **Field:** v`
// bullets. Returns an array of entry objects; empty if the page is prose.
function extractEntries(body) {
  const tokens = tokenize(body);
  const entries = [];
  let currentH2 = null;
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t.type !== 'line') { i++; continue; }

    const h2 = t.content.match(/^##\s+(.+)$/);
    if (h2) { currentH2 = h2[1].trim(); i++; continue; }

    const h3 = t.content.match(/^###\s+(.+)$/);
    if (!h3) { i++; continue; }
    const heading = h3[1].trim();

    let j = i + 1;
    while (j < tokens.length && tokens[j].type === 'line' && tokens[j].content.trim() === '') j++;

    const fields = {};
    while (j < tokens.length && tokens[j].type === 'line') {
      const bullet = tokens[j].content.match(/^-\s+\*\*([^:*]+):\*\*\s*(.*)$/);
      if (!bullet) break;
      const key = bullet[1].trim().toLowerCase().replace(/\s+/g, '_');
      fields[key] = bullet[2].trim();
      j++;
    }

    if (Object.keys(fields).length === 0) { i++; continue; }

    while (j < tokens.length && tokens[j].type === 'line' && tokens[j].content.trim() === '') j++;

    const descParts = [];
    while (j < tokens.length) {
      const dt = tokens[j];
      if (dt.type === 'line' && /^###?\s/.test(dt.content)) break;
      descParts.push(dt.content);
      j++;
    }

    entries.push({
      heading,
      sectionContext: currentH2,
      fields,
      description: descParts.join('\n').trim(),
    });
    i = j;
  }
  return entries;
}

function cleanBody(body) {
  return body
    .replace(/^\s*import\s+[^\n]*from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ---------- Routes & URLs ----------

function fileToRoute(file) {
  const rel = relative(CONTENT_DIR, file).split(sep).join('/');
  let route = rel.replace(/\.(md|mdx)$/, '');
  if (route === 'index') return '/';
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return '/' + route + '/';
}

function buildUrl({ site, base }, route) {
  return site.replace(/\/+$/, '') + base.replace(/\/+$/, '') + route;
}

function sectionKey(route) {
  if (route === '/') return '';
  return route.split('/').filter(Boolean)[0];
}

function titleCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ---------- Rendering ----------

function renderEntry(entry, page) {
  const lines = [`## ${entry.heading}`];
  lines.push(`Page: ${page.url}`);
  if (entry.sectionContext) lines.push(`Section: ${entry.sectionContext}`);
  for (const key of ENTRY_FIELD_ORDER) {
    if (entry.fields[key]) lines.push(`${ENTRY_FIELD_LABEL[key]}: ${entry.fields[key]}`);
  }
  for (const key of Object.keys(entry.fields)) {
    if (ENTRY_FIELD_ORDER.includes(key)) continue;
    const label = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    lines.push(`${label}: ${entry.fields[key]}`);
  }
  if (entry.description) {
    lines.push('');
    lines.push(entry.description);
  }
  return lines.join('\n');
}

function renderPage(page) {
  const out = [];
  out.push(`# ${page.title}`);
  out.push('');
  out.push(`URL: ${page.url}`);
  if (page.description) out.push(`Description: ${page.description}`);
  if (page.frontmatter.tags) out.push(`Tags: ${page.frontmatter.tags}`);
  if (page.frontmatter.audience) out.push(`Audience: ${page.frontmatter.audience}`);
  if (page.frontmatter.level) out.push(`Level: ${page.frontmatter.level}`);
  out.push('');

  if (page.entries.length > 0) {
    out.push(`This page is a curated index of ${page.entries.length} entries; each follows with structured metadata.`);
    out.push('');
    for (const entry of page.entries) {
      out.push(renderEntry(entry, page));
      out.push('');
      out.push('---');
      out.push('');
    }
  } else {
    out.push(page.body);
    out.push('');
    out.push('---');
    out.push('');
  }
  return out.join('\n');
}

// ---------- Main ----------

async function main() {
  const config = readSiteConfig();
  const files = walk(CONTENT_DIR).sort();

  const pages = await Promise.all(files.map(async (file) => {
    const raw = await readFile(file, 'utf8');
    const { data, body } = parseFrontmatter(raw);
    const route = fileToRoute(file);
    const cleaned = cleanBody(body);
    const entries = extractEntries(cleaned);
    return {
      file,
      route,
      url: buildUrl(config, route),
      section: sectionKey(route),
      title: data.title ?? titleCase(route.split('/').filter(Boolean).pop() ?? 'Home'),
      description: data.description ?? '',
      frontmatter: data,
      body: cleaned,
      entries,
    };
  }));

  const root = pages.find(p => p.route === '/');
  const siteTitle = root?.title ?? config.title;
  const siteDescription = root?.description ?? config.description;

  // ---------- llms.txt (TOC) ----------
  const sections = new Map();
  for (const p of pages) {
    if (p.route === '/') continue;
    if (!sections.has(p.section)) sections.set(p.section, []);
    sections.get(p.section).push(p);
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
      const entryNote = item.entries.length > 0 ? ` (${item.entries.length} curated entries)` : '';
      toc.push(`- [${item.title}](${item.url})${desc}${entryNote}`);
    }
    toc.push('');
  }

  // ---------- llms-full.txt (whole corpus) ----------
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

  const ordered = [];
  if (root) ordered.push(root);
  for (const key of orderedKeys) ordered.push(...sections.get(key));
  for (const p of ordered) full.push(renderPage(p));

  // ---------- per-section files ----------
  // Pages with `exclude_from_gpt: true` in frontmatter are skipped from the
  // per-section files (uploaded to the Custom GPT) but kept in llms-full.txt
  // and the public website. Use this to keep K-12 pedagogy material on the
  // website while keeping it out of the GPT, where OpenAI's classifier flags
  // child-focused educational content as "may target users under 13."
  const isExcludedFromGpt = (p) => p.frontmatter?.exclude_from_gpt === 'true';
  const perSectionFiles = {};
  let excludedCount = 0;
  for (const key of orderedKeys) {
    const items = sections.get(key);
    const sectionTitle = items.find(i => i.route === `/${key}/`)?.title ?? titleCase(key);
    const out = [];
    out.push(`# ${siteTitle} — ${sectionTitle}`);
    out.push('');
    out.push(`Source: ${buildUrl(config, `/${key}/`)}`);
    out.push('');
    out.push('---');
    out.push('');
    for (const p of items) {
      if (isExcludedFromGpt(p)) { excludedCount++; continue; }
      out.push(renderPage(p));
    }
    perSectionFiles[`llms-${key}.txt`] = out.join('\n');
  }

  // ---------- write ----------
  // Public files: TOC + full corpus + public per-section files → public/llms/
  // Internal files: wiki-maintenance per-section files (CLAUDE, log) → artifacts/llms-internal/
  await mkdir(PUBLIC_DIR, { recursive: true });
  await mkdir(INTERNAL_DIR, { recursive: true });

  await writeFile(join(PUBLIC_DIR, 'llms.txt'), toc.join('\n') + '\n');
  await writeFile(join(PUBLIC_DIR, 'llms-full.txt'), full.join('\n') + '\n');

  const publicSectionFiles = [];
  const internalSectionFiles = [];
  for (const [name, content] of Object.entries(perSectionFiles)) {
    // name is "llms-<section>.txt" — extract the section key
    const sectionKey = name.replace(/^llms-/, '').replace(/\.txt$/, '');
    const isInternal = INTERNAL_SECTIONS.has(sectionKey);
    const targetDir = isInternal ? INTERNAL_DIR : PUBLIC_DIR;
    await writeFile(join(targetDir, name), content + '\n');
    (isInternal ? internalSectionFiles : publicSectionFiles).push(name);
  }

  const totalEntries = pages.reduce((sum, p) => sum + p.entries.length, 0);
  console.log(
    `Wrote public/llms/{llms.txt, llms-full.txt, ${publicSectionFiles.length} per-section} ` +
    `and artifacts/llms-internal/{${internalSectionFiles.length} per-section}.\n` +
    `Public sections: ${publicSectionFiles.join(', ')}\n` +
    `Internal sections: ${internalSectionFiles.join(', ')}\n` +
    `${pages.length} pages, ${totalEntries} curated entries across ${orderedKeys.length} sections.` +
    (excludedCount > 0 ? `\n${excludedCount} pages excluded from per-section files via exclude_from_gpt: true (still in llms-full.txt and on the public website).` : '')
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
