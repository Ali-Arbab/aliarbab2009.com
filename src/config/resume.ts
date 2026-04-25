/**
 * Resume content — surfaced at /resume (full page) and embedded
 * inline on /about when desired.
 *
 * Composition: this file holds the bits NOT already living in other
 * configs. The full resume is assembled by <ResumeEmbed> from:
 *   - siteConfig                  (name, contact, github)
 *   - src/config/milestones.ts    (AP exams)
 *   - src/config/projects.ts      (three projects + stacks)
 *   - src/config/activities.ts    (activities & leadership)
 *   - src/config/awards.ts        (awards & recognition — if any)
 *   - src/config/resume.ts        (THIS file: summary, education,
 *                                  skill groups — the prose-y bits)
 *
 * Privacy hard-rule: same as the rest of the site. NO school name,
 * NO city, NO phone, NO raw Gmail, NO timezone. The resume is the
 * file an admissions officer or recruiter sees first — it must hold
 * the line on doxxing exactly as strictly as the website does.
 */

export type SkillGroup = {
  /** Heading shown in resume — keep ≤ 30 chars. */
  label: string;
  /** Pill-rendered items. Order matters — strongest signal first. */
  items: readonly string[];
};

export type ResumeContent = {
  /** 2-sentence elevator pitch shown above the resume body. */
  summary: string;
  /**
   * Free-form coursework / accolades that supplement the APs already
   * surfaced from milestones.ts. Keep generic — no "Modern School
   * advanced math seminar" (identifies institution).
   */
  coursework: readonly string[];
  /** Skill groups, rendered as pill-rows. */
  skillGroups: readonly SkillGroup[];
  /**
   * Whether public/resume/ali-arbab-resume.pdf exists.
   * Flip to `true` once the scrubbed PDF lands. The download
   * button + sitemap entry both gate on this flag.
   */
  hasPDF: boolean;
  /** Filename inside public/resume/ when hasPDF is true. */
  pdfFilename: string;
};

export const RESUME: ResumeContent = {
  summary:
    "Class XII student building production software at the intersection of AI, voice interfaces, and embedded systems. Three shipped projects across financial education, Hindi natural-language tooling, and IoT.",
  coursework: [
    "Calculus BC · Physics C Mechanics · English Language · Computer Science A — AP track May 2026",
    "Self-directed: applied behavioral finance, low-power firmware design, large-language-model prompt engineering",
  ],
  skillGroups: [
    {
      label: "Languages",
      items: ["TypeScript", "Python", "Dart", "C++ (Arduino)", "JavaScript", "SQL", "HTML/CSS"],
    },
    {
      label: "Frameworks & runtimes",
      items: [
        "Next.js 15",
        "React 19",
        "Tailwind v4",
        "Flutter",
        "Node.js",
        "Vercel Edge Runtime",
        "FastAPI",
      ],
    },
    {
      label: "AI & data",
      items: [
        "Groq inference (Llama 3.x, Whisper v3)",
        "Prompt engineering",
        "Behavioral-finance modelling",
        "Vector embeddings",
        "Supabase",
      ],
    },
    {
      label: "Hardware",
      items: [
        "ESP32 firmware",
        "ESP32-CAM MJPEG streaming",
        "Dual-relay control + cooldown timers",
        "Local-network device pairing",
      ],
    },
    {
      label: "Infra & tooling",
      items: [
        "Vercel (deploy + analytics)",
        "GitHub Actions CI",
        "Sentry",
        "Playwright e2e",
        "Vitest",
        "Husky + lint-staged",
      ],
    },
  ],
  hasPDF: false,
  pdfFilename: "ali-arbab-resume.pdf",
} as const;
