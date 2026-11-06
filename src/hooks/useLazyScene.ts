import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Helper for heavy WebGL blocks:
 *  - `mounted` flips to true the first time the element nears the viewport,
 *    so the WebGL context isn't created until it's needed.
 *  - `inView` tracks live visibility so the scene can pause when scrolled away.
 */
export function useLazyScene(rootMargin = '150px') {
  const { ref, inView } = useInView({ rootMargin });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (inView) setMounted(true);
  }, [inView]);

  return { ref, inView, mounted };
}
