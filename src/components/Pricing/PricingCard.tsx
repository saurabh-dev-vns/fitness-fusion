import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PlanFeatures } from './PlanFeatures';
import { PlanPrice } from './PlanPrice';
import { PlanStage } from './PlanStage';
import { pricingContent, type Plan } from './pricingContent';

export function PricingCard({
  icon,
  title,
  price,
  features,
  plates,
  halos,
  isPopular = false,
}: Plan) {
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

  const { popularLabel, cta } = pricingContent;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative h-full flex flex-col overflow-hidden rounded-2xl shadow-xl ${
        isPopular ? 'bg-ink text-page' : 'bg-card text-ink border border-line'
      }`}
    >
      {isPopular && (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-page text-ink px-3 py-1 text-xs font-semibold">
          {popularLabel}
        </span>
      )}

      <PlanStage
        icon={icon}
        plates={plates}
        halos={halos}
        hovered={hovered}
        pointer={pointer}
        inverted={isPopular}
      />

      <div className="flex flex-col flex-1 p-6 pt-2">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <PlanPrice price={price} />
        <PlanFeatures features={features} />

        <button
          className={`mt-auto w-full py-3 rounded-full font-semibold transition-opacity ${
            isPopular
              ? 'bg-page text-ink hover:opacity-80'
              : 'bg-ink text-page hover:opacity-80'
          }`}
        >
          {cta}
        </button>
      </div>
    </motion.div>
  );
}
