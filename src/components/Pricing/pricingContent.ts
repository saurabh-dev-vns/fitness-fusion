import { Crown, Dumbbell, Flame, type LucideIcon } from 'lucide-react';

export interface Plan {
  /** Flat icon shown while the 3D stage loads / if WebGL is unavailable. */
  icon: LucideIcon;
  title: string;
  price: number;
  features: string[];
  /** Number of plates loaded onto the 3D bar – more plates = higher tier. */
  plates: number;
  /** Number of orbiting rings around the 3D bar. */
  halos: number;
  isPopular?: boolean;
}

export const pricingContent = {
  title: 'Membership Plans',
  description: 'Choose the perfect plan that fits your fitness journey',
  popularLabel: 'Most Popular',
  cta: 'Get Started',
  period: '/month',
  plans: [
    {
      icon: Dumbbell,
      title: 'Basic',
      price: 29,
      plates: 2,
      halos: 0,
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Group classes',
      ],
    },
    {
      icon: Flame,
      title: 'Pro',
      price: 59,
      plates: 3,
      halos: 1,
      isPopular: true,
      features: [
        'All Basic features',
        'Personal trainer sessions',
        'Nutrition consultation',
        'Recovery zone access',
      ],
    },
    {
      icon: Crown,
      title: 'Elite',
      price: 99,
      plates: 5,
      halos: 2,
      features: [
        'All Pro features',
        'Private training studio',
        'Monthly massage therapy',
        'VIP locker room',
      ],
    },
  ] satisfies Plan[],
};
