import type { Metadata } from "next";
import Link from "next/link";

import { getProjectBySlug } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { OriginBlock } from "@/components/project/origin-block";
import { JsonLd } from "@/components/seo/json-ld";
import { projectJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/seo";

const project = getProjectBySlug("stocksaathi")!;

export const metadata: Metadata = buildMetadata({
  title: "StockSaathi — AI investment coach",
  description:
    "StockSaathi is a virtual rupee trading simulator with an AI coach trained on behavioral finance. Real-time data on 3,000+ BSE and NSE stocks.",
  path: "/projects/stocksaathi",
  ogImage: "/og/projects/stocksaathi.png",
  ogImageAlt: "StockSaathi — AI-coached investment simulator for Indian teens",
  ogType: "article",
  publishedTime: `${project.year}-09-01T00:00:00.000Z`,
  keywords: ["StockSaathi", "AI", "Investing", "Fintech", "Behavioral finance"],
});

export default function StockSaathiPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 pb-16 sm:pt-20">
      <JsonLd data={projectJsonLd("stocksaathi")} />
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
          <p className="font-mono text-sm font-medium">01 / {project.name}</p>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            Status
          </p>
          <p className="font-mono text-sm font-medium text-[var(--color-primary)]">
            ● {project.statusLabel}
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
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 01
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Pitch
          </p>
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
        </div>
      </section>

      {/* § 02 — ACCESS (deploy + source) */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 02
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Access
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-0 border-2 border-[var(--color-border)] md:grid-cols-2">
            <li className="border-b-2 border-[var(--color-border)] p-6 md:border-r-2 md:border-b-0">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Production
              </p>
              <Link
                href={project.liveUrl!}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-baseline gap-2 font-mono text-lg font-medium hover:text-[var(--color-primary)]"
              >
                stocksaathi.co.in <span aria-hidden>↗</span>
              </Link>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                Live at Vercel · 3,000+ BSE/NSE stocks
              </p>
            </li>
            <li className="p-6">
              <p className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                Source
              </p>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-baseline gap-2 font-mono text-lg font-medium hover:text-[var(--color-primary)]"
              >
                github.com/aliarbab2009/StockSaathi <span aria-hidden>↗</span>
              </Link>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                Vanilla ES Modules · Python · Supabase · Multi-provider LLM
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* § 03 — STACK */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 03
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Stack
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="flex flex-wrap gap-0">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="-mr-px -mb-px border border-[var(--color-border)] px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* § 04 — ORIGIN (problem · why me · learned + pull-quote) */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 04
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Origin
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <OriginBlock slug="stocksaathi" />
        </div>
      </section>

      {/* § 05 — ARCHITECTURE */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 05
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Architecture
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Four-tier failover, zero pip dependencies, all money in paise.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            A Cloudflare Worker bound to{" "}
            <code className="font-mono text-sm">stocksaathi.co.in/*</code> intercepts every request,
            tries Vercel first, falls back to a regional Fly.io origin on 5xx/timeout, and trips a
            KV-backed 30-second circuit breaker so a single failure doesn&apos;t cost every user a
            9-second retry. Two Edge JS handlers (
            <code className="font-mono text-sm">/api/chat</code>,{" "}
            <code className="font-mono text-sm">/api/ai</code>) are inline-bundled into the Worker
            so they keep responding even if Vercel and Fly are both down. A Cloudflare Pages
            deployment mirrors the static tree as the third fallback.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The Python serverless tier has{" "}
            <strong className="font-medium">zero pip dependencies</strong> — every endpoint is one{" "}
            <code className="font-mono text-sm">BaseHTTPRequestHandler</code> subclass per file,
            stdlib-only. Cold starts are correspondingly tiny because there is no{" "}
            <code className="font-mono text-sm">pip install</code> step. The Fly backup origin
            reuses these handlers unchanged via a 162-line FastAPI shim that imports each handler
            and replays the BHTRH protocol into a Starlette response. A pytest parity test fails CI
            if a new handler lands in <code className="font-mono text-sm">app/api/</code> without a
            matching route in the shim.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Every mutating write goes through one of 16{" "}
            <code className="font-mono text-sm">SECURITY DEFINER</code> PL/pgSQL RPCs. The client
            never executes raw <code className="font-mono text-sm">UPDATE portfolios</code> — the{" "}
            <code className="font-mono text-sm">apply_trade</code> RPC takes{" "}
            <code className="font-mono text-sm">auth.uid()</code> itself, takes a{" "}
            <code className="font-mono text-sm">FOR UPDATE</code> row lock, validates the trade,
            applies cash + holdings + transactions transactionally, and returns a JSON envelope.
            Idempotency keys are <code className="font-mono text-sm">UNIQUE(user_id, key)</code> so
            a network-retried POST short-circuits and returns{" "}
            <code className="font-mono text-sm">{`{ok:true, idempotent:true}`}</code> instead of
            double-spending.
          </p>
          <pre className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed">
            {`-- apply_trade locks the row, then conditionally updates only if cash suffices.
PERFORM 1 FROM public.portfolios WHERE user_id = v_user_id FOR UPDATE;
UPDATE public.portfolios
   SET cash_paise = cash_paise - v_value
 WHERE user_id = v_user_id AND cash_paise >= v_value;
IF NOT FOUND THEN RAISE EXCEPTION 'insufficient_cash'; END IF;`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Money is stored in <strong className="font-medium">integer paise</strong> (
            <code className="font-mono text-sm">bigint</code>) end-to-end so portfolio totals never
            drift via floating-point. <code className="font-mono text-sm">numeric(18,6)</code> is
            used only for fractional MF shares. Instrument fundamentals come through a 4-tier merge
            (Tickertape ships first because its dividend yield + P/E (TTM) are self-consistent and
            fresher than Yahoo&apos;s consumer-page-derived numbers; Yahoo v10 + v7 fill gaps; Yahoo
            v8/chart is anonymous last-resort), with a <code className="font-mono text-sm">+</code>
            -joined provenance string written to{" "}
            <code className="font-mono text-sm">fundamentals_cache.source</code> so data lineage
            survives the cache row.
          </p>
        </div>
      </section>

      {/* § 06 — AI COACH */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 06
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            AI coach
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Deterministic where stakes are high, generative where they aren&apos;t.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The coach is built around two tracks that never trade jobs.{" "}
            <strong className="font-medium">Track 1</strong> runs nine deterministic bias detectors
            against every BUY/SELL — panic-sell, FOMO, concentration, sector concentration,
            disposition effect (Shefrin &amp; Statman 1985), anchoring, churning, pump-chase,
            overtrading. Each detector is a pure function returning{" "}
            <code className="font-mono text-sm">{`{bias, severity, evidence} | null`}</code> with
            explicit numeric thresholds tuned against real NSE volatility (panic-sell fires at ≥5%
            drop over 3 sessions OR ≥3% intraday, on a holding &lt;21 days at &gt;2% loss). The
            orchestrator picks a pre-written reflection template, attaches a historical analog
            (&ldquo;In the last 12 dips of ≥10% on the Nifty, prices recovered to their prior high
            in a median of 22 trading days&rdquo;), and a warning level. The LLM is{" "}
            <em>optional flavour</em>.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            <strong className="font-medium">Track 2</strong> is the conversational chat surface
            (&ldquo;Saathi&rdquo;) — a tool-use loop with five OpenAI-compatible function tools
            executed in parallel via <code className="font-mono text-sm">Promise.all</code>, with
            tool responses capped at 4000 chars before re-feeding. The crypto tool bakes the warning
            into its own response (
            <em>
              note: &quot;India: crypto gains taxed at 30% + 1% TDS per trade since 2022&quot;
            </em>
            ) so the guardrail lands in the model&apos;s context regardless of whether the prompt
            remembers to ask for it.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The proxy at <code className="font-mono text-sm">/api/chat</code> is a multi-provider
            fallback chain — Gemini 2.5 Flash-Lite leads (the only Gemini model that&apos;s truly
            non-thinking in <code className="font-mono text-sm">json_object</code> mode), then
            Flash, then Pro, then Cerebras Llama 3.3 70B, then OpenAI. Vertex AI is preferred when{" "}
            <code className="font-mono text-sm">GEMINI_VERTEX_PROJECT</code> is set, with region
            pinned to <code className="font-mono text-sm">asia-south1</code> so latency stays low
            for Indian users and data stays in-region. Three independent layers of SEBI guardrails —
            pre-LLM regex, in-prompt rules, and a post-LLM scanner that checks{" "}
            <code className="font-mono text-sm">reflection</code>,{" "}
            <code className="font-mono text-sm">historical_context</code>, and{" "}
            <code className="font-mono text-sm">suggested_q</code> for 25 forbidden phrases.
          </p>
          <pre className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed">
            {`# SEBI-SAFE GUARDRAILS (ABSOLUTE)
- You can state a current price. That's public info.
- You CANNOT say: "should buy", "should sell", "recommend", "target price",
  "guaranteed", "sure shot", "will go up", "will crash".
- You CANNOT predict future prices, returns, or outcomes.
- If the user asks "should I buy/sell X?" → redirect to a reasoning framework
  (business health, valuation, drawdown tolerance, portfolio fit).
  Do not answer yes/no.`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Conversation memory is <strong className="font-medium">client-local IndexedDB</strong> —
            the <code className="font-mono text-sm">coach_messages</code> table tags every turn with{" "}
            <code className="font-mono text-sm">sessionId</code> and{" "}
            <code className="font-mono text-sm">surface</code>. A power user can paste their own
            Anthropic key in Settings, which routes their requests directly to{" "}
            <code className="font-mono text-sm">api.anthropic.com</code> with{" "}
            <code className="font-mono text-sm">
              anthropic-dangerous-direct-browser-access: true
            </code>{" "}
            — no chat data ever leaves their device.
          </p>
        </div>
      </section>

      {/* § 07 — TIME TRAVEL */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 07
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Time travel
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-medium tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The LLM picks the story. Yahoo data is the truth.
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Pick (or invent) a market crisis; watch a ₹1,00,000 portfolio split into a held line and
            a panic-sold-on-day-3 line over real historical closes. Three curated scenarios ship —
            COVID March 2020, GFC 2008, demonetisation 2016 — with educator-tone narration. Anything
            else routes through the custom-crash generator, a{" "}
            <strong className="font-medium">three-phase grounded pipeline</strong>:
          </p>
          <ol className="ml-6 max-w-prose list-decimal space-y-3 text-base leading-relaxed text-[var(--color-fg)]">
            <li>
              <strong className="font-medium">Phase A — pick dates and ticker.</strong> Gemini Flash
              with a colloquial-to-formal mapping table identifies any Indian market event from any
              phrasing: <em>&ldquo;the soap guy scam&rdquo;</em> → Nirav Modi / PNB,{" "}
              <em>&ldquo;demon&rdquo;</em> → demonetisation, <em>&ldquo;yes guy&rdquo;</em> → YES
              Bank moratorium, <em>&ldquo;the short seller thing&rdquo;</em> → Adani-Hindenburg.
            </li>
            <li>
              <strong className="font-medium">Phase B — fetch real historical data.</strong> No LLM.
              Yahoo via <code className="font-mono text-sm">/api/ai?op=history</code>. Primary
              symbol fires in parallel with up to three companion sector indices so Phase C can
              write relativity-aware narration.
            </li>
            <li>
              <strong className="font-medium">Phase C — narrate over real numbers.</strong> JSON
              output with title, key moments, recovery days. Every numeric field is then overwritten
              with the Yahoo-real value before persistence — the LLM&apos;s job is the story, the
              numbers are facts.
            </li>
          </ol>
          <pre className="overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-mono text-[11px] leading-relaxed">
            {`// Overwrite any hallucinated numbers with the REAL ones. The LLM's
// numbers are a sanity cross-check; the real-data numbers are truth.
meta.startIndex = Math.round(startIdx * 100) / 100;
meta.troughIndex = Math.round(troughIdx * 100) / 100;
meta.endIndex = Math.round(endIdx * 100) / 100;
meta.troughDay = troughDayIdx;
meta.indexDrop = Math.round(realDropPct * 10) / 10;`}
          </pre>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Scenarios are <strong className="font-medium">shareable across users by URL</strong>.
            The cache key is SHA-256 of an aggressively normalised prompt — split letter/digit runs,
            lowercase, non-alnum to spaces, tokenise, dedupe, sort, hash. So{" "}
            <em>&quot;Adani Hindenburg 2023&quot;</em>, <em>&quot;hindenburg 2023 adani&quot;</em>,
            and <em>&quot;AdaniHindenburg2023&quot;</em> collapse to one cache row, one shareable
            URL, one LLM cost amortised across every user who follows the link.
          </p>
        </div>
      </section>
    </div>
  );
}
