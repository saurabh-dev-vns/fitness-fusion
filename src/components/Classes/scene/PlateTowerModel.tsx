import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { ModelProps } from './types';

const PLATE_RADII = [1.2, 1.05, 0.9, 0.75, 0.6]; // bottom → top
const THICKNESS = 0.22;
const FLOOR_Y = -1.5;
const GAP_REST = 0.18;
const GAP_SPREAD = 0.28; // extra gap at full hover

const plateY = (i: number, gap: number) => FLOOR_Y + THICKNESS / 2 + i * (THICKNESS + gap);

/** A flat weight plate with raised rings on top and bottom faces. */
function FlatPlate({ radius, palette }: { radius: number; palette: ScenePalette }) {
  return (
    <>
      <mesh>
        <cylinderGeometry args={[radius, radius, THICKNESS, 64]} />
        <meshStandardMaterial color={palette.plate} metalness={0.35} roughness={0.4} />
      </mesh>
      {[1, -1].map((face) => (
        <group key={face} position={[0, (face * THICKNESS) / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[radius * 0.86, 0.014, 12, 64]} />
            <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh>
            <torusGeometry args={[radius * 0.35, 0.012, 12, 48]} />
            <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/** A stack of plates on a vertical bar. On hover the stack "explodes" upward like a lift. */
export function PlateTowerModel({ palette, animate, hover }: ModelProps) {
  const root = useRef<Group>(null);
  const plates = useRef<Array<Group | null>>([]);

  useFrame((_, dt) => {
    if (!animate || !root.current) return;
    root.current.rotation.y += dt * (0.4 + hover.current * 1.2);

    const gap = GAP_REST + GAP_SPREAD * hover.current;
    plates.current.forEach((plate, i) => {
      if (plate) plate.position.y = plateY(i, gap);
    });
  });

  return (
    <group ref={root}>
      {/* bar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 3.1, 32]} />
        <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* bar tip */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
      </mesh>

      {PLATE_RADII.map((radius, i) => (
        <group
          key={radius}
          ref={(g) => (plates.current[i] = g)}
          position={[0, plateY(i, GAP_REST), 0]}
        >
          <FlatPlate radius={radius} palette={palette} />
        </group>
      ))}
    </group>
  );
}
