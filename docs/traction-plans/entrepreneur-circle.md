# Entrepreneurs Circle Traction Plan

> DRAFT / SECOND WORKED EXAMPLE. Built centrally in po-traction-engine because the EC repo is not on this machine. Grounded in the real ICP research the PO ran (`icp-communities-bleeding-owner-operator.md`, 19 Jun 2026). Move it into the EC lab repo before real use.
>
> **NOTES:**
> 1. Kickoff confirmed: 19 May 2026.
> 2. Foundation readiness: three items confirmed by the PO (waitlist landing page, PostHog events, PostHog email workflow); the rest are inferred, verify with the EC PO.
> 3. Buyer ICP is deferred (seller-first GTM); a buyer-ICP pass is a horizon item.
> 4. Localization is a hard requirement: every client-facing asset must be Arabic (Saudi dialect), not English.

Kickoff: Tue 19 May 2026 · Day 14 (refund window closes, guarantee): Mon 01 Jun 2026 · Day 30 (admin panel live, guarantee): Wed 17 Jun 2026 · Day 60 (app submitted, proposal milestone): Fri 17 Jul 2026 · Day 90 (first $ goal): Sun 16 Aug 2026
Business type: two-sided marketplace (business sellers and buyers), **seller-first** GTM; KSA, Arabic-first, mobile-first · Stage: pre-launch (view-only app pending submission; web app being built for monetization)
Domain: entrepreneurscircle.net
Primary channel(s): Facebook groups (KSA restaurant-owner community, Saudi Buy & Sell), Telegram (تنازل / commercial-RE listing channels), X/Twitter hashtags (#تنازل #محل_للتنازل #مشروع_للبيع #تقبيل). Not Reddit or LinkedIn.
First-cohort target: the first ~100 sellers ("Bleeding Owner-Operators": KSA café/restaurant/retail owners needing to exit), seeded with free listings + signup discount
Success metric: first paid conversion (first dollar by Day 90); leading indicators: app approved, verified listings live, seller signups
Client: Ali + partners · Team: Andres, Julian (client-facing), Stefani, Raul (discovery)
Contract note: 30-day (admin panel live) and 90-day (first $) are contractual; the 60-day app-submission is a proposal milestone, not a financial guarantee.

## ICP (seller-first, from icp-research)
- **The Bleeding Owner-Operator** (source: [icp-communities-bleeding-owner-operator.md](../../../Downloads/icp-communities-bleeding-owner-operator.md); move to EC repo): a Saudi owner-operator of a small physical business (café, restaurant, retail, salon, gym) bleeding cash on rent/salaries, needing to exit via business sale, assets sale, or lease transfer (تنازل).
- **Differentiator:** trusted KYC/NAFATH-verified listings, the opposite of Haraj's noise ("what's posted here is real, and I'm taken seriously"). Competitors to scan: intqal.sa, Mushtari, forsh.sa, mashar3i, post.sa, OpenSooq, Aqar.
- **GTM (seller-first):** seed supply before demand. Win the first ~100 verified sellers with temporary incentives, prove real inventory exists, then onboard the buyer side (separate ICP, future research pass).
- **Channels:** Facebook seller communities, Telegram تنازل channels, X hashtags. All login-gated, so each needs manual validation before investing time.
- **Language:** Arabic (Saudi dialect) for everything client-facing.

## Foundation readiness
| Item | Status | Link / note |
|---|---|---|
| Value proposition | Verify | trust/verification angle (KYC/NAFATH vs Haraj); confirm one-line Arabic value prop |
| Landing page | Done | waitlist landing page live |
| PostHog full stack | In Progress | events live; verify session recording / survey / funnel / flags |
| Waitlist / seller-nurture emails | Done | PostHog email-sequence workflow live |
| ICP approved | Done (seller side) | seller ICP researched 19 Jun; buyer ICP deferred; confirm client approval |
| First cohort documented | Done | first ~100 sellers (Bleeding Owner-Operators) |
| Primary social channel | Identified, validate | FB + Telegram + X communities, all login-gated |
| Brand voice / style | Not done | must be Arabic (Saudi dialect) |
| Blog scaffolding (SEO) | Verify | Arabic intent SEO (تنازل, محل للتنازل, مشروع للبيع) likely valuable |
| Product live | No | view-only app pending App Store / Play submission |

## Detailed plan (Eng. Week 8-11 · submission + seller-supply seeding + first-revenue push)
| Date | Eng. Week / Day | Theme | Action (client-proofed) | Owner | Status | Notes |
|---|---|---|---|---|---|---|
| 07 Jul 2026 | Week 8 / Day 50 | App store accounts | PO prompts client via Basecamp to create the Apple Developer and Google Play accounts (manual approval, not forced publish), explaining they are required to submit at all. | PO | In Progress | Andres/Julian pushing Ali's team |
| 07 Jul 2026 | Week 8 / Day 50 | Web monetization | Extend the existing PostHog email workflow with policy-safe web-offer emails; add Stripe web checkout + intent tracking for dual-pricing (in-app inflated, cheaper on web). | PO | In Progress | ⚙️ pod for web checkout; builds on the live email workflow |
| 14 Jul 2026 | Week 9 / Day 57 | Submit view-only app | Submit the view-only app (browse verified businesses, express interest) for App Store and Play approval. | PO | Not Started | gated on accounts; Day 60 is 17 Jul; approval takes 1-2 weeks |
| 14 Jul 2026 | Week 9 / Day 57 | 60-day flag post | PO posts the Basecamp declaration that the app is ready for submission (default-to-yes framing). | PO | Not Started | soft milestone, not a financial guarantee |
| 14 Jul 2026 | Week 9 / Day 57 | Supply incentive | PO prompts client via Basecamp to approve a seed-supply incentive (free listings for the first 100 sellers + signup discount) to build verified inventory before any buyer push. | PO | Not Started | seller-first per ICP GTM; client-proofed |
| 14 Jul 2026 | Week 9 / Day 57 | Brand voice (Arabic) | Define the Arabic (Saudi dialect) brand voice and writing style for all seller-facing copy. | PO | Not Started | via `brand-voice`; Arabic hard requirement |
| 21 Jul 2026 | Week 10 / Day 64 | Seller signup landing | Evolve the existing waitlist landing into an Arabic seller signup page at entrepreneurscircle.net, leading with the verification/trust angle. | PO | Not Started | via `value-proposition-prompt` + `brand-voice` |
| 21 Jul 2026 | Week 10 / Day 64 | Validate + engage seller communities | Manually validate the FB / Telegram / X communities (login-gated), then engage with Arabic, value-first posts per the community research plan; client-proof any posting on the client's behalf. | PO | Not Started | via `community-post` (Arabic); lead with value, not a pitch |
| 21 Jul 2026 | Week 10 / Day 64 | Competitor scan | Scan intqal.sa, Mushtari, forsh.sa, mashar3i, post.sa for how each handles verification, to sharpen the KYC/NAFATH positioning. | PO | Not Started | feeds value prop + positioning |
| 28 Jul 2026 | Week 11 / Day 71 | ASO (Arabic) | Once the app is approved, optimize the App Store / Play listings with Arabic intent keywords. | PO | Not Started | via `aso-listing`; gated on approval |
| 28 Jul 2026 | Week 11 / Day 71 | First monetization push | Convert seeded sellers to a paid tier on web; measure the first dollar. | PO | Not Started | first-$ push toward Day 90 |

## Horizon (Eng. Week 12-13, to Day 90 · 16 Aug 2026)
- **Week 12-13:** Drive to the first paid conversion (first dollar) on the seller side, with verified inventory proven. Weekly Arabic community cadence in the validated channels.
- **Buyer side:** run a buyer-ICP `icp-research` pass and begin onboarding buyers once supply exists (an empty marketplace has nothing to attract them to).
- **Once the app is approved:** revisit in-app vs web-only monetization per the team's effort assessment.

## Weekly learning log
| Week | What we tried | What we learned (3 bullets max) | Next move |
|---|---|---|---|
| | | | |
