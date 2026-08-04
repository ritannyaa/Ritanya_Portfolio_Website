"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import {
  applyLayerTransform,
  computeMagneticPull,
  detectCursorMode,
  getModeTargets,
  refreshMagneticCache,
  type CursorMode,
} from "@/lib/interaction/cursor-physics";
import {
  energyFromSpeed,
  idleOffset,
  lerp,
  modeSpringMultiplier,
  predictTarget,
  Spring2D,
  SPRING_LAYERS,
  VelocityTracker,
  velocityLag,
} from "@/lib/interaction/cursor-motion";
import { decayScrollVelocity, subscribeScrollVelocity } from "@/lib/interaction/scroll-velocity";

// width/height are layout-triggering writes, unlike transform/opacity, so
// skip the DOM write once a layer's size has converged to its target
// (sub-pixel deltas are invisible but were previously written every frame
// forever). border-radius/aspect-ratio are static and already set in CSS.
const lastSize = new WeakMap<HTMLElement, number>();

function setCircleSize(el: HTMLElement | null, size: number) {
  if (!el) return;
  const s = Math.max(0, size);
  const prev = lastSize.get(el);
  if (prev !== undefined && Math.abs(prev - s) < 0.12) return;
  lastSize.set(el, s);
  el.style.width = `${s}px`;
  el.style.height = `${s}px`;
}

function createSpring(
  x: number,
  y: number,
  layer: keyof typeof SPRING_LAYERS,
  modeMul: number
) {
  const cfg = SPRING_LAYERS[layer];
  return new Spring2D(
    x,
    y,
    cfg.stiffness * modeMul,
    cfg.damping,
    cfg.mass
  );
}

