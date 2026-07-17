# Task Map Generator v2 — the full operating model

**Date:** 2026-07-17
**Status:** Approved design, pending implementation plan
**Surface:** new `src/data/task-map.ts` (data catalog); rework `src/components/TaskMapGenerator.astro` (renderer); regenerate `docs/tractionlab-kickoff-checklist.md` (offline companion). No change to `src/pages/library/[slug].astro` mount.
**Origin:** iteration on the shipped generator (`2026-07-08-interactive-kickoff-task-map-design.md`), driven by open feedback issues #4–#9 and three canonical sources: Josh's `tractionlab-clock.html` ("Objectives and Activities"), the Goffor Slack Canvas (a real hand-adjusted instance), and the 2026-07-16 Fathom meeting "Expectations for key dates for the traction labs" (call 747838094).

## Goal

Grow the generator from a PO-only traction checklist into the **full cross-functional operating model** for a traction lab: entry-path aware, injection aware, with an owner + support on every task, a pre-kickoff "Before kick off" phase, a parallel injection-workshop week, zero weekend tasks, and the meeting's date/urgency framing baked in. The generator becomes the single source of truth that Josh's clock and the Goffor canvas were describing by hand.

## Context: what the sources established

- **Josh's clock** is the authoritative operating model. It is cross-functional (PO, Developer, Tech Lead, Designer, Client, Solutions Architect, leadership) and already carries an owner model — a "Doing" and an "Overseeing" column — plus a pre-Day-1 phase and activities the current generator omits (build-to-deployed, client go-live chase, monetization design→implement, Day 14 "commitment met" Basecamp post).
- **The Goffor canvas** is proof of the gap: the PO manually bolted on a "Before Starting" block (repo from template, Vercel prototype project, AI-integrations plan, first PRD/TRD) plus Week 1/2 TL+Dev tasks, and its dates landed on weekends — exactly issues #5, #7, #6.
- **The Fathom meeting** supplies the "why": Day 4 testable build, Day 14 as an internal aggressive first-user target (a 2-week buffer before the Day 30 contractual deadline), dual-track product+traction from Day 1, daily Basecamp posts to track blockers publicly, mock data / web variants to beat dependency blockers, building off the approved Discovery Injection when the client goes quiet, and basic PostHog tracking landing in Week 2.

### The three entry paths (answers issue #8)

A traction lab kicks off via one of three paths, and the path reshapes the front of the map:

| Path | What it is | Discovery injection default | Design injection default | Kickoff |
|---|---|---|---|---|
| **1 · Impact Week** | Engineering-intensive week assessing an existing product's code; product touched on but not deeply. | **on** | off (available as the alternative to discovery) | Handoff meeting |
| **2 · SolutionLab** | 2-week prototyping sprint; thorough discovery. Client leaves with a prioritized roadmap (MVP + Post-MVP, MoSCoW) + Figma design + prototype. | off (done in the lab) | off (available if something changed since the lab) | Handoff meeting |
| **3 · From scratch** | Full build. | **on** | off (available as an add-on) | Injection, then delivery |

Injections are **two independent toggles** (Discovery, Design); the path only sets their defaults, and the user can override to represent any real combination.

## Decisions

1. **Scope:** full cross-functional operating model (not PO-only). The generator is the single source of truth.
2. **Owner model:** **Owner + Support**, not Josh's Doing/Overseeing. Owner = one role, accountable / does it. Support = roles that assist or **validate that what's created makes sense**.
3. **Role set (chips):** `PO`, `SA` (Solutions Architect), `DES` (Designer), `DEV` (Developer), `TL` (Tech Lead), `CLIENT`. **No LEAD chip** — leadership oversight is not modelled per task.
4. **Weekend rule:** tasks landing on Sat/Sun pull back to the prior **Friday** (zero weekend tasks). **Guarantee milestones (Day 14/30/60/90) keep their true calendar date** — they are contractual and must not shift earlier.
5. **Injections are inside the 90-day clock and run in parallel** — Day 1 = kickoff for every path; injections never shift guarantees or other weeks. They render as a parallel workshop overlay on the early days.
6. **Before-kick-off phase exists (pre-Day-1):** always the repo + Vercel project; the first PRD/TRD iteration and AI-integrations plan only when prior information exists.
7. **Structure:** data catalog split into `src/data/task-map.ts`; `TaskMapGenerator.astro` is the renderer.
8. **Offline companion** regenerated to the fullest case and kept in sync.

## Data model — `src/data/task-map.ts`

