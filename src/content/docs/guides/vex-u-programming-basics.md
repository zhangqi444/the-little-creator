---
title: VEX U Programming Basics
description: Getting started with programming your VEX U / VURC robots — PROS C++, LemLib / OkapiLib, drive-base control, sensor setup, and an autonomous skeleton for rookie VURC college teams.
tags: [vex-u, vurc, programming, cpp, pros, lemlib, okapilib, autonomous, teleop, college]
audience: [teens, coaches]
level: intermediate
season: evergreen
---

:::note[Program scope]
This guide is for **VEX U / VURC (VEX University Robotics Competition)** college teams. For high school VEX V5/VRC, see [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/). For VEX IQ, see [VEX IQ Programming Guide](/guides/vex-iq-programming/). For FTC, see [FTC Programming Basics](/guides/ftc-programming-basics/).
:::

VEX U teams program using **PROS** (Purdue Robotics Operating System) — a community-maintained SDK built on the same V5 firmware as VEXcode but running inside a VS Code-based IDE with full C++ tooling, RTOS tasks, and access to community motion-profiling libraries.

VEX U differs from V5RC in three key ways that shape your programming approach:

1. **Two robots per alliance** — each robot has its own V5 Brain; teams coordinate via V5 Controller radio links (one "primary" driver, one "partner" controller operator).
2. **No size or weight limits** — larger robots use more motors and more sensors than typical V5RC designs.
3. **The Autonomous Period is 15 seconds** — same as V5RC, but two-robot autonomous coordination is expected at the collegiate level.

---

## The PROS ecosystem

| Tool | Role |
|---|---|
| **PROS kernel** | V5 firmware wrapper; manages RTOS tasks, motor APIs, sensor APIs |
| **VS Code + PROS Extension** | IDE; project creation, building, downloading |
| **OkapiLib** | High-level chassis abstraction, odometry, PID, motion profiling |
| **LemLib** | Newer alternative to OkapiLib; odometry, path-following, pure pursuit |
| **pros-cli** | Command-line build / download tool (for CI, scripting, headless workflows) |

Most competitive VEX U teams use **PROS + LemLib** in their second year and beyond. Rookies should start with **PROS + OkapiLib** or the plain PROS API — either is valid.

---

## Setting up PROS

