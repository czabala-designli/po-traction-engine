# Library sequencing model — from calendar weeks to a dependency chain

**Date:** 2026-07-08
**Status:** Approved model, pending spec review
**Surface:** Home page (`src/pages/index.astro`), asset detail pages (`src/pages/library/[slug].astro`), content schema (`src/content.config.ts`), asset frontmatter (`src/content/assets/*.md`)

## Problem

Each asset carries exactly one `phase`, and phases are rendered as **calendar weeks** ("Week 1 · Foundation", "Week 2 · Activation"). This fuses two unrelated ideas:

- **What kind of work it is** — the funnel stage (Foundation → Activation → Conversion → HDD + Growth). This is good and stays.
- **When you're allowed to do it** — the "Week N" label. This is false precision. A PO reads "Week 2 · Activation" as "ICP is off-limits until week two," when ICP is foundational and front-loadable.

Every specific complaint is a symptom of that fusion:

- **ICP / Persona Research** is Foundation work mislabeled as a later week.
- **Monetization Strategy** is a client conversation you open early and refine over time — it doesn't fit any single week.
- **Brand Voice** and **Keyword Research** aren't standalone milestones; they are *inputs* the Blog work depends on.

## Decision

Replace the calendar with an honest **dependency chain**. The traction engine is a pipeline: each asset's output becomes the next asset's input. The sequencing signal a PO needs is not "it's week 2" but "you can't do this until that exists."

Two relationship signals, shown only where they apply — **no cadence/urgency pills**:

- **Needs:** — the prerequisite(s) that must exist first (this *is* the sequencing).
- **Feeds:** — the reverse, shown on the enabler card (e.g. Brand Voice *Feeds:* Blog Section).

Nuance that isn't a hard dependency (e.g. "start the client conversation early," "this is an ongoing thread") lives in the asset's **summary text**, not in a badge.

The funnel stages keep their names but drop the "Week N ·" prefix. The **Learning** stage is removed (it never held any asset). Stages: **Foundation**, **Activation**, **Conversion** (Days 1–30), then **HDD + Growth** (Days 31–90).

## Target model

### DAYS 1–30 · The 30-day sprint

| Stage | Asset | Needs | Feeds |
|---|---|---|---|
| **Foundation** | Value Proposition | — | Waitlist Landing Page |
| | ICP / Persona Research | — | Waitlist Landing Page |
| | Kickoff Task Map | — | — |
| | Monetization Strategy | — | — |
| **Activation** | Waitlist Landing Page | Value Proposition, ICP / Persona Research | Waitlist Email Sequence |
| | Waitlist Email Sequence | Waitlist Landing Page | — |
| | Feedback Widget | *any live surface — a landing page or product* (free text) | — |
| **Conversion** | Signup Landing Page | *a product to sign into* (free text) | — |

Milestone: **Day 30 — First user (the 30-day guarantee)**

### DAYS 31–90 · HDD + Growth

| Asset | Needs | Feeds |
|---|---|---|
| HDD Experiments | — | — |
| Traction Menu | — | — |
| Blog Section | Brand Voice, Keyword Research | — |
| Brand Voice | — | Blog Section |
| Keyword Research | — | Blog Section |

Milestone: **Day 90 — First dollar**

## Changes from today

- **ICP / Persona Research**: `activation` → `foundation`.
- **Monetization Strategy**: `hdd` → `foundation`; summary reframed to emphasize it's an early, ongoing client conversation ("start the conversation now — you don't need the full answer on day one").
- **Waitlist Landing Page, Waitlist Email Sequence, Feedback Widget**: `foundation` → `activation` (this fills Activation and keeps the funnel honest — Foundation becomes pure groundwork, Activation turns groundwork into an audience).
- **Learning** stage removed everywhere.
- All "Week N ·" label prefixes dropped.

## Data model (`src/content.config.ts`)

Add to the `assets` schema:

```ts
needs: z.array(z.string()).default([]),     // asset ids (slugs) that must exist first
needsNote: z.string().optional(),           // free-text prerequisite (e.g. "a product to sign into")
feeds: z.array(z.string()).default([]),     // asset ids (slugs) this one enables
```

Remove `'learning'` from the `phase` enum (no asset uses it and the stage is gone).

`needs`/`feeds` entries are asset ids that resolve to a title + link at build time; `needsNote` is for prerequisites that aren't a specific asset. A `Needs:` line renders the resolved `needs` links and the `needsNote` together.

## Rendering

Build an `id → title` map from the assets collection (both the home page and the detail page already load `getCollection('assets')`).

**Relationship line component / snippet** — given an asset, render up to two small lines beneath the summary:

- `Needs: <linked title>, <linked title>, <needsNote text>` — omit the line if there are no needs and no note.
- `Feeds: <linked title>, <linked title>` — omit if empty.

Links point to `/library/{id}`. If a slug doesn't resolve to a known asset, skip that entry (fail safe, don't render a broken link). Coming-soon targets still render as text-linked titles (the detail page exists regardless of status).

**Home page** (`index.astro`): the lines appear inside each `.card`, styled quietly (muted-blue label, smaller than the summary) so they read as metadata, not body copy.

**Detail page** (`library/[slug].astro`): the same lines appear in the header, directly under `.summary`, so a PO reading the recipe sees its prerequisites up front.

## `index.astro` structure changes

- `PHASES`: drop the `learning` entry; relabel without "Week N ·":
  - `foundation` → `Foundation`
  - `activation` → `Activation`
  - `conversion` → `Conversion`
  - `hdd` → `HDD Experiments`
  - `marketing` → `Content & Growth`
- `BANDS`:
  - Band 1 — `Days 1–30` / "The 30-day sprint" / phases `['foundation','activation','conversion']` / milestone unchanged.
  - Band 2 — `Days 31–90` / "HDD + Growth" / phases `['hdd','marketing']` / milestone unchanged.

## Per-asset frontmatter edits

| File | phase | order | needs | needsNote | feeds |
|---|---|---|---|---|---|
| value-proposition.md | foundation | 1 | — | — | `[waitlist-landing-page]` |
| icp-persona-research.md | foundation | 2 | — | — | `[waitlist-landing-page]` |
| kickoff-task-map.md | foundation | 3 | — | — | — |
| monetization-strategy.md | foundation | 4 | — | — | — |
| waitlist-landing-page.md | activation | 1 | `[value-proposition, icp-persona-research]` | — | `[waitlist-email-sequence]` |
| waitlist-email-sequence.md | activation | 2 | `[waitlist-landing-page]` | — | — |
| feedback-widget.md | activation | 3 | — | `any live surface — a landing page or product` | — |
| signup-landing-page.md | conversion | 1 | — | `a product to sign into` | — |
| hdd-experiments.md | hdd | 1 | — | — | — |
| traction-menu.md | marketing | 1 | — | — | — |
| blog-section.md | marketing | 2 | `[brand-voice, keyword-research]` | — | — |
| brand-voice.md | marketing | 3 | — | — | `[blog-section]` |
| keyword-research.md | marketing | 4 | — | — | `[blog-section]` |

Plus: reword `monetization-strategy.md`'s `summary` to convey the early/ongoing framing.

## Out of scope

- No new "enabler" kind/badge — the enabler idea is expressed entirely through `Feeds:`.
- No cadence/urgency pills.
- No changes to projects, the feedback widget behaviour, or PostHog.

## Minor open point for review

Band 2 ("HDD + Growth") keeps two sub-headers, "HDD Experiments" and "Content & Growth". If you'd rather it read as a single flat list under "HDD + Growth" with no sub-headers, that's a one-line change — flag it during spec review.
