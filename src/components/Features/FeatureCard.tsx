import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { FeatureIcon } from './FeatureIcon';
import type { FeatureKind } from './scene/IconScene';

interface FeatureCardProps {
  kind: FeatureKind;
  icon: LucideIcon;
  title: string;
  description: string;
}

const SPRING = { stiffness: 200, damping: 20 };
const MAX_TILT = 8; // degrees

export function FeatureCard({ kind, icon, title, description }: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  // Pointer position inside the card, normalised to -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    setHovered(false);
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className="bg-card border border-line p-8 rounded-xl shadow-lg h-full"
    >
      <FeatureIcon kind={kind} icon={icon} hovered={hovered} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-mute">{description}</p>
    </motion.div>
  );
}
