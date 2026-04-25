import { describe, expect, it } from "vitest";

import { PROJECTS, getProjectBySlug } from "./projects";

/**
 * PROJECTS is the catalog the home featured grid, the projects index,
 * and per-project route metadata all read from. Bugs here surface as
 * 404s, broken OG images, or wrong colors on per-project pages.
 */

describe("PROJECTS catalog", () => {
  it("contains exactly the three project worlds", () => {
    expect(PROJECTS).toHaveLength(3);
    expect(PROJECTS.map((p) => p.slug)).toEqual(["stocksaathi", "bolhisaab", "maglock"]);
  });

  it("every slug matches a .theme-<slug> CSS class convention", () => {
    // Slugs must be lowercase + hyphen-safe so .theme-<slug> works as a CSS class
    for (const p of PROJECTS) {
      expect(p.slug).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("every project has a non-empty stack", () => {
    for (const p of PROJECTS) {
      expect(p.stack.length).toBeGreaterThan(0);
    }
  });

  it("primaryColor is a 7-char hex string", () => {
    for (const p of PROJECTS) {
      expect(p.primaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("year is a plausible build year (2024-2027)", () => {
    for (const p of PROJECTS) {
      expect(p.year).toBeGreaterThanOrEqual(2024);
      expect(p.year).toBeLessThanOrEqual(2027);
    }
  });

  it("every project has a github repo url under the aliarbab2009 namespace", () => {
    for (const p of PROJECTS) {
      expect(p.repoUrl).toMatch(/^https:\/\/github\.com\/aliarbab2009\//);
    }
  });
});

describe("getProjectBySlug", () => {
  it("returns the matching project for known slugs", () => {
    expect(getProjectBySlug("stocksaathi")?.name).toBe("StockSaathi");
    expect(getProjectBySlug("bolhisaab")?.name).toBe("BolHisaab");
    expect(getProjectBySlug("maglock")?.name).toBe("MagLock Protocol");
  });

  it("returns undefined for unknown slugs", () => {
    expect(getProjectBySlug("nope")).toBeUndefined();
    expect(getProjectBySlug("")).toBeUndefined();
  });

  it("is case-sensitive (catches a common typo class)", () => {
    expect(getProjectBySlug("StockSaathi")).toBeUndefined();
    expect(getProjectBySlug("STOCKSAATHI")).toBeUndefined();
  });
});
