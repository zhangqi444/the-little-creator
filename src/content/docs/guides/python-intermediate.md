---
title: Intermediate Python for FLL Robots
description: Level up your SPIKE Prime Python — gyro-corrected driving, basic PID control, mission selector patterns, and debugging techniques for competitive FLL teams.
tags: [fll, spike-prime, python, programming, gyro, pid, intermediate]
audience: [students, teens, coaches]
level: intermediate
season: 2025
---

You've got the basics working. Your robot drives, turns, and completes a few missions. Now you want consistency — runs that work the same way every time, not just when conditions are perfect. This guide covers the techniques that competitive FLL teams use to get there.

:::note[Prerequisites]
This guide assumes you're comfortable with the Python basics from [Robot Programming Basics](/guides/robot-programming-basics/) — motor ports, basic movement, and running programs on the SPIKE Prime hub. If you're still on block-based programming, start there first.
:::

## Why consistency is hard (and what fixes it)

The two biggest causes of inconsistent robot runs:

1. **Drift** — the robot veers off course because one motor is slightly stronger than the other, or the playing surface has friction variations.
2. **Slip** — wheels slip during acceleration or sharp turns, changing the actual distance traveled vs. what the code commanded.

Fixes:
- **Gyro-corrected driving** solves drift
- **Slower acceleration/deceleration** reduces slip
- **Consistent starting position** eliminates accumulated error from run to run

---

## Gyro-corrected driving

The SPIKE Prime hub has a built-in gyroscope (motion sensor) that measures the robot's heading in degrees. You can use it to keep the robot driving straight even when friction or motor variation would otherwise cause it to veer.

### Reset the gyro before each use

```python
from spike import PrimeHub, MotorPair
from spike.control import wait_for_seconds

hub = PrimeHub()
motors = MotorPair('A', 'B')

# Reset the yaw (heading) to zero at your current orientation
hub.motion_sensor.reset_yaw_angle()
wait_for_seconds(0.5)  # short pause after reset — gyro needs a moment to settle
```

Always reset at the start of each mission run, after returning to base, so accumulated error doesn't carry over.

### Simple gyro-straight function

```python
def drive_straight(distance_cm, speed=40):
    """Drive straight for distance_cm using gyro correction."""
    hub.motion_sensor.reset_yaw_angle()
    wait_for_seconds(0.3)

    # Approximate: at speed=40, ~1 cm ≈ 1 degree of motor rotation
    # Tune this ratio for your specific robot and surface
    target_degrees = distance_cm * 5.4  # adjust this multiplier empirically

    left_motor = hub.port.A.motor
    right_motor = hub.port.B.motor

    left_motor.run_for_degrees(int(target_degrees), speed)
    right_motor.run_for_degrees(int(target_degrees), speed)
```

**Better approach using real-time correction:**

```python
from spike import PrimeHub, Motor
from spike.control import wait_for_seconds

hub = PrimeHub()

def drive_straight_gyro(rotations, speed=40):
    """Drive straight using gyro correction loop."""
    left = hub.port.A.motor
    right = hub.port.B.motor

    hub.motion_sensor.reset_yaw_angle()
    wait_for_seconds(0.3)

    left.start(speed)
    right.start(speed)

    target_rotation = rotations * 360  # convert to degrees
    traveled = 0

    while traveled < target_rotation:
        error = hub.motion_sensor.get_yaw_angle()
        correction = error * 2  # Kp = 2; tune this value

        left.start(speed - correction)
        right.start(speed + correction)

        traveled = abs(left.get_degrees_counted())

    left.stop()
    right.stop()
```

**Tuning `Kp` (the correction multiplier):**
- Too low → robot still drifts
- Too high → robot oscillates (weaves back and forth)
- Start at 1.0, test, increase until oscillation appears, then back off slightly

---

## Basic PID control

PID stands for Proportional-Integral-Derivative. You only need the **P** (proportional) part for most FLL applications — that's what the correction loop above uses. But knowing the concept helps you tune it.

**Proportional control** says: the bigger the error, the bigger the correction.

```python
correction = error * Kp
```

Where `error` is how far off you are (e.g., current heading vs. target heading), and `Kp` is a tuning constant.

**For gyro-straight driving**, error = current yaw angle (should be 0 when driving straight).

**For turning to a precise angle:**

```python
def turn_to_angle(target_degrees, speed=30):
    """Turn to an absolute heading using proportional control."""
    hub.motion_sensor.reset_yaw_angle()
    wait_for_seconds(0.3)

    Kp = 2.0
    threshold = 2  # stop when within 2 degrees of target

    left = hub.port.A.motor
    right = hub.port.B.motor

    while True:
        error = target_degrees - hub.motion_sensor.get_yaw_angle()
        if abs(error) < threshold:
            break

        power = error * Kp
        # Clamp power to avoid stalling or overshooting
        power = max(-60, min(60, power))

        left.start(int(power))
        right.start(int(-power))  # opposite direction = turning

    left.stop()
    right.stop()
```

