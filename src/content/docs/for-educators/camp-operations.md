---
title: Camp Operations Guide
description: Practical logistics for running a multi-day robotics camp — registration, waivers, hardware management, staffing, safety, budget, and day-of operations for all six programs.
tags: [educators, camp, summer-camp, logistics, operations, fll, ftc, frc, vex-iq, vex-v5, vex-u, all-programs]
audience: [teachers, coaches]
level: all
season: evergreen
---

The [Camp Curriculum](/for-educators/camp-curriculum/) and [Workshop Formats](/for-educators/workshop-formats/) guides tell you *what to teach*. This guide covers everything else: how to register participants, handle waivers, manage hardware, staff your sessions, keep students safe, and stay in budget.

Use this whether you are running a school-hosted camp, a community-centre program, a library STEM week, or an independent for-pay camp.

---

## Before you open registration

### Decide your model

| Question | Options | Notes |
|---|---|---|
| **Host organisation** | School, library, community centre, robotics team, independent | Determines insurance, venue, invoicing |
| **Paid vs. free** | Free (grant-funded), sliding scale, fixed fee | Free/grant models require early donor/admin buy-in |
| **Size** | 6–12, 12–18, 18–24 students | Below 6 is usually not worth setup cost; above 24 needs extra facilitators and hardware |
| **Age range** | Single year, 2–3 year band, multi-age | Narrower age bands are easier to programme; multi-age is more realistic for small programs |
| **Bring-your-own device** | Yes / No | Yes reduces cost but requires pre-camp software checks |
| **Program focus** | Single program, or mix-and-match intro | Single program = deeper; multi-program = broader; mixing within one camp is hard to execute well |

### Budget template (per-camp)

Build your budget before registration opens so you know what to charge (or how much grant funding to seek).

| Line item | FLL 3-day | FTC 4-day | FRC 5-day | VEX IQ 3-day | VEX V5 4-day | Notes |
|---|---|---|---|---|---|---|
| Hardware (amortised) | ~$0–200 | ~$0–300 | ~$0–400 | ~$0–150 | ~$0–300 | Zero if team owns kits |
| Consumables (tape, batteries, printed mats) | $20–40 | $30–60 | $40–80 | $20–40 | $30–60 | |
| Snacks / lunch (if provided) | $8–15/student/day | Same | Same | Same | Same | Often the largest variable |
| Facilitator pay (if paid) | Variable | Variable | Variable | Variable | Variable | Volunteer or stipend |
| T-shirts / name tags (optional) | $8–15/student | Same | Same | Same | Same | |
| Printing (handouts, certificates) | $5–15 total | Same | Same | Same | Same | |
| Venue (if not donated) | $0–$200/day | Same | Same | Same | Same | |
| Insurance rider | $0–$100 | Same | Same | Same | Same | School/org often covers this |

**Typical all-in cost per student (excluding facilitator pay):** $30–$80 for 3-day camps; $60–$150 for 5-day FRC camps. Charge at or above cost for paid programs; seek grants to offset for free programs.

---

## Registration

### What to collect

At minimum:

- Full name and preferred name
- Age / date of birth (age-group placement, liability)
- Parent / guardian name and emergency contact phone
- Allergies and medical notes (share with facilitators; store securely)
- Signed participation waiver (see below)
- T-shirt size (if providing)
- Prior experience level (helps with grouping)

Optional but useful:

- School / grade (helps with pairs/trios grouping)
- Programming language preference (FTC/FRC/VEX V5 only)
- How they heard about the camp (marketing feedback)

### Registration platforms

- **Google Forms + Sheets** — free, works fine for fewer than 30 students, manual payment handling
- **Eventbrite** — built-in ticketing, takes a small fee per paid ticket
- **Jotform** — good waiver support, integrates with PayPal/Stripe
- **School SIS** — if school-hosted, check if your SIS has an event registration module
- **Paper sign-up + check** — totally fine for small community programs; just scan and store the forms

Close registration 7 days before camp starts. This gives you time to send pre-camp emails, verify device setups, and confirm headcount for snacks and kits.

---

## Waivers and paperwork

Every camp needs a signed waiver before the student participates. Check with your host organisation — they may have a standard form. If not, your waiver should cover:

