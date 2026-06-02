---
title: Your First Four Weeks as a VEX U Team Leader
description: A week-by-week action plan for students forming a new VEX U / VURC team at university. What to do, what to build, how to run meetings, and what to skip in your first month.
tags: [vex-u, vurc, getting-started, first-year, coaches, college, week-by-week]
audience: [coaches, teens, teachers]
level: intermediate
season: evergreen
---

You're starting a VEX U team at university. You have a group of engineering students (or you're looking for them), a general idea that VEX U involves two robots and a college competition, and a semester that is already filling up. This guide tells you what to do in the first four weeks — no prior VEX U experience required.

The goal by week 4: your team is registered, a faculty mentor is confirmed, hardware is on order, both robot roles are assigned, and an engineering notebook is open with week one already documented.

If you haven't yet, skim [What is VEX U?](/getting-started/what-is-vex-u/) and [Starting a VEX U Team](/guides/vex-u-first-team/) first — they cover eligibility, how VURC differs from V5RC, and the pre-registration checklist. This guide picks up from "you've committed to running a team."

:::note[Audience]
This guide is written for the **organising student or faculty mentor** — the person doing the actual work of forming the team. Most VEX U teams are student-led; faculty mentors take a supporting role.
:::

---

## Before week 1: three things you need before the first meeting

1. **University backing confirmed** — a faculty or staff mentor signed on, a club or department willing to sponsor you for liability and storage.
2. **A budget source identified** — VEX U requires two robot sets. Budget $2,000–$4,000 for V5 hardware to start (two Brains, motors, sensors, batteries, structural parts), more for custom-machined components. Common sources: engineering department discretionary, student government, dean's office, departmental sponsors.
3. **A meeting space with room to build** — a lab bench and floor space for a half field (roughly 6'×6' to start); a full 12'×12' VURC field once the robots are driveable. A makerspace corner is fine for the first few weeks.

None of these need to be fully resolved by day one — but having tentative answers on all three before your first meeting prevents mid-season surprises.

---

## Week 1: Register, recruit, read the manual

**Goal:** Team is officially registered, you have a starting roster, and everyone has read the season game manual.

**What to do:**

