# Traction Plan Skill Simplification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `traction-plan` skill's menu-selection model with a fixed 4-track spine + optional extras, keeping every retained mechanic, and make its output lean like the Blocq worked example.

**Architecture:** Rewrite the skill source in `po-traction-engine/docs/skills/traction-plan-skill.md`, mirror it to the active command file `~/.claude/commands/traction-plan.md`, demote the Traction Menu reference to an optional-extras lookup, and regenerate the Blocq worked example in the new format as an end-to-end validation.

**Tech Stack:** Markdown skill/command files. No code, no test runner. Verification is by re-reading each artifact against the spec and by `grep` presence/absence checks.

## Global Constraints

Copied verbatim from `docs/superpowers/specs/2026-07-13-traction-plan-skill-simplification-design.md`:

- No spaced em dashes in any drafted content. Rewrite with a period, comma, colon, or parentheses.
- Client-proof every plan row (phrased as a PO action, never blocked on the client).
- PO-default ownership; `⚙️ pod` only for in-product mechanics; `PO → 👤 client` for inherently-client channels where the deliverable is the ready English kit.
- Draft everything in English; the client owns any translation.
- Client-facing framing defaults to yes.
- The skill writes only under `docs/`; nothing touches the live site.
- The 4-track spine is always present. Track 3's channel and any optional extras are DERIVED from business type + stage, never asked as an open menu.
- Output must be lean like Blocq: no inline reviewer commentary ("(Mara: ...)"), no rethink/NOTES blocks, Notes limited to a companion-skill pointer plus at most a short qualifier.
- Commit steps below are executed only on the user's say-so (user's standing rule: commit only when asked).

---

### Task 1: Rewrite the skill source

**Files:**
- Modify (full replace): `/Users/cazabalac/projects/po-traction-engine/docs/skills/traction-plan-skill.md`

**Interfaces:**
- Consumes: the approved spec at `docs/superpowers/specs/2026-07-13-traction-plan-skill-simplification-design.md`.
- Produces: the new skill body that Task 3 mirrors verbatim (minus frontmatter) to the command file, and whose output template Task 4 exercises.

- [ ] **Step 1: Replace the file with the new skill content below**

Write exactly this to `docs/skills/traction-plan-skill.md`:

````markdown
---
description: Generate or roll forward a per-project Traction Menu plan for a traction lab: a client-proofed, week-by-week marketing plan toward the Day 90 first-dollar-of-revenue goal, built from a fixed 4-track spine (landing+PostHog email, ICP communities, client social, blog/SEO) plus optional extras, with the next 4 weeks detailed and a horizon to Day 90. Writes docs/traction-plans/[project-slug].md. Re-runnable (rolling wave). Loosely chained off icp-research.
---

# Traction Plan

You are running the Traction Plan skill for a Product Owner (PO). Your job is to produce, or roll forward, one project's traction plan: a marketing-and-sales plan for the post-launch phase of the 90-day engagement, aimed at the customer's first dollar of revenue.

Every traction lab has the same shape, so this skill does not make you shop a menu. It lays down the same **4-track spine** every time and sequences it for the project, then offers the one or two optional extras that actually fit. The tracks are:

1. **Landing + PostHog** (email/drip)
2. **ICP communities** (interact, then share)
3. **Client social** (LinkedIn for B2B/B2B2C, Instagram/Facebook for B2C)
4. **Blog / SEO**

This skill is **re-runnable** (rolling wave). Run it at the start, then again every few weeks or whenever the project changes. Companion asset skills draft the actual assets; this skill plans and tracks, and points each row at its companion.

Before starting, read the project's CLAUDE.md if it exists (product name, description, domain, business type, kickoff).

**Where this runs and where things live.** Run from the lab's own repo (where its CLAUDE.md and ICP docs are). Write the plan into that lab's repo at `docs/traction-plans/[project-slug].md`. The skill, the Blocq worked example, and the optional-extras reference live in `po-traction-engine`. The optional-extras lookup is `po-traction-engine/docs/traction-plans/reference/PO-Traction-Engine-Reference.md` (and `-COMPLETE.md` for deep playbooks). You consult it ONLY when picking an optional extra, never to choose the spine.

