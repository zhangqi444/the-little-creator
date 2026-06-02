---
title: Your Second VEX V5 Season — What to Do Differently
description: Practical changes returning VEX V5 / VRC coaches, mentors, and student leaders make in season two. Based on what rookie teams consistently get wrong in year one and right in year two.
tags: [vex-v5, vrc, coaches, returning, season-planning, robot-strategy, programming, judging]
audience: [coaches, teens, teachers]
level: intermediate
season: evergreen
---

Season one is about surviving the VEX Robotics Competition learning curve. Season two is about competing with intent. Here are the ten changes experienced VRC coaches and student leaders consistently make after their first year.

---

## 1. Open the engineering notebook on day one

Year one VRC teams often realise in November that their notebook is half-empty or retroactively filled. Year two teams open it at the first design meeting — before a single part is cut.

**What that looks like:**
- Date every entry and assign an author — judges check for ongoing team ownership
- Document *why* you made each design decision, not just *what* you built
- Photograph or sketch failed prototypes alongside successful ones — iteration evidence is what judges value most
- Link notebook entries to CAD revisions so the story is coherent from first sketch to final robot

The hardest habit to change: writing only when things go right. A page that says "swerve module was inconsistent under load — abandoned after two prototypes, reverted to tank with traction wheels — saved 4 hours of driver practice" is stronger evidence than a photo of a working swerve drive.

See [VEX Judging Prep](/guides/vex-judging-prep/) for exactly what judges look for in V5RC notebooks.

---

## 2. Scope the robot by expected value, not ambition

Year one teams try to build mechanisms for every scoring element. Year two teams map expected value before committing to any mechanism.

**The framework:**
1. List every scoring action with its point value
2. Estimate your realistic completion probability under tournament pressure
3. Multiply: expected value = points × probability
4. Cut low-value or high-complexity actions; commit build hours to the two or three highest-value repeatable actions

Year one coaches add new mechanisms the week before States. Year two coaches freeze the robot three weeks out and spend the remaining time drilling the existing mechanisms to reliability.

A robot that scores 80 points on three reliable cycles beats a robot that *attempts* 120 and averages 70. Consistency compounds across a 50-match season.

---

## 3. Plan autonomous from day one

Year one VRC teams treat Autonomous Bonus as something to address after the robot is "done." Year two teams write their first autonomous routine in the first two weeks of the season.

**Why it matters:**
- The Autonomous Bonus is worth 6–10 points depending on the game — often the margin in close matches
- A reliable autonomous routine (encoder + IMU heading-lock) makes the robot mechanically better: any slop in the drivetrain shows up in auto first
- Skills Challenge has its own separate ranking; a strong Autonomous Skills run can lift combined placement significantly

**Changes to make:**
- Build `driveStraight()` and `turnToHeading()` helper functions in week one so every route stays reliable as the game evolves
- Maintain at least two autonomous routines (near-side and far-side alliance start positions) from mid-season onward
- Treat each Skills run as competitive data — log scores and failure modes after every session

See [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) and [VEX V5 Robot Design Guide](/guides/vex-v5-robot-design/) for technical foundations.

---

## 4. Run driver practice as a structured session, not a free period

Year one drive teams grab the controller whenever the robot is "done." Year two drive teams schedule practice like an athlete schedules training.

**What structured driver practice looks like:**
- Minimum 50% of weekly meeting time allocated to driver practice from October onward
- Full field setup every session — partial fields build bad habits
- Time each cycle: count how many complete scoring cycles you can execute in 1:45
- Rotate roles during practice (Driver 1, Driver 2, Coach/Timer) so all three understand the full picture
- Run at least 10 simulated match starts — the first 15 seconds under pressure cause most year-one mistakes

The gap between "robot works" and "drive team is match-ready" is often a month of consistent practice. Year one teams close that gap in the final week.

---

## 5. Assign real student roles and stick to them

Year one teams often have one or two students who do everything and several who watch. Year two teams define roles that match skill level — and hold students to them.

**Example role structure for a 4–5 student VRC team:**
- **Lead programmer** — autonomous routines, driver-control tuning
- **Lead mechanical** — drivetrain and primary mechanism ownership
- **Notebook lead** — documentation and judging prep (not a consolation role)
- **Driver 1 / Driver 2** — dedicated driver practice, match strategy communication
- **Project manager** (optional) — meeting agenda, build calendar, tournament registration

Roles create accountability. A student who owns the autonomous code is more likely to fix a broken routine at 7 am before a tournament than one who helped write it.

---

## 6. Tell a design process story in judging, not a show-and-tell

Year one teams spend their pit interview describing the robot's features. Year two teams walk judges through their *decision-making process*.

**The shift:**
- "We have a four-bar lift that reaches 36 inches" → feature description
- "We prototyped a cascading lift and a four-bar. The cascading lift was faster but failed under load twice in a row. We switched to a four-bar because reliability mattered more to our strategy than peak speed." → process story

