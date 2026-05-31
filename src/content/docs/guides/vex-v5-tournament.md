---
title: VEX V5 Tournament Guide — V5RC In Depth
description: A detailed guide to competing in a VEX V5 Robotics Competition (V5RC) event — competitive alliance matches, Skills Challenge, scouting for alliance selection, pit strategy, engineering notebook in the pit interview, and how to thrive on tournament day.
tags: [vex-v5, v5rc, tournament, competition, alliance-selection, skills-challenge, judging, coaches, teens]
audience: [coaches, teens, parents]
level: intermediate
season: evergreen
---

You've already read [Your First VEX Tournament](/guides/first-vex-tournament/) for the structural and emotional overview. This guide goes deeper — specifically on VEX V5 Robotics Competition (V5RC). V5RC is the high-school VEX program (grades 8–12, ages 11–18), and it runs at a noticeably faster, more tactical pace than VEX IQ (VIQRC). Alliance selection is genuinely competitive, the pit interview is technically rigorous, and scouting matters.

## What V5RC is (and how it differs from VIQRC)

| Feature | VEX V5 (V5RC) | VEX IQ (VIQRC) |
|---|---|---|
| Robot sizing box | 18" × 18" × 18" (may expand during match per season rules) | 11" × 19" × 15" |
| Team size | 2–15 students | 2–6 students |
| Match format | **Competitive** — two alliances of 2 teams each competing against each other | **Collaborative** — both teams on the same alliance score together |
| Alliances per match | 2 (red vs. blue), 2 teams per alliance | 2 teams cooperate, no opponent |
| Autonomous period | Typically 15 seconds; worth bonus points | Short auto period; sets up driver control |
| Skills Challenge | Driver Skills (60 s) + Autonomous Skills (60 s) | Driver Skills + Autonomous Coding Skills |
| Alliance selection style | Top teams draft; picked teams can decline | Same format but culture is younger/lower-stakes |
| Pit interview culture | Technical depth expected | Explain simply for younger students |
| Age range | 11–18 (middle and high school) | 8–14 |

The biggest structural difference from VIQRC: **V5RC matches are competitive**. Red alliance vs. blue alliance. Your autonomous routine can directly disrupt an opponent's plan. Defense is legal (and often decisive). Alliance selection is not just ceremonial — a bad pick can cost you a championship.

## Tournament format at a glance

A standard V5RC qualifier typically runs 8 am to 6 pm:

| Block | What happens |
|---|---|
| Check-in & pit setup | Sign in, find pit space, assemble and test |
| Robot inspection | Inspector checks size box, expansion, weight (if applicable), license plates, field control connectivity |
| Driver's meeting | Head referee covers the season's specific rules, asks Q&A |
| Qualification rounds | 6–10 matches (varies by event size), random partner assignment |
| Skills Challenge | Each team gets 3 Driver Skills + 3 Autonomous Skills attempts (throughout the day) |
| Alliance selection | Top-ranked teams select partners |
| Elimination matches | Double-elimination or single-elimination bracket |
| Awards ceremony | Excellence, Design, Build, Think, Robot Skills Champion, Sportsmanship, Tournament Champion |

