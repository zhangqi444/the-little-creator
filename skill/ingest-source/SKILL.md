---
name: ingest-source
description: Ingest a URL or text source into the youth robotics wiki (FLL, FTC, FRC, VEX IQ, V5, U). Reads the source (with bounded sub-page traversal for sites), identifies relevant wiki entities, updates the appropriate pages with proper metadata, never republishes copyrighted content, appends to log.md, and stages a commit or PR. Use when a human pastes a URL and asks to "ingest" or "add this to the wiki," or when working through the autonomous-discovery pipeline (Phase 3 of ARCHITECTURE.md).
---

# Ingest Source Skill

Use this skill when a maintainer pastes a URL or provides a new resource for any of the six in-scope programs (FLL, FTC, FRC, VEX IQ, V5, U) to add to the wiki's resource maps or guides.

## When to use

- User says "add this to the resource map" and pastes a URL
- User says "here's a good link for [topic]" or "can you add this?"
- You find a URL during research that belongs in `fll-resource-map.md` or `vex-resource-map.md`

## Ingest checklist

### Step 1 — Fetch and assess

```bash
# Check the URL is live
curl -sI "<URL>" | head -5
```

If 200 OK: proceed. If redirect: follow to final URL and use that. If 404/error: do not add; note to user.

### Step 2 — Determine entry type

| Type | Where it goes |
|---|---|
| Official FIRST/FLL/VEX source | `resources/fll-resource-map.md` or `resources/vex-resource-map.md` |
| Software tool or app | `resources/software-tools.md` |
| Learning material (course, video, book) | `resources/learning-materials.md` |
| Regional partner (PDO) | `resources/fll-resource-map.md` + `guides/registration-reference.md` |
| Research paper or data source | Inline in relevant guide as a footnote/link |

### Step 3 — Write the entry

Use the standard entry schema from `src/content/docs/CLAUDE.md`. Every resource map entry must have:

```yaml
- name: <Display name>
  url: <https://...>
  type: official | community | tool | database | commercial
  authority: high | medium | low
  audience: [coaches, parents, kids, teens, teachers, developers]
  level: beginner | intermediate | advanced | all
  tags: [fll, vex, programming, ...]
  last_verified: YYYY-MM-DD
  use_when: One sentence describing when to use this resource.
```

### Step 4 — Placement

- Insert alphabetically within the relevant section
- If the resource fits multiple sections, put it in the most specific one and add a cross-reference note in the other

### Step 5 — Commit

```bash
git add resources/
git commit -m "feat: add <resource name> to <file> (resource map update)"
git push origin main
```

## Quality rules (from CLAUDE.md)

- **Never copy copyrighted content.** Describe and link only.
- **Verify the URL is live** before committing.
- **No bare domains.** Every entry needs a `use_when` sentence.
- **Authority: high** is for official FIRST, VEX, or government sources only.
- **Authority: medium** is for well-established community resources (FLL Coach forums, established tutorial sites).
- **Authority: low** is for individual blogs, unofficial writeups, or sources with unclear provenance — still useful, just flagged.

## Special cases

### Regional PDO registration pages

When adding a PDO entry, also check and update `guides/registration-reference.md`:
1. Verify the registration URL is the direct registration page (not the PDO homepage)
2. Add to the relevant region section with confidence tag (`verified-live` or `inferred-from-homepage`)
3. Note any dual-registration requirements (e.g., ORTOP Oregon requires FIRST national first)

### DACH region caveat

The DACH partner (`first-lego-league.org/en/`) covers Germany, Austria, and Switzerland. It is **not** a U.S. source. Always tag entries from this domain with `region: DACH` and note this explicitly in the entry.

### Stale content handling

If you're asked to update an existing entry:
1. Verify the URL is still live and the content is still accurate
2. Update `last_verified` to today's date
3. If the content has changed significantly, update the `use_when` sentence
4. Commit as `chore: refresh <resource name> (verify + update last_verified)`
