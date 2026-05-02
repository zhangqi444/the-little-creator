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
│   │   ├── resources/
│   │   ├── guides/
│   │   ├── showcase/
│   │   └── community/
│   ├── assets/                ← Logo and images
│   └── styles/                ← Custom CSS
├── astro.config.mjs           ← Site configuration
├── package.json
├── .github/workflows/         ← Auto-deploy to GitHub Pages
├── DEPLOYMENT.md              ← Step-by-step setup guide
└── CONTRIBUTING.md            ← How to contribute
```

## Quick Links (in the source)

- [Getting Started](src/content/docs/getting-started/index.md)
- [Resources](src/content/docs/resources/index.md)
- [Guides](src/content/docs/guides/index.md)
- [Showcase](src/content/docs/showcase/index.md)
- [Community](src/content/docs/community/index.md)

## Get the Site Live

See [DEPLOYMENT.md](DEPLOYMENT.md) for a complete walkthrough — it covers creating the GitHub repo, pushing the code, and enabling GitHub Pages.

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
