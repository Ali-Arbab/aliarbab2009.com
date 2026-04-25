/**
 * Awards & recognition — surfaced in /about § Awards.
 *
 * Privacy hard-rule: avoid awards whose name identifies the school
 * (e.g. "Modern School Math Prize" → identifies the institution).
 * Generic / regional / national / international awards are fine.
 *
 * Each award gets a stable id, a year, an issuing org (kept generic
 * when possible), an optional `pending: true` flag for awards
 * awaiting confirmation/score-release, and a 1-line blurb.
 *
 * AP Scholar with Distinction REQUIRES 5+ exams averaging ≥3.5 with
 * 3+ scores ≥3. Ali sits 4 APs in May 2026 — at most "AP Scholar"
 * (the entry-level tier) qualifies. Verify before promoting.
 *
 * SEED VALUES below are placeholders — Ali should curate.
 */

export type APScore = 1 | 2 | 3 | 4 | 5;

export type Award = {
  id: string;
  title: string;
  org: string;
  year: number;
  /** True if award is anticipated but not yet confirmed. */
  pending?: boolean;
  /** Optional 1-line context (~15-25 words). */
  blurb?: string;
};

export const AWARDS: readonly Award[] = [
  {
    id: "ap-scholar",
    title: "AP Scholar",
    org: "College Board",
    year: 2026,
    pending: true,
    blurb:
      "Awaiting July 2026 score release. Confirmed once 3+ AP scores ≥ 3 land. Eligibility flips automatically when src/config/milestones.ts gets the score values.",
  },
  // SEED: add real awards here. Examples of acceptable kinds:
  //   - National-level math/physics/CS olympiad medals or rankings
  //   - Hackathon wins (with the hackathon's actual name)
  //   - Open-source contribution recognition
  //   - Scholarship / fellowship / grant names that don't identify the school
  //
  // AVOID:
  //   - "<School name> Scholar of the Year" — identifies institution
  //   - Class rank phrasing tied to a specific cohort
  //
  // Example shape (commented out — uncomment + edit when ready):
  //
  // {
  //   id: "regional-cs-olympiad-2025",
  //   title: "Regional CS Olympiad — Top 10",
  //   org: "Computer Olympiad Foundation",
  //   year: 2025,
  //   blurb: "Top-10 finish in the regional round of the national CS olympiad.",
  // },
];
