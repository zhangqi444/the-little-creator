#!/usr/bin/env node
// scripts/freshness-check.mjs — Phase 4 prep, the lint half of the Freshness agent.
//
// Walks src/content/docs/, extracts every external URL the wiki cites, and
// checks each one over the network. Reports findings as a markdown audit.
//
// What it checks (mechanical only — no semantic comparison yet):
//   • HTTP status (200 OK, 4xx broken, 5xx server error, redirects)
//   • Final URL after redirects (flag if differs from cited)
//   • last-modified header (flag if older than --stale-days)
//   • Network errors (timeout, DNS, connection refused)
//
// What it does NOT check (yet):
//   • Whether the page's content still matches what the wiki says about it.
//     That needs an LLM and is the harder half of the Freshness agent.
//
// Politeness:
//   • User-Agent: TheLittleCreator-FreshnessBot/1.0
//   • Default 500ms delay between requests; bump with --delay-ms
//   • 10s timeout per request
//   • HEAD first; falls back to GET if HEAD is 405
//
// Usage:
//   node scripts/freshness-check.mjs [options]
//
// Options:
//   --output <path>     Write report to a file (default: stdout)
//   --delay-ms <n>      Delay between requests in ms (default: 500)
//   --timeout-ms <n>    Per-request timeout in ms (default: 10000)
//   --stale-days <n>    Flag last-modified older than N days (default: 365)
//   --quiet             Don't print progress to stderr
//
// Exit code: 0 if no findings, 1 if any 4xx/5xx/error, 0 if only redirects/staleness.
// (Tweak in CI per your tolerance.)

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/docs');

const USER_AGENT =
  'TheLittleCreator-FreshnessBot/1.0 (+https://github.com/zhangqi444/the-little-creator)';

