"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Tracks which section is currently in view.
 *
 * Accepts hrefs like "#home-section" or "/#home-section"; returns the active
 * bare id.
 *
 * The effect keys off a joined string rather than the array itself. Callers
 * build their href list inline (`navItems.filter(…).map(…)`), which is a new
 * array reference every render — as a dependency that tore down and rebuilt
 * the IntersectionObserver on each one, and this component re-renders on both
 * scroll state and active-section changes. A primitive key is stable by value,
 * so the observer is created once and survives.
 */
export function useActiveSection(sectionHrefs: readonly string[]) {
  const key = sectionHrefs.join("|");

  const ids = useMemo(
    () =>
      key
        .split("|")
        .map((href) => href.split("#")[1] ?? "")
        .filter(Boolean),
    [key]
  );

  const [active, setActive] = useState(() => ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

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
