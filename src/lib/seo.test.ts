import { describe, expect, it } from "vitest";

import { buildMetadata } from "./seo";

/**
 * buildMetadata is the central composer for all per-route SEO. Bugs
 * here surface as broken canonical URLs, wrong OG titles, or
 * incorrect robots directives. Each route's `metadata` export funnels
 * through this function, so coverage here protects every page at once.
 */

describe("buildMetadata", () => {
  it("composes title with — Ali Arbab suffix when not home", () => {
    const m = buildMetadata({
      title: "About",
      description: "x".repeat(150),
      path: "/about",
    });
    expect(m.title).toBe("About — Ali Arbab");
  });

  it("uses bare title when isHome=true", () => {
    const m = buildMetadata({
      title: "Ali Arbab — Builds AI, voice, and IoT systems",
      description: "x".repeat(150),
      path: "/",
      isHome: true,
    });
    expect(m.title).toBe("Ali Arbab — Builds AI, voice, and IoT systems");
  });

  it("sets canonical to the path verbatim (preserves trailing slash for /)", () => {
    expect(buildMetadata({ title: "x", description: "y", path: "/" }).alternates?.canonical).toBe(
      "/",
    );
    expect(
      buildMetadata({ title: "x", description: "y", path: "/about" }).alternates?.canonical,
    ).toBe("/about");
  });

  it("throws when path lacks a leading slash", () => {
    expect(() => buildMetadata({ title: "x", description: "y", path: "about" })).toThrow(
      /path must start with/,
    );
  });

  it("builds an absolute openGraph URL from metadataBase + path", () => {
    const m = buildMetadata({
      title: "Resume",
      description: "y",
      path: "/resume",
    });
    expect(m.openGraph?.url).toBe("https://aliarbab2009.com/resume");
  });

  it("uses default OG image when ogImage omitted", () => {
    const m = buildMetadata({ title: "x", description: "y", path: "/about" });
    const images = m.openGraph?.images;
    expect(Array.isArray(images)).toBe(true);
    expect((images as Array<{ url: string }>)[0]?.url).toBe("/og/default.png");
  });

  it("respects per-route OG image override", () => {
    const m = buildMetadata({
      title: "x",
      description: "y",
      path: "/about",
      ogImage: "/og/about.png",
    });
    const images = m.openGraph?.images as Array<{ url: string }>;
    expect(images[0]?.url).toBe("/og/about.png");
  });

  it("falls back ogImageAlt to title when omitted", () => {
    const m = buildMetadata({
      title: "Resume",
      description: "y",
      path: "/resume",
    });
    const images = m.openGraph?.images as Array<{ alt: string }>;
    expect(images[0]?.alt).toBe("Resume");
  });

  it("emits index/follow robots by default", () => {
    const m = buildMetadata({ title: "x", description: "y", path: "/about" });
    expect(m.robots).toMatchObject({ index: true, follow: true });
  });

  it("emits noindex/nofollow when noIndex=true", () => {
    const m = buildMetadata({
      title: "x",
      description: "y",
      path: "/dev/components",
      noIndex: true,
    });
    expect(m.robots).toMatchObject({ index: false, follow: false });
  });

  it("uses summary_large_image twitter card", () => {
    const m = buildMetadata({ title: "x", description: "y", path: "/about" });
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("includes article publishedTime + author when ogType=article", () => {
    const m = buildMetadata({
      title: "x",
      description: "y",
      path: "/projects/stocksaathi",
      ogType: "article",
      publishedTime: "2025-08-01T00:00:00Z",
    });
    expect(m.openGraph).toMatchObject({
      type: "article",
      publishedTime: "2025-08-01T00:00:00Z",
    });
  });

  it("omits keywords field when keywords array is empty", () => {
    const m = buildMetadata({
      title: "x",
      description: "y",
      path: "/about",
      keywords: [],
    });
    expect(m.keywords).toBeUndefined();
  });

  it("includes keywords when provided", () => {
    const m = buildMetadata({
      title: "x",
      description: "y",
      path: "/about",
      keywords: ["AP", "Class XII", "AI"],
    });
    expect(m.keywords).toEqual(["AP", "Class XII", "AI"]);
  });
});
