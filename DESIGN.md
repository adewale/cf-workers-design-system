---
version: alpha
name: Cloudflare Workers
description: >
  Warm, technical design system for Cloudflare Workers marketing and product pages.
  Cream and tan surfaces with a Cloudflare orange accent. Restrained motion,
  precise borders, and decorative corner-bracket details.
colors:
  primary: "#FF4801"
  primary-hover: "#FF7038"
  on-surface: "#521000"
  surface: "#F5F1EB"
  surface-raised: "#FFFBF5"
  surface-card: "#FFFDFB"
  surface-hover: "#FEF7ED"
  border: "#EBD5C1"
  error: "#DC2626"
  success: "#16A34A"
  warning: "#EAB308"
  compute: "#0A95FF"
  storage: "#EE0DDB"
  ai: "#19E306"
  media: "#9616FF"
typography:
  hero:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 36px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 30px
    fontWeight: 500
    lineHeight: 1.2
  headline-sm:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
  body-lg:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label-lg:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 14px
    fontWeight: 500
  label-sm:
    fontFamily: "FT Kunst Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: 12px
    fontWeight: 500
    letterSpacing: 0.08em
  mono-md:
    fontFamily: "Apercu Mono Pro, SF Mono, Fira Code, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  mono-sm:
    fontFamily: "Apercu Mono Pro, SF Mono, Fira Code, Consolas, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  "2xl": 80px
  card: 24px
  section: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.body-md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FFFFFF"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.body-md}"
  button-secondary-hover:
    backgroundColor: "{colors.surface-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.body-md}"
  button-ghost-hover:
    textColor: "{colors.on-surface}"
  card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "12px"
  input-focus:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
  pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
    typography: "{typography.label-lg}"
---

# Cloudflare Workers Design System

## Overview

The Cloudflare Workers design system targets technical marketing pages — product landing pages, pricing calculators, documentation shells, and feature comparisons. The visual language is warm and confident rather than sterile: cream and tan surfaces replace pure white, warm brown replaces pure black, and Cloudflare orange appears as a precise accent rather than a background flood.

The aesthetic is deliberately subdued. Motion is brief and physical. Borders are light and often dashed. Shadows are subtle. The system rewards restraint: a page that looks nearly bare at first glance reveals careful layering on closer inspection — corner-bracket details on bordered wrappers, a dot-pattern background, a single orange CTA against a sea of cream.

Primary typeface is FT Kunst Grotesk, a humanist grotesque with a confident technical feel. Headings are set at medium weight (500) with tight tracking, never bold. Code, numeric values, and technical labels use Apercu Mono Pro.

## Colors

The palette has three layers: the primary orange accent, a warm neutral surface stack, and product category colors for Cloudflare's individual products.

**Primary accent — Cloudflare orange (`primary`)**: `#FF4801`. Used for CTAs, active states, focus rings, links, and progress fills. Its hover state is a softer orange (`primary-hover`: `#FF7038`). Treat it as an emphasis color, not a background.

**Surface stack**: Four layered warm creams create depth without shadows.
- `surface` (`#F5F1EB`) — page gutter and outermost background
- `surface-raised` (`#FFFBF5`) — main content surface (hero backgrounds, feature sections)
- `surface-card` (`#FFFDFB`) — card and input backgrounds
- `surface-hover` (`#FEF7ED`) — hover state fill for interactive surfaces

**Text**: `on-surface` (`#521000`) is a warm dark brown used for primary text. Muted and subtle variants are opacity-based: 70% opacity for secondary text, 40% for tertiary. These are not discrete color tokens but CSS properties using `rgba(82, 16, 0, 0.7)` and `rgba(82, 16, 0, 0.4)` respectively.

**Border**: `border` (`#EBD5C1`) — a warm tan used for all dividers, card borders, and input outlines. A 50% opacity variant `rgba(235, 213, 193, 0.5)` is used for lighter structural lines.

**Semantic colors**: `error` (`#DC2626`), `success` (`#16A34A`), `warning` (`#EAB308`). Treat these as status indicators only, not decoration.

**Product category colors**: Each Cloudflare product family has a strong accent and soft fill.
- Compute (`compute`: `#0A95FF`)
- Storage (`storage`: `#EE0DDB`)
- AI (`ai`: `#19E306`)
- Media (`media`: `#9616FF`)

**Dark mode**: All surfaces invert to deep charcoal and near-black neutrals. Orange shifts slightly to `#F14602` (primary) and `#FF6D33` (hover). Text becomes `#F0E3DE`. Dark mode uses CSS custom property overrides at `@media (prefers-color-scheme: dark)`.

## Typography

Two typefaces only. FT Kunst Grotesk for all UI text, Apercu Mono Pro for code and numeric labels.

The type scale uses weight 500 (medium) for all headings — never bold. This keeps the hierarchy legible without heaviness. Body copy is 400 weight with a relaxed 1.6 line-height.

