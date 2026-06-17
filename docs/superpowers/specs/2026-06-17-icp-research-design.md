# Design Spec: `/icp-research` Skill

**Date:** 2026-06-17
**Project:** The Traction Engine — TractionLab
**Owner:** Carlos Zabala (PO)
**Status:** Approved — ready for implementation

---

## What this is

A Claude Code skill invoked with `/icp-research` from any project folder. It guides a PO through a 3-phase session that ends with a saved `docs/icp-communities.md` file containing a full ICP profile, 3 researched communities, post drafts per community, UTM links, and a tracking table.

**Distribution (phase 1):** local skill for the PO's own machine to test and iterate.
**Distribution (phase 2, later):** publish as a Designli plugin via a GitHub repo so all Designli POs can install it with one command.

---

## Phases overview

| Phase | What Claude does | PO effort |
|---|---|---|
| **1 — ICP** | Asks 2–7 targeted questions to formalize or sharpen the ICP. Validates specificity before proceeding. | Answers questions |
| **2 — Research** | Runs web searches across Reddit, LinkedIn Groups, Indie Hackers, Discord, Facebook Groups. Evaluates communities. Picks 3 and confirms with PO. | Approves community picks |
| **3 — Output** | Writes `docs/icp-communities.md` with full ICP profile, communities, post drafts, UTM links, tracking table. Goes back and fills TBD fields in ICP profile from research findings. | Reviews the doc |

---

## Phase 1 — ICP Definition

### Entry point assessment

Claude opens with:
> "Do you have an ICP defined already, or are we starting from a rough idea?"

- **If defined:** ask the PO to paste it, then check specificity (see hard gate below)
- **If rough:** ask the 7 questions below, one at a time

### Questions (rough ICP path)

