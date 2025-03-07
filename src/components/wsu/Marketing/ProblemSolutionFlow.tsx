"use client"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowRight, CheckCircle, Globe, Shield, TrendingUp } from "lucide-react"

export function ProblemSolutionFlow() {
  // Split challenges into problems and solutions
  const problems = [
    {
      id: "no-marketplace",
      title: "No Dedicated Marketplace",
      description: "Lack of a specialized platform for early-stage sustainable companies",
      icon: Globe,
    },
    {
      id: "limited-platforms",
      title: "Limited Trusted Platforms",
      description: "Few reliable options for pre-public investment opportunities",
      icon: Shield,
    },
    {
      id: "visibility-barriers",
      title: "Visibility Barriers",
      description: "Challenges in showcasing impactful startups to potential investors",
      icon: AlertTriangle,
    },
    {
      id: "verification-difficulty",
      title: "Verification Difficulty",
      description: "Complexities in validating sustainability claims of companies",
      icon: CheckCircle,
    },
  ]

  const solutions = [
    {
      id: "expert-curation",
      title: "Expert Curation",
      description: "Combining professional insights with comprehensive ESG metrics",
      icon: Shield,
    },
    {
      id: "seamless-investment",
      title: "Seamless Investment",
      description: "Streamlined processes making sustainable investing accessible",
      icon: TrendingUp,
    },
  ]

  // Define the coordinates for each box to create paths between them
  const problemCoordinates = [
    { x: 25, y: 25 }, // top-left
    { x: 75, y: 25 }, // top-right
    { x: 25, y: 75 }, // bottom-left
    { x: 75, y: 75 }, // bottom-right
  ]

  const solutionCoordinates = [
    { x: 25, y: 25 }, // top-left
    { x: 75, y: 25 }, // top-right
  ]

  // Create path sequences
  const problemPathSequence = [
    `M ${problemCoordinates[0].x} ${problemCoordinates[0].y} L ${problemCoordinates[1].x} ${problemCoordinates[1].y}`,
    `M ${problemCoordinates[1].x} ${problemCoordinates[1].y} L ${problemCoordinates[3].x} ${problemCoordinates[3].y}`,
    `M ${problemCoordinates[3].x} ${problemCoordinates[3].y} L ${problemCoordinates[2].x} ${problemCoordinates[2].y}`,
    `M ${problemCoordinates[2].x} ${problemCoordinates[2].y} L ${problemCoordinates[0].x} ${problemCoordinates[0].y}`,
  ]

  const solutionPathSequence = [
    `M ${solutionCoordinates[0].x} ${solutionCoordinates[0].y} L ${solutionCoordinates[1].x} ${solutionCoordinates[1].y}`,
  ]

  return (
    <section className="relative w-full py-24 md:py-36 overflow-visible">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-full blur-[80px] opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full blur-[60px] opacity-50"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-[70px] opacity-40"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center max-w-[900px] mx-auto mb-12 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.span 
            className="inline-block text-sm md:text-base text-teal-400/90 font-medium tracking-wider uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transforming Sustainable Investment
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 leading-[1.2]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-gradient-primary">Bridging the Gap in</span>{' '}
            <span className="text-white"> Sustainable Investing</span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            WeSeedU fills this gap by offering a vetted marketplace for early investment in sustainable innovations, 
            empowering both investors and sustainable startups.
          </motion.p>
        </motion.div>

        {/* Problem-Solution flow diagram */}
        <motion.div
          className="max-w-6xl mx-auto relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Card background with glass effect */}
          <div className="absolute inset-0 -m-6 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-teal-500/5 rounded-2xl blur-[20px] opacity-70"></div>
            <div className="absolute inset-0 border border-teal-500/20 bg-[#0A1A3B]/40 backdrop-blur-sm rounded-2xl"></div>
          </div>

          <div className="relative p-6 flex flex-col md:flex-row justify-between items-center gap-16 md:gap-10 overflow-visible">
            {/* Problems section */}
            <div className="w-full md:w-[45%]">
              <motion.h3
                className="text-xl md:text-2xl font-semibold text-white/90 mb-8 text-center md:text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Problems
              </motion.h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-20 relative">
                {/* SVG path connections between problem blocks */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {problemPathSequence.map((path, index) => (
                    <motion.path
                      key={`problem-path-${index}`}
                      d={path}
                      stroke="#14B8A6" // Solid teal color
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.2 + index * 0.2,
                        ease: "easeOut" 
                      }}
                      style={{
                        filter: "drop-shadow(0 0 6px rgba(20, 184, 166, 0.5))"
                      }}
                    />
                  ))}

                  {/* Animated dots along the paths */}
                  {problemPathSequence.map((path, index) => {
                    // Extract path coordinates for animation
                    const pathMatch = path.match(/M\s+(\d+)\s+(\d+)\s+L\s+(\d+)\s+(\d+)/);
                    const startX = pathMatch ? parseFloat(pathMatch[1]) : 0;
                    const startY = pathMatch ? parseFloat(pathMatch[2]) : 0;
                    const endX = pathMatch ? parseFloat(pathMatch[3]) : 100;
                    const endY = pathMatch ? parseFloat(pathMatch[4]) : 0;
                    
                    return (
                      <motion.circle
                        key={`problem-dot-${index}`}
                        r="2"
                        fill="#14b8a6" // teal-500
                        filter="drop-shadow(0 0 4px rgba(20, 184, 166, 0.6))"
                        initial={{ opacity: 0, cx: startX, cy: startY }}
                        whileInView={{ 
                          opacity: 1,
                          cx: [startX, endX],
                          cy: [startY, endY]
                        }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 1.5,
                          delay: 0.2 + index * 0.2,
                          times: [0, 1],
                          ease: "easeOut"
                        }}
                        style={{ willChange: "transform" }}
                      />
                    );
                  })}
                </svg>

                {problems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative group flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{ isolation: "isolate" }}
                  >
                    <div className="text-center mb-3">
                      <p className="text-sm font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                    </div>
                    <div
                      className="w-full aspect-square max-w-[120px] rounded-xl bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                      flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-lg"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 opacity-30 
                        group-hover:opacity-50 transition-all duration-300"
                      ></div>
                      <item.icon
                        className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center mt-4 max-w-[140px] mx-auto">
                      <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Arrow connecting problems to solutions with blockchain-inspired animation */}
            <motion.div
              className="flex items-center justify-center flex-shrink-0 relative self-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Connection path from problems to solutions */}
              <svg
                className="absolute w-40 h-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 0 50 L 100 50"
                  stroke="#8B5CF6" // Solid purple color
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ 
                    duration: 1.5, 
                    delay: 1.5,
                    ease: "easeOut" 
                  }}
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(139, 92, 246, 0.5))"
                  }}
                />

                {/* Animated dots along the connection path */}
                <motion.circle
                  r="2"
                  fill="#3b82f6" // blue-500
                  filter="drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))"
                  initial={{ opacity: 0, cx: 0, cy: 50 }}
                  whileInView={{ 
                    opacity: 1,
                    cx: [0, 100],
                    cy: 50
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 1.5,
                    delay: 1.5,
                    ease: "easeOut"
                  }}
                  style={{ willChange: "transform" }}
                />
              </svg>

              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 shadow-lg relative z-10">
                <ArrowRight className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
              </div>
              <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 rotate-90 shadow-lg relative z-10">
                <ArrowRight className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Solutions section */}
            <div className="w-full md:w-[45%]">
              <motion.h3
                className="text-xl md:text-2xl font-semibold text-white/90 mb-8 text-center md:text-left"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Solutions
              </motion.h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-24 md:gap-x-16 md:gap-y-28 relative">
                {/* SVG path connections between solution blocks */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {solutionPathSequence.map((path, index) => (
                    <motion.path
                      key={`solution-path-${index}`}
                      d={path}
                      stroke="#3B82F6" // Solid blue color
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 2.8 + index * 0.2,
                        ease: "easeOut" 
                      }}
                      style={{
                        filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))"
                      }}
                    />
                  ))}

                  {/* Animated dots along the paths */}
                  {solutionPathSequence.map((path, index) => {
                    // Extract path coordinates for animation
                    const pathMatch = path.match(/M\s+(\d+)\s+(\d+)\s+L\s+(\d+)\s+(\d+)/);
                    const startX = pathMatch ? parseFloat(pathMatch[1]) : 0;
                    const startY = pathMatch ? parseFloat(pathMatch[2]) : 0;
                    const endX = pathMatch ? parseFloat(pathMatch[3]) : 100;
                    const endY = pathMatch ? parseFloat(pathMatch[4]) : 0;
                    
                    return (
                      <motion.circle
                        key={`solution-dot-${index}`}
                        r="2"
                        fill="#8b5cf6" // purple-500
                        filter="drop-shadow(0 0 4px rgba(139, 92, 246, 0.6))"
                        initial={{ opacity: 0, cx: startX, cy: startY }}
                        whileInView={{ 
                          opacity: 1,
                          cx: [startX, endX],
                          cy: [startY, endY]
                        }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                          duration: 1.5,
                          delay: 2.8 + index * 0.2,
                          times: [0, 1],
                          ease: "easeOut"
                        }}
                        style={{ willChange: "transform" }}
                      />
                    );
                  })}
                </svg>

                {solutions.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="relative group flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{ isolation: "isolate" }}
                  >
                    <div className="text-center mb-3">
                      <p className="text-sm font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                    </div>
                    <div
                      className="w-full aspect-square max-w-[120px] rounded-xl bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                      flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-lg"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-30 
                        group-hover:opacity-50 transition-all duration-300"
                      ></div>
                      <item.icon
                        className="w-7 h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center mt-4 max-w-[140px] mx-auto">
                      <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
