"use client";

import { useId, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * StockSaathiTimeTravel — interactive crash-replay chart.
 *
 * The user picks one of four pre-canned Indian-market crashes and a "panic
 * day". Two lines render over a 30-day window:
 *   1. Held — applies the scenario's daily returns end-to-end.
 *   2. Panic-sold — applies returns up to panicDay, then locks in cash
 *      (zero returns) for the remaining session, simulating a fearful
 *      exit at a specific point in the drawdown.
 *
 * Single client boundary. No external charting deps. Animates the held
 * line and panic line with stroke-dashoffset draw-in keyframes on each
 * scenario change (re-keyed via mount); panic-day slider updates live
 * without remount, so scrubbing feels snappy.
 * -------------------------------------------------------------------------*/

type Scenario = {
  id: string;
  label: string;
  blurb: string;
  /**
   * Per-session returns expressed as multipliers (1.00 = flat, 0.97 = -3%).
   * Length must equal SESSIONS.
   */
  returns: number[];
};

const SESSIONS = 30;
const STARTING_PORTFOLIO = 100_000; // ₹1,00,000

/**
 * Eyeballed but plausible daily-return shapes for four real Indian-market
 * crashes. Each array is exactly SESSIONS long. The held line at the end
 * = 100_000 × Π(returns). The shapes below produce roughly:
 *   covid:  -34% trough day ~17, recovery to ~+4% by day 30
 *   adani:  -18% trough day ~10, partial recovery to ~-6% by day 30
 *   demon:  -10% trough day ~6,  flat-ish recovery to ~-3% by day 30
 *   gfc:    -38% trough day ~22, still -28% by day 30 (no recovery yet)
 */
const SCENARIOS: Scenario[] = [
  {
    id: "covid",
    label: "COVID March 2020",
    blurb: "Nifty 50 · Mar 2 – Apr 13, 2020",
    returns: [
      1.0, 0.985, 0.96, 0.92, 0.93, 0.96, 0.94, 0.91, 0.93, 0.92, 0.94, 0.97, 0.98, 0.96, 0.94,
      0.93, 0.95, 0.98, 1.02, 1.04, 1.05, 1.06, 1.07, 1.04, 1.05, 1.06, 1.05, 1.06, 1.07, 1.06,
    ],
  },
  {
    id: "adani",
    label: "Adani-Hindenburg 2023",
    blurb: "Adani Enterprises · Jan 24 – Mar 6, 2023",
    returns: [
      1.0, 0.98, 0.95, 0.93, 0.94, 0.96, 0.95, 0.94, 0.96, 0.92, 0.95, 0.97, 0.98, 0.99, 1.0, 0.99,
      1.01, 1.02, 1.0, 0.99, 1.01, 1.02, 1.03, 1.01, 1.02, 1.03, 1.02, 1.03, 1.04, 1.03,
    ],
  },
  {
    id: "demon",
    label: "Demonetisation 2016",
    blurb: "Nifty 50 · Nov 8 – Dec 21, 2016",
    returns: [
      1.0, 0.985, 0.97, 0.96, 0.97, 0.96, 0.98, 0.99, 1.0, 1.01, 1.0, 0.99, 1.0, 1.01, 1.02, 1.01,
      1.02, 1.01, 1.0, 1.01, 1.02, 1.01, 1.0, 1.01, 1.02, 1.0, 1.01, 1.02, 1.01, 1.02,
    ],
  },
  {
    id: "gfc",
    label: "GFC 2008",
    blurb: "Sensex · Sep 15 – Oct 27, 2008",
    returns: [
      1.0, 0.96, 0.95, 0.93, 0.94, 0.92, 0.94, 0.93, 0.95, 0.94, 0.96, 0.95, 0.97, 0.96, 0.95, 0.94,
      0.93, 0.94, 0.95, 0.93, 0.94, 0.92, 0.95, 0.97, 0.98, 1.0, 1.01, 1.0, 1.01, 1.02,
    ],
  },
];

// ── Indian rupee / lakh formatter ─────────────────────────────────────────
// We want ₹1,12,400-style grouping (Indian system: 1,XX,XXX) instead of
// the Western 1,XX,XXX → 112,400 pattern. en-IN locale gives us exactly
// this when we ask for currency rupees with no decimals.
const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatINR(n: number): string {
  return inrFormatter.format(Math.round(n));
}

function formatPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return `${sign}${n.toFixed(1)}%`;
}

