/**
 * Project catalog — used by the home page featured grid,
 * the /projects index, and the per-project route metadata.
 *
 * In later phases, per-project MDX case studies live under
 * content/projects/<slug>/; this file keeps the lightweight
 * static metadata.
 */

export type ProjectTheme = "stocksaathi" | "bolhisaab" | "maglock";

export type ProjectStatus = "live" | "pre-launch" | "hardware-dependent";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  theme: ProjectTheme;
  status: ProjectStatus;
  statusLabel: string;
  liveUrl?: string;
  repoUrl: string;
  primaryColor: string;
  year: number;
  stack: readonly string[];
  /**
   * ISO date — last meaningful update to this project page or its case
   * study. Sitemap uses it for lastModified. Optional; falls back to
   * siteConfig.lastReviewedISO when absent.
   */
  lastUpdatedISO?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "stocksaathi",
    name: "StockSaathi",
    tagline:
      "Behavioural-finance simulator that lets users replay any market crisis on real Yahoo data",
    description:
      "A paper-trading platform that pairs the entire NSE universe and AMFI mutual-fund catalogue with an AI coach designed never to give buy or sell advice. A Time Travel mode replays real Indian market crises — demonetisation, COVID, Adani-Hindenburg — day by day, so a virtual portfolio's held vs panic-sold lines diverge over actual historical closes. Live at stocksaathi.co.in.",
    theme: "stocksaathi",
    status: "live",
    statusLabel: "Live in production",
    liveUrl: "https://stocksaathi.co.in",
    repoUrl: "https://github.com/aliarbab2009/StockSaathi",
    primaryColor: "#00B386",
    year: 2025,
    lastUpdatedISO: "2026-04-26",
    stack: [
      "Vanilla ES Modules",
      "Vercel Python (stdlib-only)",
      "Supabase + RLS + RPCs",
      "Cloudflare Workers (front-door)",
      "Fly.io failover",
      "Gemini 2.5 Flash/Pro (Vertex)",
      "Cerebras Llama 3.3 70B",
      "Anthropic Claude Sonnet 4.5",
      "Yahoo + Tickertape + AMFI",
      "Service Worker + IndexedDB",
    ],
  },
  {
    slug: "bolhisaab",
    name: "BolHisaab",
    tagline: "Voice-first Hindi/Hinglish khaata for the 63M shopkeepers running paper books",
    description:
      "Tap mic, say “Ram ne paanch sau udhaar liya,” and the accounting entry writes itself — confirmed in a natural Indian voice with one-tap Undo. Llama 3.1 8B parses intent in ~200ms; Sarvam Saarika v2 transcribes Indian voices natively; a single Postgres RPC inserts the row and returns the new running balance in one round trip. Append-only ledger with soft-delete audit. Pre-launch at bolhisaab.in.",
    theme: "bolhisaab",
    status: "pre-launch",
    statusLabel: "Launching at bolhisaab.in",
    repoUrl: "https://github.com/aliarbab2009/BolHisaab",
    primaryColor: "#4F46E5",
    year: 2025,
    lastUpdatedISO: "2026-04-26",
    stack: [
      "Next.js 16 + React 19",
      "TypeScript strict",
      "Tailwind CSS v4",
      "Supabase + Anon Auth + RLS",
      "Llama 3.1 8B (Groq) primary",
      "Llama 3.3 70B fallback",
      "Sarvam Saarika v2 STT",
      "Sarvam Bulbul v2 TTS",
      "Whisper-large-v3-turbo fallback",
      "Zustand + TanStack Query",
    ],
  },
  {
    slug: "maglock",
    name: "MagLock Protocol",
    tagline: "Dual-door smart lock with live camera + voice AI",
    description:
      "Flutter app, ESP32 dual-relay firmware, ESP32-CAM MJPEG stream, and an optional Hinglish-speaking voice assistant named Maggy. Neon-cyberpunk UI, local-network only, no cloud.",
    theme: "maglock",
    status: "hardware-dependent",
    statusLabel: "Hardware-dependent — video demo",
    repoUrl: "https://github.com/aliarbab2009/MagLock-Protocol",
    primaryColor: "#00FF9D",
    year: 2025,
    lastUpdatedISO: "2026-04-25",
    stack: ["Flutter", "Dart", "ESP32", "Arduino C++", "Grok API", "WebView"],
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
