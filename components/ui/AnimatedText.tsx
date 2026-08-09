"use client";

import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  split?: "words" | "chars";
};

/** Words are revealed by GSAP via parent [data-reveal-words] */
export function AnimatedText({
  text,
  as: Tag = "span",
  className,
  split = "words",
}: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const parts = split === "words" ? text.split(" ") : text.split("");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    // No aria-label here: ARIA forbids it on a generic element with no role,
    // so screen readers ignored it anyway. The accessible name comes from the
    // word spans' own text content, which reads as the original sentence.
    <Tag className={cn("inline-flex flex-wrap", className)}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="inline-block overflow-hidden">
          <span className="inline-block" data-reveal-word>
            {part}
            {split === "words" && i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
