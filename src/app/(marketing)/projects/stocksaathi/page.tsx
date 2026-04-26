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
            <span data-ss-pulse-dot className="mr-2 inline-block align-middle"></span>
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
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 01</p>
          <p data-ss-section-label>Pitch</p>
        </div>
        <div className="col-span-12 flex flex-col gap-8 md:col-span-10">
          <h1
            className="text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] font-bold tracking-[-0.02em] text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-display)", fontFeatureSettings: '"ss01" 1' }}
          >
            {project.name}
          </h1>
          <p
            className="max-w-3xl text-2xl leading-snug font-semibold text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.tagline}.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            {project.description}
          </p>
          {/* Above-the-fold interactive product demo. The dual-line chart
              dramatises the marquee "intervention works" claim before the
              visitor scrolls — pick a crash, drag the panic-day slider,
              watch the cost of fear move in rupees. Single client boundary;
              everything else on the page stays server-rendered. */}
          <StockSaathiTimeTravel />
        </div>
      </section>

      {/* § 02 — ACCESS (deploy + source) */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 02</p>
          <p data-ss-section-label>Access</p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <li data-ss-rounded-card className="flex flex-col gap-3 px-6 py-6 sm:px-7">
              <div className="flex items-center gap-3">
                <span data-ss-icon-square aria-hidden>
                  ↗
                </span>
                <p data-ss-section-label>Production</p>
              </div>
              <Link
                href={project.liveUrl!}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-baseline gap-2 font-mono text-lg font-semibold text-[var(--color-fg)] hover:text-[var(--color-primary)]"
              >
                stocksaathi.co.in <span aria-hidden>↗</span>
              </Link>
              <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-2">
                  <span data-ss-pulse-dot className="inline-block align-middle"></span>
                  Live at Vercel
                </span>
                <span aria-hidden className="text-[var(--color-border)]">
                  ·
                </span>
                <span>3,000+ BSE/NSE stocks</span>
                <span data-ss-saffron-badge>India</span>
              </div>
            </li>
            <li data-ss-rounded-card className="flex flex-col gap-3 px-6 py-6 sm:px-7">
              <div className="flex items-center gap-3">
                <span data-ss-icon-square aria-hidden>
                  ⌥
                </span>
                <p data-ss-section-label>Source</p>
              </div>
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-baseline gap-2 font-mono text-lg font-semibold text-[var(--color-fg)] hover:text-[var(--color-primary)]"
              >
                github.com/aliarbab2009/StockSaathi <span aria-hidden>↗</span>
              </Link>
              <p className="text-[12px] text-[var(--color-muted)]">
                Vanilla ES Modules · Python · Supabase · Multi-provider LLM
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* § 03 — STACK */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 03</p>
          <p data-ss-section-label>Stack</p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} data-ss-pill>
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* § 04 — ORIGIN (problem · why me · learned + pull-quote) */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 04</p>
          <p data-ss-section-label>Origin</p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <div data-ss-rounded-card className="px-8 py-8 transition-colors">
            <OriginBlock slug="stocksaathi" />
          </div>
        </div>
      </section>

      {/* § 05 — ARCHITECTURE */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 05</p>
          <p data-ss-section-label>Architecture</p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-bold tracking-tight"
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
          <pre data-ss-code className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
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
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 06</p>
          <p data-ss-section-label>AI coach</p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-bold tracking-tight"
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
          <pre data-ss-code className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
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
      <section data-ss-watermark-host className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div data-ss-watermark aria-hidden>
          <span>PAPER TRADING · VIRTUAL MONEY</span>
        </div>
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 07</p>
          <p data-ss-section-label>Time travel</p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          {/* The interactive Time Travel chart now lives above the fold
              (rendered inside § 01). § 07 keeps the prose explainer of
              the three-phase grounded narrative pipeline. */}
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-bold tracking-tight"
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
          <pre data-ss-code className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
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

      {/* § 08 — UNIVERSE */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 08</p>
          <p data-ss-section-label>Universe</p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          {/* Live ticker mockup — six headline NSE/BSE symbols rendered
              as a single horizontal strip with mock prices in tabular-num
              mono, up/down deltas in primary/danger. Pure server JSX
              wrapped in a rounded card so it reads as an embedded
              product surface. The pulsing dot signals "live feed". */}
          <div data-ss-rounded-card className="flex flex-col gap-3 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] text-[var(--color-muted)] uppercase">
                <span data-ss-pulse-dot className="inline-block align-middle"></span>
                Live · NSE
              </span>
              <span className="font-mono text-[10px] tracking-tight text-[var(--color-muted)]">
                15:14:32 IST
              </span>
            </div>
            <div className="flex flex-nowrap items-center gap-x-6 gap-y-2 overflow-x-auto font-mono text-[12px] whitespace-nowrap tabular-nums">
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">RELIANCE</span>
                <span className="text-[var(--color-fg)]">1,247.30</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>▲</span>
                  <span>+0.4%</span>
                </span>
              </span>
              <span aria-hidden className="text-[var(--color-border)]">
                |
              </span>
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">TCS</span>
                <span className="text-[var(--color-fg)]">4,089.50</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "#eb5757" }}
                >
                  <span>▼</span>
                  <span>−0.2%</span>
                </span>
              </span>
              <span aria-hidden className="text-[var(--color-border)]">
                |
              </span>
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">INFY</span>
                <span className="text-[var(--color-fg)]">1,856.75</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>▲</span>
                  <span>+1.1%</span>
                </span>
              </span>
              <span aria-hidden className="text-[var(--color-border)]">
                |
              </span>
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">HDFCBANK</span>
                <span className="text-[var(--color-fg)]">1,634.20</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>▲</span>
                  <span>+0.6%</span>
                </span>
              </span>
              <span aria-hidden className="text-[var(--color-border)]">
                |
              </span>
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">SBIN</span>
                <span className="text-[var(--color-fg)]">821.45</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "#eb5757" }}
                >
                  <span>▼</span>
                  <span>−0.3%</span>
                </span>
              </span>
              <span aria-hidden className="text-[var(--color-border)]">
                |
              </span>
              <span className="inline-flex items-baseline gap-2">
                <span className="font-semibold text-[var(--color-fg)]">WIPRO</span>
                <span className="text-[var(--color-fg)]">542.80</span>
                <span
                  aria-hidden
                  className="inline-flex items-baseline gap-0.5"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>▲</span>
                  <span>+2.4%</span>
                </span>
              </span>
            </div>
          </div>
          <h2
            className="text-[clamp(1.75rem,3vw,2.75rem)] leading-tight font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            2,686 NSE equities and 13,969 mutual funds, refreshed before market open.{" "}
            <span data-ss-saffron-badge className="ml-2 align-middle">
              AMFI India
            </span>
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The instrument universe is built daily by two pure-Node (zero deps) scripts. The equity
            build fetches the NSE master CSV, 17 NIFTY index constituent CSVs, and the NSE ETF API,
            warming a per-host cookie jar with browser-like{" "}
            <code className="font-mono text-sm">Sec-Fetch-*</code> headers because both NSE and
            NiftyIndices 403 anything else. A 27-value sector taxonomy is derived through a layered
            pipeline (NSE&apos;s industry tag → sectoral overlays → 100-line keyword regex for the
            long-tail ~1,500 small-caps). NIFTY index membership is packed into a 5-bit field per
            instrument, driving cap-bucket and risk-tier classification.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            The MF build parses AMFI&apos;s proprietary semicolon-delimited{" "}
            <code className="font-mono text-sm">NAVAll.txt</code> (~17,000 raw rows, ~14,000 unique
            scheme codes), extracts AMC + category + plan + option from interleaved category
            headers, rolls 47 SEBI sub-categories into 7 buckets (Equity / Debt / Hybrid / Index /
            Solution / Commodity / FoF), and maps each fund to a benchmark. Output ships as
            content-addressed immutable JSON with a Brotli-q11 sidecar. A vercel.json rewrite swaps
            to <code className="font-mono text-sm">.br</code> when{" "}
            <code className="font-mono text-sm">Accept-Encoding</code> contains{" "}
            <code className="font-mono text-sm">br</code>.
          </p>
          <p className="max-w-prose text-base leading-relaxed text-[var(--color-fg)]">
            Live quote caching is <strong className="font-medium">market-hours-aware</strong>:{" "}
            <code className="font-mono text-sm">is_market_open_ist()</code> drives both the Supabase
            TTL and the edge <code className="font-mono text-sm">Cache-Control</code> value — 5
            seconds while NSE is open (Mon-Fri 09:15-15:30 IST), 300 seconds while closed. Eight
            cron windows daily refresh fundamentals, instruments, and MF NAVs; crons self-bail at 50
            seconds against Vercel&apos;s 60-second{" "}
            <code className="font-mono text-sm">maxDuration</code> cap and resume from the next
            paginated <code className="font-mono text-sm">?offset=</code> on the next firing.
          </p>
        </div>
      </section>

      {/* § 09 — POLISH */}
      <section className="mb-20 grid grid-cols-12 gap-4 pt-10">
        <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
          <p data-ss-section-number>§ 09</p>
          <p data-ss-section-label>Polish</p>
        </div>
        <div className="col-span-12 flex flex-col gap-6 md:col-span-10">
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              [
                "800ms-debounced hottest-200 LRU cache",
                "The persisted-quote cache (ss.quotes.v3) writes only the 200 hottest symbols by last-access timestamp. A one-shot legacy migration deletes pre-split Reliance values from older keys so nobody paints with stale 2024-era numbers after a service-worker refresh.",
              ],
              [
                "Server-time anchor via performance.now()",
                "The market-status badge can't be spoofed by changing the system clock. The anchor is (performance.now() at sync midpoint, server's epoch ms); serverNow() adds the monotonic delta. Flipping your laptop to '9:30 AM IST Sunday' cannot fake 'Market Open'.",
              ],
              [
                "Intervention modal with 3-second read delay",
                "Before a panic-sell, the user sees historical recovery analog data. The 'Sell anyway' button counts down 3-2-1 before enabling. Escape and overlay-click are no-ops by design — Escape shakes the Hold button instead of closing.",
              ],
              [
                "Idempotency-key-based atomic apply_trade RPC",
                "transactions.idempotency_key is UNIQUE(user_id, key); a deterministic key generated once per click is held across retries. The PL/pgSQL function row-locks the portfolio, conditionally decrements cash, upserts holdings, and inserts the transaction in one transaction.",
              ],
              [
                "Chunked render with RAF yield",
                "The MF browser paints 13,969 cards in 200-card chunks with requestAnimationFrame yields between batches; 'Tab not responding' never fires. Two cooperating IntersectionObservers (200% rootMargin to hydrate, 600% to dehydrate back to skeleton) keep the DOM bounded.",
              ],
              [
                "Limit-order matcher with market-closed guard",
                "AMOs ghosted because the matcher ran every 12s regardless of market state and trivially 'filled' against stale after-hours closes. Fix: if (!marketStatus().open) return { skipped: 'market_closed' }; before any matcher pass.",
              ],
            ].map(([title, body]) => (
              <li
                key={title}
                data-ss-rounded-card
                className="flex flex-col gap-3 px-6 py-6 sm:px-7"
              >
                <div className="flex items-start gap-3">
                  <span data-ss-icon-square aria-hidden>
                    ◇
                  </span>
                  <p className="text-sm leading-snug font-semibold text-[var(--color-primary)]">
                    {title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-fg)]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* § 10 — LIMITATIONS */}
      <section className="mb-20 grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 10
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Honest limits
          </p>
        </div>
        <div className="col-span-12 flex flex-col gap-3 md:col-span-10">
          <ul className="ml-6 max-w-prose list-disc space-y-3 text-base leading-relaxed text-[var(--color-fg)]">
            <li>
              <strong className="font-medium">
                Yahoo NSE data is officially 15-minute delayed.
              </strong>{" "}
              The &ldquo;LIVE&rdquo; badge flips to &ldquo;DELAYED&rdquo; via the{" "}
              <code className="font-mono text-sm">staleAgeMinutes</code> flag when Yahoo&apos;s own{" "}
              <code className="font-mono text-sm">ts</code> is older than 5 minutes during market
              hours. The product calls itself a paper-trading simulator, never a real-time tick
              feed.
            </li>
            <li>
              <strong className="font-medium">The coach never gives buy/sell advice.</strong> The
              decision is structural, not stylistic — the prompt forbids it, the output filter
              blocks 25 forbidden phrases, the deterministic detectors carry the regulatorily
              sensitive output.
            </li>
            <li>
              <strong className="font-medium">
                SELL-side limit orders don&apos;t reserve quantity.
              </strong>{" "}
              The schema comment is candid:{" "}
              <em>
                &ldquo;multi-order users can oversell. For the pitch scale this is
                acceptable.&rdquo;
              </em>
            </li>
            <li>
              <strong className="font-medium">NSE 2026 holiday list is hardcoded.</strong> NSE
              doesn&apos;t expose a public holiday API; the file flags itself for annual update.
            </li>
            <li>
              <strong className="font-medium">No real money.</strong> No real trades, no real advice
              — the legal posture that lets a teen-targeted app sidestep India&apos;s
              investor-suitability regulations.
            </li>
          </ul>
        </div>
      </section>

      {/* § 11 — NUMBERS */}
      <section className="grid grid-cols-12 gap-4 border-t-2 border-[var(--color-border)] pt-10">
        <div className="col-span-12 md:col-span-2">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
            § 11
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
            Numbers
          </p>
        </div>
        <div className="col-span-12 md:col-span-10">
          <ul className="grid grid-cols-2 gap-0 border-2 border-[var(--color-border)] md:grid-cols-4">
            {[
              ["2,686", "NSE equities + ETFs"],
              ["13,969", "AMFI mutual funds"],
              ["4-tier", "upstream failover"],
              ["4-tier", "fundamentals fallback"],
              ["9", "deterministic bias detectors"],
              ["3", "SEBI guardrail layers"],
              ["8", "cron windows daily"],
              ["5s / 300s", "market-open / closed TTL"],
              ["30s", "circuit-breaker window"],
              ["0", "pip dependencies"],
              ["16", "atomic SECURITY DEFINER RPCs"],
              ["paise", "all money as bigint"],
            ].map(([num, label], i) => (
              <li
                key={label}
                data-ss-stat-tile
                className={
                  "border-[var(--color-border)] p-5 " +
                  (i % 2 === 0 ? "border-r-2" : "") +
                  (i < 10 ? "border-b-2" : "") +
                  "md:border-r-2" +
                  (i < 8 ? "md:border-b-2" : "")
                }
              >
                <p
                  data-ss-stat-number
                  className="font-mono text-2xl font-medium text-[var(--color-primary)] tabular-nums"
                >
                  {num}
                </p>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
