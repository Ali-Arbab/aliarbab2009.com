export const siteConfig = {
  name: "Ali Arbab",
  shortDescription: "Class XII · builds AI + hardware + voice interfaces",
  longDescription:
    "Personal portfolio of Ali Arbab. Three projects: an AI investment coach, a voice-first Hindi ledger for shopkeepers, and a neon-glowing IoT lock built on two ESP32s.",
  url: "https://aliarbab2009.com",
  ogImage: "https://aliarbab2009.com/og/default.png",
  author: "Ali Arbab",
  email: "ali@aliarbab2009.com",
  github: "https://github.com/Ali-Arbab",
  githubHandle: "Ali-Arbab",
  /**
   * ISO date Ali last did an intentional content review of the deployed
   * site end-to-end. Bump this when shipping a content change you want
   * Google to notice. Sitemap reads it for `lastModified` on the static
   * routes; honest dates beat `new Date()` (which would tell crawlers
   * "everything was edited just now" on every crawl).
   */
  lastReviewedISO: "2026-04-25",
  /**
   * Bumped specifically when public/resume/*.pdf is replaced. Sitemap
   * reports this for /resume so search engines recrawl when the PDF
   * rolls without invalidating every other route's lastModified.
   */
  resumeLastUpdated: "2026-04-25",
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
