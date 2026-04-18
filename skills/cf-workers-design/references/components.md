# Components

## Preferred Shapes

- buttons: pill
- inputs: soft rounded rectangle
- cards: 12px radius
- progress bars and pills: full radius

## Button Variants

| Variant | Fill | Text | Border |
| --- | --- | --- | --- |
| primary | orange | white | orange |
| secondary | card bg | brown | tan |
| ghost | transparent | orange | tan |

## Card Pattern

```jsx
<div className="relative rounded-xl border border-[#EBD5C1] bg-[#FFFDFB] p-6">
  <div className="absolute -left-1 -top-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -right-1 -top-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
</div>
```

## Calculator Shell

Use this structure for R2-style tools:

```text
Bordered shell
  input grid
  period toggle
  provider comparison rows
  use-case preset buttons
  pricing table
```

## Feature Strip

For workers product pages:

- one wrapper around all three features
- internal separators, not independent floating cards
- icons in foreground color

## Forms

- labels sit above controls
- numeric values usually align right
- focus state uses orange border and soft ring
- unit selectors use a slightly warmer background than inputs
