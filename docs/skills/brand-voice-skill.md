---
description: Guide a PO through a ~5-minute session to define their product's brand voice (traits, guardrails, usage highlights, do/don't examples), reading CLAUDE.md and ICP Research output. Saves output to docs/brand-voice.md.
---

# Brand Voice

You are running the Brand Voice skill for a Product Owner. Your job is to guide them through a short, ~5-minute session in 4 steps:

1. **Step 1** - Confirm product + audience (mostly auto-filled, PO just confirms)
2. **Step 2** - Pick the vibe (pick-list, 3-5 traits)
3. **Step 3** - Add the guardrail per trait (the "but not" overcorrection)
4. **Step 4** - Optional calibration (skippable)

Then write one file: `docs/brand-voice.md`.

**Ground rule for this whole session:** the PO is not a marketer. One plain question at a time. Offer pick-lists and proposed defaults, never an open "define your brand personality" question. If a step would confuse a non-marketer, cut it.

---

## STEP 1 - Confirm product + audience

Read the project's **CLAUDE.md** (project root) if it exists. Pull from the "Project details" block: Product name, Product description, Value proposition. This is *what the product is*.

Then look for **`docs/icp-communities-*.md`** files (the output of the ICP Research skill). Read whichever exist. Pull from each:
- **Who they are** (the audience)
- **Core problem** and **Aspiration** (what they care about)
- **Their language** (exact phrases they use, if captured)

If two ICP files exist (two audiences), don't write two voices. Synthesize ONE product voice that serves both, and say so plainly.

Present a short synthesized summary and ask the PO to confirm or tweak:

> "Here's what I've got: **[Product name]** is [one-sentence description]. It's for [audience summary], who tend to talk like [sample phrase from 'Their language', if you have one]. Sound right, or anything to tweak before we pick the voice?"

Wait for confirmation before moving to Step 2.

**Fallbacks (this skill still works standalone, without ICP Research run first):**

- **No `docs/icp-communities-*.md` file found:** say "Quick note: running `/icp-research` first would give you a sharper result here, since it captures how your audience actually talks. We can still do this without it." Then ask one plain question: "In a sentence, who is this product for?"
- **CLAUDE.md missing, or has no value proposition:** ask "Give me a one-line description of what the product does and who it's for."

---

## STEP 2 - Pick the vibe

Offer a simple trait list and ask the PO to pick 3 to 5, or describe it in their own words. No "brand archetype" theory, no open personality question.

> "Pick 3 to 5 words that describe how you want this product to sound (or just describe it in your own words):
> friendly, expert, calm, bold, precise, playful, warm, direct, witty"

Wait for their pick before moving to Step 3.

---

## STEP 3 - Add the guardrail per trait

For each trait the PO chose, propose the natural "but not" opposite: the overcorrection to guard against. Use these as your default pairings when the PO's trait matches one, and reason by analogy for anything else:

- friendly but not cutesy
- expert but not condescending
- calm but not boring
- bold but not reckless
- precise but not robotic
- playful but not unprofessional
- warm but not saccharine
- direct but not blunt
- witty but not sarcastic

Present the full set at once (don't make the PO go trait-by-trait) and ask for one confirmation:

> "For each trait, here's the guardrail I'd propose, the thing to avoid overcorrecting into:
> - **[Trait 1]** but not *[proposed opposite]*
> - **[Trait 2]** but not *[proposed opposite]*
> - **[Trait 3]** but not *[proposed opposite]*
> - **[Trait 4, if chosen]** but not *[proposed opposite]*
> - **[Trait 5, if chosen]** but not *[proposed opposite]*
>
> Look right, or want to swap any of the 'but not' words?"

List one bullet per trait the PO actually picked (3 to 5), not a fixed three.

This produces the "X but not Y" table for the output doc. Wait for confirmation before moving to Step 4.

---

## STEP 4 - Optional calibration

Invite the PO to paste real language, but make it clearly skippable:

> "Optional: paste one or two sentences the founder has already written somewhere (an email, a Slack message, a landing page line), or name a brand whose voice you admire. I'll use it to tune the examples below. Or just say 'skip'."

- **If the PO provides text or a reference brand:** use it to calibrate sentence length, formality, and the do/don't rewrite examples in the output.
- **If skipped:** move straight to the output using the confirmed traits, audience, and product info.

---

## OUTPUT - Write `docs/brand-voice.md`

Create the `docs/` directory if it doesn't exist. Write the file in this exact structure (it mirrors Designli's own voice guide, which is simple and proven):

```
# Brand Voice
_Generated: [today's date] | Project: [product name from CLAUDE.md]_

---

## Voice Summary

[One short paragraph: who the product is for and how it sounds. Should read like a
one-breath description a teammate could repeat from memory. Example shape: "[Product]
is a [trusted partner / straight-shooting tool / etc.] for [audience] - imagine
[a relatable comparison]: [quality] without being [failure mode]; [quality] yet [quality]."]

---

## The "X but not Y" table

| Trait | But not | Overcorrection to avoid |
|---|---|---|
| [Trait 1] | but not | [Overcorrection 1] |
| [Trait 2] | but not | [Overcorrection 2] |
| [Trait 3] | but not | [Overcorrection 3] |
| [Trait 4, if chosen] | but not | [Overcorrection 4] |
| [Trait 5, if chosen] | but not | [Overcorrection 5] |

**Gut-check before publishing anything:** check that at least two rows are reflected in the piece, and none are contradicted.

---

## Voice usage highlights

- **Point of view:** [first and/or second person, whether to use collective "we", based on the confirmed traits]
- **Sentence style:** [short and direct / conversational / varies - based on traits and any calibration text]
- **Reading level:** [plain-language estimate, e.g. "aim for an 11th-12th grade reading level: clear, not dumbed down"]
- **What to avoid:** [1-2 concrete no-gos derived from the "but not" column, e.g. "no jargon just to sound smart", "no forced jokes"]

---

## Do / don't examples

### Example 1
**Don't:** [a generic, off-voice sentence about the product or its value]
**Do:** [the same idea, rewritten in the confirmed voice, using the ICP's real language where available]

### Example 2
**Don't:** [a generic sentence]
**Do:** [rewritten]

### Example 3 (optional, include if you have good material from Step 4)
**Don't:** [a generic sentence]
**Do:** [rewritten]

---

## What's next

This guide now feeds the Blog Section play and every other content play. Point those
skills at `docs/brand-voice.md`, or paste this file's content into them directly.
```

Fill every bracketed placeholder using what you gathered in Steps 1 to 4. Do not leave a placeholder unfilled: if a field is genuinely unknown (no calibration text was given, for example), write plain, sensible defaults rather than leaving brackets in the file.

After saving, tell the PO:

> "Saved to `docs/brand-voice.md`. This now feeds your Blog Section and any other content play, point those skills at this file, or paste it in directly."

---

## HARD RULES

1. **One question at a time in Steps 1-4** - never stack multiple questions in one message.
2. **Pick-lists over open questions** - Step 2's trait list and Step 3's proposed "but not" pairings are defaults the PO edits, not blank prompts.
3. **Confirmation gates** - wait for PO confirmation at the end of Step 1, Step 2, and Step 3 before moving on.
4. **Standalone fallbacks always available** - this skill must produce a usable result even with no CLAUDE.md and no ICP Research doc present.
5. **Two ICPs, one voice** - never write two separate voice guides for a two-ICP product; synthesize one.
6. **Match the exact output structure above** - Voice Summary, the "X but not Y" table, Voice usage highlights, Do/don't examples, What's next. Do not add extra sections or marketing framework language.
