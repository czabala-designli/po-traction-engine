# Traction-Plan Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable `traction-plan` skill and use it to produce the first batch of per-project traction plans (Blocq backfill, then Entrepreneur Circle, DriveNow, BuckHub, DIY).

**Architecture:** A guided Markdown skill modeled on `icp-research` (frontmatter + one-question-at-a-time instructions). It runs three input gates, computes the four kickoff-anchored commitment dates, then generates an engagement-anchored, rolling-wave plan (detailed next-4-weeks plus a horizon to Day 90) by selecting and sequencing activities from the Traction Menu reference. Plans are client-proofed, reviewed by Mara, and exported to a client-facing Basecamp post. Asset drafting lives in the companion asset skills the planner points to (option A).

**Tech Stack:** Markdown skills (Claude Code); the reference MDs in `docs/traction-plans/reference/`; the `icp-research` skill; PostHog / Basecamp / Fathom / each lab's CLAUDE.md as project-input sources.

**Source of truth:** the design doc at `docs/traction-plans/traction-plan-skill-design.md`. Every task implements part of it.

## Global Constraints

- No spaced em dashes in any drafted content (skill text, plans, client posts). Rewrite with a period, comma, colon, or parentheses. Hard rule from CLAUDE.md.
- Nothing may touch the live site. Only `docs/` is edited; Astro builds only `src/` and `public/`.
- Client-proof every plan row: phrase as a PO action ("PO prompts client via Basecamp to ..."), never a client action.
- Four commitment dates are computed from the kickoff date, calendar days with weekends counted: Day 14 and Day 30 (hard guarantees), Day 60 and Day 90 (commitment dates; Day 90 = first dollar of revenue).
- Client-facing framing defaults to yes ("here is what we will execute unless you say otherwise").
- Ownership defaults to PO; a `⚙️ pod` tag applies only to an in-product growth mechanic that touches the client's app codebase.
- Plans (source of truth) live at `docs/traction-plans/<project>.md`; generated assets at `docs/traction-plans/assets/<project>/`.
- Skill authoring format mirrors `docs/skills/icp-research-skill.md` (YAML `description` frontmatter, then guided body).

## File Structure

- Create: `docs/skills/traction-plan-skill.md` (the skill source)
- Create (registration): `.claude/skills/traction-plan/SKILL.md` (or the mechanism `icp-research` uses; confirm in Task 2)
- Create: `docs/traction-plans/blocq.md` (worked example / validation)
- Create: `docs/traction-plans/entrepreneur-circle.md`, `drivenow.md`, `buckhub.md`, `diy.md` (first batch)
- Reference (read-only): `docs/traction-plans/reference/*.md`, `docs/skills/icp-research-skill.md`, `docs/tractionlab-kickoff-checklist.md`, `docs/traction-plans/traction-plan-skill-design.md`

---

### Task 1: Author the `traction-plan` skill

**Files:**
- Create: `docs/skills/traction-plan-skill.md`
- Reference: `docs/traction-plans/traction-plan-skill-design.md`, `docs/skills/icp-research-skill.md`, `docs/traction-plans/reference/PO-Traction-Engine-Reference.md`

**Interfaces:**
- Produces: a skill that, given a project, writes `docs/traction-plans/<project>.md` in the output template defined in Step 4 below.
- Consumes: an ICP research doc (`docs/icp-communities-<slug>.md` or a PO-provided link), the reference MDs, and PO-supplied project facts.

- [ ] **Step 1: Write the frontmatter and skill intro**

Match the `icp-research` format. Content to write at the top of the file:

```markdown
---
description: Generate a per-project Traction Menu plan for a traction lab: a rolling-wave, client-proofed, week-by-week marketing plan toward the Day 90 first-dollar-of-revenue goal. Detailed next 4 weeks plus a horizon to Day 90. Writes docs/traction-plans/<project>.md.
---

# Traction Plan

You are running the Traction Plan skill for a Product Owner. You produce or roll forward one project's traction plan: a marketing-and-sales plan for the post-launch phase of the 90-day engagement, aimed at the customer's first dollar of revenue. Read the project's CLAUDE.md if it exists for product name, description, and domain. Then run the three Step 0 gates in order, never skipping ahead, one question at a time.
```

- [ ] **Step 2: Write the "Step 0 gates" section**

Document the three gates exactly as the design doc section 6 specifies:
- Gate A (ICP doc, 3-step): auto-detect `docs/icp-communities-<slug>.md`; if absent, ask the PO for a link/path/MD; if still absent, stop and instruct to run `icp-research` first.
- Gate B (readiness check): ask the PO Done / Not done / N-A (+ link) for each canonical foundation item: value proposition, landing page, PostHog full stack, waitlist drip sequence, ICP approved, first cohort documented, primary social channel, brand voice/style, blog scaffolding (if SEO applies), product-live (yes/no + date). One item at a time or as a single compact checklist.
- Gate C (project facts): kickoff date (required), product one-liner, business type (B2B/B2C/B2B2C), stage, primary channel(s), first-cohort target, primary success metric.

