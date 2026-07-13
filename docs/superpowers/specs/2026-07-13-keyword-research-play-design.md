# Keyword Research play — design / build spec

> Second play of the site-review #4 content build. Mirrors the **Brand Voice** play's 3-file
> pattern and the **ICP Research** play's structure. Sibling of Brand Voice: both feed Blog Section.
> North star: **industry-aligned method, but PO-simple and scalable.** POs are not SEO experts,
> and we cannot provision paid tools to every PO, so the default path uses only free Google
> surfaces; paid tools are an optional upgrade, never a gate.

## What we're building (3 files)

1. **The skill** — flesh out `docs/skills/keyword-research-skill.md` (currently a stub). Auto-registers
   as `/keyword-research` (project discovers skills from `docs/skills/<name>-skill.md`). Needs a
   `description:` frontmatter line like the ICP and Brand Voice skills.
2. **The download endpoint** — create `src/pages/starters/keyword-research.md.ts`, identical shape to
   `src/pages/starters/brand-voice.md.ts`, importing `docs/skills/keyword-research-skill.md?raw`.
3. **The library page** — rewrite `src/content/assets/keyword-research.md` body + frontmatter; flip
   `status: coming-soon → live`.

## Method (industry-aligned, free-first)

Standard early-stage keyword research = **long-tail + winnable difficulty + real (if modest) demand +
problem/buyer intent**, validated by a quick SERP look, grouped into topic themes. We keep that
method but make every metric obtainable with **free Google surfaces**; paid tools are optional.

- **Demand signal (free default):** Google autocomplete, "People also ask", "related searches"
  (what people actually type), and Google Trends (is a term real/rising; compare two terms).
- **Difficulty (free default):** the manual SERP glance, search the term, is page 1 dominated by big
  brands / high-authority sites? If yes, it is too hard for a new site, go longer-tail. Best free
  difficulty proxy for a no-authority domain.
- **Optional upgrade (never required):** if the PO has Google Keyword Planner (free, needs a Google
  Ads account) or SEMrush (Designli has an account, but access does not scale to every PO), pull
  exact volume + keyword difficulty. Offer this as a one-line branch, not a prerequisite.
- **Intent, clustering, post angles:** Claude derives from the ICP.

**Honest tradeoff (state it in the skill output):** the free path gives *directional* demand
(rising / steady / thin) and an *estimated* difficulty (SERP glance), not precise volume/KD numbers.
For choosing early long-tail blog targets that is sufficient, and it is what most scrappy teams do.

## The `/keyword-research` skill — session design

A guided session, **one plain question at a time, no SEO jargon.** Translate every term:
"what people type into Google" not "search queries"; "how hard to outrank page 1" not "keyword
difficulty"; "how many people search it" not "search volume".

**Step 1 — Confirm product + audience (auto-filled, PO just confirms):**
- Read **CLAUDE.md** (Project details: Product name / description / value proposition) = what the
  product is.
- Read **`docs/icp-communities-*.md`** (ICP Research output) = who it's for, their **core problems**,
  and the **exact phrases** they use. If two ICP files exist, cover both audiences' searches.
- Present a short synthesized summary and ask the PO to confirm/tweak.
- **Fallbacks (works standalone):** no ICP doc → "running `/icp-research` first sharpens this; we can
  still proceed" then ask "In a sentence, who is this for and what problem do they have?"; no value
  prop in CLAUDE.md → ask for a one-liner.

**Step 2 — Brainstorm what they'd type into Google:** Claude generates candidate searches *from the
ICP's real problems and language*, grouped in plain terms and shown to the PO to curate:
- **Problem searches** ("why does X keep happening", "how do I stop X")
- **Solution searches** ("best way to do X", "X tool", "how to do X")
- **Comparison searches** ("X vs Y", "X alternative", "is X worth it")
Lean long-tail (3+ words), since that is what a new site can rank for. PO edits the list.

**Step 3 — Check real demand (free default, optional upgrade):** for the curated shortlist, walk the
PO through the free checks in plain language:
- Type each into Google, read the autocomplete suggestions + "People also ask" + related searches at
  the bottom, note the real phrasings that appear (add good ones to the list).
