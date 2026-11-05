import { HeroContent } from './HeroContent.tsx';
import { HeroVisual } from './HeroVisual';
import { ScrollCue } from './ScrollCue';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-900 dark:via-black dark:to-black text-ink">
      <div className="relative w-full max-w-6xl mx-auto px-4 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <HeroContent />
        <HeroVisual />
      </div>
      <ScrollCue />
    </div>
  );
}
