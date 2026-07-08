---
title: "ICP / Persona Research"
kind: "play"
phase: "foundation"
status: "live"
summary: "Define your ICP and where they gather — a researched community list with post drafts and UTM links."
order: 2
feeds: ["waitlist-landing-page"]
---

Define who you're targeting and — critically — *where they gather*, so your Week-2 distribution has somewhere to aim. It produces a researched community list with post drafts and UTM links — the fuel for the community posts, blog, and outreach in the Traction Menu.

<svg viewBox="0 0 420 212" width="100%" style="max-width:360px;display:block;margin:20px auto 6px;" role="img" aria-label="ICP funnel — a broad audience filtered down to your ideal customer">
  <text x="210" y="13" text-anchor="middle" fill="#8B8FBF" font-size="10.5" font-weight="700" letter-spacing="2" font-family="sans-serif">AUDIENCE</text>
  <g fill="#8B8FBF">
    <circle cx="80" cy="38" r="7"/><circle cx="120" cy="32" r="7"/><circle cx="160" cy="30" r="7"/><circle cx="210" cy="29" r="7"/><circle cx="260" cy="30" r="7"/><circle cx="300" cy="32" r="7"/><circle cx="340" cy="38" r="7"/>
    <circle cx="140" cy="52" r="6" opacity="0.65"/><circle cx="185" cy="50" r="6" opacity="0.65"/><circle cx="235" cy="50" r="6" opacity="0.65"/><circle cx="280" cy="52" r="6" opacity="0.65"/>
  </g>
  <path d="M55 68 H365 L232 142 V160 H188 V142 Z" fill="rgba(248,117,101,0.13)" stroke="#F87565" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="210" y="107" text-anchor="middle" fill="#F87565" font-size="10.5" font-weight="700" letter-spacing="2" font-family="sans-serif">FILTER</text>
  <circle cx="210" cy="186" r="16" fill="none" stroke="#F87565" stroke-width="1.5" opacity="0.45"/>
  <circle cx="210" cy="186" r="10" fill="#F87565"/>
  <text x="210" y="209" text-anchor="middle" fill="#F3EFEF" font-size="10.5" font-weight="700" letter-spacing="1.5" font-family="sans-serif">IDEAL CUSTOMER</text>
</svg>

## Install the skill

This play runs as a Claude Code skill. You don't have it yet, so install it once:

1. <a href="/starters/icp-research.md" download="icp-research.md"><strong>Download the skill</strong></a> (saves as `icp-research.md`) — or <a href="/starters/icp-research.md" target="_blank" rel="noopener">view it raw</a>.
2. Open Claude Code and say: *"Install the icp-research.md in my download folder as a skill."* (Claude drops it into `.claude/commands/`.)
3. Run **`/icp-research`** and follow the 3-phase session.

## What it produces

- A one-pager per ICP archetype: the communities, subreddits, and groups where they actually gather.
- Ready-to-adapt post drafts for each community.
- UTM-tagged links per channel, saved to `docs/icp-communities-[archetype].md`.