export function PremiumCursor() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const lastScrollAtRef = useRef(0);
  const visibleRef = useRef(true);
  const pressingRef = useRef(false);
  const modeRef = useRef<CursorMode>("default");
  const timeRef = useRef(0);

  const mouse = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef(new VelocityTracker());
  const springsReady = useRef(false);
  const coreSpring = useRef<Spring2D | null>(null);
  const ringSpring = useRef<Spring2D | null>(null);
  const auraSpring = useRef<Spring2D | null>(null);

  const anim = useRef({
    coreSize: 3.5,
    ringSize: 28,
    auraSize: 88,
    ringOpacity: 0.72,
    auraOpacity: 0.32,
    glow: 0.42,
    click: 0,
    ripple: 0,
    pulse: 0,
    energy: 0,
  });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.documentElement.classList.add("custom-cursor");

    // --cursor-glow feeds the ring's box-shadow blur radius — repainting
    // that every frame for imperceptible sub-percent deltas is wasted work,
    // unlike --cursor-x/y which must stay per-frame for smooth tracking.
    let lastGlow = -1;

    const initSprings = (x: number, y: number) => {
      coreSpring.current = createSpring(x, y, "core", 1);
      ringSpring.current = createSpring(x, y, "ring", 1);
      auraSpring.current = createSpring(x, y, "aura", 1);
      springsReady.current = true;
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!springsReady.current) initSprings(e.clientX, e.clientY);
      modeRef.current = visibleRef.current
        ? detectCursorMode(e.target as Element)
        : "hidden";
    };

    const onDown = () => {
      pressingRef.current = true;
      anim.current.ripple = 1;
    };
    const onUp = () => {
      pressingRef.current = false;
    };
    const onLeave = () => {
      visibleRef.current = false;
      modeRef.current = "hidden";
    };
    const onEnter = () => {
      visibleRef.current = true;
      modeRef.current = "default";
    };

    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = now;
      timeRef.current += dt;

      decayScrollVelocity(0.92);

      // If recent scroll activity, do a lightweight update to avoid heavy work
      const nowMs = performance.now();
      if (isScrollingRef.current && nowMs - lastScrollAtRef.current < 160) {
        // Minimal updates: position only (reduces heavy spring math and DOM writes)
        document.documentElement.style.setProperty(
          "--cursor-x",
          `${mouse.current.x}px`
        );
        document.documentElement.style.setProperty(
          "--cursor-y",
          `${mouse.current.y}px`
        );
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      if (dx !== 0 || dy !== 0) {
        velocity.current.push(dx, dy, dt);
      } else {
        velocity.current.decay(dt);
      }
      lastMouse.current = { x: mouse.current.x, y: mouse.current.y };

      if (!springsReady.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const mode = modeRef.current;
      const modeMul = modeSpringMultiplier(mode);
      const magnetic = computeMagneticPull(mouse.current.x, mouse.current.y);

      const vx = velocity.current.vx;
      const vy = velocity.current.vy;
      const speed = velocity.current.speed;
      anim.current.energy = lerp(
        anim.current.energy,
        energyFromSpeed(speed),
        dt,
        10
      );

      const pulse = 0.5 + Math.sin(timeRef.current * 1.8) * 0.5;
      anim.current.pulse = pulse;

      const predicted = predictTarget(
        mouse.current.x + magnetic.x,
        mouse.current.y + magnetic.y,
        vx,
        vy,
        0.04 + anim.current.energy * 0.02
      );

      const idle =
        speed < 35
          ? idleOffset(timeRef.current, 1.2 + pulse * 0.3)
          : { x: 0, y: 0 };

      const lag = velocityLag(vx, vy, 10 + anim.current.energy * 6);

      const ringTarget = {
        x: predicted.x + idle.x * 0.35,
        y: predicted.y + idle.y * 0.35,
      };
      const coreTarget = { x: predicted.x, y: predicted.y };
      const auraTarget = {
        x: predicted.x + lag.x * 1.35,
        y: predicted.y + lag.y * 1.35,
      };

      const applyModeStiffness = () => {
        const layers = [
          { s: coreSpring, key: "core" as const },
          { s: ringSpring, key: "ring" as const },
          { s: auraSpring, key: "aura" as const },
        ];
        for (const { s, key } of layers) {
          if (!s.current) continue;
          const cfg = SPRING_LAYERS[key];
          s.current.stiffness = cfg.stiffness * modeMul;
          s.current.damping = cfg.damping;
          s.current.mass = cfg.mass;
        }
      };
      applyModeStiffness();

      coreSpring.current!.step(coreTarget.x, coreTarget.y, dt);
      ringSpring.current!.step(ringTarget.x, ringTarget.y, dt);
      auraSpring.current!.step(auraTarget.x, auraTarget.y, dt);

      const targets = getModeTargets(visibleRef.current ? mode : "hidden");

      const a = anim.current;
      a.coreSize = lerp(a.coreSize, targets.core, dt, 12);
      a.ringSize = lerp(a.ringSize, targets.ring, dt, 10);
      a.auraSize = lerp(a.auraSize, targets.aura, dt, 8);
      a.ringOpacity = lerp(a.ringOpacity, Math.min(0.85, targets.ringOpacity), dt, 9);
      a.auraOpacity = lerp(a.auraOpacity, Math.min(0.5, targets.auraOpacity), dt, 8);
      a.glow = lerp(a.glow, targets.glow, dt, 8);
      a.ripple = lerp(a.ripple, 0, dt, 12);
      a.click = lerp(a.click, pressingRef.current ? 1 : 0, dt, 14);

      const hoverScale =
        mode === "button" || mode === "link"
          ? 1 + a.pulse * 0.014 + a.energy * 0.02
          : mode === "card"
            ? 1 + a.pulse * 0.01
            : mode === "text"
              ? 0.92
              : 1 + a.energy * 0.012;
      const pressScale = 1 - a.click * 0.07;
      const ringScale = hoverScale * pressScale;
      const coreScale = (1 - a.click * 0.1) * (mode === "text" ? 0.9 : 1);

      const opacity = visibleRef.current ? 1 : 0;

      const core = coreSpring.current!;
      const ring = ringSpring.current!;
      const aura = auraSpring.current!;

      if (rootRef.current) {
        rootRef.current.style.opacity = String(opacity);
      }

      document.documentElement.style.setProperty(
        "--cursor-x",
        `${mouse.current.x}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${mouse.current.y}px`
      );
      const glowValue = Math.min(0.85, a.glow + a.energy * 0.15);
      if (Math.abs(glowValue - lastGlow) > 0.004) {
        lastGlow = glowValue;
        document.documentElement.style.setProperty("--cursor-glow", String(glowValue));
      }

      applyLayerTransform(auraRef.current, aura.x, aura.y);
      applyLayerTransform(
        ringRef.current,
        ring.x,
        ring.y,
        `scale(${ringScale})`
      );
      applyLayerTransform(
        coreRef.current,
        core.x,
        core.y,
        `scale(${coreScale})`
      );

      const auraBoost = 1 + a.energy * 0.06 + (speed < 35 ? a.pulse * 0.03 : 0);

      if (auraRef.current) {
        setCircleSize(auraRef.current, a.auraSize * auraBoost);
        auraRef.current.style.opacity = String(
          a.auraOpacity * opacity * (0.9 + a.energy * 0.15)
        );
      }

      if (ringRef.current) {
        setCircleSize(ringRef.current, a.ringSize);
        ringRef.current.style.opacity = String(a.ringOpacity * opacity);
      }

      if (coreRef.current) {
        setCircleSize(coreRef.current, a.coreSize);
        coreRef.current.style.opacity = String(Math.min(0.92, 0.9 * opacity));
      }

      if (rippleRef.current) {
        const rippleScale = 1 + (1 - a.ripple) * 1.35;
        setCircleSize(rippleRef.current, a.ringSize);
        rippleRef.current.style.opacity = String(a.ripple * 0.38 * opacity);
        rippleRef.current.style.transform = `translate3d(${core.x}px, ${core.y}px, 0) translate(-50%, -50%) scale(${rippleScale})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Magnet rects are measured once up front, then only re-measured on
    // resize or once scrolling settles — never inside the per-frame tick.
    refreshMagneticCache();
    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
    const unsubscribeScroll = subscribeScrollVelocity(({ x, y }) => {
      if (Math.abs(y) > 0.12) {
        isScrollingRef.current = true;
        lastScrollAtRef.current = performance.now();
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(refreshMagneticCache, 180);
      }
    });

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refreshMagneticCache, 120);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", onResize);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      ["--cursor-x", "--cursor-y", "--cursor-glow"].forEach((p) =>
        document.documentElement.style.removeProperty(p)
      );
      cancelAnimationFrame(rafRef.current);
      clearTimeout(scrollEndTimer);
      clearTimeout(resizeTimer);
      unsubscribeScroll();
      springsReady.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", onResize);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div ref={rootRef} className="premium-cursor-root" aria-hidden>
      <div ref={auraRef} className="premium-cursor-aura" />
      <div ref={ringRef} className="premium-cursor-ring" />
      <div ref={coreRef} className="premium-cursor-core" />
      <div ref={rippleRef} className="premium-cursor-ripple" />
    </div>
  );
}
