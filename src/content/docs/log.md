---
title: Wiki Log
description: Append-only chronological record of additions, updates, and changes to The Little Creator wiki.
tags: [meta, log, audit-trail]
---

Append-only chronological record of additions and changes to the wiki. New entries at the top. The log exists for both human review ("what's been added recently?") and the [Freshness agent](/) (when implemented per `ARCHITECTURE.md` Phase 4) which uses it to detect stale content.

This page is not surfaced in the sidebar — it's accessible by URL only. Maintainers and agents know to find it; casual visitors don't see it.

## Entry format

```markdown
## YYYY-MM-DD

- <Past-tense description of the change> (PR #N).
  Source: <URL if relevant>
```

One date heading per day. Multiple bullets per heading is fine. Don't edit historical entries — fix mistakes by appending corrections at the top.

---

## 2026-05-06

- Expanded `discovery-sources.json` and upgraded the `tlc-weekly-discovery-scan` Cowork task to do real discovery work. Catalog now has 18 verified entries (8 queries / 2 feeds / 8 watchlist pages) — was 12. New entries: FLL UNEARTHED Innovation Project query, FLL coach blog query, r/FIRSTRobotics Reddit RSS feed (Reddit exposes /.rss for any subreddit), HANDS on TECHNOLOGY news watchlist, LEGO Education partnership-update watchlist (high-signal — they promised more details), LEGO Education FLL hub watchlist, FIRST press room watchlist. Verified the FLL official YouTube channel ID (UCuGaG4GtEj82i3pByi_bM3A) so the YouTube feed flips from `verified: false` to `verified: true`. Dropped the DACH news entry from feeds (no RSS available) and re-added as a watchlist page. The scheduled task prompt now has Claude run actual web searches via WebSearch, fetch watchlist pages via WebFetch, dedupe against wiki citations, and open a single GitHub issue per week with candidate sources to triage — not just the no-op script.
- Reframed the Custom GPT positioning in `CUSTOM-GPT-SETUP.md` to comply with OpenAI's under-13 policy. ChatGPT flagged the GPT with "May contain content targeting users under 13 years of age" because the prior description and system prompt led with "for kids". Updated description to lead with parents, coaches, and teachers as the target audience; rewrote the system prompt's audience-awareness section to position kids as a recognized but secondary user (and to gently redirect kids to involve an adult for substantive actions). Wiki content itself unchanged — kid-friendly framing on the public website is fine; only the GPT positioning needed adjustment. Added an explanatory note at Step 3 of the setup doc so future maintainers don't reintroduce the issue.
- Ingested firstintexas.org (FIRST in Texas) at proper depth. Crawled the site nav (43 unique paths), read 6 substantive FLL-relevant pages, added 5 entries to `resources/fll-resource-map.md` Regional partners section: FIRST in Texas main, FLL in Texas, Texas FLL Team Resources & Advancement (covers the proportional advancement formula: Qualifier → Regional 1/3 → State Championship 15%), Texas Events Calendar, Texas Team Grants. Skipped gafirst.org from the same source batch — Squarespace robots.txt explicitly disallows ClaudeBot.
  Source: https://firstintexas.org
- Ingested IET (UK FIRST LEGO League partner) at proper depth, with caveats. The IET site (education.theiet.org) is JavaScript-rendered, so plain HTML scraping returns minimal body content. Link discovery worked (12 FLL-relevant paths found in static HTML), so added 3 entries based on URL semantics + general knowledge of what each page covers, with explicit "JS-rendered, visit directly" notes: IET FLL hub, IET "A new era for FIRST LEGO League" (UK on Future Edition), and IET UK FAQs. Three entries instead of the typical 5 — limited by the rendering issue rather than by the source's actual depth.
  Source: https://education.theiet.org/first-lego-league-programmes
