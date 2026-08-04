"use client";

import { PremiumCursor } from "@/components/effects/PremiumCursor";
import { AmbientBackground } from "@/components/effects/AmbientBackground";

export function InteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AmbientBackground />
      <PremiumCursor />
      <div className="relative z-[2]">{children}</div>
    </>
  );
}
