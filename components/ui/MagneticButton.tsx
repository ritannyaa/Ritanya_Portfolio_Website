"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion/easing";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  external?: boolean;
  disabled?: boolean;
};

const variants = {
  primary: "btn-magnetic btn-magnetic--primary",
  secondary: "btn-magnetic btn-magnetic--secondary",
  outline: "btn-magnetic btn-magnetic--outline",
  ghost: "btn-magnetic btn-magnetic--ghost",
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  external,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  // getBoundingClientRect() forces a synchronous layout flush; raw mousemove
  // can fire far more often than the display refreshes, so the read is
  // coalesced to at most once per animation frame instead of once per event.
  const rafPending = useRef(false);
  const rafId = useRef(0);
  const latestPoint = useRef({ x: 0, y: 0 });

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      // A disabled button that still leans toward the cursor reads as
      // interactive when it isn't.
      if (reduced || disabled || !ref.current) return;
      latestPoint.current = { x: e.clientX, y: e.clientY };
      if (rafPending.current) return;
      rafPending.current = true;

      rafId.current = requestAnimationFrame(() => {
        rafPending.current = false;
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const { x: clientX, y: clientY } = latestPoint.current;
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });
    },
    [reduced, disabled]
  );

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafPending.current = false;
    if (ref.current) ref.current.style.transform = "";
  }, []);

  const baseClass = cn(
    "btn-magnetic-base relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5",
    variants[variant],
    disabled && "pointer-events-none opacity-60",
    className
  );

  const motionProps =
    reduced || disabled
      ? {}
      : {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.94 },
          transition: { duration: 0.25, ease: easeOutExpo },
        };

  const shine = !reduced && !disabled && (
    <span
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden
      style={{
        background:
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
      }}
    />
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        data-cursor="button"
        data-magnetic
        data-magnetic-strength="0.32"
        className={cn(baseClass, "group")}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {shine}
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor="button"
      data-magnetic
      data-magnetic-strength="0.32"
      className={cn(baseClass, "group")}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...motionProps}
    >
      {shine}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
