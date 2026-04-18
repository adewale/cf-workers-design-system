# Product Page Patterns

Workers product pages use a stricter composition language than the broader calculator pages.

## Section Order

```text
Hero
Benefits strip
How it works
Use cases
Architecture / explainer visual
Optional code examples
Optional pricing
CTA
Footer
```

## Section Rhythm

Use parent gap rather than independent margins.

```css
.gap-section {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 1024px) {
  .gap-section {
    gap: 64px;
  }
}

@media (min-width: 1280px) {
  .gap-section {
    gap: 80px;
  }
}
```

## Horizontal Padding

```css
.px-section {
  padding-inline: 8px;
}

@media (min-width: 768px) {
  .px-section {
    padding-inline: 16px;
  }
}

@media (min-width: 1024px) {
  .px-section {
    padding-inline: 24px;
  }
}

@media (min-width: 1280px) {
  .px-section {
    padding-inline: 32px;
  }
}
```

## Heading Rules

- Hero uses the page's dominant heading.
- Section headings are large, medium weight, centered, and tightly tracked.
- Avoid mixed heading hierarchies that drift into arbitrary `h4` and `h5` usage.

## Benefits Strip

- One bordered wrapper.
- Internal separators between items.
- Wrapper owns the corner decorations.
- Icons use foreground color, not rainbow accents.

## Use Case Grid

- Left column acts as section intro.
- Right side contains cards or mini-flow diagrams.
- Keep diagram pills fully rounded.

## Architecture Diagram

When using React Flow:

- disable drag, zoom, selection, and connection affordances
- treat it as a static explainer
- use dashed animated edges sparingly
- keep labels readable and background chips opaque

## CTA

- bright orange section or container
- white or cream primary CTA pill
- secondary pill is orange-on-orange with contrast
- optional ticker or scrolling proof row below

## Footer

- wide container
- multi-column links
- subtle gradient or layered cream background
- legal links on a lighter sub-row
