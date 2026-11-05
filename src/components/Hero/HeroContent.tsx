import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroContent } from './heroContent';
import { HeroHighlights } from './HeroHighlights';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export function HeroContent() {
  const { eyebrow, headline, description, primaryCta, secondaryCta } = heroContent;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-xl"
    >
      <motion.span
        variants={item}
        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-ink/20 text-xs font-semibold uppercase tracking-[0.2em] text-mute"
      >
        {eyebrow}
      </motion.span>

      <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
        {headline.map((line, i) => (
          <motion.span
            key={line}
            variants={item}
            className={`block ${i > 0 ? 'text-mute' : ''}`}
          >
            {line}
          </motion.span>
        ))}
      </h1>

      <motion.p variants={item} className="text-lg sm:text-xl text-mute mb-10">
        {description}
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
        <motion.a
          href={primaryCta.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-ink text-page px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <span>{primaryCta.label}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.a>
        <motion.a
          href={secondaryCta.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full font-semibold border border-ink/30 text-ink hover:bg-ink/10 transition-colors"
        >
          {secondaryCta.label}
        </motion.a>
      </motion.div>

      <motion.div variants={item}>
        <HeroHighlights />
      </motion.div>
    </motion.div>
  );
}
