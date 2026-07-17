# Task Map Generator v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Grow the Task Map Generator from a PO-only traction checklist into the full cross-functional operating model: entry-path aware, injection aware, owner + support per task, a Before-kick-off phase, a parallel injection-workshop week, zero weekend tasks, and the Fathom meeting's date/urgency framing.

**Architecture:** Split the activity catalog into a new serializable data module `src/data/task-map.ts` and keep `src/components/TaskMapGenerator.astro` as the renderer. The component imports the data in frontmatter and passes it to the existing client `<script>` via `define:vars` (functions stay in the client script — `define:vars` serializes data only). A single `show` predicate object on each task drives all conditional inclusion (paths, mobile, injections, prior-info). The offline companion Markdown and the asset intro copy are regenerated to match.

**Tech Stack:** Astro (static), vanilla JS in a client `<script>`, TypeScript-strict frontmatter, `localStorage` persistence. No new dependencies. No test framework — verification is `npm run build` (compile/type check) plus concrete browser observations on `npm run dev`. The `chrome-devtools` MCP may be used to automate the browser checks during execution.

## Global Constraints

- Static only — no API routes, no SSR, no new dependencies (vanilla JS / Astro component only).
- Em dashes: the task map's established visual language already uses " — " as its structural date/title separator ("Week 1 — Foundation", "Day 1 — Label") throughout the shipped component and offline doc. Keep that separator for consistency. Do NOT use a spaced em dash in any new prose sentence you author (intro paragraph, operating notes, workshop descriptions) — use a period, comma, colon, or parentheses there.
- Brand tokens (already defined globally): `--navy`, `--navy-card`, `--navy-mid`, `--coral`, `--purple-light`, `--muted-blue`, `--off-white`, `--white`, `--serif`.
- Styles for client-rendered DOM must be `is:global` scoped under `.ktm` (the map DOM is built via `innerHTML` and does not receive Astro's scoped-style attribute).
- Guarantee milestones (Day 14/30/60/90) always render on the TRUE calendar date. Only task dates pull off weekends.
- Day 1 = kickoff for every path; injections never shift guarantees or week dates.
- `localStorage` key is unchanged: `tractionlab-map:<project-name-lowercased>`.
- Commit after each task. Do NOT deploy (`vercel --prod`) or push as part of this plan — the PO controls deployment separately.

---

## File structure

- **Create** `src/data/task-map.ts` — the serializable catalog: `ROLES`, `PATH_DEFAULTS`, `GUARANTEES`, `WORKSHOPS_DISCOVERY`, `WORKSHOPS_DESIGN`, `BEFORE`, `WEEKS`, `THROUGHOUT`, `OPERATING_NOTES`, `TOTAL_DAYS`. One responsibility: all task-map content and its shape.
- **Modify** `src/components/TaskMapGenerator.astro` — import the catalog; add entry-path / injection / prior-info controls; context-based task filtering; owner+support chips + legend; weekend-pull for task dates; Before-kick-off, injection-workshop, and Throughout render blocks; Day 14 framing note; copy-output updates.
- **Modify** `docs/tractionlab-kickoff-checklist.md` — regenerate the offline companion to the fullest case.
- **Modify** `src/content/assets/task-map-generator.md` — update the intro copy to mention paths, injections, and owners.

### The `show` predicate (used throughout the data)

Each task/BEFORE item may carry an optional `show` object. The renderer includes the item only if EVERY present key matches the current context `ctx = { path, discovery, design, mobile, priorInfo, injection }` (where `injection = discovery || design`):

- `paths?: number[]` — include only for these entry paths (1/2/3).
- `mobile?: true` — include only when the mobile toggle is on.
- `discovery?: true` — include only when the discovery injection is on.
- `design?: true` — include only when the design injection is on.
- `injection?: boolean` — `true`: any injection on; `false`: no injection at all.
- `priorInfo?: boolean` — match the prior-info toggle state.

No `show` = always included. `critical: true` is independent of `show`.

---

### Task 1: Data catalog `src/data/task-map.ts`

Create the full serializable catalog and switch the component to import `WEEKS` and `GUARANTEES` from it with no visual change yet (owners/new sections rendered in later tasks). This is a safe refactor + data enrichment step.

**Files:**
- Create: `src/data/task-map.ts`
- Modify: `src/components/TaskMapGenerator.astro:7-92` (remove the inline `WEEKS` and `GUARANTEES` consts; import from the data module)

**Interfaces:**
- Produces: `ROLES: Record<RoleId,{label:string,color:string}>`; `PATH_DEFAULTS: Record<1|2|3,{discovery:boolean,design:boolean,priorInfo:boolean}>`; `GUARANTEES: Guarantee[]`; `WORKSHOPS_DISCOVERY: Workshop[]`; `WORKSHOPS_DESIGN: Workshop[]`; `BEFORE: Task[]`; `WEEKS: Week[]`; `THROUGHOUT: Task[]`; `OPERATING_NOTES: string[]`; `TOTAL_DAYS = 96`. Task shape: `{ id, label, day, owner, support, critical?, show? }`. Workshop shape: `{ day, title, duration, whatWeDo, lead, support }`.

- [ ] **Step 1: Create `src/data/task-map.ts` with the full catalog**

```ts
// Task Map Generator catalog — the single source of truth for the traction-lab
// operating model. Edit activities, owners, and workshops here; the renderer
// (src/components/TaskMapGenerator.astro) reads this and needs no changes when
// you add or reword a task. All values are plain data (no functions) because the
// component passes them to a client script via Astro `define:vars`, which
// serializes data only.
//
// OWNER + SUPPORT: `owner` is the one role accountable / doing the task; `support`
// lists roles that assist or VALIDATE that what's created makes sense.
// `show` gates conditional tasks — see the plan/spec for the predicate rules.

export type RoleId = 'PO' | 'SA' | 'DES' | 'DEV' | 'TL' | 'CLIENT';

export const ROLES: Record<RoleId, { label: string; color: string }> = {
  PO:     { label: 'PO',       color: '#F87565' }, // coral
  SA:     { label: 'Sol. Arch',color: '#9B72CC' }, // purple
  DES:    { label: 'Designer', color: '#C58BD6' }, // light purple
  DEV:    { label: 'Developer',color: '#6D8BD6' }, // blue
  TL:     { label: 'Tech Lead',color: '#4FB6A6' }, // teal
  CLIENT: { label: 'Client',   color: '#D6A25B' }, // amber
};

// Path-driven defaults for the injection + prior-info toggles. The PO can override.
export const PATH_DEFAULTS: Record<1 | 2 | 3, { discovery: boolean; design: boolean; priorInfo: boolean }> = {
  1: { discovery: true,  design: false, priorInfo: true  }, // Impact Week
  2: { discovery: false, design: false, priorInfo: true  }, // SolutionLab
  3: { discovery: true,  design: false, priorInfo: false }, // From scratch
};

export const TOTAL_DAYS = 96;

// Contractual milestones. ALWAYS rendered on the true calendar date (never pulled
// off a weekend). Day 60 reads labelWeb for non-mobile projects.
export const GUARANTEES = [
  { day: 14, label: 'Refund window closes', tag: 'guarantee',
    note: 'Also the internal aggressive target for the first user, buying a ~2-week buffer before the Day 30 commitment.' },
  { day: 30, label: 'First user', tag: 'guarantee' },
  { day: 60, label: 'App ready for store submission', labelWeb: 'Product ready to scale', tag: 'last day to give notice' },
  { day: 90, label: 'First dollar of revenue', tag: 'engagement ends' },
];

// Discovery injection — CONFIRMED. Days 1-5, led by Solutions Architect + Designer,
// POD participates in all five (context matters). Renders as a parallel overlay.
export const WORKSHOPS_DISCOVERY = [
  { day: 1, title: 'Understanding the Business', duration: '2h',
    whatWeDo: 'Kickoff, product overview, business model, features, users, branding/design questionnaire, and current issues.',
    lead: ['SA', 'DES'], support: ['PO'] },
  { day: 2, title: 'Design Concepts & Workflow', duration: '1h',
    whatWeDo: 'Align on design direction, brainstorm the main workflow, define the problem statement, and look at the future of the product.',
    lead: ['SA', 'DES'], support: ['PO'] },
  { day: 3, title: 'Prototype Demo & Review', duration: '1h',
    whatWeDo: 'Present progress on a live, interactive prototype and gather direct feedback.',
    lead: ['SA', 'DES'], support: ['PO'] },
  { day: 4, title: 'Prioritization Session', duration: '1.5h',
    whatWeDo: 'Collaborative working session to prioritize features and map what is critical for launch.',
    lead: ['SA', 'DES'], support: ['PO'] },
  { day: 5, title: 'Final Review & Next Steps', duration: '1h',
    whatWeDo: 'Final design presentation and a collaborative review of the custom 30-60-90 day execution milestones.',
    lead: ['SA', 'DES'], support: ['PO'] },
];

// Design injection — PROVISIONAL (its own 5-day structure, exact sessions to be
// confirmed). Safe to edit once the real sessions are known.
export const WORKSHOPS_DESIGN = [
  { day: 1, title: 'Design kickoff & direction (provisional)', duration: 'TBC',
    whatWeDo: 'Align on brand and visual direction. (Session content to be confirmed.)', lead: ['SA', 'DES'], support: ['PO'] },
  { day: 2, title: 'Wireframes & workflow (provisional)', duration: 'TBC',
    whatWeDo: 'Map the core workflow as wireframes. (To be confirmed.)', lead: ['SA', 'DES'], support: ['PO'] },
  { day: 3, title: 'Hi-fi concepts review (provisional)', duration: 'TBC',
    whatWeDo: 'Review high-fidelity concepts and align. (To be confirmed.)', lead: ['SA', 'DES'], support: ['PO'] },
  { day: 4, title: 'Prototype & iteration (provisional)', duration: 'TBC',
    whatWeDo: 'Build and iterate on the interactive prototype. (To be confirmed.)', lead: ['SA', 'DES'], support: ['PO'] },
  { day: 5, title: 'Final design presentation (provisional)', duration: 'TBC',
    whatWeDo: 'Present final designs and hand off to delivery. (To be confirmed.)', lead: ['SA', 'DES'], support: ['PO'] },
];

// Before kick off — pre-Day-1 phase. Repo + Vercel are always required; the
// PRD/TRD/integrations plan only exist when prior information exists.
export const BEFORE = [
  { id: 'b-1', label: 'Repo created from the traction-lab template', day: 0, owner: 'TL', support: [] },
  { id: 'b-2', label: 'Vercel project created (for prototypes/previews)', day: 0, owner: 'TL', support: [] },
  { id: 'b-3', label: 'First PRD iteration', day: 0, owner: 'PO', support: ['TL', 'DEV'], show: { priorInfo: true } },
  { id: 'b-4', label: 'First TRD iteration', day: 0, owner: 'TL', support: ['PO', 'DEV'], show: { priorInfo: true } },
  { id: 'b-5', label: 'Third-party integrations overview plan (e.g. AI, payment gateways, IAP)', day: 0, owner: 'TL', support: [], show: { priorInfo: true } },
];

// Weeks 1-4. `day` is the semantic Day N (Day 1 = kickoff). Task dates pull off
// weekends at render time; guarantee dates do not.
export const WEEKS = [
  {
    id: 'w1', title: 'Week 1 — Foundation', priority: 'Priority 1', range: [1, 7],
    groups: [
      { name: 'Kickoff', tasks: [
        { id: 'w1-k', label: 'Kickoff handoff meeting: Solutions Architect intros the client, gives the product overview, hands off to the POD', day: 1, owner: 'SA', support: ['PO'], show: { injection: false } },
      ] },
      { name: 'Day 1 blockers', tasks: [
        { id: 'w1-1', label: 'Founder orbit users identified & commitment obtained', day: 1, owner: 'PO', support: ['CLIENT'], critical: true },
        { id: 'w1-2', label: 'Founder domain name confirmed', day: 1, owner: 'PO', support: ['CLIENT'], critical: true },
        { id: 'w1-3', label: 'Apple Developer account process started', day: 1, owner: 'PO', support: ['CLIENT'], critical: true, show: { mobile: true } },
        { id: 'w1-3a', label: 'DUNS number requested (required for Apple Developer account)', day: 1, owner: 'PO', support: ['CLIENT'], critical: true, show: { mobile: true } },
        { id: 'w1-3b', label: 'Google Play Console account process started', day: 1, owner: 'PO', support: ['CLIENT'], critical: true, show: { mobile: true } },
        { id: 'w1-golist', label: "Full go-live asset list sent to client (terms, privacy policy, domain, store & processor accounts, anything else that blocks go-live)", day: 1, owner: 'PO', support: ['CLIENT'] },
        { id: 'w1-standby', label: "Client's standby list of orbit users collected and kept on hand (a list, not a single name)", day: 1, owner: 'PO', support: ['CLIENT'] },
        { id: 'w1-4', label: 'Dev & staging infrastructure created', day: 1, owner: 'TL', support: ['DEV'] },
        { id: 'w1-4a', label: "Repo created under client's own GitHub org (enables code transfer anytime)", day: 1, owner: 'TL', support: [] },
        { id: 'w1-stores', label: 'Store apps and CI/CD pipelines set up', day: 1, owner: 'TL', support: ['DEV'], show: { mobile: true } },
        { id: 'w1-backend', label: 'Backend creation started', day: 1, owner: 'DEV', support: ['TL'] },
      ] },
      { name: 'PostHog', tasks: [
        { id: 'w1-5', label: 'PostHog account created & project configured', day: 1, owner: 'PO', support: [] },
        { id: 'w1-6', label: 'Internal cohort created (PO, Dev, TL)', day: 1, owner: 'PO', support: [] },
        { id: 'w1-7', label: 'Customer cohort created (founder & stakeholders)', day: 1, owner: 'PO', support: [] },
        { id: 'w1-8', label: 'Dynamic cohort configured for all other signups', day: 2, owner: 'PO', support: [] },
        { id: 'w1-9', label: 'PostHog email channels configured', day: 2, owner: 'PO', support: [] },
      ] },
      { name: 'Landing page & emails', tasks: [
        { id: 'w1-10', label: 'Value proposition written & approved', day: 2, owner: 'PO', support: ['CLIENT'] },
        { id: 'w1-icp', label: 'ICP research completed (once discovery context is sufficient)', day: 3, owner: 'PO', support: [] },
        { id: 'w1-11', label: 'Waitlist landing page live', day: 4, owner: 'PO', support: [] },
        { id: 'w1-12', label: 'PostHog tracking connected to landing page', day: 4, owner: 'PO', support: [] },
        { id: 'w1-13', label: 'Feedback widget integrated, routing to GitHub Issues', day: 4, owner: 'PO', support: [] },
        { id: 'w1-14', label: 'Slack notification for new feedback configured', day: 4, owner: 'PO', support: [] },
        { id: 'w1-build4', label: 'Testable build in the client\'s hands (mock data / web variant if needed)', day: 4, owner: 'DEV', support: ['TL'], critical: true },
        { id: 'w1-15', label: '3 waitlist emails drafted & configured in PostHog', day: 5, owner: 'PO', support: [] },
        { id: 'w1-prd', label: 'First PRD iteration (from discovery context)', day: 5, owner: 'PO', support: ['TL', 'DEV'], show: { priorInfo: false, discovery: true } },
        { id: 'w1-trd', label: 'First TRD iteration (from discovery context)', day: 6, owner: 'TL', support: ['PO', 'DEV'], show: { priorInfo: false, discovery: true } },
      ] },
      { name: 'Strategy', tasks: [
        { id: 'w1-mondisc', label: 'Early monetization discussion held with the client', day: 1, owner: 'PO', support: ['CLIENT'] },
        { id: 'w1-16', label: 'Monetization strategy documented', day: 7, owner: 'PO', support: ['CLIENT'] },
      ] },
    ],
  },
  {
    id: 'w2', title: 'Week 2 — Activation', priority: 'Priority 2', range: [8, 14],
    groups: [
      { name: 'Users', tasks: [
        { id: 'w2-7', label: 'Personal outreach completed for founder orbit users', day: 8, owner: 'PO', support: [] },
        { id: 'w2-8', label: 'Drip campaign running for all waitlist signups', day: 8, owner: 'PO', support: [] },
      ] },
      { name: 'Launch', tasks: [
        { id: 'w2-9', label: 'Product live or webapp safety net deployed', day: 9, owner: 'DEV', support: ['TL'], critical: true },
      ] },
      { name: 'Brand', tasks: [
        { id: 'w2-1', label: 'Primary social channel claimed with brand handle', day: 8, owner: 'PO', support: [] },
        { id: 'w2-2', label: 'Profile complete: logo, banner, bio, waitlist link', day: 9, owner: 'PO', support: [] },
        { id: 'w2-3', label: 'First post published', day: 9, owner: 'PO', support: [] },
      ] },
      { name: 'PostHog', tasks: [
        { id: 'w2-4', label: 'All PostHog events verified against internal cohort', day: 10, owner: 'PO', support: [] },
        { id: 'w2-5', label: 'PostHog funnel configured with minimum event set', day: 11, owner: 'PO', support: [] },
      ] },
      { name: 'Marketing', tasks: [
        { id: 'w2-6', label: 'Target persona one-pager complete', day: 12, owner: 'PO', support: [] },
      ] },
      { name: 'Day 14 milestone', tasks: [
        { id: 'w2-user', label: 'Deployed version live with a user on it, pulled from the standby list (founder orbit counts)', day: 14, owner: 'DEV', support: ['PO', 'CLIENT'], critical: true },
        { id: 'w2-flag', label: '"We have met our commitment" posted to Basecamp', day: 14, owner: 'PO', support: [] },
      ] },
    ],
  },
  {
    id: 'w3', title: 'Week 3 — Conversion', priority: 'Priority 3', range: [15, 21],
    groups: [
      { name: 'Launch', tasks: [
        { id: 'w3-4', label: 'Landing page converted from waitlist to signup', day: 18, owner: 'PO', support: [] },
        { id: 'w3-5', label: 'Onboarding drip sequence active', day: 19, owner: 'PO', support: [] },
      ] },
      { name: 'Post-commitment', tasks: [
        { id: 'w3-disagree', label: 'Client disagreement window: make the changes they ask for and nothing else (no new scope)', day: 15, owner: 'DEV', support: ['TL', 'PO'] },
        { id: 'w3-standby', label: 'Keep working down the standby list (more users turns "met" into "obviously met")', day: 15, owner: 'PO', support: ['CLIENT'] },
        { id: 'w3-mon', label: 'Monetization model designed & scheduled into the plan', day: 20, owner: 'PO', support: ['TL'] },
      ] },
    ],
  },
  {
    id: 'w4', title: 'Week 4 — Learning', priority: 'Priority 4', range: [22, 28],
    groups: [
      { name: 'Users', tasks: [
        { id: 'w4-1', label: 'First user interviews completed', day: 24, owner: 'PO', support: ['CLIENT'] },
        { id: 'w4-2', label: 'Interview findings documented & summarized', day: 25, owner: 'PO', support: [] },
      ] },
      { name: 'PostHog', tasks: [
        { id: 'w4-3', label: 'PostHog funnel reviewed, drop-offs identified', day: 25, owner: 'PO', support: [] },
      ] },
      { name: 'HDD', tasks: [
        { id: 'w4-4', label: 'First HDD experiment proposed & configured in PostHog', day: 27, owner: 'PO', support: [] },
        { id: 'w4-5', label: 'Week 5 client meeting agenda built around results', day: 28, owner: 'PO', support: [] },
      ] },
      { name: 'Monetization', tasks: [
        { id: 'w4-6', label: 'Monetization features scoped & prioritized', day: 28, owner: 'PO', support: ['TL', 'DEV'] },
      ] },
    ],
  },
];

// "True on all 90 days" — rendered as a standing list, no dates.
export const THROUGHOUT = [
  { id: 't-1', label: 'Daily Basecamp post: progress and any client blockers tracked publicly', owner: 'PO', support: [] },
  { id: 't-2', label: 'Daily marketing/traction activity to the client, receptive or not (downtime goes to traction, never more code)', owner: 'PO', support: [] },
  { id: 't-3', label: 'Chase outstanding client go-live items every touch until every one is in', owner: 'PO', support: ['CLIENT'] },
];

// Short operating principles surfaced as notes under the map.
export const OPERATING_NOTES = [
  'Beat dependency blockers with mock data or internal accounts. Build the core flow now; swap in real integrations when client credentials arrive.',
  'When the client goes quiet, keep building off the approved Discovery Injection. Do not stall waiting for answers.',
  'Days 31-90: monetization model implemented alongside the HDD cadence.',
];
```

- [ ] **Step 2: Point the component at the data module**

In `src/components/TaskMapGenerator.astro`, delete the inline `const WEEKS = [...]` (lines 7-82) and `const GUARANTEES = [...]` (lines 84-92). Replace the frontmatter (between the `---` fences at the top) with an import:

```astro
---
// Interactive Task Map Generator — renders the traction-lab operating model from
// src/data/task-map.ts. Enter a kickoff date + entry path; every task auto-dates
// on calendar days (Day 1 = kickoff), pulling off weekends; guarantees stay on
// their true calendar date. Progress persists in localStorage per project.
import { WEEKS, GUARANTEES } from '../data/task-map';
---
```

Leave the `<script define:vars={{ WEEKS, GUARANTEES }}>` line as-is for now.

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: build completes with no TypeScript errors; output includes `library/task-map-generator`.

- [ ] **Step 4: Verify no visual regression**

Run: `npm run dev`, open `http://localhost:4321/library/task-map-generator`, enter any kickoff date + project name, click Generate.
Expected: the map renders exactly as before (milestones, timeline, Week 1-4 cards, copy button). Owners and new sections are NOT expected yet.

- [ ] **Step 5: Commit**

```bash
git add src/data/task-map.ts src/components/TaskMapGenerator.astro
git commit -m "refactor: extract task-map catalog into src/data/task-map.ts + enrich data

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Entry-path, injection & prior-info controls with context filtering

Add the new inputs, path-driven defaults, persistence, and the `show`-predicate filter so gated tasks appear/disappear. New tasks from Task 1 that carry `show` become reachable here.

**Files:**
- Modify: `src/components/TaskMapGenerator.astro` — controls markup (after the existing `.ktm-input` block), `define:vars` (add `ROLES, PATH_DEFAULTS`), client script (`taskMatches`, `visibleTasks`, `persist`/`loadSaved`, control wiring), styles.

**Interfaces:**
- Consumes: `WEEKS, GUARANTEES` (Task 1), `ROLES`, `PATH_DEFAULTS` (Task 1).
- Produces: a `ctx()` accessor returning `{ path, discovery, design, mobile, priorInfo, injection }`; `taskMatches(task, ctx)` used by all render paths in later tasks.

- [ ] **Step 1: Import the extra data**

Update the frontmatter import in `src/components/TaskMapGenerator.astro`:

```astro
import { WEEKS, GUARANTEES, ROLES, PATH_DEFAULTS } from '../data/task-map';
```

And the script tag:

```astro
<script define:vars={{ WEEKS, GUARANTEES, ROLES, PATH_DEFAULTS }}>
```

- [ ] **Step 2: Add the path + injection controls markup**

Replace the existing `.ktm-input` block (currently the fields + mobile checkbox, lines ~102-118) with this expanded version:

```html
  <div class="ktm-input">
    <div class="ktm-fields">
      <div class="ktm-field">
        <label for="ktm-date">Kickoff date</label>
        <input type="date" id="ktm-date" data-ktm-date />
      </div>
      <div class="ktm-field">
        <label for="ktm-name">Project name</label>
        <input type="text" id="ktm-name" placeholder="e.g. Volleyball / Blocq" data-ktm-name />
      </div>
      <div class="ktm-field">
        <label for="ktm-path">Entry path</label>
        <select id="ktm-path" data-ktm-path>
          <option value="1">1 · Impact Week</option>
          <option value="2">2 · SolutionLab</option>
          <option value="3" selected>3 · From scratch</option>
        </select>
      </div>
      <button type="button" class="ktm-generate" data-ktm-generate>Generate map</button>
    </div>
    <div class="ktm-toggles">
      <label class="ktm-toggle"><input type="checkbox" data-ktm-discovery /> Discovery injection</label>
      <label class="ktm-toggle"><input type="checkbox" data-ktm-design /> Design injection</label>
      <label class="ktm-toggle"><input type="checkbox" data-ktm-priorinfo /> Prior information exists (enables early PRD/TRD)</label>
      <label class="ktm-toggle"><input type="checkbox" data-ktm-mobile /> Includes a mobile app</label>
    </div>
  </div>
```

- [ ] **Step 3: Add control references and context in the client script**

After the existing `const empty = ...` line, add:

```js
  const pathInput = wrap.querySelector('[data-ktm-path]');
  const discoveryToggle = wrap.querySelector('[data-ktm-discovery]');
  const designToggle = wrap.querySelector('[data-ktm-design]');
  const priorInfoToggle = wrap.querySelector('[data-ktm-priorinfo]');

  function ctx() {
    const discovery = discoveryToggle.checked;
    const design = designToggle.checked;
    return {
      path: Number(pathInput.value),
      discovery, design,
      mobile: mobileToggle.checked,
      priorInfo: priorInfoToggle.checked,
      injection: discovery || design,
    };
  }
  function taskMatches(t, c) {
    const s = t.show;
    if (!s) return true;
    if (s.paths && !s.paths.includes(c.path)) return false;
    if (s.mobile && !c.mobile) return false;
    if (s.discovery && !c.discovery) return false;
    if (s.design && !c.design) return false;
    if (typeof s.injection === 'boolean' && s.injection !== c.injection) return false;
    if (typeof s.priorInfo === 'boolean' && s.priorInfo !== c.priorInfo) return false;
    return true;
  }
  function applyPathDefaults() {
    const d = PATH_DEFAULTS[Number(pathInput.value)] || PATH_DEFAULTS[3];
    discoveryToggle.checked = d.discovery;
    designToggle.checked = d.design;
    priorInfoToggle.checked = d.priorInfo;
  }
```

- [ ] **Step 4: Replace `visibleTasks` to use the context filter**

Replace the existing `visibleTasks()` function with:

```js
  function visibleTasks() {
    const c = ctx();
    const list = [];
    WEEKS.forEach((w) => w.groups.forEach((g) => g.tasks.forEach((t) => {
      if (taskMatches(t, c)) list.push(t);
    })));
    return list;
  }
```

- [ ] **Step 5: Persist and restore the new fields**

Replace `persist()` and the body of `loadSaved()` so the new fields round-trip. `persist()`:

```js
  function persist() {
    const k = storageKey();
    if (!k) return;
    try {
      localStorage.setItem(k, JSON.stringify({
        kickoff: dateInput.value, isMobile: mobileToggle.checked,
        path: pathInput.value, discovery: discoveryToggle.checked,
        design: designToggle.checked, priorInfo: priorInfoToggle.checked,
        checked,
      }));
    } catch (e) {}
  }
```

In `loadSaved()`, after the `if (typeof data.isMobile === 'boolean') ...` line, add:

```js
      if (data.path) pathInput.value = data.path;
      if (typeof data.discovery === 'boolean') discoveryToggle.checked = data.discovery;
      if (typeof data.design === 'boolean') designToggle.checked = data.design;
      if (typeof data.priorInfo === 'boolean') priorInfoToggle.checked = data.priorInfo;
```

- [ ] **Step 6: Wire the controls**

After the existing `mobileToggle.addEventListener(...)` line, add:

```js
  pathInput.addEventListener('change', () => { applyPathDefaults(); if (!output.hidden) render(); persist(); });
  [discoveryToggle, designToggle, priorInfoToggle].forEach((el) =>
    el.addEventListener('change', () => { if (!output.hidden) render(); persist(); }));
```

And immediately before the final `genBtn.disabled = !dateInput.value;` line, seed the defaults for a fresh (unsaved) session:

```js
  applyPathDefaults();
```

(Note: `nameInput`'s change handler already calls `loadSaved()`, which overrides these defaults when saved data exists — leave that as-is.)

- [ ] **Step 7: Add styles for the toggles**

In the `<style is:global>` block, after the `.ktm-mobile` rules, add:

```css
  .ktm-field select { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--navy-mid); background: var(--navy); color: var(--off-white); font-size: 14px; font-family: inherit; }
  .ktm-field select:focus { outline: none; border-color: var(--coral); }
  .ktm-toggles { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 16px; }
  .ktm-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--muted-blue); cursor: pointer; }
  .ktm-toggle input { accent-color: var(--coral); }
