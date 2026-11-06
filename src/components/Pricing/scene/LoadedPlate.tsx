import type { ScenePalette } from '../../Hero/scene/palette';

interface LoadedPlateProps {
  radius: number;
  thickness: number;
  palette: ScenePalette;
}

/** A weight plate whose axis points along x (the bar), with raised rings on both faces. */
export function LoadedPlate({ radius, thickness, palette }: LoadedPlateProps) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
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
  );
}
