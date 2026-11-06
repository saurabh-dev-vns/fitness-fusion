import { AnimatedSection } from '../AnimatedSection';
import { PricingCard } from './PricingCard';
import { pricingContent } from './pricingContent';

export function PricingSection() {
  const { title, description, plans } = pricingContent;

  return (
    <div className="bg-surface py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-mute max-w-2xl mx-auto">{description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <AnimatedSection key={plan.title} className="h-full">
              <PricingCard {...plan} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
