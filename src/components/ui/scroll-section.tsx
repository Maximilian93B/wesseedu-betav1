import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from './scroll-reveal';

export interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
  animation?: 'fade-in' | 'fade-up' | 'slide-in' | 'zoom-in';
}

export function ScrollSection({
  children,
  className,
  id,
  staggerChildren = false,
  staggerDelay = 0.1,
  animation = 'fade-up',
}: ScrollSectionProps) {
  // If staggerChildren is true, we need to clone the children and add delays
  const renderChildren = () => {
    if (!staggerChildren) {
      return children;
    }

    // Clone children and add staggered delays with easing
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // Calculate a non-linear delay for more natural staggering
      // This creates a slight acceleration effect in the staggering
      const nonLinearDelay = Math.pow(index, 0.8) * staggerDelay;

      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          animationDelay: `${nonLinearDelay}s`,
          transitionDelay: `${nonLinearDelay}s`,
        },
      });
    });
  };

  return (
    <section 
      id={id} 
      className={cn('py-12 md:py-16 lg:py-20 scroll-smooth', className)}
      style={{ scrollBehavior: 'smooth' }}
    >
      <ScrollReveal 
        animation={animation}
        duration={0.8} // Slightly longer duration for mobile-like smoothness
        threshold={0.15} // Slightly higher threshold for earlier triggering
        rootMargin="0px 0px -80px 0px" // Show elements a bit earlier
      >
        {renderChildren()}
      </ScrollReveal>
    </section>
  );
} 