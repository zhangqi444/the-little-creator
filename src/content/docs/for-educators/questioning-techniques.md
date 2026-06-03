---
title: Questioning Techniques for Coaches — Asking Better Questions
description: Socratic questioning and coaching questioning strategies for robotics coaches and educators. Practical techniques for guiding students to discover answers themselves across FLL, FTC, FRC, VEX IQ, VEX V5, and VEX U.
tags: [educators, coaches, questioning, socratic, coaching, team-culture, growth-mindset, fll, ftc, frc, vex-iq, vex-v5, vex-u]
audience: [coaches, teachers]
level: intermediate
season: evergreen
---

The most powerful sentence a robotics coach can say is often a question. This guide is about which questions to ask, when to ask them, and why telling the answer — however tempting — usually slows learning down.

It complements [Coaching Communication](/for-educators/coaching-communication/) (what to say after things go wrong) and the [Peer Learning Guide](/for-educators/peer-learning-guide/) (students teaching each other). This guide focuses on the coach's questioning toolkit.

---

## Why questions beat answers in robotics coaching

When a student hits a wall — the robot overshoots, the code throws an error, the prototype breaks — the fastest path to "fixed" is for the coach to step in and explain what's wrong. This works once. It doesn't teach anything.

Questions are slower in the moment and faster across a season. A student who discovers that the gyro value drifted because the sensor wasn't given enough settle time before reading will remember that lesson at a competition at 7 AM. A student who was told "you need a settle time" probably won't.

Socratic questioning — a structured approach to guiding students through their own reasoning — has solid evidence behind it in STEM education. It works in robotics because:

1. **Robotics problems are diagnosable.** Almost every failure has a cause a student can find if you give them the right questions and enough time.
2. **The engineering cycle requires understanding, not just fixes.** If a student doesn't understand why something broke, they can't prevent the next version from breaking.
3. **Competition pressure is high.** Teams that know how to debug without a coach present are far more resilient at events where coaches can't touch the robot.

---

## The five questioning levels

These build from simple to deeper reasoning. Use them progressively — don't jump to Level 4 when the student is stuck at Level 1.

### Level 1 — Observation questions

Get the student to describe what they see before interpreting anything.

- "What exactly happened?"
- "What did the robot do? Show me."
- "What does the screen say?"
- "Walk me through what you observe, step by step."

**Why this matters:** Students often skip straight to theories ("I think the motor is broken") before they've fully described the actual symptom. Observation questions slow that down usefully.

### Level 2 — Expectation questions

Get the student to articulate what *should* have happened.

- "What were you expecting it to do?"
- "What was the intended behaviour?"
- "If everything had worked, what would the robot have done differently?"

**Why this matters:** The gap between what happened and what was expected is exactly where the diagnosis lives. If a student can't articulate what they expected, they can't define the failure precisely.

### Level 3 — Hypothesis questions

Prompt the student to generate possible causes before investigating.

- "What do you think might be causing that?"
- "What's one thing that could explain this?"
- "If the sensor was fine, what else could cause this reading?"
- "What changed since it last worked?"

**Why this matters:** Most students default to the first hypothesis that comes to mind and immediately test it. Generating multiple hypotheses before testing is a key diagnostic habit that separates good debuggers from bad ones.

### Level 4 — Testing questions

Get the student to design a way to check their hypothesis.

- "How would you test that?"
- "What would you expect to see if that hypothesis is correct?"
- "What would disprove it?"
- "Can we isolate just that variable?"

**Why this matters:** This is where engineering thinking lives. A student who can say "if it's the encoder, then running the motor with encoders disabled should behave differently" understands experimental design.

### Level 5 — Synthesis questions

After the fix, prompt reflection so the learning generalises.

- "So what was actually causing it?"
- "What would you look for first if this happened again?"
- "Is there anywhere else in the code / build this same pattern might show up?"
- "What would you write in the notebook about this?"

**Why this matters:** Without synthesis questions, the lesson ends at "it works now." With them, the lesson becomes transferable knowledge the student carries into future problems.

---

## Practical question patterns

### The diagnostic sequence

Use this any time a student brings you a broken robot or crashing code:

