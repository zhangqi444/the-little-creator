---
title: FLL Robot Troubleshooting — Common Problems and Fixes
description: Practical fixes for the most common FLL SPIKE Prime robot problems. Robot drifting, missing missions, attachments not working, inconsistent runs, and tournament-day failures.
tags: [fll, spike-prime, troubleshooting, debugging, robot, programming, hardware]
audience: [coaches, students, families]
level: beginner
season: evergreen
---

Something is wrong with the robot. Here's how to diagnose and fix the most common problems, including what to do when the clock is ticking at a tournament.

---

## Robot drifts when driving straight

**Symptoms:** The robot consistently veers left or right even though the code says to go straight.

**Most common causes and fixes:**

| Cause | Fix |
|---|---|
| Unequal motor wear or friction | Test each motor individually — if one is slower, replace it or compensate with velocity offset |
| Robot not balanced (weight offset to one side) | Redistribute battery, hub, or attachments; weight should be centered over the drive wheels |
| Wheel slipping | Check that both wheels are fully pressed onto motor shafts; tighten any loose axles |
| No gyro correction in code | Add gyro-corrected driving — see [gyro-straight.py](https://github.com/zhangqi444/the-little-creator/blob/main/skill/examples/fll/gyro-straight.py) |
| Gyro not reset before run | Call `motion_sensor.reset_yaw(0)` at the start of each mission function, not just once at startup |
| Different mat surface at tournament | The competition mat may have different friction than your practice surface — test on-site and adjust drive distances |

---

## Robot misses a mission by a few centimeters

**Symptoms:** Robot reaches the right area but can't complete the mission — attachment hits wrong spot, misses model by a small margin.

**Diagnosis:** Consistency problem vs. accuracy problem. Run the mission 5 times. If it misses the same way every time → accuracy problem (fix the code/attachment). If it misses randomly → consistency problem (hardware or surface).

**Fixes for accuracy:**
- Measure actual travel distances with a ruler on your mat, not estimates
- Use `motor.relative_position()` to check actual motor rotation vs. expected
- Add a small adjustment constant in code and tune it by running and measuring
- Recheck attachment mounting — even 1–2mm difference in attachment position matters

**Fixes for consistency:**
- Clean wheels and mat regularly — debris causes slip
- Add a wall-align or line-align step before the critical movement
- Use sensor-based stopping (`drive_until_color`, `drive_until_distance`) instead of time/degree-based where possible
- Check that wheels aren't touching the mat surface when the robot starts — lift slightly above mat if needed

---

## Attachment doesn't work reliably

**Symptoms:** The attachment motor overshoots, stalls, or doesn't engage the mission model correctly.

| Problem | Fix |
|---|---|
| Motor overshoots | Use `motor.run_for_degrees()` with `stop_action='brake'`; reduce speed |
| Motor stalls (robot is blocked) | Reduce attachment speed; check for mechanical binding |
| Attachment drops when motor stops | Use `stop_action='hold'` to keep motor engaged |
| Attachment works in practice, not at tournament | Re-test after the robot warms up — cold motors are slightly different |
| Attachment timing is off | Add a short `await runloop.sleep_ms(300)` after the drive move before the attachment fires |

---

## Robot runs fine in practice but fails at tournament

This is one of the most common and frustrating problems. Causes:

**1. Mat surface difference**
Tournament mats have different texture and may be on a different floor surface than your practice setup. Friction changes everything.
- Fix: always test on the tournament mat during pit time if allowed; scale distance constants by ±5% and test

**2. Lighting conditions**
Different venue lighting affects color sensor readings.
- Fix: run calibration tests on-site; adjust color thresholds if using sensor-based alignment

**3. Temperature and battery level**
Cold motors and a partially depleted battery both cause speed variations.
- Fix: warm up the robot with 2–3 practice runs before competition rounds; start each match with a charged battery

**4. Vibration from transport**
Robots can shift slightly during packing and unpacking. A loose axle or shifted attachment can cause unexpected behavior.
- Fix: inspect and rebuild any known weak points before each tournament; carry spare parts

**5. Nerves causing the team to skip steps**
Kids under pressure skip their pre-run checklist.
- Fix: have a written 5-step pre-run checklist; have one dedicated team member run it before every match

---

## Robot stops mid-run for no apparent reason

**Symptoms:** Robot starts, completes part of the run, then stops unexpectedly.

| Cause | Fix |
|---|---|
| Battery died mid-run | Always start matches with a fully charged battery; carry a spare |
| Program error / exception | Check SPIKE App for error messages; add try/except blocks in Python |
| Hub disconnected from battery | Check hub battery is firmly seated |
| Memory limit hit (large program) | Simplify code; split into separate programs if needed |
| Motor overheating (after many runs) | Allow 2–3 minutes between back-to-back runs; motors stall when hot |

---

## Color sensor not detecting correctly

**Symptoms:** `drive_until_color()` never triggers, or triggers on the wrong color.

- **Distance matters:** the sensor must be 1–3mm from the surface. Check mounting height.
- **Calibrate for your mat:** run `color_sensor.color(port)` in a test program and print what colors it actually sees on your specific mat. Tournament mats may differ slightly in print color.
- **Ambient light:** bright overhead lights can confuse the sensor. Test in similar lighting to the venue.
- **Use reflection instead of color:** `color_sensor.reflection()` (0–100%) is more reliable than `color_sensor.color()` for simple black/white detection.

---

## Hub buttons not responding

**Symptoms:** Button presses in the mission selector don't register or double-fire.

- Add debouncing: after a press is detected, loop until the button is released before continuing
- Add a short `await runloop.sleep_ms(100)` after each registered press
- See the debounce pattern in [mission-runner.py](https://github.com/zhangqi444/the-little-creator/blob/main/skill/examples/fll/mission-runner.py)

---

## Quick tournament-day fix checklist

When something goes wrong between rounds and you have 10 minutes:

1. **Identify the failure point** — which specific part of the run failed?
2. **Run it once more** — was it a one-time fluke or consistent?
3. **Check physical state first** — loose axle? shifted attachment? battery level?
4. **If physical is fine, check code** — any recent changes? revert if unsure
5. **Simplify if necessary** — it's better to score 150 reliably than attempt 300 and fail
6. **Don't panic-edit** — rapid code changes under pressure introduce new bugs. Make one change at a time.

---

## Related

- [Robot Programming Basics](/guides/robot-programming-basics/) — foundational programming patterns
- [Intermediate Python for FLL Robots](/guides/python-intermediate/) — gyro driving, mission selectors, debugging techniques
- [Practice Session Structure](/guides/practice-session-structure/) — how to build debugging into regular practice
- [Tournament Day Checklist](/guides/tournament-day-checklist/) — pre-tournament prep that prevents most failures
