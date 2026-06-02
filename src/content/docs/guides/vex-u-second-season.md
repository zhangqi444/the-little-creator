---
title: Your Second VEX U Season — What to Do Differently
description: Practical changes returning VEX U / VURC teams make in season two — from two-robot strategy and engineering documentation to autonomous coordination, alliance selection, and succession planning.
tags: [vex-u, vurc, coaches, returning, season-planning, robot-strategy, programming, judging, college]
audience: [coaches, teens, teachers]
level: intermediate
season: evergreen
---

Season one in VEX U is about learning that two robots, relaxed rules, and collegiate fabrication capability are simultaneously an opportunity and a trap. Season two is about competing with strategy. Here are the ten changes experienced VURC teams consistently make after their first year.

---

## 1. Open the engineering notebook on day one — with two-robot context

Year one VEX U teams often underestimate how much judges value engineering documentation at the collegiate level. Unlike V5RC, VURC judges expect a depth of analysis that reflects university-level engineering rigour — and they read notebooks closely.

**What changes in year two:**
- Start a new notebook volume at the first team meeting — before any CAD file is opened
- Every design entry states which robot it applies to (15-inch or 24-inch) and why
- Document failed prototypes as carefully as successful ones — a cancelled mechanism with measured failure modes is stronger evidence than a working one with no design justification
- Assign consistent notebook authors per subsystem so entries reflect real ownership, not a single student writing everything the week before the tournament

The two-robot structure gives you a natural organisational spine: one section per robot, plus a third section for coordination strategy (Autonomous timing, TeleOp hand-offs, Endgame synchronisation). Year two teams use that structure from day one.

See [VEX Judging Prep](/guides/vex-judging-prep/) for what VURC judges look for specifically.

---

## 2. Define each robot's role before designing either

Year one VURC teams build two versions of roughly the same robot — or let the two robots evolve independently without a coordination strategy. Year two teams start with role assignment.

**The two-robot coordination framework:**
1. After the game reveal, list every scoring action with its point value
2. Assign each scoring action to one robot (or explicitly make it shared)
3. Define the 15-inch robot's primary role (speed, agility, collection, small-zone access)
4. Define the 24-inch robot's primary role (power, reach, endgame positioning, high-goal scoring)
5. Identify the two or three highest-value **interactions** — moments in the match where both robots must coordinate

Year two teams freeze these role assignments at the end of week one and treat changes to robot scope the way a software team treats scope creep: justify it formally in the notebook before any build time is allocated.

A specialised robot that does two things reliably outperforms a generalist robot that attempts five things at 60%.

---

## 3. Write your Autonomous coordination plan in week two

Year one VURC teams treat the 15-second Autonomous Period as a bonus. Year two teams treat it as a phase that their two-robot structure can win when others cannot.

**Why Autonomous matters more in VEX U:**
- VURC gives you both alliance robots — you coordinate your own Autonomous without relying on a partner
- Autonomous Win Point often decides close matches and affects qualification ranking
- Two coordinated robots can clear more field zones in 15 seconds than any V5RC alliance can

**What changes in year two:**
- Write `driveStraight()` and `turnToHeading()` helpers (using IMU + encoder) in week one for both robots
- Draft the Autonomous route for each robot in week two — before any mechanism is prototyped
- Run Autonomous tests on the actual field or a measured proxy from week three onward
- Maintain separate near-side and far-side routine variants for each robot — alliance pre-match coordination requires flexibility

See [VEX U Programming Basics](/guides/vex-u-programming-basics/) for PROS Autonomous patterns and two-robot timing strategies.

---

## 4. Schedule structured driver practice from October, not December

Year one VURC teams get the robots working by November and then improvise driver practice in the final weeks. Year two teams build driver practice into every meeting from October.

**What structured VURC driver practice looks like:**
- Two pilots and one drive-team coach per robot — assign these roles permanently by mid-October
- Full field setup (or the closest approximation your space allows) every session
- Time each robot's cycle independently first, then run coordinated two-robot sessions
- Run simulated match starts at least 10 times before the first tournament — match pressure causes breakdowns that rehearsal catches early
- One team member acts as a neutral observer and records: cycle time, missed attempts, coordination failures, anything unexpected

