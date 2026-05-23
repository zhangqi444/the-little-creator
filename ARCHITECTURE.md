# Architecture — The Little Creator

How we meet the requirements in [`BRD.md`](BRD.md). This document covers the *how*; the *why* and *what* live in the BRD.

The architecture is **program-agnostic** — the wiki source-of-truth, generator scripts, copyright lint, discovery agent, and freshness agent all work identically whether the source covers FLL, FTC, FRC, VEX IQ, VEX V5, or VEX U. Per-program specifics (resource maps, season planning, equipment guides) live in the wiki content, not the platform.

---

## 1. Overview — five-layer model

```
┌─────────────────────────────────────────────────────────────────────┐
│ Layer 5 — Consumption surfaces                                      │
│  • Custom GPT (chat)        — for parents, teachers (P1, P2, P3)    │
│  • Astro/Starlight site     — for browsers, contributors            │
│  • Claude Skill bundle      — for AI coding tools (P4)              │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ reads
┌────────────────────────────────┴────────────────────────────────────┐
│ Layer 4 — Distribution artifacts (auto-generated, never edited)     │
│  public/llms/{llms.txt, llms-full.txt, llms-<section>.txt} · skill/ │
│  artifacts/llms-internal/llms-<section>.txt (wiki-only, not served) │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ generated from
┌────────────────────────────────┴────────────────────────────────────┐
│ Layer 3 — Wiki (single source of truth)                             │
│  src/content/docs/   markdown + YAML frontmatter                    │
│  + index.md (catalog)  + log.md (chronological record)              │
│  Conventions enforced by CLAUDE.md / AGENTS.md                      │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ updated by
┌────────────────────────────────┴────────────────────────────────────┐
│ Layer 2 — Agents (LLM-driven workflows)                             │
│  Ingest · Discovery · Freshness · Build                             │
└────────────────────────────────┬────────────────────────────────────┘
                                 │ fed by
┌────────────────────────────────┴────────────────────────────────────┐
│ Layer 1 — Sources (raw, immutable, never republished)               │
│  URLs (manual paste OR scheduled discovery)                         │
└─────────────────────────────────────────────────────────────────────┘
```

**Design principle:** the wiki is the only thing humans edit. Layer 1 is read-only; layers 4–5 are derived. This guarantees one source of truth and prevents drift.

---

## 2. Layer 3 — Wiki (source of truth)

### Structure

```
src/content/docs/
├── index.mdx                ← Homepage (Astro splash template)
├── index.md                 ← Machine-readable catalog (LLM-maintained)
├── log.md                   ← Append-only chronological record
├── getting-started/         ← Onboarding prose
├── resources/               ← Curated link maps (per-entry metadata)
│   ├── fll-resource-map.md
│   ├── learning-materials.md
│   └── software-tools.md
├── guides/                  ← Practical how-to prose
├── for-educators/           ← Teacher-targeted content
├── showcase/                ← Community projects
└── community/               ← Forum links + how to contribute
```

### Frontmatter schema (page-level)

```yaml
---
title: <required>
description: <required, 1-2 sentences>
tags: <optional, list>
audience: <optional, list — kids | families | teachers | coaches>
level: <optional — beginner | intermediate | advanced | all>
season: <optional — current | YYYY | evergreen>
---
```

### Per-entry metadata pattern (resource pages)

Curated resource pages use a stable pattern an LLM can parse:

```markdown
### Resource Title

- **URL:** https://...
- **Authority:** official | independent | community
- **Audience:** families | teachers | kids | coaches (multi-valued)
- **Level:** beginner | intermediate | advanced | all
- **Tags:** fll, spike-prime, python
- **Use when:** <one sentence — the most important field for retrieval>

<Description paragraph(s).>
```

The generator detects this pattern and emits each entry as a structured block in the distribution artifacts.

---

## 3. Layer 4 — Distribution artifacts (generated)

### `public/llms/llms.txt`
Curated table of contents. Title + description per page, grouped by section, ordered to match the website sidebar. Includes per-page entry counts. Small enough to fit easily in any LLM context.

### `public/llms/llms-full.txt`
Whole-corpus dump. Every page rendered as a block; curated entries rendered as structured per-entry sub-blocks. Primary upload target for the Custom GPT.

### `public/llms/llms-<section>.txt`
One file per top-level public section (`llms-resources.txt`, `llms-for-educators.txt`, etc.). Smaller than `llms-full.txt`; better RAG retrieval when uploaded as separate Custom GPT knowledge files.

