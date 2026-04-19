import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Usage: cn("px-2", "px-4", condition && "hidden") → "px-4 hidden"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
