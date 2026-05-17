---
title: Robot Maintenance Guide
description: How to keep your SPIKE Prime and VEX IQ hardware in good shape through a full season — cleaning, storage, troubleshooting, and end-of-season care.
tags: [fll, vex-iq, spike-prime, hardware, maintenance, coaches, parents]
audience: [coaches, parents, teens]
level: beginner
season: evergreen
---

Robotics hardware is surprisingly durable — but only if you treat it reasonably well. This guide covers the practical habits that keep SPIKE Prime and VEX IQ equipment working reliably from the first practice to the last tournament.

## General habits (both platforms)

### Handle the hub/brain with care

The SPIKE Prime hub and VEX IQ Brain are the most expensive single components. Both are reasonably robust but not drop-proof.

- Don't carry robots by the hub — support the frame
- When transporting to tournaments, put the robot in a padded box or case, not loose in a bag
- Don't stack heavy items on top of the hub
- Keep liquids away from the build area

### Clean connectors regularly

The most common cause of intermittent sensor or motor failures is dirty connectors. LEGO and VEX use different port types, but both benefit from occasional cleaning:

- Use a dry cotton swab or a can of compressed air to clear dust from ports
- If a motor or sensor behaves erratically, unplug and re-plug the cable firmly — loose connections cause most "mystery" failures
- For SPIKE Prime: the RJ11-style connectors on sensor/motor cables can accumulate gunk over a season; wipe the metal contacts gently with a dry cloth

### Check cable routing

Cables that get pinched in gears, bent sharply, or constantly flexed eventually fail. After each session:
- Look for cables that pass through rotating or moving parts and reroute them
- Avoid sharp bends at the connector end — this is where cables fail first
- Zip ties or LEGO Technic cable guides help keep cables out of mechanisms

### Store components properly

End of session: disconnect the hub/brain from power before storing. Store the robot somewhere:
- Away from direct sunlight (UV degrades plastic and rubber over months)
- At room temperature — not in a car or garage where it freezes or overheats
- Flat or supported, not balanced on an edge where it could fall

---

## SPIKE Prime-specific care

### Battery management

The SPIKE Prime hub uses a built-in rechargeable Li-ion battery (not removable on Gen 2).

- **Don't let it fully discharge repeatedly** — deep discharge shortens Li-ion battery life. Charge when it drops below ~20%.
- **Don't leave it on the charger indefinitely** — once fully charged, unplug it. Keeping it at 100% for days degrades capacity.
- **Charge before tournaments, not during** — a partially charged hub mid-practice is fine, but arrive at tournaments with a full charge.
- **If charging takes unusually long or the hub gets warm**, stop charging and check that the port isn't blocked and the cable is the correct type.

### Soft tire maintenance

SPIKE Prime's rubber tires pick up mat debris (carpet fuzz, crumbs, dust) that causes traction loss.

- Wipe tires with a slightly damp cloth before each run on the competition mat
- Remove embedded debris with a fingernail or flat-head screwdriver — don't cut or scrape the rubber
- Store tires off the ground when possible; prolonged compression on one spot can flatten them

### Axle and bushing checks

SPIKE Prime axles are cross-shaped and can develop slight bends from impact or repeated stress.

- Run your finger along each axle — even a small bend causes wobble and inconsistent movement
- Replace bent axles; they're inexpensive and the cause of many mysterious drift problems
- Check axle bushings (the small stoppers that hold axles in place): worn or missing bushings let axles slide, causing slop in mechanisms

### LEGO element care

- Avoid forcing connections that don't snap in cleanly — something is misaligned, and forcing it stresses the plastic
- Stud-and-tube LEGO connections wear out after many cycles. If a connection feels loose that used to be tight, replace those specific bricks.
- Keep small pieces (pins, axles, connectors) in sorted containers — losing them during a tournament is avoidable

---

## VEX IQ-specific care

### Smart motor care

VEX IQ smart motors are generally robust but can overheat if stalled repeatedly.