- **Register on [RobotEvents.com](https://www.robotevents.com)** under VEX U Robotics Competition. Provide university name, faculty mentor contact, and team contact. Registration is roughly $150 per team per season.
- **Recruit a starting roster** — 5–10 active students is a healthy starting point. Engineering, CS, math, and physics students are the obvious draws; product or business students can help with outreach awards.
- **Confirm your faculty mentor in writing** — they sign off on the registration and any safety/lab agreements. RECF requires a mentor for liability and emergency coordination.
- **Download the current [VURC game manual](https://recf.org/teams/competition/vex-u-robotics-competition/)** and the V5RC manual it supplements. Read both this week. The VURC addendum is short but critical — it spells out exactly what VEX U teams can do that V5 teams cannot (custom fabrication, more motors, pneumatics flexibility).
- **Watch the season reveal video together** — 5–10 minutes on YouTube; sets shared context and gets people excited.
- Hold a brief discussion: what does the game reward? Which actions score the most? What will take two robots to do efficiently?

**What NOT to do:**

- Don't order hardware yet — read the game manual first; different games incentivise very different designs.
- Don't assign permanent roles on day one — let roles emerge through weeks 2–3 as strengths become visible.
- Don't try to plan the full season in week 1 — orientation beats planning at this stage.

**What to tell anxious team members:**
> "Week 1 is about getting oriented together. Deciding what robots to build comes after we understand what the game actually rewards."

**Takes about:** 60–90 minutes.

---

## Week 2: Decide robot roles and order hardware

**Goal:** Both robots have assigned roles and hardware is on order.

VURC gives each alliance **two robots** — one 15-inch and one 24-inch. This is your competitive differentiator over V5RC, but only if the two robots are *designed together* from the start. Week 2 is when you make that decision.

**What to do:**

- After the game reveal analysis from week 1, answer two questions for the group:
  - What are the highest-value scoring actions? (list them with point values)
  - Which actions suit a fast, agile robot? Which suit a powerful, larger robot?
- **Assign each robot a role** — write it down:
  - **15-inch robot:** primary role (e.g., collection, agility, small-zone access)
  - **24-inch robot:** primary role (e.g., scoring high goals, endgame positioning, clearing zones)
- **Divide into two mechanical sub-teams** — one per robot. Each sub-team will own design, build, and driver practice for their robot throughout the season.
- **Order hardware** — a VEX V5 Competition Starter Kit per robot at minimum. See [VEX U Resource Map](/resources/vex-u-resource-map/) for purchasing links.
- **Set up development tools** — install [PROS](https://pros.cs.purdue.edu/) (recommended for VEX U; C++, multi-tasking, OkapiLib/LemLib support) on team laptops. See [VEX U Programming Basics](/guides/vex-u-programming-basics/) for the setup walkthrough.
- **Open the engineering notebook** — write today's date, document the game analysis, record the robot-role decision and the reasoning. This is your notebook's first entry.

**VEX U hardware note:** The VURC addendum allows custom-fabricated parts, more motors per robot, and expanded pneumatics. Don't design around these features in week 2 — start with V5 Smart Motors and standard VEX structural parts and add custom fabrication once the base design is working.

**Common problems:**

| Problem | Fix |
|---|---|
| Role debate isn't resolving | Write all proposed role assignments on a whiteboard; score each by "expected match contribution"; pick the highest-scoring pair |
| Can't find a faculty mentor | Your department chair or any hands-on engineering faculty is usually the fastest path — ask directly, it usually takes one email |
| Hardware budget not approved | A single starter kit for one robot lets you begin Week 3 builds; parallel-order the second once funding clears |

**Takes about:** 90 minutes.

---

## Week 3: Build drive bases and run first TeleOp

**Goal:** Both robots have working drive bases; every team member has driven at least one robot.

With roles assigned and hardware in hand (or at least part of it), week 3 is about getting wheels on the floor.

**What to do:**

- Each mechanical sub-team builds a basic **4-motor tank drive base** for their robot. Don't build full mechanisms yet — a chassis that drives is the only week 3 goal.
- Programming sub-team writes a basic TeleOp driver-control skeleton in PROS:

```cpp
// Minimal PROS TeleOp skeleton (one robot)
#include "main.h"

void opcontrol() {
    pros::Motor left_front(1, pros::E_MOTOR_GEARSET_06);
    pros::Motor left_rear(2, pros::E_MOTOR_GEARSET_06);
    pros::Motor right_front(3, pros::E_MOTOR_GEARSET_06, true);
    pros::Motor right_rear(4, pros::E_MOTOR_GEARSET_06, true);
    pros::Controller primary(pros::E_CONTROLLER_MASTER);

    while (true) {
        int power = primary.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y);
        int turn  = primary.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_X);
        left_front.move(power + turn);
        left_rear.move(power + turn);
        right_front.move(power - turn);
        right_rear.move(power - turn);
        pros::delay(20);
    }
}
```

- Push the program to each robot's Brain; let every team member drive both robots.
- Record observations in the notebook: how each robot moves, any issues, what needs adjusting.

**Why both robots in week 3:** Two-robot coordination is the hardest skill VURC teams develop. The earlier students experience driving both simultaneously, the earlier they start developing coordination instincts. You don't need polished robots for this — just two things that move.

**Takes about:** 90–120 minutes (longer if hardware assembly runs into issues — that's normal for week 3).

---

## Week 4: Divide the work — mechanisms, notebook, strategy

**Goal:** Parallel work tracks established; everyone has a clear role; notebook has four weeks of real entries.

By week 4 you have a sense of who gravitates toward what. VEX U teams typically work across four tracks simultaneously:

| Track | What it is | Who tends to enjoy it |
|---|---|---|
| Robot Game (mechanical) | Designing and building mechanisms for each robot | Students who like building, materials, fabrication |
| Robot Game (software) | PROS C++ autonomous routines, IMU paths, driver tuning | Students who like coding, control systems, algorithms |
| Engineering Notebook | Documenting every design decision across both robots | Students who like writing, organising, clear communication |
| Strategy and Scouting | Game analysis, match strategy, two-robot coordination, Skills Challenge | Students who like data, systems thinking, competitive planning |

**What to do:**

- Ask each team member which track they want to own. At this point, let people choose — forced assignments are less productive than genuine ownership.
- Assign explicit roles across both robots (see [VEX U Second Season Guide](/guides/vex-u-second-season/) for a role framework you'll grow into by year two).
- Open a planning document and write down what each sub-team is building, coding, or documenting in the next two weeks.
- Assign **Pilot 1 and Pilot 2** for each robot — the students who will drive their robot at competition. Start scheduling regular practice (even 20-minute drive sessions count in week 4).
- The notebook lead should consolidate entries from weeks 1–3 if they weren't written in the moment. Four weeks of real content before the first qualifier is achievable and valuable — judges notice.

**The most important thing to say this week:**
> "Judges at VEX U read notebooks the way engineering faculty grade lab reports — they expect a level of rigour that reflects university-level engineering. Every design entry should state *which robot* it's for, *why* that decision was made, and what alternatives were rejected. Start now. You can't reconstruct authentic process documentation after the fact."

**Takes about:** 90 minutes. The role-assignment conversation is worth taking time over.

---

## After week 4: what's next

By week 4, both robots are moving, roles are assigned, the notebook has real content, and you know when your first qualifier is. Here's the broad path:

- **Weeks 5–8:** Build first game mechanisms on each robot (per assigned roles); write IMU-based `driveStraight()` and `turnToHeading()` helpers; document every build decision in the notebook
- **Weeks 9–12:** Autonomous coordination — route planning for both robots simultaneously; first full two-robot match simulation; regular driver practice sessions
- **Weeks 13+:** Tournament preparation; pit crew and match-day roles; two-robot autonomous timing; notebook review; see [VEX Judging Prep](/guides/vex-judging-prep/) for VURC-specific judge prep

For a structured 8-week curriculum with session plans, see the [VEX U Curriculum Starter](/for-educators/vex-u-curriculum-starter/).

---

## Understanding what makes VEX U different

VEX U is not V5RC with more motors. The key differences that shape every week-one decision:

| Aspect | V5RC | VEX U |
|---|---|---|
| Robots per alliance | 2 (one yours, one partner's) | 2 (both yours) |
| Robot size limit | 18-inch × 18-inch | 15-inch OR 24-inch per robot |
| Motors per robot | 8 | No formal limit in VURC |
| Custom fabrication | No (VEX-legal parts only) | Yes — custom metal, 3D print, laser cut |
| Autonomous Period | 15 seconds | 15 seconds |
| TeleOp Period | 1 min 45 sec | 1 min 45 sec |
| Judging emphasis | Engineering notebook depth | Engineering notebook depth + collegiate rigour |
| Primary audience | Grades 8–12 | University students |

**Implications for your first four weeks:**

1. You coordinate your own Autonomous — no dependency on a partner you've never met. This is an advantage, but you need two working robots to rehearse it.
2. Both robots doing one thing each reliably is more effective than both robots trying to do everything.
3. The engineering notebook is the primary judged artifact across all VEX programs — in VEX U, judges expect university-level analysis depth (design matrices, engineering tradeoff reasoning, iteration cycles with measured outcomes).

---

## What you'll probably worry about (and whether you should)

| Worry | Reality |
|---|---|
| "We don't have a faculty mentor yet" | One email to a hands-on engineering or CS faculty member is usually enough. Most say yes when a student asks directly. You need the name on file, not active involvement every meeting. |
| "We can't afford custom fabrication" | You don't need it in weeks 1–4. Standard VEX V5 parts can build competitive robots. Custom fab is a year-two upgrade. |
| "Our robots can't coordinate yet" | Coordination comes from practice, not from clever code. Two driveable robots in week 3 is exactly where you should be. |
| "The software lead wants to use ROS" | PROS is the standard for VURC and has the best community support. For year one, standardise on PROS + LemLib. Explore ROS integration in year two if the team wants it. |
| "We're behind other teams" | Every experienced team looked like yours at week 4. Finish your first qualifier with two robots that don't break down — that is success. |
| "Nobody wants to do the notebook" | Show students the award criteria. The team that wins Excellence at VEX U documented their design process consistently. That is a fact, not a motivation speech. |

---

## The one thing most first-year VEX U teams miss

Start the engineering notebook at your very first meeting — with separate sections for each robot — and update it every single session.

Most first-year teams treat the notebook as optional documentation to write near the tournament. VURC judges read notebooks the way engineering faculty grade project reports: they can immediately tell the difference between authentic in-progress documentation and a retroactive summary. Four weeks of real entries before your first qualifier puts your team ahead of most first-year competitors regardless of how polished the robots are.

---

## Related

- [What is VEX U?](/getting-started/what-is-vex-u/) — program overview, eligibility, and how VURC fits in the VEX family
- [Starting a VEX U Team](/guides/vex-u-first-team/) — pre-registration checklist, faculty mentor recruiting, hardware budget planning
- [VEX U Programming Basics](/guides/vex-u-programming-basics/) — PROS C++, OkapiLib/LemLib, TeleOp skeleton, two-robot autonomous coordination
- [VEX U Robot Design Guide](/guides/vex-u-robot-design/) — drivetrain selection, mechanism principles, two-robot strategy
- [VEX Judging Prep](/guides/vex-judging-prep/) — what VURC judges look for, notebook standards, pit interview strategies
- [VEX U Curriculum Starter](/for-educators/vex-u-curriculum-starter/) — structured 8-week session curriculum for a VURC collegiate team
- [VEX U Second Season Guide](/guides/vex-u-second-season/) — 10 changes returning VURC teams make in year two
