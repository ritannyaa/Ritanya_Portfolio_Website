import { TiltCard } from "@/components/ui/TiltCard";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  /** Off for cards that shouldn't tilt under the pointer (the stats panel,
   *  the resume CTA) — they render as a plain glass surface. */
  hover?: boolean;
  id?: string;
};

/**
 * Glass surface. A thin alias over TiltCard, kept because "GlassCard" is what
 * the sections mean semantically and it keeps the tilt implementation swappable
 * behind one name.
 *
 * This used to branch into two `TiltCard` calls that differed only in the
 * `hover` boolean, and carried `tilt` and `float` props that no caller ever
 * passed — `float` reached an `animate-float-subtle` class nothing enabled.
 * Both are gone; the component is now the single expression it always was.
 */
export function GlassCard({
  children,
  className,
  hover = true,
  id,
}: GlassCardProps) {
  return (
    <TiltCard id={id} className={className} hover={hover}>
      {children}
    </TiltCard>
  );
}