- If a motor feels hot after a run, let it cool before running again — 2–3 minutes
- Motor stall (trying to move against too much resistance) generates heat and can cause thermal shutoff. If your robot stalls frequently, the mechanism needs a gear reduction or redesign, not a new motor.
- Check that motor shafts rotate freely when disconnected from the mechanism — resistance indicates bearing wear

### Snap connector inspection

VEX IQ uses a pin-based building system. Connectors (especially 2-post and corner pieces) can crack from repeated stress.

- Inspect structural pieces at joints that bear load — cracks are usually visible
- Cracked connectors cause the robot to flex or collapse under load; replace them
- The most commonly broken pieces are the ones at drivetrain mounting points and anywhere a mechanism pivots

### Brain and battery

VEX IQ Gen 2 uses an integrated rechargeable battery similar to SPIKE Prime.
VEX IQ Gen 1 uses a removable battery pack.

For Gen 1: keep a spare battery pack charged. At tournaments, swap to the fresh pack between matches if the robot runs multiple times in quick succession.

For both: same advice as SPIKE Prime — don't deep discharge, don't leave on charger indefinitely, arrive at tournaments with full charge.

### Metal shaft care

VEX IQ shafts (axles) are metal and more durable than LEGO axles, but:
- Check for bends after hard impacts
- Keep shaft collars (the small metal rings that lock shaft position) snug — loose collars let mechanisms shift
- Use shaft collars on both sides of a gear or wheel to prevent lateral movement

---

## Troubleshooting common problems

| Symptom | Likely cause | Fix |
|---|---|---|
| Motor doesn't respond | Loose cable connection | Unplug and re-seat the cable firmly |
| Motor runs in wrong direction | Port direction setting in code | Reverse the direction flag in your program |
| Sensor reads inconsistent values | Dirty or damaged cable | Clean connector contacts; try a different cable |
| Robot drifts even with gyro correction | Bent axle or uneven tire wear | Check axles; clean or replace tires |
| Hub/Brain won't turn on | Battery depleted | Charge for 30+ minutes before testing |
| Hub/Brain won't charge | Dirty charging port | Clear port with compressed air; check cable |
| Program uploads fail via Bluetooth | Interference or distance | Switch to USB connection |
| Attachment motor stalls mid-run | Mechanism binding or too much load | Check for interference in the mechanism; reduce speed |
| Intermittent connection dropout | Cable bent or crimped | Reroute cable to remove sharp bends |

---

## End-of-season checklist

At the end of the competition season, before storing for the summer:

- [ ] Charge the hub/brain to ~50% (not full — storing at 100% degrades Li-ion batteries)
- [ ] Clean all tires and wheels
- [ ] Inspect and replace any cracked or bent structural pieces
- [ ] Coil cables loosely and store without tight bends
- [ ] Sort small parts (pins, axles, bushings) into labelled containers
- [ ] Photograph your final robot build — useful reference for next season
- [ ] Back up all programs from the hub to your laptop
- [ ] Store in a dry, room-temperature location away from sunlight

---

## When to replace vs. repair

**Replace:**
- Bent SPIKE Prime axles (inexpensive; bent axles cause drift that's hard to correct in software)
- Cracked VEX IQ structural pieces at load-bearing joints
- Cables with visible damage to the jacket or connector
- Tires that have flat spots or significant chunks missing

**Repair / adjust:**
- Loose axle bushings (reposition, don't replace unless worn)
- Loose shaft collars (tighten the set screw)
- Slightly misaligned mechanisms (adjust build geometry)
- Inconsistent sensor readings (clean connector first before replacing sensor)

**Don't bother:**
- Replacing a motor because it's "slow" — if it spins freely and runs a program, it's fine; slow runs are usually a gear ratio or friction issue
- Buying new batteries for hub/brain performance issues — charge the existing ones fully first; performance issues rarely come from battery health in the first 2–3 seasons

## Where to go next

- [Drivetrain Basics](/guides/drivetrain-basics/) — preventing mechanical problems in the first place
- [Robot Programming Basics](/guides/robot-programming-basics/) — software issues that look like hardware problems
- [FLL Equipment Guide](/guides/equipment-guide/) — what hardware you have and where to get replacements
