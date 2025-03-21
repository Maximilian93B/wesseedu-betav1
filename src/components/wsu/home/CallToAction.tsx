import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react"
import { useState } from "react"

interface CallToActionProps {
  onNavigate: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-10"
    >
      <div 
        className="relative rounded-2xl p-12 text-center overflow-hidden shadow-xl
          bg-gradient-to-br from-emerald-50 via-white to-emerald-100 border border-emerald-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic background with animated SVG wave */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent_70%)]"></div>
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
          
          {/* Decorative dots */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-emerald-500/20"
                style={{
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.4 + Math.random() * 0.6
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Bottom wave for visual connection */}
          <svg
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
            height="120"
            width="100%"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.07,
                d: [
                  "M0,64 C300,100 900,20 1200,64 L1200,120 L0,120 Z",
                  "M0,64 C300,30 900,90 1200,64 L1200,120 L0,120 Z"
                ]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
              fill="#10b981"
            />
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.05, 
                d: [
                  "M0,80 C400,40 800,100 1200,80 L1200,120 L0,120 Z",
                  "M0,80 C400,110 800,50 1200,80 L1200,120 L0,120 Z"
                ]
              }}
              transition={{ 
                duration: 10,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              fill="#10b981"
            />
          </svg>
        </div>
        
        {/* Content with enhanced animations */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
              <span>Start your sustainable journey</span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-emerald-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to Grow Your Impact?
            </motion.h2>
            
            <motion.p 
              className="text-zinc-600 mb-10 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join thousands of investors building wealth while supporting 
              sustainable businesses that are shaping a better future.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                onClick={() => onNavigate('companies')}
                className="group px-8 py-7 bg-gradient-to-r from-emerald-600 to-emerald-500 
                  hover:from-emerald-500 hover:to-emerald-400 text-white text-lg font-medium
                  rounded-xl shadow-xl shadow-emerald-300/30 transition-all duration-300
                  hover:shadow-emerald-300/50 hover:scale-[1.02] min-w-[240px]"
              >
                <span>Explore Investments</span>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="ml-3 h-5 w-5 transition-all duration-300 group-hover:ml-4" />
                </motion.div>
              </Button>
              
              <Button 
                onClick={() => onNavigate('communities')}
                variant="outline"
                className="px-8 py-7 border-emerald-200 text-emerald-700 hover:text-emerald-800
                  hover:bg-emerald-50 text-lg font-medium rounded-xl transition-all duration-300
                  min-w-[240px] group"
              >
                <span>Join Communities</span>
                <ChevronRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:ml-3" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 text-sm text-zinc-500"
            >
              Sustainable investments vetted by our expert team
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
} 