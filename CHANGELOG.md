# Changelog

This file tracks notable changes to `aliarbab2009.com`. Format follows [Keep a Changelog](https://keepachangelog.com/) with semantic-versioned section headers when the site reaches a tagged release.

## [Unreleased]

### Added
- Native `<dialog>`-backed command palette with `⌘K` / `Ctrl+K` open
- Live AP-exam countdown stack (`milestones.ts` → `time.ts` → `<LiveCountdown>` → `<NowBar>`)
- College-agnostic privacy posture with 6-layer enforcement (CI script, JSON-LD negative space, per-config regex guards, geo-leak guard, AI-bot allowlist, future PDF scrub)
- Type-guarded content config files: `activities`, `awards`, `coursework`, `milestones`, `projects`, `resume`, `site`, `timeline`, `why-i-built`
- HTML-first resume page at `/resume` with print fallback and PDF gating
- API routes `/api/contact` (5-layer defense + Resend gating) and `/api/csp-report` (legacy + modern formats, rate-limited)
- ADRs 0001–0010 documenting the major architectural decisions
- Vitest test suite covering ~210 tests across pure libs, typed configs, components, and route handlers

### Privacy
- Locked: no city, school, phone, timezone, raw Gmail, or specific college name in the deployed bundle
- Locked: AI-bot allowlist in `robots.ts` — site is intentionally discoverable to LLM crawlers
- Locked: JSON-LD payloads contain no PII keys (address, telephone, birthDate, etc.)