- [ ] **Step 3: Write the "dates and anchoring" section**

Instruct the skill to compute from the kickoff date: Day 14, 30, 60, 90 (calendar days, weekends counted) and display them in the plan header. Lay activities on an engagement-week grid (kickoff + 7n), each row carrying its real date plus an engagement marker ("Eng. Week N / Day D"). State that week placement is recommended timing, not a gate, and that status is tracked independently.

- [ ] **Step 4: Write the output template (the plan file format)**

Include this exact template in the skill so every generated plan is consistent:

```markdown
# <Project> Traction Plan
Kickoff: <date> · Day 14 (guarantee): <date> · Day 30 (guarantee): <date> · Day 60: <date> · Day 90 (first $ goal): <date>
Business type: <B2B/B2C/B2B2C> · Stage: <stage> · Primary channel(s): <...>
First-cohort target: <...> · Success metric: <...>

## Foundation readiness
| Item | Status | Link |
|---|---|---|
| Value proposition | <Done/Not/N-A> | |
| Landing page | | |
| PostHog full stack | | |
| Waitlist drip sequence | | |
| ICP approved | | |
| First cohort documented | | |
| Primary social channel | | |
| Brand voice / style | | |
| Blog scaffolding (if SEO) | | |
| Product live | <yes/no + date> | |

## Detailed plan (next 4 weeks)
| Date | Eng. Week / Day | Theme | Action | Owner | Status | Notes |
|---|---|---|---|---|---|---|
| | | | | | Not Started | |

## Horizon (to Day 90)
- **Eng. Week N–M:** <theme>. Candidate activities: <...>

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
| | | | |
```

- [ ] **Step 5: Write the "generation logic" section**

Instruct the skill to: front-load any "Not done" foundation item into the detailed window before growth plays; select growth activities from the reference filtered by ICP and stage (point to `docs/traction-plans/reference/PO-Traction-Engine-Reference.md` recommended picks and cheat sheet); sequence by dependency and launch status; phrase every row as a PO action; default ownership to PO, using `⚙️ pod` only for an in-product mechanic; point each asset row at its companion skill (`brand-voice`, `keyword-research`, `blog-post`, `email-sequence`, `community-post`, `outreach-email`, `aso-listing`).

- [ ] **Step 6: Write the "re-run / rolling wave" section**

Instruct: on run, look for an existing `docs/traction-plans/<project>.md`; if found, preserve completed rows and statuses, roll the detailed window to the next ~4 weeks, refresh the horizon, and fold in the learning log and PostHog signal (keep-or-swap). If absent, do a fresh first run.

- [ ] **Step 7: Write the "review and export" section**

Instruct: after drafting, route to Mara for marketing sign-off, then the PO; then produce a client-facing export (a Basecamp post in default-to-yes framing, Owner column collapsed into Notes, linking the client-friendly Traction Menu site) with an optional Google Sheet mirror in Blocq column order.

- [ ] **Step 8: Verify the skill is complete**

Read the file top to bottom. Confirm every design-doc section (6, 5, 7, 8, 9, 4, 4b) has a matching instruction and that the output template is present and matches the Blocq column set. Fix any gap inline.

- [ ] **Step 9: Commit**

```bash
git add docs/skills/traction-plan-skill.md
git commit -m "Add the traction-plan skill (PROJ-161)"
```

---

### Task 2: Register the skill so it is invocable

**Finding (resolved during implementation):** `icp-research` is invocable but exists only at `docs/skills/icp-research-skill.md`. It is not in `~/.claude/skills`, `.claude/skills`, or the DesignliOS plugin. This project therefore discovers skills from `docs/skills/<name>-skill.md` (a `description:` frontmatter, with `-skill` stripped to form the invocable name). No separate `.claude/skills/` entry is needed, and adding one would diverge from the proven convention.

**Conclusion:** authoring `docs/skills/traction-plan-skill.md` (Task 1) IS the registration. It becomes invocable as `traction-plan` on the next session start, exactly like `icp-research`. There is no extra file to create.

- [ ] **Step 1: Confirm the file matches the working sibling**

Confirm `docs/skills/traction-plan-skill.md` uses the same frontmatter shape as `docs/skills/icp-research-skill.md` (a `description:` key, no `name:` key) and is named `<skill>-skill.md`.

- [ ] **Step 2: Verify on next session start**

Because skill discovery happens at session start, `traction-plan` (and the seven companion stubs created this session) will not appear until Claude Code is restarted. After a restart, confirm `traction-plan` is listed in available skills with the description from its frontmatter.

---

### Task 3: Backfill Blocq as the worked example and skill validation

**Files:**
- Create: `docs/traction-plans/blocq.md`
- Reference: the existing 60-Day Traction Menu Planner sheet (`https://docs.google.com/spreadsheets/d/1-D91e5lZSlF3n4P-9y2mUEv0FhKPgKtvAz1DgalATpM/`), design doc, brainstorm notes.