```

- [ ] **Step 8: Verify build + behavior**

Run: `npm run build` (expect: passes).
Run: `npm run dev`, open the tool. Verify:
- Default path is "3 · From scratch"; Discovery + Prior-info toggles reflect that path's defaults on load.
- Switching to "2 · SolutionLab" unchecks Discovery and Prior-info stays checked; the "First PRD iteration (from discovery context)" task does NOT show.
- Toggling "Includes a mobile app" adds/removes the Apple/DUNS/Google Play + store-pipeline tasks.
- Checking Discovery on Path 2 makes the discovery-gated PRD/TRD tasks appear only when Prior-info is unchecked.
- Reload the page with the same project name: path + all toggles restore from localStorage.

- [ ] **Step 9: Commit**

```bash
git add src/components/TaskMapGenerator.astro
git commit -m "feat: entry-path + injection + prior-info controls with task gating

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Owner + Support chips, legend, and copy output

Render an Owner chip (filled) and Support chips (outlined) on every task row, a one-time role legend, and include owners in the copied checklist.

**Files:**
- Modify: `src/components/TaskMapGenerator.astro` — a `roleChips` helper in the script, the task-row template inside `render()`, a legend block, `copyChecklist()`, and chip styles.

**Interfaces:**
- Consumes: `ROLES` (Task 1), `taskMatches`/`ctx` (Task 2).
- Produces: `roleChips(owner, support)` returning an HTML string; `ownersText(t)` returning `"(Owner: X · Support: Y, Z)"` for copy.

