import { lazy, Suspense, useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { SceneErrorBoundary } from '../SceneErrorBoundary';
import type { FeatureKind } from './scene/IconScene';

// Keep three.js out of the main bundle; it loads on demand.
const FeatureIconCanvas = lazy(() => import('./scene/FeatureIconCanvas'));

interface FeatureIconProps {
  kind: FeatureKind;
  icon: LucideIcon;
  hovered: boolean;
}

export function FeatureIcon({ kind, icon: Icon, hovered }: FeatureIconProps) {
  const { ref, inView } = useInView({ rootMargin: '150px' });
  const [mounted, setMounted] = useState(false);

  // Create the WebGL context only once the card is near the viewport…
  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <Icon className="w-12 h-12 text-ink" aria-hidden />
    </div>
  );

  return (
    <div ref={ref} className="relative h-36 w-36 -ml-3 mb-2" aria-hidden>
      {mounted ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            {/* …and pause rendering whenever it scrolls out of view. */}
            <FeatureIconCanvas kind={kind} hovered={hovered} active={inView} />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
