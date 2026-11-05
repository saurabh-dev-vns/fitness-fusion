import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { createBoltShape, createExtruded, useGeometry } from './geometry';
import type { IconProps } from './types';

const TICKS = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);

/** Expert Training – a lightning bolt inside a stopwatch dial that spins up on hover. */
export function BoltIcon({ palette, animate, hover }: IconProps) {
  const geometry = useGeometry(() => createExtruded(createBoltShape(), 0.2));
  const dial = useRef<Group>(null);

  useFrame((_, dt) => {
    if (!dial.current || !animate) return;
    dial.current.rotation.z -= dt * (0.25 + hover.current * 2.2);
  });

  return (
    <group>
      <mesh geometry={geometry} scale={0.7}>
        <meshStandardMaterial color={palette.plate} metalness={0.5} roughness={0.35} />
      </mesh>

      <group ref={dial}>
        <mesh>
          <torusGeometry args={[1.1, 0.025, 12, 80]} />
          <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
        </mesh>
        {TICKS.map((a, i) => (
          <mesh
            key={a}
            position={[Math.sin(a) * 1.28, Math.cos(a) * 1.28, 0]}
            rotation={[0, 0, -a]}
          >
            <boxGeometry args={[0.035, i % 3 === 0 ? 0.2 : 0.1, 0.035]} />
            <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
