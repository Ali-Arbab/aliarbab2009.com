import { describe, expect, it } from "vitest";

import { formatAbsoluteDate, formatTimeRemaining, timeUntil } from "./time";

/**
 * Tests for src/lib/time.ts.
 *
 * Why these matter: this module is the entire countdown stack.
 * `<LiveCountdown>` is a one-line wrapper around `timeUntil()` +
 * `formatTimeRemaining()`. The whole "zero external input" privacy
 * guarantee depends on these functions staying pure — no fetches,
 * no side effects, no Date.now() side-channel that leaks server
 * time. A regression here is a privacy regression.
 *
 * Each test passes an explicit `now: Date` to keep results stable
 * regardless of when the test runs.
 */

describe("timeUntil", () => {
  it("computes a future delta correctly", () => {
    const now = new Date("2026-04-25T08:00:00Z");
    const target = "2026-04-26T08:00:00Z"; // exactly 1 day away
    const r = timeUntil(target, now);

    expect(r.ms).toBe(86_400_000);
    expect(r.days).toBe(1);
    expect(r.hours).toBe(0);
    expect(r.minutes).toBe(0);
    expect(r.seconds).toBe(0);
    expect(r.past).toBe(false);
  });

  it("decomposes a complex delta into d/h/m/s", () => {
    const now = new Date("2026-04-25T08:00:00Z");
    // 21d 4h 12m 7s away
    const targetMs = now.getTime() + (21 * 86400 + 4 * 3600 + 12 * 60 + 7) * 1000;
    const target = new Date(targetMs).toISOString();

    const r = timeUntil(target, now);
    expect(r.days).toBe(21);
    expect(r.hours).toBe(4);
    expect(r.minutes).toBe(12);
    expect(r.seconds).toBe(7);
    expect(r.past).toBe(false);
  });

  it("flips `past` true when target is behind now", () => {
    const now = new Date("2026-05-12T08:00:00Z");
    const target = "2026-05-11T08:00:00Z"; // AP Calc BC, day before
    const r = timeUntil(target, now);

    expect(r.past).toBe(true);
    expect(r.ms).toBeLessThan(0);
  });

  it("absolute-values d/h/m/s when in the past", () => {
    // 1 day in the past — components show "✓" but the magnitudes
    // still need to be sane in case anything reads them directly.
    const now = new Date("2026-04-26T08:00:00Z");
    const target = "2026-04-25T08:00:00Z";
    const r = timeUntil(target, now);

    expect(r.past).toBe(true);
    expect(r.days).toBe(1);
    expect(r.hours).toBe(0);
  });

  it("treats target == now as past=false (not past=true)", () => {
    const now = new Date("2026-05-11T08:00:00Z");
    const target = "2026-05-11T08:00:00Z";
    const r = timeUntil(target, now);

    expect(r.ms).toBe(0);
    // 0 is not < 0, so past is false. The countdown reads "0d 0h 0m 0s"
    // for that one tick before flipping to past on the very next call.
    expect(r.past).toBe(false);
  });

  it("is pure — same input → same output, no side effects", () => {
    const now = new Date("2026-05-11T08:00:00Z");
    const target = "2026-05-12T08:00:00Z";

    const a = timeUntil(target, now);
    const b = timeUntil(target, now);

    expect(a).toEqual(b);
  });

  it("uses the default now when not provided (smoke check only)", () => {
    // We can't assert exact values without freezing time; we just verify
    // the function runs without throwing and returns a real number.
    const r = timeUntil("2099-01-01T00:00:00Z");
    expect(typeof r.ms).toBe("number");
    expect(r.past).toBe(false);
  });

  it("handles offset-naive ISO strings as local time per architecture rule", () => {
    // milestones.ts uses offset-naive strings like "2026-05-11T08:00:00"
    // The browser's Date constructor interprets these as local time —
    // exactly the "8 a.m. wherever you are" semantics we want for AP
    // exam day. The math here is correct as long as both sides of the
    // subtraction use the same interpretation.
    const now = new Date("2026-05-11T07:00:00"); // local time, 1h before
    const target = "2026-05-11T08:00:00"; // also local
    const r = timeUntil(target, now);

    expect(r.past).toBe(false);
    expect(r.hours).toBe(1);
  });
});

describe("formatTimeRemaining", () => {
  it("renders ✓ when past", () => {
    expect(formatTimeRemaining({ ms: -1000, days: 0, hours: 0, minutes: 0, seconds: 1, past: true })).toBe("✓");
  });

  it("includes days when days > 0", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 21, hours: 4, minutes: 12, seconds: 7, past: false },
      { seconds: true },
    );
    expect(out).toBe("21d 4h 12m 07s");
  });

  it("hides days when days = 0 but shows hours", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 0, hours: 2, minutes: 15, seconds: 3, past: false },
      { seconds: true },
    );
    expect(out).toBe("2h 15m 03s");
  });

  it("hides hours when hours = 0 and days = 0", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 0, hours: 0, minutes: 5, seconds: 30, past: false },
      { seconds: true },
    );
    expect(out).toBe("5m 30s");
  });

  it("respects seconds: false (NowBar precision)", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 21, hours: 4, minutes: 12, seconds: 7, past: false },
      { seconds: false },
    );
    expect(out).toBe("21d 4h 12m");
  });

  it("zero-pads seconds for visual stability", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 0, hours: 0, minutes: 1, seconds: 5, past: false },
      { seconds: true },
    );
    // "05s" not "5s" — keeps countdown digit-width stable as it ticks
    expect(out).toContain("05s");
  });

  it("compact mode pads minutes too", () => {
    const out = formatTimeRemaining(
      { ms: 1, days: 0, hours: 1, minutes: 5, seconds: 30, past: false },
      { seconds: true, compact: true },
    );
    expect(out).toContain("05m");
  });
});

describe("formatAbsoluteDate", () => {
  it("returns a stable, weekday-month-day-year string", () => {
    // Locale: en-US is hard-coded so this is portable.
    const out = formatAbsoluteDate("2026-05-11T08:00:00Z");
    // Either "Mon, May 11, 2026" depending on the runner's tz.
    // Just assert the year + month + day appear.
    expect(out).toMatch(/2026/);
    expect(out).toMatch(/May/);
    expect(out).toMatch(/1[01]/); // 10 or 11 depending on tz
  });

  it("does not throw on offset-naive ISO strings", () => {
    expect(() => formatAbsoluteDate("2026-05-11T08:00:00")).not.toThrow();
  });
});
