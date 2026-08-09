"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo } from "@/lib/motion/easing";

type ProjectCardProps = {
  project: Project;
  /** True for cards above the fold on first paint — see the note on `sizes`. */
  priority?: boolean;
};

/* Mirrors the grid this card sits in (1 col → 2 at md → 3 at lg) inside a
   max-w-6xl container. The old value claimed 50vw at every desktop width,
   so the browser fetched a ~720px source for a ~380px slot. */
const IMAGE_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 380px";

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <TiltCard
      className="group flex h-full flex-col overflow-hidden p-0"
      intensity={9}
    >
      <div className="relative w-full overflow-hidden bg-slate-800 aspect-[16/10]">
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes={IMAGE_SIZES}
            priority={priority}
            // Below the fold by definition when not prioritised; async decode
            // keeps a large image off the main thread during scroll.
            loading={priority ? "eager" : "lazy"}
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />

        {/* Replaces the "Featured" ribbon, which no card ever set and which
            says nothing anyway. A status only appears where the honest answer
            is "not finished" — one card in three, so the row isn't uniform. */}
        {project.status && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 px-2.5 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            {project.status}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-blue-400">
          {project.name}
        </h3>
        <p className="mt-0.5 text-sm text-slate-400">{project.kicker}</p>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {project.blurb}
        </p>

        {/* The part a senior engineer actually wants to read, given its own
            block so it isn't buried inside a paragraph of features. */}
        <div className="mt-4 rounded-xl border-l-2 border-blue-500/40 bg-white/[0.03] py-3 pl-3.5 pr-3">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--color-accent-soft)]">
            The hard part
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            {project.hardPart}
          </p>
        </div>

        <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-400">
          {project.tech.join(" · ")}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.live && (
            <MagneticButton
              href={project.live}
              variant="primary"
              external
              className="!px-4 !py-2 text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </MagneticButton>
          )}
          {/* No repo, no button. The alternative — a link that 404s — is worse
              than an absent one, and one of these cards genuinely has no
              public repo yet. */}
          {project.github ? (
            <MagneticButton
              href={project.github}
              variant={project.live ? "outline" : "primary"}
              external
              className="!px-4 !py-2 text-xs"
            >
              <Github className="h-3.5 w-3.5" />
              Read the code
            </MagneticButton>
          ) : (
            <span className="text-xs text-slate-400">Repo not public yet</span>
          )}
        </div>
      </div>
    </TiltCard>
  );
}
