---
title: Your First Four Weeks as an FRC Mentor
description: A week-by-week action plan for brand-new FRC mentors and coaches. What to do, what to build, how to split the work, and what to skip in your first month.
tags: [frc, getting-started, first-year, coaches, teens, week-by-week]
audience: [coaches, parents, teens]
level: beginner
season: evergreen
---

You just agreed to mentor or help lead an FRC team. You have a group of high-school students, a pile of hardware, and a vague sense that there's something called Kickoff in January. This guide tells you what to do in the first four weeks — no FRC experience required.

The goal by week 4: your team is meeting regularly, students have built a basic drivetrain and driven it in code, and you have a rough plan for how the six-week build season will unfold.

:::note[FRC build season timing]
FRC runs on an unusual annual calendar: **Kickoff** is the first Saturday of January, then teams have **six weeks** to build a robot before it ships or is bagged. This guide assumes you are working with an established or brand-new team in the weeks or months *before* your first Kickoff. If Kickoff has already happened, use this guide as a catch-up framework and compress accordingly.
:::

---

## Before week 1: the three things you actually need

1. **A registered team** — register at [my.firstinspires.org](https://my.firstinspires.org). FRC team registration costs more than FLL or FTC (typically $6,000 USD for a new team including the Kit of Parts); many teams fundraise or apply for grants. See [Team Funding](/guides/team-funding/) for strategies.
2. **The Kit of Parts or equivalent hardware** — FIRST ships the Kit of Parts after Kickoff. Before Kickoff, a practice chassis (kit-of-parts drive base from a prior year, or a COTS chassis) is enough to start. At minimum you need one roboRIO, a Power Distribution Hub, motor controllers, and drive motors.
3. **WPILib installed** — download the all-in-one WPILib installer from [docs.wpilib.org](https://docs.wpilib.org). It includes VS Code, the Java JDK, Shuffleboard, and all required tooling. Install it on at least two laptops before your first session.

You don't need to understand the game before week 1 — you won't even see the game until Kickoff day.

---

## Week 1: First meeting — team culture and expectations

**Goal:** Team meets (or re-meets), you establish roles and norms, everyone understands the FRC season structure.

**What to do:**

- Introduce yourself: background, why you're here, what FRC is about — Gracious Professionalism is a real concept; say it explicitly
- Go around the room: each student says their name, one skill they bring (mechanical, code, writing, strategy, art), and one thing they want to accomplish this season
- Walk through the FRC season calendar together:
  - Kickoff (January) → 6-week build → ship/bag → events in spring → Championship
  - Students need to understand the deadline is *fixed and hard*
- Explain how FRC teams divide work — most teams run sub-teams: mechanical, electrical, programming, strategy/scouting, outreach/Impact. Ask students which tracks interest them.
- End with: "Next week we start building a drive base on our practice chassis"

**What NOT to do:**

- Don't try to explain the game — you don't know it yet (game is revealed at Kickoff)
- Don't finalize team roles yet — you need a few sessions to see who's good at what
- Don't spend the first meeting on paperwork — safety training is important but save it for a dedicated session

**What to tell anxious students or parents:**
> "Week 1 is orientation. We won't know the real robot challenge until Kickoff — right now we're learning the tools and the team so we're ready when that day comes."

**Takes about:** 90 minutes.

---

## Week 2: Build a practice drive base

**Goal:** Students build a functional drivetrain on a practice chassis — mechanical and electrical tracks working in parallel.

FRC robots almost always use a **West Coast tank drive** (also called a WCD or kitbot) or **swerve drive** (advanced). For a brand-new team, tank drive on the kit-of-parts chassis is the right starting point. Swerve is powerful but adds complexity you don't need in your first season.

**What to do:**

- Divide students into three tracks — you'll rotate them later:
  - **Mechanical track:** Assemble or verify the practice chassis; mount motors and gearboxes; attach wheels. Use the WPILib kit-of-parts assembly guide or Andy Mark's WCD assembly instructions.
  - **Electrical track:** Mount the Power Distribution Hub and roboRIO to the chassis frame; run battery cable; wire motor controllers (Spark MAX / Talon SRX) to the PDH; crimp Anderson connectors if needed.
  - **Programming track:** Open WPILib VS Code; create a new TimedRobot Java project; connect a laptop to the roboRIO over USB; confirm comms in the FRC Driver Station app.
- End of session: robot is physically assembled, roboRIO powers on, Driver Station shows "Robot Code: No Code" (that's fine — week 3 fixes it)

**Coaching move:** The electrical sub-team needs the most direct mentor oversight — battery + power distribution is where mistakes become expensive or dangerous. Stay close. Mechanical and programming can self-direct more.

**Safety note:** Establish your enable/disable protocol before any motion. All students must know how to press **Spacebar** to emergency-stop the Driver Station. This is non-negotiable before the robot moves.

**Common problems:**

| Problem | Fix |
|---|---|
| roboRIO won't appear in Driver Station | Check team number in Driver Station matches roboRIO team number; use USB tether (not Wi-Fi) for first connection |
| Motor controller LEDs solid red / blinking fast | Motor controller not configured yet; use REV Hardware Client (Spark MAX) or Phoenix Tuner X (Talon) to flash firmware and assign CAN IDs |
| CAN bus not detected | Verify the CAN chain from PDH → first controller → second controller → back to PDH; one missing connection breaks the whole chain |
| Chassis wobbles badly | Check wheel axle collars are tightened; check gearbox bolts are torqued |

**Takes about:** 2–3 hours. The first electrical assembly session always runs long.

---

## Week 3: Make the robot drive

**Goal:** Students write a TeleOp program, deploy it to the roboRIO, and drive the robot with a gamepad.

**What to do:**

- Programming track: write a tank-drive TeleOp using DifferentialDrive and XboxController (see [FRC Programming Basics](/guides/frc-programming-basics/) for a working example):
  - Left stick Y axis → left side motors
  - Right stick Y axis → right side motors
  - Add a `SmartDashboard.putString("Status", "TeleOp Running")` line so you can confirm code is running
- Deploy with **WPILib: Deploy Robot Code** → `Build Successful` → enable in Driver Station
- Drive the robot. It will drive badly. That's fine — you're testing the control loop, not perfecting it.
- Mechanical + electrical track: watch the first drive, identify what wobbles, what rattles, what looks unsafe. Fix it.
- Meanwhile — you, in the background: read the **Impact Award** criteria in the FRC season manual (available at [firstinspires.org](https://www.firstinspires.org) under FRC resources). The Impact Award is the highest award in FRC. Winning it requires a year of documented community outreach — teams that start their story in week 3 have a massive advantage over teams that start in October.

**Coaching move:** When the robot drives wrong (it will — a motor inverted, a CAN ID wrong), resist diagnosing it yourself. Ask: "What do you think is happening mechanically/electrically/in code?" Then let them debug.

**Takes about:** 2 hours.

---

## Week 4: Divide the work — four tracks, all at once

**Goal:** Establish parallel work tracks and give every student a meaningful role before Kickoff.

FRC teams run on structured sub-teams. By week 4 you'll have a sense of who's good at what:

| Sub-team | What it does | Who tends to enjoy it |
|---|---|---|
| Mechanical | CAD, fabrication, assembly, maintenance | Students who like building and making things |
| Electrical | Wiring, crimping, CAN bus, pneumatics | Detail-oriented students; often overlaps with programming |
| Programming | Robot code (Java/C++/Python), autonomous, vision | Students who like coding, logic, problem-solving |
| Strategy + Outreach | Impact Award prep, scouting, alliance strategy, community partnerships | Students who like writing, presenting, people |

**What to do:**

- Explain all four sub-teams in plain language — emphasise that strategy + outreach is as important as the robot. The Impact Award is a full-year project, not a form you fill out in January.
- Ask: "Which of these sounds most interesting to you?"
- Form rough sub-teams — typically 4–8 on mechanical, 2–4 on electrical, 2–4 on programming, 2–4 on Impact/outreach (people can overlap)
- Open a Google Doc or shared folder RIGHT NOW and label it "Impact Award — [Team Number] — [Season Year]". Write today's date. Record what community activities the team has done this year. This is day one of your Impact story — starting it now is a significant advantage over teams that start in November.
- Set goals for each sub-team for the next four weeks leading up to Kickoff: what do they want to have practiced, learned, or built before the game is even revealed?

**Coaching move:** The Impact Award is NOT something you do at the end. Make this explicit. Teams that document their community engagement as they go, month by month, have compelling, specific stories. Teams that reconstruct it in December have vague, forgettable ones.

**Takes about:** 90 minutes — the conversation about roles and community engagement is worth slowing down for.

---

## Between week 4 and Kickoff: what to practice

If you have weeks between your first sessions and Kickoff, use them to:

- **Practice driving** — driver practice on any available field element (even a flat floor with tape lines) builds muscle memory that matters at competition
- **Practice programming** — encoder-based autonomous (drive forward 2 m, stop) is a skill the programming sub-team should own before Kickoff; [FRC Programming Basics](/guides/frc-programming-basics/) walks through this
- **Practice mechanical iteration** — build something, break it, fix it, improve it. The build season is six weeks of compressed iteration; teams that have practiced the loop before Kickoff adapt faster
- **Research Impact** — look at winning Impact submissions from prior years ([Blue Alliance](https://thebluealliance.com) has award history); understand what a compelling community story looks like
- **Visit a fall/off-season event** — many regions run off-season events in October or November. Attending as spectators before your first competition as participants is invaluable

---

## After Kickoff: what changes

Kickoff day is its own experience — watch the game reveal live, read the manual, brainstorm game strategy together. The six-week build season that follows is highly compressed. Your team will need:

- **A sub-team structure that already works** — which is why you built it in the pre-season
- **A driving program that already runs** — your programmers aren't starting from zero on Kickoff Monday
- **An Impact story that already started** — your outreach sub-team has months of material, not days

For the full picture of what experienced FRC teams do differently, see the [FRC Second Season Guide](/guides/frc-second-season/).

---

## What you'll probably worry about (and whether you should)

| Worry | Reality |
|---|---|
| "We're behind other teams" | Veteran FRC teams have 10+ years of institutional knowledge. First-year teams are measured against each other. |
| "The robot isn't competitive yet" | At a qualifier, a reliable robot that does one thing consistently beats an ambitious robot that breaks. Focus on reliability. |
| "Nobody wants to do Impact/outreach" | Frame it as the path to the highest award in FRC — because it is. Show students winning Impact videos. The stories are genuinely moving. |
| "I don't know enough engineering" | You don't need to be the engineer. Your job is to keep sub-teams unblocked and on schedule. Ask questions; don't give answers. Experienced student leaders will emerge. |
| "Six weeks to build a robot seems impossible" | It is very fast. This is why the pre-season work in weeks 1–4 matters so much — your team arrives at Kickoff with a running chassis, not a blank slate. |
| "The game manual is 100+ pages" | You only need to understand 3–4 game elements deeply to be competitive at a district event or regional qualifier. Focus before you diversify. |

---

## The one thing most first-year FRC mentors miss

Start the Impact Award story on day one and keep adding to it every month.

Most first-year teams discover the Impact Award in December and scramble to reconstruct what their team did all year. Experienced teams treat the Impact submission as a living document — every community event, every school visit, every innovation project adds a chapter. Judges read the difference immediately.

You don't need an impressive robot at week 4. You do need an Impact story that started when the season did.

---

## Related

- [FRC Programming Basics](/guides/frc-programming-basics/) — WPILib TimedRobot, Command-based, encoder Autonomous
- [FRC Robot Design Guide](/guides/frc-robot-design/) — drivetrain selection, weight budget, mechanism principles
- [FRC Awards Guide](/guides/frc-awards/) — full list of FRC awards and what judges look for
- [FRC Judging Prep](/guides/frc-judging-prep/) — Impact session, pit interviews, Engineering Inspiration
- [Your First FRC Tournament — What to Expect](/guides/first-frc-tournament/) — multi-day event schedule, scouting, alliance selection
- [FRC Second Season Guide](/guides/frc-second-season/) — 10 changes returning mentors make in year two
