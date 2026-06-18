# `/icp-research` Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a user-level Claude Code command that guides a PO through ICP definition, community research, and output generation, saving `docs/icp-communities.md`.

**Architecture:** A single markdown file at `~/.claude/commands/icp-research.md` that Claude reads and executes as a session script. No code, no dependencies — Claude reads the project's CLAUDE.md for context (product name, domain, description) and writes one output file. Built in 3 tasks that can each be tested independently before the next is added.

**Tech Stack:** Markdown, Claude Code commands system, WebSearch + WebFetch tools (used by Claude during execution)

## Global Constraints

- Skill location: `~/.claude/commands/icp-research.md` (user-scoped, available in any project, not committed to any repo)
- Output file: `docs/icp-communities.md` relative to the project root where `/icp-research` is run
- Exactly 3 communities: 1 primary, 2 secondary — never fewer or more
- UTM format: `[domain]?utm_source=[platform]&utm_medium=[community-name]&utm_campaign=[project-name]-launch`
- Post drafts: under 200 words, no buzzwords, ends with a genuine question
- ICP profile: 8 fields — Label, Who they are, Core problem, Current workaround, Aspiration, What they've tried, Trust signals, Their language

---

### Task 1: Create skill file with Phase 1 — ICP Definition

**Files:**
- Create: `~/.claude/commands/icp-research.md`

**Interfaces:**
- Produces: a user-level command invokable as `/icp-research` in any Claude Code session; after Phase 1, a visible ICP profile card the PO confirms before Phase 2 begins

- [ ] **Step 1: Create the commands directory**

```bash
mkdir -p ~/.claude/commands
```

Expected: no error. Directory created at `/Users/cazabalac/.claude/commands/`.

- [ ] **Step 2: Create the skill file with Phase 1 content**

Create `~/.claude/commands/icp-research.md` with this exact content:

````markdown
---
description: Guide a PO from ICP definition to a researched community list with post drafts and UTM links. Saves output to docs/icp-communities.md.
---

# ICP Research

You are running the ICP Research skill for a Product Owner. Your job is to guide them through a 3-phase session:

1. **Phase 1 — ICP Definition:** Formalize or sharpen their Ideal Customer Profile
2. **Phase 2 — Community Research:** Find and evaluate communities where the ICP lives
3. **Phase 3 — Output:** Save a complete reference doc to `docs/icp-communities.md`

Before starting, read the project's CLAUDE.md if it exists — it contains the product name, description, and domain you will need later for UTM links. Then begin Phase 1.

---

## PHASE 1 — ICP Definition

Open with this question and only this question:
> "Do you have an ICP defined already, or are we starting from a rough idea?"

### Path A: Rough idea

Ask these 7 questions ONE AT A TIME. Never ask more than one question per message. Wait for each answer before asking the next.

1. "Who specifically is your target user? Tell me their role, the type of company they work at, and the industry — the more specific the better."
2. "What's the #1 problem they're trying to solve right now?"
3. "What do they do today when that problem gets bad? What's their current workaround?"
4. "Have you talked to any of them yet? If yes — what exact words did they use to describe the problem? If no, just say no and we'll move on."
5. "What does success look like for this person in their job — not just fixing the problem, but what does 'winning' look like for them?"
6. "What have they already tried to solve this problem? What alternatives have they rejected, and why? (Say 'not sure' if you don't know yet — we'll capture this from community research.)"
7. "What would make them trust something new enough to try it? What are their trust signals? (Say 'not sure' if you don't know yet.)"

Questions 4, 6, and 7 may be unanswerable at this stage. If the PO says they don't know, mark the field as TBD and move on without blocking.

### Path B: Already defined

Ask the PO to describe their ICP in a few sentences. Then run the specificity check below.

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

Ask: "Does this look right? Any corrections before I start the research?"

Wait for confirmation before starting Phase 2.
````

- [ ] **Step 3: Verify the command is recognized**

Open a new Claude Code session in any project and type `/icp` — it should appear in autocomplete as `/icp-research`. If it doesn't appear, restart Claude Code.