**Interfaces:**
- Consumes: Task 1 skill output template.
- Produces: a reference plan that the other four labs are patterned on.

- [ ] **Step 1: Assemble Blocq inputs**

Facts already known: PO Andrea; client Carl De Vries (Revolution Volleyball Academy); business type B2B2C (club directors buy, coaches/players use); waitlist landing page live; ICP research done (communities in Reddit/Facebook + first-post drafts); primary channel Facebook coaching-volleyball group (100k+); Google Business Profile candidate. Still needed: Blocq's kickoff date (ask the PO), and the ICP doc link.

- [ ] **Step 2: Reproduce the known 4 weeks**

Populate the detailed table from the existing sheet: Week 1 = waitlist email sequence + blog-for-SEO expansion + define brand voice + keyword research; Week 2 = first blog post (founder story) + first community interaction/post (join FB group) + prompt Revolution footer backlink; Week 3 = second blog post (killer feature + keyword) + second community interactions/post; Week 4 = further community interactions (weekly grassroots). Client-proof every row and set owners.

- [ ] **Step 3: Add header, foundation readiness, horizon, learning log**

Fill the header with Blocq's kickoff-derived commitment dates. Mark foundation items per Step 1. Sketch the horizon (weeks 5-8: continued community + SEO + Google Business Profile + ASO once the app is live). Leave the learning log stubbed.

- [ ] **Step 4: Validate against the template and the sheet**

Confirm the file matches the Task 1 template exactly and that the four detailed weeks match the sheet's themes and actions. Fix drift inline.

- [ ] **Step 5: Commit**

```bash
git add docs/traction-plans/blocq.md
git commit -m "Backfill Blocq traction plan as the worked example (PROJ-161)"
```

---

### Task 4: Generate the first batch (Entrepreneur Circle, DriveNow, BuckHub, DIY)

> This task is input-dependent and interactive: each project needs real inputs the PO or the data sources supply. Run it once per project, in order: Entrepreneur Circle, DriveNow, BuckHub, DIY. Repeat Steps 1-6 for each.

**Files (per project):**
- Create: `docs/traction-plans/<project>.md`
- May create: `docs/icp-communities-<slug>.md` (if `icp-research` must run first)

**Interfaces:**
- Consumes: the Task 1 skill, each project's ICP doc, readiness answers, and facts.
- Produces: a client-ready plan per project.

- [ ] **Step 1: Gather project inputs**

Collect from the PO and sources (each lab's CLAUDE.md, Basecamp, PostHog, Fathom, discovery docs): kickoff date, product one-liner, business type, stage, launch status, primary channel(s), first-cohort target, success metric. Note EC specifics (view-only app submission path, monetization dispute) and DIY specifics (blocked on core product decisions, so its detailed window leans on foundation and pre-launch readiness).

- [ ] **Step 2: Resolve the ICP gate**

Auto-detect `docs/icp-communities-<slug>.md`; if absent, ask the PO for it; if still absent, run `icp-research` for that project first, then continue.

- [ ] **Step 3: Run the `traction-plan` skill**

Invoke the skill with the gathered inputs. It writes `docs/traction-plans/<project>.md`.

- [ ] **Step 4: Verify the output**

Confirm the plan validates against the template, commitment dates are correct from the kickoff date, every row is client-proofed, and DIY's plan leans on foundation with a light growth horizon.

- [ ] **Step 5: Mara review, then client-facing export**

Route the draft to Mara for marketing sign-off; incorporate edits; produce the client-facing Basecamp draft (default-to-yes framing) for the PO to post.

- [ ] **Step 6: Commit**

```bash
git add docs/traction-plans/<project>.md docs/icp-communities-*.md
git commit -m "Add <project> traction plan (PROJ-161)"
```

---

## Self-Review

- **Spec coverage:** Task 1 covers design sections 3-9 and 4b (gates, dates, generation, output, re-run, review/export, asset boundary). Task 2 covers packaging (section 12). Task 3 covers the Blocq backfill (section 11.1). Task 4 covers the first batch including DIY (section 11.2-11.3). Companion asset skills are stubbed already (section 4b) and elaborated separately, out of this plan's scope.
- **Placeholder scan:** the only intentional blanks are the per-project inputs in Task 4, which are genuinely data-dependent and cannot be invented here; the plan names their exact sources instead.
- **Consistency:** the output template in Task 1 Step 4 is the single definition; Tasks 3 and 4 validate against it. Column set matches the Blocq sheet plus the Owner column that collapses on export.

## Notes on execution

- This plan mixes authoring (Tasks 1-3, doable in-session with current context) and interactive data gathering (Task 4, needs the PO and live sources), so inline execution with checkpoints fits better than fully autonomous subagents.
- Companion asset skills (`brand-voice`, `keyword-research`, `blog-post`, `email-sequence`, `community-post`, `outreach-email`, `aso-listing`) are stubbed and will be elaborated in follow-up plans, one per skill.
