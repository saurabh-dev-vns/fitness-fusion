import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function ScrollCue() {
  return (
    <motion.a
      href="#stats"
      aria-label="Scroll to next section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mute hover:text-ink transition-colors hidden sm:block"
    >
      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="block"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.span>
    </motion.a>
  );
}
