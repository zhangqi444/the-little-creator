---
title: VEX V5 Programming Basics
description: Getting started with programming your VEX V5 / VRC robot — VEXcode Pro V5, blocks vs. C++, drive base control, sensor basics, and an autonomous skeleton for rookie V5RC teams.
tags: [vex-v5, vrc, programming, cpp, vexcode, beginners, autonomous, teleop]
audience: [teens, coaches]
level: beginner
season: evergreen
---

:::note[Program scope]
This guide is for **VEX V5 / VRC (VEX Robotics Competition)** teams. For younger students on VEX IQ, see [VEX IQ Programming Guide](/guides/vex-iq-programming/). For FTC, see [FTC Programming Basics](/guides/ftc-programming-basics/). For FRC, see [FRC Programming Basics](/guides/frc-programming-basics/).
:::

VEX V5 robots are programmed with **VEXcode Pro V5** — a free IDE from VEX Robotics that supports drag-and-drop Blocks and text-based C++. Most competitive VRC teams use C++ (or PROS, covered below), but Blocks is a legitimate starting point and produces competitive code at the rookie level.

---

## The VEX V5 Brain

The V5 Brain is the robot's main computer:

- **21 Smart Ports** — for V5 Smart Motors, sensors, and the V5 Radio (for competition control)
- **Full-colour touchscreen** — run, select, and debug programs directly on the brain
- **Built-in SD card slot** — stores user programs; no PC required to run a saved program
- **USB-A port** — for wireless download via V5 Controller USB dongle
- **Python / C++ / Blocks** — all three languages compile to the same ARM firmware

V5 Smart Motors have **built-in encoders and temperature feedback** — you do not need external encoder modules for position tracking.

---

## The three ways to program VEX V5

| Environment | Language | Setup | Best for |
|---|---|---|---|
| **VEXcode Blocks** | Drag-and-drop | Free, browser or desktop app | First-year students, ages 12–14, no prior coding |
| **VEXcode Pro V5** | C++ (or Python) | Free desktop app (Windows / macOS) | Most competitive teams — full language, fast iteration |
| **PROS** | C / C++ | VS Code extension, free | Advanced teams needing custom control libraries, OkapiLib |

Most rookie V5RC teams start with **VEXcode Pro V5** in Blocks and migrate to C++ within their first season. PROS is worth learning in year two if your team writes custom PID or motion-profiling code.

---

## Getting VEXcode Pro V5