A single commented catalog, imported into the component frontmatter and passed to the client script via `define:vars`.

- **`ROLES`** — map of `{ id, label, color }` for `PO, SA, DES, DEV, TL, CLIENT`. Colors drive the chips.
- **`GUARANTEES`** — unchanged Day 14/30/60/90 entries (`day, label, labelWeb?, tag`). Always rendered on the **true calendar date**.
- **`WORKSHOPS_DISCOVERY`** — the confirmed 5-workshop discovery injection (see below), each `{ day, title, duration, whatWeDo, lead:[SA,DES], support:[PO] }`.
- **`WORKSHOPS_DESIGN`** — a **provisional** 5-day design-only injection (see below), same shape, marked "confirm later".
- **`BEFORE`** — the "Before kick off" phase tasks (pre-Day-1), each with the task shape below.
- **`PHASES` / `WEEKS`** — Weeks 1–4 (+ HDD tail) as today, tasks enriched with the fields below.
- **`THROUGHOUT`** — "true on all 90 days" items (daily Basecamp post, daily marketing to client, chase client go-live items).

**Task shape:**
```
{
  id, label, day,               // day = semantic Day N (Before-phase uses day: 0 / negative)
  owner,                        // one ROLE id
  support: [],                  // ROLE ids — assist / validate
  critical?: true,
  mobileOnly?: true,            // shows only when mobile toggle on (existing behavior)
  requires?: 'discovery'|'design', // shows only when that injection is on
  priorInfo?: true,             // shows only when prior information exists (Before phase PRD/TRD, AI plan)
  showWhen?: 'injection'|'no-injection', // handoff-kickoff vs injection-week variants
  paths?: [1,2,3]               // restrict to specific entry paths (default: all)
}
```

The renderer computes a **context** `{ path, discovery, design, mobile, priorInfo }` and includes a task only if every gate it declares is satisfied.

## Entry path + injection toggles (UI)

Above the existing kickoff-date / project-name / generate controls:

- **Entry path** — segmented control / select: `1 · Impact Week`, `2 · SolutionLab`, `3 · From scratch`.
- **Discovery injection** checkbox, **Design injection** checkbox — auto-set to the path defaults (table above) on path change, but user-overridable.
- **Prior information exists** checkbox — gates the Before-phase PRD/TRD + AI-plan tasks (default: on for paths 1 & 2, off for path 3).
- Existing **mobile app** checkbox and **project name** stay.

All selections persist in `localStorage` alongside `{ kickoff, isMobile, checked }` → add `{ path, discovery, design, priorInfo }`. (Storage key unchanged: `tractionlab-map:<project-name>`.)

## Injection phase — parallel overlay, no clock shift

When Discovery and/or Design injection is on, render an **Injection** block before the week cards: a workshop-by-workshop list for Days 1–5 (Discovery) shown as a parallel track. The build track and the POD's foundation/prep work run alongside — the POD attends all workshops (context matters) and between them does prep, foundations, and client info-chasing. **The PRD/TRD is gated to land at the end of the injection week** (needs full context); ICP research → landing page follow downstream.

Guarantees and all week dates stay anchored to Day 1 regardless of injections.

**If both injections are on** (not yet observed in practice — provisional): Discovery = Days 1–5, Design = Days 6–10, sequential, still without shifting guarantees or weeks.

### Discovery injection workshops (confirmed)

Lead: Solutions Architect + Designer. POD participates in all five.

1. **Day 1 (2h) — Understanding the Business:** kickoff, product overview, business model, features, users, branding/design questionnaire, current issues.
2. **Day 2 (1h) — Design Concepts & Workflow:** align design direction, brainstorm main workflow, define the problem statement, look at the product's future.
3. **Day 3 (1h) — Prototype Demo & Review:** present progress on a live interactive prototype, gather direct feedback.
4. **Day 4 (1.5h) — Prioritization Session:** collaboratively prioritize features, map what's critical for launch.
5. **Day 5 (1h) — Final Review & Next Steps:** final design presentation + collaborative review of the custom 30-60-90 execution milestones.

### Design injection workshops (provisional — confirm later)

Lead: Solutions Architect + Designer. POD participates. Own 5-day structure; exact sessions to be confirmed. Working draft:

1. Day 1 — Design kickoff & brand/direction alignment.
2. Day 2 — Wireframes & workflow.
3. Day 3 — Hi-fi concepts review.
4. Day 4 — Prototype & iteration.
5. Day 5 — Final design presentation & handoff.

## Before kick off phase (answers issue #7)

