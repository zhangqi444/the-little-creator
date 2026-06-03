---
title: Team Documentation System
description: How to set up a season-long documentation system that supports engineering notebook requirements, knowledge transfer, and program continuity across FLL, FTC, FRC, VEX IQ, VEX V5/VRC, and VEX U.
tags: [educators, coaches, documentation, engineering-notebook, knowledge-transfer, fll, ftc, frc, vex-iq, vex-v5, vex-u]
audience: [teachers, coaches]
level: intermediate
season: evergreen
---

The engineering notebook is both a judged artifact and a living record of what your team thinks, tries, and learns. But the notebook is only one layer of a documentation system. Without deliberate structure, teams lose context between sessions, forget why decisions were made, and start over every season. This guide walks through a minimal documentation system that works alongside — not instead of — the official notebook requirement.

## Why documentation systems matter

**The problem:** Knowledge lives in people's heads. When a returning member graduates, a mentor moves on, or a busy week causes everyone to forget context, the team regresses. Rebuilding institutional knowledge wastes weeks.

**The goal:** Capture enough that any new member can onboard in one session, and any returning member can resume where they left off.

Documentation has three audiences:
1. **Judges** — want to see the engineering process (the official notebook serves this)
2. **The team** — want to remember what they decided and why (informal notes, photos, session logs)
3. **Future seasons** — want to inherit working setups and lessons learned (handoff documents)

A good system serves all three. An overburdened system serves none.

---

## The five document types

Keep the system minimal. Five document types cover everything.

### 1. The engineering notebook

The official judged artifact. Required for FTC, FRC, VEX V5/VRC, VEX U, and VEX IQ; strongly encouraged for FLL. Every program has its own expectations — read your game manual's judging section.

The notebook captures:
- Design decisions (and rejected alternatives)
- Build and code iterations with data
- Reflection after each key meeting

**Format by program:**

| Program | Accepted formats | Key requirement |
|---|---|---|
| FLL | Physical binder or Google Slides; flexible | Engineering process visible; team involvement shown |
| FTC | Physical bound notebook or digital portfolio | Consistent team authorship; timestamped; all sections present |
| FRC | Physical binder; student-authored | Impact evidence; engineering process; student voice dominant |
| VEX IQ | Physical or digital engineering notebook | Timestamped entries; design decisions visible |
| VEX V5/VRC | Physical or digital engineering notebook | Design process; autonomous strategy; scored on depth |
| VEX U | Physical or digital engineering notebook | Graduate-level rigor expected; both robots documented |

> The notebook is the **judged record**. It does not need to be written in real time — but all entries must be authentic to the actual process. Backdating or fabricating entries is considered a violation.

### 2. Session log

A quick, informal record of each meeting. Unlocks continuity between sessions.

**Minimum viable session log entry (5 minutes to write):**

```
Date: 2026-10-14
Attendees: Mia, Diego, Coach Patel
What we did:
- Tried new claw design; could not reach high scoring zone
- Switched to wider tray; works for ground-level
Decisions made:
- Dropping high-goal scoring from autonomous; too unreliable
Next: Mia to add optical sensor for color sorting; Diego to update autonomous
```

Keep this in a shared folder (Google Docs, Notion, paper binder). One page per meeting. The team's notebook authors can promote any entry to a full notebook page if it warrants documentation.

### 3. Decision log

A running record of significant decisions — separate from session notes. Useful when someone asks "why did we do it this way?" weeks later.

**Format:**

```
Decision: Use 4-motor tank drive instead of mecanum
Date: 2026-09-28
Why: Team new to programming; mecanum requires strafing code we do not have bandwidth for
Alternatives rejected: Mecanum (too complex), X-drive (unstable at speed)
Status: Confirmed; revisit in off-season
```

A short shared document with one entry per decision is enough. Do not force every choice through here — save it for decisions you might revisit or that affect other components (drivetrain choice affects autonomous strategy; software language choice affects who can contribute).

### 4. Technical reference

Persistent facts the team needs to look up repeatedly:

- Robot dimensions and weight
- Motor port assignments and gear ratios
- Sensor port assignments and calibration notes
- Wi-Fi SSID / controller pairings (FTC, FRC)
- Software environment setup (SDK version, PROS version, Python version, library list)
- Emergency backup procedure (what to do if the brain/control hub dies at competition)

One shared document or README in the code repository. Keep it short — a single page. Update it when anything changes. This pays off most at competition when someone asks "what port is the intake motor on?" under pressure.

### 5. Season handoff document

Written at end of season. The most valuable document you will never be in the mood to write.

**What it covers:**

1. What the team accomplished this season (results, awards, robot achievements)
2. What worked well (keep doing this)
3. What did not work (do not repeat this)
4. Open decisions or half-finished projects (current state + context)
5. Recommended first steps for next season
6. Contact list (mentors, regional contacts, PDO coordinator)
7. Where to find everything (folder links, physical storage location)

Even two pages of honest notes from a departing student leader transfer more institutional knowledge than a full season of session logs that nobody reads.

---

## Setting up the system (first week)