- [ ] **Step 1: Add the chip helpers in the script**

After `taskMatches(...)`, add:

```js
  function roleChips(owner, support) {
    let s = `<span class="ktm-chip ktm-chip-owner" style="--chip:${ROLES[owner].color}">${esc(ROLES[owner].label)}</span>`;
    (support || []).forEach((r) => {
      s += `<span class="ktm-chip ktm-chip-support" style="--chip:${ROLES[r].color}">${esc(ROLES[r].label)}</span>`;
    });
    return `<span class="ktm-chips">${s}</span>`;
  }
  function ownersText(t) {
    const sup = (t.support || []).map((r) => ROLES[r].label).join(', ');
    return sup ? `(Owner: ${ROLES[t.owner].label} · Support: ${sup})` : `(Owner: ${ROLES[t.owner].label})`;
  }
```

- [ ] **Step 2: Render the legend once at the top of the output**

In `render()`, immediately after the line that sets `let h = '';`, add:

```js
    h += '<div class="ktm-legend"><span class="ktm-legend-label">Roles</span>';
    Object.keys(ROLES).forEach((r) => {
      h += `<span class="ktm-chip" style="--chip:${ROLES[r].color}">${esc(ROLES[r].label)}</span>`;
    });
    h += '<span class="ktm-legend-note">Filled = owner · outlined = support/validation</span></div>';
```

