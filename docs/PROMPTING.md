# Prompting Guide

Use this when you want an AI agent to generate UI in the CF Workers style without drifting into generic SaaS output.

## Base Instruction

```text
Use the CF Workers design system.

Critical rules:
- Backgrounds are warm cream, never pure white.
- Text is warm brown, never pure black.
- Accent is Cloudflare orange (#FF4801).
- Buttons are pill-shaped.
- Cards and bordered wrappers use corner-bracket details.
- Hover states prefer dashed borders, subtle fills, and restrained motion.
- Typography uses medium weight, not heavy bold.
```

## Landing Page Prompt

```text
Build a marketing landing page in the Cloudflare Workers style.

Include:
- sticky header
- bold orange hero with two CTA pills
- three-feature strip in a bordered wrapper
- social proof or stats row
- CTA section
- footer

Visual rules:
- cream surfaces after the hero
- orange only for high-value emphasis
- corner brackets on major bordered wrappers
- no glassmorphism, no purple gradients, no pure white panels
```

## Calculator Prompt

```text
Build an interactive pricing calculator in the Cloudflare R2 style.

Include:
- two-column form layout on desktop
- numeric inputs with optional unit selector
- range slider with a floating percentage badge
- month/year toggle pills
- provider comparison rows with progress bars
- pricing details table

Behavior:
- update totals in real time
- format large numbers cleanly
- keep copy direct and practical
```

## Product Page Prompt

```text
Build a workers.cloudflare.com-style product page.

Section order:
- hero
- benefits strip
- how it works
- use cases
- architecture diagram or explanatory visual
- product grid or ecosystem section
- CTA
- footer

Composition rules:
- use wrapper-based borders and corner decorations
- keep section rhythm with gap-based spacing, not arbitrary top margins
- make headings large, medium weight, and tightly tracked
```

## Configuration Tool Prompt

```text
Build a Cloudflare Workers-style configuration tool.

Layout:
- controls on the left
- preview or output on the right
- bordered panels with corner brackets

Controls:
- selects
- toggles
- numeric steppers
- range controls

Tone:
- practical, technical, polished
- avoid decorative noise
```

## Quality Checklist

- Background is cream or warm dark, not white or black.
- Text color is warm brown or warm off-white.
- Accent orange is correct.
- Buttons are rounded-full.
- Focus rings are visible.
- Card borders are tan, not gray.
- Headings are medium weight, not bold-heavy.
- Decorative details appear on wrappers, not every nested node.
- Mobile layout stacks cleanly.
- Motion is restrained.

## Common Failure Modes

| Bad output | Fix |
| --- | --- |
| Generic modern SaaS page | Push stronger cream, tan, orange, and bracket details |
| Too much orange | Restrict orange to CTA, links, active states, badges |
| Too much shadow | Use border, fill, and dashed hover instead |
| Feels like plain Tailwind | Add wrapper composition, warm neutrals, and typographic restraint |
| Looks dark and neon | Re-center on warm technical palette, not cyberpunk |
