# OpenAI GPT Appeal — Draft

For appealing the public-listing rejection of *The Little Creator — Robotics for Parents & Coaches* on the grounds of "May contain content targeting users under 13 years of age."

---

## How to submit

1. Open the rejection email from OpenAI titled (approximately) *"Your GPT can't be shared publicly"* or *"Action required: GPT review"*.
2. Click the **appeal link** in that email. It opens a short web form.
3. Paste the appeal text below into the form's free-text field. Edit anything in brackets `[like this]` first.
4. Submit. OpenAI typically responds in 3–7 business days.
5. While the appeal is in flight, your GPT keeps working as "Anyone with the link" — no impact to current users.

If you can't find the appeal link, the alternative is: go to <https://help.openai.com>, search for *"appeal GPT rejection"*, and use the support contact form there. Reference your GPT URL: <https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper>.

---

## Appeal text (paste this)

> **GPT:** The Little Creator — Robotics for Parents & Coaches
>
> **URL:** https://chatgpt.com/g/g-69f7807cd8788191a863848d9ad9ea7b-the-little-creator-fll-helper
>
> **Public wiki this GPT is built on:** https://zhangqi444.github.io/the-little-creator
>
> **Rejection reason cited:** "May contain content targeting users under 13 years of age."
>
> **The case for review:**
>
> This GPT is a professional reference resource for **adults** in caregiving and educational roles — parents who serve as volunteer robotics coaches, classroom teachers running after-school clubs, and community mentors supporting student teams. It is positioned for ChatGPT's adult user base in exactly the same way that other adult-professional GPTs serve subject matter that involves children:
>
> - A *pediatric nursing reference* GPT serves nurses (adults), not pediatric patients
> - A *K-12 curriculum design assistant* serves teachers and curriculum directors, not the students whose learning the curriculum addresses
> - A *child psychology research aid* serves clinicians and researchers, not the children whose development they study
>
> Our GPT is squarely in this category. The audience the system prompt explicitly targets — and that the description, conversation starters, and tone all reinforce — is the adult professional or volunteer running a youth robotics team. The content describes youth competitive robotics programs (FIRST LEGO League, FIRST Tech Challenge, FIRST Robotics Competition, VEX IQ, VEX V5, VEX U), which is the subject matter coaches need to do their work — what equipment to buy, how to plan a season, how to handle judging, how to coach effectively, how to navigate competition day.
>
> **Audience evidence in the GPT configuration:**
>
> - **Name:** *Robotics for Parents & Coaches* — explicitly names the adult audience.
> - **Description:** "*A wiki-backed assistant for the parents, coaches, and teachers behind youth robotics teams — FIRST (FLL, FTC, FRC) and VEX (IQ, V5, U). Answers from a community knowledge base of curated resources, guides, and educator content for the adults running teams.*"
> - **System prompt — audience-awareness section:** "*ChatGPT requires its users to be 13 or older, so the people typing to you are adults — write for them directly. The young people they're supporting are subjects you discuss, not interlocutors you address.*"
> - **System prompt — tone section:** "*Treat users as intelligent adults — they are parents, coaches, teachers, and mentors, not the young people on their teams.*"
> - **Conversation starters** all address the adult coach/parent ("Helping a student find a robotics program," "What should I expect at my first tournament as a coach or parent," etc.).
>
> **Content scrubbing performed:**
>
> Before resubmitting, I removed every "for kids," "family-friendly," and "kid-friendly" phrase from the knowledge files (0 remaining), removed audience tags like "kids" from frontmatter, excluded K-12 lesson-plan content from the GPT upload (workshop formats, camp curriculum, lesson plan library — still available on the public website where they belong, but not in the GPT's retrieval set), and applied a generator transform that masks numeric age ranges in the upload files. The current GPT framing and uploaded content are as adult-professional as the underlying subject matter allows.
>
> **Why public discoverability matters:**
>
> This is a volunteer-maintained, non-commercial community resource for the youth robotics coaching community. The audience — first-year FLL coaches, parents trying to figure out registration, teachers starting an after-school FTC team — actively benefits from being able to discover the GPT in the public GPT Store. Limiting to link-share restricts the resource to people who already know to look for it, which excludes exactly the newcomers it's designed to help.
>
> I'd appreciate review of the GPT under the adult-professional-reference framing rather than the under-13 content-targeting framing. Happy to make additional adjustments if reviewers can specify which surfaces or phrasings need further clarification.
>
> Thank you for your time.
>
> [Your name]
> Maintainer, The Little Creator

---

## Tips for the form

- **Keep it specific.** OpenAI reviewers see many appeals; the ones that succeed name specific configuration details (the exact name, the description text, the system-prompt audience clause) so the reviewer can verify the framing without re-reading the GPT from scratch.
- **Don't argue policy.** Don't say "your classifier is wrong" or "this policy is bad." Just make the case that *this specific GPT* fits the adult-professional-reference category that policy already allows.
- **Cite the analogy.** The pediatric-nursing / K-12-curriculum-design comparison is the strongest single argument because it acknowledges the policy's intent (don't let GPTs serve children directly) while showing this GPT respects it (it serves the adults around children).
- **Offer to adjust.** The final line ("happy to make adjustments if reviewers can specify which surfaces need further clarification") gives the reviewer a low-friction path to approve conditionally rather than reject outright.

---

## If the appeal is denied

The fallback is unchanged: **publish as "Anyone with the link."** Functionally identical for everyone who arrives via your wiki, README, school newsletters, or any link-share channel. Only loss is the GPT Store's public search — which was never the dominant discovery path for this audience anyway. People looking for a robotics coaching resource find it through the wiki or word of mouth, not by browsing the GPT Store for "robotics."

You could also try a second appeal in 3–6 months if OpenAI updates its policy or its classifier. The robotics-coaching use case is genuinely the kind of professional-reference content that policy review tends to clarify in favour of over time.
