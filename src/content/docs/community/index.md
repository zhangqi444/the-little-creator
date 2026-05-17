---
title: Community
description: Connect with other families on the same FLL/VEX robotics journey — and contribute to the knowledge base.
---

The Little Creator is more than a knowledge base — it's a place to connect with other families on the same journey, and to contribute what you've learned so others don't start from scratch.

## Find or Form a Team

Looking for teammates, or have spots open on your team? → [Find a Team](/community/find-a-team/)

## GitHub Discussions

Our primary community space is right here on GitHub. Use Discussions to:

- **Ask questions** — No question is too basic. First-year questions are especially welcome.
- **Share wins** — Competition results, robot milestones, proud moments
- **Swap resources** — Links, tips, lessons learned
- **Introduce your team** — Let the community meet you

→ [Open GitHub Discussions](https://github.com/zhangqi444/the-little-creator/discussions)

## How to Contribute

Anyone can contribute — no technical experience required. Pick the option that fits your comfort level:

### Option A — No code required (easiest)

**Open a GitHub Issue** to suggest anything:
- A correction to existing content
- A resource you've found useful
- A topic we haven't covered
- A question that wasn't answered by the existing guides

→ [Open an issue](https://github.com/zhangqi444/the-little-creator/issues/new)

You don't need to write anything yourself — just describe what you think is missing or wrong, and a contributor will follow up.

### Option B — Edit in GitHub's web editor

For small fixes (typos, broken links, outdated info), you can edit files directly in the browser without installing anything:

1. Navigate to the file you want to edit (any `.md` file in the repo)
2. Click the pencil icon (✏️) in the top-right of the file view
3. Make your changes
4. Click **Propose changes** → **Create pull request**

That's it. A maintainer will review and merge it.

### Option C — Add a resource entry

Resource pages ([FLL Resource Map](/resources/fll-resource-map/), [VEX Resource Map](/resources/vex-resource-map/), [Learning Materials](/resources/learning-materials/), [Software & Tools](/resources/software-tools/)) follow a structured format. To add an entry:

1. Fork the repository
2. Open the relevant resource file in `src/content/docs/resources/`
3. Add your entry following the metadata pattern:

```markdown
### Resource Title

- **URL:** https://...
- **Authority:** official | independent | community
- **Audience:** families, coaches, kids
- **Level:** beginner | intermediate | advanced | all
- **Tags:** fll, spike-prime, python
- **Use when:** One sentence — when should someone use this resource?

Short description paragraph in your own words. Don't paste from the source.
```

4. Submit a pull request with a short explanation of what you added and why it's useful.

### Option D — Write a guide

Have hard-won experience to share? A guide you wish had existed when you started? The most valuable contributions are practical knowledge from people who've actually done it.

**Guides live in** `src/content/docs/guides/`. To write one:

1. Fork the repository
2. Create a new file: `src/content/docs/guides/your-topic.md`
3. Add frontmatter at the top:

```yaml
---
title: Your Guide Title
description: One to two sentences describing what this guide covers.
tags: [fll, relevant-tags]
audience: [families, coaches, kids]
level: beginner
season: evergreen
---
```

4. Write in plain language — this audience is mostly parents and kids, not engineers
5. Follow the non-negotiables in [CLAUDE.md](https://github.com/zhangqi444/the-little-creator/blob/main/CLAUDE.md): family-friendly, describe-and-link (don't republish others' content), cite sources
6. Submit a pull request

Not sure if your guide idea fits? Open a Discussion first — we're happy to give feedback before you write.

### Option E — Share your team's story

Submit your team's season to the [Showcase](/showcase/) — robot builds, competition highlights, Innovation Project writeups. Instructions are on the Showcase page.

## Contribution guidelines (short version)

- **Family-friendly always** — kids may read every page
- **Describe and link, never copy** — summarise in your own words and link; don't paste content from FIRST, LEGO, VEX, or others
- **Cite your sources** — every factual claim gets a link
- **Be honest about uncertainty** — especially around current-season specifics
- **Keep it practical** — what actually helped you, not what sounds impressive

Full guidelines are in [CLAUDE.md](https://github.com/zhangqi444/the-little-creator/blob/main/CLAUDE.md) and [CONTRIBUTING.md](https://github.com/zhangqi444/the-little-creator/blob/main/CONTRIBUTING.md).

## Community values

We're a community of parents and kids. That means:

- **Be kind** — We're all learning. Respect beginners — they're why this exists.
- **Share freely** — Don't gatekeep knowledge. Lift others up.
- **Credit your sources** — If you build on someone else's work, say so.
- **Keep it appropriate** — This is a space for families.

## Staying connected

- **Watch the GitHub repo** (click Watch) to get notified of new guides and resources
- **Star the repo** to show support and make it easier to find
- **Discuss** — The GitHub Discussions are the heart of the community

We're building this deliberately and slowly. Quality over noise.
