import { useEffect, useRef, useState } from 'react';

/**
 * useInView hook
 * Determines when the referenced element enters the viewport using the IntersectionObserver API.
 * Returns the element ref and a boolean indicating visibility.
 */
export default function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
): { ref: React.RefObject<T>; isIntersecting: boolean } {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Trigger only once; remove if repeat animations desired
        }
      },
      options,
    );

    observer.observe(current);
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isIntersecting };
} 