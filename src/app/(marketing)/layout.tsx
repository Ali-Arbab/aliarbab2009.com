import { CommandPalette } from "@/components/shell/command-palette";
import { Footer } from "@/components/shell/footer";
import { Nav } from "@/components/shell/nav";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main" className="flex min-h-[calc(100dvh-3.5rem)] flex-col">
        {children}
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
