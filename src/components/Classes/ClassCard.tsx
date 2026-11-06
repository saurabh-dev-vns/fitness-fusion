import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { ClassBadges } from './ClassBadges';
import { ClassStage } from './ClassStage';
import { classesContent, type ClassItem } from './classesContent';

export function ClassCard({
  kind,
  icon,
  title,
  instructor,
  image,
  time,
  level,
  duration,
}: ClassItem) {
  const [hovered, setHovered] = useState(false);
  // Pointer position inside the card, -1 … 1. A ref (not state) so moving the
  // mouse never re-renders React; the 3D scene reads it every frame.
  const pointer = useRef({ x: 0, y: 0 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    setHovered(false);
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  const { cta } = classesContent;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="h-full flex flex-col overflow-hidden rounded-xl border border-line bg-card shadow-lg"
    >
      <ClassStage
        kind={kind}
        icon={icon}
        image={image}
        hovered={hovered}
        pointer={pointer}
      />

      <div className="flex flex-col flex-1 p-6">
        <ClassBadges level={level} duration={duration} />

        <h3 className="text-xl font-bold mt-4 mb-3">{title}</h3>

        <ul className="space-y-2 text-sm text-mute mb-6">
          <li className="flex items-center gap-2">
            <User className="w-4 h-4 shrink-0" aria-hidden />
            <span>with {instructor}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" aria-hidden />
            <span>{time}</span>
          </li>
        </ul>

        <a
          href={cta.href}
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
        >
          {cta.label}
          <ArrowRight className="w-4 h-4" aria-hidden />
        </a>
      </div>
    </motion.div>
  );
}
