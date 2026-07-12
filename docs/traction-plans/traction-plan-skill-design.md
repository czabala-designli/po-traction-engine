# Design: the `traction-plan` skill

> Status: approved design, pre-implementation. Date: 2026-07-12. Owner: Carlos Zabala (PO).
> Origin: Jira PROJ-161 "Create a Traction Menu plan for each traction lab" (reporter Felix, assignee Carlos).
> This is a PO-owned methodology deliverable. It does not touch the live site build. Astro builds only from `src/` and `public/`; everything here lives under `docs/`.

## 1. Purpose

A reusable Claude Code skill that produces, for any traction lab, a **marketing-and-sales plan aimed at the customer's first dollar of revenue by Day 90**. The plan tells the Product Owner exactly what to execute, week by week, so projects do not drift and so every PO applies the Traction Menu the same way and at a comparable pace.

The skill is the reusable engine. The plans for the existing labs are its first runs. New labs coming in run it from Day 1.

## 2. Background and problem

- Traction labs run a 90-day engagement. The pod (full-stack dev plus tech lead) builds the product; the PO owns getting the product its first users and first revenue.
- The first phase (launch) is already well governed by `docs/tractionlab-kickoff-checklist.md` (the Day 1 to Day 30 operational checklist derived from the Task Map Generator). Keith called that "a perfect map of the first month."
- The gap is what happens **after launch, toward Day 90**. The full Traction Menu (16 categories, ~51 activities at https://tractionmenu.apps.designli.io/) is too large for POs and clients to self-navigate. Left alone, each PO improvises, and momentum toward revenue stalls.
- The fix, agreed in the 2026-07-06 brainstorm (Keith, Mara, Carlos) and the 2026-07-07 leadership sync: a followable, per-project, week-by-week directive, generated the same way every time, reviewed by marketing (Mara), and shared with the client for alignment.

## 3. Operating principles (from the brainstorm)

These are requirements, not decoration. The skill must encode them.

1. **Business-building partner, not order-taker.** The plan delivers finished assets for client approval (blog posts written, community posts drafted with images, email sequences built), not menus of suggestions. Framing defaults to yes: "here is what we will execute unless you say otherwise."
2. **Client-proof every task.** Every row is a PO action ("PO prompts client via Basecamp to join the group"), never a client action. Progress must never sit blocked on client inaction, and the tracker must be able to stay green.
3. **Focus beats spray (Mara).** Commit to a few channels that can show results. Detail the near term; keep the horizon deliberately loose so plays can be kept or swapped after they are measured.
4. **Weekly cadence.** Steady, visible activity. In this phase we are showing activity, not yet leads.
5. **Respect dependencies.** ICP research first, then brand voice and landing/signup, then blog and SEO, then community, then ASO once the product is live.
6. **PO owns execution.** Landing pages, blogs, email sequences, PostHog, SEO are PO-executable with Claude Code. A pod tag (dev work) applies only to an in-product growth mechanic that touches the client's app codebase.

## 4. What a traction plan is (the deliverable)

One artifact per project, source of truth in Markdown at `docs/traction-plans/<project>.md`, exported to a client-facing form at share time.

Structure:

- **Header:** project facts, the four kickoff-anchored commitment dates, and a foundation-readiness summary (what is already in place, so the client sees the base is covered).
- **Detailed window:** the next roughly four engagement weeks in full, client-ready detail. Columns: `Date | Eng. Week / Day | Theme | Action | Owner | Status | Notes`. This mirrors the Blocq "60-Day Traction Menu Planner" columns, with an added Owner column that collapses into Notes on client export so the shared version matches the Blocq sheet exactly.
- **Horizon:** the remaining engagement weeks out to Day 90 as a lighter outline (themes plus candidate activities), intentionally not detailed until we have measured the near term.
- **Weekly learning log:** the stub from the Traction Planning Template's Part D, so results feed the portfolio review.

Status values: `Not Started`, `In Progress`, `Pending Client Approval`, `Done`.

## 4b. Scope boundary: planning vs. asset production (option A)

The `traction-plan` skill plans and tracks; it does not draft the assets. Asset production lives in focused companion skills that the planner points to. Each plan row whose action is an asset names the companion skill to run. The companion reads the same project inputs (ICP doc, brand voice, project facts) and returns a finished, client-ready draft, which then goes through Mara review and client approval. The planner may hand off to a companion on request. Pointers go both ways: the planner references the companion from the relevant row, and each companion references this design and the planner.

Generated assets are stored under `docs/traction-plans/assets/<project>/`.

Companion asset skills (first versions stubbed in `docs/skills/`):

| Skill | Produces | Typical timing | Key inputs |
|---|---|---|---|
| `brand-voice` | brand voice & writing-style guide | foundation (early) | product one-liner, ICP |
| `keyword-research` | SEO keyword repository | foundation (early) | ICP, competitors |
| `blog-post` | SEO blog post draft | after keywords | ICP, brand voice, target keyword |
| `email-sequence` | waitlist/welcome + lifecycle drip | foundation (early) | ICP, brand voice, triggers |
| `community-post` | founder/feedback community posts (extends `icp-research`) | post-launch, weekly | ICP communities + first posts, brand voice |
| `outreach-email` | B2B cold outreach + founder-network messages | as ICP dictates (B2B) | prospect list, ICP, brand voice |
| `aso-listing` | ASO copy + screenshot plan | once live (mobile) | keyword repo, ICP, brand voice |

Already covered elsewhere: value proposition (`docs/prompts/value-proposition-prompt.md`). Future candidates, not yet stubbed: `social-content-batch` (consistent posting), `comparison-page` / SEO landing page (B2B), `ad-creative` (paid micro-test).

## 5. Anchoring and dates

- **Kickoff date is the one required date the skill asks for.** From it the skill computes and displays the four commitment dates as the fixed backbone, tracked correctly regardless of execution pace:
  - Day 14 and Day 30: the hard guarantees.
  - Day 60 and Day 90: the commitment / goal dates (Day 90 = first dollar of revenue).
  - Calendar days, weekends counted (per Keith). These are the same four commitment dates the project already surfaces, so the plan speaks the site's language.
- **Engagement-week grid.** Each week is kickoff + 7n and carries its real calendar date plus an engagement marker (for example "Eng. Week 6 / Day 38"). This removes the earlier ambiguity: a "week" is always an engagement week tied to an actual date, never a bare ordinal.
- **Week placement is recommended timing, not a gate.** What the skill tracks is the milestone backbone plus per-activity status. If an efficient PO pulls a later play forward, that is a win. On the next run the skill sees it is Done and pulls more of the horizon into the detailed window. Getting ahead feeds the rolling-wave engine.
- **Launch status is a readiness item, not a second anchor.** The sequence needs to know whether the product is live (no ASO before launch), captured as "product live? yes/no + date." Only kickoff is a required date.

## 6. Inputs and Step 0 gates

Before any planning, the skill runs three gates.

- **6a. ICP research doc (3-step gate).**
  1. Auto-detect by the `icp-research` filename convention (`docs/icp-communities-<archetype-slug>.md`).
  2. If not found, ask the PO whether one exists and, if so, take the link, path, or MD (it may live as a Google Doc).
  3. If still nothing, stop and instruct the PO to run the `icp-research` skill first.
  The generator consumes the ICP doc; it does not auto-re-run ICP research. ICP research is gated by client approval before it is trusted.
- **6b. Readiness check.** The PO answers Done / Not done / N-A (plus a link when done) against the canonical foundation list, which reuses the 7 Core Activities from the reference plus the launch essentials in `tractionlab-kickoff-checklist.md`: value proposition, landing page, PostHog full stack, waitlist drip sequence, ICP approved, first cohort documented, primary social channel, brand voice / writing style, blog scaffolding (if SEO applies), and product-live status. All items are PO-ownable.
- **6c. Project facts.** Kickoff date (required), product one-liner, business type (B2B / B2C / B2B2C), stage (pre-launch / first users / scaling), primary channel(s), first-cohort target, primary success metric.

## 7. Generation logic

1. **Front-load foundation gaps.** Any "Not done" item from 6b becomes a PO-owned task at the front of the detailed window, before growth plays, so the plan is a complete path and never assumes the base exists. This is exactly what the Blocq Week 1 did (waitlist emails, blog scaffolding, brand voice, keyword research).
2. **Select growth activities from the Traction Menu reference**, filtered by ICP and stage, using the reference's recommended starting picks and the B2B/B2C cheat sheet. Source files in `docs/traction-plans/reference/`.
3. **Sequence by dependency and weekly cadence**, honoring launch status (pre-launch plays before the go-live date, post-launch plays after).
4. **Client-proof phrasing.** Every row is a PO action.
5. **Assign ownership.** PO by default; a pod tag only for an in-product growth mechanic if one is selected (referral unlock, invite-a-teammate, onboarding changes).
6. **Emit** the detailed window plus the horizon plus the learning-log stub.

## 8. Re-runnable, rolling-wave behavior

The skill is stateful.

- On each run it looks for an existing `docs/traction-plans/<project>.md`. If found, it rolls the detailed window forward to the next roughly four weeks, refreshes the horizon, and preserves history (Done stays Done, statuses carry over). If not found, it does a fresh first run.
- Each re-run re-reads current state: the readiness gate, the ICP doc, the current engagement day, and the weekly learning log plus any PostHog signal.
- It applies keep-or-swap: plays that worked are continued; plays that did not are swapped out of the horizon before they are detailed.
- It reflects input changes: ICP refined, stage advanced, a channel proven or killed.

A PO runs the skill at the start (or wherever the project is), then again roughly every four weeks or whenever the detailed window is consumed or an input changes.

## 9. Human-in-the-loop and client-facing export

- **Mara review gate.** Marketing sign-off on the draft before it goes to the client.
- **PO review.** For Blocq that is Andrea.
- **Client-facing export.** A Basecamp post ("here is our plan for the next four weeks, let us know if you disagree"), with an optional Google Sheet mirror in the Blocq column format. The client-facing version links to the client-friendly Traction Menu site as the "here is the universe of what our POs can do" reference.

## 10. Relationship to existing artifacts

- `docs/tractionlab-kickoff-checklist.md`: stays the operational Day 1 to Day 30 launch list (accounts, dev env, blockers, broader than traction). The traction plan's foundation phase aligns with it and does not duplicate it; the readiness gate reads that status and pulls forward only traction items still open.
- `docs/skills/icp-research-skill.md`: the upstream input, loosely chained per the 3-step gate.
- `docs/traction-plans/reference/`: the activity source (COMPLETE, Reference, and Template MDs).
- https://tractionmenu.apps.designli.io/: the client-facing menu the plan links to.

## 11. First runs (the immediate deliverable)

1. **Backfill Blocq** from the existing 60-Day Traction Menu Planner sheet as the worked reference example.
2. Run the skill for the active labs, in the order from the leadership sync: **Entrepreneur Circle and DriveNow first** (closest to this phase), **then BuckHub, then DIY**.
3. Keith's immediate ask is the next four weeks for every active lab; the skill delivers that as the detailed window while also laying the horizon to Day 90.

DIY note: DIY is included in the first batch. Its client is currently blocked on core product decisions and is far from marketing, so its plan will lean on foundation and pre-launch readiness in the detailed window, with the growth horizon kept light until the product is unblocked and live.

## 12. File layout

```
docs/
  traction-plans/
    traction-plan-skill-design.md      <- this document
    reference/                          <- Traction Menu source MDs (COMPLETE, Reference, Template)
    <project>.md                        <- generated per-project plans (source of truth)
  skills/
    icp-research-skill.md               <- existing upstream skill
    traction-plan-skill.md              <- the new skill (to be written)
  tractionlab-kickoff-checklist.md      <- existing Day 1 to Day 30 launch checklist
```

The skill's runnable form (registered skill vs. skill doc) is an implementation detail to be settled in the plan, modeled on however `icp-research` is packaged.

## 13. Success criteria

- A PO can run one skill and get a client-ready plan for the next four weeks plus a horizon to Day 90, grounded in the project's real ICP and current readiness.
- The four commitment dates are always correct from the kickoff date, regardless of execution pace.
- The plan never sits blocked on the client (client-proofed phrasing).
- The same skill serves a brand-new lab on Day 1 and an existing lab mid-engagement, and can be re-run to roll forward.
- Marketing (Mara) reviews before the client sees it; the client-facing export posts cleanly to Basecamp.

## 14. Non-goals

- No changes to the live site (`src/`, `public/`) as part of this task.
- Not a replacement for the kickoff checklist.
- Not an auto-re-run of ICP research.
- Not a lead-generation guarantee; in this phase the plan drives activity toward the Day 90 revenue goal.
