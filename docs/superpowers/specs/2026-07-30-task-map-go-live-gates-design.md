# Task map: go-live gates (Day 60/90 parity with the traction tracker)

**Date:** 2026-07-30
**Status:** approved, implementing
**Touches:** `src/data/task-map.ts`, `src/components/TaskMapGenerator.astro`

## Problem

The task map generator details Days 1-28 and stops. `TOTAL_DAYS` is 96, `GUARANTEES`
carry Day 60 and Day 90, and the timeline draws a "Week 5 onward" band from Day 29,
so the map already claims a 90-day horizon it has no content for.

Josh's traction tracker (`playbook.py`, a descendant of the first map shared with him)
carries 12 items this map lacks. They are the store, compliance and monetization gates:
the things that cause App Store rejections and block the first dollar. Drift runs both
ways, and this half of it is the half where the tracker is ahead.

The 12 are not "late tasks". In `playbook.py` they carry `target_day: None` and sit in
weeks 2-4 with a `blocks` value. They are long-lead gates: they must **start early** and
they **pay off** at Day 60/90. Eleven are gates; the twelfth (`hdd-mode-ongoing`) is a
cadence, not a gate.

## Decisions

Three decisions were taken during brainstorming:

1. **Dated start plus a gate view.** Each gate gets a real start day inside Weeks 1-4
   *and* a `blocks` field. It appears in its week like any other task and is also
   summarized in a gates block. Rejected: dating them only (loses the Day 60/90 signal),
   and a separate undated phase (hides that the work starts in Week 2).
2. **`blocks` points at a guarantee id.** `GUARANTEES` entries gain stable ids chosen to
   match `playbook.py` where they genuinely match. Rejected: reusing `launch` verbatim
   (this map has no "launch" milestone; Day 60 is "App ready for store submission"), and
   referencing the day number (hardcodes the schedule into every gate).
3. **The HDD cadence becomes `THROUGHOUT`.** It is true on all 90 days and is never
   finished, which is exactly what `THROUGHOUT` already means. Rejected: a "Week 5 onward"
   phase of checkboxes that never legitimately get ticked.

Because the gates live inside `WEEKS`, no new export is needed: no import change, no
`define:vars` change, and the progress counter picks them up for free.

## Data changes (`src/data/task-map.ts`)

### `GUARANTEES` gains ids

| id | day | current label |
|---|---|---|
| `refund` | 14 | Refund window closes |
| `first_user` | 30 | First user |
| `store_ready` | 60 | App ready for store submission / Product ready to scale |
| `first_dollar` | 90 | First dollar of revenue |

Additive. Nothing reads `GUARANTEES` positionally.

### Eleven new tasks, nine of them gates

`w2-crash` and `w2-backup` carry no `blocks` (matching `playbook.py`, where both are
`blocks: None`). They are ordinary Week 2 tasks and do not appear in the gates summary.
The other nine do.

Two new groups: **Store & compliance** (W3) and **Store submission** (W4). Everything
else lands in existing groups.

| id | label | Day | Group | Owner | Support | Critical | Mobile | Blocks | from playbook.py |
|---|---|---|---|---|---|---|---|---|---|
| `w2-testflight` | TestFlight / internal testing track set up | 10 | W2 Launch | TL | DEV | yes | yes | `first_user` | `testflight` |
| `w2-crash` | Crash & error reporting wired (Sentry / PostHog) | 11 | W2 Build | DEV | TL | no | no | none | `crash-error-reporting` |
| `w2-backup` | Production data backup enabled | 12 | W2 Build | TL | DEV | no | no | none | `prod-data-backup` |
| `w3-privacy` | Privacy Policy & Terms finalized and hosted | 17 | W3 Store & compliance | PO | CLIENT | yes | no | `store_ready` | `privacy_terms` |
| `w3-support` | Support contact email / page live | 18 | W3 Store & compliance | PO | CLIENT | no | no | `store_ready` | `support-contact` |
| `w3-deletion` | Account / data-deletion flow | 19 | W3 Store & compliance | DEV | TL | yes | yes | `store_ready` | `account-deletion-flow` |
| `w3-labels` | App privacy labels / Play Data safety form | 20 | W3 Store & compliance | PO | TL | yes | yes | `store_ready` | `app-privacy-labels` |
| `w3-assets` | Store listing assets prepared | 20 | W3 Store & compliance | DES | PO | no | yes | `store_ready` | `store_assets` |
| `w4-billing` | In-app purchase / Stripe billing configured | 24 | W4 Monetization | DEV | TL, CLIENT | yes | no | `first_dollar` | `billing_setup` |
| `w4-revenue` | Revenue / KPI instrumentation for first dollar | 26 | W4 PostHog · product | PO | DEV | yes | no | `first_dollar` | `analytics` |
| `w4-submission` | App Store / Play review submission | 27 | W4 Store submission | TL | DEV, PO | yes | yes | `store_ready` | `store_submission` |

