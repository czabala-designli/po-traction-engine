# PO Traction Library Reshape — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the single waitlist landing page into an internal Astro library of PO traction templates (recipe cards) plus project case studies with living checklists.

**Architecture:** Static Astro 6 site. Two Content Collections (`templates`, `projects`) defined with the Content Layer API drive auto-generated pages and a self-maintaining home index. The existing waitlist page relocates to `/waitlist` and becomes a live template specimen. PostHog and the feedback widget move into the shared layout so every page inherits them. The feedback widget gains a "Progress update" type that feeds the checklist reconciliation workflow.

**Tech Stack:** Astro `^6.4.4`, `@astrojs/vercel` adapter, `posthog-js`, plain Markdown (no MDX), Zod (bundled via `astro:content`), vanilla JS/CSS. Vercel Hobby tier.

## Global Constraints

- Node `>=22.12.0`; Astro `^6.4.4` (Content Layer API — `src/content.config.ts` + `glob()` loader).
- **No new dependencies.** Specifically **no MDX**, no test framework, no UI libraries.
- **Fully static.** Only the existing `src/pages/api/feedback.ts` uses `prerender = false`; every new page is prerendered.
- **PostHog is the only data layer.** No backend, no database, no auth.
- Reuse brand tokens from `Layout.astro`'s global CSS: `--navy #0E1034`, `--navy-card #161A4A`, `--navy-mid #2A2F6A`, `--coral #F87565`, `--purple #58377B`, `--off-white #F3EFEF`, `--muted-blue #8B8FBF`, `--serif`, `--sans`, `--bar-w`.
- The feedback widget ships on **every** user-facing surface (achieved via the layout in Task 1).
- **No test framework exists.** Per-task verification = `npm run build` (runs Zod schema validation, `getCollection` typing, and `getStaticPaths`) plus a `npm run dev` visual check where noted.
- Commit message trailer (exact): `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.
- Deploy discipline: commit + push per task; a single production deploy (`vercel --prod`) happens once at the end (Task 7) after full verification. Pushing to `main` may also trigger Vercel's auto-deploy; every task leaves the site in a functional, deployable state.

---

### Task 1: Move the feedback widget into the shared layout

Put `FeedbackWidget` in `Layout.astro` so every page inherits it, and remove the now-redundant per-page include from the landing page. No behavior change for the user — the widget still appears exactly once.

**Files:**
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/index.astro` (remove import at line 4 and usage at line 111)

**Interfaces:**
- Consumes: existing `FeedbackWidget.astro` (no props).
- Produces: every page rendered through `Layout.astro` now includes exactly one `<FeedbackWidget />`.

- [ ] **Step 1: Add the widget import to the layout**

In `src/layouts/Layout.astro`, change the frontmatter imports (lines 1–2) from:

```astro
---
import PostHog from '../components/posthog.astro';
```

to:

```astro
---
import PostHog from '../components/posthog.astro';
import FeedbackWidget from '../components/FeedbackWidget.astro';
```

- [ ] **Step 2: Render the widget in the layout body**

In `src/layouts/Layout.astro`, change the body (currently lines 22–24) from:

```astro
  <body>
    <slot />
  </body>
```

to:

```astro
  <body>
    <slot />
    <FeedbackWidget />
  </body>
```

- [ ] **Step 3: Remove the redundant import from the landing page**

In `src/pages/index.astro`, delete this line (line 4):

```astro
import FeedbackWidget from '../components/FeedbackWidget.astro';
```

- [ ] **Step 4: Remove the redundant usage from the landing page**

In `src/pages/index.astro`, delete this line (line 111, just before `</Layout>`):

```astro
  <FeedbackWidget />
```

- [ ] **Step 5: Build to verify no errors**

Run: `npm run build`
Expected: build completes with no errors; `dist/` regenerates.

- [ ] **Step 6: Visual check — exactly one widget**

Run: `npm run dev`, open `http://localhost:4321/`.
Expected: exactly one "Feedback" button bottom-right; clicking it opens the panel; Escape closes it.

- [ ] **Step 7: Commit**

