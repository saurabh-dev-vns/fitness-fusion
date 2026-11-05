import { AnimatedSection } from '../AnimatedSection';
import { ContactForm } from './ContactForm';
import { ContactInfo } from './ContactInfo';

export function ContactSection() {
  return (
    <div className="bg-surface py-24" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-mute max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
          
          <AnimatedSection>
            <ContactInfo />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}