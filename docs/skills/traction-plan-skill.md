---
description: Generate or roll forward a per-project Traction Menu plan for a traction lab — a client-proofed, week-by-week marketing plan toward the Day 90 first-dollar-of-revenue goal, with the next 4 weeks detailed and a horizon to Day 90. Writes docs/traction-plans/[project-slug].md. Re-runnable (rolling wave). Loosely chained off icp-research.
---

# Traction Plan

You are running the Traction Plan skill for a Product Owner (PO). Your job is to produce, or roll forward, one project's traction plan: a marketing-and-sales plan for the post-launch phase of the 90-day engagement, aimed at getting the customer to their first dollar of revenue.

This skill is **re-runnable**. A PO runs it at the start, then again every few weeks or whenever the project changes. It works for a brand-new lab on Day 1 (foundation while the pod codes) and for a lab mid-engagement (marketing ramp). Companion asset skills draft the actual assets; this skill plans and tracks, and points each asset row at its companion.

Before starting, read the project's CLAUDE.md if it exists (product name, description, domain). Then run the three Step 0 gates in order, one question at a time. Never ask more than one question per message unless a gate explicitly says a compact checklist is fine.

Full rationale lives in `docs/traction-plans/traction-plan-skill-design.md`. The activity library lives in `docs/traction-plans/reference/` (`PO-Traction-Engine-Reference.md` for the menu, core activities, and B2B/B2C cheat sheet; `PO-Traction-Engine-COMPLETE.md` for deep per-activity playbooks).

---

## Non-negotiable rules (apply throughout)

- **No spaced em dashes** in anything you draft (the plan, notes, the client post). Rewrite with a period, comma, colon, or parentheses.
- **Client-proof every plan row.** Phrase each action as a PO action ("PO prompts client via Basecamp to join the group"), never as a client action. Progress must never sit blocked on the client.
- **Default ownership is the PO.** Landing pages, blogs, emails, PostHog, SEO, ASO are PO-executable with Claude Code. Tag a row `⚙️ pod` only when it is an in-product growth mechanic that touches the client's app codebase (referral unlock, invite-a-teammate, onboarding changes).
- **Client-facing framing defaults to yes:** "here is what we will execute unless you say otherwise."
- **Nothing here touches the live site.** You only write under `docs/`.

---

## Step 0 — Gates (run in order)

### Gate A — ICP research doc (required input)

1. Look for the project's ICP doc at `docs/icp-communities-[project-slug].md` (the `icp-research` skill's output convention).
2. If you do not find one, ask the PO: "Do you already have an ICP research doc for this project? If yes, paste the link, path, or the Markdown." Use whatever they provide (a Google Doc link is fine).
3. If there is still no ICP doc, **stop** and tell the PO: "Run the `icp-research` skill first, then re-run me." Do not fabricate an ICP.

Do not auto-run ICP research. It is gated by client approval before it is trusted.

### Gate B — Foundation readiness

Tell the PO you need a quick readiness check, then present this as a single compact checklist and ask them to mark each `Done` / `Not done` / `N-A` (and paste a link where it exists). This reuses the 7 Core Activities plus the launch essentials from `docs/tractionlab-kickoff-checklist.md`:

- Value proposition written and approved
- Landing page live (waitlist or signup)
- PostHog full stack (events, session recording, survey, funnel, flags)
- Waitlist drip email sequence live
- ICP research done and client-approved
- First cohort documented
- Primary social channel claimed
- Brand voice / writing style defined
- Blog scaffolding for SEO (mark N-A if SEO does not fit this ICP)
- Product live? (yes / no + date)

Anything marked `Not done` becomes a front-loaded task later. `Done` items are recorded in the plan header so the client sees the base is covered.

### Gate C — Project facts

Collect these (kickoff date first, it is required; the rest may be a compact batch):

- **Kickoff date** (required)
- Product one-liner
- Business type: B2B / B2C / B2B2C
- Stage: pre-launch / first users / scaling
- Primary channel(s)
- First-cohort target (who, how many)
- Primary success metric

---

## Step 1 — Compute the commitment dates

From the kickoff date, compute four dates as **calendar days, weekends counted**:

- **Day 14** and **Day 30**: the hard guarantees
- **Day 60** and **Day 90**: the commitment dates (Day 90 = first dollar of revenue goal)

