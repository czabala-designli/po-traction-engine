# CLAUDE.md — TractionLab Landing Page
Designli | TractionLab | PO-owned project

This file gives Claude Code the context it needs to work on this project without asking unnecessary questions. Read it before doing anything else.

> **First time?**
> 1. Rename this file to `CLAUDE.md`
> 2. Drop it in the root of your project folder
> 3. Open Claude Code and say: "Read CLAUDE.md and let's get started"

---

## What this project is

A coming-soon landing page for a TractionLab engagement. Its only job is to collect waitlist signups and feed them into PostHog. There is no backend, no database, no auth. PostHog is the source of truth for all signups until the full product exists.

This is a PO-owned project. The tech lead is not involved here. Keep solutions simple and within the PO's ability to maintain.

The person running this Claude Code session is a Product Owner, not a developer. Prefer plain explanations over technical jargon. When multiple approaches exist, always choose the simpler one. If a step requires terminal commands or config changes, explain what the command does. For low-risk commands (installs, file creation, local config), just run it. For mid-to-high risk commands (deployments, deletions, env changes, anything that affects production), explain and wait for explicit approval before executing.

---

## First-time setup

If the Project details block below still has `[FILL IN]` placeholders, this project has not been set up yet. Run the setup flow before doing anything else.

### Step 1 — Guided onboarding

Ask the PO the following questions one at a time. Wait for each answer before moving to the next. Do not ask them all at once.

**Product information**
1. What is the product called?
2. Describe the product in one sentence — what does it do?
3. Who is it for? Describe the target user in a sentence.
4. Do you have a value proposition written? If yes, paste it. If no, we will draft one together after setup is complete.
5. What is the domain name for this product? (Even if it is not connected yet — just the name.)
6. Do you have brand colors? If yes, share the hex codes. If no, describe the visual style you are going for.
7. Do you have a logo file ready? If yes, what is the filename?

**Accounts — walk through this list one item at a time**

If an account does not exist yet, pause, guide the PO to create it, and wait for confirmation before continuing. Do not skip ahead.

1. **GitHub** — Does a repository exist for this project? If yes, what is the repo name (format: owner/repo-name)? If no, go to github.com, create a new empty repository, and come back with the URL.
2. **PostHog** — Is a PostHog project created? If yes, paste the project API key. If no, go to posthog.com, create a new project, copy the API key from Project Settings, and come back.
3. **Vercel** — Is a Vercel account connected to the GitHub repo? If no, go to vercel.com, sign up with GitHub, connect the repository, and come back.
4. **Slack** — Is there a Slack incoming webhook set up for the project channel? If yes, paste the webhook URL. If no, go to your Slack workspace → Apps → Incoming Webhooks → Add new, select the project channel, copy the webhook URL, and come back.

### Step 2 — Update this file

Once all answers are collected, update the Project details block and the TBD section in this file with the real values. Do not leave any `[FILL IN]` or `TBD` placeholders once setup is complete.

---

## Project details

```
Product name:         The Traction Engine
Product description:  Turns Product Owners into traction engines — equipping them to drive early user acquisition using AI and their existing PM skills, without needing a dedicated growth team.
Target user:          Product Owners working at Designli
Value proposition:    "You already know how to form a hypothesis and measure what works. The Traction Engine applies that same skill set to getting users — so growth becomes part of your job, not someone else's problem." (draft — to be refined)
Domain:               po-traction-engine.vercel.app
Brand colors:         Navy #0E1034 (bg), Coral #F87565 (CTA/accent), Purple #58377B (secondary), Off-white #F3EFEF (light bg), Navy Card #161A4A, Muted Blue #8B8FBF
Logo file:            designli-logo.png (coral icon mark, in /public)
```

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro (static) | No SSR needed; keep it static |
| Hosting | Vercel | Connected to this GitHub repo; deploys on push to main |
| Analytics + email | PostHog | Source of truth for signups, events, drip emails, and feature flags |
| Email fallback | Loops.so or Resend | Only if PostHog Workflows cannot handle the drip sequence |
| Feedback routing | GitHub Issues | Repo and token in env vars — see TBD section below |
| Notifications | Slack incoming webhook | Webhook URL in env vars — see TBD section below |
| Version control | GitHub | Main branch = production |

---

## Pre-requisite — Scaffold the Astro project first

Before running the PostHog wizard or touching any code, the Astro project must exist.
Check for a `package.json` in the project root. If it is not there, the project has not been scaffolded yet.

**Run this first:**
```
npm create astro@latest . -- --template minimal --install --no-git
```
Answer the prompts:
- TypeScript: **Strict**
- Install dependencies: **Yes**
- Git: **No** (we handle this separately)

Once `package.json` exists, continue with PostHog setup.
Do not run `npx @posthog/wizard@latest` before the Astro project exists — the wizard needs a framework to detect.

---

## Environment variables

Never hardcode credentials. All secrets go in `.env` locally and in Vercel's environment settings for production.

```
POSTHOG_PUBLIC_API_KEY=        # PostHog project API key (public — safe to use client-side)
GITHUB_TOKEN=                  # TBD — set per project
GITHUB_REPO=                   # TBD — format: owner/repo-name
SLACK_WEBHOOK_URL=             # TBD — set per project
```

PostHog's public API key is safe to expose in client-side code. It is not a secret.

---

## PostHog setup

PostHog handles analytics, cohorts, email channels, and the drip workflow. Set up the project before touching code.

