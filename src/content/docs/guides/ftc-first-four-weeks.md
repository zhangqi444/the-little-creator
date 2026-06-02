---
title: Your First Four Weeks as an FTC Coach
description: A week-by-week action plan for brand-new FTC coaches and mentors. What to do, what to build, how to split the work, and what to skip in your first month.
tags: [ftc, getting-started, first-year, coaches, teens, week-by-week]
audience: [coaches, parents, teens]
level: beginner
season: evergreen
---

You just agreed to coach or mentor an FTC team. You have a group of teenagers, a pile of REV hardware, and a vague sense that there's a competition involved. This guide tells you what to do in the first four weeks — no FTC experience required.

The goal by week 4: your team is meeting regularly, students have built a basic drivetrain and made it move in code, and you have a rough plan for how the season will unfold.

---

## Before week 1: the three things you actually need

1. **A registered team** — register at [my.firstinspires.org](https://my.firstinspires.org) (or confirm your school/club already has a team number). Also check your regional FTC affiliate for local registration steps.
2. **The FTC Starter Kit or equivalent hardware** — at minimum a REV Control Hub, two drive motors, and REV Robotics structural parts. See [FTC Robot Design Guide](/guides/ftc-robot-design/) for what to order.
3. **The season game manual** — download free from [firstinspires.org](https://www.firstinspires.org) after Kickoff (usually September). If Kickoff hasn't happened yet, watch the reveal video together on day one.

You don't need to understand the game fully before your first meeting. The students will figure it out — your job is to keep them moving.

---

## Week 1: First meeting — get aligned, not overwhelmed

**Goal:** Team meets each other, you establish basic norms, everyone sees the game.

**What to do:**

- Introduce yourself: explain your background (engineering, teaching, parent, doesn't matter) and why you're here
- Go around the room: each student says their name, one skill they bring, and one thing they want to build
- Watch the season reveal video together — it's usually 5–10 minutes on YouTube and sets shared context fast
- Open the game manual together: flip to the Robot Game section, identify 2–3 missions, discuss roughly how you'd score them
- End with: "Next week we start building a drive base"

**What NOT to do:**

- Don't try to cover the whole game manual — it's 80+ pages and overwhelming
- Don't assign permanent roles or team captain yet — you don't know the team well enough
- Don't stress about not having all the parts yet — the first meeting is about alignment

**What to tell anxious students or parents:**
> "Week 1 is about seeing what we're working with. We won't have a real robot until week 3 or 4 — that's completely normal for FTC."

**Takes about:** 90 minutes.

---

## Week 2: Build a drive base

**Goal:** Students build a functional drivetrain and wire it to the Control Hub.

FTC robots almost always use **mecanum wheels** (which allow sideways strafing) or **tank drive** (simpler, slightly less flexible). Mecanum is more common in competitive FTC; for a first-year team, either works.

**What to do:**

- Divide students into **mechanical** and **programming** tracks — you'll rotate them later
- Mechanical track: build a 4-wheel chassis using the REV Starter Kit instructions or a community baseline (search "FTC mecanum drive base build guide" on YouTube)
- Programming track: install Android Studio or set up OnBot Java on a laptop; create a new OpMode and get it to compile with no errors
- End of session: motor wires plugged in, Control Hub powered on, basic connectivity test

**Coaching move:** Don't build it for them. Stand behind, ask questions, let them make decisions. Your job is to unblock, not to build.

**Common problems:**

| Problem | Fix |
|---|---|
| Control Hub won't connect to laptop | Confirm you're on the Hub's Wi-Fi network (SSID on the Hub label); go to `192.168.43.1:8080` in browser |
| Mecanum wheels spinning but not moving correctly | Check wheel orientation — each wheel's rollers should form an "X" when viewed from above |
| Motors not responding | Verify motor names in Robot Configuration match the names in your OpMode exactly (case-sensitive) |

**Takes about:** 2 hours. This session often runs long — that's fine.

---

## Week 3: Make the robot drive

**Goal:** Students drive the robot under remote control for the first time.

**What to do:**

- Programming track: write or adapt a TeleOp OpMode using the gamepad. For mecanum, the math is:
  - Left stick Y = forward/back
  - Left stick X = strafe left/right
  - Right stick X = rotate
  - See [FTC Programming Basics](/guides/ftc-programming-basics/) for a working code example
- Mechanical track: add bumper protection (zip ties and foam are fine), secure wiring with zip ties, make sure nothing will fall off under stress
- Combine: deploy TeleOp, drive the robot, break something, fix it. That's the loop.
- Meanwhile — you, in the background: read the Connect Award / outreach section of the game manual. Start thinking about community engagement.

**Coaching move:** When the robot drives badly (it will), resist fixing the code yourself. Ask: "What do you think is happening?" Then let them debug.

**Takes about:** 2 hours.

---

## Week 4: Divide the work — three tracks, all at once

**Goal:** Establish parallel work tracks and give every student a role.

FTC teams work on three things simultaneously. By week 4 you'll have a sense of who's good at what:

| Track | What it is | Who tends to enjoy it |
|---|---|---|
| Robot Game | Drive base, mechanisms, Autonomous, TeleOp | Students who like building and coding |
| Engineering Portfolio | Documenting the design process, photos, diagrams | Students who like writing, explaining, organising |
| Connect Award / Outreach | Community engagement, sharing STEM in the community | Students who like people, presenting, community work |

**What to do:**

- Explain all three tracks in plain language — show students the award list and explain which track feeds which award
- Ask: "Which of these sounds most interesting to you?"
- Form rough sub-teams — typically 3–5 on robot, 2–3 on Portfolio, 2–3 on Connect/outreach (people can overlap)
- Open the Engineering Portfolio document NOW. Add today's date. Record what you built and why you made the decisions you made. This is day one of your Portfolio — starting it now is a massive advantage over teams that start in November.
- Set specific goals for each sub-team for next week

**Coaching move:** The Portfolio is NOT something you do at the end. Make this explicit. Teams that document as they go win more awards.

**Takes about:** 90 minutes — the conversation about roles and goals is worth the time.

---

## After week 4: what's next

By the end of week 4, your team has a driving robot, a started Portfolio, and knows their roles. Here's the broad map:

- **Weeks 5–8:** Build your first game mechanism (intake, arm, or claw); start writing Autonomous; document everything
- **Weeks 9–12:** Practice driving seriously (30+ minutes per session); first mock judging session; refine the Engineering Portfolio structure
- **Weeks 13+:** Tournament preparation; consistent Autonomous; pit checklist; judging prep

For the full picture, see the [FTC Second Season Guide](/guides/ftc-second-season/) — it's written for returning teams but gives a useful preview of what experienced teams do from the start.

---

## What you'll probably worry about (and whether you should)

| Worry | Reality |
|---|---|
| "We're behind other teams" | You're comparing your week 3 to their week 20. Every strong team looked like yours at week 3. |
| "The robot isn't competitive yet" | A reliable, simple robot beats an ambitious, broken one. Consistency wins at qualifiers. |
| "Nobody wants to do the Portfolio" | Frame it as the path to awards — because it is. Show students the award criteria. |
| "The students are arguing" | FTC is a high-stakes team sport. Some conflict is healthy. Coach it, don't suppress it. |
| "I don't know enough engineering to help" | You don't need to be the engineer. Keep the team unblocked and on schedule. Ask questions; don't give answers. |
| "The game is too complicated" | You only need to understand 3–4 missions deeply to be competitive at a qualifier. Focus before you diversify. |

---

## The one thing most first-year FTC coaches miss

Start the Engineering Portfolio on day one and keep adding to it every session.

Most first-year teams treat the Portfolio as paperwork — something to fill out the week before the tournament. Experienced teams treat it as a living engineering log: every decision, every failure, every pivot. Judges read the difference immediately, and the Portfolio is the primary evidence for the Inspire Award (the top award in FTC).

You don't need a perfect robot at week 4. You do need a running Portfolio.

---

## Related

- [FTC Programming Basics](/guides/ftc-programming-basics/) — FTC Blocks, OnBot Java, and Android Studio entry points
- [FTC Robot Design Guide](/guides/ftc-robot-design/) — drivetrain selection, mechanism planning, motor budget
- [FTC Engineering Portfolio — Practical Guide](/guides/ftc-engineering-portfolio/) — structure, what judges look for, common mistakes
- [Your First FTC Tournament — What to Expect](/guides/first-ftc-tournament/) — qualifier day schedule and flow
- [FTC Judging Prep](/guides/ftc-judging-prep/) — how to prepare for the judging interview
