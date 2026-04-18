# Design Tokens

## Core Palette

| Token | Value | Meaning |
| --- | --- | --- |
| `--cf-orange` | `#FF4801` | primary accent |
| `--cf-text` | `#521000` | primary foreground |
| `--cf-bg-page` | `#F5F1EB` | outer page tone |
| `--cf-bg-100` | `#FFFBF5` | main surface |
| `--cf-bg-200` | `#FFFDFB` | elevated surface |
| `--cf-bg-300` | `#FEF7ED` | hover surface |
| `--cf-border` | `#EBD5C1` | border and divider |

## Dark Palette

| Token | Value |
| --- | --- |
| `--cf-orange` | `#F14602` |
| `--cf-text` | `#F0E3DE` |
| `--cf-bg-100` | `#121212` |
| `--cf-bg-200` | `#191817` |
| `--cf-bg-300` | `#2A2927` |
| `--cf-border` | `rgba(240, 227, 222, 0.13)` |

## Typography

```css
font-family: 'FT Kunst Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-family: 'Apercu Mono Pro', 'SF Mono', 'Fira Code', 'Consolas', monospace;
```

Rules:

- headings use weight `500`
- body text usually stays at `400`
- headings use tight letter spacing

## Radius

- inputs: `8px`
- cards: `12px`
- large wrappers: `16px`
- buttons and pills: `9999px`

## Motion

- default transition: `150ms ease`
- button press: `translateY(1px) scale(0.98)`
- avoid theatrical motion and noisy stagger everywhere

## Signature Styling

- corner brackets for bordered wrappers
- dashed dividers and hover borders
- dot-grid backgrounds only where they add structure

## Anti-Patterns

- no pure white panels
- no pure black text
- no generic blue link system
- no heavy glassmorphism
- no giant diffuse shadows
