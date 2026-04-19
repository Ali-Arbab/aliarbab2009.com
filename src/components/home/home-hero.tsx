import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { NowBar } from "@/components/home/now-bar";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      {/* Aurora backdrop — static conic gradient for Phase 0.
          Phase 3 replaces this with an r3f WebGL orb + SVG fallback. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-0 right-[-15%] h-[700px] w-[700px] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #00B386 0deg, #4F46E5 140deg, #00FF9D 270deg, #00B386 360deg)",
          }}
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="font-mono text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          Class XII · builds AI + hardware + voice interfaces
        </p>

        <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-tight">
          <span className="block">Ali Arbab builds</span>
          <span className="block text-[var(--color-primary)]">tools that speak</span>
          <span className="block">to real people.</span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl">
          I&apos;m a Class XII student. Three projects: an AI investment coach, a voice-first ledger for
          shopkeepers who don&apos;t speak English, and a neon-glowing IoT lock built on two ESP32s and a
          lot of late nights.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            See the projects →
          </Link>
          <Link href="/about" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            About
          </Link>
          <Link href="/resume" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
            Resume
          </Link>
        </div>

        <div className="pt-4">
          <NowBar />
        </div>
      </div>
    </section>
  );
}
