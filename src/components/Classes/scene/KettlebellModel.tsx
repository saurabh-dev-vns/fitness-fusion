import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh, MeshBasicMaterial } from 'three';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { ModelProps } from './types';

const SWING_AMPLITUDE = 0.9; // radians
const ROPE = 1.6; // length of the imaginary pendulum
// Fainter copies that lag behind the lead kettlebell = motion trail.
const GHOSTS = [
  { lag: 0.22, opacity: 0.22 },
  { lag: 0.44, opacity: 0.12 },
  { lag: 0.66, opacity: 0.06 },
];

/** Place a group on the pendulum arc for swing angle `a`. */
function applyPose(g: Group, a: number) {
  g.position.set(Math.sin(a) * ROPE, ROPE - Math.cos(a) * ROPE - 0.2, 0);
  g.rotation.z = a;
}

function KettlebellBody({ palette, opacity = 1 }: { palette: ScenePalette; opacity?: number }) {
  const ghost = opacity < 1;
  const common = { transparent: ghost, opacity, depthWrite: !ghost };

  return (
    <group scale={1.3}>
      <mesh scale={[1, 0.92, 1]}>
        <sphereGeometry args={[0.62, 48, 48]} />
        <meshStandardMaterial color={palette.plate} metalness={0.45} roughness={0.35} {...common} />
      </mesh>
      {/* handle */}
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.36, 0.09, 20, 48]} />
        <meshStandardMaterial color={palette.plate} metalness={0.45} roughness={0.35} {...common} />
      </mesh>
      {/* flat base */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
        <meshStandardMaterial color={palette.steel} metalness={0.8} roughness={0.3} {...common} />
      </mesh>
      {/* weight label */}
      <mesh position={[0, 0, 0.6]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color={palette.rim} metalness={0.6} roughness={0.4} {...common} />
      </mesh>
    </group>
  );
}

/** Expanding rings on the floor – the "interval" pulse. */
function PulseRings({ palette, animate, hover }: ModelProps) {
  const rings = useRef<Array<Mesh | null>>([]);
  const clock = useRef(0);

  useFrame((_, dt) => {
    if (!animate) return;
    clock.current += dt * (0.6 + hover.current * 0.9);
    rings.current.forEach((ring, i) => {
      if (!ring) return;
      const p = (clock.current + i * 0.5) % 1;
      ring.scale.setScalar(0.4 + p * 1.5);
      (ring.material as MeshBasicMaterial).opacity = (1 - p) * 0.4;
    });
  });

  return (
    <group position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {[0, 1].map((i) => (
        <mesh key={i} ref={(m) => (rings.current[i] = m)}>
          <ringGeometry args={[0.95, 1, 64]} />
          <meshBasicMaterial color={palette.orbit} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export function KettlebellModel(props: ModelProps) {
  const { palette, animate, hover } = props;
  const lead = useRef<Group>(null);
  const ghosts = useRef<Array<Group | null>>([]);
  const phase = useRef(0);

  useFrame((_, dt) => {
    if (!animate || !lead.current) return;
    phase.current += dt * (1.8 + hover.current * 1.8); // swings faster on hover
    applyPose(lead.current, SWING_AMPLITUDE * Math.sin(phase.current));
    ghosts.current.forEach((g, i) => {
      if (g) applyPose(g, SWING_AMPLITUDE * Math.sin(phase.current - GHOSTS[i].lag));
    });
  });

  return (
    <group>
      <PulseRings {...props} />
      <group ref={lead} position={[0, -0.2, 0]}>
        <KettlebellBody palette={palette} />
      </group>
      {GHOSTS.map((g, i) => (
        <group key={g.lag} ref={(el) => (ghosts.current[i] = el)} position={[0, -0.2, 0]}>
          <KettlebellBody palette={palette} opacity={g.opacity} />
        </group>
      ))}
    </group>
  );
}
