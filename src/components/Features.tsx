import { Shield, Zap, Users } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export function Features() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best equipment, trainers, and environment to help you achieve your fitness goals.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSection className="bg-white p-8 rounded-xl shadow-lg">
            <Shield className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
            <p className="text-gray-600">
              Train in a clean, sanitized, and professionally maintained facility.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-white p-8 rounded-xl shadow-lg">
            <Zap className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Expert Training</h3>
            <p className="text-gray-600">
              Get guidance from certified professional trainers.
            </p>
          </AnimatedSection>

          <AnimatedSection className="bg-white p-8 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">
              Join a supportive community of like-minded fitness enthusiasts.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}