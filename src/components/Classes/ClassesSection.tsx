import { AnimatedSection } from '../AnimatedSection';
import { ClassCard } from './ClassCard';

export function ClassesSection() {
  const classes = [
    {
      title: 'High-Intensity Interval Training',
      instructor: 'John Smith',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80',
      time: 'Mon, Wed, Fri - 8:00 AM',
    },
    {
      title: 'Yoga Flow',
      instructor: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80',
      time: 'Tue, Thu - 9:00 AM',
    },
    {
      title: 'Strength Training',
      instructor: 'Mike Wilson',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80',
      time: 'Mon, Wed, Fri - 6:00 PM',
    },
  ];

  return (
    <div className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Classes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our expert-led group fitness classes designed for all levels
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classes.map((classItem) => (
            <AnimatedSection key={classItem.title}>
              <ClassCard {...classItem} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}