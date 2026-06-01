---
name: little-creator
description: Expert guidance for parents, coaches, and students in youth competitive robotics — FLL (FIRST LEGO League, ages 4–16), FTC (FIRST Tech Challenge, grades 7–12), FRC (FIRST Robotics Competition, grades 9–12), VEX IQ (ages 8–14), VEX V5/VRC (grades 8–12), and VEX U (college). Use when planning a season, designing or programming a robot, forming or coaching a team, writing an engineering notebook or impact submission, or debugging robot code in Python (SPIKE Prime / VEXcode IQ), Java/Kotlin (FTC SDK), or C++ (VEX V5 PROS / FRC WPILib).
---

# The Little Creator

The skill-format version of <https://zhangqi444.github.io/the-little-creator/>.
Same source of truth, packaged for AI coding tools (Claude Code, Cursor,
Windsurf) so an assistant gains expert context across all six youth
competitive robotics programs.

## When to use this skill

Invoke when the user is:

- Preparing for an FLL, FTC, FRC, or VEX season — kickoff, build, qualifiers, worlds/championship
- Forming a team, recruiting members, or onboarding a coach or mentor
- Asking for templates: engineering notebook, team charter, season plan, FRC impact award submission
- Writing or debugging robot code:
  - **FLL** — Python on SPIKE Prime or Pybricks / Mindstorms
  - **FTC** — Java or Kotlin with the FTC SDK (REV Control Hub / Driver Station)
  - **FRC** — Java or C++ with WPILib (roboRIO); command-based programming patterns
  - **VEX IQ** — Python with VEXcode IQ API
  - **VEX V5** — C++ with PROS framework or VEXcode V5
- Looking for practical, family-friendly advice — season planning, judging prep, team dynamics

## Programs covered

| Program | Ages | Hardware | Typical language(s) |
|---|---|---|---|
| FLL Discover / Explore | 4–10 | LEGO Education SPIKE Essential / WeDo 2.0 | Block-based |
| FLL Challenge | 9–16 | LEGO Education SPIKE Prime | Python / Blocks |
| FTC | Grades 7–12 | REV Control Hub / goBILDA / TETRIX | Java, Kotlin |
| FRC | Grades 9–12 | roboRIO + open hardware kit | Java, C++, LabVIEW |
| VEX IQ | 8–14 | VEX IQ plastic kit | Python (VEXcode IQ) |
| VEX V5 / VRC | Grades 8–12 | VEX V5 metal kit | C++ (PROS), VEXcode V5 |
| VEX U | College | VEX V5 (no size/weight limits) | C++ (PROS) |

## How to use the resources

- **templates/** — Markdown templates families fill in. Read the file, copy
  the structure, customize the placeholders. Don't invent fields kids don't
  need.
  - `engineering-notebook-entry.md` — single-session notebook entry (FLL/FTC/FRC/VEX format)
  - `team-charter.md` — team agreements, roles, goals, and GP statement
  - `season-plan.md` — full-season checklist with phases, weekly log, and post-season reflection
- **examples/fll/** — Working SPIKE Prime Python. Targets the official FLL
  kit; tune motor ports and constants per robot.
  - `line-follower.py` — proportional line follower (beginner)
  - `gyro-straight.py` — gyro-corrected straight drive + point turn helpers
  - `mission-runner.py` — button-activated mission selector for competition day
  - `sensors.py` — color detection, distance stop, force sensor patterns for FLL missions
- **examples/ftc/** — Working FTC SDK Java. Hardware map names must match your Driver Station robot configuration.
  - `teleop-mecanum.java` — mecanum four-wheel TeleOp with slow-mode, arm, and claw servo
  - `autonomous-encoder.java` — encoder-based straight drive + point turn helpers
- **examples/frc/** — Working WPILib Java. CAN IDs and gear ratios must match your robot's wiring and gearbox.
  - `teleop-tank.java` — TimedRobot tank drive with two CANSparkMax leaders + followers, Shuffleboard telemetry
  - `autonomous-command.java` — Command-based SequentialCommandGroup: DriveSubsystem, DriveDistance command, and a sample routine (drive forward, pause, drive forward)
- **examples/vex/** — Working VEX V5 and VEX IQ code. Tune drivetrain constants before
  relying on distance helpers.
  - `autonomous-base.cpp` — VEX V5 tank drive skeleton (PROS framework)
  - `teleop-driver.cpp` — VEX V5 TeleOp with tank drive, arm, claw, slow-mode, and rumble feedback (PROS framework)
  - `vexiq-drivetrain.py` — VEX IQ Python drivetrain helpers (VEXcode IQ API)
  - `vexiq-sensors.py` — VEX IQ Python sensor patterns: distance stop, optical hue/brightness detection, bumper press, gyro-corrected straight drive (VEXcode IQ API)
- **examples/vex-u/** — Working VEX U code (PROS framework, VEX V5 hardware). VEX U uses the same
  PROS/V5 stack as VEX V5 but with no size/weight limits, two robots per alliance, and
  a partner controller for independent subsystem operation.
  - `autonomous-base.cpp` — 6-motor tank drive with IMU gyro-corrected straight drive and point-turn helpers
  - `teleop-driver.cpp` — 6-motor TeleOp with tank drive, intake, lift (partner controller), slow-mode, and rumble feedback

## Wiki guides by program

The wiki at <https://zhangqi444.github.io/the-little-creator/> has
program-specific guides. Key entry points:

- **FLL** — [Season Planning](/guides/season-planning/), [Robot Strategy](/guides/robot-strategy/), [Innovation Project Guide](/guides/innovation-project-guide/), [Judging Prep](/guides/judging-prep/)
- **FTC** — [What is FTC](/getting-started/what-is-ftc/), [FTC Awards](/guides/ftc-awards/), [FTC Engineering Portfolio](/guides/ftc-engineering-portfolio/), [First FTC Tournament](/guides/first-ftc-tournament/)
- **FRC** — [What is FRC](/getting-started/what-is-frc/), [FRC Awards](/guides/frc-awards/), [FRC Impact Submission](/guides/frc-impact-submission/), [First FRC Tournament](/guides/first-frc-tournament/)
- **VEX** — [What is VEX](/getting-started/what-is-vex/), [VEX IQ Programming](/guides/vex-iq-programming/), [VEX Awards](/guides/vex-awards/), [First VEX Tournament](/guides/first-vex-tournament/)
- **Cross-program** — [Progression Guide](/getting-started/progression-guide/), [Gracious Professionalism](/guides/gracious-professionalism/), [Forming a Team](/guides/forming-a-team/)

## Tone

Write for parents, coaches, and students — not engineers. Concrete beats
abstract: "we did X and it worked because Y" beats general advice. Be honest
about what didn't work — that's just as useful as what did. Avoid jargon
unless you define it inline. Technical depth is appropriate for FTC/FRC/VEX
U audiences (mostly teens and college students), but keep it accessible for
first-year families.

## Sub-skills

- **ingest-source/SKILL.md** — Use when adding a new URL or resource to the wiki. Covers entry schema, file placement, URL verification, and commit format.

## Maintenance

Generated from <https://github.com/zhangqi444/the-little-creator>. Edit the
wiki there; this bundle is rebuilt by `scripts/build-skill.mjs` and direct
edits will be overwritten on the next push to main.
