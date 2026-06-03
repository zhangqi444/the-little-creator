---
title: FLL Robot Strategy Guide
description: How to analyse the FLL game board, prioritise missions, and build a run strategy that maximises your score reliably — not just on a good day.
tags: [fll, robot-game, strategy, missions, scoring, coaches, teens]
audience: [students, teens, coaches]
level: intermediate
season: evergreen
---

The FLL robot game rewards strategy as much as engineering. A team that completes 5 missions reliably will almost always outscore a team that attempts 10 missions inconsistently. This guide covers how to analyse the game, choose your missions, and build a strategy around what your robot can actually do.

:::note[Season-specific missions]
This guide covers the *process* of building strategy — it applies to every season. For the specific missions, point values, and rules for the current season, read the [official Robot Game Rule Book](https://www.firstlegoleague.org/season). That document is the only authoritative source for scoring.
:::

## Step 1 — Understand the scoring structure

Before strategising, understand how points work in your season:

- **Mission points** — Each mission has a defined point value (varies by season; typically 20–100 points per mission)
- **Precision tokens** — Some seasons award bonus points for completing a mission without disturbing specific elements
- **End-state bonuses** — Some seasons award points for the robot's final position (e.g., returning to base, touching a specific zone)
- **Penalties** — Leaving items outside designated areas, touching the field during a run, or violating rules costs points

Read the Rule Book carefully. Scoring rules have edge cases that matter — a mission that looks worth 30 points may actually score 0 if a condition isn't met.

## Step 2 — Map all missions

Make a simple table of every mission in the current season:

| Mission | Max points | Difficulty (1–5) | Distance from base | Notes |
|---|---|---|---|---|
| Mission A | 50 | 2 | Short | Reliable; always attempt |
| Mission B | 30 | 4 | Far | Complex attachment needed |
| ... | | | | |

Rate difficulty honestly, based on your team's current capability — not how hard you think it *should* be. A mission that always works is worth more than a high-value mission that works 50% of the time.

## Step 3 — Calculate expected value

**Expected value = point value × success rate**

A 60-point mission your robot completes 50% of the time is worth 30 expected points.
A 25-point mission your robot completes 95% of the time is worth 23.75 expected points.

The 25-point mission is almost as valuable — and much more predictable at a tournament.

Track your success rate during practice. Run each mission 10 times and count how many succeed. That's your success rate.

| Mission | Points | Practice success rate | Expected value |
|---|---|---|---|
| Mission A | 50 | 90% | 45 |
| Mission B | 60 | 50% | 30 |
| Mission C | 25 | 95% | 23.75 |

Prioritise by expected value, not raw point value.

## Step 4 — Plan your runs

Most FLL teams make 3 robot match runs per tournament. You don't need to run the same missions every run — you can have a primary run (your best, most reliable missions) and a secondary run (attempt higher-risk missions in run 2 or 3 if run 1 goes well).

**Common run structures:**

### Conservative structure (recommended for first-year teams)
- **All 3 runs:** Same set of reliable missions. Optimise for consistency. Goal: post the same score three times.

### Progressive structure (recommended for second-year+ teams)
- **Run 1:** Core reliable missions only. Get a safe score on the board.
- **Run 2:** Core missions + one new/harder mission. Try to improve.
- **Run 3:** Full attempt — everything you can do. Use runs 1 and 2 learnings.

### Experimental structure (for competitive teams)
- **Run 1:** Standard reliable missions.
- **Run 2:** Attempt a specific tweak identified from Run 1 results.
- **Run 3:** Best possible combination based on what worked in runs 1 and 2.

The key rule: **your highest single score counts**, not the sum. So run 1 being conservative costs you nothing — it only helps by putting a score on the board early.

## Step 5 — Optimise run order

The order you complete missions within a run matters for several reasons:

### Proximity and path efficiency

Group missions geographically. Going to the far end of the mat and back twice wastes time. Plan a path that minimises total distance traveled.

Draw the field on paper. Mark your starting position. Draw a path through your intended missions in order. Look for obvious inefficiencies (crossing the same area twice, unnecessary backtracking).

### Attachment sequencing

If your robot uses multiple attachments, plan which missions require each attachment. You need to:
1. Return to base to change attachments (most rules require this)
2. Minimise the number of attachment changes per run (each takes time and introduces a potential failure point)

Group missions that use the same attachment together.

### Risk management within the run

Put your most reliable missions first. If the robot fails mid-run, you still have those points. Don't structure a run where you need to complete mission 5 before any points are secured.

### Time management

FLL matches are typically 2:30 long. Know how long your run takes in practice. Build in margin — a run that takes exactly 2:29 in practice will frequently run over at a tournament (setup nervousness, slightly different mat friction).

If you're regularly running out of time, cut a mission rather than rushing all missions.

## Step 6 — Define "good enough" and "reach" missions

Classify every mission in your strategy:

**Must-haves:** Missions your run always includes. These are your floor score. Never cut them for something speculative.

**Fillers:** Missions that are on the path to your must-haves and easy enough to do along the way. Include them if time permits.

**Reaches:** Missions you attempt only if everything else goes well and time permits. High value, lower reliability.

A clear classification prevents the common mistake of cutting a reliable mission to "make room" for a high-value but unreliable one.

## Common strategic mistakes

| Mistake | Effect | Fix |
|---|---|---|
| Chasing max score at expense of consistency | High variance — sometimes great, often disappointing | Prioritise expected value over peak value |
| Not returning to base for attachment changes | Penalty or rule violation | Always plan attachment changes as a base return |
| Run order that doesn't match the robot's capability | Earlier failures cascade; later missions also fail | Put most reliable missions first |
| Not tracking success rates | Can't make data-driven decisions | Log every practice run; 10 attempts = baseline rate |
| Changing strategy right before a tournament | New problems, not enough practice reps | Lock your run 1 week before the tournament; only tweak run 2/3 |
| Trying to fix three things between runs | Introduces new problems | Fix one thing per inter-run break |

## Building your strategy document

Keep a simple one-page strategy document your whole team can read and understand. It should include:

1. Your ranked mission list (expected value order)
2. Your run 1 mission sequence (with path sketch)
3. Your run 2/3 adjustments
4. Attachment plan (which missions use which attachment)
5. Time budget (estimated seconds per mission)

Review and update it after each practice session.

## What to do when the robot fails mid-run

When something goes wrong during a match run:

1. **Don't panic.** Stay at the table and assess.
2. **Note the failure point** — mental note is fine, write it down after.
3. **Can you salvage remaining missions?** If the robot is still functional and in a usable position, continue.
4. **If the robot can't continue,** walk away calmly. Your score is whatever completed before the failure.

After the run, in the pit: "What was the one failure? What's one thing we'll change for run 2?" Keep it small and focused.

## Where to go next

- [Robot Programming Basics](/guides/robot-programming-basics/) — writing the programs that execute your strategy
- [Intermediate Python for FLL Robots](/guides/python-intermediate/) — mission selector patterns and consistent robot control
- [Tournament Day Checklist](/guides/tournament-day-checklist/) — applying your strategy on competition day
- [Season Planning](/guides/season-planning/) — when in the season to focus on strategy vs. building vs. Innovation Project
