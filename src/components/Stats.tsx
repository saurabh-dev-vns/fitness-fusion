import { Users, Dumbbell, Trophy } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-16 px-4">
      <AnimatedSection className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Users className="w-12 h-12 text-purple-600" />
          <h3 className="text-4xl font-bold">290k+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Dumbbell className="w-12 h-12 text-purple-600" />
          <h3 className="text-4xl font-bold">175k+</h3>
          <p className="text-gray-600">Fitness Workshops</p>
        </div>
      </AnimatedSection>
      
      <AnimatedSection className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Trophy className="w-12 h-12 text-purple-600" />
          <h3 className="text-4xl font-bold">190+</h3>
          <p className="text-gray-600">Professional Trainers</p>
        </div>
      </AnimatedSection>
    </div>
  );
}