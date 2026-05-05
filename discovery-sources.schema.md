# discovery-sources.json — schema

The schema for [`discovery-sources.json`](discovery-sources.json), the catalog the Discovery agent (`ARCHITECTURE.md` §5, Phase 3) reads to decide what to monitor for new content.

This file is markdown rather than JSON Schema because contributor-friendliness matters more than tooling. The Phase 3 agent should validate JSON shape but won't fail catastrophically if a field is missing — it logs and skips.

## Top-level shape

```json
{
  "queries": [...],
  "feeds": [...],
  "watchlist_pages": [...]
}
```

Three independent arrays. Each entry across all three uses common fields plus category-specific ones.

## Common fields (all categories)

| Field | Type | Required | Purpose |
|---|---|---|---|
| `tags` | string[] | yes | Lowercase, hyphenated. Used by the agent to filter relevance. Examples: `fll`, `future-edition`, `regional-partner`. |
| `frequency` | enum | yes | `weekly` \| `monthly` \| `quarterly`. The Discovery cron defaults to monthly; entries with `weekly` cadence are checked every run, `quarterly` only every 3rd. |
| `verified` | boolean | yes | `true` if a human has confirmed the URL/query is good. `false` for aspirational entries that need verification before the agent starts using them. |
| `notes` | string | no | Free-text context for human triagers. Especially useful to capture *why* this source matters and what to watch for. |

## Category: `queries`

Web search queries the Discovery agent runs to find new sources.

| Field | Type | Required | Purpose |
|---|---|---|---|
| `query` | string | yes | The exact search string. Bias to specific phrases, not bare topic words. |

Example:
```json
{
  "query": "FIRST LEGO League 2026 season news",
  "tags": ["fll", "season", "current"],
  "frequency": "weekly",
  "verified": true,
  "notes": "Broad current-season query. Bias to news from the last 30 days."
}
```

## Category: `feeds`

RSS / Atom feeds to poll. The agent fetches each feed and compares item GUIDs against a local "already seen" record (where that record lives is a Phase 3 implementation detail).

| Field | Type | Required | Purpose |
|---|---|---|---|
| `url` | string | yes | Direct RSS / Atom URL. |
| `name` | string | yes | Human-readable name for issue titles. |

Example:
```json
{
  "url": "https://www.youtube.com/feeds/videos.xml?user=FIRSTLEGOLeague",
  "name": "FIRST LEGO League — official YouTube",
  "tags": ["fll", "video", "official", "season-reveals"],
  "frequency": "weekly",
  "verified": false,
  "notes": "YouTube exposes per-channel RSS feeds. URL format above; user/channel ID may need verification."
}
```

## Category: `watchlist_pages`

Specific pages to fetch periodically and check for changes (not feeds — direct page polling). Useful for canonical landing pages that don't publish a feed but change over time.

| Field | Type | Required | Purpose |
|---|---|---|---|
| `url` | string | yes | Full URL of the page to watch. |
| `name` | string | yes | Human-readable name. |
| `look_for` | string | yes | What the agent should specifically scan for. The Discovery agent uses this as part of its prompt when deciding whether a change is worth flagging. |

Example:
```json
{
  "url": "https://www.firstlegoleague.org",
  "name": "Global FLL homepage",
  "tags": ["fll", "official", "canonical"],
  "frequency": "monthly",
  "verified": true,
  "look_for": "Division structure changes, season-name announcements, scope changes (e.g., post-LEGO partnership end). Compare against what what-is-fll.md and fll-resource-map.md say."
}
```

## How the catalog grows

- **Adding entries**: open a PR with the new entry, set `verified: false` if you haven't checked the URL/query is good. A human (or the agent itself, eventually) verifies during a follow-up.
- **Removing entries**: delete the entry. If the agent had been opening issues from it, those issues stay open until manually closed.
- **Bulk updates**: if you find a regional partner site that publishes feeds, you may add several entries at once — keep the PR scoped to that one source family.

## Phase 3 agent — reading this file

The Discovery agent (when implemented) should:

1. Read `discovery-sources.json`
2. For each `verified: true` entry whose `frequency` matches this run, execute the query / fetch the feed / fetch the page
3. Filter results for relevance using `tags` and `notes`
4. Dedupe against existing wiki citations (`grep -r "<url>" src/content/docs/`)
5. For each surviving candidate: open a GitHub issue with the proposed source, the relevance reasoning, and a suggested wiki integration plan
6. **Never open PRs that auto-merge content.** Issues only — humans triage.

This catalog is the *input*; issues are the *output*. The wiki itself is only modified through human review.
