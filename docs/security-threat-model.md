# Security threat model

Lightweight STRIDE-flavored model for this static-with-API portfolio. Documents what the site protects against and what it deliberately does not.

## Assets

| Asset                                | Sensitivity | Where it lives                                       |
| ------------------------------------ | ----------- | ---------------------------------------------------- |
| Ali's name, GitHub handle, work      | Public      | Site bundle                                          |
| AP exam dates                        | Public      | `src/config/milestones.ts`                           |
| Resume content                       | Public      | `src/config/resume.ts` + future PDF                  |
| Inbound contact-form messages        | Private     | Resend → `siteConfig.email`, never persisted on site |
| Internal calendar (deadlines)        | Private     | `PRIVATE_CALENDAR.md` (gitignored)                   |
| `RESEND_API_KEY`                     | Secret      | Vercel env var, never in repo                        |
| Forbidden tokens (city/school/etc.)  | Private     | Must NEVER reach the deployed bundle                 |

## Threats addressed

### T1. Privacy leak via content drift

**Risk:** an editor adds a city / school / college name to a config file or MDX body, builds, deploys, and the leak is permanent in caches.

**Mitigation:**
- `scripts/privacy-audit.mjs` scans the built output in CI
- Per-config Vitest regex guards (school name patterns)
- JSON-LD negative-space tests
- See ADR 0004

### T2. XSS via inline JSON-LD

**Risk:** a hostile string in a config file ends up inside `<script type="application/ld+json">` and `</script>` injection escapes the script.

**Mitigation:** `src/lib/safe-json.ts#safeStringify` escapes `</`, `<!--`, ` `, ` `. 9 unit tests lock the contract.

### T3. CSRF on contact form

**Risk:** a malicious site posts to `/api/contact` from a logged-in browser.

**Mitigation:**
- Origin allowlist (rejects unknown origins with 403)
- JSON Content-Type required (form-encoded → 415)
- Honeypot field (silent 200 on bot fill)
- 13 route-handler tests cover each layer

### T4. Spam / abuse on contact form

**Risk:** scripted spam fills the inbox.

**Mitigation:**
- Honeypot
- Zod max-length cap (5000 chars)
- Future: Upstash sliding window 3/hour, 20/day
- Future: Cloudflare Turnstile token verification

### T5. CSP-report flooding

**Risk:** a misbehaving browser or attacker floods `/api/csp-report` with millions of reports.

**Mitigation:** in-memory token bucket, 60 reports/IP/minute → 429. 8 route-handler tests cover both report formats + the rate-limit threshold.

### T6. Metadata leak via uploaded media

**Risk:** Ali drops a phone screenshot with GPS EXIF into `public/projects/<slug>/`.

**Mitigation:** `scripts/scrub-metadata.mjs` runs before commit. Future PDF: `pdftotext` + `exiftool` audit gate.

## Threats NOT addressed

- **DoS at L4/L7** — Vercel + Cloudflare front the site; absorbing volumetric DoS is their problem.
- **Compromise of Vercel deploy hooks** — accept the supply-chain risk; same posture as any Vercel-hosted site.
- **Endpoint compromise of Ali's machine** — outside the site's blast radius.
