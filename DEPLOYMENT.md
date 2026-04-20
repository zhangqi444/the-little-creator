# Deployment Guide

A step-by-step walkthrough to get The Little Maker live on the internet, for free, via GitHub Pages.

## What You'll Need

- A free [GitHub account](https://github.com/signup)
- [Node.js 20+](https://nodejs.org) installed on your computer (only needed if you want to preview the site locally — not required to deploy)
- [Git](https://git-scm.com/downloads) installed on your computer

---

## Step 0: Clean Up (Optional)

The repo currently includes an old `docs/` folder at the root from an earlier draft. It's not used by the Astro site (which reads from `src/content/docs/`), but you can safely delete it before pushing to keep things tidy:

```bash
rm -rf docs
```

## Step 1: Create the GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `the-little-maker` (or any name you prefer)
3. Leave it **Public**
4. **Do NOT** check "Add a README" — we already have one
5. Click **Create repository**

## Step 2: Push Your Files to GitHub

Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial commit: The Little Maker community site"
git branch -M main
git remote add origin https://github.com/<your-username>/the-little-maker.git
git push -u origin main
```

Replace `<your-username>` with your actual GitHub username.

## Step 3: Update `astro.config.mjs`

Open `astro.config.mjs` and update these two lines near the top:

```js
site: 'https://<your-username>.github.io',
base: '/the-little-maker',
```

Commit and push the change:

```bash
git add astro.config.mjs
git commit -m "Set site and base for GitHub Pages"
git push
```

## Step 4: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** (top nav)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment → Source**, select **GitHub Actions**
5. Save

That's it. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site every time you push to the `main` branch.

## Step 5: Wait ~2 Minutes, Then Visit

Your site will be live at:

```
https://<your-username>.github.io/the-little-maker/
```

Check the **Actions** tab in your GitHub repo to watch the build progress.

---

## How to Add or Edit Content

All the site's content is in `src/content/docs/` as markdown files.

### Edit an existing page

1. Open any `.md` file (e.g., `src/content/docs/guides/forming-a-team.md`)
2. Edit the content
3. Commit and push — the site updates automatically within a couple of minutes

### Add a new page

1. Create a new `.md` file under `src/content/docs/` in the appropriate folder
2. Start it with frontmatter (required):

   ```markdown
   ---
   title: Your Page Title
   description: Short summary of the page
   ---

   Your content here...
   ```

3. Add it to the sidebar in `astro.config.mjs` under the right section
4. Commit and push

### Preview Locally (Optional)

If you want to preview changes before pushing:

```bash
npm install     # first time only
npm run dev
```

Visit http://localhost:4321 in your browser. Changes auto-reload as you save.

---

## Enabling GitHub Discussions (Community Forum)

1. Go to your repo → **Settings** → **General**
2. Scroll to **Features**
3. Check the box next to **Discussions**

Now your community has a built-in forum at `https://github.com/<your-username>/the-little-maker/discussions`.

---

## Using the Content with a Custom GPT

The markdown files in `src/content/docs/` are perfect as knowledge base for a Custom GPT.

1. Zip the `src/content/docs/` folder
2. Go to [chat.openai.com/gpts](https://chat.openai.com/gpts) and click **Create**
3. Upload the zip as knowledge
4. Write a system prompt describing The Little Maker's purpose and personality
5. Publish — share the GPT link with your community

---

## Custom Domain (Optional)

If you own a domain (e.g., `thelittlemaker.org`):

1. In GitHub: **Settings → Pages → Custom domain** — enter your domain
2. At your DNS provider, add a CNAME record pointing to `<your-username>.github.io`
3. Update `astro.config.mjs`:
   ```js
   site: 'https://thelittlemaker.org',
   base: '/',
   ```

---

## Questions or Stuck?

Open an issue on the repo and someone will help.
