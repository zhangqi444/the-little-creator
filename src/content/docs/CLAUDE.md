---
title: Content Authoring Rules
description: Folder-specific authoring rules for the wiki source. Loaded on top of the root CLAUDE.md by Claude Code; not surfaced in the website sidebar.
tags: [meta, agents, schema]
---

# CLAUDE.md — `src/content/docs/`

Folder-specific authoring rules for the wiki source. Loaded *on top of* the root [`CLAUDE.md`](../../../CLAUDE.md). The root file owns project-wide rules; this file owns content-specific rules. Read both.

## When to create a new page vs. update an existing one

| Situation | Action |
|---|---|
| Source covers a topic the wiki already addresses | **Update** the existing page. Add an entry, refine description, improve `Use when:` text. |
| Source is a single resource (article, video, doc) | **Add an entry** to the appropriate resource map (`resources/fll-resource-map.md`, `resources/learning-materials.md`, etc.). Don't create a new page per resource. |
| Source covers a new topic not yet in the wiki | **Create a new page** in the right folder. Update the sidebar in `astro.config.mjs`. |
| Source is teacher-targeted curriculum/lesson content | Add to `for-educators/`. |

Default to *update over create*. Page proliferation hurts retrieval; one well-curated page beats five thin ones.

## Page-level frontmatter

Every page needs at minimum:

```yaml
---
title: "Plain title, sentence case"
description: "1–2 sentences. Will appear in TOC and as the GPT's retrieval cue."
---
```

Add when relevant:

```yaml
tags: [fll, season-planning, beginner]
audience: [parents, coaches]
level: beginner
season: evergreen
```

**Allowed `audience` values:** `families`, `parents`, `coaches`, `kids`, `teens`, `teachers`. Use plurals. Multi-valued.

**Allowed `level` values:** `beginner`, `intermediate`, `advanced`, `all`.

**`season` values:** `evergreen` (timeless), `YYYY` (specific FLL season — e.g., `2025`), `current` (rare; needs annual refresh in August).

## Per-entry metadata pattern

Resource pages — anywhere a page is primarily a list of curated external links — use this pattern, *exactly*:

```markdown
### Resource Title

- **URL:** https://...
- **Authority:** official | independent | community
- **Audience:** families, teachers
- **Level:** beginner
- **Tags:** fll, spike-prime, python
- **Use when:** <one sentence — the most important field>

<Description paragraph(s).>
```

**Why exactly this format:** the generator's regex parses `^- \*\*FieldName:\*\* value` lines under each `###` heading. Variations break parsing silently. Specifically:

- The `### Title` is the heading — no other heading levels open an entry.
- The bullet list must come immediately after the heading (blank line OK).
- Each metadata bullet uses `- **Label:** value`. No nested formatting in the value.
- Description is everything between the metadata bullets and the next `###` or `##` heading.

**Field guidance:**

- `URL`: full URL with scheme. Required.
- `Authority`: pick exactly one. `official` for FIRST/LEGO/VEX/program-owned content. `independent` for trusted third-party (well-known coach blogs, YouTube channels). `community` for forums, Reddit, social. The GPT's system prompt instructs it to defer to `official` entries for factual program rules.
- `Audience`, `Level`, `Tags`: comma-separated, no brackets. Lowercase.
- `Use when`: the most important field. This is what RAG matches against. Write it as the question the user would ask: *"Use when: you need the canonical Robot Game Rule Book."* Not *"Use when: documentation."*

**Failure modes to avoid:**
- Bare URLs without descriptions — useless to the GPT.
- Long verbatim quotes from the linked source — copyright violation.
- Generic descriptions ("Great resource!") — RAG can't match these to questions.
- Inconsistent `Authority` values — break the GPT's source-priority logic.

## Wikilinks (we don't use them)

Some LLM-wiki conventions use `[[Page Name]]` wikilinks. **We do not use wikilinks here.** Reasons:

- Astro/Starlight renders them as literal text (no link resolution)
- The deployed site needs valid HTML links, not wikilinks
- Markdown links work fine for our use case

Use ordinary markdown links throughout: `[text](/path/to/page/)` for internal, `[text](https://example.com)` for external.

## Internal vs. external link form

- **Internal:** Always relative paths starting with `/` and ending with `/`. Examples: `/getting-started/`, `/resources/fll-resource-map/`. Don't use `.md` extensions; Astro routes are extensionless.
- **External:** Full URL with `https://`. Don't shorten URLs through link shorteners — they may rot or be rate-limited.

## Forbidden content patterns

These are auto-fail in code review:

1. **Long verbatim quotes from external sources** (>50 consecutive words). Summarize and link instead.
2. **Inventing facts about FLL the wiki doesn't already document.** If you don't know a season-specific detail, say so and link to firstlegoleague.org/season.
3. **Adopting a corporate tone or marketing language.** Voice: warm, direct, plain. Treat readers (including kids) as intelligent.
4. **Posting unsourced rumors about teams, coaches, or events.** This is a kid-facing community.
5. **Adding tracking pixels, analytics scripts, or third-party embeds** — static-content-only invariant.
6. **Direct republishing of FIRST trademarks beyond fair-use citation.** Use program names as nouns, never as endorsements of our project.

## Logging

Every meaningful change to this folder gets a one-line entry in [`log.md`](log.md):

```markdown
## YYYY-MM-DD

- <What changed, in past tense> (PR #N).
  Source: <URL if relevant>
```

The log is append-only. New entries at the top of the file (latest first). Don't edit historical entries.

## When in doubt

- See the FLL Resource Map (`resources/fll-resource-map.md`) for the canonical example of the entry pattern at scale.
- See `learning-materials.md` for the entry pattern applied to a different content type.
- See `for-educators/curriculum-starter.md` for a long-form prose page (no entry pattern; just frontmatter + narrative).
- Ask before introducing new file types, new top-level folders, or new conventions.
