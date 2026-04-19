import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="theme-maglock flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-[var(--color-primary)] uppercase">
        404 · Access denied
      </p>
      <h1 className="font-display text-6xl tracking-tight text-[var(--color-primary)] sm:text-8xl">
        This route is locked.
      </h1>
      <p className="max-w-md text-lg text-[var(--color-muted)]">
        No page at that path. Try the projects index — or head home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
          Home
        </Link>
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          Projects
        </Link>
      </div>
    </main>
  );
}
