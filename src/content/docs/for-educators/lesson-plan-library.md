---
title: Lesson Plan Library
description: Ready-to-run session plans for FLL, FTC, FRC, VEX IQ, VEX V5/VRC, and VEX U coaches and teachers — specific examples built on the Lesson Plan Template.
tags: [educators, lesson-plan, curriculum, classroom, fll, ftc, frc, vex-iq, vex-v5, vex-u]
audience: [teachers, coaches]
level: all
season: evergreen
---

A library of specific, ready-to-run lesson plans built on the [Lesson Plan Template](/for-educators/lesson-plan-template/). Each plan is a standalone session you can pick up, adapt, and run without starting from scratch.

These are not perfect plans. They are starting points from coaches who have actually run these sessions. Read the **After-session notes** at the end of each plan — those are the most useful lines on the page.

## How to use this library

1. Find a plan that matches your program, hardware, and stage in the season.
2. Read the whole plan once before the session — the "pre-session prep" block matters.
3. Adapt timing and groupings to your group size.
4. Fill in the **After-session reflection** section after you run it. That file is now *your* version.

---

## FLL — SPIKE Prime lessons

### FLL-1 — Hello, SPIKE Prime

**Program:** FLL Challenge | **Duration:** 90 min | **Level:** Beginner | **Ages:** 9–11

**Learning objective:** Students can connect a SPIKE Prime hub to the SPIKE App and run a one-block program that moves the drive base forward.

**Materials needed:**

- One SPIKE Prime kit per pair (hub, two large motors, two wheels, beam frame)
- Laptops with SPIKE App installed (version 3.x)
- USB cables or Bluetooth working before kids arrive
- A flat surface at least 60 cm long per pair

**Pre-session prep:**

- Charge all hubs to at least 50% the night before. The orange light means charging; solid green = full.
- Confirm SPIKE App opens and can detect a connected hub on every laptop.
- Build one "teacher demo" drive base so kids have a reference model.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Tour the parts: hub, large motor, small motor, color sensor | Coach | Name parts; resist the urge to rush |
| 0:10 — 0:25 | Build the drive base following reference photo | Pairs | Let them struggle on the axle alignment; it teaches a lot |
| 0:25 — 0:40 | Connect hub to SPIKE App; confirm "Connected" status | Pairs | Bluetooth is faster; USB if Bluetooth will not pair |
| 0:40 — 1:05 | Drag a "Move for 2 rotations" block; run it | Pairs | Challenge: can you make it go backward? Turn? |
| 1:05 — 1:20 | Share-out: each pair shows their program; group troubleshoots together | Kids | Don't fix errors before share-out — the error is the discussion |
| 1:20 — 1:30 | Cleanup + preview: next week we add sensors | Coach | Ask: "what do you want to make the robot do?" |

**Discussion prompts:**

- Why does the robot stop at a different spot each time?
- What did you have to change to make it turn?
- What part confused you the most?

**Differentiation:**

- **Ahead:** Add a third block — make the robot complete a square (four turns).
- **Stuck:** Pre-connect the hub and open a starter file with one block already placed. They add the second block.

**After-session notes (from coaches who have run this):**

- Bluetooth pairing eats 10–15 minutes the first time; plan for it or pre-pair all hubs.
- Kids almost always over-tighten axle connectors. Demo the "finger-tight plus one click" rule.
- The "why does it stop in different spots?" question generates the best conversation about friction and real-world constraints.

---

### FLL-2 — Color Sensor Basics

**Program:** FLL Challenge | **Duration:** 90 min | **Level:** Beginner | **Ages:** 9–12

**Learning objective:** Students can read a Color Sensor value in real time and write a program that stops the robot when it detects a specific color.

**Materials needed:**

- SPIKE Prime drive base from FLL-1 (or pre-built by coach)
- Color Sensor attached to front of drive base
- SPIKE App with sensor-reading blocks
- Colored paper or FLL mat with visible color regions

**Pre-session prep:**

