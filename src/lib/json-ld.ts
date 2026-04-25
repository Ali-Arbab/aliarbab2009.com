import { siteConfig } from "@/config/site";
import { getProjectBySlug, type Project } from "@/config/projects";

/**
 * JSON-LD structured-data builders for aliarbab2009.com.
 *
 * Privacy mandate (per CLAUDE.md):
 *   - NO `address`, `telephone`, `birthDate`, `birthPlace`, `nationality`,
 *     `gender`, `alumniOf`, or `worksFor` on the Person object — every one
 *     of those would leak identifying information beyond what the site
 *     already publishes.
 *   - `email` is always the alias `ali@aliarbab2009.com`, never the raw
 *     Gmail address that ImprovMX forwards to.
 *   - `sameAs` only includes the GitHub profile.
 *
 * Per P4.02.
 */

const PERSON_ID = `${siteConfig.url}#person`;
const RESUME_PAGE_ID = `${siteConfig.url}/resume#page`;
const RESUME_PDF_ID = `${siteConfig.url}/resume#pdf`;
const MAGLOCK_PRODUCT_ID = `${siteConfig.url}/projects/maglock#product`;
const MAGLOCK_WORK_ID = `${siteConfig.url}/projects/maglock#work`;

const PERSON_DESCRIPTION =
  "Class XII student building AI investment tools, voice-first ledgers in Hindi, and IoT systems on ESP32. Three projects shipped or in flight.";

const KNOWS_ABOUT = [
  "Artificial Intelligence",
  "Large Language Models",
  "Voice Interfaces",
  "Hindi Natural Language Processing",
  "Internet of Things",
  "Embedded Systems",
  "ESP32",
  "Web Development",
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "Flutter",
  "Behavioral Finance",
] as const;

type Json = Record<string, unknown>;

function basePerson(): Json {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.author,
    url: siteConfig.url,
    image: `${siteConfig.url}/og/portrait.png`,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.github],
    description: PERSON_DESCRIPTION,
    knowsAbout: [...KNOWS_ABOUT],
    hasOccupation: { "@type": "Occupation", name: "Student" },
  };
}

export function personJsonLd(): Json {
  return { "@context": "https://schema.org", ...basePerson() };
}

export function aboutPageJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteConfig.url}/about`,
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: {
      ...basePerson(),
      description:
        "Class XII student. The /about page is the long-version narrative: three projects, academic snapshot with live AP exam countdowns, and a why-I-built-this essay per project.",
    },
  };
}

export function contactPageJsonLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${siteConfig.url}/contact`,
    name: `Contact — ${siteConfig.author}`,
    description: `Reach ${siteConfig.author} by email or GitHub. Replies within 48 hours.`,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      email: `mailto:${siteConfig.email}`,
      sameAs: [siteConfig.github],
    },
  };
}

export function resumeJsonLd(): Json {
  const today = new Date().toISOString().slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": RESUME_PAGE_ID,
        url: `${siteConfig.url}/resume`,
        name: `Resume — ${siteConfig.author}`,
        description: "Single-page resume PDF — projects, coursework, skills.",
        mainEntity: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
          email: `mailto:${siteConfig.email}`,
          sameAs: [siteConfig.github],
        },
        subjectOf: { "@id": RESUME_PDF_ID },
      },
      {
        "@type": "DigitalDocument",
        "@id": RESUME_PDF_ID,
        name: `${siteConfig.author} — Resume`,
        url: `${siteConfig.url}/resume/ali-arbab-resume.pdf`,
        encodingFormat: "application/pdf",
        inLanguage: "en",
        datePublished: today,
        author: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
      },
    ],
  };
}

type ProjectSlug = "stocksaathi" | "bolhisaab" | "maglock";

function projectCanonical(slug: ProjectSlug): string {
  return `${siteConfig.url}/projects/${slug}`;
}

function projectScreenshot(slug: ProjectSlug): string {
  return `${siteConfig.url}/projects/${slug}/screenshot.png`;
}

function creatorRef(): Json {
  return { "@type": "Person", name: siteConfig.author, url: siteConfig.url };
}

function stocksaathiJsonLd(p: Project): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: p.name,
    url: p.liveUrl ?? p.repoUrl,
    description: p.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript and a modern browser",
    isAccessibleForFree: true,
    softwareVersion: "1.0",
    datePublished: `${p.year}-09-01`,
    screenshot: projectScreenshot("stocksaathi"),
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    creator: creatorRef(),
    codeRepository: p.repoUrl,
    programmingLanguage: ["JavaScript", "Python"],
    mainEntityOfPage: projectCanonical("stocksaathi"),
  };
}

function bolhisaabJsonLd(p: Project): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: p.name,
    url: p.liveUrl ?? "https://bolhisaab.in",
    description: p.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript, microphone permission, and a modern browser",
    isAccessibleForFree: true,
    softwareVersion: "0.9-pre",
    releaseNotes: "Pre-launch — public release scheduled at bolhisaab.in.",
    creator: creatorRef(),
    codeRepository: p.repoUrl,
    programmingLanguage: ["TypeScript"],
    inLanguage: ["hi", "en"],
    mainEntityOfPage: projectCanonical("bolhisaab"),
  };
}

function maglockJsonLd(p: Project): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": MAGLOCK_PRODUCT_ID,
        name: p.name,
        description: p.description,
        category: "IoT smart lock",
        url: projectCanonical("maglock"),
        image: `${siteConfig.url}/projects/maglock/hero.png`,
        brand: { "@type": "Brand", name: "MagLock Protocol" },
        manufacturer: creatorRef(),
        additionalProperty: [
          { "@type": "PropertyValue", name: "Microcontroller", value: "ESP32 (dual)" },
          { "@type": "PropertyValue", name: "Camera module", value: "ESP32-CAM (MJPEG stream)" },
          { "@type": "PropertyValue", name: "Relay channels", value: "2" },
          { "@type": "PropertyValue", name: "Network", value: "Local-network only (no cloud)" },
          { "@type": "PropertyValue", name: "Client app", value: "Flutter (Android + iOS)" },
          { "@type": "PropertyValue", name: "Voice assistant", value: "Optional Hinglish (Grok API)" },
        ],
        isRelatedTo: { "@id": MAGLOCK_WORK_ID },
      },
      {
        "@type": "CreativeWork",
        "@id": MAGLOCK_WORK_ID,
        name: "MagLock Protocol — design + firmware + app",
        description: "Source code, firmware, and Flutter client for the MagLock Protocol smart lock.",
        creator: creatorRef(),
        codeRepository: p.repoUrl,
        programmingLanguage: ["Dart", "C++"],
        keywords: "ESP32, Flutter, IoT, smart lock, ESP32-CAM, MJPEG, voice assistant",
        mainEntityOfPage: projectCanonical("maglock"),
      },
    ],
  };
}

export function projectJsonLd(slug: ProjectSlug): Json {
  const project = getProjectBySlug(slug);
  if (!project) throw new Error(`Unknown project slug for JSON-LD: ${slug}`);
  switch (slug) {
    case "stocksaathi":
      return stocksaathiJsonLd(project);
    case "bolhisaab":
      return bolhisaabJsonLd(project);
    case "maglock":
      return maglockJsonLd(project);
  }
}