Download free from [vex.com/vexcode](https://www.vex.com/vexcode). Install the desktop app on Windows or macOS.

Connect the V5 Brain via USB or the wireless tether cable. VEXcode auto-detects the brain, shows the firmware version, and lets you download programs.

:::tip
Always update the V5 Brain firmware at the start of a new season — VEX pushes firmware updates that fix motor control bugs and add new API features.
:::

---

## Your first program — Blocks

1. Open VEXcode Pro V5 → **New Project** → **Blocks**
2. In the **Drivetrain** category, drag **drivetrain drive for 200 mm** under the start block
3. Connect the brain and click **Download** (or **Run** with wireless tether)

The robot drives forward 200 mm. Before reliable movement works, configure the drivetrain:

1. Click **Devices** (top toolbar) → **Add a Drivetrain**
2. Choose your motor ports (e.g., Left Motor: Port 1, Right Motor: Port 10)
3. Set **wheel travel** (circumference in mm — use `wheel_diameter × π`, e.g., 319 mm for a 4-inch wheel)
4. Set **track width** (centre-to-centre between left and right wheels in mm)
5. Set **gear ratio** (input-to-output; 1:1 if motors drive wheels directly)

These calibration values determine how far "drive 500mm" actually travels — measure carefully.

---

## Your first program — C++

A minimal TeleOp that drives a two-motor tank drivetrain:

```cpp
#include "vex.h"

using namespace vex;

// Global device declarations
brain      Brain;
motor      leftMotor(PORT1, ratio18_1, false);   // false = not reversed
motor      rightMotor(PORT10, ratio18_1, true);   // true  = reversed (faces other direction)
controller Controller1;

int main() {
    // Run while the robot is enabled in TeleOp
    while (true) {
        // Tank drive: each stick controls one side
        double leftSpeed  = Controller1.Axis3.position();  // left stick Y
        double rightSpeed = Controller1.Axis2.position();  // right stick Y

        leftMotor.spin(fwd, leftSpeed, pct);
        rightMotor.spin(fwd, rightSpeed, pct);

        wait(20, msec);  // Prevent CPU saturation
    }
}
```

**Key things to adjust:**
- Port numbers (`PORT1`, `PORT10`) must match where your motors are physically plugged in
- `ratio18_1` is the internal cartridge gear ratio — use `ratio18_1` (200 RPM, green) for most drive bases; `ratio6_1` (600 RPM, blue) for high-speed drivetrains
- `true`/`false` for reversed — motors on opposite sides of the robot face opposite directions; one side needs to be reversed so both drive forward together

---

## Motor cartridges and speed

V5 Smart Motors come with interchangeable gear cartridges:

| Cartridge | Constant | Free speed | Best for |
|---|---|---|---|
| Red | `ratio36_1` | 100 RPM | High-torque mechanisms (lifts, claws) |
| Green | `ratio18_1` | 200 RPM | Standard drive bases |
| Blue | `ratio6_1` | 600 RPM | High-speed drivetrains with external gear reduction |

Most rookie teams use **green cartridges** in the drivetrain and **red cartridges** for arms and lifts.

---

## The Drivetrain API — simple autonomous

VEXcode provides a high-level `smartdrive` API that handles forward/backward/turning without manual motor management:

```cpp
#include "vex.h"

using namespace vex;

brain      Brain;
motor      leftMotor(PORT1, ratio18_1, false);
motor      rightMotor(PORT10, ratio18_1, true);
inertial   InertialSensor(PORT7);

// Create smartdrive: left motor, right motor, inertial sensor,
// wheel travel (mm), track width (mm), wheelbase (mm), unit
smartdrive Drivetrain(leftMotor, rightMotor, InertialSensor,
                      319.19, 295, 40, mm);

int main() {
    // Calibrate inertial sensor — robot must be still for ~2 seconds
    InertialSensor.calibrate();
    while (InertialSensor.isCalibrating()) {
        wait(50, msec);
    }

    // Autonomous: drive and turn
    Drivetrain.driveFor(forward, 600, mm);
    Drivetrain.turnFor(right, 90, degrees);
    Drivetrain.driveFor(forward, 400, mm);
    Drivetrain.turnFor(left, 90, degrees);

    Brain.Screen.print("Autonomous done");
}
```

`smartdrive` uses the inertial sensor to keep the robot driving straight and to execute accurate turns — no manual PID required for basic autonomous.

---

## Structuring competition code

VEX V5 competition matches have two periods: **Autonomous** (15 seconds) and **Driver Control** (1 minute 45 seconds). VEXcode provides a **Competition template** that wires these up automatically.

```cpp
#include "vex.h"

using namespace vex;

brain       Brain;
competition Competition;

motor      leftMotor(PORT1, ratio18_1, false);
motor      rightMotor(PORT10, ratio18_1, true);
controller Controller1;
inertial   InertialSensor(PORT7);
smartdrive Drivetrain(leftMotor, rightMotor, InertialSensor,
                      319.19, 295, 40, mm);

// ── Pre-Autonomous ─────────────────────────────────────────────────────────
void pre_auton() {
    // Calibrate sensors, set motor braking mode, etc.
    InertialSensor.calibrate();
    while (InertialSensor.isCalibrating()) { wait(50, msec); }

    leftMotor.setBrake(brake);
    rightMotor.setBrake(brake);
}

// ── Autonomous ─────────────────────────────────────────────────────────────
void autonomous() {
    Drivetrain.driveFor(forward, 600, mm);
    Drivetrain.turnFor(right, 90, degrees);
    Drivetrain.driveFor(forward, 400, mm);
}

// ── Driver Control ─────────────────────────────────────────────────────────
void drivercontrol() {
    while (true) {
        leftMotor.spin(fwd, Controller1.Axis3.position(), pct);
        rightMotor.spin(fwd, Controller1.Axis2.position(), pct);
        wait(20, msec);
    }
}

// ── Main ───────────────────────────────────────────────────────────────────
int main() {
    Competition.autonomous(autonomous);
    Competition.drivercontrol(drivercontrol);

    pre_auton();

    while (true) { wait(100, msec); }
}
```

**Why use the Competition template?**
The competition switch on the V5 field controller only calls `autonomous()` and `drivercontrol()` at the right times. Without this template, a robot connected to a competition field may run autonomous code during driver control (or vice versa), which causes immediate disqualification.

---

## Sensors

### Inertial sensor (gyro + accelerometer)

The V5 Inertial Sensor is the most important sensor for consistent autonomous runs. It reports heading (0–359°), rotation (continuous), and acceleration on all three axes.

```cpp
inertial InertialSensor(PORT7);

// Calibrate at startup
InertialSensor.calibrate();
while (InertialSensor.isCalibrating()) { wait(50, msec); }

// Read heading
double heading = InertialSensor.heading();  // 0–359 degrees
```

Always calibrate on a flat, still surface before any autonomous run. The calibration takes about 2 seconds and sets the reference zero.

### Motor encoder

Every V5 Smart Motor has a built-in encoder. Use it to measure distance or track arm position:

```cpp
leftMotor.resetPosition();

// Drive until left motor has turned enough for ~500 mm
// Degrees = (distance / wheel_circumference) * 360
// For 319 mm circumference: 500 / 319 * 360 ≈ 564 degrees
while (leftMotor.position(degrees) < 564) {
    leftMotor.spin(fwd, 50, pct);
    rightMotor.spin(fwd, 50, pct);
    wait(10, msec);
}
leftMotor.stop();
rightMotor.stop();
```

The `smartdrive` API handles this math for you — use raw encoder access for custom PID or when `smartdrive` accuracy is not sufficient.

### Rotation sensor

The V5 Rotation Sensor is an absolute encoder useful for measuring arm or intake position more reliably than a motor encoder after a stall:

```cpp
rotation armSensor(PORT5);

double armAngle = armSensor.position(degrees);  // absolute position
```

### Distance sensor

```cpp
distance DistanceSensor(PORT8);

// Drive until within 100 mm of a wall or game element
leftMotor.spin(fwd, 40, pct);
rightMotor.spin(fwd, 40, pct);

while (DistanceSensor.objectDistance(mm) > 100) {
    wait(10, msec);
}

leftMotor.stop();
rightMotor.stop();
```

---

## Common drivetrain configurations

VRC robots most commonly use one of three drivetrain styles:

| Style | Wheels | Pros | Cons |
|---|---|---|---|
| **Tank (skid-steer)** | 4–6 traction wheels | Simple, strong pushing power | Cannot strafe |
| **X-holonomic** | 4 omni wheels at 45° | Strafe and spin simultaneously | Lower pushing power |
| **H-drive** | 4 omni + 1 centre sideways omni | Strafe without reducing forward power | Requires 5th motor |

Most rookie teams build a **tank drivetrain** first — it is mechanically straightforward, easy to program, and competitive at the entry level.

---

## Autonomous strategy tips

1. **Start from the same position every run.** Use a physical bumper or field perimeter as a reference. Even 1 cm of start-position variance multiplies into large errors.
2. **Calibrate the inertial sensor in `pre_auton()`**, not inside `autonomous()`. Competition match timing begins when `autonomous()` is called — a 2-second calibration wastes 13% of your 15 seconds.
3. **Use `driveFor()` with the default blocking mode.** The blocking version is simpler and more reliable for sequential tasks.
4. **Brake mode matters.** `leftMotor.setBrake(brake)` stops the motor actively; `coast` lets it spin down. Use `brake` or `hold` for precise autonomous movement.
5. **Log to the Brain screen.** `Brain.Screen.print()` is your best debugging tool — print sensor readings and task names during testing.

---

## PROS (advanced)

[PROS](https://pros.cs.purdue.edu/) is an alternative development platform built on the same V5 firmware but using the VS Code IDE. Key advantages over VEXcode Pro V5:

- **OkapiLib** — a high-quality motion-profiling and PID library maintained by the community
- **Better tooling** — VS Code IntelliSense, git integration, proper build system
- **More control** — direct access to RTOS tasks and lower-level motor APIs

PROS is worth learning after your team is comfortable with VEXcode C++ and wants to implement motion profiling, odometry (field-centric autonomous), or more sophisticated drive controllers. The official getting-started guide is at [pros.cs.purdue.edu/v5/getting-started](https://pros.cs.purdue.edu/v5/getting-started/index.html).

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Robot drives in wrong direction | Flip `true`/`false` on one motor; check which side faces which direction |
| Turns overshoot | Reduce turn speed with `Drivetrain.setTurnVelocity(30, pct)` before `turnFor()` |
| Inertial sensor drifts across a match | Calibrate in `pre_auton()` not during autonomous; re-seat the sensor connector |
| Motors overheat during driver control | Switch to `coast` brake mode; reduce spin speed on non-critical mechanisms; check for mechanical binding |
| Controller axis too sensitive (twitchy) | Apply a deadband: `if (std::abs(val) < 5) val = 0;` before passing to `spin()` |
| Program runs in wrong match period | Always use the Competition template so the field controller calls `autonomous()` and `drivercontrol()` at the right times |

---

## Learning resources

- **VEXcode Pro V5 API reference:** [api.vex.com](https://api.vex.com) — full C++ and Python API for every V5 device
- **VEX Knowledge Base:** [kb.vex.com](https://kb.vex.com) — setup guides, motor configuration, troubleshooting
- **VEX Forum — V5 Technical:** [vexforum.com](https://www.vexforum.com) — the best community resource; search before posting
- **PROS documentation:** [pros.cs.purdue.edu](https://pros.cs.purdue.edu/) — for teams ready to move beyond VEXcode
- **RobotEvents:** [robotevents.com](https://www.robotevents.com) — find local V5RC tournaments and skills rankings

---

## Where to go next

- [VEX IQ Programming Guide](/guides/vex-iq-programming/) — VEX IQ (younger students) equivalent of this guide
- [Drivetrain Basics](/guides/drivetrain-basics/) — building the physical drive base that your programs control
- [VEX Awards — What Each One Rewards](/guides/vex-awards/) — what Design, Think, and Excellence Award judges look for
- [Your First VEX Tournament — What to Expect](/guides/first-vex-tournament/) — the Skills Challenge, qualification matches, and alliance selection
- [What is VEX?](/getting-started/what-is-vex/) — program overview and how V5 / VRC fits into the broader VEX ecosystem
