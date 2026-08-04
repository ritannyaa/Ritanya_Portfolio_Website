"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import type { IconType } from "react-icons";
// Named imports from the Simple Icons set — tree-shaken per icon, so only the
// nine glyphs actually used reach the bundle.
import {
  SiFastapi,
  SiGit,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiSupabase,
  SiTensorflow,
} from "react-icons/si";
import "./Hero.css";
import { siteConfig } from "@/lib/data/site";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const HEADING =
  " Hi   !\nI am Yahesh M\na pre-final year B.Tech student, specializing in\nAI and Data Science.";
const HEADING_NAME = "Yahesh M";
// Keep the final line in the accent treatment while preserving each authored
// line break in the typewriter heading.
const HEADING_SPLIT = HEADING.lastIndexOf("\n") + 1;

const AVAILABILITY = "I'm open for job & internship opportunities";

type Technology = {
  name: string;
  icon: IconType;
  /** Official brand colour — see the note on the three overrides below. */
  color: string;
  orbit: 1 | 2 | 3 | 4;
  /** Position around the ring, degrees clockwise from 12 o'clock. */
  angle: number;
  radius: number;
  size?: "md" | "lg";
  /** Tone of the accent-blue halo — see the glow block in Hero.css. */
  glow: "deep" | "mid" | "bright" | "soft" | "pale";
  delay: number;
};

/* Every orbital field below (orbit, angle, radius, size, glow, delay) is
   carried over unchanged from the nodes these replaced, so the motion is
   byte-for-byte what it was — only the rendered glyph differs.

   The one exception is PostgreSQL: the stack has ten technologies and the
   design had nine nodes, so it adds a second node to orbit 3 (which held only
   one, opposite TensorFlow at 310° so the ring stays balanced). Its radius is
   325 — the value orbit 3 already uses — so no ring geometry, speed or easing
   changes; it is purely one more item riding the existing path.

   Two brand colours are deliberately not the primary hex: pandas (#150458) and
   NumPy (#013243) are near-black and vanish on this surface, so both use the
   light tones from their own official palettes. The other eight are the
   official Simple Icons values. */
const orbitTechnologies: Technology[] = [
  { name: "Python", icon: SiPython, color: "#4B8BBE", orbit: 1, angle: 270, radius: 177, glow: "bright", delay: 0.6 },
  { name: "pandas", icon: SiPandas, color: "#E70488", orbit: 2, angle: 60, radius: 251, glow: "pale", delay: 0.8 },
  { name: "NumPy", icon: SiNumpy, color: "#4DABCF", orbit: 2, angle: 180, radius: 251, size: "md", glow: "soft", delay: 1.0 },
  { name: "Git", icon: SiGit, color: "#F05032", orbit: 2, angle: 300, radius: 251, glow: "mid", delay: 1.2 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", orbit: 3, angle: 130, radius: 325, size: "lg", glow: "soft", delay: 1.4 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", orbit: 3, angle: 310, radius: 325, glow: "pale", delay: 2.45 },
  { name: "FastAPI", icon: SiFastapi, color: "#009688", orbit: 4, angle: 30, radius: 399, glow: "bright", delay: 1.6 },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", orbit: 4, angle: 95, radius: 399, size: "lg", glow: "deep", delay: 1.85 },
  { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E", orbit: 4, angle: 220, radius: 399, size: "lg", glow: "mid", delay: 2.1 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", orbit: 4, angle: 320, radius: 399, glow: "deep", delay: 2.3 },
];

/** Counts 0 → `target` with an easeOutCubic curve, after a fixed lead-in. */
function useCountUp(target: number, duration = 2000, delay = 1200) {
  const [value, setValue] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(start, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay, reduced]);

  return value;
}

