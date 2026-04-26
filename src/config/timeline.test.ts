import { describe, expect, it } from "vitest";

import { TIMELINE } from "./timeline";

/**
 * Data integrity for TIMELINE — surfaced in /about § Journey.
 *
 * Ordering matters because JourneySection sorts descending by date but
 * the source list happens to be authored that way too. If a future edit
 * accidentally inserts a date out of place, downstream rendering still
 * works (we sort at render) but the source becomes confusing for editors.
 */

describe("TIMELINE", () => {
  // Currently empty — Ali to populate. The structural checks below all
  // hold trivially against an empty array (every-element predicates are
  // vacuously true) and start enforcing once the first real entry lands.
  it("is an array (may be empty pre-population)", () => {
    expect(Array.isArray(TIMELINE)).toBe(true);
  });

  it("every entry has a YYYY-MM or YYYY-MM-DD date", () => {
    for (const e of TIMELINE) {
      expect(e.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
    }
  });

  it("every title is under 60 chars per the type docstring", () => {
    for (const e of TIMELINE) {
      expect(e.title.length).toBeLessThanOrEqual(60);
    }
  });

  it("every note has substance (>= 40 chars)", () => {
    for (const e of TIMELINE) {
      expect(e.note.length).toBeGreaterThanOrEqual(40);
    }
  });

  it("every kind (when set) is one of the four documented values", () => {
    const valid = new Set(["build", "milestone", "learn", "shelve"]);
    for (const e of TIMELINE) {
      if (e.kind !== undefined) {
        expect(valid.has(e.kind)).toBe(true);
      }
    }
  });

  it("dates fall within plausible portfolio window (2024-2027)", () => {
    for (const e of TIMELINE) {
      const year = parseInt(e.date.slice(0, 4), 10);
      expect(year).toBeGreaterThanOrEqual(2024);
      expect(year).toBeLessThanOrEqual(2027);
    }
  });

  it("no entry contains plausible school-name patterns (privacy gate)", () => {
    const suspicious = /(?:[A-Z][a-z]+ )+(?:School|Academy|Institute|College)\b/;
    for (const e of TIMELINE) {
      expect(e.title).not.toMatch(suspicious);
      expect(e.note).not.toMatch(suspicious);
    }
  });
});
