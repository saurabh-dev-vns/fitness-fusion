import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { Barbell } from './Barbell';
import { ChalkDust } from './ChalkDust';
import { Dumbbell } from './Dumbbell';
import { Kettlebell } from './Kettlebell';
import { OrbitRings } from './OrbitRing';
import type { ScenePalette } from './palette';

interface SceneProps {
  palette: ScenePalette;
  animate: boolean;
}

export function Scene({ palette, animate }: SceneProps) {
  const rig = useRef<Group>(null);
  const viewport = useThree((s) => s.viewport);

  // Scale the whole set so it always fits the canvas, on phones as well as desktops.
  const fit = Math.min(1, viewport.width / 6.8);

  // Subtle parallax: the whole rig leans toward the pointer.
  useFrame(({ pointer }, dt) => {
    const g = rig.current;
    if (!g) return;
    const ty = animate ? pointer.x * 0.35 : 0;
    const tx = animate ? -pointer.y * 0.2 : 0;
    g.rotation.y = MathUtils.damp(g.rotation.y, ty, 3, dt);
    g.rotation.x = MathUtils.damp(g.rotation.x, tx, 3, dt);
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[4, 5, 5]} intensity={palette.keyLight} />
      <pointLight position={[-5, -2, 3]} intensity={palette.fillLight} distance={20} />
      <pointLight position={[3, -3, -2]} intensity={palette.fillLight * 0.5} distance={20} />

      <group ref={rig} scale={fit}>
        <OrbitRings palette={palette} animate={animate} />
        <Barbell palette={palette} animate={animate} />
        <Dumbbell palette={palette} animate={animate} position={[-2.1, -2.0, 1.2]} />
        <Kettlebell palette={palette} animate={animate} position={[2.2, 1.9, 0.8]} />
        <ChalkDust palette={palette} animate={animate} />
      </group>
    </>
  );
}
