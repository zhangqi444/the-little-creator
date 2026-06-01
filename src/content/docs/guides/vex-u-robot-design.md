---
title: VEX U Robot Design Guide
description: How to design and build competitive VEX U / VURC robots — drivetrain selection, mechanism principles, the two-robot strategy, subsystem engineering, and match strategy for collegiate teams.
tags: [vex-u, vurc, robot, drivetrain, holonomic, design, engineering, build, strategy, college]
audience: [teens, coaches]
level: advanced
season: evergreen
---

VEX U is the collegiate division of the VEX Robotics Competition. Each VURC alliance fields **two robots** built by the same team — one 15-inch robot and one 24-inch robot — with relaxed rules on motors, pneumatics, and custom fabrication compared to V5RC. That combination of expanded constraints and two-robot coordination is what separates VURC from every other VEX program. This guide covers the design decisions that matter most: robot sizing strategy, drivetrain choice, mechanism engineering, the two-robot interplay, and match strategy.

:::note[Season-specific game elements]
This guide covers **process** — sizing tradeoffs, drivetrain selection, mechanism principles, two-robot coordination — all of which apply across seasons. For current season scoring, field layout, and specific rules, read the official **VURC Game Manual** at [roboticseducation.org](https://www.roboticseducation.org/competition-programs/college-competition/). That document is the only authoritative source for robot rules and scoring.
:::

---

## Step 1 — Understand what the game rewards

Spend the first week after the game reveal in pure analysis mode. Watch the reveal video multiple times. Read the Game Manual from cover to cover. Then answer:

- **What scores the most points?** High-value actions deserve the most engineering investment.
- **What does the Autonomous Period look like?** VURC has a 15-second Autonomous Period that can award an Autonomous Win Point — often the deciding factor in close matches. Unlike V5RC, you control both robots, so autonomous coordination is a genuine competitive differentiator.
- **What does the Endgame look like?** Many VURC seasons have large end-game bonuses. Build for these from the start.
- **What do your two robots each do?** VURC's defining feature is that you build and operate both alliance robots. Specialisation beats duplication. Define each robot's role before designing either.
- **What do alliance partners need?** In elimination rounds, VURC still uses two-team alliances (each contributing two robots, four total on field). A robot that complements other teams' common approaches has high alliance-selection value.

Write down your **three highest-priority scoring actions** and which robot will execute each, before designing anything. Every mechanism decision should trace back to those priorities.

---

## Step 2 — Size your two robots deliberately

VURC allows one robot up to **15 × 15 inches** and one up to **24 × 24 inches** in the starting configuration. This is the most consequential decision your team will make.

### The 15-inch robot

- Smaller footprint — fits tighter field areas and is more agile on holonomic drivetrains.
- Fewer motors — a typical VURC 15-inch build uses 4–6 V5 Smart Motors on the drivetrain.
- Ideal role: **speed tasks** — collecting game elements quickly, clearing contested areas, high-frequency cycle tasks.
- Common drivetrain: X-drive or mecanum for maximum agility at smaller size.

### The 24-inch robot

- Larger reach and structure — can mount taller mechanisms, wider intakes, and heavier arms.
- More motors available — up to 8+ V5 Smart Motors on the drivetrain plus mechanisms.
- Ideal role: **power tasks** — stacking, lifting, scoring high goals, endgame positioning.
- Common drivetrain: 6-motor tank (for pushing power) or 4-motor holonomic (for positioning precision in tight spaces).

### The interaction rule

Your two robots **must start on opposite sides** of the field and cannot interfere with each other during the Autonomous Period in most seasons (check the current Game Manual). Plan Autonomous routines so the robots work complementary field zones.

---

## Step 3 — Choose your drivetrains

Each robot gets its own drivetrain choice. The VEX U meta has converged on two dominant patterns, but the game reveal may shift priorities.

### Tank drive (differential drive)

**Best for:** The 24-inch robot when pushing power, stacking stability, or straight-line endurance matter.

| Aspect | Detail |
|---|---|
| Complexity | Low — well-understood, straightforward to build |
| Pushing power | High — all motors aligned in one direction |
| Agility | Limited — cannot strafe; must turn to face new directions |
| Programming | Straightforward tank or arcade control |
| Typical motor count | 4–6 V5 Smart Motors (6 for maximum traction) |

Use **traction wheels** in the centre and **omni wheels** at corners to reduce turning resistance without sacrificing pushing strength.

### Holonomic drive (X-drive / mecanum)

**Best for:** The 15-inch robot, or any robot that needs to strafe and reposition quickly.

| Aspect | Detail |
|---|---|
| Complexity | Moderate — requires mecanum or X-drive geometry; careful motor pairing |
| Pushing power | Moderate — motors are angled; some force is always lateral |
| Agility | High — omni-directional movement, no turning to reposition |
| Programming | More complex — requires sinusoidal field-centric transform or tank-mapped strafing |
| Typical motor count | 4 V5 Smart Motors (one per wheel) |

Mecanum wheels are more common at the 24-inch scale; X-drive (four omni wheels at 45°) is common at 15-inch because the smaller footprint tolerates the geometry.

### Swerve and other exotic drivetrains

VURC teams occasionally build swerve-drive or differential-swerve systems. These provide maximum speed and full omni-directional movement but require significant programming effort and mechanical precision. Only recommended for experienced teams with strong software depth.

---

## Step 4 — Mechanism design principles

### Degrees of freedom

Every mechanism has joints and motions. Be explicit about each degree of freedom:

- **Necessary DOF:** required for the mechanism to accomplish its purpose.
- **Unnecessary DOF:** slop, flex, or wobble you did not intend — these are failure modes.

Design to minimise unnecessary DOF. Constrain every joint that does not need to move.

### Failure modes first

Before building, ask: *how will this mechanism fail under match conditions?*

- **Jamming:** game elements that catch in intake geometry.
- **Skipping:** chain, belt, or gear teeth skipping under load.
- **Bending:** aluminium or structural members deflecting under their own weight or load.
- **Loose fasteners:** constant vibration loosens screws; use thread-lock compound on high-vibration joints.
- **Cable management:** motor cables that catch on field elements or other mechanisms.

Build a test cycle: put the mechanism through 20 consecutive cycles at full speed. Every failure mode you find in testing is one you do not find at competition.

### Motor selection and current limits

VURC allows V5 Smart Motors in 11W and 5.5W configurations. Assign motor wattage to match task demand:

| Motor | Best use |
|---|---|
| V5 11W (high torque cartridge) | Drivetrain, arms, lifts — high torque, lower speed |
| V5 11W (high speed cartridge) | Drivetrain, flywheels, rollers — higher speed, lower torque |
| V5 5.5W | Lighter tasks: indexers, ratcheting mechanisms, small intakes |

**Current budgeting matters.** Each 11W motor draws up to ~2.5A at stall. V5 Robot Battery capacity is limited. Running every motor at stall simultaneously will trip thermal protection. Programme current limits in PROS:

```cpp
motor.set_current_limit(2000); // milliamps — adjust per mechanism
```

### Hard stops and soft limits

Every mechanism that travels to an extreme position needs a limit:

- **Hard stop:** a physical stop that prevents the mechanism from destroying itself.
- **Soft limit:** a sensor-triggered software cutoff (encoder position, limit switch) that stops the mechanism before the hard stop.

Use both. The soft limit handles normal operation; the hard stop handles bugs and driver error.

### Pneumatics

VURC permits pneumatics in many seasons. A well-timed pneumatic actuation for an endgame mechanism (claw, clamp, climbing hook) can be lighter and faster than a motor-driven equivalent. Check the current season's Game Manual for pneumatics rules and reservoir requirements.

---

## Step 5 — Two-robot coordination strategy

The defining VEX U advantage — and challenge — is that both robots on an alliance are yours.

### Autonomous Period coordination

Write two fully independent autonomous routines that do not overlap spatially. Then:

1. **Verify spatial separation.** Map both robots' paths on the field diagram. They must not attempt to occupy the same zone.
2. **Test together.** Run both autonomous routines simultaneously in practice. Collision in match conditions is a disqualification risk in some seasons.
3. **Have a fallback.** If one robot's autonomous fails to start, does the other robot's routine still avoid the dead robot?

Coordinate autonomous wins: in seasons with Autonomous Win Point, practise until both routines reliably execute together.

### TeleOp roles

Clear role assignment makes drive team communication faster and less error-prone:

- **Driver 1:** operates the 24-inch (power) robot — scoring, stacking, endgame.
- **Driver 2:** operates the 15-inch (agility) robot — cycling, collecting, fielding.
- **Pre-match agreement:** decide who owns which field zone at the start of each match to avoid collision.

Avoid "I'll do whichever robot" assignments. Robot specialisation only pays off when driver assignment is also specialised.

### Endgame synchronisation

If the endgame requires both robots to position simultaneously (balance, elevation, parking), practise the timing until it is automatic. Many VURC matches are won or lost in the final 10 seconds because teams that have not drilled endgame fumble the sequence.

---

## Step 6 — Autonomous strategy

### Prioritise the Autonomous Win Point

The Autonomous Win Point (AWP) is awarded to the alliance that completes a specific Autonomous task defined each season. In many VURC seasons, the AWP is achievable reliably if practised — and it can swing the qualification rankings significantly. Treat AWP as a primary objective, not a bonus.

### Encode field positions for both robots

Use **GPS sensor** or **odometry with IMU** to track each robot's position. Field-centric autonomous (absolute positions rather than relative moves) is significantly more consistent across different field setups. PROS and VEXcode both support GPS integration.

### Have three tiers

1. **Full auto (AWP-targeting):** runs when field setup is confirmed and both robots have been pre-positioned correctly.
2. **Partial auto:** runs if one robot has a sensor issue; scores some points without the AWP attempt.
3. **Push-only:** the simplest possible motion — cross the line, push one object. Never DNF autonomous if you can avoid it.

---

## Step 7 — TeleOp strategy

### Measure cycle time in practice

A "cycle" is one round trip — picking up a game element and scoring it. Measure it in practice:

1. Start a stopwatch from the moment you pick up a game element.
2. Stop when you score it and return to a neutral position.
3. Average over 10 cycles. This is your baseline.

Track cycle time weekly. Improvement is the signal that your drivers and mechanism are improving together.

### Drive team communication

Designate one person as the **match caller** — someone watching the whole field, not driving. Their job is to call the clock, signal when to switch to endgame, and watch for defensive robots. Most teams undervalue this role.

Pre-match, agree on:
- Who calls endgame start
- What each robot does in the last 30 seconds
- Signal word if something is jammed or needs recovery

### Engineering notebook in the pit

VURC judges evaluate engineering process as well as robot performance. Your notebook should document:

- Design decisions and the reasoning behind them (not just what you built)
- Iteration log: what you tried, what failed, what you changed
- Team member contributions
- Code architecture decisions and test results

---

## Step 8 — Alliance selection strategy

### Know your ranking metric

VURC uses **WP (Win Points)** and **AP (Autonomous Points)** as tiebreakers. Track these per match — a loss with AWP is sometimes better for rankings than a win without it, depending on the field.

### What captains look for

When evaluating picks:

1. **Reliable autonomous** — teams that routinely execute autonomous are low-risk picks.
2. **Consistent TeleOp** — clean mechanisms that rarely jam are valued over high-ceiling/high-risk robots.
3. **Complementary roles** — if your 24-inch is a stacker, you want a partner with a fast 15-inch collector.
4. **Gracious professionalism** — teams that drive cleanly and communicate well are preferred.

### The scouting sheet

Track every match you observe:

- Autonomous result (success / fail / partial)
- Average cycle time estimate
- Any visible mechanism failures
- Driver error frequency

Go into the alliance selection announcement knowing your top 3 targets and your rationale.

---

## Common rookie mistakes

| Mistake | Better approach |
|---|---|
| Designing both robots to do the same thing | Specialise: one power robot, one agility robot |
| Skipping two-robot autonomous coordination | Test both autonomous routines running simultaneously, every week |
| No hard stops on mechanisms | Add physical stops before the first practice match |
| Under-engineering cable management | Plan cable routing as part of the design; use zip-tie anchors |
| No fallback autonomous | Build three tiers; always have a push-only option |
| Driver role ambiguity | Lock in Driver 1 / Driver 2 assignments and stick to them |
| Ignoring endgame until week 8 | Design endgame mechanism in week 1; practise it from week 4 |
| Treating PROS as optional | PROS C++ with OkapiLib / LemLib gives autonomous consistency that VEXcode basic Python cannot match at this level |

---

## Next steps

- **Write your first autonomous routine:** see [VEX U code examples in the skill bundle](/skill/examples/vex-u/) for PROS autonomous and TeleOp skeletons.
- **Study past seasons:** [VEX U Resource Map](/resources/vex-u-resource-map/) has links to VURC KB, RobotEvents, and community forums.
- **Starting a new program?** See [Starting a VEX U Team](/guides/vex-u-first-team/) for eligibility, registration, and first-year timeline.
- **Formal curriculum:** [VEX U Curriculum Starter](/for-educators/vex-u-curriculum-starter/) provides an 8-week onboarding plan for collegiate educators.