- [ ] **Step 3: Add chips to each task row**

In `render()`, inside the `gtasks.forEach((t) => {...})` loop, change the task-text span so the owner/support chips render under the label+date. Replace the existing inner block:

```js
          h += `<span class="ktm-task-text"><span class="ktm-task-label">${esc(t.label)}</span><span class="ktm-task-date">${fmt(dayDate(kickoff, t.day))}</span></span>`;
          if (t.critical) h += '<span class="ktm-critical">Critical</span>';
```

with:

```js
          h += `<span class="ktm-task-text"><span class="ktm-task-label">${esc(t.label)}</span><span class="ktm-task-meta"><span class="ktm-task-date">${fmt(dayDate(kickoff, t.day))}</span>${roleChips(t.owner, t.support)}</span></span>`;
          if (t.critical) h += '<span class="ktm-critical">Critical</span>';
```

Also update the group filter line just above it — replace `const gtasks = g.tasks.filter((t) => !(t.mobileOnly && !isMobile));` with:

```js
        const c = ctx();
        const gtasks = g.tasks.filter((t) => taskMatches(t, c));
```

- [ ] **Step 4: Include owners in the copied checklist**

In `copyChecklist()`, replace the task line push:

```js
        lines.push(`${box} ${fmt(dayDate(kickoff, t.day))} — ${t.label}${t.critical ? '  (CRITICAL)' : ''}`);
```

