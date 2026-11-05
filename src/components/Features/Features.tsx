import { AnimatedSection } from '../AnimatedSection';
import { FeatureCard } from './FeatureCard';
import { PlateWallBackground } from './PlateWallBackground';
import { featuresContent } from './featuresContent';

export function Features() {
  const { title, description, items } = featuresContent;

  return (
    <div className="relative overflow-hidden bg-surface py-24">
      <PlateWallBackground />

      <div className="relative max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-mute max-w-2xl mx-auto">{description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <AnimatedSection key={item.title}>
              <FeatureCard {...item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
