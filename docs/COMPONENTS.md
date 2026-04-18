# Components

Reference patterns for Cloudflare Workers-style components.

## Buttons

### Primary

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FF4801] bg-[#FF4801] px-6 py-3 font-medium text-white transition-all duration-150 hover:opacity-95 hover:border-dashed active:translate-y-px active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#FF4801]/30">
  Get started
</button>
```

### Secondary

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#EBD5C1] bg-[#FFFDFB] px-6 py-3 font-medium text-[#521000] transition-all duration-150 hover:bg-[#FEF7ED] hover:border-dashed active:translate-y-px active:scale-[0.98]">
  View docs
</button>
```

### Ghost

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-full border border-[#EBD5C1] bg-transparent px-6 py-3 font-medium text-[#FF4801] transition-all duration-150 hover:border-[#FF4801] hover:border-dashed hover:text-[#521000]">
  Compare pricing
</button>
```

## Card Wrapper

```jsx
<div className="relative rounded-xl border border-[#EBD5C1] bg-[#FFFDFB] p-6 shadow-[0_1px_3px_rgba(82,16,0,0.04),0_4px_12px_rgba(82,16,0,0.02)]">
  <div className="absolute -left-1 -top-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -right-1 -top-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -bottom-1 -left-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />
  <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-[1.5px] border border-[#EBD5C1] bg-[#FFFBF5]" />

  <h3 className="mb-2 text-lg font-medium text-[#521000]">Feature title</h3>
  <p className="text-sm leading-relaxed text-[#521000]/70">
    Supporting copy goes here. Keep it direct and not overly dense.
  </p>
</div>
```

## Feature Card

```jsx
<div className="relative rounded-xl border border-[#EBD5C1] bg-[#FFFDFB] p-6 transition-all duration-200 hover:bg-[#FEF7ED]">
  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF4801]/10 text-[#FF4801]">
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3.75 13.5 14.25 2.25 12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" strokeWidth="1.5" />
    </svg>
  </div>
  <h3 className="mb-2 text-base font-medium text-[#521000]">Lightning fast</h3>
  <p className="text-sm leading-relaxed text-[#521000]/70">
    Compute and data products should feel fast before the user even runs them.
  </p>
</div>
```

## Input

```jsx
<label className="flex flex-col gap-2">
  <span className="text-base font-medium text-[#521000]">Storage amount</span>
  <input
    type="text"
    className="rounded-lg border border-[#EBD5C1] bg-[#FFFDFB] p-3 text-right text-sm text-[#521000] outline-none transition-all duration-150 focus:border-[#FF4801] focus:ring-2 focus:ring-[#FF4801]/10"
    defaultValue="10"
  />
</label>
```

## Input With Unit

```jsx
<div className="flex gap-2">
  <input className="flex-1 rounded-lg border border-[#EBD5C1] bg-[#FFFDFB] p-3 text-right" defaultValue="10" />
  <select className="rounded-lg border border-[#EBD5C1] bg-[#FEF7ED] px-3 py-3 text-sm text-[#521000] outline-none">
    <option>GB</option>
    <option>TB</option>
    <option>PB</option>
  </select>
</div>
```

## Slider

```jsx
<div className="pt-8">
  <div className="mb-2 flex items-center justify-between">
    <label className="text-base font-medium text-[#521000]">Monthly egress</label>
    <span className="rounded-full bg-[#FF4801]/10 px-2 py-1 text-xs font-medium text-[#FF4801]">75%</span>
  </div>
  <input type="range" min="0" max="500" value="75" className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#EBD5C1]" />
</div>
```

## Comparison Row

```jsx
<div className="border border-[#EBD5C1] bg-[#FFFDFB] p-4">
  <div className="mb-3 flex items-center justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded bg-[#FF4801] text-[10px] font-medium text-white">R2</div>
      <span className="font-medium text-[#521000]">Cloudflare R2</span>
    </div>
    <div className="text-right">
      <span className="text-lg font-medium text-[#521000]">$150.00</span>
      <span className="text-sm text-[#521000]/70">/mo</span>
    </div>
  </div>
  <div className="h-3 overflow-hidden rounded-full bg-[#EBD5C1]/30">
    <div className="h-full rounded-full bg-[#FF4801] transition-all duration-500" style={{ width: '15%' }} />
  </div>
</div>
```

## Hero Pattern

```jsx
<section className="bg-[#FF4801] py-16 sm:py-24 text-center text-white relative overflow-hidden">
  <div className="relative z-10 mx-auto max-w-4xl px-6">
    <h1 className="mb-6 text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
      Build full-stack applications at the edge
    </h1>
    <p className="mx-auto mb-8 max-w-2xl text-lg text-white/75">
      The hero can go loud with orange, but the rest of the page should settle back into cream surfaces.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
      <a className="rounded-full bg-white px-8 py-3.5 font-medium text-[#FF4801]">Start building</a>
      <a className="rounded-full border border-white/40 px-8 py-3.5 font-medium text-white">Read docs</a>
    </div>
  </div>
</section>
```

## Calculator Layout

```jsx
<main className="mx-auto max-w-5xl px-6 sm:px-8">
  <section className="relative border border-[#EBD5C1] bg-[#FFFDFB] p-6 sm:p-8">
    <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">{/* inputs */}</form>

    <div className="mb-4 mt-6 flex justify-end">{/* month/year toggle */}</div>

    <div className="space-y-3">{/* provider comparison rows */}</div>

    <div className="mt-6 border-t border-[#EBD5C1]/50 pt-6">{/* use cases */}</div>
  </section>
</main>
```

## Product-Page Feature Strip

Rules:

- Use one bordered wrapper around all three features.
- Apply corner decorations to the wrapper, not each card.
- Separate cards with internal borders instead of gaps when matching Workers product pages closely.
- Use foreground-colored icons in the strip, not product accent colors.
