# Traction Plan skill — simplification to a 4-track spine

**Date:** 2026-07-13
**Author:** Carlos Zabala (PDM), with Claude
**Status:** Design approved, pending spec review
**Supersedes the core model of:** `docs/skills/traction-plan-skill.md` (current menu-selection engine)

## Problem

The current `traction-plan` skill is a menu-selection engine: three Step-0 gates, a 10-item foundation checklist, then it *selects and sequences* growth activities from a large "Traction Menu" reference (B2B/B2C cheat sheets, recommended picks), plus rolling-wave re-runs, a learning log, review chain, and 7 companion asset skills.

In practice every traction lab has the **same shape**, so the "which activities?" selection step is mostly ceremony. The three plans generated to date (Blocq, Drive Now, Entrepreneurs Circle) all reduce to the same handful of workstreams. The menu makes the PO shop for activities that are, in reality, always the same.

Two observed symptoms:
1. **Selection overhead:** the PO reasons about activity choice that doesn't vary between projects.
2. **Output bloat:** the Drive Now and EC plans accumulated inline meta-commentary ("(Mara: new guardrail)", rethink blocks, long notes) and drifted far from the clean Blocq worked example. "Closer to Blocq" is the target aesthetic.

## Goal

Replace the core organizing principle. The skill stops asking "which activities?" and instead **always instantiates the same 4-track spine**, sequenced for the project from facts it already collects. The Traction Menu reference is kept but demoted to an optional-extras lookup. All the surrounding process the PDM values is retained.

Non-goals: no change to the companion asset skills, the commitment-date model, or the client-facing export format.

## Decisions (from brainstorming)

- **Core model:** 4-track spine + optional extras (not a full menu, not a fixed-only template).
- **Layout:** by-week table with a `Track` column (matches the existing Blocq sheet / "Pilot V1" the client already sees).
- **Kept, unchanged:** foundation readiness (folded into tracks), weekly learning log, rolling-wave re-run + reconcile-against-source-of-truth, Mara → PO review → Basecamp default-to-yes export.
- **Output aesthetic:** lean like the Blocq worked example. No inline meta-commentary, no rethink blocks, tight Notes.

## The 4-track spine (always present)