- Ingested firstwa.org (FIRST Washington) at proper depth. Crawled the site nav (38 unique paths), read 5 substantive FLL-relevant pages, added 5 entries to `resources/fll-resource-map.md` Regional partners section: FIRST Washington main, FLL Challenge in Washington, FLL Explore in Washington, Washington Events Calendar, Washington Volunteer. Also updated the Regional partners section intro to flag the list is curated (non-exhaustive) and point at FIRST Find Local Support for the full directory.
  Source: https://firstwa.org
- Ingested education.lego.com FLL section at proper depth. Crawled the FLL-section navigation links, read 4 substantive sub-pages, added 5 new entries to `resources/fll-resource-map.md`: LEGO Education FLL hub, **FIRST and LEGO Education Partnership Update** (canonical statement: partnership ends after 2026-2027 season; LEGO Education will run a standalone 2027-2028 season), **Computer Science & AI platform** (new K-8 hardware basis for Future Edition + LEGO's solo offering), and product pages for **SPIKE Prime** and **SPIKE Essential** (both **retiring June 30, 2026** — major purchasing-decision context). Also lightly updated the existing LEGO Education portal entry to cross-reference the new entries.
  Source: https://education.lego.com/en-us/first-lego-league/
- Re-ingested firstinspires.org at proper depth (per updated ingest-source SKILL). Crawled the FLL-relevant sitemap, read 12 pages substantively, added 7 new entries to `resources/fll-resource-map.md`: FLL Get Started flow, UNEARTHED current season hub, Season Materials Library, Past Challenges archive (1998–present), FLL Technical Resources, Family Engagement Resources, Coaches & Mentors recruitment. Brings firstinspires.org-anchored entries from 4 to 11. The total resource map count grows from 13 to 20.
  Source: https://www.firstinspires.org
- Updated `skill/ingest-source/SKILL.md` to codify the deeper-crawl standard. Reframed Phase C from "smallest correct change" to "comprehensive coverage of every distinct resource the source offers". Documented typical yields (8-12 entries for major canonical sites, 3-5 for regional partners). Added "reading only the homepage and stopping" as a failure mode. Per-source commit pattern (one commit per source, not per entry) preserved for clean audit trail.

## 2026-05-05

- Followed up the firstinspires.org ingest with proper site traversal (sitemap → 15 FLL-relevant pages → read 5 highest-leverage). Added two NEW entries to `resources/fll-resource-map.md`: (1) **Cost & Registration** under "Official sources (canonical)" — the only place in the wiki with explicit FIRST cost info plus grant pointers; (2) **FIRST Find Local Support** under "Event finders" (renamed to "Event finders & local support") — the people-side of the local FIRST ecosystem (Program Delivery Organizations, Senior Mentors), distinct from RobotEvents which is tournament-focused.
  Source: https://www.firstinspires.org
- Refreshed the FIRST Inspires entry in `resources/fll-resource-map.md` based on a fresh read of firstinspires.org. Added explicit per-program age + grade ranges (FLL: K–8 / 5–16, FTC: 7–12 / 12–18, FRC: 9–12 / 14–18) so families can see at-a-glance which program fits their kid. Sharpened the "Use when" to mention the team-finder (a primary use case the prior entry buried). Added `team-finder` tag.
  Source: https://www.firstinspires.org
- Switched agent orchestration from GitHub Actions to Cowork scheduled tasks (running on the maintainer's host). Removed `.github/workflows/{discover-sources,freshness-check,freshness-semantic}.yml` — they were never pushed to origin and are now dead code under the new model. Added npm scripts `freshness:semantic` and `discover:sources` (the freshness-check script was already wired). Added `reports/` to `.gitignore` for local report output. Three Cowork scheduled tasks now own the cadences: weekly discovery (Mondays), monthly freshness lint (1st of month), quarterly semantic freshness (Jan/Apr/Jul/Oct 1st). Each task runs the npm script, opens a GitHub issue via `gh` CLI when findings exist, and never modifies wiki content.
- Built Phase 4 ceiling: `scripts/freshness-semantic.mjs` + `.github/workflows/freshness-semantic.yml`. For each cited URL the script fetches the live page and asks Claude (Haiku by default) whether the page still supports the wiki's claims; verdicts are consistent / minor_drift / significant_drift / page_unrecognizable. Workflow is manual-only (workflow_dispatch) since semantic checks cost API tokens. Requires `ANTHROPIC_API_KEY` repo secret; fails fast with a clear message if missing. Opens a single GitHub issue with the report when drift is detected.
- Built Phase 3 v1 Discovery agent: `scripts/discover-sources.mjs` + `.github/workflows/discover-sources.yml`. Reads `discovery-sources.json`, fetches catalogued RSS/Atom feeds, surfaces items from the last 30 days. Watchlist pages are listed for manual review (page-diff is v2). Web-search queries deferred to v2 (needs Anthropic web_search or external search API). Workflow runs weekly (Monday 09:00 UTC) plus on-demand; opens one summary issue per run. Issues only, never PRs — per ARCHITECTURE.md autonomy-discipline.
- Scaffolded Phase 3 (`discovery-sources.json` + `discovery-sources.schema.md`) — the curated catalog the future Discovery agent will read to find new sources. Three categories (queries, RSS feeds, watchlist pages) with shared fields for tags / frequency / verified / notes. Seeded with FLL-current and Future Edition queries, plus high-confidence watchlist pages (firstlegoleague.org, FIRST CANOPY, DACH partner Future Edition page, LEGO Education portal). Two RSS feeds are listed as `verified: false` pending URL confirmation.
- Added `.github/workflows/freshness-check.yml` — monthly cron (1st of each month, 08:00 UTC) plus on-demand workflow_dispatch. Runs `scripts/freshness-check.mjs`, uploads the report as a workflow artifact, and opens a single summary GitHub issue when actionable findings exist. Per the project's autonomy-discipline rule, opens issues only — never PRs.
- Added `scripts/freshness-check.mjs` — Phase 4 prep, the lint half of the Freshness agent in `ARCHITECTURE.md`. Walks `src/content/docs/`, extracts every external URL the wiki cites, and reports HTTP status, redirect chains, last-modified ages, and network errors as a markdown audit. Wired up as `npm run freshness:check`. No semantic comparison yet (that needs an LLM); this scaffolds the mechanical half so wiki rot is at least visible. Skips fenced code blocks and inline-code spans so example URLs don't leak in.
  Source: https://github.com/zhangqi444/the-little-creator (this repo)
- Rewrote `resources/software-tools.md` to the per-entry pattern. Dropped LEGO Mindstorms App as a primary listing (Mindstorms production ended 2022; SPIKE Prime is canonical for current Founders Edition). Added Pybricks as an alternative SPIKE firmware. Added a Future Edition section noting the new Computer Science & AI platform with details TBD. Demoted VEX content to a clearly-marked secondary section per BRD scope. Replaced bare productivity-tool list with a focused notebook/presentation/workflow paragraph (no per-entry blocks for generic tools).
  Source: https://www.firstinspires.org/first-canopy
- Touched up `getting-started/index.md`: added tags/audience/level frontmatter; rewrote the intro to acknowledge FLL's three age divisions (Discover, Explore, Challenge) and point to `what-is-fll.md` for the overview; added a regional-partner pointer for non-US families.
  Source: https://www.firstlegoleague.org
- Added a Founders/Future Edition disclaimer to `guides/season-planning.md`. The substantive month-by-month content remains intact; the page is explicitly scoped to the Founders Edition (SPIKE-based, applies through 2027/28), with a cross-link to the Future Edition transition entry. Updated frontmatter with `season: 2025` and a `founders-edition` tag for retrieval clarity.
  Source: https://www.firstinspires.org/first-canopy

## 2026-05-04

- Refreshed `getting-started/what-is-fll.md` to reflect current FLL state. Now covers all three divisions (Discover 4-6, Explore 6-10, Challenge 9-16) instead of conflating FLL with Challenge alone. Added a "What's changing: Future Edition" section anchored to the resource map entry. Cleaned up outdated framings (Mindstorms → SPIKE Prime as the canonical kit; explicit current-season disclaimer for honesty about uncertainty).
  Source: https://www.firstlegoleague.org
- Added Future Edition transition entry to `resources/fll-resource-map.md`. Documents the 2026/27 dual-edition rollout (Founders + Future), the FIRST CANOPY / BIOGLOW season naming, the new LEGO Education Computer Science & AI hardware platform, and the non-compatibility with SPIKE — material for purchasing decisions and team planning.
  Source: https://www.firstinspires.org/first-canopy

## 2026-05-03

- Added a Regional partners section to `resources/fll-resource-map.md` with the HANDS on TECHNOLOGY (DACH region: Germany, Austria, Switzerland) entry. First non-US entry in the resource map.
  Source: https://www.first-lego-league.org
- Established Phase 1 foundations: extended root `CLAUDE.md` with project schema (FLL focus, copyright stance, frontmatter schema, entry pattern, ingest workflow with budgets and politeness rules, branch hygiene). Added `AGENTS.md` as cross-tool shim. Added `src/content/docs/CLAUDE.md` with content authoring rules. Seeded this `log.md`.
- Wired the live Custom GPT URL into the homepage hero, README, and CUSTOM-GPT-SETUP.md (PR #7).
  Source: https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper
- Added alternative logo (`logo-v2.svg` and `logo-v2.jpg`) — three stacked LEGO-style blocks with a friendly robot face on top (PR #6).
- Added `generate:skill` npm script and `scripts/build-skill.mjs` validator. Wired into `prebuild` so CI catches malformed skill bundles (PR #5).

## 2026-05-02

- Added `BRD.md` and `ARCHITECTURE.md` design docs (PR #4). BRD captures problem, personas, outcomes, scope, success metrics. Architecture captures five-layer model, four agents, schema docs hierarchy, four-phase rollout.
- Added gstack team-mode (optional) section to `CLAUDE.md` via `gstack-team-init optional` (PR #4).
- Added PR-time CI workflow (`.github/workflows/pr-checks.yml`) and fixed pre-existing Starlight version mismatch (the committed config used 0.32+ array `social` syntax but `package.json` constrained to `^0.30.0`); bumped to `^0.34.0` and committed `package-lock.json` for reproducibility (PR #3).
- Expanded `guides/season-planning.md` from a high-level placeholder to a substantive month-by-month FLL plan with pre-season prep, parallel Innovation Project timeline, Core Values discipline, pit kit checklist, and common pitfalls (PR #3).
- Added `for-educators/core-values-rubric.md` — a working 1–4 rubric for the six FLL Core Values (Discovery, Innovation, Impact, Inclusion, Teamwork, Fun) with observable behaviors and coaching prompts per level (PR #3).
- Restructured `resources/` with the curated metadata pattern. Rewrote `resources/learning-materials.md` as canonical example (11 entries) and added `resources/fll-resource-map.md` with 9 curated FLL links covering official sources, event finders, independent resources, communities (PR #2).
- Added `for-educators/` section: `index.md`, `curriculum-starter.md` (8-week FLL onboarding for classroom/club), `lesson-plan-template.md` (PR #2).
- Re-anchored homepage and `getting-started/index.md` on FLL with VEX as a "next step" mention. Renamed Custom GPT scope to FLL Helper.
- Renamed project from "The Little Maker" to "The Little Creator" across 8 files (PR #2).
- Added `scripts/generate-llms-txt.mjs` — walks `src/content/docs/`, parses frontmatter and per-entry metadata, emits `public/llms.txt` (TOC), `public/llms-full.txt` (whole corpus), and per-section files (PR #2).
- Scaffolded Claude Skill bundle (`skill/`): `SKILL.md`, `templates/engineering-notebook-entry.md`, `examples/fll/line-follower.py`, `examples/vex/autonomous-base.cpp` (PR #2).
