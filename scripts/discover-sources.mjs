#!/usr/bin/env node
// scripts/discover-sources.mjs — Phase 3 Discovery agent (mechanical v1).
//
// Reads discovery-sources.json and surfaces what's new across the
// catalogued feeds and watchlist pages. v1 is mechanical only — no LLM
// classification yet. The output is a markdown report meant to be opened
// as a single GitHub issue per run; a human triages each candidate.
//
// What it does in v1:
//   • Feeds: fetches each RSS/Atom feed, parses items, surfaces ones with
//     pubDate within --recent-days (default 30).
//   • Watchlist pages: lists them for manual review (no diff yet — that's
//     v2 with state management).
//   • Queries: skipped in v1. Will require either Anthropic web_search or
//     a separate search API key — both deferrable.
//
// What it doesn't (yet):
//   • LLM classification ("is this on-topic for FLL?")
//   • Page-content diff for watchlist (needs persistent state)
//   • Web search queries (needs a search API or Anthropic web_search tool)
//
// Politeness:
//   • User-Agent: TheLittleCreator-DiscoveryBot/1.0
//   • 1s default delay between requests
//   • 15s timeout per fetch
//
// Usage:
//   node scripts/discover-sources.mjs [options]
//
// Options:
//   --catalog <path>    Path to discovery-sources.json (default: ./discovery-sources.json)
//   --output <path>     Write report to a file (default: stdout)
//   --recent-days <n>   Treat feed items as "new" if pubDate is within N days (default: 30)
//   --frequency <name>  Only process entries with this frequency (weekly|monthly|quarterly|all)
//   --delay-ms <n>      Delay between fetches in ms (default: 1000)
//   --quiet             Suppress progress output to stderr

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const USER_AGENT =
  'TheLittleCreator-DiscoveryBot/1.0 (+https://github.com/zhangqi444/the-little-creator)';

// ---------- CLI ----------
function parseArgs(argv) {
  const args = {
    catalog: join(ROOT, 'discovery-sources.json'),
    output: null,
    recentDays: 30,
    frequency: 'all',
    delayMs: 1000,
    timeoutMs: 15000,
    quiet: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--catalog') args.catalog = argv[++i];
    else if (a === '--output') args.output = argv[++i];
    else if (a === '--recent-days') args.recentDays = Number(argv[++i]);
    else if (a === '--frequency') args.frequency = argv[++i];
    else if (a === '--delay-ms') args.delayMs = Number(argv[++i]);
    else if (a === '--timeout-ms') args.timeoutMs = Number(argv[++i]);
    else if (a === '--quiet') args.quiet = true;
    else if (a === '--help' || a === '-h') {
      console.log('See header in scripts/discover-sources.mjs');
      process.exit(0);
    } else {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- Catalog filter ----------
function shouldRunFor(entry, freqFilter) {
  if (!entry.verified) return false;
  if (freqFilter === 'all') return true;
  return entry.frequency === freqFilter;
}

// ---------- Feed fetching + parsing ----------
async function fetchText(url, { timeoutMs }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': USER_AGENT, accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*' },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    if (!res.ok) {
      return { ok: false, status: res.status, body: null };
    }
    const body = await res.text();
    return { ok: true, status: res.status, body };
  } catch (e) {
    return { ok: false, status: null, body: null, error: e.name === 'AbortError' ? 'timeout' : e.message };
  } finally {
    clearTimeout(t);
  }
}

// Minimal RSS/Atom parser. Handles the common flavors; falls back gracefully.
// Returns array of { title, link, pubDate (Date | null), guid }.
function parseFeed(xml) {
  const items = [];
  if (!xml) return items;

  // RSS 2.0: <item>…</item>
  for (const m of xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/g)) {
    const block = m[1];
    items.push({
      title: extractTag(block, 'title') || '(no title)',
      link: extractTag(block, 'link') || '',
      pubDate: parseDate(extractTag(block, 'pubDate') || extractTag(block, 'dc:date')),
      guid: extractTag(block, 'guid') || extractTag(block, 'link') || '',
    });
  }

  // Atom: <entry>…</entry>
  for (const m of xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/g)) {
    const block = m[1];
    // Atom <link href="..."/>
    const linkAttr = block.match(/<link\b[^>]*href=["']([^"']+)["']/);
    items.push({
      title: extractTag(block, 'title') || '(no title)',
      link: linkAttr ? linkAttr[1] : '',
      pubDate: parseDate(extractTag(block, 'updated') || extractTag(block, 'published')),
      guid: extractTag(block, 'id') || (linkAttr ? linkAttr[1] : ''),
    });
  }

  return items;
}

