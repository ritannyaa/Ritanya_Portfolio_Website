"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

type AnimatedCounterProps = {
  value: number;
  label: string;
  duration?: number;
  /** True when the number is a real count the visitor can verify by scrolling
   *  — suppresses the "+", which would otherwise claim more than there is. */
  exact?: boolean;
  /** Optional extra class for the number itself, e.g. a page-scoped glow. */
  numberClassName?: string;
};

export function AnimatedCounter({
  value,
  label,
  duration = 2000,
  exact = false,
  numberClassName,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  // The counted number is written straight to the DOM every frame (see
  // below), not via useState — routing a 60fps tick through React state
  // would re-render this component every frame, and with up to 4 counters
  // animating concurrently that's a real re-render storm right as the user
  // scrolls into the Skills section.
  const numberRef = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (numberRef.current) numberRef.current.textContent = String(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          if (numberRef.current) {
            numberRef.current.textContent = String(Math.round(eased * value));
          }
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, reduced]);

  return (
    <div
      ref={ref}
      className="group text-center transition-transform duration-300 ease-out hover:-translate-y-1"
      data-reveal
    >
      <p
        className={cn(
          "text-4xl font-semibold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-blue-400 sm:text-5xl",
          numberClassName
        )}
      >
        <span ref={numberRef}>0</span>
        {!exact && (
          <span className="ml-0.5 align-top text-xl text-slate-400 transition-colors duration-300 group-hover:text-blue-400 sm:text-2xl">
            +
          </span>
        )}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}