| Track | Foundation it needs | Core actions | Companion skill |
|---|---|---|---|
| **1. Landing + PostHog** | Landing live w/ capture; PostHog full stack wired; funnel + UTM defined | Activate capture → define funnel/UTM → welcome + drip sequence (PostHog workflows) → lifecycle emails | `email-sequence`; value-proposition prompt for the headline |
| **2. ICP communities** | ICP research done + client-approved; communities documented | Validate/join communities → lurk + non-promo interactions (respect each community's self-promo rules) → value-first posts sharing the URL/product → weekly cadence | `community-post` (extends `icp-research`) |
| **3. Client social** | Channel claimed / handle reserved; brand voice defined | PO ghost-writes founder/brand posts as an English kit → client posts on their channel; cadence | `community-post` (founder post), `brand-voice` |
| **4. Blog / SEO** | Blog scaffolding (nav, sitemap, robots, JSON schema, Search Console); keyword repository; brand voice | Keyword research → repository → publish posts on cadence targeting keywords → backlinks | `keyword-research`, `blog-post` |

## Branch logic (the only real per-project variation)

The skill derives all variation from three inputs it already collects, so the PO never shops a menu:

- **Business type** sets Track 3's channel: **B2B / B2B2C → LinkedIn**; **B2C → Instagram / Facebook**. It also flips on the cold-outreach optional extra for B2B.
- **ICP research** fills Track 2's communities and, for a B2B2C product with multiple ICPs, sets which ICP to win first (GTM sequencing, e.g. Blocq: coaches before directors).
- **Stage + product-live date** set ordering across tracks and flip on the ASO optional extra once the product is live. A post-launch play is never scheduled before the product-live date.

## Optional extras (offered, not browsed)

The skill suggests the 1-2 extras that match the project; it does not present a menu. Candidates: ASO (product live), cold outreach / founder network (B2B), in-product referral loop (`⚙️ pod`), Google Business Profile, in-app review prompt, comparison pages. The demoted Traction Menu reference (`PO-Traction-Engine-Reference.md` / `-COMPLETE.md`) is the lookup for these.

## Foundation check, folded into the tracks

The standalone 10-item Gate B is removed. Each track opens with a one-line **"is this track's base live?"** check, applying the existing *existence-is-not-activation* rule (a landing page never promoted, a PostHog install with no funnel, a channel never posted to = `Live, not activated`, not `Done`). Anything not-live or live-not-activated becomes that track's first Week-1 row (the task is activation, not rebuilding). The result is summarized in a compact per-track "Foundation snapshot" block in the plan header.

## Output file template

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
- Optional extras on: [ASO | cold outreach | ...] (only if any)

## Detailed plan (next 4 weeks)
| Date | Eng Wk / Day | Track | Theme | Action (PO action, client-proofed) | Owner | Status | Notes (companion) |
|---|---|---|---|---|---|---|---|

## Horizon (to Day 90)  — grouped by track
- Track 1: [...]   Track 2: [...]   Track 3: [...]   Track 4: [...]

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
```

`Track` values: `Landing/PostHog`, `Communities`, `Client social`, `Blog/SEO`, or the extra's name.
`Status` values: `Not Started`, `In Progress`, `Pending Client Approval`, `Done` (snapshot rows may use `Live, not activated`).
`Owner` values: `PO` (default), `⚙️ pod` (in-product mechanic), `PO → 👤 client` (PO delivers the English kit, client posts/translates).

## Retained mechanics (unchanged from current skill)

- Commitment-date compute: from kickoff, calendar days incl. weekends, Day N = kickoff + (N-1). Day 14/30 hard guarantees, Day 60/90 commitments, Day 90 = first dollar.
- ICP doc(s) as required input (Gate A): supports multiple ICPs; if none, stop and tell the PO to run `icp-research` first. Never fabricate an ICP.
- Project-facts collection (kickoff required, rest a compact batch).
- Rolling-wave re-run: reconcile the prior plan against source of truth (repo, live URLs, PostHog) before trusting it; preserve done rows; roll the window forward ~4 weeks; keep-or-swap within tracks; fold in the learning log.
- Review + export: Mara (marketing) → PO sign-off → Basecamp post in default-to-yes framing, plus optional Google Sheet mirror in the by-week / Track-column order (the Pilot V1 layout).

## Non-negotiable rules (retained)

No spaced em dashes. Client-proof every row (phrased as a PO action, never blocked on the client). PO-default ownership; `⚙️ pod` only for in-product mechanics; `👤 client-post` for inherently-client channels (personal LinkedIn, native-language posting) where the deliverable is the ready English kit. Draft everything in English; client owns any translation. Client-facing framing defaults to yes. Nothing touches the live site (writes only under `docs/`).

## Output aesthetic rule (new, from "closer to Blocq")

Match the Blocq worked example's leanness. Keep rows terse and Notes to a companion-skill pointer plus at most a short qualifier. Do NOT embed reviewer commentary ("(Mara: ...)"), rethink/NOTES blocks, or multi-sentence rationale in plan rows. Rationale belongs in the learning log or the review conversation, not the plan body.

## What physically changes

- Rewrite the source of truth: `po-traction-engine/docs/skills/traction-plan-skill.md`.
- Mirror to the active command file: `~/.claude/commands/traction-plan.md`.
- Demote (do not delete) the Traction Menu reference to "optional-extras lookup."
- Companion asset skills and their mapping: unchanged.

## Success criteria

- A first run produces a Blocq-shaped plan (header + per-track foundation snapshot + by-week/Track table + horizon + learning log) with no activity-selection step.
- The 4 tracks always appear; Track 3's channel and any extras are derived from business type + stage, not asked as an open menu.
- Output is lean: no inline meta-commentary.
- All retained mechanics still function on a re-run.
```
