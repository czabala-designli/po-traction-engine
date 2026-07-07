# Library v2 — Playbook Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the library from a flat template catalog into the TractionLab playbook — one unified `assets` collection (kind + phase) rendered as a phase-by-phase timeline home.

**Architecture:** Rename the `templates` content collection to `assets`, adding `kind` (template/play/tool) and `phase` fields. The single detail route becomes `/library/[slug]` and renders any kind (templates keep the sandboxed preview iframe; plays/tools have none). The home groups assets by an ordered `phase` enum. Existing prompt files in `docs/prompts/` are served via `/starters/` endpoints so "live" plays can link to them. Tools are listed (card + description/link), not rebuilt.

**Tech Stack:** Astro `^6.4.4` Content Layer API (`glob()` loader, Zod), `@astrojs/vercel`, plain Markdown, vanilla CSS. No new dependencies.

## Global Constraints

- Node `>=22.12.0`; Astro `^6.4.4`. **No new dependencies, no MDX, no test framework.**
- Fully static; only `src/pages/api/feedback.ts` uses `prerender = false`. PostHog is the only data layer; no backend/DB/auth.
- Reuse brand tokens from `Layout.astro` global CSS (`var(--navy|navy-card|navy-mid|coral|purple|off-white|white|muted-blue|serif|sans|bar-w)`). Do not hardcode brand colors that duplicate tokens — derive translucent/tint variants with `color-mix(in srgb, var(--token) N%, transparent|white)`.
- The feedback widget ships on every page (already via `Layout.astro`) — do not add per-page instances.
- **No test framework:** per-task verification = `npm run build` (Zod validation + `getStaticPaths`) + controller-run Chrome DevTools MCP visual checks on `npm run dev`. Implementers run the build; the controller does the browser QA.
- Downloadable artifacts use self-explanatory kebab-case filenames, served from `/starters/`, with `download="<same-name>"` on the link. Never a generic download name.
- Phase enum + labels (order matters):
  `foundation`→"Week 1 · Foundation", `activation`→"Week 2 · Activation", `conversion`→"Week 3 · Conversion", `learning`→"Week 4 · Learning", `hdd`→"Week 5+ · HDD Mode", `marketing`→"Ongoing · Marketing (Traction Menu)".
- Commit trailer, exact: `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`. Push each task to `origin reshape/traction-library` (NOT main).

## File map

- Modify: `src/content.config.ts` — `templates`→`assets` (+kind, phase, starter); `projects.templatesUsed`→`assetsUsed`.
- Rename+modify: `src/pages/templates/[slug].astro` → `src/pages/library/[slug].astro`.
- Modify: `src/pages/projects/[slug].astro` — new collection name, `assetsUsed`, `/library/` links.
- Modify: `src/pages/index.astro` — timeline home (Task 4).
- Rename: `src/content/templates/*.md` → `src/content/assets/*.md` (+ new frontmatter).
- Create: `src/components/KindBadge.astro`.
- Create: 6 play files + 2 tool files in `src/content/assets/`.
- Create: 3 endpoints in `src/pages/starters/` for the prompt files.

---

### Task 1: Content model migration (`assets` collection + route rename)

Rename the collection and route with **no behavior change** — the site still works exactly like v1, just on the new model and `/library/` route. Build must stay green.

**Files:**
- Modify: `src/content.config.ts`
- Rename: `src/content/templates/waitlist-landing-page.md` → `src/content/assets/waitlist-landing-page.md` (+ frontmatter)
- Rename: `src/content/templates/signup-landing-page.md` → `src/content/assets/signup-landing-page.md` (+ frontmatter)
- Rename: `src/content/templates/blog-section.md` → `src/content/assets/blog-section.md` (+ frontmatter)
- Rename: `src/pages/templates/[slug].astro` → `src/pages/library/[slug].astro` (+ collection name)
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/pages/index.astro` (minimal: collection name + `/library/` link; full timeline is Task 4)

**Interfaces:**
- Produces: `getCollection('assets')` entries with `.data = { title, kind: 'template'|'play'|'tool', phase: PhaseSlug, status: 'live'|'coming-soon', summary, previewUrl?, starter: boolean, order }`; `.id` = filename slug.
- Produces: `getCollection('projects')` entries with `.data.assetsUsed: string[]` (renamed from `templatesUsed`).
- Produces: detail route `/library/[slug]`.

- [ ] **Step 1: Rewrite `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const assets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/assets' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['template', 'play', 'tool']),
    phase: z.enum(['foundation', 'activation', 'conversion', 'learning', 'hdd', 'marketing']),
    status: z.enum(['live', 'coming-soon']),
    summary: z.string(),
    previewUrl: z.string().optional(),
    starter: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'complete']),
    summary: z.string(),
    assetsUsed: z.array(z.string()).default([]),
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

