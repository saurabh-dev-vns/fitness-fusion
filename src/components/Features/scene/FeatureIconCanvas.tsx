import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { IconScene, type FeatureKind } from './IconScene';
import { useScenePalette } from '../../Hero/scene/palette';

interface FeatureIconCanvasProps {
  kind: FeatureKind;
  hovered: boolean;
  /** False while scrolled out of view – stops rendering to save GPU. */
  active: boolean;
}

/** Default export so FeatureIcon can lazy-load the three.js chunk. */
export default function FeatureIconCanvas({ kind, hovered, active }: FeatureIconCanvasProps) {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <IconScene kind={kind} hovered={hovered} palette={palette} animate={!reduceMotion} />
    </Canvas>
  );
}
