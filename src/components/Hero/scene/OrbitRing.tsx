import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ScenePalette } from './palette';

/** Thin decorative rings that slowly spin behind the equipment. */
export function OrbitRings({ palette, animate }: { palette: ScenePalette; animate: boolean }) {
  const ref = useRef<Group>(null);

  useFrame((_, dt) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.z += dt * 0.08;
  });

  return (
    <group ref={ref} position={[0, 0, -1.5]} rotation={[0.2, 0.1, 0]}>
      {[2.5, 3.0].map((r, i) => (
        <mesh key={r} rotation={[0, 0, i * 0.8]}>
          <torusGeometry args={[r, 0.008, 8, 128]} />
          <meshBasicMaterial color={palette.orbit} transparent opacity={i === 0 ? 0.28 : 0.14} />
        </mesh>
      ))}
    </group>
  );
}