function extractTag(block, name) {
  // Handle <name>value</name>, possibly with CDATA
  const re = new RegExp(`<${escapeRegex(name)}\\b[^>]*>([\\s\\S]*?)<\\/${escapeRegex(name)}>`, 'i');
  const m = block.match(re);
  if (!m) return '';
  let v = m[1].trim();
  const cdata = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) v = cdata[1];
  return v.trim();
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseDate(s) {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

// ---------- Render ----------
function render({ feedResults, watchlist, catalog, args }) {
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Discovery Report — ${today}`);
  lines.push('');
  lines.push('Generated by `scripts/discover-sources.mjs`. Mechanical v1 — no LLM classification yet. Review each candidate and either ingest, dismiss, or update the catalog.');
  lines.push('');

  // Summary
  const totalNew = feedResults.reduce((sum, fr) => sum + (fr.newItems?.length || 0), 0);
  const totalErrors = feedResults.filter((fr) => fr.error).length;
  lines.push('## Summary');
  lines.push('');
  lines.push(`- **${feedResults.length}** feeds checked`);
  lines.push(`- **${totalNew}** items in the last ${args.recentDays} days`);
  if (totalErrors > 0) lines.push(`- **${totalErrors}** feeds errored`);
  lines.push(`- **${watchlist.length}** watchlist pages flagged for manual review`);
  lines.push('');

  // Feeds with new items
  const feedsWithItems = feedResults.filter((fr) => fr.newItems && fr.newItems.length > 0);
  if (feedsWithItems.length > 0) {
    lines.push('## Feed candidates');
    lines.push('');
    for (const fr of feedsWithItems) {
      lines.push(`### ${fr.entry.name}`);
      lines.push('');
      lines.push(`Tags: ${(fr.entry.tags || []).join(', ')}  `);
      lines.push(`Source: ${fr.entry.url}`);
      lines.push('');
      for (const item of fr.newItems) {
        const date = item.pubDate ? item.pubDate.toISOString().slice(0, 10) : '(no date)';
        lines.push(`- **${date}** — [${item.title}](${item.link})`);
      }
      lines.push('');
    }
  }

  // Feed errors
  const errored = feedResults.filter((fr) => fr.error);
  if (errored.length > 0) {
    lines.push('## Feeds with errors');
    lines.push('');
    for (const fr of errored) {
      lines.push(`- **${fr.entry.name}** (${fr.entry.url}) — ${fr.error}`);
    }
    lines.push('');
  }

  // Watchlist (manual review)
  if (watchlist.length > 0) {
    lines.push('## Watchlist pages — manual review');
    lines.push('');
    lines.push('Visit each, compare against current wiki claims, and ingest changes you find:');
    lines.push('');
    for (const w of watchlist) {
      lines.push(`- **[${w.name}](${w.url})** (tags: ${(w.tags || []).join(', ')})`);
      if (w.look_for) lines.push(`  Look for: ${w.look_for}`);
    }
    lines.push('');
  }

  // Skipped categories
  const skippedQueries = (catalog.queries || []).filter((q) => q.verified).length;
  if (skippedQueries > 0) {
    lines.push('## Skipped (Phase 3 v2)');
    lines.push('');
    lines.push(`- ${skippedQueries} verified queries were not run. Web search needs either Anthropic web_search tool or a separate search-API integration; tracked for v2.`);
    lines.push('');
  }

  return lines.join('\n');
}

// ---------- Main ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const log = (msg) => { if (!args.quiet) process.stderr.write(msg + '\n'); };

  log(`→ Reading catalog: ${args.catalog}`);
  let catalog;
  try {
    catalog = JSON.parse(readFileSync(args.catalog, 'utf8'));
  } catch (e) {
    console.error(`Failed to read catalog: ${e.message}`);
    process.exit(2);
  }

  const feeds = (catalog.feeds || []).filter((e) => shouldRunFor(e, args.frequency));
  const watchlist = (catalog.watchlist_pages || []).filter((e) => shouldRunFor(e, args.frequency));

  log(`→ ${feeds.length} feed(s), ${watchlist.length} watchlist page(s) match frequency=${args.frequency}`);

  const since = new Date(Date.now() - args.recentDays * 86400000);
  const feedResults = [];

  for (let i = 0; i < feeds.length; i++) {
    const entry = feeds[i];
    log(`  [${i + 1}/${feeds.length}] ${entry.name}`);
    const r = await fetchText(entry.url, { timeoutMs: args.timeoutMs });
    if (!r.ok) {
      feedResults.push({ entry, error: r.error || `HTTP ${r.status}` });
    } else {
      const items = parseFeed(r.body);
      const newItems = items
        .filter((it) => it.pubDate && it.pubDate >= since)
        .sort((a, b) => b.pubDate - a.pubDate);
      feedResults.push({ entry, items, newItems });
    }
    if (i < feeds.length - 1) await sleep(args.delayMs);
  }

  const report = render({ feedResults, watchlist, catalog, args });

  if (args.output) {
    writeFileSync(args.output, report, 'utf8');
    log(`→ Report written to ${args.output}`);
  } else {
    process.stdout.write(report);
  }

  // Exit 1 if there's anything actionable (new items or errored feeds)
  const totalNew = feedResults.reduce((sum, fr) => sum + (fr.newItems?.length || 0), 0);
  const totalErrors = feedResults.filter((fr) => fr.error).length;
  process.exit(totalNew + totalErrors > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('discover-sources failed:', e);
  process.exit(2);
});
