import { ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

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

export const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      children,
      className,
      threshold = 0.1,
      rootMargin = '0px 0px -100px 0px',
      once = true,
      animation = 'fade-up',
      delay = 0,
      duration = 0.6,
    },
    forwardedRef
  ) => {
    const { ref, isIntersecting } = useIntersectionObserver({
      threshold,
      rootMargin,
      once,
    });

    // Set the ref to be both the intersection observer ref and any forwarded ref
    const setRefs = (element: HTMLDivElement) => {
      // @ts-ignore - TypeScript doesn't know about the current property
      ref.current = element;
      
      if (typeof forwardedRef === 'function') {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
    };

    // Generate animation styles
    const getAnimationStyles = () => {
      const delayValue = delay ? `${delay}s` : '0s';
      const durationValue = `${duration}s`;

      return {
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting 
          ? 'translate3d(0, 0, 0)' 
          : animation === 'fade-up' 
            ? 'translate3d(0, 20px, 0)' 
            : animation === 'slide-in' 
              ? 'translate3d(-50px, 0, 0)' 
              : animation === 'zoom-in' 
                ? 'scale(0.95)' 
                : 'translate3d(0, 0, 0)',
        transition: `opacity ${durationValue} ease ${delayValue}, transform ${durationValue} ease ${delayValue}`,
        willChange: 'opacity, transform',
      };
    };

    return (
      <div
        ref={setRefs}
        className={cn(className)}
        style={getAnimationStyles()}
      >
        {children}
      </div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal'; 