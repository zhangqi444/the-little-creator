---
title: VEX IQ Tournament Guide — VIQRC In Depth
description: A detailed guide to competing in a VEX IQ Robotics Competition (VIQRC) event — match structure, Driving Skills vs Autonomous Coding Skills, pit setup, judging categories, and how to help younger students thrive on tournament day.
tags: [vex-iq, viqrc, tournament, competition, skills-challenge, judging, coaches, parents, kids]
audience: [families, parents, coaches, kids]
level: beginner
season: evergreen
---

You've already read [Your First VEX Tournament](/guides/first-vex-tournament/) for the emotional and structural overview. This guide goes deeper — specifically on VEX IQ (VIQRC). The robot is smaller, the students are younger (ages 8–14), and the competition has some important differences from V5RC and VEX U that are easy to miss if you come in expecting a typical high-school tournament.

## What VIQRC is (and how it differs from V5RC)

VIQRC is the youngest VEX program. Key differences that affect your tournament day:

| Feature | VEX IQ (VIQRC) | VEX V5 (V5RC) |
|---|---|---|
| Robot size box | 11" × 19" × 15" | 18" × 18" × 18" |
| Team composition | 2–6 students per team | 2–15 students per team |
| Match format | **Collaborative** — both teams on the same alliance score *together* | **Competitive** — alliances compete against each other |
| Alliances | 2 teams per alliance | 2 teams per alliance |
| Skills formats | Driver Skills + Autonomous Coding Skills | Driver Skills + Autonomous Coding Skills |
| Judging awards | Excellence, Design, Build, Think, Sportsmanship | Same set with program-specific naming |
| Age range | 8–14 | 11–18+ (middle and high school) |

The **collaborative alliance format** is the biggest structural difference. In VIQRC, both robots on the same alliance run on the field **simultaneously** during the 60-second Teamwork Challenge match — and the two teams score **together**. You aren't playing against your alliance partner. You're cooperating with them to get as many points as possible. This can surprise coaches and families who expect an adversarial match format.

## Tournament format at a glance

A standard VIQRC qualifier follows this pattern:

| Block | What happens |
|---|---|
| Check-in & pit setup | Sign in, find your pit, assemble and power-check the robot |
| Robot inspection | Inspector checks size, parts, and brain connectivity |
| Driver's meeting | Head referee explains the rules and asks questions |
| Qualification rounds | 4–6 Teamwork Challenge matches (varies by event size) |
| Skills Challenge | Each team gets 3 Driver Skills + 3 Autonomous Coding Skills attempts |
| Alliance selection | Top-ranked teams choose partners for elimination |
| Elimination matches | Bracket until Tournament Champions crowned |
| Awards ceremony | Excellence, Design, Build, Think, Sportsmanship, Champion, Skills |

Skills Challenge runs **throughout the day** in parallel with qualification matches. You'll need to manage both schedules; don't miss a Skills slot because you were focused only on the alliance match board.

## The Teamwork Challenge match

Each Teamwork Challenge match is **60 seconds** and runs like this:

1. Both robots start in their respective starting positions on the field.
2. The field control system signals **Autonomous** — a fixed number of seconds (typically 5–15 seconds depending on the season game) where the robots run programmed routines **without driver input**.
3. After Autonomous ends, **Driver Control** begins. Both drivers control their robots simultaneously for the remainder of the match.
4. At the buzzer, scoring objects are counted in real-time and both teams receive the same alliance score.

### Alliance score, not individual score

Your match ranking is based on your **average alliance score** across qualification rounds — not how much *your* robot individually scored. This means:

- Cooperating with your alliance partner beats hoarding scoring objects.
- Communication before the match ("you take the left side, we take the right") matters.
- If your partner has a consistent autonomous and you don't, let them run it and stay out of the way.

### Autonomous period strategy

For most VIQRC seasons, a good autonomous routine is worth significant points on its own and sets up field elements for Driver Control. Prioritise:

1. **Reliability over complexity.** A simple autonomous that scores consistently beats a flashy one that works 60% of the time.
2. **Don't interfere with your alliance partner.** Coordinate start positions and paths before the match — two robots colliding in autonomous hurts both teams.
3. **Gyro correction helps.** A straight-driving autonomous built on gyro heading correction will outperform dead-reckoning across multiple matches. See [VEX IQ Programming Guide](/guides/vex-iq-programming/) for VEXcode implementation.