- Attach color sensors to drive bases before kids arrive (saves 15 min).
- Test that each sensor reads color correctly under room lighting. Fluorescent lights occasionally cause drift.
- Have a piece of black and white paper ready for the demo.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Recap FLL-1: what block moved the robot? Quick hands-up review | Coach | |
| 0:10 — 0:25 | Live sensor demo: hold paper under sensor; read "Color" value in monitor | Coach + pairs | Kids call out colors; coach changes paper |
| 0:25 — 0:55 | Challenge: write a program that drives forward until the sensor detects black | Pairs | Expected approach: repeat loop with color check |
| 0:55 — 1:10 | Pairs test on the mat; iterate | Kids | Coach circulates asking "what happens when it is not perfectly lined up?" |
| 1:10 — 1:20 | Share-out: who got it to stop? What did you have to change? | Kids | |
| 1:20 — 1:30 | Cleanup + preview: next session we use the gyro sensor | Coach | |

**Discussion prompts:**

- What if the floor has a shadow — will the sensor still work?
- What is a "loop"? Why do we need one here?
- Where else does a machine stop when it detects something?

**Differentiation:**

- **Ahead:** Make the robot stop on black, wait 1 second, then reverse to the start.
- **Stuck:** Provide a partially completed program with the loop already in place; they only fill in the condition.

**After-session notes:**

- Room lighting matters more than expected. If sensors behave erratically, close the blinds.
- Many kids forget the loop and use a single "if" block — the robot misses the line. That failure is the lesson.
- Adding "what if the color is on a diagonal?" extends the session naturally for fast finishers.

---

### FLL-3 — Mission Strategy Session

**Program:** FLL Challenge | **Duration:** 90 min | **Level:** Intermediate | **Ages:** 10–14

**Learning objective:** Students can analyse the game mat, score each mission, and produce a prioritised mission attempt order for qualifier day.

**Materials needed:**

- FLL game mat (current season) or high-res printout
- Current season Game Guide (PDF on screen or printed per pair)
- Whiteboard or sticky notes for scoring tallies
- Scoring spreadsheet or calculator

**Pre-session prep:**

- Read the Game Guide yourself before the session. Know the scoring conditions for every mission.
- Set up the mat so pairs can walk around and examine it.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Walk the mat: coach points out each mission model; kids read the point values | Coach | No discussing strategy yet — just look |
| 0:10 — 0:30 | Pairs: score each mission assuming it succeeds. Total the board. | Pairs | Many will be surprised by max possible score |
| 0:30 — 0:55 | Group ranks missions by: points, ease of robot access, time required | Group | This is the high-value discussion; coach facilitates, does not give answers |
| 0:55 — 1:10 | Draft a "run order" for three robot runs — what do we attempt first, second, third? | Group | Write it on the whiteboard |
| 1:10 — 1:20 | Reality check: can we actually do mission X with our current robot? | Group | Honest assessment; mark "not yet" missions for later |
| 1:20 — 1:30 | Cleanup + record the run order in the notebook | One student | Engineering notebook entry |

**Discussion prompts:**

- If you could only complete three missions, which three? Why?
- What is more valuable: a reliable 10-point mission or an unreliable 25-point mission?
- What happens to our score if the robot fails mid-run?

**Differentiation:**

- **Ahead:** Model expected qualifier scores (what does a 200-point team typically do?) and compare to our plan.
- **Stuck:** Pre-fill the point values and let them only decide the order.

**After-session notes:**

- This session runs better mid-season when kids have already tried running missions. Early in the season it is too abstract.
- The "reliability vs. points" tradeoff always surprises beginners who want to attempt the highest-value mission first.
- Record the output in the notebook — the strategy evolution across the season is compelling evidence for judging presentations.

---

## FTC — REV Robotics / goBILDA lessons

### FTC-1 — First TeleOp Drive

**Program:** FTC | **Duration:** 90 min | **Level:** Beginner | **Ages:** 12–16

**Learning objective:** Students can deploy a TeleOp OpMode to the robot and drive a mecanum drive base with a gamepad in Driver Controlled mode.

**Materials needed:**

