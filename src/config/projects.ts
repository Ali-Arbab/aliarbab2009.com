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
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "stocksaathi",
    name: "StockSaathi",
    tagline: "AI-coached investment simulator for teens",
    description:
      "A virtual ₹1,00,000 trading simulator with an AI coach trained on behavioral finance. Real-time data on 3,000+ BSE/NSE stocks, a Time Travel mode that replays historical crashes, and a parent-consent flow for teen sign-ups.",
    theme: "stocksaathi",
    status: "live",
    statusLabel: "Live in production",
    liveUrl: "https://stocksaathi.co.in",
    repoUrl: "https://github.com/aliarbab2009/StockSaathi",
    primaryColor: "#00B386",
    year: 2025,
    stack: ["Vanilla JS", "Python", "Vercel", "Supabase", "Groq LLM", "Yahoo Finance"],
  },
  {
    slug: "bolhisaab",
    name: "BolHisaab",
    tagline: "Voice-first Hindi ledger for shopkeepers",
    description:
      "Say 'Ram ne 500 udhaar liya' and watch the accounting entry write itself. Groq Whisper turns audio into text; Llama 3.1 parses intent; Supabase holds an append-only ledger. The app speaks the confirmation back in Hindi.",
    theme: "bolhisaab",
    status: "pre-launch",
    statusLabel: "Launching at bolhisaab.in",
    repoUrl: "https://github.com/aliarbab2009/BolHisaab",
    primaryColor: "#4F46E5",
    year: 2025,
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Groq Whisper", "Tailwind v4"],
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
    stack: ["Flutter", "Dart", "ESP32", "Arduino C++", "Grok API", "WebView"],
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
