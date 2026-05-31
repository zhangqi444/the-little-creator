---
title: Curriculum Starter — 8-Week FTC Onboarding
description: An 8-week starter curriculum for a first-time FTC classroom or club, covering hardware orientation, FTC SDK programming, and a first Autonomous OpMode.
tags: [educators, curriculum, ftc, onboarding, ftc-sdk, programming]
audience: [teachers, coaches]
level: beginner
season: evergreen
---

:::note[Program scope]
This curriculum is for **FIRST Tech Challenge** teams using the **REV Control Hub** and **FTC SDK**. FLL coaches looking for a similar guide should see the [FLL Curriculum Starter](/for-educators/curriculum-starter/) instead.
:::

An 8-week starter curriculum for a brand-new FTC classroom or club. Designed for once-a-week, 90-minute sessions. Adapt freely — this is a skeleton, not a prescription.

## Assumptions

- **Audience:** Students ages 12–15, no prior robotics experience
- **Group size:** 8–15 students with one or two adult coaches/teachers
- **Hardware:** One REV Control Hub kit (or equivalent starter kit) per 3–4 students; gamepads available
- **Software:** FTC app installed on a Driver Station phone or tablet; laptop or tablet with a browser for OnBot Java
- **Time:** 8 sessions of 90 minutes each, once per week
- **Outcome:** By week 8, every student has written and run a working TeleOp OpMode and a basic Autonomous OpMode

If your context differs (more sessions, fewer kits, classroom vs. after-school, older students), use this as a base and adjust.

## Week-by-week

### Week 1 — Welcome & hardware tour

**Objective:** Students can identify the REV Control Hub, motors, servos, and sensors, and connect the hardware to the Driver Station.