- FTC robot with mecanum drive (4 wheels, 4 motors, REV Control Hub)
- Laptop with Android Studio installed and FTC SDK project
- USB-A to USB-C cable (or ADB over WiFi configured)
- Gamepad (Logitech F310 or Xbox controller)
- Driver Station phone or DS app

**Pre-session prep:**

- Confirm the Control Hub firmware is current (REV Hardware Client).
- Import the FtcRobotController project into Android Studio; confirm it builds without errors before the session.
- Assign one student per pair to drive, one to be co-pilot and code reader.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Tour: Control Hub, motor ports, REV cable colors (red = power, black = ground, encoder wires) | Coach | |
| 0:10 — 0:30 | Review BasicOmniOpMode_Linear.java from the SDK sample folder | Pairs | Read the code; identify where gamepad inputs control motors |
| 0:30 — 0:55 | Build + deploy to Control Hub; confirm DS sees the OpMode | Pairs | First build takes time; warn kids |
| 0:55 — 1:10 | Drive the robot; identify which motor is spinning wrong direction | Pairs | At least one motor will be reversed — that is the activity |
| 1:10 — 1:20 | Fix reverse direction in code; redeploy; test | Pairs | |
| 1:20 — 1:30 | Cleanup + notebook entry: what did we change and why? | One student | |

**Discussion prompts:**

- How do you know which motor to flip without testing every combination?
- What happens if the encoder cable comes loose mid-match?
- What is the difference between `setDirection(REVERSE)` and negating the power value?

**Differentiation:**

- **Ahead:** Add a slow-mode toggle (hold left bumper to halve all motor powers) to the OpMode.
- **Stuck:** Give a reference diagram matching port numbers to wheel positions; let them trace the logic.

**After-session notes:**

- First build + deploy takes 5–10 min even on fast laptops. Download Gradle dependencies before the session.
- Kids instinctively move the left stick sideways expecting lateral movement on mecanum — it works, but only if all four motors work together. Use this to explain wheel kinematics.
- The motor-direction fix activity is gold: kids learn to systematically test, not guess.

---

### FTC-2 — Engineering Portfolio Entry Workshop

**Program:** FTC | **Duration:** 60 min | **Level:** Beginner-Intermediate | **Ages:** 12–16

**Learning objective:** Students can write one complete Engineering Portfolio entry documenting a design decision (problem, options considered, chosen solution, test result).

**Materials needed:**

- Google Slides or physical notebook
- Photos from the most recent build session (pre-loaded on a shared folder)
- One completed sample entry the coach has written (to reference format)

**Pre-session prep:**

- Choose one recent design decision the team actually made (e.g., "why we switched from a claw to a roller intake").
- Write a sample entry yourself using that decision so students have a model.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Read the sample entry together; identify: problem, options, criteria, decision, result | Coach | |
| 0:10 — 0:25 | Pairs pick a design decision from the past two sessions | Pairs | Coach circulates to help narrow scope |
| 0:25 — 0:50 | Write the entry: four sections, 3–5 sentences each; insert one photo | Pairs | |
| 0:50 — 1:00 | Pairs share entries; group gives one piece of feedback each | Group | Focus on: did they document *why*, not just *what*? |

**Discussion prompts:**

- What is the difference between "we chose option B" and "we chose option B because it was lighter and we tested option A and it broke after 10 matches"?
- Why do judges ask "how did you decide?" instead of "what did you build?"

**After-session notes:**

- Most first entries read like a build log ("we did X then Y"). The sample entry and the "why, not what" framing shift this.
- Pairs who take their own photos during build sessions have dramatically better portfolios by qualifier day. Introduce a "team photographer" role here.

---

## FRC — WPILib / roboRIO lessons

### FRC-1 — Command-Based Framework Introduction

**Program:** FRC | **Duration:** 120 min | **Level:** Intermediate | **Ages:** 14–18

**Learning objective:** Students can describe the Command-Based pattern and implement a `DriveSubsystem` class with one `TankDriveCommand`.

**Materials needed:**

