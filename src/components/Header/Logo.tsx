import { useState } from 'react';
import { LogoMark } from './LogoMark';
import { navContent } from './navContent';

export function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#home"
      aria-label={`${navContent.brand} – back to top`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="flex items-center space-x-2 text-ink"
    >
      <LogoMark hovered={hovered} />
      <span className="text-xl font-bold">{navContent.brand}</span>
    </a>
  );
}
