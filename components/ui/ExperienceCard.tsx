"use client";

import Image from "next/image";
import { ExternalLink, Briefcase } from "lucide-react";
import type { ExperienceItem } from "@/lib/data/experience";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";

type ExperienceCardProps = {
  item: ExperienceItem;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <GlassCard className="flex h-full flex-col overflow-hidden p-0" hover={false}>
      {item.certificateImage && (
        <a
          href={item.certificateLink ?? item.certificateImage}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="button"
          className="relative block w-full overflow-hidden bg-slate-800 aspect-[16/10] transition-transform duration-150 active:scale-[0.98]"
          aria-label={`View certificate for ${item.role}`}
        >
          <Image
            src={item.certificateImage}
            alt={`${item.role} certificate`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
        </a>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <Briefcase className="h-3.5 w-3.5" />
          {item.type}
        </p>

        <h3 className="text-xl font-semibold text-slate-100">{item.role}</h3>
        <p className="mt-1 text-sm font-medium text-slate-400">
          {item.organization} &middot; {item.duration}
        </p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
          {item.description}
        </p>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {item.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {item.certificateLink && (
          <div className="mt-5">
            <MagneticButton
              href={item.certificateLink}
              variant="outline"
              external
              className="!px-4 !py-2 text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Certificate
            </MagneticButton>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
