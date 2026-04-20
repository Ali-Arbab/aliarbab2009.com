import { VariantSwitcher } from "@/components/styles/variant-switcher";

export const metadata = {
  title: "Cyberpunk variant",
};

export default function CyberpunkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="variant-cyberpunk relative min-h-dvh overflow-hidden">
      <VariantSwitcher />
      {/* Grid overlay — fades to center */}
      <div className="variant-cyberpunk-grid" />
      {/* Scanlines — thin repeating horizontal rhythm */}
      <div className="variant-cyberpunk-scanlines" />
      {/* Outer vignette glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0, 255, 163, 0.12), transparent 70%), radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 224, 255, 0.08), transparent 70%)",
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
}
