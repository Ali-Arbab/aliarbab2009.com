"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

/**
 * <MaglockMaggyVoice /> — ports the Flutter app's MaggyVoiceWidget
 * (lib/widgets/maggy_voice_widget.dart) to a React TSX component.
 * Standalone client mockup — no real STT/TTS, no network.
 *
 * The Flutter widget is a Hinglish AI voice assistant for the smart
 * lock. The portfolio version cycles through canned exchanges so a
 * visitor can press the mic and watch the round-trip animation:
 *
 *   1. Press mic → state goes "listening", waveform animates
 *   2. After ~1.4s → state goes "thinking", spinner replaces FAB
 *   3. After ~600ms → state goes "speaking", Maggy bubble appears,
 *      typewriter-prints the response, optional action chip below
 *   4. After ~1.6s → state returns to "idle"; next press cycles to
 *      the next canned exchange.
 *
 * Visual layout, top to bottom:
 *   - Header row: pulse status dot, "MAGGY" Orbitron wordmark, memory
 *     pill (notes count + episodes count in VT323), expand chevron
 *   - Hairline cyan rule
 *   - Conversation area (240px tall, scrollable): chat bubble stream,
 *     user bubbles right-aligned cyan-tinted, Maggy bubbles left-
 *     aligned dark surface. Optional action chip with lock icon
 *     under any Maggy message that has `action` set.
 *   - Waveform area (50px, only while listening || speaking || we
 *     have currentWords): 24 vertical bars
 *   - Control bar: tiny stop-TTS chip when speaking, circular mic
 *     FAB centered, "TYPE" pill on the right (placeholder, not wired
 *     to a real text input here)
 *
 * Reduced-motion: status dot doesn't pulse, waveform freezes, mic
 * FAB doesn't scale on press. The state machine still runs (the
 * canned exchanges still play), just without the visual flourish.
 */

const WAVEFORM_BARS = 24;
const WAVEFORM_TICK_MS = 80;

type MaggyState = "idle" | "listening" | "thinking" | "speaking" | "error";

type Message = {
  id: number;
  role: "user" | "maggy";
  text: string;
  /** Optional action chip beneath the message (e.g. "lock_front"). */
  action?: { kind: "lock" | "unlock" | "camera"; label: string };
};

type ScriptStep = {
  user: string;
  maggy: string;
  action?: Message["action"];
};

const SCRIPT: ScriptStep[] = [
  {
    user: "Maggy, lock the front door",
    maggy: "Theek hai, locking the front door now.",
    action: { kind: "lock", label: "lock_front" },
  },
  {
    user: "Kaun aaya tha aaj?",
    maggy: "Front door unlocked at 14:23, locked at 14:25. Kissi aur ne entry nahi maari.",
  },
  {
    user: "Camera off karo",
    maggy: "Camera turned off. Live feed ab paused hai.",
    action: { kind: "camera", label: "cam_off" },
  },
  {
    user: "Status batao",
    maggy: "Dono doors locked. WiFi connected. Battery 87%.",
  },
];

type State = {
  state: MaggyState;
  messages: Message[];
  msgCounter: number;
  /** Index of the next SCRIPT step to play. */
  scriptIdx: number;
  /** Live transcript shown under the waveform while listening/thinking. */
  partial: string;
  /** Typewriter progress for the current Maggy reply (chars revealed). */
  typedChars: number;
  /** Per-bar amplitudes for the waveform [0..1]. */
  waveform: number[];
  /** Memory counts shown in the header pill (decorative). */
  memoryNotes: number;
  memoryEpisodes: number;
};

type Action =
  | { type: "BEGIN_LISTEN" }
  | { type: "TICK_TRANSCRIPT"; text: string }
  | { type: "BEGIN_THINK" }
  | { type: "BEGIN_SPEAK"; reply: string; action?: Message["action"] }
  | { type: "TICK_TYPE" }
  | { type: "FINISH_SPEAK" }
  | { type: "TICK_WAVEFORM"; values: number[] }
  | { type: "RESET" };

