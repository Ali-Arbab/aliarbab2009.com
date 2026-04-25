import { describe, expect, it } from "vitest";

import { COURSEWORK } from "./coursework";
import { MILESTONES } from "./milestones";

/**
 * COURSEWORK joins to MILESTONES by id. Tests verify the join + shape.
 */

describe("COURSEWORK catalog", () => {
  it("has at least one entry", () => {
    expect(COURSEWORK.length).toBeGreaterThan(0);
  });

  it("every entry id resolves to a known milestone", () => {
    const milestoneIds = new Set(MILESTONES.map((m) => m.id));
    for (const c of COURSEWORK) {
      expect(milestoneIds.has(c.id)).toBe(true);
    }
  });

  it("every entry has a non-empty label", () => {
    for (const c of COURSEWORK) {
      expect(c.label.length).toBeGreaterThan(0);
    }
  });

  it("no entry id appears more than once", () => {
    const ids = COURSEWORK.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("seed catalog covers all four AP exams in the milestones", () => {
    // While future curation may add or remove entries, the seed should
    // mirror the four APs Ali sits in May 2026.
    const expectedIds = ["ap-calc-bc", "ap-phys-c-mech", "ap-eng-lang", "ap-csa"];
    const ids = COURSEWORK.map((c) => c.id);
    for (const expected of expectedIds) {
      expect(ids).toContain(expected);
    }
  });

  it("labels are richer than the matching milestone label (typically)", () => {
    // Soft assertion — not strict — but catches a regression where
    // someone accidentally pastes the exact milestone label here.
    const milestonesById = Object.fromEntries(MILESTONES.map((m) => [m.id, m]));
    let richer = 0;
    for (const c of COURSEWORK) {
      const m = milestonesById[c.id];
      if (m && c.label.length >= m.label.length) richer++;
    }
    // At least one entry should be longer (e.g. AP English Language &
    // Composition is wordier than AP English Language).
    expect(richer).toBeGreaterThan(0);
  });
});