- Laptops with WPILib installed (latest stable)
- FRC robot or practice chassis (optional — simulation works)
- WPILib VS Code with Robot Simulation extension

**Pre-session prep:**

- Create a new WPILib project using the "Command-based (Skeleton)" template before the session — students will extend it.
- Clone the project to all team laptops via Git, or share via USB.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:15 | Diagram: how Timed Robot differs from Command-based (robot.periodic vs. command scheduler) | Coach at whiteboard | Emphasize "subsystem owns the hardware" |
| 0:15 — 0:40 | Walk through the skeleton project: `RobotContainer.java`, `Subsystem`, `Command` | Group code read | |
| 0:40 — 1:05 | Implement `DriveSubsystem.java` with two CANSparkMax motors and a `tankDrive(left, right)` method | Pairs | Coach reviews motor IDs from CAN config sheet |
| 1:05 — 1:25 | Implement `TankDriveCommand.java` using joystick axes; wire to default command in `RobotContainer` | Pairs | |
| 1:25 — 1:45 | Simulate in WPILib Simulation GUI; confirm joystick inputs appear as motor outputs | Pairs | Use "Joystick" widget in Simulation GUI |
| 1:45 — 2:00 | Code review: one pair explains their `DriveSubsystem` to the group | Pair | Coach asks clarifying questions |

**Discussion prompts:**

- Why does the Command scheduler interrupt commands instead of running them to completion?
- What happens if two commands try to use the same subsystem at the same time?
- Why is `requires(driveSubsystem)` so important?

**Differentiation:**

- **Ahead:** Add a `SlowModeCommand` that reduces motor power to 40% while a button is held.
- **Stuck:** Provide a completed `DriveSubsystem.java`; they only implement the `Command`.

**After-session notes:**

- Two hours is tight. If the group is new to Java, cut simulation and do just the code review against the skeleton.
- The "subsystem owns hardware" principle clicks fastest when you describe the failure mode: two commands fighting over the same motor controller causes erratic behavior.
- WPILib Simulation is a genuine time-saver — no need to deploy to the robot for every logic iteration.

---

## VEX IQ — VEXcode IQ lessons

### VEXIQ-1 — Drive Base Build and First Drive

**Program:** VEX IQ | **Duration:** 60 min | **Level:** Beginner | **Ages:** 8–11

**Learning objective:** Students can build the standard Clawbot IQ drive base and drive it forward and backward under controller input.

**Materials needed:**

- VEX IQ kit per pair (Smart Motors, wheels, beams, controller)
- VEXcode IQ on tablets or laptops
- Reference build instruction sheet (Clawbot IQ quick-start, available at vex.com)

**Pre-session prep:**

- Print or display Clawbot drive base build instructions (first 20 steps only).
- Charge all Smart Batteries to at least 50%.
- Check that VEXcode IQ opens and the controller pairs via Bluetooth on each device.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:05 | Tour the kit: smart motor, beam, pin connector, controller | Coach | Let kids hold parts |
| 0:05 — 0:30 | Build drive base using instruction sheet | Pairs | Coach circulates: watch for incorrect beam orientation |
| 0:30 — 0:45 | Open VEXcode IQ; use the Drive template; download to brain | Pairs | Kids drive for 2–3 minutes each |
| 0:45 — 0:55 | Observation: does it drive straight? Why or why not? | Group | Introduce motor direction and build symmetry concept |
| 0:55 — 1:00 | Cleanup + question for next session: "what could the robot pick up?" | Coach | |

**Discussion prompts:**

- Why does the robot pull to one side?
- What makes this robot different from a car?
- Where is the "brain" of the robot?

**Differentiation:**

- **Ahead:** Modify the Drive template to drive in a square using timed turns.
- **Stuck:** Coach pre-installs the motor; student focuses only on building the frame.

**After-session notes:**

- The most common build error: motors installed on opposite sides of the beam (causing one to spin inverted). Build the "inverted motor" example on purpose before the session so you can demo the diagnosis.
- Kids aged 8–9 take the full 25 minutes for the build. Kids aged 11–12 finish in 15.
- "Does it go straight?" is one of the most valuable engineering questions at this level. Kids discover repeatability as a property of precision, not luck.

