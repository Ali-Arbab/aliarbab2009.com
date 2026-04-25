# ADR 0004: College-agnostic privacy posture

**Status:** accepted · **Date:** 2026-04-25

## Context

The site is a personal portfolio for a Class XII student (Ali Arbab,
GitHub `@aliarbab2009`) who applies to college in late 2026. Two
shapes the site could take:

1. **College-targeted variant.** "Hi MIT admissions, here's why I'd
   thrive on your campus…" — addressed to one institution.
2. **College-agnostic variant.** "Hi — I'm Ali. Here's the long
   version of who I am and what I've built." — shareable with any
   admissions officer, any recruiter, any collaborator.

The plan file mandated #2.

## Decision

The deployed site at `aliarbab2009.com` publishes only what's
intentional public info:

**Allowed:** name (Ali Arbab), GitHub handle, Class XII status, the
three projects (StockSaathi / BolHisaab / MagLock Protocol), AP exam
countdowns, the HTML resume.

**Disallowed:** city, school, phone number, timezone, raw Gmail
address, any specific college name, any application deadline, any
decision date. WHOIS privacy stays on. Internal deadlines live in
`PRIVATE_CALENDAR.md` (gitignored).

## Enforcement (defense in depth)

Privacy isn't a one-time review — it's a continuous CI gate.

1. **`scripts/privacy-audit.mjs`** scans `.next/server`, `.next/static`,
   and `public/` for forbidden tokens. Three severity tiers (HIGH /
   MEDIUM / LOW). HIGH always fails CI; MEDIUM fails when
   `STRICT_PRIVACY=1`; LOW reports only.
2. **JSON-LD negative-space tests** — every emitted structured-data
   payload is recursively walked at test time and asserted to contain
   none of: `address`, `telephone`, `birthDate`, `birthPlace`,
   `nationality`, `gender`, `alumniOf`, `worksFor`. 16 tests.
3. **Per-config school-name regex guards** — every typed content
   file (`activities.ts`, `awards.ts`, `timeline.ts`, `why-i-built.ts`,
   `resume.ts`) has a Vitest regex check for `(Capitalized )+(School|
   Academy|Institute|College)\b` patterns in user-facing fields.
4. **Geo-leak guard on `siteConfig`** — `shortDescription` and
   `longDescription` regex-checked against Indian metro names
   (Delhi/Mumbai/Bengaluru/Chennai/Kolkata/Hyderabad).
5. **AI-bot allowlist** — `robots.ts` deliberately does NOT block
   GPTBot/CCBot/anthropic-ai/Google-Extended. The portfolio is
   meant to be discoverable by every surface, including LLM search.
   A future PR that quietly adds an AI-bot block trips a test.
6. **Resume PDF metadata scrub gate** — when the PDF lands at
   `public/resume/*.pdf`, the privacy-audit script optionally runs
   `pdftotext` + `exiftool` to confirm no GPS / Author / serials.

## Consequences

**Pros:** The site is shareable verbatim with any audience. Search
engines index it as portfolio content, not a college application
artifact. Future Ali (or future Ali's children, or any AO at any
school in any country) sees the same surface.

**Cons:** No personalization. Some institutions ask for a
"Why us?" essay; that piece never appears here. We accept the
trade-off — the personal essay belongs in the application portal
itself, not on a public site that gets cached forever.

## Tested by

- `scripts/privacy-audit.mjs` (CI gate)
- `src/lib/json-ld.test.ts` — 16 tests, JSON-LD negative space
- `src/config/{activities,awards,timeline,why-i-built,resume}.test.ts`
  — school-name regex guards across all content surfaces
- `src/config/site.test.ts` — 10 tests including geo-leak guard
- `src/app/robots.test.ts` — 7 tests including AI-bot allowlist lock
