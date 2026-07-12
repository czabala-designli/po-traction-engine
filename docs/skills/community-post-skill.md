# Skill (stub): community-post

> Status: first version / stub. A companion asset skill of the `traction-plan` skill.
> See `docs/traction-plans/traction-plan-skill-design.md` (option A: the planner points to companion asset skills). Elaborate later.

## Purpose

Draft the founder and feedback community posts (Reddit, Facebook groups, etc.) for the project's target communities, with the "I am co-building this with you" framing and weekly variants ("here is what I changed based on your feedback"). Produces copy-pastable, client-ready posts.

## Relationship to the traction-plan skill

- The planner points here from each weekly community-post row.
- This skill extends `icp-research`, which already produces the community list and first-post drafts, and points back to it: it consumes those outputs plus the `brand-voice` guide and what changed this week, and returns per-week post drafts.

## Inputs (to elaborate)
- ICP research doc (communities + first-post drafts)
- `brand-voice` guide
- What changed / what to ask feedback on this week

## Output (to elaborate)
- Per-week community post drafts (MD) under `docs/traction-plans/assets/<project>/community/`

## To elaborate later
- Relationship boundary with `icp-research` (what lives where)
- Community-specific norms (Reddit vs. Facebook) and the 90/10 rule
- Client-proofed framing ("PO prompts client via Basecamp to post this")
