/**
 * Journey timeline — surfaced in /about § Journey.
 *
 * Each entry is a meaningful inflection point: when something started,
 * a milestone reached, a project shipped, a project shelved. Class-XII
 * student arc, calibrated honest scale (no résumé inflation).
 *
 * Edit-flow: open this file, edit the entries, push. /about renders
 * on next deploy. Per CLAUDE.md commit-cadence rule: bump entries in
 * meaningful chunks, not one-line adds per commit.
 *
 * SEED VALUES below are placeholders — Ali should rewrite each `note`
 * to reflect his actual journey. Dates can stay approximate (year +
 * month is fine; the renderer formats as "Mon YYYY").
 *
 * Privacy: no school name, no city, no specific clubs that identify
 * the institution. "Built first Arduino project" → fine.
 * "Built Arduino project for [school name] club" → BLOCKED.
 */

export type TimelineEntry = {
  /** ISO date (YYYY-MM or YYYY-MM-DD). Sorted descending — newest first. */
  date: string;
  /** Short noun-phrase title (under 60 chars). */
  title: string;
  /** 1-2 sentence note. ~40-100 words. Concrete > abstract. */
  note: string;
  /** Optional category for visual grouping. */
  kind?: "build" | "milestone" | "learn" | "shelve";
};

export const TIMELINE: readonly TimelineEntry[] = [
  {
    date: "2026-04",
    title: "aliarbab2009.com goes live",
    kind: "build",
    note: "Personal portfolio shipped to Vercel. Brutalist Swiss-grid aesthetic, three project worlds (StockSaathi/BolHisaab/MagLock) accessible via per-route theme classes.",
  },
  {
    date: "2025-11",
    title: "MagLock Protocol — first dual-relay unlock",
    kind: "milestone",
    note: "Dual-relay ESP32 firmware passes its first end-to-end test. Phone presses unlock → ESP32 receives REST call → relay clicks → physical lock disengages. About a month of debugging cooldown timers and WiFi reconnection later.",
  },
  {
    date: "2025-10",
    title: "BolHisaab — Hindi voice intent parser hits 95%",
    kind: "milestone",
    note: "Llama 3.1 8B + careful prompt engineering crosses the 95% intent-accuracy threshold on the most common transaction patterns shopkeepers actually say. Sub-2-second end-to-end latency required Whisper v3-turbo over v3-large.",
  },
  {
    date: "2025-08",
    title: "StockSaathi 1.0 ships at stocksaathi.co.in",
    kind: "build",
    note: "AI-coached investment simulator goes live. 3,000+ BSE/NSE stocks, virtual ₹1,00,000 capital, Time Travel mode replays historical crashes. Llama 3.3 70B coach refuses to give buy/sell advice — teaches frameworks instead.",
  },
  {
    date: "2025-04",
    title: "TutorBot shelved",
    kind: "shelve",
    note: "A Telegram bot meant to tutor physics homework via GPT-4. Worked in spec but hallucinated wrong signs on free-body diagrams in practice. Closed the repo. Lesson: don't ship something you wouldn't let your younger self use unsupervised.",
  },
  {
    date: "2024-12",
    title: "First annual report I read end-to-end",
    kind: "learn",
    note: "An Indian listed company's full annual report. The management-discussion section more than the numbers. The seed of what eventually became StockSaathi.",
  },
  {
    date: "2024-08",
    title: "First Arduino project that didn't short itself",
    kind: "milestone",
    note: "An LED matrix that displayed the time pulled from an RTC module. Held together with breadboard wires and a lot of patience. The first 'this is real' moment — physical hardware doing what code told it to.",
  },
  {
    date: "2024-04",
    title: "Class XI started — coursework reset",
    kind: "milestone",
    note: "Switched into the AP track for the year ahead: Calculus BC, Physics C Mechanics, English Lang & Composition, Computer Science A. Plotted the May 2026 exam window on the calendar.",
  },
];
