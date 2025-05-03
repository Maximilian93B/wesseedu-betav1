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

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // Use a cubic easing formula for more natural staggering
      // This creates a smoother acceleration at the beginning
      const delay = index * staggerDelay;

      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          transitionDelay: `${delay}s`,
        },
      });
    });
  };

  return (
    <section 
      id={id} 
      className={cn('py-12 md:py-16 lg:py-20 scroll-mt-16', className)}
      style={{ 
        scrollBehavior: 'smooth', 
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    >
      <ScrollReveal 
        animation={animation}
        duration={0.7}
        threshold={0.1}
        rootMargin="0px 0px -10% 0px"
        once={true}
      >
        {renderChildren()}
      </ScrollReveal>
    </section>
  );
} 