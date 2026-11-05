import { CalendarCheck, Clock, Users } from 'lucide-react';

export const heroContent = {
  eyebrow: 'Strength · Conditioning · Recovery',
  headline: ['Build Strength.', 'Break Limits.'],
  description:
    'Pro-grade equipment, coach-led programming and a community that pushes you past plateaus. Your strongest self starts with one rep.',
  primaryCta: { label: 'Start Free Trial', href: '#pricing' },
  secondaryCta: { label: 'Explore Classes', href: '#classes' },
  highlights: [
    { icon: Clock, value: '24/7', label: 'Open access' },
    { icon: Users, value: '190+', label: 'Expert coaches' },
    { icon: CalendarCheck, value: '60+', label: 'Weekly classes' },
  ],
} as const;
