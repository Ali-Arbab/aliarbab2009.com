# Testing strategy

This site has a small but layered test suite. Each layer answers a different "what could break?" question.

## Layers

### 1. Pure-function unit tests (`src/lib/*.test.ts`)

Anything in `src/lib/` is a pure function — same input, same output, no side effects. Tested for:

- Correctness across boundary cases
- Purity (calling twice returns the same result)
- Defensive shape (rejects malformed input gracefully)

Files: `time.test.ts` (17), `seo.test.ts` (14), `json-ld.test.ts` (16), `utils.test.ts` (9), `format-date-range.test.ts` (7), `format-timeline-date.test.ts` (7), `safe-json.test.ts` (9).

### 2. Typed-config schema tests (`src/config/*.test.ts`)

Every typed content file gets a Vitest companion that validates:

- Schema shape (every required field present, no extra keys)
- Cross-entry invariants (chronological ordering, unique slugs)
- **Privacy regex guards** (no school/city/college names in user-facing fields)

Files: `activities.test.ts`, `awards.test.ts`, `coursework.test.ts`, `milestones.test.ts`, `projects.test.ts`, `resume.test.ts`, `site.test.ts`, `timeline.test.ts`, `why-i-built.test.ts`.

### 3. Component tests (`src/components/**/*.test.tsx`)

Component tests use `@testing-library/react` over `happy-dom`. Coverage focuses on:

- Render shape (the right elements exist)
- Behavior (clicks fire handlers, dispatch events)
- Boundary state (empty / past / fallback branches)
- Accessibility hooks (aria labels, semantic elements)

Files: `resume-actions.test.tsx`, `command-palette-trigger.test.tsx`, `now-bar.test.tsx`, `live-countdown.test.tsx`, `seo/json-ld.test.tsx`.

### 4. Route-handler tests (`src/app/**/route.test.ts`)

API routes get tested by constructing native `Request` objects and calling the exported handlers directly. No framework mocking. Each defense layer (origin, content-type, schema, honeypot, rate-limit) gets a dedicated test.

Files: `api/contact/route.test.ts`, `api/csp-report/route.test.ts`.

### 5. Build-time guards (`scripts/`)

`scripts/privacy-audit.mjs` scans the built `.next/` output for forbidden tokens. Runs in CI and locally via `pnpm privacy-audit`. Three severity tiers: HIGH always fails, MEDIUM fails when `STRICT_PRIVACY=1`, LOW reports.

## What's NOT tested here

- Visual regression — deferred to Phase 4 Playwright + Percy
- Cross-document view transitions — happy-dom can't simulate
- PDF metadata scrub — runs at PDF build time, not Vitest

## Run

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `pnpm test`            | Runs the full Vitest suite once                 |
| `pnpm test --watch`    | Watch mode                                      |
| `pnpm typecheck`       | `tsc --noEmit` against the whole project        |
| `pnpm privacy-audit`   | Build + scan for forbidden tokens               |
| `pnpm lint`            | ESLint with `--max-warnings=0`                  |