export const collections = { assets, projects };
```

- [ ] **Step 2: Move the three template files into `assets/` and update frontmatter**

```bash
mkdir -p src/content/assets
git mv src/content/templates/waitlist-landing-page.md src/content/assets/waitlist-landing-page.md
git mv src/content/templates/signup-landing-page.md src/content/assets/signup-landing-page.md
git mv src/content/templates/blog-section.md src/content/assets/blog-section.md
```

Then set each file's frontmatter (leave the Markdown bodies unchanged).

`src/content/assets/waitlist-landing-page.md` frontmatter:
```yaml
---
title: "Waitlist Landing Page"
kind: "template"
phase: "foundation"
status: "live"
summary: "A static landing page that collects waitlist signups straight into PostHog — no backend."
previewUrl: "/waitlist"
starter: true
order: 2
---
```

`src/content/assets/signup-landing-page.md` frontmatter:
```yaml
---
title: "Signup Landing Page"
kind: "template"
phase: "conversion"
status: "coming-soon"
summary: "A conversion-focused page for a product that already exists — drive account signups, not waitlist joins."
order: 1
---
```

`src/content/assets/blog-section.md` frontmatter:
```yaml
---
title: "Blog Section"
kind: "template"
phase: "marketing"
status: "coming-soon"
summary: "A static, content-collection-driven blog you can bolt onto any Astro site for SEO and top-of-funnel traction."
order: 1
---
```

- [ ] **Step 3: Rename the detail route and point it at `assets`**

```bash
mkdir -p src/pages/library
git mv src/pages/templates/\[slug\].astro src/pages/library/\[slug\].astro
rmdir src/pages/templates
```

In `src/pages/library/[slug].astro`, change the `getStaticPaths` collection name (line 7) from:
```ts
  const entries = await getCollection('templates');
```
to:
```ts
  const entries = await getCollection('assets');
```
(Leave the rest of the file unchanged in this task — Task 2 adds the kind badge.)

- [ ] **Step 4: Update the project page** (`src/pages/projects/[slug].astro`)

Replace the frontmatter script (lines 7–22) with:
```ts
export async function getStaticPaths() {
  const projects = await getCollection('projects');
  const assets = await getCollection('assets');
  return projects.map((entry) => ({
    params: { slug: entry.id },
    props: { entry, assets },
  }));
}

const { entry, assets } = Astro.props;
const { Content } = await render(entry);
const { title, status, summary, assetsUsed, checklist } = entry.data;

const usedAssets = assetsUsed
  .map((slug) => assets.find((a) => a.id === slug))
  .filter((a): a is NonNullable<typeof a> => Boolean(a));
```

Replace the "Templates used" block (lines 34–43) with:
```astro
    {usedAssets.length > 0 && (
      <section class="used">
        <p class="section-label">Assets used</p>
        <div class="chips">
          {usedAssets.map((a) => (
            <a class="chip" href={`/library/${a.id}`}>{a.data.title}</a>
          ))}
        </div>
      </section>
    )}
