---
title: "Feedback Widget"
kind: "play"
phase: "foundation"
status: "live"
summary: "Turn visitor and user feedback into GitHub Issues + Slack notifications, on every surface."
order: 4
---

The feedback widget turns visitor and user input into GitHub Issues plus Slack notifications. It ships on the landing page and on every user-facing surface after it — it's the standard signal-capture mechanism across the whole engagement.

## What it does

- Feedback types: Suggestion / Bug / Question (plus a Progress-update type for internal logging).
- Captures the current URL as a breadcrumb; optional email.
- On submit: creates a GitHub Issue and posts a Slack notification to the project channel.

## The prompts

Download the one that matches your surface:

- **Web** (Astro, Next, etc.) — <a href="/starters/feedback-widget-web-prompt.md" download="feedback-widget-web-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-web-prompt.md" target="_blank" rel="noopener">view raw</a>).
- **Mobile** (React Native, shake-to-report) — <a href="/starters/feedback-widget-mobile-prompt.md" download="feedback-widget-mobile-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-mobile-prompt.md" target="_blank" rel="noopener">view raw</a>).

Then open Claude Code and say: *"Read the feedback-widget-web-prompt.md (or feedback-widget-mobile-prompt.md) in my download folder and let's get started."* It builds the widget and wires every submission to a GitHub Issue plus a Slack notification.
