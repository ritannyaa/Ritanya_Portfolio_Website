"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Certificate } from "@/lib/data/certificates";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { easeOutExpo } from "@/lib/motion/easing";

type CertificateCardProps = {
  certificate: Certificate;
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <TiltCard className="group flex h-full flex-col overflow-hidden p-0" intensity={9}>
      <a
        href={certificate.link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="button"
        className="relative block w-full overflow-hidden bg-slate-800 aspect-[4/3] transition-transform duration-150 active:scale-[0.98]"
        aria-label={`View certificate: ${certificate.title}`}
      >
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <Image
            src={certificate.image}
            alt={certificate.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
        <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-white/80 p-2 text-slate-700 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5" />
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-accent-soft)]">
          {certificate.date}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100 transition-colors group-hover:text-blue-400">
          {certificate.title}
        </h3>
        <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>

        <div className="mt-5">
          <MagneticButton
            href={certificate.link}
            variant="outline"
            external
            className="!px-4 !py-2 text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Certificate
          </MagneticButton>
        </div>
      </div>
    </TiltCard>
  );
}
