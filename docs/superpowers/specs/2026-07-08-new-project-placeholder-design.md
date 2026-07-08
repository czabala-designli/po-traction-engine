# New-project placeholder card + granular project checklist

**Date:** 2026-07-08
**Status:** Approved, implementing
**Surface:** `src/content.config.ts`, `src/components/StatusBadge.astro`, `src/pages/index.astro` (Projects grid), new `src/content/projects/new-project-template.md`

## Goal

Add a placeholder card to the Projects section showing what a brand-new project looks like on Day 0 — the full kickoff checklist with nothing done yet. The project checklist mirrors the granular kickoff checklist (`docs/tractionlab-kickoff-checklist.md`), which stays as-is as the source of truth.

## Decisions

- **Grouping:** mirror the kickoff doc — `Week 1 · Foundation`, `Week 2 · Activation`, `Week 3 · Conversion`, `Week 4 · Learning`, plus a `Milestones` group (Day 30 / Day 90). Keeps the Week/Learning framing (the kickoff doc is the granular reference; the home page's Day-0/30/90 model is a separate presentation).
- **Granularity:** every dated task from the kickoff doc, `done: false`. Day offset stays in the label; `[CRITICAL]`/`[MOBILE ONLY]` become the italic `note`. Sub-headers (PostHog/Brand/…) collapse — the Checklist component is single-level; day order preserves readability.
- **Template marking:** new `template` project status → muted, dashed **TEMPLATE** badge; card gets a dashed border. Not a real active/complete project.
- **Card progress:** project cards on the home grid gain a `done / total complete` line (applies to all projects). Placeholder shows `0 / 38 complete`.
- **Placement:** placeholder renders **last** in the Projects grid so the real case study stays primary.

## Changes

1. **`src/content.config.ts`** — projects `status` enum: add `'template'` → `z.enum(['active', 'complete', 'template'])`.
2. **`src/components/StatusBadge.astro`** — add `'template': 'Template'` label + `.badge-template` style (muted-blue text, transparent bg, dashed border).
3. **`src/pages/index.astro`** (Projects section):
   - Sort so `status === 'template'` cards sort last.
   - Each project card: compute `done = checklist.filter(i => i.done).length`, `total = checklist.length`; render `<p class="proj-progress">{done} / {total} complete</p>` between summary and CTA.
   - Template cards get `card-template` class (dashed border).
4. **`src/content/projects/new-project-template.md`** — new file:
   - `title: "Your project starts here"`, `status: "template"`, `assetsUsed: []`
   - `summary`: "What every new project looks like on Day 0 — the full kickoff checklist, nothing done yet. Copy it to track your own run."
   - `checklist`: 38 items (all `done: false`) transcribed from the kickoff doc, grouped by the milestones above.
   - Body: short note explaining this is a template, and that a real project's checklist updates via the feedback widget's Progress-update flow.

## Out of scope

- The existing Traction Engine project's checklist (leave as-is).
- The downloadable kickoff checklist doc (stays the granular source of truth).
- No change to the Checklist component itself (already renders milestone groups + progress count).