// ---------- CLI parsing ----------
function parseArgs(argv) {
  const args = {
    output: null,
    delayMs: 500,
    timeoutMs: 10000,
    staleDays: 365,
    quiet: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--output') args.output = argv[++i];
    else if (a === '--delay-ms') args.delayMs = Number(argv[++i]);
    else if (a === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (a === '--stale-days') args.staleDays = Number(argv[++i]);
    else if (a === '--quiet') args.quiet = true;
    else if (a === '--help' || a === '-h') {
      console.log(
        'See header comments in scripts/freshness-check.mjs for usage.'
      );
      process.exit(0);
    } else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

// ---------- File discovery ----------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// ---------- URL extraction ----------
// Pulls external URLs out of markdown. Three patterns we care about:
//   1. Inline links:           [text](https://...)
//   2. Per-entry metadata:     - **URL:** https://...
//   3. Bare URLs in prose / log lines
// Skips fenced code blocks (so placeholders like `https://...` in examples
// don't leak in), inline-code spans, anchors-only, and relative paths.
function extractUrls(body) {
  const stripped = stripCodeFencesAndInlineCode(body);
  const urls = new Set();

  // Pattern 1 — inline markdown links
  for (const m of stripped.matchAll(/\[[^\]]*\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g)) {
    addIfValid(urls, m[1]);
  }

  // Pattern 2 — per-entry metadata bullets
  for (const m of stripped.matchAll(/^-\s+\*\*URL:\*\*\s+(https?:\/\/\S+)/gm)) {
    addIfValid(urls, m[1]);
  }

  // Pattern 3 — bare URLs (logs, prose). Excludes URLs already captured by 1 & 2.
  for (const m of stripped.matchAll(/(?:^|\s)(https?:\/\/[^\s<>"`)\]]+)/g)) {
    addIfValid(urls, m[1]);
  }

  return [...urls];
}

function stripCodeFencesAndInlineCode(body) {
  // Drop ```…``` blocks entirely
  let s = body.replace(/```[\s\S]*?```/g, '');
  // Drop `…` inline-code spans
  s = s.replace(/`[^`\n]*`/g, '');
  return s;
}

function stripTrailingPunct(url) {
  return url.replace(/[).,;!?]+$/, '');
}

function addIfValid(set, raw) {
  const cleaned = stripTrailingPunct(raw);
  // Skip if missing host or contains placeholder ellipsis
  if (cleaned.includes('...')) return;
  try {
    const u = new URL(cleaned);
    if (!u.hostname || u.hostname.length < 3) return; // e.g. "https://" alone
    set.add(cleaned);
  } catch {
    /* invalid URL — skip */
  }
}

// ---------- HTTP check ----------
async function checkUrl(url, { timeoutMs }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: { 'user-agent': USER_AGENT, accept: '*/*' },
    });
    // Some servers reject HEAD; retry with GET.
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*' },
      });
    }
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url || url,
      lastModified: res.headers.get('last-modified'),
      error: null,
    };
  } catch (e) {
    return {
      ok: false,
      status: null,
      finalUrl: url,
      lastModified: null,
      error: e.name === 'AbortError' ? 'timeout' : e.message,
    };
  } finally {
    clearTimeout(t);
  }
}

// ---------- Classification ----------
function classify(result, { staleDays }) {
  if (result.error) return 'error';
  const s = result.status;
  if (s === 404 || s === 410) return 'not_found';
  if (s === 403 || s === 429) return 'blocked';
  if (s >= 500) return 'server_error';
  if (s >= 400) return 'client_error';

  // Redirected if final URL doesn't match input (we already followed)
  if (result.redirected) return 'redirected';

  if (result.lastModified) {
    const lm = Date.parse(result.lastModified);
    if (!Number.isNaN(lm)) {
      const ageMs = Date.now() - lm;
      const ageDays = ageMs / 86400000;
      if (ageDays > staleDays) return 'stale_lastmod';
    }
  }

  return 'ok';
}

// ---------- Render ----------
function render(findings, args) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Freshness Report — ${today}`);
  lines.push('');
  lines.push('Generated by `scripts/freshness-check.mjs`. Mechanical link health only — no semantic comparison.');
  lines.push('');

  const counts = countByCategory(findings);
  lines.push('## Summary');
  lines.push('');
  lines.push(`- **${findings.length}** unique external URLs checked across the wiki`);
  for (const [cat, n] of Object.entries(counts)) {
    if (n > 0) lines.push(`- **${n}** ${categoryLabel(cat)}`);
  }
  lines.push('');

  const buckets = {
    not_found: 'Not found (action: replace or remove)',
    server_error: 'Server error (5xx) — try again later, then triage',
    error: 'Network error / timeout — manual check needed',
    blocked: 'Blocked (403 / 429) — likely bot policy or rate limit; manual check',
    client_error: 'Client error (4xx, non-404)',
    redirected: 'Redirected — verify the new location and update the citation if permanent',
    stale_lastmod: `Stale (last-modified > ${args.staleDays} days)`,
    ok: 'OK',
  };

  for (const [cat, label] of Object.entries(buckets)) {
    const items = findings.filter((f) => f.category === cat);
    if (items.length === 0) continue;
    lines.push(`## ${label} (${items.length})`);
    lines.push('');

    if (cat === 'ok') {
      lines.push(`<details><summary>${items.length} URLs healthy</summary>`);
      lines.push('');
      for (const f of items) lines.push(`- ${f.url}`);
      lines.push('');
      lines.push('</details>');
      lines.push('');
      continue;
    }

    for (const f of items) {
      const detail = renderDetail(f);
      lines.push(`### ${f.url}`);
      lines.push('');
      if (detail) lines.push(detail);
      lines.push(`Cited by: ${f.citedBy.map((p) => '`' + p + '`').join(', ')}`);
      lines.push('');
    }
  }

  return lines.join('\n');
}

function renderDetail(f) {
  const bits = [];
  if (f.status != null) bits.push(`Status: **${f.status}**`);
  if (f.finalUrl && f.finalUrl !== f.url) bits.push(`Final URL: ${f.finalUrl}`);
  if (f.lastModified) bits.push(`Last-Modified: ${f.lastModified}`);
  if (f.error) bits.push(`Error: ${f.error}`);
  return bits.join('  \n');
}

function categoryLabel(cat) {
  return {
    ok: 'healthy',
    not_found: 'not found (404 / 410)',
    server_error: 'server errors (5xx)',
    error: 'network errors / timeouts',
    blocked: 'blocked (403 / 429)',
    client_error: 'other 4xx',
    redirected: 'redirected',
    stale_lastmod: 'with stale last-modified header',
  }[cat] || cat;
}

function countByCategory(findings) {
  const counts = {};
  for (const f of findings) counts[f.category] = (counts[f.category] || 0) + 1;
  return counts;
}

// ---------- Politeness ----------
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------- Main ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const log = (msg) => { if (!args.quiet) process.stderr.write(msg + '\n'); };

  log('→ Walking src/content/docs/ for citations…');
  const files = walk(CONTENT_DIR);
  const urlMap = new Map(); // url → Set of file paths

  for (const f of files) {
    const body = readFileSync(f, 'utf8');
    const rel = relative(ROOT, f);
    for (const url of extractUrls(body)) {
      if (!urlMap.has(url)) urlMap.set(url, new Set());
      urlMap.get(url).add(rel);
    }
  }

  const urls = [...urlMap.keys()].sort();
  log(`→ ${urls.length} unique external URLs across ${files.length} files. Checking…`);

  const findings = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    log(`  [${i + 1}/${urls.length}] ${url}`);
    const result = await checkUrl(url, { timeoutMs: args.timeoutMs });
    result.redirected = result.finalUrl !== url;
    const category = classify(result, { staleDays: args.staleDays });
    findings.push({
      url,
      citedBy: [...urlMap.get(url)].sort(),
      ...result,
      category,
    });
    if (i < urls.length - 1) await sleep(args.delayMs);
  }

  const report = render(findings, args);

  if (args.output) {
    writeFileSync(args.output, report, 'utf8');
    log(`→ Report written to ${args.output}`);
  } else {
    process.stdout.write(report);
  }

  // Exit code: 1 if any actionable findings (broken / errored).
  const actionable = findings.filter((f) =>
    ['not_found', 'server_error', 'error', 'client_error'].includes(f.category)
  );
  process.exit(actionable.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('freshness-check failed:', e);
  process.exit(2);
});
