import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CylinderGeometry, Object3D, type InstancedMesh } from 'three';
import type { ScenePalette } from '../../Hero/scene/palette';

const COLS = 18;
const ROWS = 9;
const SPACING = 1.3;
const COUNT = COLS * ROWS;
const REACH = 3; // pointer influence radius, in world units

/**
 * A grid of weight plates (one InstancedMesh = one draw call) that ripples in a
 * wave and flips over as the pointer passes near them.
 */
export function PlateWallScene({ palette, animate }: { palette: ScenePalette; animate: boolean }) {
  const mesh = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const pointer = useRef({ x: 0, y: 0 });
  const gl = useThree((s) => s.gl);

  // Plate faces the camera (cylinder axis along z).
  const geometry = useMemo(() => new CylinderGeometry(0.45, 0.45, 0.14, 48).rotateX(Math.PI / 2), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // Track the pointer on the window so it works even with cards on top of the canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const r = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [gl]);

  useFrame(({ clock, viewport }) => {
    const m = mesh.current;
    if (!m) return;

    const t = animate ? clock.elapsedTime : 0;
    const px = (pointer.current.x * viewport.width) / 2;
    const py = (pointer.current.y * viewport.height) / 2;

    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - (COLS - 1) / 2) * SPACING;
        const y = (r - (ROWS - 1) / 2) * SPACING;
        const near = animate ? Math.max(0, 1 - Math.hypot(x - px, y - py) / REACH) : 0;

        dummy.position.set(x, y, near * 0.8);
        dummy.rotation.set(
          Math.sin(t * 0.5 + r * 0.4) * 0.25,
          Math.sin(t * 0.8 + c * 0.45 + r * 0.35) * 0.9 + near * Math.PI,
          0
        );
        dummy.scale.setScalar(1 + near * 0.25);
        dummy.updateMatrix();
        m.setMatrixAt(i++, dummy.matrix);
      }
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 4, 6]} intensity={palette.keyLight} />
      <pointLight position={[-6, -3, 4]} intensity={palette.fillLight} distance={30} />

      <instancedMesh ref={mesh} args={[geometry, undefined, COUNT]} frustumCulled={false}>
        <meshStandardMaterial color={palette.plate} metalness={0.5} roughness={0.4} />
      </instancedMesh>
    </>
  );
}
