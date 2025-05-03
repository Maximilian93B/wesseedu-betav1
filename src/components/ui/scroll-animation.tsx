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

  // Get the appropriate transform based on animation type
  const getTransform = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'translateY(20px)';
        case 'slide-in':
          return 'translateX(-30px)';
        case 'slide-up':
          return 'translateY(40px)';
        case 'zoom-in':
          return 'scale(0.95)';
        case 'scale-up':
          return 'scale(0.9)';
        default:
          return 'none';
      }
    }
    return 'none';
  };

  // Simplified style object with hardware acceleration properties
  const styles = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}s`,
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'antialiased' as const,
  };

  return (
    <div 
      ref={ref} 
      className={cn(className)}
      style={styles}
    >
      {children}
    </div>
  );
} 