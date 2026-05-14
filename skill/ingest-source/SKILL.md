---
name: ingest-source
description: Ingest a URL or text source into the FLL wiki. Reads the source (with bounded sub-page traversal for sites), identifies relevant wiki entities, updates the appropriate pages with proper metadata, never republishes copyrighted content, appends to log.md, and stages a commit or PR. Use when a human pastes a URL and asks to "ingest" or "add this to the wiki," or when working through the autonomous-discovery pipeline (Phase 3 of ARCHITECTURE.md).
---

# ingest-source

Operationalizes the four-phase ingest workflow defined in the root [`CLAUDE.md`](../../CLAUDE.md) §"Ingest workflow." That document owns the rules — budgets, politeness, copyright stance, when-to-stop. **Read it before running this skill.** This file owns the *execution checklist*: what to do, in what order, when an ingest is requested.

## When to invoke

A human typed something like:
- "Ingest this: <url>"
- "Add <url> to the wiki"
- "Can we cite <url> from the FLL Resource Map?"
- "Pull in this article: <url>"

Or a discovery agent (Phase 3, future) handed you an issue with a proposed source.

If the user just pasted a URL with no instruction, ask: "Want me to ingest this into the wiki, or just look at it?"

## Inputs

- **One source URL.** Multi-source ingests should be split into one invocation per source so the audit trail in `log.md` stays clean.
- Optional: a hint about which wiki section the user thinks it belongs in. Don't trust this hint blindly; verify against the Synthesize step.

## Execution checklist

Walk through these steps in order. Don't skip — each step exists because skipping it has caused real problems in past ingests.

### Step 1 — Pre-flight

- [ ] Confirm the URL is fetchable. If the page is JS-rendered, paywalled, or behind login: **stop**. Log the skip in `log.md` with the reason; tell the user.
- [ ] Read [`CLAUDE.md`](../../CLAUDE.md) § "Ingest workflow" for the active budgets (max pages, hops, request rate). Defaults: 30 pages per site, 2 hops, 1 req/2s, 5 min wall-clock.
- [ ] Decide: is this a **document** (single article URL) or a **site** (root URL, "about" path, sitemap-bearing domain)? See the heuristic in §"Phase A — Discover."

### Step 2 — Phase A: Discover

For a **document**, you're fetching one URL. Skip to Step 3.

For a **site**:

- [ ] Fetch `/robots.txt`. Honor any disallowed paths. If everything is disallowed, abort and log.
- [ ] Fetch `/sitemap.xml` (or `/sitemap_index.xml`). If present, this is your canonical page list — skip link-discovery.
- [ ] If no sitemap: extract internal links from the seed page, queue same-domain pages up to 2 hops away.
- [ ] **Filter the queue:** drop search results, login pages, calendar pages, pagination beyond page 2, asset URLs already linked, query-param duplicates.
- [ ] **Prefer same-path-prefix.** If the seed is `example.com/fll/`, prioritize `/fll/*` over `/store/*`.
- [ ] Cap the queue at the budget (default 30 pages).

### Step 3 — Phase B: Read

For each page in the queue (or just the document):

- [ ] Fetch with the canonical User-Agent: `TheLittleCreator-IngestBot/1.0 (+https://github.com/zhangqi444/the-little-creator)`. Never spoof a browser.
- [ ] Strip nav, footer, ads, cookie banners. Focus on `<main>`, `<article>`, or the largest text block.
- [ ] Extract: page title, primary text, dates (published / updated), authors, outbound links to authoritative sources, audience cues ("for parents", "for ages 9–11", etc.).
- [ ] Skip pages with <200 words of substance — usually nav-only.
- [ ] **Stop signals:** 403, 429, captcha, repeated 5xx → back off and stop. Log the partial result.

### Step 4 — Phase C: Synthesize

The goal is **comprehensive coverage of every distinct resource** the source offers — not a single summary entry. When a human pastes a homepage URL, they're asking for a database from the whole site, not a single bookmark.

Answer four questions, in this order:

1. **What is this source?** One sentence + authority level (`official` for FIRST/LEGO/VEX/program-owned content, `independent` for trusted third-party, `community` for forums/social).
2. **What entities does it touch?** Cross-reference against existing wiki pages. Common entities: SPIKE Prime, Mindstorms, FLL season 20XX, Innovation Project, Core Values, specific programs (FTC, FRC), specific roles (coach, judge, mentor).
3. **What distinct resources does the site offer?** For each substantive sub-page you read in Phase B, ask: does this serve a *different* user question than the others? If yes, it's a separate entry. Examples of distinct resources:
   - Cost & registration page (parents asking "what does this cost?")
   - Team finder (parents asking "where's a team near me?")
   - Season materials hub (coaches asking "where do I get the manual?")
   - Volunteer onboarding (community members asking "how do I help?")
   - Press / news archive (anyone asking "what changed recently?")

   Typical yields per source: **8–12 entries for a major canonical site** (firstinspires.org, firstlegoleague.org, education.lego.com), **3–5 entries for a regional partner**, **1–3 entries for a single-topic independent resource**.

