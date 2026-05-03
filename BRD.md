# Business Requirements Document — The Little Creator

A community knowledge base for FIRST LEGO League (FLL), accessed primarily through chat and AI coding tools.

---

## 1. Problem statement

FIRST LEGO League serves over 600,000 kids worldwide, but the experience of *starting* a team is fragmented. Information lives in scattered places — official FIRST docs, regional Facebook groups, individual coach blogs, ad-hoc YouTube channels. A new family or teacher spends disproportionate effort just navigating "what should I read first?"

There is no community-curated, AI-accessible knowledge base that:

1. Guides newcomers through their first season with practical, opinionated, family-friendly advice.
2. Stays current as FLL seasons rotate annually.
3. Meets non-technical users where they already are — chat interfaces — rather than requiring them to learn a new website.
4. Respects the IP boundaries of FIRST and other content owners (does not republish copyrighted material).

The Little Creator fills that gap.

---

## 2. Target users (personas)

### Primary

**P1 — First-year FLL parent-coach**
Adult coaching a team of 2–10 kids for the first time. Usually a parent, sometimes a relative or family friend. Non-engineer. Time-constrained. Low confidence about whether they're doing it "right."
*Asks:* "How do we get started?" "What kit do we need?" "When does the season actually begin?" "My kid is frustrated — is this normal?"

**P2 — Classroom teacher / club leader**
Educator integrating FLL into a STEM class, after-school club, or library workshop. Manages a group on a schedule, with learning objectives.
*Asks:* "Give me an 8-week curriculum." "Make a lesson plan for teaching gear ratios." "What's a fair Core Values rubric?"

### Secondary

**P3 — Returning FLL coach (season 2+)**
Has done one season. Wants efficient access to specific topics: Innovation Project, Core Values prep, robot strategy.
*Asks:* "How do I help kids prep for judging?" "What did we miss last year on the Innovation Project?"

**P4 — Older student programming with AI tools**
A teen using Claude Code, Cursor, or similar to write SPIKE Prime / Mindstorms code. Wants AI assistance that knows FLL conventions.
*Asks the AI tool, not the wiki directly:* "Write a line follower using my color sensor on port E."

---

## 3. User outcomes

### For P1 (first-year parent-coach)
- Can ask a chat assistant a question and get a family-friendly answer with links to authoritative sources.
- Knows what to do in week 1, week 4, week 12 of the season.
- Can find resources for things they don't know how to search for.
- Trusts that the answer is honest about uncertainty (especially around current-season specifics).

### For P2 (teacher)
- Has a starter curriculum that can be adapted to their class schedule.
- Has a Core Values rubric usable for in-season observation, distinct from the tournament rubric.
- Can ask the chatbot to design a lesson plan and get something usable, not a generic stub.
- Can find lesson templates without combing through forum threads.

### For P3 (returning coach)
- Can quickly retrieve specific guidance (Innovation Project, Core Values, robot strategy) without re-reading 50 pages.
- Sees clearly which content is fresh vs. outdated.

### For P4 (student programmer)
- AI coding tool (Claude Code etc.) loads our skill bundle and gains FLL context: hardware conventions, Python idioms for SPIKE Prime, common patterns.
- Code examples in the skill match real FLL kit assumptions.

---

## 4. Scope

### In scope
- **FIRST LEGO League** — primary focus, all seasons.
- **VEX content allowed but secondary** — kept in the wiki as a "next step" for kids progressing past FLL; not co-equal in user-facing surfaces.
- **Markdown source of truth** in a public GitHub repository.
- **Three consumption surfaces:** chat (Custom GPT), website (Astro/Starlight), AI coding tools (Claude Skill).
- **Family-friendly, kid-accessible content** — vocabulary, tone, examples assume mixed adult/kid readership.
- **Curated metadata + outbound links** — we describe and point at sources; we never republish their content.

### Out of scope (intentionally, for v1)
- **FRC and FTC** (FIRST Robotics Competition / FIRST Tech Challenge) — different programs, different audiences, different infrastructure needs. Future possibility, not v1.
- **Real-time tournament scoring or event management** — RobotEvents and FIRST handle this.
- **Hardware sales, kit comparisons, affiliate links** — we point at vendors; we don't sell.
- **Hosted commercial chatbot service** — we use existing platforms (ChatGPT) rather than running our own.
- **Content translation** — English only for v1.
- **Kid-direct authentication / accounts** — no logins, no accounts on our side.

