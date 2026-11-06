import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Group } from 'three';
import { Globe } from './Globe';
import { LocationPin } from './LocationPin';
import { MessageArc } from './MessageArc';
import { facingAngle, latLonToVector3 } from './geometry';
import type { ScenePalette } from '../../Hero/scene/palette';
import type { GeoPoint, PointerRef } from './types';

const TILT: [number, number, number] = [0.45, 0, 0.15]; // axial tilt, tips the north pole toward the viewer
const SWAY_AMPLITUDE = 0.9; // radians either side of facing the pin

interface GlobeSceneProps {
  location: GeoPoint;
  sendKey: number;
  pointer: PointerRef;
  palette: ScenePalette;
  animate: boolean;
}

export function GlobeScene({ location, sendKey, pointer, palette, animate }: GlobeSceneProps) {
  const lean = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const focus = useRef(0); // 0 = free sway, 1 = locked onto the pin
  const sendActive = useRef(0); // seconds left of the "send" focus

  // Angle that turns the globe so the pin faces the viewer.
  const faceAngle = useMemo(() => facingAngle(latLonToVector3(location)), [location]);

  // When a message is sent, steady the globe on the pin so the arc's landing is visible.
  useEffect(() => {
    if (sendKey > 0) sendActive.current = 3;
  }, [sendKey]);

  useFrame(({ clock }, dt) => {
    const l = lean.current;
    const s = spin.current;
    if (!l || !s || !animate) return;

    sendActive.current = Math.max(0, sendActive.current - dt);
    focus.current = MathUtils.damp(focus.current, sendActive.current > 0 ? 1 : 0, 3, dt);

    // Globe leans toward the pointer.
    l.rotation.y = MathUtils.damp(l.rotation.y, pointer.current.x * 0.3, 3, dt);
    l.rotation.x = MathUtils.damp(l.rotation.x, -pointer.current.y * 0.2, 3, dt);

    // Slow sway back and forth around the pin.
    s.rotation.y = faceAngle + Math.sin(clock.elapsedTime * 0.35) * SWAY_AMPLITUDE * (1 - focus.current);
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight position={[3, 4, 5]} intensity={palette.keyLight} />

      <group ref={lean}>
        <group rotation={TILT}>
          <group ref={spin} rotation={[0, faceAngle, 0]}>
            <Globe palette={palette} />
            <LocationPin location={location} palette={palette} animate={animate} />
            {sendKey > 0 && (
              <MessageArc
                key={sendKey}
                sendKey={sendKey}
                destination={location}
                palette={palette}
                animate={animate}
              />
            )}
          </group>
        </group>
      </group>
    </>
  );
}
