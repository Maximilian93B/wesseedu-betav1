"use client"

export function GlobalAnimations() {
  return (
    <style jsx global>{`
      /* Shared animations used across components */
      @keyframes pulse-slow {
        0%, 100% { opacity: 0.15; }
        50% { opacity: 0.32; }
      }
      .animate-pulse-slow {
        animation: pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        will-change: opacity;
      }
      
      @keyframes float-down {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(6px); }
      }
      .animate-float-down {
        animation: float-down 1.8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        will-change: transform;
      }
      
      /* Text wave animation keyframes */
      @keyframes text-wave-highlight {
        0% { background-position: -100% 0; }
        100% { background-position: 200% 0; }
      }
      
      /* Base wave-through-text effect */
      .wave-through-text {
        position: relative;
        color: rgba(255, 255, 255, 0.95);
      }
      
      .wave-through-text::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(168, 85, 247, 0.7) 25%,
          rgba(20, 184, 166, 0.7) 50%,
          transparent 100%
        );
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: text-wave-highlight 4s linear infinite;
        will-change: background-position;
        pointer-events: none;
      }
      
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  )
} 