import { useState, useEffect, memo } from "react";
import { AnimatedTagline } from "@/components/ui/AnimatedTagline";
import { cn } from "@/lib/utils";

interface OptimizedAnimatedTaglineProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  delay?: number;
}

/**
 * Optimized AnimatedTagline wrapper that defers rendering until browser is idle
 * Improves performance by not blocking the main thread during initial page load
 */
export const OptimizedAnimatedTagline = memo(({ 
  text, 
  highlightWords = [], 
  className = "",
  delay = 0
}: OptimizedAnimatedTaglineProps) => {
  // Use the browser's requestIdleCallback for deferring animation
  const [shouldRender, setShouldRender] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      // @ts-ignore - TypeScript doesn't recognize requestIdleCallback
      window.requestIdleCallback(() => {
        setShouldRender(true);
      }, { timeout: 500 });
    } else {
      // Fallback for browsers without requestIdleCallback
      const timeoutId = setTimeout(() => {
        setShouldRender(true);
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, []);
  
  if (!shouldRender) {
    // Return a placeholder with the same dimensions
    return (
      <div 
        className={cn(className, "opacity-0")} 
        aria-hidden="true"
      >
        {text}
      </div>
    );
  }
  
  return (
    <AnimatedTagline
      text={text}
      highlightWords={highlightWords}
      className={className}
      delay={delay}
    />
  );
});

OptimizedAnimatedTagline.displayName = 'OptimizedAnimatedTagline'; 