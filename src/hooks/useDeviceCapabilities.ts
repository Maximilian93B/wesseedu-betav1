import { useState, useEffect } from "react";

/**
 * Hook to detect device capabilities for adaptive performance
 * @returns Object containing device capability flags
 */
export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    isLowPowerDevice: false,
    prefersReducedMotion: false,
    isMobile: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Determine if mobile/low-power
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    
    // Use CPU cores as a proxy for device power (simplified heuristic)
    const isLowPowerDevice = isMobile || 
      (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4);
    
    setCapabilities({
      isLowPowerDevice,
      prefersReducedMotion,
      isMobile
    });
    
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setCapabilities(prev => ({...prev, prefersReducedMotion: e.matches}));
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return capabilities;
}; 