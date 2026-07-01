# Design Spec: Bug Report Lifecycle Notifications

**Date:** 2026-07-01
**Project:** The Traction Engine — TractionLab
**Owner:** Carlos Zabala (PO)
**Status:** Approved — ready for implementation

---

## What this is

Today, someone who reports a bug through the feedback widget gets zero further communication. The widget creates a GitHub Issue and notifies the internal Slack channel, but the reporter never hears back — not when work starts, not when it ships. This closes that gap by giving bug reporters three automatic emails as their report moves through its lifecycle, and a single acknowledgment email for Suggestions/Questions.

Reporters are a known, closed circle (client + testers) already trackable in PostHog — not anonymous public traffic — which is what makes an email-based lifecycle practical here.

**Explicitly out of scope:** Suggestions and Questions only get one acknowledgment email, not the full lifecycle. Batching multiple same-day updates to the same person into a single digest — separate emails per report are simpler and acceptable at this reporter volume.

---

## Problem

- The feedback widget (`FeedbackWidget.astro` + `api/feedback.ts`) never calls PostHog `identify()`/`capture()` — it posts directly to `/api/feedback`, bypassing PostHog entirely.
- Email is optional for every feedback type today, so there's often no way to reach a reporter back even if we wanted to.
- The existing "issue response flow" (CLAUDE.md, and the reusable `docs/prompts/feedback_widget_prompt_web.md` / `feedback_widget_prompt_mobile.md` templates) only notifies the *internal* Slack channel — never the reporter.

---

## Architecture: fire lifecycle events server-side, not from the client

The PostHog event that marks a report as "received" is fired **server-side** (from `api/feedback.ts`, right after the GitHub issue is created), not from the browser widget. This is the key architectural decision and it's what makes the design reusable beyond this landing page:

- The React Native shake-to-report pattern (`feedback_widget_prompt_mobile.md`) already creates the GitHub issue via a server-side backend proxy and resolves the reporter's identity from a bearer token — there's no client-side PostHog call to mirror even if one were added.
- Firing server-side means the mechanism is a **plain HTTP POST**, not an SDK call: `POST {PUBLIC_POSTHOG_HOST}/i/v0/e/` with `api_key: PUBLIC_POSTHOG_PROJECT_TOKEN`, `event`, `distinct_id: <reporter email>`, and `properties: { $set: { email }, ... }`. Both env vars already exist in `.env`/Vercel (same ones `posthog.astro` uses client-side) — no new secrets needed. `$set` is the server-side equivalent of `identify()`. Any backend language/framework can make this call — it doesn't depend on the PostHog JS SDK being loaded in a browser.
- The two later lifecycle events (in-progress, resolved) were always going to fire this way — via `curl` during the ops-side issue-response flow. Making the *first* event fire the same way makes the whole lifecycle consistently server/ops-side, with one calling convention instead of two.
- **Limitation, stated explicitly rather than glossed over:** if a reporter can't be identified server-side (no email provided, no session/bearer token on mobile), lifecycle emails are silently skipped. The internal Slack notification still fires as it does today — there is just no reporter-facing email for that report.

---

## Event schema (platform-agnostic contract)

Distinct ID convention: **always the reporter's email**, matching this project's existing Rule 1 (`identify()`/`$set` must carry `email` as an explicit person property — never rely on distinct_id alone). This is what lets `bug_in_progress`/`bug_resolved`, fired hours or days later from a disconnected `curl` call during the ops flow, reattach to the same PostHog person with no session or database lookup.

| Event | Fired when | Fired by | Properties |
|---|---|---|---|
| `bug_reported` | GitHub issue created, type = Bug, email present | Server (`api/feedback.ts`) | `issue_number`, `issue_title`, `issue_url`, `url` (breadcrumb) |
| `feedback_acknowledged` | GitHub issue created, type = Suggestion/Question, email present | Server (`api/feedback.ts`) | `issue_number`, `issue_title`, `issue_url`, `feedback_type` |
| `bug_in_progress` | Claude Code begins the fix (issue-response flow, Step 3) | Ops-side `curl` | `issue_number`, `issue_title` |
| `bug_resolved` | Issue closed (issue-response flow, Step 4) | Ops-side `curl` | `issue_number`, `issue_title`, `production_url` |

`issue_title` reuses the existing truncation logic already in `api/feedback.ts:27` (`[${type}] ${message.slice(0, 60)}…`) so every event maps to a specific, nameable report — required because a reporter can have more than one bug open at once, and the email must say which one it's about (e.g. "Issue #52 — [title] — is now in progress").

