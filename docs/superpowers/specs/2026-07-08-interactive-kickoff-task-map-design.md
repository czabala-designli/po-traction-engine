# Interactive Kickoff Task Map

**Date:** 2026-07-08
**Status:** Approved, implementing
**Surface:** new `src/components/KickoffTaskMap.astro`, `src/pages/library/[slug].astro`, `src/content/assets/kickoff-task-map.md`
**Origin:** ported from `~/Downloads/tractionlab_kickoff_map.jsx` (React) — adapted to static Astro + vanilla JS.

## Goal

Ship the "Interactive version" promised on the Kickoff Task Map page: enter a kickoff date + project name, and generate the full dated task map — milestone dates, an engagement-timeline gantt, collapsible week cards with checkable tasks, and copy-to-Basecamp — with per-project progress persisted.

## Decisions

- **Dark theme** matching the library (navy/coral/muted-blue, serif headings) — not the light theme in the JSX.
- **Business days skip Saturday AND Sunday** (fixes the JSX `addDays`, which skipped Sundays only). Day 1 = the kickoff date as entered.
- **No React / no deps.** Ported to an Astro component with vanilla JS. `lucide-react` icons → unicode (`✓`, `◆`, caret `▸`). Data (`WEEKS`, `MILESTONES`) defined in frontmatter, passed to the client script via `define:vars`.
- **Persistence:** `localStorage`, key `tractionlab-map:<project-name-lowercased>`, storing `{ kickoff, isMobile, checked }`. Replaces the JSX's `window.storage` (Claude-artifacts API, not real-browser).
- **Styles `is:global`, scoped under a `.ktm` root class** — required because the map DOM is generated client-side via innerHTML and would not receive Astro's scoped-style attribute.

## Behavior

- Inputs: kickoff `date`, project-name `text`, "includes a mobile app" checkbox, **Generate map** button (disabled until a date is set).
- On generate (and on load if a named project has saved data): render milestone strip (Day 30 / Day 90 as real dates) → timeline gantt (4 week segments alternating coral/purple + dashed HDD tail from day 29 + milestone `◆` flags, `TOTAL_DAYS = 96`) → progress line + **Copy as Basecamp list** → collapsible week `<details>` cards (Week 1 open by default) with per-task rows.
- Task row: click or Space/Enter toggles; box shows `✓`; label strikes through; `Critical` pill on critical tasks; per-task computed date. Toggling updates the progress line and persists.
- Mobile-only tasks (Apple Developer, DUNS, Google Play) render only when the toggle is on. Changing the toggle re-renders.
- Copy builds a plain-text Basecamp list (dates, `(CRITICAL)` markers, milestones) to the clipboard; button flips to "Copied!" for 2s.

## Placement

`library/[slug].astro`: import `KickoffTaskMap`; render `<KickoffTaskMap />` between the page header and the markdown `<article>` when `entry.id === 'kickoff-task-map'` (only interactive tool today — a simple slug check, no schema change).

`kickoff-task-map.md`: drop the "Interactive version — coming soon" section (it's now live above). Keep the downloadable checklist, reframed as the offline/paste companion. Trim the intro paragraph that duplicates the tool's own framing.

## Out of scope

- No React, no new dependencies, no analytics events.
- `Checklist.astro` is not reused — this tool has its own richer week card (dates, gantt). Intentional.
- Other project checklists and the downloadable checklist doc's content are unchanged.
