import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-full",
    "px-2.5 py-0.5 text-xs font-medium",
    "whitespace-nowrap",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-surface-2)] text-[var(--color-fg)] border border-[var(--color-border)]",
        primary:
          "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
        live: "bg-[var(--color-success)]/15 text-[var(--color-success)] border border-[var(--color-success)]/30",
        muted: "bg-transparent text-[var(--color-muted)] border border-[var(--color-border)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
