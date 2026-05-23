# AGENTS.md

Cross-tool instructions for AI agents (Codex, Cursor, Aider, etc.) operating in this repository. The substance lives in [`CLAUDE.md`](CLAUDE.md) — read that first.

This shim exists because different AI coding tools look for different files:
- Claude Code reads `CLAUDE.md` automatically
- OpenAI Codex CLI, Cursor, Aider, and other tools look for `AGENTS.md`

Both files describe the same project. To avoid drift, this file delegates to `CLAUDE.md` and only flags places where agent behavior should differ across tools (today: nowhere — the rules are tool-agnostic).

## Quick orientation

The Little Creator is a community knowledge base for **youth competitive robotics programs** — six programs, co-equal in the wiki:

- **FIRST family:** FLL (ages 4–16, three divisions), FTC (grades 7–12), FRC (grades 9–12)
- **VEX family:** VEX IQ (8–14), VEX V5 / VRC (grades 8–12), VEX U (college)

Three consumption surfaces, in priority order:

1. Custom GPT (chat) — primary; currently FLL-focused, will broaden as content matures
2. Astro/Starlight site — secondary
3. Claude Skill bundle — for code generation across program-specific environments (SPIKE Prime / Pybricks / VEXcode / PROS / FTC SDK)

FLL has the most-developed coverage as of 2026-05. The other five programs are being built out; the same SKILL workflow + per-entry pattern + copyright lint applies to all programs.

## Read before editing

- [`CLAUDE.md`](CLAUDE.md) — full project schema (frontmatter, entry pattern, ingest workflow, branch hygiene, build commands, non-negotiables)
- [`BRD.md`](BRD.md) — what we're building and why
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — system design (five-layer model, agents, schema docs hierarchy, phased rollout)
- [`src/content/docs/CLAUDE.md`](src/content/docs/CLAUDE.md) — content authoring rules specific to the wiki source

## Non-negotiables (summary — full list in CLAUDE.md)

1. Family-friendly always (kids may read every page)
2. Describe and link, never republish (≤50 consecutive words from any external source; enforced by `npm run lint:copyright`)
3. Cite sources for every external claim
4. Honest about uncertainty, especially current-season specifics
5. No accounts, no analytics, no auth — static GitHub Pages only
6. For templated URL patterns (per-season, per-region, per-event), record ONE meta-entry plus a predicted-next-URL watchlist — not many duplicate entries

## Common workflows

| Task | Where to look |
|---|---|
| Add a curated resource | `src/content/docs/CLAUDE.md` — entry pattern; resource pages live in `src/content/docs/resources/` |
| Ingest a website | `CLAUDE.md` — Phase A→D ingest workflow with budgets and politeness; also `skill/ingest-source/SKILL.md` for the execution checklist |
| Ingest a site with a templated URL structure (per-season, per-region, per-event) | `CLAUDE.md` § "Pattern-aware ingest" — register ONE meta-entry + predicted-next-URL in `discovery-sources.json`, not many duplicate entries |
| Update an existing guide | Edit the markdown directly; append to `src/content/docs/log.md` |
| Add a new section | Update sidebar in `astro.config.mjs`; create a folder under `src/content/docs/` |
| Refresh GPT knowledge files | `CUSTOM-GPT-SETUP.md` — § "Updating the GPT" |
| Open a draft PR vs commit direct | `CLAUDE.md` § "Branch hygiene" + "Autonomous-agent commits" — direct-to-main with mandatory `npm run lint:copyright` is the default; PRs only for changes that need review |

## Commands

```bash
npm run generate:all   # regenerate llms-*.txt + validate skill bundle
npm run build          # full Astro build (runs prebuild → generate:all → astro build)
```

`pr-checks.yml` runs the build on every PR. Don't merge red PRs.

## When tool-specific guidance diverges

(None today.) If a future tool needs different instructions — e.g., an agent that doesn't support `target=_blank` HTML attributes in markdown actions — document the divergence here. Keep `CLAUDE.md` as the canonical project schema; this file should remain a thin shim.