1. **Participation and inherent risk** — building, handling tools, operating robots
2. **Photo / video release** — separate checkbox; some families will decline
3. **Medical information acknowledgement** — confirms the family has disclosed relevant conditions
4. **Emergency contact authorisation** — confirms who can be reached and authorises first aid

**Keep waivers:** Paper: locked cabinet. Digital: access-controlled folder. Retain for the duration of any applicable statute of limitations (check your jurisdiction — often 3 years for minor activities).

**Minors:** Parent or legal guardian must sign for participants under 18. Collect before the first session, not during check-in chaos.

---

## Hardware management

### Pre-camp inventory

Run a full hardware inventory 1 week before camp:

- Power on every hub / controller / V5 Brain. Confirm firmware is current.
- Verify every motor, sensor, and cable. Flag damaged pieces for replacement.
- Charge every battery and rechargeable hub. Label batteries by kit number.
- Print an inventory sheet: kit number, components, condition.

### Kit numbering and accountability

Label every kit with a permanent number (masking tape + marker, or label maker). Assign a kit to a team on Day 1. At the end of each day:

1. Students return all pieces to the tray.
2. Facilitator spot-checks: hub present, motors present, power cable present.
3. Check off the inventory sheet.

This catches missing parts before they disappear between sessions.

### Laptop / device setup

For programs requiring a laptop (all of them):

| Program | Software to pre-install | Notes |
|---|---|---|
| FLL (SPIKE Prime) | SPIKE App 3.x, Bluetooth driver | Bluetooth pairing can be slow; pre-pair if possible |
| FTC | REV Hardware Client, Android Studio or Chrome (OnBot Java) | Android Studio install is large; plan download time |
| FRC | WPILib Suite (annual installer), Git | WPILib installer is 1–2 GB; run before camp |
| VEX IQ | VEXcode IQ app | Lightweight; USB connection |
| VEX V5 | VEXcode Pro V5 | USB or Bluetooth; pre-install on all machines |
| VEX U | PROS IDE and toolchain | Larger install; verify all dependencies |

If students bring their own devices (BYOD), email setup instructions 5 days before camp. Schedule a 30-minute pre-camp drop-in (e.g., the afternoon before Day 1) for students who had trouble with installation.

### Consumables checklist

| Item | Quantity | Notes |
|---|---|---|
| AA batteries (for SPIKE Prime remotes, VEX IQ controllers) | 12–24 | Keep spares |
| USB-A cables (SPIKE Prime, VEX IQ) | 1 per kit + 2 spares | |
| USB-C cables (V5 Brain, FTC hubs) | 1 per kit + 2 spares | |
| Masking tape (floor markings, labels) | 2 rolls | |
| Coloured tape (mission mat boundaries) | 1 roll per colour needed | FLL mats need specific colours |
| Printed mission mat or field tiles | 1 per pair/trio | FLL mats print on large-format; tiles for VEX/FRC require ordering |
| Extension cords / power strips | 1 per table | Charge hubs at every break |
| Sharpies / pens | 10+ | Kit labelling, notebooks |
| Notebook paper or composition books | 1 per student | Engineering notebook habit starts Day 1 |

---

## Staffing

### Ratios

| Camp type | Minimum ratio | Recommended |
|---|---|---|
| FLL / VEX IQ (ages 8–14) | 1:12 | 1:8 |
| FTC / VEX V5 (ages 12–18) | 1:14 | 1:10 |
| FRC / VEX U (ages 14+) | 1:16 | 1:12 |

Always have at least **two adults** present. This is a safeguarding requirement, not just a logistics preference.

### Roles

**Lead Facilitator** — owns the curriculum, delivers instruction, manages the room. Needs solid technical knowledge of the program.

**Co-Facilitator / TA** — circulates while lead delivers instruction, helps stuck pairs, manages hardware issues. Can be an experienced student (FRC/VEX V5 teams often use older students here).

**Camp Coordinator (optional at smaller camps)** — handles check-in/out, snacks, waiver collection, parent communication, admin tasks. Lets facilitators focus on students.

### Volunteer management

If using volunteers (common for school/community camps):

