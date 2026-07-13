# Phase 3 — Persistent Sidebar Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent, phase-grouped left sidebar (mobile drawer) across the site, feature the Task Map Generator on the homepage, and add prev/next sequence links to library pages.

**Architecture:** A self-contained `SideNav.astro` fetches the content collections itself and mounts in `Layout.astro` on every page (opt-out prop for the `/waitlist` specimen). A shared `src/lib/nav.ts` module owns the one ordering rule used by both the sidebar and the prev/next links. Homepage and `library/[slug]` get small additive edits.

**Tech Stack:** Astro (static), vanilla JS + CSS. No new dependencies, no test framework.

## Global Constraints

- **Static only** — no SSR, no API routes, no new dependencies (vanilla JS/CSS only). Do NOT add a test framework.
- **Verification is build + browser** — `npm run build` must pass, then verify behavior in a browser against the dev server (`npm run dev`, http://localhost:4321). There are no unit tests in this repo; do not create any.
- **House copy style** — never use a spaced em dash (" — ") in any drafted UI copy. Use commas, colons, periods, or parentheses.
- **Brand tokens** (already in `Layout.astro` `:root`): `--navy #0E1034`, `--navy-card #161A4A`, `--navy-mid #2A2F6A`, `--coral #F87565`, `--purple #58377B`, `--off-white #F3EFEF`, `--white #FFFFFF`, `--muted-blue #8B8FBF`, `--bar-w 5px`, `--serif Georgia…`, `--sans Calibri…`. `--purple-light #A78BC4` is used inline elsewhere.
- **Deploy discipline** (after the whole plan is verified, not per task unless asked): `vercel --prod` → commit → `git push`.

---

### Task 1: Shared nav module, SideNav component, and Layout integration

**Files:**
- Create: `src/lib/nav.ts`
- Create: `src/components/SideNav.astro`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/pages/waitlist.astro:7-12` (add `sidebar={false}` to the `<Layout>` opening tag)

**Interfaces:**
- Produces: `src/lib/nav.ts` exports `PHASE_ORDER: string[]`, `BANDS: { label: string; phases: string[] }[]`, `orderedAssets(assets): Asset[]`, `sequenceNeighbors(assets, id): { prev: Asset | null; next: Asset | null }`, and `type Asset = CollectionEntry<'assets'>`. Task 3 consumes `sequenceNeighbors`.
- Produces: `Layout.astro` gains a `sidebar?: boolean` prop (default `true`) and a `--nav-w` CSS variable.

- [ ] **Step 1: Create the shared nav module**

Create `src/lib/nav.ts`:

```ts
import type { CollectionEntry } from 'astro:content';

export type Asset = CollectionEntry<'assets'>;

// Canonical journey phase order.
export const PHASE_ORDER = ['foundation', 'activation', 'conversion', 'hdd', 'marketing'];

// Day-bands shown as sidebar groups, each spanning a set of phases.
export const BANDS: { label: string; phases: string[] }[] = [
  { label: 'Days 1–30', phases: ['foundation', 'activation', 'conversion'] },
  { label: 'Days 31–90', phases: ['hdd', 'marketing'] },
];

// Canonical journey order: by phase, then by `order` within a phase.
export function orderedAssets(assets: Asset[]): Asset[] {
  return [...assets].sort(
    (a, b) =>
      PHASE_ORDER.indexOf(a.data.phase) - PHASE_ORDER.indexOf(b.data.phase) ||
      a.data.order - b.data.order,
  );
}

// Prev/next neighbors in the canonical order for a given asset id.
export function sequenceNeighbors(
  assets: Asset[],
  id: string,
): { prev: Asset | null; next: Asset | null } {
  const ordered = orderedAssets(assets);
  const i = ordered.findIndex((a) => a.id === id);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? ordered[i - 1] : null,
    next: i < ordered.length - 1 ? ordered[i + 1] : null,
  };
}
```

- [ ] **Step 2: Create the SideNav component**

Create `src/components/SideNav.astro`:

```astro
---
import { getCollection } from 'astro:content';
import { BANDS, orderedAssets } from '../lib/nav';

const assets = await getCollection('assets');
const projects = await getCollection('projects');
const ordered = orderedAssets(assets);

const bandGroups = BANDS.map((b) => ({
  label: b.label,
  items: ordered.filter((a) => b.phases.includes(a.data.phase)),
}));

