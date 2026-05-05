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

## 2026-05-05

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