- [ ] **Step 4: Smoke test Phase 1**

Run `/icp-research` and answer the questions using The Traction Engine as the product (Designli POs as the ICP). Verify:
- Claude asks questions one at a time
- Claude does not proceed past Phase 1 (Phase 2 content not in the file yet)
- The ICP profile card is shown at the end and looks correctly structured

---

### Task 2: Add Phase 2 — Community Research

**Files:**
- Modify: `~/.claude/commands/icp-research.md` (append Phase 2 section)

**Interfaces:**
- Consumes: ICP profile card from Phase 1 (specifically: Label, Core problem, Their language, Who they are)
- Produces: a confirmed shortlist of 3 communities (name, platform, member count, rules note) approved by the PO before Phase 3

- [ ] **Step 1: Append Phase 2 to the skill file**

Add this block to the end of `~/.claude/commands/icp-research.md`:

````markdown

---

## PHASE 2 — Community Research

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

| Signal | Pass | Exclude or Flag |
|---|---|---|
| Member count | 10k–500k (sweet spot 50k–200k) | Under 10k: too small. Over 500k: posts disappear instantly. |
| Activity | Post in last 7 days | Last post more than a week ago → exclude |
| Content mix | Questions + discussions present | Only memes, news, or announcements → deprioritize |
| Rules | No self-promotion restrictions found | Strict no-promo rule → include but flag with ⚠️ |

Exclude subreddits that fail member count or activity. Include but flag subreddits with strict no-promo rules — the PO needs to know before investing time there.

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
> Want to swap any of these before I build the full output?"

Do NOT proceed to Phase 3 without explicit PO confirmation ("yes", "looks good", "go ahead", or any affirmative).
````

- [ ] **Step 2: Smoke test Phase 2**

Continue from the end of the Task 1 smoke test (or restart `/icp-research`). After confirming the Phase 1 ICP card, verify:
- Claude lists complaint keywords and shows them
- Claude runs visible web searches (search tool calls appear in the session)
- Claude fetches at least one subreddit page to check rules and activity
- Claude surfaces a shortlist of exactly 3 communities
- Claude waits for confirmation before proceeding

- [ ] **Step 3: Check community quality**

Review the 3 communities Claude recommends. They should:
- Have member counts in the 10k–500k range
- Have posts visible from the last 7 days
- Match the ICP (Designli POs → professional communities, not general startup/entrepreneur subs)
- Include at least one Reddit and one non-Reddit option if available

If picks are poor (too broad, inactive, or off-ICP), note the specific problem for iteration.

---

### Task 3: Add Phase 3 — Output Generation + Hard Rules

**Files:**
- Modify: `~/.claude/commands/icp-research.md` (append Phase 3 and Hard Rules sections)

**Interfaces:**
- Consumes: confirmed community shortlist from Phase 2; ICP profile from Phase 1 (with TBDs updated from research)
- Produces: `docs/icp-communities.md` with 6 sections fully populated

- [ ] **Step 1: Append Phase 3 and Hard Rules to the skill file**

Add this block to the end of `~/.claude/commands/icp-research.md`:

````markdown

---

## PHASE 3 — Output Document

Once the PO confirms the community picks:

**First:** go back and fill in any TBD fields in the ICP profile you can now answer from community research — especially "Their language" (phrases observed in posts) and "What they've tried" (alternatives mentioned in threads). If still unknown, leave as TBD.

**Then:** create the `docs/` directory if it doesn't exist, and write `docs/icp-communities.md` with this exact structure:

```
# ICP + Community Research
_Generated: [today's date] | Project: [product name from CLAUDE.md]_

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

After saving the file, tell the PO:
> "Saved to `docs/icp-communities.md`. Your next step is to join each community and lurk for 3–5 days before posting — read the posts, note the vocabulary, note what gets upvoted. The post drafts above are starting points; edit them until they sound like you."

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
````

- [ ] **Step 2: Run the skill end-to-end**

Run `/icp-research` in the po-traction-engine project. Use The Traction Engine as the product and Designli POs as the ICP. Complete all 3 phases and verify the output doc.

- [ ] **Step 3: Review `docs/icp-communities.md`**

Open the file and check all 6 sections:

| Check | Pass criteria |
|---|---|
| Section 1 — ICP Profile | All 8 fields present; TBDs filled where research allowed |
| Section 2 — Platform Strategy | 2–3 sentences; explains which platforms were skipped and why |
| Section 3 — Communities | 3 entries; each has link, member count, fit rationale, rules note, UTM link |
| Section 4 — Post Drafts | 3 drafts; each under 200 words; each ends with a question; no buzzwords |
| Section 5 — Tracking Table | 3 rows; columns match spec |
| Section 6 — Definition of Done | 5 unchecked checkboxes present |

- [ ] **Step 4: Verify UTM links**

Check that UTM links in Section 3 follow the format:
`po-traction-engine.vercel.app?utm_source=[platform]&utm_medium=[community-name]&utm_campaign=traction-engine-launch`

- [ ] **Step 5: Log iteration notes**

Write a short list of anything that needs improvement (e.g. community picks were off-target, post drafts sounded corporate, TBDs not filled). These become the first iteration. Save notes as a comment at the bottom of this plan file.

---

## Iteration Notes

### Smoke test 1 — Blocq Sports / volleyball coaches (2026-06-18)

**Finding 1 — small community auto-exclusion was too rigid**
The hard "under 10k = exclude" rule in Step 3 dropped `r/volleyballtraining` (3k members), which was actually the most active and fastest-growing volleyball subreddit (+20%/year, dominant content type "Question" — 69 posts, hyper-relevant coaching audience). Fixed by replacing auto-exclude with a deeper activity check (posts/week, % questions, growth signal, ICP specificity) and surfacing communities that pass as a 4th "bonus option" in the confirmation gate.

### Smoke test 2 — Blocq Sports / club director ICP (2026-06-18)

**Finding 2 — skill has no two-sided market check**
Running the skill on the club director ICP revealed that the product has two distinct personas: volleyball coaches (the daily user) and club directors (the buyer/approver). The skill had no mechanism to surface this split or determine which ICP to target first. The insight that emerged organically ("lead with coaches — directors buy once adoption is proven") is the kind of go-to-market sequencing a PO needs before choosing which communities to target.

**Fix applied:** Added a "Two-sided market check" to Phase 1 (after question 7, before the specificity gate). If a second ICP is confirmed, an abbreviated 4-question flow runs for them plus a bridging question: "Which of these two people needs to say yes first for the product to deliver value?" The answer appears in a **Go-to-market order** paragraph in the Phase 1 output. Phase 2 runs twice (once per ICP, starting with the go-first target). Phase 3 saves two output files with slugged names.

**Finding 2a — two-sided check was passive (follow-up fix)**
The initial two-sided check asked a generic yes/no question ("is there a second person involved?"). A PO who hasn't framed their product in user/buyer terms could easily answer no and miss the split entirely. Two fixes applied: (1) check CLAUDE.md first — if a "Secondary buyer" or similar field is already there, surface it by name rather than asking; (2) replace the generic question with a journey-tracing prompt: "Is the person you described also the one who writes the check or approves the purchase?" — this forces the PO to trace the actual purchase path rather than think abstractly.

**Finding 3 — Fathom transcripts are a high-quality ICP source; question 4 was framed wrong**
Question 4 asked "Have you talked to any of them yet?" which implies formal user research. At this stage POs don't have interview notes — they have kick-off and discovery call recordings where the client is often the ICP themselves or a subject expert. The question was reframed to: "Have you had any calls or sessions with the client where this problem came up? Point me to it and I'll pull the exact language." Added a follow-up handling block: Fathom link → search + extract; Drive link → read + extract; paste → extract directly. Guardrail added: extract the subject expert or ICP speaking in first-person, not team members summarizing them. Payoff: "Their language" and "What they've tried" pre-filled from transcripts before community research starts, making complaint keywords and post drafts sharper.