Tune `threshold` (how close is "close enough") and `Kp` for your robot.

---

## Mission selector pattern

Running missions one at a time with a button press is much more reliable than one giant sequential program. Here's a clean pattern:

```python
from spike import PrimeHub, MotorPair
from spike.control import wait_for_seconds

hub = PrimeHub()
motors = MotorPair('A', 'B')

# --- Define each mission as a function ---

def mission_1():
    """Drive to mission 1, complete it, return to base."""
    hub.light_matrix.show_image('GO_RIGHT')
    motors.move(30, 'cm', 0, 50)
    wait_for_seconds(0.5)
    motors.move(-30, 'cm', 0, 50)
    hub.light_matrix.show_image('YES')

def mission_2():
    hub.light_matrix.show_image('GO_RIGHT')
    # ... your mission 2 code
    hub.light_matrix.show_image('YES')

def mission_3():
    hub.light_matrix.show_image('GO_RIGHT')
    # ... your mission 3 code
    hub.light_matrix.show_image('YES')

# --- Mission list (add/reorder as needed) ---
missions = [mission_1, mission_2, mission_3]
current = 0

# --- Selector loop ---
hub.light_matrix.write(str(current + 1))  # show current mission number

while True:
    # Right button → next mission
    if hub.right_button.is_pressed():
        current = (current + 1) % len(missions)
        hub.light_matrix.write(str(current + 1))
        wait_for_seconds(0.5)  # debounce

    # Left button → run current mission
    if hub.left_button.is_pressed():
        hub.light_matrix.show_image('CLOCK12')
        missions[current]()
        current = (current + 1) % len(missions)  # auto-advance to next
        hub.light_matrix.write(str(current + 1))
        wait_for_seconds(0.5)
```

**How to use at the table:**
1. Place robot in starting position
2. Press right button to scroll to the mission you want
3. Press left button to run it
4. Robot runs, returns to base, display shows next mission number
5. Repeat

---

## Attachment motor control

Most FLL robots use one or two motors on ports C/D to operate attachments. Clean patterns:

```python
from spike import Motor

attachment = Motor('C')

# Run for a set number of degrees (most reliable)
attachment.run_for_degrees(360, 75)   # one full rotation at 75% power

# Run for time (less precise, but sometimes useful)
attachment.run_for_seconds(1.5, 50)   # 1.5 seconds at 50% power

# Run until stalled (for mechanisms that press against a stop)
attachment.run_until_stalled(40, stop_action='brake', stall_torque=30)
```

`run_for_degrees` is the most consistent — prefer it over time-based when you know the geometry of what you're moving.

---

## Debugging techniques

### Add visible checkpoints

```python
hub.light_matrix.show_image('HAPPY')   # reached this point
wait_for_seconds(0.3)
hub.light_matrix.show_image('SAD')     # about to do the tricky part
```

When a run fails, you'll know exactly where it went wrong.

### Print to the SPIKE App console

```python
print("Yaw angle:", hub.motion_sensor.get_yaw_angle())
print("Left motor degrees:", hub.port.A.motor.get_degrees_counted())
```

Visible in the SPIKE App output panel when connected via USB.

### Isolate before integrating

Test each mission function independently before running your full selector program. A bug in mission 2 is much easier to find when you're only running mission 2.

### Keep a tuning log

When you adjust `Kp`, speed, or distance values, write down what you changed and what happened. It takes 5 seconds and saves hours of re-tuning the same thing next practice.

---

## Common intermediate mistakes

| Mistake | Fix |
|---|---|
| Gyro drift between missions | Reset yaw at the start of each mission function, not just once at program start |
| Correction overcorrection (weaving) | Reduce `Kp`; start at 1.0 and tune up slowly |
| Attachment overshoots | Use `run_for_degrees` with `stop_action='brake'`; reduce speed |
| Mission selector skips missions | Add a debounce `wait_for_seconds(0.5)` after each button press |
| Works in practice, fails at tournament | Surface is different — recalibrate drive distances on the actual mat if possible |

---

## Where to go next

- [Robot Programming Basics](/guides/robot-programming-basics/) — the fundamentals this guide builds on
- [Season Planning](/guides/season-planning/) — when to invest in robot consistency vs. adding missions
- [FLL Resource Map](/resources/fll-resource-map/) — official SPIKE Prime Python API docs and community tutorials
- **Skill bundle code examples** — ready-to-use SPIKE Prime Python in the project skill bundle: `gyro-straight.py` (gyro-corrected drive + point turn), `mission-runner.py` (button-activated competition selector), `sensors.py` (color/distance/force sensor patterns). If you're using an AI coding tool (Claude Code, Cursor), the skill bundle is loaded automatically when you work in this repo.
