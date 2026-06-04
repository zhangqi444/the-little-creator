---
title: Curriculum Starter — 8-Week FRC Onboarding
description: An 8-week starter curriculum for a first-time FRC classroom or club, covering robot hardware orientation, WPILib programming in Java, and a first Autonomous routine.
tags: [educators, curriculum, frc, onboarding, wpilib, programming, java]
audience: [teachers, coaches]
level: intermediate
season: evergreen
exclude_from_gpt: true
---

:::note[Program scope]
This curriculum is for **FIRST Robotics Competition** teams using the **roboRIO** and **WPILib**. FLL coaches should see the [FLL Curriculum Starter](/for-educators/curriculum-starter/) instead. FTC coaches should see the [FTC Curriculum Starter](/for-educators/ftc-curriculum-starter/).
:::

An 8-week starter curriculum for a brand-new FRC classroom or club. Designed for once-a-week, 90-minute sessions. Adapt freely — this is a skeleton, not a prescription.

## Assumptions

- **Audience:** Students ages 14–18, little or no prior Java experience
- **Group size:** 10–25 students with two or more adult coaches/mentors
- **Hardware:** One FRC kit-of-parts chassis (or equivalent drive base) shared by the group; one roboRIO, Power Distribution Hub, and motor controllers available for demos
- **Software:** WPILib VS Code extension installed on at least one shared laptop; FRC Driver Station installed on a second Windows machine
- **Time:** 8 sessions of 90 minutes each, once per week
- **Outcome:** By week 8, students can deploy a working TeleOp (driver-controlled) program and a basic encoder-based Autonomous routine to a real FRC robot

If your context differs (more sessions, a classroom without hardware, older students with Java experience), use this as a base and adjust.

## Week-by-week

### Week 1 — Welcome & FRC hardware tour

**Objective:** Students can identify the roboRIO, Power Distribution Hub, motor controllers, and the overall power-and-control architecture.