const current = Astro.url.pathname.replace(/\/$/, '') || '/';
const isActive = (href: string) => (href.replace(/\/$/, '') || '/') === current;
---
<div class="nav-bar">
  <button type="button" class="nav-toggle" data-nav-toggle aria-label="Open navigation">☰</button>
  <a href="/" class="nav-bar-brand">
    <img src="/designli-logo.png" alt="Designli" width="18" height="18" />
    <span>PO Traction Library</span>
  </a>
</div>

<div class="nav-overlay" data-nav-overlay aria-hidden="true"></div>

<aside class="sidenav" data-sidenav>
  <a href="/" class:list={['brand', { 'is-active': isActive('/') }]}>
    <img src="/designli-logo.png" alt="Designli" width="22" height="22" />
    <span class="brand-label">PO Traction Library</span>
  </a>

  <nav class="nav-groups">
    <a class="nav-item nav-external" href="https://hdd.designli.co/po-traction" target="_blank" rel="noopener">
      Start with the why <span aria-hidden="true">↗</span>
    </a>

    <a class:list={['nav-item', { 'is-active': isActive('/day0') }]} href="/#day0">Day 0 · Before you start</a>

    {bandGroups.map((g) => (
      <div class="nav-group">
        <p class="nav-group-label">{g.label}</p>
        {g.items.map((a) => (
          <a
            class:list={['nav-item', { 'is-active': isActive(`/library/${a.id}`), 'is-soon': a.data.status !== 'live' }]}
            href={`/library/${a.id}`}
          >
            <span>{a.data.title}</span>
            {a.data.status !== 'live' && <span class="soon">soon</span>}
          </a>
        ))}
      </div>
    ))}

    <div class="nav-group">
      <p class="nav-group-label">Projects</p>
      {projects.map((p) => (
        <a class:list={['nav-item', { 'is-active': isActive(`/projects/${p.id}`) }]} href={`/projects/${p.id}`}>
          <span>{p.data.title}</span>
        </a>
      ))}
    </div>
  </nav>
</aside>

<script>
  const sidebar = document.querySelector('[data-sidenav]');
  const overlay = document.querySelector('[data-nav-overlay]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const open = () => { sidebar?.classList.add('open'); overlay?.classList.add('open'); };
  const close = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('open'); };
  toggle?.addEventListener('click', open);
  overlay?.addEventListener('click', close);
  sidebar?.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
</script>

