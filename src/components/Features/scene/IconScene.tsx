import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { BoltIcon } from './BoltIcon';
import { NetworkIcon } from './NetworkIcon';
import { ShieldIcon } from './ShieldIcon';
import type { ScenePalette } from '../../Hero/scene/palette';

export type FeatureKind = 'shield' | 'bolt' | 'network';

const ICONS = {
  shield: ShieldIcon,
  bolt: BoltIcon,
  network: NetworkIcon,
} satisfies Record<FeatureKind, unknown>;

const TAU = Math.PI * 2;

interface IconSceneProps {
  kind: FeatureKind;
  hovered: boolean;
  palette: ScenePalette;
  animate: boolean;
}

export function IconScene({ kind, hovered, palette, animate }: IconSceneProps) {
  const group = useRef<Group>(null);
  const hover = useRef(0); // eased 0 → 1, shared with the icon
  const spin = useRef(0);
  const Icon = ICONS[kind];

  useFrame(({ clock }, dt) => {
    const g = group.current;
    if (!g || !animate) return;
    const t = clock.elapsedTime;

    hover.current = MathUtils.damp(hover.current, hovered ? 1 : 0, 6, dt);

    // Spin while hovered; when released, ease back to the nearest full turn so it faces front.
    if (hovered) {
      spin.current += dt * 3.5;
    } else {
      const target = Math.round(spin.current / TAU) * TAU;
      spin.current = MathUtils.damp(spin.current, target, 4, dt);
    }

    g.rotation.y = Math.sin(t * 0.6) * 0.45 + spin.current;
    g.position.y = Math.sin(t * 1.1) * 0.06;
    g.scale.setScalar(1 + hover.current * 0.12);
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 4, 5]} intensity={palette.keyLight} />
      <pointLight position={[-4, -2, 3]} intensity={palette.fillLight * 0.6} distance={20} />

      <group ref={group}>
        <Icon palette={palette} animate={animate} hover={hover} />
      </group>
    </>
  );
}
