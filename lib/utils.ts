import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Standard shadcn/ui cn — merges class lists and resolves conflicting
 * Tailwind utilities (last one wins per utility group), unlike the naive
 * string-join in @/lib/utils/cn used elsewhere in this codebase. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
