# CLAUDE.md — The Little Creator

Repo-local instructions for any Claude Code session in this repository. Loaded automatically on session start. Read top to bottom; the schema is enforced by both `pr-checks.yml` (mechanical) and code review (judgment).

For the *why* see [`BRD.md`](BRD.md). For the *how at a system level* see [`ARCHITECTURE.md`](ARCHITECTURE.md). This file is the *how at a session level* — what to do (and what not to do) when actually editing the repo.

## What this project is

A community knowledge base for **FIRST LEGO League** (FLL). Audience: kids (ages 9–16), parents coaching them, and teachers running classroom or club programs. Three consumption surfaces, in order of priority:

1. **Custom GPT (chat)** — primary; <https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper>
2. **Astro/Starlight site** — secondary; hosts the wiki and the AI-readable artifacts
3. **Claude Skill bundle** — for AI coding tools (older students writing SPIKE Prime / VEX code)

VEX content exists but is secondary. New work defaults to FLL unless explicitly scoped to VEX.

## Non-negotiables

These are project-wide invariants. Violating any of them is a bug.

1. **Family-friendly always.** Kids may read every page. No profanity, no political content, nothing inappropriate.
2. **Describe and link, never republish.** We do not paste content from FIRST, LEGO, VEX, or other sources into the wiki. We describe what they offer in our own words and link out. Hard limit: ≤50 consecutive words from any external source. If you find yourself wanting to paste a paragraph, write a 2-sentence summary and link instead.
3. **Cite sources.** Every factual claim sourced from outside this repo gets a link. Every curated resource entry has a `URL:` field.
4. **Honest about uncertainty.** Especially around current-season specifics. The FLL season resets every August — don't claim to know the active season unless the wiki has been refreshed for it.
5. **No accounts, no analytics, no auth.** This is a static-content project hosted on GitHub Pages. We do not add tracking, gated content, or user accounts.

## Frontmatter schema

Every wiki page has YAML frontmatter. Required fields:

```yaml
---
title: <required>
description: <required, 1-2 sentences>
---
```

Optional fields used by the generator and the GPT's retrieval:

```yaml
tags: [fll, season-planning]              # list, lowercase, hyphenated
audience: [families, teachers, kids]      # list — see below
level: beginner                           # beginner | intermediate | advanced | all
season: evergreen                         # evergreen | YYYY | current
```

**Allowed audience values:** `families`, `parents`, `coaches`, `kids`, `teens`, `teachers`. Use plurals. Multi-valued.

## Per-entry metadata pattern (resource pages)

Resource pages — `src/content/docs/resources/*.md` and similar curated link maps — use a stable per-entry pattern:

```markdown
### Resource Title

- **URL:** https://...
- **Authority:** official | independent | community
- **Audience:** families, teachers
- **Level:** beginner
- **Tags:** fll, spike-prime, python
- **Use when:** <one sentence — the most important field for retrieval>

<Description paragraph(s).>
```

The generator (`scripts/generate-llms-txt.mjs`) parses this pattern and emits each entry as a structured block. Don't deviate from the bullet-list format — the parser is regex-based.

## Ingest workflow

When a human or future autonomous agent ingests a new source (URL, PDF, video transcript), follow this four-phase workflow:

### Phase A — Discover

Decide if the source is a single document or a site:

- Article URL with title/byline → document; just read this page
- Root URL or "home" / "about" path → site; traverse multiple pages

For sites:

1. Check `/robots.txt` — honor disallowed paths.
2. Check `/sitemap.xml` — if present, this is the canonical list.
3. Otherwise, follow internal links up to **2 hops** from the seed, same domain only.
4. Skip: search results, login pages, calendar, pagination beyond page 2, asset URLs already linked.
5. Prefer same-path-prefix (e.g., seed `/fll/` → prioritize `/fll/*` over `/store/*`).

### Phase B — Read

For each page:

- Strip nav, footer, ads, cookie banners. Focus on `<main>`, `<article>`, or the largest text block.
- Extract title, primary text, dates, authors, outbound links, audience cues.
- Skip pages with <200 words of substance (usually nav-only).

### Phase C — Synthesize

Answer four questions:

1. What is this source? (one sentence + authority level)
2. What entities does it touch? Match against existing wiki content.
3. What's the smallest correct change? Usually adding one entry to a resource map.
4. What's already covered? If the wiki cites this source, *update* the existing entry.

### Phase D — Record

- Stage the change. Direct commit if a one-line metadata addition; PR if multi-page.
- Append to `src/content/docs/log.md`: date, source URL, what changed.
- Cite the source URL in the entry's `URL:` field. Never paste source prose.

### Site traversal budgets

