---
title: VEX V5 Robot Design Guide
description: How to design and build a competitive VEX V5/VRC robot — drivetrain selection, mechanism design principles, subsystem iteration, and match strategy for rookie and returning teams.
tags: [vex, vrc, v5, robot, drivetrain, holonomic, design, engineering, build, strategy]
audience: [teens, coaches]
level: intermediate
season: evergreen
---

Building a competitive VEX V5 / VRC robot is an engineering challenge that rewards disciplined iteration more than inspired first drafts. You have months from the game reveal to your first qualifier, but the teams that win in April are usually the ones that started iterating in October — not designing. This guide covers the decisions that matter most: drivetrain choice, mechanism design, subsystem discipline, and match strategy.

:::note[Season-specific game elements]
This guide covers **process** — drivetrain selection, mechanism principles, iteration discipline — all of which apply every season. For current season scoring, field layout, and specific rules, read the official **VRC Game Manual** at [roboticseducation.org](https://www.roboticseducation.org/competition-programs/vex-robotics-competition/). That document is the only authoritative source for scoring and robot rules.
:::

---

## Step 1 — Understand what the game rewards

Spend the first week after the game reveal in pure analysis mode. Watch the reveal video multiple times. Read the Game Manual. Then answer:

- **What scores the most points?** High-value actions deserve the most engineering investment.
- **What is achievable for a rookie team?** An ambitious mechanism that isn't reliable scores zero. A simple, consistent mechanism scores every match.
- **What does the Autonomous Period and Autonomous Win Point look like?** VRC Autonomous routines are 15 seconds and award a bonus plus a potential Autonomous Win Point — often the deciding factor in close matches.
- **What does the Endgame look like?** Many VRC seasons have large end-game bonuses (elevation, parking, balancing). Design for these from the start.
- **What do alliance partners need?** VRC uses two-robot alliances in elimination rounds. A robot that complements what most teams already do is more valuable as an alliance partner — which matters enormously for alliance selection.

Write down your **three highest-priority scoring actions** before designing anything. Every mechanism decision should trace back to those priorities.

---

## Step 2 — Choose your drivetrain

The drivetrain is the most consequential structural decision you'll make. Rebuilding mid-season is costly. Choose deliberately.

### Tank drive (differential drive)

**Best for:** Rookie teams, defence-heavy games, games where pushing power and straight-line speed matter more than agility.

| Aspect | Detail |
|---|---|
| Complexity | Low — well-understood, straightforward to build |
| Pushing power | High — all motors aligned in one direction |
| Agility | Limited — cannot strafe; must turn to face new directions |
| Programming | Straightforward arcade or tank control |
| Typical motor count | 4–6 V5 Smart Motors |

A 6-motor tank drive (three per side) is the most common starting configuration in VRC. It delivers strong pushing power and simple build geometry. Use **traction wheels** in the centre and **omni wheels** at corners to reduce turning resistance without sacrificing pushing strength.

### Holonomic drive (X-drive / H-drive / omni)

**Best for:** Games requiring rapid repositioning, strafing to precise field positions, or where defence is less impactful.

| Aspect | Detail |
|---|---|
| Complexity | Medium — 4-motor X-drive is mechanically simple but geometrically precise |
| Pushing power | Lower than tank — diagonal roller engagement reduces traction |
| Agility | Excellent — can strafe, translate, and rotate simultaneously |
| Programming | Requires vector decomposition; field-centric control is recommended |
| Variants | X-drive (4 omni at 45°), H-drive (4 omni parallel + 1 omni centre), Kiwi (3 omni at 120°) |

X-drive is increasingly common in competitive VRC because modern games often reward speed and field-position flexibility over raw pushing power. The trade-off: lower defence resistance, and wheel placement must be geometrically precise — even small alignment errors cause drift.

### Mecanum drive

**Best for:** Teams that want strafing with more traction than X-drive; games with moderate defence and wide corridors.

| Aspect | Detail |
|---|---|
| Complexity | Medium — 4 motors, specialised mecanum wheels |
| Pushing power | Moderate — better than X-drive under lateral force |
| Agility | Good — strafe and rotate |
| Programming | Similar to FRC MecanumDrive; straightforward vector math |

Mecanum is less common in top-tier VRC than X-drive because VRC mecanum wheels have historically had durability concerns on aggressive fields. Evaluate per season.

### Drivetrain decision matrix

| Your team | Recommended |
|---|---|
| Rookie / first robot | 4- or 6-motor tank drive |
| Returning, game rewards repositioning | X-drive or mecanum |
| Defence-focused strategy | Tank drive |
| Speed + positioning + programming depth | X-drive |

---

## Step 3 — Design your mechanisms

Each scoring mechanism should be engineered with the same discipline as the drivetrain.

### Define the task precisely

Don't design "a claw." Design "a mechanism that picks up a game piece from the floor in under 0.8 seconds, retains it during defence contact, and releases it into the scoring zone at an adjustable height." The more specific the requirement, the clearer the design target.

### Failure modes first

Before committing to any mechanism, ask: *how does this fail?*

- **Jamming:** Can a game piece get caught in a pinch point? Add clearance and guide surfaces.
- **Misalignment:** Does the mechanism require exact robot placement to engage? Add passive funnel geometry or compliance (flex, rubber contact surfaces).
- **Mechanical overload:** What happens when the robot is pushed during mid-cycle? Add slip-clutch joints or breakaway tabs where appropriate.
- **Motor stall:** VRC motors have thermal protection and will cut out under sustained overload. Monitor motor temperature in practice; add gearing or reduce torque demand.

The VRC field is competitive — defence, field-piece variation, and match chaos will stress every joint. Robust over clever.

### Degrees of freedom

Each mechanism should have only the degrees of freedom it needs. Extra axes mean extra motors, extra sensors, extra failure points, and extra code. Ask: *can this be solved with one motor and passive geometry instead of two motors and active sensing?*

### Hard stops and soft limits

Every mechanism that travels to a physical end-stop needs **physical hard stops** (metal-to-metal or rubber-bumper) plus **software soft limits** in your control code to prevent over-travel. Set software limits 5–10% before the hard stop. When possible, design the hard stop to be load-bearing (the mechanism rests against it) rather than shock-bearing (the mechanism crashes into it under power).

### Intake design

- **Favour wide intakes** that funnel game pieces from a range of approach angles. Narrow intakes that require precise alignment cost time per cycle.
- **Compliant rollers** (rubber-band rollers, flex tubing) grip game pieces more reliably than rigid surfaces, especially when pieces are slightly skewed.
- **Powered conveyors over passive paths.** If a game piece travels more than 6–8 inches under gravity or momentum alone, it will occasionally jam. Add powered indexer stages.

### Elevators, arms, and pivots

- **Single-stage linear lift** is the most reliable (fewest parts, lightest). Add stages only if game height demands it.
- **4-bar linkage** keeps end-effector orientation constant throughout travel — valuable for scoring at height without complex heading correction in code.
- **Counterbalance.** An unbalanced arm draws high current at rest, heats motors, and is a hazard if code loses hold. Use rubber bands, surgical tubing, or gas struts to counterbalance gravity load.
- **C-channel vs. extrusion:** C-channel (standard VEX structural profile) is stiff and easy to rebuild; V5 extrusion is lighter but requires more planning. Mix based on load requirement per member.

---

## Step 4 — Motor and power budget

VRC allows a maximum of **8 V5 Smart Motors** (or equivalent port count for V5 Workcell motors). Every motor you spend on one subsystem is unavailable to another.

### Typical allocation patterns

| Configuration | Drivetrain | Lift/Arm | Intake | Endgame |
|---|---|---|---|---|
| Defence + reliable scorer | 6 | 1 | 1 | 0 |
| Speed + dual mechanism | 4 | 2 | 1 | 1 |
| Balanced | 4 | 2 | 2 | 0 |

There is no universally correct allocation — it depends entirely on what the game rewards. Derive your allocation from Step 1's priority list.

### Gearing for load vs. speed

- **High torque (low speed):** Slow, powerful lifts. Use a large gear ratio (e.g., 100:1) to move heavy loads reliably.
- **High speed (low torque):** Fast intakes and flywheels. Use a small ratio or direct drive with a high-RPM motor cartridge.
- **Match speed to task:** Over-torqued mechanisms are slow; under-torqued mechanisms stall. Measure the load, choose the cartridge, then confirm with testing.

V5 Smart Motor cartridges come in **100 RPM (Red), 200 RPM (Green), 600 RPM (Blue)**. Choose based on your mechanism's speed/torque requirement, not what came in the kit.

---

## Step 5 — Autonomous strategy

The VRC Autonomous Period is **15 seconds**. Reliable autonomous routines earn a point bonus plus the Autonomous Win Point — the AWP can mean the difference between qualifying for elimination rounds or not.

### Autonomous priority ladder

1. **Don't score in your opponent's goal by mistake.** Some games penalise reversed scoring. Verify field orientation in every autonomous.
2. **Execute your highest-point autonomous routine reliably 9 out of 10 practice runs** before adding complexity.
3. **Add a fallback auto** (e.g., just drive to a safe position) that you can deploy if the primary routine is failing at an event.
4. **Use motion-profiled drive commands** with encoder + IMU feedback rather than timed drive. The V5 Brain's built-in IMU and Smart Motor encoders enable consistent repeatable paths without third-party libraries.
5. **Coordinate with your alliance partner.** Two robots heading to the same game piece in Autonomous is a common early-match collision. Agree on auto paths before you queue.

---

## Step 6 — TeleOp cycle strategy

VRC TeleOp is **1 minute 45 seconds**. Your score is determined largely by how many complete cycles your robot performs — pick up, score, repeat.

### Cycle time matters more than peak capability

- **Measure your actual cycle time** in practice. Teams regularly overestimate speed. Count from "mechanism contacts game piece" to "game piece scored, robot returning."
- **Simplify the drive path.** Fewer turns means fewer seconds. Design your field approach path to be as straight and repeatable as possible.
- **Build driver consistency first.** A driver who hits 12 reliable cycles beats a driver who attempts 16 and fumbles 6.

### Drive team communication

The driver and operator (if using two controllers) need practiced protocols:
- Who calls out game piece locations?
- When does the operator trigger the lift vs. the driver?
- What is the abort signal for a jammed mechanism?

Run timed practice matches against the clock. Role-play competition stress scenarios.

---

## Step 7 — Alliance selection strategy

At the end of qualifying rounds, the top 8 teams each select alliance partners. How you're perceived during qualifiers determines whether you're a top seed, a pick, or left out of finals.

### How to get picked

- **Reliability.** Scouts watch for consistent scoring — not your best match, but your typical match. Log your own scores every qualifying match.
- **Complementary skills.** If most top teams score from the floor, a robot that handles a different game element or excels at the Endgame becomes disproportionately valuable.
- **Drive team communication.** Scouts notice teams that communicate clearly in the pit, reset quickly after fouls, and don't damage other robots.

### If you're a top seed

Scout carefully. Ask other teams directly: *"What's your worst match this event?"* Teams that can answer honestly with a specific cause (and a fix) are more reliable alliance partners than teams that only describe their best match. Reliability beats peak performance.

---

## Step 8 — The iteration loop

VRC seasons are long enough that teams who iterate systematically win over teams who build well once. The loop:

1. **Test early.** Drive the chassis alone before any mechanisms are attached. Confirm control, motor mapping, and basic autonomous movement in the first practice session.
2. **Add one mechanism at a time.** Test each subsystem in isolation before integrating. Integration reveals interference — don't discover it at the qualifier.
3. **Log what broke and why.** Keep a build notebook (required for Design Award; invaluable for debugging). "Intake jammed on skewed pieces → added 10mm intake funnel flare" is more useful than "fixed intake."
4. **Run practice matches.** Simulate a full match: Autonomous + TeleOp + Endgame. Timed. Scored. Log every run.
5. **Prioritise reliability over capability.** If the lift can score 8 game pieces per match reliably, don't redesign it to score 12 unreliably. Add the 12th piece path only after the 8 are rock-solid.

---

## Common rookie mistakes

| Mistake | What happens | Fix |
|---|---|
| Building the "dream robot" from the reveal | Complex mechanisms aren't finished by the first qualifier | Prioritise one reliable scoring mechanism first |
| Ignoring the Autonomous Win Point | Lose close matches on tiebreakers | Invest in a 15-second consistent auto from practice session 2 |
| All 8 motors on drive and lift; nothing for intake | Robot can drive and lift, but can't acquire game pieces efficiently | Allocate motors from your priority list, not from what feels impressive |
| Using the wrong motor cartridge | Mechanism stalls (under-torqued) or is painfully slow (over-torqued) | Calculate torque demand; match to cartridge |
| Hard stops that shock the mechanism | Bent metal, stripped gears after one match | Use rubber-bumper hard stops; set software limits before physical contact |
| Driver practicing only in free-roam | Driver freezes in match conditions | Run full timed practice matches with a clock and recorded scores |
| No backup autonomous | Primary auto fails at competition; no fallback | Always have a "drive forward and park" auto as a fallback you can deploy in 30 seconds |

---

## Further reading

- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — VEXcode Pro V5, blocks vs. C++, drive base control, encoder and gyro, autonomous skeleton
- [Your First VEX Tournament](/guides/first-vex-tournament/) — field setup, match structure, pit life, judging categories
- [VEX Awards Guide](/guides/vex-awards/) — Excellence, Design, Robot Skills, Judges Award
- [VEX V5/VRC Resource Map](/resources/vex-v5-resource-map/) — V5 KB, RobotEvents, VEX Forums, PROS, LemLib, community YouTube
- [FTC Robot Design Guide](/guides/ftc-robot-design/) — parallel guide for FTC teams
- [FRC Robot Design Guide](/guides/frc-robot-design/) — parallel guide for FRC teams
- [Robot Strategy Guide](/guides/robot-strategy/) — general mission-priority principles that transfer to any game-based competition