- Brief all volunteers the day before: goals, norms, how to help without doing it for the student
- Assign specific roles, not "just circulate"
- Provide a one-page quick reference on the program (what is the robot trying to do today?)
- Have volunteers attend the pre-camp hardware setup so they know the kits

---

## Safety

### General rules to communicate on Day 1

1. **No horseplay with hardware.** Robots and motors can pinch fingers.
2. **Cables stay tidy.** Tripping on a cable can damage hardware and students.
3. **Battery safety.** Do not charge unattended; report swollen batteries immediately; no liquid near charging stations.
4. **Ask before plugging in.** FRC and VEX V5 have higher-voltage systems; students should confirm with a facilitator before powering a new connection.
5. **Respect the field/mat.** Especially for FLL mats and VEX tiles — they are expensive to replace.
6. **One person drives at a time.** Prevents controller conflict and reduces dropped robots.

### Program-specific hazards

| Program | Hazard | Mitigation |
|---|---|---|
| FRC | Metal sharp edges, pneumatics, high-torque motors | Long pants recommended; facilitator checks pneumatics |
| VEX V5 / VRC | Pinch points in metal linkages, 5.5 W motors | Demonstrate pinch-point awareness before build |
| FTC | Rotating claw/arm mechanisms at eye level | Keep faces away from robot while powered |
| VEX IQ | Generally low-risk plastic; motors are low-torque | Standard supervision is sufficient |
| FLL (SPIKE Prime) | Low-risk; motor ports can get warm | Remind students not to block ventilation holes |
| VEX U | Same as VEX V5 but larger motors; scissor lifts | Full safety briefing on Day 1; lifts require facilitator check |

### Medical and allergy protocols

- Know where the first aid kit is before students arrive.
- Know if any student has a severe allergy (EpiPen location, trigger awareness).
- Know the local emergency services number.
- Have a designated quiet space for students who are overwhelmed — sensory overload is common in louder build sessions.
- For camps serving students with disabilities, review [Accessibility in Robotics](/guides/accessibility-in-robotics/) before camp.

---

## Day-of operations

### Check-in

- Confirm waiver on file before admitting student to the room.
- Assign name tag. Name tags are non-negotiable for multi-adult environments — facilitators use them constantly.
- Hand out the day's agenda (one page, printed or projected).
- Direct students to their table / team. Pre-assigned seating reduces "who do I sit with?" anxiety, especially on Day 1.

### Session flow

Structure every session with the same rhythm so students know what to expect:

| Phase | Duration | What happens |
|---|---|---|
| **Arrival buffer** | 5–10 min | Students settle, find their kit, chat; facilitator checks in with any student who struggled yesterday |
| **Day brief** | 5 min | What are we building or doing today? What does "done" look like? |
| **Instruction** | 10–20 min | Concept delivery: short, targeted, stops at "now try it" |
| **Build / code block** | 60–90 min | Core work time; facilitator circulates; minimal interruptions |
| **Break** | 10–15 min | Outside if possible; batteries charge |
| **Second work block** | 30–60 min | Iteration or new challenge introduced |
| **Notebook time** | 10 min | Every student writes: what did I do, what did not work, what do I want to try tomorrow |
| **Wrap-up** | 5 min | Preview tomorrow; pack kit; check-out process |

### Check-out

- Confirm pick-up: check against authorised guardian list on the waiver.
- Never release a minor to an unverified adult, even if the child says "that's my parent."
- If a student is not picked up within 15 minutes of end time: follow your host organisation's late-pickup policy (typically: call guardian; if no contact within 30 minutes, follow escalation protocol).

### Managing behaviour

- **Set norms on Day 1.** Five words or fewer: "We help, we do not do." "Mistakes are data." "One driver at a time."
- **Redirect before correcting.** "I notice your robot keeps veering left — what have you tried?" beats "You are doing it wrong."
- **Separate hardware conflicts quickly.** Two students wanting to drive at once: use a timer, two-minute rotations.
- **Document incidents.** Any significant behavioural issue, injury, or near-miss gets a brief written note (who, what, when). This protects you and helps if a parent questions something later.

---

## Communication with families

### Before camp (send 5 days out)

