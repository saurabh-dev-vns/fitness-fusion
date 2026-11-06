interface ClassBadgesProps {
  level: string;
  duration: string;
}

export function ClassBadges({ level, duration }: ClassBadgesProps) {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold';

  return (
    <div className="flex flex-wrap gap-2">
      <span className={`${base} bg-ink text-page`}>{level}</span>
      <span className={`${base} border border-line text-mute`}>{duration}</span>
    </div>
  );
}