- Welcome, introductions, group norms — establish Gracious Professionalism expectations early
- Hardware tour: roboRIO (the brain), Power Distribution Hub, CAN bus, SPARK MAX / Talon SRX motor controllers, brushless NEO / CIM motors, pneumatics overview
- Physical safety: pinch points, battery safety, enable/disable protocol, bumper rules
- Pair the Driver Station laptop to the roboRIO over USB; open FRC Driver Station, confirm comms
- First win: enable the robot in Test mode and watch the motor controller status LEDs respond to input
- Assign reading homework: skim [docs.wpilib.org hardware overview](https://docs.wpilib.org/en/stable/docs/hardware/hardware-basics/index.html)

### Week 2 — WPILib setup & first robot program

**Objective:** Students can create a new WPILib project, deploy it to the roboRIO, and see output in the Driver Station console.

- Open WPILib VS Code; tour the Command Palette (Ctrl+Shift+P → "WPILib:")
- Create a new TimedRobot Java project: walk through the generated structure (Robot.java, robotInit, teleopPeriodic)
- Add a SmartDashboard.putString call inside teleopPeriodic; deploy; open Driver Station console
- Explain the deploy pipeline: Gradle build → roboRIO SSH
- Discussion: what is the difference between TimedRobot and Command-based? (Keep it brief — Command-based comes in week 4)
- Point to [docs.wpilib.org](https://docs.wpilib.org) as the authoritative reference going forward

### Week 3 — TeleOp: driving the robot

**Objective:** Students can write an arcade-drive or tank-drive TeleOp that drives a real robot with a gamepad.

- Introduce XboxController (or Joystick) and DifferentialDrive / MecanumDrive classes
- Walk-through: a two-motor arcade-drive TeleOp using DifferentialDrive.arcadeDrive(speed, rotation)
- Introduce motor controller configuration: CAN ID assignment using REV Hardware Client or Phoenix Tuner X; invert a motor direction
- Mini-challenge: each student group drives the robot in a square using only their TeleOp code
- Discussion: why does CAN bus ID collision cause strange behaviour? How do you check for it?
- Common mistakes: forgetting to call drive.feed() in simulation, mismatched CAN IDs between code and hardware

### Week 4 — Command-based programming

**Objective:** Students understand the Command + Subsystem pattern and can rewrite their TeleOp drive as a Command-based program.

- Motivation: why Command-based for larger teams — composability, parallel actions, testability
- Walk-through: create a DriveSubsystem class (two SPARK MAX motors, DifferentialDrive) and a TeleopDrive command (reads joystick axes, calls DriveSubsystem.arcadeDrive())
- Bind the command to a default command in RobotContainer
- Deploy and verify: the robot drives the same as week 3, but the code is now decoupled
- Discussion: when would you use Trigger vs. a default command?
- Point to WPILib documentation: [Command-based programming guide](https://docs.wpilib.org/en/stable/docs/software/commandbased/index.html)

### Week 5 — Sensors & encoders

**Objective:** Students can read encoder position and velocity, and use them to drive a set distance.

- Encoder types: built-in brushless encoder (NEO with SPARK MAX), CTRE mag encoder on Talon SRX, through-bore encoders wired to the roboRIO
- Convert ticks to distance: gear ratio, wheel circumference, position factor in SPARK MAX
- Walk-through: drive exactly 3 meters using SparkMaxRelativeEncoder.getPosition() in an Autonomous phase drive command
- Add a Shuffleboard widget showing live encoder position
- Mini-challenge: drive forward 2 m, turn 90 degrees, drive 2 m; measure how far off the robot actually lands
- Discussion: what causes encoder drift? Why do teams add a gyro for heading correction?

### Week 6 — Gyro and straight-line driving

**Objective:** Students can read a NavX or Pigeon gyro and correct heading drift during Autonomous.

- Introduce AHRS (NavX-MXP) or Pigeon2 via CAN: getAngle() for heading
- Simple proportional correction: if the robot drifts right, steer slightly left — correction = Kp × angleError
- Walk-through: a DriveStraight command that drives forward while zeroing heading error
- Add a Shuffleboard display: robot heading vs. target heading
- Discussion: why does a Kp that is too large cause oscillation? Brief intro to PID intuition (no math yet)
- Optional extension for advanced students: implement a basic WPILib PIDController

### Week 7 — Autonomous planning & the game

**Objective:** Students can write a 15-second Autonomous routine that scores at least one game objective reliably.

- Read the season game manual Autonomous period together (15 seconds, possible scoring zones)
- Discuss strategy: prioritise the highest-value Auto actions that fit within 15 seconds
- Walk-through: sequence two DriveDistance commands and a ScoreCommand placeholder using SequentialCommandGroup
- Run the routine on the practice field (or a taped-out floor version) — measure reliability over 5 runs
- Document results in the engineering notebook: what scored, what did not, what to iterate on
- Discussion: how do alliance partners' Autonomous routines affect yours? Why communicate with alliance captains before matches?

### Week 8 — Scrimmage, notebook, and season planning

**Objective:** Students run a full 2.5-minute practice match, review the engineering notebook, and set first-competition priorities.

- Set up a simplified field and run a timed practice match: 15-second Auto + 2:30 TeleOp
- Rotate driver pairs; every student drives at least once
- Engineering notebook debrief: show examples of a well-documented design decision from weeks 1 through 7; each group adds today's scrimmage results
- Group retrospective: three things that worked, three things to improve before the first event
- Season planning discussion: robot feature priority, award preparation timeline (Impact, Engineering Inspiration, Rookie All Star), pit and scouting roles
- Assign pre-competition homework: read [Your First FRC Tournament](/guides/first-frc-tournament/)

## What this curriculum does not cover

- **Full robot design and build** — building a competitive FRC robot is a multi-month effort; this curriculum uses a basic drive base throughout
- **Impact Award preparation** — the Impact Award (formerly Chairman's) requires a written essay, video, and judged interview; start preparing this in parallel with build season
- **Advanced trajectory following** — PathPlanner or Choreo motion profiles are week-9+ topics once the team has reliable base Autonomous movement
- **Vision processing** — Limelight, PhotonVision, and on-device ML are high-leverage but complex; introduce after students are comfortable with basic sensor code
- **Pit strategy, scouting, and alliance selection** — crucial for competitive success; covered in [Your First FRC Tournament](/guides/first-frc-tournament/)

## Adapting

- **Shorter sessions (60 minutes):** Cut the mini-challenges and move them to between-session practice; use session time for guided walk-throughs only.
- **Students with Java experience:** Skip the Week 2 Hello World and move directly to motor control. Introduce Command-based in week 2 rather than week 4.
- **No robot hardware:** Use the WPILib simulation environment (Simulation → Desktop Simulation) to run weeks 2 through 6 entirely in software. Results differ from a real robot but the programming concepts transfer directly.
- **Large team (25+ students):** Divide into sub-teams early: drivetrain, intake/mechanism, vision, software. Run parallel threads from week 4 and merge in weeks 7 and 8.
- **Mixed grade levels:** Pair 11th/12th-graders with 9th/10th-graders. Older students reinforce their understanding by teaching; newer students get near-peer support and a model of what is possible.

## Related

- [FRC Programming Basics](/guides/frc-programming-basics/) — The detailed programming reference to accompany weeks 2 through 6
- [FRC Awards Guide](/guides/frc-awards/) — What judges look for, including the Impact Award strategy
- [FRC Impact Award Submission](/guides/frc-impact-submission/) — The essay, video, and interview; start this in parallel with build season
- [Lesson Plan Template](/for-educators/lesson-plan-template/) — Single-session format to flesh out each week
- [Your First FRC Tournament](/guides/first-frc-tournament/) — What to expect at a regional or district event
