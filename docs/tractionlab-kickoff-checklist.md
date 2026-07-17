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
- [ ] Additional required tools added to the stack (Owner: Tech Lead)

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
- [ ] Day 1 — Repo created under client's own GitHub org (Owner: Tech Lead)
- [ ] Day 1 — Store apps and CI/CD pipelines set up (Owner: Tech Lead · Support: Developer) [MOBILE ONLY]
- [ ] Days 1-7 — Backend creation, ongoing (Owner: Developer · Support: Tech Lead)
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
- [ ] Days 1-7 — PRD drafted & refined, ongoing from discovery/prior context (Owner: PO · Support: Tech Lead, Developer)
- [ ] Days 1-7 — TRD drafted & refined, ongoing (Owner: Tech Lead · Support: PO, Developer)
- [ ] Day 7 — Monetization strategy documented (Owner: PO · Support: Client)

## Week 2 — Activation (Priority 2)
- [ ] Day 8 — Dev & staging infrastructure created (Owner: Tech Lead · Support: Developer)
- [ ] Days 8-17 — Prototype migrated from React Native Web to React Native + backend integration, ongoing (Owner: Developer · Support: Tech Lead) [MOBILE ONLY]
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
- [ ] Days 22-26 — Iterate app based on feedback, ongoing (Owner: Developer · Support: PO)
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