1. Who specifically? (role, company size, industry — the more specific the better)
2. What's the #1 problem they're trying to solve right now?
3. What do they do today when that problem gets bad? (their current workaround)
4. Have you talked to any of them? If yes — what exact words did they use to describe the problem?
5. What does success look like for this person in their job? (their aspiration — not just the pain)
6. What have they already tried to solve this problem? (alternatives they've rejected)
7. What would make them trust something new enough to try it? (trust signals)

Questions 4, 6, and 7 may be unanswerable at this stage — Claude marks them as TBD and moves on without blocking.

### Hard gate — specificity check

Before proceeding to Phase 2, Claude validates:
> Is this ICP specific enough that a subreddit probably exists for these people?

- **Too broad** (e.g. "small business owners", "developers", "busy professionals") → Claude explains why and asks one narrowing question before unlocking Phase 2
- **Specific enough** (e.g. "independent restaurant owners with 1–3 locations", "freelance UX designers working with startups") → proceed

### Phase 1 output — ICP profile card

```
**Label:** [3–5 word archetype name, e.g. "The Overwhelmed Restaurant Manager"]
**Who they are:** [role, company type, context — 2 sentences]
**Core problem:** [the specific pain in their own language]
**Current workaround:** [what they do today when it gets bad]
**Aspiration:** [what "fixed" looks like for them]
**What they've tried:** [alternatives they've already rejected and why — or TBD: add when you have this]
**Trust signals:** [what makes them willing to try something new — or TBD: add when you have this]
**Their language:** [exact phrases they use — or TBD: will be filled in from community research]
**ICP specificity check:** [Claude's one-line verdict]
```

Fields marked `TBD — will be filled in from community research` are updated automatically after Phase 2. Fields marked `TBD — add when you have this` require the PO to fill in later (e.g. after user interviews).

---

## Phase 2 — Community Research

### Step 1 — Derive complaint keywords

Before searching, Claude extracts 3–5 "complaint keywords" from the ICP profile — the phrases the ICP would type when frustrated, not polished product language.

Example: ICP problem "restaurant managers struggling with staff scheduling" → keywords: `staff scheduling nightmare`, `restaurant rota problems`, `employee scheduling headache`

### Step 2 — Search by platform

| Platform | How Claude searches | Depth |
|---|---|---|
| **Reddit** | `site:reddit.com [complaint keyword]` × 3–5 queries | Full — fetches subreddit page to read member count, activity, rules |
| **LinkedIn Groups** | `site:linkedin.com/groups [ICP role or problem]` | Partial — name + description only; flags for manual validation |
| **Indie Hackers** | Only if B2B SaaS / developer tools / productivity products (Claude determines this from the product description and ICP established in Phase 1) | Community fit check |
| **Discord** | `site:disboard.org [ICP keyword]` | Partial — server name + description only |
| **Facebook Groups** | `site:facebook.com/groups [job title or problem]` | Partial — name + description only |

### Step 3 — Evaluate Reddit candidates

For every subreddit found, Claude checks:

| Signal | Pass | Flag |
|---|---|---|
| Member count | 10k–500k (sweet spot 50k–200k) | Under 10k or over 500k |
| Activity | Post in last 7 days | Last post more than a week ago |
| Content mix | Questions + discussions present | Only memes, news, or announcements |
| Rules | No self-promotion restrictions found | Strict no-promo or no-self-promotion rules |

For LinkedIn Groups: generates a ready-made search URL for the PO to validate manually (one click).

### Step 4 — Confirmation gate

Before writing the output doc, Claude presents the shortlist and asks for approval:

> "Here are the 3 communities I recommend:
> 1. **[name]** (primary) — [member count], [activity note], [rules note]
> 2. **[name]** (secondary) — [same]
> 3. **[name]** (secondary) — [same]
>
> Want to swap any of these before I build the full output?"

The PO must confirm or adjust before Phase 3 begins.

### Step 5 — ICP profile update

After reading community posts, Claude fills in any TBD fields it can now answer:
- **Their language:** exact phrases observed in posts and comments
- **What they've tried:** alternatives mentioned in community threads

---

## Phase 3 — Output document

Saved to `docs/icp-communities.md` in the project root.

### Document structure

```markdown
# ICP + Community Research
Generated: [date] | Project: [product name from CLAUDE.md]

## 1. ICP Profile
[Full profile card — all 8 fields, TBDs filled where research allowed]

## 2. Platform Strategy
[2–3 sentences: which platforms were searched, which made the cut and why,
which were skipped and why]

## 3. Communities

### Primary: [Community name] — [Platform]
- Link: [URL]
- Members: [count]
- Why it fits: [1–2 sentences]
- Rules: [summary — or "No restrictions found" / "⚠️ No self-promotion allowed"]
- UTM link: [full tagged URL]

### Secondary 1: [name] — [Platform]
[same structure]

### Secondary 2: [name] — [Platform]
[same structure]

## 4. First Post Drafts

### Draft for [Community name]
[Post using the community post drafting template — under 200 words,
one of the two approved frames, ends with a genuine question]

### Draft for [Community name]
[same]

### Draft for [Community name]
[same]

## 5. Community Tracking Table
| Community | Platform | Members | Link | First post date | Posts made | Replies | Signups (UTM) | Notes |
|---|---|---|---|---|---|---|---|---|
| [name] | | | | — | 0 | 0 | 0 | |
| [name] | | | | — | 0 | 0 | 0 | |
| [name] | | | | — | 0 | 0 | 0 | |

## 6. Definition of Done
- [ ] 3 communities identified and joined, notes on audience size and rules
- [ ] At least 3 non-promotional contributions before any promotional post
- [ ] At least 1 post per community in first two weeks, each with UTM link
- [ ] Tracking table live with signup attribution by community
- [ ] One paragraph synthesis: which community drove the most engaged signups
```

### UTM link format

Auto-generated using the project domain from CLAUDE.md:
`[domain]?utm_source=[platform]&utm_medium=[community-name]&utm_campaign=[project-name]-launch`

### Post draft format

Uses the community post drafting template from the Traction Menu:

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

---

## Hard rules

- Do not proceed to Phase 2 if the ICP is still too broad — push back once, then unlock if the PO narrows it
- Pick exactly 3 communities: 1 primary, 2 secondary
- Show the community shortlist and get PO confirmation before writing the output doc
- Flag any community with strict no-promotion rules before recommending it
- Fill in ICP profile TBDs from research before finalizing the output doc
- UTM links must be present for every community in the output doc

---

## Out of scope

- Executing the outreach (lurking, posting, engaging) — the skill ends at the research + planning output
- Tracking results — the tracking table is a template; the PO fills it in as they post
- Any backend, database, or persistent storage beyond the output markdown file

---

## Source framework

Based on the "Post in niche communities" playbook from the Traction Menu (`hdd.designli.co/traction-menu/niche-communities`).
