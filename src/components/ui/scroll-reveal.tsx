import { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  asChild?: boolean;
  animation?: 'fade-in' | 'fade-up' | 'slide-in' | 'zoom-in';
  delay?: number;
  duration?: number;
}

// Simplified ScrollReveal component that just renders children without animations
export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      // Keep these props for API compatibility but don't use them
      threshold = 0.1,
      rootMargin = '0px 0px -100px 0px',
      once = true,
      animation = 'fade-up',
      delay = 0,
      duration = 0.6,
    },
    forwardedRef
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const localRef = useRef<HTMLDivElement>(null);
    const ref = (forwardedRef as React.MutableRefObject<HTMLDivElement>) || localRef;

    useEffect(() => {
      const currentElement = 'current' in ref ? ref.current : localRef.current;
      if (!currentElement) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(currentElement);
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(currentElement);
      return () => observer.disconnect();
    }, [ref, threshold, rootMargin, once]);

    // Animation styles
    const animationStyles = {
      opacity: isVisible ? 1 : 0,
      transform: isVisible 
        ? 'none' 
        : animation === 'fade-up' 
          ? 'translateY(20px)' 
          : animation === 'slide-in' 
            ? 'translateX(-20px)' 
            : animation === 'zoom-in' 
              ? 'scale(0.95)' 
              : 'none',
      transition: `opacity ${duration}s ease-out, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
      transitionDelay: `${delay}s`,
      willChange: 'transform, opacity',
    };

    return (
      <div
        ref={localRef}
        className={cn(className)}
        style={animationStyles}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal'; 