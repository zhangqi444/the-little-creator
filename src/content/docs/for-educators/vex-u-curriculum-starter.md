---
title: Curriculum Starter — 8-Week VEX U / VURC Onboarding
description: An 8-week starter curriculum for a new VEX U collegiate robotics team or club, covering team formation, VEX V5 hardware setup, PROS/VEXcode programming in C++/Python, and a first competition run.
tags: [educators, curriculum, vex-u, vurc, onboarding, pros, vexcode, cpp, python, college]
audience: [teachers, coaches, teens]
level: beginner
season: evergreen
---

:::note[Program scope]
This curriculum is for **VEX U / VURC (VEX U Robotics Competition)** collegiate teams using **VEX V5 hardware** and either **PROS** or **VEXcode Pro V5** for programming. For high school VEX V5 teams, see the [VEX V5/VRC Curriculum Starter](/for-educators/vex-v5-curriculum-starter/). For high school FRC teams, see the [FRC Curriculum Starter](/for-educators/frc-curriculum-starter/).
:::

An 8-week starter onboarding plan for a brand-new VEX U / VURC collegiate team or club. Designed for one 2-hour session per week. Adapt freely — this is a framework, not a rigid prescription.

## Assumptions

- **Audience:** University students (ages 18+), new to VEX U (prior VEX V5/VRC or FRC experience a plus but not required)
- **Group size:** 6–20 students, ideally with a faculty advisor and at least one experienced VEX V5/VRC alumnus as a mentor
- **Hardware:** Minimum two VEX V5 starter kits per robot (VURC rules allow two robots per team — one ≤15 in and one ≤24 in); V5 Brain, Smart Motors, V5 Controller, V5 Battery
- **Programming:** PROS (recommended for college teams needing OkapiLib/LemLib) or VEXcode Pro V5 (accessible entry if team is newer)
- **Budget:** VURC participation requires RECF team registration (~$150/year); hardware typically $600–$1,200 per robot for a basic kit

---

## Week 1 — Orientation: What is VEX U?

**Learning objectives**

- Understand the VURC format, rules, and how it differs from VEX V5/VRC
- Set up team accounts (RobotEvents, VEX Forum, PROS)
- Identify roles and form sub-teams (build, programming, strategy/scouting, outreach)

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:15 | Welcome, introductions, what drew everyone here |
| 0:15–0:45 | VURC overview: two-robot format, 1:45 driver-control + 15-sec Autonomous, skills challenges, alliance selection, judging |
| 0:45–1:15 | Register team on RobotEvents; create VEX Forum accounts; install PROS or VEXcode Pro V5 |
| 1:15–1:50 | Sub-team formation: Builders × 2 per robot, Programmers × 2 per robot, Strategy/Scouting × 1–2, Outreach/Admin × 1 |
| 1:50–2:00 | Homework: read the current VURC game manual introduction (RobotEvents → VEX U → Game Materials) |

**Key differences from VEX V5/VRC to highlight**

- Two robots per team (Small: ≤15 in cube; Large: ≤24 in cube) — both alliance members are your own team
- College-only; no age cap on students as long as they are enrolled
- Engineering notebook judging is still mandatory — same depth expected as VRC
- Many VEX V5/VRC strategies translate; VEX U teams are expected to go deeper on autonomous programming

---

## Week 2 — Game Manual Deep-Dive & Strategy Seeds

**Learning objectives**

- Parse the current season's game manual as a team
- Identify scoring objects, field zones, and autonomous bonus rules
- Begin brainstorming robot concepts (before touching hardware)

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:15 | Recap week 1; any setup issues? |
| 0:15–1:00 | Game manual read-through (in sub-teams: builders read field spec, programmers read autonomous rules, strategy reads scoring matrix) |
| 1:00–1:30 | Group debrief: whiteboard all scoring opportunities, rank by point value and difficulty |
| 1:30–1:50 | Sketch three possible robot concepts (no commitment — just ideas on paper) |
| 1:50–2:00 | Assign: each sub-team creates a one-page summary of their section by next session |

**Resources**

- Current game manual: RobotEvents → VEX U → Game Materials → Game Manual
- VEX U scoring history (VEX Forum, VEX U section): search for past season debriefs to understand typical winning scores

---

## Week 3 — Hardware Orientation

**Learning objectives**

