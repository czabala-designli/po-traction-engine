---
description: Guide a PO from ICP definition to a researched community list with post drafts and UTM links. Saves output to docs/icp-communities-[archetype-slug].md — one file per ICP.
---

# ICP Research

You are running the ICP Research skill for a Product Owner. Your job is to guide them through a 3-phase session:

1. **Phase 1 — ICP Definition:** Formalize or sharpen their Ideal Customer Profile
2. **Phase 2 — Community Research:** Find and evaluate communities where the ICP lives
3. **Phase 3 — Output:** Save a complete reference doc to `docs/icp-communities-[archetype-slug].md` — one file per ICP, always slug-named

Before starting, read the project's CLAUDE.md if it exists — it contains the product name, description, and domain you will need later for UTM links. If no CLAUDE.md exists, ask the PO for three things before starting: product name, one-sentence description, and landing page URL. Then begin Phase 1.

---

## PHASE 1 — ICP Definition

Open with this question and only this question:
> "Do you have an ICP defined already, or are we starting from a rough idea?"

### Path A: Rough idea

Ask these 7 questions ONE AT A TIME. Never ask more than one question per message. Wait for each answer before asking the next.

1. "Who specifically is your target user? Tell me their role, the type of company they work at, and the industry — the more specific the better."
2. "What's the #1 problem they're trying to solve right now?"
3. "What do they do today when that problem gets bad? What's their current workaround?"
4. "Have you had any calls or sessions with the client where this problem came up? If yes — do you have a recording or notes from it? Point me to it and I'll pull the exact language they used. If no, just say no and we'll move on."

   **If yes, follow up:** ask where the recording or notes live, then pull the language yourself:
   - Fathom link → search Fathom for calls matching the product or client name, pull the transcript, extract quotes
   - Google Drive link → read the doc and extract quotes
   - Paste directly → read and extract

   What to look for: moments where the client describes the problem in first-person, or quotes what they hear from their users. In early-stage sessions the client is often the ICP themselves or a subject expert — their language is valid primary data. Do not extract team members summarizing the ICP; extract the subject expert or ICP speaking directly.

   Use what you find to pre-fill "Their language" and "What they've tried" before community research starts.
5. "What does success look like for this person in their job — not just fixing the problem, but what does 'winning' look like for them?"
6. "What have they already tried to solve this problem? What alternatives have they rejected, and why? (Say 'not sure' if you don't know yet — we'll capture this from community research.)"
7. "What would make them trust something new enough to try it? What are their trust signals? (Say 'not sure' if you don't know yet.)"

Questions 4, 6, and 7 may be unanswerable at this stage. If the PO says they don't know, mark the field as TBD and move on without blocking.

### Path B: Already defined

Ask the PO to describe their ICP in a few sentences. Then run the two-sided market check below.

### Two-sided market check

After Path A (question 7) or Path B (ICP description), do this before asking anything:

**Check CLAUDE.md first.** You already read it at the start of the session. Look for any field named "Secondary buyer", "Buyer", "Stakeholder", "Club director", or similar. If you find one, surface it directly instead of asking the generic question:

> "Your CLAUDE.md mentions [field value] as a secondary buyer — is that a separate ICP we should research alongside [primary ICP]?"

**If CLAUDE.md has no secondary buyer field**, ask this question:

> "Think about the full path from someone discovering this to someone paying for it. Is the person you described also the one who writes the check or approves the purchase — or is there a manager, director, or admin involved in that decision?"

**If no:** proceed to the HARD GATE below with the single ICP.

**If yes:** run this abbreviated second ICP flow. Ask one question at a time:

1. "Describe them in one sentence — their role and what they care about."
2. "What's the #1 reason they would pay for or approve this product? What problem does it solve for them specifically?"
3. "What's their main hesitation — what would make them not buy?"
4. "What does success look like for them specifically? Not the user's success — theirs."

Then ask the bridging question:

> "Last one: which of these two people needs to say yes first for the product to deliver value? And which one do you need to reach first to prove it works?"

Write down this answer — it determines go-to-market order and appears in the Phase 1 output.

### HARD GATE — Specificity check

Before proceeding to Phase 2, validate: Is this ICP specific enough that a subreddit probably exists for these people?

**Too broad — do NOT proceed:**
"small business owners", "developers", "busy professionals", "entrepreneurs", "managers", "people who want to save time"

**Specific enough — proceed:**
"independent restaurant owners with 1–3 locations", "freelance UX designers working with early-stage startups", "HR managers at US companies with 50–200 employees"

