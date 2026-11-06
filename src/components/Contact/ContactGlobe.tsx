import { lazy, Suspense, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { SceneErrorBoundary } from '../SceneErrorBoundary';
import { useLazyScene } from '../../hooks/useLazyScene';
import { contactContent } from './contactContent';

// three.js loads on demand, in its own chunk.
const GlobeCanvas = lazy(() => import('./scene/GlobeCanvas'));

interface ContactGlobeProps {
  /** Increments each time a message is sent – triggers the arc animation. */
  sendKey: number;
}

export function ContactGlobe({ sendKey }: ContactGlobeProps) {
  const { ref, inView, mounted } = useLazyScene();
  const { location } = contactContent;

  // Pointer position over the stage, -1 … 1 (a ref so mouse moves never re-render React).
  const pointer = useRef({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  const fallback = (
    <div className="w-full h-full flex items-center justify-center">
      <MapPin className="w-14 h-14 text-ink/30" aria-hidden />
    </div>
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`3D globe with a pin on ${location.label}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative h-72 overflow-hidden rounded-xl border border-line bg-card"
    >
      {mounted ? (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <GlobeCanvas
              location={location}
              sendKey={sendKey}
              active={inView}
              pointer={pointer}
            />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        fallback
      )}

      <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line bg-page/80 px-3 py-1 text-xs font-medium backdrop-blur pointer-events-none">
        <MapPin className="w-3.5 h-3.5" aria-hidden />
        {location.label}
      </span>
    </div>
  );
}
