import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { KettlebellModel } from './KettlebellModel';
import { LotusModel } from './LotusModel';
import { PlateTowerModel } from './PlateTowerModel';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { ClassKind, PointerRef } from './types';

const MODELS = {
  hiit: KettlebellModel,
  yoga: LotusModel,
  strength: PlateTowerModel,
} satisfies Record<ClassKind, unknown>;

/** Static "stage floor": a faint disc with two thin rings. */
function Floor({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial color={palette.orbit} transparent opacity={0.07} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.95, 2, 96]} />
        <meshBasicMaterial color={palette.orbit} transparent opacity={0.35} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.2, 1.22, 96]} />
        <meshBasicMaterial color={palette.orbit} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

interface StageSceneProps {
  kind: ClassKind;
  hovered: boolean;
  pointer: PointerRef;
  palette: ScenePalette;
  animate: boolean;
}

export function StageScene({ kind, hovered, pointer, palette, animate }: StageSceneProps) {
  const rig = useRef<Group>(null);
  const hover = useRef(0); // eased 0 → 1, shared with the model
  const Model = MODELS[kind];

  useFrame((_, dt) => {
    const g = rig.current;
    if (!g || !animate) return;

    hover.current = MathUtils.damp(hover.current, hovered ? 1 : 0, 6, dt);

    // The whole model leans toward the pointer and grows slightly on hover.
    g.rotation.y = MathUtils.damp(g.rotation.y, pointer.current.x * 0.6, 3, dt);
    g.rotation.x = MathUtils.damp(g.rotation.x, -pointer.current.y * 0.25, 3, dt);
    g.scale.setScalar(MathUtils.damp(g.scale.x, 1 + hover.current * 0.08, 6, dt));
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 5, 5]} intensity={palette.keyLight} />
      <pointLight position={[-4, -1, 3]} intensity={palette.fillLight * 0.7} distance={20} />

      <Floor palette={palette} />

      <group ref={rig}>
        <Model palette={palette} animate={animate} hover={hover} />
      </group>
    </>
  );
}