If too broad: explain why in plain language, then ask exactly ONE narrowing question:
> "'Small business owners' covers 30 million people — Reddit would give us hundreds of conflicting subreddits. What's the specific role or industry? For example, are they restaurant owners, freelancers, or real estate agents?"

Unlock Phase 2 once the PO narrows it, even if still imperfect.

### Phase 1 output

**Single ICP:** Write and show one profile card.
**Two ICPs:** Write and show both profile cards using the format below, then add a Go-to-market order paragraph after the second card.

Write and show this ICP profile card before moving to Phase 2:

```
## ICP Profile

**Label:** [3–5 word archetype name, e.g. "The Overwhelmed Restaurant Manager"]
**Who they are:** [role, company type, context — 2 sentences]
**Core problem:** [the specific pain, in their own language if you have it]
**Current workaround:** [what they do today when the problem gets bad]
**Aspiration:** [what "fixed" looks like for them in their job]
**What they've tried:** [alternatives rejected and why — or "TBD: add when you have this"]
**Trust signals:** [what makes them try something new — or "TBD: add when you have this"]
**Their language:** [exact phrases they use — or "TBD: will be filled in from community research"]
**ICP specificity check:** [one-line verdict, e.g. "Specific enough — clear subreddits likely exist for this audience"]
```

**If two ICPs were confirmed:** repeat the profile card format for the second ICP, then add:

**Go-to-market order:** [1–2 sentences stating which ICP to target first and why, based on the bridging question answer. Name the dependency explicitly. Example: "Lead with coaches — without coach adoption, the director dashboard has no data. Reach coaches first (30 days), then bring directors a proof-of-adoption story instead of a pitch."]

Ask: "Does this look right? Any corrections before I start the research?"

Wait for confirmation before starting Phase 2.

---

## PHASE 2 — Community Research

> **Two ICPs:** If two ICPs were confirmed in Phase 1, run all steps in this phase twice — once per ICP. Start with whichever ICP the bridging question identified as the go-first target. Label findings clearly (e.g. "Coach research:" / "Club Director research:"). Phase 3 saves two separate output files.

### Step 1 — Derive complaint keywords

From the ICP's core problem and their language, extract 3–5 "complaint keywords" — the exact phrases the ICP would type into a search engine when frustrated. Not product language. Think: what would they Google at 11pm when the problem is bad?

Example: ICP problem "restaurant managers struggling with staff scheduling" →
- `staff scheduling nightmare restaurant`
- `employee no-show restaurant`
- `restaurant rota headache`

Write the keywords out before searching so the PO can see your reasoning.

### Step 2 — Search by platform

**Reddit (search first, evaluate most deeply)**

Run 3–5 web searches:
- Query format: `site:reddit.com [complaint keyword]`
- For each subreddit found, fetch `reddit.com/r/[subreddit-name]` to read:
  - Member count (shown as "X members" near the top)
  - Recent post dates (look at the first few posts)
  - Content type: questions, discussions, memes, news?
  - Sidebar rules: look for "no self-promotion", "no spam", "no product links"

**LinkedIn Groups**

Run 1–2 web searches:
- Query format: `site:linkedin.com/groups [ICP role] [problem keyword]`
- You cannot read group content without login — surface names and descriptions only
- Flag all LinkedIn picks as `⚠️ manual validation needed`
- Generate a ready-made LinkedIn Groups search URL for the PO: `https://www.linkedin.com/search/results/groups/?keywords=[ICP+keywords]`

**Indie Hackers** (only if the product is B2B SaaS, developer tools, or productivity — determine this from the product description and ICP established in Phase 1)

Run 1 web search:
- Query format: `site:indiehackers.com [problem keyword]`

**Discord**

Run 1 web search:
- Query format: `site:disboard.org [ICP keyword]`
- Surface server names and descriptions only

**Facebook Groups**

Run 1 web search:
- Query format: `site:facebook.com/groups [job title] [problem keyword]`
- Surface group names and descriptions only

### Step 3 — Evaluate Reddit candidates

Score each subreddit against these signals:

| Signal | Pass | Flag for deeper evaluation | Exclude |
|---|---|---|---|
| Member count | 10k–500k (sweet spot 50k–200k) | Under 10k — do NOT auto-exclude; run deeper check | Over 500k: posts disappear instantly |
| Activity | Posts visible from the last 7 days | — | Last post more than a week ago |
| Content mix | Questions + discussions present | Mostly memes or news — deprioritize | Only announcements, no engagement |
| Rules | No self-promotion restrictions | Strict no-promo rule → include but flag ⚠️ | — |