4. **What's already covered?** Always `grep -r "<url>" src/content/docs/` before adding any individual URL. For URLs already cited, *update* the existing entry rather than duplicate. Use judgment to skip overlapping pages (e.g., "About" + "Mission" + "History" usually collapse into one organizational-overview entry, not three).

### Step 5 — Phase D: Record

- [ ] Make one resource-map entry per distinct resource per the per-entry pattern in [`src/content/docs/CLAUDE.md`](../../src/content/docs/CLAUDE.md). Required fields per entry: `URL`, `Authority`, `Audience`, `Level`, `Tags`, `Use when`, plus a description paragraph.
- [ ] Group entries under appropriate section headings. For sites that warrant their own section (e.g., a regional partner's full set of resources), it's fine to introduce a new `## Section name` heading.
- [ ] **Never paste source prose.** Hard limit: ≤50 consecutive words from any external source. If tempted to paste a paragraph, write a 2-sentence summary in your own words. This applies per-entry, not per-source — many short summaries are fine.
- [ ] Append **one summary line per source** to [`src/content/docs/log.md`](../../src/content/docs/log.md) under today's date heading (not one line per entry — keep the audit trail at source granularity). Format: `- Ingested <source>: added N entries covering <topics>. Source: <url>`.
- [ ] **Run the copyright lint locally before committing:** `npm run lint:copyright -- --quiet`. If any entry trips the >50-word threshold, rewrite that entry's description in your own words and re-run the lint. **Do not push if the lint fails.**
- [ ] Stage one commit per source. Commit message subject: `Ingest <source-name>: N new entries`. Body: list each entry's title and where it landed. For autonomous-agent runs, also note "auto-discovery" in the body so audit-trail readers can distinguish.
- [ ] **Commit directly to `main`** and `git push origin main`. The maintainer's working pattern is direct-to-main; the autonomy rule (ARCHITECTURE.md §5) extends the same to agents. The copyright lint you just ran is the only gate; if it passed, the commit is safe to ship.
- [ ] If something feels off (uncertain about copyright, struggling to dedupe against existing content, the source is borderline on-topic), open a GitHub issue instead of committing — that's the explicit fallback path.

### Step 6 — Report

Tell the user:

- What you ingested (1-line summary)
- Which wiki page(s) you updated, with relative paths
- How many pages you crawled (for sites) and how many you skipped, with reasons
- Whether you stopped early (saturation, budget cap, error) and why
- Any policy concerns flagged (copyright pressure, JS-only content, login wall)

## What "done" looks like

A successful ingest produces:

1. Multiple new or updated entries in resource-map files — one per distinct resource the source offers. Typical: 8–12 for a major canonical site, 3–5 for a regional partner, 1–3 for a single-topic independent resource. A 1-entry ingest is the exception, not the rule.
2. One summary line in `log.md` for the whole source (not one per entry).
3. A commit (one per source) with a present-tense subject like `Ingest <source>: N new entries` and a body listing the entries.
4. Generated artifacts (`public/llms-*.txt`) regenerated automatically by `prebuild` at next build — total entry count grows by N.

A skipped ingest (also valid) produces:

1. A `log.md` entry explaining what was skipped and why ("JS-rendered, no readable HTML"; "robots.txt disallows"; "content is behind login").
2. No wiki changes.
3. A short message to the user.

## Common edge cases

- **Source is on `firstlegoleague.org` or `firstinspires.org`:** authority is `official`. Defer to it for facts; never restate. Cite and move on.
- **Source is a YouTube video or podcast:** describe what it covers (don't paste transcript). Add to `learning-materials.md` or the relevant resource map. Authority is `independent` unless it's an official channel.
- **Source has a "no AI training" notice or a clear scrape prohibition:** skip the entire source. Log the skip. Don't try to work around.
- **Source is a PDF:** fetch and extract text. Skip if the PDF is image-only / OCR would be needed — note in log.
- **Source is a live-changing page (rules update annually):** add a `season:` tag matching the FLL season year. Flag in the log so the freshness agent can re-check after the next August reveal.
- **Source contradicts existing wiki content:** flag the contradiction in the log, propose the fix in the PR description, let the human decide.
- **Source is a community post that's wrong or unsafe for kids:** don't ingest. Politely tell the user why.

## Failure modes to avoid

- **Reading only the homepage and stopping there.** A homepage rarely captures the substantive resources of a site — it's a navigation index. Always traverse via sitemap.xml or 2-hop link following.
- **Adding only one entry from a multi-resource site.** If you read 8 substantive pages from firstinspires.org and add a single "FIRST Inspires" entry, you've thrown away the work. Each distinct resource gets its own entry.
- **Skipping the search-for-existing-citation step.** Duplicates fragment retrieval and confuse readers.
- **Pasting more than 50 consecutive words from the source.** That's republishing, not citing. The limit is per-entry; many short summaries are fine.
- **Inventing metadata.** If you don't know the source's audience, write `families, coaches` (the safe default), not "everyone."
- **Bundling multiple unrelated source ingests into one commit.** One commit per source keeps the audit trail clean and lets each ingest be reverted independently.
- **Skipping the `log.md` entry.** The log is the audit trail the freshness agent depends on; missing entries break Phase 4.
