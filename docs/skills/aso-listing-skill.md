# Skill (stub): aso-listing

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Produce app store optimization copy (title, subtitle, keyword field, description) and a screenshot plan for iOS and Android, per store, using the keyword repository. Mara flagged ASO as required, not optional, for mobile apps. Runs once the product is live or submittable.

## Relationship to the traction-plan skill

- The planner points here from the "app store optimization" row, gated on the product being live (a readiness item).
- This skill points back: it reads the `keyword-research` repository (per store), the product one-liner, the ICP doc, and the `brand-voice` guide, and returns listing copy plus a screenshot plan.

## Inputs (to elaborate)
- `keyword-research` repository (per store)
- Product one-liner
- ICP research doc
- `brand-voice` guide

## Output (to elaborate)
- ASO listing copy per store + screenshot plan (MD) under `docs/traction-plans/assets/<project>/aso/`

## To elaborate later
- Per-store keyword rules (App Store vs. Google Play)
- Screenshot plan structure (the highest-leverage 30 minutes)
- Review-solicitation and response workflow
