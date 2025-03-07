import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  throttleMs?: number;
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  once = true,
  throttleMs = 100,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (throttleTimeoutRef.current) {
          clearTimeout(throttleTimeoutRef.current);
        }
        
        throttleTimeoutRef.current = setTimeout(() => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (once && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!once) {
            setIsIntersecting(false);
          }
        }, throttleMs);
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
      
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, throttleMs]);

  return { ref, isIntersecting };
} 