### `artifacts/llms-internal/llms-<section>.txt`
Wiki-internal sections — the CLAUDE.md authoring rules (`llms-CLAUDE.txt`) and the log audit trail (`llms-log.txt`). NOT served by Astro and NOT uploaded to the Custom GPT; generated for local agent consumption (e.g., a freshness agent reading the audit trail). Lives outside `public/` so it's clearly separated from external-facing artifacts.

### `skill/`
Claude Skill bundle: `SKILL.md` (frontmatter + invocation guidance) + `templates/` + `examples/fll/` + `examples/vex/`. Distributed to AI coding tool users.

### Generated by
`scripts/generate-llms-txt.mjs`, hooked into `npm prebuild` so artifacts regenerate before every Astro build. Generated files are in `.gitignore`.

---

## 4. Layer 5 — Consumption surfaces

| Surface | Audience | Maintenance | Refresh |
|---|---|---|---|
| **Custom GPT** | P1 parents, P2 teachers, P3 returning coaches | Re-upload knowledge files when wiki changes meaningfully | Manual (target weekly during active season) |
| **Astro/Starlight site** | Browsers, contributors using GitHub web editor | Auto-deploy on push to `main` via `.github/workflows/deploy.yml` | Per push |
| **Claude Skill** | P4 students using AI coding tools | Bundle published in `skill/` — installable directly from the repo | Per push (once `build-skill.mjs` exists) |

The site exists primarily as the **public hosting layer** so AI agents can fetch artifacts via URL, and as a **contributor entry point**. End users mostly arrive via chat.

---

## 5. Layer 2 — Agents

Four agents, each with a distinct role and risk profile.

### Ingest agent — "human pastes URL"

| Attribute | Value |
|---|---|
| Trigger | Human pastes URL or text into Claude Code session |
| Authority | Read source (with bounded sub-page traversal) → identify entities → update relevant wiki pages → update `index.md` and `log.md` → cite source URL in description |
| Output | Direct commit (small) or PR (if touching many pages) |
| Human in loop | Yes — user reviews changes in real time |
| Risk | Low (synchronous human supervision) |

### Discovery agent — "find new sources"

