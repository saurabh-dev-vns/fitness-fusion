import { pricingContent } from './pricingContent';

export function PlanPrice({ price }: { price: number }) {
  return (
    <div className="mb-6">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-sm opacity-70">{pricingContent.period}</span>
    </div>
  );
}
