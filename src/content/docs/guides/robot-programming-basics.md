---
title: Robot Programming Basics
description: Getting started with programming your FLL Challenge robot — block-based SPIKE App and Python, with practical tips for beginners.
tags: [fll, spike-prime, programming, python, block-based, beginners]
audience: [kids, teens, parents, coaches]
level: beginner
season: 2025
---

Programming your FLL robot is one of the most rewarding parts of the season. This guide covers the two official options — block-based and Python — and gives practical tips for getting your first programs running.

:::note[Which hardware?]
This guide covers the **SPIKE Prime hub** used in the current Founders Edition (through 2027/28). If you're starting in 2026/27 or later, FIRST is launching a new Future Edition platform. We'll add a guide for that once FIRST publishes official materials.
:::

## Two ways to program

SPIKE Prime supports two programming environments, both available free in the **LEGO SPIKE App**:

| Mode | Best for | Language |
|---|---|---|
| **Word Blocks** | Ages 9–11, first season, zero coding experience | Drag-and-drop blocks |
| **Python** | Ages 12+, second season, or anyone comfortable with text code | Python 3 (MicroPython) |

You can switch between them at any time — the same hub runs both. Many teams start with blocks and switch to Python once they understand what the code is doing.

## Getting the LEGO SPIKE App

Download from the [official LEGO Education site](https://education.lego.com/en-us/downloads/spike-app/software/). Available for Windows, macOS, iPadOS, Android, and Chromebook. It's free.

Connect your SPIKE Prime hub to the app via USB (more reliable) or Bluetooth.

## Your first program — blocks

1. Open the SPIKE App → **New Project** → **Word Blocks**
2. Drag a **When program starts** block onto the canvas
3. Attach a **Move straight** block — set the distance and speed
4. Click the **Play** button (hub must be connected)

The robot should drive forward. That's it — you've programmed a robot.

**Tip for coaches:** Keep first programs short (2–3 blocks). The goal in the first session is to see something move, not to understand everything. Confidence comes first.

## Your first program — Python

Switch to **Python** mode in the SPIKE App. Every Python program starts with:

```python
from spike import PrimeHub, MotorPair
from spike.control import wait_for_seconds

hub = PrimeHub()
motors = MotorPair('A', 'B')  # A = left motor port, B = right motor port

# Drive forward 20 cm at 50% power
motors.move(20, 'cm', 0, 50)

wait_for_seconds(0.5)
hub.light_matrix.show_image('HAPPY')
```

Change `'A'` and `'B'` to whatever ports your motors are actually plugged into — look at the letters printed on the hub.

## Port conventions (common setup)

There's no single required layout, but many FLL teams use this as a starting point:

| Port | Device |
|---|---|
| A | Left drive motor |
| B | Right drive motor |
| C or D | Attachment motor |
| E | Color / line sensor |
| F | Ultrasonic distance sensor |

If your robot's behavior is reversed (turns the wrong way, backs up when it should go forward), the easiest fix is swapping the `'A'` and `'B'` arguments in your code — no rewiring needed.

## Key programming concepts for FLL missions

### Going straight

Robots rarely drive perfectly straight out of the box — one motor is slightly stronger than the other, or the surface has friction differences. Fixes:

1. **Gyro-corrected driving** — use the hub's built-in gyroscope to hold a heading. In Python:

```python
from spike import PrimeHub, MotorPair

hub = PrimeHub()
motors = MotorPair('A', 'B')

# Drive forward 30 cm while holding the current heading
motors.move_tank(30, 'cm', left_speed=50, right_speed=50)
```

For gyro-corrected: set a `target_angle` with `hub.motion_sensor.reset_yaw_angle()` and use a small PID correction loop. This is intermediate-level — worth learning by season 2.

2. **Calibrated turns** — turning a fixed number of degrees consistently is key to repeatable missions. Use `motors.move_tank` with one wheel going forward and one backward, and measure the actual degrees needed for a 90° turn (it varies by surface and robot weight).

### Stopping accurately

Abrupt stops (cutting power immediately) cause skidding. Use `motors.stop()` with `stop_action='brake'` or build in a slow-down phase before your stop point.

### Running multiple missions

Teams typically write a **separate function for each mission** and call them in order from a main program, or use a button-press selector:

```python
from spike import PrimeHub, MotorPair, Button
hub = PrimeHub()

def mission_1():
    # drive to mission 1, do the thing, drive back to base
    pass

def mission_2():
    pass

# Wait for the left button to start
hub.left_button.wait_until_pressed()
mission_1()

hub.left_button.wait_until_pressed()
mission_2()
```

This is much easier to debug than one giant program.

## Debugging tips

- **Add `hub.light_matrix.show_image()`** or `hub.speaker.beep()` at key points to know where the program is when it fails.
- **Test one mission at a time** on the mat before chaining runs together.
- **Measure, don't guess** — if a movement is 2 cm too far, change the distance value by 2 cm and test again. Iterate in small steps.
- **Consistent starting position** matters more than perfect code. Build a physical start position guide (a small LEGO block in the base area corner) so every run begins from the same spot.

## Learning resources

These are the best places to go deeper — we link out, not republish:

- **LEGO Education SPIKE Prime lessons** — [education.lego.com](https://education.lego.com/en-us/lessons/spike-prime/) — official lesson library, block and Python
- **FIRST LEGO League coding resources** — linked from the [FLL Resource Map](/resources/fll-resource-map/)
- **SPIKE Python API reference** — available inside the SPIKE App under Help, or search "SPIKE Prime Python API" on the LEGO Education site

## When to move from blocks to Python

There's no required age or timeline. A useful signal: if a kid is annoyed that blocks feel limiting, they're ready for Python. Common triggers:

- "I want to make a function that does X" (blocks support functions, but Python is cleaner)
- "I want to use a variable to track how many missions we've done"
- "Blocks feel slow to type — I want to just write it"

Python opens up more control over the gyro, sensors, and custom logic. The learning curve is real but very manageable for motivated kids 11 and up.

## Where to go next

- [Season Planning](/guides/season-planning/) — where programming fits in the overall season timeline
- [FLL Resource Map](/resources/fll-resource-map/) — official SPIKE Prime documentation and community tutorials
