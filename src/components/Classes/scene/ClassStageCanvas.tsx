import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { StageScene } from './StageScene';
import { useScenePalette } from '../../Hero/scene/palette';
import type { ClassKind, PointerRef } from './types';

interface ClassStageCanvasProps {
  kind: ClassKind;
  hovered: boolean;
  /** False while scrolled out of view – stops rendering to save GPU. */
  active: boolean;
  pointer: PointerRef;
}

/** Default export so ClassStage can lazy-load the three.js chunk. */
export default function ClassStageCanvas({ kind, hovered, active, pointer }: ClassStageCanvasProps) {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 6.6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <StageScene
        kind={kind}
        hovered={hovered}
        pointer={pointer}
        palette={palette}
        animate={!reduceMotion}
      />
    </Canvas>
  );
}
