import { useState } from 'react';
import { Logo } from './Logo';
import { HeaderBackdrop } from './HeaderBackdrop';
import { MenuButton } from './MenuButton';
import { MobileMenu } from './MobileMenu';
import { NavCta } from './NavCta';
import { NavItems } from './NavItems';
import { ScrollProgress } from './ScrollProgress';
import { navContent, sectionIds } from './navContent';
import { ThemeToggle } from '../../theme/ThemeToggle';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useBodyScrollLock(isMenuOpen);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4">
        <HeaderBackdrop />

        <div className="relative max-w-6xl mx-auto h-16 flex items-center justify-between">
          <Logo />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center space-x-1">
            <NavItems activeId={activeId} />
            <ThemeToggle className="ml-4" />
            <NavCta className="ml-2" />
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <MenuButton onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>

        <ScrollProgress />
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={navContent.items}
        activeId={activeId}
      />
    </>
  );
}
