import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { GlobeScene } from './GlobeScene';
import { useScenePalette } from '../../Hero/scene/palette';
import type { GeoPoint, PointerRef } from './types';

interface GlobeCanvasProps {
  location: GeoPoint;
  sendKey: number;
  /** False while scrolled out of view – stops rendering to save GPU. */
  active: boolean;
  pointer: PointerRef;
}

/** Default export so ContactGlobe can lazy-load the three.js chunk. */
export default function GlobeCanvas({ location, sendKey, active, pointer }: GlobeCanvasProps) {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <GlobeScene
        location={location}
        sendKey={sendKey}
        pointer={pointer}
        palette={palette}
        animate={!reduceMotion}
      />
    </Canvas>
  );
}
