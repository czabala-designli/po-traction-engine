# Brand Voice play — design / build spec

> Pilot for the site-review #4 content build (fleshing out the Days 31–90 plays).
> First play: **Brand Voice**. Matches the existing **ICP Research** play's 3-file pattern.
> North star: **keep it dead simple — POs are not marketers.** The skill does the work;
> the PO answers a few plain questions and reviews.

## What we're building (3 files)

1. **The skill** — flesh out `docs/skills/brand-voice-skill.md` (currently a stub). This is the
   real deliverable; auto-registers as `/brand-voice` (project discovers skills from
   `docs/skills/<name>-skill.md`). Needs a `description:` frontmatter line like the ICP skill.
2. **The download endpoint** — create `src/pages/starters/brand-voice.md.ts`, a 3-line route that
   serves the skill file for download. Copy the ICP pattern exactly:
   ```ts
   import raw from '../../../docs/skills/brand-voice-skill.md?raw';
   export const prerender = true;
   export const GET = () =>
     new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
   ```
3. **The library page** — rewrite `src/content/assets/brand-voice.md` body and frontmatter; flip
   `status: coming-soon → live`.

## The `/brand-voice` skill — session design

A ~5-minute guided session, **one plain question at a time, no marketing jargon**. Sensible
defaults and pick-lists over open prompts.

**Step 1 — Confirm product + audience (auto-filled, PO just confirms):**
- Read the project's **CLAUDE.md** for the product (Product name / Product description /
  Value proposition fields in the "Project details" block) → this is *what the product is*.
- Read **`docs/icp-communities-*.md`** (ICP Research output, one file per ICP) for *who it's for*
  and *how they actually talk* (the community vocabulary ICP Research captured). If two ICP files
  exist, synthesize ONE product voice serving both audiences.
- Present a short synthesized summary ("Here's your product and who it's for…") and ask the PO to
  confirm or tweak.
- **Fallbacks (still works standalone):** if no ICP doc, say "run `/icp-research` first for a
  sharper result" and ask the one audience question inline; if CLAUDE.md lacks a value prop, ask
  for a one-liner.

**Step 2 — Pick the vibe:** offer a simple trait list (e.g. friendly, expert, calm, bold, precise,
playful, warm, direct, witty) and ask the PO to pick ~3–5, or describe in their own words. No
"brand archetype" theory.

**Step 3 — Add the guardrail per trait:** for each chosen trait, the skill *proposes* the "but not"
opposite (e.g. *friendly but not cutesy*, *expert but not condescending*) and the PO confirms or
edits. This produces the "**X** but not **Y**" table.

**Step 4 — Optional calibration:** invite the PO to paste one or two sentences the founder already
wrote (or a brand they admire); the skill uses them to tune the summary/examples. Skippable.

**Output — write `docs/brand-voice.md`** in the exact structure of Designli's own voice guide
(the PO-provided reference), because it is simple and proven:
- **Voice summary** — one short paragraph: who the product is for and how it sounds.
- **The "X but not Y" table** — ~5 rows, `**trait** | but not | **overcorrection**`.
- **Voice usage highlights** — a few plain bullets (person/POV, sentence style, reading level,
  what to avoid).
- **Do / don't examples** — 2–3 short before→after rewrites, tuned to the ICP's real language.

End with a one-line "what's next": this guide now feeds the Blog Section and every content play;
paste it into those skills or keep it in `docs/brand-voice.md` for them to read.

### Reference: Designli's own voice guide (seed the trait list + format from this)
- Voice summary example: "Designli is a trusted partner… imagine a nerdy yet endearing tech friend…
  informative without being boring; thorough yet friendly."
- Table rows: conversational / but not / dumbed-down · informed / but not / high-brow · technical /
  but not / droning · focused / but not / curt · confident / but not / lofty.
- Usage highlights: first & second person incl. collective "we"; talk like friends; back opinions
  with sources; precision over rambling; love to teach; have authority; ~11th–12th grade reading
  level is fine.
- Usage rule from the guide: "check that **at least two** rows are reflected and **none** are
  contradicted" — include this as the PO's gut-check.

## The library page (`brand-voice.md`)

Mirror the ICP page's structure and tone:
- **Frontmatter:** keep `title: "Brand Voice"`, `kind: "play"`, `phase: "marketing"`, `order: 3`;
  change `status` to `live`; add `needs: ["icp-persona-research"]`; keep `feeds: ["blog-section"]`.
  Update `summary` to something outcome-led and PO-plain (no jargon).
- **Body sections:**
  - Intro: what a brand voice is in one plain sentence and why a PO needs one (so blog posts,
    community replies, and emails all sound like the same product). Note it builds on the ICP work.
  - "## Install the skill" — download `/starters/brand-voice.md` (with `download="brand-voice.md"`),
    install line ("Install the brand-voice.md in my download folder as a skill."), run `/brand-voice`.
    Copy the exact shape of the ICP page's install section.
  - "## What it produces" — the one-page `docs/brand-voice.md` (summary + "X but not Y" table +
    usage highlights + examples), tuned to your ICP.
  - "## Where it fits" — feeds the Blog Section and the other content plays; do it after ICP Research.

## Constraints

- **Simplicity is the acceptance bar:** if a step would confuse a non-marketer PO, cut or simplify
  it. Pick-lists and proposed defaults, not open marketing questions.
- **No spaced em dash (" — ")** in any drafted copy (page or skill). Use commas, colons, periods,
  parentheses. (The reference quotes above may contain them; do not copy them verbatim into new copy.)
- **No new dependencies.** Static site. The skill is plain Markdown instructions.
- Match existing conventions: skill frontmatter `description:` line; serving endpoint identical to
  `icp-research.md.ts`; page structure identical to `icp-persona-research.md`.

## Verification

- `npm run build` passes; `/library/brand-voice` renders as a live play (not coming-soon), with a
  working download link; `/starters/brand-voice.md` serves the skill text (HTTP 200, non-empty).
- Sidebar/cards show `Needs: ICP / Persona Research` and `Feeds: Blog Section`, and the dependency
  links resolve.
- Skill-instructions review: the session reads CLAUDE.md + `docs/icp-communities-*.md`, has the
  standalone fallbacks, and its output matches the Designli format. (End-to-end run of the skill is
  a manual PO step; a controller dry-run against this repo is optional.)

## Out of scope

- Keyword Research, Blog Section, HDD Experiments (later plays, decided after this pilot).
- Changing the ICP or Value Proposition plays.
