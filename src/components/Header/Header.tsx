import { useState, useEffect } from 'react';
import { Menu, Dumbbell } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MobileMenu } from './MobileMenu';
import { NavItems, navItems } from './NavItems';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']
  );
  
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 1px 3px rgba(0, 0, 0, 0.1)']
  );

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
      <motion.header
        style={{
          backgroundColor: headerBackground,
          boxShadow,
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4"
      >
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2 text-purple-600">
            <Dumbbell className="w-8 h-8" />
            <span className="text-xl font-bold">Fitness Fusion</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavItems />
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Join Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-purple-600"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}