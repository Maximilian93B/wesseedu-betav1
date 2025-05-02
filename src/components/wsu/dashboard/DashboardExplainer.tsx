import { motion } from "framer-motion"
import { ArrowRight, CircleDot, Gauge, LineChart, Shield, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
}

// Dashboard section type
type DashboardSection = {
  title: string;
  description: string;
  path: string;
  imageSrc: string;
  features: string[];
  icon: React.ReactNode;
  cta: string;
}

export function DashboardExplainer() {
  // Define dashboard sections
  const dashboardSections: DashboardSection[] = [
    {
      title: "Dashboard Overview",
      description: "Your dashboard home gives you a complete view of your sustainable investment portfolio at a glance.",
      path: "/dashboard/overview",
      imageSrc: "/dashboard_explainer.png",
      features: [
        "Portfolio sustainability score",
        "Impact metrics visualization",
        "Recent activity feed",
        "Personalized recommendations"
      ],
      icon: <Gauge className="h-5 w-5" />,
      cta: "View Your Overview"
    },
    {
      title: "WeSeedU Marketplace",
      description: "Discover and analyze sustainable companies that align with your investment criteria and values.",
      path: "/dashboard_explainer.png", 
      imageSrc: "/community_preview.png",
      features: [
        "Advanced filtering by impact metrics",
        "Detailed sustainability ratings",
        "Financial performance data",
        "ESG score breakdowns"
      ],
      icon: <LineChart className="h-5 w-5" />,
      cta: "Explore Companies"
    },
    {
      title: "Saved Investments",
      description: "Keep track of companies you're interested in with your personalized watchlist.",
      path: "/dashboard/saved",
      imageSrc: "/images/Screenshot 2025-02-21 200935.png",
      features: [
        "Custom watchlists",
        "Price alerts",
        "Performance tracking",
        "Comparative analysis"
      ],
      icon: <Shield className="h-5 w-5" />,
      cta: "Check Your Saved Items"
    },
    {
      title: " WSU Communities",
      description: "Connect with like-minded investors and learn from ambassador-led sustainable investing communities.",
      path: "/dashboard/communities",
      imageSrc:"/pexels-aboodi-18620005.jpg",
      features: [
        "Join thematic investment groups",
        "Expert-led discussions",
        "Educational resources",
        "Impact investing events"
      ],
      icon: <UserPlus className="h-5 w-5" />,
      cta: "Join Communities"
    }
  ];

  return (
    <section className="bg-white py-10 sm:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-3 sm:mb-4 relative inline-block font-display">
            Your Dashboard Tour
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 md:w-24 h-[2px] bg-gradient-to-r from-[#70f570]/30 via-[#49c628] to-[#70f570]/30"></span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-body px-2">
            Follow this step-by-step guide to navigate through the key sections of your sustainable investing dashboard.
          </p>
        </div>

        {/* Step-by-step guide */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="space-y-10 sm:space-y-16"
        >
          {dashboardSections.map((section, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="relative"
            >
              {/* Step number - visible on all screens */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#70f570] to-[#49c628] flex items-center justify-center text-white font-bold shadow-md text-sm sm:text-base mr-3">
                  {index + 1}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 font-display">{section.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ml-0 sm:ml-2 md:ml-8">
                {/* Content first on mobile, order changes on desktop based on index */}
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#70f570]/20 to-[#49c628]/20 text-green-800 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                    <span className="mr-2 text-green-600">{section.icon}</span>
                    {section.title}
                  </div>
                  
                  <p className="text-slate-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed font-body">{section.description}</p>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                    {section.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-br from-[#70f570] to-[#49c628] flex items-center justify-center mt-0.5 mr-2 sm:mr-3">
                          <CircleDot className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                        </div>
                        <span className="text-slate-700 text-xs sm:text-sm font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3 font-semibold transition-all duration-300 group w-full sm:w-auto h-auto text-xs sm:text-sm font-helvetica">
                    <Link href={section.path} className="flex items-center justify-center">
                      {section.cta}
                      <ArrowRight className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transform -translate-x-0.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
                    </Link>
                  </Button>
                </div>
                
                {/* Screenshot - always below on mobile, order changes on desktop */}
                <div className={`mt-6 sm:mt-0 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-slate-200/80 relative group hover:shadow-lg transition-all duration-300">
                    <div className="bg-gradient-to-b from-slate-50 to-white p-1.5 sm:p-2 border-b border-slate-200/80">
                      <div className="flex items-center">
                        <div className="flex space-x-1.5">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400"></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-400"></div>
                        </div>
                        <div className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                          WeSeedU: {section.title}
                        </div>
                      </div>
                    </div>
                    <div className="relative bg-gray-50 p-1 sm:p-2">
                      <Image 
                        src={section.imageSrc}
                        alt={section.title}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded shadow-inner"
                        priority
                      />
                      
                      {/* Glossy overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
                      
                      {/* Right accent */}
                      <div className="absolute top-0 right-0 w-1 sm:w-1.5 h-full bg-gradient-to-b from-[#70f570] to-[#49c628] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section divider - only between items */}
              {index < dashboardSections.length - 1 && (
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-8 sm:my-12 md:hidden"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to action */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-[#70f570] to-[#49c628] hover:brightness-105 text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] rounded-full px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-semibold hover:translate-y-[-2px] transition-all duration-300 group font-helvetica"
          >
            <Link href="/dashboard/overview">
              <span className="relative z-10 flex items-center justify-center">
                Start Your Dashboard Journey
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 sm:ml-3 transform -translate-x-0.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-in-out" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 