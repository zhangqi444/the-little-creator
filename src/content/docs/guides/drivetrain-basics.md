---
title: Drivetrain Basics for FLL and VEX IQ
description: How to build a reliable robot drive base — wheel choices, gear ratios, common mistakes, and tuning tips for SPIKE Prime and VEX IQ robots.
tags: [fll, vex-iq, spike-prime, drivetrain, building, robot-design, intermediate]
audience: [kids, teens, coaches, parents]
level: beginner
season: evergreen
---

A reliable drivetrain is the foundation of a competitive robot. If your robot can't drive straight and stop accurately, no amount of clever programming will save you. This guide covers what matters when building a drive base for FLL (SPIKE Prime) and VEX IQ robots.

## What makes a drivetrain "reliable"

A reliable drivetrain:
- Drives straight without drifting (or drifts consistently enough to correct in software)
- Turns predictable angles run after run
- Doesn't slip wheels during acceleration or sharp turns
- Can handle the load of your attachments without stalling

Most drivetrain problems are mechanical — bad gear meshing, uneven weight distribution, wheels that aren't parallel — and can't be fully fixed with code. Fix the build first.

---

## Drive configurations

### Differential drive (tank drive) — recommended for beginners

Two driven wheels on either side, with one or two passive caster wheels or a glide block at the front or back. Each side is controlled independently — to turn, you run one side faster or in reverse.

**Pros:** Simple, easy to program, works on all LEGO and VEX IQ bases, gyro-correctable
**Cons:** Turns have a fixed radius unless you do a point turn; can't strafe sideways

This is what most FLL and VEX IQ teams use, and it's what this guide focuses on.

### Holonomic / mecanum drive — advanced

Mecanum wheels allow the robot to move in any direction including sideways. More complex to build and program.

**For FLL:** The added complexity rarely pays off at the qualifying level. Master differential drive first.
**For VEX IQ:** Mecanum is available and used at the competitive level — worth exploring in season 2+.

---

## SPIKE Prime drivetrain tips

### Wheel size and gear ratio

SPIKE Prime comes with several wheel sizes. Larger wheels:
- Travel more distance per rotation (faster)
- Have more traction
- Raise the center of gravity slightly

For FLL, the **medium-sized SPIKE tires** (56mm diameter) are a good balance of speed and traction. Very large wheels can reduce control at low speeds.

**Direct drive** (motor → axle → wheel, no gears) is the simplest and most common. Gear reductions slow the robot down but give more torque — useful if your attachments are heavy or if your robot keeps stalling on mats.

### Wheel alignment

