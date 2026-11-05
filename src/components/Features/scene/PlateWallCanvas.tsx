import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { PlateWallScene } from './PlateWallScene';
import { useScenePalette } from '../../Hero/scene/palette';

/** Default export so PlateWallBackground can lazy-load the three.js chunk. */
export default function PlateWallCanvas({ active }: { active: boolean }) {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  const frameloop = !active ? 'never' : reduceMotion ? 'demand' : 'always';

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 12], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={frameloop}
      style={{ background: 'transparent' }}
    >
      <PlateWallScene palette={palette} animate={!reduceMotion} />
    </Canvas>
  );
}
