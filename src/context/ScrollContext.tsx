"use client"

import React, { createContext, useContext, ReactNode } from 'react'
import { MotionValue } from 'framer-motion'

// Define the context type
interface ScrollContextType {
  scrollYProgress: MotionValue<number> | null;
  prefersReducedMotion: boolean;
  isMobileDevice: boolean;
}

// Create the context with default values
const ScrollContext = createContext<ScrollContextType>({
  scrollYProgress: null,
  prefersReducedMotion: false,
  isMobileDevice: false
});

// Hook to use the scroll context
export const useScrollContext = () => useContext(ScrollContext);

// Provider component
interface ScrollProviderProps {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  prefersReducedMotion: boolean;
  isMobileDevice: boolean;
}

export function ScrollProvider({
  children,
  scrollYProgress,
  prefersReducedMotion,
  isMobileDevice
}: ScrollProviderProps) {
  return (
    <ScrollContext.Provider
      value={{
        scrollYProgress,
        prefersReducedMotion,
        isMobileDevice
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
} 