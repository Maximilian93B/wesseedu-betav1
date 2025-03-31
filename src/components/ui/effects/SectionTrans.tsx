import { motion } from "framer-motion";

export function SectionTransition() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Main gradient transition - increased height */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full h-40 bg-gradient-to-b from-black via-gray-800 to-white relative" /* Increased height and adjusted via color */
      >
        {/* Subtle wave effect - increased opacity */}
        <div className="absolute inset-0 opacity-15"> {/* Increased opacity slightly */}
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="w-full h-full"
          >
            <path 
              d="M0,0 C150,120 350,0 500,120 C650,0 850,120 1200,0 L1200,120 L0,120 Z" 
              className="fill-slate-300"
            ></path>
          </svg>
        </div>

        {/* Horizontal line to add subtle separation */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>
        
        {/* Subtle dot pattern for texture */}
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 20px 20px, #64748b 1px, transparent 0)`,
            backgroundSize: "20px 20px"
          }} 
        />
      </motion.div>
      
      {/* Light foreground detail - adjusted size and shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full 
                    shadow-xl flex items-center justify-center z-10 transform translate-y-1/2 border border-slate-100">
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center">
          <div className="w-5 h-5 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