<style>
  .sidenav {
    position: fixed; top: 0; left: 0; bottom: 0;
    width: var(--nav-w);
    background: var(--navy-card);
    border-left: 4px solid var(--coral);
    border-right: 1px solid var(--navy-mid);
    padding: 22px 0 32px;
    overflow-y: auto;
    z-index: 150;
    display: flex; flex-direction: column; gap: 8px;
  }
  .brand { display: flex; align-items: center; gap: 9px; padding: 0 20px 6px; text-decoration: none; }
  .brand img { object-fit: contain; }
  .brand-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--off-white); line-height: 1.3; }
  .brand.is-active .brand-label { color: var(--coral); }

  .nav-groups { display: flex; flex-direction: column; }
  .nav-group { display: flex; flex-direction: column; }
  .nav-group-label { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-blue); padding: 0 20px; margin: 14px 0 4px; }

  .nav-item {
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
    padding: 7px 20px; font-size: 13px; line-height: 1.35;
    color: var(--off-white); text-decoration: none;
    border-left: 2px solid transparent;
  }
  .nav-item:hover { color: var(--coral); background: rgba(248,117,101,0.06); }
  .nav-item.is-active { color: var(--coral); border-left-color: var(--coral); background: rgba(248,117,101,0.10); font-weight: 700; }
  .nav-item.is-soon { color: var(--muted-blue); }
  .nav-external { color: var(--purple-light, #A78BC4); }
  .soon { font-size: 8px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted-blue); border: 1px solid var(--navy-mid); border-radius: 5px; padding: 1px 5px; flex-shrink: 0; }

  .nav-bar { display: none; }
  .nav-overlay { display: none; }

  @media (max-width: 900px) {
    .nav-bar {
      display: flex; align-items: center; gap: 12px;
      position: sticky; top: 0; z-index: 140;
      height: 52px; padding: 0 16px;
      background: rgba(14,16,52,0.92);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .nav-toggle { background: none; border: none; color: var(--off-white); font-size: 20px; cursor: pointer; line-height: 1; padding: 4px 6px; }
    .nav-bar-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; color: var(--off-white); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

    .sidenav {
      width: 260px;
      transform: translateX(-100%);
      transition: transform 0.22s ease;
      z-index: 210;
    }
    .sidenav.open { transform: translateX(0); }

    .nav-overlay {
      display: block; position: fixed; inset: 0;
      background: rgba(0,0,0,0.5); opacity: 0; pointer-events: none;
      transition: opacity 0.22s ease; z-index: 200;
    }
    .nav-overlay.open { opacity: 1; pointer-events: auto; }
  }
</style>
```

- [ ] **Step 3: Integrate into Layout**

Modify `src/layouts/Layout.astro`. Replace the frontmatter and body, and add the global styles.

Frontmatter (replace lines 1-10):

```astro
---
import PostHog from '../components/posthog.astro';
import FeedbackWidget from '../components/FeedbackWidget.astro';
import SideNav from '../components/SideNav.astro';

interface Props {
  title: string;
  description?: string;
  sidebar?: boolean;
}

const { title, description = 'The Traction Engine — Coming Soon', sidebar = true } = Astro.props;
---
```

Body (replace the `<body>…</body>` block):

```astro
  <body class:list={[{ 'has-sidenav': sidebar }]}>
    {sidebar && <SideNav />}
    <div class="app-main">
      <slot />
    </div>
    <FeedbackWidget />
  </body>
```

In the `:root` block, add `--nav-w` right after the `--bar-w: 5px;` line:

```css
    --bar-w:      5px;
    --nav-w:      240px;
```

Add these rules at the end of the `<style is:global>` block (before `</style>`):

```css
  .app-main { min-height: 100vh; }
  body.has-sidenav .app-main { margin-left: var(--nav-w); }

  @media (min-width: 901px) {
    body.has-sidenav::before { display: none; }
  }
  @media (max-width: 900px) {
    :root { --nav-w: 0px; }
    body.has-sidenav .app-main { margin-left: 0; }
  }
```

- [ ] **Step 4: Opt the waitlist specimen out of the sidebar**

Modify `src/pages/waitlist.astro`. In the `<Layout …>` opening tag (around lines 7-12), add the `sidebar={false}` attribute alongside the existing `title`/`description` props. Example result:

```astro
<Layout
  title="…existing title…"
  description="…existing description…"
  sidebar={false}
>
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: ends with `[build] Complete!`, no errors.

- [ ] **Step 6: Verify desktop in browser**

Run `npm run dev`. In a browser at 1280px width:
- Visit `/` and `/library/value-proposition` and `/projects/the-traction-engine`. Confirm the left sidebar is present on all three, content is offset to its right (not hidden underneath), and the current page's sidebar item is highlighted coral.
- Confirm coming-soon items (e.g. Monetization Strategy, Blog Section) show muted with a "soon" tag.
- Visit `/waitlist`. Confirm there is NO sidebar (its own top nav with the variant switcher is intact).
- Confirm no horizontal scrollbar.

Optional scripted check (Chrome DevTools MCP `evaluate_script` on `/library/value-proposition`):

```js
() => ({
  sidebarPresent: !!document.querySelector('[data-sidenav]'),
  activeText: document.querySelector('.nav-item.is-active')?.textContent?.trim(),
  contentOffset: getComputedStyle(document.querySelector('.app-main')).marginLeft,
})
```
Expected: `sidebarPresent: true`, `activeText` contains "Value Proposition", `contentOffset: "240px"`.

- [ ] **Step 7: Commit**

```bash
git add src/lib/nav.ts src/components/SideNav.astro src/layouts/Layout.astro src/pages/waitlist.astro
git commit -m "Add persistent phase-grouped sidebar nav (site-review #3)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Mobile drawer verification + homepage reconcile

**Files:**
- Modify: `src/pages/index.astro` (remove the page-local sticky-nav + its CSS; add `id="day0"`; add the Task Map Generator callout)

**Interfaces:**
- Consumes: the sidebar/drawer and `--nav-w` from Task 1.
- Produces: homepage `#day0` anchor target for the sidebar's "Day 0" link; the TMG callout.

- [ ] **Step 1: Verify the mobile drawer (from Task 1) works**

Run `npm run dev`. In the browser resized to 375px width, on `/`:
- Confirm the left sidebar is hidden and a slim top bar with a `☰` button + "PO Traction Library" shows.
- Tap `☰`: the drawer slides in over a dark overlay.
- Tap the overlay: drawer closes. Re-open, tap a nav link: it navigates AND the drawer closes. Re-open, press `Escape`: it closes.
- Confirm no horizontal overflow at 375px.

If any of these fail, fix `SideNav.astro` before continuing (this is still Task 1's component; fold the fix into this task's commit).

- [ ] **Step 2: Remove the homepage's page-local sticky nav (markup)**

Modify `src/pages/index.astro`. Delete this block (currently around lines 79-85):

```astro
  <nav class="sticky-nav">
    <div class="nav-logo">
      <img src="/designli-logo.png" alt="Designli" width="20" height="20" />
      <span class="nav-logo-label">Designli</span>
    </div>
    <span class="nav-title">PO Traction Library</span>
  </nav>
```

- [ ] **Step 3: Remove the now-unused sticky-nav CSS**

In `src/pages/index.astro`, delete the `.sticky-nav`, `.nav-logo`, `.nav-logo img`, `.nav-logo-label`, and `.nav-title` rules (currently around lines 229-239):

```css
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
```

- [ ] **Step 4: Add the Day-0 anchor id**

In `src/pages/index.astro`, change the Day-0 section opening tag from:

```astro
    <section class="day0">
```
to:
```astro
    <section class="day0" id="day0">
```

- [ ] **Step 5: Add the Task Map Generator callout after the Day-0 section**

In `src/pages/index.astro`, immediately after the closing `</section>` of the `day0` section (and before the `<section class="commitments">` block), insert:

```astro
    <a class="tmg-callout" href="/library/task-map-generator">
      <div class="tmg-text">
        <p class="tmg-eyebrow">Featured tool</p>
        <h2 class="tmg-title">See your whole 90-day plan, dated</h2>
        <p class="tmg-body">
          The Task Map Generator turns a kickoff date into every dated task, blocker, and
          guarantee, ready to paste into Slack or Basecamp. It shows the whole methodology in
          one interaction.
        </p>
      </div>
      <span class="tmg-cta">Try the Task Map Generator →</span>
    </a>
```

- [ ] **Step 6: Add the callout styles**

In `src/pages/index.astro`, add to the `<style>` block (near the `.day0` rules is fine):

```css
  .tmg-callout {
    display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; flex-wrap: wrap;
    margin-bottom: 48px; padding: 24px 26px;
    background: var(--navy-card);
    border: 1px solid rgba(248, 117, 101, 0.35); border-left: 4px solid var(--coral);
    border-radius: 12px; text-decoration: none;
    transition: border-color 0.18s, transform 0.18s, background 0.18s;
  }
  .tmg-callout:hover { border-color: var(--coral); background: rgba(248, 117, 101, 0.08); transform: translateY(-3px); }
  .tmg-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--coral); margin-bottom: 8px; }
  .tmg-title { font-family: var(--serif); font-size: clamp(20px, 2.6vw, 26px); font-weight: 400; color: var(--white); line-height: 1.15; margin-bottom: 10px; }
  .tmg-body { font-size: 13.5px; line-height: 1.65; color: var(--muted-blue); max-width: 560px; }
  .tmg-cta { font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: var(--coral); white-space: nowrap; }
```

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: `[build] Complete!`, no errors.

- [ ] **Step 8: Verify in browser**

On `/` (desktop): confirm there is no leftover fixed top bar overlapping content (the old sticky-nav is gone), the Day-0 section still sits at the top of the body content unchanged, and the "Featured tool / See your whole 90-day plan, dated" callout appears right after it and links to `/library/task-map-generator`.
Click the sidebar's "Day 0 · Before you start": confirm the page scrolls to the Day-0 section (URL gets `#day0`).

- [ ] **Step 9: Commit**

```bash
git add src/pages/index.astro
git commit -m "Homepage: drop page-local nav for shared sidebar, feature Task Map Generator (site-review #9)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Prev/next sequence links on library pages

**Files:**
- Create: `src/components/PrevNext.astro`
- Modify: `src/pages/library/[slug].astro`

**Interfaces:**
- Consumes: `sequenceNeighbors` from `src/lib/nav.ts` (Task 1).
- `PrevNext` Props: `prev?: { id: string; title: string } | null`, `next?: { id: string; title: string } | null`.

- [ ] **Step 1: Create the PrevNext component**

Create `src/components/PrevNext.astro`:

```astro
---
interface NavItem { id: string; title: string; }
interface Props {
  prev?: NavItem | null;
  next?: NavItem | null;
}
const { prev = null, next = null } = Astro.props;
---
{(prev || next) && (
  <nav class="prevnext" aria-label="Sequence">
    {prev ? (
      <a class="pn pn-prev" href={`/library/${prev.id}`}>
        <span class="pn-dir">◀ Previous</span>
        <span class="pn-title">{prev.title}</span>
      </a>
    ) : <span class="pn-empty" />}
    {next ? (
      <a class="pn pn-next" href={`/library/${next.id}`}>
        <span class="pn-dir">Next ▶</span>
        <span class="pn-title">{next.title}</span>
      </a>
    ) : <span class="pn-empty" />}
  </nav>
)}

<style>
  .prevnext {
    display: flex; gap: 14px; margin-top: 48px; padding-top: 28px;
    border-top: 1px solid var(--navy-mid);
  }
  .pn {
    flex: 1 1 0; display: flex; flex-direction: column; gap: 4px;
    padding: 14px 16px; border: 1px solid var(--navy-mid); border-radius: 10px;
    background: var(--navy-card); text-decoration: none;
    transition: border-color 0.18s, transform 0.18s;
  }
  .pn:hover { border-color: var(--coral); transform: translateY(-2px); }
  .pn-next { text-align: right; }
  .pn-empty { flex: 1 1 0; }
  .pn-dir { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--coral); }
  .pn-title { font-family: var(--serif); font-size: 16px; color: var(--off-white); line-height: 1.2; }
  @media (max-width: 560px) { .prevnext { flex-direction: column; } .pn-next { text-align: left; } }
</style>
```

- [ ] **Step 2: Wire prev/next into the library page**

Modify `src/pages/library/[slug].astro`.

Add to the imports (after the existing component imports, ~line 7):

```astro
import PrevNext from '../../components/PrevNext.astro';
import { sequenceNeighbors } from '../../lib/nav';
```

The page already loads `const all = await getCollection('assets');`. After the `feeds` computation (~line 24), add:

```astro
const { prev, next } = sequenceNeighbors(all, entry.id);
```

In the template, immediately after the `<article class="body"><Content /></article>` block (~line 55), add:

```astro
    <PrevNext
      prev={prev ? { id: prev.id, title: prev.data.title } : null}
      next={next ? { id: next.id, title: next.data.title } : null}
    />
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: `[build] Complete!`, no errors.

- [ ] **Step 4: Verify sequence correctness in browser**

Run `npm run dev`. The canonical order is: task-map-generator, value-proposition, icp-persona-research, monetization-strategy (foundation), then waitlist-landing-page, waitlist-email-sequence, feedback-widget (activation), then signup-landing-page (conversion), then hdd-experiments (hdd), then traction-menu, blog-section, brand-voice, keyword-research (marketing).

- Visit `/library/task-map-generator` (first): confirm there is NO "Previous" link, and "Next ▶" points to Value Proposition.
- Visit `/library/value-proposition` (middle): confirm "◀ Previous" is Task Map Generator and "Next ▶" is ICP / Persona Research.
- Visit `/library/keyword-research` (last): confirm "◀ Previous" is Brand Voice and there is NO "Next" link.

Scripted check (Chrome DevTools MCP `evaluate_script`) on any library page:

```js
() => [...document.querySelectorAll('.pn')].map((a) => ({ dir: a.querySelector('.pn-dir').textContent, href: a.getAttribute('href') }))
```

- [ ] **Step 5: Commit**

```bash
git add src/components/PrevNext.astro "src/pages/library/[slug].astro"
git commit -m "Add prev/next sequence links to library pages (site-review #3 bonus)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Final verification (after all tasks)

- [ ] Full build passes: `npm run build`.
- [ ] Browser QA pass (desktop + 375px mobile): sidebar highlight correct on home / a library page / a project page; mobile drawer opens/closes via toggle, overlay, link-tap, and Escape; prev/next correct at both ends and mid-sequence; Day-0 sidebar link scrolls to `#day0`; TMG callout present and linking correctly; `/waitlist` has no sidebar; no horizontal overflow at 375px.
- [ ] Feedback widget still reachable bottom-right on desktop and mobile, and not stranded above the drawer overlay when the drawer is open (if it is, raise the overlay/drawer z-index or lower the widget — check `FeedbackWidget.astro`).
- [ ] No new console errors on `/` and a library page.
- [ ] Deploy: `vercel --prod` → commit any remaining changes → `git push`. Verify a change is live on `po-traction-engine.vercel.app`.

## Self-review notes (addressed)

- **Spec coverage:** #3 sidebar (Task 1) + mobile drawer (Task 1/2) + current highlight (Task 1); #9 TMG callout (Task 2); prev/next bonus (Task 3); Day-0 anchor kept on homepage (Task 2); waitlist opt-out (Task 1). #6 intentionally out of scope.
- **Ordering:** sidebar and prev/next both use `orderedAssets`/`sequenceNeighbors` (run-order). Homepage bands keep their live-first sort (unchanged) — intentional per spec.
- **Types:** `sequenceNeighbors(assets, id)` returns `{ prev, next }` of `Asset | null`; `PrevNext` consumes `{ id, title } | null`. `library/[slug]` maps `Asset → { id, title }` at the call site. Consistent.
