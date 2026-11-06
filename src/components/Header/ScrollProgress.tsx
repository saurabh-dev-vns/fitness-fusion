import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/** Thin line along the bottom of the header that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, opacity }}
      className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-ink"
    />
  );
}
