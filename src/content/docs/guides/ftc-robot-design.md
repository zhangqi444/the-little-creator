---
title: FTC Robot Design Guide
description: How to design and build a competitive FTC robot — drivetrain selection, mechanism design principles, subsystem iteration, and match strategy for rookie and returning teams.
tags: [ftc, robot, drivetrain, mecanum, design, engineering, build, strategy]
audience: [teens, coaches]
level: intermediate
season: evergreen
---

Building a competitive FTC robot is an engineering challenge unlike anything else at the high school level. You have an entire season to design, build, iterate, and refine — but you also have limited time, a limited budget, and a real competition at the end. This guide covers the decisions that matter most: drivetrain choice, mechanism design, subsystem iteration, and match strategy.

:::note[Season-specific game elements]
This guide covers **process** — drivetrain selection, mechanism principles, design iteration — all of which apply every season. For current season scoring, field layout, and game-specific rules, read the official **Game Manual Part 1 and Part 2** at [ftc-resources.firstinspires.org](https://ftc-resources.firstinspires.org). Those documents are the only authoritative source for scoring and rules.
:::

---

## Step 1 — Understand what the game rewards

Before designing anything, spend a full week analysing the game. Read the manual twice. Watch reveal videos. Then ask:

- **What actions score the most points?** High-value actions deserve the most engineering investment.
- **What is achievable for a rookie team?** Overly ambitious robots often score less than simple, reliable ones.
- **What does the Endgame look like?** Many FTC seasons have large end-game bonuses (parking, hanging, climbing) that can swing match results dramatically. Build for these early.
- **What do alliance partners need?** FTC uses two-team alliances. A robot that complements what most teams already do is more valuable as an alliance partner — which matters for alliance selection.

Write down your three highest-priority scoring actions before designing any mechanism. Every design decision should trace back to those priorities.

---

## Step 2 — Choose a drivetrain

Your drivetrain is the foundation of your robot. Change it mid-season and you're essentially rebuilding. Choose carefully.

### Option A — Tank drive (differential drive)

**How it works:** Left-side motors drive together; right-side motors drive together. Turn by running one side faster than the other.

**Hardware:** 4 motors (2 per side). Works with any wheel: traction wheels, omni wheels, or a mix.

**Pros:**
- Simplest to build and programme
- Easy to push through defence
- Predictable, tunable in software
- Works well on all surfaces, including over field elements

**Cons:**
- Cannot strafe (move sideways without turning)
- Slow to reposition — must turn to face a new direction
- Larger turning radius than mecanum

**Best for:** Rookie teams, games that require pushing through defence, or games where strafing provides little advantage.

### Option B — Mecanum drive (holonomic)

**How it works:** Four mecanum wheels (two left-hand, two right-hand) at each corner. Running motors in specific combinations produces forward, strafe, and diagonal movement — all without turning.

**Hardware:** 4 motors, 4 mecanum wheels (matched pairs — don't mix left/right hand wheels). goBILDA and REV both sell competition-grade sets.

**Pros:**
- Full holonomic motion — strafe, diagonal, any direction
- Fast repositioning without turning
- Useful when precise lateral alignment matters (loading from a human player station, scoring in a specific slot)

**Cons:**
- Harder to programme well (driver skill matters more)
- Wheels are heavier and more expensive
- Weak to side-push defence — lateral force can push the robot sideways
- Requires a flatter surface — mecanum wheels lose traction on ramps or uneven terrain

**Best for:** Teams with programming capability, games where precise lateral positioning is rewarded, teams with experienced drivers.

### Option C — X-drive (omni holonomic)

Four omni wheels mounted at 45° angles at each corner.

**Pros:** Fast, holonomic, lower-cost than mecanum.

**Cons:** Mechanically more complex to build at exact angles, weaker lateral push resistance than mecanum, less community documentation.

**Recommendation for most teams:** Start with **mecanum** if you have programming experience, **tank** if you're in your first or second season. Avoid X-drive unless a veteran member has built one before.

---

## Step 3 — Design your mechanisms

### Prioritise before you build

For each high-priority scoring action, ask: what is the simplest mechanism that reliably achieves this? Build the simple version first. Iterate to the complex version only if simple isn't enough.

**Common FTC mechanisms by function:**

| Function | Common approaches |
|---|---|
| Intake (grab game elements) | Active intake (spinning wheels or compliant belts), passive claw, rotating collector |
| Lift / extend | Slide (linear extension), arm (rotational), elevator |
| Score deposit | Slide deposit, dump bucket, outtake roller |
| Endgame hang / climb | Hook, winch, scissor lift |
| Endgame park | Drive in place, raise mechanism for elevated park |

### Mechanism design principles

**1. Design for failure modes, not just the happy path.**
Ask: what happens when this mechanism jams? What happens when a game element enters at the wrong angle? Design mechanisms that fail gracefully — jam and recover without damaging the robot or requiring a timeout to fix.

**2. Reduce degrees of freedom.**
Every joint, pivot, or moving part is a failure point. A linear slide with two stages is more reliable than one with four. The simplest mechanism that scores is the right mechanism for competition.

**3. Attach mechanisms to the robot frame, not to other mechanisms.**
Stacking mechanisms (e.g., a claw attached to a lift attached to an arm) amplifies positional error and mechanical slop. Try to ground each mechanism to the main chassis.

**4. Tension cables and belts properly.**
A belt that slips or a cable that stretches under load will fail mid-match. Use idler pulleys, tensioners, or spring-loaded hardware to maintain consistent tension throughout the mechanism's range of motion.

**5. Use dead stops and hard limits.**
Every mechanism should have a physical hard stop at the end of its range. Don't rely solely on code to prevent over-extension — hardware limits protect your robot when code behaves unexpectedly.

**6. Match the motor to the task.**
REV HD Hex and goBILDA Yellow Jacket motors have different RPM/torque profiles. A fast motor driving a heavy lift will stall and overheat. Calculate gear ratios to match motor output to the load: heavy loads need higher torque (lower gear ratio), fast movement needs higher RPM (higher gear ratio).

---

## Step 4 — Plan your subsystems

Divide your robot into independent subsystems. Each subsystem should be programmable, testable, and — ideally — physically removable for repair.

**Common FTC subsystems:**

| Subsystem | Function |
|---|---|
| Drivetrain | Movement and field positioning |
| Intake | Collecting game elements |
| Lift / Arm | Raising or extending game elements |
| Outtake / Deposit | Scoring game elements |
| Endgame | Hanging, climbing, or parking |

**Assign ownership.** Each subsystem should have one builder and one programmer. Cross-assign (builder watches programming; programmer watches build) so knowledge isn't siloed. When a subsystem owner is absent at a competition, someone else can debug it.

**Programme each subsystem independently.** You should be able to test intake without driving, lift without intake, etc. Use OpModes that isolate each subsystem during development. Don't wait until the full robot is integrated before you test mechanisms.

---

## Step 5 — Match strategy

### TeleOp strategy

FTC TeleOp is 2 minutes. Most high-scoring robots complete a scoring cycle (collect → transport → score) repeatedly. Know your cycle time:

1. Time your robot from deposit back to collection and back to deposit. Count seconds.
2. Divide 120 seconds by your cycle time. That's your theoretical maximum cycle count.
3. Subtract 20% for repositioning, missed picks, and human error. That's your realistic cycle count.
4. Multiply by your per-cycle score. That's your TeleOp score estimate.

Track this estimate throughout the season. When you improve a mechanism, re-time it. Know your expected score before you walk into a competition.

### Autonomous strategy

FTC Autonomous is 30 seconds. Priorities in order:
1. **Don't crash into anything.** A robot that drives into the field elements or your alliance partner costs you both.
2. **Claim the high-value Autonomous-only bonus.** Most seasons have a specific Autonomous action worth significantly more than its TeleOp equivalent. This is usually worth sacrificing a full scoring cycle to guarantee.
3. **Pre-load score.** Many seasons provide a pre-loaded game element — score it in Autonomous.
4. **Park or position for TeleOp.** End Autonomous in a position that minimises your time-to-first-score in TeleOp.

**Use odometry for Autonomous if possible.** Dead-wheel odometry or a REV Through Bore Encoder on each drivetrain shaft lets you track robot position without drift. Pure encoder-based driving is simpler but accumulates error over 30 seconds. RoadRunner is the most popular community library for FTC path planning — see the [FTC resource map](/resources/ftc-resource-map/) for links.

### Alliance selection strategy

After qualifying rounds, your alliance selection ranking matters. Teams that score consistently and don't break are valued more than teams that occasionally score high but are unreliable. The best alliance partners:

- Score enough to contribute meaningfully without needing to be carried
- Have a **complementary specialty** — if the top teams all have great lifts, a consistent intake specialist is more valuable
- Don't interfere with their partner (no field blocking, no accidental defence)
- Communicate clearly before and during the match

---

## Step 6 — The iteration loop

Great FTC robots aren't designed once — they're improved continuously. The loop is:

1. **Build** the simplest version that could work
2. **Test** against realistic field conditions (your field mat, at competition speeds)
3. **Identify** the actual failure mode (not what you guessed would fail)
4. **Change one thing** — don't rebuild everything at once
5. **Retest** with the same conditions
6. **Document** what changed and whether it improved

**Track robot changes in your engineering notebook.** FTC judging values documented iteration — the judges want to see that you understood *why* your first design didn't work, not just that you built a better one.

**Reserve time to freeze the robot.** Two to three weeks before your first competition, your robot should be close to final. Use that time for driver practice, not new builds. A robot that's mechanically finished and well-driven beats an exciting robot with no practice miles.

---

## Common rookie mistakes

| Mistake | Why it hurts | How to avoid |
|---|---|---|
| Building a complex mechanism first | Complexity amplifies errors; simple rarely works on first try | Start simple; iterate to complex only when necessary |
| Not testing until near the competition | Late bugs have no time to fix | Run weekly test matches against your own field |
| Skipping weight tracking | Overweight robot violates rules | Track weight from the start; check at every build session |
| Over-engineering the drivetrain | Drive bases are well-solved; custom drivetrains eat time | Use goBILDA, REV, or a well-documented community design |
| Ignoring the Endgame until late | Endgame often has the highest single-action point value | Plan for Endgame from day one, even if you can't build it until mid-season |
| Underestimating cable management | Loose wires jam mechanisms and fail electrical inspections | Route cables at build time; re-route every major redesign |
| No driver practice | Well-driven simple robots beat poorly-driven complex ones | Commit to 2+ hours of driver practice per week in the 6 weeks before competition |

---

## Resources

- [FTC Resource Map](/resources/ftc-resource-map/) — curated links to official docs, community libraries, build resources
- [FTC Programming Basics](/guides/ftc-programming-basics/) — OpMode structure, TeleOp, and Autonomous code
- [FTC Engineering Portfolio](/guides/ftc-engineering-portfolio/) — how judges evaluate your design process
- [FTC Awards Guide](/guides/ftc-awards/) — what awards exist and what the judges look for
- [Your First FTC Tournament](/guides/first-ftc-tournament/) — what competition day looks like
