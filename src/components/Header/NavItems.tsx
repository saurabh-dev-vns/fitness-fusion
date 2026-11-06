import { NavLink } from './NavLink';
import { navContent } from './navContent';

interface NavItemsProps {
  /** Id of the section currently on screen (from `useActiveSection`). */
  activeId: string | null;
}

export function NavItems({ activeId }: NavItemsProps) {
  return (
    <>
      {navContent.items.map((item) => (
        <NavLink
          key={item.id}
          href={`#${item.id}`}
          label={item.label}
          active={item.id === activeId}
        />
      ))}
    </>
  );
}
