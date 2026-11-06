import { useState } from 'react';
import { AnimatedSection } from '../AnimatedSection';
import { ContactForm } from './ContactForm';
import { ContactGlobe } from './ContactGlobe';
import { ContactInfo } from './ContactInfo';
import { contactContent } from './contactContent';

export function ContactSection() {
  const { title, description } = contactContent;

  // Bumped every time a message is sent. The globe watches it and plays a
  // "message flies to the gym" animation for each new value.
  const [sendKey, setSendKey] = useState(0);

  return (
    <div className="bg-surface py-24">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-mute max-w-2xl mx-auto">{description}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <ContactForm onSent={() => setSendKey((k) => k + 1)} />
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-8">
              <ContactGlobe sendKey={sendKey} />
              <ContactInfo />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
