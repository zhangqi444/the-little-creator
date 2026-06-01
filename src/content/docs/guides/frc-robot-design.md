---
title: FRC Robot Design Guide
description: How to design and build a competitive FRC robot — drivetrain selection, mechanism design principles, weight management, subsystem iteration, and match strategy for rookie and returning teams.
tags: [frc, robot, drivetrain, swerve, tank, design, engineering, build, strategy, wpilib]
audience: [teens, coaches]
level: intermediate
season: evergreen
---

Building a competitive FRC robot is one of the most intense engineering experiences at the high-school level. You have roughly **six weeks** from Kickoff to stop-build (though teams vary on how they interpret the bag rule since it was removed), then practice events and competition season. Every design decision compounds quickly — a drivetrain chosen in Week 1 sets the constraints for everything else. This guide covers the decisions that matter most.

:::note[Season-specific game elements]
This guide covers **process** — drivetrain selection, mechanism principles, weight management, design iteration — all of which apply every season. For current season scoring, field layout, and game-specific rules, read the official **Game Manual** at [firstinspires.org](https://www.firstinspires.org/robotics/frc/playing-the-game). That document is the only authoritative source for scoring, robot rules, and bumper specifications.
:::

---

## Step 1 — Understand what the game rewards

Spend the first 24–48 hours after Kickoff in pure analysis mode. Read the Game Manual. Watch the reveal video multiple times. Then answer:

- **What scores the most points?** High-value actions deserve the most engineering investment.
- **What is achievable in six weeks?** An ambitious mechanism that isn't reliable scores zero. A simple, consistent mechanism scores every match.
- **What does the Endgame look like?** FRC Endgames often carry large point swings — climbing, hanging, parking bonuses. Build for the Endgame from the beginning, not as an afterthought.
- **What do alliance partners need?** FRC uses three-team alliances. A robot that reliably does what others can't is extremely valuable during alliance selection.

Write down your **three highest-priority scoring actions** before designing anything. Every mechanism decision should trace back to those priorities.

---

## Step 2 — Choose your drivetrain

The drivetrain is the most consequential decision you'll make. Changing it mid-season is expensive in both time and weight budget.

### Tank drive (6- or 8-wheel, West Coast)

**Best for:** Rookie teams, defense-heavy games, games where straight-line speed and pushing power matter more than agility.

| Aspect | Detail |
|---|---|
| Complexity | Low — well-understood, many off-the-shelf kits |
| Pushing power | High — all motors aligned |
| Agility | Limited — cannot strafe |
| Programming | Straightforward WPILib DifferentialDrive |
| Wheel options | Colson, VEX Flex, omni corner wheels for turning assist |

**West Coast Drive (WCD)** — the dominant FRC tank configuration — uses direct-drive sprocket/chain or gear-driven wheels with a tube-chassis frame. Many veteran teams use AndyMark, REV, or SDS WCD kits as a starting point.

### Swerve drive

**Best for:** Teams with experienced programming depth who need full field-centric omnidirectional movement; games where precise positioning is critical.

| Aspect | Detail |
|---|---|
| Complexity | Very high — four independent steer + drive modules, complex kinematics |
| Pushing power | Moderate — dependent on module angle |
| Agility | Excellent — strafe, spin, translate simultaneously |
| Programming | WPILib SwerveDriveKinematics; expect 2–3 weeks of tuning |
| Module sources | SDS MK4i, REV MAXSwerve, WCP SwerveX |

:::caution[Swerve commitment]
Swerve is powerful but unforgiving. If your team hasn't successfully deployed a swerve drivetrain before, budget significant programming and calibration time. A rookie team attempting swerve for the first time under a 6-week timeline has a high risk of arriving at competition with an unreliable drive system. A reliable tank drive will almost always outperform an unreliable swerve.
:::

### Mecanum drive

**Best for:** Teams that want strafing capability without swerve complexity; games with tight field navigation.

| Aspect | Detail |
|---|---|
| Complexity | Medium — four independently powered wheels at 45° rollers |
| Pushing power | Low — lateral roller engagement means reduced traction |
| Agility | Good — can strafe, but loses efficiency on carpet |
| Programming | WPILib MecanumDrive |

Mecanum is less common in competitive FRC (especially at higher tiers) because swerve has become affordable and mecanum gives up too much pushing power. It can still work for games where defence isn't the main contest.

### Drivetrain decision matrix

| Your team | Recommended |
|---|---|
| Rookie / first robot | 6-wheel West Coast tank |
| Returning, no prior swerve | Tank or mecanum |
| Returning, prior swerve experience | Swerve |
| Defence-focused game strategy | Tank |
| Precise-positioning game strategy + programming depth | Swerve |

---

## Step 3 — Budget your weight

FRC robots have a **120 lb (54.4 kg) maximum weight** (excluding battery and bumpers). Weight management is a design discipline in itself.

### Practical approach

1. **Estimate the drivetrain weight first** — a typical West Coast Drive chassis runs 25–35 lb before motors. A swerve chassis with four modules runs 30–45 lb.
2. **Allocate the remainder** to each subsystem: intake, elevator/arm, end-effector, electronics. Bumpers are excluded from the weight limit.
3. **Reserve 10–15 lb** as a buffer — you will gain weight during iteration.
4. **Weigh components continuously.** Don't wait until Week 5 to discover you're 20 lb over budget.

### Common weight savers

- Replace solid aluminium plate with pocketed tube-stock or polycarbonate where loads allow.
- Use NEO 550 / Falcon 500 / Kraken X60 motors on lighter mechanisms (arm pivots, intake rollers) — they're significantly lighter than CIM motors.
- Avoid over-gearing for redundancy — each extra gear stage adds weight.
- Cable management and wiring harnesses add up; route early and keep runs short.

---

## Step 4 — Design your mechanisms

Each scoring mechanism should be designed with the same discipline:

### Define the task precisely

Don't design "an intake." Design "a mechanism that picks up a 7-inch game piece off the floor in under 1.5 seconds, retained during defence, and deposited into a shooter exit at waist height." The more specific the requirement, the clearer the design target.

### Failure modes first

Before committing to a mechanism, ask: *how does this fail?*

- **Jamming:** Can the game piece get stuck? Add clearance and direct-path guides.
- **Misalignment:** Does the mechanism rely on exact robot positioning? Add passive funnelling or compliance.
- **Mechanical overload:** What happens when the robot hits a wall mid-cycle? Add slip clutches or breakaway joints.
- **Brownout under load:** Stall a motor against resistance and your battery voltage drops. Use current limits in code (`motor.setSmartCurrentLimit()`).

The FRC field is aggressive — defence, carpet friction, and match chaos will stress every joint. Robust over clever.

### Degrees of freedom

Each mechanism should have only the degrees of freedom it needs. Extra axes mean extra motors, extra encoders, extra failure points, and extra code complexity. Ask: *can this be solved with one motor and passive geometry instead of two motors and active sensing?*

### Hard limits and soft limits

Every mechanism that travels to an end-stop needs **physical hard stops** plus **software soft limits** in WPILib to prevent over-travel. Set soft limits 5–10% before the hard stop so software stops the motor before the mechanism hits metal.

### Intake design principles

- **Ground intakes:** Favour wide, compliant-roller designs that funnel the game piece from a range of approach angles. Straight, rigid intakes jam frequently.
- **Avoid long unpowered paths:** If the game piece relies on gravity or momentum to travel more than 8–10 inches inside the robot, it will occasionally stop. Add powered conveyor/indexer stages.

### Elevator and arm design

- **Single-stage elevator** is the most reliable (fewest stages, lightest). Add stages only if field height demands it.
- **4-bar linkage** keeps end-effector orientation constant during travel — valuable for scoring at height without code complexity.
- **Counterbalance with gas struts or surgical tubing.** A gravity-assisted fall is a code bug waiting to happen; a balanced elevator draws minimal current and is safer.

---

## Step 5 — Electronics and power distribution

FRC has strict electronics rules. Violating them means field-trip failures or disabled robots.

### Key rules (verify against current Game Manual)

- Main breaker must be accessible from outside the robot.
- All wiring must be protected with terminal covers or electrical tape on exposed terminals.
- Wire runs must be secured — no loose wiring that can catch the field or opponent robots.
- Spark MAX, Talon SRX/FX, and Kraken/Falcon motors have specific CAN ID requirements — plan your CAN bus topology early.

### Power distribution

| Component | Notes |
|---|---|
| REV PDH / CTRE PDH | Provides 40A, 30A, 20A, and 10A channels; use the correct breaker for each motor |
| Battery | One FRC-legal 12V battery; design for battery access from outside the robot |
| VRM | 12V and 5V outputs for Raspberry Pi, cameras, and other accessories |
| PCM (if using pneumatics) | One PCM per compressor; compressor draws significant current — account for it in match strategy |

### CAN bus discipline

Every CAN device (Spark MAX, TalonFX, Pigeon IMU) must have a unique ID before the robot is powered on with multiple devices connected. Assign IDs the day you wire, not the night before competition. Keep a wiring map document.

---

## Step 6 — Autonomous strategy

FRC Autonomous Periods are 15 seconds. Reliable autonomous routines earn significant ranking points — often the difference between playoffs and elimination.

### Autonomous priority ladder

1. **Don't cross into opponent's zone uninvited.** Some games penalise this heavily.
2. **Execute your highest-point autonomous action reliably 9 out of 10 practice runs** before attempting more complex paths.
3. **Add a fallback auto** (e.g., just drive to a safe position) that you can deploy if the primary routine is failing at an event.
4. **Use PathPlanner or Choreo** for complex multi-piece paths — these tools handle trajectories and field-relative navigation far more reliably than hand-coded routines.

### Alliance coordination

Before every match, discuss autonomous plans with your alliance partners. Two robots heading to the same starting zone at the same time is a common early-match collision. Agree on which robot runs which auto before you queue.

---

## Step 7 — TeleOp cycle strategy

FRC TeleOp is 135 seconds. Your score is determined by how many complete cycles your robot performs — pick up, score, repeat.

### Cycle time optimisation

- **Measure your actual cycle time** in practice. Teams often overestimate speed. Real field-speed cycles take 15–25 seconds for simple paths; 8–12 for elite teams.
- **Human Player coordination:** Know exactly when and how the Human Player feeds game pieces. Miscommunication costs seconds per cycle.
- **Simplify the drive path.** Fewer turns means fewer seconds. Design the field approach path and scoring position to be as straight and repeatable as possible.

### Drive team practice

The robot is only half the equation. Drive teams need as many hours of practice as the robot needs hours of build time. Run timed practice matches against the clock, not just casual robot driving.

---

## Step 8 — Alliance selection strategy

At the end of qualifying, the top 8 ranked teams select alliance partners. Being selected matters more than you might expect.

### How to get picked

- **Reliability.** Teams scout for robots that consistently do what they say they'll do. A robot with 8 reliable cycles beats one with 10 inconsistent cycles.
- **Complementary skills.** If most top teams score from the floor, a robot that handles a different game element or excels at Endgame becomes disproportionately valuable.
- **Drive team communication.** Scouts notice teams that communicate clearly, don't damage other robots, and reset quickly after fouls.

### If you're a top seed

Scout carefully. Qualification match stats tell you average performance, not reliability. Ask teams directly: *"What's your worst match this event?"* Teams that can answer honestly are more trustworthy alliance partners than teams that only talk about their best match.

---

## Common rookie mistakes

| Mistake | What happens | Fix |
|---|---|
| Designing for the reveal video game piece, not the real one | Field game pieces behave differently than renders | Get a game piece sample as early as possible; test intakes with real pieces |
| Ignoring bumper rules | Robot is illegal at inspection | Read bumper spec carefully (height, hardness, coverage) in the manual on Day 1 |
| Over-designing the first subsystem | Week 3 and nothing else is built | Timebox each mechanism: Week 1 drivetrain, Week 2 primary mechanism, Week 3 integration |
| Building only one robot | No testing without the competition robot | Build a practice chassis (even simplified) as soon as the competition frame is welded |
| Skipping current limits | Motors brown out under load; battery voltage sags | Set setSmartCurrentLimit() on every motor before first driving test |
| Autonomous coded in the last week | Crashes at competition; no time to fix | Start autonomous in Week 2 on a straight path; add complexity weekly |
| No alliance coordination at competition | Collision in opening seconds | Pre-match auto discussion is mandatory, not optional |

---

## Further reading

- [FRC Programming Basics (WPILib)](/guides/frc-programming-basics/) — Java frameworks, encoder control, Shuffleboard telemetry
- [Your First FRC Tournament](/guides/first-frc-tournament/) — multi-day event structure, pit life, scouting
- [FRC Awards Guide](/guides/frc-awards/) — Impact Award, Imagery, and other award paths
- [FTC Robot Design Guide](/guides/ftc-robot-design/) — parallel guide for FTC teams
- [Robot Strategy Guide](/guides/robot-strategy/) — general mission-priority principles that transfer to any game-based competition
