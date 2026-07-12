# Skill (stub): email-sequence

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Draft and structure a waitlist welcome / drip sequence (and later lifecycle emails) in PostHog-ready form, to keep the list warm until signup and nudge activation after. Cadence per Mara: roughly every 7 days once live, 10 to 14 days pre-launch. PostHog Workflows first, Loops.so as fallback.

## Relationship to the traction-plan skill

- The planner points here from the "waitlist email sequence" foundation row and later lifecycle-email rows.
- This skill points back: it reads the ICP doc, the `brand-voice` guide, product stage, and the trigger events, and returns email copy plus a sequence/trigger spec the PO builds in PostHog.

## Inputs (to elaborate)
- ICP research doc
- `brand-voice` guide
- Product stage and launch status
- Trigger events (signup, activation, inactivity)

## Output (to elaborate)
- Email copy + sequence/trigger spec (MD) under `docs/traction-plans/assets/<project>/emails/`

## To elaborate later
- Welcome vs. lifecycle sequence templates
- PostHog Workflows trigger masking / cadence rules
- When to stop emailing a user (on account creation)