**Required before the landing page goes live:**
- PostHog project created and API key copied into `.env`
- Founder domain configured as sending domain (Settings → Email)
- PostHog email channels active (Settings → Pipelines → Channels)
- Internal cohort created manually: PO, Dev, Tech Lead
- Customer cohort created manually: founder + stakeholders
- Dynamic cohort configured to auto-capture all future signups

**If PostHog Workflows cannot handle the drip sequence**, use Loops.so as the first fallback (native PostHog webhook integration). Resend is the second fallback for transactional-only email.

### Event naming convention

Format: `noun_past_tense_verb` — no camelCase, no hyphens.

```
# Landing page — minimum required events
page_viewed
waitlist_signup_submitted      # fires on every successful form submission
waitlist_signup_failed         # fires if submission errors

# Properties on waitlist_signup_submitted
first_name
email
top_problem                    # optional field; empty string if not filled
source                         # UTM source from URL if present
```

Every event must fire correctly against the internal cohort before the page goes live. Do not test on real users.

---

## Landing page — what it must do

1. Display the value proposition and coming-soon message
2. Collect: first name (required), email (required), optional open-text field labeled "What's the #1 problem you're hoping this solves?"
3. On submission, fire `waitlist_signup_submitted` to PostHog with the properties above
4. Show an inline confirmation message — no redirect
5. Every time the URL is shared externally, use a UTM-tagged version (one URL per channel)

---

## Feedback widget — what it must do

A small button fixed to the bottom right of every page. This is not optional — it goes on the landing page now and on every user-facing surface added later.

**On click, opens a panel with:**
- Feedback type selector: Suggestion / Bug / Question
- Optional email field (no logged-in session on landing page)
- Text area for the message

**On submission:**
- Captures the full current URL including query parameters as a breadcrumb
- Creates a GitHub Issue with: feedback type, breadcrumb, optional email, message
- Sends a Slack notification to the project channel with a summary + link to the Issue
- Shows a confirmation and closes the panel

GitHub repo and Slack webhook are TBD per project — set via env vars, never hardcoded.

---

## File structure

```
/
├── public/
│   └── [logo file]
├── src/
│   pages/
│     └── index.astro          # main landing page
│   components/
│     └── WaitlistForm.astro   # form + PostHog event
│     └── FeedbackWidget.astro # feedback button + panel
├── .env                       # local secrets — never commit
├── .env.example               # committed template with empty values
├── astro.config.mjs
└── CLAUDE.md                  # this file
```

---

## Design input

A design foundation must exist before building any UI. Accept it in any of these forms — in order of preference:

1. **Figma link** — if the Figma MCP is connected, Claude Code can read it directly
2. **Exported screenshot or mockup** — export frames as PNG from Figma and attach them to the session
3. **Brand reference** — logo file, color hex codes, and a description of the visual style

If a Figma screenshot, mockup, or brand reference is shared, treat it as the source of truth for layout, spacing, and visual style. Extract colors, typography, and structure directly from the image — do not invent alternatives. If something in the image is unclear, ask before assuming.

If no design input is provided at the start of the session, ask for it before writing any UI code. Do not invent a visual style from scratch.

---

## Conventions

- Static only — no API routes, no server-side rendering unless absolutely required
- No unnecessary dependencies — if vanilla JS or an Astro component can do it, do not add a library
- All secrets in env vars — `.env` is in `.gitignore`, `.env.example` is committed with empty values
- UTM parameters must be captured on every `waitlist_signup_submitted` event — source attribution starts from day one
- The feedback widget ships on every user-facing surface, not just this page

---

## Git and deployment discipline

Always keep GitHub and production in sync. Follow this sequence after every change:

1. **Deploy first** — `vercel --prod` pushes the change live immediately via CLI
2. **Commit after** — stage only the files you changed, write a clear message explaining why (not just what)
3. **Push to GitHub** — `git push` so the repo matches what is running in production

Never leave commits unpushed. If you deployed but did not commit, GitHub and production are out of sync — no rollback history, no audit trail, no way for another session to know what is actually live.

### Commit message format

```
<short summary of what changed and why>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

### When to wait for explicit approval before deploying

- Deletions or destructive changes — explain what will be removed and wait for a yes
- Environment variable changes — confirm before touching Vercel env settings
- Anything that touches the PostHog workflow or email config — those affect real users

For all other changes (copy, styling, bug fixes, new components): deploy → commit → push without asking.

---

## TBD — set per project before first session

```
GitHub repo:        czabala-designli/po-traction-engine
Slack channel:      #taskforce-traction-menu
Slack webhook URL:  set in .env and Vercel env vars
GitHub token:       set in Vercel env vars
```

---

## What Claude Code should not do

- Do not create accounts or retrieve credentials — guide the PO to do it, then wait
- Do not add a backend or database — PostHog is the data layer for this phase
- Do not implement auth — not needed on the landing page
- Do not add a CMS — content is hardcoded for this phase
- Do not activate Loops.so or Resend unless PostHog email is explicitly confirmed as unavailable

## Before asking the PO to do something manually

Always check if what you need already exists before asking the PO to go get it. Specifically:

- **GitHub token** — run `gh auth token` first. If the CLI is authenticated and the token has `repo` scope, use it directly. Do not ask the PO to generate a new one.
- **Vercel project** — run `vercel list` before asking if a project exists. Check `.vercel/project.json` before asking to link.
- **PostHog API key** — check `.env` first. If the wizard already ran, the key is there.
- **Domain availability** — use the Vercel MCP tool to check before asking the PO to look it up.

General rule: exhaust available tools and existing config before escalating to the PO. The PO's time is the bottleneck — only involve them when there is genuinely no other way.

---

*Designli | TractionLab | PO-owned | Landing Page Phase*
