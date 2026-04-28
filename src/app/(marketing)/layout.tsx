import { headers } from "next/headers";

import { CommandPalette } from "@/components/shell/command-palette";
import { Footer } from "@/components/shell/footer";
import { Nav } from "@/components/shell/nav";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  // Resolve the per-request CSP nonce here so we can forward it into
  // <Nav> -> <ThemeToggle> -> <ThemeToggleScript>. ThemeToggleScript
  // can't read headers() itself; if it did, Next 15 / React 19 would
  // stream it via RSC (`self.__next_f.push(...)`) and the inline
  // <script> would only execute AFTER hydration — leaving the toggle
  // dead on cold-load first clicks. Passing the nonce as a prop keeps
  // ThemeToggleScript synchronous and rendered in the initial HTML.
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <>
      <Nav nonce={nonce} />
      <main id="main" className="flex min-h-[calc(100dvh-3.5rem)] flex-col">
        {children}
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