## The Skills Challenge — VEX IQ edition

Skills Challenge runs on a **separate field** (or shared field during break periods) all day. Your robot runs alone — no alliance partner.

Two distinct formats:

### Driver Skills

- **60 seconds**, one driver
- Goal: score as much as possible without autonomous
- Driver can re-place game elements if they fall *only if the head referee approves in advance*
- Your best score from all attempts counts

**Strategy:** Run back-to-back practice attempts to find your consistent ceiling. Focus on reliable scoring zones rather than chasing bonus elements that cost too many seconds.

### Autonomous Coding Skills

- **60 seconds**, fully autonomous — no driver input
- Same field setup as Driver Skills
- Robot must start from the starting position and complete all scoring under program control
- Your best score from all attempts counts

**Strategy:**

1. Start simple: reliably score the highest-value elements first.
2. Add elements only when the current routine is consistent (>80% success rate in practice).
3. Use the inertial sensor (gyroscope) for heading correction throughout — it comes built into the VEX IQ Brain.
4. Program a consistent **starting position check** so the robot always begins from the exact same spot.

### Combined Skills rank

Your **Robot Skills rank** = best Driver Skills score + best Autonomous Coding Skills score. Skills rank has its own award (Robot Skills Champion) and is often the **primary pathway to state championships and VEX Worlds qualification** independent of Teamwork match results. Take Skills seriously — it can advance your team even if alliance match results are average.

## Inspection — what IQ inspectors check

VIQRC inspection is specific to the IQ platform:

| Check | What to expect |
|---|---|
| Size | Robot fits in the 11" × 19" × 15" sizing box **with all attachments retracted** |
| Parts legality | All components must be from the current VEX IQ parts system (no V5 parts, no custom 3D-printed structural parts beyond what the rulebook allows) |
| Motor count | Typically capped at a set number per the season's game manual |
| Brain software | VEX IQ Brain firmware is up to date |
| Connectivity | Robot connects successfully to a field control system (FC) during check |
| Licence plates | Team number visible on three sides |

:::caution[3D-printed parts]
VIQRC rules on 3D-printed parts are stricter than V5RC. Check the current Game Manual — in most seasons, non-functional decorative parts are allowed but structural 3D-printed parts are not. Inspectors are thorough on this.
:::

**Practical tips:**

- Test your robot in the sizing box at home before the event. Attachments that just barely fit in your living room may not fit in the box after you added that last motor bracket.
- Update Brain firmware *before tournament day* — this requires a Wi-Fi connection and VEXcode and can take 10–15 minutes. Don't do it in the pit with a line of teams waiting behind you.
- Bring a small toolkit: Allen keys, a flat-head screwdriver, extra zip ties, and a bag of spare plastic pins and connectors. Robots shift in transport.

## Pit setup for VEX IQ teams

IQ pit spaces are smaller than V5 — typically an 8'×8' or shared table setup. Make the most of it:

**What to bring:**

- VEX IQ charger and at least **two fully charged batteries** (Skills runs deplete a battery fast; you want one on the robot and one charging)
- VEXcode-connected laptop or tablet for downloading programs
- USB cable (more reliable than Bluetooth for pit programming)
- Spare structural pins, connector pins, and screws
- Allen key set
- Small rubber mallet (for stubborn connector pins)
- Paper or whiteboard for match notes and Skills run debrief
- **Team sign or banner** — pit identity matters for judging visibility

**Pit culture at IQ events:**

IQ events typically have a warmer, more family-involved atmosphere than V5 or FRC. Families and siblings often work alongside the kids in the pit. Judges walk around during the day and will stop to ask your team about their robot — make sure *the students* are doing the talking, not the parents or coaches.

## Judging at VIQRC events

VIQRC awards include a judging component. Judges visit pits throughout the day (often twice: once in the morning, once during qualification). There may also be a scheduled interview slot depending on the event format. Check the event agenda.

### What judges look for

Judges evaluate teams across all aspects of the program — not just robot performance:

**Excellence Award (top overall award)**
The team that demonstrates the highest performance across *all three pillars*:
1. Teamwork match performance (ranking/score)
2. Skills Challenge score
3. Design Award criteria (engineering process, notebook, pit interview)

Excellence is typically the Championship-level qualification award. Teams that win Excellence often also qualify via Teamwork or Skills separately — it's the recognition of all-around excellence.

