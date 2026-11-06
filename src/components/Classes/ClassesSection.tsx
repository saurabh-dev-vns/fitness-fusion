import { AnimatedSection } from '../AnimatedSection';
import { ClassCard } from './ClassCard';
import { classesContent } from './classesContent';

export function ClassesSection() {
  const { title, description, items } = classesContent;

  return (
    <div className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-mute max-w-2xl mx-auto">{description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <AnimatedSection key={item.title} className="h-full">
              <ClassCard {...item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
