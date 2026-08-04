"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo } from "@/lib/motion/easing";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
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
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />

        {project.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-blue-700">
            <Sparkles className="h-3 w-3" />
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-2 text-xs font-medium text-slate-400">
          {project.tech.join(" · ")}
        </p>

        <h3 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-blue-400">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <MagneticButton
            href={project.github}
            variant="primary"
            external
            className="!px-4 !py-2 text-xs"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </MagneticButton>
          <MagneticButton
            href={project.live ?? project.github}
            variant="outline"
            external
            className="!px-4 !py-2 text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {project.live ? "Live Preview" : "View Code"}
          </MagneticButton>
        </div>
      </div>
    </TiltCard>
  );
}
