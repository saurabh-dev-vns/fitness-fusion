import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { HaloRings } from './HaloRings';
import { LoadedPlate } from './LoadedPlate';
import type { PlateStackProps } from './types';

// Largest plate goes on first (closest to the centre), then smaller ones.
const PLATE_SPECS = [
  { radius: 1.0, thickness: 0.16 },
  { radius: 0.84, thickness: 0.14 },
  { radius: 0.68, thickness: 0.12 },
  { radius: 0.54, thickness: 0.1 },
  { radius: 0.42, thickness: 0.09 },
];

const GAP = 0.04;
const FIRST_X = 0.1;

// Loading animation: each item slides in from the open end of the bar.
const START_DELAY = 0.15; // seconds
const STAGGER = 0.22;
const DURATION = 0.6;
const TRAVEL = 3.2;

function buildLayout(count: number) {
  let x = FIRST_X;
  const plates = PLATE_SPECS.slice(0, count).map((spec) => {
    const centre = x + spec.thickness / 2;
    x += spec.thickness + GAP;
    return { ...spec, x: centre };
  });
  return { plates, collarX: x + 0.04 };
}

/**
 * A barbell sleeve with `plates` weight plates (plus a collar that locks them
 * in). Every time the card scrolls into view the plates slide on one by one.
 */
export function PlateStackModel({ palette, animate, active, plates, halos }: PlateStackProps) {
  const layout = useMemo(() => buildLayout(plates), [plates]);
  const targets = useMemo(
    () => [...layout.plates.map((p) => p.x), layout.collarX],
    [layout]
  );

  const items = useRef<Array<Group | null>>([]);
  const loadTime = useRef(0);

  // Replay the loading animation whenever the card becomes visible again.
  useEffect(() => {
    if (active) loadTime.current = 0;
  }, [active]);

  useFrame((_, dt) => {
    if (animate) loadTime.current += dt;
    // Reduced motion: skip straight to the fully loaded bar.
    const time = animate ? loadTime.current : Infinity;

    items.current.forEach((item, i) => {
      if (!item) return;
      const p = MathUtils.clamp((time - START_DELAY - i * STAGGER) / DURATION, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      item.position.x = targets[i] + (1 - eased) * TRAVEL;
    });
  });

  return (
    <>
      <HaloRings count={halos} palette={palette} animate={animate} />

      {/* shifted so the plates (not the whole bar) sit at the centre of the stage */}
      <group position={[-0.5, 0, 0]}>
        {/* bar */}
        <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 4, 32]} />
          <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.11, 0.06, 32]} />
          <meshStandardMaterial color={palette.steel} metalness={0.9} roughness={0.25} />
        </mesh>

        {layout.plates.map((plate, i) => (
          <group key={i} ref={(g) => (items.current[i] = g)} position={[plate.x, 0, 0]}>
            <LoadedPlate radius={plate.radius} thickness={plate.thickness} palette={palette} />
          </group>
        ))}

        {/* collar – the last item to slide on */}
        <group
          ref={(g) => (items.current[layout.plates.length] = g)}
          position={[layout.collarX, 0, 0]}
        >
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 32]} />
            <meshStandardMaterial color={palette.rim} metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </>
  );
}
