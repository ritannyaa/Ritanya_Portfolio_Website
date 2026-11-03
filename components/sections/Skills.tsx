"use client";

import { motion } from "framer-motion";
import { Brain, Code2, Users, Wrench } from "lucide-react";
import {
  levels,
  skillCategories,
  skillsIntro,
  type Level,
} from "@/lib/data/skills";
import { statsContent } from "@/lib/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils/cn";

const icons = {
  code: Code2,
  brain: Brain,
  wrench: Wrench,
  users: Users,
} as const;

function SkillBar({ name, level }: { name: string; level: Level }) {
  const { label, value } = levels[level];

  return (
    <div className="group space-y-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium text-stone-200">{name}</span>
        {/* The word, not a percentage — see the note in lib/data/skills.ts. */}
        <span className="text-xs text-stone-400">{label}</span>
      </div>
      <div
        className="relative h-2 overflow-hidden rounded-full bg-white/8"
        role="img"
        aria-label={`${name}: ${label}`}
      >
        <motion.div
          className="relative h-full origin-left rounded-full bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.35)] transition-[filter] duration-300 group-hover:brightness-110"
          style={{ width: `${value}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.9 }}
        >
          {/* One-time light sweep once the bar settles — not a looping shimmer */}
          <motion.span
            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            initial={{ opacity: 0, left: "-10%" }}
            whileInView={{ opacity: [0, 1, 0], left: "100%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            aria-hidden
          />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills-section"
      data-section
      className="section-padding"
      aria-label="Skills"
    >
      <div className="section-container">
        <SectionHeading
          watermark="stack"
          title="What I work with"
          description={skillsIntro}
        />

        <BentoGrid stagger className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat) => {
            const Icon = icons[cat.icon];
            return (
              <BentoItem key={cat.id} className="col-span-1" depth={0.07}>
                <div className="h-full">
                  <GlassCard className="h-full p-6 sm:p-8">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="inline-flex rounded-xl bg-amber-500/12 p-2.5 text-[var(--color-accent-soft)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-semibold text-stone-100">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="mb-5 text-xs leading-relaxed text-stone-400">
                      {cat.note}
                    </p>

                    {cat.skills && (
                      <div className="space-y-4">
                        {cat.skills.map((skill) => (
                          <SkillBar
                            key={skill.name}
                            name={skill.name}
                            level={skill.level}
                          />
                        ))}
                      </div>
                    )}

                    {/* A category the meter can't describe honestly renders as
                        prose instead — which also breaks the four-identical-
                        cards rhythm the grid had before. */}
                    {cat.points && (
                      <ul className="space-y-3">
                        {cat.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm leading-snug text-stone-400"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                </div>
              </BentoItem>
            );
          })}
        </BentoGrid>

        <div id="section-counter" className="mt-10 sm:mt-12">
          <GlassCard className="p-8 sm:p-10" hover={false}>
            <div
              className={cn(
                "grid grid-cols-2 gap-8 md:gap-6",
                statsContent.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4"
              )}
            >
              {statsContent.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  exact={stat.exact}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