**Design Award**
Focused on *engineering process*:
- Does the team have an engineering notebook documenting design decisions, iterations, and testing?
- Can students explain *why* they made design choices, not just *what* they built?
- Were multiple ideas considered and tested before the final design was chosen?

Judges want to hear iteration stories: "We tried X, it didn't work because Y, so we changed to Z." That narrative demonstrates engineering process far more than a polished final robot.

**Build Award**
Focused on *mechanical execution*:
- Is the robot built well? Clean cable management, tight connections, no obvious slop in the drivetrain.
- Does the team understand *how* it's built and could they rebuild a subsystem if needed?

**Think Award**
Focused on *autonomous programming*:
- How well does the team's Autonomous Coding Skills routine work?
- Can students explain their programming strategy, sensor usage, and how they debugged it?

**Sportsmanship Award**
Community nomination — often given to the team that best embodies Gracious Professionalism throughout the day. Judges and event volunteers watch for this; it's not purely based on the judging interview.

### Helping younger students prepare for judging

VIQRC students are often 8–12 years old — many younger than any other VEX program. Judging preparation for younger kids is different:

- **Practise explaining the robot before the event.** Have students walk through their robot to a family member who wasn't involved. If they can't explain it, they need more practice.
- **Assign roles.** "You introduce the team and explain Core Values. You walk through the drivetrain. You explain the autonomous."
- **Keep answers simple and honest.** Judges respond better to "we tried three designs and this one drove straightest" than to a rehearsed speech.
- **Teach them to say "I don't know."** It's fine. Judges understand these are kids. Trying to bluff technical details is obvious and hurts more than helping.
- **Bring the engineering notebook.** Keep it in the pit at all times during the event — judges will ask to look at it.

## Managing the schedule

The hardest thing at an IQ event is schedule management when you're responsible for young students who also want snacks, bathroom breaks, and to see their friends' robots.

**Recommended roles (adapt to your team size):**

| Role | Who |
|---|---|
| Match tracker | One adult or older student watching the schedule board and alerting the team 10 min before each match |
| Skills coordinator | One adult tracking Skills attempt slots and making sure a pair of students is ready |
| Pit crew | Students working on the robot between matches |
| Judge liaison | Coach prepared to alert students when a judge enters the pit |

**Build in buffer time.** A 10-minute buffer before every match call means a bathroom break doesn't become a missed match.

**Don't skip Skills for lunch.** Skills Challenge is too important to skip. Bring snacks to the pit if needed. Get your Skills attempts in before the end of the day.

## Common mistakes to avoid at your first IQ event

1. **Assuming the battery will last all day.** It won't. Change batteries between each match, or at minimum between every two matches. Keep one always charging.
2. **Parents taking over the pit interview.** When a judge walks up, coaches and parents step back. The kids should be doing all the talking.
3. **Missing Skills slots.** Skills Challenge has a sign-up sheet and schedule. Don't lose a slot because you didn't check. Put someone in charge of this specifically.
4. **Only focusing on Teamwork matches.** Skills is how many teams advance. A consistent autonomous alone can qualify a team for state.
5. **Not scouting alliance partners.** Before alliance selection, talk to other teams. Who has a strong autonomous? Who drives well on the right side of the field? Pick data-driven, not by who your student likes.
6. **Robot rebuild during lunch on a complex fix.** Only attempt major repairs if you have experience. A hasty fix that creates new problems is worse than a known limitation. Practise the judgment call at home first.

## After the event

Win or not, hold a brief team debrief within 24 hours — memories are fresh and students process better quickly.

**Questions to ask:**

- What was one thing our robot did really well?
- What was one thing we want to fix before the next event?
- What did we learn about autonomous programming today?
- How did we do with Gracious Professionalism?
- What would we do differently in pit management?

Record your best Skills scores so you have a baseline for the next event.

## Where to go next

- [VEX IQ Programming Guide](/guides/vex-iq-programming/) — block-based and Python programming, gyro correction
- [VEX Awards — What Each One Rewards](/guides/vex-awards/) — full breakdown of Excellence, Design, Build, Think, Skills awards
- [Your First VEX Tournament — What to Expect](/guides/first-vex-tournament/) — the overview of VEX tournament structure across all three programs
- [Tournament Day Checklist](/guides/tournament-day-checklist/) — general packing list (supplement with the IQ-specific items above)
- [VEX IQ Resource Map](/resources/vex-iq-resource-map/) — RobotEvents, VEX IQ Knowledge Base, VEX Forums
