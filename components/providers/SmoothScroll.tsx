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

      // One CSS var, written per scroll event, driving the nav progress bar's
      // scaleX. --scroll-vel and --glow-angle were written alongside it and
      // no stylesheet ever read either: --glow-angle is set per-card by
      // TiltCard from the pointer position, and --scroll-vel had no consumer
      // at all. Two of three per-event style writes were doing nothing.
      const doc = document.documentElement;
      const total = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, instance.scroll / total));
      doc.style.setProperty("--scroll-progress", progress.toFixed(4));
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
      // Modified clicks and anything but the primary button belong to the
      // browser (open in new tab, etc.) — never swallow those.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      // Matches both `#id` and `/#id`. The selector used to be a[href^="#"],
      // which every nav link missed — they are authored as "/#about-section"
      // so they can also be followed from /experience and /certificates.
      // Those clicks fell through to a Next.js route push plus a native jump,
      // so the same gesture scrolled two different ways depending on which
      // link you used.
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      // CSS.escape guards ids that would otherwise be an invalid selector.
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();

      if (lenisRef.current && !reduced) {
        lenisRef.current.scrollTo(el, {
          // Clears the fixed dock, which nothing in normal flow accounts for.
          offset: -88,
          duration: 0.48,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      }

      // Keep the address bar honest without letting the browser also jump.
      window.history.replaceState(null, "", url.hash);

      // Anchor navigation must move focus, not just the viewport — otherwise
      // a keyboard user's next Tab continues from the link they just left
      // rather than from the section they asked for (WCAG 2.4.3).
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return <>{children}</>;
}
