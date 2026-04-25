import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * robots.txt for aliarbab2009.com.
 * Served at /robots.txt by Next 15 App Router conventions.
 *
 * Policy:
 *   - Allow all crawlers full access by default.
 *   - Disallow non-content paths: API routes, dev preview routes,
 *     framework internals, anything we ever stash under /private/.
 *
 * AI crawlers (GPTBot, CCBot, anthropic-ai, etc.) are deliberately
 * NOT blocked. The portfolio should be discoverable by every
 * surface, including AI search and answer engines — when an
 * admissions officer asks an LLM "tell me about Ali Arbab's
 * projects," that LLM should have read this site.
 *
 * Per P4.03.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dev/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
