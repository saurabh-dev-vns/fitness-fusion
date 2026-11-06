import { navContent } from './navContent';

export function NavCta({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  const { label, href } = navContent.cta;

  return (
    <a
      href={href}
      onClick={onClick}
      className={`bg-ink text-page px-6 py-2 rounded-full font-medium hover:opacity-80 transition-opacity ${className}`}
    >
      {label}
    </a>
  );
}