| Setting | Default | Override when |
|---|---|---|
| Max pages per site | 30 | Bump to 100 for an officially relevant site (firstlegoleague.org); cap at 200 |
| Max hops from seed | 2 | Sitemap absent and primary content lives deep |
| Same-host-only | yes | Never follow off-site during ingest |
| Request rate | 1 req / 2 sec per host | Slow further on 429/503; abort on repeated errors |
| Total wall-clock | 5 min per ingest | Hard cap to bound cost |

### Politeness

- User-Agent: `TheLittleCreator-IngestBot/1.0 (+https://github.com/zhangqi444/the-little-creator)`. Never spoof a browser.
- Honor `robots.txt` strictly.
- No JavaScript execution. Static HTML only. JS-only sites: log and stop.
- No login walls / paywall bypass. Skip and log.
- Stop signals: 403, 429, captcha, repeated 5xx → back off and stop.

### When to stop (saturation)

Stop when:

1. Page-budget cap hit, OR
2. Last 5 pages added zero new wiki insights, OR
3. Crawl moved into clearly off-topic subtree (shopping cart, archived pre-2015 content, etc.).

Always prefer "skip and log" over "fetch and ignore."

## Build, lint, deploy

```bash
npm install                  # first time
npm run dev                  # local Astro server at :4321
npm run generate:llms        # regenerate public/llms-*.txt
npm run generate:skill       # validate skill/SKILL.md
npm run generate:all         # both generators
npm run build                # prebuild → generate:all → astro build
```

`pr-checks.yml` runs `npm run build` on every PR. Don't merge a red PR.

## Branch hygiene

- **One PR per branch.** Branch off the latest `main` for each new piece of work. Don't pile multiple unrelated changes onto a long-lived branch.
- **Branch naming:** `claude/<short-kebab-description>` (e.g., `claude/phase-1-foundations`).
- **Commit messages:** subject line summarizing the change in present tense, then a body explaining *why* (not just what — the diff already shows what).
- **Never force-push to main.** Never amend a published commit.
- **Don't auto-merge.** All work goes through PR review (autonomous-agent PRs are opened as drafts; human review gates every merge).

## Autonomous-agent PRs

Autonomous agents (Discovery, Freshness — see `ARCHITECTURE.md` §5) **open draft PRs**, not auto-merge commits. The technical safety net is `scripts/lint-copyright.mjs` running in `pr-checks.yml`: any PR (human or agent) whose wiki text contains a verbatim run of more than 50 consecutive words from a cited source fails CI and cannot be merged. Run `npm run lint:copyright` locally before pushing if you've added or substantially edited resource-map entries.

## Source citations

When you cite something:

- An external website: full URL.
- A wiki page: relative link starting with `/` (e.g., `/resources/fll-resource-map/`). Don't use file paths like `src/content/docs/...` in user-facing prose — those are dev-internal.
- An official FIRST source: prefer the canonical URL on `firstlegoleague.org` or `firstinspires.org` over a third-party mirror.

## What goes where (file system)

| Path | Contains | Owner |
|---|---|---|
| `src/content/docs/getting-started/` | Onboarding prose for first-time families | Hand-written |
| `src/content/docs/resources/` | Curated link maps with per-entry metadata | Hand-written + ingest agent |
| `src/content/docs/guides/` | How-to prose: forming a team, planning a season | Hand-written |
| `src/content/docs/for-educators/` | Teacher-targeted: curriculum, lesson plans, rubrics | Hand-written |
| `src/content/docs/showcase/` | Community team submissions | Community PRs |
| `src/content/docs/community/` | Find-a-team, contributing | Hand-written |
| `src/content/docs/log.md` | Chronological audit trail of additions/changes | Append-only, every PR |
| `skill/` | Claude Skill bundle for AI coding tools | Hand-written, generator-validated |
| `public/llms*.txt` | Generated artifacts. **Do not edit by hand.** | Generator |
| `BRD.md`, `ARCHITECTURE.md` | Design docs (the *why* and *how*) | Update when requirements change |

## When in doubt

- Read [`ARCHITECTURE.md`](ARCHITECTURE.md) before introducing new tools, dependencies, or surfaces.
- Read [`BRD.md`](BRD.md) before scoping new features — does it serve P1–P4 personas?
- For content authoring rules specifically, see [`src/content/docs/CLAUDE.md`](src/content/docs/CLAUDE.md).
- Open a question as a GitHub issue rather than guessing.

---

## gstack (recommended)

This project uses [gstack](https://github.com/garrytan/gstack) for AI-assisted workflows.
Install it for the best experience:

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup --team
```

Skills like /qa, /ship, /review, /investigate, and /browse become available after install.
Use /browse for all web browsing. Use ~/.claude/skills/gstack/... for gstack file paths.