The hardest part is starting. Do this in the first meeting of the season:

**Step 1:** Create a shared folder (Google Drive or equivalent) with subfolders:

```
Team Name/
  Notebook/
  Session Logs/
  Technical Reference/
  Decision Log/
  Code/ (or link to GitHub repo)
  Last Season Handoff/
```

**Step 2:** Copy in last season's handoff document (if it exists). If not, create a blank one to fill in by season end.

**Step 3:** Appoint a documentation lead. This person is responsible for session log entries, not for writing everything. They remind the team, collect notes, and keep the folder tidy. It is a 10-minute-per-session role, not a full-time job.

**Step 4:** Add the documentation folder link to the technical reference doc and anywhere else the team will look.

---

## Aligning informal docs with the engineering notebook

The session log and decision log are **not** the notebook. They are raw material that gets refined into notebook pages. The workflow:

```
Session log (quick, informal) --> review at week's end -->
  promote key decisions/data to notebook pages -->
  rest stays in session log as archive
```

This reduces the friction of maintaining a high-quality notebook. Teams that try to write polished notebook pages live during meetings often end up with either bad notes or bad meetings. The two-pass approach keeps both healthy.

---

## Program-specific notes

### FLL (ages 9–16)

Kids can and should author session logs. Assign rotating "session scribe" roles. Use photos heavily — a photo of the robot before and after a change takes 10 seconds and communicates more than a paragraph. Digital notebooks (Google Slides, Seesaw) often work better than physical binders for young children. Keep the system simple: one folder per category is enough.

### FTC (grades 7–12)

The Engineering Portfolio is the judged document — it is the notebook for judging purposes in FTC. Maintain session logs separately as a writing pool for portfolio pages. The technical reference is especially valuable here because FTC hardware is complex: multiple hubs, REV hardware client configs, SDK version pinning, and field orientation settings all change and are easy to forget between weeks.

### FRC (grades 9–12)

FRC teams often have 20–50 people. The documentation system scales differently:
- Session logs become sub-team session logs (mechanical, electrical, programming, Impact); each sub-team owns its own
- Decision log stays as a single shared document, but each sub-team adds entries
- Technical reference splits into hardware reference (electrical), code reference (programming), and field/strategy reference (drive team)
- Handoff document: each sub-team lead writes a section; merge into one

The Impact sub-team's documentation is also documentation — outreach logs, metrics, contact lists, event reports.

### VEX IQ (ages 8–14)

Keep it simple. A paper notebook in a binder works. Session log can be stickers on a paper calendar. Technical reference: a laminated card taped to the robot works for port assignments. The handoff document matters most for coaches; students are often too young to write it, so the coach writes it with their input.

### VEX V5/VRC (grades 8–12)

The engineering notebook is scored at every VRC event. Many V5 teams use a hybrid of physical notebook and digital session logs. Focus notebook depth on: design decisions with eliminated alternatives, autonomous strategy with data, match performance analysis. VRC teams competing at higher levels (State/Nationals/Worlds) will be compared against teams with deep, multi-season notebooks — start treating it as a living document, not an afterthought.

### VEX U (college)

Both robots need documentation. Assign a documentation lead for each robot, not just for the team. VURC judging expects graduate-level rigor — explain *why* you chose a design approach (trade study, load calculation, test data), not just *what* you chose. The technical reference is critical for a college team with rotating members semester to semester: environment setup instructions, CAD file locations, PCB schematics, PROS/OkapiLib versioning.

---

## Traps to avoid

| Trap | What happens | How to avoid |
|---|---|---|
| "We'll document it later" | Context is lost; it never happens | Write session logs same-day; 5-minute rule |
| Over-engineering the system | Team spends more time managing docs than building | Five document types, no more |
| Single-author notebook | Judges (and the team) can tell; one person burns out | Rotate notebook authorship by section or week |
| No documentation lead | Everyone assumes someone else is writing it down | Assign explicitly; rotate if needed, but always assigned |
| Losing the handoff document | Next season starts from zero | Handoff is last item on season checklist |
| Different folder per student | Nobody can find anything | One team folder, shared with all members and coaches |

---

## Quick-start checklist

- [ ] Shared folder created and linked
- [ ] Subfolders: Notebook, Session Logs, Technical Reference, Decision Log, Code/repo
- [ ] Documentation lead assigned
- [ ] Last season's handoff imported (or blank handoff doc created)
- [ ] Session log template pasted for first meeting
- [ ] Notebook format confirmed against program judging rubric
- [ ] Handoff document on season-end checklist

---

## Related pages

- [Engineering Notebook Guide](/guides/notebook-guide/) — how to write notebook entries that impress judges
- [FTC Engineering Portfolio](/guides/ftc-engineering-portfolio/) — what FTC judges look for in the Engineering Portfolio
- [Assessment Guide — All Programs](/for-educators/assessment-guide/) — teacher-facing assessment tools by program
- [Coaching Communication](/for-educators/coaching-communication/) — feedback frameworks for coach-student conversations
- [STEM Standards Alignment](/for-educators/stem-integration/) — aligning documentation to NGSS/CSTA requirements
