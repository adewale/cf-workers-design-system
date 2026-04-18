---
name: cf-workers-design
description: Design skill for building Cloudflare Workers-style landing pages, calculators, docs, and product pages. Enforces warm cream surfaces, brown typography, orange accents, pill buttons, and corner-bracket wrapper details.
references:
  - design-tokens
  - components
  - prompting-guide
  - product-pages
---

# CF Workers Design Skill

Use this skill when the user wants UI that feels like `workers.cloudflare.com`, `workershops.cloudflare.com`, or `r2-calculator.cloudflare.com`.

## Critical Rules

1. Never use pure white backgrounds. Use warm cream layers.
2. Never use pure black body text. Use warm brown or warm off-white.
3. Treat orange as accent and CTA color, not the full-page default.
4. Buttons are pill-shaped.
5. Cards and bordered wrappers use corner-bracket details.
6. Favor dashed borders, subtle fills, and restrained motion over loud shadows.
7. Headings should be medium weight, tightly tracked, and confident.

## How To Use The References

Start with `./references/design-tokens.md` for the palette and motion rules.

Then load the task-specific reference:

- component work -> `./references/components.md`
- prompting or agent shaping -> `./references/prompting-guide.md`
- workers product pages -> `./references/product-pages.md`

## Task Router

```text
Need a calculator or comparison tool?
-> design-tokens + components + prompting-guide

Need a marketing landing page?
-> design-tokens + components + product-pages

Need a docs page or tool shell?
-> design-tokens + components

Need the agent to reliably generate more UI in this style?
-> prompting-guide
```

## Output Expectations

The resulting UI should feel:

- warm, technical, and premium
- structured by borders and spacing rather than flashy effects
- recognizably Cloudflare-like without copy-pasting brand pages

## Trigger Phrases

This skill is relevant when the user mentions:

- Cloudflare design
- Workers style
- R2 calculator style
- warm technical marketing UI
- cream and orange developer branding
- workers.cloudflare.com product pages

## Quick Checklist

- correct cream and brown base colors
- orange accent is correct
- buttons are rounded-full
- wrapper borders are tan
- focus states are visible
- mobile layout still works
- decorative details are used with restraint
