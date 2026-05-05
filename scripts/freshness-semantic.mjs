#!/usr/bin/env node
// scripts/freshness-semantic.mjs — Phase 4, the semantic half of the
// Freshness agent (the harder ceiling above scripts/freshness-check.mjs).
//
// For each external URL the wiki cites, fetches the live page and asks
// Claude (Haiku, for cost) whether the page still supports the claims the
// wiki makes about it. Outputs a markdown report of divergences.
//
// What "divergence" means here:
//   • The page now redirects to a topic our wiki page misrepresents
//   • Site has reorganized so the cited URL no longer points at the
//     specific resource our wiki described
//   • Substantive facts have changed since we cited (program-name change,
//     hardware change, age range change, etc.)
//   • The page is now behind a paywall or login the wiki doesn't mention
//
// Designed to be run ON DEMAND, not on a regular cron — semantic checks
// cost API tokens. Estimated ~$0.30–1.00 per full run (28 URLs × Haiku).
//
// Requires: ANTHROPIC_API_KEY env var.
//
// Usage:
//   ANTHROPIC_API_KEY=... node scripts/freshness-semantic.mjs [options]
//
// Options:
//   --output <path>      Write report to a file (default: stdout)
//   --model <name>       Claude model (default: claude-haiku-4-5)
//   --max-pages <n>      Cap how many URLs to check this run (default: all)
//   --include <pattern>  Substring filter: only check URLs containing this
//   --delay-ms <n>       Delay between Claude calls (default: 200)
//   --timeout-ms <n>     Per-fetch + per-API timeout (default: 30000)
//   --quiet              Suppress progress

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'src/content/docs');

const FETCH_USER_AGENT =
  'TheLittleCreator-FreshnessBot/1.0 (+https://github.com/zhangqi444/the-little-creator)';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

// ---------- CLI ----------
function parseArgs(argv) {
  const args = {
    output: null,
    model: 'claude-haiku-4-5',
    maxPages: 0,
    include: null,
    delayMs: 200,
    timeoutMs: 30000,
    quiet: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--output') args.output = argv[++i];
    else if (a === '--model') args.model = argv[++i];
    else if (a === '--max-pages') args.maxPages = Number(argv[++i]);
    else if (a === '--include') args.include = argv[++i];
    else if (a === '--delay-ms') args.delayMs = Number(argv[++i]);
    else if (a === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (a === '--quiet') args.quiet = true;
    else if (a === '--help' || a === '-h') {
      console.log('See header in scripts/freshness-semantic.mjs');
      process.exit(0);
    } else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- File walk + URL extraction (mirrors freshness-check.mjs) ----------
function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full));
    else if (/\.(md|mdx)$/.test(e.name)) out.push(full);
  }
  return out;
}

function stripFences(body) {
  return body.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

// Extract URL → array of { file, contextSnippet (~500 chars around the URL) }
function extractCitations(body, file) {
  const stripped = stripFences(body);
  const out = [];
  // Per-entry pattern: URL line plus the entry block above/below
  for (const m of stripped.matchAll(/^-\s+\*\*URL:\*\*\s+(https?:\/\/\S+)/gm)) {
    const url = stripPunct(m[1]);
    if (!isValidHttp(url)) continue;
    const idx = m.index;
    out.push({ url, file, context: snippet(stripped, idx, 800) });
  }
  // Inline links
  for (const m of stripped.matchAll(/\[[^\]]*\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g)) {
    const url = stripPunct(m[1]);
    if (!isValidHttp(url)) continue;
    out.push({ url, file, context: snippet(stripped, m.index, 600) });
  }
  return out;
}

function snippet(text, idx, span) {
  const start = Math.max(0, idx - Math.floor(span / 2));
  const end = Math.min(text.length, idx + Math.ceil(span / 2));
  return text.slice(start, end).trim();
}

function stripPunct(url) {
  return url.replace(/[).,;!?]+$/, '');
}