**For subreddits under 10k — run a deeper activity check before excluding:**
- How many posts per week on average? (5+ is a healthy signal for a small niche)
- What % of posts are questions or discussions vs. memes/news? (60%+ questions = high-quality signal)
- Is the community growing? Look for growth indicators in the sidebar or recent post frequency trend.
- How closely do the posts match the ICP's exact problem? A 3k subreddit where 80% of posts are about the ICP's pain is more valuable than a 200k subreddit where the ICP is a minority.

If a sub-10k community passes the deeper check, include it as a **4th "bonus" option** in the confirmation gate — not as a replacement for the 3 primary picks, but as a trade-off the PO should consider:
> "Small reach, but hyper-relevant audience — your post won't get buried. Worth it if quality matters more than volume at this stage."

Include but flag subreddits with strict no-promo rules with ⚠️ — the PO needs to know before investing time there.

### Step 4 — Note language for ICP update

While reading posts and comments, collect:
- Exact phrases people use to describe the problem → for "Their language" field
- Tools, products, or workarounds mentioned → for "What they've tried" field

Save these notes — you will use them in Phase 3 to fill in any TBD fields in the ICP profile.

### Step 5 — Confirmation gate

Present the shortlist before writing anything:

> "Here are the 3 communities I recommend:
> 1. **[name]** (primary — [platform]) — [member count], active in last 7 days, [rules note or 'no restrictions found']
> 2. **[name]** (secondary — [platform]) — [same format]
> 3. **[name]** (secondary — [platform]) — [same format]
>
> _(If a sub-10k community passed the deeper activity check, add):_
> **Bonus option:** **[name]** ([member count], [activity note]) — small reach but hyper-relevant audience. Posts won't get buried. Trade-off: less volume, more quality. Worth considering if you want a tight feedback loop early on.
>
> Want to swap any of these, or add the bonus option as a 4th, before I build the full output?"

Do NOT proceed to Phase 3 without explicit PO confirmation ("yes", "looks good", "go ahead", or any affirmative).

---

## PHASE 3 — Output Document

Once the PO confirms the community picks:

**First:** go back and fill in any TBD fields in the ICP profile you can now answer from community research — especially "Their language" (phrases observed in posts) and "What they've tried" (alternatives mentioned in threads). If still unknown, leave as TBD.

**Then:** create the `docs/` directory if it doesn't exist, and write the output file(s):
Always use the slug-based filename — `docs/icp-communities-[archetype-slug].md` — where the slug is the archetype label lowercased with hyphens (e.g. `icp-communities-volleyball-coach.md`, `icp-communities-club-director.md`). This applies whether there is one ICP or two. Two ICPs = two files, one per ICP, same convention.

Use this exact structure for each file:

```
# ICP + Community Research
_Generated: [today's date] | Project: [product name from CLAUDE.md]_

---

## 0. Go-to-Market Sequencing
_(Only include this section when two ICPs were confirmed in Phase 1. Write the same text in both ICP files.)_

[Go-to-market order paragraph from the Phase 1 bridging question — copied verbatim into both files. Name both ICPs, state which to target first, why, and what proof point unlocks the second. Example: "Coaches and club directors are a two-sided motion — coaches adopt first, directors buy second. Without coach adoption there is no data for the director dashboard. Reach coaches first (30 days), prove the product sticks, then approach directors with adoption proof instead of a pitch."]

---

## 1. ICP Profile

**Label:** [archetype name]
**Who they are:** [2 sentences]
**Core problem:** [in their own language]
**Current workaround:** [what they do today]
**Aspiration:** [what "fixed" looks like]
**What they've tried:** [alternatives or TBD: add when you have this]
**Trust signals:** [trust signals or TBD: add when you have this]
**Their language:** [exact phrases — updated from community research, or TBD if not observed]
**ICP specificity check:** [verdict]

---

## 2. Platform Strategy

[2–3 sentences: which platforms were searched, which made the cut and why, which were skipped and why. Example: "Reddit was the primary source — three active subreddits found with Q&A content matching the ICP. LinkedIn Groups searched but requires manual validation. Discord searched via Disboard but no active servers found for this ICP."]

---

## 3. Communities

### Primary: [Community name] — [Platform]
- **Link:** [URL]
- **Members:** [count]
- **Why it fits:** [1–2 sentences — why this community's audience matches the ICP]
- **Rules:** [summary — "No restrictions found" / "⚠️ No self-promotion allowed — feedback-seeking posts only" / "⚠️ Manual validation needed (LinkedIn)"]
- **UTM link:** [full tagged URL]

### Secondary 1: [Community name] — [Platform]
- **Link:** [URL]
- **Members:** [count]
- **Why it fits:** [1–2 sentences]
- **Rules:** [summary]
- **UTM link:** [full tagged URL]

### Secondary 2: [Community name] — [Platform]
- **Link:** [URL]
- **Members:** [count]
- **Why it fits:** [1–2 sentences]
- **Rules:** [summary]
- **UTM link:** [full tagged URL]

---

## 4. First Post Drafts

> These drafts are starting points. Edit them until they sound like you — remove anything corporate, anything longer than 250 words, anything that reads like a press release.

### Draft for [Community name]

_Frame used: [Frame 1 or Frame 2] — [one sentence on why this frame fits this community]_

[Post draft — under 200 words, ends with a genuine question]

### Draft for [Community name]

_Frame used: [Frame 1 or Frame 2] — [one sentence on why]_

[Post draft]

### Draft for [Community name]

_Frame used: [Frame 1 or Frame 2] — [one sentence on why]_

[Post draft]

---

## 5. Community Tracking Table

Update this table weekly. Drop any community with zero signups after 4 posts.

| Community | Platform | Members | UTM Link | First post date | Posts made | Replies received | Signups (UTM) | Notes |
|---|---|---|---|---|---|---|---|---|
| [name] | | | | — | 0 | 0 | 0 | |
| [name] | | | | — | 0 | 0 | 0 | |
| [name] | | | | — | 0 | 0 | 0 | |

---

## 6. Definition of Done

- [ ] 3 communities identified and joined, notes on audience size and posting rules
- [ ] At least 3 non-promotional contributions made before any promotional post
- [ ] At least 1 post per community in the first two weeks, each with a unique UTM link
- [ ] Tracking table live with signup attribution by community
- [ ] One paragraph synthesis: which community drove the most engaged signups, what problem framing got the most replies
```

After saving the file(s), tell the PO:
> "Saved to `docs/icp-communities-[archetype-slug].md` [list all filenames created]. Your next step is to join each community and lurk for 3–5 days before posting — read the posts, note the vocabulary, note what gets upvoted. The post drafts above are starting points; edit them until they sound like you."

---

## HARD RULES

1. **One question at a time** — never ask multiple questions in one message during Phase 1
2. **ICP specificity gate** — do not proceed to Phase 2 if the ICP is too broad; push back once with a narrowing question, then unlock
3. **Search, don't guess** — run actual web searches in Phase 2; do not name communities from memory
4. **Exactly 3 communities** — 1 primary, 2 secondary; never recommend fewer or more
5. **Confirmation gate** — show the shortlist and wait for PO confirmation before writing the output doc
6. **Flag no-promo rules** — mark communities with strict no-promotion rules with ⚠️ before recommending them
7. **Fill TBDs before output** — update ICP profile TBD fields from research before writing the final doc
8. **UTM links required** — every community in the output doc must have a UTM-tagged link; do not leave this blank
9. **Two-sided market check** — always ask the second-ICP question after question 7 (or after Path B); never assume single-ICP without explicitly asking. If two ICPs are confirmed, run Phase 2 and Phase 3 for both and include the Go-to-market order in the Phase 1 output.

## UTM LINK FORMAT

`[domain]?utm_source=[platform]&utm_medium=[community-name]&utm_campaign=[project-name]-launch`

- `[domain]` = landing page URL from CLAUDE.md (ask the PO if not present)
- `[platform]` = reddit / linkedin / discord / facebook / indiehackers
- `[community-name]` = subreddit or group name, lowercase, hyphens for spaces (e.g. `restaurant-owners`)
- `[project-name]` = product name from CLAUDE.md, lowercase, hyphens for spaces (e.g. `traction-engine`)

## POST DRAFT INSTRUCTIONS

For each community, use this prompt internally to generate the draft:

```
You are helping a founder post authentically in a niche community.

Product: [one-sentence description from CLAUDE.md]
ICP: [who the product is for — from Phase 1 profile]
Community: [community name and platform]
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

Choose the frame that best fits the community's typical content style. State which frame you used and why.