const INITIAL_STATE: State = {
  state: "idle",
  messages: [],
  msgCounter: 0,
  scriptIdx: 0,
  partial: "",
  typedChars: 0,
  waveform: new Array(WAVEFORM_BARS).fill(0),
  memoryNotes: 12,
  memoryEpisodes: 47,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "BEGIN_LISTEN": {
      const step = SCRIPT[state.scriptIdx % SCRIPT.length]!;
      return {
        ...state,
        state: "listening",
        partial: "",
        messages: [...state.messages, { id: state.msgCounter + 1, role: "user", text: step.user }],
        msgCounter: state.msgCounter + 1,
      };
    }
    case "TICK_TRANSCRIPT":
      return { ...state, partial: action.text };
    case "BEGIN_THINK":
      return { ...state, state: "thinking", partial: "…" };
    case "BEGIN_SPEAK": {
      return {
        ...state,
        state: "speaking",
        partial: "",
        typedChars: 0,
        messages: [
          ...state.messages,
          {
            id: state.msgCounter + 1,
            role: "maggy",
            text: action.reply,
            action: action.action,
          },
        ],
        msgCounter: state.msgCounter + 1,
        memoryNotes: state.memoryNotes + 1,
      };
    }
    case "TICK_TYPE":
      return { ...state, typedChars: state.typedChars + 1 };
    case "FINISH_SPEAK":
      return {
        ...state,
        state: "idle",
        typedChars: 0,
        scriptIdx: state.scriptIdx + 1,
        memoryEpisodes: state.memoryEpisodes + 1,
      };
    case "TICK_WAVEFORM":
      return { ...state, waveform: action.values };
    case "RESET":
      return INITIAL_STATE;
  }
}

function makeWaveformValues(
  activity: "listening" | "speaking" | "decay",
  prev: number[],
): number[] {
  return prev.map((v) => {
    if (activity === "decay") return v * 0.8;
    // listening + speaking both produce live amplitudes; speaking is calmer.
    const base = activity === "listening" ? 0.2 + Math.random() * 0.8 : 0.15 + Math.random() * 0.5;
    return Math.max(0, Math.min(1, v * 0.4 + base * 0.6));
  });
}

