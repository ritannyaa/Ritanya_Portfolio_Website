/* A tiny pub/sub carrying Lenis's scroll velocity from SmoothScroll to the
   cursor, so neither has to know about the other. A `getScrollVelocity()`
   pull-accessor used to sit here too and nothing ever called it. */
type Listener = (velocity: { x: number; y: number }) => void;

let vy = 0;
let vx = 0;
const listeners = new Set<Listener>();

export function publishScrollVelocity(x: number, y: number) {
  vx = x;
  vy = y;
  listeners.forEach((fn) => fn({ x: vx, y: vy }));
}

export function subscribeScrollVelocity(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function decayScrollVelocity(factor = 0.88) {
  vx *= factor;
  vy *= factor;
  if (Math.abs(vx) < 0.01) vx = 0;
  if (Math.abs(vy) < 0.01) vy = 0;
}