- Unbox and inventory hardware; set up V5 Brain and motors
- Build a minimal testbed drive base (one robot, not the competition robot)
- Understand V5 Smart Motor stall protection and port assignment

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:10 | Recap strategy sketches; choose one robot concept to prototype first |
| 0:10–0:40 | Hardware inventory: V5 Brain, Smart Motors (11W vs 5.5W), pneumatics kit (if available), sensors (distance, inertial, rotation) |
| 0:40–1:30 | Build a simple 4-motor X-drive or tank testbed from metal + motors |
| 1:30–1:50 | Connect V5 Brain via USB → flash firmware; pair V5 Controller |
| 1:50–2:00 | Homework: builders read V5 product KB (kb.vex.com) overview; programmers install PROS and run `pros new-project` |

**Common mistakes**

- Over-tightening screws into standoffs — strip threads fast on aluminum
- Mixing 11W and 5.5W motors on a drivetrain without accounting for torque difference
- Skipping firmware update → cryptic communication errors later

---

## Week 4 — First Drive Program

**Learning objectives**

- Write and deploy a basic driver-control program using PROS or VEXcode
- Map controller joysticks to drivetrain motors
- Test and iterate on controller deadband / drive feel

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:10 | Hardware check: everyone's testbed still assembled? |
| 0:10–0:40 | PROS: create project, edit `opcontrol()` to map joystick axes; or VEXcode: open blocks, build tank drive; convert to text |
| 0:40–1:10 | Deploy to V5 Brain via USB; drive the testbed around the room |
| 1:10–1:40 | Add a deadband (ignore stick values < 10%) to remove drift; re-deploy |
| 1:40–1:55 | Discussion: what feels wrong? Tune motor direction, gear ratio, or stick sensitivity |
| 1:55–2:00 | Homework: programmers read PROS docs on `Motor::move_velocity()` vs `Motor::move_voltage()` |

**Sample PROS driver-control skeleton (C++)**

```cpp
// src/main.cpp (abbreviated)
#include "main.h"

void opcontrol() {
  pros::Motor left_front(1), left_back(2), right_front(3), right_back(4);
  pros::Controller master(pros::E_CONTROLLER_MASTER);

  while (true) {
    int power = master.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y);
    int turn  = master.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_X);

    // Simple deadband
    if (abs(power) < 10) power = 0;
    if (abs(turn)  < 10) turn  = 0;

    left_front.move(power + turn);
    left_back.move(power + turn);
    right_front.move(power - turn);
    right_back.move(power - turn);

    pros::delay(20);
  }
}
```

---

## Week 5 — Autonomous Foundations

**Learning objectives**

- Understand the 15-second Autonomous period structure and Autonomous Bonus scoring
- Write a basic time-based autonomous (drive forward, score one object)
- Understand why time-based autonomous is unreliable; introduce encoder-based movement

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:10 | Review game manual autonomous bonus rules from week 2 |
| 0:10–0:40 | Write a time-based autonomous: drive forward 1 second, stop |
| 0:40–1:00 | Run it 5 times; measure how far the robot travels each time — observe variance |
| 1:00–1:30 | Replace with encoder-based movement: `move_relative(500, 100)` or ticks equivalent |
| 1:30–1:55 | Run the encoder-based version 5 times; compare consistency |
| 1:55–2:00 | Homework: read OkapiLib `ChassisController` docs or LemLib README |

---

## Week 6 — Sensors & Heading Correction

**Learning objectives**

- Install and calibrate the V5 Inertial Sensor (IMU)
- Write a gyro-corrected straight drive routine
- Introduce OkapiLib or LemLib for motion profiling

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:10 | Recap encoder results from week 5 |
| 0:10–0:30 | Mount the Inertial Sensor at the center of the robot; wire to Brain; calibrate in code |
| 0:30–1:00 | Implement gyro-corrected drive: use IMU heading as P-controller error term |
| 1:00–1:30 | Integrate OkapiLib `ChassisControllerIntegrated` or LemLib `chassis.moveToPose()` |
| 1:30–1:50 | Run a 3-movement autonomous sequence; tune PID constants |
| 1:50–2:00 | Homework: strategy sub-team designs a full autonomous routine on paper (which objects, in what order?) |

**Sample gyro-corrected straight (PROS, no library)**

