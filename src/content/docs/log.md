---
title: Wiki Log
description: Append-only chronological record of additions, updates, and changes to The Little Creator wiki.
tags: [meta, log, audit-trail]
---

Append-only chronological record of additions and changes to the wiki. New entries at the top. The log exists for both human review ("what's been added recently?") and the [Freshness agent](/) (when implemented per `ARCHITECTURE.md` Phase 4) which uses it to detect stale content.

This page is not surfaced in the sidebar - it's accessible by URL only. Maintainers and agents know to find it; casual visitors don't see it.

## Entry format

```markdown
## YYYY-MM-DD

- <Past-tense description of the change> (PR #N).
  Source: <URL if relevant>
```

One date heading per day. Multiple bullets per heading is fine. Don't edit historical entries - fix mistakes by appending corrections at the top.

---

## 2026-05-25

- **Ingest: FLL Future Edition + BIOGLOW expansion (auto-discovery).** Added three new entries to `fll-resource-map.md`. (1) Under Official sources, the FIRST community blog post "A New Era for FIRST LEGO League: Inspiring the Next Generation of Learners" (Kim Wierman & Camilla Bottke, Jan 12, 2026) — canonical staff-bylined Future Edition launch announcement covering the four player roles, semi-cooperative matches, simplified age/grade bands, and the **Discover-division retirement after UNEARTHED**. (2) Under Regional partners, the **DACH BIOGLOW (2026/27) season landing** — confirms the pattern-predicted URL `/en/2026-27-season/bioglow` is now live and pulls out the published season calendar (registration May 19, kickoff Aug 4, deadlines, DACH Final April 2027). (3) Under Regional partners, the **DACH Future Edition pricing & transition bonus** post (May 19, 2026) — DACH-only fee structure with the `HoT_FT8+_2026` voucher code for existing teams. Also lightly edited the existing "DACH season archives — per-season pattern" entry to acknowledge BIOGLOW is now a verified season under the pattern.
  Source: https://community.firstinspires.org/new-era-first-lego-league-future-edition + https://www.first-lego-league.org/en/2026-27-season/bioglow + https://www.first-lego-league.org/en/2026-27-season/season-updates/future-edition-pricing-structure-transition-bonus

## 2026-05-23

- **Phase 5 — Custom GPT reframed for multi-program.** Updated `CUSTOM-GPT-SETUP.md` so the canonical GPT positioning now spans FLL + FTC + FRC + VEX (IQ/V5/U) rather than FLL-only. Name changed from "The Little Creator — FLL Helper" to "The Little Creator — Robotics Helper". Description, system-prompt opening, context-triage section (now triages on program FIRST, then region/division/first-season), Behavior rules "stay in scope" line, and Conversation starters all updated. Coverage-depth caveat baked into the prompt: FLL is the most-developed (60+ entries), FTC/FRC/VEX are starter-coverage and the GPT should be honest about uncertainty for those. Knowledge-file upload path updated (public/llms/ now, not public/ root). Maintainer must re-paste in the GPT editor + re-upload regenerated knowledge files for the change to take effect — same workflow as previous updates.
- **Phase 4 — verified VEX-family feeds.** Added 3 more feeds to `discovery-sources.json`: VEX Robotics official YouTube (channel ID `UC7jrVEiBjPrOM7-RZSAoebg` confirmed via canonical URL on @VEXRobotics handle), r/vexiq Reddit RSS, r/VEX Reddit RSS. All verified true. New feed total: 7 (was 4: FLL YouTube, r/FIRSTRobotics, r/FTC, r/FRC). With this, every program in scope (FLL, FTC, FRC, VEX IQ, VEX V5, VEX U) has at least one verified high-signal community feed feeding into the weekly discovery scan.
- **Phase 3 — multi-program discovery catalog.** Extended `discovery-sources.json` to cover FTC, FRC, and VEX alongside FLL. Added 7 queries (FTC DECODE 2025-26 + BIOBUZZ 2026-27, FRC REBUILT 2025-26 + BIOCORE 2026-27, VEX V5 + VEX IQ current season, broader FLL season), 2 feeds (r/FTC and r/FRC RSS), 6 watchlist pages (FTC/FRC game-and-season hubs at firstinspires.org, FIRST Community blog FTC + FRC topic feeds, vexrobotics.com main, recf.org for REC Foundation). Also fixed a JSON syntax error at line 169 (stray `},` between two entries — likely a merge mishap from an autonomous agent). New totals: 15 queries / 4 feeds / 25 watchlist pages. The weekly Cowork discovery task now surfaces candidates across all six programs, not just FLL.
- **Phase 2 — wiki content scaffolding for FTC and FRC.** Created `getting-started/what-is-ftc.md` (program overview with FLL/FTC/FRC comparison table, season structure, hardware/software needs) and `getting-started/what-is-frc.md` (same shape, FRC-specific). Created `resources/ftc-resource-map.md` with **7 entries** (FTC program home; Get Started; DECODE 2025/26 season; Team Management Resources; Programming Resources; FTC SDK on GitHub; ftc-docs.firstinspires.org) — all deep-crawled per the SKILL. Created `resources/frc-resource-map.md` with **7 entries** (FRC program home; Get Started; REBUILT 2025/26 season; Season Materials; KitBot; Newly Formed Teams Rookie criteria; WPILib) — all deep-crawled. Updated Astro sidebar to surface all 4 program pages and all 4 resource maps. Reframed `getting-started/index.md` from FLL-first to program-agnostic (intro now leads with both FIRST and VEX families; Start-here links to all 4 program pages). Site description updated. Net effect: the wiki is now visibly multi-program; the discovery agent can ingest FTC/FRC sources into existing structure rather than needing to create it.
  Source: https://www.firstinspires.org/programs/ftc/ + https://www.firstinspires.org/programs/frc/

## 2026-05-16

- **Project scope expanded** from FLL-primary to multi-program. Now in-scope: the FIRST family (FLL, FTC, FRC) and the VEX family (VEX IQ, VEX V5/VRC, VEX U) — six programs total, co-equal in the wiki. Updated `BRD.md` §4 with the new in-scope list (replaced "FLL primary, VEX secondary" framing), the personas and tone guidance now acknowledge audiences spanning ages 4 to college. Updated `CLAUDE.md`, `AGENTS.md`, `ARCHITECTURE.md` to cascade the change: agents and SKILL workflow apply identically across all programs. FLL has the most-developed coverage as of today (60+ entries); FTC/FRC/VEX builds-out start in subsequent phases. No content changes in this commit — Phase 1 is governance only. Phase 2+: content scaffolding, ingests, GPT reframe.
- Ingested the 2026/27 CANOPY registration-timeline announcement (FIRST Dashboard closing June 8–15, intent-to-participate flow after June 15, new FIRST Storefront launching July, Game Set purchases via Storefront in September). Added a new "CANOPY 2026/27 registration timeline + new FIRST Dashboard / Storefront" entry to `resources/fll-resource-map.md` under Official sources. Cite URL is `firstinspires.org/first-canopy` (we already have the season landing as a watchlist); source for the timeline specifics is the FIRST community announcement email/blog the maintainer pasted into our session. Also added `community.firstinspires.org/topic/fll/` to `discovery-sources.json` as a high-signal weekly watchlist — this is where the next round of Dashboard/Storefront detail posts will land. Marked the entry `time-sensitive` so the freshness agent flags it after July when the timeline becomes historical.
  Source: https://www.firstinspires.org/first-canopy (season landing); user-provided announcement text
- Added a "Context triage" rule to the Custom GPT system prompt in `CUSTOM-GPT-SETUP.md`. The GPT now proactively asks for region (country / US state), division (Discover / Explore / Challenge), and first-season status before answering region/division-dependent questions - but skips the triage for universal questions like "what is FLL?". Replaced one conversation starter with a context-priming starter so new users land in the triage flow naturally. Rationale: FLL answers vary enormously by region (regional partner, currency, event finders) and division (totally different programs); without context the GPT defaults to generic US-Challenge framing which mis-serves the ~30% of users in DACH, UK, AU, or in Discover/Explore. Maintainer needs to re-paste the updated system prompt + replace conversation starter #1 in the GPT editor for the change to take effect.
- Codified the pattern-aware ingest rule in the project schema docs so future sessions (human or agent) follow the same method. Updated `CLAUDE.md` with a new "Pattern-aware ingest" section + extended Phase A (added Step 6 "Detect URL templates") and Phase D (added the watchlist-registration follow-through). Updated `skill/ingest-source/SKILL.md` to mirror the rule in the execution checklist. Updated `AGENTS.md` non-negotiables + workflows table to flag templated patterns as a distinct case + reference the new docs. The DACH season-archive entry from earlier today is the canonical concrete example referenced throughout. Net effect: when an agent encounters a site whose sitemap has repeating per-X structure (year, season, region, event, product), it adds ONE meta-entry plus a predicted-next-URL watchlist rather than dozens of duplicates.
- Mapped the DACH partner's per-season URL pattern via sitemap analysis. Pattern: `/en/<YYYY>-<YY>-season/<sub-path>` with ~15 consistent sub-paths per season (season-updates, the-<theme>-season landing, challenge-resources/{coaching,core-values,research,robot-design,robot-game,evaluation,season-documents,further-sources}, discover-resources, explore-resources, further-events-activities, international-tournaments). Seasons verified in sitemap: 2022-23 SUPERPOWERED, 2023-24 MASTERPIECE, 2024-25 SUBMERGED, 2025-26 UNEARTHED. Added a single "DACH season archives - per-season pattern" entry to `resources/fll-resource-map.md` documenting the structure (with the current-season URL as the entry's anchor); avoided adding 50+ per-season-per-resource entries that would bloat the resource map. Added two watchlist entries to `discovery-sources.json`: the current 2025-26 season-updates (active monthly newsletter) + the predicted 2026-27 BIOGLOW URL (verified: false until it appears, expected Aug 2026). When the next-season URL flips to 200, that's the cue to ingest the BIOGLOW season fully.
  Source: https://www.first-lego-league.org/en/2022-23-season/season-updates

## 2026-05-11

- Ingested FIRST Australia (regional partner): added 4 entries to `resources/fll-resource-map.md` Regional partners section - national hub, BIOGLOW 2026/27 season landing, Future Edition national rollout (covers AUD costs, May 25 registration, three-season transition table, hardware features), and the FLL Asia Pacific Open Championship national event. First Asia-Pacific entry in the resource map. Surfaced by the weekly discovery agent.
  Source: https://www.firstaustralia.org/first-lego-league-future-edition

## 2026-05-06

- Expanded `discovery-sources.json` and upgraded the `tlc-weekly-discovery-scan` Cowork task to do real discovery work. Catalog now has 18 verified entries (8 queries / 2 feeds / 8 watchlist pages) - was 12. New entries: FLL UNEARTHED Innovation Project query, FLL coach blog query, r/FIRSTRobotics Reddit RSS feed (Reddit exposes /.rss for any subreddit), HANDS on TECHNOLOGY news watchlist, LEGO Education partnership-update watchlist (high-signal - they promised more details), LEGO Education FLL hub watchlist, FIRST press room watchlist. Verified the FLL official YouTube channel ID (UCuGaG4GtEj82i3pByi_bM3A) so the YouTube feed flips from `verified: false` to `verified: true`. Dropped the DACH news entry from feeds (no RSS available) and re-added as a watchlist page. The scheduled task prompt now has Claude run actual web searches via WebSearch, fetch watchlist pages via WebFetch, dedupe against wiki citations, and open a single GitHub issue per week with candidate sources to triage - not just the no-op script.
- Reframed the Custom GPT positioning in `CUSTOM-GPT-SETUP.md` to comply with OpenAI's under-13 policy. ChatGPT flagged the GPT with "May contain content targeting users under 13 years of age" because the prior description and system prompt led with "for kids". Updated description to lead with parents, coaches, and teachers as the target audience; rewrote the system prompt's audience-awareness section to position kids as a recognized but secondary user (and to gently redirect kids to involve an adult for substantive actions). Wiki content itself unchanged - kid-friendly framing on the public website is fine; only the GPT positioning needed adjustment. Added an explanatory note at Step 3 of the setup doc so future maintainers don't reintroduce the issue.
- Ingested firstintexas.org (FIRST in Texas) at proper depth. Crawled the site nav (43 unique paths), read 6 substantive FLL-relevant pages, added 5 entries to `resources/fll-resource-map.md` Regional partners section: FIRST in Texas main, FLL in Texas, Texas FLL Team Resources & Advancement (covers the proportional advancement formula: Qualifier â Regional 1/3 â State Championship 15%), Texas Events Calendar, Texas Team Grants. Skipped gafirst.org from the same source batch - Squarespace robots.txt explicitly disallows ClaudeBot.
  Source: https://firstintexas.org