function isValidHttp(url) {
  if (url.includes('...')) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

// ---------- Page fetch ----------
async function fetchPage(url, { timeoutMs }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: {
        'user-agent': FETCH_USER_AGENT,
        accept: 'text/html,application/xhtml+xml',
      },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    if (!res.ok) {
      return { ok: false, status: res.status, text: '', finalUrl: res.url };
    }
    const text = await res.text();
    return { ok: true, status: res.status, text, finalUrl: res.url };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'timeout' : e.message, text: '', finalUrl: url };
  } finally {
    clearTimeout(t);
  }
}

// Strip HTML to plain text for sending to Claude. Keep it simple.
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

// ---------- Claude call ----------
async function classifyDivergence({ url, contexts, pageText, model, timeoutMs, apiKey }) {
  // Truncate page text — Haiku context is generous but no need to send it all
  const trimmedPage = pageText.slice(0, 8000);
  const wikiContexts = contexts
    .map((c) => `Wiki page: ${c.file}\n---\n${c.context}\n---`)
    .join('\n\n');

  const prompt = `You are auditing a community wiki for content drift.

Source URL: ${url}

The wiki cites this URL in the following passages:

${wikiContexts}

Below is the current text content of the URL (truncated to 8000 chars):

${trimmedPage}

Question: do the wiki passages above still accurately describe what's at this URL today? Consider: program names, age ranges, hardware mentioned, season information, factual claims, and whether the URL still points at the resource the wiki implies.

Respond with a single JSON object, no other text:
{
  "verdict": "consistent" | "minor_drift" | "significant_drift" | "page_unrecognizable",
  "summary": "<one sentence describing what (if anything) changed>",
  "specifics": ["<short bullet>", ...]
}`;

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        model,
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return { ok: false, error: `API ${res.status}: ${err.slice(0, 200)}` };
    }
    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    const json = parseJsonLoose(text);
    if (!json) return { ok: false, error: `Could not parse JSON from response: ${text.slice(0, 200)}` };
    return { ok: true, ...json };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally {
    clearTimeout(t);
  }
}

function parseJsonLoose(text) {
  try { return JSON.parse(text); } catch { /* fall through */ }
  // Try to extract a JSON object from a prose response
  const m = text.match(/\{[\s\S]*\}/);
  if (m) {
    try { return JSON.parse(m[0]); } catch { /* */ }
  }
  return null;
}

// ---------- Render ----------
function render({ findings, args, totalUrls, skippedNoFetch }) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Semantic Freshness Report — ${today}`);
  lines.push('');
  lines.push(`Generated by \`scripts/freshness-semantic.mjs\` using \`${args.model}\`. Compares each cited URL's current page content against what the wiki says about it.`);
  lines.push('');

  const buckets = {
    page_unrecognizable: 'Page unrecognizable — likely needs replacement',
    significant_drift: 'Significant drift — review and update wiki',
    minor_drift: 'Minor drift — informational, may be worth updating',
    consistent: 'Consistent — no action needed',
  };

  const counts = Object.fromEntries(Object.keys(buckets).map((k) => [k, 0]));
  let errors = 0;
  for (const f of findings) {
    if (f.error) errors++;
    else if (counts[f.verdict] != null) counts[f.verdict]++;
  }

  lines.push('## Summary');
  lines.push('');
  lines.push(`- **${totalUrls}** URLs in the wiki (checked: ${findings.length}, skipped due to fetch error: ${skippedNoFetch})`);
  for (const [k, v] of Object.entries(counts)) if (v > 0) lines.push(`- **${v}** ${buckets[k].split(' — ')[0]}`);
  if (errors > 0) lines.push(`- **${errors}** API or processing errors`);
  lines.push('');

  for (const [bucket, label] of Object.entries(buckets)) {
    if (bucket === 'consistent') continue; // handled below
    const items = findings.filter((f) => !f.error && f.verdict === bucket);
    if (items.length === 0) continue;
    lines.push(`## ${label} (${items.length})`);
    lines.push('');
    for (const f of items) {
      lines.push(`### ${f.url}`);
      lines.push('');
      if (f.summary) lines.push(`${f.summary}`);
      if (f.specifics?.length) {
        lines.push('');
        for (const s of f.specifics) lines.push(`- ${s}`);
      }
      lines.push('');
      lines.push(`Cited by: ${f.files.map((p) => '`' + p + '`').join(', ')}`);
      lines.push('');
    }
  }

  // Errors
  const errored = findings.filter((f) => f.error);
  if (errored.length > 0) {
    lines.push('## Errors');
    lines.push('');
    for (const f of errored) {
      lines.push(`- **${f.url}** — ${f.error}`);
    }
    lines.push('');
  }

  // Consistent (collapsed)
  const consistent = findings.filter((f) => !f.error && f.verdict === 'consistent');
  if (consistent.length > 0) {
    lines.push(`## Consistent (${consistent.length}, collapsed)`);
    lines.push('');
    lines.push(`<details><summary>${consistent.length} URLs verified as still consistent with their wiki citations</summary>`);
    lines.push('');
    for (const f of consistent) lines.push(`- ${f.url}`);
    lines.push('');
    lines.push('</details>');
    lines.push('');
  }

  return lines.join('\n');
}

