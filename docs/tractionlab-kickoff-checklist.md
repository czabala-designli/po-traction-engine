# TractionLab Kickoff Checklist
Designli | TractionLab | derived from the Task Map Generator

This is the **maximal template** (from-scratch build, discovery injection on, prior information available, mobile app). The interactive tool at `/library/task-map-generator` branches by entry path and injection, so it will show fewer items for Impact Week / SolutionLab paths. Day numbers are calendar days from kickoff (Day 1 = kickoff). Task dates in the tool pull off weekends to the prior Friday; the contractual guarantees (Day 14/30/60/90) keep their true calendar date. **(Owner · Support)** marks who does each task and who validates it. **[CRITICAL]** blocks downstream work; **[MOBILE ONLY]** applies only to mobile projects. PostHog is split into two tracks: **waitlist** (landing-page analytics, PO owns) and **product** (the app's own instrumentation).

---

## Before kick off (Pre-Day 1)
- [ ] Repo created from the traction-lab template (Owner: Tech Lead)
- [ ] Prototype project deployed to get customer feedback, Vercel (Owner: Tech Lead)
- [ ] First PRD iteration (Owner: PO · Support: Tech Lead, Developer)
- [ ] First TRD iteration (Owner: Tech Lead · Support: PO, Developer)
- [ ] Research & plan architecture for all third-party integrations: AI, payment gateways, IAP, etc. (Owner: Tech Lead)
- [ ] Create the client-facing list of required tools & integrations (Owner: Tech Lead)

## Discovery injection (Days 1-5, parallel, owned by the whole pod; Sol. Arch + Designer lead, PO participates)
- Day 1 (2h) Understanding the Business: kickoff, product overview, business model, features, users, branding/design questionnaire, current issues.
- Day 2 (1h) Design Concepts & Workflow: align design direction, brainstorm the main workflow, define the problem statement, product future.
- Day 3 (1h) Prototype Demo & Review: live interactive prototype, gather feedback.
- Day 4 (1.5h) Prioritization Session: prioritize features, map what is critical for launch.
- Day 5 (1h) Final Review & Next Steps: final design presentation, review the custom 30-60-90 milestones.

## Week 1 — Foundation (Priority 1)
- [ ] Day 1 — Founder orbit users identified & commitment obtained (Owner: PO · Support: Client) [CRITICAL]
- [ ] Day 1 — Founder domain name confirmed (Owner: PO · Support: Client) [CRITICAL]
- [ ] Day 1 — Google Workspace set up for founder email, Outlook acceptable (Owner: PO · Support: Tech Lead, Client) [CRITICAL]
- [ ] Day 1 — Client business entity (LLC) confirmed: enables the DUNS number and a company Apple Developer account. We confirm it, we do not set it up (Owner: PO · Support: Client) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — Apple Developer account process started (Owner: PO · Support: Client, Tech Lead) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — DUNS number requested, required for Apple Developer account (Owner: PO · Support: Client, Tech Lead) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — Google Play Console account process started (Owner: PO · Support: Client, Tech Lead) [CRITICAL] [MOBILE ONLY]
- [ ] Day 1 — Full go-live asset list sent to client: domain, store & processor accounts, anything else that blocks go-live (Owner: PO · Support: Client)
- [ ] Day 2 — Advise client to source Terms, EULA & Privacy Policy from their attorney, or self-generate at app-privacy-policy-generator.firebaseapp.com. We do not draft these (Owner: PO · Support: Client)
- [ ] Day 1 — Client's standby list of orbit users collected (Owner: PO · Support: Client)
- [ ] Day 1 — Repo created under client's own GitHub org (Owner: Tech Lead)
- [ ] Day 1 — Store apps and CI/CD pipelines set up (Owner: Tech Lead · Support: Developer) [MOBILE ONLY]
- [ ] Days 1-7 — Backend creation, ongoing (Owner: Developer · Support: Tech Lead)
- [ ] Day 1 — PostHog account created & project configured (Owner: PO) [waitlist]
- [ ] Day 1 — Internal cohort created, PO/Dev/TL (Owner: PO) [waitlist]
- [ ] Day 1 — Customer cohort created, founder & stakeholders (Owner: PO) [waitlist]
- [ ] Day 2 — Dynamic cohort configured for all other signups (Owner: PO) [waitlist]
- [ ] Day 2 — PostHog email channels configured, domain/DNS (Owner: PO · Support: Tech Lead) [waitlist]
- [ ] Day 2 — PostHog SDK installed in the product app, captures out-of-the-box events (Owner: Developer · Support: PO) [product]
- [ ] Day 2 — Value proposition written & approved (Owner: PO · Support: Client)
- [ ] Day 3 — ICP research completed (Owner: PO)
- [ ] Day 4 — Waitlist landing page live (Owner: PO)
- [ ] Day 4 — PostHog tracking connected to landing page (Owner: PO)
- [ ] Day 4 — Feedback widget integrated, routing to GitHub Issues (Owner: PO)
- [ ] Day 4 — Slack notification for new feedback configured (Owner: PO)
- [ ] Day 5 — 3 waitlist emails drafted & configured in PostHog (Owner: PO)
- [ ] Days 1-8 — PRD drafted & refined, ongoing from discovery/prior context (Owner: PO · Support: Tech Lead, Developer)
- [ ] Days 1-8 — TRD drafted & refined, ongoing (Owner: Tech Lead · Support: PO, Developer)
- [ ] Day 1 — Early monetization discussion held with the client (Owner: PO · Support: Client)
- [ ] Day 3 — Monetization strategy documented, dictates Stripe / IAP integration (Owner: PO · Support: Client)

## Week 2 — Activation (Priority 2)
- [ ] Day 8 — Dev & staging infrastructure created (Owner: Tech Lead · Support: Developer)
- [ ] Day 8 — Testable web variant deployed to get customer feedback, after design is approved (Owner: Developer · Support: Tech Lead)
- [ ] Days 8-17 — Prototype migrated from React Native Web to React Native + backend integration, ongoing (Owner: Developer · Support: Tech Lead) [MOBILE ONLY]
- [ ] Day 8 — Store-submission risk assessed: if client store accounts are blocked, create the app in Designli's own developer account (labelled "traction lab") to hit Day 30, then transfer to the client later (Owner: Tech Lead · Support: PO) [MOBILE ONLY]
- [ ] Day 8 — Personal outreach completed for founder orbit users (Owner: PO)
- [ ] Day 8 — Drip campaign running for all waitlist signups (Owner: PO)
- [ ] Day 9 — Product live or webapp safety net deployed (Owner: Developer · Support: Tech Lead) [CRITICAL]
- [ ] Day 8 — Primary social channel claimed with brand handle (Owner: PO)
- [ ] Day 9 — Profile complete: logo, banner, bio, waitlist link (Owner: PO)
- [ ] Day 9 — First post published (Owner: PO)
- [ ] Day 10 — All waitlist PostHog events verified against internal cohort (Owner: PO) [waitlist]
- [ ] Day 11 — Waitlist PostHog funnel configured with minimum event set (Owner: PO) [waitlist]
- [ ] Day 12 — Target persona one-pager complete (Owner: PO)
- [ ] Day 14 — Deployed version live with a user from the standby list (Owner: Developer · Support: PO, Client) [CRITICAL]
- [ ] Day 14 — "We have met our commitment" posted to Basecamp (Owner: PO)

## Week 3 — Conversion (Priority 3)
- [ ] Day 15 — Product PostHog event plan generated from the PRD/TRD + code, PO runs the AI skill (Owner: PO) [product]
- [ ] Day 16 — Custom product events implemented from the plan, Dev runs the AI skill (Owner: Developer · Support: Tech Lead) [product]
- [ ] Day 16 — North Star metric agreed with the client, from the event plan; set within month 1 (Owner: PO · Support: Client) [product]
- [ ] Day 18 — Landing page converted from waitlist to signup, once the Day 14 milestone is met (Owner: PO)
- [ ] Day 19 — Onboarding drip sequence active for new signups (Owner: PO)
- [ ] Day 15 — Client feedback window: work the decision tree — critical fixes on the existing build first, then push to get users on the app for real data, then negotiate post-Day-30 roadmap items (Owner: PO · Support: Developer, Tech Lead)
- [ ] Day 15 — Keep working down the standby list (Owner: PO · Support: Client)
- [ ] Day 20 — Monetization model designed & scheduled into the plan (Owner: PO · Support: Tech Lead)

## Week 4 — Learning (Priority 4)
- [ ] Days 22-26 — Iterate app based on feedback, ongoing (Owner: Developer · Support: PO)
- [ ] Day 24 — First user interviews completed (Owner: PO · Support: Client)
- [ ] Day 25 — Interview findings documented & summarized (Owner: PO)
- [ ] Day 26 — Definition of ready agreed with the client, when the product is ready to bring on more users (Owner: PO · Support: Client)
- [ ] Day 24 — First product funnels built from the critical user paths (Owner: PO) [product]
- [ ] Day 25 — PostHog session recordings reviewed to understand user behavior (Owner: PO) [product]
- [ ] Day 25 — Product funnels reviewed, drop-offs identified (Owner: PO) [product]
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
- Legal docs (Terms, EULA, Privacy Policy) come from the client's attorney, or the client self-generates them at app-privacy-policy-generator.firebaseapp.com. Designli does not draft client legal docs; our templates are a last-resort fallback only when go-live is otherwise blocked.
- If the client has no domain or logo yet, use placeholders but tell them the app cannot be submitted until they are provided (reflect this in the contract).
- 5-10 active users are needed before HDD and funnel analysis reveal real patterns. You can still build funnels from the critical paths and watch session recordings with fewer.
- Days 31-90: monetization model implemented alongside the HDD cadence.
- Week 5 onward — HDD Mode: every change is a hypothesis with a PostHog experiment before it ships; weekly client meetings report metric before/after.
