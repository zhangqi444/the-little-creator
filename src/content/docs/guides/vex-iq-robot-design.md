---
title: VEX IQ Robot Design Guide
description: How to design and build a competitive VEX IQ (VIQRC) robot — drivetrain options, mechanism design for snap-together plastic parts, motor budgeting, Autonomous Coding Skills, and Teamwork Challenge strategy for ages 8–14.
tags: [vex-iq, viqrc, robot, drivetrain, design, build, engineering, strategy, kids, coaches]
audience: [kids, teens, coaches, parents]
level: beginner
season: evergreen
---

Building a competitive VEX IQ robot is achievable for ages 8–14 — the snap-together plastic system is designed for learning through building and rebuilding. You don't need power tools, machining, or a big budget. You do need patience, iteration, and a willingness to try something, discover what breaks, and fix it. This guide covers the design decisions that matter most for VIQRC: drivetrain choice, mechanism principles, motor budgeting, and match strategy.

:::note[Season-specific game elements]
This guide covers **process** — drivetrain selection, mechanism principles, and iteration — all of which apply every season. For current season scoring, field layout, and specific rules, read the official **VIQRC Game Manual** at [roboticseducation.org](https://www.roboticseducation.org/competition-programs/vex-iq-robotics-competition/). That document is the only authoritative source for robot rules and scoring.
:::

---

## Step 1 — Understand what the game rewards

After the season reveal, before touching a robot, spend time understanding the game:

- **What scores the most points?** Your most reliable scoring mechanism should target the highest-value action.
- **What is achievable for your team?** A complicated mechanism that jams scores zero. A simple mechanism that works every match scores all season.
- **What does the Autonomous Period reward?** VIQRC seasons often award bonus points for autonomous scoring. Even a short, reliable autonomous routine can be a significant advantage.
- **What do alliance partners need?** VIQRC uses a **collaborative** alliance format — both teams on an alliance run on the same field and score together. A robot that complements what most teams do well is highly valued.

Write down your **top two scoring priorities** before you design anything. Every mechanism decision should trace back to those priorities.

---

## Step 2 — Choose your drivetrain

The drivetrain is the foundation of the robot. Everything else mounts on it, and rebuilding mid-season is costly. Choose deliberately.

### Tank drive (differential drive)

**Best for:** Rookie teams and most VIQRC seasons.

| Aspect | Detail |
|---|---|
| Complexity | Low — straightforward to build from VEX IQ beam-and-peg system |
| Pushing power | High — all motors aligned front-to-back |
| Agility | Moderate — must turn to face new directions; cannot strafe |
| Programming | Easiest — SmartDrive handles heading correction automatically |
| Typical motor count | 2–4 Smart Motors |

A 2-motor tank drive (one motor per side) is the standard starting configuration for VEX IQ. It leaves more motors free for mechanisms. Add a second motor per side (4-motor tank) if the game requires pushing power or faster field traversal — but make sure you have motors left for your scoring mechanism.

Use **traction wheels** for the driven wheels. If the robot turns sluggishly, add **omni wheels** at the front or rear to reduce turning friction without sacrificing drive traction.

### Holonomic (omni) drive

**Best for:** Experienced teams in games that reward rapid field repositioning.

| Aspect | Detail |
|---|---|
| Complexity | Medium — wheel placement must be geometrically precise |
| Pushing power | Lower — diagonal roller contact reduces traction |
| Agility | Excellent — strafe in any direction |
| Programming | Requires vector math; more complex than tank drive |
| Typical motor count | 4 Smart Motors |

An X-drive (four omni wheels at 45°) lets the robot move in any direction without turning. This can help a team get to scoring positions faster. The trade-off: all 4 motors are committed to driving, leaving fewer for mechanisms. Only choose holonomic drive if your team has experience with both building geometry and the programming math.

### Drivetrain decision matrix

| Your team | Recommended |
|---|---|
| Rookie / first VIQRC robot | 2- or 4-motor tank drive |
| Returning team, game rewards repositioning | Consider X-drive if motor budget allows |
| Team wants simple programming | Tank drive with SmartDrive |
| Experienced team, game is positioning-heavy | X-drive |

---

## Step 3 — Design your mechanisms

VEX IQ mechanisms use the same snap-together plastic system as the chassis. That is a feature: mechanisms are easy to prototype, modify, and rebuild during the season.

### Define the task precisely

Do not design "a claw." Design "a mechanism that picks up a game piece from the floor, holds it securely while driving, and releases it into the scoring zone in under one second." Specific requirements produce better designs.

### Failure modes first

Before committing to a design, ask: how does this fail?

- **Jamming:** Can a game piece get caught in a tight space? Add clearance and guide surfaces (angled beams that funnel pieces in).
- **Misalignment:** Does the mechanism require the robot to be positioned perfectly to engage? Add passive funnel geometry or rubber contact surfaces to accept a range of approaches.
- **Mechanical stress:** VEX IQ plastic components can flex or crack under repeated high-load contact. Distribute force across multiple contact points.
- **Motor stall:** If a motor is asked to do more than it can, it will stall and stop. Gear down for more torque, or reduce the mechanism's load.

VIQRC fields are not adversarial in the same way as V5RC, but match repetition and normal use will stress every joint. Robust over clever.

### Keep degrees of freedom low

Each mechanism should only move in the directions it needs to move. Extra pivots and joints mean extra motors, extra failure points, and extra programming. Ask: can this task be solved with one motor and a good passive geometry?

### Hard stops

Every mechanism that travels to an end position needs a **physical hard stop** — a beam, peg, or surface that prevents over-travel — and a **software limit** in your code that stops the motor just before the physical stop. Set the software limit slightly short of physical contact so you are not slamming the mechanism repeatedly. Over time, repeated hard impacts crack plastic.

### Intake design

- **Wide intakes** that funnel game pieces from a range of approach angles are more forgiving than narrow intakes that require precise alignment.
- **Rubber contact surfaces** (VEX IQ rubber bands, flex tubing) grip game pieces more reliably than smooth plastic, especially when pieces are slightly tilted.
- **Powered conveyors or rollers** are more reliable than passive gravity-slide paths for game pieces that need to travel more than a few inches inside the robot.

### Arms and lifts

- **Single-pivot arms** are the easiest to build and program. Add stages only if the game requires height that a single arm cannot reach.
- **4-bar linkage** keeps the end-effector (gripper, intake face) level throughout the arm's travel — useful for scoring in elevated goals without tilting a game piece.
- **Counterbalance.** A heavy unloaded arm draws continuous motor current at rest and heats the motor over long matches. Rubber bands looped between the arm and the chassis can offset gravity load and extend motor life.

---

## Step 4 — Motor and port budget

The VEX IQ Brain has **12 smart ports** — any combination of motors and sensors. A typical VIQRC robot uses 4–6 motors. There is no hard motor count limit in the rulebook, but you are limited by ports and by how many motors your battery can sustain.

### Typical allocation patterns

| Configuration | Drivetrain | Main mechanism | Second mechanism |
|---|---|---|---|
| Rookie reliable scorer | 2 (tank) | 1–2 (arm/intake) | — |
| Balanced competition robot | 4 (tank) | 1 (arm) | 1 (intake) |
| Holonomic + one mechanism | 4 (X-drive) | 1–2 | — |

The right allocation depends entirely on what the game rewards. Derive motor counts from your Step 1 priority list, not from what sounds impressive.

### Gearing for torque vs. speed

VEX IQ Smart Motors have a fixed internal speed. Use VEX IQ gears, pulleys, and sprockets to trade speed for torque (or vice versa):

- **Large gear ratio (e.g., 3:1 output):** Slow, powerful lifts. Use when the mechanism must lift significant weight or apply sustained force.
- **Small gear ratio or direct drive:** Fast intakes and rollers. Use when speed matters more than power.
- **Rule of thumb:** If the motor stalls under load, add more gear reduction. If the mechanism is too slow for the game's pace, reduce gear reduction.

---

## Step 5 — Autonomous Coding Skills and match autonomous

VIQRC has two competition formats: the **Teamwork Challenge** (alliance match) and the **Skills Challenge** (individual run). Both reward autonomous programming.

### Autonomous Coding Skills (individual run)

Each team gets standalone **Autonomous Coding Skills** attempts — a timed run where only your robot is on the field, running a program without any driver input. This is pure programming. A reliable, repeatable autonomous routine that scores consistently will accumulate Skills ranking points throughout the event.

**Priority order for autonomous:**
1. **Do not start in the wrong direction.** Test your autonomous routine multiple times on the actual field (or a measured practice field). One tilted start position can negate an entire routine.
2. **Make it repeatable before making it complex.** A 3-step routine that works 9 out of 10 times beats a 10-step routine that works 4 out of 10 times.
3. **Use the built-in inertial sensor for heading correction.** The VEX IQ Brain has a built-in inertial sensor (gyroscope). Use VEXcode SmartDrive `drive_for()` and `turn_for()` with gyro feedback — it will drive much straighter than dead-reckoning with time-based motor commands.
4. **Add a fallback routine** — a simple "drive forward, score closest game piece" backup you can deploy if your primary routine is failing at the event.

### Teamwork Challenge autonomous segment

During the Teamwork Challenge match, the first phase is a short autonomous period where both alliance robots run programmed routines simultaneously. This is a chance to score bonus points. Coordinate with your alliance partner on which game pieces each robot targets during autonomous — two robots heading to the same piece is a common early-season collision source.

---

## Step 6 — Teamwork Challenge strategy

The Teamwork Challenge is **60 seconds** (with a short autonomous phase at the start). Both alliance teams score together. This collaborative format changes your strategy compared to solo or adversarial competitions.

### Cycle time and field coordination

- **Measure your actual cycle time** — from "mechanism contacts game piece" to "game piece scored, robot back for next pickup." Teams regularly overestimate their speed.
- **Assign field zones.** Agree with your alliance partner before the match on who covers which part of the field. Robots bumping each other repeatedly lose time and can disable sensors.
- **Communicate before queuing.** The brief pre-match period is your chance to agree on autonomous paths, field zones, and what happens if one robot has an issue.

### Designing for the alliance

Because VIQRC scoring is collaborative, designing a robot that complements what most other teams can do is a strategic advantage:

- If most teams can score ground-level elements easily, a robot that handles elevated goals becomes highly sought as an alliance partner.
- If most teams are faster at one side of the field, specialise for the other side.

Think about what your robot does for the alliance, not just what it scores alone.

### Skills Challenge strategy

The Skills Challenge uses **Driver Skills** (driver-controlled) and **Autonomous Coding Skills** (programmed) attempts. Skills ranking is separate from Teamwork Challenge ranking and awards points toward the Design Award and Skills Award. Do not skip Skills attempts — even an incomplete run scores partial credit.

---

## Step 7 — The iteration loop

The teams that do best in VIQRC are not the ones who built the best robot first. They are the ones who rebuilt it the most. The snap-together VEX IQ system is designed for fast iteration — take advantage of it.

1. **Build the chassis and drive first.** Before adding any mechanisms, confirm that the robot drives straight, turns reliably, and fits within the size box. Test autonomous driving with SmartDrive.
2. **Add one mechanism at a time.** Test each mechanism in isolation before attaching it to the robot. Integration reveals interference — do not discover it at an event.
3. **Run timed practice matches.** Simulate a full match: autonomous phase, then driver control. Timed. Scored. Log every run. Students often discover reliability problems only under timed pressure.
4. **Log what broke and why.** Keep a build notebook — it is required for the Design Award and invaluable for fixing problems. "Intake jammed on tilted piece → added 15mm funnel flare to guide" is more useful than "fixed intake."
5. **Prioritise reliability over peak score.** A robot that scores 8 points per match reliably beats a robot that attempts 15 and completes 4. Once the 8 are rock-solid, work toward the 15.

---

## Common rookie mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Building a complex mechanism before the chassis is proven | Chassis issues are hard to isolate when everything is attached | Finish and test the chassis alone before adding any mechanisms |
| Skipping the Skills Challenge | Lose ranking points that affect Design Award and seeding | Schedule Skills attempts at the start of the event, not as an afterthought |
| Relying on timed drive commands for autonomous | Robot position drifts; routine fails at a new venue | Use SmartDrive with the inertial sensor for gyro-corrected movement |
| Motor stalls every match | Motor overheats; robot stops mid-match | Gear down, reduce mechanism load, or shorten stall duration |
| No hard stops | Mechanism over-travels, cracks plastic, jams | Add physical hard stops and software limits before the first match |
| Not coordinating with alliance partners | Two robots collide during autonomous or fight for the same game pieces | Talk to your alliance partner before queuing; agree on zones and auto targets |
| Only practising in free-roam | Driver freezes under timed match pressure | Run full timed practice matches with a clock and recorded scores |

---

## Further reading

- [VEX IQ Programming Guide](/guides/vex-iq-programming/) — VEXcode Blocks, VEXcode Python, SmartDrive, and gyro-corrected autonomous
- [VEX IQ Tournament Guide](/guides/vex-iq-tournament/) — VIQRC match structure, Skills Challenge, pit setup, judging categories
- [Your First VEX Tournament](/guides/first-vex-tournament/) — emotional and logistical overview for first-time competitors
- [VEX Awards Guide](/guides/vex-awards/) — Excellence, Design, Build, Think, Sportsmanship
- [VEX IQ Resource Map](/resources/vex-iq-resource-map/) — official curriculum, RobotEvents, VEX forums, community YouTube
- [Robot Strategy Guide](/guides/robot-strategy/) — general mission-priority principles that apply to any game
- [VEX V5 Robot Design Guide](/guides/vex-v5-robot-design/) — parallel guide for VEX V5/VRC teams (older students, more motors, competitive format)
