import { useEffect, useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { buildDotPositions, buildGridPositions, GLOBE_RADIUS } from './geometry';
import type { ScenePalette } from '../../Hero/scene/palette';

const DOT_COUNT = 900;

function toGeometry(positions: Float32Array): BufferGeometry {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  return g;
}

/** A dotted globe with a faint lat/long grid. */
export function Globe({ palette }: { palette: ScenePalette }) {
  const dots = useMemo(() => toGeometry(buildDotPositions(DOT_COUNT, GLOBE_RADIUS)), []);
  const grid = useMemo(() => toGeometry(buildGridPositions(GLOBE_RADIUS)), []);

  useEffect(
    () => () => {
      dots.dispose();
      grid.dispose();
    },
    [dots, grid]
  );

  return (
    <>
      {/* Invisible occluder: writes depth but no colour, so dots and lines on the
          far side of the globe are hidden behind it. */}
      <mesh renderOrder={-1}>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial colorWrite={false} />
      </mesh>

      <lineSegments geometry={grid}>
        <lineBasicMaterial color={palette.steel} transparent opacity={0.3} />
      </lineSegments>

      <points geometry={dots}>
        <pointsMaterial color={palette.plate} size={0.035} sizeAttenuation transparent opacity={0.8} />
      </points>
    </>
  );
}
