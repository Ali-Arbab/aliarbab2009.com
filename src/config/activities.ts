/**
 * Activities & leadership — surfaced in /about § Activities.
 *
 * Privacy hard-rule: NO school name, NO specific club name that
 * identifies the institution, NO city, NO peer/teacher names. Roles
 * describe the FUNCTION (what was actually done) not the
 * INSTITUTION (where it happened).
 *
 *   ✅ "Editor — student literary magazine, 2024-26"
 *   ❌ "Editor — The Modern School Quill, Delhi"
 *
 * Categories group the table visually. Order within a category is
 * descending by `from` (newest first).
 *
 * SEED VALUES are placeholders — Ali should rewrite to reflect actual
 * activities. Each entry should have substance (a 1-line blurb that
 * reads as something concrete, not a résumé buzzword stack).
 */

export type ActivityCategory = "tech" | "leadership" | "academic" | "community";

export type Activity = {
  /** Stable id (used as React key + for /about deep-links). */
  id: string;
  /** ~40-char role/title. Function, not institution. */
  role: string;
  /** Category bucket. */
  category: ActivityCategory;
  /** "YYYY" or "YYYY-MM" — start. Required. */
  from: string;
  /** "YYYY" or "YYYY-MM" — end. Optional (ongoing). */
  to?: string;
  /** 1-2 sentence concrete blurb (~25-50 words). */
  blurb: string;
};

export const ACTIVITIES: readonly Activity[] = [
  // ── tech ─────────────────────────────────────────────────────────
  {
    id: "stocksaathi-build",
    role: "Founder + sole developer — StockSaathi",
    category: "tech",
    from: "2024",
    blurb:
      "Built and shipped an AI-coached investment simulator for Indian teens. 3,000+ BSE/NSE stocks, virtual rupee capital, Llama 3.3 70B behavioral-finance coach. Live at stocksaathi.co.in.",
  },
  {
    id: "bolhisaab-build",
    role: "Founder + sole developer — BolHisaab",
    category: "tech",
    from: "2025",
    blurb:
      "Voice-first Hindi/Hinglish ledger for shopkeepers. Whisper transcribes; Llama parses intent; Supabase holds an append-only ledger. Pre-launch at bolhisaab.in.",
  },
  {
    id: "maglock-build",
    role: "Builder — MagLock Protocol IoT smart lock",
    category: "tech",
    from: "2025",
    blurb:
      "Dual-door smart lock built end-to-end: ESP32 firmware in C++, ESP32-CAM MJPEG stream, Flutter app, optional Hinglish voice assistant. Local-network only — no cloud.",
  },

  // ── leadership ────────────────────────────────────────────────────
  // SEED: replace with Ali's actual leadership roles. Function-level
  // descriptions only; never name the institution.
  {
    id: "leadership-mentor",
    role: "Peer mentor — younger-grade math + science",
    category: "leadership",
    from: "2024",
    blurb:
      "Weekly tutoring sessions for two younger-grade students preparing for board-track math and physics. Designed worksheets and graded practice papers.",
  },

  // ── academic ─────────────────────────────────────────────────────
  {
    id: "ap-self-study-cohort",
    role: "AP self-study cohort — informal study group",
    category: "academic",
    from: "2025",
    blurb:
      "Organized a small self-study group for the four May 2026 APs (Calculus BC, Physics C Mech, English Lang, CSA). Weekly problem sessions; shared notes via a private Github wiki.",
  },

  // ── community ────────────────────────────────────────────────────
  // SEED: replace with Ali's actual community involvement. Generic
  // role descriptions; no organization names that identify location.
  {
    id: "community-coding",
    role: "Coding-club volunteer — beginner Python workshops",
    category: "community",
    from: "2024",
    blurb:
      "Ran a series of intro-to-Python workshops for beginners. Each session built one small program (calculator, hangman, simple web scraper) end-to-end.",
  },
];

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  tech: "Tech",
  leadership: "Leadership",
  academic: "Academic",
  community: "Community",
};
