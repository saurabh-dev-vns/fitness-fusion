import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { Scene } from './Scene';
import { useScenePalette } from './palette';

/** Default export so HeroVisual can lazy-load the whole three.js chunk. */
export default function HeroScene() {
  const palette = useScenePalette();
  const reduceMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      // Transparent canvas so the hero gradient shows through in both themes.
      style={{ background: 'transparent' }}
      // With reduced motion, render once and on demand instead of every frame.
      frameloop={reduceMotion ? 'demand' : 'always'}
    >
      <Scene palette={palette} animate={!reduceMotion} />
    </Canvas>
  );
}
