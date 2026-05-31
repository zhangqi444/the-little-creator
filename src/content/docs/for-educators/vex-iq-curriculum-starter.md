---
title: Curriculum Starter — 8-Week VEX IQ Onboarding
description: An 8-week starter curriculum for a first-time VEX IQ classroom or club, covering hardware orientation, VEXcode IQ programming, and a first autonomous routine.
tags: [educators, curriculum, vex-iq, viqrc, onboarding, vexcode, programming]
audience: [teachers, coaches]
level: beginner
season: evergreen
---

:::note[Program scope]
This curriculum is for **VEX IQ** teams using the **VEX IQ Brain** and **VEXcode IQ**. FLL coaches should see the [FLL Curriculum Starter](/for-educators/curriculum-starter/) instead. FTC coaches should see the [FTC Curriculum Starter](/for-educators/ftc-curriculum-starter/). FRC coaches should see the [FRC Curriculum Starter](/for-educators/frc-curriculum-starter/).
:::

An 8-week starter curriculum for a brand-new VEX IQ classroom or club. Designed for once-a-week, 90-minute sessions. Adapt freely — this is a skeleton, not a prescription.

## Assumptions

- **Audience:** Students ages 8–14, no prior robotics experience
- **Group size:** 8–16 students with one or two adult coaches/teachers
- **Hardware:** One VEX IQ kit (Brain, two Smart Motors, Controller, sensors) per pair of students; field tiles or a cleared table for driving
- **Software:** [VEXcode IQ](https://www.vexrobotics.com/vexcode) installed on student laptops or tablets (free download, no login required)
- **Time:** 8 sessions of 90 minutes each, once per week
- **Outcome:** By week 8, every student can drive a robot with the Controller, write a working Blocks program, and run a short Autonomous routine on a practice field

If your context differs (more sessions, only one shared kit, a library workshop), use this as a base and adjust.

## Week-by-week

### Week 1 — Welcome & hardware tour

**Objective:** Students can identify the VEX IQ Brain, Smart Motors, sensors, and Controller, and turn the robot on.

- Welcome, introductions, group norms — introduce *Teamwork* and *Sportsmanship* early (the VEX IQ Core Skills)
- Hardware tour: VEX IQ Brain (ports 1–12), Smart Motor, 2-Wire Smart Cable, IQ Controller, battery
- Physical safety: keep fingers away from gears and moving parts; enable/disable protocol with the Controller
- Build or unpack the Clawbot IQ (the default VEX IQ starter build — instructions at [vexrobotics.com/clawbot-iq](https://www.vexrobotics.com/clawbot-iq-1))
- First win: use the Controller in **Driver mode** to drive the robot across the table
- Assign take-home reading: skim the current [VIQRC game page](https://www.vexrobotics.com/viqc-current-game) so students know what the season looks like

### Week 2 — VEXcode IQ Blocks: first program

**Objective:** Students can open VEXcode IQ, create a Blocks program, and download it to the Brain.

- Open VEXcode IQ; tour the interface: the brain config panel, the Blocks palette, the print/download buttons
- Walk-through: create a simple *Drive for 200 mm, turn 90°, Drive for 200 mm* program using the **Drivetrain** category blocks
- Download to the Brain (USB or Bluetooth); run on the robot — expect the robot to go off-course and that is fine
- Discussion: what made it go crooked? Why does the robot not know its own position?
- Mini-challenge: program the robot to return to its starting square (2-metre x 2-metre area on floor tiles)

### Week 3 — Drivetrain configuration & units

**Objective:** Students can calibrate the Drivetrain block settings and drive more predictably.

- Open the Brain config panel in VEXcode IQ; set motor ports, wheel diameter, and wheel track width
- Explain what these settings change: the Drivetrain block converts millimetres and degrees into motor rotations internally
- Walk-through: drive in a 40 x 40 cm square; measure actual vs. programmed dimensions
- Discussion: what is the difference between *turning degrees* and *robot heading*? (Preview of sensors)
- Mini-challenge: drive a figure-8 path; compare attempts with and without correct wheel-diameter setting

### Week 4 — Sensors: Bumper, Distance, and Gyro

**Objective:** Students can read a sensor value and use it to change the robot's behaviour.

- Introduce the **Bumper Switch** (digital: pressed / not pressed) and the **Distance Sensor** (reports mm to nearest object)
- Walk-through: drive forward until the Distance Sensor reads less than 100 mm, then stop
- Introduce the **Gyro Sensor** or the Brain's **Inertial Sensor** (IQ Gen2 Brain has it built-in): read heading
- Walk-through: drive straight while correcting heading drift (simple *if heading > 0 turn slightly left* logic in Blocks)
- Mini-challenge: drive toward a wall, stop 10 cm away without hitting it

### Week 5 — Events, loops, and program flow

**Objective:** Students can use loops, if/else branching, and Controller button events in a Blocks program.

- Introduce **forever** loop vs. **repeat** loop vs. **wait until** block
- Walk-through: a Controller-driven TeleOp program using Controller ButtonEUp events to trigger a claw open/close
- Add an if/else: if the Bumper Switch is pressed, stop and reverse; else, keep driving
- Mini-challenge: build a simple "line holder" — robot drives forward until the bumper is pressed, then backs up and tries again forever
- Discussion: what is an event? How is an event-driven program different from a top-down sequence?

### Week 6 — Introduction to Autonomous

**Objective:** Students can write a Blocks Autonomous routine that completes a short field task without controller input.

- Explain the VEX IQ competition match structure: 60-second **Driving Skills** (driver only) + 60-second **Autonomous Coding Skills** (no driver); both scored separately
- Tour the current season's Autonomous Coding Skills field layout together
- Walk-through: an Autonomous sequence that pushes one game element to the scoring zone (Drivetrain blocks + sensor stop)
- Run 5 trials; track success rate; discuss why results vary between runs
- Mini-challenge: improve reliability to 4 out of 5 successful runs by adjusting distances or adding a sensor check

### Week 7 — Teamwork match & strategy

**Objective:** Students understand the Teamwork Challenge match format and can plan a cooperative strategy.

- Explain **Teamwork Challenge**: two robots from two different teams working cooperatively on the same field; both robots use the same 60-second driver period
- Discuss simple alliance communication: who takes which side of the field, who covers which game elements
- Pair teams: play two 60-second Teamwork driver practice matches; rotate partners
- Group debrief: what worked? What got in the way? (Robots bumping into each other is expected — it's a learning moment)
- Engineering notebook intro: record today's match scores and one thing to improve next week

### Week 8 — Mini-tournament, notebook, and season planning

**Objective:** Students complete a mini-tournament and leave with a plan for the first real event.

- Set up a simplified field and run a round-robin: each pair competes in both Driving Skills (60 s driver) and Autonomous Coding Skills (60 s auto)
- Score and announce results — emphasise sportsmanship, not just winning
- Engineering notebook debrief: show a well-documented example; each team adds today's scores and one design decision from the 8 weeks
- Group retrospective: three things that went well, three things to improve before the first qualifier
- Season planning: registration steps (see [Registration Guide](/guides/registration-guide/)), what to expect at a qualifier (see [Your First VEX Tournament](/guides/first-vex-tournament/)), and award categories

## What this curriculum does not cover

- **Full competition robot design** — most teams iterate their robot all season; this curriculum uses the Clawbot throughout
- **Python in VEXcode IQ** — VEXcode IQ supports Python (via the Code menu); introduce it as an extension once students are fluent in Blocks
- **PROS or advanced autonomous** — PROS (with C++ or Python) is a V5/VRC tool; VEX IQ's ceiling is VEXcode IQ Python, which is enough for middle school
- **Judge interviews and award preparation** — VIQRC has Design, Excellence, and Teamwork awards; the judging process is introduced at the first event, not in this curriculum

## Adapting

- **Shorter sessions (60 minutes):** Cut the mini-challenges; save them for between-session open build time. Use session time for the walk-through only.
- **Younger students (ages 8–10):** Spend two weeks on hardware (weeks 1–2) and reduce autonomous work to a single simple routine. Prioritise the Teamwork match experience over score optimisation.
- **Only one shared robot:** Run the walk-throughs as demos; give each student pair 10 minutes of hands-on driving time per session. Use the remaining time for collaborative Blocks programming at shared screens.
- **Students with prior Scratch or block-coding experience:** Skip weeks 2–3 walk-throughs; have these students lead the mini-challenges and help classmates. Move to VEXcode IQ Python in week 6.
- **Library or workshop (fewer than 8 sessions):** Prioritise weeks 1, 2, 4, 6, and 8 as a condensed 5-session track. Skip the teamwork match (week 7) if time is short.

## Related

- [VEX IQ Programming Guide](/guides/vex-iq-programming/) — The detailed programming reference for VEXcode IQ Blocks and Python
- [VEX IQ Resource Map](/resources/vex-iq-resource-map/) — Official curriculum, KB, forums, and community channels
- [Your First VEX Tournament](/guides/first-vex-tournament/) — What to expect at a VIQRC qualifier
- [Drivetrain Basics](/guides/drivetrain-basics/) — Building a reliable drive base; applies directly to the Clawbot and custom builds
- [Lesson Plan Template](/for-educators/lesson-plan-template/) — Single-session format to flesh out each week
- [Differentiation Guide](/for-educators/differentiation-guide/) — Adapting for mixed skill levels within one team
