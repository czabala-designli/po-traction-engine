# Claude Code Prompt — PostHog Workflow

Use this prompt at the start of a Claude Code session to build an automated workflow in PostHog — a welcome email drip, a Slack alert, a webhook, whatever you need. PostHog Workflows run on the free plan (10,000 messages/month, email included), so no third-party email tool is required.

There are two parts:

- **Part 1 — Build any workflow.** A general prompt. Fill in the brackets with the trigger, the steps, and where people exit.
- **Part 2 — Worked example.** The waitlist welcome drip, already filled in. Copy it and tweak the copy for your product.

Replace the bracketed values before running.

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
```

---

## Part 2 — Worked example: waitlist welcome drip

This is the workflow a coming-soon / waitlist page actually needs: welcome new signups, keep them warm with a few paced touchpoints, and **automatically stop the moment they become a real user of the app** so no one gets nurtured after they've already converted.

It's modeled on The Traction Engine's live "Waitlist Welcome Sequence" — which today is just **two** emails (welcome + a day-1 check-in, exit at the end). This example **extends** that into a paced multi-week drip and adds the conversion exit.

**Design principles baked in:**
- **Paced, not spammy** — welcome immediately, one question a couple of days later, then roughly one touchpoint a week. No daily blasts.
- **Value before asks** — the middle emails give something useful; only the last one asks for the next step.
- **Conversion exit** — a goal on your app's signup event pulls anyone who converts out of the drip on any step. They stop hearing from the waitlist sequence the moment they become a user.
- **No double-enrollment** — trigger masking on email means submitting the form twice doesn't start two drips.
- **Reuse the existing look and voice** — don't hand-write new HTML. The project's email library already has branded templates (navy card, coral border, Georgia headline, "— Carlos / Designli" sign-off, liquid `top_problem` personalization). Clone those and edit the copy.

### The sequence

| # | Step | When | Status | Purpose |
|---|---|---|---|---|
| 1 | Welcome email | Immediately | Live today | Confirm they're on the list, set expectations, invite a reply |
| 2 | Wait | 2 days | Live (currently 1d) | — |
| 3 | Check-in / question email | Day ~2 | Live today | One open question about their biggest problem — drives replies + learning |
| 4 | Wait | 1 week | New | — |
| 5 | Insight email | Day ~9 | New | Share something useful — a lesson or story. No ask. Builds trust |
| 6 | Wait | 1 week | New | — |
| 7 | Update email | Day ~16 | New | Progress update — what you're building, momentum |
| 8 | Wait | 1 week | New | — |
| 9 | Invitation email | Day ~23 | New | Invite the next step (early access / create your account) |
| 10 | Exit | — | — | End of sequence |

Running the whole time: **exit on conversion** — the instant the person triggers your app-signup event, they leave the drip.

### The prompt

```
Extend the waitlist welcome drip in PostHog. Use your building-workflows skill and follow
its lifecycle. A live "Waitlist Welcome Sequence" already exists (welcome + a day-1
check-in, then exit). A live workflow can't be edited, so recreate it as a NEW DRAFT with
the extra touchpoints and the conversion exit below, test it, and wait for my explicit go
before we enable it and archive the old one.

TRIGGER (keep as-is)
- Event: waitlist_signup_submitted (confirm via read-data-schema).
- Trigger masking: hash {person.properties.email}, TTL 94608000 (3 years) — no double
  enrollment.

EMAILS — reuse the existing library, don't write raw HTML
- The project's workflow email library already has branded templates ("Welcome Email to
  Traction Engine", "Follow-up emails (#1)"). List them (workflows-list-email-templates),
  clone that design, and only change the copy. Use the designing-email-templates skill for
  edits.
- Keep the house style: navy #0E1034 background, #161A4A card with a #F87565 coral left
  border, "THE TRACTION ENGINE" eyebrow, Georgia serif headline, Calibri body, coral CTA
  button, "— Carlos / Designli" sign-off, "Designli · Internal initiative · 2026" footer.
- Keep liquid templating and the top_problem personalization pattern:
     {% if person.properties.top_problem != "" %} ...reference their answer... {% else %}
     ...generic ask... {% endif %}
- Variables: {{ person.properties.first_name }}, {{ person.properties.email }},
  {{ person.properties.top_problem }}, {{ event.properties.source }} (UTM source).
- To: {{ person.properties.email }}. From: reuse the existing email channel integration
  (don't invent a new from-address). These are marketing emails.

STEPS (in order)
1. Welcome email — immediately (reuse the live welcome copy).
2. Wait 2 days.
3. Check-in email — the "one question about your biggest problem" email (reuse the live
   day-1 check-in copy).
4. Wait 7 days.
5. Insight email — one genuinely useful lesson/story about owning traction as a PO. No ask.
6. Wait 7 days.
7. Update email — short progress update on what we're building. Momentum, not a pitch.
8. Wait 7 days.
9. Invitation email — invite the next step ([early access / create your account]).
10. Exit.

EXIT ON CONVERSION — the important part
- Set the workflow's exit condition to exit_on_conversion.
- Conversion goal: the event that fires when someone creates an account / becomes a real
  user of the app — confirm the exact event name via read-data-schema (likely something
  like user_signed_up or account_created; it may not exist yet if the product isn't live —
  if so, tell me and we'll leave the exit at "end of sequence" for now). Put the event in
  the conversion goal's EVENTS slot, not filters. Window: none.
- Effect: the moment a waitlisted person becomes an actual user, they exit the drip and
  stop receiving nurture emails — no matter which step they're on.

BEFORE YOU BUILD
- Confirm waitlist_signup_submitted exists, and check whether the app-signup conversion
  event exists yet.
- Confirm the sending domain DNS is verified (green in Settings → Pipelines → Channels),
  or emails fail silently. If it isn't, tell me — don't enable.

PROCESS
- Create as a draft. Test-run each step with a sample person (one with top_problem set,
  one without) and show me the trace, including that the conversion exit resolves. Then
  STOP and wait for my explicit yes before enabling — and only archive the old sequence
  once the new one is live.
```

---

## What Claude Code will and won't do

- **Will** create the workflow as a draft, test it step by step, and show you the trace.
- **Will** flag missing prerequisites (unverified DNS, missing events, email not set as a person property) instead of shipping something that fails silently.
- **Won't** enable the workflow without your explicit go — enabling is a one-way door; a live workflow can't be edited over the tools, only recreated as a new draft.
- **Won't** build behavioral targeting ("did X N times in M days") — PostHog doesn't support it as a trigger or audience, and Claude Code should tell you rather than fake it.

---

*Designli | TractionLab | Reusable prompt | PostHog workflow*
