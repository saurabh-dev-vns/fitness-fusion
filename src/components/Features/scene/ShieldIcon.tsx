import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, MeshBasicMaterial } from 'three';
import { createExtruded, createShieldShape, useGeometry } from './geometry';
import type { IconProps } from './types';

/** Safe Environment – a shield with a check mark and an expanding "protection" pulse. */
export function ShieldIcon({ palette, animate, hover }: IconProps) {
  const geometry = useGeometry(() => createExtruded(createShieldShape(), 0.25));
  const pulse = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const ring = pulse.current;
    if (!ring || !animate) return;
    // Pulse repeats faster while the card is hovered.
    const p = (clock.elapsedTime * (0.5 + hover.current * 0.8)) % 1;
    ring.scale.setScalar(1 + p * 0.35);
    (ring.material as MeshBasicMaterial).opacity = (1 - p) * 0.5;
  });

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={palette.plate} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* check mark */}
      <group position={[0, 0.02, 0.2]}>
        <mesh position={[-0.2, -0.1, 0]} rotation={[0, 0, 0.75]}>
          <boxGeometry args={[0.16, 0.42, 0.1]} />
          <meshStandardMaterial color={palette.rim} metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.1, 0.04, 0]} rotation={[0, 0, -0.75]}>
          <boxGeometry args={[0.16, 0.8, 0.1]} />
          <meshStandardMaterial color={palette.rim} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* pulse ring */}
      <mesh ref={pulse} position={[0, 0, -0.05]}>
        <torusGeometry args={[1.25, 0.014, 8, 80]} />
        <meshBasicMaterial color={palette.rim} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
