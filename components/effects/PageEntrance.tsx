/**
 * Page-level fade-in.
 *
 * Deliberately a CSS animation rather than a Framer Motion one. The motion
 * version rendered `style="opacity:0"` into the server HTML and depended on
 * JavaScript to animate it back to 1 — so any failure to hydrate (a blocked
 * or 404'd chunk, a throwing client component elsewhere on the page, a
 * navigation aborted mid-download) left every section on the site invisible
 * with no indication why. The navbar sits outside this wrapper, so the result
 * was a page that looked empty rather than broken.
 *
 * A keyframe animation cannot fail that way: with no JavaScript it still
 * runs, and if the stylesheet itself fails the element simply defaults to
 * opacity 1 and the content is visible. Reduced-motion is handled by the
 * global rule in globals.css, which collapses every animation to 0.01ms.
 *
 * It is also no longer a client component, so the wrapper costs nothing in
 * the bundle.
 */
export function PageEntrance({ children }: { children: React.ReactNode }) {
  return <div className="page-entrance">{children}</div>;
}
