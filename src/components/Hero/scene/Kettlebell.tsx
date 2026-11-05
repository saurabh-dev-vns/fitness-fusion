import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ScenePalette } from './palette';

interface KettlebellProps {
  palette: ScenePalette;
  animate: boolean;
  position: [number, number, number];
}

/** Kettlebell that swings gently like it's mid-swing. */
export function Kettlebell({ palette, animate, position }: KettlebellProps) {
  const ref = useRef<Group>(null);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g || !animate) return;
    const t = clock.elapsedTime;
    g.rotation.z = Math.sin(t * 1.4) * 0.35;
    g.rotation.y = t * 0.4;
    g.position.y = position[1] + Math.sin(t * 0.9 + 2) * 0.2;
  });

  return (
    <group ref={ref} position={position} scale={0.9}>
      {/* body */}
      <mesh scale={[1, 0.92, 1]}>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshStandardMaterial color={palette.plate} metalness={0.4} roughness={0.35} />
      </mesh>
      {/* handle */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.28, 0.07, 20, 48]} />
        <meshStandardMaterial color={palette.plate} metalness={0.4} roughness={0.35} />
      </mesh>
      {/* label ring */}
      <mesh position={[0, 0, 0.45]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial color={palette.rim} metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
