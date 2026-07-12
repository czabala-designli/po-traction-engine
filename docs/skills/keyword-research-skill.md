# Skill (stub): keyword-research

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Build a keyword repository for the project's niche (buyer-intent terms with volume and difficulty) so blog posts and SEO pages target the right searches. Uses the SEMrush trial or Google Keyword Planner (Designli's SEMrush account can be used for this). Foundational, runs early.

## Relationship to the traction-plan skill

- The planner points here from the "keyword research" foundation row, and the resulting repository feeds every `blog-post` and SEO-page row downstream.
- This skill points back: it reads the ICP doc and competitor sites, and writes a repository the planner and the `blog-post` skill pull target keywords from.

## Inputs (to elaborate)
- ICP research doc
- Product one-liner
- Known competitor domains

## Output (to elaborate)
- `docs/traction-plans/assets/<project>/keywords.md` (repository: term, intent, volume, difficulty, target page)

## To elaborate later
- Exact SEMrush / Keyword Planner workflow
- How intent beats volume for early SEO
- Repository schema the blog-post skill consumes