---

## Non-negotiable rules (apply throughout)

- **No spaced em dashes** in anything you draft. Rewrite with a period, comma, colon, or parentheses.
- **Client-proof every row.** Phrase each action as a PO action ("PO prompts client via Basecamp to join the group"), never as a client action. Progress never sits blocked on the client.
- **Default ownership is the PO.** Landing pages, blogs, emails, PostHog, SEO, ASO are PO-executable with Claude Code. Tag a row `⚙️ pod` only for an in-product growth mechanic that touches the client's app codebase (referral unlock, invite-a-teammate, onboarding change).
- **Inherently-client channels** (their personal LinkedIn, their own network, native-language posting) use `PO → 👤 client`: the PO deliverable is a ready English kit; the client posts or translates when willing. Measure progress by "kit delivered", never "client posted".
- **Always draft in English; the client owns any second language.** Never plan for the PO or pod to produce, translate, or post foreign-language copy.
- **Client-facing framing defaults to yes:** "here is what we will execute unless you say otherwise."
- **Nothing here touches the live site.** You write only under `docs/`.
- **Keep the output lean (write like the Blocq worked example).** Terse rows. Notes is a companion-skill pointer plus at most a short qualifier. No inline reviewer commentary ("(Mara: ...)"), no rethink/NOTES blocks, no multi-sentence rationale in rows. Rationale goes in the learning log or the review conversation, not the plan body.

---

## Inputs

Collect these before building. Ask one question per message; the project facts may be a single compact batch after the ICP gate.

### ICP research doc(s) (required)

A project can have more than one ICP (a B2B2C product like Blocq has two: the economic buyer and the daily user). The `icp-research` skill writes one file per ICP at `docs/icp-communities-[archetype-slug].md`.

1. Look for `docs/icp-communities-*.md` in the lab's repo. Use all of them.
2. If any doc has a "Go-to-Market Sequencing" section, follow that order for which ICP to win first (Blocq: prove coach adoption first, then sell directors).
3. If you find none, ask the PO to paste the link(s)/path(s)/Markdown.
4. If there is still nothing, **stop** and tell the PO: "Run the `icp-research` skill first (once per ICP), then re-run me." Do not fabricate an ICP.

### Project facts

- **Kickoff date** (required)
- Product one-liner
- **Business type: B2B / B2C / B2B2C** (drives the Track 3 channel and the cold-outreach extra)
- **Stage: pre-launch / first users / scaling** and **product-live? (yes/no + date)** (drives sequencing and the ASO extra)
- First-cohort target (who, how many)
- Primary success metric

---

## Step 1: Compute the commitment dates

From the kickoff date, compute four dates as **calendar days, weekends counted**. Day 1 = kickoff, so Day N = kickoff + (N-1) days.

- **Day 14** and **Day 30**: hard guarantees
- **Day 60** and **Day 90**: commitment dates (Day 90 = first dollar of revenue goal)

Put all four in the plan header. They are the fixed backbone regardless of execution pace.

## Step 2: The 4-track spine and branch logic

The spine is always all four tracks. You do not choose them. You only derive per-project details from the facts you collected.

