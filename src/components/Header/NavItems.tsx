interface NavItemsProps {
  className?: string;
  onClick?: () => void;
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Classes', href: '#classes' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export function NavItems({ className = '', onClick }: NavItemsProps) {
  return (
    <>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`text-gray-700 hover:text-purple-600 transition-colors ${className}`}
          onClick={onClick}
        >
          {item.label}
        </a>
      ))}
    </>
  );
}