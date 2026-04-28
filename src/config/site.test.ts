import { describe, expect, it } from "vitest";

import { siteConfig } from "./site";

/**
 * siteConfig is read by virtually every page (metadata, JSON-LD,
 * sitemap, OG images, contact links, etc.). Any drift here cascades.
 *
 * Tests focus on invariants that must always hold — not curation
 * choices like the exact wording of shortDescription.
 */

describe("siteConfig", () => {
  it("name is the canonical author 'Ali Arbab'", () => {
    expect(siteConfig.name).toBe("Ali Arbab");
    expect(siteConfig.author).toBe("Ali Arbab");
  });

  it("url is the production HTTPS URL with no trailing slash", () => {
    expect(siteConfig.url).toBe("https://aliarbab2009.com");
    expect(siteConfig.url).not.toMatch(/\/$/);
  });

  it("ogImage is an absolute URL under the production origin", () => {
    expect(siteConfig.ogImage.startsWith(siteConfig.url)).toBe(true);
    expect(siteConfig.ogImage).toMatch(/\.png$/);
  });

  it("email is the alias domain, NOT the raw Gmail forwarded inbox", () => {
    expect(siteConfig.email).toMatch(/@aliarbab2009\.com$/);
    expect(siteConfig.email).not.toMatch(/@gmail\.com$/);
  });

  it("github + githubHandle agree on the same handle", () => {
    expect(siteConfig.github).toBe(`https://github.com/${siteConfig.githubHandle}`);
    expect(siteConfig.githubHandle).toBe("Ali-Arbab");
  });

  it("lastReviewedISO is YYYY-MM-DD shaped", () => {
    expect(siteConfig.lastReviewedISO).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("resumeLastUpdated is YYYY-MM-DD shaped", () => {
    expect(siteConfig.resumeLastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("nav contains the four expected top-level routes", () => {
    const hrefs = siteConfig.nav.map((n) => n.href);
    expect(hrefs).toEqual(["/projects", "/about", "/resume", "/contact"]);
  });

  it("every nav item has both href and label", () => {
    for (const item of siteConfig.nav) {
      expect(item.href).toBeTruthy();
      expect(item.label).toBeTruthy();
    }
  });

  it("descriptions describe what's published, not who Ali is geographically", () => {
    // Catches a class of regression: a future PR that adds "Delhi-based" or
    // similar to the descriptions would fail this guard.
    const banned = /\b(Delhi|Mumbai|Bengaluru|Bangalore|Chennai|Kolkata|Hyderabad)\b/;
    expect(siteConfig.shortDescription).not.toMatch(banned);
    expect(siteConfig.longDescription).not.toMatch(banned);
  });
});
