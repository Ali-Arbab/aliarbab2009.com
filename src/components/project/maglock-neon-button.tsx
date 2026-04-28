"use client";

import { type ButtonHTMLAttributes, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * <MaglockNeonButton /> — ports the Flutter app's NeonButton
 * (lib/widgets/neon_button.dart) to a React TSX button.
 *
 * Visual contract per the Flutter source:
 *   - Sharp 2px-radius rectangle
 *   - 1px accent border @ 50% opacity (idle)
 *   - Dim accent-tinted background (idle)
 *   - Outer glow box-shadow at variable intensity
 *   - Pressed: bg fills with full accent, border 100%, glow doubles,
 *     button scales to 0.96, text/icon flips to dark "background" colour
 *   - Disabled: dim border bg, muted text, no shadow
 *   - 150ms ease-out tween on press; 200ms colour/border morph
 *
 * Variants map to maglock semantic palette:
 *   - primary: --color-primary (neon green)
 *   - danger:  --color-danger  (neon red)
 *   - outline: --color-accent-purple-ish — using --color-secondary
 *              (cyan) since the brutalist site doesn't expose purple
 *   - ghost:   transparent bg + muted text
 *
 * Use anywhere inside a `.theme-maglock` subtree. The component is
 * "use client" only because it tracks pressed state for the scale +
 * glow tween. If we ever drop the press animation, this could move
 * to a server component.
 */

export type MaglockNeonButtonVariant = "primary" | "danger" | "outline" | "ghost";
export type MaglockNeonButtonSize = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: MaglockNeonButtonVariant;
  size?: MaglockNeonButtonSize;
  /** Optional leading icon (typically a Lucide icon at 14px). */
  leadingIcon?: React.ReactNode;
  /** When true, replaces the icon slot with a tiny spinner. */
  loading?: boolean;
};

const VARIANT_TOKENS: Record<MaglockNeonButtonVariant, { accent: string; fg: string }> = {
  primary: { accent: "var(--color-primary)", fg: "var(--color-primary-fg)" },
  danger: { accent: "var(--color-danger)", fg: "var(--color-bg)" },
  outline: { accent: "var(--color-secondary)", fg: "var(--color-secondary-fg)" },
  ghost: { accent: "var(--color-muted)", fg: "var(--color-fg)" },
};

export const MaglockNeonButton = forwardRef<HTMLButtonElement, Props>(function MaglockNeonButton(
  {
    variant = "primary",
    size = "md",
    leadingIcon,
    loading = false,
    disabled,
    className,
    children,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    ...rest
  },
  ref,
) {
  const [pressed, setPressed] = useState(false);
  const tokens = VARIANT_TOKENS[variant];
  const isDisabled = disabled || loading;

  const fontSize = size === "sm" ? "12px" : "14px";
  const padX = size === "sm" ? "12px" : "18px";
  const padY = size === "sm" ? "6px" : "10px";

  return (
    <button
      ref={ref}
      type="button"
      disabled={isDisabled}
      onPointerDown={(e) => {
        if (!isDisabled) setPressed(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setPressed(false);
        onPointerUp?.(e);
      }}
      onPointerLeave={(e) => {
        setPressed(false);
        onPointerLeave?.(e);
      }}
      data-maglock-neon-btn
      data-pressed={pressed ? "" : undefined}
      className={cn("inline-flex items-center justify-center gap-2", className)}
      style={{
        fontFamily: "var(--font-orbitron), var(--font-display)",
        fontSize,
        fontWeight: 700,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: `${padY} ${padX}`,
        borderRadius: "2px",
        border: `1px solid ${
          isDisabled
            ? "var(--color-border)"
            : pressed
              ? tokens.accent
              : `color-mix(in srgb, ${tokens.accent} 50%, transparent)`
        }`,
        background: isDisabled
          ? "color-mix(in srgb, var(--color-border) 30%, transparent)"
          : pressed
            ? tokens.accent
            : `color-mix(in srgb, ${tokens.accent} 12%, transparent)`,
        color: isDisabled ? "var(--color-muted)" : pressed ? tokens.fg : tokens.accent,
        boxShadow: isDisabled
          ? "none"
          : pressed
            ? `0 0 12px 2px color-mix(in srgb, ${tokens.accent} 60%, transparent), 0 0 24px 4px color-mix(in srgb, ${tokens.accent} 30%, transparent)`
            : `0 0 6px color-mix(in srgb, ${tokens.accent} 30%, transparent)`,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition:
          "transform 150ms ease-out, background-color 200ms ease, border-color 200ms ease, box-shadow 200ms ease, color 200ms ease",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.6 : 1,
      }}
      {...rest}
    >
      {loading ? (
        <span
          aria-hidden
          className="inline-block h-3.5 w-3.5 animate-spin border-2 border-current border-t-transparent"
          style={{ borderRadius: "50%" }}
        />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
    </button>
  );
});
