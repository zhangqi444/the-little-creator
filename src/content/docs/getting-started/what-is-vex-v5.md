---
title: What is VEX V5 / VRC?
description: Plain-language overview of VEX V5 and the VEX Robotics Competition (V5RC/VRC) — a high-school robotics program for grades 7–12 where teams build metal robots and compete in alliance-based matches and skills challenges.
tags: [vex-v5, vrc, v5rc, getting-started, recf, high-school, override-2026-27]
audience: [families, parents, coaches, teens, teachers]
level: beginner
season: evergreen
---

VEX V5 (also called **VRC — VEX Robotics Competition**) is a competitive robotics program for **students in grades 7–12 (roughly ages 11–18)**, run by the [Robotics Education & Competition Foundation (RECF)](https://www.recf.org/). Teams design and build robots from metal components — using the V5 Brain, Smart Motors, and a wide range of sensors — then compete in an annual head-to-head game on a 12×12 ft field.

:::note[Current season]
The 2025-26 VEX V5 season is **Push Back** (V5RC). The 2026-27 season, **Override**, was announced for transition in summer 2026. Check the [V5RC current game page](https://www.vexrobotics.com/v5-current-game) for the latest game manual and official season materials.
:::

## Who is VEX V5 for?

VEX V5 is designed for middle and high school students — typically grades 7–12. It's the natural progression for students who've outgrown VEX IQ or FLL and want a program with more engineering depth, real metal fabrication, and a head-to-head competitive format.

The program is a strong fit for students who enjoy:
- Hands-on mechanical engineering (cutting metal, designing custom mechanisms)
- Programming in C++ or Python (competitive teams usually write real code)
- Strategic game analysis and match-to-match adaptation
- The experience of a longer, more demanding season

Because VEX V5 targets teens, the content depth here — and in linked guides — reflects that audience. The competition format, notebook requirements, and software tools all assume more independence and technical confidence than VEX IQ or FLL.

## How VEX V5 compares to nearby programs

| Program | Ages | Hardware | Key feature |
|---|---|---|---|
| VEX IQ | 8–14 (elem–middle) | Snap-together plastic | Alliance matches + Skills Challenge; cooperative matches; great entry-level VEX |
| **VEX V5 (VRC)** | **11–18 (grades 7–12)** | **Metal components, V5 Brain** | **Head-to-head alliance competition; more engineering freedom; engineering notebook** |
| FTC | 12–18 (grades 7–12) | REV/TETRIX metal + Android control | FIRST ecosystem; engineering portfolio; strong North American presence |
| VEX U | University | V5 + custom machined parts | Two-robot alliances; engineering freedom maximised; no driver restrictions |

For students moving up through VEX, VEX V5 is the step between IQ (middle school) and VEX U (university). See the [Progression Guide](/getting-started/progression-guide/) for a structured look at when and how to make this transition.

## A VEX V5 season at a glance

- **Late April (World Championship)** — New game announced for the upcoming season
- **Summer** — Design and early build season; teams study the game manual and prototype
- **September–November** — Build, iterate, and test; qualifying tournaments begin
- **December–February** — Regional qualifying events and invitationals
- **March–April** — State/regional championships; top teams advance to the **VEX Robotics World Championship** (held late April)

Each year's game has a distinct theme and scoring objectives. The current 2025-26 game is **Push Back**; the 2026-27 season launches as **Override**. Check the [V5RC current game page](https://www.vexrobotics.com/v5-current-game) for the official game manual and field specs once the season opens.

## How competition works

### Alliance matches

Unlike VEX IQ's cooperative format, **V5RC is head-to-head**. Two alliances of two robots each compete against each other. Alliance partners work together, but they're playing against the opposing alliance — not with all four teams.

Each match has two phases:
- **Autonomous period** (15 seconds) — both robots run pre-programmed code; points scored in this phase often determine tie-breakers
- **Driver-controlled period** (1 minute 45 seconds) — operators control the robots to score game objects

Qualification rounds pair teams with different partners each match. Final alliance selection and elimination matches follow a seeding/draft process. For a full guide to what competition day looks like in practice, see the [VEX V5 Tournament Guide](/guides/vex-v5-tournament/).

### Skills Challenge

Every V5RC event runs a parallel Skills Challenge where a single robot runs the field solo:

- **Driver Skills** — operator-controlled, 60 seconds
- **Autonomous Coding Skills** — fully autonomous, 60 seconds

Skills scores accumulate across events throughout the season, contributing to a global ranking. Strong Autonomous Coding Skills performance is a major differentiator at the regional championship and World Championship levels. Teams that want to compete seriously at Worlds almost always invest heavily in programming skills.

## Awards

V5RC tournaments award teams well beyond match wins:

- **Excellence Award** — the top award; spans robot design, programming, skills scores, engineering notebook, and team conduct
- **Design, Build, Think, Amaze, Innovate** — component awards recognising specific strengths (notebook-based judging is significant here)
- **Robot Skills Champion** — highest combined Driver + Autonomous Coding Skills score at the event
- **Tournament Champion** — alliance that wins elimination rounds

The **Excellence Award** requires a strong engineering notebook, which means documentation matters all season — not just on competition day. For a full breakdown of what each award looks for, see the [VEX Awards guide](/guides/vex-awards/).

## Programming in VEX V5

VEX V5 supports three main programming environments:

- **VEXcode Blocks** — Drag-and-drop block programming. Rarely used by competitive teams beyond early learning stages.
- **VEXcode Pro V5 (C++)** — The standard for competitive V5 teams. Gives access to the full V5 API: motor control, encoder feedback, sensor readings, PID loops, and the Competition template (autonomous + driver control entry points).
- **PROS** — An open-source C++ framework used by top-tier teams. Better tooling (VS Code integration), a larger community library ecosystem ([OkapiLib](https://okapilib.github.io/OkapiLib/), [LemLib](https://lemlib.readthedocs.io/)), and more flexibility than VEXcode Pro.

Most rookie teams start with VEXcode Pro V5 and graduate to PROS as they grow. The [VEX V5 Programming Basics guide](/guides/vex-v5-programming-basics/) covers the VEXcode Pro V5 entry points — motor mapping, drive control, the Competition template, and a basic Autonomous example — and points toward PROS for teams ready to go further.

## What you need to get started

- **Team:** 2 adult coaches + typically 3–6 students (RECF allows up to 15 per team; competitive teams usually keep it smaller)
- **Hardware:** VEX V5 kit — V5 Brain, Smart Motors (11W), sensors, controller, and structural metal components. Starter kits are available from [VEX](https://www.vex.com/) or authorised resellers. Expect significantly higher hardware costs than VEX IQ.
- **Software:** VEXcode Pro V5 (free) or PROS (free, open-source) — both run on Windows and macOS
- **Engineering notebook:** Required for Design, Excellence, and related awards — start it on day one
- **Registration:** Through [RobotEvents.com](https://www.robotevents.com) — register the team and find local events

## Key differences from VEX IQ

- **Head-to-head competition.** VEX V5 alliances compete *against* each other; VEX IQ alliances cooperate with all four teams.
- **Metal components.** V5 robots use metal structural pieces, requiring cutting tools, drilling, and more mechanical know-how than the snap-together IQ plastic.
- **Engineering notebook matters.** VEX V5 award judging weighs the team's documentation heavily. Notebook-keeping should start at the first build session.
- **More powerful programming.** The V5 Brain has a faster processor and more memory than the IQ Brain; competitive teams are expected to write real C++ or Python code, including autonomous routines and sensor feedback loops.
- **Higher cost.** A competitive V5 kit costs substantially more than VEX IQ. Factor in the V5 Brain, multiple Smart Motors, structural metal, sensors, and spare parts.

## Key differences from FTC

Both VEX V5 and FTC target roughly the same age range (grades 7–12), but they're distinct in important ways:

- **Hardware ecosystem.** FTC uses REV Robotics or TETRIX metal alongside an Android-based Control Hub. V5 uses VEX's own proprietary V5 Brain and Smart Motors.
- **Programming.** FTC is programmed in Java (FTC SDK via Blocks, OnBot Java, or Android Studio). V5 is programmed in C++ or Python (VEXcode Pro V5 or PROS). If your students are Java-oriented or your school has Java resources, FTC may feel more natural.
- **FIRST vs. RECF.** FTC is part of the FIRST ecosystem (FLL → FTC → FRC). VEX V5 is part of the RECF ecosystem (VEX IQ → VEX V5 → VEX U). The two organisations have separate registration, events, and awards structures.
- **Competition format.** Both run head-to-head alliance matches, but the specific field size, match duration, game format, and judging emphasis differ by season.

## Resources

- [VEX V5 Resource Map](/resources/vex-v5-resource-map/) — curated map of official and community V5 sources: hardware, V5RC knowledge base, RobotEvents, programming docs, forums, YouTube
- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — VEXcode Pro V5, C++ vs. Blocks, drive base, Competition template, autonomous example, intro to PROS
- [VEX V5 Tournament Guide](/guides/vex-v5-tournament/) — alliance matches, scouting, alliance selection, pit interview, engineering notebook in competition context
- [VEX Awards — What Each One Rewards](/guides/vex-awards/) — Excellence, Design, Build, Robot Skills Champion, and what judges look for
- [VEX V5 Curriculum Starter](/for-educators/vex-v5-curriculum-starter/) — 8-week classroom/club onboarding curriculum for educators (grades 7–12)
- [What is VEX IQ?](/getting-started/what-is-vex-iq/) — the step before V5; useful for families comparing the two
- [What is VEX U?](/getting-started/what-is-vex-u/) — the university-level continuation of the VEX V5 pathway
- [What is VEX?](/getting-started/what-is-vex/) — overview of VEX IQ, V5, and U as a family
- [Progression Guide](/getting-started/progression-guide/) — FLL → VEX IQ → V5 → VEX U pathway

### Official links
- [VEX V5 hardware home](https://www.vex.com/vex-v5)
- [V5RC current game page](https://www.vexrobotics.com/v5-current-game) — game manual and season materials
- [V5RC Knowledge Base (RECF)](https://v5rc-kb.recf.org/hc/en-us) — canonical Q&A and rules interpretations
- [RobotEvents.com](https://www.robotevents.com) — find events and register your team
