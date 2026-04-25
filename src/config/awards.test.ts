import { describe, expect, it } from "vitest";

import { AWARDS } from "./awards";

/**
 * Data integrity for AWARDS — surfaced in /about § Awards and the
 * resume embed. The seed catalog is small (just AP Scholar pending);
 * tests focus on the privacy guarantee and shape of any future
 * entries Ali adds.
 */

describe("AWARDS", () => {
  it("is an array (may be empty during seed-only periods)", () => {
    expect(Array.isArray(AWARDS)).toBe(true);
  });

  it("every entry has a unique stable id", () => {
    const ids = AWARDS.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every title is non-empty and under 80 chars", () => {
    for (const a of AWARDS) {
      expect(a.title.length).toBeGreaterThan(0);
      expect(a.title.length).toBeLessThanOrEqual(80);
    }
  });

  it("every org is non-empty", () => {
    for (const a of AWARDS) {
      expect(a.org.length).toBeGreaterThan(0);
    }
  });

  it("every year is a plausible academic year (2020-2030)", () => {
    for (const a of AWARDS) {
      expect(a.year).toBeGreaterThanOrEqual(2020);
      expect(a.year).toBeLessThanOrEqual(2030);
    }
  });

  it("blurb (when set) is non-empty", () => {
    for (const a of AWARDS) {
      if (a.blurb !== undefined) {
        expect(a.blurb.length).toBeGreaterThan(0);
      }
    }
  });

  it("no entry contains plausible school-name patterns (privacy gate)", () => {
    const suspicious = /(?:[A-Z][a-z]+ )+(?:School|Academy|Institute|College)\b/;
    for (const a of AWARDS) {
      expect(a.title).not.toMatch(suspicious);
      expect(a.org).not.toMatch(suspicious);
      if (a.blurb !== undefined) expect(a.blurb).not.toMatch(suspicious);
    }
  });
});
