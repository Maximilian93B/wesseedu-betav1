import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ProblemItemProps {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

export const ProblemItem = ({ id, step, title, description, icon: Icon, index }: ProblemItemProps) => {
  return (
    <motion.div
      id={`problem-${id}`}
      className="relative group flex flex-row items-center gap-3 cursor-pointer"
      variants={fadeInUp}
      custom={index + 1}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <div
          className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-lg bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
          flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.15)] icon-container"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 opacity-30 
            group-hover:opacity-50 transition-all duration-300"
          ></div>
          <Icon
            className="w-5 h-5 md:w-6 md:h-6 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
      </div>
      
      <div className="flex flex-col justify-center relative z-10">
        <div className="mb-1 relative">
          <p className="text-sm font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/70 backdrop-blur-sm border border-teal-500/10 inline-block group-hover:border-teal-500/30 transition-all duration-300 shadow-sm">{title}</p>
        </div>
        <div className="max-w-[180px] item-description">
          <p className="text-xs text-white/70 leading-relaxed bg-[#0A1A3B]/50 backdrop-blur-sm p-1 rounded">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}; 