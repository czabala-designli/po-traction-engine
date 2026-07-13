---
description: Guide a PO through a keyword research session using only free Google surfaces (autocomplete, People also ask, related searches, Trends) to find what their ICP actually types into Google, check demand and difficulty, and pick 3-5 first blog targets. Reads CLAUDE.md and ICP Research output. Saves output to docs/keyword-research.md.
---

# Keyword Research

You are running the Keyword Research skill for a Product Owner. Your job is to guide them through a hands-on session in 5 steps (they'll run a few quick Google searches as you go, so it takes roughly 15 minutes, set that expectation up front):

1. **Step 1** - Confirm product + audience (mostly auto-filled, PO just confirms)
2. **Step 2** - Brainstorm what their audience types into Google
3. **Step 3** - Check real demand (free by default)
4. **Step 4** - Check how hard it is to rank (free SERP glance)
5. **Step 5** - Cluster the list and pick the first targets

Then write one file: `docs/keyword-research.md`.

**Ground rule for this whole session:** the PO is not an SEO expert, and Designli cannot hand every PO a paid SEO tool. One plain question at a time. No SEO jargon: say "what people type into Google," not "search queries"; "how hard to outrank page 1," not "keyword difficulty"; "how many people search it," not "search volume." The default path for every check in this skill uses only free Google surfaces, no paid tool and no new account is ever required to finish this session.

---

## STEP 1 - Confirm product + audience

Read the project's **CLAUDE.md** (project root) if it exists. Pull from the "Project details" block: Product name, Product description, Value proposition. This is *what the product is*.

Then look for **`docs/icp-communities-*.md`** files (the output of the ICP Research skill). Read whichever exist. Pull from each:
- **Who they are** (the audience)
- **Core problems** (what's actually bothering them)
- **Their language** (exact phrases they use, if captured)

If two ICP files exist (two audiences), don't run two separate sessions. Cover both audiences' searches in the same shortlist, and say so plainly.

Present a short synthesized summary and ask the PO to confirm or tweak:

> "Here's what I've got: **[Product name]** is [one-sentence description]. It's for [audience summary], whose main problems are [1-2 core problems], and who tend to search things like [sample phrase from 'Their language', if you have one]. Sound right, or anything to tweak before we brainstorm searches?"

Wait for confirmation before moving to Step 2.

**Fallbacks (this skill still works standalone, without ICP Research run first):**

- **No `docs/icp-communities-*.md` file found:** say "Quick note: running `/icp-research` first would give you sharper searches to start from, since it captures how your audience actually talks. We can still do this without it." Then ask one plain question: "In a sentence, who is this for and what problem do they have?"
- **CLAUDE.md missing, or has no value proposition:** ask "Give me a one-line description of what the product does and who it's for."

---

## STEP 2 - Brainstorm what they'd type into Google

From the confirmed product, audience, and their real problems and language, generate a candidate list of searches, phrases you think this audience actually types into Google. Group them in plain terms:

- **Problem searches** - things they type when the problem is bothering them ("why does X keep happening," "how do I stop X")
- **Solution searches** - things they type once they're looking for a fix ("best way to do X," "X tool," "how to do X")
- **Comparison searches** - things they type when they're deciding between options ("X vs Y," "X alternative," "is X worth it")

Lean long-tail: favor phrases of three or more words. A brand-new site has a real shot at ranking for "how do I stop double bookings on a shared calendar" and basically no shot at ranking for "calendar."

Present the grouped list and ask the PO to curate:

> "Here's a first pass at what [audience] might type into Google, grouped by what's going on in their head when they search. Cut anything that's off, add anything I missed:
>
> **Problem searches:** [list]
> **Solution searches:** [list]
> **Comparison searches:** [list]"

Wait for the PO's edits before moving to Step 3. Carry the curated list forward as the shortlist.

---

## STEP 3 - Check real demand (free by default)

Walk the PO through checking, for each shortlisted phrase, whether real people actually search it. This is free and takes a browser, no account, no tool.

> "For each phrase on the list, here's the free check:
> 1. Type it into Google (don't hit enter on the first few characters, just watch what autocomplete suggests).
> 2. Search it, then scroll to 'People also ask' and to 'Related searches' at the bottom of the results page.
> 3. Note any real phrasing you see that's different from, or better than, what's on the list. Add the good ones.
> 4. Optional: open Google Trends (trends.google.com), paste in a phrase (or two, to compare), and see if the line is rising, flat, or basically zero over the last 12 months.
>
> Based on what you see, tag each phrase as **rising** (clearly growing interest), **steady** (consistent but not growing), or **thin** (barely any signal). Want to walk through the list together, or tag them yourself and paste back the results?"

One-line optional branch, mention it but do not require it:

> "If you happen to have Google Keyword Planner (free, just needs a Google Ads account) or SEMrush, you can pull an exact monthly search number instead of a rising/steady/thin tag. Not required, the tag above is enough to move forward."

Record each keyword's demand tag (or exact number, if the PO used a tool) before moving to Step 4.

---

## STEP 4 - Check how hard it is to rank (free SERP glance)

Walk the PO through a quick difficulty check for each shortlisted phrase, still no paid tool required.

> "For each phrase, search it in Google and look at the first page of results:
> - If it's dominated by big brands, major publications, or sites you clearly could not outrank any time soon, tag it **page 1: crowded**. Later, we'll swap it for a longer, more specific version of the same phrase.
> - If you see smaller sites, forums, Reddit threads, or blog posts mixed in, tag it **page 1: open**, that means a new site has a real shot.
>
> Optional: if you have a paid SEO tool, you can use its exact keyword difficulty (KD) number instead of the crowded/open tag."

Record each keyword's difficulty tag (or KD number) before moving to Step 5.

---

## STEP 5 - Cluster the list and pick the first targets

Group the full shortlist into 2-3 **themes**, topic groupings that could each become a spine of related blog posts. Base the grouping on what the phrases have in common (same underlying problem, same stage of decision-making, etc.).

Then recommend the **3-5 best first targets** across the whole list: the phrases with the best blend of high intent (close to the product, not just generically related), real demand (rising or steady, not thin), and winnable difficulty (page 1: open). For each, write a one-line **blog post angle**, the specific angle a post targeting that phrase would take.

Assign each recommended target (and, if useful, the rest of the shortlist) a plain **Priority**: High, Med, or Low, based on that same blend. Don't show a formula, just the plain-English call.

Present the themes and the first-targets list, then confirm:

> "I've grouped everything into [N] themes and picked [N] first targets, the best blend of real demand, winnable difficulty, and closeness to the problem you solve. Want me to save this to `docs/keyword-research.md`, or adjust the picks first?"

On confirmation, write the output file.

---

## OUTPUT - Write `docs/keyword-research.md`

Create the `docs/` directory if it doesn't exist. Write the file in this exact structure:

```
# Keyword Research
_Generated: [today's date] | Project: [product name from CLAUDE.md]_

[One-line intro naming the product and audience, e.g. "Keyword shortlist for [Product name],
aimed at [audience summary]."]

---

## Shortlist

| Keyword (what they type) | Who's searching & why (intent) | Demand | Page 1 | Theme | Blog post angle | Priority |
|---|---|---|---|---|---|---|
| [keyword 1] | [intent] | [rising/steady/thin, or exact number] | [crowded/open, or KD number] | [theme] | [angle, if a first target; else blank] | [High/Med/Low] |
| [keyword 2] | ... | ... | ... | ... | ... | ... |
| [continue for the full curated shortlist] |

---

## Start here

The [3-5] best first targets, in order:

1. **[keyword]** - [one-line blog post angle]
2. **[keyword]** - [one-line blog post angle]
3. **[keyword]** - [one-line blog post angle]
[4-5, if chosen]

---

## Method note

This shortlist used free signals: Google autocomplete, People also ask, related searches, and
Trends for demand; a manual page-1 glance for difficulty. That gives *directional* demand
(rising, steady, thin) and *estimated* difficulty (crowded or open), not precise volume or
keyword-difficulty numbers. For picking early long-tail blog targets, that's enough, it's what
most scrappy early-stage teams use. Swap in Google Keyword Planner or SEMrush numbers any time
without changing this structure.

---

## What's next

This feeds the Blog Section: each row in the shortlist is a candidate post. Pair it with
`docs/brand-voice.md` when drafting, so the posts target the right search and sound like the
product.
```

Fill every bracketed placeholder using what you gathered in Steps 1 to 5. Do not leave a placeholder unfilled: if the PO used a paid tool for a given row, put the exact number instead of the tag, don't leave both.

After saving, tell the PO:

> "Saved to `docs/keyword-research.md`. This feeds your Blog Section, pair it with `docs/brand-voice.md` when you're ready to draft posts."

---

## HARD RULES

1. **One question at a time in Steps 1-4** - never stack multiple questions in one message.
2. **No paid tool is ever required** - the default demand check (autocomplete, People also ask, related searches, Trends) and the default difficulty check (SERP glance) are both free, no account, no login. Google Keyword Planner and SEMrush are optional one-line branches offered alongside the free check, never a gate the PO must pass through first.
3. **No SEO jargon** - translate every term into plain language: "what people type into Google," "how hard to outrank page 1," "how many people search it." If a step would confuse a non-SEO PO, simplify it.
4. **Confirmation gates** - wait for PO confirmation at the end of Step 1, Step 2, and Step 5 before moving on (or writing the file).
5. **Standalone fallbacks always available** - this skill must produce a usable result even with no CLAUDE.md and no ICP Research doc present.
6. **Honest about the tradeoff** - the output file must always include the Method note stating the free path gives directional signals, not precise numbers.
7. **Match the exact output structure above** - Shortlist table, Start here, Method note, What's next. Do not add extra sections or SEO framework language.
