# 🤖 The Little Creator

**A community for kids and parents exploring robotics together.**

A nonprofit community centered around competitive robotics — FLL (FIRST Lego League) and VEX — built by families, for families.

🌐 **Live site:** _coming soon — see [DEPLOYMENT.md](DEPLOYMENT.md) to publish_

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

1. **Website** — the rendered Astro/Starlight site (this repo, deployed to GitHub Pages). For people who want to browse.
2. **Custom GPT (chat)** — a public Custom GPT on ChatGPT, backed by auto-generated knowledge files. For non-technical families and teachers who want to ask questions in chat. See [CUSTOM-GPT-SETUP.md](CUSTOM-GPT-SETUP.md).
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
