---
title: Curriculum Starter — 8-Week VEX V5/VRC Onboarding
description: An 8-week starter curriculum for a first-time VEX V5/VRC classroom or club, covering the V5 Brain, VEXcode Pro V5 programming in C++, sensors, and a first Autonomous routine.
tags: [educators, curriculum, vex-v5, vrc, onboarding, vexcode, cpp, programming]
audience: [teachers, coaches, teens]
level: beginner
season: evergreen
---

:::note[Program scope]
This curriculum is for **VEX V5 / VRC (VEX Robotics Competition)** teams using the **V5 Brain** and **VEXcode Pro V5**. For younger students on VEX IQ, see the [VEX IQ Curriculum Starter](/for-educators/vex-iq-curriculum-starter/). FLL coaches should see the [FLL Curriculum Starter](/for-educators/curriculum-starter/). FTC coaches should see the [FTC Curriculum Starter](/for-educators/ftc-curriculum-starter/). FRC coaches should see the [FRC Curriculum Starter](/for-educators/frc-curriculum-starter/).
:::

An 8-week starter curriculum for a brand-new VEX V5/VRC classroom or club. Designed for once-a-week, 90-minute sessions. Adapt freely — this is a skeleton, not a prescription.

## Assumptions

- **Audience:** Students ages 13–18 (grades 7–12), no prior VEX V5 experience (some block-coding or basic programming a plus but not required)
- **Group size:** 8–20 students with one or two adult coaches/teachers
- **Hardware:** One VEX V5 starter kit (V5 Brain, two V5 Smart Motors, V5 Controller, V5 battery) per pair of students; a flat floor or field tiles for driving
- **Software:** [VEXcode Pro V5](https://www.vex.com/vexcode) installed on student laptops (free, Windows or macOS); optionally VS Code with the PROS extension for advanced students in later weeks
- **Time:** 8 sessions of 90 minutes each, once per week
- **Outcome:** By week 8, every student can drive a robot with the V5 Controller, write a working C++ TeleOp and Autonomous program, and run a short autonomous mission on a practice field

If your context differs (more sessions, only one shared kit, a library workshop), use this as a base and adjust.

## Week-by-week

### Week 1 — Welcome & hardware tour

**Objective:** Students can identify the V5 Brain, Smart Motors, Controller, and sensors, and turn the robot on.

- Welcome, introductions, group norms — introduce *Gracious Professionalism* as a VRC/FIRST principle
- Hardware tour: **V5 Brain** (21 Smart Ports, touchscreen, SD card slot, USB), **V5 Smart Motor** (built-in encoder, adjustable cartridge gear ratios), **V5 Controller** (two joysticks, four face buttons, two shoulder buttons, wireless radio), V5 battery
- Wiring basics: connect two Smart Motors (Left: Port 1, Right: Port 10) and link the Controller's radio cable to the Brain
- Physical safety: keep fingers away from spinning gears and shafts; kill-switch protocol using the Brain's disable button
- First win: use the Controller in **manual drive mode** to drive the robot across the floor — no programming needed; the Brain ships with a default drive program
- Assign take-home task: install VEXcode Pro V5 and read the current [VEX V5 Programming Basics guide](/guides/vex-v5-programming-basics/) intro section

### Week 2 — VEXcode Pro V5: Blocks to C++

**Objective:** Students can create a VEXcode Pro V5 project, configure the drivetrain, and run a basic drive program.

- Tour the VEXcode Pro V5 IDE: Device panel, project workspace, toolbar (Download / Run / Stop)
- **Drivetrain configuration:** click Devices then Add Drivetrain; set motor ports, wheel diameter, track width, and gear ratio
  - Why calibration matters: wrong values mean the robot overshoots or undershoots every distance command
- Walk-through in **Blocks**: drag *Drivetrain drive for 200 mm*, *turn for 90 degrees*, *drive for 200 mm* — download and run
- Transition to **C++**: click the code tab; VEXcode shows the generated C++ equivalent
  - Point out the `main()` function, `Brain.Screen.print()`, and the `Drivetrain.driveFor()` call
- Mini-challenge: modify the C++ file to make the robot drive a square (200x200 mm); compare to the Blocks version

### Week 3 — C++ fundamentals: variables, loops, functions

**Objective:** Students can use variables, for loops, and simple functions to reduce repeated code.

- Review C++ types used in VEX: `int`, `double`, `bool`, `void`
- Walk-through: refactor last week's square program into a reusable function

```cpp
void driveSquare(double side_mm) {
  for (int i = 0; i < 4; i++) {
    Drivetrain.driveFor(forward, side_mm, mm);
    Drivetrain.turnFor(right, 90, degrees);
  }
}
```

- Call `driveSquare(300)` in `main()` and then `driveSquare(150)` — discuss parameters vs. hardcoded values
- Introduce `wait()` and why pauses matter between sequential motion commands
- Mini-challenge: write a function that drives a regular polygon with *n* sides; call it for a triangle, square, and hexagon

### Week 4 — TeleOp: controller input and arcade drive

**Objective:** Students can write a driver-control program that maps joystick input to motor speed in real time.

- Explain the VRC match structure: **15-second Autonomous** + **1 min 45 sec Driver Control (TeleOp)** — introduce both phases early
- Introduce the `while(true)` loop and `Controller1.Axis3.position()` / `Controller1.Axis1.position()` for arcade drive

```cpp
int main() {
  while (true) {
    int fwd  = Controller1.Axis3.position();
    int turn = Controller1.Axis1.position();
    LeftMotor.spin(forward,  (fwd + turn) / 100.0, pct);
    RightMotor.spin(forward, (fwd - turn) / 100.0, pct);
    wait(20, msec);
  }
}
```

- Discuss the `wait(20, msec)` loop delay: prevents overloading the Brain's CPU and smooths motor commands
- Mini-challenge: add a button mapping — hold `ButtonL1` to run an attachment motor (claw or lift) forward; hold `ButtonL2` to reverse it

### Week 5 — Sensors: encoders, Inertial, and Distance

**Objective:** Students can read sensor values and use them to make the robot react to the environment.

- **Motor encoders** (built-in): `LeftMotor.position(degrees)` measures wheel rotation
  - Walk-through: drive until the encoder reads 1080 degrees (about one wheel revolution for a typical gear ratio), then stop
- **V5 Inertial Sensor**: mount in the Brain's expansion port; `Inertial.rotation(degrees)` reads cumulative heading
  - Walk-through: spin 90 degrees using `Drivetrain.turnFor()` — compare to the Inertial reading; they should match when calibrated
- **V5 Distance Sensor** (LiDAR): `Distance.objectDistance(mm)` — drive toward a wall, stop at 150 mm
- Mini-challenge: combine Distance and Inertial — drive forward until 20 cm from a wall, turn 90 degrees, drive another 30 cm, turn 90 degrees again (a simple L-path using sensor stops instead of timed delays)

### Week 6 — Autonomous: planning and programming a mission

**Objective:** Students can design, program, and run a 15-second Autonomous routine that completes a simple field task.

- Explain VRC Autonomous scoring: the team that earns more Autonomous Points wins the Autonomous Bonus — it is often match-deciding at qualifiers
- Autonomous design process:
  1. Sketch the path on paper (start position → scoring zone → end position)
  2. Break the path into atomic moves (drive X mm, turn Y degrees, actuate Z)
  3. Encode each move with sensor stops rather than `wait()` where possible
- Walk-through: a three-move sequence that pushes one game element to the goal zone
- Run 5 trials; record results; discuss consistency — why does a robot that worked in testing fail on the competition field? (Battery voltage, floor surface, start position drift)
- Mini-challenge: improve the routine's reliability to 4 out of 5 consistent runs by adding an Inertial-corrected heading check between straight-line moves

### Week 7 — PROS and advanced patterns (optional extension)

**Objective:** Students are aware of PROS as an alternative environment and can explain when to use it.

- Introduce [PROS (Purdue Robotics Operating System)](https://pros.cs.purdue.edu/): a VS Code extension with an LLVM-based C/C++ toolchain and a real-time task scheduler
- Key difference from VEXcode: PROS exposes the underlying RTOS so you can run multiple concurrent tasks; VEXcode's competition template also supports tasks but with less flexibility
- Introduce **OkapiLib**: a popular open-source library on top of PROS that provides motor groups, PID drive controllers, and odometry
- When to adopt PROS: when your team needs custom PID tuning, motion profiling, or odometry for Skills runs — typically year 2+
- Class discussion: what level of autonomous complexity is realistic for a first-year team? (Simple push-and-score beats a perfectly-tuned PID that fails at tournament)
- Mini-challenge (optional): install PROS, create a new project, and reproduce last week's three-move Autonomous using the PROS Competition template

### Week 8 — Practice match, notebook, and next steps

**Objective:** Students compete in a mini-tournament and leave with a clear plan for their first qualifier.

- Set up a simplified VRC field (or use floor tiles and tape) and run a round-robin: each pair plays a full 2-minute match (15 s auto + 1:45 driver)
- Score and announce results — emphasise sportsmanship and *Gracious Professionalism*, not just the score
- Engineering notebook debrief: show a well-documented example; each team adds today's match scores, one robot design decision from the 8 weeks, and one thing they would change
- Group retrospective: three things that went well, three things to improve before the first qualifier
- Awards overview: VRC has **Excellence**, **Design**, **Judges**, and **Tournament Champions** awards — all involve the engineering notebook; walk through what judges look for (see [VEX Awards Guide](/guides/vex-awards/))
- Season planning: walk through the VRC registration path on [RobotEvents](https://www.robotevents.com/), discuss qualifier format, and identify the first regional event to target

## What this curriculum does not cover

- **Full competition robot design** — most teams iterate heavily all season; this curriculum uses a basic two-motor drive base throughout
- **Odometry and motion profiling** — tracking wheels, X-drive/holonomic kinematics, and motion-profile generators are year-two topics
- **Advanced PID tuning** — the curriculum introduces Inertial-corrected heading but stops short of full closed-loop PID; VRC teams should read the PROS and OkapiLib documentation for V5-specific tuning
- **Judge interviews and award preparation** — the judging process is introduced at week 8 but deserves dedicated practice sessions before a real qualifier
- **VEX U-specific rules** — college teams have different robot specs and match rules; see [Starting a VEX U Team](/guides/vex-u-first-team/)

## Adapting

- **Shorter sessions (60 minutes):** Cut the mini-challenges; save them for open lab time between sessions. Use the 60 minutes for the walk-through only.
- **Students with prior Python or Java experience:** Skip weeks 2–3 walk-throughs; have experienced students lead the mini-challenges. Move to PROS/OkapiLib in week 6 instead of week 7.
- **Only one shared robot:** Run walk-throughs as live demos; give each student pair 10–15 minutes of hands-on driving or programming time per session. Use remaining time for whiteboard design exercises or notebook writing.
- **Mixed skill levels (week 3+):** Pair a stronger programmer with a more experienced builder. The curriculum naturally separates programming and building tasks — exploit that split.
- **Library or workshop (fewer than 8 sessions):** Prioritise weeks 1, 2, 4, 6, and 8 as a condensed 5-session track. Fold key sensor concepts from week 5 into week 6's Autonomous session.
- **VEX IQ alumni:** Students coming from VEX IQ already understand sensors, competition format, and block-coding. Start at week 3 (C++ fundamentals) and spend the freed-up weeks on Autonomous depth and PROS.

## Related

- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — The detailed programming reference for VEXcode Pro V5 and PROS
- [VEX IQ Curriculum Starter](/for-educators/vex-iq-curriculum-starter/) — The IQ equivalent of this guide for younger students
- [VEX IQ Resource Map](/resources/vex-iq-resource-map/) — Cross-program VEX resources including forums and official curriculum
- [VEX Awards Guide](/guides/vex-awards/) — Awards and advancement at VRC qualifiers and regional championships
- [Your First VEX Tournament](/guides/first-vex-tournament/) — What to expect at a VRC qualifier, including pit setup, match schedule, and judging
- [Drivetrain Basics](/guides/drivetrain-basics/) — Building a reliable drive base; directly applicable to the two-motor drive used in this curriculum
- [Lesson Plan Template](/for-educators/lesson-plan-template/) — Single-session format to flesh out each week in more detail
- [Differentiation Guide](/for-educators/differentiation-guide/) — Adapting for mixed skill levels within one team
