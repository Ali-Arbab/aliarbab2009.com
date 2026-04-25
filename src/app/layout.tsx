import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/seo/json-ld";
import { ThemeScript } from "@/components/shell/theme-script";
import { siteConfig } from "@/config/site";
import { personJsonLd } from "@/lib/json-ld";
import { cn } from "@/lib/utils";

import "./globals.css";

/**
 * Self-hosted brutalist Latin stack. WOFF2 files in public/fonts/.
 *   - Space Grotesk: 400 (body) + 500 (display headings)
 *   - JetBrains Mono: 400 (mono labels, code)
 *
 * Self-hosting trades Google Fonts CDN for stable cross-build hashes
 * and an offline-capable build. Per P4.09.
 */
const spaceGrotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/SpaceGrotesk-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: [{ path: "../../public/fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Cascadia Code", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.shortDescription}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.longDescription,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.longDescription,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.longDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(spaceGrotesk.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd data={personJsonLd()} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--color-primary)] focus:px-3 focus:py-2 focus:text-[var(--color-primary-fg)]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
