# CF Workers Design System

Compact reference for recreating the Cloudflare Workers marketing and calculator aesthetic.

## TL;DR

```text
Accent:        #FF4801
Hover accent:  #FF7038
Text:          #521000
Page bg:       #F5F1EB
Surface bg:    #FFFBF5
Card bg:       #FFFDFB
Hover bg:      #FEF7ED
Border:        #EBD5C1
Radius:        8 / 12 / 16 / 9999
Spacing base:  4px
Fonts:         FT Kunst Grotesk, Apercu Mono Pro
```

## Brand Principles

1. Warm, technical, and readable.
2. Orange is an accent, not a flood-fill.
3. Use cream and tan layers instead of white and gray.
4. Prefer light structure, subtle motion, and precise borders.
5. Use decorative corner brackets and dashed dividers sparingly but consistently.

## Color System

### Light mode

| Token | Value | Use |
| --- | --- | --- |
| `--cf-orange` | `#FF4801` | CTA, links, focus, active state |
| `--cf-orange-hover` | `#FF7038` | hover state |
| `--cf-orange-light` | `rgba(255, 72, 1, 0.08)` | soft accent fill |
| `--cf-text` | `#521000` | primary text |
| `--cf-text-muted` | `rgba(82, 16, 0, 0.7)` | secondary text |
| `--cf-text-subtle` | `rgba(82, 16, 0, 0.4)` | tertiary text |
| `--cf-bg-page` | `#F5F1EB` | page gutter |
| `--cf-bg-100` | `#FFFBF5` | main surface |
| `--cf-bg-200` | `#FFFDFB` | card surface |
| `--cf-bg-300` | `#FEF7ED` | hover surface |
| `--cf-border` | `#EBD5C1` | border and divider |
| `--cf-border-light` | `rgba(235, 213, 193, 0.5)` | light border |

### Dark mode

| Token | Value |
| --- | --- |
| `--cf-orange` | `#F14602` |
| `--cf-orange-hover` | `#FF6D33` |
| `--cf-text` | `#F0E3DE` |
| `--cf-text-muted` | `rgba(255, 253, 251, 0.56)` |
| `--cf-text-subtle` | `rgba(255, 253, 251, 0.36)` |
| `--cf-bg-page` | `#0D0D0D` |
| `--cf-bg-100` | `#121212` |
| `--cf-bg-200` | `#191817` |
| `--cf-bg-300` | `#2A2927` |
| `--cf-border` | `rgba(240, 227, 222, 0.13)` |

### Product colors

| Category | Strong | Soft |
| --- | --- | --- |
| Compute | `#0A95FF` | `rgba(10, 149, 255, 0.1)` |
| Storage | `#EE0DDB` | `rgba(238, 13, 219, 0.1)` |
| AI | `#19E306` | `#F2F5E1` |
| Media | `#9616FF` | `#F8EBEE` |

## Typography

```css
--font-sans: 'FT Kunst Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'Apercu Mono Pro', 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Hero | `48px` | `500` | `letter-spacing: -0.02em` |
| Page heading | `36px` | `500` | tight tracking |
| Section heading | `30px` | `500` | balanced line wrap |
| Card heading | `18-24px` | `500` | never bold |
| Body | `16px` | `400` | relaxed line-height |
| Label / meta | `12-14px` | `400-500` | uppercase only when useful |

Rules:

- Never rely on heavy bold as the hierarchy tool.
- Use mono only for code, numeric values, and labels that benefit from technical tone.
- Keep headings tight, body copy normal.

## Spacing

Use a 4px base unit.

| Token | Value |
| --- | --- |
| `1` | `4px` |
| `2` | `8px` |
| `3` | `12px` |
| `4` | `16px` |
| `6` | `24px` |
| `8` | `32px` |
| `12` | `48px` |
| `16` | `64px` |
| `20` | `80px` |

Common usage:

- Card padding: `24px`
- Input padding: `12px`
- Button padding: `12px 24px`
- Grid gap: `16px` or `24px`
- Section rhythm: `48px`, `64px`, `80px`

## Radius

| Token | Value | Use |
| --- | --- | --- |
| `--radius-sm` | `4px` | badges |
| `--radius-md` | `8px` | inputs |
| `--radius-lg` | `12px` | cards |
| `--radius-xl` | `16px` | large sections |
| `--radius-full` | `9999px` | buttons, pills, bars |

## Shadows

```css
--shadow-card: 0 1px 3px rgba(82, 16, 0, 0.04), 0 4px 12px rgba(82, 16, 0, 0.02);
--shadow-stack:
  1px 6px 6px 0 rgba(255, 255, 255, 0.2) inset,
  0 4px 12px 0 rgba(0, 0, 0, 0.02),
  0 2px 12px 0 rgba(0, 0, 0, 0.03);
--shadow-focus: 0 0 0 3px rgba(255, 72, 1, 0.2);
```

Rules:

- Prefer border + fill changes before adding heavy elevation.
- Use the shadow stack on hero or CTA containers, not everywhere.
- Avoid glassmorphism and large ambient glows.

## Motion

| Token | Value |
| --- | --- |
| `--ease-standard` | `cubic-bezier(0, 0, 0.2, 1)` |
| `--ease-button` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--ease-active` | `cubic-bezier(0.55, 0.085, 0.68, 0.53)` |
| `--duration-fast` | `150ms` |
| `--duration-normal` | `200ms` |
| `--duration-slow` | `500ms` |

Patterns:

- Hover: color, fill, border-style, or tiny scale
- Press: `translateY(1px)` and `scale(0.98)`
- Sections fade and slide in as a block, not as noisy micro-animations
- Progress fills animate over `0.5s ease-out`

## Layout

| Token | Value |
| --- | --- |
| `--container-sm` | `640px` |
| `--container-md` | `768px` |
| `--container-lg` | `1024px` |
| `--container-xl` | `1200px` |
| `--container-2xl` | `1480px` |

Breakpoints:

- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`

Preferred grids:

- feature grid: 1 -> 3
- calculator grid: 1 -> 2
- products grid: 1 -> 6 on larger layouts

## Signature Details

### Corner brackets

Use 8px or 14px square corner markers on bordered wrappers.

```css
.corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border: 1px solid var(--cf-border);
  border-radius: 1.5px;
  background: var(--cf-bg-100);
}
```

### Dot pattern

```css
background-image: radial-gradient(circle, var(--cf-border) 0.75px, transparent 0.75px);
background-size: 12px 12px;
```

### Dashed dividers

```css
background-image: linear-gradient(to right, var(--cf-border) 50%, transparent 50%);
background-size: 16px 1px;
background-repeat: repeat-x;
```

## Accessibility

- Keep clear labels on every form control.
- Use visible focus rings in orange.
- Meet 44px minimum tap targets.
- Do not rely on color alone for comparison bars or states.
- Respect `prefers-reduced-motion` for large entrances.

## Do / Don't

Do:

- use cream-on-tan layers
- keep button shapes pill-like
- use orange for intent and emphasis
- keep typography medium and confident

Don't:

- use pure white backgrounds
- use pure black text
- use heavy blue links by default
- use oversized shadows or glowing cards
- scatter decorative brackets on every nested element
