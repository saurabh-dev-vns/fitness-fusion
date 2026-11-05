import { heroContent } from './heroContent';

export function HeroHighlights() {
  return (
    <dl className="grid grid-cols-3 gap-6 max-w-md border-t border-line pt-6">
      {heroContent.highlights.map(({ icon: Icon, value, label }) => (
        <div key={label}>
          <Icon className="w-5 h-5 text-mute mb-2" aria-hidden />
          <dt className="text-2xl font-bold">{value}</dt>
          <dd className="text-sm text-mute">{label}</dd>
        </div>
      ))}
    </dl>
  );
}
