"use client"
import { AlertTriangle, ArrowRight, CheckCircle, Globe, Shield, TrendingUp, Users, Zap } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

export function ProblemSolutionFlow() {
  // Refs for the connecting lines
  const containerRef = useRef<HTMLDivElement>(null)
  const problemsRef = useRef<(HTMLDivElement | null)[]>([])
  const solutionsRef = useRef<(HTMLDivElement | null)[]>([])
  
  // Restructured problems with step numbers
  const problems = [
    {
      id: "no-marketplace",
      step: 1,
      title: "No Dedicated Marketplace",
      description: "Sustainable startups lack specialized platforms to connect with impact investors",
      icon: Globe,
    },
    {
      id: "limited-platforms",
      step: 2,
      title: "Limited Trusted Platforms",
      description: "Investors struggle to find reliable options for pre-public sustainable investments",
      icon: Shield,
    },
    {
      id: "visibility-barriers",
      step: 3,
      title: "Visibility Barriers",
      description: "Impactful startups face challenges in reaching potential investors",
      icon: AlertTriangle,
    },
    {
      id: "verification-difficulty",
      step: 4,
      title: "Verification Difficulty",
      description: "Validating sustainability claims requires specialized expertise",
      icon: CheckCircle,
    },
  ]

  // Restructured solutions with step numbers and clearer descriptions
  const solutions = [
    {
      id: "expert-curation",
      step: "A",
      title: "Expert Curation",
      description: "Our team validates sustainability claims using comprehensive ESG metrics",
      icon: Shield,
      connectedTo: ["verification-difficulty", "limited-platforms"],
      solves: "We solve verification challenges by applying rigorous standards and expert review"
    },
    {
      id: "dedicated-platform",
      step: "B",
      title: "Dedicated Platform",
      description: "WeSeedU provides a specialized marketplace exclusively for sustainable startups",
      icon: Globe,
      connectedTo: ["no-marketplace", "visibility-barriers"],
      solves: "We create the missing marketplace that connects vetted startups with impact investors"
    },
    {
      id: "seamless-investment",
      step: "C",
      title: "Seamless Investment",
      description: "Our platform streamlines the investment process with transparent workflows",
      icon: TrendingUp,
      connectedTo: ["limited-platforms", "visibility-barriers"],
      solves: "We make sustainable investing accessible through simplified, transparent processes"
    },
    {
      id: "community-building",
      step: "D",
      title: "Community Building",
      description: "We foster connections between investors, founders, and sustainability experts",
      icon: Users,
      connectedTo: ["visibility-barriers", "verification-difficulty"],
      solves: "We break down barriers by creating a trusted network of sustainability stakeholders"
    },
  ]

  // Function to draw connecting lines
  useEffect(() => {
    const drawConnectingLines = () => {
      if (!containerRef.current) return
      
      // Clear any existing SVG
      const existingSvg = containerRef.current.querySelector('.connecting-lines-svg')
      if (existingSvg) {
        existingSvg.remove()
      }
      
      // Create SVG element for the lines
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.classList.add('connecting-lines-svg')
      svg.style.position = 'absolute'
      svg.style.top = '0'
      svg.style.left = '0'
      svg.style.width = '100%'
      svg.style.height = '100%'
      svg.style.pointerEvents = 'none'
      svg.style.zIndex = '5'
      
      // Get container dimensions
      const containerRect = containerRef.current.getBoundingClientRect()
      
      // Store paths for hover effects
      const pathMap: Record<string, SVGPathElement[]> = {}
      
      // Draw lines between connected elements
      solutions.forEach((solution, solutionIndex) => {
        const solutionElement = solutionsRef.current[solutionIndex]
        if (!solutionElement) return
        
        const solutionRect = solutionElement.getBoundingClientRect()
        const solutionCenterX = solutionRect.left + solutionRect.width / 2 - containerRect.left
        const solutionCenterY = solutionRect.top + solutionRect.height / 2 - containerRect.top
        
        // Initialize path array for this solution
        pathMap[`solution-${solution.id}`] = []
        
        solution.connectedTo.forEach(problemId => {
          const problemIndex = problems.findIndex(p => p.id === problemId)
          if (problemIndex === -1) return
          
          const problemElement = problemsRef.current[problemIndex]
          if (!problemElement) return
          
          const problemRect = problemElement.getBoundingClientRect()
          const problemCenterX = problemRect.left + problemRect.width / 2 - containerRect.left
          const problemCenterY = problemRect.top + problemRect.height / 2 - containerRect.top
          
          // Create path for the line
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          
          // Calculate control points for a curved line
          const midX = (problemCenterX + solutionCenterX) / 2
          
          // Create a bezier curve path
          const d = `M ${problemCenterX} ${problemCenterY} 
                    C ${midX} ${problemCenterY}, 
                      ${midX} ${solutionCenterY}, 
                      ${solutionCenterX} ${solutionCenterY}`
          
          path.setAttribute('d', d)
          path.setAttribute('stroke', 'rgba(20, 184, 166, 0.3)') // teal-500 with opacity
          path.setAttribute('stroke-width', '1.5')
          path.setAttribute('fill', 'none')
          path.setAttribute('stroke-dasharray', '3,3') // Create a dashed line
          path.setAttribute('data-problem', `problem-${problemId}`)
          path.setAttribute('data-solution', `solution-${solution.id}`)
          path.classList.add('connection-path')
          
          // Add animation for the dashed line
          const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
          animate.setAttribute('attributeName', 'stroke-dashoffset')
          animate.setAttribute('from', '0')
          animate.setAttribute('to', '18')
          animate.setAttribute('dur', '3s')
          animate.setAttribute('repeatCount', 'indefinite') 
          path.appendChild(animate)
          
          svg.appendChild(path)
          
          // Store path references for hover effects
          pathMap[`solution-${solution.id}`].push(path)
          
          // Initialize problem path array if it doesn't exist
          if (!pathMap[`problem-${problemId}`]) {
            pathMap[`problem-${problemId}`] = []
          }
          pathMap[`problem-${problemId}`].push(path)
        })
      })
      
      containerRef.current.appendChild(svg)
      
      // Add hover effects
      const addHoverEffects = () => {
        // For problems
        problems.forEach((problem, index) => {
          const element = problemsRef.current[index]
          if (!element) return
          
          const problemId = `problem-${problem.id}`
          const paths = pathMap[problemId] || []
          
          element.addEventListener('mouseenter', () => {
            // Highlight this problem
            element.classList.add('highlight-node')
            
            // Highlight connected paths
            paths.forEach(path => {
              path.setAttribute('stroke', 'rgba(20, 184, 166, 0.8)')
              path.setAttribute('stroke-width', '2')
              
              // Also highlight connected solutions
              const solutionId = path.getAttribute('data-solution')
              if (solutionId) {
                const solutionElement = document.getElementById(solutionId)
                if (solutionElement) {
                  solutionElement.classList.add('highlight-node')
                }
              }
            })
          })
          
          element.addEventListener('mouseleave', () => {
            // Remove highlight from this problem
            element.classList.remove('highlight-node')
            
            // Remove highlight from paths
            paths.forEach(path => {
              path.setAttribute('stroke', 'rgba(20, 184, 166, 0.3)')
              path.setAttribute('stroke-width', '1.5')
              
              // Remove highlight from connected solutions
              const solutionId = path.getAttribute('data-solution')
              if (solutionId) {
                const solutionElement = document.getElementById(solutionId)
                if (solutionElement) {
                  solutionElement.classList.remove('highlight-node')
                }
              }
            })
          })
        })
        
        // For solutions
        solutions.forEach((solution, index) => {
          const element = solutionsRef.current[index]
          if (!element) return
          
          const solutionId = `solution-${solution.id}`
          const paths = pathMap[solutionId] || []
          
          element.addEventListener('mouseenter', () => {
            // Highlight this solution
            element.classList.add('highlight-node')
            
            // Highlight connected paths
            paths.forEach(path => {
              path.setAttribute('stroke', 'rgba(20, 184, 166, 0.8)')
              path.setAttribute('stroke-width', '2')
              
              // Also highlight connected problems
              const problemId = path.getAttribute('data-problem')
              if (problemId) {
                const problemElement = document.getElementById(problemId)
                if (problemElement) {
                  problemElement.classList.add('highlight-node')
                }
              }
            })
          })
          
          element.addEventListener('mouseleave', () => {
            // Remove highlight from this solution
            element.classList.remove('highlight-node')
            
            // Remove highlight from paths
            paths.forEach(path => {
              path.setAttribute('stroke', 'rgba(20, 184, 166, 0.3)')
              path.setAttribute('stroke-width', '1.5')
              
              // Remove highlight from connected problems
              const problemId = path.getAttribute('data-problem')
              if (problemId) {
                const problemElement = document.getElementById(problemId)
                if (problemElement) {
                  problemElement.classList.remove('highlight-node')
                }
              }
            })
          })
        })
      }
      
      addHoverEffects()
    }
    
    // Draw lines initially and on window resize
    drawConnectingLines()
    window.addEventListener('resize', drawConnectingLines)
    
    return () => {
      window.removeEventListener('resize', drawConnectingLines)
    }
  }, [])

  return (
    <section className="relative w-full py-24 md:py-24 overflow-visible">
      {/* Add CSS for highlight effect */}
      <style jsx global>{`
        .highlight-node .rounded-lg {
          border-color: rgba(20, 184, 166, 0.8) !important;
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.4) !important;
        }
        
        .highlight-node .text-teal-400 {
          color: rgba(94, 234, 212, 1) !important;
        }

        .step-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%);
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          z-index: 10;
          border: 1.5px solid rgba(15, 23, 42, 0.8);
        }

        .solution-badge {
          background: linear-gradient(135deg, #8b5cf6 0%, #14b8a6 100%);
        }

        .item-description {
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.3s ease;
          max-width: 200px;
        }
        
        .highlight-node .item-description {
          opacity: 1;
          transform: translateY(0);
        }
        
        .solution-explanation {
          position: absolute;
          bottom: -32px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 11px;
          line-height: 1.4;
          color: rgba(255, 255, 255, 0.7);
          opacity: 0;
          transform: translateY(5px);
          transition: all 0.3s ease;
          padding: 0 4px;
          background: rgba(10, 26, 59, 0.6);
          backdrop-filter: blur(4px);
          border-radius: 4px;
          padding: 4px 6px;
          border: 1px solid rgba(20, 184, 166, 0.2);
          max-width: 200px;
          margin: 0 auto;
        }

        .highlight-node .solution-explanation {
          opacity: 1;
          transform: translateY(0);
        }
        
        .vertical-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(20, 184, 166, 0.1), rgba(20, 184, 166, 0.2), rgba(20, 184, 166, 0.1));
          z-index: 1;
        }
        
        .problems-line {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .solutions-line {
          left: 50%;
          transform: translateX(-50%);
        }
        
        .logo-container {
          position: relative;
          z-index: 20;
        }
        
        .logo-container::before,
        .logo-container::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, rgba(20, 184, 166, 0), rgba(20, 184, 166, 0.3));
        }
        
        .logo-container::before {
          right: 100%;
          margin-right: 15px;
        }
        
        .logo-container::after {
          left: 100%;
          margin-left: 15px;
          background: linear-gradient(to left, rgba(20, 184, 166, 0), rgba(20, 184, 166, 0.3));
        }
      `}</style>

      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-teal-500/10 rounded-full blur-[80px] opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-[60px] opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[70px] opacity-30"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-[800px] mx-auto mb-10 md:mb-16">
          <span className="inline-block text-xs md:text-sm text-white/40 font-medium tracking-wider uppercase mb-4">
            OUR APPROACH TO SUSTAINABLE INVESTMENT
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 leading-[1.2]">
            <span className="text-white">From </span>
            <span className="text-gradient-primary">Problem </span>
            <span className="text-white">to </span>
            <span className="text-gradient-primary">Solution</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            WeSeedU identifies key challenges in sustainable investing and addresses them with innovative
            solutions, creating a seamless experience for both investors and startups.
          </p>
        </div>

        {/* Problem-Solution flow diagram */}
        <div className="max-w-6xl mx-auto relative">
          {/* Card background with glass effect */}
          <div className="absolute inset-0 -m-4 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 border border-teal-500/20 bg-[#0A1A3B]/40 backdrop-blur-sm rounded-2xl"></div>
          </div>

          <div ref={containerRef} className="relative p-4 md:p-8 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 overflow-visible min-h-[600px]">
            {/* Problems section */}
            <div className="w-full md:w-[38%] relative flex flex-col items-center md:items-end">
              <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6 text-center">
                <span className="text-gradient-primary">Problems</span> We Address
              </h3>
              
              {/* Vertical line for problems */}
              <div className="vertical-line problems-line hidden md:block"></div>
              
              <div className="flex flex-col gap-14 md:gap-16 relative w-full max-w-[320px]">
                {problems.map((item, index) => (
                  <div
                    key={item.id}
                    ref={el => problemsRef.current[index] = el}
                    className="relative group flex flex-row items-center gap-4"
                    id={`problem-${item.id}`}
                  >
                    <div className="relative">
                      <div className="step-badge">{item.step}</div>
                      <div
                        className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-lg bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                        flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10 opacity-30 
                          group-hover:opacity-50 transition-all duration-300"
                        ></div>
                        <item.icon
                          className="w-6 h-6 md:w-7 md:h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center relative">
                      <div className="mb-1.5">
                        <p className="text-base font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                      </div>
                      <div className="max-w-[200px] item-description">
                        <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center logo section */}
            <div className="flex-shrink-0 relative self-center flex flex-col items-center justify-center">
              <div className="logo-container bg-[#0A1A3B]/80 backdrop-blur-md p-4 rounded-full border border-teal-500/30 shadow-lg mb-4">
                <div className="w-16 h-16 md:w-20 md:h-20 relative flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="WeSeedU Logo" 
                    width={80} 
                    height={80}
                    className="object-contain"

                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A1A3B]/80 backdrop-blur-sm border border-teal-500/40 shadow-md relative z-10 mb-2">
                  <ArrowRight className="w-5 h-5 text-teal-400" strokeWidth={1.5} />
                </div>
                <p className="text-xs text-white/60 font-medium mb-1 text-center">Bridging the Gap</p>
                <Zap className="w-4 h-4 text-teal-400 animate-pulse" />
              </div>
            </div>

            {/* Solutions section */}
            <div className="w-full md:w-[38%] relative flex flex-col items-center md:items-start">
              <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6 text-center">
                <span className="text-gradient-primary">Solutions</span> That Work
              </h3>
              
              {/* Vertical line for solutions */}
              <div className="vertical-line solutions-line hidden md:block"></div>
              
              <div className="flex flex-col gap-14 md:gap-16 relative w-full max-w-[320px]">
                {solutions.map((item, index) => (
                  <div
                    key={item.id}
                    ref={el => solutionsRef.current[index] = el}
                    className="relative group flex flex-row items-center gap-4"
                    id={`solution-${item.id}`}
                  >
                    <div className="relative">
                      <div className="step-badge solution-badge">{item.step}</div>
                      <div
                        className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-lg bg-[#0A1A3B]/70 backdrop-blur-md border border-teal-500/30 
                        flex items-center justify-center relative overflow-hidden group-hover:border-teal-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-30 
                          group-hover:opacity-50 transition-all duration-300"
                        ></div>
                        <item.icon
                          className="w-6 h-6 md:w-7 md:h-7 text-teal-400 group-hover:text-teal-300 transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center relative">
                      <div className="mb-1.5">
                        <p className="text-base font-medium text-white/90 px-2 py-1 rounded-md bg-[#0A1A3B]/40 backdrop-blur-sm border border-teal-500/10 inline-block">{item.title}</p>
                      </div>
                      <div className="max-w-[200px] item-description">
                        <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                        <p className="text-xs text-white/60 mt-2 italic">{item.solves}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
