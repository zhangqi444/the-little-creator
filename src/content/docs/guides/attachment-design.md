---
title: FLL Robot Attachment Design
description: How to design, build, and test effective SPIKE Prime attachments for FLL missions. Principles of leverage, connection methods, common failure modes, and the iteration mindset.
tags: [fll, spike-prime, robot, attachments, building, engineering, design]
audience: [students, teens, coaches, parents]
level: beginner
season: evergreen
---

Attachments are often what separate a good FLL robot from a great one. The drive base is the same for most teams — the attachments are where you win or lose missions.

This guide covers how to think about attachment design, how to connect attachments reliably, and how to iterate when your first design doesn't work.

---

## What attachments do

An attachment is any mechanism that extends from your drive base to interact with the field. In FLL, attachments typically:

- **Push or pull** a mission model into position
- **Drop or place** an object in a target zone
- **Lift or lower** a lever, gate, or element
- **Spin or rotate** something on the field
- **Carry** an object from one place to another

Most FLL missions can be completed with surprisingly simple attachments — a well-placed beam that pushes a slider, or a hook that catches a lever. Before building something complex, ask: "What's the simplest thing that could work?"

---

## Connection methods

How an attachment connects to the drive base matters as much as the attachment itself. Loose connections cause inconsistency.

### SPIKE Prime beam connections

The most common method: insert an axle through the attachment and into the drive base frame, secured with a connector peg or beam lock. Key rules:

- **Two connection points minimum.** A single axle pivot will wobble and rotate during missions. Two points (or one axle + one beam) hold the alignment.
- **Perpendicular is strongest.** Connections that are perpendicular to the direction of force are more stable than parallel ones.
- **Beams over angles.** Angle connectors can flex under load. Straight beams with proper cross-bracing are more rigid.

### Quick-connect vs fixed

**Fixed attachments** (permanently bolted on) are the most reliable but slow to change. Good for missions you'll attempt on every run.

**Quick-connect attachments** (designed to snap on/off in 5–10 seconds) allow you to swap between missions. The tradeoff: every quick-connect mechanism is a potential failure point. If you use quick-connects, test them 20+ times to ensure they seat consistently.

**Common quick-connect approaches:**
- Axle sleeve + friction pin: attachment has an axle that slides into a fixed sleeve on the base; a friction pin locks it
- Beam channel: attachment slides into a U-channel on the base and locks with a single cross-pin
- Gravity-seated hooks: attachment hangs on a lip; works only for low-force missions

---

## Mechanical principles that matter in FLL

### Leverage

A lever arm amplifies force. A 10cm arm pushing at the end applies twice the force to a pivot at 5cm. Use longer arms when you need to move a heavy element; use shorter arms when you need precision.

**Common FLL application:** Pushing a lever by striking it near its pivot requires much less force than hitting the tip — but misses more often. Hitting the lever at the midpoint is a good compromise: enough force, enough margin.

### Gear reduction for attachments

If your attachment motor stalls (makes a grinding sound and stops) when engaging the field:
- The load is too high for the motor speed
- Add a gear reduction: drive gear 8 → driven gear 24 gives 3:1 reduction (slower but 3x torque)
- Alternatively, reduce motor speed in code with `motor.run_for_degrees(degrees, speed)` — lower speed = more torque

### Passive vs active attachments

**Active attachments** use a motor. They're powerful and programmable but take time to actuate and add code complexity.

**Passive attachments** are static — they don't move by themselves. The robot's forward/backward/turning motion is what engages the mission. These are often more reliable because there's no motor to time.

When designing a mission solution, ask: "Can I do this passively?" Often yes.

---

## The iteration mindset

Your first attachment design probably won't work perfectly. This is not a problem — it's the process.

**How to iterate effectively:**

1. **Build the simplest thing first.** Skip cleverness. A bent beam might work. Try it before the complex gear mechanism.
2. **Test against the actual mission model.** Estimating by eye is unreliable. Measure and test.
3. **Identify the specific failure mode.** "It doesn't work" is not useful. "The tip undershoots by 2cm" is. Measure.
4. **Change one variable at a time.** If you change the arm length AND the connection point AND the motor speed at once, you won't know what fixed it.
5. **Log it.** Write down what you tried and what happened. This goes in the engineering notebook — and saves you from repeating failed experiments.

---

## Common failure modes and fixes

| Failure | Most likely cause | Fix |
|---|---|---|
| Attachment deflects sideways during mission | Only one connection point; attachment flexes | Add a second connection; cross-brace the joint |
| Motor stalls when engaging field | Gear ratio too direct; load too high | Add gear reduction or reduce motor speed |
| Attachment arrives at wrong angle | Robot alignment issue, not attachment issue | Fix robot alignment first; then re-test |
| Works in practice, inconsistent at competition | Mat friction or attachment seat varies | Test on competition mat; add positive-stop to confirm seating |
| Attachment falls off mid-run | Quick-connect not fully seated | Add a secondary lock (second pin or beam) |
| Overshoots target | Motor speed too high | Use `stop_action='brake'`; reduce speed; add a physical stop |

---

## Field alignment tips

Even a perfect attachment fails if the robot arrives at the wrong position. Attachment design and robot alignment are inseparable.

- **Use the field perimeter:** drive into the wall to reset position before a mission. SPIKE Prime motors can take the bump; the field structures are designed for it.
- **Use field markers:** black tape lines, mat borders, and mission model positions are consistent between competition copies of the mat. Use them.
- **Design attachments with tolerance.** A ±1cm approach error should still work. Design the contact geometry so small positional errors don't cause misses.

---

## Building the engineering notebook entry

Judges want to see your design process, not just your final product. Document:

- What problem the attachment needed to solve
- What approaches you considered and why you chose this one
- What changed between version 1 and the current version, and why
- Any measurements (arm length, gear ratio, travel distance)

Even rough sketches with labels are valuable. Judges reading "we tried a 6-stud arm, it consistently undershot, so we extended to 8-stud based on measurements" understand more than a team that just presents the finished attachment.

---

## Related

- [Drivetrain Basics](/guides/drivetrain-basics/) — the base your attachments connect to
- [Robot Programming Basics](/guides/robot-programming-basics/) — coding the motors that drive attachments
- [FLL Robot Strategy Guide](/guides/robot-strategy/) — which missions to prioritize and how to plan attachment changes
- [FLL Engineering Notebook Guide](/guides/notebook-guide/) — how to document design iterations for judges
- [Robot Troubleshooting](/guides/robot-troubleshooting/) — when attachments don't work at competition