```

- [ ] **Step 5: Rename the project's `templatesUsed` field**

In `src/content/projects/the-traction-engine.md` frontmatter, rename the key `templatesUsed:` to `assetsUsed:` (value unchanged: `["waitlist-landing-page"]`).

- [ ] **Step 6: Minimal home update to compile** (`src/pages/index.astro`)

Change the collection name (the `getCollection('templates')` call) to `getCollection('assets')`, and update the Waitlist "start here" callout href and the template card links from `/templates/${...}` / `/templates/waitlist-landing-page` to `/library/${...}` / `/library/waitlist-landing-page`. Leave the flat layout as-is for now (Task 4 replaces it). Concretely:
- `const templates = (await getCollection('templates'))...` → `const templates = (await getCollection('assets'))...`
- `href="/templates/waitlist-landing-page"` → `href="/library/waitlist-landing-page"`
- ``href={`/templates/${t.id}`}`` → ``href={`/library/${t.id}`}``

- [ ] **Step 7: Build to verify green**

Run: `npm run build`
Expected: succeeds; prerenders `/`, `/waitlist`, `/library/waitlist-landing-page`, `/library/signup-landing-page`, `/library/blog-section`, `/projects/the-traction-engine`, `/privacy`, `/terms`, `/starters/claude-md-landing-page-starter.md`. No route under `/templates/`.

- [ ] **Step 8: Commit**

```bash
git add -A src/content.config.ts src/content/assets src/content/templates src/pages/library src/pages/templates src/pages/projects src/pages/index.astro src/content/projects
git commit -m "Migrate to unified assets collection and /library route (no behavior change)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin reshape/traction-library
```

---

### Task 2: KindBadge component + show kind on the detail page

**Files:**
- Create: `src/components/KindBadge.astro`
- Modify: `src/pages/library/[slug].astro`

**Interfaces:**
- Consumes: `entry.data.kind` (`'template'|'play'|'tool'`).
- Produces: `<KindBadge kind={string} />` rendering a labeled pill (Template / Play / Tool).

- [ ] **Step 1: Create `src/components/KindBadge.astro`**

```astro
---
interface Props {
  kind: string;
}
const { kind } = Astro.props;

const LABELS: Record<string, string> = {
  template: 'Template',
  play: 'Play',
  tool: 'Tool',
};
const label = LABELS[kind] ?? kind;
---
<span class:list={['kind', `kind-${kind}`]}>{label}</span>

<style>
  .kind {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 3px;
    white-space: nowrap;
    color: var(--muted-blue);
    background: rgba(139, 143, 191, 0.08);
    border: 1px solid var(--navy-mid);
  }
  .kind-play {
    color: color-mix(in srgb, var(--purple) 45%, white);
    border-color: color-mix(in srgb, var(--purple) 50%, transparent);
    background: color-mix(in srgb, var(--purple) 12%, transparent);
  }
</style>
```

- [ ] **Step 2: Show the kind badge on the detail header** (`src/pages/library/[slug].astro`)

Add the import after the `StatusBadge` import:
```astro
import KindBadge from '../../components/KindBadge.astro';
```
Add `kind` to the destructure:
```ts
const { title, status, summary, previewUrl, kind } = entry.data;
```
Replace the header badge line (`<StatusBadge status={status} />` inside `<header class="head">`) with:
```astro
      <div class="badges"><KindBadge kind={kind} /><StatusBadge status={status} /></div>
```
Add to the `<style>` block:
```css
  .badges { display: flex; gap: 8px; margin-bottom: 4px; }
