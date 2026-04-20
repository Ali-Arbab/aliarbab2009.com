# `_archive/` — dormant code, kept on purpose

This directory holds code that is **no longer part of the active site** but is retained in git history for reference or potential future use. Nothing in here is imported by the Next.js build.

## What's here

### `variants/styles-routes/`
The four-world aesthetic comparison that briefly lived at `/styles`, `/styles/editorial`, `/styles/cyberpunk`, and `/styles/brutalist`. Ali picked **brutalist** and asked me to promote it to the site default; the other three were archived (not deleted) in case he wants to revisit later.

Contents:
- `editorial/{layout,page}.tsx` — warm cream editorial, Instrument Serif, drop cap lede, side-rail marginalia, numbered feature articles.
- `cyberpunk/{layout,page}.tsx` — pure black with scanlines, Orbitron chromatic aberration, live boot-sequence log, system stat ticker, corner-bracket project frames, ASCII footer.
- `brutalist/{layout,page}.tsx` — Swiss mono-grid brutalist template. This **was** the prototype; the production home page at `src/app/(marketing)/page.tsx` is derived directly from this file.
- `page.tsx` + `layout.tsx` — the 2×2 variant comparison index that lived at `/styles`.

### `components/styles/`
- `variant-switcher.tsx` — fixed-top navigation chip used on each variant page to hop between the four aesthetics. Not needed now that we've picked one.
- `cyberpunk-decor.tsx` — `<BootSequence>` and `<StatTicker>` client components used only by the cyberpunk variant.

### `components/home/`
- `home-hero.tsx` — the dark-neon-minimal hero (variant 01) used on the original `/`, with conic aurora backdrop, `buttonVariants` CTAs, Fraunces display.
- `featured-projects.tsx` — the three-tile featured-projects grid in variant 01 styling.
- `now-bar.tsx` — live status strip reading from `milestones.ts`. Used `<LiveCountdown>` which is kept in `src/components/shell/`.

## To revive one later

1. Move the folder back into `src/app/` or `src/components/`.
2. Re-add the variant theme block to `src/app/globals.css` (see git history — they were in the default theme file before commit `031ecc1`).
3. Re-load any fonts the variant used (Instrument Serif, Orbitron, Rajdhani, Fraunces) in `src/app/layout.tsx`.

## Rules for `_archive/`

- **Never import from `_archive/`** in the active site. TypeScript's exclude rule in `tsconfig.json` keeps this honest.
- Add things to `_archive/` rather than deleting when there's plausible future use and the history is worth preserving in tree form.
- This folder is committed (unlike `_repos/` which is gitignored).