// ── Geometry ──────────────────────────────────────────────────────────────
const CHART_W = 600;
const CHART_H = 280;
const PAD_L = 80;
const PAD_R = 70;
const PAD_T = 30;
const PAD_B = 50;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;

/** Compute end-of-day portfolio values, applying each multiplier to the
 *  prior day's value. Result has length = returns.length (Day 1..N). */
function computeHeld(returns: number[]): number[] {
  const out: number[] = [];
  let v = STARTING_PORTFOLIO;
  for (const r of returns) {
    v = v * r;
    out.push(v);
  }
  return out;
}

/** Apply returns up through panicDay (inclusive, 1-indexed), then lock the
 *  panic-sold portfolio in cash for the remainder. */
function computePanicSold(returns: number[], panicDay: number): number[] {
  const out: number[] = [];
  let v = STARTING_PORTFOLIO;
  for (let i = 0; i < returns.length; i++) {
    // returns[i] is bounded by the loop; the `!` quiets noUncheckedIndexedAccess.
    if (i < panicDay) v = v * returns[i]!;
    out.push(v);
  }
  return out;
}

function buildPath(values: number[], minV: number, maxV: number): string {
  // values[0] is the close of Day 1; we anchor Day 0 at STARTING_PORTFOLIO
  // on the left edge so both lines start from the same on-chart point.
  const points: Array<[number, number]> = [];
  const stepX = PLOT_W / SESSIONS;
  // Day 0 anchor
  points.push([PAD_L, valueToY(STARTING_PORTFOLIO, minV, maxV)]);
  for (let i = 0; i < values.length; i++) {
    const x = PAD_L + (i + 1) * stepX;
    const y = valueToY(values[i]!, minV, maxV);
    points.push([x, y]);
  }
  return points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
}

function valueToY(v: number, minV: number, maxV: number): number {
  const span = maxV - minV || 1;
  const t = (v - minV) / span; // 0..1, higher = better
  return PAD_T + (1 - t) * PLOT_H;
}

// ── Component ─────────────────────────────────────────────────────────────
type Props = {
  className?: string;
};

// SCENARIOS is non-empty by construction; this is the failsafe default when
// state holds an unknown id (impossible in normal use, but type-safe).
const DEFAULT_SCENARIO: Scenario = SCENARIOS[0]!;

