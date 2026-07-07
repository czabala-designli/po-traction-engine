---
title: "Waitlist Landing Page"
status: "live"
summary: "A static landing page that collects waitlist signups straight into PostHog — no backend."
previewUrl: "/waitlist"
order: 1
---

A single-page, static waitlist landing page. It collects signups directly into
PostHog (the only data layer), fires clean analytics events, and needs no
backend, database, or auth. This is the exact pattern running live at
[`/waitlist`](/waitlist).

## When to use it

Reach for this the moment you have a value proposition and want to measure
demand before building anything. It is the fastest way to turn interest into a
measurable signal.

## The prompt

Paste this into your own Claude Code session inside a fresh Astro project:

    Build a static waitlist landing page in Astro. Requirements:
    - Hero with headline, subtitle, and a waitlist form (first name, email, optional "top problem").
    - On submit: fire a `waitlist_signup_submitted` PostHog event with first_name,
      email, top_problem, and source (UTM source from the URL if present), then call
      posthog.identify(email, { first_name, email, waitlisted: true }).
    - Hide the form and show an inline "You're on the list" confirmation — no redirect.
    - Persist the signed-up state in localStorage so returning visitors never see the form again.
    - No backend, no database. PostHog is the only data layer.

## Playbook

1. Confirm PostHog is installed and the public project key is in your `.env`.
2. Generate the page with the prompt above, then wire the form to your PostHog instance.
3. Verify `waitlist_signup_submitted` fires against your internal cohort before sharing.
4. Generate one UTM-tagged URL per channel — never share the untagged base URL.
5. Share, watch signups land in PostHog, and iterate on the copy.
