---
title: "The Traction Engine"
status: "active"
summary: "The origin project — dogfooding the entire PO traction playbook, in public, for other POs to learn from."
checklistNote: "A curated set of milestone-level markers for this project, not the full day-by-day task map. For the complete kickoff list, see the Task Map Generator (count varies by entry path and injection; up to 58 tasks for a from-scratch mobile build) or the new-project template."
assetsUsed: ["waitlist-landing-page"]
checklist:
  - { milestone: "Day 30 · First user", label: "Waitlist landing page live and collecting signups", done: true }
  - { milestone: "Day 30 · First user", label: "PostHog installed and capturing pageviews site-wide", done: true }
  - { milestone: "Day 30 · First user", label: "Feedback widget → GitHub Issue → Slack flow working", done: true }
  - { milestone: "Day 30 · First user", label: "Privacy Policy and Terms pages live", done: true }
  - { milestone: "Day 30 · First user", label: "PostHog email DNS verified on designli.co", done: true, note: "Verified 2026-07-01" }
  - { milestone: "Day 60 · Activation & growth", label: "Library reshaped into the 30/90-day playbook timeline", done: true }
  - { milestone: "Day 60 · Activation & growth", label: "ICP research shipped as an installable play", done: true }
  - { milestone: "Day 60 · Activation & growth", label: "Re-trigger welcome emails for 3 backfilled early signups", done: false, note: "Pending since DNS verification" }
  - { milestone: "Day 60 · Activation & growth", label: "Brand voice + keyword research plays", done: false, note: "In progress on Blocq" }
  - { milestone: "Day 90 · HDD & first dollar", label: "HDD experiment loop running", done: false }
  - { milestone: "Day 90 · HDD & first dollar", label: "Monetization model documented", done: false }
---

The Traction Engine is the project this whole library grows out of. Rather than
describe how a PO should drive traction, it *does* it — every template here was
first built and proven on this project.

## What happened

We started with a waitlist landing page collecting signups into PostHog, wired a
feedback widget that turns visitor input into GitHub Issues and Slack
notifications, and stood up the legal pages needed before sharing publicly. Along
the way we hit the real-world snags — PostHog email DNS verification, backfilling
early signups — that other POs will hit too.

## What we learned

The biggest unlock was treating PostHog as the only data layer and Claude Code as
the executor: landing page, analytics, and feedback routing all shipped without
touching a dev backlog. The checklist above is kept current through the feedback
widget's "Progress update" flow — this case study updates itself as the project moves.
