import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeHero } from "@/components/home/home-hero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedProjects />
      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="max-w-2xl text-sm text-[var(--color-muted)]">
          This site is a work in progress — more detail across the project pages, a longer About,
          and a downloadable resume are shipping through Phase 0–4 of the build.
        </p>
      </section>
    </>
  );
}
