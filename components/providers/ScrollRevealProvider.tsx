"use client";

import { useScrollExperience } from "@/lib/hooks/useScrollExperience";

/** Invoked standalone (no children) purely to run the scroll-reveal side effect. */
export function ScrollRevealProvider() {
  useScrollExperience();
  return null;
}
