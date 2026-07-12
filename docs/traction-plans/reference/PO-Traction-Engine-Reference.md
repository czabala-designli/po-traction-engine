# HDD — PO as Traction Engine: Complete Reference

> Source: hdd.designli.co (PO as Traction Engine, Core Traction Activities, Traction Menu + all 52 activity playbooks).
> **Legend:** 🅱️2🅱️ = applies to / best for B2B · 🅲 = applies to / best for B2C/consumer · ⚙️ = requires dev work (PO owns hypothesis + spec, pod builds).

---

## 1. PO as Traction Engine

The PO role has expanded beyond managing a hypothesis portfolio: the PO is now responsible for helping the product get its first users.

**Why it's the PO's job.** Non-technical founders don't know how to get users. Devs shouldn't do it — they're the execution engine for hypotheses. The PO has the deepest product knowledge on the pod and now has AI tools that make growth work executable without a dedicated growth team. POs don't need to be marketers; they need to be curious, systematic, and willing to experiment — the same skills that make a good PO.

**Two tracks of traction work:**

| Track | Includes | Who executes |
|---|---|---|
| **Parallel (AI-executable)** | Landing pages, copy, social setup, email sequences, prospect lists, community research | PO with Claude Code — no dev involvement |
| **Dev-dependent** ⚙️ | Referral programs, waitlist mechanics, viral loops, onboarding optimization | PO owns hypothesis + spec; pod builds it |

