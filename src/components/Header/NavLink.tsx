import { motion } from 'framer-motion';

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
}

export function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`relative px-4 py-2 rounded-full transition-colors ${
        active ? 'text-ink' : 'text-mute hover:text-ink'
      }`}
    >
      {/* One shared pill that glides between links (same layoutId on every link). */}
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="absolute inset-0 rounded-full bg-ink/10"
        />
      )}
      <span className="relative">{label}</span>
    </a>
  );
}