- Welcome, introductions, group norms (emphasize Gracious Professionalism early)
- Hardware tour: REV Control Hub, Expansion Hub, motors (goBILDA, REV HD Hex), servos, encoders, battery, XT30 connectors
- Pair the Driver Station app to the Control Hub over Wi-Fi Direct
- First "win": push a button in the FTC app and see the robot's lights change or a motor twitch
- Assign reading homework: skim the [FTC SDK overview on ftc-docs.firstinspires.org](https://ftc-docs.firstinspires.org)

### Week 2 — FTC Blocks: first TeleOp

**Objective:** Students can write a simple TeleOp OpMode in FTC Blocks that drives the robot with a gamepad.

- Open OnBot Java/Blocks in a browser (no install needed — just the Driver Station IP)
- Tour the Blocks environment: OpMode lifecycle (init, loop), hardware map, telemetry
- Walk-through: create a tank-drive TeleOp with two DC motors
- Run it on the robot — expect wiring mistakes; troubleshooting is part of the lesson
- Discussion: what happens if you change the motor direction? What is setDirection(REVERSE)?

### Week 3 — Driving patterns & gamepad mapping

**Objective:** Students can program a mecanum-drive TeleOp and map multiple gamepad inputs to robot actions.

- Introduce mecanum drive: four wheels, strafe capability, X-drive math
- Walk-through: a basic mecanum TeleOp (axial, lateral, yaw inputs from left and right sticks)
- Add a second action: map a button (e.g., gamepad1.a) to a claw servo or arm motor
- Mini-challenge: drive around an obstacle course using mecanum strafing
- Discussion: what is the difference between DcMotor.setPower() and DcMotorEx.setVelocity()?

### Week 4 — Sensors & encoders

**Objective:** Students can read an encoder value and a distance sensor, and use them to move to a specific position.

- Encoder basics: ticks per revolution, setMode(RUN_TO_POSITION)
- Demo: drive exactly 24 inches using encoder counts
- Distance sensor (REV 2m / ultrasonic): stop before hitting a wall
- Color sensor: detect a colored marker on the floor
- Mini-challenge: drive forward until the distance sensor reads less than 10 cm, then stop

### Week 5 — Introduction to Autonomous

**Objective:** Students can write a LinearOpMode Autonomous that executes a timed sequence without driver input.

- Explain the match structure: 30-second Auto + 2:30 TeleOp; Auto is worth more points per action
- Introduce LinearOpMode vs OpMode: linear is easier to reason about for Autonomous
- Walk-through: drive forward 2 seconds, turn 90 degrees, drive forward 1 second (time-based first — simpler)
- Upgrade: replace timed moves with encoder-based moves from week 4
- Discussion: why does time-based Autonomous drift? What causes it?

### Week 6 — Autonomous with sensors & game strategy

**Objective:** Students can write an Autonomous OpMode that uses at least one sensor to make a decision.

- Add a camera or color sensor: detect a signal sleeve / team prop and go left, center, or right
- Build a short Autonomous routine targeting a real season mission (use a practice field if available)
- Discuss strategy: which two or three Auto actions score the most points? Do not try to do everything.
- Intro to the season's game manual: read the Autonomous period rules together
- End-of-session: each group runs their Autonomous twice and logs what happened

### Week 7 — Engineering notebook & Gracious Professionalism

**Objective:** Students understand what FTC judges evaluate and can begin maintaining an engineering notebook.

- Review the judging categories: Connect, Inspire, Think, Motivate, Design, Winning Alliance, Compass
- Walk through a sample engineering notebook page: date, problem, brainstorm, design, test, reflect
- Start the team's notebook — even if messy, today's entry counts as the first page
- Role-play a 2-minute pit presentation: "What does your robot do? How did you design that?"
- Discussion: Gracious Professionalism is part of the score — share an example of GP from weeks 1 through 6

### Week 8 — Scrimmage & reflection

**Objective:** Students run a full simulated match (Auto + TeleOp) and identify their top three priorities for the rest of the season.

- Set up the field (or a partial field layout) for a timed scrimmage
- Run Auto + TeleOp back-to-back for each group; one student acts as a timekeeper/referee
- Debrief: what scored? What did not? What broke?
- Group retrospective: write three "keep doing" and three "change" items on the whiteboard
- Decide together: what is the most valuable robot upgrade for the next two weeks?

## What this curriculum does not cover

- **Full Design/Build cycle** — building a competitive robot is its own multi-week effort; this curriculum uses a basic chassis throughout
- **Control Award / Impact Award** — the Think, Connect, Inspire, and Motivate awards each need dedicated preparation beyond these 8 weeks
- **Advanced programming** — Road Runner trajectory planning, FTCLib command-based, EasyOpenCV vision pipelines; introduce in weeks 9+
- **Alliance strategy** — relevant once you have a second robot to practice with; a week-10 topic

## Adapting

- **Shorter sessions (60 minutes):** Drop the mini-challenges in weeks 2 through 4 to homework; use session time for guided walk-throughs only.
- **Older students (15–18):** Move to Android Studio in week 3 and introduce Git-based version control. Skip FTC Blocks entirely if the group has prior Java experience.
- **Mixed experience levels:** Pair an experienced student with a newcomer each session. Experienced students reinforce their knowledge by teaching; newcomers get near-peer support.
- **No mecanum kit:** A tank drive chassis works for all weeks. Skip week 3's strafing content and replace with a second actuator (arm, elevator, claw) programming exercise.

## Related

- [FTC Programming Basics](/guides/ftc-programming-basics/) — The detailed programming reference to accompany weeks 2 through 6
- [FTC Awards Guide](/guides/ftc-awards/) — What judges look for and how to prepare
- [FTC Engineering Portfolio](/guides/ftc-engineering-portfolio/) — Notebook and documentation expectations
- [Lesson Plan Template](/for-educators/lesson-plan-template/) — Single-session format to flesh out each week
- [First FTC Tournament](/guides/first-ftc-tournament/) — What to expect at your qualifier