1. Install [VS Code](https://code.visualstudio.com/).
2. Install the [PROS Extension](https://marketplace.visualstudio.com/items?itemName=sigbots.pros) from the VS Code Marketplace.
3. In VS Code, open the PROS panel -> **Create a new project** -> select the latest PROS kernel template.
4. Connect the V5 Brain via USB. Use **PROS: Download** to flash the program.

:::tip
Run `pros conductor new-project my-robot pros-kernel@3.x.x` from the terminal if you prefer the CLI workflow. The team's robots should be in separate PROS projects — one per V5 Brain.
:::

---

## Project structure

```
my-robot/
├── include/
│   └── main.h          # Global declarations — devices, constants
├── src/
│   └── main.cpp        # Autonomous + TeleOp logic
├── Makefile            # PROS build system (rarely edit)
└── project.pros        # Kernel version and library declarations
```

Device declarations in `main.h` or the top of `main.cpp` — exposed as `extern` globals so multiple files can reference them.

---

## Device setup

```cpp
// main.h (or top of main.cpp)
#pragma once
#include "pros/api.h"

// Drive motors (6-motor tank example)
// Port numbers match where Smart Cables are plugged into the V5 Brain.
// Negative port = motor is reversed (faces backward relative to forward motion).
extern pros::Motor leftFront;    // PORT 1
extern pros::Motor leftMid;      // PORT 2
extern pros::Motor leftBack;     // PORT 3
extern pros::Motor rightFront;   // PORT 10 (reversed)
extern pros::Motor rightMid;     // PORT 9  (reversed)
extern pros::Motor rightBack;    // PORT 8  (reversed)

// Sensors
extern pros::Imu    imu;         // V5 Inertial Sensor, PORT 7
extern pros::Rotation liftSensor; // Rotation Sensor on lift arm, PORT 5

// Controllers
extern pros::Controller driver;   // Driver 1 (primary)
extern pros::Controller partner;  // Driver 2 / subsystem operator
```

```cpp
// main.cpp — definitions
#include "main.h"

pros::Motor leftFront(1,  pros::E_MOTOR_GEAR_GREEN, false);
pros::Motor leftMid  (2,  pros::E_MOTOR_GEAR_GREEN, false);
pros::Motor leftBack (3,  pros::E_MOTOR_GEAR_GREEN, false);
pros::Motor rightFront(10, pros::E_MOTOR_GEAR_GREEN, true);
pros::Motor rightMid  (9,  pros::E_MOTOR_GEAR_GREEN, true);
pros::Motor rightBack (8,  pros::E_MOTOR_GEAR_GREEN, true);

pros::Imu    imu(7);
pros::Rotation liftSensor(5);

pros::Controller driver (pros::E_CONTROLLER_MASTER);
pros::Controller partner(pros::E_CONTROLLER_PARTNER);
```

**Motor gear constants:**

| Constant | Cartridge | Free speed | Typical use |
|---|---|---|---|
| `E_MOTOR_GEAR_RED` | Red | 100 RPM | High-torque lifts |
| `E_MOTOR_GEAR_GREEN` | Green | 200 RPM | Standard drive bases |
| `E_MOTOR_GEAR_BLUE` | Blue | 600 RPM | High-speed drivetrains |

---

## TeleOp — tank drive skeleton

```cpp
void opcontrol() {
    while (true) {
        // Drivetrain
        int leftY  = driver.get_analog(pros::E_CONTROLLER_ANALOG_LEFT_Y);
        int rightY = driver.get_analog(pros::E_CONTROLLER_ANALOG_RIGHT_Y);

        // Deadband — ignore joystick noise below +/-5
        if (std::abs(leftY)  < 5) leftY  = 0;
        if (std::abs(rightY) < 5) rightY = 0;

        leftFront.move(leftY);
        leftMid.move(leftY);
        leftBack.move(leftY);
        rightFront.move(rightY);
        rightMid.move(rightY);
        rightBack.move(rightY);

        // Partner controller — subsystem operator
        // Example: intake on R1/R2, lift on L1/L2
        if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_R1)) {
            intakeMotor.move(127);
        } else if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_R2)) {
            intakeMotor.move(-127);
        } else {
            intakeMotor.move(0);
        }

        if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_L1)) {
            liftMotor.move(100);
        } else if (partner.get_digital(pros::E_CONTROLLER_DIGITAL_L2)) {
            liftMotor.move(-80);
        } else {
            liftMotor.move(0);
        }

        // Slow mode (hold A on driver controller)
        if (driver.get_digital(pros::E_CONTROLLER_DIGITAL_A)) {
            leftFront.move(leftY   * 0.4);
            leftMid.move  (leftY   * 0.4);
            leftBack.move (leftY   * 0.4);
            rightFront.move(rightY * 0.4);
            rightMid.move  (rightY * 0.4);
            rightBack.move (rightY * 0.4);
        }

        pros::delay(20);
    }
}
```

---

## Autonomous — IMU straight drive and point-turn

VEX U's 15-second Autonomous Period rewards consistent, well-tested routines. The inertial sensor (IMU) is essential for keeping the robot driving straight and turning accurately.

```cpp
// Drive straight for a given number of encoder ticks with IMU heading correction.
void driveStraight(int ticks, int speed) {
    double startHeading = imu.get_heading();

    leftFront.move_relative(ticks, speed);
    leftMid.move_relative(ticks, speed);
    leftBack.move_relative(ticks, speed);
    rightFront.move_relative(ticks, speed);
    rightMid.move_relative(ticks, speed);
    rightBack.move_relative(ticks, speed);

    while (!leftFront.is_stopped() || !rightFront.is_stopped()) {
        double error = imu.get_heading() - startHeading;
        if (error > 180)  error -= 360;
        if (error < -180) error += 360;

        double correction = error * 1.5;  // proportional gain — tune to your robot
        leftFront.move_velocity(speed - correction);
        leftMid.move_velocity  (speed - correction);
        leftBack.move_velocity (speed - correction);
        rightFront.move_velocity(speed + correction);
        rightMid.move_velocity  (speed + correction);
        rightBack.move_velocity (speed + correction);

        pros::delay(20);
    }

    leftFront.brake(); leftMid.brake(); leftBack.brake();
    rightFront.brake(); rightMid.brake(); rightBack.brake();
}

// Turn to an absolute heading (0–360 degrees).
void turnToHeading(double targetDeg, int speed) {
    double error;
    do {
        error = targetDeg - imu.get_heading();
        if (error > 180)  error -= 360;
        if (error < -180) error += 360;

        int turnPower = (int)(error * 2.5);  // proportional — tune to your robot
        turnPower = std::max(-speed, std::min(speed, turnPower));

        leftFront.move(-turnPower);
        leftMid.move  (-turnPower);
        leftBack.move (-turnPower);
        rightFront.move(turnPower);
        rightMid.move  (turnPower);
        rightBack.move (turnPower);

        pros::delay(20);
    } while (std::abs(error) > 2.0);  // +/-2 degree tolerance

    leftFront.brake(); leftMid.brake(); leftBack.brake();
    rightFront.brake(); rightMid.brake(); rightBack.brake();
}

// initialize() — called once at startup
void initialize() {
    imu.reset();  // Calibrate IMU — robot must be still (~2 seconds)
    while (imu.is_calibrating()) { pros::delay(50); }

    leftFront.set_brake_mode(pros::E_MOTOR_BRAKE_BRAKE);
    leftMid.set_brake_mode  (pros::E_MOTOR_BRAKE_BRAKE);
    leftBack.set_brake_mode (pros::E_MOTOR_BRAKE_BRAKE);
    rightFront.set_brake_mode(pros::E_MOTOR_BRAKE_BRAKE);
    rightMid.set_brake_mode  (pros::E_MOTOR_BRAKE_BRAKE);
    rightBack.set_brake_mode (pros::E_MOTOR_BRAKE_BRAKE);

    pros::lcd::initialize();
    pros::lcd::print(0, "IMU calibrated - ready");
}

// autonomous() — called by field control at match start
void autonomous() {
    // Example: drive ~600 mm, turn 90 degrees right, drive ~400 mm
    // Adjust tick counts to match your robot's encoder calibration
    driveStraight(1800, 80);
    turnToHeading(90.0, 60);
    driveStraight(1200, 80);
}
```

:::caution[Calibrate the IMU in initialize(), not autonomous()]
`initialize()` runs before the match starts. If you calibrate inside `autonomous()`, you waste part of your 15-second window. Always calibrate at startup.
:::

---

## Two-robot autonomous coordination

VEX U allows two robots per alliance. Coordinating them in the 15-second Autonomous Period is where collegiate teams earn the Autonomous Win Point. Strategies:

### Option A — Independent scripts (simplest)
Each robot runs a fully independent autonomous script targeting different field zones. No radio communication needed. Works reliably if start positions are fixed.

### Option B — Controller radio sync
The V5 Radio relays button states between robots via the V5 Controller pairing. Use a button held by the driver to trigger a second-robot sequence — crude but reliable for a two-step handoff.

### Option C — PROS task messaging (advanced)
PROS supports multi-task communication via shared variables and mutexes. A background task on each robot polls for coordination signals. Requires careful timing and deadlock-avoidance — recommended only after a reliable Option A is in place.

For most rookie VEX U teams, **Option A** is the right starting point. Add coordination in year two once base autonomous reliability is high.

---

## Using OkapiLib (recommended for rookies)

[OkapiLib](https://okapilib.github.io/OkapiLib/) is a high-level chassis abstraction bundled with PROS. It wraps motor groups, provides PID, and handles `moveDistance` / `turnAngle` without manual encoder math.

### Add OkapiLib to your project

```bash
# From the PROS CLI inside your project directory
pros conductor add okapi@4.x.x
```

### Minimal chassis setup

```cpp
#include "okapi/api.hpp"
using namespace okapi;

auto chassis = ChassisControllerBuilder()
    .withMotors(
        {1, 2, 3},      // Left motors (ports, positive = forward)
        {-10, -9, -8}   // Right motors (ports, negative = reversed)
    )
    .withDimensions(
        AbstractMotor::gearset::green,         // Green cartridges (200 RPM)
        {{4_in, 13_in}, imev5GreenTPR}         // 4-inch wheels, 13-inch track width
    )
    .withSensors(IMUSensor(7))                 // IMU on port 7
    .build();

// In autonomous():
chassis->moveDistance(600_mm);   // Drive forward 600 mm
chassis->turnAngle(90_deg);      // Turn 90 degrees right
chassis->moveDistance(400_mm);   // Drive forward 400 mm
```

OkapiLib handles encoder tracking, PID, and IMU corrections internally. Tune the PID constants via `.withGains()` on the builder if the robot overshoots or undershoots.

---

## Using LemLib (advanced)

[LemLib](https://lemlib.readthedocs.io/) is a newer alternative to OkapiLib focusing on **pure pursuit path following** and **odometry** — the robot tracks its absolute position on the field and follows smooth curves rather than straight-line sequences.

LemLib is worth learning once your team wants to run multi-element autonomous routines that would otherwise require dozens of precise drive + turn calls. The setup is more complex (requires tracking wheels or odometry pods) but the pay-off for longer paths is significant.

Official getting-started: [lemlib.readthedocs.io/en/stable/tutorials/getting_started.html](https://lemlib.readthedocs.io/en/stable/tutorials/getting_started.html)

---

## Sensors for VEX U

| Sensor | API | Common use |
|---|---|---|
| **Inertial (IMU)** | `pros::Imu` | Heading correction, turn accuracy |
| **Rotation Sensor** | `pros::Rotation` | Absolute arm/lift angle; odometry |
| **Distance Sensor** | `pros::Distance` | Object detection, wall alignment |
| **Optical Sensor** | `pros::Optical` | Game piece colour/hue detection |
| **Vision Sensor** | `pros::Vision` | Object tracking (limited FoV) |
| **Motor encoder** | Built into `pros::Motor` | Distance tracking without external sensors |

For odometry (field-centric position), teams typically add two or three Rotation Sensors as dedicated tracking wheels mounted on spring-loaded pods perpendicular to the drive chassis. This gives X, Y, and heading without relying on the drive motors' integrated encoders, which slip under defence.

---

## Multi-tasking with PROS

PROS runs an RTOS (FreeRTOS) — you can run multiple tasks simultaneously:

```cpp
// Background task to print telemetry to the Brain screen
void telemetryTask(void*) {
    while (true) {
        pros::lcd::print(0, "Heading: %.1f", imu.get_heading());
        pros::lcd::print(1, "Left enc: %d", leftFront.get_position());
        pros::lcd::print(2, "Right enc: %d", rightFront.get_position());
        pros::delay(100);
    }
}

void opcontrol() {
    pros::Task telem(telemetryTask, nullptr, "telemetry");

    while (true) {
        // ... main driver control code ...
        pros::delay(20);
    }
}
```

Keep background tasks non-blocking and use `pros::delay()` to yield CPU. Never `while(true)` without a delay — it will starve other tasks.

---

## Autonomous strategy for VEX U

1. **Win Point first.** The Autonomous Win Point (AWP) requires both alliance robots to complete their tasks. One reliable 15-second routine per robot beats an ambitious but inconsistent one.
2. **Physical alignment aids.** Bumpers against the field perimeter, corner guides, and other physical reference tools are legal in VEX U and dramatically improve autonomous consistency — invest in them early.
3. **Fallback routine.** Program a minimal safe fallback (drive out of start zone, score nothing) that activates if a pre-match sensor check fails.
4. **Coordinate start zones.** Pre-match, agree on which robot covers which field half. Document this in your engineering notebook (judges ask about match strategy).
5. **Log to the Brain screen.** During autonomous, print task names and sensor readings. After a failed run, the screen log tells you exactly where it went wrong.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| IMU drift mid-match | Mount the sensor rigidly; vibration causes drift. Re-seat the connector. |
| Robot veers during straight drive | Tune the heading correction gain; also check for mechanical binding. |
| Two robots collide in autonomous | Define strict field zones per robot; build a bumper collision into the fallback abort condition. |
| Controller axis twitchy at centre | Always apply a deadband before passing values to `.move()`. |
| Motors overheat during long TeleOp | Reduce max velocity on non-critical tasks; check for mechanical binding. |
| Partner controller input ignored | Confirm the partner controller is paired to the V5 Brain at match start; test both in the field inspection queue. |
| OkapiLib moveDistance overshoots | Tune P/D gains via `.withGains()` on the ChassisControllerBuilder; reduce speed as a quick fix. |

---

## Learning resources

- **PROS documentation:** [pros.cs.purdue.edu](https://pros.cs.purdue.edu/) — kernel API reference, getting started guides
- **OkapiLib documentation:** [okapilib.github.io/OkapiLib](https://okapilib.github.io/OkapiLib/) — chassis builder, motion profiles
- **LemLib documentation:** [lemlib.readthedocs.io](https://lemlib.readthedocs.io/) — odometry, pure pursuit, advanced autonomous
- **VEX Forum — VEX U:** [vexforum.com/c/vex-u](https://www.vexforum.com/c/vex-u) — community Q&A; search before posting
- **RobotEvents:** [robotevents.com](https://www.robotevents.com) — event listings, skills rankings, VURC game manuals
- **VEX U code examples:** `skill/examples/vex-u/autonomous-base.cpp` and `teleop-driver.cpp` in this skill bundle

---

## Where to go next

- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — VEX V5/VRC equivalent (high school level)
- [VEX U Robot Design Guide](/guides/vex-u-robot-design/) — drivetrain selection, two-robot sizing strategy, mechanism design
- [VEX Awards — What Each One Rewards](/guides/vex-awards/) — Excellence and Design award judging for VURC
- [What is VEX U?](/getting-started/what-is-vex-u/) — program overview, VURC format, eligibility
- [VEX U — Forming Your First University Team](/guides/vex-u-first-team/) — recruiting, university registration, funding