```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "Move feedback widget into shared layout so every page inherits it

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 2: Define content collections and seed content

Create the Content Layer config and the four seed Markdown files. The Zod schemas act as the test: malformed frontmatter fails the build.

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/templates/waitlist-landing-page.md`
- Create: `src/content/templates/signup-landing-page.md`
- Create: `src/content/templates/blog-section.md`
- Create: `src/content/projects/the-traction-engine.md`

**Interfaces:**
- Produces: two collections queryable via `getCollection('templates')` and `getCollection('projects')`.
  - `templates` entry `.data`: `{ title: string, status: 'live'|'coming-soon', summary: string, previewUrl?: string, order: number }`; `.id` = filename slug (e.g. `waitlist-landing-page`).
  - `projects` entry `.data`: `{ title: string, status: 'active'|'complete', summary: string, templatesUsed: string[], checklist: Array<{ label: string, done: boolean, note?: string }> }`; `.id` = filename slug.

- [ ] **Step 1: Create the collections config**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['live', 'coming-soon']),
    summary: z.string(),
    previewUrl: z.string().optional(),
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'complete']),
    summary: z.string(),
    templatesUsed: z.array(z.string()).default([]),
    checklist: z
      .array(
        z.object({
          label: z.string(),
          done: z.boolean(),
          note: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { templates, projects };
```

- [ ] **Step 2: Create the Waitlist template (live)**

Create `src/content/templates/waitlist-landing-page.md`:

```markdown
---
title: "Waitlist Landing Page"
status: "live"
summary: "A static landing page that collects waitlist signups straight into PostHog — no backend."
previewUrl: "/waitlist"
order: 1
---

A single-page, static waitlist landing page. It collects signups directly into
PostHog (the only data layer), fires clean analytics events, and needs no
backend, database, or auth. This is the exact pattern running live at
[`/waitlist`](/waitlist).

## When to use it

Reach for this the moment you have a value proposition and want to measure
demand before building anything. It is the fastest way to turn interest into a
measurable signal.

## The prompt

Paste this into your own Claude Code session inside a fresh Astro project:

    Build a static waitlist landing page in Astro. Requirements:
    - Hero with headline, subtitle, and a waitlist form (first name, email, optional "top problem").
    - On submit: fire a `waitlist_signup_submitted` PostHog event with first_name,
      email, top_problem, and source (UTM source from the URL if present), then call
      posthog.identify(email, { first_name, email, waitlisted: true }).
    - Hide the form and show an inline "You're on the list" confirmation — no redirect.
    - Persist the signed-up state in localStorage so returning visitors never see the form again.
    - No backend, no database. PostHog is the only data layer.

## Playbook

1. Confirm PostHog is installed and the public project key is in your `.env`.
2. Generate the page with the prompt above, then wire the form to your PostHog instance.
3. Verify `waitlist_signup_submitted` fires against your internal cohort before sharing.
4. Generate one UTM-tagged URL per channel — never share the untagged base URL.
5. Share, watch signups land in PostHog, and iterate on the copy.
```

- [ ] **Step 3: Create the Signup template (coming soon)**

Create `src/content/templates/signup-landing-page.md`:

```markdown
---
title: "Signup Landing Page"
status: "coming-soon"
summary: "A conversion-focused page for a product that already exists — drive account signups, not waitlist joins."
order: 2
---

The next template in the library. It will cover the pattern for a landing page
whose goal is real product signups rather than waitlist interest.

_Coming soon — this slot is a placeholder while the pattern is proven on a real project._
```

- [ ] **Step 4: Create the Blog template (coming soon)**

Create `src/content/templates/blog-section.md`:

```markdown
---
title: "Blog Section"
status: "coming-soon"
summary: "A static, content-collection-driven blog you can bolt onto any Astro site for SEO and top-of-funnel traction."
order: 3
---

A reusable blog section pattern built on Astro Content Collections — the same
approach that powers this library.

_Coming soon — this slot is a placeholder while the pattern is proven on a real project._
```

- [ ] **Step 5: Create the Traction Engine project case study**

Create `src/content/projects/the-traction-engine.md`:

```markdown
---
title: "The Traction Engine"
status: "active"
summary: "The origin project — dogfooding the entire PO traction playbook, in public, for other POs to learn from."
templatesUsed: ["waitlist-landing-page"]
checklist:
  - { label: "Waitlist landing page live and collecting signups", done: true }
  - { label: "PostHog installed and capturing pageviews site-wide", done: true }
  - { label: "Feedback widget → GitHub Issue → Slack flow working", done: true }
  - { label: "Privacy Policy and Terms pages live", done: true }
  - { label: "PostHog email DNS verified on designli.co", done: true, note: "Verified 2026-07-01" }
  - { label: "Re-trigger welcome emails for 3 backfilled early signups", done: false, note: "Pending since DNS verification" }
---

The Traction Engine is the project this whole library grows out of. Rather than
describe how a PO should drive traction, it *does* it — every template here was
first built and proven on this project.

## What happened

We started with a waitlist landing page collecting signups into PostHog, wired a
feedback widget that turns visitor input into GitHub Issues and Slack
notifications, and stood up the legal pages needed before sharing publicly. Along
the way we hit the real-world snags — PostHog email DNS verification, backfilling
early signups — that other POs will hit too.

## What we learned

The biggest unlock was treating PostHog as the only data layer and Claude Code as
the executor: landing page, analytics, and feedback routing all shipped without
touching a dev backlog. The checklist above is kept current through the feedback
widget's "Progress update" flow — this case study updates itself as the project moves.
```

- [ ] **Step 6: Build to verify schemas validate**

Run: `npm run build`
Expected: build completes; console shows content collections syncing with no Zod validation errors.

- [ ] **Step 7: Prove the schema catches errors (then revert)**

Temporarily change `status: "live"` to `status: "published"` in `waitlist-landing-page.md`, then run: `npm run build`
Expected: build FAILS with a Zod error naming the invalid `status` enum value.
Then revert the value back to `"live"` and re-run `npm run build`.
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/content.config.ts src/content/
git commit -m "Add templates and projects content collections with seed entries

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 3: Shared StatusBadge component

A small reused pill for Live / Coming Soon / Active / Complete states. Used by the home cards (Task 6) and both detail pages (Tasks 4–5).

**Files:**
- Create: `src/components/StatusBadge.astro`

**Interfaces:**
- Produces: `<StatusBadge status={string} />` where `status` is one of `live`, `coming-soon`, `active`, `complete`. Renders a styled `<span>` with a human label.

- [ ] **Step 1: Create the component**

Create `src/components/StatusBadge.astro`:

```astro
---
interface Props {
  status: string;
}
const { status } = Astro.props;

const LABELS: Record<string, string> = {
  'live': 'Live',
  'coming-soon': 'Coming Soon',
  'active': 'Active',
  'complete': 'Complete',
};
const label = LABELS[status] ?? status;
---
<span class:list={['badge', `badge-${status}`]}>{label}</span>

<style>
  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 3px;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .badge-live, .badge-active {
    color: var(--coral);
    background: rgba(248, 117, 101, 0.1);
    border-color: rgba(248, 117, 101, 0.35);
  }
  .badge-coming-soon {
    color: var(--muted-blue);
    background: rgba(139, 143, 191, 0.08);
    border-color: rgba(139, 143, 191, 0.3);
  }
  .badge-complete {
    color: #C9B8E0;
    background: rgba(88, 55, 123, 0.18);
    border-color: rgba(88, 55, 123, 0.5);
  }
</style>
```

- [ ] **Step 2: Build to verify it compiles**

Run: `npm run build`
Expected: PASS (component is unused so far; this only checks it compiles).

- [ ] **Step 3: Commit**

```bash
git add src/components/StatusBadge.astro
git commit -m "Add reusable StatusBadge component for library status pills

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 4: Recipe-card page — `/templates/[slug]`

A dynamic page per template: live preview (iframe) + rendered playbook/prompt Markdown.

**Files:**
- Create: `src/pages/templates/[slug].astro`

**Interfaces:**
- Consumes: `getCollection('templates')`, `render(entry)` from `astro:content`; `StatusBadge` from Task 3.
- Produces: routes `/templates/waitlist-landing-page`, `/templates/signup-landing-page`, `/templates/blog-section`.

- [ ] **Step 1: Create the dynamic page**

Create `src/pages/templates/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import StatusBadge from '../../components/StatusBadge.astro';

export async function getStaticPaths() {
  const entries = await getCollection('templates');
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
const { title, status, summary, previewUrl } = entry.data;
---
<Layout title={`${title} — PO Traction Library`} description={summary}>
  <main class="wrap">
    <a href="/" class="back">← Back to the library</a>

    <header class="head">
      <StatusBadge status={status} />
      <h1>{title}</h1>
      <p class="summary">{summary}</p>
    </header>

    {previewUrl ? (
      <section class="preview">
        <p class="section-label">Live preview</p>
        <div class="frame">
          <iframe src={previewUrl} title={`${title} live preview`} loading="lazy"></iframe>
        </div>
        <a href={previewUrl} class="open-link">Open the live page ↗</a>
      </section>
    ) : (
      <section class="preview">
        <div class="frame placeholder">Coming soon</div>
      </section>
    )}

    <article class="body">
      <Content />
    </article>
  </main>
</Layout>

<style>
  .wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 88px calc(var(--bar-w) + 24px) 96px 24px;
  }
  .back {
    display: inline-block;
    font-size: 12px;
    color: var(--muted-blue);
    text-decoration: none;
    margin-bottom: 28px;
  }
  .back:hover { color: var(--coral); }
  .head h1 {
    font-family: var(--serif);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 400;
    color: var(--white);
    line-height: 1.05;
    margin: 14px 0 12px;
  }
  .summary { font-size: 16px; line-height: 1.7; color: var(--muted-blue); }
  .preview { margin: 40px 0; }
  .section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--coral); margin-bottom: 12px;
  }
  .frame {
    border: 1px solid var(--navy-mid);
    border-radius: 10px;
    overflow: hidden;
    background: var(--navy-card);
  }
  .frame iframe { width: 100%; height: 520px; border: 0; display: block; }
  .frame.placeholder {
    display: flex; align-items: center; justify-content: center;
    height: 220px; color: var(--muted-blue);
    font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;
  }
  .open-link {
    display: inline-block; margin-top: 12px; font-size: 13px;
    color: var(--coral); text-decoration: none;
  }
  .open-link:hover { text-decoration: underline; }
  .body { margin-top: 48px; border-top: 1px solid var(--navy-mid); padding-top: 40px; }
  .body :global(h2) {
    font-family: var(--serif); font-weight: 400; color: var(--white);
    font-size: 24px; margin: 32px 0 14px;
  }
  .body :global(p) { font-size: 15px; line-height: 1.8; color: var(--off-white); margin-bottom: 16px; }
  .body :global(ol), .body :global(ul) { margin: 0 0 16px 20px; color: var(--off-white); line-height: 1.8; font-size: 15px; }
  .body :global(a) { color: var(--coral); }
  .body :global(pre) {
    background: var(--navy-card); border: 1px solid var(--navy-mid);
    border-radius: 8px; padding: 16px; overflow-x: auto; margin-bottom: 16px;
  }
  .body :global(code) { font-family: ui-monospace, 'SFMono-Regular', Menlo, monospace; font-size: 13px; color: var(--off-white); }
  .body :global(em) { color: var(--muted-blue); }
</style>
```

- [ ] **Step 2: Build to verify all three routes generate**

Run: `npm run build`
Expected: build output lists `/templates/waitlist-landing-page/`, `/templates/signup-landing-page/`, `/templates/blog-section/` as prerendered pages.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:4321/templates/waitlist-landing-page`.
Expected: status badge "Live", the playbook + prompt render, and the iframe shows the `/waitlist` page. Then open `/templates/signup-landing-page` and confirm the "Coming soon" placeholder shows (no iframe).

- [ ] **Step 4: Commit**

```bash
git add src/pages/templates/
git commit -m "Add recipe-card page rendering template preview, prompt, and playbook

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 5: Checklist component + case-study page — `/projects/[slug]`

A dynamic page per project: status, templates used, the living checklist, and the narrative.

**Files:**
- Create: `src/components/Checklist.astro`
- Create: `src/pages/projects/[slug].astro`

**Interfaces:**
- Consumes: `getCollection('projects')`, `render(entry)`; `StatusBadge` (Task 3); `Checklist` (this task).
- Produces: `<Checklist items={Array<{ label: string, done: boolean, note?: string }>} />`; route `/projects/the-traction-engine`.

- [ ] **Step 1: Create the Checklist component**

Create `src/components/Checklist.astro`:

```astro
---
interface ChecklistItem {
  label: string;
  done: boolean;
  note?: string;
}
interface Props {
  items: ChecklistItem[];
}
const { items } = Astro.props;
const doneCount = items.filter((i) => i.done).length;
---
<div class="checklist">
  <p class="progress">{doneCount} / {items.length} complete</p>
  <ul>
    {items.map((item) => (
      <li class:list={['item', { done: item.done }]}>
        <span class="mark" aria-hidden="true">{item.done ? '✓' : '○'}</span>
        <span class="text">
          {item.label}
          {item.note && <span class="note">{item.note}</span>}
        </span>
      </li>
    ))}
  </ul>
</div>

<style>
  .checklist {
    background: var(--navy-card);
    border: 1px solid var(--navy-mid);
    border-radius: 10px;
    padding: 20px 22px;
  }
  .progress {
    font-size: 10px; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--coral); margin-bottom: 14px;
  }
  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
  .item { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; line-height: 1.5; color: var(--off-white); }
  .mark { color: var(--muted-blue); font-weight: 700; line-height: 1.5; }
  .item.done .mark { color: var(--coral); }
  .item.done .text { color: var(--muted-blue); text-decoration: line-through; text-decoration-color: rgba(139,143,191,0.5); }
  .text { display: flex; flex-direction: column; gap: 2px; }
  .note { font-size: 12px; color: var(--muted-blue); font-style: italic; text-decoration: none; }
</style>
```

- [ ] **Step 2: Create the case-study page**

Create `src/pages/projects/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import StatusBadge from '../../components/StatusBadge.astro';
import Checklist from '../../components/Checklist.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  const templates = await getCollection('templates');
  return projects.map((entry) => ({
    params: { slug: entry.id },
    props: { entry, templates },
  }));
}

const { entry, templates } = Astro.props;
const { Content } = await render(entry);
const { title, status, summary, templatesUsed, checklist } = entry.data;

const usedTemplates = templatesUsed
  .map((slug) => templates.find((t) => t.id === slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
---
<Layout title={`${title} — PO Traction Library`} description={summary}>
  <main class="wrap">
    <a href="/" class="back">← Back to the library</a>

    <header class="head">
      <StatusBadge status={status} />
      <h1>{title}</h1>
      <p class="summary">{summary}</p>
    </header>

    {usedTemplates.length > 0 && (
      <section class="used">
        <p class="section-label">Templates used</p>
        <div class="chips">
          {usedTemplates.map((t) => (
            <a class="chip" href={`/templates/${t.id}`}>{t.data.title}</a>
          ))}
        </div>
      </section>
    )}

    <section class="checklist-section">
      <p class="section-label">Progress checklist</p>
      <Checklist items={checklist} />
    </section>

    <article class="body">
      <Content />
    </article>
  </main>
</Layout>

<style>
  .wrap { max-width: 820px; margin: 0 auto; padding: 88px calc(var(--bar-w) + 24px) 96px 24px; }
  .back { display: inline-block; font-size: 12px; color: var(--muted-blue); text-decoration: none; margin-bottom: 28px; }
  .back:hover { color: var(--coral); }
  .head h1 { font-family: var(--serif); font-size: clamp(32px, 5vw, 52px); font-weight: 400; color: var(--white); line-height: 1.05; margin: 14px 0 12px; }
  .summary { font-size: 16px; line-height: 1.7; color: var(--muted-blue); }
  .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); margin-bottom: 12px; }
  .used { margin: 36px 0; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    font-size: 12px; color: var(--off-white); text-decoration: none;
    padding: 6px 12px; border: 1px solid var(--navy-mid);
    border-radius: 5px; background: var(--navy-card); transition: border-color 0.15s, color 0.15s;
  }
  .chip:hover { border-color: var(--coral); color: var(--coral); }
  .checklist-section { margin: 36px 0; }
  .body { margin-top: 48px; border-top: 1px solid var(--navy-mid); padding-top: 40px; }
  .body :global(h2) { font-family: var(--serif); font-weight: 400; color: var(--white); font-size: 24px; margin: 32px 0 14px; }
  .body :global(p) { font-size: 15px; line-height: 1.8; color: var(--off-white); margin-bottom: 16px; }
  .body :global(a) { color: var(--coral); }
</style>
```

- [ ] **Step 3: Build to verify the route generates**

Run: `npm run build`
Expected: build output lists `/projects/the-traction-engine/` as prerendered.

- [ ] **Step 4: Visual check**

Run: `npm run dev`, open `http://localhost:4321/projects/the-traction-engine`.
Expected: status badge "Active", a "Waitlist Landing Page" chip linking to its recipe card, the checklist showing "5 / 6 complete" with the last item unchecked, and the narrative below.

- [ ] **Step 5: Commit**

```bash
git add src/components/Checklist.astro src/pages/projects/
git commit -m "Add case-study page with living checklist and templates-used links

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 6: Relocate waitlist and build the library home

Move the waitlist page to `/waitlist`, then replace `index.astro` with the library home that derives its grid and list from the collections.

**Files:**
- Rename: `src/pages/index.astro` → `src/pages/waitlist.astro` (via `git mv`)
- Modify: `src/pages/waitlist.astro` (update the analytics page name)
- Create: `src/pages/index.astro` (new library home)

**Interfaces:**
- Consumes: `getCollection('templates')`, `getCollection('projects')`; `StatusBadge` (Task 3).
- Produces: `/` = library home; `/waitlist` = the existing waitlist page (still functional, referenced by the Task 4 iframe).

- [ ] **Step 1: Relocate the waitlist page**

Run:

```bash
git mv src/pages/index.astro src/pages/waitlist.astro
```

- [ ] **Step 2: Update the analytics page label in the relocated file**

In `src/pages/waitlist.astro`, find (around line 116):

```javascript
    window.posthog?.capture('page_viewed', { page: 'landing' });
```

Change it to:

```javascript
    window.posthog?.capture('page_viewed', { page: 'waitlist' });
```

- [ ] **Step 3: Create the new library home**

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import StatusBadge from '../components/StatusBadge.astro';

const templates = (await getCollection('templates')).sort(
  (a, b) => a.data.order - b.data.order,
);
const projects = await getCollection('projects');
---
<Layout
  title="PO Traction Library — Designli"
  description="Battle-tested templates, prompts, and playbooks for Designli Product Owners driving early traction."
>
  <nav class="sticky-nav">
    <div class="nav-logo">
      <img src="/designli-logo.png" alt="Designli" width="20" height="20" />
      <span class="nav-logo-label">Designli</span>
    </div>
    <span class="nav-title">PO Traction Library</span>
  </nav>

  <main class="page">
    <header class="intro">
      <p class="eyebrow">Internal · Designli POs</p>
      <h1 class="headline">The PO Traction Library.</h1>
      <p class="subtitle">
        Battle-tested templates, the prompts that build them, and the playbooks
        behind them — plus live logs of the projects proving them out.
      </p>
    </header>

    <section class="block">
      <h2 class="block-title">Templates</h2>
      <div class="grid">
        {templates.map((t) => (
          t.data.status === 'live' ? (
            <a class="card" href={`/templates/${t.id}`}>
              <StatusBadge status={t.data.status} />
              <h3 class="card-title">{t.data.title}</h3>
              <p class="card-summary">{t.data.summary}</p>
              <span class="card-cta">View template →</span>
            </a>
          ) : (
            <div class="card card-disabled">
              <StatusBadge status={t.data.status} />
              <h3 class="card-title">{t.data.title}</h3>
              <p class="card-summary">{t.data.summary}</p>
            </div>
          )
        ))}
      </div>
    </section>

    <section class="block">
      <h2 class="block-title">Projects</h2>
      <div class="grid">
        {projects.map((p) => (
          <a class="card" href={`/projects/${p.id}`}>
            <StatusBadge status={p.data.status} />
            <h3 class="card-title">{p.data.title}</h3>
            <p class="card-summary">{p.data.summary}</p>
            <span class="card-cta">View case study →</span>
          </a>
        ))}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <img src="/designli-logo.png" alt="" width="14" height="14" aria-hidden="true" />
    <span>Designli · 2026</span>
    <span class="sep">·</span>
    <span>Internal initiative</span>
    <span class="sep">·</span>
    <a href="/privacy">Privacy Policy</a>
    <span class="sep">·</span>
    <a href="/terms">Terms &amp; Conditions</a>
  </footer>
</Layout>

<script is:inline>
  document.addEventListener('DOMContentLoaded', function () {
    window.posthog?.capture('page_viewed', { page: 'library-home' });
  });
</script>

<style>
  .sticky-nav {
    position: fixed; top: 0; left: var(--bar-w); right: 0; height: 52px;
    z-index: 200; display: flex; align-items: center; gap: 12px; padding: 0 20px;
    background: rgba(14, 16, 52, 0.92);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .nav-logo { display: flex; align-items: center; gap: 8px; }
  .nav-logo img { opacity: 0.9; object-fit: contain; }
  .nav-logo-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-blue); }
  .nav-title { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--off-white); }

  .page { max-width: 960px; margin: 0 auto; padding: 96px calc(var(--bar-w) + 24px) 40px 24px; }
  .intro { margin-bottom: 56px; }
  .eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.35em; text-transform: uppercase; color: var(--coral); margin-bottom: 20px; }
  .headline { font-family: var(--serif); font-size: clamp(38px, 6vw, 68px); font-weight: 400; color: var(--white); line-height: 1.0; margin-bottom: 24px; }
  .subtitle { font-family: var(--serif); font-size: clamp(16px, 2vw, 20px); line-height: 1.65; color: var(--muted-blue); max-width: 640px; }

  .block { margin-bottom: 56px; }
  .block-title { font-family: var(--serif); font-size: clamp(22px, 3vw, 30px); font-weight: 400; color: var(--white); margin-bottom: 24px; border-top: 1px solid var(--navy-mid); padding-top: 28px; }

  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  @media (max-width: 767px) { .grid { grid-template-columns: 1fr; } }

  .card {
    display: flex; flex-direction: column; gap: 10px;
    background: var(--navy-card); border: 1px solid var(--navy-mid);
    border-radius: 10px; padding: 22px; text-decoration: none;
    transition: border-color 0.18s, transform 0.18s;
  }
  a.card:hover { border-color: var(--coral); transform: translateY(-3px); }
  .card-disabled { opacity: 0.55; }
  .card-title { font-family: var(--serif); font-size: 19px; font-weight: 400; color: var(--white); line-height: 1.25; margin-top: 4px; }
  .card-summary { font-size: 13px; line-height: 1.7; color: var(--muted-blue); flex: 1; }
  .card-cta { font-size: 12px; font-weight: 700; letter-spacing: 0.05em; color: var(--coral); margin-top: 6px; }

  .site-footer {
    max-width: 960px; margin: 0 auto;
    padding: 24px calc(var(--bar-w) + 24px) 36px 24px;
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    font-size: 12px; color: var(--muted-blue);
    border-top: 1px solid rgba(255,255,255,0.04);
  }
  .site-footer img { opacity: 0.4; }
  .sep { opacity: 0.35; }
  .site-footer a { color: var(--muted-blue); text-decoration: none; }
  .site-footer a:hover { color: var(--coral); }

  @media (max-width: 640px) {
    .page { padding-left: calc(var(--bar-w) + 16px); padding-right: 16px; }
  }
</style>
```

- [ ] **Step 4: Build to verify both routes**

Run: `npm run build`
Expected: build output lists both `/` (index) and `/waitlist/` as prerendered pages, plus the template and project pages from earlier tasks.

- [ ] **Step 5: Visual check — the full flow**

Run: `npm run dev`.
- Open `/` → library home with a Templates grid (3 cards: Waitlist = Live/clickable, Signup + Blog = Coming Soon/dimmed) and a Projects grid (Traction Engine card).
- Click the Waitlist card → `/templates/waitlist-landing-page`; its iframe shows the working form.
- Open `/waitlist` directly → the original waitlist page still works (form submits, confirmation shows).
- Confirm exactly one feedback widget on every page.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/pages/waitlist.astro
git commit -m "Relocate waitlist to /waitlist and add derived library home

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

---

### Task 7: Add the "Progress update" widget type + label, then deploy

Add a fourth feedback type so progress logs become distinctly labeled GitHub issues, and finish with the production deploy of the whole v1.

**Files:**
- Modify: `src/components/FeedbackWidget.astro` (add radio option + `flex-wrap`)
- Modify: `src/pages/api/feedback.ts` (map the type to a clean `progress` label)

**Interfaces:**
- Consumes: existing `/api/feedback` POST contract `{ type, message, email, url }`.
- Produces: submitting type `"Progress update"` creates a GitHub issue titled `[Progress update] …` with the label `progress`.

- [ ] **Step 1: Add the radio option**

In `src/components/FeedbackWidget.astro`, inside `.fw-type-row` (after the Question option, around line 34), add:

```astro
          <label class="fw-type-option">
            <input type="radio" name="fw_type" value="Progress update" />
            <span>Progress</span>
          </label>
```

- [ ] **Step 2: Let the type row wrap**

In `src/components/FeedbackWidget.astro`, change `.fw-type-row` (around line 251) from:

```css
  .fw-type-row {
    display: flex;
    gap: 6px;
  }
```

to:

```css
  .fw-type-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
```

- [ ] **Step 3: Map the type to a clean label in the API**

In `src/pages/api/feedback.ts`, change the label array in the GitHub POST body (line 48) from:

```ts
      labels: [type.toLowerCase()],
```

to:

```ts
      labels: [type === 'Progress update' ? 'progress' : type.toLowerCase()],
```

- [ ] **Step 4: Build to verify**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Visual check — the widget**

Run: `npm run dev`, open any page, click Feedback.
Expected: four type options (Suggestion / Bug / Question / Progress) laid out without overflowing the 320px panel (wrapping to a second row is fine).

- [ ] **Step 6: Commit**

```bash
git add src/components/FeedbackWidget.astro src/pages/api/feedback.ts
git commit -m "Add Progress update feedback type feeding the checklist reconciliation flow

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin main
```

- [ ] **Step 7: Deploy v1 to production**

Run: `vercel --prod`
Expected: deploy succeeds; note the production URL.

- [ ] **Step 8: Production smoke test**

On the production URL:
- `/` shows the library home.
- `/waitlist` shows the working waitlist form.
- `/templates/waitlist-landing-page` renders with a working live-preview iframe.
- `/projects/the-traction-engine` renders with the checklist.
- Submit one "Progress update" through the widget; confirm a GitHub issue is created with the `progress` label, then close it (it was a smoke test): 
  ```bash
  gh issue close <number> --repo czabala-designli/po-traction-engine --comment "Smoke test of the new Progress update type — closing."
  ```

---

## Self-Review

**1. Spec coverage:**
- §5 routes → Tasks 4 (`/templates/[slug]`), 5 (`/projects/[slug]`), 6 (`/`, `/waitlist`). ✓
- §6 collections → Task 2 (config + seed, both schemas verbatim). ✓
- §7.1 home derives from collections → Task 6. ✓
- §7.2 recipe card (preview + prompt + playbook) → Task 4. ✓
- §7.3 case study (status, templates used, checklist, narrative) → Task 5. ✓
- §8 reconciliation workflow input (Progress update type + `progress` label) → Task 7. ✓ (The reconciliation *action* is a documented CLAUDE.md session flow, not code.)
- §9 site-wide analytics + widget-into-layout cleanup → Task 1 (widget), analytics already in layout (noted). ✓
- §10 waitlist migration + no redirect → Task 6. ✓
- §11 v1 scope (3 template slots + 1 project, no MDX/auth/shared checklists) → Tasks 2, 4, 5, 6. ✓
- §12 success criteria → covered by Task 6 Step 5 and Task 7 Step 8 smoke tests. ✓

**2. Placeholder scan:** No TBD/TODO; every code step shows complete code; every command has expected output. ✓

**3. Type consistency:** `StatusBadge` prop `status` used consistently (Tasks 3–6). `Checklist` prop `items` shape matches the `projects` schema `checklist` shape (Tasks 2, 5). `getCollection`/`render` and `entry.id`/`entry.data` usage consistent across Tasks 4–6. API contract `{ type, message, email, url }` unchanged (Task 7). ✓
