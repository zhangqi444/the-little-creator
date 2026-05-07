#!/usr/bin/env node
// scripts/lint-copyright.mjs — the technical control that lets the project
// move from "agents open issues only" to "agents open draft PRs".
//
// For each curated resource-map entry in the wiki, fetches the entry's URL
// and checks whether the entry's prose contains any verbatim sequence of
// MORE THAN 50 consecutive words taken from the source page. The 50-word
// limit is the project's hardest copyright invariant (CLAUDE.md, BRD §6).
//
// What a passing entry looks like:
//   • Description rewritten in our own words. Short quotes (<50 words) are OK.
//   • Metadata fields (URL, Authority, Use when, etc.) — not subject to the limit.
//
// What fails:
//   • Pasting a paragraph from the source as the entry's description.
//   • Even a 51-word verbatim run anywhere in the entry's body.
//
// Usage:
//   node scripts/lint-copyright.mjs [options]
//
// Options:
//   --files <glob,glob>   Only scan these files (e.g. for CI on changed files).
//                         Default: src/content/docs/resources/*.md
//   --max-words <n>       Threshold (default: 50). Match >n consecutive words.
//   --output <path>       Write report to file (default: stdout).
//   --quiet               Suppress progress output.
//   --no-fetch            Skip fetching; only lint metadata schema.
//                         Useful for super-fast CI runs that won't hit network.
//
// Exit code: 0 if all entries pass, 1 if any entry trips the limit, 2 on error.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const DEFAULT_GLOB = 'src/content/docs/resources';

const USER_AGENT =
  'TheLittleCreator-CopyrightLint/1.0 (+https://github.com/zhangqi444/the-little-creator)';

// ---------- CLI ----------
function parseArgs(argv) {
  const args = {
    files: null,
    maxWords: 50,
    output: null,
    quiet: false,
    noFetch: false,
    timeoutMs: 10000,
    delayMs: 500,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--files') args.files = argv[++i].split(',');
    else if (a === '--max-words') args.maxWords = Number(argv[++i]);
    else if (a === '--output') args.output = argv[++i];
    else if (a === '--quiet') args.quiet = true;
    else if (a === '--no-fetch') args.noFetch = true;
    else if (a === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (a === '--delay-ms') args.delayMs = Number(argv[++i]);
    else if (a === '--help' || a === '-h') {
      console.log('See header in scripts/lint-copyright.mjs');
      process.exit(0);
    } else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- File walk ----------
function walkMarkdown(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMarkdown(full));
    else if (/\.(md|mdx)$/.test(e.name)) out.push(full);
  }
  return out;
}

// ---------- Entry extraction ----------
// Reuses the per-entry pattern documented in src/content/docs/CLAUDE.md.
// An entry is a `### Heading` followed by a metadata bullet list (with a
// `- **URL:** <url>` line) and a description block until the next heading.
function extractEntries(filePath) {
  const body = readFileSync(filePath, 'utf8');
  // Strip frontmatter
  const m = body.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  const content = m ? m[1] : body;

  const entries = [];
  const lines = content.split('\n');
  let i = 0;
  while (i < lines.length) {
    const h = lines[i].match(/^###\s+(.+)$/);
    if (!h) { i++; continue; }
    const heading = h[1].trim();

    // Find URL field within the next ~12 lines
    let url = null;
    let descStart = -1;
    let j = i + 1;
    while (j < lines.length && j < i + 30) {
      const u = lines[j].match(/^-\s+\*\*URL:\*\*\s+(\S+)/);
      if (u) {
        url = u[1].replace(/[).,;]+$/, '');
      }
      // Description starts after the metadata block, marked by an empty line
      // following non-list content. Heuristic: first blank line after the
      // last `- **Field:**` bullet.
      if (descStart === -1 && url && lines[j].trim() === '' && j + 1 < lines.length && !/^-\s+\*\*/.test(lines[j + 1])) {
        descStart = j + 1;
        break;
      }
      j++;
    }

    if (!url) { i++; continue; }

    // Find description end: next ### or ## heading
    let k = descStart === -1 ? j : descStart;
    let descEnd = lines.length;
    for (let m2 = k; m2 < lines.length; m2++) {
      if (/^##/.test(lines[m2]) && lines[m2].trim() !== '') {
        descEnd = m2;
        break;
      }
    }

    const description = k >= 0 ? lines.slice(k, descEnd).join('\n').trim() : '';

    entries.push({
      file: relative(ROOT, filePath),
      heading,
      url,
      description,
    });

    i = descEnd;
  }
  return entries;
}

// ---------- Source fetch ----------
async function fetchPlainText(url, { timeoutMs }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*' },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}`, text: '' };
    }
    const html = await res.text();
    const text = htmlToText(html);
    return { ok: true, text };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'timeout' : e.message, text: '' };
  } finally {
    clearTimeout(t);
  }
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------- Match check ----------
// Returns the first sequence of >maxWords consecutive words that appears in
// both the entry text and the source text. Null if no such match.
//
// Implementation: build a Set of (maxWords + 1)-grams from the source, then
// slide over the entry text checking for membership. First hit wins.
function findVerbatimRun(entryText, sourceText, maxWords) {
  const entryWords = normalizeWords(entryText);
  const sourceWords = normalizeWords(sourceText);
  if (entryWords.length <= maxWords || sourceWords.length <= maxWords) return null;

  const N = maxWords + 1;
  const sourceGrams = new Set();
  for (let i = 0; i + N <= sourceWords.length; i++) {
    sourceGrams.add(sourceWords.slice(i, i + N).join(' '));
  }
  for (let i = 0; i + N <= entryWords.length; i++) {
    const gram = entryWords.slice(i, i + N).join(' ');
    if (sourceGrams.has(gram)) return gram;
  }
  return null;
}