| Attribute | Value |
|---|---|
| Trigger | Scheduled (weekly) — currently a Cowork scheduled task on the maintainer's host |
| Authority | Web-search a curated list of FLL-relevant queries → filter by relevance + license + authority → for accepted candidates: deep-crawl, write entries per the SKILL, run the copyright lint locally, commit and push directly to `main` |
| Output | **Commits on `main`** (one per source). Each commit message names the source and lists new entries. Lint must pass before push; if it fails, the entry is rewritten or the candidate is deferred. |
| Human in loop | No at write-time — review is post-hoc via `git log` / `log.md` / wiki diffs. Lint is the only mandatory gate. |
| Risk | Medium-high (autonomous direct-to-main; mitigated by mandatory pre-push copyright lint, the wiki's structured entry pattern, and the periodic Freshness agent that catches drift after the fact) |

### Freshness agent — "check existing content"

| Attribute | Value |
|---|---|
| Trigger | Scheduled (monthly mechanical, quarterly semantic) — currently Cowork scheduled tasks on the maintainer's host |
| Authority | Walk catalog → check link health, diff content against latest source where reasonable → flag stale entries, broken links, contradictions. For mechanical fixes (a redirect, a permanent URL change), commit directly to `main`. For substantive drift requiring rewrite, commit the rewrite directly to `main` if confident; otherwise open a GitHub issue describing the drift for human judgment. |
| Output | Commits on `main` for clear fixes; GitHub issues for judgment-call findings. Lint must pass before push. |
| Human in loop | Post-hoc for clear fixes; up-front (via issues) for ambiguous drift |
| Risk | Low-medium (read-only discovery, then direct writes for mechanical fixes; mitigated by lint + the SKILL's ≤50-word rule applied per entry) |

### Build agent — "regenerate artifacts"

| Attribute | Value |
|---|---|
| Trigger | `npm run build` (which runs `prebuild → generate:llms`), and GitHub Actions (`deploy.yml`, `pr-checks.yml`) |
| Authority | Read wiki → write `public/llms/*.txt`, `artifacts/llms-internal/*.txt`, and `skill/` artifacts |
| Output | Generated files, never committed |
| Human in loop | No (deterministic script) |
| Risk | None |

**Cross-cutting principle (revised 2026-05):** autonomous agents (Discovery, Freshness) **commit directly to `main`** for clear, schema-conforming work; they fall back to GitHub issues only when the fix requires human judgment that the agent can't safely draft. The technical safety net is `scripts/lint-copyright.mjs`, which agents run locally before every push (and which `pr-checks.yml` re-runs on any PR work, agent or human): any wiki text containing a verbatim run of more than 50 consecutive words from the cited source fails the lint and the push is aborted. Review is post-hoc via `log.md` (every change has a one-line audit entry per source) and `git log`. The autonomy rule moved from "issues only" through "draft PRs" to "direct-to-main with mandatory pre-push lint" to match the maintainer's own working pattern; the cost is rolling back via revert if anything bad lands, the benefit is zero triage friction.

---

## 6. Schema docs

The agents above need explicit, repo-local instructions. This is the role of `CLAUDE.md` (Claude Code convention) and `AGENTS.md` (cross-tool convention used by Codex, Cursor, Aider, etc.).

| File | Purpose | Read by |
|---|---|---|
| `CLAUDE.md` (root) | Project-wide instructions: copyright stance, FLL focus, frontmatter schema, entry pattern, source-citation rules, refusal behavior | Claude Code automatically on session start |
| `AGENTS.md` (root) | Cross-tool agent shim — points at `CLAUDE.md` for the substance | Other agentic tools (Codex, Cursor) |
| `src/content/docs/CLAUDE.md` | Content authoring rules: how to add a resource entry, when to create a new page vs. update existing, wikilink conventions, forbidden content patterns | Claude Code when editing in this folder |
| `skill/CLAUDE.md` | Skill bundle rules: code style for examples, hardware-assumption header convention, filename conventions | Claude Code when editing in this folder |
| `index.md` (in content root) | Machine-readable catalog: every page with tags, audience, level, last-updated, status | Both humans and ingest agent |
| `log.md` (in content root) | Append-only chronological record of additions/changes | Freshness agent reads to detect stale entries |

---

## 7. Tooling

| Layer | Tool | Why |
|---|---|---|
| Static site generator | Astro 5 + Starlight 0.34 | Best-in-class docs theme, free, GitHub Pages-friendly |
| Wiki source format | Markdown + YAML frontmatter | Universal, contributor-friendly, AI-parseable |
| Generator runtime | Node.js (built-in modules only, no deps) | Zero install footprint, works in any CI |
| CI / scheduling | GitHub Actions | Free for public repos, scheduled cron support |
| Hosting | GitHub Pages | Free, integrated with the source repo |
| Discovery / Freshness runtime | Claude (headless via Anthropic API or Claude Code in CI) | Same model that built the wiki ⇒ schema consistency |
| Chat surface | OpenAI Custom GPT | Public sharable URL, free tier, no infra |
| Coding tool surface | Claude Skill bundle | Official Anthropic format, install-from-repo |

We deliberately don't use: a vector database (overkill for current scale), a CMS (markdown is the CMS), a hosted chat backend (we use platforms), or a custom auth system (we have no accounts).

---

## 8. Data flow

### Flow A — Human pastes a URL into Claude Code (Phase 2+)
1. Human: "Ingest this: https://example.com/fll-tip"
2. Claude reads `CLAUDE.md` → loads ingest checklist
3. Fetches the page; if substantive, traverses 1–2 levels of sub-pages
4. Identifies entities (people, products, programs, seasons)
5. For each affected entity/topic page: read current content → integrate findings → preserve the "describe + link, never republish" rule
6. Updates `index.md` (catalog entry) and `log.md` (chronological record)
7. Stages a commit or opens a PR depending on size
8. Human reviews and merges

### Flow B — Discovery agent runs weekly (Phase 3)
1. GitHub Action triggers
2. Headless Claude reads `AGENTS.md` → loads discovery prompt
3. Runs a small batch of curated web searches (FLL-related)
4. Filters results: license check, relevance score, dedup against existing wiki
5. For each candidate that passes: opens a GitHub issue with the URL + proposed integration plan
6. Maintainer triages issues → assigns approved ones to ingest workflow

### Flow C — Freshness agent runs monthly (Phase 4)
1. GitHub Action triggers
2. Walks `index.md` → for each entry, checks: link health, frontmatter validity, last-updated age, presence of season-specific content past its season
3. Opens one GitHub issue per finding
4. Maintainer triages

### Flow D — PR opened (any layer)
1. `pr-checks.yml` runs
2. `npm ci` → `npm run build` (which triggers `prebuild` → `generate:llms` → `astro build`)
3. Smoke-test that expected artifacts exist and are non-empty
4. Maintainer reviews PR
5. On merge to `main`: `deploy.yml` runs → site deploys to GitHub Pages

### Flow E — Custom GPT consumption (per query)
1. End user asks the Custom GPT a question
2. ChatGPT does RAG retrieval over the uploaded knowledge files (`llms-<section>.txt`)
3. Retrieved chunks + system prompt → answer with citations
4. Off-topic / out-of-scope questions are refused per system prompt patterns

---

## 9. Phased rollout

### Phase 1 — Foundations (build now)
- `CLAUDE.md` (root) — codifies all current conventions
- `AGENTS.md` (root) — cross-tool shim
- `src/content/docs/CLAUDE.md` — content authoring rules
- `src/content/docs/log.md` — seeded with recent changes
- `src/content/docs/index.md` — auto-generated catalog (extend `generate-llms-txt.mjs`)

**Status after Phase 1:** any Claude Code session that opens this repo automatically loads the schema and can act as an ingest agent. No automation yet, but consistency is enforceable.

### Phase 2 — Ingest workflow validated (next)
- Define ingest checklist as `skill/ingest-source/SKILL.md` (a Claude Skill any session can invoke)
- Manually run on 5–10 real FLL URLs to validate
- Tune the schema based on what breaks
- Add a CI lint that validates frontmatter compliance on every PR

**Status after Phase 2:** the human-paste-URL workflow is reliable and reproducible. Ready to consider automation.

### Phase 3 — Autonomous discovery (later)
- `.github/workflows/discover-sources.yml` — scheduled weekly
- Curated list of search queries + RSS feeds in `discovery-sources.json`
- Discovery agent uses Anthropic API (or Claude Code headless) → opens issues
- Maintainer review SLA: target weekly triage

**Status after Phase 3:** new sources surface without manual searching. Maintainer becomes a triager, not a hunter.

### Phase 4 — Autonomous freshness (later)
- `.github/workflows/lint-wiki.yml` — scheduled monthly
- Lint dimensions: link health, frontmatter validity, contradictions, orphan pages, season staleness
- Opens issues for each finding

**Status after Phase 4:** content quality compounds rather than decays.

### Not planned
- Vector database / custom RAG infrastructure (Custom GPT handles retrieval)
- Embedded chat widget on the website (only if zero-account-friction proves necessary)
- MCP server for live Claude integration (only if Custom GPT re-uploads become painful)
- Multi-language support (English only for v1)

---

## 10. Tradeoffs accepted

| Tradeoff | Why we accept it |
|---|---|
| RAG retrieval over full-context for chat | Custom GPT limitation, not ours; works fine for our scale |
| Manual re-upload of GPT knowledge files | Defers MCP/automation cost; freshness still acceptable at weekly cadence |
| English only at v1 | Translation needs ongoing maintenance; contradicts the solo-maintainer constraint |
| FLL-only primary scope | Sharper product, easier to ship and validate; VEX expansion is a future phase |
| Issue-based human-in-the-loop for autonomous agents | Slower than auto-PRs but safer (LLM hallucination, copyright risk) |
| No accounts, no analytics on the website | Simpler infra; we trade observability for simplicity |
| No CMS UI for non-technical contributors | GitHub web editor is "good enough" for now; revisit if contribution rate is bottlenecked |

---

## 11. Open questions (to resolve before later phases)

1. What's the budget for autonomous-agent API spend? (Affects Phase 3 cadence.)
2. Do we want to publish `llms-full.txt` content publicly (making it Google-indexed) or only via the Custom GPT? (Affects deploy.yml.)
3. When does VEX content get its own resource map? (Trigger: when 3+ contributors ask for it.)
4. Should we adopt entity pages (`entities/<name>.md` + wikilinks `[[name]]`) à la Karpathy's full LLM-wiki pattern, or stay topic-organized? (Trigger: when wiki crosses ~100 pages.)

---

## 12. Document ownership

This document derives from [`BRD.md`](BRD.md) and changes when requirements change. Substantive architectural changes go through PR review. Open questions in §11 are resolved by adding a brief decision log entry in §10 (Tradeoffs accepted) and updating the relevant section.
