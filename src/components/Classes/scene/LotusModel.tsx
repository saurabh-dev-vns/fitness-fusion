import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ModelProps } from './types';

type ColorKey = 'plate' | 'steel' | 'rim';

// Three layers of petals, from the closed centre out to the open edge.
const RINGS: Array<{
  count: number;
  length: number;
  halfWidth: number;
  tilt: number; // lean-out angle (0 = upright, π/2 = flat)
  offset: number; // rotate the ring so petals sit between the previous ring's
  color: ColorKey;
}> = [
  { count: 6, length: 0.9, halfWidth: 0.15, tilt: 0.3, offset: 0, color: 'plate' },
  { count: 8, length: 1.05, halfWidth: 0.17, tilt: 0.8, offset: Math.PI / 8, color: 'steel' },
  { count: 10, length: 1.15, halfWidth: 0.18, tilt: 1.25, offset: 0, color: 'rim' },
];

const TAU = Math.PI * 2;

/**
 * A lotus that "breathes": petals open and close slowly, and bloom wider
 * while the card is hovered.
 *
 * Structure per petal:  ring group → spin-around-Y group → tilt group → petal mesh.
 * `useFrame` only touches the tilt group (children[0] of each spin group).
 */
export function LotusModel({ palette, animate, hover }: ModelProps) {
  const root = useRef<Group>(null);
  const rings = useRef<Array<Group | null>>([]);

  useFrame(({ clock }, dt) => {
    if (!animate || !root.current) return;
    const t = clock.elapsedTime;

    root.current.rotation.y += dt * (0.25 + hover.current * 0.6);

    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const open = Math.sin(t * 0.9 + i * 0.5) * 0.1 + hover.current * 0.28 * ((i + 1) / RINGS.length);
      ring.children.forEach((spin) => {
        spin.children[0].rotation.x = RINGS[i].tilt + open;
      });
    });
  });

  return (
    <group ref={root} position={[0, -1.1, 0]} scale={1.6}>
      {RINGS.map((ring, i) => (
        <group key={i} ref={(g) => (rings.current[i] = g)}>
          {Array.from({ length: ring.count }, (_, p) => (
            <group key={p} rotation={[0, ring.offset + (p / ring.count) * TAU, 0]}>
              <group rotation={[ring.tilt, 0, 0]}>
                <mesh position={[0, ring.length / 2, 0]} scale={[ring.halfWidth, ring.length / 2, 0.07]}>
                  <sphereGeometry args={[1, 24, 16]} />
                  <meshStandardMaterial color={palette[ring.color]} metalness={0.25} roughness={0.5} />
                </mesh>
              </group>
            </group>
          ))}
        </group>
      ))}

      {/* centre */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={palette.rim} metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