---

### VEXIQ-2 — Autonomous Coding Skills Intro

**Program:** VEX IQ | **Duration:** 90 min | **Level:** Beginner-Intermediate | **Ages:** 9–13

**Learning objective:** Students can write a four-action autonomous sequence (drive forward, turn, drive forward, stop) using `driveFor` and `turnFor` blocks.

**Materials needed:**

- VEX IQ drive base (from VEXIQ-1 or pre-built)
- VEXcode IQ on tablets or laptops
- Tape marks on the floor indicating a 3-tile travel path

**Pre-session prep:**

- Mark a start box and a target box on the floor with tape (approximately 3 VEX tiles apart, ~120 cm).
- Test the path yourself with a calibrated robot so you know rough distance values.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:10 | Revisit last session: what is the difference between TeleOp and Autonomous? | Coach | |
| 0:10 — 0:25 | Introduce `driveFor` and `turnFor` blocks; live demo driving 50 cm forward | Coach | |
| 0:25 — 1:00 | Challenge: write a program to drive from start box to target box in a 90° path | Pairs | Measure and adjust; three attempts per pair |
| 1:00 — 1:15 | Compare programs: what values did different pairs use? Why do they differ? | Group | Discuss consistency and calibration |
| 1:15 — 1:25 | Stretch: write the return path (drive back to start) | Pairs | |
| 1:25 — 1:30 | Cleanup + record best values in notebook | One student | |

**Discussion prompts:**

- Why does 500 mm in the program not equal exactly 500 mm on the floor?
- How would you make the robot more consistent?
- What is "calibration" in engineering?

**Differentiation:**

- **Ahead:** Introduce `waitFor` to pause mid-run and simulate picking up a game object.
- **Stuck:** Provide the correct `driveFor` value for 50 cm; they only write the turn.

**After-session notes:**

- Pairs discover unit differences (cm vs mm vs inches) on their own when values do not match. Let it happen.
- Recording values in the notebook for each attempt (not just the final answer) builds good notebook habits naturally.
- The "why do different pairs use different values?" discussion is the strongest learning moment in this session.

---

## VEX V5 / VRC — VEXcode Pro lessons

### V5-1 — Encoder-Based Autonomous Drive

**Program:** VEX V5/VRC | **Duration:** 90 min | **Level:** Intermediate | **Ages:** 13–17

**Learning objective:** Students can write a `driveStraight(double inches)` function using motor encoders and verify it drives within 5% of the target distance.

**Materials needed:**

- VEX V5 robot with 4-motor tank drive
- VEXcode Pro V5 or PROS C++ environment
- Measuring tape
- V5 Brain with screen (to display encoder ticks)

**Pre-session prep:**

- Confirm motor encoder counts per revolution for your gearing.
- Write the formula on the whiteboard: `ticks = (inches / circumference) * ticks_per_rev`.

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:15 | Encoder concept: live demo of V5 Brain displaying encoder value while manually spinning a motor shaft | Coach | |
| 0:15 — 0:35 | Drive the math: calculate ticks for 24 inches given your specific gearing + wheel size | Pairs at whiteboard | Coach checks each pair's formula |
| 0:35 — 1:05 | Code: implement `driveStraight(double inches)` using `Motor.spinToPosition` with calculated ticks | Pairs | |
| 1:05 — 1:20 | Test: measure actual distance; calculate error percentage; iterate | Pairs | Target: < 5% error over 24 inches |
| 1:20 — 1:30 | Share results: each pair reports their error. Group discusses causes | Group | |

**Discussion prompts:**

- Where does error come from? (Wheel slip, measurement rounding, battery voltage?)
- Why does the robot drive a different distance when the battery is at 40% vs 100%?
- What would a PID controller fix that `spinToPosition` does not?

**Differentiation:**

- **Ahead:** Add a `turnToHeading(double degrees)` function using the V5 Brain inertial sensor.
- **Stuck:** Provide a completed `ticks_for_distance()` helper function; they only call it.

