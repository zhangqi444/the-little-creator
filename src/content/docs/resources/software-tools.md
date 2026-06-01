---
title: Software & Tools
description: Programming environments and design tools for all six youth competitive robotics programs — FLL, FTC, FRC, VEX IQ, VEX V5, and VEX U.
tags: [fll, ftc, frc, vex, software, tools, programming]
audience: [coaches, teachers, families, teens]
level: all
season: evergreen
---

A curated list of the programming environments and design tools used across all six youth competitive robotics programs. Every entry includes who it's for and when to use it. Jump to your program:

- [FLL Challenge](#programming-environments--fll-challenge)
- [FTC](#programming-environments--ftc)
- [FRC](#programming-environments--frc)
- [VEX IQ](#programming-environments--vex-iq)
- [VEX V5 / VRC](#programming-environments--vex-v5--vrc)
- [VEX U](#programming-environments--vex-u)
- [Cross-program design tools](#design-tools)

---

## Programming environments — FLL Challenge

### LEGO SPIKE App

- **URL:** https://education.lego.com/en-us/downloads/spike-app/
- **Authority:** official
- **Audience:** coaches, teachers, families
- **Level:** all
- **Tags:** fll, spike-prime, official, programming, block-based, python
- **Use when:** You are programming a Founders Edition SPIKE Prime FLL Challenge robot — the official tool, required for competition through the 2027/28 season.

Official LEGO Education programming environment for SPIKE Prime. Block-based for beginners; Python (MicroPython) for more advanced teams. Runs on Windows, Mac, iPad, and Chromebook. The authoritative tool for current FLL Challenge programming.

### Pybricks (independent SPIKE firmware)

- **URL:** https://pybricks.com
- **Authority:** independent
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** fll, spike-prime, python, alternative-firmware, free
- **Use when:** A team wants more capable Python on SPIKE Prime — multitasking, faster iteration, real Python (not MicroPython) — and is comfortable replacing the official firmware.

Open-source alternative firmware for LEGO SPIKE Prime, Mindstorms EV3, and BOOST. Replaces official firmware to enable more capable Python. Widely adopted by advanced FLL teams. Switching firmware is reversible, but may not be permitted in some regional events — check with your regional partner before competition day.

### FLL Challenge (Future Edition) — 2026/27 onward

The Future Edition launches in the 2026/27 season on the new LEGO Education Computer Science & AI hardware platform, with a new programming environment to match. We will add entries once FIRST and LEGO Education publish public-facing materials. For current scope and timeline, see the [Future Edition transition entry](/resources/fll-resource-map/#future-edition-transition-202627-onward) in the resource map.

---

## Programming environments — FTC

FTC teams write code in Java (most common) or Kotlin using the FTC SDK on a REV Control Hub or older Android phone. Three entry points exist, each suited to a different skill level.

### FTC Blocks

- **URL:** https://ftc-docs.firstinspires.org/en/latest/programming_resources/blocks/Blocks-Tutorial.html
- **Authority:** official
- **Audience:** coaches, teens, families
- **Level:** beginner
- **Tags:** ftc, blocks, visual-programming, official
- **Use when:** Your rookie FTC team needs to get a robot moving quickly without learning full Java syntax first.

Visual, block-based programming environment that generates Java code behind the scenes. Built into the FTC SDK and accessible from a browser pointed at the Control Hub. Good starting point for first-year teams; you can switch to text-based programming at any time.

### OnBot Java

- **URL:** https://ftc-docs.firstinspires.org/en/latest/programming_resources/onbot_java/OnBot-Java-Tutorial.html
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** beginner, intermediate
- **Tags:** ftc, java, official, onbot
- **Use when:** A team wants to write real Java without installing Android Studio — everything runs in a browser pointed at the Control Hub.

Browser-based Java editor built into the FTC SDK. No installation required. Compiles and deploys directly to the Control Hub over Wi-Fi. Lower barrier to entry than Android Studio; less powerful (no full IDE features), but sufficient for most FTC seasons.

### Android Studio (FTC)

- **URL:** https://developer.android.com/studio
- **Authority:** independent (Google tool, used by FTC officially)
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** ftc, java, kotlin, android-studio, ide
- **Use when:** Your team wants full IDE support — autocomplete, refactoring, unit tests, git integration — for more complex FTC code.

Full Android development environment. The FTC SDK is a standard Android project, so Android Studio gives you the complete Java/Kotlin toolchain. Requires installation and some setup, but is the standard for serious FTC programming. FTC-Docs has a detailed setup guide.

### FTC SDK on GitHub

- **URL:** https://github.com/FIRST-Tech-Challenge/FtcRobotController
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** ftc, sdk, java, github, open-source
- **Use when:** You want the latest FTC SDK releases, example op-modes, and documentation for hardware map setup.

The official FTC robot controller repository. Fork it to start a new FTC project. Contains sample op-modes (TeleOp and Autonomous), hardware class reference, and release notes for each SDK update.

---

## Programming environments — FRC

FRC teams program a National Instruments roboRIO using the WPILib framework. Java and C++ are the dominant languages; LabVIEW is also supported but uncommon in new teams.

### WPILib Suite

- **URL:** https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html
- **Authority:** official (FIRST + Worcester Polytechnic Institute)
- **Audience:** teens, coaches
- **Level:** beginner, intermediate, advanced
- **Tags:** frc, wpilib, java, cpp, labview, official, ide
- **Use when:** Setting up an FRC programming environment — this is the required starting point for all new FRC teams.

The WPILib installer sets up VS Code with the WPILib extension, roboRIO toolchains (Java, C++), Shuffleboard, Glass, and simulation tools in one bundle. Java is recommended for most rookie teams. The official WPILib docs at docs.wpilib.org are comprehensive and actively maintained.

### WPILib Docs

- **URL:** https://docs.wpilib.org/en/stable/
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** all
- **Tags:** frc, wpilib, documentation, official
- **Use when:** Looking up any FRC programming concept — motor control, PID, command-based architecture, Shuffleboard, simulation, CAN wiring.

The canonical reference for FRC programming. Covers everything from zero-to-robot setup to advanced command-based patterns and simulation. Updated every season.

### FRC Driver Station

- **URL:** https://docs.wpilib.org/en/stable/docs/software/driverstation/driver-station.html
- **Authority:** official
- **Audience:** coaches, teens
- **Level:** beginner
- **Tags:** frc, driver-station, official, match-control
- **Use when:** Connecting a driver laptop to the robot during practice or competition to enable/disable and monitor robot state.

Windows-only application that is the required match controller for FRC competitions. Runs on the driver station laptop at the field. Handles communication, enable/disable, DS log recording, and joystick input.

### PathPlanner

- **URL:** https://pathplanner.dev
- **Authority:** independent
- **Audience:** teens
- **Level:** intermediate, advanced
- **Tags:** frc, autonomous, path-planning, open-source, free
- **Use when:** Designing complex, curve-following autonomous paths for an FRC swerve or tank drive robot — the most widely adopted community path-planner.

Open-source GUI path planner and command-based path-following library for FRC. Drag-and-drop path editing, event markers, and WPILib integration. Works with any drivetrain (tank, swerve, mecanum). Used by the majority of competitive FRC teams.

---

## Programming environments — VEX IQ

### VEXcode IQ

- **URL:** https://www.vexrobotics.com/iq/products/coding
- **Authority:** official
- **Audience:** coaches, teachers, families, kids
- **Level:** beginner, intermediate
- **Tags:** vex, iq, official, programming, block-based, python
- **Use when:** Your team is in VEX IQ — this is the official, supported tool for competition.

Official VEX programming environment for VEX IQ. Available as blocks (drag-and-drop) or Python. Browser-based (VEXcode IQ Web) or desktop install. Block mode is good for ages 8–12; Python mode introduces real scripting concepts for more advanced students.

---

## Programming environments — VEX V5 / VRC

### VEXcode Pro V5

- **URL:** https://www.vexrobotics.com/v5/products/coding
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** vex, v5, vrc, official, programming, cpp, python
- **Use when:** Your VRC team wants the official VEX V5 coding environment with block, Python, and C++ support.

Official VEX programming environment for VEX V5 / VRC. Supports blocks, Python, and C++. Desktop app with built-in terminal and downloader. Good starting point for V5 teams; VEXcode C++ shares syntax with the Competition template required for VRC matches.

### PROS (Purdue Robotics OS)

- **URL:** https://pros.cs.purdue.edu
- **Authority:** independent
- **Audience:** teens, coaches
- **Level:** advanced
- **Tags:** vex, v5, vrc, cpp, alternative, free, open-source, pros
- **Use when:** A V5 or VRC team wants real C++ with full scheduler control, better toolchain integration, and access to community libraries like OkapiLib and LemLib.

Open-source C++ framework for VEX V5 from Purdue University. Uses a VS Code extension (pros-vsc) or CLI. Exposes the full V5 RTOS, allowing multitasking, mutex/semaphore patterns, and a proper build system. Used by many top-tier VRC teams. Steeper learning curve than VEXcode Pro V5, but significantly more powerful.

### OkapiLib

- **URL:** https://okapilib.github.io/OkapiLib/
- **Authority:** independent
- **Audience:** teens
- **Level:** advanced
- **Tags:** vex, v5, pros, odometry, pid, open-source, free
- **Use when:** A PROS-based V5 team wants motion control abstractions — chassis controllers, PID, odometry — without writing everything from scratch.

PROS add-on library providing higher-level motion control: ChassisController for tank/x-drive/mecanum, built-in PID tuning, odometry. Works on top of the PROS kernel. Most useful for teams that understand C++ but want to skip the boilerplate motion-control math.

### LemLib

- **URL:** https://lemlib.readthedocs.io/en/stable/
- **Authority:** independent
- **Audience:** teens
- **Level:** advanced
- **Tags:** vex, v5, pros, autonomous, odometry, open-source, free
- **Use when:** A PROS-based V5 team wants modern, actively maintained odometry and path-following for autonomous routines.

Community-maintained PROS library focused on odometry, Boomerang controller, and autonomous path following. Actively developed and widely used in the VRC community. Good alternative to OkapiLib for newer teams starting with PROS.

---

## Programming environments — VEX U

VEX U uses the same V5 hardware and software stack as VRC, so all VEX V5 / VRC tools above apply. PROS is particularly common at the university level.

### VEX Python API

- **URL:** https://api.vex.com/v5/home/python/index.html
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** intermediate
- **Tags:** vex, v5, vrc, vex-u, python, official
- **Use when:** A V5 / VRC / VEX U team prefers Python over C++ for autonomous and driver control code.

Official Python API for VEX V5. Wraps the same hardware abstractions as VEXcode C++ in a Python interface. Available in VEXcode Pro V5 and usable alongside PROS via the PROS Python template. A solid middle ground between the simplicity of blocks and the power of C++.

---

## Design tools

### Onshape (CAD)

- **URL:** https://www.onshape.com/en/education
- **Authority:** independent
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** cad, design, free-for-education
- **Use when:** A team wants to CAD robot parts, attachments, or field models before building. Free for students and educators.

Browser-based parametric CAD. Free education tier with verification. The most common CAD tool in FTC, FRC, and advanced VEX teams. FLL teams typically don't need CAD — pencil sketches usually suffice — but for any team iterating on 3D-printed parts or metal subassemblies, Onshape is the go-to.

### Autodesk Fusion 360 (CAD)

- **URL:** https://www.autodesk.com/education/edu-software/overview
- **Authority:** independent
- **Audience:** teens, coaches
- **Level:** intermediate, advanced
- **Tags:** cad, design, free-for-education
- **Use when:** A team (especially FRC) is already in the Autodesk ecosystem and wants integrated CAD + CAM for machined parts.

Parametric CAD/CAM tool, free for students and educators. Widely used in FRC where teams machine custom parts. Heavier to install than Onshape but offers integrated CAM toolpaths for mills and routers.

### Shuffleboard / Glass (FRC telemetry dashboards)

- **URL:** https://docs.wpilib.org/en/stable/docs/software/dashboards/shuffleboard/index.html
- **Authority:** official
- **Audience:** teens, coaches
- **Level:** beginner, intermediate
- **Tags:** frc, telemetry, dashboard, wpilib, official
- **Use when:** An FRC team wants to display robot state (motor outputs, sensor values, match timers) on the driver station laptop during practice or competition.

WPILib's driver dashboard tools. Shuffleboard is the primary dashboard for most teams — drag-and-drop widgets, tabs, and a "Competition" mode. Glass is a newer, lighter alternative better for tuning PID values live. Both ship with WPILib.

---

## Notebooks, presentations, and team workflow

These tools are not robotics-specific but appear in nearly every team's workflow:

- **Engineering notebook** — paper, Google Docs, or Notion all work. FTC and FRC judges evaluate the notebook; a consistent format from week 1 matters more than the tool.
- **Impact / Innovation Project presentations** — Google Slides, Canva, or Keynote.
- **Code versioning** — GitHub (or any git host). Strongly recommended for FTC, FRC, and VEX V5 / VRC teams with multiple programmers.
- **Match timer** — any phone timer; dedicated FLL / VEX coach timer apps are available in app stores.
- **Scouting (FRC/FTC)** — team-built spreadsheets, QR-based forms, or open-source scouting apps shared on GitHub by veteran teams.

---

## Suggest an addition

This page is community-maintained. If your team relies on a tool we have missed, open a pull request adding it with the same metadata pattern. Keep entries focused on program-specific or hardware-adjacent tooling — generic productivity software is welcome only in the workflow section above.