The most common cause of robot drift is wheels that aren't parallel or aren't the same height off the ground. Check:
- Both drive wheels should be exactly the same diameter (don't mix wheel types on one side)
- The axle should be perpendicular to the robot's center line
- Both wheels should contact the ground with the same pressure — if one side is slightly higher, the robot will always drift toward it

### Front/rear support

You need at least one non-driven support point. Options:
- **Caster wheel** (ball caster or swivel caster) — rolls freely in any direction, minimal drag
- **LEGO slide pad / glide block** — a low-friction plastic block that slides on the mat; simpler than a caster
- **Skid** — just a smooth axle end touching the mat; works but adds friction

Position the support point close to the center of the robot's length. If it's too far forward or back, the robot will tip during acceleration.

### Motor symmetry

Use the same motor and axle configuration on both sides. If the left side has an 8-tooth gear driving a 24-tooth gear, the right side should too. Asymmetric gear ratios between sides cause differential speed even at the same power setting.

### Weight distribution

Keep heavy components (hub, batteries, heavy attachments) centered and low. Top-heavy robots tip during sharp turns and hard stops.

---

## VEX IQ drivetrain tips

VEX IQ uses a pin-and-hole building system with its own motor ecosystem. The same principles apply, but with VEX-specific components.

### Choosing wheel type

| Wheel | Best for |
|---|---|
| **Omni wheels** | Smooth turns, less scrub when rotating in place; most common choice |
| **Traction wheels** | More grip when pushing or climbing; can cause scrub on sharp turns |
| **Mecanum wheels** | Holonomic drive; skip for beginners |

For a standard differential drive, **omni wheels on all four driven wheels** is the most popular competitive setup. The rollers on omni wheels let the robot slide sideways slightly during turns, reducing scrub and improving turn consistency.

### 4-wheel vs 2-wheel drive

Most competitive VEX IQ robots use **4-wheel drive** (2 motors, 4 wheels, geared together on each side) for better traction and balance. This requires running an axle the full width of the robot on each side.

If you use only 2 wheels, add passive support wheels at the other end — the robot will rock forward/back otherwise.

### Gear ratio

VEX IQ's standard motor runs at around 150 RPM under no load. Common drive gear ratios:

| Ratio | Effect |
|---|---|
| 1:1 (direct) | Fast, lower torque — fine for light robots |
| 3:5 reduction | Slower, more torque — better for heavy robots |
| 1:2 speed-up | Very fast, less torque — rarely useful for FLL-style games |

When in doubt, start with direct drive. If the robot stalls on the game mat or loses traction, add a gear reduction.

### Wheel base dimensions

A wider wheel base (distance between left and right wheels) is more stable but turns slower. A narrower base turns sharper but tips more easily. For VEX IQ competitions, a wheel base of ~20–25 cm (8–10 holes) is a common starting point.

---

## Common drivetrain mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Mismatched wheels | Robot always veers one way | Use identical wheels on both sides |
| Loose axle connectors | Wheel wobbles; inconsistent contact | Seat all connectors fully; check for wear |
| Gears not fully meshed | Slipping, skipping, grinding | Adjust gear distance until they spin smoothly with no play |
| Support point too far forward/back | Robot tips on acceleration/braking | Move support closer to center of mass |
| Heavy attachments too high | Tips on turns | Lower attachments or narrow the attachment mount |
| Wheels not parallel | Drift on straight runs | Re-square the drive frame; check that axles are perpendicular to center line |
| Over-tightened axle locknuts | Motor stalls; high current draw | Tighten until snug, then back off a quarter turn |

---

## Testing your drivetrain

Before writing any mission code, do these tests:

1. **Straight-line test:** Drive forward 2 meters at 50% power. Does the robot end up straight? A well-built robot should drift less than 5 cm over 2 meters before any software correction.

2. **Turn repeatability test:** Program a 90-degree turn. Run it 10 times. Note where the robot ends up each time — variance is your enemy.

3. **Load test:** Add your heaviest planned attachment. Re-run tests 1 and 2. The drive should still be consistent (may need software re-tuning, but shouldn't stall or skip gears).

4. **Start/stop test:** Accelerate to full speed, then stop. Does the robot lurch or tip? Do wheels slip on the mat?

---

## When to rebuild vs. tune in software

**Rebuild if:**
- The robot consistently veers more than a wheel-width over 1 meter (mechanical problem, not fixable in software)
- Motors stall regularly (gear ratio or friction issue)
- The robot tips on any normal turn or stop

**Tune in software if:**
- Small, consistent drift (gyro correction fixes this — see [Intermediate Python](/guides/python-intermediate/))
- Turn angles that are close but not quite right (adjust the turn degree value in code)
- Speed adjustments for different mat sections

The goal is a drivetrain that's so mechanically sound that the software only has to handle minor corrections, not compensate for a flawed build.

---

## Where to go next

- [Robot Programming Basics](/guides/robot-programming-basics/) — how to program your drivetrain once it's built
- [Intermediate Python for FLL Robots](/guides/python-intermediate/) — gyro-corrected driving and PID tuning for the drivetrain you just built
- [Season Planning](/guides/season-planning/) — when in the season to focus on drivetrain vs. attachments vs. missions