These are the same four commitment dates the project surfaces elsewhere. Put all four in the plan header. They are the fixed backbone and are tracked correctly no matter how execution actually paces.

## Step 2 — Locate the project and set the window

- Work out where the project is today (from the readiness gate and the current date relative to kickoff).
- If `docs/traction-plans/[project-slug].md` already exists, this is a **re-run**: read it, keep completed rows and their statuses, and roll the detailed window forward to the next ~4 weeks. Otherwise it is a fresh first run.
- **Detailed window** = the next ~4 engagement weeks from where the project is now. **Horizon** = everything after that, out to Day 90.
- Lay activities on an engagement-week grid (kickoff + 7n). Each row shows a real calendar date and an engagement marker ("Eng. Week N / Day D"). Week placement is **recommended timing, not a gate**: if the PO runs ahead, that is a win, and the next re-run pulls more of the horizon into detail.

## Step 3 — Build the plan

**3a. Front-load foundation gaps.** Every `Not done` item from Gate B becomes a PO-owned task at the front of the detailed window, before any growth play, so the plan is a complete path and never assumes the base exists.

**3b. Select growth activities.** From `docs/traction-plans/reference/PO-Traction-Engine-Reference.md`, pick activities that fit this project's ICP and stage (use the "recommended starting picks" and the B2B vs B2C cheat sheet). Do not over-commit: a few plays that can show results beats ten at once.

**3c. Sequence by dependency and launch status.** Typical order: ICP, then brand voice and landing/signup, then blog and SEO, then community, then ASO once the product is live. Do not schedule a post-launch play (for example ASO) before the product-live date from Gate B.

**3d. Phrase and tag.** Client-proof every row (PO action). Set Owner to PO by default, `⚙️ pod` only for an in-product mechanic. For any row whose action is an asset, name the companion skill to run in Notes (see the table below).

## Step 4 — Write the plan file

Write `docs/traction-plans/[project-slug].md` in exactly this template:

```markdown
# [Project] — Traction Plan
Kickoff: [date] · Day 14 (guarantee): [date] · Day 30 (guarantee): [date] · Day 60: [date] · Day 90 (first $ goal): [date]
Business type: [B2B/B2C/B2B2C] · Stage: [stage] · Primary channel(s): [...]
First-cohort target: [...] · Success metric: [...]

## Foundation readiness
| Item | Status | Link |
|---|---|---|
| Value proposition | [Done/Not/N-A] | |
| Landing page | | |
| PostHog full stack | | |
| Waitlist drip sequence | | |
| ICP approved | | |
| First cohort documented | | |
| Primary social channel | | |
| Brand voice / style | | |
| Blog scaffolding (if SEO) | | |
| Product live | [yes/no + date] | |

## Detailed plan (next 4 weeks)
| Date | Eng. Week / Day | Theme | Action (PO action, client-proofed) | Owner | Status | Notes (companion skill, links) |
|---|---|---|---|---|---|---|
| [date] | Eng. Week N / Day D | [theme] | [PO action] | PO | Not Started | [e.g. draft via blog-post skill] |

## Horizon (to Day 90)
- **Eng. Week N-M:** [theme] — candidate activities: [...]

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
| | | | |
```

Status values: `Not Started`, `In Progress`, `Pending Client Approval`, `Done`.

## Step 5 — Review and export

1. **Mara review:** route the draft to Mara (marketing) for sign-off. Incorporate edits.
2. **PO review:** the PO confirms (for Blocq that is Andrea).
3. **Client-facing export:** produce a Basecamp post in default-to-yes framing ("here is our plan for the next four weeks, let us know if you disagree"), with the Owner column collapsed into Notes so it matches the Blocq sheet, and a link to the client-friendly Traction Menu site (https://tractionmenu.apps.designli.io/). Optionally mirror to a Google Sheet in the Blocq column order.

---

## Re-run behavior (rolling wave)

On every run: preserve completed rows and statuses, roll the detailed window to the next ~4 weeks, refresh the horizon, and fold in the weekly learning log and any PostHog signal. Apply keep-or-swap: continue plays that worked, swap out plays that did not before they are detailed. Reflect input changes (ICP refined, stage advanced, a channel proven or killed).

## Companion asset skills

The planner points at these; it does not draft assets itself. Each reads the ICP doc plus the brand-voice guide and returns a client-ready draft that then goes through Mara review and client approval.

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
