"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Two calm, blue-only orbs (down from three multi-hue ones) plus the static
// mesh and cheap cursor-glow — the canvas particle field that used to sit
// alongside these was removed entirely, it added visual noise without
// adding much.
const orbs = [
  {
    className: "left-[5%] top-[12%] h-80 w-80",
    duration: 26,
    delay: 0,
    color: "rgba(59, 130, 246, 0.14)",
  },
  {
    className: "right-[6%] top-[22%] h-[28rem] w-[28rem]",
    duration: 30,
    delay: 3,
    color: "rgba(96, 165, 250, 0.1)",
  },
] as const;

export function AmbientBackground() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="ambient-mesh absolute inset-0" />
      <div className="ambient-cursor-glow absolute inset-0" />
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`ambient-orb absolute rounded-full blur-3xl ${orb.className}`}
          style={{ background: `radial-gradient(circle, ${orb.color}, transparent 70%)` }}
          animate={{
            x: [0, 30, -16, 0],
            y: [0, -22, 18, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
