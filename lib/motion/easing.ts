/* The site's motion vocabulary — one curve and two springs, used everywhere.
   `easeOutQuart` and `easeInOutSoft` used to sit alongside these and were
   never imported by anything; a shared constants file that lists options
   nobody chose stops describing the design. */

/** Decelerating curve for entrances and hover transitions. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Press feedback and lift — settles fast, barely overshoots. */
export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 32 };

/** Pointer-tracked motion (card tilt) — looser, so it trails the cursor. */
export const springSoft = { type: "spring" as const, stiffness: 280, damping: 28 };
