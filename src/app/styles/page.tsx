import Link from "next/link";

import { VariantSwitcher } from "@/components/styles/variant-switcher";

export const metadata = {
  title: "Style variants",
  description:
    "Four parallel aesthetic previews of aliarbab2009.com — pick one and the losing three get deleted.",
};

const VARIANTS = [
  {
    href: "/",
    number: "01",
    name: "Dark minimal neon",
    summary:
      "Near-black canvas with conic-aurora glow. Sans-serif body, serif accents. Subtle motion.",
    bg: "#0b0b0f",
    fg: "#f5f5f2",
    accent: "#6aeac2",
    tagline: "Quiet. Modern. Lets the projects lead.",
  },
  {
    href: "/styles/editorial",
    number: "02",
    name: "Warm editorial",
    summary:
      "Cream paper, massive Instrument Serif display, narrow measure, drop caps, side-rail notes.",
    bg: "#faf7f2",
    fg: "#1a1a1a",
    accent: "#635bff",
    tagline: "Stripe / Linear-style. Story-first.",
  },
  {
    href: "/styles/cyberpunk",
    number: "03",
    name: "Neon terminal",
    summary:
      "Pure black, scanlines, grid overlay, Orbitron display, chromatic aberration, blinking cursor.",
    bg: "#000000",
    fg: "#d6e7ff",
    accent: "#00ffa3",
    tagline: "Loud. Technical. Unapologetic.",
  },
  {
    href: "/styles/brutalist",
    number: "04",
    name: "Brutalist / mono-grid",
    summary:
      "Swiss grid, hairline off-white borders on near-black, Space Grotesk, bright cobalt accent, glass on hover, zero radius.",
    bg: "#0a0a0a",
    fg: "#f0f0ea",
    accent: "#6b82ff",
    tagline: "Systematic. Typographic. One accent.",
  },
] as const;

export default function StylesIndexPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:pt-28">
      <VariantSwitcher />
      <header className="mb-12 flex flex-col gap-3">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Style variants — pick one
        </p>
        <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
          Four parallel worlds.
        </h1>
        <p className="max-w-2xl text-lg text-[var(--color-muted)]">
          Same content, four aesthetics. Click into each and feel it. Once you pick a winner, I
          delete the other three and promote that variant to the main site.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2">
        {VARIANTS.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="group flex h-full flex-col gap-5 overflow-hidden rounded-[var(--radius-base)] border border-[var(--color-border)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-fg)]"
            >
              <div
                className="flex aspect-[16/10] flex-col justify-between p-6"
                style={{ background: v.bg, color: v.fg }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: v.accent }}
                >
                  variant {v.number}
                </span>
                <h2
                  className="text-4xl leading-tight tracking-tight"
                  style={{ color: v.accent }}
                >
                  {v.name}
                </h2>
              </div>
              <div className="flex flex-col gap-2 p-5 pt-0">
                <p className="text-sm text-[var(--color-fg)]/90">{v.tagline}</p>
                <p className="text-xs text-[var(--color-muted)]">{v.summary}</p>
                <span className="mt-2 font-mono text-[11px] text-[var(--color-primary)]">
                  Open variant →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
