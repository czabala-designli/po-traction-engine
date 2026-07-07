# Claude Code Prompt — PostHog Workflow

Use this prompt at the start of a Claude Code session to build an automated workflow in PostHog — a welcome email drip, a Slack alert, a webhook, whatever you need. PostHog Workflows run on the free plan (10,000 messages/month, email included), so no third-party email tool is required.

There are two parts:

- **Part 1 — Build any workflow.** A general prompt. Fill in the brackets with the trigger, the steps, and where people exit.
- **Part 2 — Worked example.** A waitlist welcome drip, filled in. It's an example to adapt — swap the bracketed values for your product before running.

You don't have to fill in the brackets yourself. Paste the prompt as-is — Claude Code will first discover what it can on its own (events, existing templates, DNS status, anything already in the project's CLAUDE.md), then ask you — one question at a time — for whatever it still needs, confirm the plan, and record what it built so the next session doesn't re-ask. If you'd rather pre-fill the brackets, you still can.

---

## Before you run this — one-time prerequisites

A workflow that sends email will **fail silently** if these are not done first. Ask Claude Code to check each one before it builds anything.

- **Email DNS verified.** PostHog sends email via its own domain setup (SPF, DKIM, DMARC). Until your sending domain shows green in PostHog → Settings → Pipelines → Channels, every email fails with *"email integration domain is not verified."* This can take IT days — raise it early.
- **Email channel active.** PostHog → Workflows → Channels → an Email channel exists with a verified "from" address.
- **`identify()` sets email as a person property.** PostHog Workflows send to `person.properties.email` — **not** the distinct ID, even if the distinct ID *is* the email. Your signup code must call `posthog.identify(email, { email, first_name, ... })`. If email isn't set as a person property, the workflow errors with *"No recipient identifier found."*

---

## Part 1 — Build any workflow

```
I want to build a workflow in PostHog. Use your building-workflows skill and follow its
lifecycle exactly — do not skip steps.

INTAKE — gather what you need before building (don't assume, don't dump questions on me)
- First discover what you can on your own: list events (read-data-schema), existing email
  templates (workflows-list-email-templates), whether an email channel + DNS are set up,
  and anything already recorded in this project's CLAUDE.md. Don't ask me for things you
  can find yourself.
- Then ask me — ONE question at a time, waiting for each answer — only for the gaps: the
  trigger event, the steps, where people exit, and the from-address. Don't ask them all at
  once.
- Play the plan back to me and get a yes before you create anything.

WHAT THE WORKFLOW SHOULD DO

Trigger: [the event that starts it, e.g. "waitlist_signup_submitted"]
  — Confirm this event actually exists in the project first (read-data-schema). Don't
    guess the name.

Steps, in order:
[Describe each step in plain language. Examples:]
- Send an email: [subject + one line on what it says]
- Wait [duration, e.g. "1 day" / "1 week"]
- Branch on [condition] / send a Slack message / call a webhook / etc.

Exit: [when should someone leave the workflow?]
  — "at the end" (default), or
  — "as soon as they [do X in the app]" — this is a conversion exit; you'll need the
    event name for that action (confirm it exists first).

Prevent duplicate enrollment: if the trigger event can fire more than once per person,
add trigger masking keyed on {person.properties.email} (or {person.id}) so the same
person isn't enrolled twice.

HARD RULES — surface these to me, don't work around them

- Every workflow is created as a DRAFT. Do not enable it on your own.
- Test-run it step by step with sample data and show me the trace before we go live.
- "Did event X N times in M days" (behavioral targeting) is NOT supported as a trigger
  or audience. If I ask for that, tell me — don't approximate it with a broken filter.
- For email steps: verify the sending domain DNS is green before enabling, or emails
  fail silently.

PROCESS

1. Compose the graph and create it as a draft.
2. Test-run it step by step, show me the trace at each step.
3. Fix anything, re-test the path you changed.
4. STOP. Show me the final draft and wait for my explicit "yes, enable it" before you
   turn it on. Enabling is a one-way door — a live workflow can't be edited, only
   recreated.
5. Once the draft is approved (or it's live), record a short note in this project's
   CLAUDE.md — workflow name, trigger, what it does, and status — so the next session
   knows it exists and doesn't rebuild it or ask me the same questions again.
```

