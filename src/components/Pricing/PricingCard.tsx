import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export function PricingCard({ title, price, features, isPopular = false }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl ${
        isPopular ? 'bg-purple-600 text-white' : 'bg-white'
      } shadow-xl`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-sm">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 rounded-full font-semibold transition-colors ${
          isPopular
            ? 'bg-white text-purple-600 hover:bg-gray-100'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}