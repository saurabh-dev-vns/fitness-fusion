import { Shield, Users, Zap } from 'lucide-react';
import type { FeatureKind } from './scene/IconScene';

export const featuresContent = {
  title: 'Why Choose Us',
  description:
    'We provide the best equipment, trainers, and environment to help you achieve your fitness goals.',
  items: [
    {
      kind: 'shield',
      icon: Shield, // shown while the 3D icon loads / if WebGL is unavailable
      title: 'Safe Environment',
      description:
        'Train in a clean, sanitized, and professionally maintained facility.',
    },
    {
      kind: 'bolt',
      icon: Zap,
      title: 'Expert Training',
      description: 'Get guidance from certified professional trainers.',
    },
    {
      kind: 'network',
      icon: Users,
      title: 'Community',
      description:
        'Join a supportive community of like-minded fitness enthusiasts.',
    },
  ] satisfies ReadonlyArray<{
    kind: FeatureKind;
    icon: typeof Shield;
    title: string;
    description: string;
  }>,
};