---

## Part 2 — Worked example: a waitlist welcome drip

This is the workflow a coming-soon / waitlist page needs: welcome new signups, keep them warm with a few paced touchpoints, and **automatically stop the moment they become a real user of the app** so no one gets nurtured after they've already converted.

The prompt below is a **filled-in example to adapt, not a fixed script.** Swap the bracketed values for your product before running — it works for any waitlist, not just the one it was written for.

**Make it yours — replace these:**
- `[PRODUCT NAME]` — your product.
- `[BRAND]` — your colors, logo, and email look. If your project already has branded templates in the PostHog email library, clone them; if not, the `designing-email-templates` skill will build one in your brand.
- `[FROM / SIGN-OFF]` — who the emails come from (a name + a verified sending address).
- `[SIGNUP FIELD]` — an optional field you collect at signup to personalize on (this example uses `top_problem`). Drop the personalization if you don't collect one.
- `[PROBLEM AREA]` — the space your product helps with, for the question/insight copy.
- `[CONVERSION EVENT]` — the event that fires when someone becomes a real user of your app.
- `[NEXT STEP]` / `[CTA LINK]` — what you're inviting them to, and where the button points.

**Design principles baked in:**
- **Paced, not spammy** — welcome immediately, one question a couple of days later, then roughly one touchpoint a week. No daily blasts.
- **Value before asks** — the middle emails give something useful; only the last one asks for the next step.
- **Conversion exit** — a goal on your app's signup event pulls anyone who converts out of the drip on any step. They stop hearing from the waitlist sequence the moment they become a user.
- **No double-enrollment** — trigger masking on email means submitting the form twice doesn't start two drips.
- **Reuse your look and voice** — don't hand-write raw HTML if you can avoid it. Clone an existing branded template from your project's email library, or generate one with the `designing-email-templates` skill, then just edit the copy.

### The sequence

| # | Step | When | Purpose |
|---|---|---|---|
| 1 | Welcome email | Immediately | Confirm they're on the list, set expectations, invite a reply |
| 2 | Wait | 2 days | — |
| 3 | Check-in / question email | Day ~2 | One open question about their biggest problem — drives replies + learning |
| 4 | Wait | 1 week | — |
| 5 | Insight email | Day ~9 | Share something useful — a lesson or story. No ask. Builds trust |
| 6 | Wait | 1 week | — |
| 7 | Update email | Day ~16 | Progress update — what you're building, momentum |
| 8 | Wait | 1 week | — |
| 9 | Invitation email | Day ~23 | Invite the next step (early access / create your account) |
| 10 | Exit | — | End of sequence |

Running the whole time: **exit on conversion** — the instant the person triggers your app-signup event, they leave the drip.

### The prompt

