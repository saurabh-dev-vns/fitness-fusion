import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { PlateStackModel } from './PlateStackModel';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { PointerRef } from './types';

const TAU = Math.PI * 2;
// Angle that shows the plates three-quarter-on, stepped like a pyramid.
const BASE_ANGLE = -0.9;

interface PlanSceneProps {
  plates: number;
  halos: number;
  hovered: boolean;
  active: boolean;
  pointer: PointerRef;
  palette: ScenePalette;
  animate: boolean;
}

export function PlanScene({
  plates,
  halos,
  hovered,
  active,
  pointer,
  palette,
  animate,
}: PlanSceneProps) {
  const rig = useRef<Group>(null);
  const turntable = useRef<Group>(null);
  const hover = useRef(0); // eased 0 → 1, shared with the model
  const spin = useRef(0);

  useFrame(({ clock }, dt) => {
    const r = rig.current;
    const tt = turntable.current;
    if (!r || !tt || !animate) return;

    hover.current = MathUtils.damp(hover.current, hovered ? 1 : 0, 6, dt);

    // The whole set leans toward the pointer and grows slightly on hover.
    r.rotation.y = MathUtils.damp(r.rotation.y, pointer.current.x * 0.35, 3, dt);
    r.rotation.x = MathUtils.damp(r.rotation.x, -pointer.current.y * 0.2, 3, dt);
    r.scale.setScalar(MathUtils.damp(r.scale.x, 1 + hover.current * 0.08, 6, dt));

    // Spin a full turn while hovered; on release ease back to the nearest front-facing angle.
    if (hovered) {
      spin.current += dt * 3;
    } else {
      const target = Math.round(spin.current / TAU) * TAU;
      spin.current = MathUtils.damp(spin.current, target, 4, dt);
    }
    tt.rotation.y = BASE_ANGLE + Math.sin(clock.elapsedTime * 0.5) * 0.2 + spin.current;
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 4, 5]} intensity={palette.keyLight} />
      <pointLight position={[-4, -2, 3]} intensity={palette.fillLight * 0.6} distance={20} />

      <group ref={rig}>
        <group ref={turntable} rotation={[0, BASE_ANGLE, 0]}>
          <PlateStackModel
            palette={palette}
            animate={animate}
            active={active}
            hover={hover}
            plates={plates}
            halos={halos}
          />
        </group>
      </group>
    </>
  );
}
