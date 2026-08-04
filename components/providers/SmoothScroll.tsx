"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { publishScrollVelocity } from "@/lib/interaction/scroll-velocity";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduced) return;

    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const lenis = new Lenis({
      // Near-native responsiveness: minimal smoothing, snappy catch-up
      duration: 0.28,
      easing: (t) => t,
      // enable smooth wheel only for touch devices (keep native wheel feel on desktop)
      smoothWheel: isTouch,
      touchMultiplier: 1,
      wheelMultiplier: isTouch ? 1.1 : 1.35,
      // moderate lerp for quick catch-up without float
      lerp: 0.12,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (instance: Lenis) => {
      publishScrollVelocity(0, instance.velocity);
      ScrollTrigger.update();

      // expose lightweight CSS vars for cheap, GPU-driven visual reactions
      try {
        const doc = document.documentElement;
        const total = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const prog = Math.max(0, Math.min(1, instance.scroll / total));
        doc.style.setProperty("--scroll-progress", prog.toFixed(4));
        const vel = Math.abs(instance.velocity || 0);
        // small smoothing for visual stability
        const velClamped = Math.min(3, vel);
        doc.style.setProperty("--scroll-vel", String(velClamped.toFixed(3)));
        const angle = (prog * 360) % 360;
        doc.style.setProperty("--glow-angle", `${angle}deg`);
      } catch (e) {
        // defensive: ignore in non-browser environments
      }
    });

    // Use a single requestAnimationFrame loop instead of gsap.ticker
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target?.hash) return;
      const el = document.querySelector(target.hash);
      if (!el) return;
      e.preventDefault();
      if (lenisRef.current && !reduced) {
        // quick, snappy anchor navigation that never feels sluggish
        lenisRef.current.scrollTo(target.hash, {
          offset: -88,
          duration: 0.48,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return <>{children}</>;
}
