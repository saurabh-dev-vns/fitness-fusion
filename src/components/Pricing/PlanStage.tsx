import { lazy, Suspense } from 'react';
import type { LucideIcon } from 'lucide-react';
import { SceneErrorBoundary } from '../SceneErrorBoundary';
import { useLazyScene } from '../../hooks/useLazyScene';
import type { PointerRef } from './scene/types';

// three.js loads on demand, in its own chunk.
const PlanStageCanvas = lazy(() => import('./scene/PlanStageCanvas'));

interface PlanStageProps {
  icon: LucideIcon;
  plates: number;
  halos: number;
  hovered: boolean;
  pointer: PointerRef;
  /** True for the card with inverted colours, so the 3D palette flips with it. */
  inverted: boolean;
}

export function PlanStage({
  icon: Icon,
  plates,
  halos,
  hovered,
  pointer,
  inverted,
}: PlanStageProps) {
  // Negative margin: only count as "visible" once it's well inside the screen,
  // so the plates load onto the bar while the user is actually looking.
  const { ref, inView, mounted } = useLazyScene('-60px');

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <Icon className="w-12 h-12 opacity-30" aria-hidden />
    </div>
  );

  return (
    <div ref={ref} aria-hidden className="relative h-48">
      {mounted ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <PlanStageCanvas
              plates={plates}
              halos={halos}
              hovered={hovered}
              active={inView}
              pointer={pointer}
              inverted={inverted}
            />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}
