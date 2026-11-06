import { useEffect } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { NavCta } from './NavCta';
import type { NavItem } from './navContent';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeId: string | null;
}

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const row: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

export function MobileMenu({ isOpen, onClose, items, activeId }: MobileMenuProps) {
  // Close with the Escape key.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-72 bg-page border-l border-line shadow-xl p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-mute hover:text-ink"
            >
              <X className="w-6 h-6" />
            </button>

            <nav aria-label="Mobile" className="mt-10">
              <motion.ul variants={list} initial="hidden" animate="show" className="space-y-2">
                {items.map((item) => {
                  const active = item.id === activeId;
                  return (
                    <motion.li key={item.id} variants={row}>
                      <a
                        href={`#${item.id}`}
                        onClick={onClose}
                        aria-current={active ? 'location' : undefined}
                        className={`flex items-center gap-3 py-2 text-lg transition-opacity ${
                          active ? 'text-ink font-semibold' : 'text-mute hover:text-ink'
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`h-2 w-2 rounded-full bg-ink transition-opacity ${
                            active ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                        {item.label}
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Same 3D plate as the logo, bigger – only exists while the menu is open. */}
            <div className="mt-auto flex flex-col items-center gap-6">
              <LogoMark size="lg" hovered />
              <NavCta onClick={onClose} className="w-full text-center py-3" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
