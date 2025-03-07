import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AnimationType = 'fade-up' | 'fade-in' | 'slide-in' | 'slide-up' | 'zoom-in' | 'scale-up';

export interface ScrollAnimationProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export function ScrollAnimation({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className,
  once = true,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  // Animation styles based on the animation type
  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: isVisible ? 1 : 0,
      transition: `opacity ${duration}s ease, transform ${duration}s ease ${delay}s`,
    };

    const transformStyles = {
      'fade-up': {
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      },
      'fade-in': {
        // No transform needed for fade-in
      },
      'slide-in': {
        transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      },
      'slide-up': {
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      },
      'zoom-in': {
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      },
      'scale-up': {
        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      },
    };

    return {
      ...baseStyles,
      ...(transformStyles[animation] || {}),
    };
  };

  return (
    <div 
      ref={ref} 
      className={cn(className)}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
} 