with:

```js
        lines.push(`${box} ${fmt(dayDate(kickoff, t.day))} — ${t.label} ${ownersText(t)}${t.critical ? '  (CRITICAL)' : ''}`);
```

And replace the copy filter `w.groups.forEach((g) => g.tasks.forEach((t) => { if (t.mobileOnly && !isMobile) return; ...` — change the guard to:

```js
      const c = ctx();
      w.groups.forEach((g) => g.tasks.forEach((t) => {
        if (!taskMatches(t, c)) return;
        const box = checked[t.id] ? '- [x]' : '- [ ]';
        lines.push(`${box} ${fmt(dayDate(kickoff, t.day))} — ${t.label} ${ownersText(t)}${t.critical ? '  (CRITICAL)' : ''}`);
      }));
```

- [ ] **Step 5: Add chip + legend styles**

In the `<style is:global>` block, after the `.ktm-critical` rules, add:

```css
  .ktm-task-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .ktm-chips { display: inline-flex; gap: 5px; flex-wrap: wrap; }
  .ktm-chip { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; border-radius: 5px; padding: 2px 7px; line-height: 1.4; color: var(--chip); border: 1px solid var(--chip); background: transparent; white-space: nowrap; }
  .ktm-chip-owner { color: var(--navy); background: var(--chip); border-color: var(--chip); }
  .ktm-legend { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; padding: 12px 14px; background: var(--navy-card); border: 1px solid var(--navy-mid); border-radius: 10px; }
  .ktm-legend-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-blue); }
  .ktm-legend-note { font-size: 11px; color: var(--muted-blue); margin-left: auto; }
```

- [ ] **Step 6: Verify build + behavior**

Run: `npm run build` (expect: passes).
Run: `npm run dev`, generate a map. Verify:
- A "Roles" legend renders above the milestones with all six chips.
- Every task row shows a filled owner chip and any outlined support chips (e.g. the domain task shows PO filled + CLIENT outlined; PRD shows PO + TL, DEV).
- Click "Copy checklist", paste into a text editor: each line reads `- [ ] <date> — <label> (Owner: … · Support: …)`.

- [ ] **Step 7: Commit**

```bash
git add src/components/TaskMapGenerator.astro
git commit -m "feat: owner + support chips, role legend, and owners in copy output

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Weekend-pull for task dates

Task dates that land on Saturday or Sunday display (and copy) as the prior Friday. Guarantee milestones keep their true calendar date.

**Files:**
- Modify: `src/components/TaskMapGenerator.astro` — add `workingDate(...)`, use it for every TASK date (render + copy + progress), leave `dayDate(...)` for guarantees and week-range labels.

**Interfaces:**
- Consumes: `dayDate(baseISO, dayNum)` (existing).
- Produces: `workingDate(baseISO, dayNum)` → a `Date` pulled to Friday if Day N is a weekend.

- [ ] **Step 1: Add the helper**

Immediately after the existing `dayDate(...)` function, add:

```js
  // Task dates never land on a weekend: Saturday pulls back 1 day, Sunday pulls
  // back 2 days, both to the prior Friday. Guarantees do NOT use this — they keep
  // their true calendar date (they are contractual).
  function workingDate(baseISO, dayNum) {
    const d = dayDate(baseISO, dayNum);
    const wd = d.getDay(); // 0 = Sun, 6 = Sat
    if (wd === 6) d.setDate(d.getDate() - 1);
    else if (wd === 0) d.setDate(d.getDate() - 2);
    return d;
  }
```

- [ ] **Step 2: Use `workingDate` for task rows**

In `render()`, in the task-row template from Task 3, change `fmt(dayDate(kickoff, t.day))` to `fmt(workingDate(kickoff, t.day))`.

- [ ] **Step 3: Use `workingDate` in the copied checklist**

In `copyChecklist()`, change the task line's `fmt(dayDate(kickoff, t.day))` to `fmt(workingDate(kickoff, t.day))`. Leave the `GUARANTEES.forEach(... dayDate ...)` line unchanged.

- [ ] **Step 4: Confirm guarantees still use `dayDate`**

Verify (no change needed) that the milestone strip and timeline flags in `render()` still call `dayDate(kickoff, g.day)` for `GUARANTEES`, and week-range labels still call `dayDate(kickoff, w.range[...])`.

- [ ] **Step 5: Verify build + behavior**

Run: `npm run build` (expect: passes).
Run: `npm run dev`. Pick a kickoff date where a task lands on a weekend — e.g. kickoff **Wed 2026-07-22** (matches the Goffor canvas): the Day 4 tasks fall on Sat Jul 25 in raw calendar. Verify:
- Those Day-4 tasks now display **Fri, Jul 24**, not Sat/Sun.
- No task row anywhere shows "Sat" or "Sun".
- The Day 60 guarantee (which for that kickoff lands on Sat, Sep 19) STILL shows **Sat, Sep 19** in the milestone strip.

- [ ] **Step 6: Commit**

```bash
git add src/components/TaskMapGenerator.astro
git commit -m "feat: pull task dates off weekends to Friday (guarantees keep true dates)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Before-kick-off, injection-workshop, and Throughout render blocks + Day 14 framing

