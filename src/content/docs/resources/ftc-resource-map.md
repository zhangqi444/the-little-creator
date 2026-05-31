---
title: FTC Resource Map
description: Curated map of authoritative and trusted resources for FIRST Tech Challenge — official sources, programming docs, team management, and event resources.
tags: [ftc, resource-map, official, programming]
---

A curated map of where to actually go for FIRST Tech Challenge information. Every link below is annotated with what it is, who it's for, and when to use it. We don't republish content — we point at it. Official sources are authoritative; independent and community resources are flagged accordingly. Our FTC coverage is newer and lighter than our FLL coverage — additions welcome via PR.

## Official sources (canonical)

### FIRST Tech Challenge — program home

- **URL:** https://www.firstinspires.org/programs/ftc/
- **Authority:** official
- **Audience:** families, coaches, teachers, teams
- **Level:** all
- **Tags:** ftc, official, program-home
- **Use when:** You need program-wide info on FTC — what it is, who it's for, current season highlights, and entry points to deeper resources.

The official FTC program landing page on FIRST Inspires. Covers ages 12–18 / grades 7–12, current season (DECODE for 2025/26; **BIOBUZZ presented by RTX releasing September 12, 2026** for 2026/27 under the FIRST CANOPY umbrella). Stats from 2024-25: 109,000 students across 81 countries; 61% of FIRST alumni declare an engineering or CS major.

### Get Started with FIRST Tech Challenge

- **URL:** https://www.firstinspires.org/programs/ftc/get-started
- **Authority:** official
- **Audience:** families, teachers, coaches
- **Level:** beginner
- **Tags:** ftc, official, getting-started, registration
- **Use when:** You are starting a new FTC team — need the canonical onboarding flow including team size, coach requirements, materials checklist, and cost breakdown.

The FTC-specific getting-started flow on FIRST. Walks through who you need on the team (typically 8–12 students grades 7–12, plus 2 required lead adult coaches), what hardware and software is required, how much it costs, and routes you to registration.

### DECODE — current FTC season (2025/26)

- **URL:** https://www.firstinspires.org/programs/ftc/game-and-season
- **Authority:** official
- **Audience:** coaches, teams, families
- **Level:** all
- **Tags:** ftc, season-2025-26, decode, current
- **Use when:** You need the current FTC season's theme info, game animation, field walkthroughs, StarterBots, and gameplay cards.

The current FTC season hub on FIRST. **DECODE presented by RTX** is the 2025/26 theme — teams investigate artifacts and unlock mysteries through engineering. Page links to the official game animation, a detailed field walkthrough, StarterBot designs to bootstrap rookies, and downloadable gameplay cards. URL rotates to the next season landing each September.

### FTC Team Management Resources

- **URL:** https://www.firstinspires.org/resources/library/ftc/team-management-resources
- **Authority:** official
- **Audience:** coaches, teachers
- **Level:** all
- **Tags:** ftc, coach, official, fundraising, registration
- **Use when:** You are coaching an FTC team and need the comprehensive team-running hub — registration, mentor training, budget and fundraising, marketing, building, competition prep.

FTC's central hub for the coaching side of the program: team registration, mentor training, budgeting and fundraising, marketing and team identity, robot building guidance, and competition preparation. Useful entry point when you have a specific operational question that isn't game-rules.

### FTC Programming Resources

- **URL:** https://www.firstinspires.org/resources/library/ftc/programming-resources
- **Authority:** official
- **Audience:** coaches, teens
- **Level:** intermediate
- **Tags:** ftc, programming, software, sdk, official
- **Use when:** You need to install or update the FTC SDK, Driver Hub / Control Hub apps, or find the canonical programming docs.

