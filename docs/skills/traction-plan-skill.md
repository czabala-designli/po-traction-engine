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

**Where this runs and where things live.** Run from the lab's own repo (where its CLAUDE.md and ICP docs are). Write the plan into that lab's repo at `docs/traction-plans/[project-slug].md`. The skill, the Blocq worked example, and the optional-extras reference live in `po-traction-engine`. The optional-extras lookup is `po-traction-engine/docs/traction-plans/reference/PO-Traction-Engine-Reference.md` (and `-COMPLETE.md` for deep playbooks). You consult it ONLY when picking an optional extra, never to choose the spine. If you were installed from the PO kit (no `po-traction-engine` repo present), these shared files live at `~/.claude/traction-engine/reference/` instead: look there for `PO-Traction-Engine-Reference.md`, `value-proposition-prompt.md`, and the `blocq.md` worked example. If neither location exists, skip the reference and pick extras from the candidate list in Step 4; the reference only enriches extras, it never gates the plan.

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
- **The plan is a baseline, not a mandate.** The 4-track spine is the shared floor, not a ceiling. Hand the plan to the PO as a starting point they are encouraged to extend: the PO knows the client's quirks best, so invite them to co-build by adding rows (client-specific plays, extra channels) on top of the spine. Say this explicitly in the PO handoff.

---

## Inputs

Collect these before building. Ask one question per message; the project facts may be a single compact batch after the ICP gate.

### ICP research doc(s) (required)

A project can have more than one ICP (a B2B2C product like Blocq has two: the economic buyer and the daily user). The `icp-research` skill writes one file per ICP at `docs/icp-communities-[archetype-slug].md`.

1. Look for `docs/icp-communities-*.md` in the lab's repo. Use all of them.
2. If any doc has a "Go-to-Market Sequencing" section, follow that order for which ICP to win first (Blocq: prove coach adoption first, then sell directors).
3. If you find none, ask the PO to paste the link(s)/path(s)/Markdown.
4. If there is still nothing, **stop** and tell the PO: "Run the `icp-research` skill first (once per ICP), then re-run me." Do not fabricate an ICP.

Do not auto-run ICP research. It is gated by client approval before it is trusted.

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

Write into the lab's own repo at `docs/traction-plans/[project-slug].md`. Use this template (the header lines may wrap for readability):

```markdown
# [Project] Traction Plan
Kickoff: [date] · Day 14: [date] · Day 30: [date] · Day 60: [date] · Day 90 (first $): [date]
Business type: [B2B/B2C/B2B2C] · Stage: [stage] · ICP(s): [...]
First-cohort target: [...] · Success metric: [...]

> Baseline plan, meant to be co-built. This is a starting point from the 4-track spine; add rows for the client-specific plays you know matter. The spine is a floor, not a ceiling.

## Foundation snapshot (per track)
- Track 1 (Landing + PostHog): [live / activate: what's missing]
- Track 2 (ICP communities): [...]
- Track 3 (Client social, [LinkedIn|IG/FB]): [...]
- Track 4 (Blog/SEO): [...]
- Optional extras on: [ASO | cold outreach | ...] (omit line if none)

## Detailed plan (next 4 weeks)
| Date | Eng Wk / Day | Track | Theme | Action (PO action, client-proofed) | Owner | Status | Notes (companion) |
|---|---|---|---|---|---|---|---|

## Horizon (to Day 90)
- Track 1 (Landing + PostHog): [...]
- Track 2 (ICP communities): [...]
- Track 3 (Client social): [...]
- Track 4 (Blog/SEO): [...]

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
```

`Track` values: `Landing/PostHog`, `Communities`, `Client social`, `Blog/SEO`, or the extra's name.
`Status` values: `Not Started`, `In Progress`, `Pending Client Approval`, `Done`. Snapshot rows may use `Live, not activated`.
`Owner` values: `PO`, `⚙️ pod`, `PO → 👤 client`.

## Step 8: Review and export

1. **Mara review:** route the draft to Mara (marketing) for sign-off. Fold edits into the rows and the learning log, not as inline commentary.
2. **PO review (co-build, not sign-off):** hand the plan to the PO as the baseline, and explicitly invite them to add rows for client-specific plays on top of the 4-track spine. Frame it as "here is your starting point, add what you know about this client," not as a fixed directive to approve.
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