```cpp
void drive_straight(pros::Motor& left, pros::Motor& right,
                    pros::Imu& imu, int distance_ticks, int speed) {
  left.tare_position(); right.tare_position();
  imu.tare_rotation();

  while (fabs(left.get_position()) < distance_ticks) {
    double error = imu.get_rotation();   // positive = drifting right
    left.move(speed - error * 1.5);
    right.move(speed + error * 1.5);
    pros::delay(10);
  }
  left.move(0); right.move(0);
}
```

---

## Week 7 — Engineering Notebook & Judging

**Learning objectives**

- Understand the VEX U engineering notebook rubric
- Set up a team notebook (physical or digital)
- Practice a mock design review presentation

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:15 | Overview: VEX U judging includes notebook, interview, and robot performance — notebook is the largest single judging factor |
| 0:15–0:45 | Review the VURC Judges Guide (download from RobotEvents); identify every section of the notebook rubric |
| 0:45–1:15 | Back-fill Week 1–6 journal entries as a group: problem statement, brainstorms, build decisions, test data, code snippets |
| 1:15–1:45 | Mock design review: two students present the robot; two others play judges; use the rubric to score and give feedback |
| 1:45–2:00 | Assign ongoing notebook ownership: who updates it each week, in what format |

**Notebook tips for VEX U**

- Judges expect **engineering depth**: stress calculations, control system block diagrams, PID tuning logs
- Include **test data tables** (encoder variance from week 5, IMU heading error from week 6)
- Document **design iterations**: what you tried first, why you changed it, what you learned
- Photo-document every build change; label parts in photos

---

## Week 8 — Scrimmage & Iteration

**Learning objectives**

- Run a full practice match (driver control + autonomous) against each other or a mock field
- Identify the top three mechanical and software failure modes
- Create a competition prep checklist

**Agenda (2 hours)**

| Time | Activity |
|---|---|
| 0:00–0:15 | Set up a practice field (or tape a simplified version on the floor) |
| 0:15–1:00 | Run 3x full practice matches: autonomous, then driver control; score each run |
| 1:00–1:20 | Failure mode analysis: what broke, what nearly broke, what was slow |
| 1:20–1:40 | Prioritise fixes: mechanical > software > strategy — pick the top 3 to address before the qualifier |
| 1:40–1:55 | Build a tournament day checklist (spare parts, battery count, notebook, pit setup) |
| 1:55–2:00 | Close: read [Starting a VEX U Team](/guides/vex-u-first-team/) and the [VEX V5 Tournament Guide](/guides/vex-v5-tournament/) before your first event |

---

## After Week 8: What's Next

By the end of this 8-week arc your team should have:

- A drivable robot with working encoder + gyro autonomous
- A started engineering notebook with 6–8 weeks of journal entries
- A registered team on RobotEvents with a qualifier on the calendar
- A clear list of open mechanical and software tasks before the event

**Suggested priorities after week 8:**

1. **Build the second robot** — VURC allows two; even a simple small robot for one specific task gives you a major strategic advantage
2. **Expand autonomous** — a full 15-second routine is table stakes at collegiate level; aim for a 3–4 movement sequence with consistent scoring
3. **Scouting prep** — VEX U alliance selection is done by the teams; build a scouting sheet before the qualifier so you know who to pick
4. **Notebook depth** — add electrical diagrams, weight analysis, code architecture description before the event
5. **Skills runs** — Autonomous and Driver Skills are scored separately; practice them as a second discipline

---

## Resources

- **[Starting a VEX U Team](/guides/vex-u-first-team/)** — registration, team structure, what to expect at year one
- **[VEX U Resource Map](/resources/vex-u-resource-map/)** — official program pages, PROS docs, community forums
- **[VEX V5/VRC Resource Map](/resources/vex-v5-resource-map/)** — hardware KB, RobotEvents, programming tools; largely applicable to VEX U hardware
- **[VEX V5 Tournament Guide](/guides/vex-v5-tournament/)** — tournament structure, alliance selection, pit strategy (V5RC focus, but VEX U is similar)
- **[Assessment Guide — All Programs](/for-educators/assessment-guide/)** — how to assess student contributions across technical and collaborative roles
- **[Engineering Notebook Guide](/guides/notebook-guide/)** — FLL-focused but core concepts (design iterations, test logs, reflections) apply directly to VEX U

---

*This is a community-contributed starting point. Adapt the pace, tool choices, and focus areas to your team. If something worked better in your context, open a pull request — the next faculty advisor will thank you.*
