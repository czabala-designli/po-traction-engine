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

// Before kick off — pre-Day-1 phase (~2 business days before Day 1). Repo + Vercel
// are always required; the PRD/TRD, integrations plan, and additional-tools setup
// only exist when prior information exists.
export const BEFORE = [
  { id: 'b-1', label: 'Repo created from the traction-lab template', day: 0, owner: 'TL', support: [] },
  { id: 'b-2', label: 'Vercel project created (for prototypes/previews)', day: 0, owner: 'TL', support: [] },
  { id: 'b-3', label: 'First PRD iteration', day: 0, owner: 'PO', support: ['TL', 'DEV'], show: { priorInfo: true } },
  { id: 'b-4', label: 'First TRD iteration', day: 0, owner: 'TL', support: ['PO', 'DEV'], show: { priorInfo: true } },
  { id: 'b-5', label: 'Third-party integrations overview plan (e.g. AI, payment gateways, IAP)', day: 0, owner: 'TL', support: [], show: { priorInfo: true } },
  { id: 'b-6', label: 'Additional required tools added to the stack', day: 0, owner: 'TL', support: [], show: { priorInfo: true } },
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
        { id: 'w1-4a', label: "Repo created under client's own GitHub org (enables code transfer anytime)", day: 1, owner: 'TL', support: [] },
        { id: 'w1-stores', label: 'Store apps and CI/CD pipelines set up', day: 1, owner: 'TL', support: ['DEV'], show: { mobile: true } },
        { id: 'w1-backend', label: 'Backend creation (ongoing)', day: 1, dayRange: [1, 7], owner: 'DEV', support: ['TL'] },
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
        { id: 'w1-prd', label: 'PRD drafted & refined (ongoing, from discovery/prior context)', day: 1, dayRange: [1, 8], owner: 'PO', support: ['TL', 'DEV'] },
        { id: 'w1-trd', label: 'TRD drafted & refined (ongoing)', day: 1, dayRange: [1, 8], owner: 'TL', support: ['PO', 'DEV'] },
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
      { name: 'Build', tasks: [
        { id: 'w2-infra', label: 'Dev & staging infrastructure created', day: 8, owner: 'TL', support: ['DEV'] },
        { id: 'w2-migrate', label: 'Prototype migrated from React Native Web to React Native + backend integration (ongoing)', day: 8, dayRange: [8, 17], owner: 'DEV', support: ['TL'], show: { mobile: true } },
      ] },
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
      { name: 'Build', tasks: [
        { id: 'w4-iterate', label: 'Iterate app based on feedback (ongoing)', day: 22, dayRange: [22, 26], owner: 'DEV', support: ['PO'] },
      ] },
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