- Confirmation email: dates, times, drop-off/pick-up location, what to wear (closed-toe shoes, comfortable clothes), what to bring (water bottle, device if BYOD)
- Software setup instructions (if BYOD)
- What to expect: brief description of the program, what students will build, how the showcase works

### During camp (daily, brief)

A 2–3 sentence end-of-day update keeps families engaged without requiring much effort:

> "Day 2 complete! Teams got their robots navigating with the colour sensor and made their first mission attempts. Tomorrow is the final showcase — see you at 3:30 PM."

Text or email via your registration platform. Brief is better; families do not need a full debrief.

### After camp

- **Showcase / demo invitation** — invite families to the end-of-camp showcase. Even 15 minutes of student demonstration is worth the logistics.
- **Feedback survey** — 3–5 questions, anonymous option, sent within 24 hours of camp end. Ask: what worked, what could be better, would they register again.
- **Certificates** — simple printed certificates ("Completed FLL SPIKE Prime Camp, June 2026") are low-cost and meaningful for younger students.
- **Save the contact list for next camp** — with permission (check your registration terms), this is your primary marketing list for future sessions.

---

## Post-camp wrap-up

### Hardware debrief (same day as last session)

1. Full kit inventory — log any missing or damaged pieces.
2. Charge all batteries fully before storage.
3. Store kits in labelled bins; coil cables neatly (avoids connector damage).
4. Update your inventory sheet with current condition of each piece.

### Facilitator debrief (within 48 hours)

Run a 30-minute debrief with all facilitators:

- What content landed well? What needed more time?
- Any safety near-misses or behaviour issues to document?
- Hardware problems to address before the next camp?
- Changes to the schedule for next time?

Write 3–5 bullet points of notes and store them with the camp folder. Future-you will thank you.

### Financial close-out

- Reconcile all income (registrations, grants) and expenses.
- Save receipts.
- If your host organisation is tax-exempt, confirm grant reporting requirements.
- If you charged fees, issue receipts to families if requested (some families claim childcare or education tax credits).

---

## Quick-reference checklist

### 4 weeks before camp

- [ ] Finalise dates, venue, program, age range, and size
- [ ] Set budget; confirm grant or fee model
- [ ] Open registration; post to local community channels
- [ ] Order consumables and any missing hardware

### 1 week before camp

- [ ] Close registration; confirm headcount
- [ ] Run full hardware inventory and firmware update
- [ ] Send pre-camp email (logistics + software setup)
- [ ] Confirm all facilitators / volunteers; send briefing doc
- [ ] Pre-stage kits and charge all batteries

### Day before camp

- [ ] Set up room: tables, power strips, kit trays, printed agendas
- [ ] Confirm waivers received (follow up on any missing)
- [ ] BYOD drop-in (optional, 30 min) for software troubleshooting
- [ ] Print name tags and kit inventory sheets

### Day 1 morning (30 min early)

- [ ] Power on all hubs / controllers; confirm connections
- [ ] Confirm first aid kit is present and stocked
- [ ] Know all allergy / medical notes for students today
- [ ] Facilitator team brief: roles for today, any student notes to share

### End of each day

- [ ] Kit check-in: all pieces accounted for
- [ ] Battery charge started
- [ ] Send family update (2–3 sentences)
- [ ] Facilitator 5-minute sync: anything to adjust for tomorrow?

### After last session

- [ ] Full hardware inventory and storage
- [ ] Send showcase invitation or post-camp email
- [ ] Facilitator debrief
- [ ] Send feedback survey
- [ ] Financial close-out and receipt storage

---

## Related guides

- [Camp Curriculum](/for-educators/camp-curriculum/) — day-by-day session outlines for all six programs
- [Workshop Formats](/for-educators/workshop-formats/) — single-day event outlines
- [Lesson Plan Library](/for-educators/lesson-plan-library/) — ready-to-run individual session plans
- [Accessibility in Robotics](/guides/accessibility-in-robotics/) — adapting sessions for students with disabilities
- [Parent Volunteer Guide](/guides/parent-volunteer-guide/) — how parent helpers can contribute without overstepping
- [Grants and Sponsorship Guide](/guides/grants-and-sponsorship-guide/) — funding sources for free or subsidised camps
