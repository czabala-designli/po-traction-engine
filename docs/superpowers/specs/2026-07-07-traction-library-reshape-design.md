# Design Spec — Reshape into the Designli PO Traction Library

**Date:** 2026-07-07
**Status:** Approved design — ready for implementation planning
**Owner:** Carlos Zabala (PO)

---

## 1. Purpose

Reshape this project from a single waitlist landing page into an **internal library and playbook for Designli Product Owners**. Its job is twofold:

1. **Lead by example** — apply, in one real place, everything a PO should do to drive traction.
2. **Distill what's reusable** — surface the templates, prompts, playbooks, and patterns that other POs can copy into their own projects.

The site is a **showcase / library** (not a workspace and not a collaborative app). POs come to browse battle-tested templates and read transparent project case studies, then take what they need back to their own work.

## 2. Audience & access

- **Internal to Designli POs only**, shared by link.
- On Vercel **Hobby tier there is no real password protection** (that's a Pro feature). "Internal" therefore means **unlisted** — live on the public web but only shared with people given the link. Content is templates and Designli's own project case studies, so unlisted is an accepted, conscious trade-off, not a security guarantee.

## 3. Constraints & principles

- **Fully static** Astro site. No backend, no database, no auth. (Unchanged from today.)
- **PostHog is the only data layer.** No new stores.
- **Hobby tier throughout.** Nothing in this design approaches Hobby limits (100 GB/mo bandwidth, 100 deploys/day). Confirmed capacity is not a constraint.
- **No unnecessary dependencies.** Specifically **no MDX** — plain Markdown for prose, `.astro` pages for anything interactive/visual.
- Reuse existing brand (`Layout.astro`, navy/coral palette, coral accent bar) and existing components.
- The feedback widget ships on **every** user-facing surface.

## 4. Chosen approach

**Astro Content Collections + plain Markdown for playbooks + `.astro` pages for live previews/mockups. No MDX.**

Rejected alternatives:
- *Plain `.astro` page per item* — doesn't scale; status badges and the home index would be hand-maintained and drift-prone; checklist state scattered.
- *Single data file driving everything* — centralized but crams long playbook prose into TypeScript strings, unpleasant to author.

Content Collections win because adding a template or project is a one-file drop, the home index derives itself, playbook prose stays readable in Markdown, and the checklist lives as structured frontmatter that is a clean one-file edit to reconcile.

## 5. Information architecture (routes)

```
/                     Library home — the index of everything (NEW)
/waitlist             Relocated waitlist page — live specimen + still functional (MOVED from /)
/templates/[slug]     Each template's recipe card: preview + prompt + playbook (NEW)
/projects/[slug]      Each project's case study: narrative + living checklist (NEW)
/mockups/[name]       Live .astro mockups that template previews point to (NEW, as needed)
/privacy, /terms      Unchanged
```

Same Astro static build, same Vercel project, same PostHog, same `Layout.astro`.

## 6. Content collections

### 6.1 `templates` — `src/content/templates/*.md`

Frontmatter schema:

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Waitlist Landing Page" |
| `status` | `"live" \| "coming-soon"` | Drives the badge and whether the card links out |
| `summary` | string | One-line description for the home grid |
| `previewUrl` | string (optional) | Internal live page, e.g. `/waitlist`. Omitted for `coming-soon` |
| `order` | number | Sort order in the home grid |

**Body (plain Markdown):** the playbook (how and why to build it) plus a copyable **prompt/spec** code block that a PO can run in their own Claude Code.

### 6.2 `projects` — `src/content/projects/*.md`

Frontmatter schema:

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "The Traction Engine" |
| `status` | `"active" \| "complete"` | Project lifecycle badge |
| `summary` | string | One-line description for the home list |
| `templatesUsed` | string[] | Slugs linking back to `templates` recipe cards |
| `checklist` | array of `{ label: string, done: boolean, note?: string }` | The living checklist — source of truth for progress |

**Body (plain Markdown):** the case-study narrative — what happened, what was learned.

## 7. Pages

### 7.1 Home `/` (library index)

Derives entirely from the collections — never hand-maintained:

1. **Header** — what this is: "Designli PO Traction Library — templates, playbooks, and live project logs."
2. **Templates grid** — a card per template (title, summary, **Live / Coming Soon** badge). Live cards link to their recipe card; coming-soon cards are visibly present but not clickable.
3. **Projects list** — a card per project case study with its status.
4. Feedback widget (inherited from layout).

### 7.2 `/templates/[slug]` (recipe card)

Top to bottom:
- Title + status
- **Live preview** — an `<iframe>` window into `previewUrl` (e.g. the working `/waitlist`), or a "coming soon" placeholder when there's no `previewUrl`
- **The prompt/spec** — a copyable code block ("run this in your own Claude Code")
- **Playbook** — the rendered Markdown body

### 7.3 `/projects/[slug]` (case study)

- Title + status + "templates used" (links back to the relevant recipe cards)
- **Living checklist** — rendered from `checklist` frontmatter as done / not-done items
- **Narrative** — the rendered Markdown body

## 8. Checklist reconciliation workflow

Extends the issue-response flow already documented in `CLAUDE.md`. The source of truth is the project's Markdown `checklist` frontmatter; the widget/issue is only the input signal.

1. A PO opens the feedback widget and logs progress. A new **"Progress update"** type is added to the widget's existing selector (currently Suggestion / Bug / Question) so these issues are **labeled distinctly** and easy to filter.
2. The widget creates a GitHub issue + Slack notification — existing plumbing, unchanged.
3. In a Claude Code session the PO says "process the progress updates." Claude reads the labeled issue(s) and **edits the relevant project's `checklist` frontmatter** (ticks items, adds new ones, adjusts the narrative if needed).
4. Claude **deploys → commits → pushes**, then **closes the issue with a comment + replies in the Slack thread** — exactly the flow in `CLAUDE.md`.

Audit trail = git history + GitHub issues + Slack. Fully static, no backend.

## 9. Site-wide analytics

- PostHog is already mounted in `Layout.astro`'s `<head>`, so **every page built on the shared layout gets analytics automatically** (autocaptured pageviews + clicks). The design rule: **all new pages use `Layout.astro`.**
- **Cleanup:** the feedback widget is currently added per-page, not in the layout. Move `FeedbackWidget` into `Layout.astro` next to `PostHog` so both analytics and the widget come free on every page and can't be forgotten.
- **Cost:** PostHog free tier (~1M events/mo) and client-side only — $0, no Vercel impact.
- **Optional (not in v1):** named events such as `template_viewed`, `template_prompt_copied`, `project_viewed` to measure engagement. Add once there's a clear question to answer.

## 10. Waitlist migration

- Move `src/pages/index.astro` → `src/pages/waitlist.astro` (now served at `/waitlist`).
- New `src/pages/index.astro` becomes the library home.
- `/waitlist` keeps working — it still collects signups into PostHog **and** serves as the live preview specimen for the Waitlist template.
- No redirect is needed for `/` itself. Any externally shared UTM links that point at the root will now land on the library home instead of the form; since usage is internal and early, this is accepted. Flag for attention only if a specific shared link needs to keep reaching the form.

## 11. v1 scope

**Ships in v1:**
- Library home (`/`), deriving from the collections.
- `templates/` with **3 slots**: Waitlist Landing Page (**live** → `/waitlist`), Signup Landing Page (**coming soon**), Blog Section (**coming soon**).
- `projects/` with **1**: The Traction Engine (case study + checklist, seeded from what is real today).
- Recipe-card renderer (`/templates/[slug]`) and case-study renderer (`/projects/[slug]`).
- "Progress update" type added to the feedback widget.
- Feedback widget moved into `Layout.astro`.
- Waitlist relocated to `/waitlist`.
- Brand, `Layout.astro`, and all existing components reused.

**Explicitly NOT in v1 (YAGNI):**
- MDX.
- Real auth / password protection.
- PostHog-backed or shared/multi-user checklists.
- Actual content for the Signup and Blog templates (slots only).
- Named engagement events.

## 12. Success criteria

- A PO can open `/`, see all three template slots with correct Live / Coming Soon status, click into the Waitlist recipe card, view it live, and copy its prompt.
- A PO can open the Traction Engine case study and see an accurate, current checklist.
- Logging a "Progress update" through the widget produces a labeled GitHub issue that Claude can reconcile into the checklist, then close + notify — end to end.
- PostHog records pageviews across every page.
- Adding a fourth template later requires only dropping one Markdown file into `src/content/templates/`.
