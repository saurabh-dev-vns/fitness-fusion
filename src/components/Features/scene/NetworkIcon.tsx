import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3, type Group } from 'three';
import type { IconProps } from './types';

type Vec3 = [number, number, number];

const CENTER: Vec3 = [0, 0, 0];
const NODES: Vec3[] = [
  [1.1, 0.2, 0],
  [-1.0, 0.35, 0.3],
  [0.2, 1.05, -0.2],
  [-0.1, -1.1, 0.25],
  [0.45, -0.35, 1.0],
  [-0.4, 0.1, -1.05],
];
const SIZES = [0.2, 0.17, 0.2, 0.16, 0.19, 0.15];
// Extra links between neighbours so it reads as a network, not a star.
const LINKS: Array<[number, number]> = [[0, 2], [2, 1], [1, 3], [3, 0], [4, 0], [5, 1]];

/** A thin cylinder stretched between two points. */
function Connector({ from, to, color }: { from: Vec3; to: Vec3; color: string }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new Vector3(...from);
    const b = new Vector3(...to);
    const dir = b.clone().sub(a);
    const length = dir.length();
    return {
      length,
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir.normalize()),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.014, 0.014, length, 8]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
    </mesh>
  );
}

/** Community – connected nodes orbiting a central hub. */
export function NetworkIcon({ palette, animate, hover }: IconProps) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g || !animate) return;
    g.rotation.y += dt * (0.3 + hover.current * 1.2);
    g.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <group ref={group} scale={0.95}>
      {/* hub */}
      <mesh position={CENTER}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color={palette.plate} metalness={0.5} roughness={0.35} />
      </mesh>

      {NODES.map((p, i) => (
        <group key={i}>
          <Connector from={CENTER} to={p} color={palette.steel} />
          <mesh position={p}>
            <sphereGeometry args={[SIZES[i], 24, 24]} />
            <meshStandardMaterial color={palette.plate} metalness={0.5} roughness={0.35} />
          </mesh>
        </group>
      ))}

      {LINKS.map(([a, b]) => (
        <Connector key={`${a}-${b}`} from={NODES[a]} to={NODES[b]} color={palette.rim} />
      ))}
    </group>
  );
}
