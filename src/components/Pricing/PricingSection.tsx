import { AnimatedSection } from '../AnimatedSection';
import { PricingCard } from './PricingCard';

export function PricingSection() {
  const plans = [
    {
      title: 'Basic',
      price: 29,
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Group classes',
      ],
    },
    {
      title: 'Pro',
      price: 59,
      features: [
        'All Basic features',
        'Personal trainer sessions',
        'Nutrition consultation',
        'Recovery zone access',
      ],
      isPopular: true,
    },
    {
      title: 'Elite',
      price: 99,
      features: [
        'All Pro features',
        'Private training studio',
        'Monthly massage therapy',
        'VIP locker room',
      ],
    },
  ];

  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Membership Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your fitness journey
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <AnimatedSection key={plan.title}>
              <PricingCard {...plan} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}