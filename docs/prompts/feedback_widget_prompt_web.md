# Claude Code Prompt — Feedback Widget

Use this prompt at the start of a Claude Code session to add a feedback widget to any existing project. Replace the bracketed values before running.

---

## Part 1 — Build the widget

```
This project needs a feedback widget. Add it to every user-facing surface in this codebase.

WHAT IT MUST DO

A small button fixed to the bottom right of every page labeled "Feedback".
On click, opens a panel with:
- A feedback type selector: Suggestion / Bug / Question
- An optional email field (include if there is no logged-in session; skip if the user is always authenticated and their email is available)
- A text area for the message

On submission:
- Capture the full current URL including any query parameters as a breadcrumb
- If a logged-in user session exists, attach their email automatically — do not show the email field
- Create a GitHub Issue with: feedback type, breadcrumb, user email (from session or field), and message body
- Send a Slack notification to the project channel with a one-line summary and a link to the GitHub Issue
- Show an inline confirmation message and close the panel

ENVIRONMENT VARIABLES — never hardcode these values

GITHUB_TOKEN=           [set in project env]
GITHUB_REPO=            [owner/repo-name]
SLACK_WEBHOOK_URL=      [set in project env]

Read these from environment variables. Do not ask me to hardcode them anywhere.

PLACEMENT

Add the widget to every user-facing page or screen in this project. If this is a React or Next.js app, add it to the root layout. If this is Astro, add it to the base layout component. If neither applies, identify the correct insertion point before writing any code and confirm with me first.

Before writing any code, tell me which files you plan to modify and what you plan to add. Wait for a yes before proceeding.
```

---

## Part 2 — Issue response flow

Paste this as a standing instruction at the start of any session where you will be working on feedback issues. It tells Claude Code exactly how to handle every issue that comes in from the widget.

```
When I ask you to handle a feedback issue from the widget, always follow this sequence. Do not skip steps.

STEP 1 — Read the issue

gh issue view <number> --repo <GITHUB_REPO>

Extract: feedback type (Bug / Suggestion / Question), the message body, the submitter email if present, and the page URL breadcrumb.

STEP 2 — Analyze before touching code

- Bug: reproduce the described behavior first. Trace the relevant code from the breadcrumb URL to find the responsible component. Do not propose a fix until you understand the root cause.
- Suggestion: assess scope before acting. Is it a quick CSS or copy change, or does it require design input? If unclear, ask me before doing anything.
- Question: answer directly if possible. If answering requires a code change, treat it as a Suggestion.

If the issue is ambiguous or the decision belongs to me, ask before writing any code.

STEP 3 — Propose, then implement

- Low-risk changes (typos, color, copy, spacing): implement first, show the diff, then ask for my approval before deploying.
- Anything requiring judgment (layout, new behavior, new features): propose the approach and wait for a clear yes before writing code.

STEP 4 — Deploy, close, and notify

Once the fix is live, do all three of these in one go — do not stop after any single one:

1. Close the GitHub issue with an explanatory comment:
   gh issue comment <number> --repo <GITHUB_REPO> --body "<what changed and why>"
   gh issue close <number> --repo <GITHUB_REPO>

2. Find the Slack notification for this issue and reply in its thread:
   - Search the project channel for the bot message that references this issue number
   - Reply with: what was fixed, confirmation it is live, and a link to the production URL
   - Always use thread_ts — reply inside the notification thread, never as a standalone channel message

3. Do not tell me the task is complete until both GitHub is closed and the Slack thread is updated.

NOTES
- The Slack notification always exists — it was posted the moment the issue was created. Search the channel if it is not immediately visible.
- GitHub repo and Slack channel ID are in the project env or TBD section of CLAUDE.md if one exists.
```

---

*Designli | TractionLab | Reusable prompt | Feedback widget*