Pre-Day-1 tasks, rendered as a "Before kick off" block ahead of the injection/week cards:

- **Always:** create the repo (from the traction-lab template), create the Vercel project. Owner TL.
- **Only if prior information exists (`priorInfo`):** first PRD iteration (Owner PO, Support TL + DEV), first TRD iteration (Owner TL, Support PO + DEV), third-party integrations overview plan (e.g. AI, payment gateways, IAP, etc.) (Owner TL). For path 3 from scratch with no prior info, these drop and the PRD/TRD instead appears end-of-injection-week.

## Owners: Owner + Support

Each task row shows one filled **Owner** chip and any number of outlined **Support** chips, colored per `ROLES`. A small role legend renders once at the top. Copy output appends `(Owner: PO · Support: TL, DEV)`. Covers issue #4.

Confirmed ownership calls:
- **PRD:** Owner PO, Support TL + DEV. **TRD:** Owner TL, Support PO + DEV.
- Dev-accounts / go-live example from #4: Owner PO, Support TL + CLIENT.

## Weekend rule (issue #6)

`workingDate(dayN)`: compute the calendar date of Day N; if Saturday → subtract 1 (Friday); if Sunday → subtract 2 (Friday). Applied to **task display dates and copy output only**. `GUARANTEES` use the raw true-calendar date. Week-range header labels remain true calendar (a multi-day span may include a weekend; that is fine).

## Meeting notes folded in (issue #9)

- **Day 4 task:** "Testable build in the client's hands (mock data / web variant if needed)" — Owner DEV, Support TL.
- **Day 14:** add Josh's real content — "Deployed version live with a user from the standby list" and "'We have met our commitment' posted to Basecamp"; the Day 14 milestone card gains an internal-target framing note (buffer ahead of Day 30).
- **`THROUGHOUT` section:** daily Basecamp post (blockers tracked publicly), daily marketing to the client, chase outstanding client go-live items every touch.
- **Notes:** use mock data / internal accounts to beat dependency blockers; when the client goes quiet, keep building off the approved Discovery Injection.

## Offline companion

Regenerate `docs/tractionlab-kickoff-checklist.md` (served at `/starters/tractionlab-kickoff-checklist.md`) to the **fullest case** — Path 3, discovery on, prior info on, mobile on — including the Before-kick-off phase, the injection week, owners, and the Throughout section. Note in its header that it is the maximal template and the interactive tool branches by path/injection.

## Out of scope

- No React, no new dependencies, no analytics events, no backend.
- No per-task leadership/oversight modelling (LEAD chip dropped).
- No auto-detection of the entry path — the PO selects it.
- The design-injection workshop content is provisional; refining it is a later, non-blocking edit to `task-map.ts`.

## Open / provisional items (non-blocking)

- Design-injection workshop sessions (placeholder above).
- Both-injections sequencing (Days 1–5 / 6–10) — not yet observed; revisit when it first happens.

## Addendum 2026-07-17 — Goffor canvas reconciliation

After the v2 build shipped, the Goffor canvas had gained items. Folded the generic ones in (Goffor-only specifics stay on Goffor's canvas):

- **New `dayRange` field on tasks.** Ongoing work renders as a pulled start–end range ("Mon Jul 27 – Fri Jul 31") instead of a single date. Used by the items below. `day` still anchors the task to its week; `dayRange[0]` drives the displayed start.
- **Before kick off:** added "Additional required tools added to the stack" (Owner TL, prior-info gated). Phase confirmed to sit ~2 business days before Day 1.
- **PRD/TRD are ongoing, all paths.** Replaced the discovery-only one-shot PRD/TRD tasks with "PRD drafted & refined" (Owner PO, Support TL+DEV) and "TRD drafted & refined" (Owner TL, Support PO+DEV), both `dayRange [1,7]`, always shown. The pre-kickoff first-iteration PRD/TRD in the Before phase stays (prior-info gated).
- **Backend creation is ongoing:** `dayRange [1,7]`.
- **Dev & staging infrastructure moved from Week 1 (Day 1) to Week 2 (Day 8).**
- **Mobile migration is generic, not Goffor-specific** (also happened on Blocq): added "Prototype migrated from React Native Web to React Native + backend integration" (Owner DEV, Support TL, `dayRange [8,17]`, mobile-gated) in Week 2.
- **Week 4:** added "Iterate app based on feedback" (Owner DEV, Support PO, `dayRange [22,26]`).
- **Left out as Goffor-specific:** nothing — the React Native migration was reclassified as generic mobile work per the PO.
