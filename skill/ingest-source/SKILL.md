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

Answer four questions, in this order:

1. **What is this source?** One sentence + authority level (`official` for FIRST/LEGO/VEX/program-owned content, `independent` for trusted third-party, `community` for forums/social).
2. **What entities does it touch?** Cross-reference against existing wiki pages. Common entities: SPIKE Prime, Mindstorms, FLL season 20XX, Innovation Project, Core Values, specific programs (FTC, FRC), specific roles (coach, judge, mentor).
3. **What's the smallest correct change?** In order of preference:
   - Add **one entry** to a resource map (`resources/fll-resource-map.md` or `resources/learning-materials.md` is most common).
   - **Update** an existing entry (refine `Use when:`, add a tag) if the source illuminates a resource we already cite.
   - Update prose in a **guide** (`guides/`) or **educator page** (`for-educators/`) only when the source teaches us something the prose got wrong.
   - **Create a new page** only if the source covers a topic the wiki doesn't address at all. Default to update-over-create.
4. **What's already covered?** If the wiki already cites this URL, *update* the existing entry instead of duplicating. Search for the URL with `grep -r "<url>" src/content/docs/` before adding anything.

### Step 5 — Phase D: Record

- [ ] Make the edit per the per-entry pattern in [`src/content/docs/CLAUDE.md`](../../src/content/docs/CLAUDE.md). Required fields per entry: `URL`, `Authority`, `Audience`, `Level`, `Tags`, `Use when`, plus a description paragraph.
- [ ] **Never paste source prose.** Hard limit: ≤50 consecutive words from any external source. If tempted to paste a paragraph, write a 2-sentence summary in your own words.
- [ ] Append a one-line entry to [`src/content/docs/log.md`](../../src/content/docs/log.md) under today's date heading. Format: `- <past-tense description> (PR #N when known). Source: <url>`.
- [ ] Stage a **commit** (one-line metadata addition) or open a **PR** (multi-page changes). Branch off latest main with the convention `claude/ingest-<short-slug>`.

### Step 6 — Report

Tell the user:

- What you ingested (1-line summary)
- Which wiki page(s) you updated, with relative paths
- How many pages you crawled (for sites) and how many you skipped, with reasons
- Whether you stopped early (saturation, budget cap, error) and why
- Any policy concerns flagged (copyright pressure, JS-only content, login wall)

## What "done" looks like

A successful ingest produces:

1. Exactly one new or updated wiki page (rarely more — keep commits scoped).
2. A new entry in `log.md`.
3. A commit or PR with a present-tense subject and a body explaining *why* this source is worth citing.
4. Generated artifacts (`public/llms-*.txt`) regenerated automatically by `prebuild` at next build.

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

- **Skipping the search-for-existing-citation step.** Duplicates fragment retrieval and confuse readers.
- **Pasting more than 50 consecutive words from the source.** That's republishing, not citing.
- **Inventing metadata.** If you don't know the source's audience, write `families, coaches` (the safe default), not "everyone."
- **Updating five pages "while you're at it."** Keep commits scoped to the source. Other improvements go in separate PRs.
- **Skipping the `log.md` entry.** The log is the audit trail the freshness agent depends on; missing entries break Phase 4.
