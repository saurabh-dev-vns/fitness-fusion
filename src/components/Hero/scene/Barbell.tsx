import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Plate } from './Plate';
import type { ScenePalette } from './palette';

const HALF_LENGTH = 2.6;
const PLATES = [
  { x: 1.0, radius: 1.0, thickness: 0.16 },
  { x: 1.2, radius: 0.8, thickness: 0.12 },
  { x: 1.36, radius: 0.55, thickness: 0.1 },
];

const AXIS_X: [number, number, number] = [0, 0, Math.PI / 2];

export function Barbell({ palette, animate }: { palette: ScenePalette; animate: boolean }) {
  const ref = useRef<Group>(null);

  // Slow turn + a vertical "rep" so it feels like it's being lifted.
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g || !animate) return;
    const t = clock.elapsedTime;
    // Sway side-on rather than spinning end-over-end, so the barbell always reads clearly.
    g.rotation.y = 0.55 + Math.sin(t * 0.45) * 0.6;
    g.position.y = Math.sin(t * 1.3) * 0.18;
    g.rotation.z = 0.2 + Math.sin(t * 0.8) * 0.04;
  });

  return (
    <group ref={ref} rotation={[0.15, 0.6, 0.2]}>
      {/* centre bar */}
      <mesh rotation={AXIS_X}>
        <cylinderGeometry args={[0.055, 0.055, HALF_LENGTH * 2, 32]} />
        <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* knurled grip section */}
      <mesh rotation={AXIS_X}>
        <cylinderGeometry args={[0.065, 0.065, 1.5, 32]} />
        <meshStandardMaterial color={palette.rim} metalness={0.8} roughness={0.55} />
      </mesh>

      {[1, -1].map((side) => (
        <group key={side}>
          {/* sleeve */}
          <mesh position={[side * 1.75, 0, 0]} rotation={AXIS_X}>
            <cylinderGeometry args={[0.09, 0.09, 1.7, 32]} />
            <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.2} />
          </mesh>
          {/* collar */}
          <mesh position={[side * 1.52, 0, 0]} rotation={AXIS_X}>
            <cylinderGeometry args={[0.15, 0.15, 0.09, 32]} />
            <meshStandardMaterial color={palette.rim} metalness={0.85} roughness={0.3} />
          </mesh>
          {/* end cap */}
          <mesh position={[side * HALF_LENGTH, 0, 0]} rotation={AXIS_X}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 32]} />
            <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {PLATES.map((p) => (
        <Plate key={p.x} {...p} palette={palette} />
      ))}
    </group>
  );
}
