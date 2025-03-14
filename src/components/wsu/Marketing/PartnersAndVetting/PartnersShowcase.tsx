"use client"

import { motion } from "framer-motion"
import { PartnerCard } from "./PartnerCard"
import { PARTNERS } from "./data"

// PartnersShowcase component for both mobile and desktop layouts
export function PartnersShowcase({ isMobile }: { isMobile: boolean }) {
  // For desktop, create a visually interesting showcase with wider and taller container
  if (!isMobile) {
    return (
      <div className="relative h-[520px] w-full overflow-visible">
        {/* Decorative cosmic orb for desktop showcase */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        {/* Animated orbital path */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-purple-500/10 opacity-30"></div>
        
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(139,92,246,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            backgroundPosition: 'center'
          }}>
        </div>
        
        {/* Position cards with wide horizontal separation */}
        {PARTNERS.map((partner, index) => {
          // Defined fixed positions in a tight triangle formation
          const positions = [
            { top: "22%", left: "50%" },   // Top card - United Nations 
            { top: "62%", left: "58%" },  // Bottom-right card - GSF (even closer to center)
            { top: "62%", left: "42%" }   // Bottom-left card - World Bank (even closer to center)
          ];
          
          const position = positions[index];
          
          return (
            <motion.div 
              key={partner.name || index}
              className="absolute w-[220px] transition-all duration-700 hover:z-50"
              style={{ 
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
                zIndex: 10 - index
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                y: [0, -5, 5, -3, 3, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: index * 0.2 },
                y: { 
                  duration: 12,
                  delay: index * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
            >
              <PartnerCard 
                partner={partner} 
                index={index}
              />
            </motion.div>
          );
        })}
      </div>
    );
  }
  
  // For mobile, create a clean stacked layout
  return (
    <div className="space-y-6 xs:space-y-8">
      {PARTNERS.map((partner, index) => (
        <motion.div
          key={partner.name || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1
          }}
        >
          <PartnerCard 
            partner={partner} 
            index={0} // All cards same size on mobile
          />
        </motion.div>
      ))}
    </div>
  );
} 