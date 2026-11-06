import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  MathUtils,
  QuadraticBezierCurve3,
  TubeGeometry,
  type Mesh,
  type MeshBasicMaterial,
} from 'three';
import { GLOBE_RADIUS, latLonToVector3, outwardQuaternion } from './geometry';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { GeoPoint } from './types';

// Places the "message" can travel from – all on the same side of the globe as the pin.
const ORIGINS: GeoPoint[] = [
  { lat: 40.7, lon: -74.0 }, // New York
  { lat: 19.4, lon: -99.1 }, // Mexico City
  { lat: 21.3, lon: -157.8 }, // Honolulu
];

const TUBE_SEGMENTS = 48;
const TUBE_RADIAL = 6;
const INDICES_PER_SEGMENT = TUBE_RADIAL * 6;

const TRAVEL = 1.3; // seconds for the arc to draw
const FADE = 0.7; // arc fades after arriving
const BURST = 0.9; // ripple at the destination

interface MessageArcProps {
  /** Changes every send – picks the origin. Mount with `key={sendKey}` to replay. */
  sendKey: number;
  destination: GeoPoint;
  palette: ScenePalette;
  animate: boolean;
}

/**
 * One-shot animation: a glowing line is drawn along an arc above the globe from
 * a faraway city to the pin, then a ripple bursts out where it lands.
 */
export function MessageArc({ sendKey, destination, palette, animate }: MessageArcProps) {
  const { curve, endPoint, endQuat } = useMemo(() => {
    const a = latLonToVector3(ORIGINS[sendKey % ORIGINS.length]);
    const b = latLonToVector3(destination);
    const control = a.clone().add(b).normalize().multiplyScalar(GLOBE_RADIUS * 1.8);
    return {
      curve: new QuadraticBezierCurve3(a, control, b),
      endPoint: b,
      endQuat: outwardQuaternion(b),
    };
  }, [sendKey, destination]);

  const tube = useMemo(
    () => new TubeGeometry(curve, TUBE_SEGMENTS, 0.014, TUBE_RADIAL, false),
    [curve]
  );
  useEffect(() => () => tube.dispose(), [tube]);

  const tubeMesh = useRef<Mesh>(null);
  const head = useRef<Mesh>(null);
  const burst = useRef<Mesh>(null);
  const time = useRef(0);

  useFrame((_, dt) => {
    if (!animate) return;
    time.current += dt;
    const t = time.current;

    // arc draws progressively (ease-in-out)
    const p = MathUtils.clamp(t / TRAVEL, 0, 1);
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    tube.setDrawRange(0, Math.floor(eased * TUBE_SEGMENTS) * INDICES_PER_SEGMENT);

    if (tubeMesh.current) {
      (tubeMesh.current.material as MeshBasicMaterial).opacity =
        1 - MathUtils.clamp((t - TRAVEL) / FADE, 0, 1);
    }

    // bright head travelling along the arc
    if (head.current) {
      head.current.visible = t < TRAVEL + 0.1;
      head.current.position.copy(curve.getPointAt(eased));
    }

    // ripple where it lands
    if (burst.current) {
      const b = MathUtils.clamp((t - TRAVEL) / BURST, 0, 1);
      burst.current.visible = t >= TRAVEL && b < 1;
      burst.current.scale.setScalar(0.2 + b * 1.0);
      (burst.current.material as MeshBasicMaterial).opacity = (1 - b) * 0.8;
    }
  });

  // Reduced motion: no one-shot animation (the pin ripples are already static).
  if (!animate) return null;

  return (
    <>
      <mesh ref={tubeMesh} geometry={tube}>
        <meshBasicMaterial color={palette.plate} transparent />
      </mesh>

      <mesh ref={head}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={palette.plate} />
      </mesh>

      <group position={endPoint} quaternion={endQuat}>
        <mesh ref={burst} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
          <ringGeometry args={[0.9, 1, 64]} />
          <meshBasicMaterial color={palette.plate} transparent depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}