Software hub for FTC. Minimum SDK version is 9.0; software ships as Android apps for the Driver Hub and Control Hub. Links to the SDK source on [github.com/FIRST-Tech-Challenge/FtcRobotController](https://github.com/FIRST-Tech-Challenge/FtcRobotController) and to install / update instructions at [ftc-docs.firstinspires.org](https://ftc-docs.firstinspires.org/).

### FTC SDK on GitHub

- **URL:** https://github.com/FIRST-Tech-Challenge/FtcRobotController
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** ftc, programming, sdk, open-source, github
- **Use when:** You want the FTC robot controller source code — to fork, file an issue, see release notes, or pull the latest version.

The canonical FTC SDK repository. Source for the Robot Controller and Driver Station apps. Releases are tagged so teams can pin to a specific season's version. Open-source under Apache-2.0; community PRs are accepted.

### ftc-docs.firstinspires.org — programming documentation

- **URL:** https://ftc-docs.firstinspires.org/
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** ftc, programming, documentation, official
- **Use when:** You need detailed how-to documentation for FTC programming — SDK setup, Blockly / OnBot Java / Android Studio environments, control system architecture, OpModes, and troubleshooting.

The canonical FTC programming documentation site. More structured and searchable than the GitHub wiki. Covers all three programming environments (Blockly, OnBot Java, Android Studio), hardware-side topics (Control Hub, motors, sensors), and software architecture (OpModes, hardware mapping, telemetry).

---

## Hardware vendors

FTC robots are built from a small number of specialist hardware vendors. Teams routinely mix parts from REV (the control system) with mechanical kits from goBILDA or TETRIX. These entries cover the dominant vendors and their relationship to the FTC ecosystem.

### REV Robotics — FTC Control System & DUO mechanical kit

- **URL:** https://www.revrobotics.com/ftc/
- **Authority:** independent (official FTC control system supplier)
- **Audience:** coaches, teens, technical mentors
- **Level:** beginner, intermediate
- **Tags:** ftc, hardware, control-hub, rev-duo, kits
- **Use when:** Sourcing the FTC Control Hub, Driver Hub, motors, sensors, or the REV DUO mechanical build system. The Control Hub specifically is the FTC standard — every FTC robot has one.

REV Robotics supplies the official FTC control system: the **Control Hub** (Android-based robot brain) and the **Driver Hub** (the team's tablet-style interface). REV also ships the **REV DUO** mechanical build system — extrusion, channels, motors, sensors, hardware — designed for FTC's 18"×18" robot envelope. The **FTC Starter Kit V3.1** (REV-45-3529, around $695 as of 2026) bundles a complete starting robot. Full product catalog has ~180 FTC-tagged items. REV's hardware documentation is at [docs.revrobotics.com/docs/duo](https://docs.revrobotics.com/docs/duo).

### goBILDA — modular metric build system

- **URL:** https://www.gobilda.com/ftc/
- **Authority:** independent (long-time FTC vendor)
- **Audience:** coaches, teens, technical mentors
- **Level:** beginner, intermediate, advanced
- **Tags:** ftc, hardware, gobilda, mechanical, kits, discount
- **Use when:** Sourcing the structural and mechanical side of an FTC robot — channel, beams, motors, servos, wheels, gears, chain, custom mechanisms. Also for the annual Starter Kit aligned to each season's StarterBot.

goBILDA is a modular metric build system widely used in FTC. Metric pattern with 32mm hole spacing, ball-bearing-based, designed to scale from desktop prototypes to full competition robots. **Registered FTC teams get 25% off most items** — significant savings over a full season. Their **FTC Starter Kit (2026-2027 Season)** is priced around $899.99 (their flagship onboarding bundle aligned to the season's official StarterBot design). Known for the **Pinpoint Odometry Computer** and **Strafer mecanum chassis kits** in advanced teams. Documentation embedded throughout product pages; community use guidance lives in Game Manual 0 below.

### TETRIX — long-time FTC mechanical kit

- **URL:** https://www.pitsco.com/collections/tetrix-robotics
- **Authority:** independent (long-time FTC vendor)
- **Audience:** coaches, teens
- **Level:** beginner
- **Tags:** ftc, hardware, tetrix, mechanical, beginner-friendly
- **Use when:** A team is choosing between vendor ecosystems and wants a classroom-friendly alternative. TETRIX is common in school-based programs.

TETRIX has been an FTC mechanical vendor since the program's early years — aluminum extrusion, hubs, motors, structural plates. More approachable for teachers without prior robotics experience than goBILDA's modular metric system but generally lower ceiling for competitive builds. Often the choice for new in-school programs adopting FTC alongside other STEM curricula. **Note (2026-05):** the legacy `tetrixrobotics.com` domain no longer resolves; the brand is now sold exclusively through Pitsco Education at the URL above.

---

## Community documentation & strategy

### Game Manual 0 — community FTC handbook

- **URL:** https://gm0.org/
- **Authority:** community (volunteer-written, widely-cited)
- **Audience:** teens, coaches, technical mentors
- **Level:** beginner, intermediate, advanced
- **Tags:** ftc, community, mechanical, programming, awards, foundational
- **Use when:** A team needs in-depth, opinionated, community-vetted guidance on anything from "how to start a team" through "kinematics of dead-wheel odometry" — content that the official FTC docs intentionally leave to the community.

The most comprehensive community-written FTC resource on the web. Covers the gaps in official documentation: starting a team, engineering design process, CAD, per-vendor hardware guides (goBILDA, REV, TETRIX, Actobotics), custom manufacturing (3D printing, machining, laser cutting), drivetrain selection (tank vs. holonomic), power transmission, linear motion mechanisms, intakes, transfers, dead wheels, turrets, the control system internals, programming concepts (control loops, finite state machines, kinematics, odometry), and Awards / Engineering Portfolio guidance. Open-source on GitHub, hosted by Copperforge. Treat it as the community-maintained companion to ftc-docs.

### Chief Delphi — FTC sub-forums

- **URL:** https://www.chiefdelphi.com/c/technical/programming/30
- **Authority:** community
- **Audience:** teens, coaches, technical mentors
- **Level:** intermediate, advanced
- **Tags:** ftc, community, forum, strategy
- **Use when:** You have a specific technical question, want robot reveals from competitive teams, or want to follow strategic discussion around the current game.

Chief Delphi is the largest cross-program FIRST community forum (FRC-dominant but with active FTC, FLL, and outreach categories). Less FTC-specific than r/FTC or Discord, but signal-to-noise is high — many top FTC alumni cross over from FRC and post here. Good for "is this design legal", "has anyone built X mechanism", and post-event reveal discussion. **Note (2026-05):** the old `/c/ftc/30` path now redirects to `/c/technical/programming/30`; URL updated accordingly.

### r/FTC — Reddit community

- **URL:** https://www.reddit.com/r/FTC/
- **Authority:** community
- **Audience:** teens, coaches, parents
- **Level:** all
- **Tags:** ftc, community, reddit, q-and-a
- **Use when:** Casual questions, robot reveals, season chatter, looking for sub-region tournament results, mid-season problem-solving.

The most active casual FTC community on the web. More forgiving than Chief Delphi for beginner questions. Robot reveals are common in pre-competition weeks. Mods are responsive about rule-violation posts. Not a source for official rule interpretations — for those, file a Q&A through the official FIRST Q&A forum each season.

---

## Open-source community libraries

The FTC SDK gives you everything you need to run a basic robot, but most competitive teams layer open-source community libraries on top to solve the same problems FRC's WPILib ecosystem solves. The entries below cover the most-cited libraries.

### RoadRunner — autonomous motion library

- **URL:** https://rr.brott.dev/
- **Authority:** community (widely-adopted; FRC-inspired)
- **Audience:** teen programmers, mentors
- **Level:** intermediate, advanced
- **Tags:** ftc, autonomous, path-following, motion-profiling, oss
- **Use when:** Building autonomous routines that move smoothly through waypoints — especially on mecanum or tank drivetrains. The canonical FTC autonomous motion library.

RoadRunner is the dominant autonomous motion library in FTC — analogous to PathPlanner in FRC. Provides motion profiling, trajectory generation, and trajectory following with feedforward + feedback control for mecanum, tank, and (in v1.0+) custom drivetrains. Pairs naturally with goBILDA's Pinpoint odometry computer or with custom dead-wheel odometry pods. Maintained by Ryan Brott; current major version is 1.0 (1.0 is a substantial rewrite from the long-lived 0.5 — many tutorials still reference 0.5).

### FTCLib — command-based programming for FTC

- **URL:** https://docs.ftclib.org/ftclib
- **Authority:** community
- **Audience:** teen programmers, mentors
- **Level:** intermediate, advanced
- **Tags:** ftc, command-based, programming, oss
- **Use when:** A team wants to organise their robot code in the command-based pattern (the same pattern WPILib popularised in FRC) — subsystems, commands, command groups.

FTCLib brings the command-based programming framework — popularised by WPILib in FRC — into FTC. Wraps the FTC SDK's lower-level APIs in subsystems and commands, encourages a cleaner separation of "what the robot can do" from "what we want it to do now", and integrates well with RoadRunner. Often the choice for teams whose programmers have FRC exposure (mentors, alumni) and want the same architecture across both programs.

### EasyOpenCV — vision pipeline simplification

- **URL:** https://github.com/OpenFTC/EasyOpenCV
- **Authority:** community (FTC OpenFTC org)
- **Audience:** advanced teen programmers, mentors
- **Level:** advanced
- **Tags:** ftc, vision, opencv, apriltags, oss
- **Use when:** Implementing camera-based detection (game pieces, AprilTags, custom contours) on the Control Hub or an attached webcam, without writing the OpenCV boilerplate from scratch.

EasyOpenCV provides a simplified pipeline interface for OpenCV-based vision processing inside an FTC OpMode. Wraps camera lifecycle, frame capture, and pipeline switching so teams can focus on the per-frame processing logic. Pairs with the official Vuforia and TensorFlow Lite paths that ship with the SDK — many teams use EasyOpenCV for custom detection alongside the official APIs for AprilTags. Maintained by the OpenFTC organisation, which also maintains community Control Hub firmware tools.

### FTC Dashboard — live tuning and telemetry

- **URL:** https://acmerobotics.github.io/ftc-dashboard/
- **Authority:** community (Acme Robotics)
- **Audience:** teen programmers, mentors
- **Level:** intermediate, advanced
- **Tags:** ftc, dashboard, tuning, telemetry, oss
- **Use when:** Tuning PID gains, visualising odometry traces, or seeing live robot state from a laptop on the same network as the Driver Hub.

FTC Dashboard runs a web server on the Control Hub during OpModes and serves a browser-based dashboard with live telemetry plots, configurable variables (for live tuning), and a field overlay for odometry / trajectory visualization. Indispensable for tuning RoadRunner trajectories and debugging mid-match behavior. Maintained by Acme Robotics (FTC team).

This map is intentionally curated. To suggest a resource, open a pull request with the per-entry metadata schema (URL, Authority, Audience, Level, Tags, Use when, description). Independent and community resources are welcome with appropriate authority flagging.
