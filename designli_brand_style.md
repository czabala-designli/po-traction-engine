# Designli Brand Style Guide

Internal reference for presentations, documents, and visual assets.

---

## Colour Palette

| Role | Name | Hex |
|---|---|---|
| Primary background | Navy | `#0E1034` |
| CTA / Accent | Coral | `#F87565` |
| Secondary accent | Purple | `#58377B` |
| Light surface | Off-white | `#F3EFEF` |
| Base | White | `#FFFFFF` |
| Dark card | Navy Card | `#161A4A` |
| Muted text (on dark) | Muted Blue | `#8B8FBF` |
| Light card / pill bg | Light Card | `#EAE8F4` |
| Borders / dividers | Mid Line | `#C8C2D0` |

### Usage rules

- **Navy** dominates (60–70% visual weight on dark slides).
- **Coral** is the action colour — use it for CTAs, accent bars, active states, and key callouts. Never overuse.
- **Purple** is the secondary accent — section labels, badges, left accent bars on light slides, supporting highlights.
- **Off-white** is the light-slide background. Never use pure white as a full-slide background.
- Dark and light slides should alternate in a "sandwich" structure: dark title → light content → dark content → light content → dark close. Or commit fully to dark.

---

## Typography

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Slide title | Georgia | 30–48pt | Regular | Sentence case; italic variant for subtitles |
| Italic subtitle / pull quote | Georgia | 22–38pt | Italic | Coral or white on dark; navy on light |
| Section eyebrow | Calibri | 9pt | Bold | ALL CAPS, letter-spacing 3 |
| Body text | Calibri | 10–13pt | Regular | Left-aligned |
| Card title | Calibri | 11–12pt | Bold | |
| Card body | Calibri | 9.5–10pt | Regular | |
| Nav / footer labels | Calibri | 8–9pt | Regular / Bold active | |
| Document body | Calibri | 11pt (22 half-pts) | Regular | |
| Document heading | Calibri | varies | Bold | Colour: Navy |

### Font pairing rule
Georgia (personality, weight) + Calibri (readability, neutrality). Do not introduce additional typefaces.

---

## Slide Layout Patterns

### Dark slides (navy background)
- Coral left accent bar: `x=0, y=0, w=0.15in, h=full slide`
- Eyebrow label: 9pt Calibri Bold, coral, ALL CAPS, letter-spacing 3, top-left
- Title: Georgia 30–48pt, white
- Italic subtitle: Georgia italic, coral
- Bottom nav bar: navy `#0E1034`, coral active indicator strip above active label
- Closing slide variant: coral footer bar full-width, `designli.co` right-aligned in navy

### Light slides (off-white background)
- Coral top strip: `x=0, y=0, w=full, h=0.1in`
- Section pill (top-left): light card bg `#EAE8F4`, purple text, small border
- Title: Georgia, navy
- Bottom nav bar: same as dark slides

### Card pattern (light slide)
- Background: white `#FFFFFF`
- Border: `#C8C2D0`, 0.5pt
- Left accent bar: coral, `w=0.06in`, full card height
- Shadow: outer, 8px blur, 10% opacity
- Title: Calibri Bold, navy
- Body: Calibri, `#4A4A6A`

### Card pattern (dark slide)
- Background: Navy Card `#161A4A`
- Border: `#2A2F6A`, 1pt
- Left accent bar: coral or purple depending on context
- Title: Calibri Bold, white
- Body: Calibri, Muted Blue `#8B8FBF`

### Callout / banner (dark slide)
- Background: Navy Card `#161A4A`
- Border: coral, 0.75pt
- Text: coral bold for label, muted blue / white for body

### Stat callout
- Large value: Georgia Bold, coral, 18–24pt
- Label: Calibri, `#A8ACCC`, aligned right of value

---

## Decorative Elements

- **Coral left accent bar** — signature element on all dark slides. Full slide height, `w=0.15in`.
- **Coral top strip** — signature element on all light slides. Full slide width, `h=0.1in`.
- **Purple decorative blobs** — oval shapes, partially off-slide, transparency 25–40%. Used on title and closing slides for depth. Do not use on content slides.
- **Section pill** — small rounded rectangle, light card bg, purple text, used top-left on light slides to label the section.
- **Badge** — small rectangle, colour matches context (coral = active/new, purple = secondary, grey = future/inactive). Used for status labels on roadmap or capability cards.

---

## Navigation Bar

Present on every slide except full-bleed closing slides.

- Position: `y=5.175in`, `h=0.45in`, full width
- Background: navy `#0E1034`
- Labels: 8pt Calibri, colour `#7B7FBF` inactive / coral active, bold active
- Active indicator: coral rectangle `h=0.03in` above active label

---

## Document Style (Word / .docx)

- Page margins: 1 inch all sides
- Header: bold navy title + muted "Designli · Edition" label, coral bottom border
- Footer: "Designli · Internal" muted left, page number right, mid-line top border
- Body font: Calibri 11pt, colour `#1A1A2E`
- Section titles: Calibri Bold, navy, ALL CAPS, letter-spacing, coral bottom border
- Prompt / code blocks: light purple shading `#F0EEF8`, coral top border 3pt
- HDD callouts: navy background, coral "HDD" label, muted purple body text
- Why-it-matters sidebars: purple left bar, light purple bg `#EDE8F5`, italic purple/navy text

---

## Voice & Tone (visual)

- **Confident, not loud.** Coral is used sparingly — it signals importance, not decoration.
- **Dark slides for statements. Light slides for information.** Don't mix the two roles on the same slide.
- **Georgia for ideas. Calibri for facts.** Use the serif font when you want weight and authority; use Calibri when you want clarity and neutrality.
- **No accent lines under titles.** Use background colour, spacing, or the top/left accent strips instead.
- **Leave breathing room.** Minimum 0.3in between content blocks, 0.5in from slide edges.

---

## Quick Reference — Hex Codes

```
Navy        #0E1034
Coral       #F87565
Purple      #58377B
Off-white   #F3EFEF
White       #FFFFFF
Navy Card   #161A4A
Muted Blue  #8B8FBF
Light Card  #EAE8F4
Mid Line    #C8C2D0
Navy Mid    #2A2F6A   (card borders on dark)
Text Dark   #1A1A2E   (document body)
Text Muted  #6B6E9A   (document secondary)
Body Dark   #4A4A6A   (card body on light)
```

---

*Designli · Internal · Brand Reference*
