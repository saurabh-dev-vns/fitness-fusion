import { Check } from 'lucide-react';

export function PlanFeatures({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3 mb-6">
      {features.map((feature) => (
        <li key={feature} className="flex items-center space-x-2">
          <Check className="w-5 h-5 flex-shrink-0" aria-hidden />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