// ---------- Main ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const log = (msg) => { if (!args.quiet) process.stderr.write(msg + '\n'); };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY env var is required.');
    process.exit(2);
  }

  log('→ Walking wiki for citations…');
  const files = walk(CONTENT_DIR);
  const byUrl = new Map(); // url → { files: Set<string>, contexts: [{file, context}] }
  for (const f of files) {
    const body = readFileSync(f, 'utf8');
    const rel = relative(ROOT, f);
    for (const c of extractCitations(body, rel)) {
      if (!byUrl.has(c.url)) byUrl.set(c.url, { files: new Set(), contexts: [] });
      const e = byUrl.get(c.url);
      e.files.add(c.file);
      e.contexts.push({ file: c.file, context: c.context });
    }
  }

  let urls = [...byUrl.keys()].sort();
  if (args.include) urls = urls.filter((u) => u.includes(args.include));
  if (args.maxPages > 0) urls = urls.slice(0, args.maxPages);

  log(`→ ${urls.length} unique URL(s) to check semantically.`);

  const findings = [];
  let skippedNoFetch = 0;
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const { files: fileSet, contexts } = byUrl.get(url);
    log(`  [${i + 1}/${urls.length}] ${url}`);

    const page = await fetchPage(url, { timeoutMs: args.timeoutMs });
    if (!page.ok) {
      skippedNoFetch++;
      findings.push({ url, files: [...fileSet].sort(), error: `fetch: ${page.error || 'HTTP ' + page.status}` });
      continue;
    }

    const text = htmlToText(page.text);
    const result = await classifyDivergence({
      url, contexts, pageText: text, model: args.model, timeoutMs: args.timeoutMs, apiKey,
    });

    if (!result.ok) {
      findings.push({ url, files: [...fileSet].sort(), error: result.error });
    } else {
      findings.push({
        url,
        files: [...fileSet].sort(),
        verdict: result.verdict || 'unknown',
        summary: result.summary || '',
        specifics: result.specifics || [],
      });
    }

    if (i < urls.length - 1) await sleep(args.delayMs);
  }

  const report = render({ findings, args, totalUrls: byUrl.size, skippedNoFetch });

  if (args.output) {
    writeFileSync(args.output, report, 'utf8');
    log(`→ Report written to ${args.output}`);
  } else {
    process.stdout.write(report);
  }

  // Exit 1 if any drift or error
  const actionable = findings.filter((f) =>
    f.error || ['minor_drift', 'significant_drift', 'page_unrecognizable'].includes(f.verdict)
  );
  process.exit(actionable.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('freshness-semantic failed:', e);
  process.exit(2);
});