**After-session notes:**

- The wheel-circumference calculation surprises students who assumed the motor encoder directly tracks distance. The gearing conversation is a natural extension.
- Battery voltage affecting actual distance is a real VRC phenomenon — some teams note which battery level they calibrated at.
- This session pairs naturally with a notebook entry: the formula derivation + test results table is ready-made engineering evidence.

---

## VEX U / VURC — PROS C++ lessons

### VEXU-1 — Two-Robot Autonomous Coordination

**Program:** VEX U (VURC) | **Duration:** 120 min | **Level:** Advanced | **Ages:** 18+ (college)

**Learning objective:** Students can design and implement a two-robot autonomous strategy where Robot A and Robot B execute non-colliding paths that together score more than either robot could alone.

**Materials needed:**

- Two VEX U robots with PROS installed
- Two laptops with PROS CLI and VEXcode Pro V5
- Full-field VURC game mat (or marked floor approximation)
- Stopwatch

**Pre-session prep:**

- Each robot should already have a working single-robot autonomous from a previous session.
- Print the VURC field layout with scoring elements labeled.
- Review VURC game manual rules covering the 15-second Autonomous Period (teams start robots simultaneously).

**Session timeline:**

| Time | Activity | Who leads | Notes |
|------|----------|-----------|-------|
| 0:00 — 0:15 | Field walk: identify scoring zones, starting positions, shared vs. exclusive territories | Group | Mark "Robot A zones" vs "Robot B zones" with tape |
| 0:15 — 0:35 | Diagram the intended paths for both robots; check for spatial conflicts | Group at whiteboard | Use timing annotations (Robot A at goal 1 at T+8; Robot B should be clear) |
| 0:35 — 1:05 | Each sub-team independently codes their robot's path | Sub-teams | Robot A team and Robot B team split; coach floats |
| 1:05 — 1:25 | Combined run: both robots run simultaneously; observe actual vs. planned | Full group | Record: scores, collisions, timing gaps |
| 1:25 — 1:45 | Iterate once: adjust timing offsets using `pros::delay(ms)` to resolve conflicts | Full group | |
| 1:45 — 2:00 | Debrief: did two robots outperform one? What changed the expected outcome? | Group | |

**Discussion prompts:**

- How do you handle the case where Robot A's auto fails — does Robot B's path still make sense?
- What is the minimum coordination: "stay out of the same zone" vs "actively complement each other"?
- How would you document this coordination approach in your engineering notebook?

**Differentiation:**

- **Ahead:** Add IMU-based heading correction to both robots; measure improvement in consistency.
- **Stuck:** Pre-code Robot B's path; the struggling team only maintains Robot A.

**After-session notes:**

- The most common failure: both teams design "maximum scoring" paths independently, which happen to overlap. Force the zone-assignment conversation before coding.
- `pros::delay()` for timing offsets is fragile; introduce this as a temporary workaround and flag that V5 radio communication (if permitted) is the robust solution.
- This session is strongest mid-season when both robots have reliable single-robot autos. Do not run it in the first few weeks.

---

## Contributing a lesson plan

If you have a session that worked — especially with "what went wrong the first time" notes — please share it. Open a pull request to `the-little-creator` and add your plan to this file following the same format. Sessions that include real after-session notes are most valuable to the next coach who picks this up.

---

## Related

- [Lesson Plan Template](/for-educators/lesson-plan-template/) — The blank template behind every plan here
- [FLL Curriculum Starter](/for-educators/curriculum-starter/) — How FLL-1 through FLL-3 fit into an 8-week sequence
- [FTC Curriculum Starter](/for-educators/ftc-curriculum-starter/) — How FTC-1 and FTC-2 fit into an FTC season opener
- [Differentiated Instruction (Deep Dive)](/for-educators/differentiated-instruction/) — Scaffolding and extension strategies for mixed-ability teams
- [Assessment Guide — All Programs](/for-educators/assessment-guide/) — How to assess whether the learning objective was actually met