```
Build a waitlist welcome drip in PostHog for [PRODUCT NAME]. Use your building-workflows
skill and follow its lifecycle — draft, test step by step, then wait for my explicit go
before enabling. (If a welcome sequence already exists and is live, it can't be edited —
recreate it as a NEW DRAFT with the steps below, and we'll archive the old one once the
new one is live.)

INTAKE — ask me first, one question at a time (don't guess the brackets)
- Discover first: confirm the trigger event and check whether a [CONVERSION EVENT] exists
  (read-data-schema), list any existing branded email templates, check the email
  channel/DNS, and read this project's CLAUDE.md. Skip anything you can find yourself.
- Then ask me, ONE at a time, only for the gaps: [PRODUCT NAME], [BRAND] (or which existing
  template to clone), [FROM / SIGN-OFF], whether I collect a [SIGNUP FIELD] to personalize
  on, [PROBLEM AREA], and [NEXT STEP] + [CTA LINK]. Confirm the cadence (default: immediate,
  +2 days, then weekly).
- Draft the email copy and play the whole plan back for my approval before you build.

TRIGGER
- Event: waitlist_signup_submitted (confirm it exists via read-data-schema; use your real
  event name if it differs).
- Trigger masking: hash {person.properties.email}, TTL 94608000 (3 years) — no double
  enrollment.

EMAILS — reuse a branded template, don't write raw HTML
- If my project's workflow email library already has branded templates, list them
  (workflows-list-email-templates), clone the design, and only change the copy. If not,
  use the designing-email-templates skill to build one in my brand ([BRAND]).
- Keep liquid templating and personalize on the signup field if I collect one:
     {% if person.properties.[SIGNUP FIELD] != "" %} ...reference their answer... {% else %}
     ...generic version... {% endif %}
- Variables available: {{ person.properties.first_name }}, {{ person.properties.email }},
  {{ person.properties.[SIGNUP FIELD] }}, {{ event.properties.source }} (UTM source).
- To: {{ person.properties.email }}. From: [FROM / SIGN-OFF] — reuse the existing verified
  email channel integration, don't invent a new from-address. These are marketing emails.

STEPS (in order)
1. Welcome email — immediately. Confirm they're on the list, set expectations, invite a reply.
2. Wait 2 days.
3. Check-in email — one open question about their biggest problem in [PROBLEM AREA]. Easy
   to answer in a sentence; drives replies.
4. Wait 7 days.
5. Insight email — one genuinely useful lesson or story related to [PROBLEM AREA]. No ask.
6. Wait 7 days.
7. Update email — short progress update on what I'm building. Momentum, not a pitch.
8. Wait 7 days.
9. Invitation email — invite the next step: [NEXT STEP] (button → [CTA LINK]).
10. Exit.

EXIT ON CONVERSION — the important part
- Set the workflow's exit condition to exit_on_conversion.
- Conversion goal: [CONVERSION EVENT] — the event that fires when someone becomes a real
  user of the app. Confirm it exists via read-data-schema (it may not exist yet if the
  product isn't live — if so, tell me and leave the exit at "end of sequence" for now).
  Put the event in the conversion goal's EVENTS slot, not filters. Window: none.
- Effect: the moment a waitlisted person becomes an actual user, they exit the drip and
  stop receiving nurture emails — no matter which step they're on.

BEFORE YOU BUILD
- Confirm the trigger event exists, and check whether [CONVERSION EVENT] exists yet.
- Confirm the sending domain DNS is verified (green in Settings → Pipelines → Channels),
  or emails fail silently. If it isn't, tell me — don't enable.

PROCESS
- Create as a draft. Test-run each step with a sample person (one with [SIGNUP FIELD] set,
  one without) and show me the trace, including that the conversion exit resolves. Then
  STOP and wait for my explicit yes before enabling — and only archive any old sequence
  once the new one is live.
- Once it's approved, record a short note in this project's CLAUDE.md — workflow name,
  trigger, the cadence, and status — so the next session knows what exists and doesn't
  rebuild it or ask me these questions again.
```

---

## What Claude Code will and won't do

- **Will** create the workflow as a draft, test it step by step, and show you the trace.
- **Will** flag missing prerequisites (unverified DNS, missing events, email not set as a person property) instead of shipping something that fails silently.
- **Won't** enable the workflow without your explicit go — enabling is a one-way door; a live workflow can't be edited over the tools, only recreated as a new draft.
- **Won't** build behavioral targeting ("did X N times in M days") — PostHog doesn't support it as a trigger or audience, and Claude Code should tell you rather than fake it.

---

*Designli | TractionLab | Reusable prompt | PostHog workflow*
