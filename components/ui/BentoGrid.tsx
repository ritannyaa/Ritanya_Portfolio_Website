import { cn } from "@/lib/utils/cn";

export function BentoGrid({
  children,
  className,
  stagger = false,
}: {
  children: React.ReactNode;
  /** Must include the full responsive grid-cols-* scale — BentoGrid no
   * longer supplies a default, since cn() doesn't dedupe Tailwind classes
   * and a default here would silently fight whatever each caller passes. */
  className: string;
  stagger?: boolean;
}) {
  return (
    <div
      className={cn("bento-grid", className)}
      {...(stagger ? { "data-reveal-stagger": true } : {})}
    >
      {children}
    </div>
  );
}

export function BentoItem({
  children,
  className,
  depth,
}: {
  children: React.ReactNode;
  className?: string;
  /** Subtle scroll parallax depth 0.05–0.2 */
  depth?: number;
}) {
  return (
    <div
      className={cn("min-h-0 min-w-0 h-full", className)}
      {...(depth !== undefined ? { "data-scroll-depth": String(depth) } : {})}
      style={depth !== undefined ? ({ ["--depth" as any]: String(depth) } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
