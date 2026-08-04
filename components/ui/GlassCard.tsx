"use client";

import { TiltCard } from "@/components/ui/TiltCard";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  tilt?: boolean;
  float?: boolean;
};

/** Glass surface — uses TiltCard when tilt is enabled (default for hover cards). */
export function GlassCard({
  children,
  className,
  hover = true,
  id,
  tilt = true,
  float = false,
}: GlassCardProps) {
  if (tilt && hover) {
    return (
      <TiltCard
        id={id}
        className={className}
        hover={hover}
        float={float}
      >
        {children}
      </TiltCard>
    );
  }

  return (
    <TiltCard id={id} className={className} hover={false} float={float}>
      {children}
    </TiltCard>
  );
}
