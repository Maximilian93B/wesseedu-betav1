"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

interface CallToActionProps {
  onNavigate?: (view: 'home' | 'dashboard' | 'companies' | 'saved' | 'communities') => void;
}

export function CallToAction({ onNavigate }: CallToActionProps) {
  return (
    <div className="relative py-20 bg-slate-800 overflow-hidden">
      {/* Diagonal highlight streak */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-700/50 rotate-45 blur-xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-700/50 rotate-45 blur-xl"></div>
      
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 20px 20px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to make an impact with your investments?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto"
          >
            Join thousands of investors who are building wealth while creating positive change in the world.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              className="bg-white text-slate-800 font-medium px-8 py-6 rounded-lg text-lg
                shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_15px_rgba(0,0,0,0.15)]
                transition-all duration-300 ease-out hover:translate-y-[-2px]"
              asChild
            >
              <Link href="/auth/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-slate-600 bg-transparent text-white hover:bg-slate-700 
                font-medium px-8 py-6 rounded-lg text-lg
                shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)]
                transition-all duration-300 ease-out hover:translate-y-[-2px]"
              asChild
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}