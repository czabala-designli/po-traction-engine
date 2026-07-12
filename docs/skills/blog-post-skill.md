# Skill (stub): blog-post

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Draft an SEO-optimized blog post (founder story, feature story, problem/solution) grounded in the ICP, the brand voice, and a target keyword from the keyword repository. Includes the on-page SEO that actually matters. Produces a client-ready draft, not a suggestion.

## Relationship to the traction-plan skill

- The planner points here from any "publish blog post" row and passes the post angle plus the target keyword.
- This skill points back: it reads the ICP doc, the `brand-voice` guide, and the `keyword-research` repository, and returns a draft that goes through Mara review and client approval before publishing.

## Inputs (to elaborate)
- ICP research doc
- `brand-voice` guide
- `keyword-research` repository (target keyword)
- Post angle (founder story, feature, etc.)

## Output (to elaborate)
- A blog post draft (MD) under `docs/traction-plans/assets/<project>/blog/`

## To elaborate later
- Four-part founder-story structure
- On-page SEO checklist
- Handoff to the PO for vibe-coding the post into the landing page
