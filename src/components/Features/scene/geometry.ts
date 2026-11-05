import { useEffect, useMemo } from 'react';
import { BufferGeometry, ExtrudeGeometry, Shape } from 'three';

/** Create a geometry once and dispose of it on unmount. */
export function useGeometry<T extends BufferGeometry>(factory: () => T): T {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const geometry = useMemo(factory, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

/** Extrude a 2D shape into a bevelled, centred 3D solid. */
export function createExtruded(shape: Shape, depth: number): ExtrudeGeometry {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 4,
    curveSegments: 24,
  });
  geometry.center();
  return geometry;
}

export function createShieldShape(): Shape {
  const s = new Shape();
  s.moveTo(0, 1.0);
  s.lineTo(0.85, 0.78);
  s.lineTo(0.85, 0.1);
  s.bezierCurveTo(0.85, -0.55, 0.35, -0.85, 0, -1.05);
  s.bezierCurveTo(-0.35, -0.85, -0.85, -0.55, -0.85, 0.1);
  s.lineTo(-0.85, 0.78);
  s.closePath();
  return s;
}

export function createBoltShape(): Shape {
  const s = new Shape();
  s.moveTo(0.2, 1.1);
  s.lineTo(-0.55, -0.1);
  s.lineTo(-0.05, -0.1);
  s.lineTo(-0.25, -1.1);
  s.lineTo(0.6, 0.15);
  s.lineTo(0.08, 0.15);
  s.closePath();
  return s;
}
