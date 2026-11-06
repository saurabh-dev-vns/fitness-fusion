import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { PlanScene } from './PlanScene';
import { useScenePalette } from '../../Hero/scene/palette';
import type { PointerRef } from './types';

interface PlanStageCanvasProps {
  plates: number;
  halos: number;
  hovered: boolean;
  /** False while scrolled out of view – stops rendering to save GPU. */
  active: boolean;
  pointer: PointerRef;
  inverted: boolean;
}

/** Default export so PlanStage can lazy-load the three.js chunk. */
export default function PlanStageCanvas({
  plates,
  halos,
  hovered,
  active,
  pointer,
  inverted,
}: PlanStageCanvasProps) {
  const palette = useScenePalette(inverted);
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.8, 7.2], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <PlanScene
        plates={plates}
        halos={halos}
        hovered={hovered}
        active={active}
        pointer={pointer}
        palette={palette}
        animate={!reduceMotion}
      />
    </Canvas>
  );
}
