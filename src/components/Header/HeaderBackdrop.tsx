import { motion, useScroll, useTransform } from 'framer-motion';

/** Theme-aware bar (white in light, black in dark) that fades in as you scroll. */
export function HeaderBackdrop() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="absolute inset-0 bg-page border-b border-line"
    />
  );
}
