export interface NavItem {
  label: string;
  /** Id of the <section> in App.tsx this link scrolls to. */
  id: string;
}

export const navContent = {
  brand: 'Fitness Fusion',
  items: [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'Classes', id: 'classes' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ] satisfies NavItem[],
  cta: { label: 'Join Now', href: '#pricing' },
};

export const sectionIds = navContent.items.map((item) => item.id);