Judges for the Excellence Award and Design Award want to see that the team can identify a problem, explore options, make a reasoned decision, and iterate. The robot is evidence; the notebook is the story; the interview is the live defence of both.

Year two teams also practice answering hard questions: "What would you change if you rebuilt the robot?" "Walk me through a decision that didn't work out." "How do you split programming and mechanical work?"

See [VEX Judging Prep](/guides/vex-judging-prep/) for the full judging breakdown.

---

## 7. Use Skills Challenge as a development tool, not a bonus event

Year one teams enter the Skills Challenge as an afterthought. Year two teams use it as structured practice.

**Why Skills is valuable beyond the ranking:**
- Driving Skills: 1-minute autonomous drive-team control run — reveals every mechanical inconsistency
- Autonomous Coding Skills: 1-minute fully autonomous run — the purest test of sensor-driven code
- Skills rankings are separate from match rankings — a strong Skills performance can qualify for regionals or States independently
- Running a Skills attempt at every competition forces the team to assess real performance against documented goals

**Practical changes:**
- Enter all Skills attempts at every event, even when the robot is not at its best — the data is valuable
- Review Skills footage the day after each event; compare actual movement to intended path
- Set a Skills target score at season start and track progress in the notebook

---

## 8. Treat alliance selection as a strategic phase

Year one teams are surprised when alliance selection happens. Year two teams prepare for it like a match.

**How alliance selection works in VRC:**
- After qualification matches, the top 8 teams by ranking become alliance captains
- Each captain selects one partner from the remaining pool (best-to-worst rank order, declining is an option)
- A second round may follow depending on the event format

**What changes in year two:**
- Designate one student (usually the drive team coach) as the scouting lead
- Build a simple scouting sheet: team number, driver strength, scoring average, autonomous reliability, GP notes
- Identify your top 5 alliance targets by week 8 of the season — and talk to those teams before the event
- Know your own robot's weaknesses and look for partners who complement them (not just the highest-ranked available)
- If you are captaining: prepare a short pitch. If you are being selected: be approachable and honest about your robot's capabilities

Year one teams are picked. Year two teams are strategic about who they pick or align with.

---

## 9. Go to off-season events and scrimmages

Year one teams often attend only their qualifying event. Year two teams add at least one scrimmage or off-season event.

**Why it matters:**
- Tournament pressure (scorekeeper calls, malfunctions, noise) cannot be simulated in a meeting room
- Off-season events expose failure modes that never surface in practice
- Skills-only events and scrimmages exist in most regions — lower stakes, good reps

**How to find them:**
- RobotEvents.com — filter by your region and event type (scrimmage, off-season)
- Regional VEX coordinators often send emails about unofficial events — get on the mailing list

If your region has no scrimmages, consider hosting one with a nearby team. Two or three teams running practice matches for a Saturday is enough.

See [Your First VEX Tournament](/guides/first-vex-tournament/) and [VEX V5 Tournament Guide](/guides/vex-v5-tournament/) for the structure of competitive events.

---

## 10. Keep it student-led — and build the next drive team

Year one coaches are often more involved than they planned. Year two coaches are intentional about stepping back.

**The practical challenge:** when the robot does not work at 6 pm and the event starts at 8 am, adults feel the pull to take over. The fix is earlier, not faster — if students own their subsystems deeply by October, they can diagnose and fix problems independently in February.

**Succession planning:**
- If your drive team includes seniors, a second-year VRC team needs to train replacements by November
- Identify first-year members who can shadow the lead programmer or lead mechanical from the start
- Year two is a good time to invite younger students to watch or help at practice — future team members

The measure of a successful season is not the trophy. It is whether the students leave with skills they own.

---

## Quick reference: Year one vs year two

| Area | Year one (common) | Year two (better) |
|---|---|---|
| Engineering notebook | Retroactive or sparse | Opened day one, authored by students |
| Robot scope | Attempt everything | Prioritise by expected value |
| Autonomous | Added late | Planned from week one |
| Driver practice | Informal, infrequent | Scheduled, timed, role-based |
| Student roles | Fluid or implicit | Defined and accountable |
| Judging prep | Feature descriptions | Process story plus hard-question rehearsal |
| Skills Challenge | Afterthought | Structured development tool |
| Alliance selection | Reactive | Scouted and planned |
| Additional events | Qualifier only | Scrimmages and off-season events |
| Coach involvement | High by default | Intentionally reducing each month |

---

## Related guides

- [Your First VEX Tournament](/guides/first-vex-tournament/) — event-day structure and what to expect
- [VEX V5 Robot Design Guide](/guides/vex-v5-robot-design/) — drivetrain selection, mechanism design, motor budget
- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — encoder-based autonomous, IMU heading correction
- [VEX V5 Tournament Guide](/guides/vex-v5-tournament/) — competitive alliance format, scouting, pit strategy
- [VEX Judging Prep](/guides/vex-judging-prep/) — what V5RC judges look for and how to prepare
- [VEX Progression Guide](/getting-started/progression-guide/) — FLL to VEX IQ to VEX V5 to VEX U path
