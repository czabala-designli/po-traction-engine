---
title: "Feedback Widget"
kind: "play"
phase: "foundation"
status: "live"
summary: "Turn visitor and user feedback into GitHub Issues + Slack notifications, on every surface."
order: 4
---

The feedback widget turns visitor and user input into GitHub Issues plus Slack notifications. It ships on the landing page and on every user-facing surface after it — it's the standard signal-capture mechanism across the whole engagement.

<div style="margin:18px 0;padding:14px 16px;border:1px solid rgba(248,117,101,0.35);border-left:3px solid var(--coral);border-radius:8px;background:rgba(248,117,101,0.06);font-size:14px;line-height:1.6;color:var(--off-white);"><strong style="color:var(--coral);">See it live ↘</strong>&nbsp; The <strong>Feedback</strong> button in the bottom-right corner of this page <em>is</em> the real widget — click it and submit something. It opens a GitHub Issue and pings Slack.</div>

## What it does

- Feedback types: Suggestion / Bug / Question (plus a Progress-update type for internal logging).
- Captures the current URL as a breadcrumb; optional email.
- On submit: creates a GitHub Issue and posts a Slack notification to the project channel.

## The prompts

Download the one that matches your surface:

- **Web** (Astro, Next, etc.) — <a href="/starters/feedback-widget-web-prompt.md" download="feedback-widget-web-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-web-prompt.md" target="_blank" rel="noopener">view raw</a>).
- **Mobile** (React Native, shake-to-report) — <a href="/starters/feedback-widget-mobile-prompt.md" download="feedback-widget-mobile-prompt.md"><strong>download</strong></a> (or <a href="/starters/feedback-widget-mobile-prompt.md" target="_blank" rel="noopener">view raw</a>).

Then open Claude Code and say: *"Read the feedback-widget-web-prompt.md (or feedback-widget-mobile-prompt.md) in my download folder and let's get started."* It builds the widget and wires every submission to a GitHub Issue plus a Slack notification.
