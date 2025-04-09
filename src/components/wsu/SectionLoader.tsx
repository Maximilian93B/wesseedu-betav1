import React from 'react';
import { motion } from 'framer-motion';

export const SectionLoader = () => {
  // Subtle shimmer variants for the loading animation
  const shimmerVariants = {
    initial: {
      backgroundPosition: '-500px 0',
    },
    animate: {
      backgroundPosition: '500px 0',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center py-8">
      <div className="w-full max-w-4xl">
        {/* Content skeleton */}
        <div className="space-y-4">
          {/* Main content placeholder */}
          <motion.div 
            className="w-full h-24 md:h-32 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Secondary content placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <motion.div 
                key={i}
                className="h-16 md:h-20 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          {/* Three smaller items */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="h-12 md:h-16 rounded-lg bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:1000px_100%]"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>

        {/* Subtle branding */}
        <div className="mt-6 flex justify-center items-center">
          <div className="flex items-center space-x-2 text-sm text-green-800 opacity-70">
            <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin" />
            <span className="font-medium tracking-wider">Loading WSU content...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLoader; 