// Normalize text into a word array. Lowercase, strip punctuation, collapse
// whitespace. Keeps comparison robust to formatting differences.
function normalizeWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

// ---------- Render ----------
function render(findings, args) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Copyright Lint — ${today}`);
  lines.push('');
  lines.push(`Generated by \`scripts/lint-copyright.mjs\`. Threshold: >${args.maxWords} consecutive verbatim words from the source.`);
  lines.push('');

  const failed = findings.filter((f) => f.failed);
  const errored = findings.filter((f) => f.error && !f.failed);
  const passed = findings.filter((f) => !f.failed && !f.error);

  lines.push('## Summary');
  lines.push('');
  lines.push(`- **${findings.length}** entries scanned`);
  lines.push(`- **${failed.length}** failed (verbatim run >${args.maxWords} words)`);
  lines.push(`- **${errored.length}** errored (couldn't fetch source — manual review)`);
  lines.push(`- **${passed.length}** passed`);
  lines.push('');

  if (failed.length > 0) {
    lines.push('## ❌ Failed entries');
    lines.push('');
    for (const f of failed) {
      lines.push(`### ${f.heading}`);
      lines.push('');
      lines.push(`File: \`${f.file}\``);
      lines.push(`URL: ${f.url}`);
      lines.push('');
      lines.push('Verbatim run found in entry description:');
      lines.push('');
      lines.push('> ' + f.match);
      lines.push('');
      lines.push('**Action:** rewrite this passage in your own words, or trim it below the threshold.');
      lines.push('');
    }
  }

  if (errored.length > 0) {
    lines.push('## ⚠ Errors (manual review)');
    lines.push('');
    for (const e of errored) {
      lines.push(`- **${e.heading}** (\`${e.file}\`) — ${e.error}`);
    }
    lines.push('');
  }

  if (passed.length > 0 && failed.length === 0) {
    lines.push(`## ✅ All ${passed.length} entries passed`);
    lines.push('');
  }

  return lines.join('\n');
}

// ---------- Main ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const log = (msg) => { if (!args.quiet) process.stderr.write(msg + '\n'); };

  // Determine which files to scan
  let files;
  if (args.files && args.files.length > 0) {
    files = args.files
      .map((f) => (f.startsWith('/') ? f : join(ROOT, f)))
      .filter((f) => /\.(md|mdx)$/.test(f));
  } else {
    files = walkMarkdown(join(ROOT, DEFAULT_GLOB));
  }

  log(`→ Scanning ${files.length} markdown file(s) for resource-map entries…`);

  const allEntries = [];
  for (const f of files) {
    try {
      const entries = extractEntries(f);
      allEntries.push(...entries);
    } catch (e) {
      log(`  (skipping ${f}: ${e.message})`);
    }
  }

  log(`→ ${allEntries.length} entries to lint`);

  const findings = [];
  for (let i = 0; i < allEntries.length; i++) {
    const entry = allEntries[i];
    log(`  [${i + 1}/${allEntries.length}] ${entry.heading}`);

    if (args.noFetch) {
      findings.push({ ...entry, failed: false, skipped: true });
      continue;
    }

    const fetched = await fetchPlainText(entry.url, { timeoutMs: args.timeoutMs });
    if (!fetched.ok) {
      findings.push({ ...entry, failed: false, error: fetched.error });
      if (i < allEntries.length - 1) await sleep(args.delayMs);
      continue;
    }

    const match = findVerbatimRun(entry.description, fetched.text, args.maxWords);
    findings.push({ ...entry, failed: match !== null, match });

    if (i < allEntries.length - 1) await sleep(args.delayMs);
  }

  const report = render(findings, args);
  if (args.output) {
    writeFileSync(args.output, report, 'utf8');
    log(`→ Report written to ${args.output}`);
  } else {
    process.stdout.write(report);
  }

  const failed = findings.filter((f) => f.failed).length;
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('lint-copyright failed:', e);
  process.exit(2);
});
