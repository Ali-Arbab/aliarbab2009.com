# Accessibility statement

The site aims for WCAG 2.2 AA. This is the working list of principles, not a certification.

## Principles

1. **Semantic HTML first.** `<nav>`, `<main>`, `<aside>`, `<section>`, `<time>`, `<button type="button">`. ARIA only where roles can't be expressed in HTML.
2. **Keyboard-navigable everywhere.** No mouse-only paths. Tab order matches visual order. Focus rings visible. `Esc` closes overlays. `⌘K` opens the command palette.
3. **Color contrast ≥ 4.5:1** for body text in both dark and light modes. Cobalt accent `#6b82ff` passes against near-black; pure cobalt `#0033ff` passes against cream.
4. **Reduced motion respected.** `prefers-reduced-motion: reduce` collapses transitions to 0.01ms and disables view-transition animations. `<LiveCountdown>` ticks every 60s instead of 1s.
5. **Screen-reader friendly.** `<time datetime="...">` for every absolute date. `aria-label` on icon-only buttons. `aria-live="polite"` for the countdown updates so SR users hear the change without hijacking focus.
6. **Forms labelled.** Every `<input>` has an associated `<label>`. Errors announced via `aria-describedby` + `aria-invalid`.
7. **Images alt-texted.** Decorative images get `alt=""`; informational images get descriptive alt. SVG icons either get `aria-hidden="true"` (decorative) or `<title>` (interactive).

## What we don't claim

- Full audit by a third-party a11y consultancy
- Compatibility with every assistive technology under every config
- WCAG 2.2 AAA — out of scope

## Testing

- **Manual:** keyboard-only nav, VoiceOver / NVDA spot checks per release
- **Automated:** ESLint `jsx-a11y/*` rules at `--max-warnings=0`
- **Future:** Phase 4 axe-core scan in CI

## Known gaps

- Some marketing copy uses hairline borders below 4.5:1 contrast at small sizes — they're decorative-only, content alongside is at full contrast
- The `<dialog>`-based command palette focus management depends on browser-native behavior; minor differences across Safari / Chrome / Firefox

If you find a barrier, email `siteConfig.email` (visible at `/contact`).
