# Design Spec — Library v2: Playbook Timeline

**Date:** 2026-07-07
**Status:** Approved decisions captured — pending user review
**Owner:** Carlos Zabala (PO)
**Builds on:** `2026-07-07-traction-library-reshape-design.md` (v1 — flat templates + projects). This v2 restructures the same site before it ships; v1 was never deployed.

---

## 1. Purpose

Evolve the library from a flat catalog (Templates + Projects) into the **TractionLab PO playbook**: assets organized along the 30/90-day engagement timeline. The library must **grow incrementally** — every time a PO runs a new traction activity on a real engagement (brand voice, keyword research, community outreach, …), adding it should be a one-file drop that slots into the right phase automatically.

This reflects the real engagement shape documented in the TractionLab PO Playbook, the Kickoff Checklist/Map, the "First 30 days" goals doc, and the "60-Day Traction Menu" planner.

## 2. Approved decisions (from brainstorming)

- **Organize the home by playbook phase / timeline** (not a flat kind-based catalog).
- **One unified `assets` collection** with a `kind` field (merges templates + plays + tools). `projects` stays separate.
- **Evolve the current `reshape/traction-library` branch into v2 before shipping** — do not deploy the flat v1 catalog first.

## 3. The playbook phases (canonical, ordered)

The `phase` enum. Order drives the home layout top-to-bottom.

| slug | Home label | Source |
|---|---|---|
| `foundation` | Week 1 · Foundation | Playbook Wk1 |
| `activation` | Week 2 · Activation | Playbook Wk2 |
| `conversion` | Week 3 · Conversion | Playbook Wk3 |
| `learning` | Week 4 · Learning | Playbook Wk4 |
| `hdd` | Week 5+ · HDD Mode | Playbook Wk5+ |
| `marketing` | Ongoing · Marketing (Traction Menu) | 60-Day Traction Menu — a parallel track running alongside Wk1–4 |

Milestones (Day 30 = first user; Day 90 = first dollar) are playbook facts surfaced by the Kickoff Map tool, not phases.

## 4. Content model

### 4.1 `assets` collection — `src/content/assets/*.md`

Replaces the v1 `templates` collection.

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Waitlist Landing Page" |
| `kind` | `"template" \| "play" \| "tool"` | template = a page you build; play = a guided Claude workflow; tool = an interactive aid (Kickoff Map, Traction Menu) |
| `phase` | `"foundation" \| "activation" \| "conversion" \| "learning" \| "hdd" \| "marketing"` | which timeline phase it belongs to |
| `status` | `"live" \| "coming-soon"` | `live` = usable/documented now; `coming-soon` = roadmap placeholder |
| `summary` | string | one line for the home |
| `previewUrl` | string (optional) | templates only; when present the detail page shows the live-preview iframe |
| `starter` | boolean (default false) | marks the "start here" asset (drives the hero callout) |
| `order` | number (default 99) | sort order *within* a phase |

**Body (plain Markdown):** the detail content. For a `template`: the "Set it up from scratch" starter + "After it's live" + "Why it works" pattern already built. For a `play`: the guided workflow / prompt + when-to-use + what-it-produces. For a `tool`: what it is + how to use it (+ link/embed).

### 4.2 `projects` collection — unchanged

Same schema as v1 (`title`, `status: active|complete`, `summary`, `templatesUsed`, `checklist`). One rename to consider: `templatesUsed` → `assetsUsed` (since it now references assets of any kind). **Decision:** rename to `assetsUsed` for accuracy; update the one existing project.

## 5. Kinds — how each renders on its detail page

- **template** — status badge, optional live-preview iframe (`previewUrl`, sandboxed), then the Markdown body. (Unchanged from v1 recipe card.)
- **play** — status badge, **no iframe**; the Markdown body carries the guided workflow / prompt and "what this produces." May link to a downloadable artifact (following the `/starters/` + `download="<self-explanatory-name>"` convention from v1).
- **tool** — status badge, a short description, and either an embed or an outbound link to the tool. For v2, tools are represented but not fully ported (see §8).