Render the three new content blocks and the Day 14 milestone note, and include Before + Throughout in the copy output. This is where the injection week, the pre-kickoff phase, and the standing daily work become visible.

**Files:**
- Modify: `src/components/TaskMapGenerator.astro` — add `BEFORE, WORKSHOPS_DISCOVERY, WORKSHOPS_DESIGN, THROUGHOUT, OPERATING_NOTES` to imports + `define:vars`; render blocks in `render()`; extend `copyChecklist()`; the Day 14 card note; styles.

**Interfaces:**
- Consumes: `BEFORE, WORKSHOPS_DISCOVERY, WORKSHOPS_DESIGN, THROUGHOUT, OPERATING_NOTES` (Task 1); `roleChips`, `ownersText`, `taskMatches`, `ctx`, `workingDate` (Tasks 2-4); `GUARANTEES[].note` (Task 1).
- Produces: no new exported symbols; three render blocks + copy sections.

- [ ] **Step 1: Import the new data**

Frontmatter import:

```astro
import { WEEKS, GUARANTEES, ROLES, PATH_DEFAULTS, BEFORE, WORKSHOPS_DISCOVERY, WORKSHOPS_DESIGN, THROUGHOUT, OPERATING_NOTES } from '../data/task-map';
```

Script tag:

```astro
<script define:vars={{ WEEKS, GUARANTEES, ROLES, PATH_DEFAULTS, BEFORE, WORKSHOPS_DISCOVERY, WORKSHOPS_DESIGN, THROUGHOUT, OPERATING_NOTES }}>
```

- [ ] **Step 2: Render the Before-kick-off block**

In `render()`, after the progress-bar block (the `h += '<div class="ktm-progressbar">...'` line) and BEFORE the `WEEKS.forEach(...)` loop, add:

```js
    const c0 = ctx();
    const beforeTasks = BEFORE.filter((t) => taskMatches(t, c0));
    if (beforeTasks.length) {
      h += '<details class="ktm-week ktm-phase" open><summary class="ktm-week-head"><span class="ktm-caret" aria-hidden="true">▸</span><span class="ktm-week-title">Before kick off</span><span class="ktm-week-meta">Pre-Day 1</span></summary><div class="ktm-week-body">';
      beforeTasks.forEach((t) => {
        const on = !!checked[t.id];
        h += `<div class="ktm-task${on ? ' on' : ''}" data-ktm-task="${t.id}" role="button" tabindex="0" aria-pressed="${on}"><span class="ktm-box" aria-hidden="true">${on ? '✓' : ''}</span><span class="ktm-task-text"><span class="ktm-task-label">${esc(t.label)}</span><span class="ktm-task-meta">${roleChips(t.owner, t.support)}</span></span></div>`;
      });
      h += '</div></details>';
    }
```

Note: `BEFORE` tasks must be checkable and persist like week tasks. They already get wired because Step 6 of `render()` attaches handlers to every `[data-ktm-task]`. For the progress count, include them: in `visibleTasks()` (Task 2), append after the WEEKS loop:

```js
    BEFORE.forEach((t) => { if (taskMatches(t, ctx())) list.push(t); });
    THROUGHOUT.forEach((t) => list.push(t));
```

- [ ] **Step 3: Render the injection-workshop block**

In `render()`, immediately after the Before block, add:

```js
    const injBlocks = [];
    if (c0.discovery) injBlocks.push({ name: 'Discovery injection', sub: 'Days 1-5 · led by Solutions Architect + Designer · POD participates', ws: WORKSHOPS_DISCOVERY, offset: 0 });
    if (c0.design) injBlocks.push({ name: 'Design injection', sub: 'Provisional 5-day structure · led by Solutions Architect + Designer', ws: WORKSHOPS_DESIGN, offset: c0.discovery ? 5 : 0 });
    injBlocks.forEach((b) => {
      h += `<details class="ktm-week ktm-phase" open><summary class="ktm-week-head"><span class="ktm-caret" aria-hidden="true">▸</span><span class="ktm-week-title">${esc(b.name)}</span><span class="ktm-week-meta">Parallel overlay</span></summary><div class="ktm-week-body"><p class="ktm-phase-sub">${esc(b.sub)}</p>`;
      b.ws.forEach((w) => {
        h += `<div class="ktm-ws"><span class="ktm-ws-day">Day ${w.day + b.offset}</span><span class="ktm-ws-body"><span class="ktm-ws-title">${esc(w.title)} <span class="ktm-ws-dur">${esc(w.duration)}</span></span><span class="ktm-ws-what">${esc(w.whatWeDo)}</span>${roleChips(w.lead[0], w.lead.slice(1).concat(w.support))}</span></div>`;
      });
      h += '</div></details>';
    });
```

- [ ] **Step 4: Add the Day 14 framing note to the milestone strip**

In `render()`, in the `guarantees.forEach((g) => {...})` loop that builds `.ktm-miles`, append the optional note. Replace that loop body with:

```js
    guarantees.forEach((g) => {
      const tagCls = g.tag === 'guarantee' ? ' is-guarantee' : ' is-note';
      const note = g.note ? `<p class="ktm-mile-note">${esc(g.note)}</p>` : '';
      h += `<div class="ktm-mile"><p class="ktm-mile-day">Day ${g.day}</p><p class="ktm-mile-date">${fmt(g.date)}</p><p class="ktm-mile-label">${esc(g.text)}</p>${note}<p class="ktm-mile-tag${tagCls}">${esc(g.tag)}</p></div>`;
    });
```

(`guarantees` is built from `GUARANTEES.map(...)`; `g.note` carries through automatically.)

- [ ] **Step 5: Render the Throughout + Operating-notes block**

In `render()`, replace the existing HDD block line:

```js
    h += '<div class="ktm-hdd"><strong>Week 5 onward — HDD Mode:</strong> every change becomes a hypothesis with a PostHog experiment set up before it ships. Weekly client meetings report hypothesis → metric before → metric after → conclusion → next experiment, through Day 90.</div>';
```

with:

```js
    h += '<div class="ktm-throughout"><p class="ktm-eyebrow">Throughout the 90 days</p>';
    THROUGHOUT.forEach((t) => {
      const on = !!checked[t.id];
      h += `<div class="ktm-task${on ? ' on' : ''}" data-ktm-task="${t.id}" role="button" tabindex="0" aria-pressed="${on}"><span class="ktm-box" aria-hidden="true">${on ? '✓' : ''}</span><span class="ktm-task-text"><span class="ktm-task-label">${esc(t.label)}</span><span class="ktm-task-meta">${roleChips(t.owner, t.support)}</span></span></div>`;
    });
    h += '</div>';
    h += '<div class="ktm-hdd"><strong>Week 5 onward — HDD Mode:</strong> every change becomes a hypothesis with a PostHog experiment set up before it ships. Weekly client meetings report hypothesis → metric before → metric after → conclusion → next experiment, through Day 90.</div>';
    h += '<div class="ktm-notes"><p class="ktm-eyebrow">Operating notes</p><ul>';
    OPERATING_NOTES.forEach((n) => { h += `<li>${esc(n)}</li>`; });
    h += '</ul></div>';
```

- [ ] **Step 6: Add Before + injection + Throughout to the copy output**

In `copyChecklist()`, after the `GUARANTEES.forEach(...)` block and the `lines.push('')`, insert the Before + injection sections; and after the `WEEKS.forEach(...)` loop, insert the Throughout section. Concretely, after `lines.push('')` (the blank line following guarantees) add:

```js
    const cc = ctx();
    const beforeCC = BEFORE.filter((t) => taskMatches(t, cc));
    if (beforeCC.length) {
      lines.push('## Before kick off (Pre-Day 1)');
      beforeCC.forEach((t) => {
        const box = checked[t.id] ? '- [x]' : '- [ ]';
        lines.push(`${box} ${t.label} ${ownersText(t)}`);
      });
      lines.push('');
    }
    if (cc.discovery) {
      lines.push('## Discovery injection (Days 1-5, parallel)');
      WORKSHOPS_DISCOVERY.forEach((w) => lines.push(`- Day ${w.day} (${w.duration}) — ${w.title}: ${w.whatWeDo}`));
      lines.push('');
    }
    if (cc.design) {
      const off = cc.discovery ? 5 : 0;
      lines.push('## Design injection (provisional)');
      WORKSHOPS_DESIGN.forEach((w) => lines.push(`- Day ${w.day + off} (${w.duration}) — ${w.title}: ${w.whatWeDo}`));
      lines.push('');
    }
```

And just before `navigator.clipboard.writeText(...)`, add:

```js
    lines.push('## Throughout the 90 days');
    THROUGHOUT.forEach((t) => lines.push(`- ${t.label} ${ownersText(t)}`));
    lines.push('');
    lines.push('## Operating notes');
    OPERATING_NOTES.forEach((n) => lines.push(`- ${n}`));
```

- [ ] **Step 7: Add styles for the new blocks**

In the `<style is:global>` block, after the `.ktm-hdd strong` rule, add:

```css
  .ktm-phase { border-left: 3px solid var(--purple-light, #A78BC4); }
  .ktm-phase-sub { font-size: 12px; color: var(--muted-blue); margin: 12px 0 10px; }
  .ktm-ws { display: flex; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .ktm-ws:last-child { border-bottom: none; }
  .ktm-ws-day { flex: 0 0 auto; font-size: 11px; font-weight: 700; color: var(--purple-light, #A78BC4); min-width: 46px; }
  .ktm-ws-body { display: flex; flex-direction: column; gap: 4px; }
  .ktm-ws-title { font-size: 13.5px; color: var(--off-white); font-weight: 600; }
  .ktm-ws-dur { font-size: 10.5px; color: var(--muted-blue); font-weight: 400; }
  .ktm-ws-what { font-size: 12.5px; line-height: 1.5; color: var(--muted-blue); }
  .ktm-mile-note { font-size: 11px; line-height: 1.5; color: var(--purple-light, #A78BC4); margin: 6px 0 0; }
  .ktm-throughout { background: var(--navy-card); border: 1px solid var(--navy-mid); border-radius: 12px; padding: 16px 18px; margin-top: 12px; }
  .ktm-notes { background: var(--navy-card); border: 1px solid var(--navy-mid); border-radius: 12px; padding: 16px 18px; margin-top: 12px; }
  .ktm-notes ul { margin: 10px 0 0; padding-left: 18px; }
  .ktm-notes li { font-size: 12.5px; line-height: 1.6; color: var(--off-white); margin-bottom: 6px; }
```

- [ ] **Step 8: Verify build + behavior**

Run: `npm run build` (expect: passes).
Run: `npm run dev`. With Path 3 (discovery on, prior-info off), kickoff Wed 2026-07-22, mobile on, generate. Verify:
- A "Before kick off" card shows repo + Vercel only (PRD/TRD/integrations hidden because prior-info is off).
- Check "Prior information exists": PRD/TRD/integrations tasks appear in "Before kick off".
- A "Discovery injection" card lists the five workshops with Day 1-5, durations, and Sol.Arch + Designer chips.
- Turn on "Design injection": a second card appears; its days read Day 6-10 (offset after discovery).
- The Day 14 milestone card shows the internal-target note under the label.
- A "Throughout the 90 days" card lists the three daily items with chips; an "Operating notes" card lists the three notes.
- Checking a Before or Throughout task updates the progress count and survives reload.
- Copy checklist → paste: contains `## Before kick off`, `## Discovery injection`, `## Throughout the 90 days`, and `## Operating notes` sections.

- [ ] **Step 9: Commit**

```bash
git add src/components/TaskMapGenerator.astro
git commit -m "feat: before-kickoff, injection workshops, throughout blocks + Day 14 framing

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Regenerate the offline companion + update the asset intro copy

Bring the paste-friendly Markdown and the page intro in line with the new model.

**Files:**
- Modify: `docs/tractionlab-kickoff-checklist.md` (served at `/starters/tractionlab-kickoff-checklist.md`)
- Modify: `src/content/assets/task-map-generator.md`

**Interfaces:** none (content only).

- [ ] **Step 1: Rewrite `docs/tractionlab-kickoff-checklist.md` to the fullest case**

Replace the whole file with the maximal template (Path 3, discovery on, prior-info on, mobile on), including owners, the Before phase, the discovery week, and the Throughout section. Use this exact content:

```markdown
# TractionLab Kickoff Checklist
Designli | TractionLab | derived from the Task Map Generator

This is the **maximal template** (from-scratch build, discovery injection on, prior information available, mobile app). The interactive tool at `/library/task-map-generator` branches by entry path and injection, so it will show fewer items for Impact Week / SolutionLab paths. Day numbers are calendar days from kickoff (Day 1 = kickoff). Task dates in the tool pull off weekends to the prior Friday; the contractual guarantees (Day 14/30/60/90) keep their true calendar date. **(Owner · Support)** marks who does each task and who validates it. **[CRITICAL]** blocks downstream work; **[MOBILE ONLY]** applies only to mobile projects.

---

## Before kick off (Pre-Day 1)
- [ ] Repo created from the traction-lab template (Owner: Tech Lead)
- [ ] Vercel project created for prototypes/previews (Owner: Tech Lead)
- [ ] First PRD iteration (Owner: PO · Support: Tech Lead, Developer)
- [ ] First TRD iteration (Owner: Tech Lead · Support: PO, Developer)
- [ ] Third-party integrations overview plan, e.g. AI, payment gateways, IAP (Owner: Tech Lead)

## Discovery injection (Days 1-5, parallel, led by Solutions Architect + Designer, POD participates)
- Day 1 (2h) Understanding the Business: kickoff, product overview, business model, features, users, branding/design questionnaire, current issues.
- Day 2 (1h) Design Concepts & Workflow: align design direction, brainstorm the main workflow, define the problem statement, product future.
- Day 3 (1h) Prototype Demo & Review: live interactive prototype, gather feedback.
- Day 4 (1.5h) Prioritization Session: prioritize features, map what is critical for launch.
- Day 5 (1h) Final Review & Next Steps: final design presentation, review the custom 30-60-90 milestones.

## Week 1 — Foundation (Priority 1)
- [ ] Day 1 — Founder orbit users identified & commitment obtained (Owner: PO · Support: Client) [CRITICAL]
- [ ] Day 1 — Founder domain name confirmed (Owner: PO · Support: Client) [CRITICAL]
- [ ] Day 1 — Apple Developer account process started (Owner: PO · Support: Client) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — DUNS number requested, required for Apple Developer account (Owner: PO · Support: Client) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — Google Play Console account process started (Owner: PO · Support: Client) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — Full go-live asset list sent to client: terms, privacy policy, domain, store & processor accounts (Owner: PO · Support: Client)
- [ ] Day 1 — Client's standby list of orbit users collected (Owner: PO · Support: Client)
- [ ] Day 1 — Dev & staging infrastructure created (Owner: Tech Lead · Support: Developer)
- [ ] Day 1 — Repo created under client's own GitHub org (Owner: Tech Lead)
- [ ] Day 1 — Store apps and CI/CD pipelines set up (Owner: Tech Lead · Support: Developer) [MOBILE ONLY]
- [ ] Day 1 — Backend creation started (Owner: Developer · Support: Tech Lead)
- [ ] Day 1 — PostHog account created & project configured (Owner: PO)
- [ ] Day 1 — Internal cohort created, PO/Dev/TL (Owner: PO)
- [ ] Day 1 — Customer cohort created, founder & stakeholders (Owner: PO)
- [ ] Day 1 — Early monetization discussion held with the client (Owner: PO · Support: Client)
- [ ] Day 2 — Dynamic cohort configured for all other signups (Owner: PO)
- [ ] Day 2 — PostHog email channels configured (Owner: PO)
- [ ] Day 2 — Value proposition written & approved (Owner: PO · Support: Client)
- [ ] Day 3 — ICP research completed (Owner: PO)
- [ ] Day 4 — Waitlist landing page live (Owner: PO)
- [ ] Day 4 — PostHog tracking connected to landing page (Owner: PO)
- [ ] Day 4 — Feedback widget integrated, routing to GitHub Issues (Owner: PO)
- [ ] Day 4 — Slack notification for new feedback configured (Owner: PO)
- [ ] Day 4 — Testable build in the client's hands, mock data / web variant if needed (Owner: Developer · Support: Tech Lead) [CRITICAL]
- [ ] Day 5 — 3 waitlist emails drafted & configured in PostHog (Owner: PO)
- [ ] Day 7 — Monetization strategy documented (Owner: PO · Support: Client)

