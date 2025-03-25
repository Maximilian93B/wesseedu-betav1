import { memo } from "react";

type SectionTransitionProps = {
  direction?: 'dark-to-light' | 'light-to-dark' | 'light-to-white';
  className?: string;
}

export const SectionTransition = memo(function SectionTransition({ 
  direction = 'dark-to-light',
  className = ''
}: SectionTransitionProps) {
  // Define color scheme based on direction
  const isDarkToLight = direction === 'dark-to-light';
  const isLightToWhite = direction === 'light-to-white';
  
  // Determine gradient colors based on direction
  const getGradient = () => {
    if (isLightToWhite) return 'from-slate-50 to-white';
    return isDarkToLight ? 'from-black to-white' : 'from-white to-black';
  };
  
  // Determine fill color for wave
  const getFillColor = () => {
    if (isLightToWhite) return '#ffffff';
    return isDarkToLight ? '#ffffff' : '#000000';
  };
  
  // Determine badge styling
  const getBadgeStyle = () => {
    if (isLightToWhite) {
      return 'text-emerald-600 border-emerald-200 bg-white/70';
    }
    return isDarkToLight 
      ? 'text-emerald-400 border-emerald-500/30 bg-black/30' 
      : 'text-emerald-500 border-emerald-500/30 bg-white/30';
  };
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Simplified transition element */}
      <div className="relative h-28 sm:h-36">
        {/* Clean gradient transition */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getGradient()}`} />
        
        {/* Simple wave shape overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64 C400,80 800,50 1200,64 L1200,120 L0,120 Z"
            fill={getFillColor()}
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Single subtle badge - static, no animation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className={`relative font-medium text-xs py-1.5 px-4 rounded-full border ${getBadgeStyle()}`}>
              <span className="tracking-wider">WeSeedU</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}); 