---
title: VEX IQ Programming Guide
description: Getting started with programming your VEX IQ robot — VEXcode Blocks, VEXcode Python, and practical techniques for competition.
tags: [vex-iq, programming, python, block-based, vexcode, beginners]
audience: [students, teens, parents, coaches]
level: beginner
season: evergreen
---

VEX IQ programming uses **VEXcode** — a free app from VEX Robotics that supports block-based and Python programming on the same brain. This guide covers both, with practical tips for making your robot perform consistently in competition.

## The VEX IQ Brain

The VEX IQ Brain is the robot's computer. It has:
- 12 smart ports for motors and sensors
- A built-in touchscreen for running and selecting programs
- Built-in inertial sensor (gyroscope + accelerometer — useful for straight driving)
- Bluetooth for wireless connection to VEXcode

Ports 1–12 are all identical — plug any smart motor or sensor into any port, then tell VEXcode which port it's on.

## Getting VEXcode

Download the **VEXcode IQ** app free from [vex.com/vexcode](https://www.vex.com/vexcode). Available for Windows, macOS, iPadOS, Android, and Chromebook.

Connect the brain to VEXcode via USB (more reliable) or Bluetooth. The app auto-detects connected motors and sensors.

## Two ways to program

| Mode | Best for |
|---|---|
| **Blocks** | First-year students, ages 8–11, no prior coding experience |
| **Python** | Second season and up, ages 12+, comfortable with text code |

You can convert a Blocks project to Python in VEXcode (one-way). Many students start with Blocks, understand the logic, then switch to Python for cleaner control.

---

## Your first program — Blocks

1. Open VEXcode IQ → **New Project** → **Blocks**
2. From the **Drivetrain** category, drag **drive forward for 200 mm** onto the canvas under the start block
3. Connect the brain and click **Download** (or **Run** if connected via Bluetooth)

The robot drives forward 200 mm. That's it — you've started.

**Setting up the drivetrain in Blocks:**
Before distance-based movement works, you need to tell VEXcode your wheel diameter and track width:
- Click **Devices** in the top menu → **Drivetrain**
- Set wheel diameter (usually 200mm for standard VEX IQ wheels)
- Set track width (measure center-to-center between left and right wheels in mm)

This calibration is important — wrong values mean your "drive 500mm" command won't actually travel 500mm.

---

## Your first program — Python

```python
# Import the VEX IQ library
from vex import *

# Initialize the brain
brain = Brain()

# Set up motors — change port numbers to match your robot
left_motor  = Motor(Ports.PORT1, False)   # False = not reversed
right_motor = Motor(Ports.PORT6, True)    # True  = reversed (right side faces opposite direction)

# Set up the drivetrain
drivetrain = SmartDrive(left_motor, right_motor, Gyro(Ports.PORT7),
                        200, 320, 40, MM)
# Parameters: left motor, right motor, gyro, wheel diameter (mm),
#             track width (mm), external gear ratio (%), units

# Drive forward 500 mm
drivetrain.drive_for(FORWARD, 500, MM)

# Turn right 90 degrees
drivetrain.turn_for(RIGHT, 90, DEGREES)

# Stop
drivetrain.stop()

brain.screen.print("Done!")
```

**Key things to adjust:**
- Port numbers to match where you plugged in your motors and gyro
- `True`/`False` for motor direction — if the robot drives backward when you expect forward, reverse that motor's `True`/`False`
- Wheel diameter and track width to match your actual robot

---

## SmartDrive vs. raw motors

**SmartDrive** is the recommended approach — it uses the built-in gyro to keep the robot driving straight and handles the math for turns. Use it whenever you're doing simple navigation.

**Raw motors** (calling `left_motor.spin_for()` directly) give you more control for advanced techniques but require you to handle gyro correction yourself. Start with SmartDrive.

---

## Gyro-corrected driving

SmartDrive already uses the gyro for you when you call `drive_for()` — you get straight driving out of the box (mostly). For more control:

```python
from vex import *

brain = Brain()
inertial = Inertial(Ports.PORT7)  # or whichever port your gyro/inertial sensor is on
left_motor  = Motor(Ports.PORT1, False)
right_motor = Motor(Ports.PORT6, True)

# Calibrate inertial sensor at startup (takes ~2 seconds — robot must be still)
inertial.calibrate()
while inertial.is_calibrating():
    wait(50, MSEC)

def drive_straight(distance_mm, speed_pct=50):
    """Drive straight using inertial sensor heading correction."""
    target_heading = inertial.heading()
    
    left_motor.spin(FORWARD, speed_pct, PERCENT)
    right_motor.spin(FORWARD, speed_pct, PERCENT)
    
    # Track distance via motor rotation
    left_motor.reset_position()
    wheel_circumference = 200 * 3.14159  # 200mm diameter
    target_degrees = (distance_mm / wheel_circumference) * 360
    
    while abs(left_motor.position(DEGREES)) < target_degrees:
        error = inertial.heading() - target_heading
        correction = error * 1.5  # Kp — tune this
        left_motor.set_velocity(speed_pct - correction, PERCENT)
        right_motor.set_velocity(speed_pct + correction, PERCENT)
        wait(10, MSEC)
    
    left_motor.stop()
    right_motor.stop()
```

**When to use SmartDrive vs. manual gyro:**
- **SmartDrive** for most competition runs — simpler, reliable
- **Manual gyro** when you need very precise control or SmartDrive isn't behaving consistently

---

## Autonomous routine structure

Structure your autonomous code the same way as FLL — one function per task, a selector if you need to choose:

```python
from vex import *

brain = Brain()
left_motor  = Motor(Ports.PORT1, False)
right_motor = Motor(Ports.PORT6, True)
drivetrain  = SmartDrive(left_motor, right_motor, Gyro(Ports.PORT7),
                         200, 320, 40, MM)
arm_motor   = Motor(Ports.PORT3, False)

def score_goal():
    drivetrain.drive_for(FORWARD, 600, MM)
    arm_motor.spin_for(FORWARD, 720, DEGREES)  # lift mechanism
    drivetrain.drive_for(REVERSE, 600, MM)

def push_stack():
    drivetrain.turn_for(RIGHT, 45, DEGREES)
    drivetrain.drive_for(FORWARD, 400, MM)
    drivetrain.drive_for(REVERSE, 400, MM)
    drivetrain.turn_for(LEFT, 45, DEGREES)

# Run tasks in order
score_goal()
push_stack()

brain.screen.print("Autonomous complete")
```

---

## Using sensors

### Inertial sensor (gyro)

Already covered above — built into the brain in VEX IQ Gen 2, or a separate smart port device on Gen 1.

### Bumper / limit switch

```python
bumper = Bumper(Ports.PORT5)

# Drive until bumper is pressed
left_motor.spin(FORWARD, 40, PERCENT)
right_motor.spin(FORWARD, 40, PERCENT)

while not bumper.pressing():
    wait(10, MSEC)

left_motor.stop()
right_motor.stop()
```

### Distance sensor

```python
distance = Distance(Ports.PORT8)

# Stop when within 100mm of an object
left_motor.spin(FORWARD, 40, PERCENT)
right_motor.spin(FORWARD, 40, PERCENT)

while distance.object_distance(MM) > 100:
    wait(10, MSEC)

left_motor.stop()
right_motor.stop()
```

### Color sensor

```python
color = ColorSensor(Ports.PORT9)

# Line following — stop when red detected
while True:
    if color.color() == Color.RED:
        left_motor.stop()
        right_motor.stop()
        break
    wait(10, MSEC)
```

---

## Competition-specific tips

### Driver control period

VEX IQ competitions have a **driver control period** (60 seconds) in addition to autonomous. Set up your controller bindings:

```python
from vex import *

brain    = Brain()
controller = Controller()
left_motor  = Motor(Ports.PORT1, False)
right_motor = Motor(Ports.PORT6, True)
arm_motor   = Motor(Ports.PORT3, False)

while True:
    # Tank drive: left stick controls left motor, right stick controls right motor
    left_speed  = controller.axis3.position()   # left stick Y
    right_speed = controller.axis2.position()   # right stick Y
    
    left_motor.spin(FORWARD, left_speed, PERCENT)
    right_motor.spin(FORWARD, right_speed, PERCENT)
    
    # Button A = raise arm, Button B = lower arm
    if controller.buttonA.pressing():
        arm_motor.spin(FORWARD, 80, PERCENT)
    elif controller.buttonB.pressing():
        arm_motor.spin(REVERSE, 80, PERCENT)
    else:
        arm_motor.stop()
    
    wait(20, MSEC)
```

### Skills Challenge

The Skills Challenge (robot runs alone, no driver in autonomous period) rewards the same principles as FLL robot missions: consistent starting position, gyro-corrected driving, and reliable task execution. Use the same autonomous function structure.

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Robot drives backward | Reverse one motor's direction flag (`True` ↔ `False`) |
| Turns overshoot or undershoot | Tune turn speed; add a `wait(200, MSEC)` after turns to let inertia settle |
| SmartDrive distances wrong | Re-measure wheel diameter and track width precisely |
| Inertial sensor reads wrong | Ensure robot is completely still during calibration; calibrate on a flat surface |
| Controller input too sensitive | Apply a deadband: `if abs(axis_value) < 5: axis_value = 0` |

---

## Learning resources

- **VEX IQ official Python API:** Accessible inside VEXcode under Help, or at [api.vex.com](https://api.vex.com)
- **VEXcode curriculum:** [education.vex.com](https://education.vex.com) — official lesson library with Blocks and Python activities
- **VEX Forum:** [vexforum.com](https://www.vexforum.com) — active community; search before posting, most questions have been answered
- **RobotEvents:** [robotevents.com](https://www.robotevents.com) — find local tournaments and registered teams

## Where to go next

- [Drivetrain Basics](/guides/drivetrain-basics/) — building the physical drivetrain that your programs control
- [Robot Programming Basics](/guides/robot-programming-basics/) — FLL/SPIKE Prime equivalent of this guide
- [What is VEX?](/getting-started/what-is-vex/) — program overview and how VEX IQ fits into the broader VEX ecosystem