Skills runs **in parallel** with qualification matches all day. Track your Skills time slots on the event app (VEX Via or the event's printed schedule) — they fill up and you can forfeit attempts by not showing up.

## Match structure — what happens each round

### Autonomous period (typically 15 seconds)

The match opens with a brief autonomous period where **neither driver may touch the controller**. Points scored autonomously often include a separate **Autonomous Bonus** (a set number of extra points) awarded to the alliance that scores more during the period.

Key strategic considerations:

- **Win the Autonomous Bonus if you can.** Even modest autonomous routines that reliably score a few elements and win the bonus are worth the programming investment.
- **Gyro-corrected straight driving beats dead-reckoning.** See [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) for implementation.
- **Don't interfere with your alliance partner.** Coordinate start tiles and pathing before the match.
- **Know your opponent's routine.** Scouts should note which starting positions opponents favor — you may be able to block or avoid their path.

### Driver Control period (remainder of match, typically 1m 45s–2m)

After autonomous, both alliances drive simultaneously. V5RC allows:

- **Defensive play** — legally blocking opponents from scoring zones. Know the season's contact rules (check the Game Manual) and train students to defend cleanly.
- **Endgame elements** — many seasons have a final 30-second endgame with climbing, parking, or hanging tasks worth significant points. Drill the endgame routine specifically; losing those points in the last 5 seconds is demoralizing and common.

### Ranking system

Qualification ranking is based on **Winning Points (WP)** accumulated across matches. Most seasons award 2 WP for a win, 1 WP for a tie, 0 WP for a loss, plus Autonomous Points (AP) and Strength of Schedule (SP) as tiebreakers. Your seeding entering alliance selection depends on your total WP and AP — maximize both.

## The Skills Challenge — V5RC edition

Skills runs on a separate field all day. Your robot runs alone (no alliance partner, no opponent). Two formats:

### Driver Skills (60 seconds)

One driver, manual control only. Score as many game elements as possible. Multiple attempts allowed; only your **best score** counts.

**Strategy:**
- Know your most efficient scoring path cold — run it the same way every attempt.
- Save difficult, low-reliability moves for spare attempts; chase consistency in your primary run.
- Practice Skills separately from alliance matches — the field configuration is slightly different.

### Autonomous Skills (60 seconds)

Robot runs fully autonomously, no driver input. This is the most programming-intensive task in V5RC and typically the hardest to max out.

**Strategy:**
- Start simple: a reliable routine that scores 30–40% of max outperforms an ambitious one that crashes 50% of the time.
- Use Vision Sensor and rotation sensors for field element detection where possible.
- Log each run; identify which step fails most often and fix that before extending the routine.

**Why Skills matters for advancement:** At many V5RC events, the **Robot Skills Champion** award (highest combined Driver + Autonomous score) is a direct qualification path to State Championship or VEX Worlds independent of your match ranking. A team that misses alliance selection but excels at Skills can still advance. Invest in it.

## Scouting — why it matters and how to do it

Alliance selection in V5RC is genuinely consequential. After qualification rounds, **the top-seeded team picks first**, and so on down the rankings. **Picked teams can decline** — unlike FRC, V5RC lets declining teams pair with another team not yet selected. This creates real strategy: sometimes declining and forming your own alliance is correct.

### What to scout

During qualification matches, assign at least one team member to observe and record:

- **Autonomous reliability** — does the robot consistently run the same path? Does it win the autonomous bonus?
- **Peak Driver Control score** — what's the best you've seen this team score in a single match?
- **Defensive capability** — can this robot play defense or is it purely offensive?
- **Endgame execution** — do they reliably complete the endgame task?
- **Robot health** — did the robot break down or need repairs between matches?
- **Team behavior** — are they gracious and composed? (Matters for alliance chemistry.)

### Simple scouting sheet format

```
Team #: _____   Team name: _____
Auton: [Reliable / Inconsistent / None]   Wins auton bonus? [Y/N]
Best match score observed: _____
Endgame: [Consistent / Unreliable / N/A]
Defense: [Strong / Weak / None]
Robot issues: _____
Notes: _____
```

Record this for every team you face or observe. Compile the list before alliance selection so you have data.

### Alliance selection strategy

- **Before the ceremony:** rank teams 1–5 you'd want as a partner. Cross off those who will clearly be picked before your turn.
- **If you're a captain (top-seeded):** pick the highest-ranked reliable team that complements your strategy — don't just pick the highest ranked overall if your strategies conflict (e.g., two offensive robots that use the same scoring zones).
- **If you're picked:** accepting is usually right unless you have strong data that declining and pairing with a specific other team gives you a better shot.
- **If you're passed over in early rounds:** stay focused — many tournaments are won by lower-seeded alliances. Compose yourselves visibly; judges are watching.

## Pit strategy for V5RC

V5RC pits are 10'×10'. You'll spend significant time here between matches and during Skills. Set up for efficiency and hospitality:

### Physical setup

- **Pit table at the front** — robot visible to passersby, engineering notebook on display, team banner if you have one.
- **Charging station in the back** — two V5 batteries minimum, both on chargers between matches. V5 batteries are heavy and slow to charge; you can burn through them in Skills.
- **Tool kit within reach** — hex keys (standard and ball-end), flat/Phillips screwdrivers, channel lock pliers, spare motors, spare gears, zip ties, electrical tape.
- **Spare parts box** — at minimum: two spare V5 Smart Motors, a set of high-strength shaft collars, a handful of screws and standoffs, spare wheels matching your drive base.

### Between matches

- **Debrief immediately** (5 minutes): What worked? What failed? One change max before the next match.
- **Charge batteries before you need them**, not after. Rotate batteries systematically.
- **Test the robot on the pit table after any repair** — don't discover a problem at match time.
- **Limit who's hands-on.** Designate 1–2 build students per repair; others scout, rest, or prep the notebook.

### Pit culture and judges

Excellence Award and Design Award judging often involves **pit visits** — a judging panel will walk through the pit area and may stop to ask questions. V5RC judges expect technical engagement:

- Be able to explain your design in 2 minutes without rehearsal sounding hollow.
- Reference specific engineering decisions: "We chose a 6-motor drive because…", "We added this passive mechanism after we discovered…"
- Have your **engineering notebook** available and reference it during the interview. Judges want to see that the notebook tracks real decisions, not just post-hoc documentation.

## Engineering notebook in V5RC

The engineering notebook is a significant factor for Design Award and is reviewed during pit interviews. V5RC judges at the high-school level expect more depth than VIQRC:

- **Design process, not just results.** Show failed prototypes, alternative approaches considered, and why you chose the final design.
- **Data and iteration.** Include test results, measurements, scores before and after changes.
- **Student authorship.** Entries should clearly be written by students (different handwriting or writing styles across entries is fine). Judges penalize notebooks that look adult-authored.
- **Regular entries.** Date-stamped entries throughout the season show ongoing process. Cramming a full notebook in the week before tournament is visible.
- **Consistent format.** Each entry: date, what we planned to do, what we did, what we learned, what's next.

See [FLL Engineering Notebook Guide](/guides/notebook-guide/) for general principles — most transfer directly to V5RC.

## How the day differs from VIQRC

| Aspect | V5RC | VIQRC |
|---|---|---|
| Match format | Competitive (red vs. blue) | Collaborative (two teams cooperate) |
| Pace | Faster, more intense | More relaxed, family-oriented |
| Defense | Legal and common | Typically not the focus |
| Alliance selection | Genuinely strategic | Lower-stakes |
| Pit interview tone | Technical depth expected | Explain for younger audience |
| Notebook depth | Engineering detail, data | Process and exploration |
| Battery management | Critical — V5 batteries deplete fast | Important |
| Crowd vibe | Teen-heavy, competitive | Family-heavy, community |

## Handling the emotional side

V5RC can be more emotionally intense than VIQRC because the competition is higher-stakes and the teams are older. A few dynamics to prepare for:

**Alliance selection rejection:** Not being picked (or being picked later than expected) stings at any age. Before the day, normalize it: "Even great teams don't always get picked early — seeding is just one factor." Remind teams that Skills Award, Design Award, and Excellence Award all have independent qualification paths.

**Losing in elimination:** Double-elimination tournaments give every team a second chance before they're out. If you lose a match, acknowledge it and move on in the next 5 minutes — dwelling kills performance.

**Defensive play frustration:** Teams who have never experienced legal defense get frustrated fast. Coach it beforehand: "If they're playing defense on us, that means they're not scoring — we need to find a path around them, not complain."

**Judge interview nerves:** High-school students are often harder to coach on presentation than younger kids — they think they're not nervous and underprepare. Run one mock pit interview at practice. Three minutes, one judge, cold questions.

## What to pack (V5RC-specific)

On top of the general [Tournament Day Checklist](/guides/tournament-day-checklist/):

- **Two fully charged V5 batteries + chargers** (three if you're heavy on Skills attempts)
- **Spare V5 Smart Motors (×2 minimum)** — V5 Smart Motors fail at tournaments more than at practice
- **Hex key set** (ball-end set + standard) — V5 hardware is metric
- **Engineering notebook** — printed or in a bound notebook, never just a digital file at the pit
- **Scouting sheet** — printed, one per team observed
- **Pit banner / team identity display** — Excellence judging partially happens via first impressions in the pit

## Awards at a V5RC event

| Award | What it rewards | Advancement? |
|---|---|---|
| Excellence Award | Strongest overall program: robot, notebook, judging, Skills, GP | Yes — usually top advancement award |
| Tournament Champion | Winning alliance | Yes (at some events) |
| Design Award | Engineering process via notebook and interview | Sometimes |
| Build Award | Mechanical execution | Varies |
| Think Award | Innovative software / autonomous | Varies |
| Robot Skills Champion | Top combined Driver + Autonomous Skills score | Often a direct advancement path |
| Sportsmanship Award | Gracious Professionalism on and off the field | Rarely advancement |

For full award details and advancement paths, see [VEX Awards — What Each One Rewards](/guides/vex-awards/).

## Where to go next

- [VEX Awards — What Each One Rewards](/guides/vex-awards/) — full breakdown of each award
- [Your First VEX Tournament](/guides/first-vex-tournament/) — structural overview for new teams across all VEX programs
- [VEX IQ Tournament Guide (VIQRC In Depth)](/guides/vex-iq-tournament/) — if you also coach a younger VEX IQ team
- [VEX V5 Programming Basics](/guides/vex-v5-programming-basics/) — autonomous and TeleOp programming for rookie V5RC teams
- [VEX Resource Map](/resources/vex-resource-map/) — VEX Forum, RobotEvents, REC Foundation docs