```

- [ ] **Step 3: Build + verify**

Run: `npm run build`
Expected: succeeds; all `/library/*` routes still prerender.

- [ ] **Step 4: Commit**

```bash
git add src/components/KindBadge.astro src/pages/library/\[slug\].astro
git commit -m "Add KindBadge and show asset kind on the detail page

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin reshape/traction-library
```

---

### Task 3: Seed plays, tools, and the prompt-serving endpoints

Add the 3 live plays, 4 coming-soon play stubs, 2 tool entries, and 3 `/starters/` endpoints that serve the existing prompt files so the live plays can link to them.

**Files:**
- Create: `src/pages/starters/feedback-widget-web-prompt.md.ts`
- Create: `src/pages/starters/feedback-widget-mobile-prompt.md.ts`
- Create: `src/pages/starters/posthog-waitlist-email-workflow-prompt.md.ts`
- Create: `src/content/assets/value-proposition.md`
- Create: `src/content/assets/waitlist-email-sequence.md`
- Create: `src/content/assets/feedback-widget.md`
- Create: `src/content/assets/icp-persona-research.md`
- Create: `src/content/assets/brand-voice.md`
- Create: `src/content/assets/keyword-research.md`
- Create: `src/content/assets/hdd-experiments.md`
- Create: `src/content/assets/kickoff-task-map.md`
- Create: `src/content/assets/traction-menu.md`

**Interfaces:**
- Produces: `/starters/feedback-widget-web-prompt.md`, `/starters/feedback-widget-mobile-prompt.md`, `/starters/posthog-waitlist-email-workflow-prompt.md` (raw markdown).
- Produces: 9 new `assets` entries (7 plays, 2 tools).

- [ ] **Step 1: Create the three prompt-serving endpoints**

`src/pages/starters/feedback-widget-web-prompt.md.ts`:
```ts
import raw from '../../../docs/prompts/feedback_widget_prompt_web.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
```

`src/pages/starters/feedback-widget-mobile-prompt.md.ts`:
```ts
import raw from '../../../docs/prompts/feedback_widget_prompt_mobile.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
```

`src/pages/starters/posthog-waitlist-email-workflow-prompt.md.ts`:
```ts
import raw from '../../../docs/prompts/posthog_workflow_prompt.md?raw';

export const prerender = true;

export const GET = () =>
  new Response(raw, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
```

- [ ] **Step 2: Create the three LIVE plays**

`src/content/assets/icp-persona-research.md`:
```markdown
---
title: "ICP / Persona Research"
kind: "play"
phase: "activation"
status: "live"
summary: "Define your ICP and where they gather — a researched community list with post drafts and UTM links."
order: 1
---

Define who you're targeting and — critically — *where they gather*, so your Week-2 distribution has somewhere to aim. This is the fuel for the community posts, blog, and outreach in the Traction Menu.

## How to run it

In a Claude Code session for your project, run the **`/icp-research`** skill and follow the prompts. It guides you from ICP definition to a researched community list, saved to `docs/icp-communities-[archetype].md`.

## What it produces

- A one-pager per ICP archetype: the communities, subreddits, and groups where they actually gather.
- Ready-to-adapt post drafts for each community.
- UTM-tagged links per channel, so PostHog attributes every signup back to where it came from.
```

`src/content/assets/waitlist-email-sequence.md`:
```markdown
---
title: "Waitlist Email Sequence"
kind: "play"
phase: "foundation"
status: "live"
summary: "The 3-email waitlist drip (confirm → progress → launch) that runs on autopilot from the first signup."
order: 3
---

The three-email waitlist drip that runs on autopilot from the first signup — confirmation, a day-5 progress note, and a launch invite. Built on PostHog Workflows (Loops.so is the fallback if Workflows aren't on your plan).

## What it does

- Triggered by the `waitlist_signup_submitted` event.
- Email 1 (immediate) confirmation → Email 2 (day 5) progress → Email 3 launch invite (fired manually when the product is ready).
- Personalized with `first_name`; trigger-masked on email so nobody gets the sequence twice.

## The prompt

<a href="/starters/posthog-waitlist-email-workflow-prompt.md" download="posthog-waitlist-email-workflow-prompt.md"><strong>Download the workflow prompt</strong></a> (or <a href="/starters/posthog-waitlist-email-workflow-prompt.md" target="_blank" rel="noopener">view it raw</a> in a new tab), then run it in your Claude Code session.
```

`src/content/assets/feedback-widget.md`:
```markdown
---
title: "Feedback Widget"
kind: "play"
phase: "foundation"
status: "live"
summary: "Turn visitor and user feedback into GitHub Issues + Slack notifications, on every surface."
order: 4
---

The feedback widget turns visitor and user input into GitHub Issues plus Slack notifications. It ships on the landing page and on every user-facing surface after it — it's the standard signal-capture mechanism across the whole engagement.

## What it does

- Feedback types: Suggestion / Bug / Question (plus a Progress-update type for internal logging).
- Captures the current URL as a breadcrumb; optional email.
- On submit: creates a GitHub Issue and posts a Slack notification to the project channel.

## The prompts

Run the one that matches your surface in a Claude Code session:

- **Web** (Astro, Next, etc.) — <a href="/starters/feedback-widget-web-prompt.md" download="feedback-widget-web-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-web-prompt.md" target="_blank" rel="noopener">view raw</a>).
- **Mobile** (React Native, shake-to-report) — <a href="/starters/feedback-widget-mobile-prompt.md" download="feedback-widget-mobile-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-mobile-prompt.md" target="_blank" rel="noopener">view raw</a>).
```

- [ ] **Step 3: Create the four COMING-SOON play stubs**

`src/content/assets/value-proposition.md`:
```markdown
---
title: "Value Proposition"
kind: "play"
phase: "foundation"
status: "coming-soon"
summary: "Draft a value proposition that leads with the outcome — the core message for the page and first email."
order: 1
---

Draft a value proposition that leads with the outcome, not features — the core message for your landing page and your first email.

_Coming soon — this play will wrap the value-proposition prompt from the PO Playbook._
```

`src/content/assets/brand-voice.md`:
```markdown
---
title: "Brand Voice"
kind: "play"
phase: "marketing"
status: "coming-soon"
summary: "A consistent brand voice / writing style for blog posts and community outreach."
order: 2
---

Define a brand voice / writing style to apply consistently across blog posts and community outreach.

_Coming soon — being proven on a live engagement right now._
```

`src/content/assets/keyword-research.md`:
```markdown
---
title: "Keyword Research"
kind: "play"
phase: "marketing"
status: "coming-soon"
summary: "Find the keywords your ICP searches, to aim blog content at real demand."
order: 3
---

Find the keywords your ICP actually searches, so blog content targets real search demand (SEMrush-based).

_Coming soon — being proven on a live engagement right now._
```

`src/content/assets/hdd-experiments.md`:
```markdown
---
title: "HDD Experiments"
kind: "play"
phase: "hdd"
status: "coming-soon"
summary: "Run every post-launch change as a hypothesis with a PostHog experiment."
order: 1
---

From Week 5 on, every change is framed as a hypothesis with a measurable metric and a PostHog experiment set up *before* it ships.

_Coming soon — this play will wrap the HDD hypothesis and experiment-design prompts._
```

- [ ] **Step 4: Create the two TOOL entries**

`src/content/assets/kickoff-task-map.md`:
```markdown
---
title: "Kickoff Task Map"
kind: "tool"
phase: "foundation"
status: "coming-soon"
summary: "Enter a kickoff date, get the full dated TractionLab checklist through Day 30 and Day 90."
order: 5
---

An interactive dated task map: enter a kickoff date and get the full TractionLab checklist — every task and milestone through Day 30 (first user) and Day 90 (first dollar), ready to paste into Basecamp.

_Coming soon in the library — currently a standalone artifact being ported here._
```

`src/content/assets/traction-menu.md`:
```markdown
---
title: "Traction Menu"
kind: "tool"
phase: "marketing"
status: "live"
summary: "The running 60-day menu of traction actions — content, community, SEO, backlinks."
order: 4
---

The running menu of traction actions — blog/SEO, community interaction and posts, backlinks — planned across the 60-day window and expanded as you learn.

## Where it lives

The full Traction Menu is a live app: <a href="https://tractionmenu.apps.designli.io/" target="_blank" rel="noopener">tractionmenu.apps.designli.io ↗</a>
```

- [ ] **Step 5: Build + verify**

Run: `npm run build`
Expected: succeeds; prerenders the three new `/starters/*.md` routes and `/library/{icp-persona-research,waitlist-email-sequence,feedback-widget,value-proposition,brand-voice,keyword-research,hdd-experiments,kickoff-task-map,traction-menu}`. Confirm one served prompt is non-empty, e.g. grep the built `feedback-widget-web-prompt.md` for "feedback".

- [ ] **Step 6: Commit**

```bash
git add src/pages/starters src/content/assets
git commit -m "Seed plays (3 live + 4 stubs), 2 tools, and prompt-serving endpoints

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin reshape/traction-library
```

---

### Task 4: Rebuild the home as the phase timeline

Replace the flat home with phase-by-phase sections derived from the `assets` collection.

**Files:**
- Modify (replace): `src/pages/index.astro`

**Interfaces:**
- Consumes: `getCollection('assets')`, `getCollection('projects')`, `StatusBadge`, `KindBadge`.

- [ ] **Step 1: Replace `src/pages/index.astro` with the timeline home**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/Layout.astro';
import StatusBadge from '../components/StatusBadge.astro';
import KindBadge from '../components/KindBadge.astro';

const PHASES = [
  { slug: 'foundation', label: 'Week 1 · Foundation' },
  { slug: 'activation', label: 'Week 2 · Activation' },
  { slug: 'conversion', label: 'Week 3 · Conversion' },
  { slug: 'learning', label: 'Week 4 · Learning' },
  { slug: 'hdd', label: 'Week 5+ · HDD Mode' },
  { slug: 'marketing', label: 'Ongoing · Marketing (Traction Menu)' },
];

const assets = await getCollection('assets');
const projects = await getCollection('projects');
const starter = assets.find((a) => a.data.starter);

const phases = PHASES
  .map((p) => ({
    ...p,
    items: assets
      .filter((a) => a.data.phase === p.slug)
      .sort((a, b) => a.data.order - b.data.order),
  }))
  .filter((p) => p.items.length > 0);

const ctaFor = (kind) =>
  kind === 'template' ? 'View template →' : kind === 'tool' ? 'Open tool →' : 'View play →';
---
<Layout
  title="PO Traction Library — Designli"
  description="The 30/90-day TractionLab playbook for Designli POs — templates, plays, and tools in the order you run them."
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
        The TractionLab playbook — the templates, plays, and tools a Product Owner
        runs across the 30/90-day engagement, in the order you run them.
      </p>
      {starter && (
        <a class="start-here" href={`/library/${starter.id}`}>
          <span class="start-here-arrow" aria-hidden="true">▸</span>
          <span><strong>New here?</strong> Start with the {starter.data.title} — your first traction experiment.</span>
        </a>
      )}
    </header>

    {phases.map((p) => (
      <section class="phase">
        <h2 class="phase-title">{p.label}</h2>
        <div class="grid">
          {p.items.map((a) => (
            a.data.status === 'live' ? (
              <a class="card" href={`/library/${a.id}`}>
                <div class="badges"><KindBadge kind={a.data.kind} /><StatusBadge status={a.data.status} /></div>
                <h3 class="card-title">{a.data.title}</h3>
                <p class="card-summary">{a.data.summary}</p>
                <span class="card-cta">{ctaFor(a.data.kind)}</span>
              </a>
            ) : (
              <div class="card card-disabled">
                <div class="badges"><KindBadge kind={a.data.kind} /><StatusBadge status={a.data.status} /></div>
                <h3 class="card-title">{a.data.title}</h3>
                <p class="card-summary">{a.data.summary}</p>
              </div>
            )
          ))}
        </div>
      </section>
    ))}

    <section class="phase">
      <h2 class="phase-title">Projects</h2>
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

  .start-here {
    display: inline-flex; align-items: baseline; gap: 10px;
    margin-top: 28px; max-width: 640px; padding: 12px 16px;
    border: 1px solid rgba(248, 117, 101, 0.35); border-left: 3px solid var(--coral);
    border-radius: 6px; background: rgba(248, 117, 101, 0.06);
    color: var(--off-white); font-size: 14px; line-height: 1.6;
    text-decoration: none; transition: background 0.18s, border-color 0.18s;
  }
  .start-here:hover { background: rgba(248, 117, 101, 0.12); border-color: var(--coral); }
  .start-here strong { color: var(--coral); font-weight: 700; }
  .start-here-arrow { color: var(--coral); font-weight: 700; }

  .phase { margin-bottom: 48px; }
  .phase-title { font-family: var(--serif); font-size: clamp(20px, 2.6vw, 26px); font-weight: 400; color: var(--white); margin-bottom: 22px; border-top: 1px solid var(--navy-mid); padding-top: 24px; }

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
  .badges { display: flex; gap: 8px; flex-wrap: wrap; }
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

- [ ] **Step 2: Build + verify**

Run: `npm run build`
Expected: succeeds; `/` prerenders. (Controller then does the Chrome DevTools visual pass — see Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "Rebuild the home as the playbook phase timeline

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
git push origin reshape/traction-library
```

---

### Task 5: Final sweep — stale refs, full build, QA gate

**Files:**
- Verify only (fix any stragglers found).

- [ ] **Step 1: Confirm no stale references to the old collection or route**

Run:
```bash
grep -rn "getCollection('templates')\|/templates/\|templatesUsed" --include='*.astro' --include='*.ts' --include='*.md' src docs/superpowers/plans/2026-07-07-library-v2-playbook-timeline.md 2>/dev/null | grep -v node_modules
```
Expected: no matches in `src/` (references inside the plan/spec docs are fine). If any appear in `src/`, fix them (update to `assets` / `/library/`), rebuild, and amend the relevant commit or add a fix commit.

- [ ] **Step 2: Full build with the complete route list**

Run: `npm run build`
Expected: succeeds and prerenders `/`, `/waitlist`, `/privacy`, `/terms`, `/projects/the-traction-engine`, all `/library/*` (12 assets), and all `/starters/*.md` (4 files). No `/templates/*`.

- [ ] **Step 3: Controller QA gate (Chrome DevTools MCP, on `npm run dev`)**

The controller (not a subagent) runs the visual pass and confirms:
- Home shows phases in order (Foundation, Activation, Conversion, HDD, Marketing — Learning omitted as empty), each with kind + status badges; "Start here → Waitlist Landing Page" callout present.
- A live play (e.g. `feedback-widget`) opens, shows the Play kind badge, no iframe, and its download/view links resolve to the served prompt.
- `icp-persona-research` explains running `/icp-research`.
- The Waitlist template still shows its sandboxed preview iframe + starter download.
- The Traction Engine project still shows the checklist and its "Assets used" chip links to `/library/waitlist-landing-page`.
- Zero console errors across pages.

- [ ] **Step 4: Ledger + done**

Append completion to `.superpowers/sdd/progress.md`. No commit needed if Steps 1–2 found nothing to fix.

---

## Self-Review

**1. Spec coverage:**
- §2 unified `assets` collection (kind+phase) → Task 1. ✓
- §3 phase enum + order → Global Constraints + Task 4 `PHASES`. ✓
- §4 asset schema (incl. `starter`) + `projects.assetsUsed` rename → Task 1. ✓
- §5 kinds render (template iframe; play/tool none) + `/library/[slug]` route → Task 1 (route) + Task 2 (kind badge); the preview is already gated on `previewUrl` which only templates carry. ✓
- §6 timeline home (phases in order, kind+status badges, starter callout, empty phase omitted, projects at bottom) → Task 4. ✓
- §7 migrate 3 templates + 3 live plays + 4 stubs + 2 tools + `/starters/` prompt endpoints → Tasks 1 & 3. ✓
- §8 tools listed not ported; Kickoff Map coming-soon, Traction Menu live-external → Task 3. ✓
- §10 success criteria (routes, live plays, no stale refs) → Task 5. ✓

**2. Placeholder scan:** No TBD/TODO; every file has complete content; every command has expected output. The coming-soon stub bodies are intentional content (roadmap markers), not plan placeholders.

**3. Type consistency:** `assets` schema fields (`kind`, `phase`, `status`, `previewUrl`, `starter`, `order`) used consistently in Task 1 (schema), Task 2 (`kind` on detail), Task 4 (`phase`/`order`/`starter`/`status`/`kind` on home). `assetsUsed` consistent across config (Task 1 Step 1), project page (Task 1 Step 4), and project frontmatter (Task 1 Step 5). Phase slugs identical in the Zod enum, the `PHASES` array, and every asset's frontmatter. Route `/library/[slug]` consistent across detail route, home links, project chips, and start-here callout.