---

## 5. Success metrics

| Metric | Target signal | How measured |
|---|---|---|
| Custom GPT usage | Growing weekly conversation count | OpenAI GPT analytics |
| Wiki depth ratio | Curated entries with full metadata vs. bare links — should trend up | Generator output (`X curated entries`) |
| Contributor activity | First-time PR contributors per quarter | GitHub Insights |
| Source citation rate | % of GPT answers that cite a wiki URL or authoritative external source | Manual sampling |
| Out-of-scope refusal rate | GPT politely refuses FRC/FTC/off-topic questions | Manual sampling |
| Content freshness | % of pages updated within last 90 days during active season | Future freshness lint |

We don't have hard numerical targets at v1 — first six months is observation, not optimization.

---

## 6. Non-functional requirements

| Requirement | Why it matters |
|---|---|
| **Family-friendly always** | Kids may use the chat surface directly. No profanity, no political content, no inappropriate material. Refusal patterns are part of the system prompt. |
| **Copyright respect** | We never republish copyrighted content from FIRST or other source owners. We describe and link. This is non-negotiable — the project exists to *help* the FLL ecosystem, not freeride on it. |
| **Free for end users** | No paywalls. The friction we accept is "free ChatGPT account for the chat surface." |
| **Low operating cost** | Solo / volunteer maintainership. Hosting must be free (GitHub Pages, GitHub Actions). API spend (when applicable) must fit a hobby budget. |
| **Resilient to maintainer absence** | Content must remain useful if no PRs land for months. Stable URLs, no live integrations that can silently break. |
| **Non-technical contributable** | A parent must be able to suggest a resource without learning git fully. GitHub web editor + PR is the bar. |
| **Honest about uncertainty** | The chat surface must say "I don't know — check [source]" instead of inventing. Especially for current-season details. |

---

## 7. Constraints

- **Single primary maintainer.** No engineering team. Every architectural choice must be solo-operable.
- **Volunteer time** measured in hours/week, not days. Automation that reduces bookkeeping is high-priority.
- **No infrastructure budget.** GitHub Pages, GitHub Actions, GitHub Issues, free tiers of Anthropic / OpenAI APIs where applicable.
- **Children as audience.** Heightens content-quality bar and IP standards.
- **Annual season cycle.** Content rotates Aug–Apr; freshness matters most Aug–Sept; less Apr–Jul.
- **No control over consumer platforms.** ChatGPT policy changes (Custom GPT availability, free-tier limits) can affect us; we mitigate by maintaining the website + Skill as alternative surfaces.

---

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM hallucinates content into the wiki via autonomous agents | Medium | High | Autonomous agents open *issues*, never PRs. Humans gate every change. |
| Copyright slop sneaks in via unwatched ingest | Medium | High | Schema enforces "describe + link, never republish." Lint flags long verbatim quotes. Human review of every change. |
| Maintainer burnout | Medium | High | Phased automation reduces manual bookkeeping. Schema docs let any Claude session help maintain consistency. |
| Custom GPT availability changes (OpenAI policy) | Low | Medium | Multi-surface from day 1: also website + Claude Skill. Re-platforming the chat surface is contained to one config. |
| Content goes stale across season changes | High | Medium | Annual freshness sweep in August. Per-season tagging in frontmatter. Authoritative-source pages link out rather than restating. |
| FIRST IP enforcement | Low | High | Strict no-republish policy. Respectful citation. Willing to take down on request. |
| Audience mismatch (built for parents, used by kids alone, or vice versa) | Medium | Low | System prompt asks audience-clarifying questions when unclear. Multi-audience tone. |

---

## 9. Out-of-scope for this BRD (deliberately deferred)

- Pricing model (project is non-commercial v1; no decision needed)
- Trademark / branding strategy beyond name choice ("The Little Creator")
- Legal entity / nonprofit status
- Marketing plan beyond "share GPT URL in FLL communities organically"
- Internationalization / localization

---

## 10. Document ownership

This BRD is the source of truth for *what* and *why*. Architecture (the *how*) is in `ARCHITECTURE.md`. Both are versioned in git; substantive changes go through PR review like any other change.
