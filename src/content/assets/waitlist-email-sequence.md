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

## The flow

<div style="margin:20px 0 4px;display:flex;flex-direction:column;max-width:420px;">
  <div style="border:1px solid var(--navy-mid);background:var(--navy-card);border-radius:8px;padding:11px 14px;">
    <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted-blue);margin-bottom:2px;">Trigger</div>
    <div style="font-size:13.5px;color:var(--off-white);"><code>waitlist_signup_submitted</code></div>
  </div>
  <div style="text-align:center;color:var(--coral);font-size:12px;padding:5px 0;">↓&nbsp; immediately</div>
  <div style="border:1px solid rgba(248,117,101,0.4);border-left:3px solid var(--coral);background:rgba(248,117,101,0.06);border-radius:8px;padding:11px 14px;">
    <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--coral);margin-bottom:2px;">Email 1 · Welcome</div>
    <div style="font-size:13px;color:var(--muted-blue);">Confirm they're on the list; invite a reply.</div>
  </div>
  <div style="text-align:center;color:var(--coral);font-size:12px;padding:5px 0;">↓&nbsp; wait 5 days</div>
  <div style="border:1px solid rgba(248,117,101,0.4);border-left:3px solid var(--coral);background:rgba(248,117,101,0.06);border-radius:8px;padding:11px 14px;">
    <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--coral);margin-bottom:2px;">Email 2 · Progress</div>
    <div style="font-size:13px;color:var(--muted-blue);">One open question about their problem.</div>
  </div>
  <div style="text-align:center;color:var(--coral);font-size:12px;padding:5px 0;">↓&nbsp; on launch (manual)</div>
  <div style="border:1px solid rgba(248,117,101,0.4);border-left:3px solid var(--coral);background:rgba(248,117,101,0.06);border-radius:8px;padding:11px 14px;">
    <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--coral);margin-bottom:2px;">Email 3 · Launch invite</div>
    <div style="font-size:13px;color:var(--muted-blue);">Direct link to access the product.</div>
  </div>
  <div style="text-align:center;color:var(--muted-blue);font-size:12px;padding:5px 0;">↓</div>
  <div style="border:1px dashed var(--navy-mid);border-radius:8px;padding:8px 14px;text-align:center;color:var(--muted-blue);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Exit</div>
</div>

## The prompt

<a href="/starters/posthog-waitlist-email-workflow-prompt.md" download="posthog-waitlist-email-workflow-prompt.md"><strong>Download the workflow prompt</strong></a> (or <a href="/starters/posthog-waitlist-email-workflow-prompt.md" target="_blank" rel="noopener">view it raw</a> in a new tab).

Then open Claude Code and say: *"Read the posthog-waitlist-email-workflow-prompt.md in my download folder and let's get started."* It drafts the three emails and sets up the PostHog drip that fires them on autopilot.
