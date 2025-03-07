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

    // Clone children and add staggered delays
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      return React.cloneElement(child, {
        ...child.props,
        style: {
          ...child.props.style,
          animationDelay: `${index * staggerDelay}s`,
          transitionDelay: `${index * staggerDelay}s`,
        },
      });
    });
  };

  return (
    <section id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      <ScrollReveal animation={animation}>
        {renderChildren()}
      </ScrollReveal>
    </section>
  );
} 