Owners translate the tracker's `client|designli|either` into the 6-role model: infra to
TL/DEV, client-facing chasing to PO, store assets to DES. `critical` and mobile gating
carry over from `playbook.py` unchanged.

**Known soft spot:** the day numbers are assigned here, not derived. `playbook.py` leaves
them null because these gates depend on parties outside the pod (the client's attorney,
Apple's review queue, DUNS issuance). They are **start days**, not due dates. The gate
chip and summary block are what carry that meaning; revisit the numbers once the rendered
map has been reviewed.

**Deliberate deviation:** `support-contact` has `blocks: None` in the tracker, but its own
`what_to_check` says store listings require a support contact. Set to `store_ready` here.

### Two `THROUGHOUT` items

- `t-4` HDD mode: every change ships as a hypothesis with a PostHog experiment; the weekly
  client report gives hypothesis, metric before, after, conclusion, next. Owner PO,
  support DEV + TL. (from `hdd-mode-ongoing`)
- `t-5` Days 31-90: monetization model implemented alongside the HDD cadence. Owner DEV,
  support PO + TL.

`t-5` supersedes `OPERATING_NOTES[6]`, which is **deleted** so there is one source of truth.

## Renderer changes (`src/components/TaskMapGenerator.astro`)

1. **Gate chip.** Any task with `blocks` renders a flag chip beside its role chips, reading
   the label from the matching `GUARANTEES` entry. This is what visually separates a gate
   from a dated task.
2. **Go-live gates summary**, after the weeks and before `THROUGHOUT`. Groups visible gates
   by what they block, with an unchecked count per guarantee. Respects variant context, so
   a web-only project sees 4 gates rather than 9. Hidden entirely when no gates are visible.
   Gate rows are display-only and carry no `data-ktm-task` attribute, so each task id still
   maps to exactly one clickable node and the per-section bulk bars stay correct.
3. **Markdown export.** Gate lines carry the blocks marker and a gates summary section is
   appended, so Copy checklist stays complete.

### In-scope cleanup

`TOTAL_DAYS` is exported at `task-map.ts:36` but the component redeclares it at line 108
and never imports it, so editing the data file silently does nothing. The component is
being edited anyway; import the exported value and drop the local literal.

## Out of scope

- No push and no deploy. This overrides the repo's standing "deploy first, commit, push"
  rule at the user's explicit instruction. Local commits only.
- No changes to `playbook.py`. This pass moves content tracker to generator only.
- No `trackerId` field. The id mapping lives in the table above; nothing automated consumes
  it yet.

## Verification

- `npm run build` succeeds.
- `npm run dev`, mobile ON: 9 gates in 3 groups (Day 30 × 1, Day 60 × 6, Day 90 × 2),
  9 flag chips, task count 65 → 76, no duplicate `data-ktm-task` ids.
- Mobile OFF: 4 gates in 2 groups. The Day 30 group disappears (TestFlight was its only
  gate), Day 60 relabels to "Product ready to scale" via `labelWeb`, count drops to 64
  (the 5 new mobile gates plus the 7 pre-existing mobile tasks).
- No console errors on generate.

**Verified 2026-07-30**: all of the above pass.
