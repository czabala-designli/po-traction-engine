# The Traction Engine

**Live:** [po-traction-engine.vercel.app](https://po-traction-engine.vercel.app)

An internal library and playbook for Designli Product Owners. It collects the reusable
assets a PO needs to drive early user acquisition (templates, plays, and tools), organised
along the 90-day traction engagement, plus living case studies of the projects using them.

The site is self-referential: The Traction Engine is itself the first project *in* the
library, dogfooding the playbook it shares.

This is a PO-owned project. No tech lead, no backend, no database, no auth. PostHog is the
only data layer.

---

## What's on the site

| Route | What it is |
|---|---|
| `/` | Library home. The 90-day timeline, with every asset grouped by phase. |
| `/library/[slug]` | One recipe card per asset: what it is, when to use it, the prompt or starter that builds it, and the playbook. |
| `/projects/[slug]` | One case study per project, with a living checklist of progress. |
| `/waitlist` | The waitlist landing page. Also doubles as the live preview for the Waitlist Landing Page template. |
| `/starters/*.md` | Downloadable starter files (CLAUDE.md starters and Claude Code prompts) served as plain Markdown. |
| `/privacy`, `/terms` | Legal pages. |

A feedback widget ships on every page. It creates a GitHub Issue and posts a Slack
notification to `#taskforce-traction-menu`.

---

## Running it locally

Requires Node 22.12 or newer.

```bash
npm install
cp .env.example .env   # then fill in the values (see below)
npm run dev            # http://localhost:4321
```

| Script | Does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |

### Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Used for |
|---|---|
| `PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog analytics and signup capture. Public by design, safe client-side. |
| `PUBLIC_POSTHOG_HOST` | PostHog ingest host. Defaults to `https://us.i.posthog.com`. |
| `GITHUB_TOKEN` | Feedback widget creating GitHub Issues. Get it with `gh auth token`. |
| `GITHUB_REPO` | Target repo for those issues, as `owner/repo-name`. |
| `SLACK_WEBHOOK_URL` | Feedback widget posting to the project Slack channel. |

`.env` is gitignored. Production values live in Vercel's environment settings.

---

## Adding to the library

All library content is Markdown in `src/content/`. The home page grid, the sidebar, and the
per-item pages all generate from it, so there is no page wiring to do. Drop in a file and it
appears.

**A new asset** goes in `src/content/assets/[slug].md`:

```yaml
---
title: "Brand Voice"
kind: "play"            # template | play | tool
phase: "foundation"     # foundation | activation | conversion | hdd | marketing
status: "live"          # live | coming-soon
summary: "One line that shows on the card."
previewUrl: "/waitlist" # optional, links to a live preview
starter: false          # marks the one recommended starting point
order: 3                # sort order within the phase
needs: ["value-proposition"]   # slugs of assets that come first
feeds: ["waitlist-email-sequence"]  # slugs this one unlocks
---

The playbook body, in Markdown.
```

**A new project** goes in `src/content/projects/[slug].md`, with a `checklist:` block in the
frontmatter. To update a project's progress, edit that block and flip `done: true`. That is
exactly what the feedback widget's Progress update type feeds into.

`src/content.config.ts` is the source of truth for both schemas. If a build fails after you
add content, the schema is usually what's complaining.

---

## Project layout

```
src/
  pages/
    index.astro            library home, derived from the content collections
    waitlist.astro         the waitlist landing page
    library/[slug].astro   asset recipe cards
    projects/[slug].astro  project case studies
    starters/*.md.ts       downloadable starter files
    api/feedback.ts        the only server route (feedback → GitHub Issue + Slack)
  layouts/Layout.astro     shared shell: global styles, PostHog, feedback widget
  components/              WaitlistForm, FeedbackWidget, SideNav, Checklist, badges, etc.
  content/assets/*.md      one file per library asset
  content/projects/*.md    one file per project case study
  content.config.ts        Content Collections schemas
docs/                      templates, reusable Claude Code prompts, skill designs, traction plans
demo/                      narrated walkthrough videos (./demo/run.sh <walkthrough>)
public/                    logo and static files
```

The site is static apart from `src/pages/api/feedback.ts`, which is why it runs on the Astro
Vercel adapter rather than a pure static build.

---

## Deploying

Deploy first, then commit, then push, so GitHub and production never drift apart:

```bash
vercel --prod
git add <the files you changed>
git commit -m "why the change was made"
git push
```

`main` is production.

---

## Where the detail lives

[`CLAUDE.md`](./CLAUDE.md) is the full operating manual: PostHog setup and event conventions,
the welcome email workflow, the feedback issue-response flow, UTM conventions, legal page
templates, and the rules Claude Code follows on this repo. Read it before making
non-trivial changes. This README is the short version.

Also useful:

- `docs/prompts/` reusable Claude Code session prompts, portable to other projects
- `docs/claude-md-landing-page-starter.md` the starting CLAUDE.md for a brand-new landing page project
- `docs/privacy-policy-template.md` and `docs/terms-and-conditions-template.md` reusable legal pages

---

*Designli | TractionLab | PO-owned*
