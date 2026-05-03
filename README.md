# 🤖 The Little Creator

**A community knowledge base for FIRST LEGO League — for kids, parents, and teachers.**

Built by families, for families. Curated guides, resources, educator content, and an AI helper backed by everything we've written.

## Try it now

💬 **Chat with the FLL Helper:** <https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper>
A public Custom GPT on ChatGPT. Ask anything about FLL — getting started, planning a season, designing a lesson, debugging your SPIKE Prime program. Free for anyone with a ChatGPT account.

🌐 **Browse the wiki:** _GitHub Pages site — see [DEPLOYMENT.md](DEPLOYMENT.md) for the deploy URL_

---

## What's in This Repo

This site is built with [Astro](https://astro.build) and the [Starlight](https://starlight.astro.build) documentation theme. All content lives as markdown files, deployed automatically to GitHub Pages.

```
the-little-creator/
├── src/
│   ├── content/docs/          ← All site content (markdown)
│   │   ├── index.mdx          ← Homepage
│   │   ├── getting-started/
│   │   ├── resources/         ← Curated link maps with metadata
│   │   ├── guides/
│   │   ├── for-educators/     ← Teacher / classroom content
│   │   ├── showcase/
│   │   └── community/
│   ├── assets/                ← Logo and images
│   └── styles/                ← Custom CSS
├── scripts/
│   └── generate-llms-txt.mjs  ← Build llms.txt + per-section files for AI consumers
├── skill/                     ← Claude Skill bundle (for AI coding tools)
├── astro.config.mjs           ← Site configuration
├── package.json
├── .github/workflows/         ← Auto-deploy to GitHub Pages
├── DEPLOYMENT.md              ← Site deployment walkthrough
├── CUSTOM-GPT-SETUP.md        ← Publish as a public Custom GPT
└── CONTRIBUTING.md            ← How to contribute
```

## Three ways to consume this knowledge

The wiki is the single source of truth. From it we generate three kinds of consumption surfaces:

1. **Custom GPT (chat)** — [The Little Creator — FLL Helper](https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper). The primary surface for non-technical families and teachers. See [CUSTOM-GPT-SETUP.md](CUSTOM-GPT-SETUP.md) for how it was set up and how to refresh its knowledge files.
2. **Website** — the rendered Astro/Starlight site (this repo, deployed to GitHub Pages). For people who want to browse, and as the public host for the AI-readable artifacts (`llms-*.txt`).
3. **Claude Skill** — a `skill/` bundle for AI coding tools (Claude Code, Cursor). For older kids and parents writing code with AI assistance.

## Quick Links (in the source)

- [Getting Started](src/content/docs/getting-started/index.md)
- [Resources & Resource Maps](src/content/docs/resources/index.md)
- [Guides](src/content/docs/guides/index.md)
- [For Educators](src/content/docs/for-educators/index.md)
- [Showcase](src/content/docs/showcase/index.md)
- [Community](src/content/docs/community/index.md)

## Get the Site Live

See [DEPLOYMENT.md](DEPLOYMENT.md) for a complete walkthrough — it covers creating the GitHub repo, pushing the code, and enabling GitHub Pages.

## Publish as a Custom GPT

See [CUSTOM-GPT-SETUP.md](CUSTOM-GPT-SETUP.md) — a 10-minute, non-technical walkthrough to turn this wiki into a public Custom GPT that families and teachers can chat with.

## Contribute

We welcome contributions from any family in the community. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Local Preview

```bash
npm install
npm run dev
```

Visit http://localhost:4321

---

> *"Every expert was once a beginner. Every pro was once an amateur."*
