/**
 * Reusable animation keyframes and CSS for the entire application
 * These are used in global styles and components throughout the app
 */
export const animations = {
  pulseSubtle: `
    @keyframes pulse-subtle {
      0%, 100% { opacity: 0.05; }
      50% { opacity: 0.15; }
    }
    .animate-pulse-subtle {
      animation: pulse-subtle 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      will-change: opacity;
    }
  `,
  floatSubtle: `
    @keyframes float-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(3px); }
    }
    .animate-float-subtle {
      animation: float-subtle 4s ease-in-out infinite;
      will-change: transform;
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
  `,
  cosmicGlow: `
    @keyframes cosmic-glow {
      0%, 100% { 
        box-shadow: 0 0 25px rgba(147, 51, 234, 0.3), 0 0 10px rgba(89, 209, 197, 0.25);
        opacity: 0.8;
      }
      50% { 
        box-shadow: 0 0 35px rgba(147, 51, 234, 0.4), 0 0 15px rgba(89, 209, 197, 0.35);
        opacity: 1;
      }
    }
    .animate-cosmic-glow {
      animation: cosmic-glow 8s ease-in-out infinite;
    }
  `,
  impactReveal: `
    @keyframes impact-reveal {
      0% { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
      100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
    }
    .animate-impact-reveal {
      animation: impact-reveal 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
  `
}; 