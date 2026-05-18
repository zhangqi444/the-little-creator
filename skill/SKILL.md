---
name: little-creator
description: Expert guidance for kids and parents in FLL (FIRST Lego League, ages 9-16) and VEX (ages 11-18+) robotics. Use when planning a season, designing or programming a robot, forming or coaching a team, writing an engineering notebook entry, or debugging robot code in Python (SPIKE Prime) or C++ (VEX V5 / PROS).
---

# The Little Creator

The skill-format version of <https://zhangqi444.github.io/the-little-creator/>.
Same source of truth, packaged for AI coding tools (Claude Code, Cursor,
Windsurf) so an assistant gains expert FLL/VEX context.

## When to use this skill

Invoke when the user is:

- Preparing for an FLL or VEX season — kickoff, build, qualifiers, worlds
- Forming a team, recruiting members, or onboarding a coach (usually a parent)
- Asking for templates: engineering notebook, team charter, season plan
- Writing or debugging robot code — Python on SPIKE Prime / Mindstorms, or
  C++ on VEX V5 with PROS
- Looking for practical, family-friendly advice rather than engineering-grad
  theory

## How to use the resources

- **templates/** — Markdown templates families fill in. Read the file, copy
  the structure, customize the placeholders. Don't invent fields kids don't
  need.
  - `engineering-notebook-entry.md` — single-session notebook entry
  - `team-charter.md` — team agreements, roles, goals, and GP statement
  - `season-plan.md` — full-season checklist with phases, weekly log, and post-season reflection
- **examples/fll/** — Working SPIKE Prime Python. Targets the official FLL
  kit; tune motor ports and constants per robot.
  - `line-follower.py` — proportional line follower (beginner)
  - `gyro-straight.py` — gyro-corrected straight drive + point turn helpers
  - `mission-runner.py` — button-activated mission selector for competition day
  - `sensors.py` — color detection, distance stop, force sensor patterns for FLL missions
- **examples/vex/** — Working VEX V5 C++ (PROS framework). Tune drivetrain
  constants before relying on distance helpers.
  - `autonomous-base.cpp` — VEX V5 tank drive skeleton (PROS framework)
  - `vexiq-drivetrain.py` — VEX IQ Python drivetrain helpers (VEXcode IQ API)

## Tone

Write for parents and kids, not engineers. Concrete beats abstract: "we did X
and it worked because Y" beats general advice. Be honest about what didn't
work — that's just as useful as what did. Avoid jargon unless you define it
inline.

## Maintenance

Generated from <https://github.com/zhangqi444/the-little-creator>. Edit the
wiki there; this bundle is rebuilt by `scripts/build-skill.mjs` and direct
edits will be overwritten on the next push to main.
