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

        /* Bento / grid stagger — the single owner of a grid child's entrance.
           A second, near-identical pass used to run over `.bento-grid`
           children further down this file (y:34/scale .96 against this one's
           y:38/scale .97). Every staggered BentoGrid carries both the class
           and the attribute, so both fired on the same elements and fought
           over the same transform. Removed there, kept here. */
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

        /* A [data-parallax] pass used to sit here. No element in the codebase
           carries that attribute, so it walked an empty list on every mount. */

        /* Card depth while scrolling — subtle entrance instead of continuous
           scrub. Skipped inside a staggered grid: BentoItem sets both
           data-scroll-depth and sits as a direct child of [data-reveal-stagger],
           so it was being revealed twice, and the two tweens' opacity ramps
           crossed each other mid-flight. */
        gsap.utils.toArray<HTMLElement>("[data-scroll-depth]").forEach((el) => {
          if (el.parentElement?.hasAttribute("data-reveal-stagger")) return;
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

        /* Glass cards: subtle lift on reveal, for cards that stand alone.
           Two corrections here:
           - it used to settle at scale 1.006 and stay there. A permanent
             0.6% upscale isn't perceptible as motion, but it does leave the
             card on a scaled composited layer, which softens its text. Ends
             at 1 now.
           - cards inside a staggered grid already have an entrance from the
             stagger pass above; this was a third tween on the same element. */
        gsap.utils.toArray<HTMLElement>(".glass-card").forEach((el) => {
          if (el.closest("[data-reveal-stagger]")) return;
          gsap.fromTo(
            el,
            { y: 10, opacity: 0.96 },
            {
              y: 0,
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

        /* A `.glass-border-glow` → `glow-active` pass used to sit here. It was
           deliberately not once:true, so it left one permanently live
           ScrollTrigger per card (a dozen on the home page) recalculating on
           every scroll — to toggle a class whose only CSS rule targeted a
           ::after that does not exist. Removed with the rule. */

        /* The duplicate `.bento-grid` stagger that used to live here is gone —
           see the note on the [data-reveal-stagger] pass above. It animated
           the same children with a second set of values, and the two tweens
           overlapped rather than composed. */

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
