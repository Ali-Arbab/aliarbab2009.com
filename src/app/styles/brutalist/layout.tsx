import { VariantSwitcher } from "@/components/styles/variant-switcher";

export const metadata = {
  title: "Brutalist variant",
};

export default function BrutalistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="variant-brutalist relative min-h-dvh">
      <VariantSwitcher />
      <div className="variant-brutalist-grid" aria-hidden />
      {children}
    </div>
  );
}
