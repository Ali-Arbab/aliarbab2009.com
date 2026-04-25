import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium text-sm",
    "transition-[background-color,color,box-shadow,transform] duration-200",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
          "shadow-[0_0_0_1px_var(--color-primary),0_8px_32px_-12px_var(--color-glow)]",
          "hover:shadow-[0_0_0_1px_var(--color-primary),0_12px_40px_-8px_var(--color-glow)]",
          "hover:-translate-y-[1px]",
        ].join(" "),
        secondary: [
          "bg-[var(--color-surface-2)] text-[var(--color-fg)]",
          "border border-[var(--color-border)]",
          "hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]",
        ].join(" "),
        ghost: ["text-[var(--color-fg)]", "hover:bg-[var(--color-surface-2)]"].join(" "),
        outline: [
          "border border-[var(--color-primary)] text-[var(--color-primary)]",
          "bg-transparent",
          "hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-fg)]",
        ].join(" "),
      },
      size: {
        sm: "h-8 rounded-[calc(var(--radius-base)-2px)] px-3 text-xs",
        md: "h-10 rounded-[var(--radius-base)] px-4",
        lg: "h-12 rounded-[var(--radius-base)] px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { buttonVariants };
