import type { CursorMode } from "@/lib/interaction/cursor-physics";

export type Vec2 = { x: number; y: number };

/** Frame-rate independent 2D spring (mass-spring-damper). */
export class Spring2D {
  x: number;
  y: number;
  vx = 0;
  vy = 0;

  constructor(
    x: number,
    y: number,
    public stiffness: number,
    public damping: number,
    public mass = 1
  ) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  /** Advance toward target; dt in seconds */
  step(tx: number, ty: number, dt: number) {
    const ax =
      ((tx - this.x) * this.stiffness - this.vx * this.damping) / this.mass;
    const ay =
      ((ty - this.y) * this.stiffness - this.vy * this.damping) / this.mass;
    this.vx += ax * dt;
    this.vy += ay * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  get speed() {
    return Math.hypot(this.vx, this.vy);
  }
}

/** Smoothed pointer velocity (px/s). */
export class VelocityTracker {
  vx = 0;
  vy = 0;
  private rawVx = 0;
  private rawVy = 0;

  push(dx: number, dy: number, dt: number) {
    if (dt <= 0) return;
    this.rawVx = dx / dt;
    this.rawVy = dy / dt;
    const smooth = 1 - Math.exp(-14 * dt);
    this.vx += (this.rawVx - this.vx) * smooth;
    this.vy += (this.rawVy - this.vy) * smooth;
  }

  decay(dt: number) {
    const f = Math.exp(-8 * dt);
    this.vx *= f;
    this.vy *= f;
    this.rawVx *= f;
    this.rawVy *= f;
  }

  get speed() {
    return Math.hypot(this.vx, this.vy);
  }

  get angle() {
    return Math.atan2(this.vy, this.vx);
  }
}

/* Layer spring presets — higher stiffness = tighter follow. One entry per
   layer the cursor actually renders; `trail` and `halo` presets used to sit
   between these from a seven-layer version of the cursor that no longer
   exists. */
export const SPRING_LAYERS = {
  core: { stiffness: 420, damping: 32, mass: 0.85 },
  ring: { stiffness: 260, damping: 26, mass: 1 },
  aura: { stiffness: 72, damping: 16, mass: 1.25 },
} as const;

export function modeSpringMultiplier(mode: CursorMode): number {
  switch (mode) {
    case "button":
    case "link":
      return 1.12;
    case "card":
      return 0.88;
    case "text":
      return 1.05;
    default:
      return 1;
  }
}

export function predictTarget(
  x: number,
  y: number,
  vx: number,
  vy: number,
  lookahead = 0.045
): Vec2 {
  return {
    x: x + vx * lookahead,
    y: y + vy * lookahead,
  };
}

/** Idle micro-drift when nearly still */
export function idleOffset(time: number, amplitude = 1.4): Vec2 {
  return {
    x: Math.sin(time * 1.15) * amplitude,
    y: Math.cos(time * 0.85) * amplitude * 0.85,
  };
}

/** Velocity-based trail lag (px) — organic drag */
export function velocityLag(vx: number, vy: number, maxLag = 14): Vec2 {
  const speed = Math.hypot(vx, vy);
  if (speed < 40) return { x: 0, y: 0 };
  const t = Math.min(speed / 1200, 1);
  const lag = t * maxLag;
  return { x: (-vx / speed) * lag, y: (-vy / speed) * lag };
}

export function lerp(current: number, target: number, dt: number, rate: number) {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

export function energyFromSpeed(speed: number, maxSpeed = 1400): number {
  return Math.min(speed / maxSpeed, 1);
}
