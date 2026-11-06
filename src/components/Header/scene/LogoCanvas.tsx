import { Canvas } from '@react-three/fiber';
import { useReducedMotion, type MotionValue } from 'framer-motion';
import { LogoScene } from './LogoScene';
import { useScenePalette } from '../../Hero/scene/palette';

interface LogoCanvasProps {
  hovered: boolean;
  /** False while off-screen – stops rendering to save GPU. */
  active: boolean;
  scroll: MotionValue<number>;
}

/** Default export so LogoMark can lazy-load the three.js chunk. */
export default function LogoCanvas({ hovered, active, scroll }: LogoCanvasProps) {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <LogoScene hovered={hovered} scroll={scroll} palette={palette} animate={!reduceMotion} />
    </Canvas>
  );
}