**No trigger masking** on any of these four events. This project's welcome sequence deliberately masks on `{person.properties.email}` to *prevent* a duplicate send to the same person — the opposite of what's needed here. Each event occurrence must independently trigger its own workflow execution and its own email, since the same person can file multiple unrelated bugs over time. PostHog's default (no masking) already does this — it just must not be added.

---

## Trigger points — layered onto the existing issue-response flow

No new steps in the ops flow, just two additions to the flow already defined in CLAUDE.md and both `docs/prompts/feedback_widget_prompt_*.md` templates:

- **Step 1 (Read the issue)** — unchanged, but the reporter's email (already in the issue body per the existing template) is now also needed for Steps 3/4.
- **Step 3 (Propose, then implement)** — before starting implementation on a Bug, fire `bug_in_progress` via `curl` to PostHog's capture endpoint.
- **Step 4 (Deploy, close, and notify)** — becomes four actions instead of three: close the issue, reply in the Slack thread (as today), and fire `bug_resolved` via `curl`.

---

## Concrete file changes — po-traction-engine

| File | Change |
|---|---|
| `src/pages/api/feedback.ts` | Require `email` when `type === 'Bug'` (400 if missing). After the GitHub issue is created successfully, POST to PostHog's capture endpoint: `event: bug_reported` (Bug) or `feedback_acknowledged` (Suggestion/Question, only if email present), `distinct_id: email`, `properties: { $set: { email }, issue_number, issue_title, issue_url, url }`. |
| `src/components/FeedbackWidget.astro` | Add client-side required-field validation on the email input when Bug is selected; label copy changes from "optional" to "so we can update you as we fix it." No PostHog calls added here — that logic lives server-side. |
| `CLAUDE.md` (Feedback widget — issue response flow) | Step 3 gains a line to fire `bug_in_progress` via `curl` before implementation starts. Step 4 gains firing `bug_resolved` via `curl` alongside the existing close/Slack-reply actions. |
| PostHog (manual UI setup) | Four new Workflows — see below. |

---

## PostHog Workflows

Four linear workflows, one per event, no branching logic to maintain — consistent with why the existing welcome sequence is built as simple linear flows:

| Workflow | Trigger event | Email direction |
|---|---|---|
| Bug received | `bug_reported` | "We got your report on [issue_title] — we'll keep you posted." |
| Bug in progress | `bug_in_progress` | "We're working on [issue_title] now." |
| Bug resolved | `bug_resolved` | "Fixed! [issue_title] is live — would love if you could retest. Thanks for helping strengthen the product." + production URL |
| Feedback acknowledged | `feedback_acknowledged` | "Got your [Suggestion/Question] — thanks for the input." (single email, no further stages) |

All four reuse the existing sending identity/domain already verified for the welcome sequence — no new DNS or channel setup required. Email templates reference event properties the same way the welcome sequence already does with `{{ event.properties.source }}` (e.g. `{{ event.properties.issue_title }}`).

---

## Reusable template updates

Add a new **Part 3 — Reporter lifecycle notifications** to both `docs/prompts/feedback_widget_prompt_web.md` and `docs/prompts/feedback_widget_prompt_mobile.md`, written once and referenced identically in both, since Section "Trigger points" above establishes this is pure ops-flow and platform-agnostic. It documents:

- The 4-event contract and property schema above
- The `distinct_id = email` convention
- The rule that lifecycle events always fire server/ops-side, never from a client SDK
- The no-masking rule
- The explicit limitation: unidentified reporters (no email, no session) only get the internal Slack notification — no lifecycle emails

---

## Testing / validation plan

- Submit a Bug report without an email → confirm client-side validation blocks submission with the updated copy.
- Submit a Bug report with an email → confirm the GitHub issue is created, then confirm a `bug_reported` event appears on that person's PostHog profile with the correct `issue_number`/`issue_title`, and that the "Bug received" workflow email arrives.
- Submit a Suggestion/Question with an email → confirm `feedback_acknowledged` fires and the single acknowledgment email arrives; confirm no email is required or sent when the email field is left blank.
- Run the updated issue-response flow (Step 3, Step 4) against a test issue → confirm `bug_in_progress` and `bug_resolved` fire with matching `distinct_id`, and land on the same PostHog person profile as the original `bug_reported` event.
- File two bug reports from the same test email → confirm both progress independently and each produces its own set of emails referencing its own `issue_title`, with no cross-talk between the two.
