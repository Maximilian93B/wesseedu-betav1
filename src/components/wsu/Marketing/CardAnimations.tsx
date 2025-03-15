import React from 'react';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

export function CardAnimations() {
  const { isLowPowerDevice, prefersReducedMotion } = useDeviceCapabilities();
  
  // For low-power or reduced-motion devices, use simpler animations with less motion
  const optimizedAnimations = isLowPowerDevice || prefersReducedMotion;
  
  return (
    <style jsx global>{`
      @keyframes pulse-slow {
        0%, 100% { opacity: ${optimizedAnimations ? '0.08' : '0.12'}; }
        50% { opacity: ${optimizedAnimations ? '0.18' : '0.32'}; }
      }
      .animate-pulse-slow {
        animation: pulse-slow ${optimizedAnimations ? '10s' : '8s'} cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
      
      @keyframes glow-float {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
        50% { transform: translateY(${optimizedAnimations ? '-5px' : '-10px'}) scale(${optimizedAnimations ? '1.02' : '1.05'}); opacity: 0.65; }
      }
      .animate-glow-float {
        animation: glow-float ${optimizedAnimations ? '6s' : '4s'} cubic-bezier(0.2, 0, 0.4, 1) infinite;
      }
      
      @keyframes glow-float-delayed {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
        50% { transform: translateY(${optimizedAnimations ? '5px' : '10px'}) scale(${optimizedAnimations ? '1.02' : '1.05'}); opacity: 0.65; }
      }
      .animate-glow-float-delayed {
        animation: glow-float-delayed ${optimizedAnimations ? '6s' : '4s'} cubic-bezier(0.2, 0, 0.4, 1) infinite 1s;
      }
      
      /* Optimized animations when reduced motion is preferred */
      @media (prefers-reduced-motion) {
        .animate-pulse-slow {
          animation-duration: 10s;
        }
        .animate-glow-float,
        .animate-glow-float-delayed {
          animation-duration: 6s;
          animation-name: pulse-slow;
        }
      }
      
      /* Responsive animations for different screen sizes */
      @media (max-width: 640px) {
        .animate-glow-float,
        .animate-glow-float-delayed {
          animation-duration: 5s;
        }
      }
    `}</style>
  );
} 