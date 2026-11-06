import { Menu } from 'lucide-react';

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      aria-haspopup="dialog"
      className="text-ink hover:opacity-70 transition-opacity"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
