"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Reduced scrub durations for responsive scroll-driven motion
const SCRUB_SOFT = 0.18;
const SCRUB_SLOW = 0.28;

export function useScrollExperience() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let ctx: gsap.Context;
      ctx = gsap.context(() => {
        ScrollTrigger.defaults({
          toggleActions: "play none none none",
        });

        /* Global scroll progress → CSS vars for ambient drift */
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            document.documentElement.style.setProperty(
              "--scroll-progress",
              self.progress.toFixed(4)
            );
          },
        });

        /* Section flow — lightweight enter (no continuous scrub) */
        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
          const container = section.querySelector(".section-container");
          const mesh = section.querySelector(".gradient-mesh");

          // Removed: this used to fromTo the section itself between opacity
          // 0.94 and 1 on scroll-into-view. gsap.fromTo applies the "from"
          // state immediately on mount, before the ScrollTrigger has fired —
          // so any section whose top starts below the 92% trigger line (true
          // for every section on initial load, since each one starts at the
          // bottom of the previous viewport) sat at 0.94 opacity until
          // scrolled. Hero has no [data-section], so it stayed fully opaque
          // while About sat 6% transparent from first paint — a real,
          // persistent seam at the very first fold of the page, not a
          // caching issue. The effect was subtle enough to add no real
          // value, so removed rather than patched. The container/heading
          // reveals below still provide the actual entrance animation.

          if (container) {
            gsap.fromTo(
              container,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 92%",
                  once: true,
                },
              }
            );
          }

          if (mesh) {
            // Remove heavy scroll-linked parallax — use a subtle entrance instead
            gsap.fromTo(
              mesh,
              { y: -8, opacity: 0.95 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 92%",
                  once: true,
                },
              }
            );
          }

          const heading = section.querySelector("[data-scroll-heading]");
          if (heading) {
            gsap.fromTo(
              heading,
              { y: 16, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 92%",
                  once: true,
                },
              }
            );
          }
        });

        /* Single element reveals */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.75,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          });
        });

        /* Bento / grid stagger */
        gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
          const items = gsap.utils.toArray<HTMLElement>(parent.children);
          if (!items.length) return;

          gsap.from(items, {
            opacity: 0,
            y: 38,
            scale: 0.97,
            duration: 0.8,
            stagger: { amount: 0.3, ease: "power2.out" },
            ease: "expo.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 87%",
              once: true,
            },
          });
        });

        /* Heading word stagger */
        gsap.utils.toArray<HTMLElement>("[data-reveal-words]").forEach((el) => {
          const words = el.querySelectorAll("[data-reveal-word]");
          if (!words.length) return;

          gsap.from(words, {
            opacity: 0,
            y: "1.1em",
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              once: true,
            },
          });
        });

        /* Parallax layers — replace heavy scroll-linked parallax with subtle entrance
           to avoid continuous scrub work. If stronger parallax is desired, add it
           intentionally for a few elements only. */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = Number(el.dataset.parallax) || 0.06;
          const travel = speed * 28;
          gsap.fromTo(
            el,
            { y: -travel * 0.5, opacity: 0.96 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el.closest("[data-section]") || document.body,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        /* Card depth while scrolling — subtle entrance instead of continuous scrub */
        gsap.utils.toArray<HTMLElement>("[data-scroll-depth]").forEach((el) => {
          const depth = Number(el.getAttribute("data-scroll-depth")) || 0.04;
          const lift = depth * 24;
          gsap.fromTo(
            el,
            { y: lift * 0.25, opacity: 0.96 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              force3D: true,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        /* Glass cards: subtle depth shift on reveal to add interactive layering */
        gsap.utils.toArray<HTMLElement>(".glass-card").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 10, scale: 1, opacity: 0.96 },
            {
              y: 0,
              scale: 1.006,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        /* Ambient orbs / decorative elements: gentle drift on reveal */
        gsap.utils.toArray<HTMLElement>(".ambient-orb").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 6, opacity: 0.92 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "sine.out",
              scrollTrigger: {
                trigger: el.closest("[data-section]") || el,
                start: "top 92%",
                once: true,
              },
            }
          );
        });

        /* Glass border glow: activate glow class when visible (cheap — toggles CSS).
           This one is intentionally NOT once:true — the glow is meant to
           reversibly turn on/off as the card scrolls in and out of view,
           not a one-time reveal. */
        gsap.utils.toArray<HTMLElement>(".glass-border-glow").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            onEnter: () => el.classList.add("glow-active"),
            onLeaveBack: () => el.classList.remove("glow-active"),
          });
        });

        /* Projects — enhance staggered reveals with slight scale & image emphasis */
        gsap.utils.toArray<HTMLElement>(".bento-grid").forEach((grid) => {
          const items = gsap.utils.toArray<HTMLElement>(grid.children);
          if (!items.length) return;
          gsap.from(items, {
            y: 34,
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 86%",
              once: true,
            },
          });
        });

        /* Stats counter area — gentle lift */
        const stats = document.querySelector("#section-counter");
        if (stats) {
          gsap.from(stats.querySelector(".glass-card"), {
            opacity: 0,
            y: 24,
            scale: 0.99,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stats,
              start: "top 85%",
              once: true,
            },
          });
        }
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t1 = setTimeout(refresh, 300);
      const t2 = setTimeout(refresh, 1200);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        window.removeEventListener("load", refresh);
        document.documentElement.style.removeProperty("--scroll-progress");
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, [reduced]);
}