The `hero` style (`48px / 500 / -0.02em`) is reserved for single-page hero headlines. `headline-lg` through `headline-sm` cover page, section, and card headings. `body-md` is the base reading size. `label-sm` uses uppercase tracking (`0.08em`) for kickers and category labels.

Mono styles (`mono-md`, `mono-sm`) appear for code blocks, pricing values, and input labels that benefit from a technical tone. Don't reach for mono as decoration.

## Layout

The spacing system uses a 4px base unit. Named spacing tokens (`xs` through `2xl`) cover the full range from tight UI gaps to section rhythm. `card` (`24px`) and `section` (`48px`) are semantic aliases for the two most common layout decisions.

Container widths:
- `sm`: 640px — narrow columns
- `md`: 768px — reading width
- `lg`: 1024px — content with sidebar
- `xl`: 1200px — wide content
- `2xl`: 1480px — full marketing layout

Preferred grid patterns:
- Feature grid: 1 column (mobile) → 3 columns (desktop)
- Calculator/configurator: 1 column (mobile) → 2 columns (desktop)
- Product grid: 1 column (mobile) → 6 columns (large desktop)

Section rhythm uses `48px`, `64px`, and `80px` gaps between major sections. Prefer consistent gap values from a parent grid over individual margin declarations.

## Elevation & Depth

This system is flat-first. Visual depth comes from border color changes and surface layering, not from shadows.

The card shadow is deliberately whisper-quiet: `0 1px 3px rgba(82, 16, 0, 0.04), 0 4px 12px rgba(82, 16, 0, 0.02)`. Use it on cards and bordered wrappers when the surface needs to lift off the page background, but not as a default on every container.

The focus ring is `0 0 0 3px rgba(255, 72, 1, 0.2)` — a soft orange glow that makes keyboard focus visible without being aggressive.

Never use glassmorphism, large ambient glows, or heavy multi-layer shadows. The system's depth cues are structural, not atmospheric.

## Shapes

Rounded corner tokens follow a compact scale: `sm` (4px) for badges, `md` (8px) for inputs and compact chips, `lg` (12px) for cards and panels, `xl` (16px) for large section wrappers, `full` (9999px) for buttons and pill labels.

The signature shape detail is the **corner bracket**: a pair of small squares (8px × 8px, `border-radius: 1.5px`) positioned at each corner of a bordered wrapper. They sit 4px outside the container border and carry the same border color. Apply them to the outermost feature strip or hero wrapper — not to every nested card.

Other signature details:
- **Dot pattern**: `radial-gradient(circle, #EBD5C1 0.75px, transparent 0.75px)` at 12px × 12px, used as a subtle background texture on hero sections.
- **Dashed dividers**: `linear-gradient(to right, #EBD5C1 50%, transparent 50%)` at 16px × 1px, used to separate sections without a heavy rule.

## Components

**Buttons** come in three variants. `button-primary` uses the orange accent with a pill shape and white text. `button-secondary` uses the card surface with warm brown text. `button-ghost` is transparent with orange text that shifts to warm brown on hover. All buttons share the `full` border radius. On press, apply `translateY(1px) scale(0.98)` for a physical, restrained active state.

**Cards** use `surface-card` as their background with a `border` color outline, `lg` border radius, and `card` padding. Corner-bracket details go on the outermost card in a feature group, not on every individual card.

**Inputs** use `surface-card` background, `border` outline, `md` border radius, and `12px` padding. Numeric inputs are right-aligned. On focus, replace the standard outline with the orange focus ring and a subtle orange border.

**Pills / chips** use the `pill` component token: card background, full border radius, medium label type. The primary variant fills with `primary` orange and white text.

**Comparison rows** (used in pricing calculators) are full-width bordered containers with a provider label on the left, a price on the right, and a progress bar filling the bottom. The bar uses `primary` orange fill on a `border`-colored track.

## Do's and Don'ts

**Do:**
- Use warm cream surfaces (`surface`, `surface-raised`, `surface-card`) everywhere — never pure white
- Use warm brown (`on-surface`) for body text — never pure black
- Reserve orange for emphasis: CTAs, active states, focus rings, progress fills, and inline links
- Keep button shapes pill-like (`rounded.full`)
- Apply corner-bracket decoratives to the outermost bordered wrapper in each section
- Use dashed borders and dot patterns sparingly as structural accents
- Set headings at weight 500 with tight tracking
- Use mono type for code, prices, and technical numeric labels
- Test against `prefers-reduced-motion` — large section entrances should fade, not fly

**Don't:**
- Use pure white (`#FFFFFF`) as a page or card background
- Use pure black (`#000000`) for text
- Fill large backgrounds with orange — the hero may go loud, but the page should settle into cream
- Use generic blue links — orange is the link color in this system
- Apply heavy shadows, glowing halos, or glassmorphism to any element
- Scatter corner-bracket decoratives on every nested card or input
- Use bold (700+) headings — medium weight carries the hierarchy
- Animate individual list items or micro-elements — animate sections as a block
