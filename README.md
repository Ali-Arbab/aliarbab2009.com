# aliarbab2009.com

Personal portfolio. Three project worlds (StockSaathi, BolHisaab, MagLock Protocol) composed into a single site at `aliarbab2009.com`.

## Stack

- Next.js 15 (App Router, RSC)
- TypeScript strict
- Tailwind CSS v4 + CSS custom properties for per-project theming
- MDX via velite (added in Phase 1)
- Radix primitives + class-variance-authority
- Framer Motion (added as needed)
- Deployed to Vercel

## Quickstart

```bash
pnpm install
cp .env.example .env.local   # fill in Resend key, etc.
pnpm dev                     # → http://localhost:3000
```

Scripts:

- `pnpm dev` — start dev server (Turbopack)
- `pnpm build` — production build
- `pnpm start` — run built server
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm privacy-audit` — grep built output for forbidden tokens (see `scripts/privacy-audit.mjs`)

## Architecture

See the full blueprint at `C:\Users\Alig\.claude\plans\i-own-stocksaathi-aliarbab2009-stocksaat-kind-pine.md` (local) — or the `CLAUDE.md` in this repo for conventions.

Key directories:

- `src/app` — routes (App Router)
- `src/components/{ui,shell,home,project,about,mdx,decoration,icons}` — UI
- `src/lib` — utilities (`time.ts` for countdowns, `utils.ts` for `cn()`, etc.)
- `src/config/milestones.ts` — **single source of truth** for public academic dates (AP exams)
- `scripts/privacy-audit.mjs` — CI gate that fails the build if any forbidden token leaks into the deployed output
- `_repos/` (gitignored) — read-only clones of StockSaathi and BolHisaab for reference
- `maglock_protocol/` (gitignored) — local MagLock source files

## Privacy

The deployed site publishes only: Ali Arbab (name), GitHub handle `aliarbab2009`, Class XII status, the three projects, AP exam countdowns, resume PDF.

It does **not** publish: city, school, phone, timezone, raw Gmail, any specific college name, any application deadline, any decision date. `scripts/privacy-audit.mjs` enforces this automatically.

Internal deadlines live in `PRIVATE_CALENDAR.md` which is gitignored. Never commit.

## Deploy

Every push to `main` auto-deploys to Vercel. Preview deploys on every PR. DNS points `aliarbab2009.com` apex + `www` to Vercel via A + CNAME records. HSTS is set in `next.config.ts` headers.