Single detail route: **`/library/[slug]`** renders any asset by `kind`. (Replaces v1's `/templates/[slug]`.) Rationale: one route for a mixed-kind collection; kind-specific rendering branches inside.

## 6. Home page (the timeline)

- Header + hero (unchanged brand).
- **"Start here" callout** — retained; driven by the `starter` flag (Waitlist), links to its `/library/[slug]`.
- **One section per phase, in enum order.** Each section: phase label (e.g. "Week 1 · Foundation") + its assets sorted by `order`, each shown as a card with **kind badge** (Template / Play / Tool) + **status badge** (Live / Coming Soon). Live assets link to their detail page; coming-soon are dimmed non-links (v1 behavior).
- **Projects** section stays at the bottom (case studies tracked against the playbook).
- A phase with no assets is omitted.

## 7. Migration (within this branch)

1. Create `src/content.config.ts` `assets` collection; delete/replace `templates`.
2. Move the 3 existing template files into `src/content/assets/` with new frontmatter:
   - `waitlist-landing-page` → `kind: template`, `phase: foundation`, `status: live`, `previewUrl: /waitlist`, `starter: true`.
   - `signup-landing-page` → `kind: template`, `phase: conversion`, `status: coming-soon` (it's the Wk3 waitlist→signup conversion).
   - `blog-section` → `kind: template`, `phase: marketing`, `status: coming-soon`.
3. Seed **coming-soon `play` stubs** so the timeline reads as a real roadmap (one Markdown file each, short body):
   - `value-proposition` — play, `foundation`
   - `waitlist-email-sequence` — play, `foundation`
   - `feedback-widget` — play, `foundation`
   - `icp-persona-research` — play, `activation` (wraps the existing `/icp-research` skill)
   - `brand-voice` — play, `marketing`
   - `keyword-research` — play, `marketing`
   - `hdd-experiments` — play, `hdd`
4. Seed **`tool` entries** (coming-soon, represented not ported — §8):
   - `kickoff-task-map` — tool, `foundation`
   - `traction-menu` — tool, `marketing`
5. Rebuild the home as the phase timeline; generalize `/templates/[slug]` → `/library/[slug]`.
6. Update internal links to the new route: the Start-here callout, project `assetsUsed` chips, and any others. (`/waitlist`, `/privacy`, `/terms`, `/starters/*` are unaffected.)
7. Rename `projects` frontmatter `templatesUsed` → `assetsUsed`; update the Traction Engine project.

## 8. Tools — scope boundary for v2

The **Kickoff Task Map** (interactive React artifact) and **Traction Menu** (planner + live app at `tractionmenu.apps.designli.io`) are real, sizable artifacts. **v2 does NOT port their full interactivity.** They appear as `tool` assets on the timeline with detail pages that describe them and link out / mark coming-soon. Porting the Kickoff Map into the Astro site is a candidate follow-up.

**Captured requirement for the Kickoff Map (whenever built/ported):** add a Week-2 (last day) task — *"Post 'We've met our 30-day commitment 🎉' flag-planting update on Basecamp — once the first founder-orbit user is actively using the product."* Ambitious target that builds buffer before the Day-30 guarantee; gated on the first orbit user being genuinely active.

## 9. Out of scope (YAGNI)

- Full port of the Kickoff Map / Traction Menu interactivity (§8).
- Auth / access control (still unlisted-internal).
- MDX, any new runtime dependency, any backend.
- A browse-by-kind index (the hybrid option) — revisit once there are many assets.
- Real content for the coming-soon play stubs (they're roadmap placeholders; filled in as the PO does the work).

## 10. Success criteria

- The home renders phase-by-phase in playbook order; each asset shows a kind badge + status badge; Waitlist appears under Week 1 as the `starter`.
- Adding a new play = dropping one Markdown file into `src/content/assets/` with `kind` + `phase`; it appears in the correct phase with no other edits.
- Every existing v1 behavior still works: `/waitlist` specimen, the Waitlist detail page (preview iframe + starter download + After-it's-live + Why-it-works), the Traction Engine project case study with its checklist, the feedback widget site-wide, PostHog on every page.
- `npm run build` passes and prerenders `/`, `/waitlist`, `/library/<each asset>`, `/projects/the-traction-engine`, `/starters/claude-md-landing-page-starter.md`, `/privacy`, `/terms`.
- No stale references to the old `/templates/[slug]` route or the `templates` collection.