- Optionally open Google Trends to see if a term is rising, steady, or thin, and to compare two terms.
- Tag each keyword's demand as **rising / steady / thin**.
- One-line optional branch: "If you have Google Keyword Planner or SEMrush, here's how to pull exact
  monthly volume instead; otherwise the signal above is enough."

**Step 4 — Check how hard it is to rank (free SERP glance):** for each shortlisted keyword, have the
PO search it and look at page 1: is it all big brands / high-authority sites, or are there smaller
sites, forums, and blog posts? Tag difficulty as **page 1: crowded** (too hard now, suggest a
longer-tail variant) or **page 1: open** (winnable). Optional: exact KD if a tool is available.

**Step 5 — Cluster + pick first targets:** group the shortlist into 2–3 **themes** (a topic spine for
the blog), then recommend the **3–5 best first targets** = high intent + real demand + winnable
difficulty + close to the product. Pair each with a **blog post angle**. Priority is the plain-English
blend of those factors (High / Med / Low), not a formula the PO has to compute.

**Output — write `docs/keyword-research.md`:** create `docs/` if needed. Structure:
- A one-line intro naming the product + audience.
- A **shortlist table**: `Keyword (what they type) | Who's searching & why (intent) | Demand | Page 1 | Theme | Blog post angle | Priority`. Demand = rising/steady/thin (or exact # if a tool was used); Page 1 = crowded/open (or KD # if available).
- A short **"Start here"** list: the 3–5 recommended first targets, in order.
- A one-line **method note**: this used free signals (directional), not precise tool metrics; that is enough for early long-tail targeting.
- A **"What's next"** line: this feeds the Blog Section, each keyword row is a post; pair it with `docs/brand-voice.md` when drafting.

## The library page (`keyword-research.md`)

Mirror the Brand Voice / ICP page structure and tone:
- **Frontmatter:** keep `title: "Keyword Research"`, `kind: "play"`, `phase: "marketing"`, `order: 4`;
  change `status` to `live`; add `needs: ["icp-persona-research"]`; keep `feeds: ["blog-section"]`;
  update `summary` to outcome-led, PO-plain (no jargon).
- **Body sections:** Intro (one plain sentence: find the words your ICP types into Google so the blog
  targets real demand; note it builds on ICP work and uses free tools by default) · "## Install the
  skill" (download `/starters/keyword-research.md` with `download="keyword-research.md"`, install line,
  run `/keyword-research`, exact shape of the Brand Voice/ICP install section) · "## What it produces"
  (the `docs/keyword-research.md` shortlist, free-first, SEMrush optional) · "## Where it fits" (feeds
  Blog Section alongside Brand Voice; do it after ICP Research).

## Constraints

- **Simplicity + scalability are the acceptance bar:** default path must need **no paid tools and no
  account provisioning**. Paid tools are an optional one-line branch, never required. If a step would
  confuse a non-SEO PO, simplify it.
- **No spaced em dash (" — ")** in any drafted copy. Use commas, colons, periods, parentheses.
- **No new dependencies.** Static site. The skill is plain Markdown instructions.
- Match conventions: skill `description:` frontmatter; endpoint identical to `brand-voice.md.ts`; page
  structure identical to `brand-voice.md` / `icp-persona-research.md`.

## Verification

- `npm run build` passes; `/library/keyword-research` renders as a live play (not coming-soon) with a
  working download; `/starters/keyword-research.md` serves the skill text (HTTP 200, non-empty).
- Sidebar/cards show `Needs: ICP / Persona Research` and `Feeds: Blog Section`, links resolve.
- Skill-instructions review: reads CLAUDE.md + `docs/icp-communities-*.md` with fallbacks; the default
  demand/difficulty checks use only free Google surfaces; paid tools are clearly optional; output
  matches the table structure and includes the honest free-signal note.

## Out of scope

- Blog Section (needs brand-voice + keyword-research; comes after), HDD Experiments.
- Changing the ICP, Value Proposition, or Brand Voice plays.
- Fixing the stale path reference in `traction-plan-skill-design.md` (tracked separately).
