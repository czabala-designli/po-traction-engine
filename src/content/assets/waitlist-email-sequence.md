---
title: "Waitlist Email Sequence"
kind: "play"
phase: "foundation"
status: "live"
summary: "The 3-email waitlist drip (confirm → progress → launch) that runs on autopilot from the first signup."
order: 3
---

The three-email waitlist drip that runs on autopilot from the first signup — confirmation, a day-5 progress note, and a launch invite. Built on PostHog Workflows (Loops.so is the fallback if Workflows aren't on your plan).

## What it does

- Triggered by the `waitlist_signup_submitted` event.
- Email 1 (immediate) confirmation → Email 2 (day 5) progress → Email 3 launch invite (fired manually when the product is ready).
- Personalized with `first_name`; trigger-masked on email so nobody gets the sequence twice.

## The prompt

<a href="/starters/posthog-waitlist-email-workflow-prompt.md" download="posthog-waitlist-email-workflow-prompt.md"><strong>Download the workflow prompt</strong></a> (or <a href="/starters/posthog-waitlist-email-workflow-prompt.md" target="_blank" rel="noopener">view it raw</a> in a new tab).

Then open Claude Code and say: *"Read the posthog-waitlist-email-workflow-prompt.md in my download folder and let's get started."* It drafts the three emails and sets up the PostHog drip that fires them on autopilot.
