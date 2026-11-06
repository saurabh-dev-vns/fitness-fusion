import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, MeshBasicMaterial } from 'three';
import { latLonToVector3, outwardQuaternion } from './geometry';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { GeoPoint } from './types';

interface LocationPinProps {
  location: GeoPoint;
  palette: ScenePalette;
  animate: boolean;
}

/** A pin standing on the surface, with ripples spreading out from its base. */
export function LocationPin({ location, palette, animate }: LocationPinProps) {
  const { position, quaternion } = useMemo(() => {
    const position = latLonToVector3(location);
    return { position, quaternion: outwardQuaternion(position) };
  }, [location]);

  const ripples = useRef<Array<Mesh | null>>([]);

  useFrame(({ clock }) => {
    if (!animate) return;
    ripples.current.forEach((ripple, i) => {
      if (!ripple) return;
      const p = (clock.elapsedTime * 0.6 + i * 0.5) % 1;
      ripple.scale.setScalar(0.1 + p * 0.45);
      (ripple.material as MeshBasicMaterial).opacity = (1 - p) * 0.6;
    });
  });

  // Local +Y now points straight out of the globe.
  return (
    <group position={position} quaternion={quaternion}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.44, 8]} />
        <meshStandardMaterial color={palette.steel} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color={palette.plate} metalness={0.4} roughness={0.35} />
      </mesh>

      {[0, 1].map((i) => (
        <mesh key={i} ref={(m) => (ripples.current[i] = m)} position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.9, 1, 48]} />
          <meshBasicMaterial color={palette.plate} transparent opacity={0.5} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
