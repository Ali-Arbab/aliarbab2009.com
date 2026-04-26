"use client";

import { Check, Loader2, Mic, MicOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * <BolHisaabVoiceDemo /> — interactive client demo of BolHisaab's
 * voice-first capture pipeline.
 *
 * Hoisted above the fold on /projects/bolhisaab so visitors see the
 * "speak a transaction, the ledger writes itself" promise in motion
 * within seconds of landing. The static § 06 mockup made the case
 * frame-by-frame; this component lets visitors run the eight-state
 * machine themselves (idle → recording → transcribing → parsing →
 * confirming → done).
 *
 * Pure simulation — no microphone access, no API calls. Each tap of
 * the FAB cycles through one of four canonical Hinglish phrases (Ram
 * udhaar credit, Shyam debit, Geeta saade-paanch credit, Mohan hazaar
 * debit) so the visitor sees both polarities and the Indian-numeral
 * mappings in action. Hands-free toggle restarts the loop with the
 * next phrase 1.5s after each commit so the demo can run unattended
 * during a college admissions session.
 *
 * Animations use CSS keyframes (defined inline via <style jsx>-style
 * data attributes are not used; the project codebase prefers the
 * inline keyframes pattern from globals.css). The confirmation card
 * slide-up uses a 360ms cubic-bezier transform driven by a keyed
 * mount, mirroring the existing bh-mic-pulse / bh-ring-expand
 * idiom.
 */

type DemoState = "idle" | "recording" | "transcribing" | "parsing" | "confirming" | "done";

type ExamplePhrase = {
  /** What the shopkeeper says — the partial transcript that types in. */
  transcript: string;
  /** Resolved counter-party display name. */
  party: string;
  /** Single uppercase initial used in the avatar circle. */
  initial: string;
  /** Amount in rupees — stored as a number so we format with Intl. */
  amount: number;
  /** Polarity — "credit" = party owes shopkeeper (emerald), "debit" = shopkeeper owes party / received payment (rose). */
  direction: "credit" | "debit";
  /** Hinglish micro-label under the big amount. */
  directionLabel: string;
  /** Running balance after this transaction — for the "Naya baaki" line. */
  newBalance: number;
};

const EXAMPLES: ExamplePhrase[] = [
  {
    transcript: "Ram ne paanch sau udhaar liya",
    party: "Ram",
    initial: "R",
    amount: 500,
    direction: "credit",
    directionLabel: "udhaar liya",
    newBalance: 1200,
  },
  {
    transcript: "Shyam ne dhai sau diye",
    party: "Shyam",
    initial: "S",
    amount: 250,
    direction: "debit",
    directionLabel: "chukaaye",
    newBalance: 800,
  },
  {
    transcript: "Geeta ne saade paanch sau udhaar",
    party: "Geeta",
    initial: "G",
    amount: 550,
    direction: "credit",
    directionLabel: "udhaar liya",
    newBalance: 1750,
  },
  {
    transcript: "Mohan ne hazaar chukaaye",
    party: "Mohan",
    initial: "M",
    amount: 1000,
    direction: "debit",
    directionLabel: "chukaaye",
    newBalance: 2400,
  },
];

const STATE_DURATIONS: Record<Exclude<DemoState, "idle">, number> = {
  recording: 1500,
  transcribing: 1000,
  parsing: 1000,
  confirming: 1500,
  done: 1500,
};

/** Currency formatter — Indian numbering (₹1,23,456 grouping). */
const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Format an amount as ₹X with Indian thousands grouping. */
function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

/** Status pill text per state — Hinglish copy from the live BolHisaab app. */
function statusText(state: DemoState): string {
  switch (state) {
    case "recording":
      return "Sun raha hoon… (stop ke liye dabayein)";
    case "transcribing":
      return "Soch raha hoon…";
    case "parsing":
      return "Likh raha hoon…";
    case "confirming":
      return "Confirm kar raha hoon…";
    case "done":
      return "Likh diya.";
    case "idle":
    default:
      return "Tap karke bolein";
  }
}

export default function BolHisaabVoiceDemo() {
  const [state, setState] = useState<DemoState>("idle");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [partialChars, setPartialChars] = useState(0);
  const [waveformBars, setWaveformBars] = useState<number[]>(() =>
    Array.from({ length: 16 }, () => 0.5),
  );
  const [handsFree, setHandsFree] = useState(false);

  // Keep timeouts so abort can clear them.
  const timeoutsRef = useRef<number[]>([]);
  // Waveform interval — only ticks while recording.
  const waveformIntervalRef = useRef<number | null>(null);
  // Partial-transcript typing interval — ticks during transcribing.
  const typingIntervalRef = useRef<number | null>(null);
  // Hands-free re-start timeout — separate so abort can cancel it specifically.
  const handsFreeRestartRef = useRef<number | null>(null);

  // exampleIndex is always wrapped via `% EXAMPLES.length` so this lookup
  // is total — non-null assertion satisfies `noUncheckedIndexedAccess`.
  const example = EXAMPLES[exampleIndex]!;

  /** Clear every pending timer + interval so we can restart cleanly. */
  const clearAllTimers = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    if (waveformIntervalRef.current !== null) {
      window.clearInterval(waveformIntervalRef.current);
      waveformIntervalRef.current = null;
    }
    if (typingIntervalRef.current !== null) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    if (handsFreeRestartRef.current !== null) {
      window.clearTimeout(handsFreeRestartRef.current);
      handsFreeRestartRef.current = null;
    }
  }, []);

  /** Schedule a state change at `delay` ms; tracked so abort can clear it. */
  const scheduleState = useCallback((next: DemoState, delay: number) => {
    const id = window.setTimeout(() => {
      setState(next);
    }, delay);
    timeoutsRef.current.push(id);
  }, []);

  /**
   * Run the full pipeline for the current example. Each phase queues
   * the next via setTimeout so a click-to-abort can short-circuit the
   * sequence by clearing all pending timers.
   */
  const runPipeline = useCallback(() => {
    clearAllTimers();
    setPartialChars(0);
    setState("recording");

    // 0ms → recording (already set above; intervals start in effects below)
    scheduleState("transcribing", STATE_DURATIONS.recording);
    scheduleState("parsing", STATE_DURATIONS.recording + STATE_DURATIONS.transcribing);
    scheduleState(
      "confirming",
      STATE_DURATIONS.recording + STATE_DURATIONS.transcribing + STATE_DURATIONS.parsing,
    );
    scheduleState(
      "done",
      STATE_DURATIONS.recording +
        STATE_DURATIONS.transcribing +
        STATE_DURATIONS.parsing +
        STATE_DURATIONS.confirming,
    );
    // After "done" sits visible for 1.5s, advance the example and reset to idle.
    const totalUntilDone =
      STATE_DURATIONS.recording +
      STATE_DURATIONS.transcribing +
      STATE_DURATIONS.parsing +
      STATE_DURATIONS.confirming +
      STATE_DURATIONS.done;
    const resetId = window.setTimeout(() => {
      setExampleIndex((i) => (i + 1) % EXAMPLES.length);
      setState("idle");
      setPartialChars(0);
    }, totalUntilDone);
    timeoutsRef.current.push(resetId);
  }, [clearAllTimers, scheduleState]);

  /**
   * Mic FAB click handler. Idle → start. Any non-idle state → abort
   * back to idle (mirrors BolHisaab's "tap-to-stop" UX).
   */
  const handleMicClick = useCallback(() => {
    if (state === "idle") {
      runPipeline();
    } else {
      clearAllTimers();
      setState("idle");
      setPartialChars(0);
    }
  }, [state, runPipeline, clearAllTimers]);

  /** Animate the waveform only while recording. */
  useEffect(() => {
    if (state === "recording") {
      const tick = () => {
        setWaveformBars(Array.from({ length: 16 }, () => 0.25 + Math.random() * 0.75));
      };
      tick();
      waveformIntervalRef.current = window.setInterval(tick, 110);
      return () => {
        if (waveformIntervalRef.current !== null) {
          window.clearInterval(waveformIntervalRef.current);
          waveformIntervalRef.current = null;
        }
      };
    }
    return undefined;
  }, [state]);

  /** Type the partial transcript in during the transcribing phase. */
  useEffect(() => {
    if (state === "transcribing") {
      const target = example.transcript.length;
      const stepMs = STATE_DURATIONS.transcribing / target;
      typingIntervalRef.current = window.setInterval(() => {
        setPartialChars((n) => {
          if (n >= target) return n;
          return n + 1;
        });
      }, stepMs);
      return () => {
        if (typingIntervalRef.current !== null) {
          window.clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      };
    }
    if (state === "parsing" || state === "confirming" || state === "done") {
      // Once parsing starts, freeze the transcript at full length.
      setPartialChars(example.transcript.length);
    }
    return undefined;
  }, [state, example.transcript.length]);

  /**
   * Hands-free auto-restart. When the toggle is ON and we land back on
   * "idle" (i.e. the previous run finished and reset), kick a fresh
   * pipeline 1.5s later. The toggle being switched OFF mid-loop cancels
   * the pending restart.
   */
  useEffect(() => {
    if (handsFree && state === "idle") {
      handsFreeRestartRef.current = window.setTimeout(() => {
        runPipeline();
      }, 1500);
      return () => {
        if (handsFreeRestartRef.current !== null) {
          window.clearTimeout(handsFreeRestartRef.current);
          handsFreeRestartRef.current = null;
        }
      };
    }
    return undefined;
  }, [handsFree, state, runPipeline]);

  /** Cleanup all timers on unmount. */
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  // ------------------------------------------------------------------
  // Derived view-model
  // ------------------------------------------------------------------

  const isRecording = state === "recording";
  const isProcessing = state === "transcribing" || state === "parsing";
  const showConfirmation = state === "confirming" || state === "done";
  const isDone = state === "done";

  const partialTranscript = useMemo(() => {
    if (state === "idle") return "";
    if (state === "recording") return ""; // empty until transcript starts streaming in
    return example.transcript.slice(0, partialChars);
  }, [state, example.transcript, partialChars]);

  const directionColorVar =
    example.direction === "credit" ? "var(--color-credit)" : "var(--color-debit)";

  // Bars used for the static-frozen waveform when not recording. Indigo
  // bars at gentle heights so the empty state still reads as "voice UI".
  const restWaveformBars = useMemo(
    () => [
      0.42, 0.78, 0.55, 0.9, 0.35, 0.68, 1.0, 0.5, 0.82, 0.38, 0.72, 0.95, 0.48, 0.6, 0.88, 0.44,
    ],
    [],
  );

  const renderedBars = isRecording ? waveformBars : restWaveformBars;

  return (
    <div
      data-bh-voice-demo
      aria-label="BolHisaab interactive voice capture demo"
      className="relative flex w-full flex-col items-stretch gap-5 rounded-2xl"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        padding: "28px 24px",
        boxShadow:
          "0 1px 2px color-mix(in srgb, var(--color-fg), transparent 92%), 0 8px 24px color-mix(in srgb, var(--color-primary), transparent 88%)",
        minHeight: "440px",
      }}
    >
      {/* Inline keyframes — slide-up + fade-in for the confirmation card,
          plus the recording-state ring pulses. Scoped via attribute-name
          so they don't bleed into other components. */}
      <style>{`
        @keyframes bh-demo-slide-up {
          0% { transform: translateY(16px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes bh-demo-ring-pulse {
          0% { transform: scale(0.92); opacity: 0.55; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes bh-demo-fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-bh-demo-confirm-card],
          [data-bh-demo-ring] {
            animation: none !important;
          }
        }
      `}</style>

      {/* Header row: status pill + hands-free toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface-2)",
            color: "var(--color-fg)",
            fontFamily: "var(--font-display)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{
              background:
                state === "idle"
                  ? "var(--color-muted)"
                  : isDone
                    ? "var(--color-credit)"
                    : "var(--color-primary)",
              animation:
                isRecording || isProcessing ? "bh-mic-pulse 1.5s ease-in-out infinite" : "none",
            }}
          />
          <span>{statusText(state)}</span>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={handsFree}
          aria-label="Hands-free auto-restart"
          onClick={() => setHandsFree((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors"
          style={{
            borderColor: handsFree ? "var(--color-primary)" : "var(--color-border)",
            background: handsFree ? "var(--color-primary)" : "var(--color-surface)",
            color: handsFree ? "var(--color-primary-fg)" : "var(--color-muted)",
            fontFamily: "var(--font-display)",
          }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: handsFree ? "var(--color-primary-fg)" : "var(--color-muted)",
            }}
          />
          <span>Hands-free {handsFree ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* Mic FAB block — center-aligned with two ring pulses while recording */}
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
        {isRecording && (
          <>
            <span
              data-bh-demo-ring
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid var(--color-primary)",
                animation: "bh-demo-ring-pulse 1.4s ease-out infinite",
              }}
            />
            <span
              data-bh-demo-ring
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid var(--color-primary)",
                animation: "bh-demo-ring-pulse 1.4s ease-out 0.7s infinite",
              }}
            />
          </>
        )}
        <button
          type="button"
          aria-label={state === "idle" ? "Start recording" : "Stop recording"}
          onClick={handleMicClick}
          className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{
            background:
              state === "idle"
                ? "var(--color-primary)"
                : isDone
                  ? "var(--color-credit)"
                  : "var(--color-primary)",
            color: "var(--color-primary-fg)",
          }}
        >
          {isProcessing ? (
            <Loader2 size={36} strokeWidth={2.25} aria-hidden className="animate-spin" />
          ) : isDone ? (
            <Check size={40} strokeWidth={2.5} aria-hidden />
          ) : state === "idle" ? (
            <Mic size={40} strokeWidth={2} aria-hidden />
          ) : (
            <MicOff size={40} strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>

      {/* Live partial transcript bubble — visible from "transcribing" onward */}
      <div
        aria-live="polite"
        className="min-h-[3.25rem] w-full rounded-2xl border px-4 py-3 text-center text-sm italic"
        style={{
          borderColor: "var(--color-border)",
          background: "var(--color-surface-2)",
          color:
            state === "idle" || state === "recording" ? "var(--color-muted)" : "var(--color-fg)",
          fontFamily: "var(--font-display)",
        }}
      >
        {state === "idle" ? (
          <span className="not-italic">
            Tap mic and speak — try &ldquo;Ram ne paanch sau udhaar liya&rdquo;
          </span>
        ) : state === "recording" ? (
          <span className="not-italic" style={{ color: "var(--color-muted)" }}>
            Listening…
          </span>
        ) : (
          <>
            &ldquo;{partialTranscript}
            {state === "transcribing" && partialChars < example.transcript.length ? "…" : ""}&rdquo;
          </>
        )}
      </div>

      {/* Live waveform — 16 bars; heights animate during recording, freeze otherwise */}
      <svg
        role="img"
        aria-label="Live audio waveform"
        viewBox="0 0 160 40"
        className="h-10 w-full"
        preserveAspectRatio="none"
      >
        {renderedBars.map((normalized, i) => {
          const barWidth = 4;
          const gap = 6;
          const x = i * (barWidth + gap) + 3;
          const height = normalized * 32;
          const y = (40 - height) / 2;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={height}
              rx={2}
              fill="var(--color-primary)"
              opacity={isRecording ? 0.9 : 0.45}
              style={{ transition: "opacity 200ms ease, height 110ms ease, y 110ms ease" }}
            />
          );
        })}
      </svg>

      {/* Confirmation card — slides up from below during "confirming" / "done" */}
      {showConfirmation && (
        <div
          data-bh-demo-confirm-card
          key={`confirm-${exampleIndex}-${state}`}
          aria-label="Parsed transaction confirmation"
          className="flex w-full flex-col gap-3 rounded-2xl border"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
            padding: "20px 22px",
            boxShadow:
              "0 4px 12px color-mix(in srgb, var(--color-primary), transparent 85%), 0 1px 2px color-mix(in srgb, var(--color-fg), transparent 92%)",
            animation: "bh-demo-slide-up 360ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
          }}
        >
          {/* Counter-party row */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-primary-fg)",
                fontFamily: "var(--font-display)",
              }}
            >
              {example.initial}
            </span>
            <p
              className="text-base font-medium"
              style={{
                color: "var(--color-fg)",
                fontFamily: "var(--font-display)",
              }}
            >
              {example.party}
            </p>
            <span
              className="ml-auto inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-surface-2)",
                color: "var(--color-muted)",
                fontFamily: "var(--font-display)",
              }}
            >
              0.92 conf
            </span>
          </div>

          {/* Big amount in credit (emerald) or debit (rose) */}
          <p
            className="text-[32px] leading-none font-bold tabular-nums"
            style={{
              color: directionColorVar,
              fontFamily: "var(--font-display)",
            }}
          >
            {formatINR(example.amount)}
          </p>

          {/* Direction label */}
          <p
            className="-mt-1 text-sm"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-display)",
            }}
          >
            {example.directionLabel}
          </p>

          {/* New running balance line — only shows once committed (state="done") */}
          {isDone && (
            <p
              className="text-sm font-medium tabular-nums"
              style={{
                color: "var(--color-primary)",
                fontFamily: "var(--font-display)",
                animation: "bh-demo-fade-in 280ms ease-out both",
              }}
            >
              {`✓ Likh diya. ${example.party} par ab ${formatINR(example.newBalance)} baaki hain.`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
