import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ScenePalette } from './palette';

interface DumbbellProps {
  palette: ScenePalette;
  animate: boolean;
  position: [number, number, number];
}

const AXIS_X: [number, number, number] = [0, 0, Math.PI / 2];

/** Hex-head dumbbell that tumbles and floats. */
export function Dumbbell({ palette, animate, position }: DumbbellProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const g = ref.current;
    if (!g || !animate) return;
    const t = clock.elapsedTime;
    g.rotation.x += dt * 0.5;
    g.rotation.y += dt * 0.35;
    g.position.y = position[1] + Math.sin(t * 1.1 + 1) * 0.25;
  });

  return (
    <group ref={ref} position={position} scale={0.85} rotation={[0.4, 0.3, 0.5]}>
      <mesh rotation={AXIS_X}>
        <cylinderGeometry args={[0.07, 0.07, 1.3, 24]} />
        <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.3} />
      </mesh>
      {[1, -1].map((side) => (
        <mesh key={side} position={[side * 0.62, 0, 0]} rotation={AXIS_X}>
          <cylinderGeometry args={[0.38, 0.38, 0.38, 6]} />
          <meshStandardMaterial color={palette.plate} metalness={0.4} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