function TypewriterHeading({
  text,
  split,
  speed = 35,
  delay = 400,
}: {
  text: string;
  split: number;
  speed?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      doneRef.current = true;
      return;
    }

    let interval = 0;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((n) => {
          if (n >= text.length) {
            window.clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [text, speed, delay, reduced]);

  const typed = text.slice(0, count);
  const typing = count < text.length;
  const nameStart = text.indexOf(HEADING_NAME);
  const nameEnd = nameStart + HEADING_NAME.length;

  return (
    <h1 className="mkt-heading">
      <span>{typed.slice(0, nameStart)}</span>
      <span className="mkt-heading-accent mkt-heading-name">{typed.slice(nameStart, nameEnd)}</span>
      <span>{typed.slice(nameEnd, split)}</span>
      <span className="mkt-heading-accent">{typed.slice(split)}</span>
      {typing && <span className="mkt-caret" aria-hidden="true" />}
      {/* The visible text is built up a character at a time, which reads as
          gibberish to a screen reader; the full sentence is exposed once here
          instead. */}
      <span className="sr-only">{text}</span>
    </h1>
  );
}

export function Hero() {
  const dsaProblems = useCountUp(20);

  return (
    <section id="home-section" className="mkt-hero" aria-label="Home">
      <div className="mkt-body">
        <div className="mkt-left">
          <TypewriterHeading text={HEADING} split={HEADING_SPLIT} />

          <div className="mkt-cta" aria-label="Social links">
            <a
              className="mkt-social-link"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" size={18} strokeWidth={2} />
              <span>LinkedIn</span>
            </a>
            <a
              className="mkt-social-link"
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github aria-hidden="true" size={18} strokeWidth={2} />
              <span>GitHub</span>
            </a>
            <a className="mkt-social-link" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" size={18} strokeWidth={2} />
              <span>Mail</span>
            </a>
          </div>

          <div className="mkt-cursor" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3l14 8.5-6.2 1.4L9.4 19 5 3z"
                fill="var(--color-accent)"
                stroke="var(--color-accent)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="mkt-cursor-label">Yahesh</span>
          </div>
        </div>

        <div className="mkt-right">
          <div className="mkt-circles">
            {([1, 2, 3, 4] as const).map((n) => (
              <div key={n} className={`mkt-orbit mkt-orbit-${n}`}>
                {n === 1 && (
                  <div className="mkt-counter">
                    <span className="mkt-counter-value">{dsaProblems}+</span>
                    <span className="mkt-counter-label">DSA Problems</span>
                  </div>
                )}

                {orbitTechnologies.filter((t) => t.orbit === n).map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.name}
                      className="mkt-orbit-item"
                      style={{
                        // Rotate out to the ring, then unrotate by the same
                        // amount so the card starts level on it.
                        transform: `translate(-50%, -50%) rotate(${t.angle}deg) translate(${t.radius}px) rotate(${-t.angle}deg)`,
                      }}
                    >
                      {/* The unrotate above only levels the card at rest — once
                          the ring starts turning, the card turns with it and a
                          squircle reads as a tilted square. This layer cancels
                          its ring's rotation continuously (same period,
                          opposite direction), so cards ride the identical path
                          but stay upright. It has to be its own element:
                          transform is a single property, so it cannot share
                          one with the fly-in animation below. */}
                      <div className={`mkt-orbit-upright mkt-upright-${n}`}>
                        <div
                          className={[
                            "mkt-avatar",
                            t.size ? `mkt-avatar--${t.size}` : "",
                            `mkt-avatar--${t.glow}`,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ animationDelay: `${t.delay}s` }}
                          role="img"
                          aria-label={t.name}
                          title={t.name}
                        >
                          {/* The card carries the accessible name, so the glyph
                              itself is hidden to avoid announcing it twice. */}
                          <Icon color={t.color} aria-hidden="true" focusable="false" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The wrapper owns the entrance animation and the anchor owns the hover
          lift: mkt-fade-up runs with `both`, so its final transform stays
          applied and would override a transform set on the same element. */}
      <div className="mkt-status-wrap">
        <a className="mkt-status" href="#contact-section">
          <span className="mkt-status-dot" aria-hidden="true" />
          <span>{AVAILABILITY}</span>
        </a>
      </div>
    </section>
  );
}