export default function StockSaathiTimeTravel({ className }: Props) {
  const [scenarioId, setScenarioId] = useState<string>("covid");
  const [panicDay, setPanicDay] = useState<number>(3);

  const scenario: Scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? DEFAULT_SCENARIO;

  // Derived series — recomputed on every state change. computeHeld is cheap
  // (30 multiplications); useMemo keeps the SVG strings stable between
  // unrelated re-renders so React skips diff'ing the d attribute.
  const { heldValues, panicValues, heldEndValue, panicEndValue, heldPath, panicPath, gridYs } =
    useMemo(() => {
      const heldValues = computeHeld(scenario.returns);
      const panicValues = computePanicSold(scenario.returns, panicDay);
      const all = [STARTING_PORTFOLIO, ...heldValues, ...panicValues];
      const minV = Math.min(...all) * 0.98;
      const maxV = Math.max(...all) * 1.02;
      // Both arrays have length === SESSIONS by construction; the trailing
      // `!` keeps noUncheckedIndexedAccess satisfied without runtime checks.
      const heldEndValue = heldValues[heldValues.length - 1]!;
      const panicEndValue = panicValues[panicValues.length - 1]!;
      return {
        heldValues,
        panicValues,
        heldEndValue,
        panicEndValue,
        heldPath: buildPath(heldValues, minV, maxV),
        panicPath: buildPath(panicValues, minV, maxV),
        gridYs: [
          { v: STARTING_PORTFOLIO, y: valueToY(STARTING_PORTFOLIO, minV, maxV) },
          { v: maxV * 0.5 + minV * 0.5, y: valueToY(maxV * 0.5 + minV * 0.5, minV, maxV) },
          { v: minV, y: valueToY(minV, minV, maxV) },
        ],
      };
    }, [scenario, panicDay]);

  // Re-key the animated paths on scenario change so the draw-in
  // keyframes restart. We don't re-key on panic-day change — the slider
  // should feel like live scrubbing, not a restart of the whole chart.
  const drawKey = scenario.id;

  const heldVsPanicDelta = heldEndValue - panicEndValue;
  const deltaPct = ((heldEndValue - panicEndValue) / panicEndValue) * 100;

  // panicDay slider's x-coordinate on the chart, used to draw the
  // dashed vertical "PANIC · D+N" marker.
  const stepX = PLOT_W / SESSIONS;
  const panicMarkerX = PAD_L + panicDay * stepX;

  // Stable IDs for SVG defs so multiple instances on the same page don't
  // clash on linearGradient ids.
  const reactId = useId();
  const heldFillId = `tt-held-fill-${reactId}`;
  const panicFillId = `tt-panic-fill-${reactId}`;

  return (
    <div
      data-ss-rounded-card
      data-tt-host
      className={cn("flex flex-col gap-4 px-6 py-6 sm:px-7", className)}
    >
      {/* Header — labels + colour key + live values */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p data-ss-section-label>Crash replay · {scenario.label}</p>
          <p className="text-sm font-semibold text-[var(--color-fg)]">
            {scenario.blurb} · ₹1,00,000 portfolio
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium tabular-nums">
          <span className="inline-flex items-center gap-2 text-[var(--color-fg)]">
            <span
              aria-hidden
              className="inline-block h-[2px] w-4 align-middle"
              style={{ background: "var(--color-primary)" }}
            />
            Held
          </span>
          <span className="inline-flex items-center gap-2 text-[var(--color-fg)]">
            <span
              aria-hidden
              className="inline-block h-[2px] w-4 align-middle"
              style={{ background: "var(--color-danger)" }}
            />
            Panic-sold day {panicDay}
          </span>
        </div>
      </div>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        role="img"
        aria-label={`Dual-line chart for ${scenario.label}: a held portfolio ends at ${formatINR(heldEndValue)}, a panic-sold-on-day-${panicDay} portfolio ends at ${formatINR(panicEndValue)}.`}
        className="block h-auto w-full"
      >
        <defs>
          <linearGradient id={heldFillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={panicFillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis gridlines + tick labels */}
        <g aria-hidden>
          {gridYs.map(({ v, y }) => (
            <g key={`grid-${y}`}>
              <line
                x1={PAD_L}
                y1={y}
                x2={CHART_W - PAD_R}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.5"
              />
              <text
                x={PAD_L - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="10"
                fontFamily="var(--font-mono, ui-monospace)"
                fill="var(--color-muted)"
                className="tabular-nums"
              >
                {formatINR(v)}
              </text>
            </g>
          ))}
        </g>

        {/* X-axis baseline + tick labels */}
        <g aria-hidden>
          <line
            x1={PAD_L}
            y1={CHART_H - PAD_B}
            x2={CHART_W - PAD_R}
            y2={CHART_H - PAD_B}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          {[0, 15, 30].map((day) => {
            const x = PAD_L + day * stepX;
            return (
              <text
                key={`xt-${day}`}
                x={x}
                y={CHART_H - PAD_B + 16}
                textAnchor={day === 0 ? "start" : day === 30 ? "end" : "middle"}
                fontSize="10"
                fontFamily="var(--font-mono, ui-monospace)"
                fill="var(--color-muted)"
              >
                Day {day}
              </text>
            );
          })}
        </g>

        {/* Panic-sold area + line (red) — drawn first so the held line
            lays on top during the early overlap. */}
        <path
          d={`${panicPath} L${CHART_W - PAD_R},${CHART_H - PAD_B} L${PAD_L},${CHART_H - PAD_B} Z`}
          fill={`url(#${panicFillId})`}
        />
        <path
          key={`panic-${drawKey}`}
          d={panicPath}
          fill="none"
          stroke="var(--color-danger)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
          data-tt-line="panic"
        />

        {/* Held area + line (primary teal) */}
        <path
          d={`${heldPath} L${CHART_W - PAD_R},${CHART_H - PAD_B} L${PAD_L},${CHART_H - PAD_B} Z`}
          fill={`url(#${heldFillId})`}
        />
        <path
          key={`held-${drawKey}`}
          d={heldPath}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          data-tt-line="held"
        />

        {/* Panic-day vertical marker — repositions live as the user
            drags the slider. */}
        <g aria-hidden>
          <line
            x1={panicMarkerX}
            y1={PAD_T}
            x2={panicMarkerX}
            y2={CHART_H - PAD_B}
            stroke="var(--color-danger)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.7"
            style={{ transition: "x1 200ms ease, x2 200ms ease" }}
          />
          <rect
            x={panicMarkerX + 5}
            y={PAD_T + 4}
            width="80"
            height="18"
            rx="3"
            fill="var(--color-danger)"
            fillOpacity="0.12"
            stroke="var(--color-danger)"
            strokeWidth="1"
            style={{ transition: "x 200ms ease" }}
          />
          <text
            x={panicMarkerX + 45}
            y={PAD_T + 16}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono, ui-monospace)"
            fill="var(--color-danger)"
            fontWeight="600"
            style={{ transition: "x 200ms ease" }}
          >
            PANIC · D+{panicDay}
          </text>
        </g>

        {/* Right-edge endpoint dots + value labels */}
        <g aria-hidden>
          <circle
            cx={CHART_W - PAD_R}
            cy={valueToY(
              heldEndValue,
              Math.min(STARTING_PORTFOLIO, ...heldValues, ...panicValues) * 0.98,
              Math.max(STARTING_PORTFOLIO, ...heldValues, ...panicValues) * 1.02,
            )}
            r="3"
            fill="var(--color-primary)"
          />
          <circle
            cx={CHART_W - PAD_R}
            cy={valueToY(
              panicEndValue,
              Math.min(STARTING_PORTFOLIO, ...heldValues, ...panicValues) * 0.98,
              Math.max(STARTING_PORTFOLIO, ...heldValues, ...panicValues) * 1.02,
            )}
            r="3"
            fill="var(--color-danger)"
          />
        </g>
      </svg>

      {/* Live value readout. The big number elements are keyed on the
          formatted value so React remounts them on every change, retriggering
          the small fade-bump in [data-tt-readout]. Cheap perceived
          interactivity without a number-flow library. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="status" aria-live="polite">
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Held
          </p>
          <p
            key={`held-${formatINR(heldEndValue)}`}
            data-tt-readout
            className="font-mono text-lg font-bold text-[var(--color-primary)] tabular-nums"
          >
            {formatINR(heldEndValue)}
          </p>
          <p className="font-mono text-[11px] text-[var(--color-muted)] tabular-nums">
            {formatPct(((heldEndValue - STARTING_PORTFOLIO) / STARTING_PORTFOLIO) * 100)}
          </p>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Panic-sold day {panicDay}
          </p>
          <p
            key={`panic-${formatINR(panicEndValue)}`}
            data-tt-readout
            className="font-mono text-lg font-bold tabular-nums"
            style={{ color: "var(--color-danger)" }}
          >
            {formatINR(panicEndValue)}
          </p>
          <p className="font-mono text-[11px] text-[var(--color-muted)] tabular-nums">
            {formatPct(((panicEndValue - STARTING_PORTFOLIO) / STARTING_PORTFOLIO) * 100)}
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-0.5 sm:col-span-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase">
            Cost of panic
          </p>
          <p
            key={`delta-${formatINR(heldVsPanicDelta)}`}
            data-tt-readout
            className="font-mono text-lg font-bold text-[var(--color-fg)] tabular-nums"
          >
            {formatINR(heldVsPanicDelta)}
          </p>
          <p className="font-mono text-[11px] text-[var(--color-muted)] tabular-nums">
            {formatPct(deltaPct)} more by holding
          </p>
        </div>
      </div>

      {/* Scenario buttons */}
      <fieldset className="flex flex-col gap-2">
        <legend className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase">
          Pick a crash
        </legend>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => {
            const active = s.id === scenarioId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenarioId(s.id)}
                aria-pressed={active}
                data-tt-scenario-btn
                data-active={active || undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.04em] transition",
                  active
                    ? "border-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_18%,transparent)] text-[var(--color-primary)]"
                    : "border-[var(--color-border)] text-[var(--color-fg)] hover:border-[color-mix(in_srgb,var(--color-primary)_50%,transparent)] hover:text-[var(--color-primary)]",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Panic-day slider */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="tt-panic-day"
            className="text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase"
          >
            Panic day
          </label>
          <span className="font-mono text-[11px] font-semibold text-[var(--color-fg)] tabular-nums">
            D+{panicDay} of 15
          </span>
        </div>
        <input
          id="tt-panic-day"
          type="range"
          min={1}
          max={15}
          step={1}
          value={panicDay}
          onChange={(e) => setPanicDay(Number(e.target.value))}
          data-tt-slider
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-border)] accent-[var(--color-danger)]"
        />
      </div>
    </div>
  );
}