1. **"Show me."** (Don't let them describe it abstractly — reproduce the failure together.)
2. **"What were you expecting?"** (Establish the gap.)
3. **"What do you think is happening?"** (One hypothesis, not a solution yet.)
4. **"How could we test that?"** (Design the experiment before running it.)
5. **"What did you find?"** (After testing — then invite them to try again or draw a conclusion.)

This sequence takes 5–10 minutes for a simple bug. It saves far more time than that across a season.

### The stuck-student question

When a student is frozen and doesn't know where to start:

- "Tell me what you know for certain."
- "What's the last thing that *was* working?"
- "If you had to guess, what would you guess?"
- "What's the simplest thing we could check first?"

The goal is to break the paralysis without giving the answer. Acknowledging that a guess is okay often unlocks a student who has been afraid of being wrong.

### The premature-solution question

When a student jumps to a solution before diagnosing the problem:

- "Before we try that — what's the specific problem we're solving?"
- "That might work. How would we know it worked?"
- "What would happen if that fix didn't help — what would we try next?"

This isn't to discourage initiative. It's to make sure the fix is targeted, not lucky.

### The teaching check

After a student explains something to you or to a teammate:

- "Can you give me an example of that in our robot?"
- "What's one thing that wouldn't work with that approach?"
- "If I hadn't seen the code — how would you explain the same idea?"

These questions reveal whether the student has conceptual understanding or just memorised a solution. They're especially useful before competitions.

---

## Knowing when *not* to use Socratic questions

Questioning is powerful and has limits. Don't use it:

**When time is genuinely critical.** Ten minutes before a match, if the robot has a wiring fault, tell them what to check. Reflect afterward, not during.

**When safety is the issue.** If a student is about to do something unsafe, intervene directly.

**When the student has tried and genuinely cannot progress.** If a student has worked a problem for 20 minutes independently and is close to tears, give them the answer, then ask the synthesis questions after. Learning requires a tolerable level of struggle — not an overwhelming one.

**When the question is genuinely trivial.** Not every answer needs to be discovered. "What's the command to zero the encoder?" is fine to just answer.

A rough threshold: ask questions when the student has the prerequisite knowledge to find the answer. Give direct answers when they don't yet — and note which gaps to address in a future session.

---

## The coaching think-aloud

A complementary technique: model your own questioning process out loud.

When *you're* debugging alongside students:

- "Okay, so it turned left when it was supposed to go straight. My first hypothesis would be a motor polarity issue — let me check that."
- "Hmm, that didn't fix it. So polarity's fine. Next thing I'd look at is the encoder wiring."
- "Before I check the wiring, let me see if the encoder value is even updating — I'll add a telemetry print."

This narrates expert thinking in real time. Students hear that debugging is iterative, hypothesis-driven, and requires checking assumptions — not magical intuition the coach happens to have.

---

## Questions for different team dynamics

### The student who always waits for the coach

These students have learned that the coach will eventually provide the answer; waiting is efficient. Break this pattern slowly:

- Leave more silence after questions. Wait at least 15 seconds before rephrasing.
- Physically step back while they think — remove the cue that you're about to help.
- Celebrate attempts, not just correct answers: "Good — that was a solid hypothesis, even if it didn't pan out."

### The student who confidently answers without thinking

These students can shut down conversation before others have processed the question. Use redirection:

- "Good instinct — before we test that, let's hear what others think might be the cause."
- "Hold that thought for 30 seconds — I want everyone to have a chance to think."
- Privately, acknowledge their engagement and ask them to model the waiting behaviour you want to see.

### The student who says "I don't know"

Often this means "I'm not sure if my answer is good enough to say out loud":

- "That's okay — what would you guess if you had to?"
- "If it was the simplest possible thing, what would it be?"
- "What's one thing it definitely *isn't*?"

The third option works surprisingly well: elimination reasoning often unlocks students who are paralysed by not knowing the right answer.

### The student who is emotionally activated after a failure

Socratic questioning doesn't work when a student is in fight-or-flight. First regulate, then reason:

- "I can see that was frustrating. Let's take a minute."
- (After a pause) "Ready to dig into what happened?"

See [Coaching Communication](/for-educators/coaching-communication/) for the immediate-response framework.

---

## Program-specific notes

| Program | Notes on questioning |
|---|---|
| **FLL** | Younger students (ages 9–14) benefit most from Level 1–2 questions. Don't skip observation — kids often interpret before they describe. Be patient with Level 3 hypothesis generation; it takes more scaffolding. |
| **VEX IQ** | Ages 8–14 respond well to concrete questions. "What happens to the wheel if we make the gear bigger?" works better than abstract "how does gear ratio affect output speed?" |
| **FTC** | Teens can handle all five levels. The biggest coaching trap in FTC is over-answering programming questions — the code is complex and the coach often knows it better than students. Use the diagnostic sequence especially here. |
| **FRC** | Large teams make one-on-one questioning harder. Use small-group debugging sessions where possible, and save synthesis questions for the end-of-session retrospective. |
| **VEX V5 / VRC** | Teams are often technically strong. Level 4–5 questions are especially valuable: "How would you test this?" and "Is this pattern anywhere else in the code?" push thinking that keeps up with students. |
| **VEX U** | College students should lead their own debugging entirely. Your role shifts to synthesis level and cross-domain prompts: "How does this trade-off compare to the approach you used last season?" |

---

## Common mistakes

| Mistake | What it looks like | Better approach |
|---|---|---|
| Answering before the student has tried | Student says "I don't know why it broke" → coach explains | Ask "What's the last thing you checked?" first |
| Asking leading questions | "Isn't it probably the encoder?" | "What are some things that could cause that reading?" |
| Giving up on silence too quickly | Student pauses → coach rephrases with more hints | Wait 15 seconds minimum; leave space for thinking |
| Using questions as disguised evaluation | "Don't you think you should have tested that earlier?" | Use observation questions, not judgment questions |
| Questioning when time is critical | Diagnostic sequence during inspection queue | Save reflection for after; act directly during crisis |
| Skipping the testing question | Student gives hypothesis → coach validates it → they try it | Always ask "How would you test that?" before testing |
| Skipping synthesis | Robot is fixed → session moves on | Take 2 minutes: "So what was causing it?" |

---

## Quick-start checklist

Before your next session, try one of these:

- [ ] When a student asks "why isn't it working?" — pause and ask "What do you observe?" before saying anything else
- [ ] After a successful repair, ask the synthesis question: "What would you look for first if this happened again?"
- [ ] Time how long you wait after asking a question. If it's less than 10 seconds, try doubling it
- [ ] After a student explains something, ask "Can you give me an example of that in our robot?" to check for real understanding
- [ ] At the end of a session, ask the team: "What did you figure out today that you didn't know at the start?"

---

## Related guides

- [Coaching Communication](/for-educators/coaching-communication/) — talking to students about mistakes and setbacks
- [Peer Learning Guide](/for-educators/peer-learning-guide/) — structuring sessions around students teaching each other
- [Differentiated Instruction](/for-educators/differentiated-instruction/) — adapting coaching for different skill levels
- [Mental Models for Competition](/guides/mental-models-for-competition/) — student-facing thinking frameworks
- [Student Leadership](/guides/student-leadership/) — developing students who can lead their own debugging
