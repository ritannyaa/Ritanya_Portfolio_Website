"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion/easing";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
