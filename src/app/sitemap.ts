import type { MetadataRoute } from "next";

import { PROJECTS } from "@/config/projects";
import { siteConfig } from "@/config/site";

/**
 * Auto-generated sitemap for aliarbab2009.com.
 * Served at /sitemap.xml by Next 15 App Router conventions.
 *
 * Priorities (deliberate, not the default Google fudge):
 *   1.0  /              the funnel entry point
 *   0.9  /projects      primary content hub
 *   0.9  /about         long-form admissions-ready story
 *   0.8  /projects/<slug>           detail pages
 *   0.7  /resume        secondary, but updated more often than /contact
 *   0.7  /contact       low edit frequency, still indexable
 *
 * lastModified is sourced from siteConfig.lastReviewedISO (static
 * pages) or project.lastUpdatedISO (project detail pages, falling
 * back to lastReviewedISO when absent). ISO strings ship with the
 * bundle so we never tell Google "everything was edited just now"
 * on every crawl — that's noise.
 *
 * No # anchors: Google discourages them and they bloat the sitemap.
 *
 * Phase 1+ /projects/<slug>/diagrams routes don't exist yet — kept
 * commented below for one-line activation when they ship.
 *
 * Per P4.03.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastReviewed = siteConfig.lastReviewedISO;

  return [
    {
      url: `${base}/`,
      lastModified: lastReviewed,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${base}/projects`,
      lastModified: lastReviewed,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...PROJECTS.flatMap((p) => {
      const projectModified = p.lastUpdatedISO ?? lastReviewed;
      return [
        {
          url: `${base}/projects/${p.slug}`,
          lastModified: projectModified,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
        // Diagrams sub-route ships in Phase 1+. Uncomment when the
        // /projects/<slug>/diagrams routes exist:
        // {
        //   url: `${base}/projects/${p.slug}/diagrams`,
        //   lastModified: projectModified,
        //   changeFrequency: "monthly" as const,
        //   priority: 0.7,
        // },
      ];
    }),
    {
      url: `${base}/about`,
      lastModified: lastReviewed,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/resume`,
      lastModified: siteConfig.resumeLastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: lastReviewed,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    // Phase 5 stretch — uncomment as each ships:
    // { url: `${base}/uses`,     lastModified: lastReviewed, changeFrequency: "monthly", priority: 0.5 },
    // { url: `${base}/now`,      lastModified: lastReviewed, changeFrequency: "weekly",  priority: 0.5 },
    // { url: `${base}/colophon`, lastModified: lastReviewed, changeFrequency: "yearly",  priority: 0.5 },
    // { url: `${base}/blog`,     lastModified: lastReviewed, changeFrequency: "weekly",  priority: 0.5 },
  ];
}
