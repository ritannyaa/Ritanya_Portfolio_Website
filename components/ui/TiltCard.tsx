"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { springSnappy, springSoft } from "@/lib/motion/easing";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  intensity?: number;
  float?: boolean;
};

export function TiltCard({
  children,
  className,
  hover = true,
  id,
  intensity = 8,
  float = false,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);
  const borderGlowRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, springSoft);
  const springY = useSpring(rotateY, springSoft);
  const lift = useSpring(0, springSnappy);

  // getBoundingClientRect() forces a synchronous layout flush; raw mousemove
  // can fire far more often than the display refreshes, so the read is
  // coalesced to at most once per animation frame instead of once per event.
  const rafPending = useRef(false);
  const rafId = useRef(0);
  const latestPoint = useRef({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !hover || !ref.current) return;
      latestPoint.current = { x: e.clientX, y: e.clientY };
      if (rafPending.current) return;
      rafPending.current = true;

      rafId.current = requestAnimationFrame(() => {
        rafPending.current = false;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const { x: clientX, y: clientY } = latestPoint.current;
        const px = ((clientX - rect.left) / rect.width) * 100;
        const py = ((clientY - rect.top) / rect.height) * 100;
        const x = px / 100 - 0.5;
        const y = py / 100 - 0.5;

        rotateY.set(x * intensity);
        rotateX.set(-y * intensity);
        lift.set(-8);

        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.14) 32%, transparent 60%)`;
          spotlightRef.current.style.opacity = "1";
        }
        if (specularRef.current) {
          specularRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.45) 0%, transparent 42%)`;
          specularRef.current.style.opacity = "0.7";
        }
        if (borderGlowRef.current) {
          borderGlowRef.current.style.opacity = "1";
          borderGlowRef.current.style.setProperty("--glow-angle", `${px * 3.6}deg`);
        }
      });
    },
    [reduced, hover, intensity, rotateX, rotateY, lift]
  );

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafPending.current = false;
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
    [spotlightRef, specularRef, borderGlowRef].forEach((r) => {
      if (r.current) r.current.style.opacity = "0";
    });
  }, [rotateX, rotateY, lift]);

  if (reduced || !hover) {
    return (
      <div id={id} className={cn("glass-card glow-border", className)}>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      id={id}
      data-cursor="card"
      data-magnetic
      data-magnetic-strength="0.28"
      className={cn(
        "glass-card glass-tilt glass-depth group relative isolate",
        float && "animate-float-subtle",
        className
      )}
      style={{
        rotateX: springX,
        rotateY: springY,
        y: lift,
        transformPerspective: 1000,
      }}
      whileTap={{ scale: 0.975, transition: springSnappy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        ref={borderGlowRef}
        className="glass-border-glow pointer-events-none absolute -inset-px z-[2] rounded-[inherit] opacity-0"
        aria-hidden
      />
      <div
        ref={spotlightRef}
        // mix-blend-soft-light — this used to be a plain (normal-blend)
        // white wash, tuned for the old light-card/dark-text design. Now
        // that cards are dark with light text, painting flat white over
        // text at 55% opacity read as a glow sitting "on top of" the
        // section instead of a light sheen on the glass. soft-light
        // brightens the surface it crosses without flattening the text's
        // own contrast underneath it.
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 mix-blend-soft-light transition-opacity duration-300"
        aria-hidden
      />
      <div
        ref={specularRef}
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
