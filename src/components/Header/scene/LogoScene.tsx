import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import type { MotionValue } from 'framer-motion';
import { WeightPlateMark } from './WeightPlateMark';
import type { ScenePalette } from '../../Hero/scene/palette';

// One trip down the page = this many radians of roll (≈ 1.6 full turns).
const SCROLL_ROLL = Math.PI * 10;

interface LogoSceneProps {
  hovered: boolean;
  /** Page scroll progress, 0 → 1 (a framer-motion value, read every frame). */
  scroll: MotionValue<number>;
  palette: ScenePalette;
  animate: boolean;
}

export function LogoScene({ hovered, scroll, palette, animate }: LogoSceneProps) {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const hover = useRef(0); // eased 0 → 1
  const idle = useRef(0); // free-running spin
  const rolled = useRef(0); // smoothed scroll-driven roll

  useFrame((_, dt) => {
    const t = tilt.current;
    const s = spin.current;
    if (!t || !s || !animate) return;

    hover.current = MathUtils.damp(hover.current, hovered ? 1 : 0, 6, dt);
    idle.current += dt * (0.5 + hover.current * 4); // spins up on hover
    rolled.current = MathUtils.damp(rolled.current, scroll.get() * SCROLL_ROLL, 6, dt);

    // Roll in the plate's own plane = a wheel turning as you scroll.
    s.rotation.z = idle.current + rolled.current;

    // Swing toward the viewer on hover and grow slightly.
    t.rotation.y = MathUtils.damp(t.rotation.y, 0.55 - hover.current * 0.45, 5, dt);
    t.scale.setScalar(MathUtils.damp(t.scale.x, 1 + hover.current * 0.12, 6, dt));
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 4, 5]} intensity={palette.keyLight} />
      <pointLight position={[-4, -2, 3]} intensity={palette.fillLight * 0.6} distance={20} />

      <group ref={tilt} rotation={[-0.35, 0.55, 0]}>
        <group ref={spin}>
          <WeightPlateMark palette={palette} />
        </group>
      </group>
    </>
  );
}
