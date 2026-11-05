import { Component, lazy, Suspense, type ReactNode } from 'react';
import { Dumbbell } from 'lucide-react';

// three.js is heavy – load it in its own chunk so the text paints immediately.
const HeroScene = lazy(() => import('./scene/HeroScene'));

/** Static stand-in shown while the 3D chunk loads, or if WebGL is unavailable. */
function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Dumbbell className="w-40 h-40 text-ink/10" aria-hidden />
    </div>
  );
}

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export function HeroVisual() {
  return (
    <div
      className="relative w-full h-[380px] sm:h-[460px] lg:h-[640px]"
      role="img"
      aria-label="Animated 3D barbell, dumbbell and kettlebell"
    >
      <SceneErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <HeroScene />
        </Suspense>
      </SceneErrorBoundary>
    </div>
  );
}