The coordination gap — where both robots are on the field simultaneously but not working together — is the hardest failure mode to catch in solo practice. Only full two-robot sessions reveal it.

---

## 5. Assign explicit roles across both robots and documentation

Year one VURC teams have informal ownership: whoever built a subsystem also programs it, fixes it, and presents it to judges. Year two teams formalise roles across the full team.

**Example structure for a 6–10 student VEX U team:**
- **15-inch robot lead** — mechanical design, build ownership, performance metrics
- **24-inch robot lead** — mechanical design, build ownership, performance metrics
- **Software lead** — Autonomous coordination code, TeleOp driver tuning, PROS task structure
- **Notebook lead** — documentation standards, judge preparation, per-entry consistency across both robots
- **Drive team** — two pilots plus drive-team coach; dedicated practice from October
- **Engineering lead / PM** — meeting cadence, build calendar, RobotEvents registration, scrimmage logistics

Roles matter more in VEX U because the scope is double what a V5RC team manages. Without explicit ownership, things fall through the gap between the two robots.

---

## 6. Tell a two-robot process story in judging, not a feature tour

Year one VURC teams walk judges through each robot's mechanisms. Year two teams walk judges through their *decision-making process* — and frame it around the challenge of two-robot design.

**The shift:**
- "The 24-inch robot has a cascading lift that reaches 48 inches" → feature description
- "We considered a cascading lift for the 24-inch robot but measured 8% match-condition failure under lateral load. We switched to a four-bar with a hard stop — slower at peak but reliable across 15+ consecutive match simulations. The 15-inch handled the fast cycling so the 24-inch could prioritise reliability over speed." → process story

Judges at VURC expect engineering rigour: data, trade studies, documented failures, iteration loops. The two-robot structure gives you twice the design decisions to discuss — use that as an asset, not a source of confusion.

**Practice questions to prepare for:**
- "Walk me through a trade study that changed the outcome of your design."
- "How did you divide work between the two robots, and when did you have to change that plan?"
- "What would you rebuild first if you had another four weeks?"

See [VEX Judging Prep](/guides/vex-judging-prep/) for the full VURC judging breakdown.

---

## 7. Use Skills Challenge runs as coordinated data collection

Year one VURC teams treat Skills runs as competitive bonus attempts. Year two teams use them as structured data-collection sessions for both robots.

**Why Skills runs are especially valuable in VEX U:**
- Driving Skills (60 seconds, manual control) reveals mechanical inconsistencies in each robot independently
- Autonomous Coding Skills (60 seconds, fully autonomous) is the most direct test of your Autonomous code quality
- Skills rankings are separate from match rankings — a strong combined Skills score can qualify for additional events
- You run both robots' Skills attempts: four runs per event (Driver + Auto per robot)

**What changes in year two:**
- Log scores and failure modes after every Skills attempt in the notebook
- Review drive footage the day after each event — compare actual movement to intended path
- Set a combined Skills score target at season start and track it across events

A team that uses Skills as disciplined testing accumulates more engineering data in 10 events than one that does not log anything.

---

## 8. Scout and plan alliance selection — for a four-robot field

Year one teams are surprised when alliance selection happens. Year two teams prepare for it specifically in the VEX U context: elimination rounds have **four robots on the field** — two from each alliance — and your two robots plus your partner's two must work as a coherent system.

**What is different about VEX U alliance selection:**
- You bring two robots; your partner brings two — you are selecting a four-robot system, not a two-robot one
- Look for partners whose robots complement your two, not just a team whose total score is high
- A partner with a strong 15-inch robot pairs better with a team whose 24-inch handles power tasks, and vice versa