Some traction work is **front-loaded** (before dev, to validate there's an audience worth building for); some runs **in parallel** throughout.

**The mindset.** Hypothesis-driven experimentation applied to distribution. Same HDD loop: form a hypothesis about who your first users are and how to reach them, test it, measure it (PostHog), adjust. Example traction hypothesis: a belief about a channel + a measurable outcome + a timeframe.

**Primary tool:** Claude Code for the parallel track (scaffold landing pages, draft copy, write outreach, research channels).

---

## 2. Core Traction Activities (mandatory — every Vision→V1 project, no exceptions)

These should be in place **before** significant dev work. They take hours, not days, and form the foundation everything else builds on.

### Establish Credibility
1. **Write a clear value proposition** — one sentence: what it is, who it's for, what it does for them. PO drafts with Claude, tests variants on the landing page. Becomes the foundation for all copy everywhere. Don't move on until you can say it in one sentence without jargon.
2. **Launch a landing page with a waitlist** — before a single line of product code. Built (scaffolded, not hand-crafted) with Claude Code. *Stack:* Astro or Next.js + Resend for email capture. Must include: value-prop headline, 2–3 benefit bullets, waitlist signup form.
3. **Claim the primary social channel** — one channel matching the ICP; don't spread thin. 🅱️2🅱️ → **LinkedIn**; 🅲 → **Instagram or TikTok**; **dev tools** → **X/Twitter**. Set up profile, post value prop, link to landing page.

### Find Your First User
4. **Configure PostHog — the full stack** — install on landing page + product from day one. Not just analytics: session recording, event tracking (waitlist signup, CTA clicks, page views), post-signup survey ("How did you hear about us?" + "#1 problem you're hoping this solves"), landing-page funnel (visitor → CTA click → signup), feature flags for cohort targeting. PO owns it because PO interprets the data.
5. **Define & document the first cohort** — a targeting document (not a persona exercise) the whole pod references: who are the first 10–50 users (name them if possible), what they have in common, where they spend time on/offline, how you'll reach them. Specific enough that someone else could execute outreach from it.
6. **Set up a waitlist drip email** — at least one follow-up when someone joins. *Tool:* Resend + Claude copy. Minimum two-email sequence ("here's what we're building and why" / "here's what's coming and how you can help shape it").
7. **Figure out where they live** — strategy differs by type:
   - 🅲 **B2C:** identify 3–5 communities where the target user already spends time (Reddit, Facebook Groups, Slack/Discord, niche forums). Be present and learn their language before asking for anything.
   - 🅱️2🅱️ **B2B:** build a targeted prospect list (company, contact, email, why they fit). Even a Google Sheet works. Feeds direct outreach — B2B often involves sales, not just inbound. *Tools:* Apollo.io (free tier), LinkedIn, Hunter.io, Claude for copy.

---

## 3. Traction Menu (optional — choose by project stage & ICP)

Unlike the core activities, these are a menu you pick from. Each activity below is a full playbook (structure: Why it matters · When to run it · What you'll need · Step-by-step · Templates · Definition of done · Common pitfalls · How to talk about it with the client).

### 3.1 Cohort Building — finding & recruiting the right early users

#### Cold outreach to prospect list 🅱️2🅱️
**Purpose:** Inbound to a brand-new product is ~zero; for B2B the first ten users come from reaching out by name to a specific human with the problem. Gives an honest signal on value prop/ICP. Requires a specific, identifiable role and a working live funnel.
**Tools:** Apollo.io, Hunter.io, Claude

**Steps:** 1. Tighten the ICP before pulling the list 2. Build the list (30 contacts) 3. Set up the sending infrastructure 4. Draft the email with Claude 5. Personalize one line per recipient 6. Send in waves, not all at once 7. Follow up twice, then stop 8. Log everything

#### Post in niche communities 🅲 (also B2B niches)
**Purpose:** Communities are full of your ICP speaking in plain language. Reddit covers almost every B2B & B2C ICP; works best for B2C, local services, and professional niches (real estate agents, trainers, restaurant operators). Lead with value, not promotion.
**Tools:** Reddit, Facebook Groups, Indie Hackers, Discord

**Steps:** 1. Find the right communities 2. Lurk 3–5 days before posting 3. Make your first contribution — no promotion 4. Frame your post correctly 5. Post and engage immediately 6. Handle moderator pushback 7. Track which community drives signups

#### Recruit through founder's network
**Purpose:** The first 10–20 users of almost every successful product came from people the founder already knew — the relationship lowers the trust barrier. Exhaust this before cold outreach or ads. PO's job is to make it easy enough that the founder actually sends the messages.
**Tools:** Claude for copy

**Steps:** 1. Export and compile the contact list 2. Classify contacts into three buckets 3. Draft the message with Claude 4. Address the awkwardness directly 5. Send in batches of 10 per day 6. Follow up once, kindly 7. Convert "yes I\u2019ll try it" into actual usage

#### Run a beta tester survey
**Purpose:** Qualifies users before they waste the team's time and ties self-reported motivation to actual in-product behavior — surfacing your real ICP. Five questions at the right moment beats a month of aggregate analytics.
**Tools:** PostHog Surveys

**Steps:** 1. Decide when to trigger the survey 2. Write the 5 questions 3. Configure the survey in PostHog 4. Monitor response rate 5. Connect responses to behavior 6. Act on the answers

#### Partner with a community leader 🅲 (niche)
**Purpose:** A newsletter author, Discord mod, podcast host, or micro-influencer has already earned the ICP's trust. Works well for niche B2C where one trusted voice reaches hundreds of ideal users. Not influencer marketing — engagement rate & audience specificity beat follower count, and the endorsement must be genuine.
**Tools:** Direct outreach, Claude for copy

**Steps:** 1. Identify the right community leaders 2. Research each candidate before outreach 3. Decide what to offer 4. Send the outreach 5. Structure the deal simply 6. Track attribution 7. What to do if they ghost

### 3.2 Content & Copy — building an audience through useful content

#### “Why we're building this” founder post 🅱️2🅱️ LinkedIn · 🅲 Substack
**Purpose:** People buy from people, not brands. An authentic origin story builds trust and travels (personal posts get reshared; company pages don't). Publish where the ICP is: LinkedIn for B2B credibility, Substack for thought-leadership or consumer owned-audience plays.
**Tools:** Claude, LinkedIn, Substack

**Steps:** 1. Extract the origin story in the founder's words 2. Identify the four-part structure 3. Draft with Claude 4. Founder rewrites in their voice — not polishes it 5. Choose the platform based on where the ICP lives 6. Time the post and line up engagement 7. Engage with every reply for 24 hours 8. Repurpose the post into other content

#### SEO landing page 🅱️2🅱️ + searchable niches (not pure 🅲 apps)
**Purpose:** Unlike outreach/ads, SEO compounds for months/years. Target a problem keyword with buyer intent. Not for pure consumer apps whose ICP scrolls rather than searches. Expect 3–6 months to rank — start now anyway.
**Tools:** Claude Code, Astro

**Steps:** 1. Find the right keyword — intent beats volume 2. Map the page structure before writing anything 3. Scaffold the page with Claude Code 4. Write the content — or have Claude draft it 5. Handle on-page SEO — the five things that actually matter 6. Ship it on the main site or a subdomain 7. Submit to Google Search Console and wait

#### Waitlist newsletter
**Purpose:** A cold waitlist goes stale in 4–6 weeks. One weekly email keeps it warm and filters for engaged users (openers/repliers become power users). Cheapest market research there is. (Tue/Wed mornings work best for B2B audiences.)
**Tools:** Beehiiv (free tier)

**Steps:** 1. Set up Beehiiv in 20 minutes 2. Import your waitlist 3. Embed the signup form on the landing page 4. Write the first edition — introduce the newsletter 5. Establish the weekly format and stick to it 6. Send on the same day and time every week 7. Grow the list passively while you run other plays

#### Comparison page 🅱️2🅱️ / buyer-intent
**Purpose:** Buyers comparison-shop (“{competitor} alternative”). Own that page or a competitor/review site will. Sharpens positioning and captures high-intent search. Needs a named competitor buyers know, or a clear status-quo workflow.
**Tools:** Claude Code, Astro

**Steps:** 1. Decide: named competitor or status quo workflow? 2. Map the pain → relief pairs from real user research 3. Scaffold the page with Claude Code 4. Write the comparison content — be honest, not dishonest 5. Build the SEO layer 6. Add internal links and submit

### 3.3 Social & Community — presence & engagement on the primary channel

#### Consistent posting
**Purpose:** Virality is a lottery; consistency is a strategy. 3x/week minimum on the primary channel builds a known audience. Claude batches a week of content from the value prop + three things that happened this week.
**Tools:** Claude

**Steps:** 1. Define the content mix 2. Set up the weekly brief 3. Run the Claude batching prompt 4. Founder reviews and personalizes 5. Schedule the posts 6. Engage hard for the first two hours after each post 7. Track what's actually working 8. Repurpose across channels

#### Community engagement 🅱️2🅱️ LinkedIn · 🅲/dev-tools Discord
**Purpose:** 15 min/day answering questions in 3–5 relevant communities builds credibility, feedback, and costs only time. Never post a link in the first message. LinkedIn best for B2B; Discord best for dev tools, consumer apps, and niche communities.
**Tools:** Reddit, LinkedIn, Discord

**Steps:** 1. Pick the right communities 2. Set up keyword alerts 3. Follow the 90/10 rule — and mean it 4. Write replies that actually help 5. When sharing your product is appropriate 6. Build a reputation before you need it 7. Respond to DMs immediately 8. Know when to graduate to running your own community

#### Create a community for early users 🅲/dev Discord · 🅱️2🅱️ Slack
**Purpose:** Makes users feel like insiders, routes feedback directly, lowers churn. Don't launch empty (needs ~50 active users). Default to Discord unless the ICP is corporate / B2B enterprise → Slack.
**Tools:** Discord (free), Slack (free tier)

**Steps:** 1. Choose Discord vs. Slack 2. Set up the channel structure 3. Seed activity before inviting anyone 4. Write the onboarding message 5. Founder shows up daily for 30 days 6. Run an async event in week two 7. Install moderation rules (light touch) 8. Prevent the community from dying

#### Product Hunt launch 🅱️2🅱️ (badge boosts conversion)
**Purpose:** Primarily a legitimacy signal, not an acquisition channel — a Top-5-of-day badge does more for B2B conversion than almost any other early activity. Launch only when there's something real to show (not a landing page).
**Tools:** Product Hunt

**Steps:** 1. Build the hunter relationship (2–3 weeks before) 2. Set up your Ship page (2 weeks before) 3. Prep launch assets 4. Build the support list (10 days before) 5. Launch at 12:01am PT exactly 6. The first hour hustle 7. Work the full day 8. Post-launch leverage

### 3.4 Growth Mechanics ⚙️ — require dev work; PO owns hypothesis + spec, pod builds

#### Waitlist with referral unlock ⚙️ 🅲 / peer-network (not B2B single-buyer)
**Purpose:** Turns each signup into a recruiter — a classic pre-launch viral mechanic. Works best with clear demand. Not for B2B enterprise where the ICP is a single procurement decision-maker with no peer network.
**Tools:** PO writes the hypothesis + spec

**Steps:** 1. Write the hypothesis 2. Design the tier structure 3. Write the spec for the pod 4. Write the email copy with Claude 5. Hand off to the pod with the spec 6. Seed the referral mechanic yourself first 7. Measure K factor after the first 100 signups

#### Referral program post-launch ⚙️
**Purpose:** A referred user converts 3–5x and churns at half the rate (trust: someone vouched). Incentive design (discount vs. free month vs. upgrade) matters by product.
**Tools:** PO writes the hypothesis + spec

**Steps:** 1. Decide the incentive structure 2. Set the benchmark 3. Write the spec for the pod 4. Place the share trigger at the right moment 5. Minimize friction in the share step 6. Write the share message and reward emails with Claude 7. Monitor for fraud from day one 8. Kill it if the math doesn't work after 90 days

#### Onboarding optimization ⚙️
**Purpose:** Most products lose 60–80% of new users in the first session — an onboarding problem, not marketing. B2B activation is often the same action twice in the first week; consumer is often completing a personalizing setup step.
**Tools:** PostHog funnels + session replay

**Steps:** 1. Define the activation event 2. Build the activation funnel in PostHog 3. Watch 5–10 session replays of drop-offs 4. Form the hypothesis 5. Spec the fix for the pod 6. Run the A/B test with PostHog feature flags 7. Read the result and decide

#### &quot;Invite a teammate&quot; mechanic ⚙️ 🅱️2🅱️
**Purpose:** The most effective B2B growth loop — one user pulls in colleagues. Best when the product has multi-user value.
**Tools:** PO writes the hypothesis + spec

**Steps:** 1. Confirm the product gets better with teammates 2. Define the trigger moment 3. Decide on named seats vs. open invites 4. Write the spec for the pod 5. Write the invite email with Claude 6. Set success metrics before the pod ships 7. Review the data at 30 days

### 3.5 Validation & Research — learning from early cohorts to feed the portfolio

#### 30-minute user interview
**Purpose:** The most valuable early thing a PO can do — the only artifact that tells you *why*. Focus on problems, not features. Don't pitch; listen. Record with consent.
**Tools:** Claude for script, Loom or Zoom

**Steps:** 1. Define the question you're trying to answer 2. Identify who to recruit (ICP only) 3. Send the recruiting message 4. Draft the script with Claude 5. Run the interview — listen more than you talk 6. Take one-line observations during the call 7. Synthesize after 5 interviews 8. Turn patterns into hypotheses

#### In-app cohort survey
**Purpose:** Captures the experience while it's fresh and ties responses to behavior data. 5 questions max, triggered after a key action.
**Tools:** PostHog Surveys

**Steps:** 1. Pick one survey type for this run 2. Write 5 questions maximum — include one open-ended 3. Set the trigger in PostHog 4. Test it yourself before enabling it for users 5. Let it run until you have 30+ responses 6. Pull the responses and tie them to behavior 7. Synthesize the open-ended responses with Claude

#### Session recording review
**Purpose:** Users describe what they meant to do, not what they did — recordings show reality. Block 30 min/week. Confirm PII masking first.
**Tools:** PostHog Session Replay

**Steps:** 1. Confirm PII masking is active before watching anything 2. Build your filter before opening recordings 3. Watch in 1.5x speed for the first pass 4. Log observations in real time — timestamp and one line 5. Mark sessions worth sharing before closing them 6. Separate 'fix this sprint' from noise 7. Share the most important clips

#### Weekly &quot;what did we learn&quot; summary
**Purpose:** Learnings disappear without capture. One paragraph/week; feeds directly into the portfolio review — traction results are hypotheses too.
**Tools:** Internal doc or Notion

**Steps:** 1. Set up the doc once 2. Write three bullets — nothing more 3. Write it in 5 minutes — don't polish 4. Post it in the pod Slack channel 5. Read six weeks in sequence before every portfolio review 6. Feed patterns into the hypothesis portfolio

### 3.6 Paid Acquisition Testing — own the learning loop before spending real money

#### Micro-budget ad test 🅲 Meta · 🅱️2🅱️ Google search
**Purpose:** $200–500 to validate messaging & ICP targeting with data instead of opinion. Meta Ads for B2C/visually-driven/lifestyle/social; Google Ads better for B2B with specific search terms.
**Tools:** Meta Ads Manager, Google Ads, Claude

**Steps:** 1. Write the test hypothesis 2. Pick the platform 3. Generate 5 ad variants with Claude 4. Set up the budget split 5. Build the campaign in Ads Manager 6. Confirm tracking before launching 7. Let it run 7 days, then read the results 8. Kill and synthesize

#### Retargeting setup
**Purpose:** Reaches visitors who weren't ready — cheapest paid channel there is. Pod handles the pixel; PO defines the audience logic.
**Tools:** Meta Pixel, Google Tag Manager

**Steps:** 1. Spec the pixel install for the pod 2. Create the retargeting audience in Meta 3. Create the exclusion list 4. Write retargeting creative — different from cold ads 5. Set the budget and schedule 6. Confirm the pixel is firing correctly 7. Compare retargeting vs. cold acquisition costs

#### Attribution tracking
**Purpose:** Without UTMs every channel reads as 'direct/unknown'. UTM discipline from day one so the founder knows which channel drove which signups.
**Tools:** PostHog, UTM.io

**Steps:** 1. Define your UTM convention 2. Document it and share it 3. Set up UTM.io with your convention 4. Tag every link going out 5. Verify PostHog is capturing UTMs 6. Build the channel breakdown view in PostHog 7. Read channel quality, not just volume 8. Build the habit into team workflow

### 3.7 Partnerships & Co-Marketing — leverage other people's audiences

#### Integration co-launch 🅱️2🅱️
**Purpose:** The most defensible early growth move in B2B SaaS: build a small technical connection between two products sharing an ICP, then co-promote. Both sides benefit.
**Tools:** Direct outreach, Claude for copy

**Steps:** 1. Identify the right partner 2. Scope the minimum viable integration 3. Reach out to the partner 4. Align on the launch scope 5. Build the integration 6. Coordinate launch day 7. Track the spike and post-launch maintenance

#### Co-branded content
**Purpose:** Puts your name in front of a new audience with borrowed credibility. Joint webinar, case study, or blog post with a non-competing product that shares your ICP.
**Tools:** Claude

**Steps:** 1. Find the right partner 2. Pitch the content idea, not a vague partnership 3. Choose the right format 4. Draft the content with Claude 5. Split the promotion work explicitly 6. Launch and track

#### Affiliate or reseller structure 🅱️2🅱️ (rarely 🅲)
**Purpose:** Turns best referrers into a sales channel that runs without you. For B2B with a clear touchpoint partner (consultants, agencies, adjacent SaaS). Consumer products with no clear referral path rarely benefit.
**Tools:** Rewardful, direct tracking

**Steps:** 1. Define the program structure 2. Identify partner candidates 3. Recruit the first 5 partners personally 4. Set up tracking with Rewardful 5. Build partner enablement materials 6. Define payout cadence and abuse guardrails

### 3.8 Competitive Intelligence — know what you're up against & how to position

#### Competitive landscape tracker
**Purpose:** A living doc: who competitors are, what they charge, what they launched, where they're weak. Updated monthly. Claude summarizes changelogs and review sites.
**Tools:** Claude, G2, competitor blogs

**Steps:** 1. Define who counts as a competitor 2. Set up one page per competitor 3. Run the monthly update with Claude 4. Flag the customer complaint patterns 5. Update before any positioning conversation 6. Share the monthly diff with the founder

#### Win/loss analysis
**Purpose:** Every closed deal (won or lost) is a data point with a reason that expires fast. Five data points here beat a hundred survey responses.
**Tools:** Internal doc, Claude for synthesis

**Steps:** 1. Set up the trigger — within 48 hours of every decision 2. Reach out verbally first, by email if needed 3. Run the 5-question script 4. Record verbatim — don't summarize during the call 5. Log the entry immediately after the call 6. Synthesize after 5+ entries with Claude 7. Feed patterns into pricing, positioning, and feature priority

### 3.9 Brand & Design System Maturity — when MVP-look becomes a liability

#### Visual polish pass
**Purpose:** At some point 'rough' costs deals (first paying customer, investor demo, enterprise prospect). A cleanup, not a redesign. Pod executes.
**Tools:** PO writes the spec; pod executes

**Steps:** 1. Pull the top 5 screens from PostHog 2. Walk through each screen as a new user 3. Group issues into categories 4. Annotate — don't redesign 5. Prioritize the list with the pod 6. The pod executes 7. QA sign-off before/after

#### Design system documentation
**Purpose:** Prevents UI drift as features pile up; makes every future sprint faster. Component library, color tokens, typography, spacing.
**Tools:** PO owns; pod maintains

**Steps:** 1. Audit what actually exists in the product 2. Collapse variants to the minimum viable set 3. Document color tokens 4. Document the type scale 5. Document the spacing scale 6. Document the core components 7. Hand off to the pod for implementation 8. Set a review cadence

#### Transactional email design
**Purpose:** Receipts, resets, notifications are the most-seen pieces and usually look terrible. Claude drafts copy, pod templates them.
**Tools:** Claude for copy; pod for templates

**Steps:** 1. Build the inventory — every email the product sends 2. Pick one master template 3. Write copy for each email with Claude 4. Write the email subject lines separately 5. Spec the template for the pod 6. QA every email before launch 7. Set up basic email metrics

### 3.10 Platform Expansion & Ecosystem — when the product outgrows its first surface

#### Second platform scoping
**Purpose:** Web→mobile or vice versa. The big failure is building the second platform wrong, not late. Define an MVP of 3 things, not feature parity. Natural upsell into another pod engagement.
**Tools:** PO-led discovery

**Steps:** 1. Pull the signal from PostHog first 2. Run 10 discovery interviews focused on the new platform 3. Separate 'translates directly' from 'native-only' 4. Define the MVP as 3 things, not feature parity 5. Confirm the tech approach with the pod 6. Write the one-page scope document 7. Present to the founder and get sign-off

#### API strategy 🅱️2🅱️
**Purpose:** Turns a product into a platform — customers connect it to their stack and it becomes infrastructure. Developer docs, rate limits, authentication.
**Tools:** PO scopes; pod builds

**Steps:** 1. Interview the 3 anchor customers about their integration use cases 2. Define the 5 MVP endpoints 3. Decide on authentication 4. Spec rate limits and quotas 5. Write the developer docs with Claude 6. Build and test with the 3 anchor customers 7. Define the rollout and pricing

#### Webhook & automation support 🅱️2🅱️ (Zapier default)
**Purpose:** Power users live in a stack (Slack, Notion, HubSpot, Airtable); connect or lose them. Reduces churn for power users. Zapier is the default for most B2B SaaS; Make second.
**Tools:** Zapier, Make

**Steps:** 1. Run 5–10 user interviews to find the real triggers and actions 2. Decide: Zapier first, Make second, or both at once 3. Spec the MVP triggers and actions for the pod 4. Build a sandbox and test account for Zapier review 5. Write the Zapier listing copy 6. Submit for Zapier review and expect 4–8 weeks 7. Launch: claim the listing, write the use cases, push from user docs

### 3.11 Monetization & Pricing — test willingness to pay & optimize the upgrade path

#### Pricing experiment
**Purpose:** Most founders guess and leave money on the table. Test willingness to pay with early cohorts across three tiers.
**Tools:** Stripe, PostHog feature flags

**Steps:** 1. Research what the market already charges 2. Run a Van Westendorp survey in PostHog 3. Design three tiers maximum 4. Write the pricing page copy with Claude 5. Create Products and Prices in Stripe 6. Set up a PostHog feature flag to A/B test the pricing

#### Free-to-paid conversion funnel 🅱️2🅱️ feature-gate common
**Purpose:** Having a free tier and a working conversion funnel are different things. Instrument the upgrade path and test triggers (usage limits, time trials, feature gates). Feature-gating suits B2B where upgrades unlock team/admin features.
**Tools:** PostHog, Stripe

**Steps:** 1. Build the funnel in PostHog 2. Choose the right trigger type for your product 3. Write the upgrade hypothesis 4. Write the upgrade view copy 5. Spec the paywall UX for the pod 6. A/B test trigger placement 7. Measure the tradeoff

#### Churn interview
**Purpose:** When someone cancels/goes inactive, a 15-min call or 3-question survey. Cheapest source of product truth. Don't ask 'would you come back if…'.
**Tools:** Claude for script, PostHog cohorts

**Steps:** 1. Build the churn cohort in PostHog 2. Write the outreach — personal email, not a survey link 3. Run the 15-minute interview with three questions 4. Don't ask 'would you come back if...' 5. Offer an incentive for cold outreach 6. Synthesize after 5+ interviews 7. Feed findings to the pod

### 3.12 Retention & Lifecycle — keep users engaged after signup

#### Lifecycle email sequence
**Purpose:** Behavior-triggered emails (welcome, activation nudge, 'you haven't been back', milestone). PO writes logic + copy; platform delivers.
**Tools:** Loops.so or Customer.io free tier, Claude for copy

**Steps:** 1. Set up Loops.so and connect PostHog 2. Define the five trigger conditions 3. Write copy for each email with Claude 4. Build the sequences in Loops 5. Measure the right metrics 6. Iterate on the worst-performing email each month

#### Push notification strategy
**Purpose:** Borrowed attention: useful brings users back, annoying gets you uninstalled. Define 3–5 triggers worth interrupting someone's day.
**Tools:** PO designs; pod implements

**Steps:** 1. Define the permission ask moment 2. Design the notification categories 3. Write the 3–5 notification rules 4. Write the spec for the pod 5. Write notification copy with Claude 6. Measure opt-out rate per notification 7. Measure retention impact, not just opens

#### Weekly engagement review
**Purpose:** Without a weekly read, decisions run on intuition and recency bias. DAU/WAU, feature adoption, session depth; one paragraph on what's working.
**Tools:** PostHog dashboards

**Steps:** 1. Build the PostHog dashboard 2. Learn to read the retention curve 3. Run the 30-minute weekly ritual 4. Post in pod Slack and send to the founder 5. Connect findings to the next sprint

### 3.13 Distribution & Marketplace — passive acquisition channels that compound

#### App store optimization mobile apps
**Purpose:** The app stores are search engines; most mobile discovery happens in-store. Screenshots, description, keywords, review solicitation.
**Tools:** Claude, App Store Connect, Google Play Console

**Steps:** 1. Research keywords for each store separately 2. Optimize the title and subtitle 3. Write the description with Claude 4. Design the screenshots — the highest-leverage 30 minutes you'll spend 5. Set up the in-app review prompt 6. Seed initial reviews from power users 7. Respond to every review — especially the bad ones

#### Integration directory listings 🅱️2🅱️ (Zapier near-universal)
**Purpose:** If the product connects to other tools, get listed in their marketplaces — each listing is a passive acquisition channel. Zapier applies to almost every B2B SaaS.
**Tools:** Zapier, HubSpot, Shopify app store

**Steps:** 1. Map which directories matter for your ICP 2. Check the integration bar for each directory 3. Write the listing copy with Claude 4. Build the screenshots 5. Submit and wait — but do it now 6. Track signups by source from each listing 7. Ask to be featured

#### Aggregator/review site presence 🅱️2🅱️ G2/Capterra · 🅲 Trustpilot
**Purpose:** B2B buyers check G2/Capterra before buying; consumer buyers check Trustpilot. Create profiles, seed early reviews. Pure hustle, no dev work.
**Tools:** G2, Capterra, Product Hunt

**Steps:** 1. Claim the profiles on G2 and Capterra 2. Write the profile descriptions with Claude 3. Upload screenshots — current ones, not from the beta 4. Identify 8–10 power users for the review seed 5. Send the review request — personally, not in bulk 6. Run the Product Hunt launch as a coordinated event 7. Respond to every review on G2 and Capterra 8. Maintain the listings

### 3.14 Investor & Stakeholder Readiness — package the product & data for external audiences

#### Metrics dashboard for investors
**Purpose:** Investors fund trajectories; an always-current dashboard shows momentum. Activation rate, retention curve, revenue, growth. Don't hide bad numbers.
**Tools:** PostHog, Astro

**Steps:** 1. Pick the right metrics for the stage 2. Build the PostHog dashboard 3. Make it shareable 4. Set the update cadence 5. Don't hide bad numbers 6. Send a monthly Loom walkthrough 7. Tie the numbers to the fundraise narrative

#### Technical due diligence prep Series A
**Purpose:** A Series A firm's technical advisor has ~48 hours to assess codebase, infra, and practices. Architecture docs, test coverage, dependency audit. Pod generates; PO packages.
**Tools:** SonarQube, internal docs

**Steps:** 1. Start before you're asked 2. Request the technical artifacts from the pod 3. Review for red flags before packaging 4. Write the 1-page executive summary 5. Assemble the full package 6. Set up the 30-minute technical advisor call 7. Update after the call

### 3.15 Compliance & Trust — the boring stuff that becomes a blocker when a real buyer shows up

#### Privacy policy & terms of service 🅱️2🅱️ procurement blocker
**Purpose:** A B2B prospect's procurement team asks before signing; missing docs become a blocker. Claude drafts; founder's lawyer reviews (non-negotiable).
**Tools:** Claude drafts; lawyer reviews

**Steps:** 1. Inventory all third-party services that touch user data 2. Generate the first draft with Claude 3. Send to a lawyer for review — non-negotiable 4. Put both documents on your product domain 5. Link them from the footer of every page 6. Link them at signup 7. Set a review cadence

#### Accessibility audit 🅲 lawsuit risk · 🅱️2🅱️ procurement
**Purpose:** WCAG 2.1 AA baseline. Consumer products get sued; B2B procurement checklists include it. Increasingly legal, not just nice-to-have. PO runs automated scan, pod fixes critical issues.
**Tools:** axe DevTools, pod fixes

**Steps:** 1. Install axe DevTools and run the automated scan 2. Understand the categories of issues 3. Prioritize: critical issues first 4. Write the spec for the pod 5. Do a 30-minute screen reader spot-check 6. Retest after the pod fixes 7. Set a recurring cadence

#### SOC 2 / security posture 🅱️2🅱️ enterprise
**Purpose:** Enterprise buyers ask 'are you SOC 2 certified?'. Start evidence collection early even if formal certification comes later. Understand compliant vs. certified.
**Tools:** Vanta, Drata (early-stage tiers)

**Steps:** 1. Understand the difference between 'compliant' and 'certified' 2. Set up Vanta or Drata 3. Understand what gets monitored 4. Implement the non-negotiable controls 5. The 6-month evidence collection window 6. Answer security questionnaires in the interim 7. Build a Trust Center page 8. Budget for the Type II audit

### 3.16 Customer Support Infrastructure — someone has to answer when users get confused

#### Knowledge base / help docs
**Purpose:** Every support question is a product failure (confusing UI or missing docs). Claude drafts articles from common interview questions & session-replay confusion points.
**Tools:** Claude Code, Astro

**Steps:** 1. Build the article backlog first 2. Define the structure (keep it flat) 3. Choose where to host 4. Draft articles with Claude 5. Link from inside the product 6. Add search 7. Maintain it from the support inbox 8. Retire stale articles

#### Support workflow
**Purpose:** Even a shared inbox needs a triage process: who responds, how fast, what escalates to the pod as bug vs. feature request.
**Tools:** Crisp.chat free tier or Gmail

**Steps:** 1. Set up the inbox 2. Define the SLA 3. Categorize every ticket 4. Define the escalation path 5. Write the response template library 6. Turn patterns into product changes 7. Measure what matters 8. Know when to graduate


---

## Quick B2B vs. B2C Cheat Sheet

| Dimension | 🅱️2🅱️ B2B | 🅲 B2C / Consumer |
|---|---|---|
| Primary social channel | LinkedIn | Instagram / TikTok (dev tools: X) |
| First-user acquisition | Cold outreach to a named prospect list; founder network | Niche communities, community-leader partnerships |
| Community platform | Slack | Discord |
| Paid test platform | Google Ads (search intent) | Meta Ads (visual/social) |
| Content/SEO | SEO + comparison pages (high buyer intent) | Less SEO (users scroll, not search) |
| Viral loop | "Invite a teammate" mechanic | Waitlist referral unlock |
| Reviews / trust | G2, Capterra; SOC 2; privacy/terms for procurement | Trustpilot; accessibility (lawsuit risk) |
| Partnerships | Integration co-launch; affiliate/reseller via consultants & agencies | Community-leader endorsements |
| Monetization | Feature-gate upgrades (team/admin) | Usage limits / time trials |

*Generated from the HDD Traction Menu playbooks. Each playbook additionally contains Templates, a Definition of Done checklist, Common Pitfalls, and client-framing guidance not fully reproduced here.*
