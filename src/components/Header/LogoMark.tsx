import { lazy, Suspense } from 'react';
import { useScroll } from 'framer-motion';
import { Dumbbell } from 'lucide-react';
import { SceneErrorBoundary } from '../SceneErrorBoundary';
import { useLazyScene } from '../../hooks/useLazyScene';

// three.js loads on demand, in its own chunk.
const LogoCanvas = lazy(() => import('./scene/LogoCanvas'));

const SIZES = {
  sm: { box: 'w-10 h-10', icon: 'w-8 h-8' },
  lg: { box: 'w-28 h-28', icon: 'w-16 h-16' },
} as const;

interface LogoMarkProps {
  size?: keyof typeof SIZES;
  hovered?: boolean;
}

/** The brand mark: a 3D weight plate that rolls as the page scrolls. */
export function LogoMark({ size = 'sm', hovered = false }: LogoMarkProps) {
  const { ref, inView, mounted } = useLazyScene('0px');
  const { scrollYProgress } = useScroll();
  const { box, icon } = SIZES[size];

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <Dumbbell className={icon} aria-hidden />
    </div>
  );

  return (
    <div ref={ref} aria-hidden className={`relative shrink-0 ${box}`}>
      {mounted ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <LogoCanvas hovered={hovered} active={inView} scroll={scrollYProgress} />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
