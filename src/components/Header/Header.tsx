import { useState, useEffect } from 'react';
import { Menu, Dumbbell } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { NavItems, navItems } from './NavItems';
import { ThemeToggle } from '../../theme/ThemeToggle';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Fade in a theme-aware backdrop (white in light, black in dark) on scroll.
  const backdropOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4">
        <motion.div
          aria-hidden
          style={{ opacity: backdropOpacity }}
          className="absolute inset-0 bg-page border-b border-line"
        />
        <div className="relative max-w-6xl mx-auto h-16 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2 text-ink">
            <Dumbbell className="w-8 h-8" />
            <span className="text-xl font-bold">Fitness Fusion</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavItems />
            <ThemeToggle />
            <button className="bg-ink text-page px-6 py-2 rounded-full hover:opacity-80 transition-opacity">
              Join Now
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              className="text-ink hover:opacity-70 transition-opacity"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
