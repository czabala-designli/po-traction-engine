# Phase 3 — Persistent sidebar navigation (design)

> Site-review follow-up for po-traction-engine. Addresses feedback #3 (no persistent
> navigation), #9 (feature the Task Map Generator), and the #3 "bonus" prev/next
> sequence links. Feedback #6 (promote Day-0 to its own page) was **dropped** by the
> PO: the Day-0 blockers stay on the homepage top, unchanged.

## Goal

Give the site a persistent way to see **where you are** and **what comes next**, matching
its sequence-and-dependency premise. Today there is no shared nav: `Layout.astro` is just
PostHog + content slot + FeedbackWidget, the homepage has its own top sticky-nav, and
detail pages only have a "← Back to the library" link.

## Approach (chosen)

A **persistent left sidebar**, phase-grouped, with the current page highlighted; collapses
to a hamburger drawer on mobile. It auto-generates from the content collections (same
convention as the homepage grid), so adding a markdown file keeps populating it with zero
wiring. Rejected alternatives: sticky top nav (doesn't show the whole journey at once) and
breadcrumb+prev/next only (no at-a-glance map).

## Components

### `src/components/SideNav.astro` (new)

Self-contained: fetches `getCollection('assets')` and `getCollection('projects')` in its own
frontmatter, so pages need no changes to feed it. Reads `Astro.url.pathname` for the
current-page highlight.

Renders, top to bottom:

1. **Brand header** — logo + "PO Traction Library", links to `/` (the overview map).
2. **Start with the why** — the manifesto link to `https://hdd.designli.co/po-traction`,
   marked external (`target="_blank"`, `↗`), consistent with the homepage card treatment.
3. **Day 0 · Before you start** — anchors to `/#day0` (the homepage Day-0 section). Requires
   adding `id="day0"` to that section in `index.astro`.
4. **Days 1–30** — assets whose phase is `foundation`, `activation`, or `conversion`.
5. **Days 31–90** — assets whose phase is `hdd` or `marketing`.
6. **Projects** — both entries, linking to `/projects/{id}`.

Item rules:
- **Ordering:** run-order = phase order `[foundation, activation, conversion, hdd, marketing]`,
  then `order` within each phase. This is the canonical journey sequence. (The homepage bands
  keep their Phase-1 live-first sort; the divergence in the back half is intentional: the
  sidebar is the sequence view, the homepage surfaces usable items first.)
- **Current highlight:** an item is active when its href matches `Astro.url.pathname`
  (`/library/{id}`, `/projects/{id}`, or `/` for the brand header).
- **Coming-soon** assets render muted with a small "soon" marker (consistent with feedback #4);
  still linked, since their pages exist.
- The brand coral accent moves to the sidebar's left edge so the signature stripe is preserved.

### `src/layouts/Layout.astro` (modified)

- Mount `<SideNav />` and wrap `<slot />` in an `.app-main` element offset by a new
  `--nav-w` CSS variable.
- Add `--nav-w` to `:root`: `240px` on desktop, `0` under the 900px breakpoint.
- Add a slim shared **mobile top bar** (logo + `☰` toggle) shown only under 900px.
- Reconcile the existing 5px `--bar-w` coral stripe: on desktop the sidebar carries the coral
  edge and the `body::before` stripe is suppressed; on mobile the stripe stays.
- Inline vanilla JS for the drawer: `☰` toggles an `.open` class on the sidebar + overlay;
  closes on overlay click, on any nav-link click, and on `Escape`. No library.

### `src/components/PrevNext.astro` (new)

Given `prev` and `next` `{ id, title }` objects, renders a two-slot footer: `◀ {prev.title}`
and `{next.title} ▶`, each linking to `/library/{id}`. Omits a slot when null (sequence ends).

### `src/pages/library/[slug].astro` (modified)

Compute the run-order sequence of all assets (same ordering as the sidebar), find the current
entry's neighbors, and render `<PrevNext prev={...} next={...} />` at the foot, after `<Content />`.
The existing "← Back to the library" link stays (now secondary to the sidebar); same for the
project pages. No broader refactor of those pages.

### `src/pages/index.astro` (modified)

- Remove the page-local `.sticky-nav` (now handled by the shared shell).
- Add `id="day0"` to the Day-0 section (sidebar anchor target).
- Add the **Task Map Generator "try it" callout** (#9): a distinct featured block placed
  **immediately after the Day-0 section**, before the commitments. Short framing ("See your
  whole 90-day plan, dated — try the Task Map Generator") linking to
  `/library/task-map-generator`. The tool's normal card in the Foundation band stays.

## Data flow

Collections are the single source of truth. `SideNav` and `library/[slug]` each derive their
lists independently from `getCollection`, using one shared ordering rule (phase order, then
`order`). No new frontmatter fields are required.

## Out of scope

- Feedback #6 (Day-0 as its own page) — dropped per PO.
- Feedback #4 content build (writing the Days 31–90 plays) — separate initiative.
- Changing the homepage band sort (stays live-first from Phase 1).

## Edge cases

- **Sequence ends:** first asset in run-order has no `prev`; last has no `next` — those slots
  render empty.
- **Non-asset pages:** projects, `privacy`, `terms`, `waitlist`, and home get the sidebar but
  no prev/next.
- **Feedback widget:** must stay bottom-right and clear of the sidebar (desktop) and of the
  drawer overlay (mobile) — verify z-index ordering.
- **Coming-soon links:** valid (their `/library/{id}` pages exist).

## Verification

Build passes, then browser QA (desktop + mobile):
- Sidebar current-page highlight correct on home, a library page, and a project page.
- Mobile drawer opens via `☰`, closes on overlay-tap, link-tap, and Escape.
- Prev/next correct mid-sequence and at both ends.
- Day-0 sidebar link scrolls to the homepage Day-0 section.
- No horizontal overflow at 375px; content not hidden under the sidebar at desktop widths.
- Feedback widget still reachable and unobstructed in both layouts.
- No new console errors.
