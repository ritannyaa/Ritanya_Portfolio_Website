"use client";

import { useEffect, useState } from "react";

/** Accepts hrefs like "#home-section" or "/#home-section"; returns the active bare id. */
export function useActiveSection(sectionHrefs: string[]) {
  const ids = sectionHrefs.map((href) => href.split("#")[1] ?? "");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -45% 0px", threshold: [0.15, 0.35, 0.55] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
