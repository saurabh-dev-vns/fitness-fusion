import { Header } from './components/Header/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { ClassesSection } from './components/Classes/ClassesSection';
import { PricingSection } from './components/Pricing/PricingSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="stats">
          <Stats />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="classes">
          <ClassesSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;