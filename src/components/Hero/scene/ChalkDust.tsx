import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Points } from 'three';
import type { ScenePalette } from './palette';

const COUNT = 140;
const BOUNDS = { x: 10, y: 7, z: 6 };

/** Floating chalk-dust specks that drift upward and wrap around. */
export function ChalkDust({ palette, animate }: { palette: ScenePalette; animate: boolean }) {
  const ref = useRef<Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS.z;
      speeds[i] = 0.08 + Math.random() * 0.22;
    }
    return { positions, speeds };
  }, []);

  useFrame(({ clock }, dt) => {
    const points = ref.current;
    if (!points || !animate) return;
    const attr = points.geometry.getAttribute('position');
    const t = clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      let y = attr.getY(i) + speeds[i] * dt;
      if (y > BOUNDS.y / 2) y = -BOUNDS.y / 2;
      attr.setY(i, y);
      attr.setX(i, attr.getX(i) + Math.sin(t * 0.5 + i) * 0.0015);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={palette.dust} size={0.045} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
  );
}