| Track | Foundation it needs | Core actions | Companion skill |
|---|---|---|---|
| **1. Landing + PostHog** | Landing live w/ capture; PostHog full stack wired; funnel + UTM defined | Activate capture, define funnel/UTM, welcome + drip sequence (PostHog workflows), lifecycle emails | `email-sequence`; value-proposition prompt for the headline |
| **2. ICP communities** | ICP research done + client-approved; communities documented | Validate/join communities, lurk + non-promo interactions (respect each community's self-promo rules), value-first posts sharing the URL/product, weekly cadence | `community-post` |
| **3. Client social** | Channel claimed / handle reserved; brand voice defined | PO ghost-writes founder/brand posts as an English kit, client posts on their channel; cadence | `community-post` (founder post), `brand-voice` |
| **4. Blog / SEO** | Blog scaffolding (nav, sitemap, robots, JSON schema, Search Console); keyword repository; brand voice | Keyword research into a repository, publish posts on cadence targeting keywords, backlinks | `keyword-research`, `blog-post` |

**Branch logic (the only per-project variation):**

- **Business type** sets Track 3's channel: **B2B / B2B2C → LinkedIn**; **B2C → Instagram / Facebook**. It also flips on the **cold-outreach** extra for B2B.
- **ICP research** fills Track 2's communities and, for a B2B2C product with multiple ICPs, sets which ICP to win first (GTM sequencing).
- **Stage + product-live date** set ordering across tracks and flip on the **ASO** extra once the product is live. Never schedule a post-launch play before the product-live date.

## Step 3: Per-track foundation check (existence is not activation)

There is no separate foundation gate. For each of the 4 tracks, run a one-line "is this track's base live?" check. Apply existence-is-not-activation: a landing page never promoted, a PostHog install with no funnel, a channel never posted to, or a waitlist with zero signups is `Live, not activated`, not `Done`.

Anything `Not done` or `Live, not activated` becomes that track's **first Week-1 row** (the task is activation, not rebuilding). Summarize the result in the per-track "Foundation snapshot" block in the header.

## Step 4: Optional extras (offer, do not browse)

Suggest only the one or two extras that clearly fit. Do not present a menu. Candidates: ASO (product live), cold outreach / founder network (B2B), in-product referral loop (`⚙️ pod`), Google Business Profile, in-app review prompt, comparison pages. Use the optional-extras reference only here.

## Step 5: Locate the project and set the window

- Work out where the project is today (from the foundation check and the current date relative to kickoff).
- If `docs/traction-plans/[project-slug].md` exists, this is a **re-run**: read it, keep completed rows and their statuses, and roll the detailed window forward ~4 weeks. Otherwise it is a fresh first run.
- **On a re-run, reconcile the prior plan against source of truth before trusting it.** Verify foundation claims and product/app scope against reality: repo state and recent commits, live URLs (open the actual landing page/app), and PostHog signal. Downgrade over-optimistic statuses per existence-is-not-activation, correct anything that changed, and log the corrections in the weekly learning log.
- **Detailed window** = the next ~4 engagement weeks. **Horizon** = everything after, out to Day 90. Lay rows on an engagement-week grid (kickoff + 7n); each row shows a real calendar date and "Eng. Week N / Day D". Week placement is recommended timing, not a gate.

## Step 6: Build and sequence the plan

1. Front-load each track's foundation gaps as its first Week-1 rows.
2. Sequence across tracks by dependency: value prop and brand voice first where a track needs them, then activate Track 1 (measurement) before growth plays that depend on reading results, then Tracks 2 and 4 cadence, Track 3 kit delivery, and any extra once its precondition (e.g. product-live for ASO) is met.
3. Tag and phrase every row: PO action, client-proofed, English. Owner is `PO` by default, `⚙️ pod` for an in-product mechanic, `PO → 👤 client` for an inherently-client channel. Put the companion skill in Notes.
4. Do not over-commit. A few plays that can show results beats ten at once.

## Step 7: Write the plan file

Write into the lab's own repo at `docs/traction-plans/[project-slug].md`. Use exactly this template:

```markdown
# [Project] Traction Plan
Kickoff: [date] · Day 14: [date] · Day 30: [date] · Day 60: [date] · Day 90 (first $): [date]
Business type: [B2B/B2C/B2B2C] · Stage: [stage] · ICP(s): [...]
First-cohort target: [...] · Success metric: [...]

## Foundation snapshot (per track)
- Track 1 Landing + PostHog — [live / activate: what's missing]
- Track 2 ICP communities — [...]
- Track 3 Client social ([LinkedIn|IG/FB]) — [...]
- Track 4 Blog / SEO — [...]
- Optional extras on: [ASO | cold outreach | ...] (omit line if none)

## Detailed plan (next 4 weeks)
| Date | Eng Wk / Day | Track | Theme | Action (PO action, client-proofed) | Owner | Status | Notes (companion) |
|---|---|---|---|---|---|---|---|

## Horizon (to Day 90)
- Track 1: [...]
- Track 2: [...]
- Track 3: [...]
- Track 4: [...]

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
```

`Track` values: `Landing/PostHog`, `Communities`, `Client social`, `Blog/SEO`, or the extra's name.
`Status` values: `Not Started`, `In Progress`, `Pending Client Approval`, `Done`. Snapshot rows may use `Live, not activated`.
`Owner` values: `PO`, `⚙️ pod`, `PO → 👤 client`.

## Step 8: Review and export

1. **Mara review:** route the draft to Mara (marketing) for sign-off. Fold edits into the rows and the learning log, not as inline commentary.
2. **PO review:** the PO confirms.
3. **Client-facing export:** produce a Basecamp post in default-to-yes framing ("here is our plan for the next four weeks, let us know if you disagree"), with the Owner column collapsed into Notes, and a link to the Traction Menu site (https://tractionmenu.apps.designli.io/). Optionally mirror to a Google Sheet in the by-week / Track-column order.

## Re-run behavior (rolling wave)

On every run: reconcile against source of truth (Step 5), preserve completed rows and statuses, roll the detailed window to the next ~4 weeks, refresh the horizon, and fold in the learning log and any PostHog signal. Keep-or-swap: continue plays that worked, swap plays that did not before they are detailed. Reflect input changes (ICP refined, stage advanced, a channel proven or killed, a foundation item that turned out dormant).

## Companion asset skills

The planner points at these; it does not draft assets itself. Each reads the ICP doc plus the brand-voice guide and returns a client-ready English draft that goes through Mara review and client approval.

| When a row's action is... | Point Notes at skill |
|---|---|
| define brand voice / writing style | `brand-voice` |
| keyword research | `keyword-research` |
| publish a blog post | `blog-post` |
| waitlist / lifecycle emails | `email-sequence` |
| community / founder posts | `community-post` (extends `icp-research`) |
| B2B cold outreach / founder network | `outreach-email` |
| app store optimization | `aso-listing` |

Value proposition is covered by `docs/prompts/value-proposition-prompt.md`.
````

- [ ] **Step 2: Verify the new content by re-reading against the spec**

Read the file back and confirm all of the following are present:
- The 4-track spine table with the four exact tracks.
- Branch logic deriving Track 3 channel + extras from business type/stage.
- Per-track foundation check with existence-is-not-activation, replacing the standalone gate.
- The lean-output non-negotiable rule.
- Retained mechanics: commitment-date compute, ICP required input, re-run reconcile, learning log, Mara→PO→Basecamp export.
- The new output template with the `Track` column and `Foundation snapshot`.

- [ ] **Step 3: Verify the menu-selection model is gone**

Run: `grep -niE "select .*growth activities|recommended starting picks|B2B vs B2C cheat sheet|Step 0: Gates|Gate B" "/Users/cazabalac/projects/po-traction-engine/docs/skills/traction-plan-skill.md"`
Expected: no matches (empty output). These are the old menu-engine markers.

- [ ] **Step 4: Verify no spaced em dashes were introduced**

Run: `grep -n " — " "/Users/cazabalac/projects/po-traction-engine/docs/skills/traction-plan-skill.md"`
Expected: no matches. (Rewrite any hits with a comma, period, colon, or parentheses.)

- [ ] **Step 5: Commit (on user approval)**

```bash
git -C /Users/cazabalac/projects/po-traction-engine add docs/skills/traction-plan-skill.md
git -C /Users/cazabalac/projects/po-traction-engine commit -m "refactor(traction-plan): replace menu selection with fixed 4-track spine"
```

---

### Task 2: Demote the Traction Menu reference to an optional-extras lookup

**Files:**
- Modify: `/Users/cazabalac/projects/po-traction-engine/docs/traction-plans/reference/PO-Traction-Engine-Reference.md` (add a scope banner at the top)

**Interfaces:**
- Consumes: nothing.
- Produces: a reference file explicitly scoped to optional extras, so the skill's Step 4 has a clear target and no one mistakes it for the spine driver.

- [ ] **Step 1: Add a scope banner as the first lines of the reference**

Insert at the very top of the file, above the existing first line:

```markdown
> **Scope (as of 2026-07-13):** This reference is the OPTIONAL-EXTRAS lookup for the traction-plan skill. The plan spine is fixed (the 4 tracks: Landing+PostHog, ICP communities, Client social, Blog/SEO) and is NOT chosen from this menu. Consult this file only when selecting the one or two optional extras that fit a project (ASO, cold outreach, referral loop, Google Business Profile, in-app review prompt, comparison pages).
```

- [ ] **Step 2: Verify the banner is present**

Run: `head -3 "/Users/cazabalac/projects/po-traction-engine/docs/traction-plans/reference/PO-Traction-Engine-Reference.md"`
Expected: the scope banner text appears.

- [ ] **Step 3: Commit (on user approval)**

```bash
git -C /Users/cazabalac/projects/po-traction-engine add docs/traction-plans/reference/PO-Traction-Engine-Reference.md
git -C /Users/cazabalac/projects/po-traction-engine commit -m "docs(traction-plan): scope reference as optional-extras lookup"
```

---

### Task 3: Mirror the rewritten skill to the active command file

**Files:**
- Modify (full replace): `/Users/cazabalac/.claude/commands/traction-plan.md`

**Interfaces:**
- Consumes: the finished `docs/skills/traction-plan-skill.md` from Task 1.
- Produces: the live command the PO actually invokes, identical in body to the source.

- [ ] **Step 1: Copy the source body into the command file**

Overwrite `~/.claude/commands/traction-plan.md` with the exact content written in Task 1, Step 1 (the same frontmatter `description` and the same body). The command file and the skill source use the same format, so they are identical.

- [ ] **Step 2: Verify the two files match**

Run: `diff "/Users/cazabalac/projects/po-traction-engine/docs/skills/traction-plan-skill.md" "/Users/cazabalac/.claude/commands/traction-plan.md"`
Expected: no output (files identical).

- [ ] **Step 3: Commit the source repo already covers Task 1; the command file is outside git**

No commit needed for `~/.claude/commands/` (not in the po-traction-engine repo). Note in the handoff that the live command has been updated.

---

### Task 4: Regenerate the Blocq worked example in the new format (end-to-end validation)

**Files:**
- Modify (full replace): `/Users/cazabalac/projects/po-traction-engine/docs/traction-plans/blocq.md`

**Interfaces:**
- Consumes: the new skill from Task 1 and the existing Blocq facts (kickoff 2026-06-04, B2B2C, two ICPs: volleyball-coach and club-director, coaches-first GTM).
- Produces: a worked example proving the skill yields a Blocq-shaped, lean plan in the new template.

- [ ] **Step 1: Rewrite `blocq.md` using the Task 1 output template**

Apply the new skill to Blocq's known facts. The file MUST have, in order: the header line with all four commitment dates; a `## Foundation snapshot (per track)` block covering all 4 tracks (Track 3 channel = LinkedIn, since Blocq is B2B2C); a `## Detailed plan (next 4 weeks)` table whose columns are exactly `Date | Eng Wk / Day | Track | Theme | Action (PO action, client-proofed) | Owner | Status | Notes (companion)`; a `## Horizon (to Day 90)` grouped by track; and a `## Weekly learning log`. Reuse Blocq's existing detailed rows (waitlist drip, blog/SEO, brand voice, keyword research, community interactions/posts, Revolution backlink), each tagged with its `Track` value. Keep rows lean: no inline "(Mara: ...)" commentary.

- [ ] **Step 2: Verify structure and Track column**

Run: `grep -nE "^## Foundation snapshot \(per track\)|^## Detailed plan|\| Track \||^## Horizon|^## Weekly learning log" "/Users/cazabalac/projects/po-traction-engine/docs/traction-plans/blocq.md"`
Expected: matches for the foundation snapshot heading, the detailed-plan heading, the `Track` column header, the horizon heading, and the learning-log heading.

- [ ] **Step 3: Verify leanness (no inline reviewer commentary, no em dashes)**

Run: `grep -niE "\(Mara|rethink|NOTES \(| — " "/Users/cazabalac/projects/po-traction-engine/docs/traction-plans/blocq.md"`
Expected: no matches.

- [ ] **Step 4: Commit (on user approval)**

```bash
git -C /Users/cazabalac/projects/po-traction-engine add docs/traction-plans/blocq.md
git -C /Users/cazabalac/projects/po-traction-engine commit -m "docs(traction-plan): regenerate Blocq worked example in 4-track format"
```

---

### Task 5: Update the skill memory pointer

**Files:**
- Modify: `/Users/cazabalac/.claude/projects/-Users-cazabalac-projects-po-traction-engine/memory/project_traction_plan_skill.md`

**Interfaces:**
- Consumes: nothing.
- Produces: an accurate memory of the skill's current model so future sessions do not reintroduce the menu engine.

- [ ] **Step 1: Add a dated update line to the memory body**

Append to the memory body (do not delete existing history):

```markdown

**Update 2026-07-13:** Skill simplified from a menu-selection engine to a fixed **4-track spine** (Landing+PostHog email, ICP communities, Client social [LinkedIn for B2B/B2B2C, IG/FB for B2C], Blog/SEO) + optional extras. Foundation check folded per-track (no standalone 10-item gate). Output is by-week with a `Track` column and must stay lean like the Blocq example. Retained: commitment dates, ICP-required input, rolling-wave reconcile, learning log, Mara→PO→Basecamp export. Traction Menu reference demoted to optional-extras lookup. Design: `docs/superpowers/specs/2026-07-13-traction-plan-skill-simplification-design.md`; plan: `docs/superpowers/plans/2026-07-13-traction-plan-skill-simplification.md`.
```

- [ ] **Step 2: Verify the update line is present**

Run: `grep -n "Update 2026-07-13" "/Users/cazabalac/.claude/projects/-Users-cazabalac-projects-po-traction-engine/memory/project_traction_plan_skill.md"`
Expected: one match.

- [ ] **Step 3: No commit (memory dir is outside the repo)**

Note in the handoff that memory was updated.

---

## Self-Review

**1. Spec coverage:**
- Core reframe (4-track spine + optional extras) → Task 1 Steps 1-3.
- The 4 tracks table + companion mapping → Task 1.
- Branch logic (business type/stage derive channel + extras) → Task 1 Step 1, verified Step 2.
- Optional extras offered not browsed + reference demotion → Task 1 (Step 4 section) + Task 2.
- Foundation folded per-track → Task 1 (Step 3 section), verified absence of old gate in Task 1 Step 3.
- Output template with Track column → Task 1 + validated in Task 4.
- Retained mechanics → Task 1 body, spot-checked in Task 1 Step 2.
- Lean-output rule → Global Constraints + Task 1 rule + Task 4 Step 3 grep.
- Physical changes (source + command mirror + reference demotion) → Tasks 1, 2, 3.
- Success criteria (Blocq-shaped lean plan, no selection step) → Task 4.
- Memory accuracy → Task 5.
No gaps.

**2. Placeholder scan:** No "TBD/TODO/handle edge cases". The `[date]`/`[...]` tokens are intentional template fields inside the skill artifact, not plan placeholders. Full skill content is inline in Task 1.

**3. Type consistency:** The `Track` column values (`Landing/PostHog`, `Communities`, `Client social`, `Blog/SEO`) are used identically in Task 1's template and Task 4's verification. Heading names in Task 4's grep match the template headings in Task 1 verbatim.
