import { lazy, Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SceneErrorBoundary } from '../SceneErrorBoundary';

const PlateWallCanvas = lazy(() => import('./scene/PlateWallCanvas'));

// Fade the wall out toward the edges so it never competes with the content.
const MASK =
  'radial-gradient(ellipse at center, black 25%, transparent 75%)';

export function PlateWallBackground() {
  const { ref, inView } = useInView({ rootMargin: '200px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-40"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      {mounted && (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <PlateWallCanvas active={inView} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