## Week 2 — Activation (Priority 2)
- [ ] Day 8 — Personal outreach completed for founder orbit users (Owner: PO)
- [ ] Day 8 — Drip campaign running for all waitlist signups (Owner: PO)
- [ ] Day 8 — Primary social channel claimed with brand handle (Owner: PO)
- [ ] Day 9 — Product live or webapp safety net deployed (Owner: Developer · Support: Tech Lead) [CRITICAL]
- [ ] Day 9 — Profile complete: logo, banner, bio, waitlist link (Owner: PO)
- [ ] Day 9 — First post published (Owner: PO)
- [ ] Day 10 — All PostHog events verified against internal cohort (Owner: PO)
- [ ] Day 11 — PostHog funnel configured with minimum event set (Owner: PO)
- [ ] Day 12 — Target persona one-pager complete (Owner: PO)
- [ ] Day 14 — Deployed version live with a user from the standby list (Owner: Developer · Support: PO, Client) [CRITICAL]
- [ ] Day 14 — "We have met our commitment" posted to Basecamp (Owner: PO)

## Week 3 — Conversion (Priority 3)
- [ ] Day 15 — Client disagreement window: make requested changes only, no new scope (Owner: Developer · Support: Tech Lead, PO)
- [ ] Day 15 — Keep working down the standby list (Owner: PO · Support: Client)
- [ ] Day 18 — Landing page converted from waitlist to signup (Owner: PO)
- [ ] Day 19 — Onboarding drip sequence active (Owner: PO)
- [ ] Day 20 — Monetization model designed & scheduled into the plan (Owner: PO · Support: Tech Lead)

## Week 4 — Learning (Priority 4)
- [ ] Day 24 — First user interviews completed (Owner: PO · Support: Client)
- [ ] Day 25 — Interview findings documented & summarized (Owner: PO)
- [ ] Day 25 — PostHog funnel reviewed, drop-offs identified (Owner: PO)
- [ ] Day 27 — First HDD experiment proposed & configured in PostHog (Owner: PO)
- [ ] Day 28 — Week 5 client meeting agenda built around results (Owner: PO)
- [ ] Day 28 — Monetization features scoped & prioritized (Owner: PO · Support: Tech Lead, Developer)

## Throughout the 90 days
- Daily Basecamp post: progress and any client blockers tracked publicly (Owner: PO)
- Daily marketing/traction activity to the client (Owner: PO)
- Chase outstanding client go-live items every touch (Owner: PO · Support: Client)

## Guarantees (true calendar dates, never pulled off weekends)
- Day 14 — Refund window closes (also the internal aggressive first-user target, ~2-week buffer before Day 30)
- Day 30 — First user
- Day 60 — App ready for store submission (mobile) / product ready to scale (web)
- Day 90 — First dollar of revenue

## Operating notes
- Beat dependency blockers with mock data or internal accounts; build the core flow now, swap in real integrations when client credentials arrive.
- When the client goes quiet, keep building off the approved Discovery Injection.
- Days 31-90: monetization model implemented alongside the HDD cadence.
- Week 5 onward — HDD Mode: every change is a hypothesis with a PostHog experiment before it ships; weekly client meetings report metric before/after.
```

- [ ] **Step 2: Update the asset intro copy**

In `src/content/assets/task-map-generator.md`, replace the `summary` frontmatter value and the first body paragraph. Set the summary to:

```
summary: "The full cross-functional traction-lab operating model: pick an entry path, auto-date every task and guarantee, see who owns and supports each one, and copy it into Slack or Basecamp."
```

Replace the first body paragraph (the one starting "The interactive generator above builds...") with:

```
The interactive generator above builds the complete traction-lab task map for your project. Pick the entry path (Impact Week, SolutionLab, or from scratch), toggle the discovery/design injections and whether prior information exists, then enter a kickoff date. Every task auto-dates on calendar days (Day 1 = kickoff) and pulls off weekends to the prior Friday, while the Day 14 / 30 / 60 / 90 guarantees stay on their true contractual dates. Each task shows its owner and supporting roles, and the map covers the Before-kick-off phase, the injection workshop week, and the standing daily work. Check tasks off as you go (progress saves per project on this device) and copy the whole thing into a Slack Canvas or Basecamp.
```

- [ ] **Step 3: Verify build + served files**

Run: `npm run build` (expect: passes).
Run: `npm run dev`. Open `http://localhost:4321/starters/tractionlab-kickoff-checklist.md` — confirm the new content serves. Open `http://localhost:4321/library/task-map-generator` — confirm the intro paragraph reads the new copy and the download link still works.

- [ ] **Step 4: Commit**

```bash
git add docs/tractionlab-kickoff-checklist.md src/content/assets/task-map-generator.md
git commit -m "docs: sync offline checklist + asset intro to the v2 operating model

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-review — spec coverage

- **Full operating model / issue #5 (all activities):** Task 1 adds go-live asset list, standby list, infra, store pipelines, backend, Day-4 build, Day-14 deployed-user + Basecamp flag, disagreement window, monetization design→scoped, ICP research, early monetization discussion. ✓
- **Issue #4 (owner + participants):** Task 3 owner/support chips + copy. ✓
- **Issue #6 (weekend pull):** Task 4. ✓
- **Issue #7 (Before you start / foundation):** Task 1 `BEFORE` + Task 5 render, prior-info gated. ✓
- **Issue #8 (paths / injections):** Tasks 1-2 path selector + injection toggles + gating; Task 5 injection render. ✓
- **Issue #9 (meeting notes):** Task 1 Day-4 build, Day-14 content + note, Throughout, Operating notes; Task 5 renders them. ✓
- **Structure decision (data split):** Task 1. ✓
- **Offline companion sync:** Task 6. ✓
- **Guarantees stay true-date:** Task 4 Step 4 + Task 1 comments. ✓
- **Both-injections provisional (Days 1-5 / 6-10):** Task 5 Step 3 offset. ✓
- **Role set PO/SA/DES/DEV/TL/CLIENT, no LEAD:** Task 1 `ROLES`. ✓

## Notes for the implementer

- The client script is one big function file; apply the snippets at the anchors named in each step. After each task, regenerate a map in the browser before committing — there is no unit-test safety net.
- `checked` state is keyed by task `id`; every new task/BEFORE/THROUGHOUT item has a unique `id`, so check-off and persistence work with no extra wiring beyond the existing `[data-ktm-task]` handler loop.
- Do not deploy. The PO runs `vercel --prod` separately after reviewing.
```
