import type { ScenePalette } from '../../Hero/scene/palette';

const SPOKES = 6;

/**
 * A weight plate whose axis points along +Z (toward the camera), with spokes on
 * both faces so that its rotation is easy to see even at 40px.
 */
export function WeightPlateMark({ palette }: { palette: ScenePalette }) {
  return (
    <group>
      {/* body – cylinders point along Y, so turn it to face +Z */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.28, 64]} />
        <meshStandardMaterial color={palette.plate} metalness={0.35} roughness={0.4} />
      </mesh>

      {/* centre hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.34, 32]} />
        <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
      </mesh>

      {[1, -1].map((face) => (
        <group key={face} position={[0, 0, face * 0.145]}>
          {/* rim ring */}
          <mesh>
            <torusGeometry args={[0.86, 0.035, 12, 64]} />
            <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
          </mesh>
          {/* spokes */}
          {Array.from({ length: SPOKES }, (_, i) => {
            const a = (i / SPOKES) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.55, Math.sin(a) * 0.55, 0]}
                rotation={[0, 0, a - Math.PI / 2]}
              >
                <boxGeometry args={[0.12, 0.4, 0.04]} />
                <meshStandardMaterial color={palette.rim} metalness={0.7} roughness={0.3} />
              </mesh>
            );
          })}
        </group>
      ))}
    </group>
  );
}
