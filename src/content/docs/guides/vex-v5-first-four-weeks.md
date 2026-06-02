---
title: Your First Four Weeks as a VEX V5 Coach
description: A week-by-week action plan for brand-new VRC / VEX V5 coaches and mentors. What to do, what to build, how to run practices, and what to skip in your first month.
tags: [vex-v5, vrc, getting-started, first-year, coaches, teens, week-by-week]
audience: [coaches, parents, teens]
level: beginner
season: evergreen
---

You just agreed to coach a VEX V5 team. You have a group of teenagers (or middle schoolers), a VEX V5 kit, and a rough sense that there's a competition sometime this fall. This guide tells you what to do in the first four weeks — no VRC experience required.

The goal by week 4: your team is meeting regularly, students have built a drive base and driven it under remote control, started the engineering notebook, and have a rough map of the season ahead.

---

## Before week 1: the three things you actually need

1. **A registered team** — register at [robotevents.com](https://www.robotevents.com). Teams also need a RECF membership; the registration flow covers both.
2. **A VEX V5 kit** — at minimum a V5 Competition Starter Kit (V5 Brain, two V5 Smart Motors, V5 Controller, structural parts). See [VEX V5 Robot Design Guide](/guides/vex-v5-robot-design/) for hardware details.
3. **The current season game manual** — download free from [vexrobotics.com](https://www.vexrobotics.com/v5rc-current-game) after the season reveal (usually late April/early May). If the season hasn't launched yet, start with the Clawbot V5 build and the fundamentals.

You don't need to master the game before your first session. Your team will figure it out together.

---

## Week 1: First meeting — get oriented, not overwhelmed

**Goal:** Students meet each other, everyone touches the hardware, and you establish a basic working rhythm.

**What to do:**

- Introduce yourself: your background doesn't need to be robotics — just explain why you're there
- Go around the room: each student says their name, one thing they've built or coded before, and one goal for the season
- Watch the season reveal video together — it's usually 5–10 minutes on YouTube and sets shared context fast
- Open the VEX V5 kit: handle the V5 Brain, Smart Motors, and Controller; identify the main components
- End with a clear goal: "Next week we build a drive base and make the motors move"

**What NOT to do:**

- Don't try to read the game manual this session — save it for week 3 when there's a robot to test with
- Don't assign permanent sub-team roles yet — wait until you see who gravitates toward what
- Don't stress about missing parts — week 1 is orientation, not production

**What to tell anxious students or parents:**
> "Week 1 is about getting everyone in the same room and on the same page. A working robot is weeks away — and that's normal."

**Takes about:** 60–90 minutes.

---

## Week 2: Build a drive base and make it move

**Goal:** Students build a functional four-motor tank drive base and drive it with the V5 Controller.

VEX V5's classic starting point is the **Clawbot V5** — a four-motor tank drive with a claw attachment. Instructions are available free at [vexrobotics.com/clawbot-v5](https://www.vexrobotics.com/clawbot-v5). You don't need the full Clawbot — a simple tank drive base with four motors is enough for week 2.

**What to do:**

- Divide into **mechanical** and **programming** tracks — you'll rotate next week
- Mechanical track: assemble a four-wheel tank drive base (two motors per side, use the Clawbot chassis instructions or a community baseline)
- Programming track: download VEXcode Pro V5 (free) from [vexrobotics.com/vexcode](https://www.vexrobotics.com/vexcode); create a new project; configure the four drive motors in the Devices panel
- Connect the Brain via USB to push a basic **Driver Control** program: left joystick controls left motors, right joystick controls right motors
- First drive: let every student drive the robot at least once

**V5 motor configuration note:** V5 Smart Motors communicate over a smart serial bus, not analog. Always assign motor ports in the Devices panel before writing code. Reversing a motor's direction is a software checkbox — no wiring change needed.

**Common problems:**

| Problem | Fix |
|---|---|
| Brain won't appear in VEXcode | Use a USB-C cable directly to the Brain; check the Brain is powered on |
| Robot drives in circles | Check that left-side motors are reversed — tank drives need opposite spin directions on each side |
| Motor overheating warning | Normal during long first-week sessions; pause 30 seconds and resume |
| V5 Controller won't pair | Hold the Brain power button; hold the Controller link button; both screens should show "VEXnet Connected" |

**Takes about:** 90 minutes. This session often runs long — that's fine.

---

## Week 3: Explore the season game

**Goal:** Students understand what VRC events look like and attempt the first scoring element.

**What to do:**

- Set up a rough approximation of the competition field (tape lines on the floor work; a real field tile set is ideal)
- Read 2–3 game challenges from the game manual together — have students read aloud
- Identify the **simplest scoring element** and attempt it: drive to the object, interact with it, return to a starting position
- Don't try to score optimally yet — just complete the basic physical movement reliably

**The three VRC event types to explain:**

| Event type | What it is | Duration |
|---|---|---|
| Driver Skills | One robot, driver-controlled, no alliance partner | 60 seconds |
| Autonomous Skills | One robot, fully autonomous, no driver input | 60 seconds |
| Match Play | Two-robot alliance vs two-robot alliance (qualification + elimination rounds) | 15-sec Auto + 1 min 45-sec Driver |

**Coaching move:** Let students choose which game element to attempt first. Ownership beats instruction.

**Meanwhile, in the background (you, not the students):**

- Read the judging criteria: VRC has **Excellence Award**, **Design Award**, **Think Award**, and others — the Engineering Notebook is the primary judged artifact. Start one now.
- Check your region's qualifier schedule at [robotevents.com](https://www.robotevents.com) — VRC qualifiers typically run October through February.
- Note the **Autonomous Win Point**: completing a specific autonomous task earns your alliance a bonus Win Point each match. Teams with reliable autonomous gain a significant ranking advantage.

**Takes about:** 90 minutes.

---

## Week 4: Divide the work — robot, notebook, and strategy

**Goal:** Establish parallel work tracks and give every student a clear role.

VRC teams work on three areas simultaneously. By week 4 you'll have a sense of who gravitates toward what:

| Track | What it is | Who tends to enjoy it |
|---|---|---|
| Robot Game | Building mechanisms, programming Autonomous and TeleOp, drive practice | Students who like building, coding, problem-solving |
| Engineering Notebook | Documenting design decisions, recording experiments, drawing diagrams | Students who like writing, organising, explaining |
| Strategy and Scouting | Game analysis, match strategy, Skills Challenge planning | Students who like analysis, competition, systems thinking |

**What to do:**

- Explain all three tracks clearly — show students the award criteria and explain that the Engineering Notebook is how the Design Award and Excellence Award are won
- Ask: "Which track sounds most interesting to you?"
- Form rough sub-teams — typically 3–5 on robot, 1–2 on notebook, 1–2 on strategy (roles overlap; the notebook team still participates in builds)
- Open the engineering notebook **right now** — write today's date, record what you built this session, record *why* you made the decisions you made. This is page one. Starting at week 4 is already better than most first-year teams.
- Set a specific goal for each sub-team for next week

**The most important thing to say this week:**
> "The notebook is not a recap you write at the end of the season. It's the living record of your design process. Every meeting, every change, every failed experiment — it goes in the notebook. Judges can immediately tell the difference between a team that documented as they went and a team that filled it in the night before."

**Takes about:** 90 minutes. The conversation about roles and goals is worth the time.

---

## After week 4: what's next

By week 4, your team has a driving robot, a started notebook, and knows their roles. Here's the broad map:

- **Weeks 5–8:** Build the first game mechanism (intake, arm, or roller); start writing a first Autonomous Skills routine; document every build decision
- **Weeks 9–12:** Practice driving seriously (30+ minutes per session); run mock Skills Challenge runs; refine Autonomous Win Point routine; first full notebook review
- **Weeks 13+:** Tournament preparation; consistent Autonomous Win Point attempt; pit checklist; judging prep for the Engineering Notebook pit interview

For a structured 8-week curriculum with session plans, see the [VEX V5 Curriculum Starter](/for-educators/vex-v5-curriculum-starter/).

---

## Understanding the competition format

VRC is a **head-to-head** competitive format — alliances of two robots compete against opposing alliances. This is different from VIQRC (collaborative) and more like FTC or FRC. Key implications:

- **Reliability beats ambition** — a consistent 80-point robot beats a 120-point robot that breaks down
- **Autonomous matters a lot** — the Autonomous Win Point can decide rankings at a qualifier; practice it from week 5
- **Alliance selection is a real game** — at elimination rounds, the top teams pick their partners. Drive well, be easy to work with, and keep your robot consistent
- **GP counts** — VRC judges observe teams throughout the event; how students behave in the pit and during matches matters

See [Your First VEX Tournament](/guides/first-vex-tournament/) for the competition day structure and [VEX V5 Tournament Guide](/guides/vex-v5-tournament/) for V5RC-specific match strategy.

---

## What you'll probably worry about (and whether you should)

| Worry | Reality |
|---|---|
| "We're behind other teams" | You're comparing your week 3 to their week 15. Every strong VRC team looked like yours at week 3. |
| "Our Autonomous doesn't work consistently" | Start simple: drive forward, score one element, stop. Consistent beats ambitious at a qualifier. |
| "The students are arguing about the design" | Design disagreements are productive — coach them to evaluate options systematically rather than by who argues loudest. |
| "I don't know enough to coach this" | You don't need to be the engineer. Your job is to ask questions, keep the team moving, and make sure the notebook is kept up to date. |
| "Our robot can't score enough to be competitive" | At a first qualifier, finishing matches without a mechanical failure is a win. Reliability first, score second. |
| "Nobody wants to do the notebook" | Show students the award criteria. The team that wins the Design Award documented their work consistently. That's a fact, not a motivation speech. |

---

## The one thing most first-year VRC coaches miss

Start the engineering notebook at your very first meeting and update it every single session.

Most first-year teams treat the notebook as optional — something to complete before the tournament. Teams that win the Design Award and Excellence Award treat it as a daily habit: what was built, why that decision was made, what failed, what changed. Judges can read the difference immediately, and it's nearly impossible to reconstruct authentic process documentation after the fact.

You don't need a finished robot at week 4. You do need a notebook that already has four weeks of real design decisions in it.

---

## Related

- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — VEXcode Pro V5 Blocks, C++, and PROS intro; TeleOp and Autonomous skeleton
- [VEX V5 Robot Design Guide](/guides/vex-v5-robot-design/) — drivetrain selection, motor budget, mechanism design, Autonomous Win Point strategy
- [VEX V5 Tournament Guide (V5RC In Depth)](/guides/vex-v5-tournament/) — competitive alliance match format, scouting, alliance selection, pit strategy
- [VEX Judging Prep](/guides/vex-judging-prep/) — what V5RC judges look for and how to prepare the team
- [VEX V5 Curriculum Starter](/for-educators/vex-v5-curriculum-starter/) — structured 8-week session curriculum for a VRC classroom or club
- [VEX V5 Second Season Guide](/guides/vex-v5-second-season/) — 10 changes returning VRC coaches and teams make in year two
- [What is VEX V5?](/getting-started/what-is-vex-v5/) — overview of the V5RC program for new families
