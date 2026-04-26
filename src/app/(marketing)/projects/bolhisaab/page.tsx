import type { Metadata } from "next";
import Link from "next/link";

import { getProjectBySlug } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { OriginBlock } from "@/components/project/origin-block";
import { JsonLd } from "@/components/seo/json-ld";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("bolhisaab")!;

export const metadata: Metadata = buildMetadata({
  title: "BolHisaab — Voice-first Hindi ledger",
  description:
    "BolHisaab is a voice-first Hindi ledger for shopkeepers. Speak a transaction, watch the entry write itself. Whisper, Llama three, append-only Supabase.",
  path: "/projects/bolhisaab",
  ogImage: "/og/projects/bolhisaab.png",
  ogImageAlt: "BolHisaab — voice-first Hindi ledger for shopkeepers",
  ogType: "article",
  publishedTime: `${project.year}-10-15T00:00:00.000Z`,
  keywords: ["BolHisaab", "Voice", "Hindi", "Ledger", "Shopkeepers", "Whisper"],
});

export default function BolHisaabPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <JsonLd data={projectJsonLd("bolhisaab")} />
      <div className="brutalist-grid" aria-hidden />

      {/* MASTHEAD */}
      <header className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-6">
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Author
          </p>
          <p className="font-mono text-sm font-medium">{siteConfig.author}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Project
          </p>
          <p className="font-mono text-sm font-medium">02 / {project.name}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Status
          </p>
          <p className="font-mono text-sm font-medium text-[var(--color-primary)]">
            <span data-bh-mic-pulse className="mr-2 inline-block align-middle"></span>
            {project.statusLabel}
          </p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Navigate
          </p>
          <p className="font-mono text-sm font-medium">
            <Link href="/projects" className="hover:text-[var(--color-primary)]">
              ← projects
            </Link>
          </p>
        </div>
      </header>

      {/* § 01 — HEADLINE + PITCH */}
      <section className="mb-20 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>01</span>
            <span data-bh-section-label>Pitch</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-medium tracking-[-0.02em] text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.name}
          </h1>
          <p
            className="max-w-3xl text-2xl leading-snug font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.tagline}.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            {project.description}
          </p>

          {/* Interactive voice demo — hoisted above the fold so visitors
              experience the "speak a transaction, ledger writes itself"
              promise within seconds of landing. Cycles through four
              canonical Hinglish phrases on each tap (Ram credit, Shyam
              debit, Geeta saade-paanch credit, Mohan hazaar debit). The
              static § 06 mockup is intentionally retired — this client
              component replaces it. */}
          <div className="mt-2 max-w-xl">
            <BolHisaabVoiceDemo />
          </div>

          <blockquote
            data-bh-quote-card
            className="mt-2 max-w-2xl text-xl leading-snug text-[var(--color-fg)] italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;Ram ne 500 udhaar liya.&rdquo;
            <span className="mt-2 block text-sm text-[var(--color-muted)] not-italic">
              — and the ledger writes itself.
            </span>
          </blockquote>
        </div>
      </section>

      {/* § 02 — ACCESS */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>02</span>
            <span data-bh-section-label>Access</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <li data-bh-app-card>
              <div className="flex items-center gap-3">
                <span data-bh-icon-badge aria-hidden>
                  🛒
                </span>
                <p className="text-[13px] font-semibold tracking-[0] text-[var(--color-primary)]">
                  Production
                </p>
              </div>
              <p className="mt-4 text-lg font-medium text-[var(--color-muted)]">
                bolhisaab.in — coming soon
              </p>
              <p className="mt-2 text-xs text-[var(--color-muted)]">
                Domain registered · deploy pending
              </p>
            </li>
            <li data-bh-app-card>
              <div className="flex items-center gap-3">
                <span data-bh-icon-badge aria-hidden>
                  🐙
                </span>
                <p className="text-[13px] font-semibold tracking-[0] text-[var(--color-primary)]">
                  Source
                </p>
              </div>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-baseline gap-2 font-mono text-lg font-medium hover:text-[var(--color-primary)]"
              >
                github.com/aliarbab2009/BolHisaab <span aria-hidden>↗</span>
              </Link>
              <p className="mt-2 text-xs text-[var(--color-muted)]">
                Next 16 · Supabase · Sarvam · Groq Llama 3.1 / 3.3
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* § 03 — STACK */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>03</span>
            <span data-bh-section-label>Stack</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} data-bh-stack-pill>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* § 04 — ORIGIN (problem · why me · learned + pull-quote) */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>04</span>
            <span data-bh-section-label>Origin</span>
          </div>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div data-bh-app-card style={{ padding: "32px" }}>
            <OriginBlock slug="bolhisaab" />
          </div>
        </div>
      </section>

      {/* § 05 — ARCHITECTURE */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>05</span>
            <span data-bh-section-label>Architecture</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            data-bh-section-heading
            className="text-[clamp(1.75rem,3vw,2.75rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four sequential calls collapsed into one.{" "}
            <span data-bh-credit-text>~500–800ms saved.</span>
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The hot path is a single endpoint,{" "}
            <code className="font-mono text-sm">POST /api/voice</code>. It collapses what used to be
            four sequential calls (
            <code className="font-mono text-sm">/transcribe → /parse → handleIntent → commit</code>)
            into one round trip — saving{" "}
            <span data-bh-credit-text className="font-medium">
              ~500–800ms
            </span>{" "}
            end-to-end. The route accepts either a pre-computed transcript (from the browser&apos;s
            Web Speech API) or an audio blob (from MediaRecorder), then runs STT → Llama parse →
            party resolution → confidence-gated auto-commit in a single Vercel function.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Speech-to-text is a three-tier auto-select decided at mount time:{" "}
            <strong className="font-medium">Sarvam Saarika v2</strong> when the API key is set
            (flagship Indian-language ASR, far stronger than generic Whisper on Hinglish + Indian
            numerals), <strong className="font-medium">browser Web Speech</strong> on Chrome
            (streaming, free, audio never leaves device — saves ~400ms vs an upload round trip),{" "}
            <strong className="font-medium">Groq Whisper-large-v3-turbo</strong> as the floor for
            non-Chrome browsers, with a Devanagari prompt that biases the decoder toward shopkeeper
            vocabulary. After STT, a <code className="font-mono text-sm">dedupeRepeats()</code>{" "}
            helper collapses Whisper&apos;s known double-utterance hallucination before the LLM sees
            the text.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Intent parsing is two-tier.{" "}
            <strong className="font-medium">Llama 3.1 8B-instant</strong> is the primary at{" "}
            <code className="font-mono text-sm">temperature: 0</code>,{" "}
            <code className="font-mono text-sm">max_tokens: 400</code>,{" "}
            <code className="font-mono text-sm">{`response_format: { type: "json_object" }`}</code>{" "}
            — returns in ~200ms. <strong className="font-medium">Llama 3.3 70B-versatile</strong> is
            the fallback (~800ms), reached only when 8B JSON cannot be parsed even after a regex
            extraction pass. <code className="font-mono text-sm">gpt-oss-120b</code> was explicitly
            rejected as primary — it failed Groq&apos;s strict{" "}
            <code className="font-mono text-sm">json_object</code> validator ~80% of the time,
            doubling effective latency to ~1800ms once the fallback kicked in.{" "}
            <strong className="font-medium">Smaller + tolerant beat bigger + brittle.</strong>
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The parser sits behind a 200-entry in-memory LRU keyed by transcript + context hash;
            only complete intents are cached. Defense-in-depth against malformed LLM JSON runs in{" "}
            <strong className="font-medium">five layers</strong>: JSON mode at the API boundary, a
            regex extractor for stray prose, a hand-written{" "}
            <code className="font-mono text-sm">normalize()</code> that fills missing keys with{" "}
            <code className="font-mono text-sm">null</code> and coerces enums, Zod parse, and a 70B
            fallback retry. If everything still fails, the route returns a hard-coded{" "}
            <code className="font-mono text-sm">UNKNOWN</code> so the user always gets some spoken
            response.
          </p>
        </div>
      </section>

      {/* § 06 — VOICE PIPELINE */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>06</span>
            <span data-bh-section-label>Voice</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            data-bh-section-heading
            className="text-[clamp(1.75rem,3vw,2.75rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            An 8-state machine that knows when Chrome is lying.
          </h2>

          {/* Note: the static visual mockup that used to live here was
              replaced by <BolHisaabVoiceDemo /> hoisted above the fold in
              § 01. Visitors now interact with the eight-state pipeline
              live before they reach this section's prose, so the section
              focuses purely on the architectural narrative. */}

          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The client is a flat 8-state machine, stored in Zustand:
          </p>
          <pre data-bh-code-block>
            {`idle → recording → transcribing → parsing → confirming → executing → done | error`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Status drives every visible piece of chrome — the Hinglish status pill above the mic
            (&ldquo;Sun raha hoon… (stop ke liye dabayein)&rdquo;, &ldquo;Soch raha hoon…&rdquo;,
            &ldquo;Likh raha hoon…&rdquo;), the pulsing dot in the header, and the confirmation
            sheet. The store deliberately does not cache server data — that lives in TanStack Query
            (15s <code className="font-mono text-sm">staleTime</code>, refetch on focus). Voice
            state is per-turn and ephemeral; ledger state is shared and live.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Capture is push-to-stop (one tap to start, one tap to end) — not push-to-talk and not
            auto-stop on silence. Auto-stop kept truncating natural pauses mid-sentence (&ldquo;Ram
            ne… [pause] paanch sau udhaar liya&rdquo; became just &ldquo;Ram ne&rdquo;). Web Speech
            runs <code className="font-mono text-sm">continuous: true</code> with a{" "}
            <code className="font-mono text-sm">finalRef</code> and{" "}
            <code className="font-mono text-sm">endedRef</code> that ride through Chrome&apos;s
            three end-conditions (silence, user-stop, error) without hanging the UI. MediaRecorder
            uses 16 kHz mono with echo-cancellation/noise-suppression/AGC and a{" "}
            <code className="font-mono text-sm">MIN_DURATION_MS = 500</code> guard because Whisper
            hallucinates Hindi nonsense on sub-half-second clips.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Two cross-platform shims earn their keep. iOS Safari requires a user gesture to unlock
            audio playback — <code className="font-mono text-sm">primeTTS()</code> speaks an empty
            utterance at volume 0 on the first mic tap to unlock both{" "}
            <code className="font-mono text-sm">speechSynthesis</code> and the{" "}
            <code className="font-mono text-sm">&lt;Audio&gt;</code> element. MediaRecorder labels
            webm blobs as <code className="font-mono text-sm">audio/webm;codecs=opus</code>, but
            Sarvam&apos;s validator only accepts the bare{" "}
            <code className="font-mono text-sm">audio/webm</code> — so the server strips the{" "}
            <code className="font-mono text-sm">;codecs=...</code> suffix and re-wraps the blob as a
            fresh File before sending. A separate{" "}
            <code className="font-mono text-sm">{`<PrewarmVoice />`}</code> component fires a
            fire-and-forget POST on app mount — empty FormData hits the 400 early-return inside the
            handler but still forces Turbopack to compile the heavy voice route end-to-end before
            the user&apos;s first real press. The &ldquo;first request is slow&rdquo; cliff vanishes
            during demos.
          </p>
        </div>
      </section>

      {/* § 07 — INTENT PARSER + HINGLISH */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>07</span>
            <span data-bh-section-label>Intent</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            data-bh-section-heading
            className="text-[clamp(1.75rem,3vw,2.75rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Indian numerals as deterministic mappings, not LLM arithmetic.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The system prompt is the single biggest accuracy lever in the app. It was trimmed from
            ~2000 tokens to ~600 because every input token costs roughly 1ms on Llama 8B-instant. It
            teaches the model Hindi credit/debit polarity, Indian number words as deterministic
            mappings, payment-mode synonyms, honorific stripping, and a strict JSON schema with{" "}
            <code className="font-mono text-sm">null</code> (never omitted) for unknown fields:
          </p>
          <pre data-bh-code-block>
            {`You parse Hindi / Hinglish / English shopkeeper voice transcripts into JSON.
Output JSON ONLY — no prose, no markdown fences.

VOCAB:
- credit (shopkeeper GAVE udhaar): "udhaar liya/diya", "le gaya", "de diya"
- debit (shopkeeper RECEIVED): "diye/diya" (party subject), "chukaya",
  "vapas kiya", "paid", "mila/mile"
- Numbers: "sau"=100, "hazaar"=1000, "lakh"=100000,
  "dhai sau"=250, "sava sau"=125, "pauna sau"=75,
  "saade"+X = X+50 (e.g. saade paanch sau=550)
- Mode: "upi/gpay/phonepe/paytm/online/QR"→upi, "cash/nakad"→cash
- Honorifics: strip "bhai/ji/chacha/didi/uncle/aunty"

RULES:
- ALWAYS include every key from the schema. Use null (not omit) when
  unknown. This is mandatory.
- Input may be Devanagari (`}
            <span lang="hi">राम ने पाँच सौ उधार लिया</span>
            {`) or romanized.`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The Indian numerals table is the differentiator. Generic ASR keeps mis-hearing{" "}
            <em>dhai sau</em> as &ldquo;to son,&rdquo; <em>saade paanch sau</em> as &ldquo;say five
            hundred,&rdquo; <em>pauna sau</em> as scrambled English. Encoding them as deterministic
            numeric mappings inside the prompt — rather than asking the LLM to do arithmetic — turns
            idiomatic Hindi numbers into reliable resolutions.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Cross-script party matching is the most domain-specific code in the repo. Chrome&apos;s
            Web Speech API returns &ldquo;Ram&rdquo; sometimes and &ldquo;<span lang="hi">राम</span>
            &rdquo; other times for the same utterance. Without normalisation, every other
            transaction would create a duplicate party row. The phonetic key handles this in five
            passes: Devanagari → Latin transliteration via a hand-built ITRANS-style map; honorific
            stripping in both scripts (<code className="font-mono text-sm">bhai</code>,{" "}
            <code className="font-mono text-sm">chacha</code>,{" "}
            <code className="font-mono text-sm">didi</code>,{" "}
            <code className="font-mono text-sm" lang="hi">
              जी
            </code>
            ); spelling normalisation (<code className="font-mono text-sm">ph→f</code>,{" "}
            <code className="font-mono text-sm">th→t</code>); vowel folding (
            <code className="font-mono text-sm">[aeiou]+ → a</code>) and consonant deduplication;
            Levenshtein with two thresholds (0.85 auto-resolve, 0.6 disambiguation candidate).
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The <strong className="font-medium">0.85 auto-commit gate</strong> is the demo
            wow-moment. When the model returns confidence ≥ 0.85, the matched party already exists,
            and auto-commit isn&apos;t disabled, the route writes the transaction directly and the
            client just shows an Undo toast — no confirmation modal, no extra tap. Llama 8B-instant
            consistently reports 0.9+ on clean utterances, so most single-sentence commands are
            saved in one round trip. The Undo is what makes this safe: voiding is a soft delete that
            preserves the audit trail.
          </p>
        </div>
      </section>

      {/* § 08 — LEDGER */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>08</span>
            <span data-bh-section-label>Ledger</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            data-bh-section-heading
            className="text-[clamp(1.75rem,3vw,2.75rem)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Append-only by construction. One RPC, one round trip.
          </h2>

          {/* After-commit confirmation card mockup — what a shopkeeper
              sees the instant the 0.85 confidence gate auto-writes a
              voice transaction. Counter-party "Ram", credit polarity
              shown in --color-credit (emerald), new running balance in
              indigo (--color-primary), Undo + Saved indicators. The
              "Ram ne 500 udhaar liya" pull-quote from § 01 made
              concrete. */}
          <div
            aria-label="BolHisaab post-commit confirmation card mockup"
            data-bh-app-card
            className="flex w-full max-w-[340px] flex-col gap-4 rounded-2xl shadow-lg"
            style={{ padding: "20px 22px" }}
          >
            {/* Counter-party row */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-[var(--color-primary-fg)]"
                style={{
                  background: "var(--color-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                R
              </span>
              <p
                className="text-base font-medium text-[var(--color-fg)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ram
              </p>
            </div>

            {/* Big amount in credit (emerald) */}
            <p
              data-bh-credit-text
              className="text-[32px] leading-none font-bold tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ₹500
            </p>

            {/* Direction label */}
            <p
              className="-mt-2 text-sm text-[var(--color-muted)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              udhaar liya
            </p>

            {/* New running balance */}
            <p
              className="text-sm font-medium text-[var(--color-primary)] tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Naya baaki: ₹1,200
            </p>

            {/* Undo + Saved row */}
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
              <button
                type="button"
                tabIndex={-1}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-sm font-medium text-[var(--color-fg)] hover:border-[var(--color-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 7v6h6" />
                  <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
                </svg>
                <span>Undo</span>
              </button>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium tabular-nums"
                style={{
                  color: "var(--color-credit)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span>Saved</span>
              </span>
            </div>
          </div>

          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The ledger is <strong className="font-medium">append-only with soft delete</strong>. The{" "}
            <code className="font-mono text-sm">transactions</code> table is the source of truth;
            balances come from a <code className="font-mono text-sm">party_balances</code> SQL view;
            reversals set <code className="font-mono text-sm">voided_at</code> (and{" "}
            <code className="font-mono text-sm">voided_reason</code>) instead of deleting rows.
            Every read filters <code className="font-mono text-sm">voided_at IS NULL</code>. Once a
            transaction is in, it&apos;s there forever — even when voided — which is the right
            posture for an accounting product where dispute-resolution and audit matter more than
            storage.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Every voice-originated row also stores its{" "}
            <code className="font-mono text-sm">voice_transcript</code> (raw shopkeeper utterance)
            and <code className="font-mono text-sm">parsed_intent</code> (full LLM JSON) as JSONB
            columns. Two reasons: forensics (&ldquo;wait, what did Ram actually say?&rdquo; is a
            real question users ask weeks later) and a corpus for re-training prompts when the model
            behaviour drifts.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Writes flow through <code className="font-mono text-sm">commit_voice_tx</code>, a{" "}
            <code className="font-mono text-sm">security invoker</code> PL/pgSQL function that runs
            as the calling user so RLS still applies:
          </p>
          <pre data-bh-code-block>
            {`create or replace function commit_voice_tx(
  _shop_id uuid, _party_id uuid, _amount numeric,
  _direction text, _mode text,
  _voice_transcript text, _parsed_intent jsonb
) returns table(tx_id uuid, new_balance numeric)
language plpgsql security invoker as $$
  -- insert + balance read in one round-trip; ~150ms saved per turn
  -- against the Singapore region's RTT from India.
$$;`}
          </pre>
          <p className="text-sm leading-relaxed text-[var(--color-muted)]">
            <span data-bh-credit-text className="font-medium">
              ~150ms saved per turn
            </span>{" "}
            by collapsing the insert + balance-read into one PL/pgSQL round-trip — measured against
            Supabase&apos;s Singapore region from typical Indian connections.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Authentication is a deliberate UX choice:{" "}
            <strong className="font-medium">anonymous Supabase auth</strong> with no email, phone,
            or OTP. The user types a shop name and is in. Identity is{" "}
            <code className="font-mono text-sm">auth.uid() ↔ shops.owner_id</code>, and every row is
            scoped by RLS. Currency rendering uses Indian numbering throughout (
            <code className="font-mono text-sm">₹1,23,456</code> via{" "}
            <code className="font-mono text-sm">{`Intl.NumberFormat("en-IN")`}</code>). Color
            semantics are domain-named: <code className="font-mono text-sm">--credit</code>{" "}
            (emerald) and <code className="font-mono text-sm">--debit</code> (rose) live as design
            tokens, not generic UI sugar — the design vocabulary mirrors the ledger vocabulary.
          </p>
        </div>
      </section>

      {/* § 09 — POLISH */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>09</span>
            <span data-bh-section-label>Polish</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                "Domain-named CSS tokens",
                "--credit and --debit are first-class design tokens, not utility classes. The Badge primitive has dedicated credit/debit variants. Naming the token after the meaning, not the color, lets a future redesign rebalance one without breaking the other.",
              ],
              [
                "iOS focus-zoom defeated",
                "Every <input> uses text-base (16px) so Safari doesn't auto-zoom on focus. Mobile-first hygiene most projects skip.",
              ],
              [
                "Hand-rolled bottom sheet (no Radix)",
                "~50 lines on top of Framer Motion's motion.div + AnimatePresence, with backdrop click-to-close, body scroll lock, ESC handler, and pb-[env(safe-area-inset-bottom)] for the iOS home-indicator. The comment in the file: 'No Radix; self-contained overlay + slide panel.'",
              ],
              [
                "Translator defeat",
                "Chrome's auto-translate sees Hinglish and tries to 'fix' it client-side, breaking React hydration on every nav. Triple-belt fix: <html lang='hi' translate='no'>, notranslate class, metadata.other.google = 'notranslate', plus suppressHydrationWarning. Hard-earned bug, specific to Indic-language products.",
              ],
              [
                "Online/offline as useSyncExternalStore",
                "OfflineBanner uses the React 18 textbook pattern with custom subscribe/getSnapshot/getServerSnapshot. SSR-safe, no flash-of-banner-on-hydrate.",
              ],
              [
                "PrewarmVoice route compilation",
                "A 12-line client component fires a useless POST to /api/voice on mount so Turbopack compiles the heavy route before the user records anything. Empty FormData hits the 400 early-return but still forces full-route compilation.",
              ],
            ].map(([title, body]) => (
              <li key={title} data-bh-app-card>
                <p className="text-[13px] font-semibold tracking-[0] text-[var(--color-primary)]">
                  {title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]">{body}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-prose text-sm leading-relaxed text-[var(--color-muted)]">
            A non-trivial slice of the engineering went into 27 documented gotchas — bugs already
            debugged so a future contributor doesn&apos;t rediscover them. Examples: Llama 8B&apos;s
            tendency to drop keys instead of returning <code className="font-mono">null</code>;
            MediaRecorder MIME rejection by Sarvam&apos;s validator; Whisper&apos;s noisy-input
            self-repeat; Chrome speech-recognition&apos;s auto-end race with user-stop.
          </p>
        </div>
      </section>

      {/* § 10 — LIMITATIONS */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>10</span>
            <span data-bh-section-label>Honest limits</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-3 md:col-span-10">
          <ul className="ml-6 max-w-prose list-disc space-y-3 text-base leading-relaxed text-[var(--color-fg)]">
            <li>
              <strong className="font-medium">No application-level rate limiting.</strong>{" "}
              <code className="font-mono text-sm">/api/parse</code>,{" "}
              <code className="font-mono text-sm">/api/transcribe</code>, and{" "}
              <code className="font-mono text-sm">/api/tts</code> accept any caller. Implicit limits
              exist (Vercel <code className="font-mono text-sm">maxDuration</code>, Groq TPM/RPM,
              Sarvam quota) but no app-level token bucket.
            </li>
            <li>
              <strong className="font-medium">Voice transcripts persisted indefinitely.</strong>{" "}
              Every commit writes <code className="font-mono text-sm">voice_transcript</code> +{" "}
              <code className="font-mono text-sm">parsed_intent</code> to Postgres for forensics and
              audit. Intentional, but a real production deployment would need a
              right-to-be-forgotten hook.
            </li>
            <li>
              <strong className="font-medium">No CSRF tokens.</strong> Routes accept multipart
              form-data with cookie-based session. Real exploitation risk is low, but it&apos;s a
              missing layer worth flagging.
            </li>
            <li>
              <strong className="font-medium">
                Anonymous-auth means cookie clear = orphaned ledger.
              </strong>{" "}
              No phone/email recovery path. Trade-off taken explicitly to remove onboarding friction
              for the target user.
            </li>
            <li>
              <strong className="font-medium">Push-to-stop, not VAD.</strong> True hands-free with
              voice-activity detection was deferred — the current tap-to-stop is reliable but still
              requires one tap.
            </li>
          </ul>
        </div>
      </section>

      {/* § 11 — NUMBERS */}
      <section className="grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 md:col-span-2">
          <div data-bh-section-header>
            <span data-bh-section-badge>11</span>
            <span data-bh-section-label>Numbers</span>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          {/* BalanceStrip mockup — the BolHisaab home-screen pattern made
              concrete. Big indigo running balance, two smaller lines
              underneath for credit-receivable ("Aapko milna hai") in
              emerald and debit-payable ("Aapko dena hai") in rose.
              Domain semantics on display: --color-credit + --color-debit
              are first-class tokens, not utility colors. */}
          <div
            aria-label="BolHisaab home balance strip mockup"
            data-bh-app-card
            className="flex flex-col gap-3 rounded-2xl shadow-md"
            style={{ padding: "20px 24px" }}
          >
            <p
              className="text-xs font-medium tracking-wide text-[var(--color-muted)] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Aaj ka kaarobaar (Today&apos;s business)
            </p>
            <p
              className="text-[clamp(2.5rem,5vw,3.5rem)] leading-none font-bold text-[var(--color-primary)] tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ₹4,52,683
            </p>
            <div className="mt-1 flex flex-wrap gap-x-8 gap-y-2">
              <p
                className="flex items-baseline gap-2 text-sm"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--color-muted)]">Aapko milna hai:</span>
                <span data-bh-credit-text className="font-semibold tabular-nums">
                  ₹1,23,500
                </span>
              </p>
              <p
                className="flex items-baseline gap-2 text-sm"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[var(--color-muted)]">Aapko dena hai:</span>
                <span data-bh-debit-text className="font-semibold tabular-nums">
                  ₹84,200
                </span>
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(
              [
                ["~200ms", "Llama 8B intent parse", null],
                ["~150ms", "saved per turn by RPC", "credit"],
                ["~500–800ms", "saved end-to-end", "credit"],
                ["0.85", "auto-commit threshold", null],
                ["200", "LRU intent-cache entries", null],
                ["3 + 2", "ASR backends + LLM tiers", null],
                ["5", "JSON-defense layers", null],
                ["88px", "mic FAB diameter", null],
                ["500ms", "min recording duration", null],
                ["63M", "Indian shopkeepers (TAM)", null],
                ["27", "documented gotchas fixed", null],
                ["8", "voice-state machine states", null],
              ] as Array<[string, string, "credit" | "debit" | null]>
            ).map(([num, label, semantic]) => (
              <li key={label} data-bh-stat-tile>
                <p
                  className="text-2xl font-medium text-[var(--color-primary)] tabular-nums"
                  {...(semantic === "credit"
                    ? { "data-bh-credit-text": "" }
                    : semantic === "debit"
                      ? { "data-bh-debit-text": "" }
                      : {})}
                >
                  {num}
                </p>
                <p className="mt-2 text-xs leading-snug text-[var(--color-muted)]">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