export function MaglockMaggyVoice() {
  const [s, dispatch] = useReducer(reducer, INITIAL_STATE);
  const reducedMotionRef = useRef(false);
  const mountedRef = useRef(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    if (typeof window !== "undefined") {
      reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Auto-scroll the conversation when messages change.
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reducedMotionRef.current ? "auto" : "smooth",
    });
  }, [s.messages.length]);

  // Waveform ticker — runs only while listening / speaking; otherwise
  // decays to zero.
  useEffect(() => {
    const active = s.state === "listening" || s.state === "speaking";
    if (reducedMotionRef.current) return;
    if (!active && s.waveform.every((v) => v < 0.01)) return;
    const id = window.setInterval(() => {
      if (!mountedRef.current) return;
      const next = makeWaveformValues(
        active ? (s.state as "listening" | "speaking") : "decay",
        s.waveform,
      );
      dispatch({ type: "TICK_WAVEFORM", values: next });
    }, WAVEFORM_TICK_MS);
    return () => window.clearInterval(id);
  }, [s.state, s.waveform]);

  // State-machine driver — when state changes, queue the next phase.
  useEffect(() => {
    if (s.state === "listening") {
      const step = SCRIPT[s.scriptIdx % SCRIPT.length]!;
      // Type out the user's "transcript" 1 char at a time over ~1.4s.
      const total = step.user.length;
      const intervalMs = Math.max(20, 1400 / Math.max(1, total));
      let i = 0;
      const id = window.setInterval(() => {
        if (!mountedRef.current) return;
        i += 1;
        dispatch({ type: "TICK_TRANSCRIPT", text: step.user.slice(0, i) });
        if (i >= total) {
          window.clearInterval(id);
          window.setTimeout(() => {
            if (!mountedRef.current) return;
            dispatch({ type: "BEGIN_THINK" });
          }, 220);
        }
      }, intervalMs);
      return () => window.clearInterval(id);
    }
    if (s.state === "thinking") {
      const t = window.setTimeout(() => {
        if (!mountedRef.current) return;
        const step = SCRIPT[s.scriptIdx % SCRIPT.length]!;
        dispatch({ type: "BEGIN_SPEAK", reply: step.maggy, action: step.action });
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [s.state, s.scriptIdx]);

  // Typewriter ticker for Maggy's reply.
  useEffect(() => {
    if (s.state !== "speaking") return;
    const lastMsg = s.messages[s.messages.length - 1];
    if (!lastMsg || lastMsg.role !== "maggy") return;
    const total = lastMsg.text.length;
    if (s.typedChars >= total) {
      const t = window.setTimeout(() => {
        if (!mountedRef.current) return;
        dispatch({ type: "FINISH_SPEAK" });
      }, 900);
      return () => window.clearTimeout(t);
    }
    const id = window.setTimeout(() => {
      if (!mountedRef.current) return;
      dispatch({ type: "TICK_TYPE" });
    }, 28);
    return () => window.clearTimeout(id);
  }, [s.state, s.typedChars, s.messages]);

  const onMicPress = useCallback(() => {
    if (s.state !== "idle") return;
    dispatch({ type: "BEGIN_LISTEN" });
  }, [s.state]);

  const onStopTts = useCallback(() => {
    if (s.state === "speaking") dispatch({ type: "FINISH_SPEAK" });
  }, [s.state]);

  return (
    <div
      data-maglock-maggy
      className="flex w-full max-w-xl flex-col"
      style={{
        border: "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)",
        borderRadius: "20px",
        boxShadow: "0 0 22px color-mix(in srgb, var(--color-secondary) 22%, transparent)",
        background: "var(--color-surface)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <Header state={s.state} notes={s.memoryNotes} episodes={s.memoryEpisodes} />

      {/* CONVERSATION */}
      <div
        ref={scrollRef}
        className="flex flex-col gap-2 overflow-y-auto px-3 py-3"
        style={{
          height: "240px",
          borderTop: "1px solid color-mix(in srgb, var(--color-secondary) 14%, transparent)",
        }}
        aria-live="polite"
        aria-label="Maggy conversation"
      >
        {s.messages.length === 0 ? (
          <EmptyState />
        ) : (
          s.messages.map((m) => (
            <Bubble
              key={m.id}
              role={m.role}
              text={
                m.role === "maggy" &&
                m.id === s.messages[s.messages.length - 1]?.id &&
                s.state === "speaking"
                  ? m.text.slice(0, s.typedChars)
                  : m.text
              }
              action={m.action}
              isStreaming={
                m.role === "maggy" &&
                m.id === s.messages[s.messages.length - 1]?.id &&
                s.state === "speaking"
              }
            />
          ))
        )}
      </div>

      {/* WAVEFORM (conditional) */}
      {(s.state === "listening" || s.state === "speaking" || s.partial) && (
        <Waveform values={s.waveform} partial={s.partial} state={s.state} />
      )}

      {/* CONTROL BAR */}
      <div
        className="flex items-center gap-3 border-t px-3 py-3"
        style={{
          borderTopColor: "color-mix(in srgb, var(--color-secondary) 14%, transparent)",
        }}
      >
        {s.state === "speaking" ? (
          <button
            type="button"
            onClick={onStopTts}
            className="inline-flex items-center gap-1.5 px-3 py-1.5"
            style={{
              fontFamily: "var(--font-orbitron), var(--font-display)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid var(--color-danger)",
              background: "color-mix(in srgb, var(--color-danger) 12%, transparent)",
              color: "var(--color-danger)",
              borderRadius: "999px",
              cursor: "pointer",
            }}
          >
            ■ Stop
          </button>
        ) : (
          <span aria-hidden style={{ width: "62px" }} />
        )}

        <span className="ml-auto" />

        <MicFab state={s.state} onPress={onMicPress} reducedMotion={reducedMotionRef.current} />

        <span className="ml-auto" />

        <button
          type="button"
          aria-label="Type instead (placeholder)"
          disabled
          className="inline-flex items-center gap-1.5 px-3 py-1.5"
          style={{
            fontFamily: "var(--font-orbitron), var(--font-display)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            border: "1px solid var(--color-border)",
            background: "transparent",
            color: "var(--color-muted)",
            borderRadius: "999px",
            cursor: "not-allowed",
          }}
        >
          Type
        </button>
      </div>
    </div>
  );
}

/* ─────────────────── Sub-components ─────────────────── */

function Header({
  state,
  notes,
  episodes,
}: {
  state: MaggyState;
  notes: number;
  episodes: number;
}) {
  const dotColor = STATE_COLOR[state];
  return (
    <div className="flex items-center gap-2 px-3 py-3">
      <span
        data-maglock-pulse={state !== "idle" ? "" : undefined}
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: dotColor,
          boxShadow: state !== "idle" ? `0 0 8px ${dotColor}` : "none",
          transition: "background 240ms ease, box-shadow 240ms ease",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-orbitron), var(--font-display)",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.3em",
          color: "var(--color-secondary)",
          textTransform: "uppercase",
        }}
      >
        MAGGY
      </span>
      <span className="ml-auto inline-flex items-center gap-2">
        <MemoryPill icon="◇" value={notes} label="notes" />
        <MemoryPill icon="◈" value={episodes} label="episodes" />
      </span>
    </div>
  );
}

function MemoryPill({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <span
      title={label}
      className="inline-flex items-center gap-1 px-2 py-0.5"
      style={{
        fontFamily: "var(--font-vt323), var(--font-mono)",
        fontSize: "12px",
        letterSpacing: "0.05em",
        color: "var(--color-secondary)",
        border: "1px solid color-mix(in srgb, var(--color-secondary) 25%, transparent)",
        borderRadius: "999px",
      }}
    >
      <span aria-hidden>{icon}</span>
      {value}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-8">
      <p
        style={{
          fontFamily: "var(--font-rajdhani), var(--font-body)",
          fontSize: "14px",
          color: "var(--color-muted)",
          letterSpacing: "0.05em",
        }}
      >
        Tap the mic to ask Maggy something.
      </p>
      <p
        style={{
          fontFamily: "var(--font-vt323), var(--font-mono)",
          fontSize: "12px",
          color: "color-mix(in srgb, var(--color-muted) 70%, transparent)",
          letterSpacing: "0.05em",
          marginTop: "4px",
        }}
      >
        Try: &ldquo;Lock the front door.&rdquo;
      </p>
    </div>
  );
}

type BubbleProps = {
  role: "user" | "maggy";
  text: string;
  action?: Message["action"];
  isStreaming?: boolean;
};

function Bubble({ role, text, action, isStreaming }: BubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[80%] flex-col gap-1">
        <div
          style={{
            fontFamily: "var(--font-rajdhani), var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.4,
            padding: "8px 12px",
            background: isUser
              ? "color-mix(in srgb, var(--color-secondary) 18%, transparent)"
              : "color-mix(in srgb, var(--color-fg) 6%, transparent)",
            color: isUser ? "var(--color-secondary)" : "var(--color-fg)",
            border: isUser
              ? "1px solid color-mix(in srgb, var(--color-secondary) 35%, transparent)"
              : "1px solid color-mix(in srgb, var(--color-fg) 12%, transparent)",
            borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          }}
        >
          {text}
          {isStreaming && (
            <span aria-hidden style={{ opacity: 0.6 }}>
              ▌
            </span>
          )}
        </div>
        {action && <ActionChip kind={action.kind} label={action.label} />}
      </div>
    </div>
  );
}

function ActionChip({ kind, label }: { kind: "lock" | "unlock" | "camera"; label: string }) {
  const icon = kind === "camera" ? "○" : kind === "unlock" ? "◇" : "◆";
  return (
    <span
      className="inline-flex items-center gap-1.5 self-start px-2 py-0.5"
      style={{
        fontFamily: "var(--font-vt323), var(--font-mono)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        color: "var(--color-warning)",
        border: "1px solid color-mix(in srgb, var(--color-warning) 35%, transparent)",
        background: "color-mix(in srgb, var(--color-warning) 8%, transparent)",
        borderRadius: "999px",
      }}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

type WaveformProps = {
  values: number[];
  partial: string;
  state: MaggyState;
};

function Waveform({ values, partial, state }: WaveformProps) {
  return (
    <div
      className="flex flex-col items-center gap-1.5 px-3 py-2"
      style={{
        borderTop: "1px solid color-mix(in srgb, var(--color-secondary) 14%, transparent)",
        background: "color-mix(in srgb, var(--color-secondary) 4%, transparent)",
      }}
    >
      <div className="flex items-center gap-[2px]" style={{ height: "30px" }}>
        {values.map((v, i) => (
          <span
            key={i}
            aria-hidden
            style={{
              width: "3px",
              height: `${4 + v * 28}px`,
              background: state === "speaking" ? "var(--color-warning)" : "var(--color-secondary)",
              opacity: 0.5 + v * 0.5,
              borderRadius: "1px",
              transition: "height 80ms linear, opacity 80ms linear",
            }}
          />
        ))}
      </div>
      {partial && (
        <p
          style={{
            fontFamily: "var(--font-vt323), var(--font-mono)",
            fontSize: "12px",
            color: "var(--color-secondary)",
            letterSpacing: "0.05em",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {partial}
        </p>
      )}
    </div>
  );
}

type MicFabProps = {
  state: MaggyState;
  onPress: () => void;
  reducedMotion: boolean;
};

function MicFab({ state, onPress, reducedMotion }: MicFabProps) {
  const isListening = state === "listening";
  const isThinking = state === "thinking";
  const isSpeaking = state === "speaking";
  const size = isListening && !reducedMotion ? 72 : 64;
  const accent = isListening
    ? "var(--color-primary)"
    : isSpeaking
      ? "var(--color-warning)"
      : isThinking
        ? "var(--color-accent-purple, #C77DFF)"
        : "var(--color-secondary)";
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={state !== "idle"}
      aria-label={state === "idle" ? "Press to talk to Maggy" : `Maggy is ${state}`}
      className="inline-flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, ${accent} 80%, transparent), color-mix(in srgb, ${accent} 30%, transparent))`,
        border: `2px solid ${accent}`,
        boxShadow: isListening
          ? `0 0 24px 4px color-mix(in srgb, ${accent} 50%, transparent)`
          : `0 0 12px color-mix(in srgb, ${accent} 35%, transparent)`,
        cursor: state === "idle" ? "pointer" : "default",
        transition:
          "width 200ms ease, height 200ms ease, box-shadow 240ms ease, border-color 240ms ease, background 240ms ease",
      }}
    >
      {isThinking ? (
        <span
          aria-hidden
          className="inline-block animate-spin"
          style={{
            width: "22px",
            height: "22px",
            border: "2px solid var(--color-accent-purple, #C77DFF)",
            borderTopColor: "transparent",
            borderRadius: "50%",
          }}
        />
      ) : (
        <MicIcon
          style={{
            width: "26px",
            height: "26px",
            color: state === "idle" ? "var(--color-bg)" : "var(--color-bg)",
          }}
        />
      )}
    </button>
  );
}

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

const STATE_COLOR: Record<MaggyState, string> = {
  idle: "var(--color-secondary)",
  listening: "var(--color-primary)",
  thinking: "var(--color-accent-purple, #C77DFF)",
  speaking: "var(--color-warning)",
  error: "var(--color-danger)",
};