- Ingested IET (UK FIRST LEGO League partner) at proper depth, with caveats. The IET site (education.theiet.org) is JavaScript-rendered, so plain HTML scraping returns minimal body content. Link discovery worked (12 FLL-relevant paths found in static HTML), so added 3 entries based on URL semantics + general knowledge of what each page covers, with explicit "JS-rendered, visit directly" notes: IET FLL hub, IET "A new era for FIRST LEGO League" (UK on Future Edition), and IET UK FAQs. Three entries instead of the typical 5 - limited by the rendering issue rather than by the source's actual depth.
  Source: https://education.theiet.org/first-lego-league-programmes
- Ingested firstwa.org (FIRST Washington) at proper depth. Crawled the site nav (38 unique paths), read 5 substantive FLL-relevant pages, added 5 entries to `resources/fll-resource-map.md` Regional partners section: FIRST Washington main, FLL Challenge in Washington, FLL Explore in Washington, Washington Events Calendar, Washington Volunteer. Also updated the Regional partners section intro to flag the list is curated (non-exhaustive) and point at FIRST Find Local Support for the full directory.
  Source: https://firstwa.org
- Ingested education.lego.com FLL section at proper depth. Crawled the FLL-section navigation links, read 4 substantive sub-pages, added 5 new entries to `resources/fll-resource-map.md`: LEGO Education FLL hub, **FIRST and LEGO Education Partnership Update** (canonical statement: partnership ends after 2026-2027 season; LEGO Education will run a standalone 2027-2028 season), **Computer Science & AI platform** (new K-8 hardware basis for Future Edition + LEGO's solo offering), and product pages for **SPIKE Prime** and **SPIKE Essential** (both **retiring June 30, 2026** - major purchasing-decision context). Also lightly updated the existing LEGO Education portal entry to cross-reference the new entries.
  Source: https://education.lego.com/en-us/first-lego-league/
- Re-ingested firstinspires.org at proper depth (per updated ingest-source SKILL). Crawled the FLL-relevant sitemap, read 12 pages substantively, added 7 new entries to `resources/fll-resource-map.md`: FLL Get Started flow, UNEARTHED current season hub, Season Materials Library, Past Challenges archive (1998âpresent), FLL Technical Resources, Family Engagement Resources, Coaches & Mentors recruitment. Brings firstinspires.org-anchored entries from 4 to 11. The total resource map count grows from 13 to 20.
  Source: https://www.firstinspires.org
- Updated `skill/ingest-source/SKILL.md` to codify the deeper-crawl standard. Reframed Phase C from "smallest correct change" to "comprehensive coverage of every distinct resource the source offers". Documented typical yields (8-12 entries for major canonical sites, 3-5 for regional partners). Added "reading only the homepage and stopping" as a failure mode. Per-source commit pattern (one commit per source, not per entry) preserved for clean audit trail.

## 2026-05-05

- Followed up the firstinspires.org ingest with proper site traversal (sitemap â 15 FLL-relevant pages â read 5 highest-leverage). Added two NEW entries to `resources/fll-resource-map.md`: (1) **Cost & Registration** under "Official sources (canonical)" - the only place in the wiki with explicit FIRST cost info plus grant pointers; (2) **FIRST Find Local Support** under "Event finders" (renamed to "Event finders & local support") - the people-side of the local FIRST ecosystem (Program Delivery Organizations, Senior Mentors), distinct from RobotEvents which is tournament-focused.
  Source: https://www.firstinspires.org
- Refreshed the FIRST Inspires entry in `resources/fll-resource-map.md` based on a fresh read of firstinspires.org. Added explicit per-program age + grade ranges (FLL: Kâ8 / 5â16, FTC: 7â12 / 12â18, FRC: 9â12 / 14â18) so families can see at-a-glance which program fits their kid. Sharpened the "Use when" to mention the team-finder (a primary use case the prior entry buried). Added `team-finder` tag.
  Source: https://www.firstinspires.org
- Switched agent orchestration from GitHub Actions to Cowork scheduled tasks (running on the maintainer's host). Removed `.github/workflows/{discover-sources,freshness-check,freshness-semantic}.yml` - they were never pushed to origin and are now dead code under the new model. Added npm scripts `freshness:semantic` and `discover:sources` (the freshness-check script was already wired). Added `reports/` to `.gitignore` for local report output. Three Cowork scheduled tasks now own the cadences: weekly discovery (Mondays), monthly freshness lint (1st of month), quarterly semantic freshness (Jan/Apr/Jul/Oct 1st). Each task runs the npm script, opens a GitHub issue via `gh` CLI when findings exist, and never modifies wiki content.
- Built Phase 4 ceiling: `scripts/freshness-semantic.mjs` + `.github/workflows/freshness-semantic.yml`. For each cited URL the script fetches the live page and asks Claude (Haiku by default) whether the page still supports the wiki's claims; verdicts are consistent / minor_drift / significant_drift / page_unrecognizable. Workflow is manual-only (workflow_dispatch) since semantic checks cost API tokens. Requires `ANTHROPIC_API_KEY` repo secret; fails fast with a clear message if missing. Opens a single GitHub issue with the report when drift is detected.
- Built Phase 3 v1 Discovery agent: `scripts/discover-sources.mjs` + `.github/workflows/discover-sources.yml`. Reads `discovery-sources.json`, fetches catalogued RSS/Atom feeds, surfaces items from the last 30 days. Watchlist pages are listed for manual review (page-diff is v2). Web-search queries deferred to v2 (needs Anthropic web_search or external search API). Workflow runs weekly (Monday 09:00 UTC) plus on-demand; opens one summary issue per run. Issues only, never PRs - per ARCHITECTURE.md autonomy-discipline.
- Scaffolded Phase 3 (`discovery-sources.json` + `discovery-sources.schema.md`) - the curated catalog the future Discovery agent will read to find new sources. Three categories (queries, RSS feeds, watchlist pages) with shared fields for tags / frequency / verified / notes. Seeded with FLL-current and Future Edition queries, plus high-confidence watchlist pages (firstlegoleague.org, FIRST CANOPY, DACH partner Future Edition page, LEGO Education portal). Two RSS feeds are listed as `verified: false` pending URL confirmation.
- Added `.github/workflows/freshness-check.yml` - monthly cron (1st of each month, 08:00 UTC) plus on-demand workflow_dispatch. Runs `scripts/freshness-check.mjs`, uploads the report as a workflow artifact, and opens a single summary GitHub issue when actionable findings exist. Per the project's autonomy-discipline rule, opens issues only - never PRs.
- Added `scripts/freshness-check.mjs` - Phase 4 prep, the lint half of the Freshness agent in `ARCHITECTURE.md`. Walks `src/content/docs/`, extracts every external URL the wiki cites, and reports HTTP status, redirect chains, last-modified ages, and network errors as a markdown audit. Wired up as `npm run freshness:check`. No semantic comparison yet (that needs an LLM); this scaffolds the mechanical half so wiki rot is at least visible. Skips fenced code blocks and inline-code spans so example URLs don't leak in.
  Source: https://github.com/zhangqi444/the-little-creator (this repo)
- Rewrote `resources/software-tools.md` to the per-entry pattern. Dropped LEGO Mindstorms App as a primary listing (Mindstorms production ended 2022; SPIKE Prime is canonical for current Founders Edition). Added Pybricks as an alternative SPIKE firmware. Added a Future Edition section noting the new Computer Science & AI platform with details TBD. Demoted VEX content to a clearly-marked secondary section per BRD scope. Replaced bare productivity-tool list with a focused notebook/presentation/workflow paragraph (no per-entry blocks for generic tools).
  Source: https://www.firstinspires.org/first-canopy
- Touched up `getting-started/index.md`: added tags/audience/level frontmatter; rewrote the intro to acknowledge FLL's three age divisions (Discover, Explore, Challenge) and point to `what-is-fll.md` for the overview; added a regional-partner pointer for non-US families.
  Source: https://www.firstlegoleague.org
- Added a Founders/Future Edition disclaimer to `guides/season-planning.md`. The substantive month-by-month content remains intact; the page is explicitly scoped to the Founders Edition (SPIKE-based, applies through 2027/28), with a cross-link to the Future Edition transition entry. Updated frontmatter with `season: 2025` and a `founders-edition` tag for retrieval clarity.
  Source: https://www.firstinspires.org/first-canopy

## 2026-05-04

- Refreshed `getting-started/what-is-fll.md` to reflect current FLL state. Now covers all three divisions (Discover 4-6, Explore 6-10, Challenge 9-16) instead of conflating FLL with Challenge alone. Added a "What's changing: Future Edition" section anchored to the resource map entry. Cleaned up outdated framings (Mindstorms â SPIKE Prime as the canonical kit; explicit current-season disclaimer for honesty about uncertainty).
  Source: https://www.firstlegoleague.org
- Added Future Edition transition entry to `resources/fll-resource-map.md`. Documents the 2026/27 dual-edition rollout (Founders + Future), the FIRST CANOPY / BIOGLOW season naming, the new LEGO Education Computer Science & AI hardware platform, and the non-compatibility with SPIKE - material for purchasing decisions and team planning.
  Source: https://www.firstinspires.org/first-canopy

## 2026-05-03

- Added a Regional partners section to `resources/fll-resource-map.md` with the HANDS on TECHNOLOGY (DACH region: Germany, Austria, Switzerland) entry. First non-US entry in the resource map.
  Source: https://www.first-lego-league.org
- Established Phase 1 foundations: extended root `CLAUDE.md` with project schema (FLL focus, copyright stance, frontmatter schema, entry pattern, ingest workflow with budgets and politeness rules, branch hygiene). Added `AGENTS.md` as cross-tool shim. Added `src/content/docs/CLAUDE.md` with content authoring rules. Seeded this `log.md`.
- Wired the live Custom GPT URL into the homepage hero, README, and CUSTOM-GPT-SETUP.md (PR #7).
  Source: https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper
- Added alternative logo (`logo-v2.svg` and `logo-v2.jpg`) - three stacked LEGO-style blocks with a friendly robot face on top (PR #6).
- Added `generate:skill` npm script and `scripts/build-skill.mjs` validator. Wired into `prebuild` so CI catches malformed skill bundles (PR #5).

## 2026-05-02

- Added `BRD.md` and `ARCHITECTURE.md` design docs (PR #4). BRD captures problem, personas, outcomes, scope, success metrics. Architecture captures five-layer model, four agents, schema docs hierarchy, four-phase rollout.
- Added gstack team-mode (optional) section to `CLAUDE.md` via `gstack-team-init optional` (PR #4).
- Added PR-time CI workflow (`.github/workflows/pr-checks.yml`) and fixed pre-existing Starlight version mismatch (the committed config used 0.32+ array `social` syntax but `package.json` constrained to `^0.30.0`); bumped to `^0.34.0` and committed `package-lock.json` for reproducibility (PR #3).
- Expanded `guides/season-planning.md` from a high-level placeholder to a substantive month-by-month FLL plan with pre-season prep, parallel Innovation Project timeline, Core Values discipline, pit kit checklist, and common pitfalls (PR #3).
- Added `for-educators/core-values-rubric.md` - a working 1â4 rubric for the six FLL Core Values (Discovery, Innovation, Impact, Inclusion, Teamwork, Fun) with observable behaviors and coaching prompts per level (PR #3).
- Restructured `resources/` with the curated metadata pattern. Rewrote `resources/learning-materials.md` as canonical example (11 entries) and added `resources/fll-resource-map.md` with 9 curated FLL links covering official sources, event finders, independent resources, communities (PR #2).
- Added `for-educators/` section: `index.md`, `curriculum-starter.md` (8-week FLL onboarding for classroom/club), `lesson-plan-template.md` (PR #2).
- Re-anchored homepage and `getting-started/index.md` on FLL with VEX as a "next step" mention. Renamed Custom GPT scope to FLL Helper.
- Renamed project from "The Little Maker" to "The Little Creator" across 8 files (PR #2).
- Added `scripts/generate-llms-txt.mjs` - walks `src/content/docs/`, parses frontmatter and per-entry metadata, emits `public/llms.txt` (TOC), `public/llms-full.txt` (whole corpus), and per-section files (PR #2).
- Scaffolded Claude Skill bundle (`skill/`): `SKILL.md`, `templates/engineering-notebook-entry.md`, `examples/fll/line-follower.py`, `examples/vex/autonomous-base.cpp` (PR #2).
- 2026-05-17: Added `guides/registration-guide.md` - step-by-step FLL Challenge registration covering national FIRST Dashboard flow, state PDO lookup, Washington state specifics, cross-state registration note, and a checklist. Updated `CUSTOM-GPT-SETUP.md` system prompt: added regional sourcing rule (never mix regional partner dates across countries), registration questions pattern (two-layer flow + ask location first), and registration refusal pattern. Motivated by GPT conversation incorrectly citing DACH dates to a U.S./WA user.
- 2026-05-17: Added 8 new regional partner entries to `resources/fll-resource-map.md`: FIRST California Southern, FIRST NorCal, FIRST in Florida, FIRST in Michigan, FIRST Mid-Atlantic (NJ/PA/DE), FIRST in Upper Midwest (MN/ND/SD), ORTOP Oregon, and FIRST Robotics Canada. All URLs verified live. Added CA-split note (two PDOs). Updated intro text. Motivated by need for accurate regionâPDO mapping in GPT answers.
- 2026-05-17: Added `guides/registration-reference.md` - verified PDO registration URLs by region (WA, OR, TX, CA-S, CA-N, FL, MI, Mid-Atlantic, DACH, UK, Australia, Canada) with source confidence tags. Updated `CUSTOM-GPT-SETUP.md`: source confidence rule, registration pattern expanded with 9 PDO entries, new refusal patterns for unknown regions and fee/deadline citations.
- 2026-05-17: Refactored `CUSTOM-GPT-SETUP.md` answer style: sources are internal accuracy layer, not user-facing output. GPT now surfaces single actionable link per answer. Labeled hyperlinks with user-friendly anchor text (e.g., "Washington state's official FLL registration site" not bare URL or org name).
- 2026-05-17: Added `guides/division-eligibility.md` - age/grade eligibility for Discover (4â6), Explore (6â10), Challenge (9â14 US/Canada, 9â15 elsewhere); overlap zone for ages 9â10; age cutoff nuance; progression path. Updated system prompt with division eligibility pattern (collect age + region before recommending).
- 2026-05-18: Added `guides/team-funding.md` - PDO grants, FIRST national grants database, local sponsor strategy with pitch email template, low-effort fundraising options, budget tracking tips.
- 2026-05-18: Added `getting-started/glossary.md` - plain-language definitions for all FLL acronyms and terms (FIRST, FLL/FTC/FRC, PDO, YPP, GP, Coopertition, SPIKE Prime, Challenge Set, Future Edition, etc.). Quick-reference abbreviation table. Updated system prompt to route jargon questions to glossary.
- 2026-05-18: Added `guides/second-season.md` - 10 practical changes returning coaches make in year two: earlier start, narrowed robot strategy, letting kids lead, Core Values judging prep, mock judging sessions, cross-training all drivers, engineering notebook improvements, adult management, early registration, and perspective. Targets P3 (returning coach) persona from BRD.
- 2026-05-18: Updated `resources/index.md` and `guides/index.md` with all new wave-6/7/8 guides. Fixed missing parent-communication link in resources.
- 2026-05-18: Added `guides/finding-mentors.md` - where to find technical experts and subject-matter experts for FLL teams (IEEE/SWE/ACM, employer networks, local FRC teams, LinkedIn for IP experts). Added to guides/index.md and resources/index.md.
- 2026-05-18: Added `guides/future-edition-transition.md` - practical decision guide for Founders vs Future Edition (BIOGLOW 2026/27): two-track timeline, buy SPIKE Prime advice, LEGO Education partnership ending explained. Wired into CUSTOM-GPT-SETUP.md Future Edition routing pattern and what-is-fll.md cross-link.
- 2026-05-18: Added `guides/fll-awards.md` - plain-language guide to all FLL Challenge awards (Champion's, Robot Performance, Innovation Project, Robot Design, Core Values, Motivate, Engineering Excellence, Rising Star), advancement mechanics, and the Champion's Award vs. robot score myth. Added routing pattern to system prompt.
- 2026-05-18: Added `skill/examples/fll/sensors.py` - SPIKE Prime sensor examples: color detection (`drive_until_color`, `align_to_white_line`), distance sensor (`drive_until_distance`, `obstacle_present`), force sensor (`wait_for_press`, `drive_until_push`), combined example. Updated SKILL.md index.
- 2026-05-18: Added `guides/robot-troubleshooting.md` - practical fixes for robot drift, missed missions, attachment failures, tournament-day breakdowns, color sensor issues, and a 10-minute tournament-day fix checklist. Wired into system prompt and resources/index.md.
- 2026-05-18: Added `guides/first-four-weeks.md` - week-by-week action plan for brand-new coaches: week 1 (first meeting + open box), week 2 (hardware + first program), week 3 (explore missions), week 4 (divide robot/IP/CV tracks). Wired into system prompt (new-coach routing) and resources/index.md. Closes BRD P1 outcome "knows what to do in week 1."
- 2026-05-18: Added `guides/tournament-week-prep.md` - final two weeks before qualifier: robot freeze criteria, 5x mission drill, mock judging sessions, parent logistics message, packing list, day-before checklist, keeping the team calm, post-tournament guidance. Wired into system prompt and resources/index.md. Closes BRD P1 outcome "knows what to do in week 12."
- 2026-05-19: Added `guides/after-advancing.md` - preparing for regionals/state championship: what changes at the next level, 3-week prep plan (honest assessment â targeted fixes â stabilize), managing expectations with kids/parents/self. Wired into system prompt and resources/index.md.
- 2026-05-19: Added `guides/coaching-without-doing.md` - how parent-coaches stay in the guide role: question technique, handling dominant kids (rotating roles, ownership assignments), handling disengaged kids (diagnose cause), letting things fail, debrief habit. Wired into system prompt and resources/index.md.
- 2026-05-19: Added `guides/when-a-kid-wants-to-quit.md` - five root causes (not fun, skill gap, social exclusion, overwhelm, competition anxiety) with targeted responses; push vs let go framework; graceful exit guidance; note for parents on commitment vs wellbeing. Wired into system prompt and resources/index.md.
- 2026-05-19: Fixed `guides/forming-a-team.md` missing frontmatter fields (tags, audience, level, season).
- 2026-05-19: Added `guides/attachment-design.md` - SPIKE Prime attachment design: what attachments do, connection methods (two-point minimum, quick-connect patterns), mechanical principles (leverage, gear reduction, passive vs active), iteration mindset, failure modes table, field alignment tips, notebook documentation. Wired into system prompt and resources/index.md.
- 2026-05-19: Added `guides/ip-expert-interview.md` - how to prepare kids for expert interviews: research first, 6-10 specific questions (before/better examples), role assignments, sending questions in advance, following threads during the call, write-up within 24h, letting findings change the solution, scripted phrases for judging sessions. Wired into system prompt and resources/index.md.
- 2026-05-19: Added routing patterns for all 33 guides to `CUSTOM-GPT-SETUP.md` system prompt — 15 new patterns across three commits covering: judging prep, robot game strategy, equipment/gear, season planning, engineering notebook, Innovation Project process, Core Values/GP, robot programming beginners, tournament day logistics, team formation, drivetrain building, practice session structure, intermediate Python/gyro, robot maintenance, first tournament experience. All 33 guides now have at least one routing path; total patterns: 33.
- 2026-05-19: Added `skill/ingest-source/SKILL.md` — Phase 2 ingest workflow skill (ARCHITECTURE.md Phase 2). Provides a step-by-step checklist for adding a URL to the wiki: fetch and verify live, determine entry type (resource map / tools / learning materials / PDO), write full metadata entry using the per-entry schema, choose placement, commit format. Includes quality rules (no copyright copy, verify URL, no bare domains, authority levels) and special cases (PDO registration pages, DACH region caveat, stale content handling). Updated `skill/SKILL.md` index to list ingest-source as a sub-skill.
- 2026-05-19: Added `scripts/lint-frontmatter.mjs` and `lint:frontmatter` npm script — walks `src/content/docs/guides/` and `src/content/docs/for-educators/`, checks required frontmatter fields (title, description, tags, audience, level, season), exits 1 on violations. Note: wiring into `pr-checks.yml` skipped; PAT lacks workflow scope. Maintainer action needed: add `npm run lint:frontmatter` step to `pr-checks.yml` manually.
- 2026-05-23: Updated `astro.config.mjs` sidebar - expanded from 9 entries to full navigation covering all 34+ guides and pages added since initial scaffolding. Guides section now has collapsible sub-groups (Getting Started, Building & Programming, Competition Prep, Team Culture, Returning Coaches). Added VEX Resource Map, Progression Guide, Glossary, and all For Educators pages to sidebar.
- 2026-05-23: Updated `guides/index.md` - aligned section groupings with `astro.config.mjs` sidebar: moved `second-season` from "Getting started" to a new "Returning coaches" section; reordered guides within "Building and programming" and "Competition prep" to match sidebar order; moved `finding-mentors` from "Team culture" to "Getting started" to match sidebar placement.
- 2026-05-23: Updated `getting-started/what-is-fll.md` for BIOGLOW 2026-27 season transition — refreshed description and tags to include bioglow/canopy/season-2026-27; added `season: evergreen` frontmatter; updated active-season note to reflect 2025/26 wrapping up and BIOGLOW opening August 2026; renamed section to "Future Edition and BIOGLOW (2026/27)"; added season-change timing note covering June 8–15 Dashboard maintenance, July Storefront launch, September Game Set purchases; added Future Edition Transition guide link to "Where to go next".

### 2026-05-23 — Restored missing frontmatter on `skill/ingest-source/SKILL.md`

The `name:` + `description:` YAML frontmatter on `skill/ingest-source/SKILL.md` was lost in commit `66d919b` (May 19). `scripts/build-skill.mjs` had been erroring on every run since. Restored the frontmatter and broadened the description to mention all six in-scope programs (FLL, FTC, FRC, VEX IQ, V5, U) per the Phase 1 scope expansion. Skill bundle now validates cleanly.

### 2026-05-23 — VEX deep-ingest: REC Foundation, VEX U, grants, scholarships, KB pattern

Closing the thinnest-coverage gap left after the multi-program scope expansion. The existing vex-resource-map.md had 13 entries focused on VEX Robotics (the hardware company) and the IQ/V5 product lines — zero coverage of the REC Foundation (the org that actually runs the competitions), zero VEX U entries, and no mention of grants or scholarships despite >$110M of scholarship opportunity tracked by RECF.

Phase A — Discover: read recf.org/robots.txt + page-sitemap1.xml. Sitemap enumerates ~70 pages spanning RECF programs (VIQRC, V5RC, VURC, VAIRC, ADC), the Worlds championship, grants/scholarships, Girl Powered, RECF Trainings.

Phase B — Read: fetched RECF homepage navigation, VEX U Robotics Competition page (200+ teams; based on V5 with relaxed build restrictions; current season Push Back transitioning to Override 2026-27), Grants page (matches schools with sponsor resources), Scholarships page ($110M+ across 100+ universities). Noted the per-program KB subdomain pattern: `<program>-kb.recf.org/hc/en-us` across 7+ programs.

Phase C — Synthesize: added 12 new entries grouped into three new sections in vex-resource-map.md:
- REC Foundation & competition infrastructure (4): RECF homepage, REC Library KB pattern (meta-entry per pattern-aware ingest rule), New to Robotics landing, RECF Trainings
- VEX U & advanced programs (3): VURC, VAIRC, ADC (RECF-adjacent)
- Funding & student opportunities (3): Team Grants, Scholarships, Girl Powered
- Major events (2): VEX Robotics World Championship, RECF Signature Events

Phase D — Record: pattern-aware ingest applied — the KB pattern gets ONE meta-entry (not 7 per-program entries) and is registered in `discovery-sources.json` as a templated source so future RECF KB additions auto-surface. Also registered the VEX Worlds annual page in the discovery watchlist.

vex-resource-map.md: 13 → 25 entries. discovery-sources.json watchlist: 25 → 27 entries.

### 2026-05-23 — Guide audit: relabel FLL-only guides with generic titles

After the multi-program scope expansion, an audit of /guides/* found four guides whose generic titles overstated their scope. Renamed three to be FLL-prefixed (file paths kept stable to avoid breaking 24 internal links) and added a "Program scope" callout pointing to FTC/FRC/VEX equivalents (or to resource maps as a stop-gap until per-program guides exist):

- `first-tournament-expectations.md` → "Your First FLL Tournament — What to Expect"
- `tournament-day-checklist.md` → "FLL Tournament Day Checklist"
- `robot-programming-basics.md` → "FLL Robot Programming Basics (SPIKE Prime)"

The fourth was `forming-a-team.md` — kept the generic title because the guide IS cross-program, but expanded it from 3 programs (FLL/VEX IQ/VEX V5) to all 6: added FLL Discover/Explore + FTC + FRC + VEX U to the team-size table, broadened the "where to find teammates" guidance, and expanded the roles table with sub-team patterns common in FTC/FRC.

Sidebar labels in `astro.config.mjs` updated to match the new titles.

Out of the remaining guides:
- 15 are already FLL-prefixed (season-planning, equipment-guide, etc.) — correctly labeled, no change.
- 3 are multi-platform and say so in the title (drivetrain-basics "for FLL and VEX IQ", practice-session-structure, robot-maintenance) — correctly labeled, no change.
- 7 are universally applicable (when-a-kid-wants-to-quit, gracious-professionalism, coaching-without-doing, etc.) — content is broad enough; left tags alone.
- 1 is correctly VEX-prefixed (vex-iq-programming) — no change.

No dedicated FTC, FRC, or VEX first-tournament guides exist yet — those are on the backlog.

### 2026-05-23 — FTC + FRC deep-ingest: vendors and community resources

Brought the FTC and FRC resource maps from the original "FIRST Inspires sub-pages only" 7-entry baseline closer to FLL/VEX parity by adding the dominant hardware vendors and the canonical community references for each program.

**FTC additions (7 → 14 entries):**
- Hardware vendors: REV Robotics (FTC Control System + DUO mechanical), goBILDA (modular metric system + 25% FTC team discount), TETRIX (classroom-friendly alternative)
- Community: Game Manual 0 (gm0.org — the comprehensive community-written FTC handbook, treated as canonical companion to ftc-docs), Chief Delphi FTC sub-forums, r/FTC

**FRC additions (7 → 15 entries):**
- New section "WPILib documentation — long-form reference" splitting out docs.wpilib.org from the marketing site
- Hardware vendors: REV Robotics ION (FRC product line, distinct from FTC DUO), CTRE Phoenix ecosystem (Kraken / Talon FX / Phoenix 6), AndyMark (long-time mechanical), FIRST Choice voucher store
- Community: The Blue Alliance (canonical match/team data + API), Statbotics (predictive Elo analytics), Chief Delphi, r/FRC

Discovery sources: +3 watchlist entries — gm0.org (high-signal FTC community docs), ftc-docs.firstinspires.org (official SDK docs, weekly poll during season), thebluealliance.com/blog (TBA site changes). Total watchlist now 30.

Phase A budget notes: Chief Delphi robots.txt explicitly disallows ClaudeBot for ai-train (Cloudflare-managed). Wrote that entry from prior public knowledge without fetching. REV and goBILDA both allow the ingest UA with crawl-delay 10. gm0.org is open. The Blue Alliance was not fetched — entry written from prior public knowledge.

Phase C/D: All entries followed the per-entry metadata schema (URL/Authority/Audience/Level/Tags/Use when + description). Lint check: 0 verbatim runs >50 words, 0 schema failures across the now-122-entry corpus.

### 2026-05-23 — New page: What is VEX U?

The existing `what-is-vex.md` had VEX U as one row in a table; `progression-guide.md` had it as one bullet. Both undersold what's actually a continuing-engagement program with 200+ teams worldwide and a real transition story from V5 alumni.

Added `/getting-started/what-is-vex-u/` covering:
- Who VEX U is for (currently-enrolled university students; no dual-enrollment shortcut)
- How VEX U differs from V5RC (loosened build restrictions, custom electronics allowed, two robots per team rather than per alliance)
- The three common formation pathways (V5RC alumni continuing, new university programs, capstone project courses)
- First steps for a new VEX U team (eligibility check, RobotEvents registration, VURC game manual addendum, VURC knowledge base, dual-robot budget, scholarship eligibility)
- VEX U vs. FRC (FRC is collegiate-outreach; VEX U is direct competition — they coexist)
- VEX U vs. VAIRC (autonomous-only sibling program)

Sidebar wired (under Getting Started, between What is VEX? and Progression Guide). Cross-links added in what-is-vex.md and progression-guide.md so the new page is discoverable from both natural entry points.

Wiki page count: 61 → 62.

### 2026-05-23 — Community OSS libraries + VEX U first-team guide + GPT setup refresh

**Open-source community libraries.** Added an "Open-source community libraries" section to both ftc-resource-map.md (+4 entries) and frc-resource-map.md (+6 entries) covering the libraries most-cited by competitive teams:

- FTC: RoadRunner (autonomous motion library, canonical), FTCLib (command-based programming pattern adapted from WPILib), EasyOpenCV (vision pipeline simplification), FTC Dashboard (live tuning and telemetry).
- FRC: PathPlanner (autonomous path planning, near-universal in modern FRC), Choreo (time-optimal trajectory generation), PhotonVision (coprocessor vision pipeline), AdvantageKit (deterministic match logging + replay, from team 6328), AdvantageScope (match-data visualization), YAGSL (generic swerve drivetrain library).

None of these were fetched directly — wiki entries written from prior public knowledge with each library's canonical URL cited. All are open-source on GitHub; descriptions cover what the library solves and when a team should adopt it.

**VEX U first-team guide.** New `/guides/vex-u-first-team/` parallel in structure to the FLL `first-four-weeks.md` but adapted for the university context: emphasis on faculty mentor + storage + dual-robot budget as week-0 preconditions, then a four-week build-out (register on RobotEvents → hardware order + meeting rhythm → strategy session + basic build → design review + semester plan). Includes a "what NOT to do" callout per week (don't commit hardware before reading the game, don't lock a final design in month one). Wired into sidebar and cross-linked from `what-is-vex-u.md`.

**CUSTOM-GPT-SETUP.md refresh.** Updated the "coverage depth varies" paragraph to reflect current state — FTC/FRC/VEX each at 15-25 curated entries now (was "starter coverage that is growing"). Specific vendor and library examples added so the GPT can frame its capabilities accurately.

Wiki: 62 → 63 pages, 143 → 153 curated entries.

### 2026-05-23 — Per-program tournament + awards + judging-doc guides (8 new pages)

Closes the explicit backlog flagged in the guide audit ("dedicated FTC/FRC/VEX first-tournament guides are on the backlog") and the highest-value gap identified afterward (FTC/FRC equivalents to FLL's notebook-guide.md). Eight new pages added under /guides/:

**Tournament guides (3):**
- `first-ftc-tournament.md` — single-day format, judging interview structure, alliance selection, inspection, FLL→FTC comparison table, FTC-specific packing additions
- `first-frc-tournament.md` — 3-day regional vs. district format, scouting as a role, pit life dynamics, alliance selection drama, costs, FLL→FRC comparison table
- `first-vex-tournament.md` — covers VIQRC/V5RC/VURC together (one structure, program-specific differences flagged); explains the Skills Challenge as VEX's unique parallel competition

**Awards guides (3):**
- `ftc-awards.md` — Inspire as the headline, plus Think / Innovate / Connect / Motivate / Control / Design / Compass / Promote / Winning Alliance / Dean's List; what each measures; rookie targets
- `frc-awards.md` — Impact (formerly Chairman's) as the headline, plus Engineering Inspiration / Rookie All Star / Industrial Design / Excellence in Engineering / Innovation in Control / Quality / Safety / Woodie Flowers / Dean's List; advancement matrix
- `vex-awards.md` — Excellence as the headline; Design / Build / Amaze / Think / Innovate / Sportsmanship / Robot Skills Champion / Tournament Champion; consistent across VIQRC / V5RC / VURC with program-specific notes

**Judging documents (2):**
- `ftc-engineering-portfolio.md` — explains the Portfolio vs. notebook distinction (most common rookie confusion), the design-iteration block pattern that wins Think Awards, season timeline, common mistakes
- `frc-impact-submission.md` — covers the essay (10,000 char limit), 3-minute video, judged interview; emphasises Impact is a multi-year project; year-by-year build-out plan for rookies

**Cross-linking:**
- Sidebar wired (all 8 grouped under Competition Prep alongside FLL counterparts)
- "Program scope" callouts in first-tournament-expectations.md and tournament-day-checklist.md updated from "on the backlog" to direct links to the new program-equivalents
- New pages cross-link back to their FLL counterparts and to their resource maps

Wiki: 63 → 71 pages. Aggregate now spans all six programs with roughly parallel coverage for tournament experience, awards, and judging documentation.

### 2026-05-23 — GPT setup doc refresh — reflect all session additions

CUSTOM-GPT-SETUP.md had several stale FLL-only framings that the earlier mid-session touch-up missed:
- Top line described the GPT as "for FIRST LEGO League questions"
- Scope note positioned the assistant as "primarily an FLL helper"
- Patterns-by-type section had a "VEX questions: answer briefly... main focus is FLL" entry — directly contradicting the now-substantial VEX coverage
- Off-topic refusal still said "I'm focused on FIRST LEGO League"
- Live-URL link said "FLL Helper" though the GPT's been renamed

Fixed all of the above. Replaced the stale VEX paragraph + added 8 new Patterns-by-type entries for the tournament/awards/judging guides shipped in commit 50225c5:
- FTC tournament-day, FRC tournament-day, VEX tournament-day
- FTC awards + Engineering Portfolio
- FRC awards + Impact submission
- VEX awards
- VEX U-specific questions

Updated conversation starter #3 from FLL-specific to program-parameterised.

Regenerated knowledge files — public/llms/ now reflects all 71 wiki pages and 153 curated entries. Sizes: llms-guides.txt 321 KB (was 261 KB before the 8 new guides), llms-resources.txt 120 KB, llms-getting-started.txt 45 KB. All under ChatGPT's per-file limits.

### 2026-05-23 — GPT renamed to 'The Little Creator — Youth Robotics Wiki'

The earlier 'Robotics Helper' name was functional but bland. 'Youth Robotics Wiki' sets more accurate expectations: it's a knowledge-base-backed assistant, not a free-roaming AI that might hallucinate.

Updated three places in CUSTOM-GPT-SETUP.md to match:
- Name field
- Description: changed 'AI helper... Backed by a community knowledge base' to 'wiki-backed assistant... Answers from a community knowledge base' — reinforces the grounded-retrieval framing
- System prompt opening line: 'You are The Little Creator — a community-maintained wiki on youth competitive robotics, available in chat form... Answer from the uploaded knowledge files; be explicit when something is outside what the wiki covers.' (Replaces the previous 'You are The Little Creator's robotics helper.')
- Live-URL link label updated to match

The ChatGPT URL slug stays as `the-little-creator-fll-helper` from the original creation — ChatGPT doesn't rename URLs when GPTs are renamed.

### 2026-05-26 — Fix GPT under-13 classifier trigger — strict adult-facing framing

OpenAI's classifier flagged the GPT with "May contain content targeting users under 13 years of age" — the same failure mode CUSTOM-GPT-SETUP.md warned about. Even though our content covers programs that include under-13 children (FLL Discover 4-6, Explore 6-10, IQ 8+), the GPT itself must be positioned for the adults around them per ChatGPT's 13+ terms of service.

Scrubbed every visible-to-classifier surface and tightened the system prompt:

**Renamed** to `The Little Creator — Robotics for Parents & Coaches` (was `Youth Robotics Wiki`). Names the adult audience explicitly.

**Description rewrite** — adults as the subject:
- Was: "A wiki-backed assistant for parents, coaches, and teachers supporting kids in youth competitive robotics..."
- Now: "A wiki-backed assistant for the parents, coaches, and teachers behind youth robotics teams... for the adults running teams."

**Conversation starters** — removed every "my kid" / "my child" reference (these are visible to the classifier):
- #1: "team-member age range, first season as a coach or parent?" (was "my kid's age, first season?")
- #2: "Helping a [age]-year-old find a robotics program — which should we look at first?" (was "My kid is [age] —")
- #3: "...as a coach or parent?" appended
- #4: "Our team's robot" (was "My robot")

**System prompt scrub** — removed clauses that anticipated child users:
- Audience-awareness section: "ChatGPT requires its users to be 13 or older, so the people typing to you are adults — write for them directly. The young people they're supporting are subjects you discuss, not interlocutors you address."
- Removed the "If a kid uses the chat directly, respond with simpler vocabulary" instruction
- Tone section: "Treat users as intelligent adults — they are parents, coaches, teachers, and mentors, not the young people on their teams." (replaced the "If a child is using the chat" clause)
- Behavior rules: "Professional and clean tone always" (was "Family-friendly always... kids may read alongside their parents")
- Test checklist: "Tone is professional and clean" (was "Tone is family-friendly")

The CUSTOM-GPT-SETUP.md warning callout at the top of Step 3 already documented this failure mode; we just hadn't fully followed our own guidance. Now we do.

Kept untouched: quoted-user-question examples in Patterns-by-type section ("my kid wants to quit", "my child is nervous about the tournament"). Those are authentic phrases adults actually type when asking the GPT for help, and the GPT needs to recognize them. They're internal to the system prompt (not surfaced to the classifier) and describe the adult user's situation, not the GPT's audience.

### 2026-05-26 — Fix: discovery-scan agent orphans changes on .git/index.lock conflict

The autonomous discovery agent edited fll-resource-map.md on 2026-05-25 16:14 (added two new entries: the FIRST community blog 'A New Era for FLL' announcement + the BIOGLOW season landing) but never committed. Found the changes sitting in the working tree three days later when the interactive session ran `git status`.

Root cause: the discovery agent's SKILL prompt runs `git add` + `git commit` directly with no retry logic. When the maintainer is in an interactive cowork session simultaneously, both processes contend for `.git/index.lock`. Git's index lock can only be held by one process at a time — the loser fails with `fatal: Unable to create '.git/index.lock'`. Without a retry, the agent's work gets orphaned.

Fix (in `/Users/zhangqi/Documents/Claude/Scheduled/tlc-weekly-discovery-scan/SKILL.md`):
- Step 4g now wraps the commit + push in a 3-attempt retry loop with 30s / 60s / 120s backoff. Covers the common case where another git process holds the lock briefly.
- New Step 4i: if all retries fail, the agent leaves edits in place (no stash/checkout) and appends a loud `## ORPHAN:` entry to `progress/heartbeat-log.md` so the next interactive session sees the orphan immediately.
- Step 6 (report-back) now surfaces orphan count alongside committed and deferred.
- Step 1 (pre-flight) now describes the dirty-tree case as "most likely an orphaned prior-run edit" and explicitly tells the agent NOT to attempt to commit prior-run orphans automatically — surface them and abort.

Architecture documented: ARCHITECTURE.md §5 now has a "Concurrency seam (added 2026-05-26)" paragraph explaining that the direct-to-main autonomy model assumes exclusive .git/index access which isn't true under concurrent cowork sessions. Notes a future improvement (agent runs in `git worktree`) but ships the retry+heartbeat pattern as the cheap interim fix.

The recovered orphan entries were committed manually in db807a5.

## 2026-05-31

- `resources/frc-resource-map.md` — link audit (Wave 11 task). Fixed 5 broken/redirected URLs:
  - Choreo: `sleipnirgroup.github.io/Choreo/` → `choreo.autos/` (site migrated)
  - AdvantageKit: `docs.advantagescope.org/.../log-with-advantagekit/` (404) → `docs.advantagekit.org/` (AdvantageKit now has its own docs site)
  - YAGSL: `github.com/BroncBotz3481/YAGSL` → `github.com/Yet-Another-Software-Suite/YAGSL` (repo transferred to new org)
  - CTRE vendor: `www.ctr-electronics.com/` → `store.ctr-electronics.com/` (canonical redirect target)
  - CTRE docs inline link: `pro.docs.ctr-electronics.com` → `v6.docs.ctr-electronics.com/en/stable/` (renamed)
  - AndyMark: `www.andymark.com/` → `andymark.com/` (canonical redirect target)
  All other links (firstinspires.org, wpilib.org, docs.wpilib.org, revrobotics.com, firstchoicebyandymark.com, thebluealliance.com, statbotics.io, chiefdelphi.com, pathplanner.dev, photonvision.org, docs.advantagescope.org, docs.revrobotics.com/docs/ion) return 200.
- `resources/ftc-resource-map.md` — link audit (Wave 11 task). Fixed 2 broken/redirected URLs:
  - TETRIX: `tetrixrobotics.com/ftc` → `www.pitsco.com/collections/tetrix-robotics` (domain defunct — TLS cert mismatch; brand moved to Pitsco Education storefront)
  - Chief Delphi FTC: `chiefdelphi.com/c/ftc/30` → `chiefdelphi.com/c/technical/programming/30` (forum category reorganized; old path 301-redirects to new)
  All other links (firstinspires.org ×5, github.com/FIRST-Tech-Challenge, ftc-docs.firstinspires.org, revrobotics.com, docs.revrobotics.com/docs/duo, gobilda.com/ftc, gm0.org, reddit.com/r/FTC, rr.brott.dev, docs.ftclib.org/ftclib, github.com/OpenFTC/EasyOpenCV, acmerobotics.github.io/ftc-dashboard) return 200.
- `guides/ftc-programming-basics.md` — new guide (Wave 14 task). FTC SDK programming intro for rookie teams: three entry points (FTC Blocks, OnBot Java, Android Studio), mecanum TeleOp example, encoder-based Autonomous example, hardware map explainer, telemetry tips, common mistakes table, and pointers to Road Runner / FTCLib / EasyOpenCV / FTC Dashboard. Linked from `resources/index.md` (Building and programming) and `guides/index.md`.
- `guides/frc-programming-basics.md` — new guide (Wave 14 task). WPILib programming intro for rookie FRC teams: Java language overview, WPILib VS Code setup, TimedRobot vs Command-based framework comparison, arcade-drive TeleOp example (Spark MAX / DifferentialDrive), encoder-based Autonomous example, Shuffleboard telemetry, CAN bus overview, common mistakes table, and pointers to PathPlanner / Limelight / Phoenix 6 / AdvantageKit. Linked from `guides/index.md`.

- `for-educators/ftc-curriculum-starter.md` — new guide (Wave 14 task). 8-week FTC onboarding curriculum for classroom/club: week-by-week outline from hardware tour through scrimmage, covering REV Control Hub orientation, FTC Blocks, mecanum TeleOp, encoder-based Autonomous, sensor integration, engineering notebook intro, and team reflection. Includes adapting notes for older students, mixed skill levels, and tank-drive teams. Linked from `for-educators/index.md`.

- `discovery-sources.json` — Wave 14 remaining task. Added 4 new watchlist entries for FTC/FRC BIOBUZZ/BIOCORE 2026-27 season content detection: (1) FIRST BIOBUZZ season landing at /first-biobuzz (pattern-predicted, verified:false, expected Sept 12 2026); (2) FTC Team Updates page at /programs/ftc/team-updates (pattern-predicted, expected post-BIOBUZZ reveal); (3) FIRST BIOCORE season landing at /first-biocore (pattern-predicted, verified:false, expected Jan 9 2027 Kickoff); (4) Chief Delphi FRC community forum (verified:true, monthly poll, high-signal during FRC build season Jan–Apr and for BIOCORE Kickoff threads in Jan 2027). All follow the same pattern-predicted convention used by FLL BIOGLOW entries.

- `guides/vex-v5-programming-basics.md` — new guide (Wave 15 task). VEX V5 / VRC programming intro for rookie teams: V5 Brain overview, VEXcode Blocks vs. VEXcode Pro V5 C++ vs. PROS comparison, first TeleOp in C++ (tank drive), motor cartridge/speed table, smartdrive API for autonomous, Competition template (autonomous + drivercontrol callbacks), inertial sensor, motor encoder, rotation sensor, distance sensor, common drivetrain configurations (tank/X-holonomic/H-drive), autonomous strategy tips, PROS overview, common mistakes table, learning resources. Added to `astro.config.mjs` sidebar (Building & Programming section, after VEX IQ). FTC Programming Basics and FRC Programming Basics also added to sidebar and guides/index.md (were missing from sidebar since Wave 14).

- `resources/vex-iq-resource-map.md` — new resource page (Wave 15 task). VEX IQ-specific curated resource map: program home, VIQRC current game page, VIQRC Knowledge Base (RECF), RobotEvents event finder, VEXcode IQ programming environment, VEX IQ curriculum hub, VEX IQ forums, VEX V5 IQ Brain docs, YouTube community channels (VEX IQ Spin Up, NitroForce), VEX IQ subreddit. Follows same per-entry pattern as fll-resource-map.md.

## 2026-05-31 (session 2)

- `getting-started/what-is-vex.md` — review and update (Wave 15 task). Added proper frontmatter (tags, audience, level, season), current season callout (Push Back 2025-26 / Override 2026-27), expanded VEX Programs table with grade/competition columns, Competition section (Skills Challenge explained, RobotEvents, World Championship), new Awards section linking to /guides/vex-awards/, expanded Programming section with per-program breakdowns (IQ and V5) linking to /guides/vex-iq-programming/ and /guides/vex-v5-programming-basics/, Key Differences from FLL expanded with 5 points, Resources section cross-linking all wave 10-15 VEX guides and resource maps.

## 2026-05-31 (session 3)

- `for-educators/frc-curriculum-starter.md` — new guide (Wave 16 task). 8-week FRC onboarding curriculum for classroom/club: week-by-week outline from hardware tour through scrimmage, covering roboRIO/PDH/CAN bus orientation, WPILib VS Code setup, TimedRobot TeleOp, Command-based Subsystem/Command pattern, encoder-based distance driving, NavX/Pigeon gyro for heading correction, Autonomous with SequentialCommandGroup, and a full practice match scrimmage. Includes adapting notes for students with Java experience, no hardware (simulation), large teams, and mixed grade levels. Links to FRC Programming Basics, FRC Awards, FRC Impact Submission, and First FRC Tournament.
- `for-educators/index.md` — added FRC Curriculum Starter link; renamed "Curriculum Starter" to "FLL Curriculum Starter" for clarity alongside FTC and FRC entries.
- `astro.config.mjs` sidebar — For Educators section updated: "Curriculum Starter" renamed to "FLL Curriculum Starter"; FTC Curriculum Starter (was missing) and FRC Curriculum Starter added.

## 2026-05-31 (session 4)

- `for-educators/vex-iq-curriculum-starter.md` — new guide (Wave 17 task). 8-week VEX IQ onboarding curriculum for classroom/club: week-by-week outline from hardware tour through mini-tournament, covering VEX IQ Brain/Smart Motor orientation, VEXcode IQ Blocks (drivetrain config, sensor use, events/loops), Autonomous Coding Skills sequence, and Teamwork Challenge format. Includes adapting notes for younger students (ages 8–10), single shared robot, prior Scratch experience, and condensed library/workshop track. Links to VEX IQ Programming Guide, VEX IQ Resource Map, First VEX Tournament, Drivetrain Basics, Lesson Plan Template, and Differentiation Guide.
- `for-educators/index.md` — added VEX IQ Curriculum Starter link.
- `astro.config.mjs` sidebar — For Educators section: added VEX IQ Curriculum Starter after FRC Curriculum Starter.

## 2026-05-31 (session 5)

- `for-educators/vex-v5-curriculum-starter.md` — new guide (Wave 18 task). 8-week VEX V5/VRC onboarding curriculum for classroom/club: week-by-week outline from hardware tour through practice match, covering V5 Brain/Smart Motor/Controller orientation, VEXcode Pro V5 Blocks to C++ transition, C++ fundamentals (variables/loops/functions), TeleOp arcade drive with joystick input, motor encoders/Inertial/Distance sensor use, Autonomous mission design and reliability, optional PROS/OkapiLib introduction, and mini-tournament with engineering notebook. Includes adapting notes for 60-minute sessions, students with prior coding experience, single shared robot, mixed skill levels, condensed workshop format, and VEX IQ alumni fast-track. Links to VEX V5 Programming Basics, VEX IQ Curriculum Starter, VEX IQ Resource Map, VEX Awards, First VEX Tournament, Drivetrain Basics, Lesson Plan Template, and Differentiation Guide.
- `for-educators/index.md` — added VEX V5/VRC Curriculum Starter link.
- `astro.config.mjs` sidebar — For Educators section: added VEX V5/VRC Curriculum Starter after VEX IQ Curriculum Starter.

## 2026-05-31 (session 6)

- `guides/vex-iq-tournament.md` — new guide (Wave 18/19 task). Detailed VIQRC-specific tournament guide covering: collaborative alliance format (both teams score together, not against each other), VIQRC vs V5RC comparison table, full-day schedule, Teamwork Challenge match structure (autonomous period → driver control, alliance scoring not individual), Skills Challenge deep-dive (Driver Skills vs Autonomous Coding Skills, combined rank as advancement pathway), inspection checklist (sizing box, 3D-printed parts rules, firmware), pit setup for younger students (battery management, tools, team banner), judging categories in depth (Excellence, Design, Build, Think, Sportsmanship awards), managing the day schedule (role assignments, buffer time), common first-year mistakes, post-event debrief questions. Audience: families, parents, coaches, kids ages 8-14.
- `astro.config.mjs` sidebar — Competition Prep section: added VEX IQ Tournament Guide after Your First VEX Tournament.
- `guides/index.md` — added VEX IQ Tournament Guide entry in Competition Prep section.

## 2026-05-31 (heartbeat 17:58 UTC)
- Added `guides/vex-v5-tournament.md` — V5RC tournament guide for coaches and teen teams: competitive alliance format, autonomous bonus strategy, scouting, alliance selection, pit setup, engineering notebook depth, emotional coaching, awards table. Commit 49c1f8b.
- Updated `astro.config.mjs` sidebar and `guides/index.md` with new guide link.

## 2026-05-31 (heartbeat 19:01 UTC)
- Added `for-educators/assessment-guide.md` — comprehensive assessment guide for all six programs. Commit 0ed5379.
- Updated `for-educators/index.md` and `astro.config.mjs` sidebar with new guide link.

## 2026-05-31 (heartbeat 19:58 UTC)
- Added `resources/vex-v5-resource-map.md` — dedicated VEX V5/VRC resource map covering hardware overview, V5RC current game, V5RC KB, RobotEvents, VEXcode Pro V5, Python API, VEX Education, RECF grants/trainings/Girl Powered, PROS, LemLib, VEX Forum, VRC subreddit, VRC Discord, YouTube channels (1010W, RECF). Wave 20 task.
- Updated `astro.config.mjs` sidebar to add VEX IQ Resource Map and VEX V5/VRC Resource Map entries (VEX IQ map was created in Wave 15 but never wired into sidebar).
- Updated `resources/index.md` to list VEX IQ and VEX V5/VRC resource maps alongside existing VEX Resource Map entry.
- Marked `for-educators/assessment-guide.md` done in progress/roadmap.md (was completed in commit 0ed5379 but roadmap not updated at the time).

## 2026-05-31 (heartbeat 20:58 UTC)
- Added `getting-started/what-is-vex-iq.md` — dedicated VEX IQ getting-started page (Wave 20 task). Covers: who VEX IQ is for, comparison table vs FLL Challenge and VEX V5, season timeline (Push Back 2025-26 / Override 2026-27), alliance (Teamwork) match format including the cooperative structure unique to IQ, Skills Challenge (Driver + Autonomous Coding), awards breakdown, programming options (Blocks/Python/C++), what you need to get started, key differences from FLL, and full resources section linking to VEX IQ Resource Map, guides, curriculum. Follows the pattern of what-is-ftc.md and what-is-vex-u.md.
- Updated `astro.config.mjs` sidebar — added "What is VEX IQ?" entry in Getting Started section between "What is VEX?" and "What is VEX U?".
- Updated `getting-started/index.md` — added "What is VEX IQ?" link in the program list.

## 2026-05-31 (heartbeat 21:58 UTC)
- Added `getting-started/what-is-vex-v5.md` — dedicated VEX V5/VRC getting-started page (Wave 20 final task). Covers: who VEX V5 is for, comparison table vs VEX IQ/FTC/VEX U, season timeline (Push Back 2025-26 / Override 2026-27), head-to-head alliance match format (autonomous + driver periods), Skills Challenge (Driver + Autonomous Coding), awards breakdown including Excellence Award notebook requirement, programming options (VEXcode Blocks/VEXcode Pro V5 C++/PROS), what you need to get started, key differences from VEX IQ, key differences from FTC, and full resources section. Follows the pattern of what-is-vex-iq.md.
- Updated `astro.config.mjs` sidebar — added "What is VEX V5 / VRC?" entry between "What is VEX IQ?" and "What is VEX U?".
- Updated `getting-started/index.md` — added "What is VEX V5 / VRC?" link in the program list.

## 2026-05-31 (heartbeat 22:58 UTC)
- Added `resources/vex-u-resource-map.md` — dedicated VEX U/VURC resource map completing six-program resource coverage. Covers: RECF VURC program page, VURC knowledge base, V5RC current game page (shared game + addendum), RobotEvents (VURC filter), VEX V5 hardware platform, RECF program operator, RECF scholarships (>$110M), RECF trainings for faculty advisors, VEX Robotics World Championship VEX U division, VEXcode Pro V5, PROS (open-source C++ RTOS), OkapiLib, LemLib, VEX Python API, VEX Forum VEX U section, r/vexu subreddit, VEX Forum PROS section, RECF Signature Events, RECF Event Partners. Wave 21 task.
- Updated `astro.config.mjs` sidebar to add VEX U Resource Map entry between VEX V5/VRC and VEX Resource Map.
- Updated `resources/index.md` to list VEX U Resource Map alongside other per-program resource maps.


## 2026-05-31 (heartbeat 23:58 UTC)

- `getting-started/index.md` — Wave 22 update. Updated frontmatter description to reflect all six programs (was FLL-only). Updated intro paragraph to list each VEX program individually with dedicated links (was a single grouped link). Added `What is VEX U?` as a separate entry in the "Start here" section (was missing; VEX IQ and VEX V5 were added in Waves 20 but VEX U was not added). Added VEX V5 → VEX U progression step in the "Looking beyond" section. Updated frontmatter tags and audience to reflect all-program scope.

## 2026-06-01

- Added `skill/examples/frc/teleop-tank.java` — TimedRobot tank drive example for FRC WPILib skill bundle
- Added `skill/examples/frc/autonomous-command.java` — Command-based SequentialCommandGroup example for FRC WPILib skill bundle
- Updated `skill/SKILL.md` — documented new examples/frc/ section (Wave 25)

## 2026-06-01

- `resources/software-tools.md` — Wave 28 expansion. Updated page to cover all six programs (was FLL-primary with VEX secondary; FTC and FRC toolchains were missing entirely). Added: FTC section (FTC Blocks, OnBot Java, Android Studio, FTC SDK on GitHub), FRC section (WPILib Suite, WPILib Docs, FRC Driver Station, PathPlanner), dedicated VEX IQ and VEX U sections, VEX Python API entry, Autodesk Fusion 360, Shuffleboard/Glass FRC dashboards. Updated frontmatter description, tags, and audience to reflect all-program scope. Added program jump-links at top of page. Wave 28 task.

## 2026-06-01

- `resources/learning-materials.md` — Wave 29 expansion. Updated page to cover all six programs (was FLL/VEX-focused; FTC and FRC learning resources were entirely absent). Added: FTC section (FTC SDK Docs, FTC SDK on GitHub, Game Manual 0, REV Hardware Client), FRC section (WPILib Docs, FRC Zero to Robot, Chief Delphi, PathPlanner, RobotPy), VEX section (VEX IQ KB, VEX V5 KB, PROS Docs, VEX Forum), new Java textbook entry, FTC/FRC official YouTube channels (FTC, FRC, WPILib), program jump-links at top. Updated frontmatter description, tags, and audience to reflect all-program scope. Wave 29 task.

## 2026-06-01

- `index.mdx` — Wave 30 update. Updated home page to reflect all-six-program scope. Previous state: FLL/VEX-only framing throughout (description, hero tagline, hero button text, card grid, "Our story" section). Changes: updated frontmatter description to name all six programs; updated hero tagline and button label from "FLL Helper" to "Robotics Helper"; added new "Six programs, one community" CardGrid section with individual cards for FLL, FTC, FRC, VEX IQ, VEX V5, and VEX U linking to respective getting-started pages; updated "Practical guides" section to reference FTC SDK Java and WPILib alongside SPIKE Prime; updated "Resources & educator content" section to reference all-program resource maps and educator content; updated "Two ways to use this" opening card to mention FTC/FRC/VEX; updated "Our story" section to mention all six programs. Wave 30 task.

## 2026-06-01

- Added `skill/examples/vex-u/autonomous-base.cpp` — VEX U 6-motor tank drive skeleton with IMU gyro-corrected straight drive and point-turn helpers (PROS framework, VEX V5 hardware). VEX U context notes on two-robot-per-alliance format, 15-second autonomous period, and no size/weight limits. Wave 31 task.
- Added `skill/examples/vex-u/teleop-driver.cpp` — VEX U TeleOp skeleton with 6-motor tank drive, intake, lift (partner controller for independent subsystem operation), slow-mode, and rumble feedback. Wave 31 task.
- Updated `skill/SKILL.md` — documented new examples/vex-u/ section, completing six-program skill bundle coverage. Wave 31 task.

## 2026-06-01 (heartbeat 09:58 UTC)

- Added `skill/examples/vex/vexiq-mission-runner.py` — VEX IQ Brain button-activated Autonomous Coding Skills run selector. Mirrors the FLL `mission-runner.py` pattern for VIQRC competition day: CANCEL button cycles through registered run functions (shown on Brain screen), CHECK button arms then starts the selected run. Includes SmartDrive drivetrain helpers (fwd/rev/turn), a claw attachment motor example, two sample run functions with movement sequences, and a 3-function registry. Designed for teams preparing 2–3 distinct ACS routes for different field states. Wave 32 task.
- Updated `skill/SKILL.md` — documented new `vexiq-mission-runner.py` in the examples/vex/ section.

## 2026-06-01 (heartbeat 10:58 UTC)

- Added `guides/ftc-robot-design.md` — FTC robot design guide covering drivetrain selection (tank vs mecanum vs X-drive), mechanism design principles (failure modes, degrees of freedom, motor selection, hard limits), subsystem planning with ownership model, TeleOp/Autonomous match strategy (cycle timing, expected value, alliance selection), the build-test-iterate loop, and a common rookie mistakes table. Serves P2 (coaches) and P4 (teen builders). Fills content gap: FLL had drivetrain-basics.md and attachment-design.md; FTC had none. Wave 33 task.
- Updated `astro.config.mjs` sidebar — added FTC Robot Design Guide to Building section.
- Updated `guides/index.md` — linked new guide in Building and programming section.

## 2026-06-01 (heartbeat 11:58 UTC)

- Added `guides/frc-robot-design.md` — FRC robot design guide covering drivetrain selection (West Coast tank vs swerve vs mecanum), weight budgeting (120 lb limit, reservation strategy), mechanism design principles (failure modes, degrees of freedom, current limits, hard/soft limits), electronics and power distribution (PDH, CAN bus discipline), Autonomous priority ladder (PathPlanner/Choreo), TeleOp cycle strategy, alliance selection strategy, and a common rookie mistakes table. Serves P2 (coaches) and P4 (teen builders). Parallel to the just-added ftc-robot-design.md — fills the FRC design guide gap. Wave 34 task.
- Updated `astro.config.mjs` sidebar — added FRC Robot Design Guide to Building section (after FTC Robot Design Guide).
- Updated `guides/index.md` — linked new guide in Building and programming section.

## 2026-06-01 (heartbeat 12:58 UTC)

- Added `guides/vex-v5-robot-design.md` — VEX V5/VRC robot design guide covering drivetrain selection (tank vs X-drive vs mecanum with decision matrix), motor budget allocation (8-motor limit, typical allocation patterns), mechanism design principles (failure modes, degrees of freedom, compliant rollers, counterbalancing, hard stops + soft limits), Autonomous Win Point strategy (15-second period, fallback auto, encoder + IMU paths, alliance coordination), TeleOp cycle strategy, alliance selection strategy, and the VRC iteration loop. Fills the VEX V5 content gap — FLL had drivetrain-basics.md and attachment-design.md; FTC had ftc-robot-design.md; FRC had frc-robot-design.md; VEX V5/VRC had none. Serves P2 (teen coaches) and P3 (returning teams). Wave 35 task.
- Updated `astro.config.mjs` sidebar — added VEX V5 Robot Design Guide to Building section (after FRC Robot Design Guide).
- Updated `guides/index.md` — linked new guide in Building and programming section.

## 2026-06-01 (heartbeat 13:58 UTC)

- Added `guides/vex-iq-robot-design.md` — VEX IQ (VIQRC) robot design guide covering drivetrain selection (tank drive vs X-drive holonomic with decision matrix), mechanism design principles (failure modes, degrees of freedom, hard stops + software limits), motor and port budgeting (12-port IQ Brain, typical 4–6 motor allocations), gearing for torque vs. speed, Autonomous Coding Skills strategy (SmartDrive with inertial sensor, fallback routine), Teamwork Challenge strategy (cycle time, field zone coordination, designing for the alliance), and the iteration loop. Designed for ages 8–14 audience; completes the robot-design guide series — FLL drivetrain-basics.md + attachment-design.md, FTC ftc-robot-design.md, FRC frc-robot-design.md, VEX V5 vex-v5-robot-design.md, and now VEX IQ. Wave 36 task.
- Updated `astro.config.mjs` sidebar — added VEX IQ Robot Design Guide to Building section (after VEX V5 Robot Design Guide).
- Updated `guides/index.md` — linked new guide in Building and programming section.

## 2026-06-01 (heartbeat 14:58 UTC)

- `for-educators/index.md` — Wave 37 update. Updated page to reflect all-six-program scope. Previous state: description said "FLL or VEX programs"; intro said "most of the wiki is written for families"; no program tags beyond generic classroom/educators; "What this section is not" linked only to FLL resource map; "Tone & assumptions" made no mention of technical-depth scaling across programs; "Who this section is for" referenced only "FLL or VEX team". Changes: updated frontmatter description to name all six programs; added program tags (fll, ftc, frc, vex-iq, vex-v5, vex-u); added audience, level, season frontmatter; updated intro to list all six programs with age/grade ranges; reorganised "What's here" into four named sub-sections (Curriculum starters, Templates and tools, Assessment, Team and classroom management) for easier scanning; updated "What this section is not" to link to all six program resource maps instead of just FLL; updated "Who this section is for" to name FTC/FRC/VEX teams; updated "Tone & assumptions" to note that technical depth scales with program. Wave 37 task.

## 2026-06-01 (heartbeat 15:58 UTC)

- `community/index.md` — Wave 38 update. Updated page to reflect all-six-program scope. Previous state: frontmatter description said "FLL/VEX robotics journey"; intro said "connect with other families"; Option C listed only FLL Resource Map and VEX Resource Map (two of eight resource pages); "Community values" said "community of parents and kids" omitting coaches/educators/students. Changes: updated frontmatter description to name all six programs; added program tags (fll, ftc, frc, vex-iq, vex-v5, vex-u), audience, level, season; updated intro to welcome parents, coaches, students, and educators across all six programs with a call-out line for each audience type; updated Option C to list all eight resource pages (FLL, FTC, FRC, VEX IQ, VEX V5/VRC, VEX U Resource Maps plus Learning Materials and Software & Tools) with a one-line description of each; updated "Community values" to say "community of parents, students, coaches, and educators". Wave 38 task.

## 2026-06-01 (heartbeat 17:58) — Wave 39

- Added `guides/vex-u-robot-design.md` — VEX U Robot Design Guide completing the six-program robot-design series. Covers VURC-specific design decisions: two-robot sizing strategy (15-inch vs 24-inch), independent drivetrain selection, two-robot autonomous coordination, TeleOp role assignment, endgame synchronisation, mechanism principles, PROS current limits, three-tier autonomous discipline, and alliance selection. Wired into sidebar and guides/index.md. Commit 95eeb9b.

## 2026-06-01 (heartbeat 18:58) — Wave 40

- Updated `skill/SKILL.md` — expanded "Wiki guides by program" section to reflect all guides added in Waves 10–39. Previous state: listed only 4 FLL guides, 4 FTC, 4 FRC, 4 VEX (combined), and 3 cross-program links — missing robot design guides, programming basics pages for FTC/FRC/VEX, tournament guides for VEX IQ/V5, VEX U section entirely, and many cross-program guides. Changes: split VEX into three separate program lines (VEX IQ, VEX V5, VEX U); FLL now links 14 guides including robot-programming-basics, python-intermediate, drivetrain-basics, attachment-design, fll-awards, tournament-day-checklist, first-tournament-expectations, equipment-guide, future-edition-transition; FTC adds ftc-programming-basics and ftc-robot-design; FRC adds frc-programming-basics and frc-robot-design; VEX IQ adds vex-iq-robot-design and vex-iq-tournament; VEX V5 adds vex-v5-programming-basics, vex-v5-robot-design, vex-v5-tournament; VEX U section newly added (what-is-vex-u, vex-u-first-team, vex-u-robot-design); Cross-program grows from 3 to 14 links including glossary, division-eligibility, finding-mentors, team-funding, notebook-guide, practice-session-structure, robot-maintenance, robot-troubleshooting, after-advancing, registration-guide. Wave 40 task.

## 2026-06-01 (heartbeat 19:58 UTC) — Wave 41

- Added `guides/vex-u-programming-basics.md` — VEX U / VURC programming basics guide completing the six-program programming guide series (FLL had robot-programming-basics.md + python-intermediate.md; FTC had ftc-programming-basics.md; FRC had frc-programming-basics.md; VEX IQ had vex-iq-programming.md; VEX V5 had vex-v5-programming-basics.md; VEX U had none). Covers: PROS ecosystem overview (kernel, OkapiLib, LemLib), VS Code + PROS extension setup, device setup with 6-motor tank drive and partner controller, TeleOp skeleton with deadband and slow-mode, autonomous helpers (IMU-corrected straight drive, point-turn to heading), two-robot autonomous coordination strategies (Options A/B/C), OkapiLib chassis setup example, LemLib introduction, VEX U sensor table, PROS multi-tasking basics, autonomous strategy tips, and a common-mistakes table. Wired into sidebar (after VEX V5 Programming Basics), guides/index.md, and skill/SKILL.md VEX U links. Wave 41 task.

## 2026-06-01 (heartbeat 20:58 UTC) — Wave 42

- Added `guides/ftc-judging-prep.md` — FTC judging preparation guide filling the content gap between FLL's `judging-prep.md` (Wave 7) and FTC. FTC judging differs substantially from FLL: single interview session (no separate Core Values / Innovation Project / Robot Design rooms), Engineering Portfolio is the primary pre-read, and advancement is tied to combined engineering + outreach + GP assessment. Content: how FTC judging works (single 5–7 min interview with portfolio); what the judging session looks like (before/during/after); what judges evaluate (engineering depth with iteration evidence, programming maturity, outreach + sustainability, GP throughout the day); how to prepare teams (conversational practice not scripts, genuine speaking role distribution, preparing for hard questions); day-of logistics; matching awards to team strengths (Inspire/Think/Innovate/Design/Connect/Motivate/Control/Promote); common judging mistakes table. Wired into sidebar (after FTC Engineering Portfolio in Competition Prep section), guides/index.md, and skill/SKILL.md FTC links. Wave 42 task.

## 2026-06-01 (heartbeat 21:58 UTC) — Wave 43

- Added `guides/frc-judging-prep.md` — FRC judging preparation guide filling the content gap between FLL's `judging-prep.md` (Wave 7), FTC's `ftc-judging-prep.md` (Wave 42), and FRC which had `frc-awards.md` and `frc-impact-submission.md` but no guide covering the judging process itself. FRC judging differs substantially from both FLL and FTC: multiple simultaneous tracks (pit interviews, scheduled Impact session, Engineering Inspiration interview, Rookie All Star pit assessment, GP observation), no single room-based session for most teams. Content: FRC judging landscape table (pit interviews, Impact, Engineering Inspiration, Rookie All Star, GP observation, submission-based awards); pit interview prep (staffing rules, what judges ask, the 2-minute robot overview drill); Impact session structure and what Impact judges probe (measurable outcomes, systems vs events, years of progression, authentic student ownership); common Impact Q&A weaknesses with example probing questions; Engineering Inspiration and Rookie All Star specifics; GP as a continuous interview (pit, stands, field); preparing all team members not just the Impact team; common judging mistakes table; two-week-out prep checklist. Wired into sidebar (after FTC Judging Prep in Competition Prep section), guides/index.md, and skill/SKILL.md FRC links. Wave 43 task.

## 2026-06-01 (heartbeat 22:58 UTC) — Wave 44

- Added `guides/vex-judging-prep.md` — VEX judging preparation guide completing the judging-prep series for all six programs (FLL had judging-prep.md Wave 7; FTC had ftc-judging-prep.md Wave 42; FRC had frc-judging-prep.md Wave 43; VEX had vex-awards.md and tournament guides but no judging-prep guide). VEX judging differs from FIRST programs: primarily pit-based (roving judges walk pit area), no separate judging rooms, engineering notebook is central evidence. Guide covers: VEX judging structure by program (VIQRC/V5RC/VURC comparison table), the core principle (judges evaluate process not outcome), engineering notebook — what makes strong entries vs. what hurts, pit interview Q&A pattern (robot/design, notebook process, programming/autonomous, GP), pit staffing principles, VIQRC-specific tips for younger students (genuineness over rehearsal, "I don't know" is fine, parent step-back coaching), V5RC-specific tips for high-school teams (trade-offs with data, notebook depth expectations, autonomous detail, GP observation), VURC-specific tips for college teams (two-robot strategy documentation, CAD/analysis expectations, PROS software architecture depth), award-to-team-strength matching table (Excellence, Design, Build, Think, Amaze, Sportsmanship, Judges Award), common judging mistakes table (9 rows), and a judging prep timeline from season start to post-event debrief. Wired into sidebar (after FRC Judging Prep in Competition Prep section), guides/index.md (after FRC Judging Prep), and skill/SKILL.md (VEX IQ, VEX V5, and VEX U program lines).

## 2026-06-01 (heartbeat 23:58 UTC) — Wave 45

- Added `guides/ftc-second-season.md` — "Your Second FTC Season — What to Do Differently": practical guide for returning FTC coaches and teams filling the gap that `second-season.md` fills for FLL but FTC lacked entirely. 10 changes experienced FTC coaches make in season two: (1) start the Engineering Portfolio on day one with rotating documentation and failed-prototype emphasis; (2) narrow robot scope earlier using expected-value scoring; (3) plan autonomous from the season start with sensor/hardware choices baked in from day one; (4) build driver practice into every session (50/50 build/drive by October); (5) prepare for judging as a process story not a show-and-tell; (6) use the Connect Award strategically with multi-touchpoint recurring partnerships; (7) understand alliance selection and how mid-field teams can still be sought-after picks; (8) fix team structure with accountable role assignments (Robot Lead, Software Lead, Portfolio Lead, Drive Team); (9) attend the scrimmage regardless of robot readiness; (10) keep it student-led (asking questions instead of giving answers). Wired into sidebar (Returning Coaches section, after FLL Second Season Guide), guides/index.md (Returning coaches section), and skill/SKILL.md (FTC program line).

## 2026-06-02 (heartbeat 01:58 UTC) — Wave 47

- Added `guides/vex-iq-second-season.md` — "Your Second VEX IQ Season — What to Do Differently": VIQRC equivalent of the returning-coach series (FLL `second-season.md` Wave 7, FTC `ftc-second-season.md` Wave 45, FRC `frc-second-season.md` Wave 46). 10 changes returning VIQRC coaches and students make in season two: (1) start the engineering notebook on day one with dated entries documenting decisions and failures; (2) narrow Teamwork Challenge strategy to highest-value reliable actions, freeze 3 weeks before the event; (3) plan Autonomous Coding Skills from day one in parallel with Teamwork robot, not as an afterthought; (4) design the robot for both Teamwork Challenge and ACS simultaneously with a calibrated drive base and inertial sensor from session 1; (5) practice with the alliance partner weeks before competition day — even one joint session changes match-day coordination; (6) let students lead the pit with clear Pit Captain, Driver, and Operator roles; (7) prepare for judging authentically not by script — genuineness beats polish for the VIQRC age range; (8) cross-train every team member on every role including driving, ACS runs, and notebook entries; (9) register and schedule early on RobotEvents before spots fill; (10) embrace the collaborative nature of VIQRC — Excellence Award goes to teams that excel across robot, autonomous, notebook, and gracious professionalism. Wired into sidebar (Returning Coaches section, after FRC Second Season Guide), guides/index.md (Returning coaches section), and skill/SKILL.md (VEX IQ program line).

## 2026-06-02 (heartbeat 02:58 UTC) — Wave 48

- Added `guides/vex-v5-second-season.md` — "Your Second VEX V5 Season — What to Do Differently": VRC equivalent of the returning-coach series (FLL `second-season.md` Wave 7, FTC `ftc-second-season.md` Wave 45, FRC `frc-second-season.md` Wave 46, VEX IQ `vex-iq-second-season.md` Wave 47). Completes the five-program second-season series. 10 changes returning VRC coaches and student leaders make in season two: (1) open the engineering notebook on day one with dated entries documenting design decisions and failed prototypes; (2) scope the robot by expected value (points × probability) not ambition — freeze 3 weeks before the event; (3) plan autonomous from week one with driveStraight/turnToHeading helpers and two alliance-start routines; (4) run structured driver practice (50%+ of weekly time from October, timed cycles, role rotation, 10+ simulated match starts); (5) assign accountable student roles (lead programmer, lead mechanical, notebook lead, Driver 1/2, project manager); (6) tell a design process story in judging not a feature show-and-tell — practice hard questions; (7) use Skills Challenge as a structured development tool not an afterthought — enter all attempts, review footage, set a season target; (8) treat alliance selection as a strategic phase with a scouting lead and pre-event outreach; (9) add off-season events and scrimmages via RobotEvents; (10) keep it student-led and plan succession for graduating seniors. Wired into sidebar (Returning Coaches section, after VEX IQ Second Season Guide), guides/index.md (Returning coaches section), and skill/SKILL.md (VEX V5 program line).

## 2026-06-02 (heartbeat 03:58 UTC) — Wave 49

- Added `guides/vex-u-second-season.md` — "Your Second VEX U Season — What to Do Differently": VURC equivalent of the returning-coach series (FLL Wave 7, FTC Wave 45, FRC Wave 46, VEX IQ Wave 47, VEX V5 Wave 48). Completes the six-program second-season series. 10 changes returning VURC teams make in season two: (1) open the engineering notebook on day one with two-robot context (one section per robot plus coordination strategy); (2) define each robot's role before designing either, freeze assignments end of week one; (3) write the Autonomous coordination plan in week two with driveStraight/turnToHeading helpers for both robots; (4) schedule structured two-robot driver practice from October (independent cycle timing then coordinated sessions, 10+ simulated match starts); (5) assign explicit roles across both robots and documentation (15-inch lead, 24-inch lead, software lead, notebook lead, drive team, PM); (6) tell a two-robot process story in judging not a feature tour — practice hard questions about trade studies and role division; (7) use Skills Challenge runs as structured data collection (log per-robot scores and failure modes, review footage, set season target); (8) scout and plan alliance selection for a four-robot field — identify partners whose robots complement yours; (9) attend at least one scrimmage or off-season VURC event; (10) build succession deliberately — seniors shadow first/second-years, write team-state document at season end, formalise as a persistent university club. Wired into sidebar (Returning Coaches section, after VEX V5 Second Season Guide), guides/index.md (Returning coaches section), and skill/SKILL.md (VEX U program line).

## 2026-06-02 (heartbeat 04:58 UTC) — Wave 50

- Added `getting-started/choosing-a-program.md` — "Choosing the Right Robotics Program": cross-program decision guide for families and educators comparing all six programs (FLL Discover/Explore/Challenge, VEX IQ, FTC, FRC, VEX V5, VEX U) by age, weekly time commitment, budget, and goals. Includes quick-reference comparison table, in-depth head-to-head sections (FLL Challenge vs VEX IQ; FTC vs VEX V5; FRC vs everything else), time and budget tables, goal-to-program matching, two-family overview (FIRST vs VEX), and "still unsure?" practical next steps. Wired into astro.config.mjs sidebar (top of Getting Started section, after Overview), getting-started/index.md (intro paragraph + Cross-program references section), and skill/SKILL.md (Cross-program line).

## 2026-06-02 (heartbeat 05:58 UTC) — Wave 51

- Added `getting-started/finding-a-team.md` — "How to Find and Join a Team Near You": step-by-step guide for families who want to join an existing team rather than start one from scratch. Covers all six programs. Five-step structure: (1) find teams via FIRST Team Search and RobotEvents with direct links for each program family; (2) contact a team — sample outreach message, which channels to use, what to do if no reply; (3) understand what you are joining — 7-question checklist covering hours/week, school-based vs community, tryout vs open enrollment, cost, team size, coaching style, role availability; (4) attend a practice before committing — four things to observe; (5) what to do if no team exists near you — start one, ask your school, check nearby schools, join a waitlist. Program-specific tips for all six programs with timing guidance. At-a-glance search table. Wired into astro.config.mjs sidebar (Getting Started section, after Choosing a Program) and getting-started/index.md (Cross-program references section).

## 2026-06-02 (heartbeat 06:58 UTC) — Wave 52

- Added `getting-started/first-steps.md` — "Your First Week — Getting Started in Any Program": cross-program "week zero" guide for new families and coaches covering all six programs. Five-step structure: (1) register before anything else — links to my.firstinspires.org, RobotEvents, and the registration guide with program-specific timing notes; (2) get the hardware — starter kit recommendations per program with the FLL Equipment Guide cross-link and "don't over-buy" principle; (3) download the season materials — game manual download links per program, with "read scoring first" advice; (4) install the software — programming environment per program with links, pre-meeting install emphasis; (5) plan your first meeting — three things only (introductions, scoring rules, hands on robot). Also includes "what can wait until week 2", a 6-row common first-week mistakes table, a "you're not behind" closing note, and a where-to-go-next reference table. Fills the gap between the FLL-specific first-four-weeks.md (Week 7) and the cross-program need for a true zero-to-first-meeting guide for all six programs. Wired into astro.config.mjs sidebar (Getting Started section, after Finding and Joining a Team), getting-started/index.md (Cross-program references section), and skill/SKILL.md (Cross-program line).

## 2026-06-02 (heartbeat 08:58 UTC) — Wave 54

- Added `guides/frc-first-four-weeks.md` — "Your First Four Weeks as an FRC Mentor": FRC equivalent of first-four-weeks.md (FLL) and ftc-first-four-weeks.md (FTC). Four-week action plan for brand-new FRC mentors: Week 1 team culture + season calendar orientation (Kickoff in January, 6-week build, fixed deadline); Week 2 building a practice drive base in three parallel tracks (mechanical/electrical/programming) with safety protocol and common wiring/CAN problems table; Week 3 first TeleOp deploy and driving the robot + Impact Award awareness; Week 4 dividing into four sub-teams (mechanical, electrical, programming, strategy+outreach) and opening the Impact Award document on day one. Also covers what to practice between week 4 and Kickoff, what changes after Kickoff, a worry-vs-reality table, and the "one thing most first-year FRC mentors miss" closing note (start Impact story from day one). Wired into astro.config.mjs sidebar (Getting Started section, after First Four Weeks FTC), guides/index.md (Getting started section), skill/SKILL.md (FRC line).

## 2026-06-02 10:58 UTC — Wave 56

- Added `guides/vex-v5-first-four-weeks.md` — "Your First Four Weeks as a VEX V5 Coach": VRC week-by-week new coach guide completing the first-four-weeks series (FLL, FTC, FRC, VEX IQ now VEX V5). Four-week plan: team orientation + hardware intro, building a 4-motor tank drive base + first TeleOp deploy, exploring the season game and the three event types (Driver Skills / Autonomous Skills / Match Play), dividing into robot/notebook/strategy tracks with Engineering Notebook started on day one. Includes V5-specific motor config note, common problems table, worry-vs-reality table, competition format overview (head-to-head vs VIQRC collaborative), and the Autonomous Win Point emphasis. Wired into sidebar, guides/index.md, skill/SKILL.md.

## 2026-06-02 12:58 UTC — Wave 58

- Added `guides/managing-your-season.md` — "Managing Your Season — Registration, Deadlines, and Qualifier Logistics": cross-program season calendar management guide covering all six programs (FLL Challenge/Explore/Discover, FTC, FRC, VEX IQ, VEX V5/VRC, VEX U/VURC). Includes: quick-reference season structure table, per-program calendar with key dates and registration steps, FTC League vs standalone qualifier distinction, FRC district vs regional model explanation, VEX IQ/V5/U RobotEvents registration flow, Skills-only Worlds qualification path for VEX programs, VURC-specific travel/two-robot logistics notes, cross-program logistics checklist (pre-season, at reveal, 4–6 weeks before event, event week), and registration platform table. Addresses the most common season-management failure modes. Wired into astro.config.mjs sidebar (Getting Started section, before Registration Guide), guides/index.md (Getting started section), skill/SKILL.md (Cross-program line).

## 2026-06-02 13:58 UTC — Wave 59

- Added `guides/off-season-activities.md` — "Off-Season Activities — Staying Sharp Between Competition Seasons": cross-program off-season guide for all six programs. Covers why off-season work matters (comparison table), six cross-program activity categories (off-season events, driver practice, engineering notebook catch-up, skill-building workshops, outreach, documentation/knowledge transfer), program-specific off-season suggestions for all six programs (FLL, FTC, FRC, VEX IQ, VEX V5, VEX U), a "what not to do" traps table, and a minimal three-item off-season checklist. Fills the off-season guidance gap: managing-your-season.md covers in-season logistics; second-season guides cover returning improvements; this guide covers the off-season period itself. Wired into astro.config.mjs sidebar (Getting Started section, after Managing Your Season), guides/index.md (Getting started section), skill/SKILL.md (Cross-program line).

## 2026-06-02 20:58 UTC — Wave 67

- Added `guides/mental-models-for-competition.md` — "Mental Models for Competition — Thinking Tools for Older and Returning Teams": deeper cognitive frameworks for FTC, FRC, VEX V5, and VEX U teams. Covers six models: (1) growth vs. fixed mindset (Dweck), with robotics-specific examples and debrief questions; (2) process vs. outcome focus, including a controllable-only pre-match checklist and retrospective discipline; (3) locus of control calibration — distinguishing controllable from uncontrollable factors in a bad-match debrief; (4) the prepare/perform/recover performance cycle with mode-switching guidance and pit schedule rhythm; (5) reframing pressure as excitement (Brooks, Harvard), with pre-match verbal cues; (6) attribution patterns and feedback loops (Weiner, Heider) with shaping questions for coaches. Includes a layered competition-day mental framework, program-specific notes for FTC/FRC/VRC/VEX U, a 6-row common-mistakes table, and a quick-reference table. Wired into astro.config.mjs sidebar (Team Culture section, after Managing First-Competition Nerves), guides/index.md (Team Culture section), skill/SKILL.md (Cross-program line).

## 2026-06-03 00:58 UTC — Wave 71

- Added `guides/grants-and-sponsorship-guide.md` — "Grants and Sponsorship — A Cross-Program Guide": extends team-funding.md (FLL-focused) with a full cross-program funding guide for all six programs. Covers: budget reality table (all 6 programs), Tier 1 official grant programmes (FIRST Grants Database, RECF Grants, FRC district grants, VEX U scholarship), Tier 2 regional PDO grants (with PDO finder links and specific examples for FIRST Washington, FIRST in Texas, IET UK), Tier 3 corporate/foundation sponsors (target-type table, employer match programmes, tiered sponsorship levels, outreach email template, follow-up and stewardship guidance), Tier 4 foundation and government grants (STEMfunders, Toshiba, Siemens, Verizon, Title I, USDA, 21st Century programs), multi-year funding strategy (Year 1 cover costs → Year 2 stabilize → Year 3+ build programme), programme-specific notes for all six programs, 7-row common mistakes table, and a quick-start checklist. Fills the gap between the FLL-only team-funding.md and the cross-program budget-template.md — no existing guide covered grants and sponsorship for FTC/FRC/VEX. Wired into astro.config.mjs sidebar (after Team Funding, before Season Budget Template), guides/index.md (Getting started section), skill/SKILL.md (Cross-program line).

## 2026-06-03 08:58 UTC — Wave 80

- Added `guides/team-roles-reference.md` — "Team Roles Quick Reference": one-page lookup of every team role across FLL, FTC, FRC, VEX IQ, VEX V5, and VEX U. Per-program tables covering all roles (what each owns, minimum team size to split), FRC sub-team structure (Student Lead + Mentor Advisor columns), VEX U two-robot role doubling, and cross-program role assignment tips (name names, every role needs a backup, rotate roles year to year). Fills the gap identified in Wave 77 (student-leadership.md covers developing leaders; team-roles-reference.md is the quick-ref lookup). Wired into astro.config.mjs sidebar (Team Culture section, after Student Leadership), guides/index.md (Team culture section), skill/SKILL.md (Cross-program line).

## 2026-06-03 09:58 UTC — Wave 81

- Added `guides/season-retrospective.md` — "End-of-Season Retrospective Guide": structured end-of-season retrospective format for teams and coaches across all six programs (FLL, FTC, FRC, VEX IQ, VEX V5, VEX U). Covers: why retrospectives matter and what they produce (60–90 min, four outputs), when to run by program, who should attend, the four-question format (what went well / what we'd change / what to do differently / what new members should know), coach/mentor retrospective (separate reflection section), documenting the retrospective (what to write + where to store it), seeding next season's plan, program-specific notes for all six programs, 7-row common mistakes table, and a quick-start checklist. Complements team-documentation-system.md and the six-program second-season series. Wired into astro.config.mjs sidebar (Team Culture, after Team Roles Reference), guides/index.md (Team culture section), skill/SKILL.md (Cross-program line).

## 2026-06-03 10:58 UTC — Wave 82

- Added `for-educators/lesson-plan-library.md` — "Lesson Plan Library": a library of ready-to-run session plans for all six programs (FLL, FTC, FRC, VEX IQ, VEX V5/VRC, VEX U), built on the existing lesson-plan-template.md. Contains 10 specific plans: FLL-1 (Hello SPIKE Prime), FLL-2 (Color Sensor Basics), FLL-3 (Mission Strategy Session), FTC-1 (First TeleOp Drive), FTC-2 (Engineering Portfolio Entry Workshop), FRC-1 (Command-Based Framework Introduction), VEXIQ-1 (Drive Base Build and First Drive), VEXIQ-2 (Autonomous Coding Skills Intro), V5-1 (Encoder-Based Autonomous Drive), VEXU-1 (Two-Robot Autonomous Coordination). Each plan includes: learning objective, materials list, pre-session prep, session timeline table, discussion prompts, differentiation (ahead/stuck), and after-session notes from coaches who have run the session. Wired into astro.config.mjs sidebar (after Lesson Plan Template), for-educators/index.md (Templates and tools section), and skill/SKILL.md (Cross-program line).

## 2026-06-03 12:58 UTC — Wave 83

- Added `for-educators/workshop-formats.md` — "Workshop Formats": short-format (2–4 hour) workshop outlines for one-day school events, summer camps, and intro sessions across all six programs. Six ready-to-run formats: FLL SPIKE Prime Discovery (2 h, ages 8–12, win condition: every pair drives a self-built robot); FLL Innovation Project Sprint (3 h, ages 10–16, win condition: each team presents a 3-min pitch on a real-world problem); FTC First Drive Workshop (3 h, grades 6–10, win condition: every participant drives the robot and changes one number in TeleOp code); FRC Kickoff Experience (4 h, grades 9–12, win condition: participants can name all four sub-teams, have driven the robot, and can explain Gracious Professionalism); VEX IQ Build and Drive (2 h, ages 8–13, win condition: every pair drives a self-built drive base); VEX V5 Strategy and Drive Workshop (3 h, grades 7–12, win condition: participants have driven the robot and can name the three VRC event types); VEX U College Team Intro Session (4 h, college, win condition: participants can explain the two-robot VURC format, have written one PROS function, and can name four sub-team roles). Each format includes kit requirements, group size guidance, full session agenda with timing, and facilitator notes. Also includes an "Adapting these formats" section for shorter sessions, mixed age groups, no-kit scenarios, and multi-day camps. Wired into astro.config.mjs sidebar (after Team Documentation System), for-educators/index.md (Templates and tools section), and skill/SKILL.md (Cross-program line).

## 2026-06-03 17:58 UTC — Wave 89

- Added `guides/outreach-guide.md` — "Community Outreach Guide — FTC Connect, FRC Impact, and VEX Excellence": structured guide for planning and executing meaningful community outreach across all six programs, with focus on the awards that explicitly recognise community engagement (FTC Connect, FRC Impact, VEX Excellence). Covers: what each award looks for; four outreach models (demo/recruit, workshop/camp, mentoring another team, systemic partnership); FTC Connect year-one goals and what the Engineering Portfolio needs to demonstrate; FRC Impact multi-year arc strategy (Year 1–2 build → Year 3–4 submit → Year 5+ propagate), measurable outcome table, and student-ownership requirements; VEX Excellence outreach component (less-is-more framing, notebook connection pattern); common outreach traps table (event inflation, no follow-through, mentor-run outreach, generic messaging, one-program focus, forgetting documentation); six scalable cross-program activity ideas; and a six-week ramp for teams with no existing outreach program. Wired into astro.config.mjs sidebar (Competition Prep, after Alliance Match Strategy), guides/index.md, and skill/SKILL.md (Cross-program line).
