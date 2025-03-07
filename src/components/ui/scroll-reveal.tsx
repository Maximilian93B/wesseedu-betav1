import { ReactNode, forwardRef } from 'react';
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
    // Simply render the children without any animations or observers
    return (
      <div
        ref={forwardedRef}
        className={cn(className)}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal'; 