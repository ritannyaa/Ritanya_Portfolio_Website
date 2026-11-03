"use client";

import { cn } from "@/lib/utils/cn";
import { AnimatedText } from "@/components/ui/AnimatedText";

type SectionHeadingProps = {
  watermark: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  watermark,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <header
      data-scroll-heading
      className={cn(
        "mb-12 sm:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <p
        className="pointer-events-none select-none text-[clamp(3rem,10vw,5.5rem)] font-bold leading-none tracking-tight text-white/[0.06]"
        aria-hidden
      >
        {watermark}
      </p>
      <h2
        data-cursor="text"
        data-reveal-words
        className="font-heading -mt-6 flex flex-wrap justify-center gap-x-0 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        <AnimatedText text={title} as="span" split="words" />
      </h2>
      {description && (
        <p
          data-reveal
          className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg"
        >
          {description}
        </p>
      )}
    </header>
  );
}
