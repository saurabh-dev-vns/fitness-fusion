import { lazy, Suspense } from 'react';
import type { LucideIcon } from 'lucide-react';
import { SceneErrorBoundary } from '../SceneErrorBoundary';
import { useLazyScene } from '../../hooks/useLazyScene';
import type { ClassKind, PointerRef } from './scene/types';

// three.js loads on demand, in its own chunk.
const ClassStageCanvas = lazy(() => import('./scene/ClassStageCanvas'));

interface ClassStageProps {
  kind: ClassKind;
  icon: LucideIcon;
  image: string;
  hovered: boolean;
  pointer: PointerRef;
}

export function ClassStage({ kind, icon: Icon, image, hovered, pointer }: ClassStageProps) {
  const { ref, inView, mounted } = useLazyScene();

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <Icon className="w-14 h-14 text-ink/30" aria-hidden />
    </div>
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative h-64 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-black"
    >
      {/* faint photo for texture – the 3D object is the hero of the card */}
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
      />

      <div className="absolute inset-0">
        {mounted ? (
          <SceneErrorBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <ClassStageCanvas
                kind={kind}
                hovered={hovered}
                active={inView}
                pointer={pointer}
              />
            </Suspense>
          </SceneErrorBoundary>
        ) : (
          fallback
        )}
      </div>

      {/* blend the stage into the card body */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
    </div>
  );
}
