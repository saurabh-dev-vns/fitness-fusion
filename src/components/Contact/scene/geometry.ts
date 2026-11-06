import { Quaternion, Vector3 } from 'three';
import type { GeoPoint } from './types';

export const GLOBE_RADIUS = 1.6;

/** Latitude/longitude (degrees) → point on a sphere centred at the origin. */
export function latLonToVector3({ lat, lon }: GeoPoint, radius = GLOBE_RADIUS): Vector3 {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Rotation that turns local +Y into the outward surface normal at `point`. */
export function outwardQuaternion(point: Vector3): Quaternion {
  return new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), point.clone().normalize());
}

/** Y-rotation that brings `point` to face the camera (+Z). */
export function facingAngle(point: Vector3): number {
  return Math.atan2(-point.x, point.z);
}

/** Evenly spread dots over a sphere (Fibonacci lattice). */
export function buildDotPositions(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    out[i * 3] = Math.cos(a) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(a) * r * radius;
  }
  return out;
}

/** Latitude circles + meridians as line-segment pairs. */
export function buildGridPositions(radius: number): Float32Array {
  const pts: number[] = [];
  const push = (a: Vector3, b: Vector3) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);

  // latitude circles
  for (const lat of [-60, -30, 0, 30, 60]) {
    const steps = 72;
    for (let i = 0; i < steps; i++) {
      const a = latLonToVector3({ lat, lon: (i / steps) * 360 - 180 }, radius);
      const b = latLonToVector3({ lat, lon: ((i + 1) / steps) * 360 - 180 }, radius);
      push(a, b);
    }
  }

  // meridians, pole to pole
  for (let lon = -180; lon < 180; lon += 30) {
    const steps = 48;
    for (let i = 0; i < steps; i++) {
      const a = latLonToVector3({ lat: -90 + (i / steps) * 180, lon }, radius);
      const b = latLonToVector3({ lat: -90 + ((i + 1) / steps) * 180, lon }, radius);
      push(a, b);
    }
  }

  return new Float32Array(pts);
}
