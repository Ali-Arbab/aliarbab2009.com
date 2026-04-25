import { MILESTONES } from "@/config/milestones";

/**
 * Coursework display labels — surfaced in /about § 02 Academic Snapshot.
 *
 * The id field matches a milestone id in src/config/milestones.ts so
 * the AP countdown table can join them. Decoupling label from
 * milestone.label lets the academic snapshot display a richer name
 * (e.g. "AP English Language & Composition") while milestones.ts keeps
 * the compact label used on the home NowBar (e.g. "AP English Language").
 *
 * Lifted out of src/app/(marketing)/about/page.tsx so it can be
 * unit-tested + reused on the resume embed in the future.
 */

export type Coursework = {
  /** Stable id matching a Milestone.id. */
  id: string;
  /** Display label — typically wordier than the matching milestone label. */
  label: string;
};

export const COURSEWORK: readonly Coursework[] = [
  { id: "ap-calc-bc", label: "AP Calculus BC" },
  { id: "ap-phys-c-mech", label: "AP Physics C: Mechanics" },
  { id: "ap-eng-lang", label: "AP English Language & Composition" },
  { id: "ap-csa", label: "AP Computer Science A" },
] as const;

/**
 * Helper: assert at module-load time that every coursework id matches
 * a known milestone. Only runs in dev/test builds; tree-shaken in prod.
 */
if (process.env.NODE_ENV !== "production") {
  const milestoneIds = new Set(MILESTONES.map((m) => m.id));
  for (const c of COURSEWORK) {
    if (!milestoneIds.has(c.id)) {
      // Loud console warning — prod builds tree-shake this whole block.
      // eslint-disable-next-line no-console
      console.warn(
        `[coursework] entry id "${c.id}" has no matching milestone — countdown will render 'pending'`,
      );
    }
  }
}
