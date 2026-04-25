import { ACTIVITIES, ACTIVITY_CATEGORY_LABELS, type Activity } from "@/config/activities";
import { AWARDS } from "@/config/awards";
import { TIMELINE, type TimelineEntry } from "@/config/timeline";
import { formatTimelineDate } from "@/lib/format-timeline-date";

/**
 * /about § Journey + § Activities + § Awards.
 *
 * Three sub-sections rendered in a single brutalist masthead block.
 * Reads from src/config/{timeline,activities,awards}.ts so Ali can
 * edit content without touching component code.
 *
 * Server component — no client interactivity. All values resolved at
 * build/render time.
 */

function TimelineRow({
  entry,
  index,
  total,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
}) {
  const isLast = index === total - 1;
  return (
    <li
      className={
        "grid grid-cols-12 items-baseline gap-x-4 gap-y-1 p-5" +
        (!isLast ? " border-b-2 border-[var(--color-border)]" : "")
      }
    >
      <span className="col-span-12 font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase sm:col-span-2">
        {formatTimelineDate(entry.date)}
      </span>
      <span className="col-span-12 text-base leading-snug font-medium sm:col-span-10">
        {entry.title}
      </span>
      <span className="col-span-12 text-sm leading-relaxed text-[var(--color-fg)]/80 sm:col-span-10 sm:col-start-3">
        {entry.note}
      </span>
    </li>
  );
}

function activitiesByCategory() {
  const grouped = new Map<Activity["category"], Activity[]>();
  for (const a of ACTIVITIES) {
    if (!grouped.has(a.category)) grouped.set(a.category, []);
    grouped.get(a.category)!.push(a);
  }
  // sort within each category by `from` desc
  for (const list of grouped.values()) {
    list.sort((a, b) => b.from.localeCompare(a.from));
  }
  return grouped;
}

export function JourneySection() {
  const grouped = activitiesByCategory();
  const sortedTimeline = [...TIMELINE].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {/* § Journey */}
      <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Journey
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Newest first.
          </h2>
          <ul className="border-2 border-[var(--color-border)]">
            {sortedTimeline.map((entry, i) => (
              <TimelineRow
                key={`${entry.date}-${entry.title}`}
                entry={entry}
                index={i}
                total={sortedTimeline.length}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* § Activities */}
      <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 04
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Activities
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What I do, when I&apos;m not coding.
          </h2>

          <div className="flex flex-col gap-10">
            {(
              Object.keys(ACTIVITY_CATEGORY_LABELS) as Array<keyof typeof ACTIVITY_CATEGORY_LABELS>
            ).map((cat) => {
              const items = grouped.get(cat) ?? [];
              if (items.length === 0) return null;
              return (
                <div key={cat} className="flex flex-col gap-4">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
                    {ACTIVITY_CATEGORY_LABELS[cat]}
                  </p>
                  <ul className="border-2 border-[var(--color-border)]">
                    {items.map((a, i) => (
                      <li
                        key={a.id}
                        className={
                          "grid grid-cols-12 items-baseline gap-x-4 gap-y-1 p-5" +
                          (i < items.length - 1 ? " border-b-2 border-[var(--color-border)]" : "")
                        }
                      >
                        <span className="col-span-12 text-base leading-snug font-medium sm:col-span-9">
                          {a.role}
                        </span>
                        <span className="col-span-12 font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase sm:col-span-3 sm:text-right">
                          {a.from}
                          {a.to
                            ? `–${a.to}`
                            : a.from === new Date().getFullYear().toString()
                              ? ""
                              : "–present"}
                        </span>
                        <span className="col-span-12 text-sm leading-relaxed text-[var(--color-fg)]/80 sm:col-span-9">
                          {a.blurb}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* § Awards */}
      <section className="mb-24 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 05
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Awards
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <h2
            className="mb-8 text-[clamp(2rem,4vw,3.5rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Recognition.
          </h2>
          {AWARDS.length === 0 ? (
            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
              No published awards yet
            </p>
          ) : (
            <ul className="border-2 border-[var(--color-border)]">
              {AWARDS.map((a, i) => (
                <li
                  key={a.id}
                  className={
                    "grid grid-cols-12 items-baseline gap-x-4 gap-y-1 p-5" +
                    (i < AWARDS.length - 1 ? " border-b-2 border-[var(--color-border)]" : "")
                  }
                >
                  <span className="col-span-12 text-base leading-snug font-medium sm:col-span-7">
                    {a.title}
                    {a.pending && (
                      <span className="ml-2 font-mono text-[10px] tracking-[0.25em] text-[var(--color-primary)] uppercase">
                        (pending)
                      </span>
                    )}
                  </span>
                  <span className="col-span-7 font-mono text-[11px] tracking-wide text-[var(--color-fg)]/70 sm:col-span-3">
                    {a.org}
                  </span>
                  <span className="col-span-5 text-right font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase sm:col-span-2">
                    {a.year}
                  </span>
                  {a.blurb && (
                    <span className="col-span-12 text-sm leading-relaxed text-[var(--color-fg)]/75">
                      {a.blurb}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
