/* Deliberately a plain join, not the clsx + tailwind-merge pairing. Nothing
   here relies on later utilities overriding earlier ones — the few places
   that need to win use `!` instead — so the 8kB of tailwind-merge bought
   nothing. A second, unused copy of `cn` built on it used to sit in
   lib/utils.ts; that file and both dependencies are gone. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
