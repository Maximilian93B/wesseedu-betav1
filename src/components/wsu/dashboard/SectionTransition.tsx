import { memo } from "react";
import { motion } from "framer-motion";

type SectionTransitionProps = {
  direction?: 'dark-to-light' | 'light-to-dark';
  className?: string;
}

export const SectionTransition = memo(function SectionTransition({ 
  direction = 'dark-to-light',
  className = ''
}: SectionTransitionProps) {
  // Define color scheme based on direction
  const isDarkToLight = direction === 'dark-to-light';
  const fromColor = isDarkToLight ? '#000000' : '#ffffff';
  const toColor = isDarkToLight ? '#ffffff' : '#000000';
  
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Main transition element */}
      <div className="relative h-32 sm:h-40">
        {/* Base gradient layer */}
        <div className={`absolute inset-0 bg-gradient-to-b ${
          isDarkToLight ? 'from-black to-white' : 'from-white to-black'
        }`} />
        
        {/* SVG wave transition */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: 1, 
              pathLength: 1,
              d: "M0,64 C400,80 800,50 1200,64 L1200,120 L0,120 Z"
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
            fill={isDarkToLight ? toColor : fromColor}
            className="transition-all duration-500"
          />
          
          <motion.path
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ 
              opacity: 0.5, 
              pathLength: 1,
              d: "M0,80 C300,90 900,70 1200,80 L1200,120 L0,120 Z"
            }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: 0.2
            }}
            fill={isDarkToLight ? toColor : fromColor}
            opacity="0.3"
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Decorative elements - Only show if not reduced motion */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Glow effect behind the badge */}
            <div className={`absolute inset-0 blur-xl rounded-full ${
              isDarkToLight 
                ? 'bg-emerald-500/20' 
                : 'bg-emerald-400/30'
            }`} style={{ transform: 'scale(1.5)' }}></div>
            
            {/* ESG Badge */}
            <div className={`relative font-medium text-xs py-1.5 px-4 rounded-full border backdrop-blur-sm
              ${isDarkToLight 
                ? 'text-emerald-400 border-emerald-500/30 bg-black/30' 
                : 'text-emerald-500 border-emerald-500/30 bg-white/30'
              }`}
            >
              <span className="tracking-wider">SUSTAINABILITY</span>
            </div>
          </motion.div>
        </div>
        
        {/* Reduced subtle particles - for better performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDarkToLight 
                  ? 'bg-emerald-400/40' 
                  : 'bg-emerald-500/40'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random(),
                repeatType: "mirror"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}); 