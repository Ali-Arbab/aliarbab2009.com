# CLAUDE.md — conventions for `aliarbab2009.com`

Context for future Claude sessions working in this repo.

## Project overview

Personal portfolio at `aliarbab2009.com`. Three project worlds (StockSaathi, BolHisaab, MagLock Protocol) composed into one site. Ali Arbab is a Class XII student building this to share with college admissions officers, recruiters, and collaborators.

Plan file (read before major new phases): `C:\Users\Alig\.claude\plans\i-own-stocksaathi-aliarbab2009-stocksaat-kind-pine.md`.

## Hard rules (non-negotiable)

### Privacy + no-doxxing

**No city, school, phone, timezone, raw Gmail, or any specific college name may appear on the deployed site.** The site is college-agnostic — shareable with any admissions officer without naming a target institution. `/about` is the admissions-ready long-version page (NOT `/mit` or anything similar).

Before merging content changes, mentally grep for: city names, MIT/Harvard/Stanford/any college, "EA"/"early action"/"regular action", "admissions committee", timezone strings, phone numbers, `foxman1544...@gmail.com`. The CI script `scripts/privacy-audit.mjs` enforces this by failing the build on any hit.

Internal/private dates (application freeze dates, etc.) live in `PRIVATE_CALENDAR.md` which is gitignored. Never commit.

### Live countdowns, zero external input

All countdowns must be purely client-local. ISO dates baked into `src/config/milestones.ts`. `src/lib/time.ts#timeUntil()` is a pure function. `<LiveCountdown>` is a client component that ticks from `new Date()` via `setInterval(1000)` — no API calls, ever. Works offline after first paint. In written docs, use absolute dates only (never "+N days" snapshots).

### Site aesthetic — brutalist dark (with light toggle)

The site default is **Swiss/brutalist**: 12-col mono-grid, hairline off-white borders on near-black, Space Grotesk + JetBrains Mono, single bright cobalt accent `#6b82ff`, zero radius. Light mode flips to cream `#f4f4f0` with black hairlines and pure cobalt `#0033ff`.

The mode is controlled by `data-theme="dark"` / `data-theme="light"` on `<html>`, set by `<ThemeScript>` (inline, pre-paint) and flipped by `<ThemeToggle>` in the nav. User preference persists to `localStorage.theme`; first-visit defaults respect `prefers-color-scheme` and fall back to dark.

Tokens live in `src/app/globals.css` as a root `@theme` block (dark) plus `:root[data-theme="light"]` override.

### Per-project theming

Project detail pages (`/projects/<slug>`) each wrap their `<main>` in a `.theme-<slug>` class that overrides the brutalist tokens. Three project worlds live in `src/app/globals.css`: `.theme-stocksaathi` (teal on deep-black), `.theme-bolhisaab` (indigo on cream), `.theme-maglock` (neon green on pure black). Shell (nav, footer) stays on the site-default brutalist tokens, so visitors feel "inside Ali's site but now in a project's world."

Do not introduce separate `<Button>` variants like `<StockSaathiButton>` — the single `<Button>` auto-themes because its `bg-primary` reads from `--color-primary` which is overridden by the project theme class.

## Conventions

### Folder layout

- `src/app` — routes (App Router, route groups `(marketing)` + `(dev)`)
- `src/components/ui` — primitives (Button, Badge, Card, Dialog, Tabs, Tooltip)
- `src/components/shell` — Nav, Footer, CommandPalette, LiveCountdown
- `src/components/home` — HomeHero, AuroraOrb, FeaturedProjects, NowBar
- `src/components/project` — ProjectHero, StatsStrip, ArchitectureDiagram, LiveDemoEmbed
- `src/components/about` — AboutHeroLetter, WhyThisProjectBlock
- `src/components/mdx` — MDX-available (Callout, PullQuote, Figure)
- `src/components/decoration` — ParticleField, NoiseOverlay, GradientMesh
- `src/components/icons` — custom SVG marks
- `src/lib` — utilities (`cn`, `time`, `github`, `seo`, etc.)
- `src/config` — `site.ts`, `projects.ts`, `milestones.ts`
- `content` — MDX case studies (Phase 1+)
- `public/{fonts,textures,projects,resume,og,social}`
- `scripts` — `optimize-media.mjs`, `scrub-metadata.mjs`, `privacy-audit.mjs`, `clone-reference-repos.sh`
- `_repos/` (gitignored) — reference clones of StockSaathi + BolHisaab
- `_archive/` (tracked) — dormant code kept for reference (archived aesthetic variants). Never import from here.
- `maglock_protocol/` (gitignored) — local MagLock source

### Styling

- Tailwind v4 utility classes. Read tokens from CSS custom properties defined in `@theme` block.
- Prefer `cn()` helper (tailwind-merge wrapper) when composing class strings with conditionals.
- Use `class-variance-authority` for component variants (see `src/components/ui/button.tsx`).

### Data flow

- Server Components by default. Mark client components with `"use client"` only when they need state, effects, or browser APIs.
- `<LiveCountdown>` is client (needs `setInterval`). `<NowBar>` wraps client pieces in a server shell.
- Case-study data flows: `content/projects/<slug>/meta.ts` → `<ProjectTemplate>` → MDX body with auto-imported MDX components.

### Adding a new project

1. Create `content/projects/<slug>/{index.mdx, meta.ts, challenges.mdx, architecture.mdx, why-i-built.mdx}`.
2. Add a `.theme-<slug>` CSS block to `src/app/globals.css`.
3. Create `src/app/(marketing)/projects/<slug>/{layout.tsx, page.tsx, opengraph-image.tsx}`.
4. Add assets under `public/projects/<slug>/`.
5. Add an entry to `src/config/projects.ts`.
6. Run `scripts/scrub-metadata.mjs` on all new images before commit.
7. Run `pnpm privacy-audit` locally before pushing.

## Gotchas

- `maglock_protocol/` exists as a gitignored sibling folder. Never import from it; reference only.
- `_repos/StockSaathi/` and `_repos/BolHisaab/` are likewise gitignored reference clones. Read them; don't depend on them at build time.
- Tailwind v4 has no `tailwind.config.ts` by default — tokens live in `@theme` directive inside `src/app/globals.css`. If we ever add a plugin, we can re-introduce a config file for plugins only.
- MDX pipeline via `velite` is added in Phase 1 (not Phase 0). Phase 0 is "coming soon" stubs + deploy.
- Fonts: only `Space_Grotesk` + `JetBrains_Mono` are loaded (via `next/font/google`). The earlier Fraunces / Instrument Serif / Orbitron / Rajdhani / Inter imports were dropped when brutalist was promoted — the archived variants in `_archive/` still reference them in CSS comments but the actual `next/font/google` calls are gone.
- The `<LiveCountdown>` component at `src/components/shell/live-countdown.tsx` is not yet used in any visible page after the neon-minimal home was archived. It stays because (a) it's lightweight and (b) Phase 3 /about academic snapshot will use it for AP exam countdowns. Do not delete it prematurely.
