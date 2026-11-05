import type { ScenePalette } from './palette';

interface PlateProps {
  /** Distance from the bar's centre along its axis (x). */
  x: number;
  radius: number;
  thickness: number;
  palette: ScenePalette;
}

/** One weight plate with raised rim rings on both faces. Mirrored for both sides of the bar. */
export function Plate({ x, radius, thickness, palette }: PlateProps) {
  return (
    <>
      {[1, -1].map((side) => (
        <group key={side} position={[x * side, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[radius, radius, thickness, 64]} />
            <meshStandardMaterial color={palette.plate} metalness={0.35} roughness={0.4} />
          </mesh>
          {[1, -1].map((face) => (
            <group key={face} position={[0, (face * thickness) / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh>
                <torusGeometry args={[radius * 0.86, 0.014, 12, 64]} />
                <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh>
                <torusGeometry args={[radius * 0.4, 0.012, 12, 48]} />
                <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </>
  );
}
