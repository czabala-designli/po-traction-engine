# HDD — PO as Traction Engine: Complete Planning Reference

> **Source:** hdd.designli.co — "PO as Traction Engine", "Core Traction Activities", and all 52 Traction Menu activity playbooks (full text).
> **Purpose:** input for planning traction activities on specific projects.
> **Legend:** 🅱️2🅱️ = B2B · 🅲 = B2C/consumer · ⚙️ = requires dev work (PO owns hypothesis + spec, pod builds).

## Table of Contents
1. PO as Traction Engine
2. Core Traction Activities (mandatory)
3. Traction Menu (optional playbooks by subsection)
4. B2B vs. B2C Cheat Sheet

---

## 1. PO as Traction Engine

The PO role has expanded beyond managing a hypothesis portfolio: the PO is now responsible for helping the product get its first users.

**Why it's the PO's job.** Non-technical founders don't know how to get users. Devs shouldn't do it — they're the execution engine for hypotheses. The PO has the deepest product knowledge on the pod and now has AI tools that make growth work executable without a dedicated growth team. POs don't need to be marketers; they need to be curious, systematic, and willing to experiment — the same skills that make a good PO.

**Two tracks of traction work:**

| Track | Includes | Who executes |
|---|---|---|
| Parallel (AI-executable) | Landing pages, copy, social setup, email sequences, prospect lists, community research | PO with Claude Code — no dev involvement |
| Dev-dependent ⚙️ | Referral programs, waitlist mechanics, viral loops, onboarding optimization | PO owns hypothesis + spec; pod builds |

Some traction work is **front-loaded** (before dev, to validate there's an audience worth building for); some runs **in parallel** throughout.

**The mindset.** Hypothesis-driven experimentation applied to distribution. Same HDD loop: form a hypothesis about who your first users are and how to reach them, test it, measure it (PostHog), adjust. A traction hypothesis has a direction and a measurable outcome over a timeframe.

**Primary tool:** Claude Code for the parallel track — scaffold landing pages, draft copy, write outreach emails, research channels.

---

## 2. Core Traction Activities — mandatory (every Vision→V1 project, no exceptions)

These should be in place **before** significant dev work. They take hours, not days, and form the foundation everything else builds on.

### Establish Credibility

**1. Write a clear value proposition** — one sentence: what it is, who it's for, what it does for them. PO drafts with Claude, tests variants on the landing page. Becomes the foundation for all copy across every channel. *Don't move on until you can say it in one sentence without jargon.*

**2. Launch a landing page with a waitlist** — before a single line of product code. Scaffolded (not hand-crafted) with Claude Code. It doesn't need to be beautiful; it needs to be real and live.
- *Stack:* Astro or Next.js (scaffolded with Claude Code) + Resend for email capture.
- *Must include:* value-proposition headline, 2–3 benefit bullets, waitlist signup form.

**3. Claim the primary social channel** — one channel matching the ICP; don't spread thin.
- 🅱️2🅱️ → **LinkedIn**
- 🅲 → **Instagram or TikTok**
- Dev tools → **X/Twitter**
- Set up the profile, post the value prop, link to the landing page. Social presence also signals legitimacy to investors, prospects, and partners.

### Find Your First User

**4. Configure PostHog — the full stack** — install on the landing page and product from day one. Not just analytics — the full feedback/measurement stack. PO owns setup because PO interprets the data. Checklist: project created + snippet on landing page & product; session recording enabled; event tracking (waitlist signup, CTA clicks, page views); post-signup survey ("How did you hear about us?" + "#1 problem you're hoping this solves?"); landing-page funnel (visitor → CTA click → signup); feature flags for cohort targeting.

**5. Define & document the first cohort** — a targeting document (not a persona exercise) the whole pod references: who are the first 10–50 users (name them if possible); what they have in common; where they spend time on/offline; how you'll reach them. Specific enough that someone else on the pod could execute the outreach from it.

**6. Set up a waitlist drip email** — at least one follow-up when someone joins. *Tool:* Resend + Claude-drafted copy. Minimum two-email sequence ("Thanks for signing up — here's what we're building and why" / "Here's what's coming next — and how you can help shape it").

**7. Figure out where they live** — strategy differs by product type:
- 🅲 **B2C:** identify 3–5 communities where the target user already spends time (Reddit, Facebook Groups, Slack/Discord, niche forums). Be present and understand their language before asking for anything. *Tools:* Reddit, Facebook Groups, Discord.
- 🅱️2🅱️ **B2B:** build a targeted prospect list (company, contact name, email, why they're a fit) — even a Google Sheet works. Feeds direct outreach; B2B often involves sales, not just inbound. *Tools:* Apollo.io (free tier), LinkedIn, Hunter.io, Claude for outreach copy.

---

## 3. Traction Menu — optional playbooks (choose by project stage & ICP)

Unlike the core activities, these are a menu you pick from. Every activity below is the **full playbook** (Why it matters · When to run it · What you'll need · Step-by-step · Templates · Definition of done · Common pitfalls · How to talk about it with the client).


### 3.1 Cohort Building
Finding & recruiting the right early users.

#### Cold outreach to prospect list
Direct email or LinkedIn message to B2B prospects. Keep it personal, short, and specific to their situation. Claude writes the copy.

##### Why this matters
Inbound traffic to a brand-new product is essentially zero. For a B2B product, the first ten users almost always come from someone reaching out by name to a specific human who has the problem. Cold outreach gets a brutally honest signal — if the value prop is unclear or the ICP is wrong, nobody replies. That information is worth more than any survey.
POs own this because they own learning from the early cohort. Outsourcing to a sales rep too early loses the signal about why people did or didn't bite.

##### When to run it
- The product is B2B and the ICP is a specific, identifiable role (not "anyone who likes productivity apps").
- The landing page is live and the waitlist form works end-to-end. Send no traffic to a broken funnel.
- You have at least one specific belief to test — a value prop, a pricing point, a positioning angle. Outreach is a hypothesis test, not a numbers game at this stage.

##### What you'll need
- Apollo.io free tier — 60 verified emails per month is enough for the first cohort. Hunter.io as a backup for missing emails.
- A sending domain — never send from the founder's primary domain. Buy a similar domain (e.g. get-yourcompany.com) and warm it for 7–10 days before sending volume. Mailreef or Instantly handle warming automatically.
- Claude — for ICP definition, list scoring, and copy variations.
- A spreadsheet or Notion DB — track who you contacted, when, response, and outcome. Five columns minimum: name, company, email, sent date, status.
- A target prospect count — start with 30 hand-picked names, not 300. The point is to learn, not to spam.

##### Step-by-step

###### 1. Tighten the ICP before pulling the list
Write a one-paragraph description of who you're targeting that includes: industry, company size, role title, and the specific situation that makes this product relevant. "VP of Operations at logistics companies between 50–500 employees who run their dispatch on spreadsheets" is workable. "Operations leaders" is not.
Test the description with the founder. If they can name three real companies that fit, you're good. If they can't, the ICP is too vague.

###### 2. Build the list (30 contacts)
In Apollo: filter by job title, company size, and industry. Sort by recently funded if relevant — newly funded companies have budget and urgency. Export to CSV.
Don't accept the list as-is. Open each company website, confirm the person still works there (LinkedIn), and write one sentence in a "why this person" column. That sentence becomes the personalization hook in step 4.

###### 3. Set up the sending infrastructure
- Buy the secondary domain. Configure SPF, DKIM, DMARC — Instantly walks you through it. Without these, half the emails go to spam.
- Forward the secondary domain to the primary one so replies route correctly.
- Warm for 7+ days before sending. Skipping this step is the most common reason a campaign delivers nothing.

###### 4. Draft the email with Claude
Use this exact prompt:
```
You are writing cold outreach for a {product description in one sentence}.
The recipient is {ICP description from step 1}.
Goal: get a reply, not a meeting. Reply rate matters more than meeting rate at this stage.

Constraints:
- Maximum 90 words
- No "I hope this finds you well"
- No "quick question"
- Lead with one sentence about a specific pain the ICP feels
- Reference one specific thing about their company (I'll fill this in per recipient)
- One clear ask at the end — not "hop on a 30-min call"
- Plain text, no formatting

Write 3 variations with different opening hooks.
```

###### 5. Personalize one line per recipient
Open each email, replace the personalization placeholder with the "why this person" sentence from step 2. This is the part that determines whether anyone reads past the first line. Do not skip it.

###### 6. Send in waves, not all at once
10 emails per day for the first week, ramping up. Sending 30 in one shot from a fresh domain triggers spam filters and burns the domain.

###### 7. Follow up twice, then stop
- Follow-up 1 (3 business days later): one sentence — "Did this hit your inbox?"
- Follow-up 2 (5 business days after that): different angle — share a one-line user quote or a screenshot of the product.
- After that, stop. More than 3 touches looks desperate and damages the brand.

###### 8. Log everything
Every reply gets logged: who, what they said, did they want a call, what was the objection. After 30 sends, you'll see patterns. Patterns are the deliverable.

##### Templates
Subject: {first name}, dispatch on spreadsheets?
Hi {first name},
{Personalization line — one specific thing about their company, e.g. "Saw your team just opened the Charlotte hub — congrats on the expansion."}
Most ops leaders running 50+ trucks tell us they're stitching together Sheets, Slack, and a clipboard to keep dispatch moving. We built {product} so they can stop.
Worth a 15-minute look? If not, no worries — would love to know what you're using instead.
— {Founder first name}
"Here are 30 prospects exported from Apollo. For each, give a 1–5 fit score based on this ICP: {ICP description}. Output as a CSV with name, company, score, and a one-sentence reason. Skip anyone scoring 1 or 2."

##### Definition of done
- 30 contacts sent, all logged with status.
- At least 3 reply rates calculated: open, reply, positive reply.
- One paragraph synthesis: which value prop variant worked, what objections came up, what the next 30 should test.
- Founder has read the synthesis and signed off on the next iteration.

##### Common pitfalls
- Sending from the wrong domain. One spam complaint on the founder's primary domain damages every transactional email going forward. Always use a secondary domain.
- Treating it as volume. 30 hand-picked sends will outperform 300 generic ones at this stage. Volume comes after the message is proven.
- Asking for a meeting in the first email. The ask is "is this on your radar," not "give me 30 minutes."
- Skipping the warm-up period. A fresh domain sending 30 emails day-one delivers maybe 5 to inbox. The other 25 are wasted research.
- Not logging replies. The synthesis is the deliverable. No log = no synthesis = no learning.

##### How to talk about it with the client
"Cold outreach this early isn't a sales motion — it's the cheapest way to find out whether the value prop survives contact with a real buyer. We're sending 30 emails this week, and what we care about is the replies, not the meetings booked. By Friday I'll bring back a synthesis: which positioning worked, what objections came up, who's worth a real conversation. Then we adjust the message and run another 30."
If they push for higher volume immediately: "We can scale once we know which message converts. Sending 300 of the wrong message just teaches us 300 people don't want the wrong thing."

---
#### Post in niche communities
Share the landing page or ask for feedback in relevant communities. Lead with value, not promotion. Getting 10 quality signups from a relevant subreddit beats 100 random clicks.

##### Why this matters
Niche communities are already full of your ICP. Reddit threads, Discord servers, and Facebook Groups are places where people talk about their problems in plain language — the exact language you should be using in your copy. Showing up there early earns trust, surfaces objections you'd never find in an interview, and can drive a handful of highly qualified signups with zero ad spend.
Most founders post once, get no traction, and give up. That's not a platform problem — it's a sequence problem. Community credibility takes three or four genuine interactions before a promotional post converts.

##### When to run it
- The ICP is specific enough that clear communities exist for them (developers, indie hackers, restaurant owners, HR managers, e-commerce founders).
- The landing page is live and the signup flow works end-to-end.
- You have at least one week before you need results — community trust doesn't happen in 24 hours.
- Don't do this if the ICP is too broad ("small business owners") — you'll spread thin across dozens of communities and convert in none of them.
- Don't do this if the product is still pre-landing-page. Sending curious people to a dead URL is worse than doing nothing.

##### What you'll need
- Reddit — free, enormous, and covers almost every B2B and B2C ICP. Subreddits are indexed by Google, so posts compound over time.
- Indie Hackers — free. Works best for developer tools, SaaS, and productivity products. The audience is builders who also buy tools.
- Discord — free. Join servers relevant to your ICP. Many niches have active Discord communities (e.g., /r/devops Discord, ecommerce operators Discord).
- Facebook Groups — free. Works best for B2C, local services, and professional niches like real estate agents, personal trainers, and restaurant operators.
- A tracking spreadsheet — one row per community: name, link, member count, posts made, signups driven (via UTM link).
- UTM links — one unique link per community so you can trace signups to source. Use UTM.io or build them manually in three seconds.
- Claude — for writing posts that sound like a human who belongs in the community, not a marketer.

##### Step-by-step

###### 1. Find the right communities
Start with Reddit. Search for keywords your ICP would use when complaining about the problem your product solves. Look at which subreddits show up. Good signals: 10k–500k members, posts from the last 7 days, a mix of questions and discussions (not just memes or news links). Avoid subreddits with strict no-promotion rules if you ever plan to share the product — read the sidebar rules before investing time.
ICP examples to get you started: r/entrepreneur and r/smallbusiness for SMB tools; r/webdev and r/SaaS for developer products; r/freelance for freelancer tools; r/restaurantowners for hospitality; r/realestate for proptech; r/personalfinance for fintech. On Discord, use Disboard.org to search by topic. On Facebook, search by job title or problem ("restaurant owners," "freelance designers").
Pick 3 communities total. One primary, two secondary. More than three is noise at this stage.

###### 2. Lurk for 3–5 days before posting
Read posts. Read comments. Note the vocabulary people use. Note the recurring frustrations. Note what gets upvoted. You are not lurking to delay action — you're building the context that makes your first post land instead of flop. If you post on day one, you will sound like an outsider. If you post on day five, you'll sound like someone who belongs there.

###### 3. Make your first contribution — no promotion
Before you say anything about your product, answer a question someone else asked. Pick a thread where your domain knowledge is relevant and write a thorough, useful reply. No mention of the product. This single step is what separates accounts that convert from accounts that get flagged as spam.
Do this 2–3 times in the primary community before any promotional post.

###### 4. Frame your post correctly
The two post types that work are: (1) asking for feedback on a specific problem, and (2) sharing something you learned that the community would find useful. Neither of these is "check out my product." Asking "Does anyone else find that X is painful?" and then mentioning you're building a solution gets real replies. Posting "I built a tool for X — try it free!" gets downvotes.
Use Claude (see template below) to draft the post, then edit it so it sounds like the founder's actual voice. Remove anything corporate, anything that reads like a press release, and anything longer than 250 words.

###### 5. Post and engage immediately
When you post, stay online for the first 30–60 minutes to reply to every comment. Communities reward posts with early engagement. Replies push the thread higher. Ignoring comments signals that you dropped a promo and left — exactly the behavior that gets posts removed.

###### 6. Handle moderator pushback
Some subreddits will remove promotional posts even if you followed the rules. Don't argue. Message the moderator directly: "Understood — I wasn't trying to promote, I was asking for feedback on a problem. Is there a better way to do that here?" Most moderators respond to that. Some won't. Move on to the next community if the rules are genuinely incompatible.

###### 7. Track which community drives signups
Every link you share in communities must have a UTM parameter: ?utm_source=reddit&utm_campaign=niche-communities. Check your analytics weekly. If community A drove 8 signups and communities B and C drove zero, double down on A and drop the others. This data also tells you which problem framing resonated.

##### Templates
```
You are helping a founder post authentically in a niche community.

Product: {one-sentence product description}
ICP: {who the product is for}
Community: {subreddit or Discord name, e.g. r/freelance}
Goal: get replies and feedback, not clicks. Don't make it promotional.

Write a community post using one of these two frames:
1. "I noticed this problem — does anyone else deal with it?" (mention the product only in passing, if at all)
2. "Here's something I learned building in this space" (useful insight, product optional)

Constraints:
- Under 200 words
- Sound like a real person, not a marketer
- No buzzwords, no "excited to share," no "disrupting"
- End with a genuine question that invites replies
```
Community name | Platform | Members | Link | First post date | Posts made | Replies received | Signups (via UTM) | Notes
Add one row per community. Review weekly. Drop any community with zero signups after 4 posts.

##### Definition of done
- 3 communities identified and joined, with notes on audience size and posting rules.
- At least 3 non-promotional contributions made before any promotional post.
- At least 1 post per community in the first two weeks, each with a unique UTM link.
- Tracking spreadsheet live with signup attribution by community.
- One paragraph synthesis: which community drove the most engaged signups, what problem framing got the most replies.

##### Common pitfalls
- Posting on day one. No community history, no credibility. The post gets flagged or ignored. Lurk and contribute first.
- Spreading across 10 communities. Thin presence everywhere beats quality presence nowhere. Pick 3 and go deep.
- Posting a link without context. "Check this out: [link]" is the fastest way to get banned. Every post needs a genuine question or value-add.
- Forgetting UTM parameters. Without tracking, you can't tell which community is working. All communities look the same in your analytics without UTMs.
- Not replying to comments. A post that gets replies and no responses from the author looks abandoned. It also stops climbing in the feed.
- Picking the wrong subreddit tier. r/entrepreneur has 1.5 million members — your post will disappear in minutes. Mid-size subreddits (50k–200k) give better visibility and more targeted readers.

##### How to talk about it with the client
"We're going to spend two weeks inside the three communities where your ICP already hangs out. Not promoting — listening and contributing first. By the end of week one I'll have a clear picture of how they describe the problem you're solving, which is more valuable than any focus group. By the end of week two, we'll have at least one post up in each community with tracked links, and I'll report back on which framing drove actual signups."
If they say they've already tried Reddit and it didn't work: "What did the post say? Usually it's a framing issue — communities punish promotional posts but reward genuine questions. I'll show you what works before we post again."

---
#### Recruit through founder's network
Help the founder draft a personal ask to their existing contacts. The most effective first source of users is almost always people the founder already knows.

##### Why this matters
The first 10–20 users of almost every successful product came from people the founder already knew. Not because they were easy to reach — because the personal relationship lowered the trust barrier enough to get someone to try an unfinished product. Before you spend a single hour on cold outreach or ad spend, exhaust this channel completely.
POs own this because founders often resist doing it. It feels awkward to ask friends for a favor. Part of your job is making it easy enough that the founder actually sends the messages.

##### When to run it
- You have a working product or at least a landing page — never send someone to nothing.
- The founder has been in the workforce for at least a few years and has a real professional network (LinkedIn connections, past colleagues, former clients).
- You need the first cohort fast — this is the fastest channel that exists.
- Don't do this as a substitute for cold outreach to actual ICP. The founder's network is the first source, not the only source. Friends who aren't the ICP will give noisy feedback.

##### What you'll need
- LinkedIn CSV export — the founder's full connection list. Export from LinkedIn Settings → Data privacy → Get a copy of your data → Connections. Takes up to 10 minutes to arrive.
- Phone contacts — export from iPhone (use iCloud.com → Contacts → export vCard) or Android (Google Contacts → Export). Many warm contacts live here, not on LinkedIn.
- A spreadsheet — to classify contacts and track who was messaged, when, and what happened.
- Claude — to draft messages that sound like the founder, not a marketing team.

##### Step-by-step

###### 1. Export and compile the contact list
Pull the LinkedIn CSV and the phone contacts export. Merge them into one spreadsheet. Deduplicate. You're looking for everyone the founder has ever had a real-world or professional interaction with — not just close friends. Former colleagues, ex-clients, people they went to school with, people they met at a conference. Aim for a raw list of 100–300 people.

###### 2. Classify contacts into three buckets
Warm + ICP fit: people the founder knows well who also have the problem the product solves. These get a personal, direct message. This is your highest-value bucket — treat every contact here like a sales call in a text box.
Warm + no ICP fit: people the founder knows well but who aren't users themselves. These get a message asking for a referral — "do you know anyone who deals with X?" Some of the best early users come through this path.
Cold contacts: people the founder met once or connected with on LinkedIn without a real relationship. Skip for now or treat as cold outreach if they're ICP-fit.
You'll typically end up with 20–40 in bucket one, 30–60 in bucket two, and the rest in bucket three. Work buckets one and two.

###### 3. Draft the message with Claude
The message needs to sound like the founder wrote it at 9pm on a Tuesday, not like a sales rep wrote it in a CRM. Use the Claude prompt below. After Claude drafts, the founder must read it out loud. If it doesn't sound like them, edit until it does. Any sentence that sounds corporate gets cut.
Key elements: one sentence on what the product does, one sentence on why you thought of them specifically, one easy ask (try it and tell me what you think — not "can we get on a call").

###### 4. Address the awkwardness directly
Founders hate asking friends for favors. Name it. Tell the founder: "The message makes it easy to say no. You're not asking them to buy anything or commit to anything. You're asking for 10 minutes with a product." The easier you make it to say no, the more people say yes.
Do not ask for a meeting in the first message. Ask them to try the product and reply with one piece of feedback. That's it.

###### 5. Send in batches of 10 per day
Do not blast 50 messages on day one. Send 10 per day, starting with the highest-fit contacts. This gives the founder time to respond to replies thoughtfully, and prevents the messages from feeling like a blast campaign.

###### 6. Follow up once, kindly
If no reply after 5 business days, one follow-up: "Hey — wanted to make sure this didn't get buried. No pressure at all if it's not a fit right now." That's it. No third message to personal contacts. The relationship matters more than the signup.

###### 7. Convert "yes I'll try it" into actual usage
A contact who says "sure, sounds cool!" but never signs up is the most common failure mode. The moment someone says yes, send them the link with a specific first action: "When you sign up, try [specific feature] first and let me know what you think of it." Specificity drives activation. "Check it out" doesn't.

##### Templates
```
You are writing a personal message from a founder to someone they know.

Founder's name: {name}
Product description: {one sentence}
Recipient: {name, their job/role, how the founder knows them}
Why they might care: {one specific reason this person is relevant}

Write a LinkedIn DM or text message that:
- Sounds like the founder wrote it personally, not a marketing team
- Is under 80 words
- Explains what the product does in one sentence
- Mentions specifically why they thought of this person
- Asks only for "10 minutes with the product and one piece of feedback"
- Makes it easy to say no ("no worries at all if it's not relevant")
- No subject line needed — this is a DM, not an email

Write 2 variations.
```
"Hey {name} — I'm building something for {ICP description} and figured you might know a few. Would you mind thinking of one or two people who deal with {problem}? I'd love to get their honest take. No obligation on their end — I'll keep it brief."

##### Definition of done
- Contact list exported, deduplicated, and classified into at least two buckets.
- All bucket-one contacts messaged (minimum 20 messages sent).
- All bucket-two contacts sent a referral ask.
- Every reply logged with outcome: tried product, referred someone, declined, no response.
- At least 5 people have signed up and taken the first in-product action.
- One paragraph summary: who converted, who referred others, what feedback came back.

##### Common pitfalls
- Sending a generic blast. "I'm building something new — check it out!" performs near zero. Every message must reference something specific about the recipient.
- Asking for a meeting in the first message. The ask is "try the product and tell me what you think." Meeting requests feel heavy for a personal favor.
- Skipping bucket two. Warm contacts who aren't ICP-fit are often sitting on a network of people who are. Referrals from trusted sources convert better than cold outreach.
- Not following up on "yes." "Sure, sounds interesting!" is not a signup. Send the link immediately with a specific first action. Don't let the momentum die.
- Not logging responses. Without a log, you have no idea who you've reached out to, who replied, and what the conversion rate was. The log is also what protects the founder from double-messaging someone.

##### How to talk about it with the client
"Before we run a single ad or send a single cold email, we're going to work your existing network. Not because your friends will become paying customers — but because people who trust you will try an unfinished product and tell you the truth. That feedback is worth more than a hundred strangers' signups. I'm going to help you draft the messages so it doesn't feel like you're spamming people. We'll send 10 a day, I'll track everything, and by the end of the week we'll have real users in the product."
If the founder says it feels awkward: "I hear you. We'll write the message together so it sounds like you, not a pitch. We'll make it easy for people to say no. If someone doesn't respond after one follow-up, we move on. The relationship is more important than the signup — but most people will want to help if you ask the right way."

---
#### Run a beta tester survey
Capture interest and qualify early users directly on the landing page or via a follow-up. Ties responses to PostHog user data.

##### Why this matters
A beta survey does two things nothing else does at this stage: it qualifies users before they waste your team's time, and it connects self-reported motivations to actual in-product behavior. When you see that users who answered "X" in the survey churn at half the rate of users who answered "Y," you've found your real ICP — not the imagined one.
Most teams skip this and end up with 200 signups they can't interpret. Five questions at the right moment generates more signal than a month of aggregate analytics.

##### When to run it
- You have beta users signing up — even 10–20 is enough to start.
- You want to segment your early cohort by motivation, role, or use case rather than treating all signups as identical.
- You're trying to decide which ICP to double down on and need data to make that call.
- Don't do this if the product has zero users yet — survey an empty room and you learn nothing. Get the first wave of signups first.
- Don't do this with more than 5 questions. A long survey has a 20% completion rate. A short one has 60–80%.

##### What you'll need
- PostHog Surveys — free tier. In-product surveys with no code required (your pod drops in the PostHog snippet once; PO configures all surveys from the dashboard). Responses automatically link to the PostHog user ID, which connects them to behavior data.
- PostHog installed on the product — the pod handles the one-time integration; PO takes over survey configuration from there.
- Claude — for drafting questions that actually produce useful data (most survey questions are written in a way that guarantees garbage responses).
- A spreadsheet or Notion doc — for capturing response patterns and the actions they informed.

##### Step-by-step

###### 1. Decide when to trigger the survey
The trigger matters more than the questions. Post-signup (immediately after creating an account) works for understanding motivation. Post-first-action (after the user has done the core thing your product is supposed to do) works for understanding experience. Pick one trigger per survey — don't mix them. The post-first-action trigger is usually more valuable because the user has context for what they're reacting to.
In PostHog: create a survey, set the trigger to "After completing event" and pick the event that represents the first meaningful action in the product (e.g., project_created, report_generated, first_message_sent).

###### 2. Write the 5 questions
Use this exact framework. These are the five questions worth asking at beta stage:
- Role/context: "What best describes your role?" (multiple choice — 4–6 options). Lets you segment responses.
- Job to be done: "What were you hoping to do with [product]?" (open text, one sentence). This is the most valuable question — users describe their use case in their own words.
- Problem awareness: "How were you handling this before you found us?" (open text). Reveals what you're actually competing against.
- Fit: "On a scale of 1–5, how disappointed would you be if you could no longer use [product]?" (scale). Sean Ellis's activation benchmark: if 40% say "very disappointed" (5), you have product-market fit in that segment.
- Referral intent: "Who else on your team should know about this?" (open text, optional). Any name here is a warm referral.
These 5 questions, asked at the right moment, will tell you more than a 20-question survey sent a week later.

###### 3. Configure the survey in PostHog
In PostHog → Surveys → New survey: set type to "In-app popover," add your 5 questions, set the trigger. For the appearance, use the minimal style — a big branded survey widget feels intrusive and tanks completion rates. Set "Wait at least X days between surveys" to 30 days so you don't re-ask users who've already responded.

###### 4. Monitor response rate
Response rate benchmarks: 60–80% is excellent, 40–60% is normal, below 30% means the trigger timing is wrong (too early or too late). If response rate is low, check whether the survey is appearing at a moment of friction (loading screen, error state) — that kills completions. Move the trigger to a success moment.

###### 5. Connect responses to behavior
PostHog automatically links survey responses to the user who answered. After 20–30 responses, pull the data and cross-reference: do users who gave a particular answer to question 2 show higher retention at day 14? Do users in a particular role from question 1 activate faster? These correlations are your ICP refinement data.

###### 6. Act on the answers
The survey is worthless if nobody reads it. Within 48 hours of receiving a response, one team member should review it and decide: does this change any hypothesis? Does this person warrant a follow-up interview (especially if they gave a "very disappointed" answer on question 4 — those people are your best early advocates)? Every batch of 10 responses should produce at least one concrete action.

##### Templates
```
Review these beta survey questions for a product that {one-sentence product description}.

Questions: {paste your draft questions}

For each question, tell me:
1. Is it likely to produce actionable data, or is it vague?
2. Would the ICP ({ICP description}) find this easy to answer?
3. Suggested rewrite if needed.

Also flag any questions that are leading (assume positive sentiment) or that could be combined.
```
Subject: Quick question about your {product name} experience
Hi {first name},
You filled out our beta survey and mentioned you'd be very disappointed if you couldn't use the product anymore. That means a lot at this stage. I'd love to spend 20 minutes on a call to understand your use case better — it'd directly shape what we build next.
Would this week work? I'll follow your schedule.
— {Founder name}

##### Definition of done
- PostHog survey live in-product with the correct trigger event.
- At least 20 completed responses collected.
- Responses reviewed and segmented by at least one dimension (role, job-to-be-done, or fit score).
- At least one ICP hypothesis updated or confirmed based on the data.
- High-fit respondents (score 4–5 on question 4) followed up with an interview invite.

##### Common pitfalls
- Triggering too early. A survey that fires 10 seconds after signup asks for feedback the user can't give yet. Wait until after a meaningful first action.
- More than 5 questions. Every question you add cuts completion rate by 10–15%. Pick the questions that produce decisions, not the questions that are interesting.
- Not connecting responses to behavior. A survey in isolation is a pile of opinions. Connected to PostHog user IDs and retention data, it becomes a segmentation tool.
- Ignoring the open-text fields. "What were you hoping to do?" is the most important question and the most commonly ignored. The exact phrases users use belong in your landing page copy.
- Forgetting to follow up. A user who says they'd be "very disappointed" without the product and never hears from you again is a wasted relationship. Those are your best early advocates.

##### How to talk about it with the client
"We're putting a 5-question survey in the product that fires after the first meaningful action. PostHog will link the answers directly to each user's behavior data — so instead of wondering why some users stick around and others disappear, we'll actually know. Within two weeks of launch I'll bring back a segmentation analysis: which type of user is most activated, what use case is most common, and whether the ICP we're targeting is the same one who's actually loving the product."
If they say it might annoy users: "A well-timed, short survey at a success moment actually signals that the product cares. What annoys users is a survey that fires at the wrong moment or asks 15 questions. Five questions after they complete their first project is respectful timing."

---
#### Partner with a community leader
Offer early access in exchange for an intro to their audience. Works well for niche B2C products where one trusted voice reaches hundreds of ideal users.

##### Why this matters
A community leader — a newsletter author, Discord moderator, podcast host, or micro-influencer in your niche — has already done the hardest part of early-stage marketing: they've earned the trust of your ICP. One genuine endorsement from the right person reaches more qualified prospects than three months of cold outreach. The key word is "genuine." An endorsement only works if the leader actually finds the product useful.
This is not influencer marketing. Follower counts are almost irrelevant. Engagement rate and audience specificity are everything.

##### When to run it
- The product is live enough that a community leader can actually use it and have an opinion.
- The ICP is niche enough that identifiable community leaders exist (they will not exist for "everyone who uses software").
- You've exhausted the founder's direct network and need a trusted third-party voice to reach the next ring.
- Don't do this if the product isn't ready to be used. Sending someone with an audience to a broken product damages both the relationship and the brand.
- Don't do this if you haven't researched the leader first. An outreach message that doesn't reference their actual work will be ignored.

##### What you'll need
- A shortlist of 5–10 candidates — newsletter authors (Substack, Beehiiv), Discord moderators, podcast hosts, YouTube creators, or LinkedIn voices in the niche.
- Direct outreach channel — usually email (most newsletters have a public contact address) or a DM on the platform where they're most active.
- Claude — for drafting outreach that's specific enough to not look like a template.
- An offer — early access, lifetime free account, revenue share, or a feature in your product. Know what you're offering before you reach out.
- UTM links — to attribute signups to each community leader's audience.

##### Step-by-step

###### 1. Identify the right community leaders
Size is the wrong filter. A newsletter with 2,000 hyper-engaged readers in your exact niche will outperform a 50,000-subscriber list that's only tangentially relevant. Look for: reply rates (if they publish comment threads or Twitter/X replies, you can see engagement), content quality (do people reference their work?), and audience fit (read three issues or episodes before reaching out).
Where to find them: Substack's search by category, Beehiiv's directory, Podcast Index by niche keyword, Discord servers in your category (server moderators are often community leaders), LinkedIn searches for "I write about X" in the bio. Build a list of 10 candidates and rank them by relevance, not audience size.

###### 2. Research each candidate before outreach
Before writing a single word, read or listen to at least two pieces of their content. You're looking for three things: what do they care about (their recurring themes), what's the gap or frustration they express (your product might solve it), and what tone do they use (your message should match it). A casual Substack author will find a formal corporate pitch off-putting. A data-driven analyst will find vague superlatives insulting.

###### 3. Decide what to offer
Community leaders get pitched constantly. Your offer needs to be specific and one-sided in their favor. Options that work:
- Lifetime free account — low cost to you, high perceived value to them.
- Revenue share — 20–30% of revenue from users they refer, for 12 months. Use Rewardful for tracking.
- Exclusive early access — works best if the product has a waitlist and access is genuinely scarce.
- Feature in your product or case study — naming their community or newsletter as a partner builds their credibility too.
Lead with the offer that's most relevant to their business model. Newsletters want revenue share. Discord moderators often want free tools for their members. Podcast hosts want access and a good story.

###### 4. Send the outreach
Use the Claude prompt below to draft. The message must reference something specific from their content — a specific episode, issue, or post. Generic outreach ("I love your newsletter!") signals you didn't read it. Keep the message under 150 words. Get to the offer quickly. End with a single clear question: "Would this be worth a 20-minute call?"

###### 5. Structure the deal simply
At early stage, keep the agreement informal. A brief email exchange confirming the arrangement is enough. Define: what they'll do (one newsletter mention, one Discord post, one episode segment), what you'll give them, and the timing. Don't over-lawyer it. A one-page summary email from you recapping the agreement protects both parties without requiring a formal contract.

###### 6. Track attribution
Give every community leader a unique UTM link or discount code. You need to know exactly how many signups each partnership drove. Without attribution, you can't tell which partnerships to renew and which to let lapse.

###### 7. What to do if they ghost
One follow-up after 5 business days: "Wanted to make sure this didn't get buried — happy to send more context if it's useful." If no response after the follow-up, move to the next candidate on your list. Do not send a third message. Community leaders who don't respond are either too busy or genuinely not interested — pushing harder damages the brand.

##### Templates
```
You are drafting outreach from a startup founder to a niche community leader.

Product: {one-sentence description}
ICP: {who it's for}
Community leader: {name, platform, what they cover — e.g. "Sarah runs a 4,000-subscriber Substack for freelance UX designers"}
Something specific from their content: {a specific recent post, episode, or piece — don't make this up}
What we're offering: {lifetime access / revenue share / exclusive access}

Write an outreach email that:
- References the specific content piece in the first sentence
- Explains the product in one sentence
- Gets to the offer by sentence four
- Ends with one clear question
- Is under 150 words
- Sounds like a real founder, not a PR firm

Write 2 variations.
```
Subject: Quick summary of what we discussed — {product name} x {leader name}
Hey {name},
Great talking. Here's what we agreed:
- {Leader} will mention {product} in {one newsletter issue / one Discord post / one podcast segment} before {date}.
- We'll provide {lifetime access / X% revenue share on referred users for 12 months}.
- Your unique tracking link: {UTM link}.
Let me know if I've gotten anything wrong. Looking forward to it.

##### Definition of done
- Shortlist of 10 candidates built and ranked by relevance.
- At least 5 outreach messages sent, each referencing specific content from the recipient.
- At least 1 partnership agreed and confirmed in writing.
- Unique UTM link or discount code set up for each active partner.
- Post-launch: signups attributed per partner tracked and reviewed after 2 weeks.

##### Common pitfalls
- Chasing follower counts. A 50,000-subscriber newsletter where your ICP is 5% of the audience delivers 2,500 relevant readers. A 3,000-subscriber newsletter where your ICP is 80% delivers 2,400. Same reach, wildly different conversion.
- Generic outreach. "I love your work and think this would be a great fit for your audience" signals you've never read a single issue. Name something specific or don't reach out.
- No attribution tracking. Without unique links, you'll have no idea whether the partnership drove 5 signups or 500. You can't make renewal decisions without data.
- Over-structuring the deal. A 10-page contract for a newsletter mention kills momentum. A brief email summary is enough at this stage.
- Sending to an unfinished product. A community leader who shares your product and it's broken or confusing has now staked their credibility on your mistake. Don't reach out until the product can stand on its own.

##### How to talk about it with the client
"Instead of trying to build an audience from scratch, we're going to borrow someone else's. There are five people in this niche with audiences of 1,000–10,000 people who are almost all your ICP. One genuine endorsement from the right one gets you more qualified traffic than three months of posting. I'm going to research them this week, send outreach to the top 5, and aim to have at least one confirmed partnership within two weeks."
If they're worried about paying for placements: "We're not buying ads. We're offering lifetime access or a revenue share — which only costs us anything if the partnership actually works. If it drives zero signups, we owe them nothing. If it drives 50 signups, we're happy to share."

---

### 3.2 Content & Copy
Building an audience through useful content.

#### "Why we're building this" founder post
Authentic story post from the founder. Claude drafts, founder personalizes. Performs well organically. Publish on LinkedIn or Substack — wherever the ICP is.

##### Why this matters
People buy from people, not brands. A founder post that tells the real story — the specific moment of frustration that made this product inevitable — builds more trust in one read than a polished landing page ever will. It also travels. A LinkedIn post from a real human gets reshared. A company page post doesn't.
POs own this because founders are too close to it. They'll write something corporate and flat. Your job is to pull out the story, shape it, and push it out the door before they overthink it.

##### When to run it
- The product has a launch date or a waitlist live. Give people somewhere to go after reading.
- The founder has a real story — a job they quit, a problem they personally lived, a customer conversation that cracked something open. Fabricated origin stories read as fabricated.
- You're trying to build B2B credibility on LinkedIn, or thought leadership via Substack.
- Not yet if the founder has no social presence and the ICP isn't on LinkedIn. Platform fit matters — post where the buyer is, not where it's comfortable.
- Not yet if you don't have a working link to send readers to.

##### What you'll need
- Claude — to draft the post from a raw founder interview. Free tier is fine.
- LinkedIn — for B2B products. The founder needs an account; a company page is optional and secondary.
- Substack — free tier, for thought leadership plays or consumer products where the founder wants an owned audience over time.
- 30 minutes with the founder — you need their real words. A Loom recording of them talking works fine as a source.
- A single CTA link — waitlist, landing page, or calendar link. One destination only.

##### Step-by-step

###### 1. Extract the origin story in the founder's words
Don't ask "what's your origin story?" — that gets a rehearsed pitch. Ask: "Tell me about the last time this problem made you genuinely angry or embarrassed." Then ask: "What were you using before? What specifically broke?" Record the conversation or take verbatim notes. The quotes you pull from this session are the raw material for everything.

###### 2. Identify the four-part structure
Every founder post that works follows the same arc. Map your founder's story onto these four beats before touching Claude:
- The specific moment — not "I was frustrated with X" but "I was in a Tuesday meeting, staring at a spreadsheet that hadn't been updated since March."
- The realization — the insight that this wasn't just their problem, it was everyone's problem.
- What we're building — one sentence, plain language. No jargon.
- The ask — one specific action: join the waitlist, reply with your experience, intro someone who'd care.

###### 3. Draft with Claude
Feed Claude the raw notes and use the prompt in the Templates section. Ask for three variations: one shorter (under 200 words for LinkedIn), one longer (400–600 words for Substack), one as a thread. Pick the structure that fits the platform.

###### 4. Have the founder rewrite in their voice — not polish it
This is the critical step most POs skip. Send the draft with this instruction: "Please rewrite this in your voice. Don't polish it — I want your word choices, your sentence length, even your weird phrasing. If a sentence sounds too clean, make it messier." The goal is authenticity, not copywriting. Readers can smell a ghost-written post. The raw bits are features, not bugs.

###### 5. Choose the platform based on where the ICP lives
LinkedIn is almost always right for B2B. Post from the founder's personal profile, not a company page — personal profiles get 5–10x the organic reach. Substack is better when the founder wants to build a long-term thought leadership channel and the audience is OK with email. Don't try both simultaneously on the first post; pick one and do it right.

###### 6. Time the post and line up engagement
On LinkedIn: Tuesday through Thursday, 7–9am in the founder's local time zone. Avoid Monday (everyone's catching up) and Friday (everyone's checked out). Before posting, ask 3–5 colleagues or early users to be ready to comment within the first hour — early engagement triggers the algorithm. "Congrats!" comments don't count. Genuine reactions and questions do.

###### 7. Engage with every reply for 24 hours
The founder needs to respond to every comment in the first 24 hours, especially questions. This isn't courtesy — it signals the algorithm that the post is active and extends distribution. If someone shares their own version of the problem, that's a sales lead. Log it.

###### 8. Repurpose the post into other content
One good founder post is three pieces of content. Pull the best quote for a testimonial-style social card. Excerpt the "what we're building" paragraph for the About section of the landing page. Use the problem framing from the post to brief the next SEO landing page or waitlist newsletter. Nothing gets written once.

##### Templates
```
You are helping a startup founder write an authentic LinkedIn post about why they're
building their product. Here are my raw notes from a conversation with them:

{paste verbatim notes or transcript here}

Write a founder post using this structure:
1. Open with the SPECIFIC moment of frustration — a scene, not a summary. Use sensory
   detail. First or second sentence must grab.
2. One paragraph on the realization: this is a widespread problem, not just mine.
3. One sentence: what we're building. Plain English. No jargon.
4. One specific ask at the end.

Constraints:
- 200–300 words for a LinkedIn version
- First person throughout
- No "I'm thrilled to announce"
- No "excited to share"
- No "game-changing" or "disruptive"
- Keep any awkward or honest phrasing from the raw notes — do not clean it up
- End with a question that invites replies

Write two versions with different opening hooks.
```
"Hey {name} — I'm publishing a post on behalf of {founder} on {day} morning around 8am. Would mean a lot if you could drop a genuine comment in the first hour — not a 'great post!' but a reaction to the problem or a question. Here's the draft: {link or paste}. Thanks in advance."
After posting, document what you can extract from the post:
- Best quote → social card image
- Problem framing → landing page headline test
- "What we're building" sentence → About section copy
- Comment threads with pain stories → ICP research notes
- Engagement data (impressions, replies) → positioning signal

##### Definition of done
- Post is live on the founder's LinkedIn or Substack — not scheduled, not drafted, live.
- Founder has reviewed and rewritten the draft in their own voice.
- At least 3 allies are primed to engage within the first hour.
- Founder responds to every comment in the first 24 hours.
- You've logged impressions, comments, shares, and any inbound leads from replies.
- Repurposing plan is noted for at least 2 other content formats.

##### Common pitfalls
- Posting from the company page instead of the founder's profile. Company pages have near-zero organic reach on LinkedIn. Personal profiles get distributed. Always post from the human.
- Polishing out the authenticity. The first Claude draft will be too clean. The founder's rewrite pass is mandatory, not optional. A slightly awkward personal story outperforms a perfectly crafted one every time.
- No CTA or a weak one. "Check out what we're building" with no link goes nowhere. One specific ask, one link, that's it.
- Posting and disappearing. If the founder doesn't respond to comments, the algorithm tanks the post and people feel ignored. Block the 24 hours after posting on the founder's calendar.
- Fabricating the origin story. Readers — especially sophisticated B2B buyers — spot manufactured authenticity. Only work with what's real. If the founder's real story is less dramatic than ideal, find a different angle, don't invent one.
- Publishing before the product link works. Run the CTA link end-to-end before posting. A broken waitlist form on launch day is a conversion disaster that's hard to recover from.

##### How to talk about it with the client
"The most-read thing you'll publish this month isn't going to be an ad or a blog post — it's going to be you, in your voice, telling the story of why you're building this. LinkedIn still favors personal posts by a 5-to-1 margin over company posts. My job is to get your raw story into shape without making it sound like a press release. You'll have full edit rights, and I want you to make it messier, not cleaner. Then we time it for Tuesday morning, prime a few people to engage early, and see what lands."
If they push back on "putting themselves out there": "You don't have to be vulnerable to the point of discomfort. The story just needs one specific moment — a real meeting, a real tool that frustrated you, a real conversation. That's it. We're not writing a therapy post."

---
#### SEO landing page
A page targeting a problem keyword ("best tool for X" or "how to solve Y"). Builds organic traffic over time. PO scaffolds with Claude Code and Astro — no dev needed.

##### Why this matters
Cold outreach and paid ads stop the moment you stop working. A well-built SEO landing page compounds. A page that ranks for "how to manage contractor invoices without accounting software" will pull in qualified traffic in month 6, month 12, month 24 — without you doing anything after it's published. Most early-stage products have zero SEO presence. Getting one page right gives you a durable channel while everything else is still grinding.
This is a long-term play. Expect 3–6 months before meaningful ranking. Start now anyway.

##### When to run it
- The product is solving a problem people actively search for. "How do I do X without hiring someone" or "best tool for Y" searches mean intent. If no one searches for the problem, SEO won't help.
- You can find a keyword with real monthly volume (200+ searches/month) and realistic difficulty — not competing against Salesforce or HubSpot for a head term.
- The site is already running and you can add a page without a dev sprint. Astro makes this a PO task.
- Not yet if the product or ICP is still being validated. Don't lock in messaging on a durable page when the positioning is still changing weekly.
- Not yet for pure B2C consumer apps where the ICP doesn't search — they scroll. Social content beats SEO there.

##### What you'll need
- Ahrefs free tools — specifically Ahrefs Keyword Generator (free, no account needed) and the free Chrome extension for checking difficulty scores.
- AnswerThePublic — free tier shows questions people actually ask around a topic. Great for finding long-tail angles.
- Google "People also ask" — open a browser, type your core problem into Google, scroll to the "People also ask" section. Free, real-time, and what Google itself thinks people want to know.
- Claude Code — to scaffold the Astro page. Requires Claude Pro or API access.
- Google Search Console — free, to submit the page for indexing and monitor rankings over time. Set this up before you ship the page.
- The existing Astro codebase — get access to the repo. You'll be adding one file.

##### Step-by-step

###### 1. Find the right keyword — intent beats volume
Open Ahrefs Keyword Generator and type the problem your product solves. Look for long-tail keywords (3–5 words) with 200–2,000 monthly searches and a Keyword Difficulty (KD) under 20. The magic phrase structure is either "how to [verb] without [painful thing]" or "best [tool type] for [specific role or situation]." These signal buyer intent — someone searching "best contractor invoice tool for freelancers" is closer to buying than someone searching "invoicing."
Validate with Google: search your candidate keyword and look at the first page. If the results are dominated by major publications or enterprise SaaS companies with thousands of backlinks, pick a more specific long-tail. If you see blog posts, Reddit threads, and small tools, that's a page you can compete on.

###### 2. Map the page structure before writing anything
Every high-ranking problem-keyword page has the same architecture:
- H1 — contains the exact keyword phrase
- Intro paragraph — names the problem, names who has it, signals what the page covers
- Problem section (H2) — describe the pain in specific terms; use the "People also ask" language
- Solution section (H2) — introduce your product as the answer; this is not a sales pitch, it's a comparison
- Proof section (H2) — one user quote, one screenshot, one data point; whatever you have
- CTA section — one ask: start free, join waitlist, or book a demo

###### 3. Scaffold the page with Claude Code
Open Claude Code in the project root. Use the prompt in the Templates section. Claude Code will generate the full Astro page file, including front matter, SEO meta tags, Open Graph tags, and semantic HTML. Review the output — check that the H1 contains the exact keyword, the meta title is under 60 characters, the meta description is under 155 characters, and the structure matches your map from step 2.

###### 4. Write the content — or have Claude draft it
Use the content drafting prompt in the Templates section. Give Claude the keyword, the target ICP, three specific pain points you've heard from user interviews, and one or two user quotes if you have them. The output will need editing — tighten the intro, make the proof section concrete, and make sure the CTA is specific and prominent.

###### 5. Handle on-page SEO — the five things that actually matter
- Title tag — keyword first, under 60 characters. "Contractor Invoice Tool for Freelancers — ProductName" is better than "ProductName: The Best Invoicing Solution for Modern Contractors."
- H1 — must contain the exact keyword. One H1 per page, at the top.
- Meta description — under 155 characters. State the problem, hint at the solution, include a soft CTA. Google rewrites it half the time but write it anyway.
- Internal links — link from your main landing page and at least one blog post or other page to this new page. One inbound internal link is worth more than dozens of external links at this stage.
- Image alt text — if you include a screenshot, write a descriptive alt tag that includes the keyword naturally.

###### 6. Ship it on the main site or a subdomain
The page should live at a path like /tools/contractor-invoicing or /for/freelancers on the main domain. Subdomains (like blog.yourproduct.com) don't inherit the main domain's authority as effectively. Keep it on the root domain.

###### 7. Submit to Google Search Console and wait
Go to Google Search Console, add the page URL under URL Inspection, and request indexing. This tells Google the page exists rather than waiting for a crawler to find it organically. Check back in Search Console after 2–4 weeks to see if the page has been indexed and what queries are triggering impressions. After 3 months, you'll have enough data to know if the keyword is worth doubling down on or pivoting.

##### Templates
```
I need you to create a new Astro page for our site.

Target keyword: {exact keyword phrase, e.g. "contractor invoice tool for freelancers"}
Page slug: {e.g. /tools/contractor-invoicing}
Product name: {product name}
One-sentence product description: {description}

Create a complete Astro page file (.astro) that includes:
- Proper Astro front matter with layout import
- SEO title tag (keyword first, under 60 chars)
- Meta description (under 155 chars, includes keyword)
- Open Graph tags
- H1 containing exact keyword
- Semantic HTML structure: H2 sections for Problem, Solution, Proof, and CTA
- A placeholder [CONTENT] comment in each section for me to fill in
- Internal link placeholder back to the home page
- Clean, responsive styling using Tailwind classes (or whatever the existing site uses)

Match the structure and styling of the existing pages in this codebase.
```
```
Write the content for an SEO landing page targeting this keyword:
"{keyword}"

Target reader: {ICP description — role, company size, situation}

Pain points I've heard from real users (use this language, not sanitized versions):
- {pain point 1}
- {pain point 2}
- {pain point 3}

User quote (if available): "{quote}"

Product: {product name} — {one-sentence description}

Write:
1. A 2-sentence intro paragraph that names the problem and signals what the page covers
2. A "Problem" section (H2) — 3 short paragraphs describing the pain in specific terms
3. A "Solution" section (H2) — 2–3 paragraphs introducing the product as the answer;
   honest about what it does and doesn't do
4. A "Proof" section (H2) — 1 paragraph around the user quote or a concrete outcome
5. A CTA paragraph — one ask, one link

Constraints:
- Use the exact keyword phrase at least 3 times naturally
- No "game-changing," "seamless," or "powerful"
- Write for a reader who is skeptical and comparison-shopping
- Total length: 500–700 words
```

##### Definition of done
- Page is live on the main domain at a clean URL slug.
- H1, title tag, and meta description all contain the target keyword.
- Page is submitted to Google Search Console and shows as indexed within 2 weeks.
- At least one internal link from the main site points to the new page.
- A calendar reminder is set for 90 days out to review ranking and traffic data in Search Console.

##### Common pitfalls
- Targeting a keyword with too much competition. "Project management software" is not a keyword you can rank for. "Project management for interior designers on mobile" might be. Specificity wins at this stage.
- Writing for Google instead of the reader. Keyword stuffing is penalized and it reads as spam. Use the keyword naturally 3–5 times in 600 words. The rest of the page should be useful.
- No internal links pointing to the page. A page that exists on the site but is only reachable via direct URL or the sitemap has no authority. Link to it from the homepage, a blog post, or the navigation.
- Expecting results in weeks. Tell the founder explicitly: this page will not rank in month one. Set a 90-day check-in. Impatience kills SEO investments before they've had time to compound.
- Changing the URL slug after publishing. The moment a URL accumulates any backlinks or indexing signals, changing it resets the clock. Pick a slug and commit. If you absolutely must change it, set up a 301 redirect from the old URL to the new one.

##### How to talk about it with the client
"SEO is the only traction channel that keeps working after you stop working. We're not building a content factory — we're building one page, for one specific search, that the right buyer is already making. In 6 months it's either ranking or it's not, and we'll know exactly why and what to do next. I can ship this page today with Claude Code. No dev sprint, no design budget."
If they push back on the timeline: "I hear you — months is a long time. That's why we're not waiting to start other channels. This runs in parallel with cold outreach and the founder post. We start it now so it's compounding while we're running the short-term plays."

---
#### Waitlist newsletter
One email per week: what we're building, what we're learning. Keeps the waitlist warm and filters for engaged users. High open rates because subscribers opted in early.

##### Why this matters
A cold waitlist goes stale in 4–6 weeks. Without contact, the people who signed up forget why they cared, and by the time the product launches they're gone. A weekly email does two things: it keeps the list warm, and it filters for engaged users — people who open and reply to 10 emails before launch are your first power users. High open rates are the signal that the positioning is working.
This is also the cheapest form of market research. What you share each week and how people respond tells you more about what matters to your ICP than any survey.

##### When to run it
- You have a waitlist — even 20 people. Start before you think you're ready.
- The founder has something real to share each week: a decision made, something learned, something shipped. Empty weeks are a sign you're moving too slowly, not a reason to skip sending.
- The product is still in development. This channel is specifically for the pre-launch gap.
- Not yet if the waitlist is zero. Get 10 signups first, then start. Sending to 0 people is a morale drain.
- Scale down if the cadence becomes a burden. Bi-weekly is better than weekly emails that are clearly phoned in.

##### What you'll need
- Beehiiv free tier — up to 2,500 subscribers, unlimited sends. No credit card required. Use this. Don't use Mailchimp (free tier is restrictive) and don't use Substack (you can't segment subscribers). Beehiiv lets you tag waitlist vs. active users when you're ready to separate those audiences.
- A custom sending domain — Beehiiv supports this on free tier. Use news@yourproduct.com or updates@yourproduct.com. Email from a personal Gmail address looks amateur and lands in spam more often.
- Claude — to draft each edition. The PO drafts with Claude, the founder edits. Neither writes from scratch.
- An embed form or link — Beehiiv generates a signup form you can embed on the existing landing page. Get this live before the first send so readers can forward the email and grow the list passively.

##### Step-by-step

###### 1. Set up Beehiiv in 20 minutes
Go to beehiiv.com, create a publication, set the name to the product name, and connect the custom domain following Beehiiv's DNS walkthrough. Upload the logo if there is one. Set the sender name to the founder's first name, not the company name — emails from "Sarah at ProductName" have higher open rates than "ProductName Team." Configure the reply-to address as the founder's real email so replies come back to a real person.

###### 2. Import your waitlist
Export the existing waitlist from wherever signups are being captured — a Google Sheet, Typeform, or the landing page form. Upload to Beehiiv and tag these subscribers as "waitlist" so you can segment them from paying users later. Don't try to import fake or cold email lists — Beehiiv will flag your account.

###### 3. Embed the signup form on the landing page
Beehiiv generates a simple embed snippet. Add it to the footer of the existing landing page — or replace the existing waitlist form if it's not connected to a proper email list. Every person who visits the landing page is a potential subscriber. Don't lose them to a form that goes nowhere.

###### 4. Write the first edition — introduce the newsletter
The first email sets expectations. It should be 200–300 words, written in the founder's voice, and cover: why the product exists (one paragraph), what subscribers will get each week (one sentence), and what you've been working on this week (one paragraph). Include one question for readers to reply to — "What's your current workaround for X?" gets replies and teaches you something. Use the Claude prompt in the Templates section.

###### 5. Establish the weekly format and stick to it
200–400 words, three sections every week:
- What we shipped / what we decided — one concrete update, even if it's small. "We cut the onboarding flow from 7 steps to 4" is better than "working on onboarding."
- What we learned — one insight from a user conversation, a data point, or a failed assumption. This is the section that builds trust because it shows a founder who thinks, not just builds.
- One open question — a real question you're wrestling with. Invite reply. Replies are gold — each one is a user telling you something the product doesn't capture.

###### 6. Send on the same day and time every week
Tuesday or Wednesday mornings work best across most B2B audiences. Pick one day and don't move it. Subscribers build an expectation, and expectation drives open rates. The worst thing you can do is be inconsistent — two weeks on, one week off, feels unprofessional and loses momentum.

###### 7. Grow the list passively while you run other plays
Add the newsletter signup to: the landing page footer, the cold outreach email signature, the founder's LinkedIn bio, and the Product Hunt profile. Don't run ads to grow it yet — organic growth from the content is more valuable because those subscribers are self-selecting for genuine interest.

###### 8. Know when to separate waitlist from active user editions
Once the product is live, you'll have two audiences: people who've signed up but never used it (waitlist), and people actively using it. These need different content. Beehiiv's tags let you segment. Create a separate publication or tag for active users and shift them to a different sequence focused on activation and retention.

##### Templates
```
Write a 250-word weekly update email for {product name}'s waitlist newsletter.

What we shipped or decided this week: {paste 2-3 sentences of raw notes}
What we learned this week: {paste raw notes — a user quote, a data point, a realization}
Open question we're wrestling with: {one real question}

Format:
- Subject line: plain and specific, not clever. Something like "Week 4: we cut the
  onboarding in half" or "What 3 users told us about pricing this week"
- 3 short sections with the headers above
- Written in first person as the founder
- Conversational tone — this is a letter from a human, not a company update
- End with one direct question asking readers to reply

Do not use: "exciting," "thrilled," "journey," "space," "ecosystem"
Length: 200–300 words
```
Subject: Why I'm building {product name} — and what you'll get here
Hi {first name},
You signed up for {product name} — thank you. Here's what you signed up for.
Every week I'll send one short email: what we shipped, what we learned, and one question I'm genuinely trying to answer. No fluff. If a week was boring, I'll say so.
The problem we're solving: {2-sentence problem description from the founder's origin story}.
This week: {one-paragraph update on where things stand}.
One question for you: reply and tell me — what's your current workaround for this? I read every reply.
— {Founder first name}

##### Definition of done
- Beehiiv publication is live with custom sending domain configured.
- All existing waitlist subscribers imported and tagged.
- Signup form embedded on the landing page.
- First edition sent — not scheduled, sent.
- A repeating weekly calendar block is on the founder's calendar for newsletter review and approval.
- Open rate after the first 4 editions is tracked and reported. Target: above 40% is healthy for a waitlist audience.

##### Common pitfalls
- Treating it as a marketing newsletter. Product announcements, discount offers, and feature lists kill open rates. This is a letter from a founder to people who trust them. Keep it personal and honest.
- Skipping weeks when things are slow. Consistency is the entire point. A boring honest update ("We didn't ship much — here's why") beats silence. Silence reads as failure.
- Sending from a free Gmail account. Gmail-to-Gmail is fine for personal email; for a newsletter, it looks unprofessional and lands in Promotions. Custom domain from day one.
- Never asking for replies. Replies are conversations, and conversations are market research. End every edition with a question. Log the replies — they're signals.
- Growing the list with paid traffic before the content is good. Paid subscribers don't believe in the product. Get to 50 organic subscribers with strong open rates before spending anything on list growth.

##### How to talk about it with the client
"A waitlist that isn't getting emails goes cold in a month. Your most interested potential users signed up, and then heard nothing. The newsletter keeps them warm and filters for the ones who are genuinely engaged — those are the first power users you want in the product on day one. I'll draft each edition with Claude, you'll spend 10 minutes editing it into your voice, and it goes out Tuesday morning. That's the whole process."
If they say they don't have anything to write about yet: "You don't need to ship a feature every week. 'We decided not to build X because of Y' is better content than a feature announcement. Decisions, learnings, and open questions — that's the format. If you're building, you have all three."

---
#### Comparison page
"The old way vs. [product name]" — pure content, no app needed, sharpens positioning and drives search traffic. Pure Claude Code task.

##### Why this matters
Buyers comparison-shop. When someone is evaluating your product, they're also searching "{competitor} alternative" and "old way vs. new way." If you don't own that page, your competitor does — or worse, a review site with incomplete information does. A comparison page sharpens your positioning by forcing you to articulate exactly what problem the old workflow creates and precisely how you solve it differently. The clarity that produces is useful everywhere, not just on this page.
This is also a pure SEO play. "{Competitor} alternative" queries have high buyer intent — someone searching that phrase is actively considering switching.

##### When to run it
- You have a named competitor that buyers already know, OR you have a clear "status quo workflow" (usually a spreadsheet, email chain, or manual process) that buyers are trying to escape.
- The product has enough real differentiation to fill a page honestly. If the differences are thin, the page will backfire.
- You're past initial validation — you know the ICP is right and the positioning is stable enough to commit to a durable page.
- Not yet if the product is still pivoting. A comparison page locks in a positioning claim. Build it when you're confident in the angle.
- Not yet if the competitor is unknown to your ICP. A comparison page only helps when the buyer has already considered both sides.

##### What you'll need
- Claude Code — to scaffold the Astro page with the split-screen layout.
- Astro — the existing site. This is one new page, not a design project.
- Real user research — you need at least 3 specific pain points that users experienced with the competitor or old workflow. Don't make these up. Pull from user interviews.
- Ahrefs free tools — to confirm there's search volume for "{competitor name} alternative" before building the page.
- Google Search Console — to submit the page for indexing once it's live.

##### Step-by-step

###### 1. Decide: named competitor or status quo workflow?
Two valid comparison structures exist. The first is a named competitor: "ProductName vs. CompetitorName" — works when buyers already know the competitor and search for it by name. Check Ahrefs: if "{competitor} alternative" or "{competitor} vs" gets 100+ monthly searches, build this page. The second is a status quo comparison: "The old way vs. ProductName" or "Managing X in spreadsheets vs. ProductName" — works when the real competition is a workflow, not a product. Choose one. Don't try to do both on a single page.

###### 2. Map the pain → relief pairs from real user research
Before touching Claude, write down 4–6 pairs in this format: "With the old way, [specific painful thing]. With ProductName, [specific relief]." These must come from real conversations — user interviews, sales calls, or customer support tickets. Fabricated pain points read as marketing. Specific, real pain points read as empathy. The page lives or dies on the quality of these pairs.
Bad example: "Competitor is complicated. ProductName is simple." Good example: "With Competitor, every team member needs a paid seat before they can view a file. With ProductName, viewers are always free — you only pay for editors."

###### 3. Scaffold the page with Claude Code
Use the scaffold prompt in the Templates section. The page structure should be: headline with the keyword phrase → short intro that names the reader's situation → a split comparison section (their world / your world) → a feature comparison table if there are 4+ comparable features → social proof → CTA. Let Claude Code generate the Astro file and review the output before adding content.

###### 4. Write the comparison content — be honest, not dishonest
This is the rule that founders most often want to break: don't lie about or trash the competitor. Describe the workflow problem, not the company. "Teams running dispatch on spreadsheets spend 2+ hours each morning reconciling yesterday's jobs" is a defensible claim about a workflow. "CompetitorName is slow and buggy" is a lawsuit and looks petty. The goal is to describe the buyer's current world so accurately that they feel seen — then show them the exit.
Be honest about what you don't do better. If the competitor has a feature you don't have yet, don't pretend it doesn't exist. Sophisticated buyers know. Acknowledging a gap and explaining why you made that tradeoff builds more trust than omitting it.

###### 5. Build the SEO layer
For a named competitor page: the H1 should be "{ProductName} vs. {CompetitorName}: which one is right for you?" — this exact phrasing matches how buyers search. The title tag should be under 60 characters and lead with the keyword. Add a FAQ section at the bottom using questions from "People also ask" on Google for the competitor name — this picks up featured snippet traffic.
For a status quo page: target keyword phrases like "alternative to managing X in spreadsheets" or "replace your X workflow." Same SEO rules apply.

###### 6. Add internal links and submit
Link from the homepage, the main features page, and any blog posts that mention the competitor or the problem. Submit the URL to Google Search Console. This page typically ranks faster than a generic SEO page because buyers are searching very specific phrases and competition for those phrases is lower.

##### Templates
```
I need to create a comparison page for our Astro site.

Page type: {named competitor comparison OR status quo workflow comparison}
Our product: {product name} — {one-sentence description}
Comparison target: {competitor name OR "managing X in spreadsheets" or similar}
Target keyword: {e.g. "ProductName vs CompetitorName" or "alternative to spreadsheet invoicing"}
Page slug: {e.g. /vs/competitorname or /comparison/spreadsheet-alternative}

Create an Astro page with:
- SEO front matter (title, description, OG tags)
- H1 containing the target keyword
- Short intro paragraph (2-3 sentences)
- A two-column comparison section (left: "The old way" or competitor name,
  right: our product) with placeholder rows
- A comparison table section with placeholder rows
- A social proof placeholder section
- A clear CTA section
- Internal link back to the home page and features page

Match the styling and component patterns from the existing Astro codebase.
```
```
Write the content for a comparison page for {product name} vs. {competitor/old workflow}.

Target reader: {ICP description}

These are the real pain points users experienced with the old way (from user interviews):
- {pain point 1 — be specific}
- {pain point 2 — be specific}
- {pain point 3 — be specific}

These are the specific differences with our product:
- {differentiator 1}
- {differentiator 2}
- {differentiator 3}

Write:
1. An intro paragraph (2-3 sentences) that names who this page is for and what question
   it answers — not a sales pitch
2. 4-6 "Their world / Our world" pairs — each 1-2 sentences, written as specific workflow
   moments, not abstract claims
3. A 2-paragraph "Who should use what" section — be honest; tell them when the competitor
   might be the right call
4. A 1-paragraph CTA section

Rules:
- Do not call the competitor "slow," "outdated," "clunky," or any adjective
- Describe the workflow, not the product
- Back every claim with a specific scenario
- No "game-changing," "seamless," or "powerful"
```

##### Definition of done
- Page is live at a clean slug on the main domain.
- All comparison claims are backed by real user research — not invented.
- H1 and title tag contain the target keyword.
- Page is submitted to Google Search Console.
- At least two internal links point to this page from other site pages.
- Founder has reviewed and approved the claims about the competitor — they need to be defensible.

##### Common pitfalls
- Trashing the competitor. It looks desperate, it might be legally actionable, and buyers see through it. Describe the workflow problem. Let the buyer draw their own conclusion.
- Building the page before the positioning is stable. A comparison page is a commitment. If the ICP or core differentiator is still changing, the page will need to be rebuilt. Confirm the positioning first.
- Making it a feature spec list. Comparison tables are useful, but they can't be the whole page. Buyers care about outcomes and workflows, not checkboxes. Lead with the story; support with the table.
- Fabricating user pain points. Every claim on this page should survive this test: "Could I put a user's name next to this claim?" If not, cut it or go get the research first.
- Ignoring the "who should use the competitor" question. Trying to capture 100% of buyers looks deceptive. A short paragraph saying "If you need X, CompetitorName might be better for you right now" builds enormous trust with the buyers who are genuinely a fit for your product.

##### How to talk about it with the client
"Buyers are already comparing you to the status quo and your competitors — with or without this page. If we don't own this conversation, someone else does. The comparison page isn't a hit piece. It describes the workflow problem so specifically that a reader in that situation feels understood, then shows them a different path. The SEO value is real too — people searching '{competitor} alternative' are ready to buy, not just browsing. I can ship this in a day using Claude Code. The content takes longer because we need to pull the pain points from real research, not make them up."
If they're nervous about naming a competitor: "We can do the status quo version — 'managing X in spreadsheets vs. ProductName' — which avoids naming anyone and still captures the same buyer intent. It's honestly the safer version for early stage anyway."

---

### 3.3 Social & Community
Presence & engagement on the primary channel.

#### Consistent posting
3x/week minimum on the primary channel. Claude batches a week of content at a time — give it the value prop and three things that happened this week.

##### Why this matters
Virality is a lottery. Consistency is a strategy. A founder who posts three times a week for six months builds an audience that knows who they are, what they're building, and why it matters — before the product is ready for them. That audience converts at 10–20x the rate of cold traffic when you finally have something to sell.
At the early stage, the goal isn't impressions. It's creating enough signal surface that the right person sees the right post and replies, "this is exactly my problem." That can't happen from a standing start on launch day.

##### When to run it
- The founder has identified a primary channel where their ICP actually spends time — LinkedIn for B2B, X for developer tools, Instagram for consumer.
- The product has a clear value prop, even if it isn't built yet. You need something to post about.
- The founder can commit 30 minutes per week to reviewing and approving content. This fails if the PO is ghostwriting and the founder never touches it.
- Not yet if the ICP is still undefined. Posting to nobody about nothing is wasted time. Run user interviews first.
- Not yet if the founder hates the channel. Forced presence reads as forced. Pick the channel the founder actually uses.

##### What you'll need
- Claude — to batch a week of posts from a 15-minute brief. No other writing tool needed.
- Buffer free tier — schedules up to 3 channels, 10 queued posts each. Or use native scheduling on LinkedIn/X — both have it built in now.
- A shared doc or Notion page — a running log of post drafts and performance notes. Keep a "wins and events" section the founder can drop into daily.
- PostHog or native analytics — track what's working. Most platforms show replies and DMs in the analytics tab.

##### Step-by-step

###### 1. Define the content mix
Every week should hit these four buckets in roughly this proportion:
- 40% build-in-public progress — what shipped, what broke, what surprised you.
- 30% founder POV and learnings — a contrarian take, a mistake made, a lesson from a user call.
- 20% customer wins and proof — a specific result a user got, a quote from an interview, a screenshot of feedback.
- 10% direct asks — "looking for five people with this problem to talk to," "we just opened the beta."
The ratio matters. If every post is a direct ask, you'll bleed followers. If every post is a win, it reads like marketing. The mix is what builds trust.

###### 2. Set up the weekly brief
Every Monday (or Friday, pick one and stick to it), the founder drops three bullets into the shared doc: what happened this week that's worth sharing. Shipped a feature, talked to a user, hit a milestone, made a mistake. Raw is fine. That's all you need to run the Claude prompt.

###### 3. Run the Claude batching prompt
Use this prompt weekly. Paste the three bullets in, get a full week of posts back.
```
You are writing social posts for a founder building {product description in one sentence}.
Their audience is {ICP description — role, industry, problem they have}.
Channel: {LinkedIn / X / Instagram}.

Here are three things that happened this week:
1. {bullet from founder}
2. {bullet from founder}
3. {bullet from founder}

Write 3 posts — one per event. Mix the content types across: build-in-public progress,
founder perspective/learning, and customer proof.

Constraints:
- Each post under 200 words for LinkedIn, under 280 characters for X
- No buzzwords: disrupt, leverage, utilize, unlock, robust
- No "excited to share"
- Short sentences. Concrete details. Strong verbs.
- First line must be a hook — not a preamble
- End each post with either a question to provoke replies or a one-line CTA
- Do not add hashtags unless I ask
```

###### 4. Founder reviews and personalizes
Claude's draft is 80% there. The founder's job is to add the one detail that only they know — a specific name, a dollar amount, an emotion. That's the 20% that makes it sound like a human wrote it. Budget 15 minutes per week, not more.

###### 5. Schedule the posts
Best times by channel: LinkedIn Tuesday–Thursday, 8–10am local. X any day, 9am or 5pm. Use Buffer or native scheduling. Lock in the three slots before the week starts so posting doesn't become a daily decision.

###### 6. Engage hard for the first two hours after each post
Reply to every comment within the first two hours. Ask a follow-up question in your reply. The algorithm weights early engagement heavily — 10 thoughtful replies in hour one outperforms 100 passive likes by a wide margin. Set a calendar block right after each post goes live.

###### 7. Track what's actually working
Impressions are vanity. Track replies and DMs — those are people leaning in. Every Friday, note in the shared doc: which post got the most replies, what the post was about, what content type it was. After four weeks you'll see a pattern. Double down on whatever type is driving conversation.

###### 8. Repurpose across channels
A LinkedIn post that got 20 replies has proved the topic. Turn it into a thread on X, a section of the waitlist newsletter, or a short paragraph in the next cold outreach email. One good idea should travel across at least two surfaces before you retire it.

##### Templates
```
Write a LinkedIn post about this week's build update:
Event: {what shipped or what broke}
Audience: {ICP description}

Lead with what happened. Then explain what you learned or what it means for users.
End with a question that invites replies from people with this problem.
Under 200 words. No buzzwords. First line must stand alone as a hook.
```
"{Direct quote from user.}"
That's from {first name}, a {role} at {company type} who's been using {product} for {timeframe}.
Before: {old painful situation in one sentence}.
Now: {specific result}.
We're opening 10 more spots this week. [Link in comments / DM me]

##### Definition of done
- 3 posts published this week, all approved by the founder before going live.
- Content mix logged: which bucket each post fell into (progress / POV / proof / ask).
- Engagement tracked: replies and DMs recorded for each post within 48 hours of publishing.
- Weekly brief collected for next week — three bullets from the founder, ready for the Claude prompt.
- Any post that generated 5+ replies flagged for repurposing.

##### Common pitfalls
- The founder writes nothing. If the PO is ghostwriting with zero founder input, it shows. Replies dry up because readers can tell nobody real is behind the account. The weekly brief must come from the founder, even if it's three rough bullets.
- Posting and ghosting. Publishing and then ignoring comments for 12 hours kills reach. The first two hours are the only two hours that matter algorithmically. No engagement block = no reach.
- Every post is an ask. "We're looking for beta users" is fine once a month. As a weekly recurring theme, it tells the audience the account exists only to extract from them. Follow the 40/30/20/10 mix.
- Optimizing for impressions. A post that gets 10,000 impressions and 2 replies taught you nothing. A post that gets 200 impressions and 15 replies told you the topic resonates. Track replies, not reach.
- Channel mismatch. Posting B2B SaaS content on Instagram because the founder likes Instagram is a waste. Go where the ICP already is, not where the founder is comfortable.
- Stopping at eight weeks. Consistency only compounds after month three. Most founders quit right before the flywheel kicks in. Commit to six months before evaluating whether the channel is working.

##### How to talk about it with the client
"We're going to post three times a week using a simple system: you give me three bullets on Mondays about what happened — anything, raw notes are fine — and I'll turn that into a week of content for you to review in 15 minutes. You publish, you engage for two hours after each post, and we track which posts drive replies and DMs. After four weeks we'll know what topics your ICP actually responds to. That's a map of your positioning that nothing else gives us this fast."
If they say "I don't want to seem self-promotional": "Build-in-public isn't promotion — it's transparency. You're not bragging, you're thinking out loud. The posts that perform best are the ones about what broke, not what worked."
If they say "I don't have time": "The only time commitment I'm asking for is three bullets on Monday and 15 minutes reviewing drafts. The posting and engagement I'll coordinate. If it's more than 30 minutes a week from you, we'll simplify the system."

---
#### Community engagement
Spend 15 minutes/day answering questions in 3–5 relevant communities. Build credibility before promoting. Never post a link in the first message.

##### Why this matters
Every community has a handful of people who show up every day, answer questions well, and are trusted by the room. When those people eventually mention a product, it lands differently than an ad. That's the position you're building toward.
The founders who grow the fastest in early-stage aren't the ones who post the most — they're the ones who were genuinely helpful in the places their ICP was already asking questions. Community engagement is the only distribution channel that simultaneously builds credibility, generates direct user feedback, and costs nothing but time.

##### When to run it
- You've identified 3–5 communities where the ICP is actively posting questions — subreddits, LinkedIn groups, Discord servers, Slack communities.
- You have enough product knowledge to answer relevant questions without faking it. If you're not the founder, spend 30 minutes with them first so you know the domain.
- The product has a landing page. When someone asks "what are you building?" you need somewhere to point them.
- Not yet if you haven't identified the ICP. Showing up in the wrong community wastes time and can damage perception if you pitch to people who don't have the problem.
- Not yet if the founder isn't willing to be the face on at least some of the posts. Anonymous product promotion in communities is transparent and gets reported.

##### What you'll need
- Reddit — the best source of raw, unfiltered ICP conversations. Find 2–3 subreddits where your ICP complains, asks questions, or shares problems.
- LinkedIn — best for B2B. Join 2–3 relevant groups. Search by keyword + "advice needed" or "recommendations."
- Discord — best for dev tools, consumer apps, and niche communities. Many have dedicated #help or #tools channels.
- Saved searches or keyword alerts — Reddit search alerts via F5Bot (free), Google Alerts for forum mentions, or LinkedIn saved searches. These surface new threads automatically.
- A simple log — spreadsheet with columns: community, thread URL, date replied, reply text, outcome (DM received, upvotes, ignored). Review weekly.

##### Step-by-step

###### 1. Pick the right communities
Wrong approach: find communities where your competitors hang out. Right approach: find communities where your ICP is asking questions about their problem — not about your category of solution. A founder building expense-tracking software should be in communities where people complain about finance operations, not in communities about "best fintech tools."
Pick 3–5 communities total. More than five and you spread thin. Fewer than three and you'll run out of threads worth replying to.

###### 2. Set up keyword alerts
For Reddit: sign up for F5Bot (free) and add 5–10 keywords that match the exact phrases your ICP uses when they have the problem. "spreadsheet for expenses" or "tired of manual reconciliation" — not your product name or category. For LinkedIn: save a search for keywords + location/industry filters. Check it twice a week.

###### 3. Follow the 90/10 rule — and mean it
90% of your replies must be genuinely useful answers that require no mention of your product at all. Answer the question directly. Add a specific insight the other responders missed. Link to a useful resource. The 10% — where you mention what you're building — only lands if the 90% already established that you know what you're talking about. Skip the 90% and the 10% looks like spam.

###### 4. Write replies that actually help
The format of a great community reply: specific answer first, context second, optional related thought third. No preamble. No "great question." Don't open with your credentials. Answer the question in the first sentence. If the answer is nuanced, use a short numbered list. Keep it under 150 words unless the question genuinely needs more.
Never put a link in the first response. On Reddit, links from new accounts in the first reply look like spam and get downvoted or removed. On Discord, links before establishing credibility read as drive-by promotion. Earn the right to link first.

###### 5. When sharing your product is appropriate
The trigger: someone explicitly asks for tool recommendations that match what you're building. "Does anyone know of a tool that does X?" or "What are people using for Y?" — that's your moment. Reply with a direct answer: "I'm building something that does exactly this — it's called [name], here's what it does: [one sentence]. Happy to give you early access if you want to try it." That's it. No pitch. No features list.

###### 6. Build a reputation before you need it
The goal for the first 30 days is simple: reply to at least 15 threads across your 3–5 communities with no product mention at all. After 30 days, you have a post history. Community members can see you've been genuinely helpful. That history makes the 10% land.

###### 7. Respond to DMs immediately
When someone DMs after a great reply, treat it like a priority inbound lead. Respond within 2 hours during business hours. These are your warmest possible prospects — they reached out to you. Ask one question: "What's the situation you're trying to solve?" Let them talk first.

###### 8. Know when to graduate to running your own community
Once you're getting 3–5 DMs per week from people with the problem, you have enough of an audience to start your own community. The signal: people are asking you to connect them with each other. That's the moment a Discord or Slack server pays off. Before that, it's an empty room you have to maintain.

##### Templates
```
Here is a post from a Reddit/Discord/LinkedIn community:
"{paste the post}"

I'm building {one-sentence product description}. My ICP is {ICP description}.

Write a reply that:
1. Directly answers the question in the first sentence
2. Adds one specific insight the obvious answer misses
3. Does NOT mention my product — this is the 90% play
4. Stays under 100 words
5. Sounds like a person wrote it, not a brand

If this post would be a natural opportunity to mention my product, note that at the end
but keep it separate from the main reply.
```
"I'm building exactly this — it's called {product name}. {One sentence on what it does and who it's for.} It's early-stage, so you'd be getting hands-on attention from the founders. Happy to give you access if you want to try it — DM me or drop your email."
Keep it to three sentences. No feature list. No "our unique approach." No exclamation points.

##### Definition of done
- 15 minutes of community engagement completed today — replies posted, log updated.
- 3–5 communities identified and saved, with keyword alerts active for at least two.
- Reply log updated with thread URL, community, and any response received.
- Weekly ratio tracked: how many replies mentioned the product (target: 10% or fewer).
- Any DMs received flagged and responded to within 2 hours.

##### Common pitfalls
- Pitching in every reply. Communities recognize this within three posts and your account gets flagged as spam. You lose the channel entirely. The 90/10 rule isn't optional — it's the price of admission.
- Picking the wrong communities. Hanging out in "startup tools" communities when your ICP is operations managers in logistics means you're performing for the wrong audience. Go where the problem is, not where products are discussed.
- Linking in the first response. Reddit's spam filters catch it. Discord moderators see it. LinkedIn's algorithm downranks it. Always earn the right to link by contributing first.
- Generic answers. "Great question — here are some options to consider..." gets scrolled past. The replies that build reputation are specific: cite a number, name a specific tool, describe a specific situation you've seen before.
- Doing this once and stopping. Reputation in a community takes 4–6 weeks of consistent presence. Showing up for one week then disappearing leaves no trace. Put the 15-minute block on the calendar as a recurring daily task.

##### How to talk about it with the client
"Your ICP is already out there asking the exact questions your product answers — on Reddit, in LinkedIn groups, in Discord servers. We're going to spend 15 minutes a day showing up in those conversations as the most helpful person in the room. Not pitching. Not linking to the product. Just answering questions better than anyone else. After 30 days of that, when we do mention what you're building, it lands as a recommendation from someone they trust, not an ad from a stranger. The DMs we get from this approach will be warmer than anything from paid channels."
If they ask "how does this convert to users?": "Every DM is a potential user interview and a potential beta signup. We're tracking every inbound DM. The conversion mechanism is the conversation — we reply, ask what they're trying to solve, and if there's a fit, offer access. It's the most direct path from community to user we have."

---
#### Create a community for early users
A Discord or Slack for beta users creates a direct feedback loop and makes early users feel invested in the product's success.

##### Why this matters
A community for early users does three things nothing else does: it makes users feel like insiders rather than customers, it routes feedback directly to the people building the product, and it creates a reference group early adopters can point to when they tell colleagues about you. Users who are part of a community churn at dramatically lower rates — they have a reason to stay even when the product is imperfect.
The risk is launching one too early. An empty community is worse than no community. It signals low adoption and kills momentum.

##### When to run it
- You have at least 50 active users — people who have returned to the product at least twice. Below that, the room will feel empty no matter what you post.
- The founder is willing to show up daily for the first 30 days. If they won't commit to this, don't launch. A community the founder ignores is a liability, not an asset.
- You have a real reason for users to gather — a shared problem they want to discuss, a product roadmap they want to influence, or a set of use cases they want to learn from each other.
- Not yet if you have fewer than 50 active users. Run community engagement in other people's communities first and recruit from there.
- Not yet if the product is too early to discuss in public. If there's nothing to show and nothing to talk about, the community will die in two weeks.

##### What you'll need
- Discord (free) — best for consumer apps, developer tools, gaming, and any product with a community-native vibe. Better thread management, voice channels, roles. The default choice for most early-stage products.
- Slack free tier — better if the ICP is corporate, uses Slack at work already, or if the product is B2B SaaS. Free tier caps at 90 days of message history — a real limitation once you're past month three.
- A channel structure decision — 5 channels maximum at launch. More than that fragments the community before it has momentum.
- An onboarding message — what members should do first, where to introduce themselves, what the community is for.

##### Step-by-step

###### 1. Choose Discord vs. Slack
Default to Discord unless the ICP is corporate or the product is B2B with enterprise buyers. Discord's interface is more casual, which lowers the barrier for people to post. Slack feels like work — good if that's the context, bad if you want candid feedback. Consumer apps, developer tools, and anything with a hobbyist angle: Discord. B2B SaaS where users are knowledge workers: Slack.

###### 2. Set up the channel structure
Launch with exactly these five channels — no more:
- #announcements — founder-only posting. Product updates, new features, important news. Lock this down so only admins can post. Users read it, they don't post in it.
- #introductions — where new members say who they are and what they're using the product for. Seed it yourself with a founder intro before you invite anyone.
- #general — open discussion, questions, anything that doesn't fit elsewhere.
- #feedback — structured requests for input. Founder posts questions here, users reply. This is the most valuable channel in the server.
- #show-and-tell — users share what they've built or accomplished with the product. Wins, screenshots, results. The best channel for social proof you didn't have to ask for.
No #random. No #off-topic. No channel for every feature. Add channels when there's a clear need, not in anticipation of one.

###### 3. Seed activity before inviting anyone
Before you send a single invite, post in every channel yourself. A founder intro in #introductions. An announcement in #announcements. One question in #feedback. One result or screenshot in #show-and-tell. The community needs to look like it's already alive. Inviting people to an empty room with no posts from two weeks ago is a first impression you can't undo.

###### 4. Write the onboarding message
This is the first thing new members see — either a pinned message in #general or a direct message bot sends on join. It must tell them three things: why this community exists, what they should do first (introduce themselves in #introductions), and where to ask questions. Under 100 words. No rules list. Rules-first onboarding is a sign you expect bad behavior — not the energy you want on day one.

###### 5. Founder shows up daily for 30 days
This is non-negotiable and it's the most common place communities die. The founder must post or reply something in the community every single day for the first 30 days. It doesn't have to be long — a question in #feedback, a reply to an intro, a comment on a show-and-tell. The community takes its temperature from the founder's presence. If they disappear for three days in week one, members stop checking.

###### 6. Run an async event in week two
An AMA (Ask Me Anything) in week two signals the community is active and the founder is accessible. Announce it three days before: "On Thursday at 2pm I'll be answering anything in #general for one hour — product direction, how we built it, where we're going, whatever you want to know." Even 5–10 questions from members is enough to fill an hour and generate content you can screenshot and share externally.

###### 7. Install moderation rules (light touch)
Two rules only, posted in #announcements on day one: No spam or self-promotion without asking first. No posting in #announcements — that's founder-only. That's it. Heavy rules lists signal distrust. Light rules with fast enforcement when someone breaks them is the right approach. The founder or PO acts as the only moderator at this stage.

###### 8. Prevent the community from dying
The single biggest risk: after week four, the founder gets busy and the community goes quiet. Members check in, see no new posts, and stop coming back. The prevention: set a recurring calendar block for the founder — 10 minutes every day, Monday through Friday. Also: make a rule for yourself that if no one has posted in 24 hours, you post something. A question, a poll, a screenshot from a recent user session. Keep the heartbeat going.

##### Templates
"Welcome to the {product name} community — you're in here because you're one of the first people using something we've been building for {timeframe}."
Three things to do right now:
1. Introduce yourself in #introductions — who you are and what you're trying to do with {product name}.
2. Drop any questions or early feedback in #feedback. We read everything.
3. If you get a result you're happy with, share it in #show-and-tell.
We'll be here daily. Ask us anything.
```
I run a Discord community for early users of {product description}.
I need a short, specific question to post in #feedback to get users talking.
This week we {what happened — shipped, talked to users, fixed something}.

Write 3 possible questions. Each under 30 words. Open-ended, not yes/no.
Focus on what users are experiencing, not what we want to hear.
```

##### Definition of done
- Server created with all 5 channels, permissions set, #announcements locked to founder-only.
- All 5 channels have at least one post from the founder before the first invite goes out.
- Onboarding message pinned in #general.
- First 50 users personally invited — not via a mass blast, but a direct message with a one-sentence personal reason.
- Founder has a recurring daily calendar block for community time.
- Week-two AMA scheduled and announced.

##### Common pitfalls
- Launching too early. 20 members in a Discord with 5 channels looks abandoned even with daily founder posting. Wait until you have 50 active users before inviting anyone. Momentum requires mass.
- Too many channels. Every new channel splits the community's attention. If members have to check 10 channels to stay current, most of them won't. Start with five. Add only when a channel is overflowing.
- Founder drops off after week two. The community reads the founder's engagement as a proxy for whether the product is alive. If they go quiet, members assume the company is struggling. Daily presence for the first 30 days is the job.
- Slack free tier hitting the 90-day message limit. If you choose Slack, warn the founder upfront: all message history older than 90 days disappears on the free tier. If the community is important, upgrade to Pro before it becomes a problem. Discord has no such limit.
- Never asking for anything in #feedback. A feedback channel that only has one post from week one is a missed opportunity. Post one question per week, minimum. "What's the thing you'd miss most if we removed it tomorrow?" is always worth asking.

##### How to talk about it with the client
"We're going to set up a Discord for your early users — not because every product needs a community, but because the users you have right now are unusually willing to tell you exactly what's wrong and what's right. A Discord gives them a place to do that where you can hear it. The only commitment I need from you is 10 minutes a day for the first month. After that, the community runs itself more and more. The alternative is losing that feedback loop entirely once they move on to other tools."
If they push back on the time commitment: "10 minutes a day is one cup of coffee. And the intelligence you get from an active community of 50 early users is the same intelligence you'd pay $5,000 for from a research firm. I'll set everything up — you just show up and talk to your users."

---
#### Product Hunt launch
Launch once there is something real to show — not a landing page. Drives a spike of early adopters and signals legitimacy to investors.

##### Why this matters
Product Hunt is not primarily a user acquisition channel — it's a legitimacy signal. Top 5 of the day means you can put a badge on your website, embed it in your investor deck, and reference it in press outreach. Buyers who've never heard of you will Google the product and see "Product of the Day" before they see anything else. That single badge does more for B2B conversion than almost any other early-stage activity.
Done right, a PH launch also generates a spike of early adopter signups from people who actively hunt for new tools. These users are unusually willing to give feedback and share what they're using. Done wrong — launched too early, with no real product, and no prepared support network — it produces a demoralizing flop that's hard to recover from.

##### When to run it
- The product is live, working, and has at least 20–30 active users who can speak to it genuinely.
- You have a gallery of screenshots or a demo GIF that shows what the product actually does. Not wireframes. Not marketing illustrations.
- You have a list of at least 50 people — users, founder's network, community members — who have already agreed to upvote and comment on launch day.
- The founder has a Product Hunt account in good standing and ideally a small follower base there. New accounts with zero history launching the same day they sign up look suspicious.
- Not yet if the product is just a landing page or waitlist. PH voters can smell a vaporware launch. You'll get hammered in the comments and tanked in the ranking. One bad launch can't be redone — each product gets one shot at a "first launch."
- Not yet if you can't staff someone to reply to every single comment for the full launch day.

##### What you'll need
- Product Hunt account — ideally the founder's personal account with some activity history. Ask an existing PH power user ("hunter") to submit the product on your behalf if possible — their follower notifications generate early upvotes.
- Ship page — set up a "Ship" page on PH 2–3 weeks before launch to collect followers who get notified when you launch.
- Launch assets — tagline (60 chars), description (260 chars), 5–8 gallery images or GIFs, a 30-second demo video if you have one, and the first comment written in advance.
- Support list — a spreadsheet of 50+ people who confirmed they'll upvote on launch day. Collect this in the two weeks before launch. Don't collect on launch day — too late.
- Launch calendar — launch day is 12:01am PT on a Tuesday, Wednesday, or Thursday. Avoid Monday (low traffic) and Friday (everyone's checked out).

##### Step-by-step

###### 1. Build the hunter relationship (2–3 weeks before)
Identify a Product Hunt user with 500+ followers who posts regularly. Reach out personally: introduce yourself, share what you're building, ask if they'd be willing to hunt (submit) your product. Hunters get notified to their followers when they submit — a hunter with 1,000 followers generates 1,000 notification emails at 12:01am. This is the single highest-leverage pre-launch action. Don't skip it.
Find hunters by looking at who submitted products in your category. Reach out on Twitter or PH DM.

###### 2. Set up your Ship page (2 weeks before)
Ship is Product Hunt's pre-launch page. Create one, share it in your newsletter, your Discord/Slack, and on social. People who subscribe to Ship get notified on launch day. Goal: 100+ Ship subscribers before you launch. Each subscriber is a guaranteed notification delivered at the moment your listing goes live.

###### 3. Prep launch assets
Write all copy before launch day so you're not editing under pressure at midnight:
- Tagline — 60 characters, no buzzwords. Describe what the product does, not what it aspires to be.
- Description — 260 characters. Problem, solution, who it's for.
- Gallery — 5–8 images. First image is the most important — it's the thumbnail in the feed. Show the product in use, not a logo. If you have a GIF, make it the first asset.
- First comment — the founder's "hey PH" comment posted immediately at launch. Tell the story: why you built it, who it's for, what problem it solves. Include a question for the community. This is the comment that gets upvoted and pinned at the top — write it as carefully as the product description.

###### 4. Build the support list (10 days before)
Message 100 people personally — not a mass blast — and ask if they'd be willing to upvote and leave a comment on launch day. Share the date, the direct PH link (you can get this before launch), and one sentence about what you're building. Expect 50–60% to follow through. Aim for 50 actual supporters, which means messaging 80–100 people. Anyone who says yes goes into a spreadsheet with their name and contact method.
Good sources: current users, founder's LinkedIn connections, community members, anyone who replied positively to outreach or posts.

###### 5. Launch at 12:01am PT exactly
Product Hunt's day runs midnight to midnight PT. Launching at 12:01am gives you the full day to accumulate upvotes. Launching at 9am means you've already missed 9 hours. The hunter submits at exactly 12:01am. You're awake. The first comment goes up immediately. No waiting.

###### 6. The first hour hustle
This hour determines your final ranking more than any other. Work the list:
- Send a personal message to every person on your support list: "We just launched — here's the link. Would mean a lot if you can upvote and leave a comment right now."
- Post on every social channel with the direct link.
- Post in your Discord/Slack community.
- Respond to every single comment on PH as it comes in.
Assign roles: founder is on PH comments. PO or a team member is working the support list and social channels. You need two people on this, not one.

###### 7. Work the full day
Reply to every comment. Ask follow-up questions. Engage with people who say they're trying it — offer to help them set it up. The PH algorithm factors in comment engagement. A product with 100 upvotes and 50 comments outranks a product with 150 upvotes and 5 comments.

###### 8. Post-launch leverage
Whatever ranking you got, use it. Add the PH badge to the website homepage. Screenshot your ranking and post it on social. Embed the badge in the investor deck. Add a line to cold outreach: "We launched on Product Hunt last month and hit Top 5 of the day." The badge has a long tail — investors see it for months.

##### Templates
```
Write Product Hunt launch copy for {product name}.
Product: {one-sentence description}
ICP: {who it's for and what problem they have}
Key differentiator: {what makes it different from existing solutions}

Write:
1. Tagline (60 chars max — describe what it does, not what it aspires to)
2. Description (260 chars max — problem, solution, who for)
3. First comment / "hey PH" post (150–200 words — founder voice, story behind why you built it,
   who should try it, one question for the community)

No buzzwords. No "we're excited to." No "powerful" or "seamless." Direct and specific.
```
"Hey {first name} — we're launching {product name} on Product Hunt on {date}. You've been one of our early users and it would mean a lot to have your support.
Here's the link: {PH URL}
If you have 2 minutes to upvote and leave a comment, that genuinely helps us get in front of more people. No pressure if not!
— {Founder first name}"

##### Definition of done
- Hunter confirmed and briefed — knows the exact launch time and has the product URL.
- Ship page live with 50+ subscribers before launch day.
- All launch assets written and approved: tagline, description, 5+ gallery images, first comment.
- Support list at 50+ confirmed people, all messaged on launch day within the first 30 minutes.
- Every PH comment replied to within launch day.
- Post-launch: PH badge added to website, ranking screenshot shared on social.
- Founder has read the top comments and flagged any product feedback worth acting on.

##### Common pitfalls
- Launching a landing page instead of a product. PH voters have seen thousands of launches. They know vaporware on sight. If the product isn't clickable, working, and live for real users, the comments will say so and the ranking will reflect it. Wait until the product is real.
- No support list. Organic discovery on PH is nearly zero on launch day unless you break into the top 3. The ranking is entirely driven by your own network in the first 2 hours. No list = no ranking = no badge. Build the list 10 days before, not on launch day.
- Launching on Monday or Friday. Monday's traffic is dominated by weekend backlog. Friday is low engagement across the board. Tuesday through Thursday are consistently the highest-traffic days.
- Not launching at midnight PT. Every hour you delay is an hour of potential upvotes you've permanently lost. The day resets at midnight — there's no catching up. If the hunter can't commit to a midnight launch, find a different hunter.
- Treating a flop as a failure. Most launches don't hit Top 5. That's okay. Even a #30 ranking generates some signups and gives you the badge. If you flop badly (sub-50 upvotes), analyze why — weak assets, small support list, wrong day — and note it. You get one official launch but you can submit updated versions as "new launches" later.

##### How to talk about it with the client
"Product Hunt is worth doing once you have a real product and a prepared support network. What we're not doing is launching a landing page and hoping for organic traction — that's how you get a bad first impression that follows the product around. Here's the prep: two weeks before launch, we build a list of 80 people to personally message on launch day, set up the Ship page to collect followers, and write all the copy in advance. On launch day, I work the list while you reply to every comment on PH. With that setup, Top 10 is realistic. Top 5 is the goal."
If they want to launch immediately: "I'd rather spend two weeks doing the prep and get a Top 5 badge we can use for months than rush it and get a result nobody talks about. The badge is only worth something if the ranking is good. Two weeks of prep is the difference."

---

### 3.4 Growth Mechanics ⚙️
Require dev work; PO owns hypothesis + spec, pod builds.

#### Waitlist with referral unlock
Users move up the waitlist by referring friends. Classic pre-launch viral mechanic. Works best when the product has clear demand.

##### Why this matters
A waitlist with no incentive to share is a dead list. Adding a referral mechanic turns every new signup into a recruiter — the product's most credible advocates are the people who already want in. When demand genuinely outstrips supply, status anxiety does the work for you: nobody wants to be last in line.
The PO's job is to design the mechanic and write the spec. The pod builds it. Get the hypothesis on paper before a single line of code is written.

##### When to run it
- There is clear unmet demand — people are asking when it launches, not whether they should try it.
- The product has a natural scarcity story: limited beta slots, exclusive early access, invite-only.
- The ICP talks to other people like themselves — peers, colleagues, communities. Isolated buyers don't refer.
- Not when: the landing page doesn't yet explain what the product does. Referring friends to confusion doesn't work.
- Not when: there's no real reason the waitlist is limited. Fake scarcity reads as fake.
- Not when: the product is B2B enterprise and the ICP is a single procurement decision-maker with no peer network to tap.

##### What you'll need
- A working waitlist form — email capture, ideally with PostHog identify called on submit so behavior is trackable from signup forward.
- Unique referral links — each signup gets a URL with their ID embedded. The pod builds this or you use a tool like Tally + Zapier for a no-code version, though pod-built is cleaner and gives you full tracking.
- PostHog — to instrument every key event: waitlist join, referral link copied, referral link clicked, referred signup completed.
- Claude — to write the confirmation email, the "share this link" copy, and the reward unlock email.
- A clear tier structure — write it down before spec'ing anything. See step 2.

##### Step-by-step

###### 1. Write the hypothesis
One sentence: "We believe that offering [reward] in exchange for [number] referrals will drive a viral coefficient of [K] and grow the waitlist by [X] in [timeframe]." A realistic K factor for a B2C product is 0.2–0.4. Above 1.0 is rare and means each user recruits more than one person — the list grows on its own. Start by targeting K = 0.3 and call it a win.
Write this down. Share it with the founder. It becomes the first line of the pod spec.

###### 2. Design the tier structure
Three tiers is the sweet spot. More than three creates decision fatigue. Less than three removes the escalation incentive. A working example:
- 1 referral: Skip 50 spots in line
- 3 referrals: Join the next beta batch (guaranteed early access)
- 5 referrals: Founding member status — permanent discount, name in credits, direct line to the founder
The rewards have to be real. "Move up in line" only works if the line is real and people care about their position. If the waitlist is 50 people, there is no status to compete for.

###### 3. Write the spec for the pod
See the Templates section for the full spec callout. The spec defines: what the user sees after signup, how links are generated, what triggers a reward unlock, and what PostHog events get fired.

###### 4. Write the email copy with Claude
Two emails: the signup confirmation (includes the referral link) and the reward unlock notification (fires when a tier is hit). Use the Claude prompt in Templates. Keep both under 100 words. Subject line matters more than body copy — most people won't read past it.

###### 5. Hand off to the pod with the spec
The pod builds: the referral link generator, the referral tracking table, the position counter, the reward unlock trigger, and the PostHog event calls. PO's job is to review the implementation against the spec — not to build it.

###### 6. Seed the referral mechanic yourself first
Before launch, go through the signup flow as a test user. Copy the referral link. Paste it to yourself. Complete a referred signup. Verify the referral count increments and the PostHog event fires. If you can't confirm this manually, don't open it to real users.

###### 7. Measure K factor after the first 100 signups
K = (number of invites sent per user) × (conversion rate of those invites). If K is below 0.1, the reward isn't compelling enough or the sharing friction is too high. Below 0.1 means the mechanic isn't working — fix the reward or simplify the share step before driving more traffic to the waitlist.

##### Templates
User-facing problem: Waitlist signups have no reason to share the product with peers, so list growth is entirely dependent on paid and owned channels.
Success metric: K factor ≥ 0.3 after 100 signups. Secondary: ≥ 30% of signups copy their referral link at least once.
Scope (in): Unique referral link per signup, referral count display on a status page, tier-based reward unlock, triggered email on tier hit.
Scope (out): Leaderboard, social proof counts visible to non-signups, reward fulfillment automation beyond the email trigger.
PostHog events to instrument:
- waitlist_joined — fires on successful signup, with referred_by property if a referral ID was in the URL
- referral_link_copied — fires when the user clicks the copy button on the status page
- referral_tier_unlocked — fires when a referral count crosses a tier threshold, with tier property (1, 2, or 3)
"Write a confirmation email for someone who just joined a waitlist for [product description]. The email must: be under 100 words, explain their current position in line, show their unique referral link prominently, tell them exactly what they get for 1, 3, and 5 referrals, and end with one sentence of excitement about the launch. No fluff. Subject line options: give me 3."
Subject: You unlocked {tier name} — here's what that means
Hi {first name},
You just crossed {referral count} referrals. That puts you in the {tier name} tier.
What that means: {reward description — be specific, e.g. "You're in the next beta batch, launching [month]. I'll email you directly."}
Thanks for spreading the word. It genuinely helps.
— {Founder first name}

##### Definition of done
- Hypothesis written and shared with founder.
- Tier structure defined, rewards confirmed as real (not vague).
- Spec delivered to pod with PostHog events listed.
- Pod implementation tested end-to-end by PO before any traffic is sent.
- K factor measured after first 100 signups and compared against the 0.3 target.
- One-paragraph read-out: what the K factor was, which tier drove most shares, what to adjust next.

##### Common pitfalls
- Fake scarcity. If the waitlist has 12 people and launches in two weeks regardless, "skip 50 spots" means nothing. Either the scarcity is real or the reward needs to be something else entirely.
- No share moment in the confirmation flow. The referral link has to be the first thing someone sees after signup — not buried in an email they might not open. Put it on the confirmation page, then also in the email.
- Reward tiers that are too high. Requiring 10 referrals for any reward means almost nobody earns anything. The first tier should be achievable by someone with a small network — 1 or 2 referrals.
- Not instrumenting PostHog events before launch. If referral_link_copied isn't firing, you have no idea whether the mechanic is being used or just ignored.
- Skipping the manual end-to-end test. Referral tracking bugs are invisible until they're embarrassing. Test the full flow yourself before users hit it.

##### How to talk about it with the client
"Right now everyone who joins your waitlist is a dead end — they sign up and forget about it. If we give them a personal link and a real reason to share it, each signup becomes a recruiter. The math is: if 30% of people share even once and 20% of those convert, we're growing faster than any ad we could run. I need to write the spec this week so the pod can build it in the next sprint."
If they say the rewards are too generous: "The founding member tier costs you nothing if you don't hit it, and it costs almost nothing if you do. A permanent 20% discount to the first 50 evangelists is the cheapest CAC you'll ever have."

---
#### Referral program post-launch
Standard refer-a-friend with incentive. Incentive design matters — discount, free month, or upgrade all perform differently depending on the product.

##### Why this matters
A referred user converts at 3–5x the rate of a cold acquisition and churns at half the rate. The reason is trust: someone they know vouched for the product before they opened the app. Post-launch referral programs are one of the few growth mechanics that lower CAC while improving LTV simultaneously.
The design matters more than the existence. The wrong incentive or too much friction kills it. PO designs the program; pod instruments it.

##### When to run it
- The product is live with real users who have activated — they've done the core action at least once and come back.
- Activation patterns are clear: you know what "activated" means and PostHog data confirms users are hitting that event.
- The product has a natural sharing context — users already talk about it, recommend it, or use it in a social context.
- Not at launch. Adding referral infrastructure before you know what activation looks like means you'll refer people to a broken experience. Fix the activation funnel first.
- Not when CAC isn't a problem. If organic growth is strong and you're not yet paying for acquisition, the mechanic adds complexity without a clear win. Run it once paid channels become the primary growth lever.

##### What you'll need
- PostHog — to track the referral funnel end-to-end: share initiated, link clicked, signup completed, activation completed by referred user.
- Unique referral codes or links — pod builds this. Each existing user gets a code tied to their account. No code = no tracking = no program.
- A reward you can actually fulfill — cash credit, free month, feature unlock. Decide before the pod builds anything.
- Claude — to write the in-app copy, the share message, and the reward notification emails.
- A fraud detection plan — see pitfalls. Decide upfront what you'll do when someone creates fake accounts to farm rewards.

##### Step-by-step

###### 1. Decide the incentive structure
Three types, each suited to different products:
- One-sided (referrer only): "Give a friend a heads-up, get $10 credit." Works when the product is highly differentiated and the referred user is already motivated to try it.
- Two-sided (referrer + referred): "Give your friend their first month free, get a free month yourself." Works when the product has a recurring cost and the friction of switching is real. Dropbox used this to grow 3900%.
- Escalating (referrer tiers): "Refer 3 friends: one free month. Refer 10: free forever." Works for prosumer products where power users have large networks and social capital in the domain.
If you don't know which to use: two-sided with a free month is the default. It works for most SaaS products with monthly pricing.

###### 2. Set the benchmark
The referral program must beat your next-best acquisition channel by at least 50% on CAC. If your cheapest channel acquires users at $40, the program's effective CAC must be below $27. Calculate this before you build: (reward cost per referred user) ÷ (referral conversion rate). If the math doesn't work on paper, the incentive is wrong.

###### 3. Write the spec for the pod
See Templates for the full spec callout. The spec defines: where the share trigger lives in the app, how codes are generated and validated, what the reward fulfillment trigger is, and what PostHog events fire at each step.

###### 4. Place the share trigger at the right moment
The share trigger must come after a value moment — not at signup, not on a settings page. For most products, the right moment is immediately after a user completes a key action for the second or third time. They've gotten value. They're primed to tell someone. Put the prompt there and nowhere else until you have data that another placement works better.

###### 5. Minimize friction in the share step
The fewer taps between "I want to share this" and "the link is sent," the higher the conversion rate. Pre-fill the share message. Offer three channels: copy link, SMS, email. Don't require the user to type anything. Every additional field you add drops share rates by 15–30%.

###### 6. Write the share message and reward emails with Claude
Use the Claude prompt in Templates. The pre-filled share message is the most important copy in the entire program — it's what the referred user reads first. Keep it personal, specific, and short. "Check this out" has a 2% click rate. "I've been using [product] to [specific outcome] and thought you'd find it useful" has a 15%+ click rate.

###### 7. Monitor for fraud from day one
Define fraud thresholds before launch: flag any account that refers more than 5 users in the first 24 hours, or any referred account that doesn't complete activation within 7 days. Don't automate the penalty — review manually first. The first 10 fraud cases will teach you exactly where to tighten the rules.

###### 8. Kill it if the math doesn't work after 90 days
Set a kill threshold now: if referral-sourced CAC isn't beating your next-best channel by 50% after 90 days, cut the program. Don't keep running a broken mechanic out of sunk cost. Document what you learned and either redesign or move on.

##### Templates
User-facing problem: Users who love the product have no easy way to tell peers about it, and there's no incentive to do so.
Success metric: Referral-sourced CAC ≤ 50% of next-best channel CAC after 90 days. Secondary: ≥ 20% of activated users initiate at least one share.
Scope (in): Unique referral code per user, share trigger after third activation event, pre-filled share message, reward fulfillment trigger on referred user activation, fraud flagging for anomalous referral volume.
Scope (out): Leaderboard, tiered rewards (start one-tier), automated fraud penalties, referral analytics dashboard (use PostHog).
PostHog events to instrument:
- referral_share_initiated — fires when user opens the share prompt, with channel property (copy/sms/email)
- referral_signup_completed — fires when a referred user completes signup, with referrer_id property
- referral_activation_completed — fires when a referred user hits the activation event, triggering reward fulfillment
- referral_reward_issued — fires when the reward is applied to the referrer's account
"Write a pre-filled share message for a referral program for [product description]. The message will be pre-populated when a user clicks 'share via SMS' or 'share via email.' It should: be 1-2 sentences, sound like something a real person would actually send to a friend (not a marketing message), mention one specific outcome the product delivers, and include the referral link placeholder {referral_link}. Give me 3 variations."
Subject: {referred friend's first name} just signed up — here's your reward
Hi {first name},
{Referred friend's name} just activated their account using your link. Your {reward — e.g. "free month"} has been added to your account.
It'll show on your next billing cycle. No action needed.
Thanks for the referral.
— {Product name} team

##### Definition of done
- Incentive structure chosen and documented with the CAC math showing it's viable.
- Spec delivered to pod with all PostHog events listed.
- Share trigger placement confirmed: fires after value moment, not at signup.
- Fraud thresholds defined before launch.
- 90-day kill threshold set and documented so the decision isn't emotional when the time comes.
- After 90 days: referral CAC vs. next-best channel comparison written up and shared with founder.

##### Common pitfalls
- Launching before activation is understood. If you don't know what "activated" means, you can't trigger the share prompt at the right moment, can't confirm a referral succeeded, and can't measure the program. Fix the activation definition first.
- One-sided incentive for a low-differentiation product. If your product isn't meaningfully better than the next option, the referrer needs to give the friend something to make the intro worthwhile. Two-sided wins here.
- Placing the share trigger at signup. A user who signed up 30 seconds ago has not gotten value. Asking them to refer friends at that moment is pushing for a favor before the relationship is established.
- No fraud detection. Referral programs attract gaming. Someone will create 20 fake email addresses in the first week. If you have no detection, the reward cost explodes and the data is useless.
- Pre-filled message that sounds like a marketing email. "Check out this amazing tool that will transform your workflow" gets deleted. "I've been using this for [specific outcome] and thought you might find it useful" gets clicked.
- Running a broken program for too long. Set the kill threshold before launch. If it's not working after 90 days, stop. Don't spend another quarter hoping it turns around.

##### How to talk about it with the client
"We're not ready to add referrals yet — we need to confirm what 'activated' looks like first. Once we know users are getting real value and coming back, we add the share moment right after that. A referred user converts at 3–5x the rate of cold traffic and churns at half the rate. The program pays for itself as long as the reward is tied to activation, not just signup. I'll have the spec ready once we've confirmed the activation pattern in PostHog."
If they want to add it immediately at launch: "Adding referrals before activation is defined means we're asking users to evangelize a product they haven't gotten value from yet. That burns trust with the exact people we most want as advocates. Give me two more sprints."

---
#### Onboarding optimization
PostHog funnels reveal where users drop off. PO identifies the drop-off hypothesis, pod fixes the flow. Session replay is the fastest way to spot what's confusing.

##### Why this matters
Most products lose 60–80% of new users in the first session. That's not a marketing problem — it's an onboarding problem. If users can't reach their first value moment before they lose interest or get confused, acquisition spending is a leaky bucket. Fix the onboarding and every other growth metric improves downstream.
PO owns this loop: define the activation event, read the funnel, watch session replays, form the hypothesis, spec the fix, measure the result. Pod builds the fix. PO reads the A/B test.

##### When to run it
- The product has been live for at least 2 weeks and has 20+ users who completed signup.
- PostHog is installed and events are firing — at minimum, signup and one core action.
- The activation rate (% of signups who complete the first key action) is below 40%. Above 40% means the funnel isn't broken; optimize elsewhere first.
- Not before defining the activation event. If you don't know what "activation" means for this product, the funnel has no endpoint. Start there.

##### What you'll need
- PostHog — funnels and session replay. Both are free up to 1M events/month. This is the entire toolkit for this playbook.
- A defined activation event — the single action a user must take to be considered "activated." This is the moment they've gotten real value, not just landed on the dashboard. Examples: created their first project, connected their first data source, invited a teammate, sent their first message.
- A secondary activation event — the second key action that predicts long-term retention. Activation alone doesn't guarantee retention; this second event does.
- Claude — to help synthesize session replay observations into a hypothesis.

##### Step-by-step

###### 1. Define the activation event
Before opening PostHog, write down: "A user is activated when they [specific action]." This should be the first moment of genuine value — not signup, not profile completion. Ask the founder: "What's the moment when someone would tell a friend this product is worth using?" That's the activation event.
The second activation event is what they do next that predicts they'll come back. For most B2B SaaS, it's completing the same action twice in the first week. For consumer apps, it might be completing a setup step that personalizes the experience.

###### 2. Build the activation funnel in PostHog
In PostHog, go to Funnels. Add steps in order:
- Signup completed (or first pageview if signup isn't tracked)
- First key action (activation event)
- Second key action (retention-predicting event)
Set the funnel window to 7 days — users who haven't activated in 7 days almost never do. Look at the drop-off percentage between each step. The biggest single drop is where you focus first.

###### 3. Watch 5–10 session replays of drop-offs
In PostHog, filter session replays to users who hit step 1 but not step 2 of the funnel. Watch 5–10 replays. You are looking for: where they stop, what they click that doesn't work, what they read, where they pause. You don't need 50 replays. Five replays that all show the same confusion point tell you exactly what to fix.
While watching, write one observation per replay: "User stopped at [screen]. They clicked [element] three times with no result." That's raw data. Do not form the hypothesis yet.

###### 4. Form the hypothesis
After 5–10 replays, write the hypothesis in this format: "We believe [users drop off at X] because [reason from session replays]. If we [specific change], we expect activation rate to increase from [current %] to [target %] in [timeframe]."
Example: "We believe users drop off on screen 3 because the CTA to connect their data source isn't visible without scrolling. If we move the CTA above the fold, we expect activation rate to increase from 22% to 35% in 2 weeks."
Specific numbers matter. "Improve" is not a hypothesis.

###### 5. Spec the fix for the pod
Write a one-page spec: the hypothesis, the specific UI or flow change, the PostHog A/B test setup using feature flags, and the success metric. The pod should not need to make any design decisions — those are in the spec.

###### 6. Run the A/B test with PostHog feature flags
In PostHog, create a feature flag for the change. Roll it out to 50% of new users. Set the experiment to run for at least 2 weeks or until you have 100 users in each variant — whichever comes second. Do not end the test early because one variant looks better after 20 users. That's noise, not signal.

###### 7. Read the result and decide
At the end of the test window: if the variant activation rate beats control by 10%+ with statistical significance (PostHog shows this automatically), ship it to 100% and add it to the funnel baseline. If the variant doesn't beat control, the hypothesis was wrong — go back to replays and form a new one. That's not failure; that's the loop working.

##### Templates
1. PostHog → Product Analytics → Funnels → New Funnel
2. Add events: user_signed_up → [your activation event] → [your second key action]
3. Set conversion window: 7 days
4. Breakdown by: none (start clean, add breakdowns once baseline is set)
5. Save as "Activation Funnel v1" — you'll come back to this weekly
"I watched 8 session replays of users who signed up but didn't complete [activation event]. Here are my observations: [paste raw observations]. Help me synthesize these into a single root cause and a specific hypothesis in this format: 'We believe [users drop off at X] because [reason]. If we [specific change], we expect activation rate to increase from [X%] to [Y%] in [timeframe].' Give me the top 2 most likely hypotheses based on the observations."
User-facing problem: [paste the hypothesis — one sentence]
Success metric: Activation rate (signup → first key action, 7-day window) increases from [X%] to [Y%].
Scope (in): [specific UI or flow change — no vague "improve the UX"]
Scope (out): [what you're explicitly not changing in this sprint]
PostHog events to instrument:
- onboarding_step_[n]_viewed — fires when the user sees each onboarding screen
- onboarding_step_[n]_completed — fires when the user completes each step
- onboarding_cta_clicked — fires on every CTA click in the onboarding flow, with cta_label and screen properties
- [activation_event] — already defined; confirm it's firing correctly before the test starts

##### Definition of done
- Activation event defined and confirmed firing in PostHog.
- Activation funnel built and saved in PostHog with baseline conversion rates at each step.
- At least 5 session replays of drop-off users watched and observations logged.
- Hypothesis written in the required format with specific current and target percentages.
- Spec delivered to pod.
- A/B test run for minimum 2 weeks or 100 users per variant.
- Result documented: winning variant shipped or hypothesis discarded with learnings logged.

##### Common pitfalls
- Defining activation as "completed signup." Signup is the beginning of the journey, not a moment of value. The activation event is the first time the product delivers what it promised. Define it correctly or the funnel measures nothing useful.
- Ending the A/B test too early. 20 users per variant is not enough data. Variants that look 30% better after 15 users routinely converge to control after 100. Let the test run.
- Skipping session replays and guessing the hypothesis. Most teams skip replays and optimize based on intuition. They fix the wrong screen. Watch the replays — the problem is almost always different from what you expect.
- Vague specs. "Improve the CTA" is not a spec. "Move the CTA button to above the fold on the data connection screen and change the label from 'Continue' to 'Connect your data'" is a spec. The pod should not be making UX decisions during implementation.
- Optimizing before fixing critical bugs. If 10% of users hit an error screen during onboarding, fix the error before running an A/B test. You can't A/B test around a broken flow.

##### How to talk about it with the client
"Right now we're losing about [X%] of users between signup and their first real action. That means for every 10 people who sign up, only [Y] ever use the product. Before we drive more traffic, I want to find out why those [X - Y] people left. I'm going to watch 10 session replays this week. By Friday I'll have a hypothesis and a spec for the pod. One sprint on this will compound every other growth initiative we run."
If they want to run more ads instead: "More traffic into a funnel that's losing 70% of users just means more wasted budget. The activation problem is upstream of every acquisition channel. We fix this first."

---
#### "Invite a teammate" mechanic
B2B viral loop — one user pulls in their colleagues. Most effective B2B growth mechanic when the product has multi-user value.

##### Why this matters
The most effective B2B growth loop isn't ads or SEO — it's one user pulling in their colleagues. When a product gets better with more teammates on it (shared workspaces, collaborative documents, team dashboards), every activated user is a potential growth vector into their entire organization. This mechanic turns the product itself into the acquisition channel.
PO writes the hypothesis and designs the UX. Pod builds the invite flow. The design decisions — where the trigger lives, what permissions the invitee gets, what the invite message says — are PO's call, not the pod's.

##### When to run it
- The product has multi-user value: it's better, faster, or more useful when teammates are on it. Collaborative editing, shared dashboards, team workflows — any of these qualify.
- At least one user has activated and come back at least twice. You need at least one "happy path" to prove the value before asking them to invite peers.
- The product has a concept of workspaces, teams, or shared accounts that naturally accommodates multiple users.
- Not at signup. A user who signed up 30 seconds ago has no reason to invite anyone. The trigger must come after they've experienced value.
- Not when the product is fundamentally single-user. A personal habit tracker or a solo portfolio tool doesn't get better with teammates. Forcing a viral loop onto a solo product creates friction without payoff.

##### What you'll need
- PostHog — to track invite sent, invite accepted, and time-to-second-user per account. Your success metrics live here.
- The pod — invite flow is a code feature: email invite generation, link generation, permission assignment, account association. PO specs it; pod builds it.
- Claude — to write the invite email, the pre-filled invite message, and the in-app prompt copy.
- A permission model decision — what can an invited user do? Full access, view-only, or a defined role? This must be decided before the spec is written. Leaving it to the pod means inconsistent UX.

##### Step-by-step

###### 1. Confirm the product gets better with teammates
Ask the founder: "Does this product deliver more value when two people from the same company are using it?" If the answer is "sort of" or "maybe," the mechanic will underperform. It needs to be an obvious yes. A project management tool: yes. A personal journaling app: no. If you're uncertain, check session replays — do existing users try to share anything, reference colleagues, or create content that implies another reader?

###### 2. Define the trigger moment
The invite prompt must appear after the first value moment — not before. For most B2B products, that's after the user completes their first meaningful workflow: created a project, built a report, sent their first action item. At that moment they've gotten value and they know who else should see it. That's when you ask.
Write the trigger event name down: [activation_event]. The pod wires the invite prompt to fire after this event, once, on first occurrence. Not on every visit.

###### 3. Decide on named seats vs. open invites
Two models, each with tradeoffs:
- Named seats (invite by email): User enters a specific email address. Lower volume but higher quality — the inviter is vouching for a specific person. Converts at 40–60% because it's expected.
- Shareable link: User shares a link, anyone can join. Higher volume, lower intent. Useful for open communities; risky for products where account access should be controlled.
For B2B products, start with named seats. Add shareable links later if named invites prove too slow.

###### 4. Write the spec for the pod
See Templates for the full spec callout. Specify: trigger event, invite input UI (email field vs. link), permission level for invitee, what the invitee sees when they accept (does it land them in the inviter's workspace?), and all PostHog events.

###### 5. Write the invite email with Claude
The invite email is sent from the product but reads as if from the inviter. It should name the inviter, reference what they're working on, and make the value clear in one sentence. Use the Claude prompt in Templates. The email should be under 80 words. The subject line should include the inviter's name — open rates jump 25% when the recipient sees a colleague's name in the subject.

###### 6. Set success metrics before the pod ships
Two metrics to track from day one: percentage of accounts with 2+ users (target: 20% within 60 days of invite flow shipping), and median time from first user activation to second user activation (target: under 7 days). These are the benchmarks that tell you whether the mechanic is working.

###### 7. Review the data at 30 days
Pull the PostHog dashboard after 30 days. What % of users saw the invite prompt? What % clicked it? What % of sent invites were accepted? Where the funnel drops is where you iterate — either the prompt copy, the timing, or the permission model.

##### Templates
User-facing problem: Users who get value from the product have no clear way to bring in teammates, and there's no incentive trigger to prompt them to do so.
Success metric: 20% of accounts have 2+ active users within 60 days of shipping. Median time-to-second-user under 7 days.
Scope (in): Invite prompt triggered after [activation_event] (first occurrence only), email-based invite input, invitee lands in inviter's workspace on accept, invitee gets [defined permission level], invite email sent from product with inviter's name in subject.
Scope (out): Shareable link (phase 2), role management UI, bulk invite, invitee-initiated team join.
PostHog events to instrument:
- invite_prompt_shown — fires when the invite prompt appears after the activation event
- invite_sent — fires when the user submits an invite email address, with invitee_email_domain property
- invite_accepted — fires when the invitee completes signup via an invite link, with inviter_user_id property
- second_user_activated — fires when an invited user completes the activation event, with days_since_first_user_activation property
"Write an invite email for a B2B product called [product name] that [one-sentence description]. The email is triggered by [inviter's name] inviting [invitee's email]. Requirements: under 80 words, subject line includes the inviter's name, the email reads as if it's from the inviter (not a marketing blast), body mentions what the inviter is working on in a placeholder like {inviter's project name}, one clear CTA ('Accept your invite'), no marketing language. Give me 2 subject line options and the body."
Heading: "Bring in a teammate"
Body: "{Product name} is faster with your whole team. Invite someone to collaborate on {current project name}."
CTA: "Invite by email"
Dismiss: "Maybe later"
Note: "Maybe later" re-surfaces after 7 days. Permanent dismiss is a separate option only accessible from settings.

##### Definition of done
- Product confirmed to have multi-user value prop — written down, not just assumed.
- Trigger event defined: invite prompt fires after this specific event, first occurrence only.
- Permission model for invitees decided and documented.
- Spec delivered to pod with all PostHog events listed.
- Invite email copy written and approved by founder before shipping.
- 30-day PostHog review completed with funnel drop-off identified and a hypothesis for the next iteration.

##### Common pitfalls
- Triggering the invite prompt at signup. This is the most common mistake. A user who just created an account has no idea whether the product is worth recommending. The invite prompt at signup converts at under 2%. After the activation event it converts at 15–30%.
- Not deciding the permission model before spec. If the pod has to figure out what an invited user can do, they'll make a guess. That guess will be wrong for your product's context. Decide it first: view-only, full edit, or a named role.
- Sending the invite email from a no-reply address. The email should come from a real address the inviter controls or a team@ address that someone monitors. Invite emails from no-reply@ feel like spam and get ignored.
- Building for a solo-use product. If the product doesn't get better with teammates, this mechanic adds complexity and confusion. Don't force viral loops onto products that aren't collaborative.
- Not tracking time-to-second-user. "We have 2+ user accounts" is a vanity metric if the second user joined 90 days after the first. Time-to-second-user tells you whether the loop is actually viral or just eventually true.

##### How to talk about it with the client
"Every B2B tool that compounds over time — Slack, Notion, Figma — grew because one user pulled in their whole team. We have the same opportunity here. But the trigger matters: we're not asking at signup, we're asking at the moment someone first gets real value. That's when they know who else needs to see this. I'll write the spec this week — it's one sprint for the pod and it changes the shape of how the product grows."
If they ask why not just add a 'Share' button: "A generic share button has a 1% click rate. A contextual prompt that appears after a specific value moment, with the invitee's workspace ready on accept, converts at 15–30%. The design of the trigger is what makes it work."

---

### 3.5 Validation & Research
Learning from early cohorts to feed the hypothesis portfolio.

#### 30-minute user interview
The most valuable thing a PO can do early. Claude writes the script — focus on problems, not features. Don't pitch; listen. Record with consent.

##### Why this matters
No artifact — survey, analytics, or heatmap — tells you why. User interviews get to the why. A 30-minute conversation with the right person reveals the words they use to describe their problem, the tools they already use and hate, and the moments where your product either clicks or doesn't. That's the raw material for every hypothesis you run for the next month.
POs own this because the insight only holds value if someone synthesizes it into action. An interview nobody acts on is just a conversation.

##### When to run it
- You have at least one signed-up or waitlisted user who fits the ICP — even one is enough to start.
- The team has a live question: "We don't know why users aren't activating" or "We're not sure if pricing is the objection." Interviews answer specific questions, not vague ones.
- Before writing a major feature spec. An interview often replaces a month of building the wrong thing.
When NOT to run it:
- Don't interview only friends and family. They will lie to make you feel good. Target ICP strangers only.
- Don't run interviews after you've already committed to a feature. At that point you're fishing for validation, not truth.
- Don't treat one interview as a pattern. Five is the minimum before drawing conclusions.

##### What you'll need
- Claude — for drafting the interview script and synthesizing notes afterward.
- Zoom or Loom — Zoom for live interviews with recording enabled. Loom if you need to send async video questions as a fallback.
- Granola or Otter.ai — auto-transcription so you're not furiously typing while someone's talking. Granola works inside Zoom without a separate bot.
- A scheduling link — Calendly free tier. Cut the back-and-forth.
- A $25 gift card budget per participant — optional but doubles your show rate. Amazon or Visa gift cards work universally.
- A shared doc — one doc per interview for raw notes; a separate synthesis doc for patterns across all interviews.

##### Step-by-step

###### 1. Define the question you're trying to answer
Write one sentence: "After these interviews, I need to know ___." If you can't fill in that blank, you're not ready to interview. Common versions: "what triggers someone to start looking for a solution like ours" or "what part of onboarding is confusing and why."

###### 2. Identify who to recruit (ICP only)
Recruitfrom your waitlist, LinkedIn, or relevant communities — never just people who already said yes to you in person. The person who signs up for a waitlist is closer to ICP than your co-founder's college roommate. Write a one-line description of who qualifies before you start recruiting: role, company type, and the specific situation that makes them relevant.

###### 3. Send the recruiting message
DM them on LinkedIn or email them directly. Keep it under 60 words. Say what you're building, say you want to hear about their experience with the problem, and give them the Calendly link. Offer the gift card if you have budget. Don't pitch the product — that kills the interview before it starts.

###### 4. Draft the script with Claude
Use the prompt in the Templates section. The script should open with context-setting, spend 80% of the time on past behavior ("walk me through the last time you..."), and close with one forward-looking question. Never ask "would you use a feature that..." — the answer is always yes and it tells you nothing.

###### 5. Run the interview — listen more than you talk
Start the recording. Introduce yourself in one sentence and explain you're trying to understand their experience, not pitch anything. Then ask the opening question and stop talking. When they finish an answer, wait three full seconds before responding. Silence pulls out the real answer. The two follow-ups that get the most truth: "what did you try first?" and "how did that work out?"

###### 6. Take one-line observations during the call
Don't write full sentences — just flag the moments: "said 'embarrassing' about the manual process" or "mentioned Excel three times." These raw observations matter more than a polished summary. Granola or Otter handles the full transcript so you're not heads-down typing.

###### 7. Synthesize after 5 interviews
Open Claude and paste in all five sets of notes. Use the synthesis prompt in Templates. Five interviews is the threshold where patterns start to emerge. One interview is anecdote. Five is signal.

###### 8. Turn patterns into hypotheses
Each pattern becomes a hypothesis in the format: "We believe [user type] has [problem] because [evidence]. If we [change], we expect [outcome]." These feed directly into the next sprint planning and portfolio review.

##### Templates
"Write a 30-minute user interview script for a {product description in one sentence}. The user we're interviewing is {ICP description: role, company type, situation}. The one question we're trying to answer is: {your question from step 1}.Rules:- Open with 2 minutes of context-setting and consent to record- Focus 80% of questions on past behavior, not hypothetical futures- Use 'walk me through the last time you...' as the main question structure- Include 3 follow-up prompts for when they give shallow answers- Never ask 'would you use a feature that...' or 'how much would you pay for...'- Close with: 'Is there anything I didn't ask that you think I should know?'- Format as a numbered list of questions with interviewer notes in italics"
"Hi {first name} — I'm building a tool for {ICP role} dealing with {specific problem}. I'm not pitching anything — I'd love 30 minutes to hear how you handle {problem area} today. Happy to send a $25 Amazon gift card for your time. Does {day} work? {Calendly link}"
"Here are notes from 5 user interviews. Each set is separated by ---. Identify the top 3 patterns in: (1) how they describe the problem in their own words, (2) what they're currently using to solve it, (3) where their current solution breaks down. For each pattern, include 2–3 direct quotes. Output as a short doc I can share with the team."

##### Definition of done
- 5 interviews completed with ICP-qualified participants (not friends, not co-founders).
- Each interview recorded and transcribed.
- Raw observation notes exist for each interview.
- One synthesis doc exists with patterns and direct quotes.
- At least 2 hypotheses written in "We believe / because / if we / we expect" format and added to the sprint backlog.

##### Common pitfalls
- Pitching during the interview. The moment you start explaining features, the interviewee becomes a polite audience, not an honest source. Stay in question mode the entire call.
- Asking hypothetical questions. "Would you pay $50/month for this?" gets you a yes. "How do you currently handle this, and what does it cost you?" gets you truth.
- Interviewing only five people you already know. People who like you will soften their feedback. Strangers with the problem give you the real version.
- Not recording. Memory distorts. You will misremember what they said. Recording is non-negotiable — just get verbal consent at the start.
- Drawing conclusions from one interview. One data point is a story, not a pattern. Run five before changing anything.
- Never synthesizing. Notes that don't become hypotheses are just files. The synthesis is the deliverable — block time for it immediately after the fifth interview.

##### How to talk about it with the client
"I'm scheduling five 30-minute user interviews this week. We'll talk to people who fit the ICP — not your network, actual strangers who have the problem. The goal isn't to show off the product. It's to understand how they describe the problem today, what they've already tried, and where those solutions fall short. By Friday I'll have a synthesis doc with patterns and two or three hypotheses for the next sprint. This replaces guessing."
If they say "I already know what customers want": "You might be right. These five interviews will either confirm it or surface something we missed. Either outcome is useful — and it takes three hours total."
If they push back on the gift card budget: "A $125 total investment gets us five honest conversations with the exact people we're building for. That's the cheapest market research that exists."

---
#### In-app cohort survey
5 questions max, triggered after a key action. Ties responses directly to user behavior data in PostHog.

##### Why this matters
A survey triggered at the right moment in your product captures the user's experience while it's still fresh. Unlike a follow-up email survey sent hours later, an in-app survey catches the emotional state — confusion, delight, frustration — right when it's happening. That timing is worth more than a longer questionnaire with higher completion rates.
PostHog Surveys lets you tie every response directly to a user's behavioral data. You don't just know what they said — you know what they did before and after they said it.

##### When to run it
- After a user reaches a clear value moment — completed their first export, invited a teammate, connected an integration. They just experienced the product working. That's when sentiment is highest and feedback is most honest.
- When you have a specific question that can't be answered by behavior data alone. "Users are dropping off after step 3" is visible in PostHog. "Why are they dropping off" is not.
- When you have at least 50 active users. Below that, survey responses are too sparse to see patterns.
When NOT to run it:
- Not at signup. The user has experienced nothing yet. Their answer is worthless.
- Not during an active flow — in the middle of a form, checkout, or onboarding step. It breaks concentration and they'll dismiss it without answering.
- Not more than once per month per user. Survey fatigue is real and it damages trust.

##### What you'll need
- PostHog — free tier handles surveys, feature flags, and tying responses to user identity. If PostHog isn't already installed in the product, the pod can drop in the snippet in under an hour.
- A PostHog user property or event — the trigger point. You need to know which event in PostHog represents the value moment you want to survey after.
- Claude — for drafting question wording. Bad question wording gets bad data. Claude can improve it fast.
- A doc to log response themes — PostHog shows individual responses; you'll synthesize patterns manually.

##### Step-by-step

###### 1. Pick one survey type for this run
There are three worth using at this stage:
- NPS (Net Promoter Score) — "How likely are you to recommend this to a colleague?" 0–10 scale. Use it after a user has had at least two sessions. Tracks overall sentiment over time.
- Problem discovery — open-ended, 1–3 questions. Use it early, before you know what's confusing. "What almost stopped you from signing up?" is the single best question here.
- Feature priority — "Which of these would be most useful to you?" with 3–4 options. Use it only when you genuinely don't know which of several things to build next. Don't use it as a rubber stamp on a decision already made.
Pick one type per survey. Don't mix NPS with feature priority in the same survey — they measure different things and pollute each other.

###### 2. Write 5 questions maximum — include one open-ended
Five questions is the ceiling. Above that, completion rates drop sharply. Always include exactly one open-ended question — the single open-ended response is almost always the most useful data you collect. The yes/no and scale questions give you distribution; the open-ended gives you the words.

###### 3. Set the trigger in PostHog
In PostHog, go to Surveys → New Survey. Set the display condition to fire after a specific event — the event name should already exist in your PostHog event stream if the pod set it up correctly. Set a response limit of 1 per user so they don't see it again after answering. Set a display delay of 3 seconds after the event fires so the UI doesn't jump.

###### 4. Test it yourself before enabling it for users
Log in as a test user, trigger the event, and confirm the survey appears, submits, and the response shows up in PostHog. This takes five minutes and prevents a week of collecting broken data.

###### 5. Let it run until you have 30+ responses
Below 30, the distribution is too unstable to act on. If you're not hitting 30 responses within two weeks, the trigger moment isn't being reached often enough — reconsider the trigger event or the audience size.

###### 6. Pull the responses and tie them to behavior
In PostHog, export the responses. Cross-reference the respondents with their session data — users who gave a low NPS score but had long sessions behave differently from low-NPS users who bounced after two clicks. That context changes how you interpret the answer.

###### 7. Synthesize the open-ended responses with Claude
Paste all open-ended responses into Claude with the synthesis prompt in Templates. You're looking for recurring phrases, emotions, and friction points — not individual complaints.

##### Templates
- "What almost stopped you from signing up?" (open-ended — this is gold)
- "What were you using before you found us?" (open-ended)
- "What's the one thing this product does that made you stay?" (open-ended)
Use all three, or just the first one. Never more than five total.
After the 0–10 scale: "What's the main reason for your score?" (open-ended, one sentence max prompt)
That follow-up converts the NPS number into something actionable. Without it, the number is vanity.
"Here are {N} open-ended survey responses from users of a {product description}. Identify the top 3 themes. For each theme: name it in 5 words or fewer, list 2–3 representative quotes verbatim, and estimate what percentage of responses relate to it. Ignore one-off complaints with no parallel. Output as a short doc."
"Review these survey questions for leading language, double-barreled questions, and jargon a non-technical user wouldn't understand. Rewrite any that have problems. Keep each question under 15 words."

##### Definition of done
- Survey live in PostHog, triggered after a specific value-moment event (not at signup).
- 30+ responses collected.
- Open-ended responses synthesized into 3 themes with supporting quotes.
- Quantitative responses (NPS or scale) summarized with distribution, not just average.
- At least one hypothesis or backlog item created from the findings.

##### Common pitfalls
- Triggering at signup. The user has no experience yet. Responses reflect their hopes, not their reality. Wait for a value moment.
- More than 5 questions. Completion rate drops by roughly half for every two questions above five. Cut ruthlessly.
- No open-ended question. Scale questions give you a number. Open-ended questions give you the words users actually use. The words are what become positioning, copy, and feature specs.
- Acting on 5 responses. Small samples lie. Wait for at least 30 before drawing conclusions. If you can't wait, note the sample size prominently in any document you share.
- Ignoring response rate. Under 5% response rate means the trigger is wrong or the audience isn't engaged. Fix the trigger before sending more traffic.
- Collecting without synthesizing. Responses in a PostHog dashboard nobody reads are just noise. Schedule the synthesis session before you launch the survey.

##### How to talk about it with the client
"We're going to trigger a short survey right after users complete their first [value moment]. Three questions max, one open-ended. We'll let it run until we have 30 responses. The goal is to understand what almost stopped them and what made them stay — in their own words. Those phrases go directly into the landing page copy and the onboarding flow. This takes about two hours to set up in PostHog and two weeks to collect. Then we synthesize."
If they want to add more questions: "More questions means fewer completions. We pick the three that answer our most pressing question right now. We can run a different survey next month for everything else."

---
#### Session recording review
Watch what early users actually do in the product. More honest than any survey — users say one thing and do another. Block 30 minutes per week for this.

##### Why this matters
Users lie — not on purpose, but they describe what they meant to do, not what they actually did. Session recordings show you what they actually did. A user who says "the onboarding was confusing" tells you nothing actionable. A recording of that same user clicking the same button four times before giving up tells you exactly what to fix.
Thirty minutes a week watching real sessions is one of the highest-ROI activities a PO can do. It reveals friction no survey will ever surface because users don't know how to articulate it.

##### When to run it
- Every week, once the product has at least 10 active users. Make it a calendar block, not a "when I have time" task — it will never happen otherwise.
- Immediately after a new feature ships. Watch how the first cohort discovers and uses it.
- When metrics show a drop-off but don't explain why. Funnels tell you where. Recordings tell you why.
When NOT to rely on it:
- Don't watch recordings and immediately ship fixes based on one session. One confused user might just be confused. Watch 5–10 sessions on the same screen before acting.
- Don't watch recordings as a substitute for talking to users. They're complementary. Recordings show behavior; interviews explain motivation.

##### What you'll need
- PostHog Session Replay — already included in PostHog's free tier. If the pod installed PostHog for analytics, session replay is already collecting data. You just need to turn it on.
- PII masking configured — PostHog can automatically mask input fields (passwords, credit card numbers, email addresses). The pod needs to set this up before review starts. Do not skip this step — watching unmasked PII is a compliance issue.
- A notes doc — one running doc per week. Date, session ID, timestamp of observation, what you saw. Three columns is enough.
- A Slack channel or shared space — for sharing clip links with the pod when you find something worth acting on.

##### Step-by-step

###### 1. Confirm PII masking is active before watching anything
In PostHog, go to Project Settings → Session Replay. Confirm "Mask all inputs" is enabled or that specific sensitive fields are masked by CSS class. Ask the pod to verify this if you're unsure. Watching unmasked passwords or payment info — even internally — is a problem you don't want.

###### 2. Build your filter before opening recordings
Don't watch sessions at random. Pick one of these filters each week and stick to it:
- New user first session — filters to users in their first 24 hours. Shows you where first-timers get stuck.
- Drop-off cohort — users who reached a specific screen but didn't complete the next step. Filter by a funnel you've already built in PostHog.
- Feature discovery — users who triggered a specific event for the first time. Shows you how they found and understood a new feature.
- Rage clicks — PostHog flags sessions with repeated rapid clicks on the same element. These are the sessions with the most friction.

###### 3. Watch in 1.5x speed for the first pass
Speed up to 1.5x or 2x to scan through a session, then slow back to 1x when something catches your attention. You're looking for: hesitation before clicking, scrolling past an obvious CTA, clicking on something that isn't a link, and leaving a page without doing the expected action.

###### 4. Log observations in real time — timestamp and one line
Don't try to write a summary after the session. Log during it. Format: "2:34 — clicked the back button instead of submit, probably didn't see submit button" or "4:12 — scrolled the pricing table back and forth three times before clicking free plan." Short and specific. Time-stamped so you can find the clip again.

###### 5. Mark sessions worth sharing before closing them
PostHog lets you save individual sessions with a note. When you find a session the pod needs to see, save it with a one-line description. A 30-second clip of someone struggling beats any written description of the problem.

###### 6. Separate "fix this sprint" from "noise"
After watching 5–10 sessions, sort your observations into two columns: things you saw in multiple sessions (fix it) and things you saw once (note it and watch for recurrence). One confused user is anecdote. Three confused users at the same spot is a bug.

###### 7. Share the most surprising clip with the pod
Post the PostHog session link in Slack with one sentence: "User spent 45 seconds trying to find the export button — it's below the fold on a 13-inch screen." That clip will do more to align the pod on the problem than a 500-word Notion doc.

##### Templates
Paste this into your weekly notes doc and fill it in during the 30-minute block:
```
Date:
Filter used (new users / drop-off / rage clicks / feature discovery):
Sessions watched: [N]

Observations:
- [timestamp] [session ID] [what happened — one sentence]
- [timestamp] [session ID] [what happened — one sentence]

Fix this sprint (seen 3+ times):
-

Monitor (seen once or twice):
-

Clip to share with pod:
- [PostHog link] — [one sentence description]
```
"Session replay finding this week: [PostHog link]. Watch from 2:10. User tries to click the section header three times expecting it to expand — it's not interactive. Same behavior in 4 other sessions this week. The header looks clickable but isn't. Worth a quick fix."

##### Definition of done
- PII masking confirmed active in PostHog before any sessions are watched.
- 30-minute block on the calendar every week — not ad hoc.
- At least 5 sessions watched per week using a consistent filter.
- Observations logged with timestamps, not written from memory after the fact.
- At least one clip shared with the pod per month when a recurring friction point is found.
- Recurring friction points converted to backlog items within one sprint of being observed in 3+ sessions.

##### Common pitfalls
- Watching without a filter. Random sessions waste your time. Start every session with a specific question — "where are new users getting stuck?" — and filter accordingly.
- Acting on one session. One confused user is noise. Three confused users at the same spot is signal. Don't ship a fix until you've seen it multiple times.
- Skipping PII masking. Watching real user input fields — including search terms, messages, and profile data — is a compliance and trust issue. Get masking configured before the first review.
- Treating it as optional. This only works as a weekly discipline. Block it on the calendar. Doing it "when there's time" means it never happens.
- Writing summaries from memory. Memory smooths out the rough edges. Log observations during the session with timestamps. The specificity is what makes it actionable.

##### How to talk about it with the client
"I'm blocking 30 minutes every Thursday to watch session recordings in PostHog. I'm not reading the data — I'm watching real users move through the product. What I'm looking for is the moments where they hesitate, click the wrong thing, or leave without doing what we expected. Those moments are invisible in your metrics but obvious on video. When I find a pattern — same friction in three or more sessions — I'll share a clip and we'll spec a fix. It's the fastest way to improve activation without guessing."
If they say "we already have analytics for that": "Analytics tell you where users drop off. Recordings tell you why. Both are necessary. This is the why."

---
#### Weekly "what did we learn" summary
PO writes one paragraph per week summarizing traction learnings. Feeds directly into the portfolio review — traction results are hypotheses too.

##### Why this matters
Learnings disappear. An interview insight from three weeks ago, a session recording observation from last month, a reply rate experiment that revealed something — all of it evaporates unless someone writes it down in a shared place. The weekly learnings summary is a one-paragraph forcing function that keeps the team's collective memory intact and feeds the hypothesis portfolio with real evidence instead of gut feel.
Six weeks of summaries read in sequence reveals patterns no single week shows. A team that does this consistently makes faster decisions because they're not relitigating things they already learned.

##### When to run it
- Every week, starting from week one of traction work. It doesn't matter if the learning is small — "we tried X and nothing happened" is a valid learning.
- Especially in weeks where nothing seemed to work. A null result is still a result and it's often more valuable than a win.
When NOT to treat it as optional:
- Don't skip it on quiet weeks. Quiet weeks often hide the most useful signals — the absence of activity is data.
- Don't turn it into a status report. This is not "what we did this week." It's "what we learned this week." Different document entirely.

##### What you'll need
- A shared Notion page or Google Doc — one doc, one entry per week, newest at the top. The entire team should have read access, including the founder.
- A recurring Friday reminder — 5 minutes before you close your laptop. Set it now.
- Nothing else. This is a writing exercise, not a tool exercise.

##### Step-by-step

###### 1. Set up the doc once
Create a Notion page titled "[Product Name] — Traction Learnings." Share it with the founder and the pod lead. Add a heading for the current week in the format "Week of [date]." That's the entire setup. Don't build a template with fifteen fields — this works precisely because it's low-friction.

###### 2. Write three bullets — nothing more
Every week, under the date heading, write exactly three bullets:
- What we tried — the specific traction activity. Not "we did some outreach." "We sent 30 cold emails to logistics ops managers using value prop B."
- What we learned — the result and what it means. Not "some people replied." "6/30 replied. 4 of the 6 mentioned the same pain point we hadn't foregrounded. Value prop B missed the real trigger."
- What we'll try next — the next hypothesis. "Rewrite the opening hook around the trigger pain, test with 30 more. Expect 10%+ reply rate."

###### 3. Write it in 5 minutes — don't polish
The enemy of this habit is perfectionism. Write in plain language. Use numbers where you have them. Leave out context that anyone on the team already has. Five minutes maximum. If it takes longer than five minutes, you're over-explaining.

###### 4. Post it in the pod Slack channel
Paste the three bullets directly into the #learnings Slack channel (or equivalent). Don't just update the doc silently — the Slack post is what ensures people actually read it. Link to the doc for historical context.

###### 5. Read six weeks in sequence before every portfolio review
Before the quarterly portfolio review, open the doc and read the last six entries in sequence. This is when patterns emerge. A hypothesis that failed three times in a row is a dead end. A hypothesis that improved slightly each iteration is a signal worth doubling down on. You cannot see this from inside any single week.

###### 6. Feed patterns into the hypothesis portfolio
Any pattern you identify across multiple weeks becomes a new hypothesis or confirms/kills an existing one. Bring these to the portfolio review with evidence: "We've tested value prop B three times in different forms. Every time, the real trigger is X not Y. Hypothesis: reframe the entire ICP definition around X."

##### Templates
```
##### Week of [date]

**What we tried:** [specific activity with numbers — who, what, how many]

**What we learned:** [result + what it means — specific, not vague]

**What we'll try next:** [next hypothesis — measurable]
```
```
##### Week of April 14

**What we tried:** Ran a 3-question in-app survey triggered after first export. 47 responses over 8 days.

**What we learned:** 31 of 47 open-ended responses mentioned "I wasn't sure if my data was saved." We don't show a confirmation state after export. Users are uncertain the action worked.

**What we'll try next:** Add an explicit "Export saved" confirmation toast. Hypothesis: reduces support tickets about missing exports by 50% within 2 weeks.
```
"Weekly learnings — [date]:
Tried: [one line]
Learned: [one line]
Next: [one line]
Full doc: [Notion link]"

##### Definition of done
- One entry written every Friday — no gaps.
- Each entry has all three bullets: tried, learned, next.
- Entries posted to the pod Slack channel, not just saved in the doc.
- Doc reviewed in sequence before every portfolio review.
- At least one cross-week pattern identified and turned into a hypothesis or decision within 6 weeks of starting.

##### Common pitfalls
- Turning it into a status report. "This week we ran outreach and started setting up PostHog" is a status report. "We tried X, learned Y, and next we'll test Z" is a learnings summary. One drives learning; one drives bureaucracy.
- Skipping quiet weeks. A week where nothing worked is not a week to skip. "We tried X and got no response" is a valid, important entry. The absence of signal is signal.
- Over-engineering the format. A fifteen-field Notion template kills the habit. Three bullets in a shared doc is all you need. Friction is the enemy of consistency.
- Writing for an audience. This is a working document, not a client deliverable. Write as if you're leaving a note for yourself in three months. Clarity beats polish.
- Never reading the backlog. Entries that nobody reviews are just a diary. The value comes from reading six weeks in sequence and seeing the arc. Build that review into the portfolio rhythm.

##### How to talk about it with the client
"Every Friday I write three bullets: what we tried, what we learned, what we'll test next. It takes five minutes. I post it in Slack and add it to a shared doc. The doc becomes our institutional memory — in three months, we can look back and see exactly which hypotheses worked, which didn't, and what the pattern is. Without it, we repeat mistakes and lose the learnings that came from the activities we already paid for. This is the cheapest thing we do and it compounds every week."
If they say "we already talk about this in standups": "Standups disappear. Written summaries compound. They're not the same thing."

---

### 3.6 Paid Acquisition Testing
Own the learning loop before spending real money.

#### Micro-budget ad test
$200–500 on Meta or Google to validate messaging and ICP targeting before spending real money. PO writes the hypothesis, Claude generates ad copy and variations, PO reads the results.

##### Why this matters
Founders have gut feelings about which message works and who the right customer is. Paid ads answer that question with data instead of opinions. A $300 test across two audiences and five ad variants tells you whether the ICP hypothesis is right — before you burn $5,000 finding out it isn't.
The goal is not to acquire customers cheaply. The goal is to learn which message and which audience convert, so that when you do scale spend, you're spending on something proven.

##### When to run it
- The landing page is live and the waitlist or signup form works end-to-end.
- A conversion event is instrumented — PostHog or GA4 is firing on form submit. Without this, you can't measure results.
- You have at least two audience hypotheses to test — not just one ICP, but two different ones so you can compare.
- The founder has $200–500 available specifically for learning, not for revenue generation.
Do not run this when: the landing page is not converting organically at all, the signup form is broken, or the conversion event is not confirmed firing. Paid traffic to a broken funnel teaches you nothing.

##### What you'll need
- Meta Ads Manager — for B2C products or visually-driven pitches. Audience targeting by interest, demographic, and behavior. Best for consumer, lifestyle, or social products.
- Google Ads — for products where people are actively searching for a solution. "Best tool for X" or "how to do Y" intent traffic. Better for B2B with specific search terms.
- LinkedIn Ads — for B2B if the ICP is a specific role or industry. Minimum effective budget is higher ($50+/day), so only run this if the ICP is clearly professional.
- Claude — for generating ad copy variants across audiences.
- PostHog or GA4 — to track conversions. Confirm the conversion event is firing before you put any money in.
- A spreadsheet — to log ad performance daily: impressions, clicks, signups, cost per signup per ad variant.

##### Step-by-step

###### 1. Write the test hypothesis
Before touching Ads Manager, write one sentence: "We believe [audience A] converts better than [audience B] because [reason]." This forces you to be specific about what you're learning. Show it to the founder. If they can't confirm the two audiences are distinct, go back and sharpen the ICP first.

###### 2. Pick the platform
Meta for B2C or any product with a visual angle. Google for B2B with clear search intent — someone actively looking for a solution. Start with one platform. Running both simultaneously with a $300 budget spreads it too thin to learn anything.

###### 3. Generate 5 ad variants with Claude
Use this prompt to generate variants across both audiences:
```
You are writing paid ad copy for a {one-sentence product description}.

We're testing two audiences:
- Audience A: {ICP A — specific role, situation, and pain}
- Audience B: {ICP B — specific role, situation, and pain}

Write 5 ad variants. Each variant = one headline (under 40 characters) + one body (under 125 characters) + one CTA (under 20 characters).

Constraints:
- Each variant leads with a different angle: pain, outcome, social proof, specificity, curiosity
- No "leverage", "robust", "game-changing"
- Active voice, short words
- Do not mention the product name in the headline — lead with the problem or outcome

Output as a table: Variant | Headline | Body | CTA | Intended audience
```
Pick the 3 strongest variants. You don't need 5 live — you need enough to see which angle wins.

###### 4. Set up the budget split
Total budget: $200–400 over 7 days. Run $30/day across 3 ads split between 2 audiences. That's roughly 6 ad-audience combinations. Do not go below $10/day per ad — you won't get enough impressions to see signal.
Set a hard daily cap in Ads Manager. Do not let it run uncapped overnight.

###### 5. Build the campaign in Ads Manager
One campaign. Two ad sets (one per audience). Each ad set contains the same 3 creative variants. This structure isolates audience performance from creative performance — you'll be able to see both.
Set the campaign objective to "Conversions" or "Lead Generation" — not "Traffic" or "Reach." Traffic campaigns optimize for clicks. You want signups.

###### 6. Confirm tracking before launching
Send a test click through the ad preview URL to your landing page. Submit the form. Confirm the conversion event fires in PostHog or GA4. If it doesn't show up, pause and fix the tracking before the campaign goes live.

###### 7. Let it run 7 days, then read the results
Don't touch the campaign mid-run. Ads need time to exit the learning phase. Check the dashboard daily to confirm it's spending and nothing is rejected, but don't adjust targeting or creative during the test period.
After 7 days, pull the results. For each ad variant and each audience, record: impressions, clicks, CTR, signups, cost per signup.

###### 8. Kill and synthesize
Any ad-audience combination that performs 2x worse than the average cost per signup after 50 clicks is out. Write a one-paragraph synthesis: which ICP converted, which message angle worked, what the cost per signup was, and what to test next.

##### Templates
Use the prompt in Step 3 above. Fill in {product description}, {Audience A}, and {Audience B} with your specifics before sending. The more precise the ICP description, the better the output.
Ad Name | Audience | Impressions | Clicks | CTR | Signups | Cost | Cost Per Signup | Notes
Fill this in daily. After 7 days you'll have enough data to compare. Sort by Cost Per Signup ascending — the winner is at the top.
Date: [date range]
Platform: [Meta / Google / LinkedIn]
Best-performing combination: [Audience] + [Ad variant]
Cost per signup: $[X]
What the winner tells us: [one sentence on what the ICP and message reveal about positioning]
What to test next: [next hypothesis]

##### Definition of done
- Campaign ran for 7 days with no mid-test changes.
- Conversion tracking confirmed firing before launch.
- Results logged per ad and per audience with cost per signup calculated.
- Any combination 2x worse than average is identified and flagged for removal.
- One-paragraph synthesis written and shared with the founder.
- Next hypothesis documented — what to test in the following $200–400 round.

##### Common pitfalls
- Optimizing for clicks, not signups. CPC tells you nothing about whether people want the product. A $0.50 click that never converts is worthless. Always set the campaign objective to Conversions.
- Touching the campaign mid-run. Changing targeting or creative resets the learning phase. Resist the urge. Let it run the full 7 days.
- Not confirming conversion tracking first. If the conversion event isn't firing, you'll spend $300 and have no data. This is the most common reason a test produces nothing useful.
- Too many variables at once. Testing 3 audiences, 5 platforms, and 8 creatives simultaneously means you can't isolate what caused any result. One platform, two audiences, three creatives.
- Treating this like a real ad campaign. The PO is not a paid media manager. This is a learning exercise. The deliverable is a synthesis, not a ROAS number.
- Skipping the synthesis. Running the ads and reading the dashboard is not the job. Writing the one-paragraph "what we learned and what we do next" is the job.

##### How to talk about it with the client
"We're not launching a paid acquisition channel. We're buying $300 worth of data on which message and which audience actually converts. After 7 days I'll bring you a cost-per-signup for each combination and a clear picture of which ICP to double down on. That's the only output that matters from this round."
If they want to scale budget immediately: "We scale once we know what's working. If we put $2,000 into the wrong audience, we've spent $2,000 to confirm our hypothesis was wrong. Let's spend $300 to confirm it first."

---
#### Retargeting setup
Pixel installation and a basic retargeting audience for people who visited but didn't sign up. Cheapest paid channel there is. Pod handles the pixel; PO defines the audience logic.

##### Why this matters
Someone visited the landing page and didn't sign up. They're not uninterested — they just weren't ready at that moment. Retargeting reaches them again, and because they've already seen the brand, the CPM is $1–3 compared to $8–15 for cold audiences. It's the cheapest paid channel available.
More importantly, retargeting lets you serve a different message — one that addresses the specific hesitation that stopped them from signing up the first time.

##### When to run it
- The landing page is live and getting at least 200 unique visitors per month. Below that, the retargeting audience is too small to serve efficiently.
- The Meta Pixel or Google Tag is not yet installed — this playbook sets that up first.
- You already have cold acquisition running (organic or paid). Retargeting amplifies an existing funnel; it doesn't create one from scratch.
Do not run this when: the landing page has fewer than 200 monthly visitors, or you haven't identified why people aren't converting. Retargeting the wrong message to a confused visitor just shows them the same confusing thing twice.

##### What you'll need
- Meta Business Manager account — free. The founder needs to own this. You'll work inside it.
- Meta Pixel — a snippet of JavaScript that fires when someone visits the page. Pod installs it; you provide the spec.
- Google Tag Manager (GTM) — for Google Ads retargeting or if the site doesn't have a clean way to add scripts. Pod sets up the container; you define the tags.
- PostHog — to cross-reference retargeting audience behavior with your internal analytics.
- Landing page analytics — you need to know current visitor count before setting up audience size.

##### Step-by-step

###### 1. Spec the pixel install for the pod
The pod installs the pixel — you don't touch the codebase. Write a clear spec so they get it right the first time. Here's exactly what to give them:
```
Pixel install spec:
- Platform: Meta (and/or Google Ads)
- Meta Pixel ID: [from Meta Business Manager → Events Manager → Pixels]
- Fire on: every page load (PageView event)
- Fire conversion event: "Lead" when the waitlist/signup form is successfully submitted
- Do NOT fire "Lead" on page load — only on confirmed form submission
- Verify with Meta Pixel Helper Chrome extension before marking done
```

###### 2. Create the retargeting audience in Meta
In Meta Ads Manager: Audiences → Create Audience → Custom Audience → Website. Set the rules:
- Include: All website visitors in the last 30 days
- Exclude: Anyone who triggered the Lead event (they already signed up)
Name it clearly: "Website Visitors – No Signup – Last 30 Days." Save it. The audience won't be usable until it hits 100 people — Meta requires a minimum size for serving. Check back after a few days.

###### 3. Create the exclusion list
This is easy to skip and important not to. Create a second custom audience: anyone who fired the Lead event. Add this as an exclusion on every retargeting campaign. You don't want to pay to show ads to people who already signed up — it wastes budget and annoys your best users.

###### 4. Write retargeting creative — different from cold ads
These people have seen the brand. Cold ad messaging ("Have you heard of X?") is the wrong angle. Retargeting creative assumes familiarity and handles objections.
Three angles that work:
- Social proof: "37 teams already on the waitlist." Specificity matters more than polish here.
- Objection-killer: If you know the most common hesitation from user interviews, address it directly. "Yes, it works with your existing tools."
- Urgency without fakery: "Beta closes when we hit 100 users." Only say this if it's true.

###### 5. Set the budget and schedule
$5–10/day is enough to start. Retargeting audiences are small — overspending means the same people see your ad 20 times, which creates fatigue, not conversions. Set a frequency cap of 3 impressions per person per week in Meta's campaign settings.
Run continuously rather than in bursts. The audience refreshes as new visitors arrive.

###### 6. Confirm the pixel is firing correctly
Install the Meta Pixel Helper Chrome extension. Visit the landing page in a new browser window. Confirm you see a PageView event fire. Submit the waitlist form. Confirm you see the Lead event fire. If either event is missing, go back to the pod with specific feedback before spending money.

###### 7. Compare retargeting vs. cold acquisition costs
After 2 weeks of running, pull cost per signup for retargeting vs. your cold acquisition channels. Retargeting should be 3–5x cheaper per signup. If it isn't, the creative isn't addressing the real objection — go back to step 4 and test a different angle.

##### Templates
Use the exact spec from Step 1. Replace the bracketed fields with actual values from Meta Business Manager. The pixel ID lives under Events Manager → Data Sources → Pixels. Copy it exactly — one wrong digit and it fires to the wrong account.
Audience name: Website Visitors – No Signup – Last 30 Days
Include: Website visitors — All website visitors — Last 30 days
Exclude: Website visitors — Lead event — Last 180 days
Minimum size needed before serving: 100 people
Headline: Already 37 teams on the waitlist
Body: [Product name] is in private beta. Spots are limited. Join the list before we close it.
CTA: Join the waitlist
Replace "37" with an accurate number. Fake social proof destroys trust the moment someone asks.

##### Definition of done
- Meta Pixel confirmed firing PageView and Lead events — verified with Pixel Helper.
- Retargeting audience created with correct inclusion and exclusion rules.
- Existing customers excluded from the audience.
- At least one retargeting ad live with objection-aware creative (not a copy of the cold ad).
- Daily budget set with frequency cap to prevent ad fatigue.
- After 2 weeks: cost per signup compared to cold acquisition and logged.

##### Common pitfalls
- Using the same creative as cold ads. People who've already seen the brand need a different message. Showing them the same intro ad for the third time accelerates ignore behavior.
- Not excluding existing signups. Paying to retarget people who already converted wastes budget and creates a confusing experience for your best users.
- Running retargeting before the pixel is verified. An unverified pixel might be firing on page load instead of form submission — you'll build an audience of everyone who visited, including bots, and your Lead conversion data will be meaningless.
- Too small an audience. Under 100 people, Meta can't serve ads effectively. If the site doesn't have the traffic yet, wait — retargeting a 50-person audience burns budget with nothing to show.
- No frequency cap. Without a frequency cap, the same 200 visitors see your ad 40 times. Frequency drives down CTR and up CPM. Cap at 3 impressions per week.

##### How to talk about it with the client
"Retargeting is the cheapest paid channel we can run. People who visited and didn't sign up didn't say no — they said 'not yet.' We're spending $5–10 a day to stay in front of them with a message that addresses the most common hesitation. The pixel takes 30 minutes for the pod to install. Once it's in, we set it and check results in two weeks."
If they ask why it matters when they already have low paid traffic: "Even 200 visitors a month builds an audience of ~150 retargetable people within 30 days. At $1–3 CPM, we're reaching those 150 people repeatedly for a few dollars a day. It's the highest-ROI paid activity at our current traffic level."

---
#### Attribution tracking
UTM discipline from day one. PO sets up a simple tracking convention so the founder actually knows which channel drove which signups.

##### Why this matters
Without UTM tracking, every channel looks the same in your analytics — "direct" or "unknown." The founder asks which post drove signups last week and no one knows. Decisions get made on guesses, and budget goes to channels that feel active rather than channels that convert.
UTM discipline costs nothing and takes one afternoon to set up. Once it's in place, you know exactly which post, email, ad, or partner link drove each signup — and which of those users activated and stayed.

##### When to run it
- The landing page is live and PostHog is installed — UTMs without an analytics tool to capture them are useless.
- The team is starting to post on multiple channels, send emails, or run ads — even just two channels is enough reason to start tracking.
- Any paid spend is about to begin. Never run paid traffic without UTMs.
Do not wait: the longer you delay UTM setup, the more historical signal you lose. Start this the week the landing page goes live.

##### What you'll need
- PostHog — captures UTM parameters by default. Verify it's installed and receiving events before setting up UTMs.
- UTM.io — free tier. Stores your UTM convention so every link is built consistently. Alternatives: Google's Campaign URL Builder (no account needed) or a shared spreadsheet.
- A UTM convention doc — one internal doc that defines every value your team will use. Without this, you'll have "LinkedIn" and "linkedin" and "LinkedIn-post" as separate sources and the data is useless.
- PostHog dashboard access — to verify UTMs are being captured and to read channel data.

##### Step-by-step

###### 1. Define your UTM convention
Before building any URLs, write down every value you'll ever use. UTMs have three required parameters: source, medium, and campaign. Pick your values now and stick to them forever.
Recommended convention:
- utm_source — where the link appears: linkedin, twitter, newsletter, meta, google, reddit, partner
- utm_medium — the type of channel: organic-social, email, paid-social, paid-search, referral, community
- utm_campaign — specific initiative: launch-week, waitlist-promo, founder-post-apr, meta-test-1
All lowercase, hyphens not underscores or spaces. Spaces in UTMs get URL-encoded and look broken in reports.

###### 2. Document it and share it
Put the convention in a Notion page or a shared Google doc that everyone who creates links can access. The doc needs: the allowed values for each parameter, one example URL, and a link to the URL builder. If it's not written down, people improvise and the data fragments.

###### 3. Set up UTM.io with your convention
Create a free UTM.io account. Under "Presets," enter your allowed source, medium, and campaign values. This prevents typos and forces consistency. Anyone building a link uses UTM.io — they can't type "Linkedin" when "linkedin" is the only option.

###### 4. Tag every link going out
Every link you share publicly needs a UTM. This means:
- Every social post that includes a URL — including "link in bio" links
- Every email you send to the waitlist
- Every paid ad
- Every link in a partner's post or newsletter
- Every community post where you share the product
The only exception is your own site's internal navigation. Don't tag links between your own pages.

###### 5. Verify PostHog is capturing UTMs
Build a test URL using UTM.io with source=test and medium=test. Open it in an incognito window and click through to the landing page. In PostHog, go to Activity → find the latest session → check the event properties. You should see utm_source, utm_medium, and utm_campaign as properties on the pageview event. If they're missing, flag it to the pod — PostHog should capture these by default, but an unusual implementation might suppress them.

###### 6. Build the channel breakdown view in PostHog
In PostHog, create a Trends chart: Event = "signed up" (or whatever your conversion event is named), broken down by utm_source. Save it to a dashboard called "Attribution." Add a second chart broken down by utm_campaign. This gives you signups by channel and signups by specific initiative at a glance.

###### 7. Read channel quality, not just volume
Signups by source tells you which channel drives the most volume. But channel quality varies. A LinkedIn post might drive 5 signups that all activate, while a Reddit thread drives 20 signups that all churn in week one. In PostHog, pull retention by cohort and segment by utm_source. The best channel is the one where signups activate and stay — not just the one that drives the most sign-up events.

###### 8. Build the habit into team workflow
UTM discipline breaks down when people forget. Set a simple rule: no link goes into a social post, email draft, or ad without a UTM. Review the first two weeks of links with the founder — if you see untagged links in PostHog sessions coming from known posts, identify the gap and close it.

##### Templates
Format: https://yoursite.com/?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]
Allowed sources: linkedin, twitter, newsletter, meta, google, reddit, partner, direct-email
Allowed mediums: organic-social, email, paid-social, paid-search, referral, community
Campaign naming: [initiative]-[month-abbr] e.g. launch-week-apr, founder-post-may
Rules: all lowercase, hyphens only, no spaces, no special characters
1. Build a test URL: https://yoursite.com/?utm_source=test&utm_medium=test&utm_campaign=verification
2. Open in incognito, visit the page, submit the form.
3. In PostHog: Activity → latest session → event properties.
4. Confirm these properties appear: utm_source, utm_medium, utm_campaign.
5. If missing: flag to pod. If present: tracking is working.

##### Definition of done
- UTM convention documented and shared with everyone who publishes links.
- UTM.io (or equivalent) set up with allowed values to prevent typos.
- PostHog verified capturing utm_source, utm_medium, utm_campaign on conversion events.
- Attribution dashboard live in PostHog: signups by source, signups by campaign.
- All active channels (social, email, ads, partner links) using tagged URLs.
- First channel quality review completed after 2 weeks of data.

##### Common pitfalls
- Inconsistent UTM values. "LinkedIn" and "linkedin" are different sources in every analytics tool. Without a written convention and a URL builder that enforces it, your data splits across a dozen variations and becomes unreadable.
- Not tagging email links. Email traffic shows up as "direct" without UTMs. Your newsletter could be your top channel and you'd never know it.
- Tagging internal links. If you tag links between pages on your own site, PostHog will think a homepage visitor came from LinkedIn every time they click to the pricing page. Only tag external links.
- Tracking volume without tracking quality. A channel that drives 50 low-quality signups looks better than one that drives 10 high-quality ones — until you look at activation and retention. Always check channel quality, not just volume.
- Setting it up and then not using it. The discipline erodes within two weeks if it's not a team habit. Build the review into the weekly traction check — confirm untagged sessions are rare.

##### How to talk about it with the client
"Right now, when you ask which post drove signups this week, the answer is 'we don't know.' UTM tracking fixes that in one afternoon. Every link we send out gets tagged — social posts, emails, ads — and PostHog shows us exactly which channel and which campaign drove each signup. We also get to see which channels drive signups that actually activate, not just people who click and leave. Once it's in, we never lose that signal again."
If they think it sounds too technical: "You don't touch any code. UTM.io builds the URLs — I copy and paste them into posts instead of plain links. It takes three extra seconds per post and pays for itself the first time you need to decide where to put your next $300 in ads."

---

### 3.7 Partnerships & Co-Marketing
Leverage other people's audiences.

#### Integration co-launch
Build an integration with a complementary product, then co-promote the launch. PO identifies the partner, manages the relationship, coordinates the announcement. Both sides benefit.

##### Why this matters
An integration co-launch is the most defensible early growth move in B2B SaaS. You build a small technical connection between two products that share users, then both teams announce it. Each company gets exposure to the other's audience — an audience that has already proven they'll pay for software. This is not cold traffic. These are buyers.
The integration itself doesn't need to be deep. A Zapier connector or a single API endpoint is enough to justify a joint announcement. The marketing leverage is the story, not the technical complexity.

##### When to run it
- The product is live and has at least a small user base.
- There are clearly complementary products your users already use — tools that solve an adjacent problem or are part of the same workflow.
- You have enough pod capacity for a small integration (3–5 days of dev work for a basic connector).
- Don't do this with direct competitors. "Complementary, not competitive" is the rule. Your partner should solve a different problem for the same buyer, not the same problem.
- Don't do this if the partner company has no active marketing. A partner who won't promote their side of the announcement cuts your return in half.

##### What you'll need
- A shortlist of partner candidates — 5–10 tools your ICP already uses, sourced from user interviews, support conversations, and PostHog referrer data.
- Direct outreach to the partner — email to their marketing or partnerships contact, or a LinkedIn DM to the founder if it's early-stage.
- Claude — for drafting the outreach and the joint announcement copy.
- A scoped integration spec — even a one-paragraph description of what the integration does is enough to start conversations.
- UTM tracking — to measure signups from the partner's promotion separately from your own.

##### Step-by-step

###### 1. Identify the right partner
The ideal partner is: complementary (not competitive), similarly sized (a 10-person startup is a realistic partner for another 10-person startup — not for Salesforce), and has an active marketing team or founder who posts. Pull your shortlist from three sources: what tools do your existing users mention in interviews? What products show up in PostHog referrer data? What tools do your ICP mention in community discussions?
Rank candidates by: audience overlap with your ICP, their social/newsletter activity in the last 30 days, and whether the integration story is simple to explain in one sentence.

###### 2. Scope the minimum viable integration
Before reaching out, sketch the integration in one paragraph. What does it do? Who benefits? What's the trigger and what's the action? A Zapier connector is often enough: "When a user completes X in [your product], it creates Y in [their product]." This is enough to build a joint announcement around. You don't need a deep bidirectional sync on day one.
Get a rough pod estimate: 3–5 days for a Zapier/Make connector, 1–2 weeks for a native API integration. Know this before the partner conversation.

###### 3. Reach out to the partner
Find the right contact — the founder, a partnerships lead, or a marketing lead. Use the Claude prompt below. The message should explain the mutual benefit clearly: "Your users get X, our users get Y, we both get to promote it." Keep it under 150 words and end with a specific ask: a 20-minute call to discuss whether it makes sense.

###### 4. Align on the launch scope
On the call, agree on: what the integration does (keep it narrow), who builds what, and what each team commits to for the launch. Define minimum marketing commitments from both sides: email newsletter mention, social post, or joint webinar. Without explicit marketing commitments, you'll build the integration and your partner will do nothing on launch day.

###### 5. Build the integration
PO writes the integration spec. Pod builds it. Target: the simplest possible version that creates real value for shared users. For Zapier: PO can often configure a Zap without pod involvement — check Zapier's UI first before requesting dev time.

###### 6. Coordinate launch day
Set a specific date. Both teams post on the same day. Synchronize: social posts go live at the same time, newsletter mentions in the same week. Prepare a joint landing page or a paragraph on each product's website describing the integration. Write the announcement copy together (or have both teams write their own — Claude drafts both if needed). Confirm the partner has their copy ready 3 days before launch.

###### 7. Track the spike and post-launch maintenance
Use UTM parameters so you can separate signups from the partner's promotion versus your own. Review attribution after two weeks. If the integration drives ongoing signups (users discovering your product from their integration directory), it has compounding value. Check whether the integration is listed in both products' help docs and any integration directories (Zapier's app marketplace, for example).

##### Templates
```
You are drafting outreach from a startup founder to a potential integration partner.

Our product: {description}
Our ICP: {who we serve}
Partner product: {name and what it does}
The integration idea: {one sentence — what it does and who benefits}
Why this benefits them: {their users get X}

Write an outreach email that:
- Opens with the specific integration idea, not a generic compliment
- Explains mutual benefit clearly (their users get X, our users get Y, both teams get promotion)
- Is under 150 words
- Ends with: "Would a 20-minute call make sense?"
- Sounds like a founder, not a partnerships template
```
Subject: {Product A} + {Product B}: now connected
{Product A} and {Product B} now work together. Here's what that means for you:
{One sentence describing the integration trigger and action.}
If you use both products, connect them in {X minutes} here: {link}.
Not using {partner product} yet? {One sentence on what it does.} {link}

##### Definition of done
- At least 5 partner candidates identified and ranked.
- At least 1 partner confirmed with explicit marketing commitments from both sides.
- Integration spec written and delivered to pod (or Zapier connector configured).
- Launch day coordinated — both teams' announcements scheduled on the same date.
- UTM tracking in place to attribute signups to the partner's promotion.
- Attribution reviewed 2 weeks post-launch: signups, activation rate, and whether to renew the relationship.

##### Common pitfalls
- Building the integration without confirming marketing commitment. You spend two weeks building a connector and the partner tweets once. Nail down the marketing commitments before any code is written.
- Picking a partner that's too big. HubSpot is not going to co-launch with a 6-month-old startup. Find a partner at a similar stage with a motivated team.
- Scoping the integration too ambitiously. A deep bidirectional sync takes weeks. A Zapier connector that does one useful thing takes days. Launch with the simple version; deepen it after both sides prove the partnership has value.
- No post-launch tracking. Without UTMs, you can't distinguish partner-driven signups from your own promotion. You'll have no data to decide whether to do it again.
- Letting the listing rot. After launch, both teams move on. Six months later the integration breaks and nobody notices. Put a quarterly check-in reminder in the calendar to verify the integration still works.

##### How to talk about it with the client
"We're going to find one complementary product that your users already use, build the smallest integration that creates real value, and then launch it jointly so both teams promote to each other's audience. This isn't a big technical project — we're talking a Zapier connector or a single API endpoint, maybe a week of dev time. The return is access to a pre-qualified audience of buyers who already trust the partner product. I'll have a partner candidate and outreach ready by the end of this week."
If they're skeptical the partner will follow through: "We'll get explicit commitment on marketing before anything gets built. If they won't confirm what they'll post on launch day, we find a different partner. The integration is worthless if only we promote it."

---
#### Co-branded content
Joint webinar, case study, or blog post with a non-competing product that shares your ICP. PO handles outreach and coordination, Claude drafts the content.

##### Why this matters
Co-branded content gets your name in front of an audience that has never heard of you, with built-in credibility from a brand they already trust. Unlike a sponsored post, joint content provides genuine value to the audience — which means higher conversion and no opt-out reflex. A joint webinar or co-authored research piece also signals that serious players in the space take your product seriously, which matters disproportionately when you're early.

##### When to run it
- The product is live and you can describe what it does clearly.
- You've identified non-competing products that serve the same ICP.
- The founder or PO can spend 2–4 hours contributing to the content (this is not a zero-effort channel).
- Don't do this if neither team has a real audience yet — a joint webinar with two 50-person email lists is not worth the coordination overhead. At least one side needs an engaged audience of 500+.
- Don't do this if the content topic is a stretch. The joint content must be genuinely relevant to both audiences, not a thin excuse to swap audiences.

##### What you'll need
- A partner company — non-competing, similar stage or larger, active marketing presence, shared ICP.
- Claude — for drafting all content: webinar outlines, blog posts, research summaries, promotional emails.
- A content format decision — joint webinar (Zoom/StreamYard), guest blog post swap, or co-authored data report. Pick one based on what both teams can actually execute.
- Landing page for the content — even a simple form to register for a webinar or download a report. Both teams link to it.
- UTM links — one per partner so you can see how many signups came from their promotion versus yours.

##### Step-by-step

###### 1. Find the right partner
You're looking for a company that: solves a different problem than you do, sells to the same buyer, has an active newsletter or social presence (check their last 4 posts — if the most recent was 6 months ago, move on), and is at a size where your partnership is meaningful to them. A company 10x your size will deprioritize the relationship. A company your size will invest in it.
Start by asking your existing users what other tools they use. Those are your warmest partner candidates because you already have user overlap.

###### 2. Pitch the content idea, not a vague partnership
The outreach that works is specific: "I want to co-author a 1,500-word guide on [specific topic] for [ICP] — you bring the [their angle], we bring the [your angle], and we each promote it to our lists." Vague "let's explore synergies" messages never convert. Come with the content idea, the format, and a rough timeline.

###### 3. Choose the right format
Joint webinar is the highest-value format when both teams can show up on camera. Register once, both teams promote, content lives as a recording afterward. Best for complex topics where explanation helps.
Swapped guest posts is the lowest-effort format. Each team writes a post for the other's blog. Turnaround is one week per side. Claude drafts both — your post for their blog and their post draft for yours, which they then edit.
Co-authored research or data report works if you or your partner have interesting data. "We surveyed 200 [ICP] about [problem]" is highly shareable. Best for SEO and press pickup.

###### 4. Draft the content with Claude
Once format and topic are agreed, use Claude to produce the first draft. For a webinar: generate a full outline with talking points per speaker, a promotional email sequence, and a post-event nurture email. For a blog post: draft the full piece, then send it to the partner for their additions and edits. For a data report: if you don't have real data, a qualitative "what we're seeing from customers" framing still works.

###### 5. Split the promotion work explicitly
Define exactly what each team will do before the content goes live. Example: "We'll email our list once before and once after. You'll post on LinkedIn twice. We'll both share the landing page link in our respective communities." Write it down. Without explicit commitments, one team ends up carrying the promotion while the other does nothing.

###### 6. Launch and track
Publish on the same day. Give each team a unique UTM link to track signups from their promotion separately. After 2 weeks, compare: how many signups did the partner's promotion drive? How many did yours? That tells you whether the audience overlap was real and whether to do more content together.

##### Templates
```
You are drafting outreach from a startup to a potential co-marketing partner.

Our product: {description}
Our ICP: {who we serve}
Partner company: {name and what they do}
Shared ICP: {what both audiences have in common}
Content idea: {specific topic and format — e.g. "a joint webinar on how to run X for freelancers"}

Write an outreach email that:
- Opens with the specific content idea in the first sentence
- Explains the audience benefit clearly
- States what each team would contribute
- Estimates time required from their side (keep it low)
- Ends with: "Would this be worth a quick call?"
- Is under 150 words
```
```
Create a 45-minute webinar outline for a joint session between {Company A} and {Company B}.

Topic: {title}
Audience: {ICP description}
Company A angle: {what we contribute — expertise, data, or tool demo}
Company B angle: {what they contribute}

Structure:
- 5-minute intro (both hosts introduce themselves and their products)
- 30 minutes of content (split between hosts)
- 10 minutes Q&A

For each segment, give: the talking point, which host covers it, and one example or data point that makes it concrete.
```

##### Definition of done
- Partner identified and confirmed with explicit marketing commitments from both sides.
- Content format agreed and content drafted (Claude first draft reviewed by both teams).
- Promotional plan documented: who sends what, to which audience, on which date.
- UTM links created — one per partner for tracking.
- Content published and promoted. Attribution reviewed after 2 weeks.
- Decision made: one-off or recurring partnership?

##### Common pitfalls
- Vague topic selection. "A webinar about productivity" will attract no one. "How freelance designers cut their admin time in half using [your tool] and [partner tool]" is specific and searchable.
- No explicit promotion commitments. Both teams must agree on exactly what they'll do before the content is created. Add it to the email thread confirming the partnership.
- Partnering with a company that has no active audience. Check their last 4 newsletter issues and 10 social posts before reaching out. If they're not actively publishing, they can't promote your content.
- Creating content that's too promotional. The moment a webinar becomes a product demo for both tools, the audience tunes out. Lead with the useful content; the product mentions happen naturally.
- Not repurposing the content. A 45-minute webinar recording can become 3 short clips, a blog post, and a newsletter issue. Get Claude to generate all of these on the day after the webinar.

##### How to talk about it with the client
"We're going to create one piece of genuinely useful content with a non-competing product that sells to the same buyer. Both teams promote it to their own audiences. You get access to their subscribers; they get access to yours. The content does the trust-building — you're not asking anyone to try an unproven product, you're inviting them to learn something useful. I'll have a partner candidate and content idea ready this week. Execution takes about two weeks once the partner confirms."
If they're worried about the time commitment: "I'll draft all the content with Claude. The founder's time is for a 45-minute webinar appearance or a 30-minute review of the blog draft. That's it. The coordination is on me."

---
#### Affiliate or reseller structure
For products where someone else touches your buyer (consultants, agencies, adjacent SaaS). PO designs the program terms and tracking. Simple at first — even a shared discount code works.

##### Why this matters
Affiliate and reseller programs turn your best referrers into a sales channel that runs without you. For B2B products with a clear "touchpoint partner" — a consultant who advises your buyers, an agency that implements adjacent tools, a SaaS product that sits one step earlier in the workflow — this is the most capital-efficient growth channel once the product is proven. You only pay when someone converts.
Most founders either ignore this entirely or launch it too early, before there's evidence the product retains. Don't design a referral program until you know referred users actually stick around.

##### When to run it
- The product has clear retention — users who sign up actually come back.
- There are identifiable third parties who already have relationships with your buyers (consultants, agencies, adjacent SaaS, trade associations).
- You can afford a commission — at minimum a meaningful flat bounty or 20%+ recurring share.
- Don't do this before product-market fit. Commissions attract partners who'll refer anyone to collect — you'll get low-quality signups that churn immediately and pay out commissions for it.
- Don't do this if nobody touches your buyer before purchase. Consumer products with no clear referral path rarely benefit from affiliate structures.

##### What you'll need
- Rewardful — affiliate tracking software starting at $29/month. Integrates with Stripe, generates unique links per partner, handles payout tracking. Alternatively, a shared discount code works for the first 5 partners before you need software.
- Stripe — for payouts if you're running recurring revenue share.
- A one-pager — a single document (PDF or web page) that any partner can use to understand the program and start referring without a phone call.
- A demo video — 3–5 minute Loom walkthrough of the product. Partners need to be able to evaluate and demo without a live call with your team.
- Claude — for drafting the one-pager, partner recruitment emails, and the talk track.

##### Step-by-step

###### 1. Define the program structure
Three common structures — pick one based on your business model:
- Flat bounty: $50–$200 per paying customer referred. Simple, predictable, easy to explain. Works best when customer LTV is clear.
- Recurring percentage: 20–30% of the customer's monthly revenue for 12 months. More attractive to serious partners; requires clean revenue tracking.
- Tiered: base rate that increases at volume milestones (e.g., $50/referral up to 10, $75 above 10). Creates incentive to stay active after early wins.
At early stage, simpler is better. Start with flat bounty or recurring percentage. Add tiers only when you have 10+ active partners who are actually referring.

###### 2. Identify partner candidates
Ask: who already has a relationship with my buyer before they buy my product? Candidates: consultants who advise your ICP (if you're B2B SaaS, who do your buyers hire for strategy?), agencies that implement adjacent tools, complementary SaaS products (that you're not building an integration with), industry associations or trade groups that sell to your ICP, and prolific community members who've already been referring users organically.
Check your existing signups first — are any of them consultants or agency operators? Those are your warmest first partners.

###### 3. Recruit the first 5 partners personally
Don't launch a public affiliate landing page first. Recruit 5 partners manually, learn what questions they ask, and refine the program based on that feedback before opening it broadly. A direct email to a consultant who's in your ICP world is more effective than a self-serve signup flow before you have social proof for the program.
Use the outreach template below. The message should lead with the mutual benefit: you get new users, they get passive income for referring clients they're already advising.

###### 4. Set up tracking with Rewardful
Connect Rewardful to Stripe. Each partner gets a unique link (yourproduct.com?via=partnerhandle). When someone signs up and pays through that link, Rewardful logs the conversion and calculates the commission. PO manages the dashboard — check weekly during the first month to catch any tracking issues before they become payout disputes.
For your first 1–2 partners before you set up Rewardful, a unique discount code (e.g., PARTNER20) tracked manually in a spreadsheet is fine.

###### 5. Build partner enablement materials
Partners who refer successfully have three things: the one-pager (what the product does, who it's for, pricing, commission structure), the demo video (so they can evaluate without a live call), and a talk track (3 sentences they can say when they mention it to a client). Write all three with Claude. Keep the one-pager under one page. The demo video should be a real screen recording — no voiceover scripts, just narrate as you click.

###### 6. Define payout cadence and abuse guardrails
Common abuse patterns: partners self-refer (sign up through their own link), partners refer users who churn immediately, partners inflate attribution by sharing their link publicly instead of with specific prospects. Guardrails: only pay on customers who survive a 30-day trial period, exclude self-referrals by checking if the email domains match, require payouts to reach $50 minimum before transfer.
In Rewardful, set commission trigger to "paid invoice" not "signup" — this eliminates most abuse automatically.

##### Templates
```
You are writing an email recruiting a potential affiliate partner.

Our product: {description}
Our ICP: {who we serve}
Partner type: {e.g. "a freelance consultant who advises HR teams at mid-sized companies"}
Program structure: {flat bounty / recurring % — specific numbers}

Write a recruitment email that:
- Opens by noting how they already advise/serve our ICP
- Explains the product in one sentence
- States the commission clearly (no vague "generous commission")
- Explains what they need to do to refer (share a link, mention in a client conversation)
- States that we'll send them a one-pager and demo video on reply
- Is under 150 words
- Sounds direct and practical, not corporate
```
What it is: {one sentence}
Who it's for: {ICP in plain language}
What it costs: {pricing tiers, plain language}
What you earn: {exact commission — e.g. "$75 per paying customer, paid monthly"}
How to refer: Share your unique link: {link placeholder} — or just mention us and have them use code {code}.
When you get paid: Monthly, via Stripe, minimum $50 balance.
Questions? {contact email}

##### Definition of done
- Program structure defined (commission type, rate, payout cadence, minimum payout).
- Rewardful connected to Stripe, or discount code tracking set up manually.
- One-pager and demo video created.
- At least 5 partner candidates identified and 5 outreach messages sent.
- At least 2 partners active (have their unique link and have made at least 1 referral).
- Abuse guardrails in place: commission triggers on paid invoice, not signup.

##### Common pitfalls
- Launching before the product retains. Affiliates will refer low-quality users to collect commissions. You'll pay out on signups that churn immediately and have nothing to show for it.
- Vague commission terms. "We'll take care of you" is not a commission structure. Partners need exact numbers before they'll invest time referring. State the rate, the trigger, the payout cadence, and the minimum.
- No enablement materials. A partner who has to call you every time they want to demo the product will stop referring after two referrals. The one-pager and demo video must exist before you recruit partners.
- Setting commissions too low. A $5 flat bounty gets ignored. Commission needs to be meaningful relative to the effort of making a referral — which is at minimum mentioning the product in a client conversation.
- Not tracking abuse. Paying out on self-referrals or immediate churners signals to bad-faith partners that the system can be gamed. Set commission triggers on paid invoices, not signups.
- Building a public program before validating with 5 partners. You'll spend two weeks building a landing page and FAQ for a program that nobody signs up for. Find your first 5 partners manually, then build the self-serve page once you know what questions they ask.

##### How to talk about it with the client
"There are consultants and agencies out there who talk to your exact buyer every week. Instead of competing for those buyers' attention from scratch, we can pay those consultants a referral fee for sending them our way. We only pay on customers who actually convert. I'll identify 5 candidate partners this week, reach out with a specific commission offer, and build the one-pager and demo video so they can start referring without needing us on the phone. This runs on autopilot once the first partners are active."
If they're worried about giving up margin: "You're not giving away margin — you're paying for customer acquisition that only costs you when it works. A $75 bounty on a customer worth $1,200 per year is a 6% CAC. That's cheap. The alternative is ads at $50–200 per click with no guarantee of conversion."

---

### 3.8 Competitive Intelligence
Know what you're up against & how to position.

#### Competitive landscape tracker
PO maintains a living doc: who the competitors are, what they charge, what they launched this month, where they're weak. Updated monthly. Claude summarizes competitor changelogs and review sites.

##### Why this matters
Positioning decisions made without competitive context are guesses. Pricing set without knowing what alternatives cost is a coin flip. The competitive tracker is a living document that keeps the founder grounded in the actual market — not the market as they imagined it six months ago when they started building. Markets move. Competitors launch. Review sites accumulate honest customer complaints that your ICP will repeat back to you in sales calls.
The goal isn't to obsess over competitors. It's to have a current, accurate picture of the alternatives your prospects are already aware of.

##### When to run it
- Start the document the moment the product has a clear ICP. You don't need a live product to track competitors.
- Update monthly — not weekly. Weekly competitive tracking is noise. Markets don't move fast enough to justify the overhead, and weekly updates train the team to react instead of think.
- Review before a positioning decision, a pricing change, or a sales pitch for a competitive deal.
When NOT to let it run your roadmap:
- Don't build features because a competitor has them. Build features because your users need them. The tracker informs positioning, not the backlog.
- Don't add a competitor to the doc just because they exist. Only track companies your actual prospects name in conversations.

##### What you'll need
- Notion or Google Docs — one page per competitor. Simple, searchable, shareable with the founder.
- Claude — for summarizing competitor blog posts, changelogs, and review site text monthly. Don't read all of it manually.
- G2 and Capterra — competitor review pages are a direct line to what their customers hate. Filter for 2-star and 3-star reviews — that's where the real complaints live.
- LinkedIn and Crunchbase — for tracking hiring signals and funding. A competitor that just raised a Series A and is hiring five sales reps is making a different move than one that's been flat for two years.

##### Step-by-step

###### 1. Define who counts as a competitor
Three categories, all worth tracking:
- Direct competitors — products that solve the same problem for the same ICP. Your prospect is actively comparing you to them.
- Indirect competitors — products that solve an adjacent problem but compete for the same budget or attention. Your prospect might choose them instead of you.
- Status quo — the spreadsheet, the manual process, the workaround your ICP uses today. This is almost always your biggest competitor and most founders forget to track it.
Ask the founder: "Who does the prospect mention when they say they're 'already handling it'?" That's the competitor list.

###### 2. Set up one page per competitor
Use this five-section structure for each entry. Fill it in once at setup, then update the relevant sections monthly.
- Overview — what they do, who they serve, one sentence.
- Pricing — current tiers and prices. Screenshot the pricing page.
- Positioning — how they describe themselves on the homepage. Exact words matter.
- Recent activity — latest feature launch, blog post, job posting, funding news.
- Customer complaints — top 3 recurring themes from G2/Capterra 2–3 star reviews.

###### 3. Run the monthly update with Claude
On the first Monday of each month: visit each competitor's blog, changelog, and G2 page. Paste the relevant text into Claude with the prompt in the Templates section. Claude returns a structured summary you can paste directly into the doc. The whole update for 3–5 competitors takes under an hour.

###### 4. Flag the customer complaint patterns
The most valuable section is the complaints. Recurring complaints from competitor users are unmet needs your product can own. If three competitors have the same complaint ("the reporting is too complex"), that's a positioning opportunity: "simple reporting" becomes a differentiator you can anchor the homepage on.

###### 5. Update before any positioning conversation
Before the founder updates the landing page copy, changes a pricing tier, or prepares for a competitive sales call — open the tracker and read it first. Positioning without current competitive context is the most common source of messaging that doesn't land.

###### 6. Share the monthly diff with the founder
After the monthly update, write one paragraph: what changed this month. Competitor A raised prices, Competitor B launched a mobile app, Competitor C's G2 score dropped. Keep it to what actually changed, not a full recap. The founder needs to stay aware without drowning in it.

##### Templates
"Here is the current content from {competitor name}'s blog/changelog/G2 reviews page (pasted below). Summarize: (1) any new features or product changes announced in the last 30 days, (2) any positioning or messaging changes on their homepage, (3) the top 3 recurring complaints from recent customer reviews. Keep each section to 3 bullet points max. Ignore anything older than 30 days."
```
##### [Competitor name]
Last updated: [date]

**Overview:** [one sentence — what they do, who they serve]

**Pricing:**
- [tier name]: $[price]/mo — [what's included]
- [tier name]: $[price]/mo — [what's included]

**How they position themselves:**
[exact words from their homepage H1 and subheadline]

**Recent activity (last 30 days):**
- [new feature / blog post / funding / hiring signal]

**Top customer complaints (G2/Capterra 2–3 star reviews):**
1. [recurring complaint theme]
2. [recurring complaint theme]
3. [recurring complaint theme]
```
"Competitive tracker updated for [month]. Key changes: [Competitor A] raised prices on their growth tier by $20. [Competitor B] launched a mobile app — their G2 score dropped, top complaint is stability. [Competitor C] is hiring 4 enterprise AEs, looks like they're moving upmarket. Full doc: [Notion link]."

##### Definition of done
- All direct competitors, 2+ indirect competitors, and the status quo documented.
- Each competitor page has all five sections filled in.
- Doc updated on the first Monday of every month — no gaps.
- Customer complaint patterns from G2/Capterra identified and noted.
- At least one positioning insight from the tracker used in copy, pricing, or sales prep within the first 60 days.

##### Common pitfalls
- Tracking competitors nobody is comparing you to. The list should come from actual prospect conversations, not a Google search. If your ICP doesn't name them, they're not a competitor worth tracking.
- Updating weekly. Weekly is noise. Markets don't move that fast. Monthly is enough to stay informed without turning competitive research into a second job.
- Using it to drive the roadmap. The tracker is for positioning and sales prep. Building features because a competitor has them is how you lose your product identity. Build for your users, position against your competitors.
- Ignoring the status quo. "We use spreadsheets" is the most common competitor and the hardest to displace. If it's not in your tracker, you're missing the most important comparison.
- Not reading the complaints. The G2 and Capterra complaint sections are the most valuable thing in the document. They tell you exactly what your competitors' customers wish existed. That's your positioning.

##### How to talk about it with the client
"I'm building a competitive tracker — one page per competitor in Notion, updated monthly. It covers pricing, positioning, recent launches, and what their customers complain about on G2. The complaint data is the most useful part: it tells us exactly what your competitors' users wish existed. On the first Monday of each month I'll send you a one-paragraph update on what changed. This keeps your positioning current without you spending time on it."
If they say "I already know the competition": "You know who they are. This tracks what they're doing month-to-month and what their customers hate about them. That's what changes positioning decisions from gut calls to evidence."

---
#### Win/loss analysis
When a prospect chooses a competitor or chooses you, PO captures why. Five data points here are worth more than a hundred survey responses.

##### Why this matters
Every deal that closes — won or lost — is a data point with a reason attached. The reason almost always lives in the prospect's head and expires within 48 hours as their memory of the decision fades. Win/loss analysis captures those reasons systematically, so you stop guessing why deals go the way they do and start knowing. Five real win/loss data points beat a hundred survey responses every time — the prospect was motivated, the decision was fresh, and the stakes were real.
The patterns that emerge directly feed pricing decisions, positioning changes, and feature priorities. This is competitive intelligence with receipts.

##### When to run it
- Every time a deal closes — won or lost. Every single one, from the first paid user onward.
- Within 48 hours of the decision. After that, memory starts smoothing out the real reasons. "We just went a different direction" is what you hear at week 3. The real reason is what you hear at hour 6.
When NOT to skip it:
- Don't skip wins. Founders love to analyze losses and assume wins speak for themselves. Wins often have a specific reason that can be replicated — don't leave it unexplored.
- Don't skip small deals. The prospect who signed up for the $29/month tier and the one who walked away from the $500/month tier both have useful signal.

##### What you'll need
- A 5-question script — short, specific, and asked verbally when possible. Phone or video call beats email by a wide margin for getting honest answers.
- An internal doc — one row per win/loss, with verbatim quotes preserved. Not summaries — actual quotes. The words matter.
- Claude — for synthesis after 5+ data points. Patterns don't emerge from individual entries; they emerge from the corpus.
- CRM or spreadsheet — to trigger the outreach. Every closed/lost deal should prompt a win/loss call within 48 hours. If you're not tracking deals anywhere, a simple spreadsheet with deal name, outcome, and date is enough to start.

##### Step-by-step

###### 1. Set up the trigger — within 48 hours of every decision
The moment a deal closes or goes dark, set a reminder for the same day or next morning: "Send win/loss message to [name]." Don't let a week pass. The half-life of honest deal feedback is short.

###### 2. Reach out verbally first, by email if needed
Call or send a Zoom invite first. A 10-minute call gets you far more than an email survey — tone, hesitation, and tangents all carry information that text strips out. If they don't respond to a call request within 24 hours, send the email version. Getting 50% of responses verbally and 50% by email is better than getting nothing.

###### 3. Run the 5-question script
These five questions work for both wins and losses — just adjust the framing. Ask them in order. Don't ad lib.
- "Walk me through how you made this decision." (Open, lets them reveal the real process)
- "What were the top two or three things that mattered most to you?" (Reveals actual decision criteria, which often differ from stated criteria)
- "Was there anything that almost made you go the other way?" (For wins: surfaces the friction you almost lost on. For losses: surfaces what was close.)
- "What was your biggest concern going in?" (Objections that weren't raised in the sale)
- "Is there anything you'd change about the product or the process?" (Often the most valuable question for losses — specific, actionable feedback)

###### 4. Record verbatim — don't summarize during the call
Type fast or record the call (with permission). What you're capturing is their exact phrasing — "the pricing felt opaque" not "they didn't like the pricing model." The exact words are what make the synthesis useful. Paraphrase destroys signal.

###### 5. Log the entry immediately after the call
In your win/loss doc, add a row: date, won/lost, competitor they chose (for losses), and verbatim answers to each question. Don't reconstruct from memory an hour later. Do it while the call is fresh.

###### 6. Synthesize after 5+ entries with Claude
Paste all entries into Claude with the synthesis prompt in Templates. You're looking for: patterns in decision criteria, recurring objections, the moment in the process where deals most often tip, and competitor differentiators that came up multiple times. One entry is anecdote. Five is the minimum for pattern detection.

###### 7. Feed patterns into pricing, positioning, and feature priority
Every pattern that emerges is a hypothesis. "Three losses mentioned 'no API' as a blocker" becomes a feature hypothesis. "Four wins mentioned 'you were the only one who responded in under an hour'" becomes a sales process decision. Bring these to the founder with the supporting quotes — not conclusions, evidence.

##### Templates
"Hi {first name} — thanks for letting me know. I'd love 10 minutes to understand how you made this decision — not to change your mind, just to learn what mattered most to you. Would {day} at {time} work for a quick call?"
"Hi {first name} — thanks for letting us know. Three quick questions, no sales pitch:1. What mattered most to you in making this decision?2. Was there anything that almost made you go the other way?3. Any feedback on the product or the process?Any answer, even one sentence, is helpful. Thanks."
```
Date:
Won / Lost:
Competitor chosen (if loss):

Q1 — How they made the decision:
[verbatim]

Q2 — Top 2–3 things that mattered:
[verbatim]

Q3 — What almost made them go the other way:
[verbatim]

Q4 — Biggest concern going in:
[verbatim]

Q5 — What they'd change:
[verbatim]
```
"Here are {N} win/loss entries from sales conversations. Each entry is separated by ---. Identify: (1) the top 3 decision criteria mentioned across wins, (2) the top 3 objections or concerns mentioned across losses, (3) any competitor differentiators that came up more than once, (4) patterns in where deals tipped — early in the process or late. For each pattern, include 2–3 verbatim quotes from the entries. Flag anything that appears in 3 or more entries as high-signal."

##### Definition of done
- Every closed deal — won or lost — has a log entry within 48 hours.
- Entries contain verbatim quotes, not paraphrased summaries.
- Synthesis run in Claude after every 5th entry.
- At least one decision — pricing, positioning, or feature priority — changed or validated based on patterns from the log within the first 10 entries.
- Patterns shared with the founder with supporting quotes, not just conclusions.

##### Common pitfalls
- Waiting more than 48 hours. The honest, specific answer lives right after the decision. Two weeks later you get the polished, diplomatic version. Set the reminder the moment the deal closes.
- Only doing losses. Win patterns are as valuable as loss patterns. Why did they choose you specifically? That answer tells you which part of your positioning to amplify.
- Summarizing instead of quoting. "They mentioned pricing concerns" is useless. "They said 'the per-seat pricing model scared us because we have contractors who only log in twice a month'" is a product decision. Quote verbatim.
- Doing it by email when a call is possible. Email responses are shorter, more polished, and less honest. A 10-minute call yields 10x the useful signal.
- Acting on one entry. A single loss to a competitor doesn't mean that competitor beat you on price. Five losses to the same competitor for the same reason means it. Wait for the pattern.

##### How to talk about it with the client
"Every time a deal closes — win or loss — I'm going to reach out within 48 hours and ask five questions. I want to understand exactly how they made the decision, what mattered most, and what almost made them go the other way. I capture their exact words, not my interpretation. After five entries, I'll run a synthesis and bring you the patterns: which objections come up most, which competitor differentiators are real, which part of your pitch is landing. This is the only way to know why the numbers are moving the way they are."
If they say "I already debrief losses with the prospect": "That's different from a structured capture. The structure is what makes it possible to synthesize across deals instead of just processing each one in isolation. I need the same five questions answered every time so I can compare them."
If they push back on bothering happy customers: "A won customer who takes 10 minutes to explain why they chose you is giving you your next sales pitch. It's worth the ask."

---

### 3.9 Brand & Design System Maturity
When MVP-look becomes a liability.

#### Visual polish pass
Once the product has traction, PO specs a design sweep: consistent spacing, better empty states, loading states, error messages. Not a redesign — a cleanup. Pod executes.

##### Why this matters
MVPs are supposed to look rough. But there's a point where "rough" starts costing you deals. A first paying customer, an investor demo, a serious enterprise evaluation — these are the moments when visual inconsistency signals that the team doesn't sweat details. Design quality is a proxy for product quality in the mind of a buyer who doesn't have time to go deeper.
A polish pass isn't a redesign. It's removing the obvious tells: the button that's slightly the wrong shade of blue, the empty state that says "No data," the loading spinner that covers the wrong element. Thirty minutes of noticing, three sprints of fixing.

##### When to run it
- The product just acquired its first paying customer or is preparing for an investor demo.
- Someone you respect used the product and said "it works, but it looks a bit unfinished."
- Session recordings show users hovering over things that don't respond visually.
- The team has been shipping features for 3+ months without a design checkpoint.
When NOT to run it:
- Before you have real users. Polish before validation is a vanity exercise.
- When there are active bugs. Fix broken before polishing working.
- When it turns into a redesign conversation. Scope it hard or it never ships.

##### What you'll need
- Figma — for annotated screenshots. Comment mode is all you need. You don't need to create new designs, only annotate what's wrong.
- Loom or QuickTime — record yourself clicking through the product like a new user. Watch it back once. You'll spot 10 things in 5 minutes.
- A real device — open the product on your phone. Mobile view is where MVP polish debt is worst.
- PostHog — to identify the 5 screens users visit most. Polish those first.
- The pod — they do all the implementation. Your job ends at a clear, prioritized spec.

##### Step-by-step

###### 1. Pull the top 5 screens from PostHog
Go to PostHog → Insights → Pageview breakdown. Find the 5 pages with the highest visit count. This determines polish priority. The home screen and the primary feature screen are almost always in the top 5. Ignore low-traffic pages entirely — they're out of scope.

###### 2. Walk through each screen as a new user
Open a browser in incognito. Start at the login screen. Click through every screen on the list. Screenshot every visual problem you notice. Don't fix — don't even describe the fix yet. Just capture. Use your phone for the same pass on mobile.
Look specifically for: inconsistent button styles, missing or ugly empty states, loading states that are absent or janky, error messages in raw developer language, misaligned text, colors that don't match the brand, and anything that looks obviously unfinished.

###### 3. Group issues into categories
Open a Figma file and drop in all your screenshots. Group them into six buckets: spacing and alignment, button and input states, empty states, loading states, error states, mobile layout. Each bucket becomes one Figma page.

###### 4. Annotate — don't redesign
On each screenshot, add a Figma comment describing what's wrong in plain language. "This button color doesn't match the primary CTA on the dashboard" is enough. Don't draw new components. Don't spec a new design system. The pod interprets comments into implementation. Your job is to identify problems, not solve them.
If you can't describe the fix in one sentence, it's too big for this pass. Flag it separately as a future item.

###### 5. Prioritize the list with the pod
Share the Figma file with the pod lead. Walk through it together (30 minutes max). Each issue gets one of three tags: Quick win (under 30 minutes), Medium (half a sprint), Skip (out of scope for this pass). Anything tagged Skip goes into the backlog — it doesn't disappear, it just doesn't block this sprint.

###### 6. The pod executes
The pod implements all Quick wins first, then Mediums. PO doesn't touch code. If something looks different from what you intended, leave a comment on the PR — don't reopen the Figma annotation. Changes move through the normal PR review process.

###### 7. QA sign-off before/after
Before the pod closes the sprint, do a 20-minute walk-through of the same 5 screens you audited in step 2. Take screenshots. Put them next to the before screenshots in a simple slide or Notion doc. Send this to the founder. It closes the loop and shows visible progress without a feature launch.

##### Templates
Screen: [screen name]
Issue: [what's wrong in plain language]
Expected: [what it should look like — reference another screen if possible]
Priority: Quick win / Medium / Skip
Example: "Screen: Dashboard. Issue: Empty state just says 'No records found' in gray text. Expected: Illustration or icon plus a brief explanation of what will appear here when there's data, plus a CTA if relevant. Priority: Quick win."
User-facing problem: The product looks unfinished to new users and first-time external evaluators. Visual inconsistencies signal low quality even when the functionality is solid.
Success metric: After the polish pass, PO walks through the top 5 screens and has zero new items to add to the annotation list. Founder confirms the product is ready for external demo.
Scope in: Button states (default, hover, active, disabled), empty states for all list and table views, loading states for async data fetches, error state copy (no raw error codes), spacing normalization on the top 5 screens, mobile layout for the top 5 screens.
Scope out: New features, brand redesign, new components not currently in the product, screens outside the top 5 by traffic.
PostHog events to instrument: None required for this sprint — this is a visual pass, not a behavior change. If new empty states include a CTA, instrument that CTA as a separate event (e.g. empty_state_cta_clicked with a screen property).

##### Definition of done
- All Quick win items from the Figma annotation list are resolved and verified in production.
- All Medium items are resolved or have an explicit, dated decision to defer.
- A before/after screenshot comparison exists for the top 5 screens.
- Founder has seen the before/after and confirmed the product is demo-ready.
- Remaining items are in the backlog with priority tags, not buried in a Figma file.

##### Common pitfalls
- Scope creep into redesign. The moment someone says "while we're here, could we rethink the navigation," stop the conversation. That's a separate project. This pass fixes what's broken, doesn't reimagine what exists.
- Auditing low-traffic screens first. Always start with the screens users actually see. Polishing the settings page while the dashboard empty state says "null" is the wrong order.
- Vague annotations. "This looks off" is not a spec. The pod can't implement "off." Be specific: what's wrong, what should it look like, reference another part of the product if possible.
- Skipping mobile. Most MVPs are built desktop-first. Mobile is where visual debt is worst. Always do the same walk-through on a real phone, not just a browser resize.
- No before/after. The founder and pod did real work. Document it. Before/after screenshots are the deliverable for the sprint, not just an optional add-on.

##### How to talk about it with the client
"We're not redesigning anything — this is a cleanup sprint. I walked through the product the way a new user would and flagged everything that signals 'MVP' instead of 'production software.' The pod will knock out the quick wins in the next sprint, and I'll send you before/after screenshots so you can see exactly what changed. Nothing about the product's functionality changes. It just stops looking unfinished."
If they push back with "let's just wait until we have more users": "The problem is that visual quality affects whether you get more users. One investor or enterprise buyer who sees the current state and walks away is more expensive than one sprint of polish work."

---
#### Design system documentation
Component library, color tokens, typography rules. Makes every future sprint faster and prevents the UI from drifting into chaos as features pile up.

##### Why this matters
Without documented design rules, every new feature introduces new visual drift. One developer uses 16px padding, another uses 20px. One button is 36px tall, another is 40px. Multiply that over six months and you have a codebase where nothing looks like it belongs to the same product. A design system isn't a luxury — it's the minimum viable rulebook that keeps the product from fragmenting as the team grows.
The goal at this stage isn't a polished component library. It's a single source of truth that any pod member can reference before writing UI code. Written once, maintained by the pod, referenced forever.

##### When to run it
- The codebase has 3 or more buttons with slightly different styles — different padding, font weights, or border radii.
- Two or more developers have been adding UI components independently for more than one sprint.
- The PO or founder has to say "make it look like the other one" during PR review because there's no other reference.
- The product is preparing for a second major feature area that will introduce new UI patterns.
When NOT to run it:
- Before the MVP is validated. Premature systematization wastes time on infrastructure nobody uses yet.
- If one developer is writing all the UI. The system pays off when there's drift to prevent, not before.

##### What you'll need
- Figma (free tier) — for the visual reference document. One file, shared with the pod. No Figma expertise required — you're capturing existing styles, not creating new ones.
- Notion or a Markdown doc — for the written rules. Keep it next to the codebase or in the project wiki. Storybook is overkill at this stage.
- Claude — to draft the written rules from your descriptions.
- The pod — they own implementation and maintenance. You write the first version of the rules; they keep it current.
- A screen recording of the current product — to audit what actually exists before you document anything.

##### Step-by-step

###### 1. Audit what actually exists in the product
Take screenshots of every distinct UI pattern currently in the product: every button variant, every input field, every card, every modal, every alert/toast. Don't rely on Figma designs — those are often stale. Screenshot the live product. You're documenting reality, not intention.
Look for: how many distinct button styles exist, how many font sizes are in use, what the spacing increments are (check in browser dev tools), what colors appear and whether they're consistent.

###### 2. Collapse variants to the minimum viable set
From your audit, identify what the canonical versions should be. Three button sizes become two. Seven shades of gray become four. The goal is the minimum set that covers all real use cases. Write down what you're consolidating and why. Share with the founder — color palette and primary CTA changes need their sign-off.

###### 3. Document color tokens
A token is just a named color. Name every color in the product: primary, secondary, background, surface, border, text-primary, text-secondary, error, warning, success. Hex values for each. Put them in a Figma file as a color palette and in the Notion doc as a table. The pod converts these to CSS custom properties or design tokens in the codebase.

###### 4. Document the type scale
List every text style: heading sizes (h1–h4), body text, caption/label, code. For each: font family, size, line height, weight. Six to eight entries is typical. If the product uses system fonts, document which ones and in what order. The pod implements these as Tailwind classes or CSS variables.

###### 5. Document the spacing scale
Most products use a base-8 or base-4 spacing scale without knowing it. Look at your screenshots in browser dev tools and record the spacing values you see most often. Pick a consistent scale: 4, 8, 12, 16, 24, 32, 48, 64px. Anything outside that scale should have a documented reason or get corrected.

###### 6. Document the core components
Write a one-paragraph spec for each of: primary button, secondary button, text input, select/dropdown, card, modal, toast/alert, empty state. For each: when to use it, what variants exist (size, state), what it should never be used for. Claude can draft these from your descriptions — you review and correct.

###### 7. Hand off to the pod for implementation
The pod converts your documented system into actual code: CSS variables, Tailwind config, a shared component file, whatever fits the stack. Your Notion doc is the spec. Their implementation is the truth going forward. The pod owns maintenance — when a new component is added, they update the doc.

###### 8. Set a review cadence
Once per month, PO does a 15-minute scan: are new components following the system, or has drift started again? If drift has started, flag it in the pod's next sprint as a small cleanup task before it compounds.

##### Templates
"I'm documenting a design system for a {product description} web app. Here are the components we use: {list of components}. For each, write a short usage rule in this format: 'Use this when: [scenario]. Don't use it when: [counter-scenario]. Variants: [list].' Keep each entry under 60 words. Plain language — this is for a non-technical Product Owner to review."
Your system doc should cover exactly these items, nothing more:
- Color tokens (named hex values, 6–12 total)
- Type scale (6–8 text styles with size, weight, line-height)
- Spacing scale (8 values on a consistent increment)
- Button (primary, secondary, destructive — each with default/hover/disabled states)
- Input (text, select — default/focus/error states)
- Card (default variant, any content-specific variants)
- Empty state (illustration or icon + copy pattern)
- Toast/alert (success, warning, error)
That's it. Don't add anything until you have a real use case for it.
User-facing problem: New features have inconsistent spacing, colors, and component styles because there's no shared reference. Users notice the inconsistency as a general feeling that the product is unpolished.
Success metric: Any pod member can implement a new screen that matches the product's existing style without asking another team member or guessing. PO can audit a new screen in 5 minutes against the design system doc and identify any deviations.
Scope in: Implement all tokens from the design system doc as CSS custom properties (or Tailwind config). Refactor existing core components to match the spec. Document any deviations with a reason. Maintain the Notion doc when new components are added.
Scope out: New UI patterns not currently in the product, Storybook or Chromatic setup, automated visual regression testing.
PostHog events to instrument: None for this sprint. Design system work is infrastructure, not a user behavior change.

##### Definition of done
- Color tokens, type scale, spacing scale, and all core components are documented in one Notion doc or Markdown file accessible to the whole team.
- The pod has implemented the tokens and refactored existing components to match.
- A new developer joining the team can read the doc in 20 minutes and understand what components to use and when.
- The pod has agreed to update the doc when new components are added.
- No new screens added after the sprint have components outside the documented system without a documented reason.

##### Common pitfalls
- Building Storybook before you need it. Storybook is a great tool for teams with 5+ active UI contributors and a mature component library. At the MVP stage it's expensive to set up and expensive to maintain. A Notion doc does 80% of the job at 5% of the cost.
- Documenting aspirational design instead of what's live. Document what's in production, then decide what should change. Starting from Figma designs that don't match the real product creates a system nobody trusts.
- Making the PO maintain the system. PO writes the first version. After that, pod owns it. If the pod doesn't treat the doc as authoritative, the system is already dead.
- Too many components in v1. Fifteen documented components that nobody reads is worse than eight that everyone uses. Start with what's actually in the product today.
- No upgrade trigger defined. Decide in advance what condition prompts a move to real tooling (Storybook, Chromatic, a dedicated design systems sprint). "Post Series A" or "when we have 3+ active UI contributors" are good triggers. Without a defined trigger, it never happens.

##### How to talk about it with the client
"Right now, every new screen the pod builds starts from scratch. They're guessing at spacing, picking button colors by memory, and making micro-decisions that should already be decided. We're going to spend half a sprint writing down the rules that already exist in the product — colors, fonts, components — so every sprint after this is faster and more consistent. This isn't design work. It's documentation of decisions you've already made."
If they ask about Storybook or a more formal design system: "That's the right direction eventually. At your stage, a Notion doc and consistent CSS variables gets you 80% of the benefit. We revisit tooling when you have three or more active contributors making UI decisions in parallel."

---
#### Transactional email design
Receipts, password resets, notifications. These are often the most-seen pieces of the product and they usually look terrible. Claude drafts copy, pod templates them.

##### Why this matters
Transactional emails — password resets, receipts, notifications — are seen by every active user, often multiple times per week. They're the most-touched surface in the product and almost always the ugliest. An investor who just signed up and gets a plain-text password reset with your staging server URL in the footer has already formed an opinion about your team's attention to detail.
This isn't about making emails pretty. It's about making sure the highest-volume, most-visible touchpoint in the product looks like it belongs to the same product users just paid for.

##### When to run it
- The product is past its first paying customer and transactional emails are still the default boilerplate from Supabase, Firebase, or the auth library.
- Any transactional email still shows a localhost or staging URL.
- The product has no consistent email template — each email looks like it was written by a different person.
- The team is preparing for a demo or sales push and someone is going to go through the signup flow.
When NOT to run it:
- Before the core auth and notification flows are stable. Don't design templates for emails that will change next sprint.
- If the product doesn't yet send transactional email (some early MVPs don't — confirm before scheduling the work).

##### What you'll need
- Claude — to write copy for every email: subject line, body, CTA. You review and edit; Claude drafts.
- React Email or Resend — the pod uses one of these to build the template. React Email is free and works with any email provider. Resend is a sending provider with built-in React Email support. Both are developer tools — the pod handles implementation.
- Your own inbox — the primary QA tool. Send every email to yourself on Gmail, then check it on iOS Mail. Those two cover 80% of your users.
- Litmus or Email on Acid — optional, for checking rendering across 20+ clients if the product serves enterprise. Skip this at the MVP stage.
- A spreadsheet — to track every transactional email the product sends. You'll be surprised how many there are.

##### Step-by-step

###### 1. Build the inventory — every email the product sends
Go through the product and list every automated email it sends. Start with the obvious ones: welcome email, email verification, password reset, receipt/invoice, subscription confirmation, subscription cancelled. Then look for the less obvious: "you haven't logged in for X days," invite to team, export ready, weekly summary, failed payment, trial ending.
For each email, write one row: trigger event, recipient, subject line (current), has a CTA (yes/no), last reviewed (probably never). This inventory is the spec for the pod. It's also almost always a surprise — most products have 2x more transactional emails than anyone realized.

###### 2. Pick one master template
All transactional emails use the same template. Not 20 unique designs. One. The template should include: logo at top, clean single-column layout, one primary CTA button per email, footer with unsubscribe link and company address (legal requirement). Brand colors, but nothing elaborate. The goal is clean and recognizable, not impressive.
Share a rough sketch with the founder (a hand-drawn mockup or a reference email from a product they admire is enough). Get sign-off before the pod builds it.

###### 3. Write copy for each email with Claude
For each email in the inventory, use the Claude prompt in the Templates section below. Review each draft. The most common Claude mistakes: too formal, too long, unclear CTA. Edit for plain language, cut anything that doesn't directly serve the user in that moment.
The welcome email and password reset get the most reads — spend the most time on those two.

###### 4. Write the email subject lines separately
Subject lines determine open rate. Don't let Claude generate them as part of the body — prompt for them separately. A password reset subject should say exactly what it is: "Reset your password" not "Action required for your account." Clarity wins over cleverness for transactional email.

###### 5. Spec the template for the pod
Hand the pod: the master template sketch, the full inventory with approved copy for each email, the sending provider choice (Resend is simplest if the product doesn't have a sending provider yet). The pod implements the React Email template, wires each trigger to the right email, and handles sending configuration. PO does not touch the implementation.

###### 6. QA every email before launch
Trigger every email in the inventory yourself: go through the signup flow, reset the password, make a test purchase. Open each email on desktop Gmail and on iOS Mail. Check: subject line correct, links work, CTA button is visible, no raw variable names showing (the classic {first_name} bug), footer has unsubscribe and address.
If anything fails, file it as a pod bug with a screenshot. Don't sign off until every email passes the walk-through.

###### 7. Set up basic email metrics
Ask the pod to ensure open rate and click rate are available in the sending provider's dashboard. You don't need a full analytics setup. You need to know: are people opening the welcome email (benchmark: 50%+ is good for transactional), and are they clicking the CTA in the activation email. Low open rates on the welcome email indicate a deliverability problem. Low click rates indicate a copy problem.

##### Templates
"Write a transactional email for a {product description}.
Trigger: {what caused this email — e.g. 'user just signed up' or 'user requested a password reset'}
Recipient: {who receives it}
Goal: {what you want the user to do after reading it}
Constraints:
- Subject line: under 50 characters, factual, no emojis
- Body: under 80 words
- One CTA only, as a button label (3–5 words)
- No "we're excited to have you," no "please don't hesitate"
- Plain language — write like a human, not a support ticket
Output: subject line, body, CTA button label."
Subject: You're in — here's how to get started
Hi {first name},
Your {product name} account is ready.
The fastest way to see value: {one-sentence description of the activation action — e.g. 'Connect your first data source' or 'Create your first project'}.
Takes about 3 minutes. If you get stuck, reply to this email.
[Get started →]
— The {product name} team
User-facing problem: Transactional emails look like developer defaults — no branding, inconsistent copy, sometimes broken formatting on mobile. Users who receive these emails during onboarding get a poor first impression of product quality.
Success metric: Every email in the inventory sends correctly, renders on Gmail and iOS Mail, has brand-consistent styling, and PO has manually triggered and QA'd each one.
Scope in: One shared React Email template with brand colors and logo. Implementation of all emails in the inventory using that template. Wiring each trigger event to the correct email via the sending provider. All links functional and pointing to production URLs.
Scope out: Marketing/newsletter emails, email automation sequences, A/B testing of subject lines, Litmus multi-client rendering (add if enterprise buyers are a near-term target).
PostHog events to instrument: If the welcome email includes a CTA to an activation action, instrument that action in PostHog as activation_action_completed with a source property set to welcome_email when triggered from the email link. This lets you measure email-driven activation separately from in-app activation.

##### Definition of done
- A complete inventory of every transactional email the product sends exists and is accessible to the team.
- All emails use one shared template with brand colors and logo.
- PO has manually triggered and reviewed every email in Gmail and iOS Mail — no broken links, no raw variable names, no staging URLs.
- Open rate and click rate are visible in the sending provider dashboard.
- Welcome email open rate is above 40% within the first week of deployment.

##### Common pitfalls
- Skipping the inventory step. "We only have a few emails" is almost never true. Build the list first. Finding a broken password reset email after a user reports it is worse than finding it in QA.
- Raw variable names in production. The classic {first_name} bug happens when the template is deployed without a full QA pass. Every email must be manually triggered before sign-off.
- Different templates for each email. One template. The value is consistency and maintenance cost. Ten different designs means ten templates to update when the brand changes.
- Ignoring mobile rendering. Over 60% of transactional emails are opened on mobile. An email that looks fine in desktop Gmail can be unreadable on iOS Mail if it uses fixed widths.
- Forgetting the footer legal requirements. Transactional emails in the US need a physical address. Marketing emails need an unsubscribe link. Get the footer right once in the template and it's handled for every email.
- Not measuring. You don't need a full analytics setup. You need to know if the welcome email is being opened. That one number tells you if there's a deliverability problem before it becomes a churn problem.

##### How to talk about it with the client
"The password reset email your users get right now looks like it came from a developer test environment. Every one of your active users has seen at least one transactional email — it's the highest-volume touchpoint in the product. We're going to spend half a sprint writing proper copy and building one clean template that all of them share. The pod wires everything up. I'll QA every email before it ships."
If they say "our users don't care about email design": "They may not notice good email design. They absolutely notice broken links, raw variable names, and emails that look like they were sent from a staging server. That's what we're fixing."

---

### 3.10 Platform Expansion & Ecosystem
When the product outgrows its first surface.

#### Second platform scoping
Launched on web, now need mobile (or vice versa). PO runs the discovery: what translates, what's native-only, what's the minimum viable second platform. Natural upsell into another pod engagement.

##### Why this matters
A product that lives only on web will lose users to competitors who show up on mobile, and vice versa. But the bigger failure mode is building the second platform wrong — porting every feature one-for-one when users on the new platform want something fundamentally different. The PO's job is to figure out what "mobile" or "web" actually means for this product's specific users before the pod writes a line of code.
This discovery work also has a commercial dimension: a well-scoped second platform is a natural, justified expansion of the Designli pod engagement. PO owns the discovery; pod builds what the discovery specifies.

##### When to run it
- The same 3 or more feature requests from users all mention the missing platform: "I wish I could do this on my phone" or "I need this in my browser at work."
- PostHog shows a retention drop correlated with mobile or desktop session attempts on a single-platform product.
- A competitor just launched on the platform the product doesn't have.
- A significant enterprise prospect lists "mobile app" or "web portal" as a procurement requirement.
When NOT to run it:
- Before the first platform has real retention. Expanding to a second platform when the first one is still losing users at 30 days compounds the problem, it doesn't solve it.
- When only one or two users have mentioned it. One loud user is not a platform strategy.

##### What you'll need
- 10 user interviews — specifically with power users and users who've mentioned the second platform. This is the primary research input.
- PostHog — to check current session data for any cross-platform usage attempts (e.g., mobile browser visits to a web-only product).
- Claude — to synthesize interview notes and draft the one-page scope document.
- A Notion doc or Google Doc — the deliverable is a one-page scope. No slides, no Figma, no prototype needed for the discovery phase.
- The pod lead — for a 30-minute technical feasibility check once the scope draft is ready.

##### Step-by-step

###### 1. Pull the signal from PostHog first
Before talking to anyone, check the data. In PostHog: look at device type breakdown for current sessions. If a web-only product has 20% of sessions on mobile, those users are already trying to use it on mobile and having a bad time. That's a stronger signal than user requests. Filter by your highest-retention users — their device behavior is what you're scoping for.

###### 2. Run 10 discovery interviews focused on the new platform
Interview your power users. The questions that matter: "Walk me through a scenario where you'd use this on [mobile/web]. What are you doing right before? What are you doing right after?" and "What's the one thing you'd absolutely need it to do on [platform] to make it worth switching?" and "What would you not need it to do?"
The third question is as important as the second. Users on the second platform almost always want a subset of the first platform's features, not all of them.

###### 3. Separate "translates directly" from "native-only"
From the interviews, categorize every feature request into two buckets. Translates directly: the feature works the same way on both platforms, just needs to be built there. Native-only: the feature only makes sense on the new platform because of hardware or context. For mobile, native-only typically means: camera, GPS/location, push notifications, offline mode, biometric auth. For web, native-only typically means: multi-tab workflows, keyboard shortcuts, file system access, large data views.
Build native-only features first. If the second platform's MVP is just a reskin of the first platform, users won't switch to it.

###### 4. Define the MVP as 3 things, not feature parity
Feature parity is never the right scope for a second platform MVP. From your interview synthesis, identify the 3 jobs users want the second platform to do. Everything else goes in a v2 backlog. The question to answer: "What are the 3 things users would need the [mobile/web] version to do to consider it worth using regularly?" That's the MVP.
Write it down as three user stories: "As a [user type], I want to [action] so that [outcome]." Show them to 3 users from the interview set and ask if that's complete or if they'd use it. If they'd use it, the scope is right.

###### 5. Confirm the tech approach with the pod
For mobile when the existing product is React web: React Native is the default choice — it shares component logic and the pod already knows React. Native iOS/Android is only justified when performance is critical (real-time audio, complex animations, heavy camera use) or when the product will compete in a market where native polish is a differentiator.
For web when the existing product is React Native: a Next.js or plain React app is the default. The pod can usually share business logic and API clients.
Get a rough build estimate from the pod for the 3-item MVP before writing the scope doc. If the estimate is 6+ months, the MVP scope is too large. Cut it until the estimate is under 3 months.

###### 6. Write the one-page scope document
The deliverable for the founder is one page. It covers: the signal that triggered this (3 sentences), what the MVP includes (the 3 user stories), what the MVP excludes explicitly (list 5 things), the tech approach in one sentence, the rough timeline from the pod, and the success metric for v1 ("X% of web users create at least one session on mobile within 60 days of launch").
Use Claude to draft this from your interview notes and the pod's estimate. You review and tighten.

###### 7. Present to the founder and get sign-off
Walk the founder through the one-pager. The conversation to have: "Here's what users actually want on the second platform — it's not everything we have on the first one. Here's what we're building first, and here's what we're explicitly deferring. The pod can start as soon as you approve." This is a natural transition into scoping a new pod engagement.

##### Templates
"I want to understand how you'd use [product] on [mobile/web]. Can you walk me through a specific situation where you'd want to use it on your phone — what were you doing before, and what would you need it to do?"
"If you could only have three features from [product] on [mobile/web], what would they be?"
"Are there things you'd want it to do on [mobile/web] that it doesn't do on [current platform] at all?"
"What's the one thing that would make the [mobile/web] version not worth using for you?"
Do not pitch features during the interview. Do not say "we're thinking about adding X." Listen and record.
"Here are notes from 10 user interviews about what they'd want from a {mobile/web} version of {product description}. Identify: (1) the top 3 jobs users want the second platform to do, with supporting quotes; (2) features that appeared in fewer than 3 interviews (potential scope creep); (3) any native-platform capabilities mentioned (camera, location, push notifications, etc.). Output as three short sections with bullet points."
User-facing problem: Users want to access [specific functionality] on [mobile/web] but the product only exists on [current platform]. A subset of users are attempting to use the product on the unsupported platform already and getting a broken experience.
Success metric: Within 60 days of launch, [X]% of existing users have completed at least one session on the new platform. Defined by a PostHog cohort of users with sessions on both platforms.
Scope in: [3 user stories from discovery]. Tech stack: [React Native / Next.js]. Shared API client with existing backend. Authentication via existing auth system.
Scope out: Feature parity with [current platform]. [List 5 explicitly excluded features by name.] Platform-specific push notification infrastructure (v2).
PostHog events to instrument: second_platform_session_started, second_platform_core_action_completed (one event per MVP user story), second_platform_session_duration. These feed the 60-day retention metric.

##### Definition of done
- 10 user interviews completed and notes exist in a Notion doc or similar.
- The MVP is defined as exactly 3 user stories — not more.
- 5 features explicitly excluded from MVP scope are documented.
- Tech approach confirmed with the pod in writing.
- Pod estimate received for the 3-story MVP (must be under 3 months).
- One-page scope document written and founder has signed off.
- Success metric defined with a specific number and timeline.

##### Common pitfalls
- Scoping for feature parity. "Give me everything the web version has, but on mobile" is not a product strategy. Users on the second platform want a different experience, not a smaller version of the same one. Discovery finds what that different experience is.
- Starting with one user's loud request. One power user who really wants mobile doesn't mean your median user does. Run 10 interviews before writing any scope.
- Choosing native over React Native without a reason. Native iOS/Android costs 2–3x more to build and maintain. The bar for choosing it over React Native should be high and specific: a documented performance requirement or a competitive differentiation that depends on native capabilities.
- Expanding the scope after sign-off. Once the one-pager is approved, the 3-story MVP is locked. New requests go in the v2 backlog. Every addition to the first release extends the timeline and increases the risk that nothing ships.
- No success metric. "Launch the mobile app" is not a success metric. Define what user behavior in PostHog indicates the platform is working: cross-platform retention, feature adoption, session depth.

##### How to talk about it with the client
"Before the pod writes a line of code for a second platform, I want to spend two weeks talking to your power users to find out what they actually need it to do. The mistake most products make is building a second platform that's just a smaller version of the first one — and users don't switch to it because it's not better at anything. By the end of discovery I'll have a one-page scope: the 3 things users need the [mobile/web] version to do, what we're explicitly leaving out of v1, and a build estimate. You decide if the scope and timeline make sense to move forward."
If they want to skip discovery and just build: "We can do that. But the risk is we spend 4 months building the wrong things for the second platform. Discovery is 2 weeks of my time and 10 user conversations. That's a cheap way to avoid a 4-month mistake."

---
#### API strategy
If the product has data or functionality others want, PO scopes a public API. Developer docs, rate limits, authentication. Turns a product into a platform.

##### Why this matters
A public API turns a product into a platform. When customers can connect your product to their existing stack, it stops being a tool they use and starts being infrastructure they depend on. Churn drops because switching costs go up. New enterprise deals open up because procurement teams can integrate without custom work. And a developer ecosystem, even a small one, creates distribution you don't have to pay for.
The mistake is building an API too early, for theoretical use cases, or trying to expose everything at once. This playbook scopes an API that's real enough to sign three enterprise customers and honest enough to not break them when you iterate.

##### When to run it
- Three or more enterprise or mid-market customers have asked, unprompted, for API access or integration capabilities.
- A clear ecosystem play exists — the product sits between two systems that users are manually bridging today.
- A significant deal is pending and the prospect has listed API access as a procurement requirement.
- The product has stable core functionality that hasn't changed fundamentally in two or more sprints.
When NOT to run it:
- Before the product's core data model is stable. An API is a public contract. Changing the data model breaks every integration your customers built.
- When the only use case is theoretical. "Developers might want to integrate with us someday" is not a reason to build an API.
- When the product is still pre-revenue. APIs require support infrastructure. Build that after you have customers who can justify it.

##### What you'll need
- 3 anchor customers — for the private beta. These are customers who've specifically requested API access and will give you feedback. Without real beta partners, you're designing in the dark.
- Mintlify, Stoplight, or a simple Astro page — for developer documentation. Mintlify is the fastest to set up and looks professional. At MVP stage, a clean static site beats a sophisticated docs platform you can't maintain.
- Claude — to draft example code and documentation from the endpoint specs the pod provides.
- The pod — they build the API, authentication, rate limiting, and a sandbox environment. PO scopes and tests; pod builds.
- A sandbox environment — a separate environment with test data. Non-negotiable. Developers break things when they're learning an API. They should break the sandbox, not production.

##### Step-by-step

###### 1. Interview the 3 anchor customers about their integration use cases
Don't start with "what endpoints do you need?" Start with "walk me through what you're doing manually today that you'd want the API to handle." Record the workflow they describe. The endpoints will become obvious from the workflow. This also prevents the most common API mistake: building endpoints that feel complete but don't map to any real workflow.
From 3 interviews, look for overlap. Endpoints that appear in all 3 use cases are in the MVP. Endpoints that appear in 1 are in v2.

###### 2. Define the 5 MVP endpoints
Most products need 5 endpoints to cover the core use cases: list resources, get one resource, create a resource, update a resource, and one action endpoint (trigger a workflow or push a notification). That's it for v1. Write each endpoint as a plain-English description first: "GET /customers — returns a paginated list of customers with their status and last-activity date." The pod converts these to implementation specs.
Every endpoint that isn't in this list is explicitly out of v1 scope. Write the exclusion list and share it with anchor customers before the pod starts building.

###### 3. Decide on authentication
API keys are the right choice for v1. Simple to implement, simple for developers to use, revocable if compromised. OAuth 2.0 is the right answer eventually — it's what enterprise IT departments prefer. But OAuth takes 3–4x longer to build and introduces significant complexity. The decision rule: use API keys until an enterprise customer's IT policy explicitly requires OAuth, then build OAuth for that customer.
API key format: a random 32-character string prefixed with a recognizable prefix (e.g., sk_live_... for production, sk_test_... for sandbox). The pod hashes keys at rest — never store plain text API keys.

###### 4. Spec rate limits and quotas
You need rate limits on day one. Without them, one customer's runaway integration takes down the API for everyone. Start with: 100 requests per minute per API key, 10,000 requests per day per account. Return a 429 with a Retry-After header. Document the limits publicly — developers hate undisclosed limits they only discover when they hit them.
Quotas (monthly request caps) come later, when you have pricing tiers. Don't design a billing model into the API on day one.

###### 5. Write the developer docs with Claude
Docs need: an authentication guide (how to get an API key, how to include it in a request), a quickstart (make your first API call in under 5 minutes — pick the most common use case), reference for each endpoint (method, path, parameters, example request, example response), and error codes. Claude drafts all of this from the endpoint specs. PO reviews for clarity — if a non-developer PO can follow the quickstart, a developer can follow it easily.

###### 6. Build and test with the 3 anchor customers
Private beta: share API keys with your 3 anchor customers and set a specific feedback deadline (2 weeks). Ask them to attempt their stated use case using only the docs. Where they get stuck is where the API or docs need work. Fix the critical blockers before opening the public beta.

###### 7. Define the rollout and pricing
Rollout: private beta (3 partners) → public beta (announced, but clearly labeled) → general availability. Don't skip the labels — "beta" sets the right expectation about stability and gives you room to iterate. Pricing at v1: a free tier (rate limited) that lets developers test, and a paid tier tied to your existing subscription or contract. Metered API pricing (per-request billing) is a separate project — don't design it until you have enough usage data to know what "heavy" looks like.

##### Templates
"What are you doing manually today that you'd want an API to handle automatically?"
"Walk me through the last time you wished you could pull data from our product into another system. What system? What data? What would you do with it?"
"If we gave you API access tomorrow with no documentation, what would you try to do first? What would you expect to find?"
"What would make you not use the API even if it existed?" (Usually: reliability, versioning guarantees, or documentation quality.)
"Write a developer quickstart guide for a REST API for {product description}. The reader is a developer who has never used this API before. They should be able to make their first successful API call in under 5 minutes. The API uses API key authentication passed as a Bearer token. The first example should demonstrate {most common use case from anchor customer interviews}. Include: authentication setup (2 steps), one complete request/response example with curl and with JavaScript fetch, what to do if the request fails (common errors). Write for a developer who skims documentation."
User-facing problem: Enterprise and power users need to integrate [product name] with their existing systems (listed: [systems from anchor customer interviews]). Today they do this manually or it's impossible. Without an API, we lose deals to competitors who have one.
Success metric: All 3 anchor customers make a successful API call in the private beta within 2 weeks of receiving their API key. At least 1 anchor customer completes their stated integration use case before public launch.
Scope in: 5 MVP endpoints (list, get, create, update, [action endpoint]). API key authentication with hashed key storage. Rate limiting: 100 req/min per key, 10k req/day per account with 429 response and Retry-After header. Sandbox environment with seeded test data. Developer docs site (Mintlify). API key management page in the product dashboard.
Scope out: OAuth 2.0, webhooks (v2), GraphQL, SDK libraries, metered billing, enterprise SSO, more than 5 endpoints in v1.
PostHog events to instrument: api_key_created, api_key_revoked, api_request_made (with endpoint and status code properties), api_rate_limit_hit. These feed a usage dashboard that informs v2 scope and pricing decisions.

##### Definition of done
- 5 MVP endpoints are live in production and sandbox.
- API key authentication works: create, view, revoke from the product dashboard.
- Rate limiting returns correct 429 responses with Retry-After header.
- Developer docs cover authentication, quickstart, and all 5 endpoints — PO has followed the quickstart without help.
- All 3 anchor customers have API keys and have made at least one successful call.
- PostHog events are firing for api_key_created and api_request_made.
- A public launch announcement is drafted and ready, pending anchor customer validation.

##### Common pitfalls
- Building for theoretical use cases. If you can't name three customers who will use a specific endpoint in the next 30 days, it's not in the MVP. APIs built for theoretical future use cases are expensive to maintain and rarely used.
- No sandbox environment. Developers break APIs when they're learning them. They need a safe place to break things. Providing only a production environment means you'll have corrupted production data within a week of launch.
- Undocumented rate limits. A rate limit that only appears when you hit it is a support ticket and an angry developer. Document the limits prominently. Developers respect limits they know about.
- Designing pricing into v1. You don't know what "heavy usage" looks like yet. Set a generous free tier, include API access in existing paid plans, and revisit pricing after 90 days of usage data.
- Skipping the private beta. Anchor customers don't know they have a problem with your API until they try to use it. Three weeks of private beta catches 80% of the issues that would otherwise become support tickets after public launch.

##### How to talk about it with the client
"Three of your customers have asked for API access. That's not a feature request — that's a signal that they want to make your product infrastructure instead of a tool. An API changes the relationship: instead of logging in to use the product, they're connecting their whole stack to it. We're going to scope a small one — 5 endpoints, API keys, a sandbox, and docs. Private beta with the three customers who asked, then public. I'll define the scope; the pod builds it."
If they want to build a comprehensive API: "We'll get to that. But shipping 5 endpoints that customers actually use is better than shipping 50 that nobody knows how to use. We add endpoints based on what the private beta tells us, not based on what seems complete on a whiteboard."

---
#### Webhook & automation support
Zapier/Make integration so users can connect the product to their existing stack without custom dev. Reduces churn for power users.

##### Why this matters
Power users don't live in one tool. They live in a stack — Slack, Notion, HubSpot, Airtable — and any product that doesn't connect to their stack gets used less. A Zapier or Make integration changes this. It turns your product into something that participates in existing workflows instead of demanding users build new ones. And practically: every product listed on the Zapier app directory gets passive discovery from users already searching for exactly what you do.
This is a pod project with significant review overhead from Zapier. PO scopes it and manages the submission process; pod builds the triggers and actions.

##### When to run it
- Power users are asking "does this connect with Zapier / Make?" in support tickets or user interviews.
- Users are manually copying data between your product and another tool — that manual step is exactly what Zapier replaces.
- The product has stable, named events that fire reliably (user created, status changed, task completed). Flaky event delivery makes a bad Zapier integration.
- The team has shipped the core product and has a sprint cycle to spare — Zapier's review process takes 4–8 weeks and requires ongoing attention.
When NOT to run it:
- Before the product's core data model is stable. The Zapier integration is a public contract. Changing your event schema breaks every automation users have built.
- When fewer than 5 users have mentioned it. The Zapier submission process is a real investment. Make sure there's genuine demand first.
- As a substitute for features. "We'll let users build it in Zapier" is sometimes a cop-out. Zapier is for connecting existing functionality, not replacing missing product features.

##### What you'll need
- A Zapier developer account — free at developer.zapier.com. This is where you build and submit the integration.
- A Make (formerly Integromat) developer account — if targeting Make specifically. The two platforms have different submission processes and different audiences.
- User interviews — to identify which triggers and actions to expose first. Build what users actually need, not what seems complete.
- The pod — to build the webhook infrastructure, REST hooks (for Zapier's preferred polling-free architecture), and the action endpoints. PO scopes; pod builds.
- A Zapier partner manager — Zapier assigns a partner manager for new integrations in their review process. This person is your main contact for review feedback.

##### Step-by-step

###### 1. Run 5–10 user interviews to find the real triggers and actions
Don't guess what to expose. Ask users: "If this product could automatically trigger something in another tool when X happens, what would X be? And what would the other tool be?" And: "Is there something you do in another tool that you wish could automatically update this product?" The first category becomes triggers. The second becomes actions.
From the interviews, list every trigger and action mentioned. Count how many users mentioned each one. Anything mentioned by 3 or more users is in the MVP. Everything else is v2.

###### 2. Decide: Zapier first, Make second, or both at once
Zapier has a larger directory and broader user base — it's the right default for most B2B SaaS products. Make appeals to more technical power users who need complex multi-step automations with conditional logic and lower pricing. If your users skew technical or cost-sensitive on automation, Make is worth prioritizing alongside Zapier.
Building both at once is possible but doubles the review overhead. If resources are constrained, ship Zapier first, Make 60 days later. The underlying webhook infrastructure is shared — only the platform-specific integration layer differs.

###### 3. Spec the MVP triggers and actions for the pod
Triggers are events your product emits: "new customer created," "task completed," "subscription renewed." Actions are things Zapier users can instruct your product to do: "create a record," "update a status," "send a notification." Start with 2–3 triggers and 1–2 actions. Zapier recommends starting small — their review process is stricter on integrations that claim to do too much but don't do any of it well.
The pod implements these as webhook subscriptions (REST hooks): when a user enables a Zap, Zapier sends your product a subscription URL; your product fires a POST to that URL when the trigger event occurs. This is Zapier's preferred architecture and avoids slow polling.

###### 4. Build a sandbox and test account for Zapier review
Zapier's review team will use your integration before approving it. They need a live test account with realistic data — not empty, not broken. Set up a sandbox account specifically for reviewer access. Make sure every trigger fires with realistic-looking data and every action produces a visible result. The most common review rejection is "trigger returns empty or malformed data."

###### 5. Write the Zapier listing copy
The listing in the Zapier directory needs: integration name, a short description (under 140 characters), a longer description (under 1000 characters), a logo (square, minimum 256x256px, transparent background), and at least 3 "use case" examples ("When a new customer is added in [product], add them to a HubSpot contact list"). Claude drafts all of this. The use cases are the most important part — they're how users discover the integration via Zapier search.

###### 6. Submit for Zapier review and expect 4–8 weeks
Submit via the Zapier developer platform. Expect at least one round of review feedback. Common feedback: authentication flow is unclear, trigger data sample is incomplete, action doesn't handle errors gracefully, documentation links are broken. Your Zapier partner manager will send specific feedback items — address each one explicitly in your response. Don't resubmit until all feedback items are resolved.
During the review period, use the integration in "invite only" mode — share it with your anchor users to get real usage data while you wait for review.

###### 7. Launch: claim the listing, write the use cases, push from user docs
On approval, write a "how to connect [product] with Zapier" page in your product docs or help center. Link to it from the settings page inside the product. Announce the integration to existing users — this is a moment to re-engage dormant accounts. Add the Zapier "Built on Zapier" badge to the product's integrations page if one exists.
Monitor integration usage in your PostHog events for the first 30 days. The ratio of "integration enabled" to "trigger fired at least once" tells you how many users set it up but never actually ran an automation — that's a docs/onboarding problem to fix in v2.

##### Templates
"We're thinking about building a Zapier integration. Can I ask you a few questions about how you'd use it?"
"When something important happens in [product] — like [example from their usage] — is there something you have to manually do in another tool afterward?"
"What tool would that be? What would you want to happen automatically?"
"Is there anything in your other tools that you wish would automatically update [product]? Like if you add a contact in HubSpot, you'd want it to appear here automatically?"
Record every tool name mentioned. The ones that appear in 3+ interviews become your "popular integrations" use case examples.
"Write 5 Zapier use cases for an integration between {product description} and common business tools. Each use case should follow this format: 'When [trigger in product], automatically [action in another tool].' The target user is a {ICP description}. The tools used most by this audience are: {list tools from user interviews}. Keep each use case under 20 words. Write them as the copy that would appear in the Zapier directory."
User-facing problem: Power users manually copy data between [product name] and [tools from user interviews]. This creates lag, errors, and frustration. Users who connect their tools stay longer — removing manual steps is a direct retention lever.
Success metric: Within 60 days of launch, at least 10% of active users have enabled at least one Zap, and at least 80% of those users have had at least one trigger fire successfully.
Scope in: REST hook infrastructure for trigger subscriptions and unsubscriptions. [2–3 MVP triggers by name]. [1–2 MVP actions by name]. Zapier OAuth app or API key authentication flow. Sandbox test account with seeded data for review. Error handling that returns Zapier-standard error responses.
Scope out: Make integration (v2), more than 5 triggers/actions in v1, webhooks for internal use (separate project), Zapier Premium features.
PostHog events to instrument: zapier_integration_enabled, zapier_trigger_fired (with trigger name property), zapier_action_executed (with action name and success/fail property), make_integration_enabled if building Make simultaneously. These feed the 60-day retention metric and tell you which triggers are actually used.

##### Definition of done
- Zapier integration is approved and listed in the public Zapier directory.
- At least 3 anchor users have enabled the integration and successfully fired at least one trigger in production.
- A "how to use the Zapier integration" page exists in the product help docs, linked from the settings page.
- PostHog events are firing for integration enabled and trigger fired.
- An announcement to existing users has been sent.
- Usage is being monitored — enabled-to-active ratio above 50% is the target for the first 30 days.

##### Common pitfalls
- Building too many triggers and actions in v1. Zapier's review is more rigorous for larger integrations. Ship 2–3 triggers and 1–2 actions. Add more after the integration is live and you know which ones are actually used.
- Using polling instead of REST hooks. Zapier supports polling (they check your API every 5–15 minutes) but REST hooks are strongly preferred — they're instant and don't hammer your API. The pod should implement REST hooks from the start.
- Submitting without a complete test account. Zapier's reviewers test the integration with a real account. If the trigger fires with empty data or the action fails, the review fails. Set up a dedicated reviewer account with realistic data before submitting.
- Not linking from the product. The listing in the Zapier directory drives discovery from Zapier users who don't know your product. But existing users need to find the integration from inside the product. A settings page link and an in-app announcement are both required.
- Treating Zapier review as a one-shot process. Expect at least one revision cycle. Keep your Zapier partner manager contact active and respond to feedback within 48 hours to avoid losing your queue position.

##### How to talk about it with the client
"Your power users live in multiple tools — they're not going to rebuild their workflows around yours. A Zapier integration means [product name] connects to whatever they already use: HubSpot, Slack, Airtable, Google Sheets. We build it once; users connect it to anything. And practically, being listed in the Zapier directory is free distribution — there are thousands of users already searching for '[product category] + Zapier' and finding nothing from you. The pod builds the infrastructure; I manage the submission process. Zapier review takes 4–8 weeks, so the sooner we start, the sooner it's a live acquisition channel."
If they ask why not just use Zapier's free embedding instead of building a native integration: "The embedded Zapier editor is a last resort — it's a bad user experience that signals the integration was bolted on. A native Zapier app listed in their directory is the standard and it's what users search for. The pod work to build it properly is a one-time investment."

---

### 3.11 Monetization & Pricing
Test willingness to pay & optimize the upgrade path.

#### Pricing experiment
PO sets up two or three pricing tiers and tests willingness to pay with early cohorts. Claude drafts the pricing page copy.

##### Why this matters
Most founders guess at pricing. They pick a number that feels low enough not to scare anyone away, then leave money on the table for years. A pricing experiment answers the actual question: what will your specific users pay for your specific product, right now. That number almost never matches the guess.
Running this early — before you have hundreds of customers locked in — means you can adjust without breaking anything. Price anchors set in year one are hard to move in year three.

##### When to run it
- The product has a clear value proposition — users can articulate what they get out of it.
- There's a repeatable activation pattern — most new users reach the "aha" moment within a session or two.
- You have at least 50 active users who are actually using the product, not just signed up.
When NOT to run it: If users are still confused about what the product does, don't add pricing complexity. Fix the onboarding first. Pricing research on a broken funnel produces useless data.

##### What you'll need
- Stripe — Products and Prices to create your tiers. You don't need a developer to set up Stripe products; you do need one to wire up the checkout flow.
- PostHog Surveys — for running a Van Westendorp pricing survey directly to your active user base.
- PostHog feature flags — to A/B test which pricing tier is shown to which users.
- Claude — for pricing page copy, survey question refinement, and synthesis.
- A spreadsheet — to track conversion rate, ARPU, and churn per pricing variant. PostHog dashboards cover events; a spreadsheet covers the business math.

##### Step-by-step

###### 1. Research what the market already charges
Before designing tiers, spend one hour on competitor pricing pages. Write down: what each tier costs, what's gated at each level, and what language they use to describe the value. Note which tier they clearly want you to buy — that's the anchor tier. This takes 60 minutes and saves weeks of wrong experiments.
Use Claude: paste 3–5 competitor pricing pages and ask it to extract the tier structure, price points, and gating logic into a table.

###### 2. Run a Van Westendorp survey in PostHog
Van Westendorp is four questions that map the acceptable price range for your product. You don't need any pricing training to run it — just the four questions. Set it up as a PostHog Survey, target it to users who have reached your activation event (not all users — only people who've used the product), and collect at least 30 responses before drawing conclusions.
The four questions are in the Templates section below. The output tells you: too cheap (loses trust), acceptable low, acceptable high, and too expensive (kills intent).

###### 3. Design three tiers maximum
Three rules for tier design at this stage:
- Three tiers max. More than three is a paralysis problem, not a revenue opportunity.
- Anchor the middle tier. The middle tier is what you want most people to buy. Price it intentionally, not as the average of low and high.
- Gate the bottom tier by usage limits (seats, API calls, file count, storage) — not features. Save feature gates for the upgrade from middle to top. Blocking features at the free or entry level creates resentment; hitting a usage ceiling creates natural upgrade intent.

###### 4. Write the pricing page copy with Claude
Pricing page copy fails when it lists features. It works when it frames the value you unlock at each tier. Use the prompt in the Templates section. The output is a draft — you'll need to adjust the specific numbers and tier names, but the frame should be value-first.

###### 5. Create Products and Prices in Stripe
In Stripe Dashboard: Products → Add product. One product per tier. For each product, create a Price — monthly recurring. Name them clearly (the name shows up in receipts). Do not create more Price variants than you're actually testing — Stripe products accumulate fast and become hard to manage.
Hand the Stripe Price IDs to the pod so they can wire up the checkout buttons. You set the products; they handle the integration.

###### 6. Set up a PostHog feature flag to A/B test the pricing page
In PostHog: Feature Flags → New flag. Create a flag called pricing-variant with two rollout conditions: 50% see variant A (your current or lower pricing), 50% see variant B (your new tier structure). Flag the user at signup or first visit. The pod surfaces the correct pricing page based on which flag variant the user is in.
Minimum sample size before calling a winner: 50 paid conversions per variant. Not 50 visitors — 50 paid conversions. With low conversion rates, this takes time. Don't call it early.

###### 7. Measure the tradeoff between conversion, ARPU, and churn
These three metrics trade off against each other. A lower price converts more users but drops ARPU. A higher price converts fewer but those users churn less. You're not looking for the highest conversion rate — you're looking for the combination that produces the best 90-day net revenue per cohort.
Track per variant: conversion rate (visitors → paid), ARPU (average revenue per paying user), and 30-day churn. Put all three in your spreadsheet weekly.

###### 8. Iterate in small steps
Once you have a winning variant, resist the urge to do a full reprice. Move in 15–20% increments. Full repricing every month destroys trust with users who are watching your pricing page and creates support burden. One price change per quarter, minimum.

##### Templates
Set these up in PostHog Surveys, targeting users who've hit your activation event. Collect 30+ responses minimum.
- "At what price would you consider this product so cheap that you'd question its quality?"
- "At what price would you consider this product a bargain — a great buy for the money?"
- "At what price would you consider this product starting to get expensive, but you'd still consider it?"
- "At what price would this product be too expensive for you to consider?"
The acceptable range runs from the intersection of "bargain" and "too cheap" to the intersection of "expensive but consider" and "too expensive." That range is where your tiers should live.
"Write pricing page copy for a product called {product name}. The product does: {one sentence description}. The target buyer is {ICP description}. There are three tiers: {tier 1 name, price, usage limit}, {tier 2 name, price, what's unlocked}, {tier 3 name, price, what's unlocked}.For each tier, write: a tier name headline, a one-sentence value frame (not a feature list), and three bullet points that explain what the user can do — not what the product has. Frame the middle tier as the obvious choice. Keep it under 40 words per tier. No buzzwords."
"Here are the pricing pages for {competitor 1}, {competitor 2}, {competitor 3}. Extract into a table: tier name, monthly price, what's included, what's gated, and the implied target buyer for each tier. Note which tier each product is clearly anchoring toward. Summarize in 3 bullet points what pricing signals I should take from this for my own product, which does: {one sentence description}."

##### Definition of done
- Van Westendorp survey has 30+ responses and the acceptable price range is documented.
- Three tiers are live in Stripe with Products and Price IDs created.
- PostHog feature flag is running with two pricing variants, each receiving real traffic.
- Tracking spreadsheet has conversion rate, ARPU, and churn columns populated weekly.
- After reaching 50 paid conversions per variant, a winner is called with a one-paragraph rationale.

##### Common pitfalls
- Calling the experiment too early. 50 visitors per variant is not enough data. 50 paid conversions per variant is. The difference can be weeks or months depending on your traffic.
- Gating features at the free tier. Usage limits create natural upgrade intent. Feature blocks create frustration. Gate features only between middle and top tiers.
- More than three tiers. Every tier you add past three reduces conversion on every tier. Buyers freeze when the grid is too wide.
- Skipping the Van Westendorp survey. Designing tiers based on competitor research alone ignores whether your users have the same willingness to pay. Run both — they take 90 minutes combined.
- Full repricing every quarter. Small iterative adjustments (15–20%) give you clean signal. Large swings produce noise and erode trust.
- PO bypassing the pod for Stripe checkout. Setting up Stripe products is a PO task. Wiring Stripe to the app is a pod task. Don't conflate them — the pod needs clean Price IDs, not a verbal description.

##### How to talk about it with the client
"We're not guessing at pricing — we're running a proper experiment. First, I'm going to ask your active users four survey questions that map out the acceptable price range. Then I'll design three tiers based on that data plus competitor research, and we'll A/B test two versions with real users. We need 50 paid conversions per variant before we call a winner, so give it time. The result will be a pricing structure grounded in what your actual users will pay — not what we hope they will."
If they push to skip the survey and just pick a number: "We can do that, but we'll be flying blind. The survey takes a week to collect 30 responses and costs nothing. Guessing wrong on price costs you every user who bounces on the pricing page from here on out."

---
#### Free-to-paid conversion funnel
Instrument the upgrade path, identify where people bail, test different triggers (usage limits, time-based trials, feature gates). PO owns the hypothesis; pod builds the paywall logic.

##### Why this matters
Having a free tier and having a working conversion funnel are different things. Most products launch with a paywall that exists in name only — the upgrade path is buried, the trigger is vague, and no one knows where users are actually dropping off. Instrumenting this funnel takes a day and shows you exactly where you're losing money.
The PO owns the conversion hypothesis. The pod builds the gate logic and UX. Neither one can do it without the other — so the PO has to define it precisely before any work starts.

##### When to run it
- There's a free tier and a paid tier, and you've had at least a few dozen free users for a week or more.
- The activation event is defined and tracked in PostHog — you know what "getting value from the product" looks like.
- Stripe is set up with at least one paid plan the pod can redirect users to.
When NOT to run it: If you haven't defined what free users can do versus paid users, don't build the funnel first. Define the gate logic first. Building the checkout flow before knowing what triggers it is wasted work.

##### What you'll need
- PostHog — to build the funnel view, identify drop-off, and run the A/B test on trigger placement.
- Stripe — for the paid plans users are upgrading to. Needs to be set up before any of this is measurable.
- Claude — for writing the upgrade view copy and the hypothesis doc.
- The pod — to implement the gate logic and paywall UX once the PO has written the spec. The PO does not write code here.

##### Step-by-step

###### 1. Build the funnel in PostHog
In PostHog: Insights → Funnels. Add five steps in this order:
- Free signup
- Activation event (whatever you've defined as the user getting value)
- Hit usage limit (or hit the feature gate — wherever the free tier ends)
- Upgrade view shown
- Paid conversion
If any of these events aren't being tracked yet, that's the first gap to fix. Ask the pod to add the missing event tracking before anything else.
Look at the drop-off percentages between each step. The step with the biggest drop is your hypothesis target.

###### 2. Choose the right trigger type for your product
There are three trigger types. Pick one as your primary — don't combine all three at once or you won't know which one drove results.
- Usage limit — best for products where value scales with usage (storage, API calls, records, seats). Users hit a ceiling and naturally understand they need more. Lowest friction upgrade.
- Time trial — best for products where the full feature set is the sell, not a metered resource. Give users 14 days of full access, then gate. Works when your product has genuine "wow" moments that users will pay to keep.
- Feature gate — best for B2B products where the upgrade unlocks team or admin features. Individual users get core value free; teams or power users pay. Don't use feature gates to cripple the free tier — use them to unlock genuine upgrade value.

###### 3. Write the upgrade hypothesis
Before the pod builds anything, write a one-paragraph hypothesis. Format: "We believe that [trigger type] placed at [specific moment] will convert [X]% of free users who hit that moment into paid within [timeframe]. We'll know it worked when [specific metric] moves from [current state] to [target state]."
This is your spec. The pod builds against this. Without it, you'll end up with a paywall that no one can evaluate.

###### 4. Write the upgrade view copy
The upgrade view is not a features list. It's one specific statement of what the user gets right now if they upgrade. "Unlock unlimited projects" is weak. "Your 11th project is ready — upgrade to add it" is strong. Use the Claude prompt in the Templates section.
Write the copy before handing off to the pod. They shouldn't be writing conversion copy — that's the PO's job.

###### 5. Spec the paywall UX for the pod
Write a clear spec that includes: the exact trigger event, what the user sees when they hit the gate (modal, inline prompt, separate page), what the CTA says, where it goes (Stripe checkout or a pricing page), and what happens if they dismiss it. Keep it simple — the pod shouldn't be making UX decisions from scratch.

###### 6. A/B test trigger placement
Once the first version is built and live, set up a PostHog feature flag to test two trigger variants. A classic test: show the upgrade prompt at 80% of the usage limit vs. at 100%. Users who see the prompt before hitting the wall have more agency; users who see it after are more motivated. Which converts better depends on your product.
Run for at least two weeks or 200 unique users hitting the trigger, whichever comes first.

###### 7. Measure the tradeoff
Track three metrics per variant: conversion rate at the trigger step, time-to-paid (how many days from signup to first payment), and 30-day churn of converted users. An aggressive trigger converts more users but churns them faster. A gentle trigger converts fewer but keeps them longer. The goal is net revenue at 90 days, not conversion rate alone.

##### Templates
Before building the funnel, confirm all five events are tracked in PostHog. Check with the pod if any are missing.
- user_signed_up — fires on first account creation
- activation_event — whatever your product defines as "got value" (e.g., created_first_project, connected_first_integration, ran_first_report)
- hit_usage_limit or hit_feature_gate — fires when user reaches the free tier ceiling
- upgrade_view_shown — fires when the paywall or upgrade prompt renders
- upgrade_completed — fires on successful Stripe checkout
"Write an upgrade prompt for a product called {product name}. The user has just hit {specific limit — e.g., 'their 5th project' / 'end of 14-day trial' / 'the admin features gate'}. The paid plan costs {price} per month and unlocks {specific thing they get}.Write three versions of the headline for this prompt. Each should be under 10 words and frame the value of upgrading — not the consequence of not upgrading. No urgency tricks, no countdown language. After each headline, write one sentence of supporting copy that tells the user exactly what they get. Then write the CTA button text — 4 words maximum."
"We believe that showing a {trigger type} prompt at {specific trigger moment} will convert {X}% of free users who reach that moment into paid customers within {timeframe}. We'll know it worked when the funnel drop-off at the 'upgrade view → paid conversion' step improves from {current %} to {target %}. We'll call a winner after {sample size} users hit the trigger."

##### Definition of done
- All five funnel steps are tracked in PostHog and the funnel is built and visible.
- The upgrade hypothesis is written and approved by the founder.
- Upgrade view copy is written and handed off to the pod with a UX spec.
- At least one variant is live and accumulating data.
- Conversion rate, time-to-paid, and 30-day churn are being tracked weekly per variant.
- A winner is called (with rationale) after hitting the defined sample size.

##### Common pitfalls
- Testing multiple trigger types simultaneously. If you run usage limits AND a time trial AND a feature gate at the same time, you'll never know which one drove the conversion. One trigger type at a time.
- Optimizing for conversion rate instead of net revenue. An aggressive paywall gets more upgrades but higher churn. Measure 90-day net revenue per cohort, not just the conversion rate at the gate.
- Letting the pod write the upgrade copy. Engineers shouldn't be writing conversion copy. The PO writes it, the pod implements it. If you hand off a Figma mockup with placeholder text, that text usually ships.
- Calling the A/B test before you have enough data. 50 users hitting the trigger is not enough. 200 is a reasonable minimum, and you want at least 2 weeks for time effects to normalize.
- Missing event tracking on key funnel steps. Build the PostHog funnel before writing any code. If an event is missing, the measurement is broken from day one.

##### How to talk about it with the client
"Before we try to increase revenue, I need to show you exactly where we're losing it. I'm going to build a five-step funnel in PostHog that shows what percentage of free users are seeing the upgrade prompt, and what percentage of those are actually converting. Then we'll write a clear hypothesis about where the leak is, test a fix, and measure the result. The whole thing — from funnel build to first data — takes about two weeks."
If they push for a more aggressive paywall to drive faster conversions: "We can make it more aggressive, but more aggressive usually means higher churn. Let me show you the 90-day revenue per cohort for both approaches before we decide. Aggressive paywalls look great on day 30 and terrible on day 90."

---
#### Churn interview
When someone cancels or goes inactive, PO runs a 15-minute call or sends a 3-question survey. Cheapest source of product truth you'll ever get.

##### Why this matters
When someone leaves your product, they know something you don't. They tried it, decided it wasn't worth staying, and moved on. That decision contains more honest signal than any in-app survey you'll run with active users. Most products never capture it.
A 15-minute conversation with five churned users will reveal the real churn driver. Not what you assume it is — the real one. That driver almost always points to either a product gap, a positioning mismatch, or an onboarding failure. All three are fixable.

##### When to run it
- You have users who have canceled or gone inactive — meaning at least 30 days without logging in, or a subscription cancellation.
- The product has been live long enough that you have 5–10 candidates to reach out to.
- Churn is noticeable — either paid cancellations or a meaningful group of free users who activated and disappeared.
When NOT to run it: Don't run churn interviews when you don't have a repeatable activation pattern yet. If users never got to "aha" in the first place, you're diagnosing the wrong problem — that's an onboarding problem, not a churn problem.

##### What you'll need
- PostHog cohorts — to identify who churned. Two cohorts: (1) users who haven't logged in for 30+ days but activated at some point, and (2) users who canceled a paid subscription.
- Claude — to draft the outreach email and refine the interview script.
- A calendar link — Calendly or Cal.com free tier. Make it easy for them to book without back-and-forth.
- A way to record — Loom, Zoom, or Google Meet with recording on. You will not remember verbatim what they said. You need the recording.
- A $25 gift card — optional but it meaningfully increases response rate from cold churned users. Amazon gift cards work fine.

##### Step-by-step

###### 1. Build the churn cohort in PostHog
In PostHog: Persons → Cohorts → New cohort. Set conditions:
- Did perform activation event (whatever you've defined — created project, ran first report, etc.) — at any time
- Did NOT perform any event in the last 30 days
For paid churn, filter by users with a subscription_canceled event in the last 60 days. Export the list — you need names and emails. Aim for 10–20 candidates so you can reach at least 5.

###### 2. Write the outreach — personal email, not a survey link
This is the most important rule of churn interviews: send a personal email from the founder's address (or your address), not a survey link. Survey links get ignored. A personal email from a human asking for 15 minutes gets a reply rate of 20–40%.
Use the Claude prompt in the Templates section to draft it. The email should be short, direct, mention the product by name, and make it clear you're asking for candid feedback — not trying to win them back.

###### 3. Run the 15-minute interview with three questions
This is not a product demo or a re-pitch. The only goal is to understand what happened. Ask these three questions, in this order, and let them talk:
- "What changed — either in your situation or your use of the product — around the time you stopped using it?"
- "Was there anything that almost kept you? Any moment where you were close to staying?"
- "What are you using instead, if anything?"
These are the Mom Test equivalents for churn. They focus on behavior and history, not opinion. Do not ask "what would make you come back" — that's a hypothetical with no signal value. Do not pitch during the interview. Write down what they say verbatim.

###### 4. Don't ask "would you come back if..."
This gets its own step because it's the most common mistake. "Would you come back if we added X?" is a hypothetical. People answer yes to be polite. It tells you nothing about whether they'd actually return. Stick to the past: what happened, what they tried, what they switched to.

###### 5. Offer an incentive for cold outreach
If the churned user was a paid customer or was clearly active before leaving, a $25 Amazon gift card as a thank-you increases response rate significantly. Mention it in the outreach email. This is not a bribe — it's acknowledging that their time has value. For free-tier churned users, the personal email alone is usually enough if the product is in a space they care about.

###### 6. Synthesize after 5+ interviews
Five interviews is the minimum before you can see patterns. After five, read all your notes back to back and look for: what's the same story told in different ways? Most of the time, 80% of churn traces back to one or two root causes. Name them explicitly in your synthesis — don't hedge.
Use the Claude prompt in the Templates section to help you synthesize notes from multiple interviews into a clear finding.

###### 7. Feed findings to the pod
Write a one-page brief: the root cause, verbatim quotes that illustrate it, and a hypothesis for the fix. This is a pod input, not a prod — the pod decides if and how to address it. But without this brief, churn interview findings die in a Notion doc and nothing changes.

##### Templates
Subject: Quick question about {product name}
Hi {first name},
I noticed you haven't been back to {product name} in a while. I'm not going to try to win you back — I just want to understand what happened.
Would you be up for a 15-minute call this week? Completely candid, no pitch. I'm trying to understand where we fell short.
{Optional: As a thank-you for your time, I'll send a $25 Amazon gift card after we talk.}
Here's my calendar link if that's easier: [link]
— {Your name}
Ask these in order. Don't rush past the first answer to get to the next question. Let them finish.
- "What changed — either in your situation or your use of the product — around the time you stopped using it?"
- "Was there anything that almost kept you? Any point where you nearly decided to stay?"
- "What are you using instead, if anything? Even if it's just going back to how you did it before."
Take verbatim notes or record with permission. After the call: write one sentence summarizing why they left, in their words, not yours.
"Here are notes from {N} churn interviews. Each note includes: why they stopped using the product, what almost kept them, and what they switched to.{Paste notes}Identify: (1) the top 1-2 root causes of churn that appear across multiple interviews, (2) any quotes that best illustrate each cause, (3) what changed or was missing that would have kept them. Output as a brief: root cause, supporting quotes, and hypothesis for the fix."

##### Definition of done
- PostHog churn cohort is built and exported with at least 10 candidates.
- Personal outreach emails sent to all candidates (not a survey link).
- At least 5 interviews completed and recorded or noted verbatim.
- Synthesis written: 1–2 root causes named explicitly with supporting quotes.
- One-page brief handed to the pod with a fix hypothesis.
- Founder has read the synthesis.

##### Common pitfalls
- Sending a survey link instead of a personal email. Survey response rates from churned users are near zero. A personal email from a human gets 20–40% replies. The extra two minutes to personalize it is not optional.
- Asking hypothetical questions. "Would you come back if we added X?" gets polite yeses and zero signal. Focus only on what happened, not what might change their mind.
- Drawing conclusions from fewer than 5 interviews. One person's churn story is one person's story. Five is the minimum to see a pattern. Ten is better.
- Turning the interview into a re-pitch. The moment you start selling, the honest feedback stops. Save any "we're working on that" responses for after the interview questions are done.
- Not recording or taking verbatim notes. Your paraphrase of what someone said is not the same as what they said. The exact words matter when you're presenting this to the founder or the pod.
- Not feeding findings to the pod. Churn interview synthesis that stays in a doc helps no one. Write the brief and hand it off within a week of completing the interviews.

##### How to talk about it with the client
"Churned users are the most honest feedback source you have. They already made the decision — there's nothing to protect or be polite about. I'm going to reach out to 10–15 people who went inactive or canceled, ask them three questions, and come back with a synthesis of what actually drove them out. Five interviews minimum. This takes about two weeks from outreach to brief, and the findings will almost certainly change something about how we think about the product."
If they're uncomfortable reaching out to churned users: "The email is three sentences and it's not a pitch. We're asking for their honest opinion. Most people are happy to give it — especially if they left because something frustrated them. This is the cheapest source of product truth we have."

---

### 3.12 Retention & Lifecycle
Keep users engaged after signup.

#### Lifecycle email sequence
Triggered emails based on user behavior: welcome, activation nudge, "you haven't been back," milestone celebration. PO writes the logic and copy; email platform handles delivery.

##### Why this matters
Most products send one email: the signup confirmation. After that, users are on their own. Lifecycle emails are triggered by behavior — they fire when a user does (or doesn't do) something specific. A user who hasn't come back in 7 days needs a different message than one who just hit a milestone. Behavior-triggered emails outperform batch newsletters by 5–10x on click rates because they're relevant at the exact moment they arrive.
PO designs the logic and writes the copy. Email platform handles the delivery. No pod work required for the first five emails.

##### When to run it
- The product is live and has at least one defined activation event tracked in PostHog.
- There's an email platform connected — Loops.so or Customer.io. If not, set one up first; it takes 30 minutes.
- The welcome email doesn't already exist, or it exists but isn't triggered by behavior — it's just sent on signup with no logic attached.
- Not before the activation event is defined. The entire sequence is built around what "activation" means. Without that definition, the triggers are arbitrary.

##### What you'll need
- Loops.so — free tier handles the first 1,000 contacts. Simpler than Customer.io for getting started; migrate to Customer.io when you need advanced branching logic.
- PostHog → Loops integration — PostHog can push user events to Loops via webhook or their native integration. This is what makes the emails behavioral rather than time-based. Set this up before writing any copy.
- Claude — for all email copy. Use the prompts in Templates. Each email should take under 20 minutes to write with Claude.
- A defined activation event — same as the onboarding optimization playbook. If you've done that playbook, you already have this.

##### Step-by-step

###### 1. Set up Loops.so and connect PostHog
Create an account at Loops.so. Go to Settings → Integrations → PostHog. Follow the connection steps — it requires a PostHog API key and a Loops API key. Once connected, PostHog events flow into Loops as contact properties and event triggers. Test it: trigger a PostHog event manually and confirm the contact updates in Loops within 60 seconds.

###### 2. Define the five trigger conditions
Write these down before touching Loops:
- Welcome: Trigger — user completes signup. Fires immediately.
- Activation nudge: Trigger — 48 hours after signup AND user has NOT fired the activation event. This is the most important email in the sequence.
- Win-back: Trigger — 7 days after last session AND user previously activated. They got value and left. This is different from a never-activated user.
- Milestone celebration: Trigger — user fires a milestone event (10th use of key feature, first export, 30-day anniversary). Defined per product.
- Churn save: Trigger — 14 days since last session AND user is on a paid plan. Fires once, not repeatedly.

###### 3. Write copy for each email with Claude
Use the Claude prompts in Templates. Key rules for all five emails: under 100 words each, plain text preferred over HTML (higher deliverability, more personal), one link per email, one ask per email. Do not try to do multiple things in a single email.

###### 4. Build the sequences in Loops
In Loops, create a Loop for each trigger condition. Set the trigger event (PostHog event name), the delay (where applicable), and the condition check (e.g., "has NOT fired [activation event]"). Add the email copy. Turn it on for new users only initially — don't retroactively send to your entire list until you've confirmed the copy converts.

###### 5. Measure the right metrics
Open rate is vanity — it's inflated by email clients that auto-open. The metrics that matter: click rate (link in email was clicked) and reactivation rate (user came back to the product within 48 hours of receiving the email). Loops shows click rate natively. Build a PostHog cohort for reactivation: users who received the email and fired a session event within 48 hours.

###### 6. Iterate on the worst-performing email each month
Every 30 days, look at the reactivation rate across all five emails. The worst performer gets rewritten. That's the monthly cadence: one email rewritten per month, tested against the previous version. Do not rewrite all five at once — you lose the ability to attribute improvements.

##### Templates
"Write a welcome email for [product name], which [one-sentence description]. The user just completed signup. Requirements: under 80 words, subject line that doesn't say 'Welcome to [product]' (that's what everyone sends), one specific action to take right now, plain text, no feature list. The tone should sound like a founder who's excited about what the person is about to do, not a corporate SaaS company. Give me 3 subject line options and the body."
Subject: you signed up 2 days ago — did anything go wrong?
Hi {first name},
You signed up for [product name] but haven't [activation action — e.g., "connected your first account"] yet.
That usually means one of two things: life got busy, or something in the setup was confusing. Either way — [link to the specific step they need to complete] takes about 3 minutes.
If something was broken or unclear, reply to this email. I read these.
— {Founder first name}
"Write a win-back email for a user who activated [product name] 7 days ago but hasn't been back. They got value at least once. Requirements: under 70 words, don't guilt-trip them, reference one specific thing they did when they were active (I'll fill in a placeholder: {last action}), one direct link back to where they left off, subject line that creates genuine curiosity, not a 'we miss you' subject. Give me 2 variations."
Subject: before you go
Hi {first name},
You're on [plan name] but haven't been back in 2 weeks. Before your next billing date, I want to make sure [product name] is actually delivering what you needed when you signed up.
One question: what got in the way? Reply here — I'll answer personally.
— {Founder first name}
If you'd like to cancel, [cancel link].

##### Definition of done
- PostHog → Loops integration confirmed working (events flowing, tested manually).
- All five trigger conditions written down with PostHog event names specified.
- All five emails written and live in Loops, triggered correctly.
- Reactivation rate baseline set for each email after the first 30 days.
- Monthly iteration cadence established: worst-performing email rewritten each month.

##### Common pitfalls
- Measuring open rate instead of reactivation rate. Open rate tells you whether the subject line worked. Reactivation rate tells you whether the email accomplished anything. Optimize for what matters.
- Sending the activation nudge too early. Sending it at 24 hours catches users who are still active. Send it at 48 hours, and only if the activation event hasn't fired. Timing and condition both matter.
- Long emails. A lifecycle email is not a newsletter. It's a prompt. Under 100 words. One ask. One link. Every sentence that doesn't drive the action weakens the email.
- No integration between PostHog and Loops. If Loops doesn't know what users have done in the product, the triggers are just time-based blasts. The integration is what makes this behavioral, not batch.
- Retroactively sending to the full list without testing first. Turn on the sequence for new users only. Let it run for 30 days. Confirm the copy converts. Then consider whether to send to dormant users — with a different, softer message, not the activation nudge sequence.

##### How to talk about it with the client
"Right now users sign up and then we go silent. The five emails I'm building this week fire based on what users actually do — or don't do. If someone hasn't activated after 48 hours, they get a nudge. If an active user disappears for a week, they get a win-back. These emails won't feel like marketing; they'll feel like a product that notices. I'll have all five live by end of week. We'll measure reactivation rate — not opens — and iterate from there."
If they want to add more emails: "Five is enough to start. More emails mean more variables and lower learning speed. We run these five for 30 days, find the worst performer, and rewrite that one. Adding emails before optimizing the existing ones is adding noise."

---
#### Push notification strategy
Define 3–5 triggers worth interrupting someone's day. Most founders either send zero notifications or spam. PO designs the rules. Pod implements.

##### Why this matters
Push notifications are borrowed attention. When they're useful, they bring users back at the moment they're most likely to take action. When they're not, they drain the permission budget — once users opt out, they're gone. The PO's job is to define the 3–5 triggers that are worth the interruption, then spec the implementation so the pod builds exactly that and nothing else.
Most apps either send zero notifications (leaving retention on the table) or send too many marketing blasts (burning opt-in rates). Both are wrong. Design it deliberately.

##### When to run it
- The product is a mobile app or a progressive web app where push permissions are available.
- At least one "time-sensitive" or "someone-did-something" moment exists in the product. If nothing in the product is time-sensitive or social, push notifications won't have a compelling trigger.
- There is at least one activation event tracked in PostHog — the permission ask timing depends on it.
- Not on first app launch. Asking for push permission before the user has experienced any value is the fastest way to get a permanent "no." Industry benchmark for first-launch permission asks: 12–15% opt-in. After first value moment: 40–60%.

##### What you'll need
- The pod — push notifications require native implementation (iOS/Android) or a service worker (PWA). PO writes the spec; pod builds the trigger rules, permission ask flow, and deep link targets.
- PostHog — to track permission granted/denied, notification opened, notification opt-out, and retention impact on notified vs. non-notified cohorts.
- Claude — to draft notification copy for each trigger. Short copy is harder to write than long copy. Use Claude.
- A defined kill rule — any notification earning more opt-outs than opens in a 30-day window gets pulled. Write this rule before shipping.

##### Step-by-step

###### 1. Define the permission ask moment
The permission ask fires after the first activation event — not at launch, not during onboarding. The user must have experienced value first. Write the trigger event name: [activation_event]. The ask UI should explain why in one sentence: "We'll only notify you when something needs your attention — no marketing." That framing improves opt-in rates by 20–30% compared to the default OS prompt alone.

###### 2. Design the notification categories
Three categories that earn permission (users expect and want these):
- Someone-did-something: A teammate commented on your item. A client responded. Your request was approved. Social and collaborative triggers with a named actor.
- Milestone: You've hit 10 consecutive days. Your report is ready. Something the user cares about completing or achieving.
- Time-sensitive: Your session starts in 10 minutes. Your trial expires tomorrow. A deadline-linked notification where timing is the point.
Three categories that burn permission (do not build these):
- "We miss you" — generic re-engagement with no specific trigger
- "New feature" — marketing, not utility
- "Check in" — no reason, no action, just presence

###### 3. Write the 3–5 notification rules
For each notification, write a rule card: trigger event, delay (if any), copy, deep link target, and cooldown period. The cooldown is critical — the same trigger should not fire more than once per 24-hour window per user. No cooldown means a busy product turns into a spam machine.

###### 4. Write the spec for the pod
See Templates for the full spec. The spec includes all rule cards, the permission ask timing, the deep link targets (which screen each notification opens), and all PostHog events. The pod should not be designing the logic — only implementing it.

###### 5. Write notification copy with Claude
Push notification copy has hard constraints: 65 characters for the title on iOS, 240 for the body. Most effective notifications are 6–12 words in the title and one sentence in the body. The title should name the actor or the event. The body should tell the user exactly what to do. Use the Claude prompt in Templates for each notification type.

###### 6. Measure opt-out rate per notification
After 30 days, pull the PostHog data: for each notification type, what is the ratio of opens to opt-outs? A healthy notification has an open rate above 10% and an opt-out rate below 0.5% per send. Any notification with an opt-out rate above 1% gets pulled immediately. That notification is doing more damage than good.

###### 7. Measure retention impact, not just opens
The real metric is whether users who receive push notifications retain at a higher rate than those who don't. In PostHog, create two cohorts: users who have push enabled vs. users who don't. Compare 30-day retention. If push-enabled users retain at the same rate, the notifications aren't driving behavior — they're just adding noise.

##### Templates
User-facing problem: Users who've activated aren't returning at the rate they should because there's no signal pulling them back when something relevant happens.
Success metric: 30-day retention for push-enabled users ≥ 20% higher than non-enabled users. Per-notification opt-out rate below 0.5%.
Scope (in): Permission ask after [activation_event] with custom pre-prompt UI explaining the value, [3–5 notification rules listed below], deep link targets per notification, 24-hour cooldown per trigger per user.
Scope (out): Marketing notifications, "we miss you" re-engagement blasts, notification preferences UI (phase 2), notification history screen.
Notification rules:
- Rule 1: [trigger event] → [title copy] / [body copy] → deep link: [screen] / cooldown: 24h
- Rule 2: [trigger event] → [title copy] / [body copy] → deep link: [screen] / cooldown: 24h
- Rule 3: [trigger event] → [title copy] / [body copy] → deep link: [screen] / cooldown: 48h
PostHog events to instrument:
- push_permission_asked — fires when the custom pre-prompt appears
- push_permission_granted — fires on OS permission granted
- push_permission_denied — fires on OS permission denied
- push_notification_sent — fires when a notification is dispatched, with notification_type property
- push_notification_opened — fires when user taps the notification, with notification_type property
- push_opted_out — fires when user revokes permission, with days_since_grant property
"Write push notification copy for [product name]. The trigger is: [describe what happened — e.g., 'a teammate commented on the user's document']. Requirements: title under 65 characters, body under 120 characters, title names the actor or event (not the app name), body tells the user exactly what to do or what happened. The tone is direct, not marketing. No exclamation marks. Give me 3 variations of title + body."
Heading: "Stay in the loop"
Body: "We'll only send a notification when something needs your attention — like when a teammate responds or a deadline is close. No marketing, ever."
CTA: "Turn on notifications"
Dismiss: "Not now"
This screen shows before the OS permission prompt. If the user taps "Not now," wait 7 days before asking again, once only.

##### Definition of done
- Permission ask timing defined: fires after activation event, with pre-prompt copy written.
- 3–5 notification rules written as rule cards: trigger, copy, deep link, cooldown.
- Spec delivered to pod with all PostHog events listed.
- Kill rule documented: any notification with opt-out rate above 1% per 30 days is pulled without debate.
- After 30 days: opt-out rate per notification reviewed and any over-threshold notifications pulled.
- After 60 days: retention cohort comparison (push-enabled vs. not) run in PostHog and result documented.

##### Common pitfalls
- Asking for permission on first launch. The benchmark is 12–15% opt-in for first-launch asks. After value moment: 40–60%. You're leaving 25–45% of your potential notification audience on the table by asking too early.
- No cooldown period. A collaborative product with 10 active teammates can generate dozens of notification-eligible events per day. Without a cooldown, a single active user becomes a notification firehose. Set 24-hour minimum cooldowns per trigger per user.
- Measuring opens instead of retention impact. A notification with 20% open rate that doesn't improve retention is just friction. The real success metric is whether push-enabled users stay longer.
- Building marketing notifications. "We just shipped a new feature!" is not a push notification — it's an email. Push is for things that need the user's attention right now. Marketing content in push kills opt-in rates.
- No kill rule. Without a pre-committed rule for pulling bad notifications, every decision becomes political. Set the threshold before shipping: opt-out rate above 1% per 30-day window means the notification gets pulled.

##### How to talk about it with the client
"We have two options: no notifications and users forget about the product, or well-designed notifications that pull them back at exactly the right moment. The risk isn't sending notifications — it's sending the wrong ones. I'm going to define three triggers that are genuinely useful: when a teammate does something, when the user hits a milestone, and when a deadline is close. Everything else we're not building. I'll have the spec ready this week, and the pod can ship it in one sprint."
If they want to add a "we miss you" notification: "That notification has a 4% open rate and a 2.5% opt-out rate. Every time we send it, we lose some of our notification audience permanently. We're not building it. If we want to re-engage dormant users, that's a lifecycle email — not a push."

---
#### Weekly engagement review
PO pulls a PostHog dashboard showing DAU/WAU ratio, feature adoption, and session depth. One paragraph: what's working, what's not, what we're trying next week.

##### Why this matters
Without a weekly read on engagement data, every product decision is based on intuition and recency bias. The most vocal user shapes the roadmap; the silent churning majority goes unheard. A 30-minute weekly ritual — dashboard, paragraph, share — builds the discipline of reading signal from data before making bets. It also gives the founder something concrete every week: not status updates, but insight.
PO owns this entirely. No pod work required. The value is in the synthesis, not the dashboard.

##### When to run it
- PostHog is installed and firing events — at minimum, session start and the activation event.
- The product has been live for at least 2 weeks with at least 10 users. Before that, the sample is too small to be meaningful.
- Start immediately and don't stop. The value compounds: week 10 is dramatically more useful than week 1 because you can see trends, not just snapshots.
- Not a one-time audit. This is a recurring ritual, not a deliverable. If you run it once and stop, you've done nothing.

##### What you'll need
- PostHog — dashboards, cohort analysis, and session replay. Everything you need is in the free tier.
- A fixed 30-minute block each week — same day, same time. Friday morning before standup is the most common. The ritual only works if it's non-negotiable.
- A shared doc or Notion page — one page per week, with a consistent format. Three paragraphs: what's working, what's not, what we're trying next week. Nothing more.
- A pod Slack channel — to distribute the weekly read after it's written. Every team member sees the same signal.

##### Step-by-step

###### 1. Build the PostHog dashboard
Create a dashboard called "Weekly Engagement." Add four panels:
- DAU/WAU ratio — Daily Active Users divided by Weekly Active Users. A healthy product targeting daily habits (social, utility, communication) should be above 0.2. Products with weekly use patterns (reporting tools, planning tools) target 0.4–0.6 WAU/MAU instead. Set the right benchmark for your product's intended use frequency.
- Feature adoption funnel — same funnel as the onboarding optimization playbook. Signup → first key action → second key action, 7-day window.
- Retention cohort table — PostHog's built-in retention table. Shows what % of users who first did [key action] in week N came back in weeks N+1, N+2, etc. This is the most important single view in the entire dashboard.
- Session depth — average number of meaningful events per session, trended over time. "Meaningful events" means actions, not pageviews. Create a custom event group if needed.

###### 2. Learn to read the retention curve
The retention cohort table tells three different stories depending on its shape:
- The cliff: 100% in week 0, then 10% by week 1 and flat from there. Most users try once and leave. The activation funnel is broken or the product doesn't deliver on its promise. Fix activation first.
- The leak: Gradual decline across every cohort — 90%, 70%, 50%, 30%. Users are engaged but churn slowly. Usually a habit or value problem: the product is useful but not essential. Look for what the retained 30% have in common.
- The smile: Retention drops, then stabilizes and flattens. The users who stay, stay. This is the target shape. The question becomes: how do you get more users to the flattening point faster?

###### 3. Run the 30-minute weekly ritual
Block 30 minutes. Open the dashboard. In that time, write three paragraphs:
- What's working: One specific metric that improved or stayed strong this week. Why you think it moved. One sentence.
- What's not: The metric that concerns you most. What the retention curve or funnel drop says. Two sentences max.
- What we're trying next week: One specific hypothesis tied to the data. "We're testing X because the funnel shows Y." Must be specific enough for the pod to act on if it's a product change.
Do not write more than three paragraphs. Length is the enemy of readability. If nobody reads the weekly review, it doesn't exist.

###### 4. Post in pod Slack and send to the founder
Post in the pod channel every week. Share with the founder every week. No exceptions. The ritual fails if it lives only in a doc nobody visits. Paste the text directly into Slack — don't link to a doc people won't open.

###### 5. Connect findings to the next sprint
The "what we're trying next week" paragraph is the input to sprint planning. If the review identifies a retention leak, the next sprint should include a hypothesis to address it. If the funnel shows a 60% drop on screen 3, the next sprint hypothesis is about screen 3. The weekly review feeds the hypothesis portfolio — it's not a reporting exercise, it's a learning loop.

##### Templates
1. DAU/WAU ratio — Trends insight, "Daily Active Users" ÷ "Weekly Active Users." Add benchmark line at your target ratio.
2. Activation funnel — Funnels insight: user_signed_up → [activation_event] → [second_key_action], 7-day window.
3. Retention cohort — Retention insight: "Returning to [activation_event]." Set period to weekly. This generates the cohort grid.
4. Session depth — Trends insight: average of a custom action count per session. Alternatively, average session duration as a proxy if events aren't fully instrumented yet.
Save dashboard. Pin it to PostHog favorites. Open this dashboard — and only this dashboard — during the weekly review.
Week of [date]
What's working: [One specific metric + one-sentence reason. E.g., "DAU/WAU held at 0.24 this week — the activation nudge email appears to be pulling day-2 users back. Will confirm in next week's data."]
What's not: [The metric that concerns you most + what it implies. E.g., "Week-3 retention on the February cohort dropped to 18% — down from 28% on the January cohort. Users are getting value in the first two weeks but something is breaking the habit after that."]
What we're trying next week: [Specific hypothesis + action. E.g., "Hypothesis: users who haven't set a weekly goal aren't returning after week 2 because there's no pull to come back. Testing a weekly goal prompt at the end of week 1. Pod spec attached."]
Each row is a cohort: users who first activated in a given week. Each column is a subsequent week. The number in each cell is the % of that cohort who came back in that week.
Read down a column to see whether recent cohorts retain better than old ones — that tells you if your product improvements are working. Read across a row to see the shape of a single cohort's retention over time — that tells you the lifecycle of a typical user.
The most important cell: column 4 (week 4 retention). If that number is above 20%, you have a product people habitually use. Below 10% means the product hasn't yet found its habit trigger.

##### Definition of done
- PostHog "Weekly Engagement" dashboard built with all four panels.
- Weekly review block added to PO calendar — recurring, same day/time each week.
- First weekly review written and posted in pod Slack and sent to founder.
- Retention curve shape identified: cliff, leak, or smile. Written into the first review.
- At least one "what we're trying next week" hypothesis connected to a specific sprint item within the next two weeks.

##### Common pitfalls
- Writing the review but not sharing it. A weekly review that lives in a private doc affects nothing. Post it in Slack every week. If nobody reads it, make it shorter. If it's still ignored, make it one paragraph.
- Tracking the wrong "active" definition. A user who opened the app but didn't do anything meaningful is not "active." Define active as firing at least one meaningful event — an action, not a pageview. DAU built on pageviews is a lie.
- Comparing week-over-week numbers without cohort context. "DAU is down 10% this week" could mean anything. The cohort table tells you whether the drop is a new-user acquisition problem or a retention problem. Always look at the cohort table, not just the headline metric.
- Skipping the review when things look fine. The weeks when everything looks good are when you should look hardest — because the data often hides a lagging problem. The February cohort doesn't reveal its churn until March.
- Vague "what we're trying next week." "We're going to work on retention" is not a hypothesis. "We believe users who haven't set up [feature X] churn at week 3 — we're testing an in-app prompt on day 12 to drive [feature X] setup" is a hypothesis. Vague entries produce no sprint action.

##### How to talk about it with the client
"Every Friday morning I'll send you one paragraph: what the data says, what we're concerned about, and what we're testing next week. It's not a status update — it's the learning loop that feeds the roadmap. If you read it every week for two months, you'll have a clear picture of why users stay and why they leave. That picture is worth more than any feature we could build without it."
If they ask for more detail or a longer report: "The longer the report, the less gets read. Three paragraphs means you'll actually read it every week. If there's one thing you want me to dig into deeper, tell me and I'll add a section for one week only, then return to the format. Consistency is more valuable than comprehensiveness."

---

### 3.13 Distribution & Marketplace
Passive acquisition channels that compound.

#### App store optimization
Screenshots, description copy, keyword strategy, review solicitation flow. Claude drafts all the copy. PO manages the submission process.

##### Why this matters
The app stores are search engines. Most mobile app discovery happens in-store, not via the web. A listing that hasn't been optimized — with a generic description, default screenshots, and zero reviews — is leaving free downloads on the table every day. ASO (App Store Optimization) compounds: a higher conversion rate on your listing means more downloads, which improves ranking, which drives more impressions, which drives more downloads. The PO owns this because it's pure content and positioning work, not engineering.
The three things that actually determine whether someone downloads your app are: the icon, the first two screenshots, and the first line of the description. Everything else is secondary. Fix those three first.

##### When to run it
- The app is live in at least one store. Don't optimize a listing that doesn't exist yet.
- The core product is stable enough that reviews won't immediately surface critical bugs. Soliciting reviews on a broken product accelerates bad reviews, not good ones.
- You have at least 10 active users who've gotten real value from the app — these become the review seed cohort.
- Revisit quarterly — store algorithms change, competitors update their listings, and your screenshots should reflect current product UI, not the MVP from 18 months ago.
- Not yet for pure web products with no mobile app. This playbook is specifically for App Store and Google Play listings.

##### What you'll need
- App Store Connect — Apple's dashboard for managing iOS listings. Requires an Apple Developer account ($99/year).
- Google Play Console — Google's dashboard for managing Android listings. One-time $25 registration fee.
- Claude — to generate keyword variations, draft description copy, and write review response templates.
- Figma — for screenshot design. Both stores have official device frame templates available free on Figma Community — search "App Store screenshot template" or "Google Play screenshot template." No designer required.
- AppFollow or Sensor Tower free tier — for monitoring keyword rankings and competitor listings. AppFollow has a useful free tier for review monitoring.

##### Step-by-step

###### 1. Research keywords for each store separately
Apple's App Store and Google Play have different search algorithms and different keyword inputs. For the App Store, you have a dedicated 100-character keyword field (in App Store Connect, under the app's metadata) that users never see but Google's algorithm indexes heavily. Use all 100 characters. Separate keywords with commas, no spaces, no repetition of words already in the title or subtitle. For Google Play, there is no separate keyword field — keywords must appear naturally in the title, short description, and long description.
To find the right keywords: search your core problem in both stores and note what auto-complete suggestions appear. Look at the keywords in 2–3 direct competitors' listings (their title, subtitle, and description) using AppFollow or by reading manually. Use the prompt in the Templates section to generate a priority keyword list.

###### 2. Optimize the title and subtitle
For iOS: the App Store title is 30 characters and the subtitle is 30 characters. Put your most important keyword in the title — but the app name itself should still be the primary element. The subtitle is where you fit in a secondary keyword or a clear value prop. "Contractor Invoicing" as a subtitle is better than "Fast, Simple, Professional."
For Android: Google Play has a title (30 characters) and a short description (80 characters). The short description is indexed for search, so include your primary keyword here. Don't waste it on marketing copy.

###### 3. Write the description with Claude
Use the description drafting prompt in the Templates section. The first three lines of the description show before the "Read more" fold — this is what determines whether someone reads on. Lead with the specific problem you solve and the specific person it's for. Don't open with the app name or a tagline. The full description should be 250–400 words, keyword-rich but readable, and end with a clear CTA (download now, try free, etc.).

###### 4. Design the screenshots — the highest-leverage 30 minutes you'll spend
Download the official device frame templates from Figma Community. You need 5–8 screenshots for the App Store (6.5" iPhone size is required; others are optional), and 8 for Google Play. The first two are the only ones most people see. Each screenshot should have: a device showing a real screen from the app, a short headline above or below the device (5–7 words, benefit-focused, not feature-focused), and a clean background. The screenshots should tell a story in sequence — problem in frame 1, solution in frame 2, key features in frames 3–5.
No professional designer needed. Figma's free tier handles this. Two hours of work on screenshots will have more impact than weeks of other optimization work.

###### 5. Set up the in-app review prompt
Both stores provide native APIs for requesting reviews. For iOS: SKStoreReviewController.requestReview(). For Android: the Google Play In-App Review API. The dev implements the trigger; you design the trigger logic. The rule: ask after a user has experienced a clear win — not at signup, not after 3 days, not on launch. "After the user completes their third export" or "after they've used the app for 7 days and completed at least 5 sessions" are good triggers. Asking too early gets one-star reviews from users who haven't seen value yet.

###### 6. Seed initial reviews from power users
Identify 5–10 users who've gotten genuine value — they've been active for 2+ weeks, or told you the app is useful. Send each one a personal message using the template in the Templates section. Personal note, specific acknowledgment of their use case, direct ask. Don't send a mass email. A personal DM or email to 8 power users gets more reviews than a banner to 1,000 users.

###### 7. Respond to every review — especially the bad ones
Both stores show your response to reviews publicly. Responding to negative reviews professionally, acknowledging the issue and noting what was fixed, converts some 1-star reviewers to 4-star after an update. More importantly, it signals to potential downloaders that the product is actively maintained. Use Claude to draft responses — keep them short, specific, and non-defensive. Use the prompt in the Templates section.

##### Templates
```
Generate an App Store keyword list for this app:

Product: {product name}
Category: {App Store category, e.g. "Productivity" or "Business"}
Core problem solved: {one sentence}
Target user: {ICP description}

Competitor apps (list names): {competitor 1}, {competitor 2}

Generate:
1. A prioritized list of 15 keywords for the App Store 100-character keyword field
   (format: comma-separated, no spaces, total under 100 chars)
2. A list of 5 long-tail keyword phrases for the Google Play description
3. 3 options for the App Store subtitle (30 chars max each)

Prioritize keywords with clear buyer intent over generic terms. Exclude single-word
keywords with extremely high competition (e.g., "invoice," "budget").
```
```
Write an App Store / Google Play description for this app:

App name: {name}
Core problem: {one sentence}
Target user: {ICP}
Primary keyword: {keyword}
Key features (3-5): {list}
One user outcome: {specific result, e.g. "cut invoice time from 20 minutes to 2"}

Write:
1. A 3-line opening hook (no fold) — name the problem, name who has it, hint at the
   solution. First line must not start with the app name.
2. 3 short feature paragraphs (2-3 sentences each) — lead each with a benefit,
   support with the feature
3. A closing paragraph with a download CTA

Total length: 250-350 words
Include the primary keyword naturally 2-3 times
No "powerful," "intuitive," "seamless," or "best-in-class"
```
Subject: Quick favor — would you mind leaving us a review?
Hi {name},
I noticed you've been using {product name} regularly — specifically {one specific observation about their usage if available}. That means a lot at this stage.
Would you be willing to leave a quick review in the App Store? Honest feedback, whatever you actually think. It genuinely helps new users find us and helps us understand what's working.
Here's the direct link: {App Store / Play Store link}
Takes 2 minutes. I read every review personally.
— {Founder first name}

##### Definition of done
- Both store listings (iOS and Android, or whichever apply) have updated descriptions, screenshots, and keyword fields.
- The App Store keyword field uses all 100 characters.
- The first two screenshots follow the headline + device + clean background format.
- In-app review prompt is live with the right trigger logic — confirmed with the dev.
- At least 5 personal review requests sent to power users.
- A calendar reminder is set for 90 days to refresh screenshots with current UI and reassess keywords.

##### Common pitfalls
- Screenshots that show the UI without context. A screenshot of the app's interface with no headline or caption means nothing to someone who's never seen the app. Every screenshot needs a 5–7 word benefit statement. "Track every invoice in one place" beats a raw screen.
- Asking for reviews at signup. Users who haven't used the app yet give 3-star reviews because they literally have nothing to say. Trigger the review prompt after a clear win, not after install.
- Ignoring Google Play's short description field. It's indexed for search. Founders and POs leave this as the default or use it for a tagline. Put your primary keyword here.
- Not responding to bad reviews. A negative review with no response looks like you don't care. A response that says "fixed in version 2.4, would love you to try it again" shows the product is alive.
- Using the same screenshots for both stores. App Store and Google Play have different dimension requirements and different user expectations. The same creative often looks wrong in both stores. Build separate screenshot sets.

##### How to talk about it with the client
"The app store listing is the product's storefront, and right now it's probably doing less work than it could. The three things that drive downloads are the icon, the first two screenshots, and the first line of the description — and each one is a pure content and design task with no dev work. I'll handle the copy with Claude, build the screenshots in Figma using the free templates, and get the keyword fields populated. Then we'll ask 8 of your most active users to leave reviews. That's the whole program. The ongoing piece is responding to reviews — takes 10 minutes a week."
If they say "we don't have design resources": "The screenshots don't require a designer. The app stores publish official Figma templates — you add the device frame, paste in a screenshot of the current UI, and add a headline. I can walk through this myself."

---
#### Integration directory listings
If the product connects to other tools, get listed in their marketplaces (Zapier, HubSpot, Shopify app store, etc.). Each listing is a passive acquisition channel.

##### Why this matters
Your ICP already uses other tools. If your product connects to those tools — or could — the marketplaces those platforms maintain are passive acquisition channels that work without you. A Zapier listing reaches millions of users who are actively looking for automations. A HubSpot app listing reaches every HubSpot admin who searches for a solution to their problem. Being listed where buyers already are is faster and cheaper than driving buyers to where you are.
These listings also function as credibility signals. A product listed in the Zapier marketplace looks more legitimate than one that isn't. Buyers notice.

##### When to run it
- The product has a working API, webhook, or native integration with at least one major platform in the ICP's stack.
- The product is stable enough that new users acquired from these listings won't immediately hit breaking bugs.
- You know which tools your ICP uses. If you don't know their stack, do user interviews first — then come back to this.
- Zapier nearly always applies. If the product has any data that could be sent or received, a Zapier integration is worth building and listing. It signals ecosystem compatibility even before a direct integration exists.
- Not yet if the product has no integration capability at all. Some listings require a working integration to get approved — don't submit a listing for an integration you haven't built yet.

##### What you'll need
- Zapier Developer Platform — free to publish. Requires a working REST API with authentication. Submit at developer.zapier.com. Review takes 1–3 weeks.
- HubSpot App Marketplace — requires a working OAuth app and HubSpot developer account (free). Submit at developers.hubspot.com/docs/app. Review takes 2–4 weeks.
- Shopify App Store — for ecommerce-adjacent products. Higher bar: requires a polished app with proper Shopify billing integration, review of 5–10 test orders. Most time-intensive of the major directories.
- Slack App Directory — for collaboration tools. Requires a working Slack app with OAuth. Slack reviews for security and UX quality. Submit at api.slack.com/start/distributing.
- Claude — to draft listing copy, descriptions, and email outreach to directory partnership teams.
- High-quality screenshots — most directories require 3–5 screenshots of the integration in use. Use Figma or Loom to capture these cleanly.

##### Step-by-step

###### 1. Map which directories matter for your ICP
Not every directory is relevant. Before building anything, confirm that your ICP uses the platform. Quick tests: check 5 recent user interviews — what tools did they mention? Search "{platform name}" in your CRM or customer records. The directional answer is usually obvious. Zapier applies to almost every B2B SaaS product. HubSpot applies if the ICP is in sales or marketing. Shopify applies if the ICP is in ecommerce. Slack applies if the ICP's team coordination happens in Slack. Start with two — the one with the most ICP overlap, and Zapier.

###### 2. Check the integration bar for each directory
Directories vary in what they require before you can list:
- Zapier — needs a working trigger and/or action via your API. The integration itself is built in Zapier's developer platform, not in your codebase (though your API must support it). Estimate: 1–3 dev days to build a basic integration.
- HubSpot — needs a working OAuth app with at least one core use case (sync contacts, log activities, etc.). Estimate: 3–5 dev days.
- Shopify — the highest bar. Requires meeting Shopify's UX and billing standards. Estimate: 2–4 weeks of dev work for a polished submission.
- Slack — needs OAuth and a clear user workflow. Estimate: 2–4 dev days for a simple integration.
PO's role: confirm with the pod whether each integration is feasible, scope the dev work, and add it to the backlog with a clear hypothesis ("being listed in HubSpot App Marketplace will drive 20 qualified trials per month"). Don't build the integration without validating the hypothesis first.

###### 3. Write the listing copy with Claude
Use the copy prompt in the Templates section. Each listing needs: a short description (usually 150–200 characters), a long description (400–600 words), 3–5 screenshots, and a category selection. The short description is the headline — it determines whether someone clicks. The long description needs to answer: who is this for, what problem does it solve, what does the integration specifically do, and how do I set it up? Write for the buyer who's comparing 6 listings in a category.

###### 4. Build the screenshots
Screenshots for directory listings should show the integration in action — not the app UI in isolation. For a Zapier listing: a screenshot of a sample Zap (the automation setup flow) and a screenshot of the outcome (the data appearing in the connected tool). For HubSpot: the product's data visible inside HubSpot. For Slack: the notification or command appearing in a Slack channel. These screenshots answer the question "what does this actually look like when it works?" — which is the primary question a buyer has.

###### 5. Submit and wait — but do it now
Review timelines are real: Zapier takes 1–3 weeks, HubSpot 2–4 weeks, Shopify can be months. Submit as soon as the integration meets the minimum bar. You can update the listing copy and screenshots after approval. Don't wait for the listing to be "perfect" — get it through review and in front of buyers, then improve it.

###### 6. Track signups by source from each listing
Add UTM parameters to the CTA link in each directory listing:
- Zapier listing: ?utm_source=zapier&utm_medium=directory&utm_campaign=listing
- HubSpot listing: ?utm_source=hubspot&utm_medium=directory&utm_campaign=listing
Track these in PostHog or whatever analytics tool the product uses. Quarterly, review which directories are actually driving signups and which ones aren't. Refresh listings that aren't converting — the copy or screenshots may need updating.

###### 7. Ask to be featured
Each directory has a curation team that selects "featured" or "spotlight" products. Being featured dramatically increases visibility. After 60–90 days in a directory with positive reviews or notable growth, email the partnership team directly — find the contact in the developer docs or by emailing the directory's support. Use the outreach template in the Templates section. Most teams are receptive to products with clean UX and an active install base. Ask once; don't pester.

##### Templates
```
Write the copy for a {Zapier / HubSpot / Shopify / Slack} directory listing.

Our product: {product name} — {one-sentence description}
The integration: {what it does — e.g. syncs new contacts from ProductName into HubSpot automatically}
Target user: {who finds this listing and what they're trying to solve}
Key use cases (2-3): {list them}

Write:
1. Short description (150 characters max) — lead with the outcome, not the feature
2. Long description (400-500 words):
   - Opening paragraph: who this is for and what problem it solves
   - "What you can do" section: 3-4 bullet points of specific use cases
   - "How to set it up" section: 3-step summary
   - Closing paragraph with a soft CTA
3. 3 screenshot caption options (under 80 characters each)

Avoid: "powerful," "seamless," "robust," "game-changing"
Write for a buyer who is comparing this listing to 5 others
```
Subject: {ProductName} — featured app consideration for {Directory Name}
Hi {directory partnership team name or "team"},
{ProductName} has been listed in the {Directory Name} marketplace for {X weeks/months}. Since listing, we've had {X} installs and {X} active integrations running — {brief context on growth or notable customers if relevant}.
We'd love to be considered for a featured or spotlight placement. I'm happy to provide additional screenshots, a demo video, or a customer case study if that would help the review.
Would it make sense to connect with someone on your partnerships team?
— {Founder first name}, {product name}

##### Definition of done
- At least two directory listings are live and approved (not pending review).
- Each listing has a custom UTM link so signups from that source are tracked.
- PostHog (or the product's analytics tool) shows data flowing from at least one directory source.
- A quarterly calendar reminder is set to refresh screenshots and copy.
- Featured listing outreach is sent to at least one directory after 60 days of being live.

##### Common pitfalls
- Building the integration before validating the hypothesis. A Zapier integration is 1–3 dev days. HubSpot is more. Before committing dev time, confirm with 5 current users that they actually use the platform you're integrating with and that the integration would change their behavior.
- Generic listing copy that doesn't name the buyer or the workflow. "A productivity tool for teams" is not a listing description. "Automatically sync your {product name} tasks into HubSpot when a deal moves to Closed Won" is. Specificity wins.
- Listing with broken screenshots or a broken demo flow. Directory teams test integrations before approval. A broken flow means rejection, resubmission delay, and a bad first impression. Test the full integration end-to-end before submitting.
- Not tracking which directory drives signups. Without UTM parameters, you'll have no idea which directories are worth maintaining. "We have five listings" is not a traction measurement. "Our Zapier listing drove 40 signups last quarter" is.
- Submitting to every directory regardless of ICP fit. Listing everywhere wastes dev time on integrations nobody uses and creates maintenance overhead. Prioritize ruthlessly based on where the ICP actually lives.

##### How to talk about it with the client
"Your buyers are already in Zapier, HubSpot, or Shopify — depending on what they do. Getting listed there means you're visible at the moment they're looking for a tool like yours, without buying a single ad. The listing does the work 24/7. The upfront cost is a dev sprint for the integration and a few hours for the copy. After that it's low maintenance. I'll confirm with you which directories actually matter for our ICP before we build anything — we're not listing everywhere, just where the buyers are."
If they're nervous about the dev cost: "Zapier is the lowest-bar entry point. If your product has a basic API, a Zapier integration is usually 1–3 dev days. Let's start there, measure signups for 60 days, and if it works we expand to the next directory."

---
#### Aggregator/review site presence
G2, Capterra, Product Hunt collection pages. PO creates the profiles, seeds with early reviews. Pure hustle, no dev work.

##### Why this matters
B2B buyers check G2 and Capterra before they buy. Consumer buyers check Trustpilot. Early-stage founders often think review sites are irrelevant until an enterprise prospect's procurement team sends a questionnaire that includes "do you have G2 reviews?" Being absent from these sites doesn't mean buyers aren't looking for you — it means they find nothing and move on. Creating and seeding these profiles is pure hustle with no dev work and no ad budget. A profile with 8 honest reviews outperforms a profile with 0 every time.

##### When to run it
- The product has been used by at least 10 people who've gotten real value from it. You need a review seed cohort before this playbook does anything.
- The product is in a category that buyers research on these platforms. Most B2B SaaS is. Most consumer apps are not — consumers don't check Capterra before downloading a recipe app.
- Product Hunt launch timing: do this when you have something real to show — a working product with screenshots, not just a landing page. Product Hunt's community is early-adopter tech-savvy — if the product has genuine early traction, it will perform. If it's vague, it won't.
- Not yet if the product is genuinely pre-launch with no users. Seeding a review profile with fake or placeholder reviews will backfire when the platform audits them.

##### What you'll need
- G2 — free to create a vendor profile. Dominant for B2B SaaS, especially mid-market. Buyers search G2 before shortlisting. Claiming your profile is 20 minutes; seeding takes longer.
- Capterra — free profile, owned by Gartner. Used heavily by SMB buyers and procurement teams. Similar process to G2. Both are worth having.
- Product Hunt — free. Critical for early traction signals, developer and tech audiences, and investor visibility. A Product Hunt launch is an event — it requires coordination, not just profile creation.
- Trustpilot — for consumer or prosumer products where users care about service reputation. Free tier exists; more useful once you have 20+ reviews.
- Claude — to draft the review request messages, profile descriptions, and review response copy.
- 10 power users with real email addresses — the review seed cohort. These cannot be colleagues, investors, or the founder's friends. They need to be actual product users.

##### Step-by-step

###### 1. Claim the profiles on G2 and Capterra
Go to g2.com and search for the product name. If a profile exists (sometimes G2 creates stubs automatically from public data), claim it. If not, create a new vendor profile. Fill in every field: company description, category selection, pricing model, website URL, logo, and screenshots. Incomplete profiles look abandoned and don't rank in category search results. Capterra works the same way — go to capterra.com/vendors and follow the same process. Both platforms take 24–72 hours to approve new profiles.

###### 2. Write the profile descriptions with Claude
Use the description prompt in the Templates section. The G2 product description is 1,000 characters max — use all of it. Write for a buyer who is comparing 5 tools in the same category. Name the specific problem, name the specific person with the problem, and name the outcome they get. The category selection matters: choose the most specific category that applies, not a broad umbrella category. Being in a smaller category means less competition for visibility.

###### 3. Upload screenshots — current ones, not from the beta
Both G2 and Capterra allow 10+ screenshots. Upload 5–8. The first screenshot is shown in category listings — make it your best one. Screenshot guidelines: show the core workflow, use real data (not empty states), and caption each screenshot with a benefit statement. If the UI has changed since the last screenshots were uploaded, update them. Stale screenshots signal a neglected product.

###### 4. Identify 8–10 power users for the review seed
These are users who've been active for at least 2 weeks, have completed a meaningful workflow in the product, and ideally have told you (in writing or in conversation) that the product is useful. Keep a list. Do not ask your entire user base in a mass email — that produces a mix of genuine and hollow reviews, and it's easy for platforms to detect. Personal messages to real users who've gotten value are the ones that stick.

###### 5. Send the review request — personally, not in bulk
Use the review request template in the Templates section. Send individually, from the founder's email (not a no-reply address), with one specific reference to how that user has used the product. The timing matters: send the request within 24 hours of a clear win moment — right after a user completes their first export, closes their first sale, or sends their first report. That's when the value is freshest and the impulse to share is highest.
Don't incentivize reviews. G2 and Capterra prohibit incentivized reviews, and platforms audit for patterns. Ask honestly, accept the result.

###### 6. Run the Product Hunt launch as a coordinated event
Product Hunt launches are a sprint, not a passive profile creation. The launch day requires coordination:
- Submit the product the night before (midnight PT) so it appears in the day's listings from the start.
- Notify your waitlist, LinkedIn connections, and Slack communities of early users in the morning.
- Have the founder respond to every comment on Product Hunt throughout the day — Product Hunt's algorithm favors products that generate conversation.
- Ask 5–10 real users to upvote and leave a comment with their genuine experience — not a mass ask, a personal one.
- The goal is Top 5 for the day. Top 5 products get featured in Product Hunt's daily email to 500,000+ subscribers.

###### 7. Respond to every review on G2 and Capterra
Both platforms allow vendor responses to reviews. Respond to every review — positive and negative. For positive reviews: thank them and call out one specific thing they mentioned. For negative reviews: acknowledge the issue, say what's been fixed if anything has, and offer to connect. Use the response templates in the Templates section. Buyers read vendor responses as carefully as reviews — a professional response to a 2-star review shows a company that takes feedback seriously.

###### 8. Maintain the listings quarterly
Set a quarterly calendar reminder to: update screenshots if the UI has changed, refresh the product description if the positioning has shifted, solicit 3–5 new reviews from recent power users, and check if the category selection still fits (categories in G2 and Capterra evolve). A listing that was created once and never touched looks like a dead product.

##### Templates
```
Write a G2 product description for this product.

Product name: {name}
Category: {e.g. "Project Management Software" or "Invoice Management"}
Core problem solved: {one sentence}
Target buyer: {ICP description — role, company size, situation}
3 key outcomes users get: {list}
Pricing model: {free trial / freemium / paid-only / etc.}

Write a description (900-1000 characters) that:
- Opens with the specific problem and who has it
- Describes what the product does in plain language
- Lists 3 specific outcomes (not features)
- Ends with a one-sentence invitation to try it

No jargon. No "powerful," "intuitive," or "seamless."
Write for a procurement manager who is comparing this to 4 competitors.
```
Subject: Would you share your honest take on {product name}?
Hi {name},
I noticed you {specific observation — e.g. "ran your third reconciliation using {product name} last week"}. That's exactly what the product is built for, and it's great to see it working for you.
Would you be willing to leave a short, honest review on G2? Takes about 5 minutes and genuinely helps other {ICP role}s who are trying to figure out whether {product name} is right for them.
Here's the direct link: {G2 review link}
There's no wrong answer — your honest experience is what matters.
— {Founder first name}
```
Write a vendor response to this {G2 / Capterra} review.

Review text: {paste the review}
Star rating: {1-5}
Product name: {name}

For positive reviews (4-5 stars): 3-4 sentences. Thank them, reference one specific
thing they mentioned, note one upcoming improvement that's relevant to their use case.

For negative reviews (1-3 stars): 4-5 sentences. Acknowledge the specific issue,
don't be defensive, say what was fixed or is being addressed, and offer a direct
path to resolution (email address or support link).

Tone: professional, warm, and direct. Not corporate. Not robotic.
No "we're sorry you feel that way." No "we strive to."
```

##### Definition of done
- G2 and Capterra profiles are live, fully filled out, with screenshots uploaded.
- At least 5 genuine reviews are live on G2 (the minimum for a star rating to display).
- Product Hunt profile is live — or a launch has been completed if this is a launch moment.
- All existing reviews have a vendor response.
- A quarterly calendar reminder is set to refresh screenshots and solicit new reviews.

##### Common pitfalls
- Asking for reviews in a mass email blast. G2 and Capterra audit for review velocity anomalies. Ten reviews appearing in one day from a mass email looks suspicious and may result in reviews being removed or the profile being flagged. Personal outreach to 8–10 power users over 2–3 weeks is the right pace.
- Asking colleagues, investors, or friends for reviews. These platforms ask reviewers to verify their identity and usage. Fake or inflated reviews are removed and sometimes result in profile penalties. Ask real users only.
- Creating a Product Hunt profile without coordinating the launch. Product Hunt profiles that aren't actively launched go nowhere. If you're going to be on Product Hunt, run the launch as a coordinated event — not a passive profile creation.
- Not responding to negative reviews. A 2-star review with no vendor response tells buyers the company doesn't pay attention. A 2-star review with a thoughtful response that notes what was fixed tells buyers the company cares. Respond to every review within 48 hours.
- Stale screenshots and an outdated description. A profile that was last updated 18 months ago looks like abandoned software. Set the quarterly refresh reminder and keep it.
- Skipping Capterra if you've already done G2. They're both worth having. Different buyers use different platforms, and having both means you cover more search surface. The marginal effort to maintain both after the initial setup is minimal.

##### How to talk about it with the client
"Your buyers are checking G2 before they shortlist you. If there's no profile, or there's a profile with zero reviews, that's a trust gap — especially in mid-market B2B where procurement teams do structured vendor evaluations. Creating the profile takes a day. Getting 8 real reviews takes 2 weeks if we're deliberate about who we ask and when. After that, the profile works for you passively. I'll draft all the copy with Claude and handle the outreach templates — I just need you to send the review requests from your own email so they come from a real human."
If they're worried about bad reviews: "Honest reviews — including ones that name a problem — are better than no reviews. A product with 12 reviews averaging 4.2 stars is more trusted than a product with no reviews. And a critical review that you've responded to thoughtfully actually builds trust. Buyers know no product is perfect. They want to see how the company handles it."

---

### 3.14 Investor & Stakeholder Readiness
Package the product & data for external audiences.

#### Metrics dashboard for investors
A one-page view of the numbers that matter: activation rate, retention curve, revenue, growth rate. PO builds this in PostHog or a simple Astro page. Updated weekly.

##### Why this matters
Investors don't fund pitches — they fund trajectories. A metrics dashboard that's always current shows momentum before a meeting starts. Founders who send a Loom walkthrough of a live dashboard once a month get more replies, more trust, and faster closes than founders who scramble to pull numbers before a call.
The PO owns this because someone has to. Left to founders, it either never gets built or gets built once and goes stale. It's a weekly discipline, not a one-time artifact.

##### When to run it
- The product is live and has any measurable activity — even 20 signups is enough to start building the habit.
- Investor conversations are beginning or likely within 90 days.
- The founder can't answer "what's your activation rate?" off the top of their head. That's the sign the dashboard is overdue.
Do not wait until a VC asks for the numbers. By then it's too late to have clean data with history. Start tracking now so the chart has a meaningful trend line when it matters.

##### What you'll need
- PostHog — already installed on the product. You'll build the dashboard here and optionally share a public link.
- Astro — if you want a custom-branded one-pager that pulls numbers manually or from an API. Only needed if PostHog's public share isn't clean enough for investor presentation.
- A metrics decision doc — a one-page list of which 5–8 metrics this product tracks and why. Without this, the dashboard grows into a wall of numbers that tells no story.
- Loom — for the monthly walkthrough video. Free tier is sufficient.

##### Step-by-step

###### 1. Pick the right metrics for the stage
The metrics that matter depend on where the product is. Pick 5–8 maximum — a dashboard with 20 metrics is not a dashboard, it's a data dump.
Pre-revenue (waitlist / early beta):
- Total signups + weekly signup growth rate
- Activation rate (% of signups who completed a key action)
- Week 1 and Week 4 retention
- Waitlist-to-active conversion rate
Revenue stage:
- MRR + month-over-month growth rate
- Net Revenue Retention (NRR)
- Churn rate
- CAC and LTV (once channels are proven)
Document the chosen metrics in a one-pager. Show it to the founder. If they disagree, resolve it before building anything.

###### 2. Build the PostHog dashboard
In PostHog: Dashboards → New Dashboard. Add one insight per metric. For each insight:
- Name it exactly as the metric appears in your doc — "Week 1 Retention," not "Event cohorts – chart 3"
- Set the date range to "last 90 days" by default so there's always trend context
- Add a text block at the top of the dashboard with the product name, the update date, and a one-sentence description of the current stage

###### 3. Make it shareable
In PostHog: Dashboard settings → Share. Enable the public share link. This gives investors a live URL they can bookmark — the numbers update in real time without you sending new screenshots. Test the link in an incognito window to confirm it's readable without login.
If the public PostHog link exposes data you don't want visible (raw user emails, etc.), build a clean Astro page instead with manually curated numbers. Keep it simple — a static page updated weekly beats a complex integration.

###### 4. Set the update cadence
Weekly minimum. Pick a day — Monday morning works well, before the week starts. Block 30 minutes in the calendar. The update tasks are:
- Check all charts are displaying correctly and the date range is current
- Add a text annotation if something significant happened that week (product launch, a campaign, a spike or drop)
- Update the "as of" date on any static elements
If the dashboard goes stale, investors will notice the timestamp before they notice the numbers.

###### 5. Don't hide bad numbers
If retention dropped, show it. If growth flatlined, show it. Add a text block explaining what happened and what you're doing about it. Investors have seen every type of bad number — what they're evaluating is whether the team understands their own data and has a response. Omitting a bad metric looks worse than the metric itself.

###### 6. Send a monthly Loom walkthrough
On the first Monday of each month, record a 3–5 minute Loom: share your screen on the dashboard, walk through each metric, say what moved and why, and name one specific thing you're testing next month. Send it to every active investor conversation. Founders who do this consistently get funded faster — investors see momentum, communication style, and self-awareness in one video.

###### 7. Tie the numbers to the fundraise narrative
Whatever metric is growing most clearly becomes the headline of the pitch. If weekly signups are up 20% week-over-week, that's the lead. If activation rate is 68% when the industry benchmark is 40%, that's the lead. The dashboard isn't just a tracking tool — it tells you what the narrative should be. Update the deck to match whatever the dashboard is saying.

##### Templates
Product: [name]
Stage: [pre-revenue / early revenue / growth]
Metrics we track (pick 5–8):
1. [Metric] — why it matters: [one sentence]
2. [Metric] — why it matters: [one sentence]
3. [Metric] — why it matters: [one sentence]
Metrics we are NOT tracking yet and why: [e.g., LTV — too early, no revenue yet]
Update cadence: Weekly, every Monday
Owner: [PO name]
"Quick update on [product] — this is [month]. I'm walking through the metrics dashboard live."
"Signups: [number], up [X]% from last month. The driver was [specific activity]."
"Activation rate: [X]%. [Higher/lower] than last month — [one sentence on why]."
"Retention at week 4: [X]%. [Context if relevant]."
"One thing we're watching: [metric] isn't where we want it. Here's what we're testing: [specific change]."
"Next month we're focused on [one specific hypothesis]. I'll have results on that in the next update."
Total: under 4 minutes. Don't script it word for word — hit those points and stop.

##### Definition of done
- Metrics decision doc written — 5–8 metrics chosen with rationale, founder has approved.
- PostHog dashboard built with named insights for each chosen metric.
- Public share link tested and confirmed accessible without login.
- Weekly update cadence blocked in the calendar with a named owner.
- First monthly Loom recorded and sent to at least one active investor conversation.
- Dashboard link included in pitch deck and investor email templates.

##### Common pitfalls
- Too many metrics. A dashboard with 20 charts tells no story. Pick the 5–8 that matter most for the current stage. Add more only when the core metrics are healthy and you need more depth.
- Letting it go stale. An investor who clicks a live dashboard link and sees data from 6 weeks ago immediately questions your attention to operations. The weekly update is non-negotiable.
- Hiding bad numbers. VCs have seen hundreds of dashboards. They notice gaps. A missing retention chart is more suspicious than a bad retention chart with an explanation.
- Not tying dashboard to narrative. A dashboard full of green numbers that doesn't connect to a clear story doesn't move a conversation forward. Know which metric is your headline before every investor meeting.
- Building it too late. Starting the dashboard when a VC asks for numbers means you have no historical trend. Trend lines are what create conviction. Start now, even if the numbers are small.

##### How to talk about it with the client
"We're building a live metrics dashboard — not because investors will ask for it, but because having it forces us to know our own numbers cold. It takes one afternoon to set up. Once it's live, you have a URL you can drop into any investor email: 'here's the live dashboard.' No scrambling before meetings, no making up numbers on the fly. And the monthly Loom walkthrough makes you look like the most organized founder they've talked to all month."
If they worry about showing bad numbers: "Every early-stage founder has bad numbers somewhere. What VCs are watching for is whether you understand them and have a clear hypothesis about how to move them. A bad metric with a good explanation is a sign of a coachable founder. A missing metric is a red flag."

---
#### Technical due diligence prep
Architecture documentation, test coverage report, dependency audit. Pod generates this; PO packages it. Becomes critical when a Series A firm sends their technical advisor.

##### Why this matters
Series A firms send a technical advisor before they close. That person has 48 hours to assess the codebase, infrastructure, and engineering practices. If the documentation doesn't exist, the review is slow and impressions are poor. If red flags surface that a prepared founder could have addressed, the deal can stall or reprice.
The PO's job is not to write the technical content — that's the pod's job. The PO packages it into something a non-technical partner and a technical advisor can both read without a guided tour.

##### When to run it
- VC conversations have gone past the first pitch — term sheets are possible within 90 days.
- A warm intro to a Series A or B firm is in progress.
- The founder is starting to talk to angels who have technical backgrounds.
Do not wait until a firm asks for technical documentation. By then you have days, not weeks. The prep takes 2–3 weeks to do well. Start when conversations get serious, not when they get urgent.

##### What you'll need
- SonarQube (Community Edition, free) — static analysis tool that generates a code quality and test coverage report. Pod runs this; PO reads the output and packages it.
- Internal architecture documentation — may or may not exist. If it doesn't, the pod writes it as part of this process.
- Infrastructure access — to document hosting, deployment process, and uptime history. Pod provides this; PO structures it.
- A dependency audit — a list of third-party services and packages the product depends on, with notes on licensing and support status. Pod generates it; PO reviews it for obvious risks.
- Claude — for rewriting technical content into plain language for the executive summary.

##### Step-by-step

###### 1. Start before you're asked
When the founder says "we're in conversations with [firm name]," this playbook starts. Create a shared folder called "Tech Due Diligence — [Product Name]." Tell the pod it's coming. Give them two weeks to generate the technical artifacts before you package them.

###### 2. Request the technical artifacts from the pod
Send this list to the tech lead. Each item needs a specific output format:
- Architecture diagram — a single diagram showing how the components connect: client, API, database, third-party services. Excalidraw or Lucidchart. No walls of text.
- Dependency list — every third-party service the product depends on, with: what it does, the pricing tier, contract terms if any, and what happens if it goes down or raises prices.
- Test coverage report — generated by SonarQube or the test runner. Percentage of code covered by automated tests. If it's low, the pod should note what's covered and what isn't.
- Security overview — authentication method, how user data is stored, encryption at rest and in transit, who has access to production credentials.
- Scalability story — current bottlenecks, what breaks first when load increases 10x, and the plan for addressing it.
- Hosting and infrastructure summary — where it's hosted, which regions, uptime SLA, deployment process, last 90 days of incident history.

###### 3. Review for red flags before packaging
Read every artifact the pod provides. You're not checking technical correctness — you're checking for red flags that will alarm a technical advisor. Common ones:
- Zero automated tests or test coverage under 20%
- Single-region deployment with no failover
- No monitoring or alerting on the production environment
- Key-person risk: one engineer is the only person who understands or can deploy the infrastructure
- Critical dependencies on services with no enterprise SLA (free tiers of infrastructure tools)
- No documented incident response process
Flag these to the founder before the diligence call. A known risk with a remediation plan is much better than a surprise. Ask the pod to address the most critical ones before packaging.

###### 4. Write the 1-page executive summary
Use Claude to help translate the technical content. The exec summary goes at the front of the package and is written for a non-technical partner. It answers four questions in plain language:
- What is the product built on? (tech stack in one sentence)
- Where does it run? (infrastructure in one sentence)
- How stable and secure is it? (one honest paragraph)
- What are the known risks and what's the plan? (bullet points, no spin)
Keep it to one page. The technical appendices contain the detail. The exec summary tells a reader whether to read the appendices.

###### 5. Assemble the full package
Structure: Executive Summary (1 page) → Architecture Diagram → Dependency List → Test Coverage Report → Security Overview → Scalability Story → Infrastructure Summary → Appendices (raw SonarQube output, deployment scripts, etc.).
Export as a single PDF. Name it: TechDD-[ProductName]-[Month Year].pdf. Put it in the shared folder. Share the folder link, not individual files.

###### 6. Set up the 30-minute technical advisor call
When the VC sends their technical advisor, the PO schedules the call. The CTO or tech lead presents — the PO is there to manage the meeting, not to answer technical questions. Send the package 48 hours before the call so the advisor can prepare questions. The call agenda: 10 minutes for the advisor to ask anything from the package, 10 minutes for a live walkthrough of one area they want to dig into, 10 minutes for questions about the roadmap and technical debt.

###### 7. Update after the call
After the call, the advisor will often note gaps or questions. Document them. If the advisor asked about something that wasn't in the package, that goes in the next version. The package is a living document — update it quarterly even when diligence isn't active.

##### Templates
Send this to the tech lead when starting the process:
"We're preparing technical due diligence documentation. I need the following by [date — 2 weeks out]:"
1. Architecture diagram (Excalidraw or Lucidchart) — components and how they connect
2. Dependency list — every third-party service/package, what it costs, what happens if it fails
3. Test coverage report — run SonarQube Community Edition, export the summary
4. Security overview — auth method, data storage, encryption, credential access
5. Scalability story — what breaks first at 10x load and the mitigation plan
6. Infrastructure summary — hosting provider, regions, deployment process, last 90 days incidents
"I'll package and write the executive summary. You own the technical content."
"I'm writing a 1-page technical due diligence executive summary for a non-technical VC partner. The audience has read hundreds of these — they can handle honest language about risk. Here are the technical artifacts from our engineering team: [paste architecture summary, dependency notes, and infrastructure summary] Write a 4-paragraph executive summary that answers: 1. What is the product built on? (tech stack, one sentence) 2. Where does it run? (infrastructure, one sentence) 3. How stable and secure is it? (one honest paragraph — include both strengths and known gaps) 4. What are the known technical risks and what's the plan? (bullet list, no spin) Tone: direct, factual. No marketing language. If something is a risk, name it as a risk."

##### Definition of done
- All six technical artifacts received from the pod and reviewed for red flags.
- Critical red flags escalated to the founder and addressed (or documented with a remediation plan) before packaging.
- 1-page executive summary written in plain language, reviewed by the founder.
- Full package assembled as a single PDF in the shared folder.
- Package sent to the technical advisor 48 hours before the diligence call.
- Post-call gaps documented and scheduled for the next quarterly update.

##### Common pitfalls
- Starting when the firm asks for it. You have days, not weeks, at that point. The package takes 2–3 weeks to do properly. Start when conversations get serious.
- PO trying to write the technical content. The pod writes the technical artifacts. The PO structures, translates, and packages them. If you write the architecture diagram without the tech lead's input, it will have errors that come out in the call.
- Hiding red flags. Technical advisors find things. If they find something you knew about and didn't disclose, the trust hit is worse than the underlying issue. Acknowledge known risks and show the plan.
- No executive summary. A technical advisor needs the appendices, but a non-technical partner needs the one-pager. Without it, the package is inaccessible to half the people reading it.
- Key-person risk uncovered live on the call. If there's one engineer who knows where everything is and they're not on the call, that's a red flag that surfaces at the worst time. Surface it in the security overview and address it proactively.
- Never updating the package. A package from 18 months ago that doesn't reflect the current architecture is worse than no package — it creates contradictions between the document and reality. Update quarterly.

##### How to talk about it with the client
"Series A firms send a technical reviewer. That person has 48 hours and a checklist. If the documentation doesn't exist, they spend their time extracting basic information instead of validating the architecture. We can make that call much smoother by having the package ready before they ask. I'll coordinate with the pod to pull the technical content — your job is to review the exec summary and make sure the known risks are described honestly."
If they're worried about exposing technical debt: "Every Series A company has technical debt. What investors are checking is whether the team knows what it is and has a plan. A codebase with 40% test coverage and a clear remediation roadmap reads better than one with undisclosed gaps. Own it in the document, don't hide it."

---

### 3.15 Compliance & Trust
The boring stuff that becomes a blocker when a real buyer shows up.

#### Privacy policy & terms of service
Claude drafts, founder's lawyer reviews. Most MVPs ship without these, then a B2B prospect's procurement team asks and it becomes a blocker.

##### Why this matters
A B2B prospect's procurement team will ask for a privacy policy and terms of service before they sign anything. When that moment arrives — and it arrives fast once you're past seed-stage conversations — not having them is a blocker, not a minor annoyance. It can kill a deal that took three months to close.
Beyond procurement, privacy policies are legally required in most jurisdictions the moment you collect any personal data. "We'll add it later" is not a strategy — it's a liability that grows every day you have users.

##### When to run it
- Before your first B2B prospect's procurement team asks — typically months 2–3 after launching with any real users.
- Before running any paid advertising (Meta and Google require a privacy policy linked from ads).
- Before adding any third-party data processor that handles user data in a meaningful way (Stripe, PostHog, any AI API).
When NOT to rush it: Don't ship a Claude-only draft without lawyer review to a live product with paying customers. Claude can get you 80% there in 20 minutes. The remaining 20% requires a lawyer, and that 20% is where liability lives.

##### What you'll need
- Claude — to draft both documents. Claude produces a startup-appropriate first draft that covers the basics. It is a starting point, not the final doc.
- A lawyer — to review the Claude draft before it goes live on a product with real users. A startup-focused attorney can review and adjust a Claude-generated draft in 1–2 hours. Budget $200–500 for this depending on your market.
- A complete list of your third-party services — every service that touches user data must be disclosed. See the checklist in the Templates section.
- A /privacy and /terms page on the product domain — same domain the product is on, not a Google Doc link.

##### Step-by-step

###### 1. Inventory all third-party services that touch user data
Before Claude can draft anything useful, you need a complete list of what data you collect and where it goes. Open the codebase with the pod or review the infrastructure docs. Common services that affect what goes in the privacy policy:
- PostHog — collects user events and session data (EU/US hosting matters)
- Stripe — handles payment info and billing identity
- Resend or SendGrid — processes email addresses
- Claude API / OpenAI — if user content is sent to an AI API, that must be disclosed
- Vercel / your hosting provider — logs IP addresses and request metadata
- Supabase / your database host — stores all user data
- Loom, Zoom, or any call recording tool — if you record user calls
This list goes directly into the Claude prompt. An incomplete list produces a legally insufficient privacy policy.

###### 2. Generate the first draft with Claude
Use the Claude prompt in the Templates section. The output will cover: what data you collect, why you collect it, who you share it with, user rights (GDPR deletion rights, CCPA opt-out), how to contact you, and when the policy was last updated. It won't be perfect — it will be a solid starting draft that a lawyer can edit rather than write from scratch.
Run two separate prompts: one for the privacy policy, one for the terms of service. They're different documents with different legal purposes.

###### 3. Send to a lawyer for review — non-negotiable
This step is not optional for a live product. Claude doesn't know your jurisdiction's specific requirements, any industry-specific regulations (HIPAA for health, FERPA for education, FINRA for finance), or whether your particular data flows create unusual risk. A startup lawyer can review a Claude draft in 1–2 hours. Find one via Clerky, Stripe Atlas referrals, or a local startup community.
Give the lawyer: the Claude draft, your full list of third-party services, your user base geography (US only? EU users? Both?), and whether you handle any sensitive categories of data (health, financial, children under 13).

###### 4. Put both documents on your product domain
Host them at yourdomain.com/privacy and yourdomain.com/terms. Not a Notion page. Not a Google Doc. The same domain your product is on. Procurement teams get suspicious when policy documents live somewhere other than the product domain.
Ask the pod to create static pages at those routes. The content is just HTML — it's a one-hour task.

###### 5. Link them from the footer of every page
Every page of the product and the marketing site should have a footer with links to Privacy Policy and Terms of Service. This is a standard legal requirement in most jurisdictions and a basic trust signal to any sophisticated buyer.

###### 6. Link them at signup
The signup form (or checkout) should include a checkbox or inline text: "By creating an account, you agree to our Terms of Service and Privacy Policy" — with links. This creates a documented consent record. The pod adds this — make sure it's in the spec for any signup flow work.

###### 7. Set a review cadence
Privacy policies go stale when you add new third-party services or enter new markets. Review and update: (1) any time you add a new service that processes user data, and (2) annually at minimum. Log the "last updated" date in the document itself — it's required under GDPR and CCPA.

##### Templates
"Draft a privacy policy for a SaaS product called {product name}. The product does: {one sentence description}. Our users are: {consumer / B2B / both}. We have users in: {US / EU / both / other}.We collect: email addresses, names, {any other data you collect directly}. We use the following third-party services that process user data: {paste your service list from step 1}.The policy should cover: what data we collect and why, how we use it, who we share it with (list each third party), user rights including GDPR deletion rights and CCPA opt-out, how to contact us for data requests, and the last-updated date. Write for a non-legal audience. Keep it plain language where possible. Flag any section where you're uncertain or where jurisdiction-specific legal review is especially important."
"Draft terms of service for a SaaS product called {product name}. The product does: {one sentence description}. Pricing model: {free / subscription / usage-based}. Our users are: {consumers / businesses / both}.Cover: acceptable use, account responsibilities, intellectual property (who owns user-generated content), subscription and payment terms (if applicable), limitation of liability, termination conditions, governing law (we're based in {your state/country}), and how we'll notify users of changes to these terms. Write in plain language. Flag any section where jurisdiction-specific legal review is especially important."
Before running the Claude prompt, confirm which of these apply. Each one that does must appear in the privacy policy.
- PostHog — user analytics and session replay
- Stripe — payment processing
- Resend / SendGrid / Loops — email delivery
- Claude API / OpenAI — AI processing of user content
- Vercel / AWS / GCP / Render — hosting and infrastructure
- Supabase / PlanetScale / Neon — database
- Sentry — error tracking (includes user context)
- Intercom / Crisp / Zendesk — customer support (stores conversations)
- Google Analytics — if installed on marketing site
- Any OAuth provider (Google, GitHub) — handles identity

##### Definition of done
- Third-party service inventory is complete and accurate.
- Claude drafts exist for both privacy policy and terms of service.
- Lawyer has reviewed and approved both documents.
- /privacy and /terms pages are live on the product domain.
- Both documents are linked in the footer of every page.
- Signup flow references and links to both documents.
- A review reminder is set for 12 months out (or on next third-party service addition).

##### Common pitfalls
- Shipping the Claude draft without lawyer review. Claude produces a solid starting point. It does not know your jurisdiction, your industry's specific regulations, or whether your data flows create unusual liability. Lawyer review is one to two hours and costs a few hundred dollars. Not optional.
- Hosting on Notion or a Google Doc. Procurement teams flag this immediately. The docs need to live on your product domain — same TLD, same brand, not a third-party service.
- Incomplete third-party service list. Every service you omit is a potential compliance violation. Spend 20 minutes with the pod to get a complete list before running the Claude prompt.
- Never updating after adding new services. Every time you add a new tool that touches user data, the privacy policy needs to be updated. Build this into your service onboarding checklist.
- Missing consent at signup. The "by continuing, you agree to our Terms and Privacy Policy" line at signup is not optional. Without it, your consent record is thin.

##### How to talk about it with the client
"We need a privacy policy and terms of service before the first enterprise prospect's procurement team asks — because when they ask and we don't have them, the deal stalls. I'll use Claude to generate solid first drafts in about 20 minutes, and then we send those to a startup attorney for a one-to-two hour review. The whole thing costs a few hundred dollars and a week of calendar time. The cost of not having them is losing a five-figure deal while we scramble to write them."
If they push back on the lawyer cost: "Claude gets us 80% there. The lawyer catches the 20% that matters legally — jurisdiction-specific requirements, industry regulations, liability limits. A startup attorney charges 200–500 dollars to review a draft. That's cheap insurance against a $50K deal falling through over a missing document."

---
#### Accessibility audit
WCAG 2.1 AA baseline check. PO runs an automated scan, pod fixes the critical issues. Increasingly a legal requirement, not just nice-to-have.

##### Why this matters
ADA enforcement against web products has increased every year for the past decade. Consumer products get sued. B2B enterprise procurement checklists increasingly require a WCAG 2.1 AA statement. Neither of these is a future concern — both are happening now to products at the stage yours is at.
Beyond legal risk: roughly 15% of the global population has some form of disability. Keyboard navigation, screen reader compatibility, and color contrast are not edge cases — they're basic product quality. Running this audit takes 30 minutes with a free browser extension.

##### When to run it
- Before pitching to any enterprise or government buyer who will ask about accessibility compliance.
- After any major UI change — new navigation, redesigned forms, updated color system.
- On a quarterly cadence once the product is live with real users.
When NOT to prioritize it: If you're still validating whether anyone wants the product at all, don't stop to run a full accessibility audit. Do a quick color contrast check and make sure buttons have labels — that's enough at the earliest stage. Run the full audit once the product has users and the core flows are stable.

##### What you'll need
- axe DevTools browser extension — free, available for Chrome and Firefox. This is the industry standard automated scanner. Runs in 30 seconds on any live page.
- The live product URL — run the scan on production, not localhost. Some issues only appear with real assets and fonts loaded.
- Screenshots — capture every flagged issue with the axe panel open. This becomes the spec for the pod.
- The pod — to implement fixes. The PO identifies and prioritizes; the pod fixes.
- VoiceOver (Mac) or NVDA (Windows) — for the manual screen reader spot-check. These are free and built into the OS or downloadable.

##### Step-by-step

###### 1. Install axe DevTools and run the automated scan
Install the axe DevTools extension from the Chrome Web Store (search "axe DevTools"). Navigate to the most important page of your product — usually the main dashboard or the core workflow screen. Open DevTools (F12), click the "axe DevTools" tab, and click "Scan all of my page." Wait 10–30 seconds. You'll get a categorized list of violations.
Run the scan on at least three pages: the landing/marketing page, the signup/login flow, and the primary app screen. Each page has its own issues.

###### 2. Understand the categories of issues
axe organizes violations by type. The most common ones you'll see, and what they mean:
- Color contrast — text isn't readable against its background. This is the most common issue and affects anyone with low vision or in bright sunlight.
- Missing alt text — images and icons without text descriptions. Screen readers read nothing, or read the file name.
- Missing form labels — input fields without associated label elements. Screen reader users can't tell what to type.
- Keyboard navigation issues — interactive elements that can't be reached or activated with the Tab key and Enter/Space.
- Focus order — Tab key moves through elements in a confusing or illogical sequence.
- Heading hierarchy — H1, H2, H3 elements used out of order or skipped, which breaks screen reader navigation.

###### 3. Prioritize: critical issues first
Not all violations are equal. Fix in this order:
- Keyboard trap — user can navigate into a modal or widget but cannot navigate out with the keyboard. This completely blocks keyboard-only users.
- Missing alt text on functional images — icons that trigger actions (buttons with icon-only labels) and meaningful images in the core workflow.
- Missing form labels — any form field in the signup, login, or core workflow.
- Color contrast failures on body text and CTAs — not decorative elements, but anything a user needs to read to use the product.
- Heading hierarchy in main content — fix the main app, not the footer.
Decorative images, footer text contrast, and visual-only polish issues can wait. Ship the critical fixes first.

###### 4. Write the spec for the pod
Export or screenshot the axe report. For each critical issue: include the axe violation name, the WCAG criterion it violates (axe shows this), a screenshot of where it appears, and the fix recommendation (axe shows "how to fix" for each violation — copy it). The pod should not have to re-run axe to understand what you found.
One Notion page or doc with all issues, organized by priority. That's the spec.

###### 5. Do a 30-minute screen reader spot-check
Automated tools catch roughly 30–40% of accessibility issues. The rest require a human to try using the product without a mouse. This takes 30 minutes and requires no prior training.
On Mac: System Preferences → Accessibility → VoiceOver → Turn on. Then navigate your core user flow using only the keyboard and listen to what VoiceOver reads aloud. You'll immediately notice where things sound wrong or are impossible to activate.
On Windows: Download NVDA (free, nvaccess.org). Same exercise.
Write down anything that sounds broken or confusing. Add it to the spec.

###### 6. Retest after the pod fixes
After the pod ships fixes, re-run axe on the same pages. Verify the critical violations are resolved. A fix that doesn't clear the axe scan is not done — the pod may have addressed the symptom, not the root cause.

###### 7. Set a recurring cadence
Run the axe scan again every quarter and after any major UI change. Add it to your sprint retrospective checklist: "did we add any new pages or flows this sprint? Run axe on them." Takes 30 minutes per quarter — the cost of letting issues accumulate is much higher.

##### Templates
Run the axe scan on each of these, screenshot all violations, and note the page URL.
- Marketing/landing page
- Signup form
- Login form
- Main dashboard or home screen
- Primary core workflow (the thing the product does)
- Settings / account page
- Any page with a form or table
For each issue you send to the pod, include:
- Page URL where the issue appears
- Violation name from axe (e.g., "color-contrast", "label", "keyboard-trap")
- WCAG criterion it violates (axe shows this — e.g., "1.4.3 Contrast (Minimum)")
- Screenshot with the axe violation highlighted
- Fix recommendation from axe's "how to fix" section — copy it verbatim
- Priority: Critical / High / Medium (use the prioritization from step 3)
Enable VoiceOver (Mac: Cmd + F5) or NVDA (Windows). Navigate with Tab, arrow keys, and Enter only. Test:
- Can you reach every button, link, and form field with Tab?
- Does VoiceOver announce what each interactive element does?
- Can you open AND close any modal or dropdown with the keyboard?
- Does the page title (what VoiceOver reads first) describe the page?
- Can you submit the signup and login forms without using the mouse?

##### Definition of done
- axe scan run on all key pages with violations documented and screenshotted.
- All critical violations (keyboard trap, missing form labels, missing functional alt text) are fixed and re-verified in axe.
- High-priority color contrast failures on body text and CTAs are fixed.
- 30-minute VoiceOver or NVDA spot-check completed, findings documented.
- Pod spec written with all issues formatted per the template above.
- Quarterly recurrence is on the calendar.

##### Common pitfalls
- Running the scan on localhost instead of production. Real fonts, real images, and third-party components often introduce issues that don't appear in development. Always scan the live URL.
- Treating the axe report as the complete picture. axe catches 30–40% of issues. The screen reader spot-check catches a different 30–40%. Do both — they find different things.
- Fixing decorative issues before critical ones. A slightly off-brand color contrast on the footer is not a lawsuit risk. A keyboard trap in the signup form is. Fix in priority order.
- Handing the pod a screenshot without the WCAG criterion. Engineers need the specific criterion to find the right fix. axe tells you which WCAG criterion is violated — include it in every issue you hand off.
- Not retesting after fixes. A fix that doesn't clear the axe violation is not done. Retest before marking it resolved.
- Skipping the recurring cadence. Every new UI component, every new form, every redesigned page can introduce new issues. Quarterly is the minimum — budget 30 minutes per quarter for this.

##### How to talk about it with the client
"I'm going to run a 30-minute accessibility scan on the product using a free browser extension. This isn't just about compliance — enterprise procurement teams are starting to require WCAG 2.1 AA statements, and ADA enforcement against web products is real and increasing. I'll come back with a prioritized list of what needs fixing and a spec the pod can work from. The scan itself takes 30 minutes; fixing the critical issues usually takes the pod a day or two. We do this once now, then quarterly going forward."
If they're not worried about it yet: "You don't have to be worried — you have to be ahead of it. The first time a prospect's procurement team asks for your WCAG compliance statement and you don't have one, that's when it becomes urgent. I'd rather we spend two days on it now than scramble on it mid-deal."

---
#### SOC 2 / security posture
For B2B SaaS, enterprise buyers ask. PO can start the evidence collection early even if formal certification comes later.

##### Why this matters
The first time an enterprise prospect asks "are you SOC 2 certified?", most early-stage founders panic. They shouldn't — the question is expected for deals above $50K ACV, and there are legitimate interim responses that keep the deal moving while certification work begins. What kills deals is having no security posture at all and no credible plan to get one.
SOC 2 certification is the security story that enterprise buyers trust. Starting the evidence collection early — before the audit window opens — means you're not scrambling when the first serious deal is on the table.

##### When to run it
- The first time an enterprise prospect mentions "SOC 2," "security questionnaire," or "infosec review" — regardless of how early you are.
- When deals above $50K ACV start appearing in the pipeline. Enterprise buyers at this level have security review processes.
- When the product handles sensitive data: health information, financial data, PII for third parties, or anything in a regulated industry.
When NOT to start: If you're still finding product-market fit with consumer users or small businesses under $10K ACV, SOC 2 is premature. Spend that time on the product. Start when enterprise deals are real, not hypothetical.

##### What you'll need
- Vanta or Drata — both offer early-stage tiers designed for startups. Vanta starts around $7,500/year; Drata is comparable. Both do continuous monitoring, automated evidence collection, and policy templates. Pick one — they do the same job.
- An AWS/GCP/Azure or Vercel/Render account with admin access — Vanta/Drata connect to your infrastructure to collect evidence automatically.
- GitHub or your version control provider — for change management evidence.
- A way to manage employee security training — both Vanta and Drata include basic training modules.
- A SOC 2 auditor — for the actual certification. Not needed until after evidence collection is complete. Budget $15,000–30,000 for a Type II audit.

##### Step-by-step

###### 1. Understand the difference between "compliant" and "certified"
These terms are not interchangeable and using them wrong will cost you credibility:
- "Working toward SOC 2" — you have a compliance platform, policies, and evidence collection underway. This is the honest answer for most early-stage products. It keeps the deal moving.
- "SOC 2 Type I" — an auditor reviewed your controls at a point in time and confirmed they exist. Takes 2–3 months from starting.
- "SOC 2 Type II" — an auditor reviewed your controls over a 6-month observation window and confirmed they worked consistently. This is what enterprise buyers want. Takes 8–12 months from starting.
Don't tell a prospect you're "SOC 2 compliant" if you haven't completed an audit. That statement creates liability if untrue.

###### 2. Set up Vanta or Drata
Sign up for whichever platform fits your stack. During onboarding, you'll connect your cloud infrastructure, GitHub, identity provider (Google Workspace, Okta, etc.), and any SaaS tools your team uses. The platform starts monitoring automatically and shows you a compliance gap list — things that need to be in place before an auditor would pass you.
The gap list is your work queue for the next six months. Prioritize it: fix what the platform flags as critical first.

###### 3. Understand what gets monitored
SOC 2 auditors look at five trust service criteria. The evidence for each is what Vanta/Drata collects:
- Security — MFA on all employee accounts, endpoint protection, access controls (who has admin access to what)
- Availability — uptime monitoring, incident response process
- Confidentiality — data encryption at rest and in transit, access logging
- Processing integrity — change management process (deploys reviewed, tested)
- Privacy — privacy policy, data retention and deletion procedures
Most early-stage products start with Security only and add the others as they scale. That's fine — and the platform will tell you which criteria your prospects are likely to require.

###### 4. Implement the non-negotiable controls
Some controls are blocking issues regardless of your maturity. Get these in place first:
- MFA enforced on all employee accounts (Google, AWS, GitHub — everywhere)
- Role-based access control — no one has admin access they don't need
- Encryption in transit (HTTPS everywhere) and at rest (database encryption enabled)
- A vendor list — every third-party service you use, with their security documentation noted
- An incident response runbook — even one page covering "what do we do if we're breached"
- Employee security training completed (Vanta/Drata include modules for this)
These are the basics any auditor will check first. Vanta/Drata policy templates cover all of these — you're filling them in, not writing from scratch.

###### 5. The 6-month evidence collection window
SOC 2 Type II requires 6 months of evidence that your controls worked consistently. The clock starts the day you set up your compliance platform and turn on monitoring. You can't compress this window — you can only start it sooner.
This is why "start when the first enterprise deal shows up" is too late. If a deal appears and you have 6 months of evidence already running, you're close to certification. If you start the day the deal appears, you're 8–12 months away.

###### 6. Answer security questionnaires in the interim
Before you have a certification, enterprise prospects often send a security questionnaire. The most common framework is the CAIQ-Lite (Consensus Assessments Initiative Questionnaire, Lite version). It's around 100 yes/no questions about your security controls.
Vanta and Drata both generate pre-filled responses to common questionnaire formats based on your actual controls. Use these — don't fill out questionnaires from scratch. A well-answered CAIQ-Lite, combined with "we're targeting SOC 2 Type II by [realistic date]," satisfies most procurement teams for deals under $100K ACV.

###### 7. Build a Trust Center page
A Trust Center is a public (or gated) page on your product domain that shows your security posture: what certifications you have or are working toward, your privacy policy, uptime status, incident history, and subprocessor list. Vanta and Drata both generate Trust Center pages automatically. Publish it at yourdomain.com/security or trust.yourdomain.com.
When a prospect asks about security, send them the Trust Center link before they have to ask. This signals maturity.

###### 8. Budget for the Type II audit
SOC 2 Type II audits cost $15,000–30,000 depending on scope and auditor. This is not a DIY task — you need an accredited CPA firm that does SOC 2. Get quotes from at least two: A-LIGN, Prescient Assurance, and Johanson Group are three auditors that work frequently with startups and have reasonable rates for the first audit.
Budget the audit cost at least two quarters before you expect to need the certification. Auditors have booking queues.

##### Templates
"We're actively working toward SOC 2 Type II certification. We have continuous monitoring and evidence collection running through {Vanta/Drata} and are targeting Type II completion by {realistic date — typically 8-12 months from your platform start date}. In the meantime, I can share our Trust Center page and we're happy to complete your security questionnaire. Would it help if I sent you both?"
This is honest, specific, and keeps the deal moving. Vague answers ("we take security seriously") signal immaturity. Specific answers with a date signal a real program.
Get these in place as soon as you start the compliance platform. They're the basics every auditor checks and every questionnaire asks about.
- MFA enforced: Google Workspace, AWS/GCP, GitHub, any SaaS admin tools
- Access review documented: who has admin access and why
- Encryption: HTTPS enforced, database encryption at rest enabled
- Vendor list: every third-party service with a link to their security page
- Incident response runbook: 1-page doc, who does what if there's a breach
- Security training: all employees have completed at least the platform's basic module
- Change management: pull requests reviewed before merging to main (already in GitHub)
Both platforms do the same core job. The practical differences at early stage:
- Vanta — slightly simpler onboarding, better for early-stage startups with small teams, active startup community and referrals via YC/a16z
- Drata — more automated evidence collection, better for teams that want to minimize manual check-ins, slightly steeper learning curve
If you're a YC company, Vanta offers a significant discount. Otherwise, get demos from both and pick the one your team will actually use consistently.

##### Definition of done
- Vanta or Drata is set up and connected to infrastructure, GitHub, and identity provider.
- Gap list reviewed and all critical controls are implemented or have a remediation date.
- Non-negotiable controls (MFA, encryption, access review, incident response runbook, vendor list, security training) are all in place and passing in the platform.
- Trust Center page is live and shareable.
- The team can respond to a CAIQ-Lite security questionnaire using the platform's pre-filled responses.
- Audit vendor is identified and quoted. Certification timeline is set.

##### Common pitfalls
- Claiming SOC 2 compliance before completing an audit. "Compliant" without a certificate is a claim you can't back up. The honest answer is "working toward Type II, targeting [date]." Enterprise procurement teams know the difference.
- Starting the evidence collection the day an enterprise deal appears. You can't compress the 6-month observation window. Start the platform before the deals arrive, not after.
- Not enforcing MFA on all admin accounts. This is the first thing every auditor checks. One admin account without MFA fails the control and delays certification.
- Picking a compliance platform and then not maintaining it. Vanta and Drata require ongoing attention — new employees need to be onboarded, new services need to be added to the vendor list. Assign one person to own the platform or it will drift.
- Ignoring security questionnaires from prospects. A CAIQ-Lite takes 2–3 hours to complete the first time. Vanta/Drata auto-fill most of it. Send it back promptly — slow responses on security questionnaires signal organizational immaturity.
- Not budgeting for the audit early enough. $15–30K is material spend and auditors have queues. Get the quote and timeline 6+ months before you need the certificate.

##### How to talk about it with the client
"The moment you close your first enterprise deal above $50K ACV, their procurement team is going to ask about SOC 2. We can't get a Type II certification quickly — it takes 6–8 months of evidence collection followed by an audit. But we can start the clock now, and we can put a security story in place that keeps enterprise deals moving in the meantime. I'm going to set up Vanta, implement the non-negotiable controls, and build a Trust Center page. When the question comes up, we'll have a real answer — not a 'we take security seriously' dodge."
If they think it's too early: "The 6-month evidence window starts when you flip the switch on the compliance platform. If you wait until an enterprise deal is in front of you to start, you're 8–12 months away from certification when the deal needs to close now. Starting six months early costs a few hundred dollars a month. Losing a $100K deal because you don't have a security story costs a lot more."

---

### 3.16 Customer Support Infrastructure
Someone has to answer when users get confused.

#### Knowledge base / help docs
Claude drafts articles based on the most common user interview questions and session replay confusion points. Hosted on a simple Astro site or Notion public page.

##### Why this matters
Every support question a user has to ask is a product failure — either the UI is confusing or the documentation doesn't exist. A knowledge base converts one-on-one support time into a self-serve asset that works 24 hours a day. More practically: a well-indexed help center ranks in search and brings in users who are already looking for solutions to the exact problems your product solves.
Start it the moment you answer the same question twice. That's the signal. If two users asked the same thing, a hundred more had the same question and never asked — they just left.

##### When to run it
- You've answered the same support question at least twice — email, Discord, or in-app chat. That's the trigger.
- The product has at least one user flow complex enough that a new user might not figure it out without help.
- You've done at least 3 user interviews or watched at least 5 session recordings — you know where people get confused.
- Not yet if the product is changing weekly and every article will be outdated in 7 days. Wait until the core flows are stable enough to document. Outdated docs are worse than no docs — they waste users' time and destroy trust.

##### What you'll need
- Claude Code — to scaffold the help site as an Astro project. No dev needed; PO runs the commands.
- Astro (free) — static site generator. Deployed on Vercel or Netlify for free. Hosted on a subfolder of the main domain (yourproduct.com/help) for SEO benefit. If the main site isn't accessible to you, use a Notion public page instead — it's live in 5 minutes with no setup.
- Claude — to draft every article. You provide the raw questions and context; Claude structures the answers.
- PostHog or Hotjar — to track which articles get viewed and which lead to a support ticket anyway (the "it didn't help" signal).
- A Notion doc or spreadsheet — article backlog. Every support question that comes in gets added as a row. Work through it by frequency.

##### Step-by-step

###### 1. Build the article backlog first
Before writing a single article, collect every support question you've received or can anticipate. Sources: inbox, Discord/Slack #feedback channel, user interview recordings, session replay confusion points (users clicking on non-clickable elements or backing out of flows), and the founder's mental model of what confuses new users. Dump everything into a backlog doc with two columns: question and source. Sort by frequency — most-asked first.

###### 2. Define the structure (keep it flat)
Four top-level sections. No more at launch:
- Getting Started — account setup, first action, what the product does and doesn't do.
- Features — one article per major feature. How it works, how to use it, what the output looks like.
- Troubleshooting — common errors and what to do about them. Keep these extremely specific — "Error: file too large" not "Upload problems."
- FAQ — catch-all for questions that don't fit the above but come up repeatedly.
Max two levels of hierarchy. No section inside a section inside a section. Users navigate with search, not menus — the structure is mostly for your own organization.

###### 3. Choose where to host
Two options. Pick one based on how much access you have to the main site:
- Astro on a subfolder (yourproduct.com/help) — best for SEO. Articles indexed under the main domain inherit its authority. PO scaffolds this with Claude Code. Takes 2–3 hours to set up. Worth it if the main site is accessible.
- Notion public page — fastest path. Live in 10 minutes. Easy to update without any technical setup. No SEO benefit since it lives on notion.site. Right choice if the main site is locked down or the pod owns it.

###### 4. Draft articles with Claude
Use the prompt below. Give Claude the raw question, any session replay notes, and the user's exact words if you have them. Claude drafts the article. You fact-check and add any product-specific details Claude can't know. Budget 15 minutes per article including review.
Every article must have: a title that matches how a user would phrase the search query, a one-sentence summary at the top, numbered steps for any process, and one screenshot or description of what the user should see at each step.

###### 5. Link from inside the product
The highest-value placement for any help article is a link inside the product, right at the point of confusion. A "?" icon next to a confusing UI element that opens the relevant article is worth 10 times the same article buried in the help center. Give the pod a list of the top 5 confusing points and the article URLs. That's a 30-minute pod task per link — high leverage, low cost.

###### 6. Add search
If you're using Astro, add Pagefind (free, zero-config, builds a search index automatically). If you're using Notion, the built-in search works. Without search, users have to browse and they won't. A help center without search is a filing cabinet with no labels.

###### 7. Maintain it from the support inbox
Once a week: scan the support inbox for new questions. Any question not covered by an existing article gets added to the backlog. Any question that the article should have covered but didn't — edit the article. The maintenance loop is: inbox → backlog → draft → publish → link from product. It takes 30 minutes per week once the initial articles are live.

###### 8. Retire stale articles
When a feature changes significantly, the article describing the old version is actively harmful. Mark stale articles for update at the same time the feature is spec'd — not after it ships. Add a line to the pod's definition of done: "knowledge base article updated if applicable." A dead article that contradicts the current product is worse than no article.

##### Templates
```
Write a help center article for {product name} answering this user question:
"{exact user question or topic}"

Context:
- The user's exact situation: {what they were trying to do when they hit the problem}
- What the product actually does here: {your explanation of the feature or flow}
- Common mistake users make: {what goes wrong}

Format:
- Title: phrase it as the user would search for it (not internal terminology)
- One sentence summary right below the title
- Numbered steps if there's a process
- One "what you should see" note after any step where the result isn't obvious
- A "still stuck?" line at the end with the support contact

Under 300 words. Plain language. No jargon.
```
Title: How to [do the thing] in [product name]
Summary: One sentence describing what this article covers.
Steps:
1. [Action] — [what you should see]
2. [Action] — [what you should see]
3. [Action] — [what you should see]
Troubleshooting: If [common problem], [solution].
Still stuck? Email {support address} and include a screenshot.

##### Definition of done
- At least 10 articles live covering the top 10 most-asked support questions.
- All 4 sections populated with at least 2 articles each.
- Search working (Pagefind if Astro, native if Notion).
- At least 3 internal product links added — direct links from confusing UI points to the relevant article.
- Article backlog maintained — any new support question added within 48 hours of receiving it.
- Analytics installed — you can see which articles are being viewed and which are generating follow-up support tickets.

##### Common pitfalls
- Waiting until "the product is stable." If the core flows are documented when they're built, maintenance is 30 minutes a week. If you wait until 6 months of undocumented changes have accumulated, you're looking at a week of catch-up work. Document as you go.
- Writing articles from the inside out. "How our upload pipeline works" is not a help article. "Why is my file upload failing?" is. Title and structure every article from the user's perspective, using the exact words they'd type into search.
- No internal product links. A help center that users have to navigate to independently gets a fraction of the traffic of one linked from inside the product. The highest-value action is the "?" icon, not better SEO.
- Letting articles go stale. An article that says "click the blue Export button" when the button is now green and labeled "Download" actively harms users. Every feature change should trigger a check of the relevant articles. Make it part of the pod's done criteria.
- No maintenance owner. If nobody owns the help center, it decays. The PO is the owner. It goes on the weekly checklist alongside the engagement review.

##### How to talk about it with the client
"Every support question you answer manually is time you're spending that could be a self-serve asset. We're going to take the top 10 questions that have come in so far, draft articles for each of them using Claude, and put them on a simple help page linked from the product. After that, when a user hits a wall, there's somewhere to send them — or better, a link right in the product that answers the question before they have to ask. This takes about 4 hours to set up and 30 minutes a week to maintain."
If they think it's premature: "The trigger is two of the same question. If two users asked it, you've already proven the article is worth writing. We start with the five questions you've already answered twice this week — that's the first five articles."

---
#### Support workflow
Even if it's just a shared inbox at first, PO defines the triage process: who responds, how fast, what gets escalated to the pod as a bug vs. a feature request.

##### Why this matters
Support is the first place a user goes when something goes wrong. How fast and how well you respond is the single biggest signal to an early user that the company cares about them. A 24-hour silence on a critical bug question loses you that user permanently, regardless of how good the product is. A 2-hour "I'm looking into this" keeps them.
The goal at this stage isn't a polished support operation — it's a defined process. Everyone on the team knows who responds, how fast, and what to do when something is above their ability to fix. That clarity is what prevents support from becoming chaos when it scales.

##### When to run it
- You have your first paying user or your first beta tester who's using the product seriously. That's when support starts, even if it's just two emails a week.
- The team doesn't have a clear answer to "who's responsible for responding to user emails?" If the answer is "whoever sees it first," you need a workflow.
- Graduate to dedicated tooling (Crisp, Intercom, Freshdesk) when you hit 50+ support tickets per week. Below that, a shared Gmail inbox or Crisp's free tier is genuinely sufficient and faster to set up.

##### What you'll need
- Crisp.chat free tier — shared inbox, live chat widget, basic automation, and a knowledge base integration. Free for 2 seats. Enough for most early-stage products. Install takes 10 minutes.
- Gmail shared inbox as alternative — if the team already lives in Gmail, a support@yourproduct.com alias forwarded to a shared label works fine until 50 tickets/week.
- A categorization system — four buckets: Bug, Feature Request, How-To, Billing. Every ticket goes into one. This determines where it goes and who handles it.
- A response template library — 5–10 pre-written replies covering the most common questions. Claude drafts these. They save 80% of the typing and ensure consistent tone.
- A simple escalation doc — one page: which issues go to the PO, which go to the pod as bugs, which go to the founder. Linked from wherever tickets live.

##### Step-by-step

###### 1. Set up the inbox
Create support@yourproduct.com. If using Gmail, set it up as an alias with a shared label. If using Crisp, connect the email and install the chat widget on the product. Crisp also gives you an in-app messenger so users can reach you without leaving the product — worth the 10-minute setup.
Do not use the founder's personal email address as the support inbox. When the founder is busy, support dies. The inbox needs to be a team address.

###### 2. Define the SLA
One rule, posted in the team Slack or Notion: respond to every support ticket within 2 hours during business hours — even if the response is only "I'm looking into this." This rule applies whether the ticket is from a free user or a paying customer. Users who get fast acknowledgment are dramatically less likely to churn while waiting for a real answer.
After hours: acknowledge by next morning. Don't commit to 24/7 coverage you can't maintain. "We respond within 2 hours during business hours" is an SLA you can actually keep.

###### 3. Categorize every ticket
Every ticket gets tagged before a response goes out:
- Bug — something isn't working as expected. Goes to the pod with steps to reproduce.
- Feature Request — user wants something the product doesn't do. Logged in the product backlog, acknowledged in the reply.
- How-To — user doesn't know how to use something. First check: does a knowledge base article exist? If yes, link it. If no, add it to the KB backlog and answer manually.
- Billing — anything involving payment, upgrades, cancellation, or refunds. Goes to the founder unless they've delegated it.
The categorization is what makes patterns visible. Five Bug tickets in a week about the same feature is a product problem, not a support problem. That signal only surfaces if someone is categorizing.

###### 4. Define the escalation path
Write this down once and share it:
- How-To: PO responds, creates KB article if one doesn't exist.
- Feature Request: PO responds, logs to backlog.
- Bug: PO triages severity, creates a ticket in the pod's backlog with steps to reproduce, acknowledges user within 2 hours.
- Billing: Founder handles. PO flags immediately.
- Angry or distressed user: Founder handles, PO acknowledges within 30 minutes.
This doc doesn't need to be long. Half a page in Notion is enough. The goal is that the PO never has to make a real-time judgment call about who should handle something.

###### 5. Write the response template library
Draft 5–10 templates with Claude covering the most common scenarios. Each template has: a subject line suggestion, a 2–3 sentence reply, and a placeholder for any ticket-specific detail. Templates aren't meant to be copied verbatim — they're starting points. Add one personal line to every reply so it doesn't read like a bot.

###### 6. Turn patterns into product changes
This is the highest-leverage thing support can do. Keep a running tally of ticket categories and topics. When the same question or bug appears 5 or more times, escalate it as a product issue, not a support issue. "We're getting 5 tickets a week about users not understanding what the export button does" is a spec for a UX fix, not a sign you need better support templates.
Review the pattern tally in the weekly product meeting. Surface the top 3 recurring issues. The pod should be addressing at least one of them per sprint.

###### 7. Measure what matters
Three metrics, tracked weekly:
- First response time — average time from ticket received to first human reply. Target: under 2 hours during business hours.
- Resolution time — time from ticket to close. Track separately for bugs vs. how-to vs. feature requests. Bugs should close within 48 hours or have an acknowledged timeline.
- Repeat contact rate — how many users sent more than one message on the same issue. High repeat contact means the first response didn't actually solve the problem.
CSAT surveys (thumbs up/down on ticket close) are optional at this stage. Don't add them until the ticket volume justifies the overhead.

###### 8. Know when to graduate
Move to dedicated support tooling (Intercom, Freshdesk, Zendesk) when: you hit 50+ tickets/week, you need automation rules to route tickets, or you need CSAT tracking at scale. The free tier of Crisp handles most early-stage products comfortably. Don't over-engineer the tooling before the volume demands it.

##### Templates
```
Write 5 support response templates for {product name}.
Voice: helpful, direct, human. Not corporate, not robotic.
Product context: {one-sentence product description}

Templates needed:
1. Bug acknowledgment (we received it, investigating, here's the timeline)
2. Feature request acknowledgment (logged it, here's what happens next)
3. How-To response (here's how to do the thing, with placeholder for steps)
4. Can't reproduce a bug (need more info from the user)
5. Issue resolved (confirming the fix, asking if anything else)

Each template: subject line suggestion + 3–5 sentence body.
Leave clear placeholders in {curly braces} for ticket-specific details.
No "I hope this email finds you well." No "Please don't hesitate."
```
Ticket ID: [Support ticket number]
User: [Name, email, plan tier]
Severity: P1 (blocks core use) / P2 (workaround exists) / P3 (cosmetic)
Steps to reproduce:
1. [Exact step]
2. [Exact step]
3. [What happened vs. what should have happened]
User acknowledged: Yes / No
User-facing timeline given: [What you told them to expect]

##### Definition of done
- Support inbox live at a team address — not a personal founder email.
- SLA defined and written down: 2-hour response during business hours.
- Escalation doc published and shared with the team — one page, four categories.
- 5 response templates written and accessible in the inbox tool (Crisp saved replies or Gmail templates).
- First response time tracked for the current week.
- Ticket pattern log started — categories and topics tracked from ticket one.

##### Common pitfalls
- Using the founder's personal email. When the founder is heads-down building, support silently piles up. A team inbox with multiple readers means no ticket gets missed when one person is unavailable.
- No categorization. Without categories, support is a pile of messages you react to. With categories, it's data. The patterns are the most valuable thing support produces — and you only see patterns if you're tagging.
- Treating every recurring question as a support failure. If 10 users ask "how do I export?" it's not a support problem. It's a product problem — the export flow is confusing. Escalate it to the pod as a UX fix, not as a template to polish.
- No SLA. Without a defined response time, "I'll get to it when I can" becomes the de facto SLA — which is variable, inconsistent, and invisible to the user. A 2-hour SLA you keep is better than a 1-hour SLA you miss.
- Over-engineering too early. A Zendesk instance with automation rules, custom fields, and SLA timers is overkill for a product with 50 users. Start with Crisp free or a shared Gmail label. Graduate when the volume demands it, not before.
- Closing bugs without confirming resolution with the user. Pod ships the fix, marks the ticket resolved. Nobody tells the user. They assumed you forgot about them. Always send a "this is fixed, here's what changed" message and ask if it's working for them.

##### How to talk about it with the client
"What we're setting up isn't a call center — it's a defined process so nothing falls through the cracks. Right now, if a user emails with a bug, who's responsible for responding? If the answer is 'whoever sees it first,' that's the problem. We're going to set up a shared inbox, a 2-hour response SLA, and a simple way to categorize what comes in so we can see patterns. The whole setup takes a day. The payoff is that no early user ever feels ignored — and you get data on what's confusing people, which feeds directly into what the pod works on next."
If they say they don't have enough volume to justify it: "The best time to define the process is before you need it urgently. Once you have 20 users and a bug hits, you want the response workflow already in place. Setting it up when there are 5 tickets means you practice on low stakes."

---

## 4. Quick B2B vs. B2C Cheat Sheet

| Dimension | 🅱️2🅱️ B2B | 🅲 B2C / Consumer |
|---|---|---|
| Primary social channel | LinkedIn | Instagram / TikTok (dev tools: X) |
| First-user acquisition | Cold outreach to a named prospect list; founder network | Niche communities; community-leader partnerships |
| Community platform | Slack | Discord |
| Paid test platform | Google Ads (search intent) | Meta Ads (visual/social) |
| Content / SEO | SEO + comparison pages (high buyer intent) | Less SEO (users scroll, not search) |
| Viral loop | "Invite a teammate" mechanic | Waitlist referral unlock |
| Reviews / trust | G2, Capterra; SOC 2; privacy/terms for procurement | Trustpilot; accessibility (lawsuit risk) |
| Partnerships | Integration co-launch; affiliate/reseller via consultants & agencies | Community-leader endorsements |
| Monetization | Feature-gate upgrades (team/admin) | Usage limits / time trials |

*Generated from the HDD Traction Menu playbooks — full text of all 52 activities included above.*
