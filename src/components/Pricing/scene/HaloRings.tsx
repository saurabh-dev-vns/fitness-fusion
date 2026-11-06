import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import type { ScenePalette } from '../../Hero/scene/palette';

interface HaloRingsProps {
  count: number;
  palette: ScenePalette;
  animate: boolean;
}

/** Thin tumbling rings around the bar. Higher tiers get more of them. */
export function HaloRings({ count, palette, animate }: HaloRingsProps) {
  const rings = useRef<Array<Mesh | null>>([]);

  useFrame((_, dt) => {
    if (!animate) return;
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.x += dt * (0.3 + i * 0.2);
      ring.rotation.y += dt * (0.5 - i * 0.15);
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(m) => (rings.current[i] = m)} rotation={[1 + i, 0.5, 0]}>
          <torusGeometry args={[1.55 + i * 0.4, 0.012, 8, 128]} />
          <meshBasicMaterial color={palette.orbit} transparent opacity={0.4 - i * 0.1} />
        </mesh>
      ))}
    </>
  );
}
