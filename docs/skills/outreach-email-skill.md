# Skill (stub): outreach-email

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Draft B2B cold outreach and founder-network messages against a prospect list: a personalized template, one personalization line per recipient, and a send cadence in waves with follow-ups. For B2B labs where the first users come from reaching out by name.

## Relationship to the traction-plan skill

- The planner points here from "cold outreach to prospect list" and "recruit through founder's network" rows on B2B projects.
- This skill points back: it reads the prospect list, the ICP doc, and the `brand-voice` guide, and returns outreach templates plus a send plan.

## Inputs (to elaborate)
- Prospect list (company, contact, why they fit)
- ICP research doc
- `brand-voice` guide
- Product one-liner

## Output (to elaborate)
- Outreach templates + per-recipient personalization lines + cadence (MD) under `docs/traction-plans/assets/<project>/outreach/`

## To elaborate later
- Prospect-list sourcing (Apollo, Hunter, LinkedIn)
- Wave sizing and follow-up rules (twice, then stop)
- Logging responses for signal on value prop / ICP
