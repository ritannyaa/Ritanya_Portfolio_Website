export type CursorMode = "default" | "button" | "card" | "text" | "hidden" | "link";

export type CursorTargets = {
  core: number;
  ring: number;
  aura: number;
  ringOpacity: number;
  auraOpacity: number;
  glow: number;
};

/** All targets use perfect circles — no border-radius morphing */
const MODE_TARGETS: Record<CursorMode, CursorTargets> = {
  default: {
    core: 3.5,
    ring: 28,
    aura: 88,
    ringOpacity: 0.72,
    auraOpacity: 0.32,
    glow: 0.42,
  },
  button: {
    core: 3,
    ring: 36,
    aura: 100,
    ringOpacity: 0.78,
    auraOpacity: 0.38,
    glow: 0.55,
  },
  link: {
    core: 3,
    ring: 32,
    aura: 92,
    ringOpacity: 0.75,
    auraOpacity: 0.35,
    glow: 0.5,
  },
  card: {
    core: 3.5,
    ring: 40,
    aura: 108,
    ringOpacity: 0.76,
    auraOpacity: 0.4,
    glow: 0.58,
  },
  text: {
    core: 2.5,
    ring: 24,
    aura: 72,
    ringOpacity: 0.68,
    auraOpacity: 0.28,
    glow: 0.38,
  },
  hidden: {
    core: 0,
    ring: 0,
    aura: 0,
    ringOpacity: 0,
    auraOpacity: 0,
    glow: 0,
  },
};

export function getModeTargets(mode: CursorMode): CursorTargets {
  return MODE_TARGETS[mode];
}

/** Not exported — cursor-motion.ts has its own (differently-shaped, dt+rate
 * based) lerp; PremiumCursor.tsx used to import this 3-arg one by mistake
 * and call it with 4 args everywhere, silently dropping the rate argument.
 * Keeping this one module-private avoids that ambiguity happening again. */
function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor;
}

export function springStep(
  current: number,
  target: number,
  velocity: number,
  stiffness = 0.12,
  damping = 0.78
): { value: number; velocity: number } {
  const force = (target - current) * stiffness;
  const v = velocity * damping + force;
  return { value: current + v, velocity: v };
}

export type Vec2 = { x: number; y: number };

export function detectCursorMode(el: Element | null): CursorMode {
  if (!el) return "default";
  const target = (el as HTMLElement).closest(
    "[data-cursor], a, button, [role='button'], input, textarea, select, label"
  ) as HTMLElement | null;
  if (!target) return "default";

  const mode = target.dataset.cursor as CursorMode | undefined;
  if (mode && mode in MODE_TARGETS) return mode;

  if (
    target.matches("button, [role='button'], .btn-magnetic-base, [data-magnetic]")
  ) {
    return "button";
  }
  if (target.matches(".glass-tilt, .glass-card, [data-cursor='card']")) {
    return "card";
  }
  if (target.matches("[data-cursor='text']")) {
    return "text";
  }
  if (target.matches("a")) return "link";

  return "default";
}

type MagnetEntry = {
  cx: number;
  cy: number;
  halfW: number;
  halfH: number;
  strength: number;
};

// Rects are measured only on refreshMagneticCache() (mount/resize/scroll-end),
// never inside the per-frame tick loop — getBoundingClientRect() forces a
// synchronous layout flush, which is ruinous at 60fps.
let magnetCache: MagnetEntry[] = [];

export function refreshMagneticCache() {
  const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  magnetCache = Array.from(magnets, (el) => {
    const rect = el.getBoundingClientRect();
    return {
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
      halfW: rect.width / 2 + 14,
      halfH: rect.height / 2 + 14,
      strength: Number(el.dataset.magneticStrength) || 0.16,
    };
  });
}

export function computeMagneticPull(x: number, y: number, maxDistance = 100): Vec2 {
  let pullX = 0;
  let pullY = 0;

  for (const { cx, cy, halfW, halfH, strength: pullStrength } of magnetCache) {
    const dx = x - cx;
    const dy = y - cy;

    if (Math.abs(dx) < halfW && Math.abs(dy) < halfH) {
      const nx = dx / halfW;
      const ny = dy / halfH;
      const dist = Math.sqrt(nx * nx + ny * ny);
      if (dist < 1) {
        const strength = (1 - dist) * (1 - dist);
        pullX += (cx - x) * strength * pullStrength;
        pullY += (cy - y) * strength * pullStrength;
      }
    }
  }

  const mag = Math.hypot(pullX, pullY);
  if (mag > maxDistance * 0.3) {
    const s = (maxDistance * 0.3) / mag;
    pullX *= s;
    pullY *= s;
  }

  return { x: pullX, y: pullY };
}

export function applyLayerTransform(
  el: HTMLElement | null,
  x: number,
  y: number,
  extra = ""
) {
  if (!el) return;
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) ${extra}`;
}

export function smoothVelocity(
  current: Vec2,
  target: Vec2,
  factor = 0.18
): Vec2 {
  return {
    x: lerp(current.x, target.x, factor),
    y: lerp(current.y, target.y, factor),
  };
}
