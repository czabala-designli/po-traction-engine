---
title: "Waitlist Landing Page"
kind: "template"
phase: "foundation"
status: "live"
summary: "A static landing page that collects waitlist signups straight into PostHog — no backend."
previewUrl: "/waitlist"
starter: true
order: 2
---

A single-page, static waitlist landing page. It collects signups directly into
PostHog (the only data layer), fires clean analytics events, and needs no
backend, database, or auth. This is the exact pattern running live at
[`/waitlist`](/waitlist).

## When to use it

Reach for this the moment you have a value proposition and want to measure
demand before building anything. It is the fastest way to turn interest into a
measurable signal.

## Set it up from scratch

This template isn't a one-off prompt — it's a full Claude Code setup. Drop the
CLAUDE.md starter into a fresh repo and let Claude Code drive the build:

1. Create a new GitHub repo and scaffold a minimal Astro project.
2. Add the starter to the repo root as `CLAUDE.md` — <a href="/starters/claude-md-landing-page-starter.md" download="claude-md-landing-page-starter.md"><strong>download the CLAUDE.md starter</strong></a> (or <a href="/starters/claude-md-landing-page-starter.md" target="_blank" rel="noopener">view it raw</a> in a new tab).
3. Open Claude Code and say: *"Read the claude-md-landing-page-starter.md in my download folder and let's get started."* It runs the guided onboarding — product, accounts, PostHog, brand — and builds the page with you.

The starter encodes everything on this page: the PostHog `identify()` and cohort rules, the welcome-email sequence, the UTM kit, the feedback widget, and the legal pages — so you don't have to remember any of it.

## After it's live

The starter builds and wires everything — these are the moves that are yours to make once it's up:

- Share one **UTM-tagged URL per channel** — never the bare URL, so you can see what each channel drives.
- Watch signups land in PostHog; the weekly Slack digest summarizes them for you.
- Reply to the day-1 welcome email question — that's your first real user learning.
- Iterate on the headline and CTA based on what actually converts.

## Why it works

- **PostHog is the only data layer** — no backend or database to build or maintain.
- **Nothing touches the dev backlog** — you ship it yourself, in hours.
- **Measurable from the first deploy** — you know which channels work before you scale any of them.
