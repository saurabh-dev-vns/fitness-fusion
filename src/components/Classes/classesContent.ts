import { Dumbbell, Flame, Flower2, type LucideIcon } from 'lucide-react';
import type { ClassKind } from './scene/types';

export interface ClassItem {
  kind: ClassKind;
  /** Flat icon shown while the 3D stage loads / if WebGL is unavailable. */
  icon: LucideIcon;
  title: string;
  instructor: string;
  /** Faint photo rendered behind the 3D stage. */
  image: string;
  time: string;
  level: string;
  duration: string;
}

export const classesContent = {
  title: 'Featured Classes',
  description: 'Join our expert-led group fitness classes designed for all levels',
  cta: { label: 'Reserve a spot', href: '#contact' },
  items: [
    {
      kind: 'hiit',
      icon: Flame,
      title: 'High-Intensity Interval Training',
      instructor: 'John Smith',
      image:
        'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80',
      time: 'Mon, Wed, Fri - 8:00 AM',
      level: 'Intermediate',
      duration: '45 min',
    },
    {
      kind: 'yoga',
      icon: Flower2,
      title: 'Yoga Flow',
      instructor: 'Sarah Johnson',
      image:
        'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80',
      time: 'Tue, Thu - 9:00 AM',
      level: 'All levels',
      duration: '60 min',
    },
    {
      kind: 'strength',
      icon: Dumbbell,
      title: 'Strength Training',
      instructor: 'Mike Wilson',
      image:
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80',
      time: 'Mon, Wed, Fri - 6:00 PM',
      level: 'Advanced',
      duration: '60 min',
    },
  ] satisfies ClassItem[],
};