**Changes to make:**
- Designate a scouting lead who watches every other team's matches, not just the top seeds
- Track each team's individual robot strengths (not just combined score)
- Identify your top 3 alliance targets before eliminations — talk to those teams before alliance selection begins
- If you are captaining, prepare which of your four available robots (your two plus partner's two) covers each game element
- If you are being selected, be ready to describe your robots' roles honestly — clarity wins selection rounds

Year two teams treat alliance selection as a design exercise, not just a social one.

---

## 9. Attend at least one scrimmage or off-season event

Year one VURC teams often compete in only their qualifying event. Year two teams add at least one scrimmage — and understand why that matters more for VEX U than for lower-division programs.

**Why off-season reps matter more in VEX U:**
- Two robots means double the failure modes under tournament conditions
- The coordination failure mode (both robots on field, not working together) only appears under match pressure
- Two-robot Autonomous has never been stress-tested until it runs on an unfamiliar field with a scorekeeper watching

**How to find events:**
- [RobotEvents.com](https://www.robotevents.com) — filter by VEX U and your region; check scrimmage and off-season categories
- VEX U communities (VEX Forum VEX U section, r/vexu) often coordinate informal scrimmages between nearby universities
- Some regional VEX coordinators host combined V5RC + VEX U scrimmage days

If your region has no events before your qualifier, consider hosting a two-team practice day — even one other VURC team on a shared field produces tournament conditions you cannot replicate in a lab.

---

## 10. Build succession and keep it student-led

Year one VURC teams often carry knowledge in one or two students who graduate after the season. Year two teams build succession deliberately.

**The VEX U-specific challenge:**
- University students graduate — a 4-year team has complete roster turnover
- If the lead programmer and lead mechanical are both seniors, the team may need to rebuild from near-zero
- Year two is the right time to identify the students who will lead year three — and give them real ownership this season

**Succession practices:**
- By October of year two, every senior leads a first- or second-year student in their subsystem
- The notebook lead ensures all design decisions are documented clearly enough for a new reader to follow
- Drive team adds a training pilot alongside the primary pilots — two people understand every robot's quirks
- At the end of season two, write a brief "team state document": what worked, what didn't, where the robots stand mechanically, and what the next team should build on

Year two is also a good time to formally structure the team as a persistent university club (if not already) — club status enables ongoing funding access, storage rights, and faculty mentor continuity across graduation cohorts.

The measure of a successful VEX U team is not the trophy from year two. It is whether year three's team can hit the ground running.

---

## Quick reference: Year one vs year two

| Area | Year one (common) | Year two (better) |
|---|---|---|
| Engineering notebook | Sparse or retroactive; one robot per volume | Opened day one; structured by robot and system |
| Robot roles | Two similar robots or undefined split | Roles assigned before design begins |
| Autonomous | Written late, one routine per robot | Written in week two; coordinated multi-route plans |
| Driver practice | Informal, starts late | Scheduled and timed from October; full two-robot sessions |
| Team roles | Informal ownership | Explicit leads for each robot, software, notebook, drive team |
| Judging prep | Feature tour of each robot | Two-robot process story with trade studies and data |
| Skills runs | Bonus attempts | Structured data collection; logged per robot |
| Alliance selection | Reactive | Four-robot scouting; targets identified before eliminations |
| Off-season events | Qualifier only | At least one scrimmage; two-robot match pressure exposed early |
| Succession | Knowledge in seniors | First-/second-years shadowing leads from October |

---

## Related guides

- [Starting a VEX U Team](/guides/vex-u-first-team/) — first-month checklist and setup
- [VEX U Robot Design Guide](/guides/vex-u-robot-design/) — two-robot sizing strategy, drivetrain choice, mechanism engineering
- [VEX U Programming Basics](/guides/vex-u-programming-basics/) — PROS C++, two-robot Autonomous coordination strategies
- [Your First VEX Tournament](/guides/first-vex-tournament/) — event structure and what to expect on the day
- [VEX Judging Prep](/guides/vex-judging-prep/) — what VURC judges look for and how to prepare
- [VEX U Resource Map](/resources/vex-u-resource-map/) — RECF VURC page, PROS docs, VEX Forum VEX U section, and more
