import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Make feature items more benefit-focused and compelling
const FEATURE_ITEMS = [
  'Access exclusive, vetted opportunities',
  'Invest in sustainable impact ventures',
  'Portfolio backed by industry experts',
  'Direct communication with founders'
]

// Define card types
type CardData = {
  id: string
  title: string
  description?: string
  className: string
  imageUrl?: string
  buttonText?: string
  buttonHref?: string
  featured?: boolean
  stats?: { value: string; label: string }[]
  highlights?: string[]
}

// Enhance card data with more compelling sales copy and additional content for secondary cards
const CARDS: CardData[] = [
  {
    id: 'platform',
    title: 'Your Gateway to Impact Investing',
    description: 'Join our community of impact investors gaining early access to high-potential sustainable startups.',
    className: 'group md:col-start-2 md:col-end-3 md:row-start-1 md:z-10',
    buttonText: 'Join Our Investors',
    buttonHref: '/auth/signup',
    featured: true,
    stats: [
      { value: '20', label: 'Startups' },
      { value: '92%', label: ' ESG Satisfaction' },
      { value: '$2.4M', label: 'Invested' }
    ]
  },
  {
    id: 'investment',
    title: 'WeSeedU Communities',
    description: 'Connect with ambassador-led communities where companies share sustainable innovations directly with investors and enthusiasts.',
    className: 'group md:col-start-1 md:col-end-2 md:row-start-1 md:z-0',
    imageUrl: '/images/Screenshot 2025-02-21 200935.png',
    buttonText: 'Explore Communities',
    buttonHref: '#',
    stats: [
      { value: '20+', label: 'Communities' },
      { value: '35+', label: 'Ambassadors' }
    ],
    highlights: [
      'Ambassador updates',
      'Direct founder communication',
      'Sustainable innovation education'
    ]
  },
  {
    id: 'security',
    title: 'Smart Dashboard, Smart investments',
    description: 'Track your impact investments with real-time AI analytics, sustainability metrics, and portfolio performance updates.',
    className: 'group md:col-start-3 md:col-end-4 md:row-start-1 md:z-0',
    imageUrl: '/images/Screenshot 2025-02-21 121434.png',
    buttonText: 'Experience Dashboard',
    buttonHref: '#',
    stats: [
      { value: 'Impact', label: 'Scoring' },
      { value: 'AI', label: 'Analytics' }
    ],
    highlights: [
      'Data analytics and insights to help you make better decisions',
      'AI-powered recommendations',
      'Track your investments and their impact',
    ]
  }
]

// Optimize the card component
function CardComponent({ card, index }: { card: CardData; index: number }) {
  const isFeatured = card.featured;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  return (
    <div
      ref={cardRef}
      key={card.id}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-black/80 flex flex-col",
        // Consistent padding for all cards
        isFeatured ? "p-7 sm:p-8 md:p-10" : "p-5 sm:p-6 md:p-7",
        "shadow-[0_0_20px_rgba(139,92,246,0.1)] will-change-transform transform-gpu",
        "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-shadow duration-150",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/5 before:via-transparent before:to-teal-500/5 before:opacity-40 before:z-0",
        // Fast hover transform
        "hover:-translate-y-1 transition-transform duration-150 ease-out",
        // Dynamic sizing and scaling
        isFeatured 
          ? "flex-1 md:scale-110 md:shadow-[0_0_40px_rgba(139,92,246,0.2)] md:z-10"
          : "flex-1 md:scale-90 opacity-90 md:z-0",
        // Consistent positioning for secondary cards
        !isFeatured && "md:-translate-y-2",
        card.id === 'investment' && "md:translate-x-6",
        card.id === 'security' && "md:-translate-x-6",
        // Faster initial appearance animation with staggered delay
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        `transition-all duration-500 delay-[${index * 75}ms]`,
        card.className
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
      
      {/* Edge highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent z-0"></div>
      
      {/* Optimized hover effect with highlight outline - faster transition */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
        <div className="absolute inset-0 border border-purple-400/20 rounded-3xl"></div>
      </div>
      
      {/* Featured card enhancements - maintaining original special effects */}
      {isFeatured ? (
        <>
          {/* Featured badge with more prominence */}
          <div className="absolute -right-2 -top-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white text-xs font-medium px-3 py-1 rounded-full transform rotate-12 z-20 shadow-lg">
            Featured
          </div>
          
          {/* Enhanced outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-teal-500/20 to-purple-500/20 rounded-[24px] blur-[3px] z-0 opacity-70"></div>
          
          {/* Corner accent glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl z-0 animate-glow-float transform-gpu will-change-transform"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl z-0 animate-glow-float-delayed transform-gpu will-change-transform"></div>
        </>
      ) : (
        // Add subtle corner accents for non-featured cards
        <>
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl z-0"></div>
          <div className="absolute -bottom-0 -left-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl z-0"></div>
        </>
      )}
      
      {/* Card content with refined spacing */}
      <div className="relative flex flex-col h-full z-10">
        {/* Card header - Consistent spacing scale */}
        <div className={cn(
          isFeatured ? "mb-8 md:mb-8" : "mb-4"
        )}>
          <h3 className={cn(
            "font-semibold text-white group-hover:text-purple-300 transition-colors duration-100 leading-tight mt-2",
            isFeatured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl" 
          )}>
            {card.title}
          </h3>
          
          {card.description && (
            <p className={cn(
              "text-gray-300", 
              isFeatured ? "text-sm sm:text-base mt-4 sm:mt-4" : "text-xs sm:text-sm mt-2",
              "line-clamp-3" 
            )}>
              {card.description}
            </p>
          )}
        </div>
        
        {/* Middle content section with flex-grow to push stats to appropriate position */}
        <div className="flex-1 flex flex-col">
          {/* Stats positioned at correct vertical position based on card type */}
          {isFeatured ? (
            /* Featured card - stats centered vertically */
            <div className="my-auto">
              {card.stats && (
                <div className="bg-black/30 rounded-xl overflow-hidden">
                  <div className="flex w-full h-full">
                    {card.stats.map((stat, idx) => (
                      <div 
                        key={stat.label} 
                        className={cn(
                          "flex-1 flex flex-col items-center justify-center text-center py-4 px-3",
                          idx !== 0 && "border-l border-gray-800/50" // Apply border to all except first
                        )}
                      >
                        <p className="font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-none text-xl sm:text-2xl mb-1.5">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-400 whitespace-nowrap">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Side cards - consistent spacing for both */
            <>
              {/* Using percentage of available space to position stats consistently in both cards */}
              <div className="flex-grow" style={{ minHeight: '10%' }}></div>
              {card.stats && (
                <div className="mb-4">
                  <div className="grid grid-cols-2 bg-gradient-to-r from-black/40 via-black/30 to-black/40 border border-purple-500/10 rounded-xl py-3 px-1 divide-x divide-gray-800/30">
                    {card.stats.map((stat, idx) => (
                      <div key={stat.label} className="flex flex-col items-center justify-center text-center px-2 py-1.5">
                        <p className="font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-none text-lg mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-300 whitespace-nowrap">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Bottom section - consistent spacing */}
        <div>
          {/* Feature lists - consistent styling for side cards */}
          {isFeatured ? (
            <ul className="flex flex-col gap-5 sm:gap-5 mb-7 md:mb-8">
              {FEATURE_ITEMS.map((item, idx) => (
                <li key={item} className="flex items-start gap-4 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center justify-center h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-400 mt-0.5">
                    <Check size={14} />
                  </div>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          ) : card.highlights ? (
            <ul className="flex flex-col gap-3 mt-6 mb-8">
              {card.highlights.map((item, idx) => (
                <li key={item} className="flex items-start text-[11px] leading-tight text-gray-400">
                  <span className="flex-shrink-0 h-1 w-1 rounded-full bg-gradient-to-r from-purple-400/50 to-teal-400/50 mt-1.5 mr-2"></span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          
          {/* Image with identical styling for side cards */}
          {card.imageUrl && (
            <div className="rounded-lg overflow-hidden transition-shadow duration-150 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] mb-6">
              <div className="relative overflow-hidden"
              style={{ aspectRatio: "16/9" }}>
                {/* Gradient overlay with higher z-index */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-[5]"></div>
                
                {/* Image with consistent dimensions */}
                <Image 
                  src={card.imageUrl} 
                  alt={card.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover z-[1] group-hover:scale-105 transition-transform duration-300 ease-out transform-gpu will-change-transform"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  priority={isFeatured}
                />
              </div>
            </div>
          )}
          
          {/* Button and footer with consistent spacing */}
          <div className="space-y-3">
            {card.buttonText && (
              <Button 
                asChild 
                className={cn(
                  "w-full text-white relative overflow-hidden group/button transition-shadow duration-150",
                  isFeatured 
                    ? "py-5 sm:py-6 text-base sm:text-lg shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-500 hover:to-teal-500" 
                    : "py-3 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-black hover:bg-purple-900/40 text-sm"
                )}
                size="default"
              >
                <Link href={card.buttonHref || '#'} prefetch={false}>
                  <span className="relative z-10 flex items-center justify-center">
                    {card.buttonText} 
                    <ArrowRight className={cn(
                      "group-hover/button:translate-x-1 transition-transform duration-150 ease-out",
                      isFeatured ? "ml-3 h-5 w-5" : "ml-1.5 h-3.5 w-3.5"
                    )} />
                  </span>
                  {/* Fast hover effect overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-150 ease-out"></span>
                </Link>
              </Button>
            )}
            
            {/* Footer text - consistently styled for side cards */}
            {isFeatured ? (
              <div className="flex items-center justify-center pt-2">
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="inline-flex -space-x-2 mr-4">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className={`inline-block h-7 w-7 rounded-full border border-black bg-gradient-to-r ${i === 0 ? 'from-purple-400 to-purple-500' : i === 1 ? 'from-indigo-400 to-indigo-500' : 'from-teal-400 to-teal-500'}`}></span>
                    ))}
                  </span>
                  <span>Joined by <span className="text-purple-400 font-medium">280+ investors</span></span>
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center pt-1.5">
                <p className="text-[10px] text-gray-500 opacity-75">
                  {card.id === 'investment' ? 'Part of WeSeedU platform' : 'Included with membership'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section 
      ref={sectionRef} 
      className="py-16 sm:py-20 md:py-24 lg:py-28 min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Optimized animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.32; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes glow-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.65; }
        }
        .animate-glow-float {
          animation: glow-float 4s cubic-bezier(0.2, 0, 0.4, 1) infinite;
        }
        
        @keyframes glow-float-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          50% { transform: translateY(10px) scale(1.05); opacity: 0.65; }
        }
        .animate-glow-float-delayed {
          animation: glow-float-delayed 4s cubic-bezier(0.2, 0, 0.4, 1) infinite 1s;
        }
      `}</style>
      
      <div className="container px-6 sm:px-8 lg:px-10 mx-auto max-w-7xl flex-1 flex flex-col justify-center">
        {/* Header section with spacing system */}
        <div 
          className={cn(
            "flex flex-col items-center text-center mb-12 sm:mb-16 transition-all duration-500 space-y-5",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-1.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Platform Testing - Now open
            </span>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Back Bold Ideas , Build Lasting Impact
            </h2>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              WeSeedU empowers you to fund sustainable solutions for our planet's most pressing challenges while building your financial future.
            </p>
          </div>
          
          {/* Trust indicators with proper spacing */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-2 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center">
              <Check size={14} className="text-green-500 mr-2" /> Vetted Opportunities
            </span>
            <span className="flex items-center">
              <Check size={14} className="text-green-500 mr-2" /> Community-driven approach
            </span>
            <span className="flex items-center">
              <Check size={14} className="text-green-500 mr-2" /> Values-aligned growth
            </span>
          </div>
        </div>

        {/* Card indicators with refined spacing */}
        <div className="flex justify-center mb-10 sm:mb-12 gap-3">
          {CARDS.map((card, idx) => (
            <div 
              key={idx} 
              className={cn(
                "h-1.5 rounded-full transition-opacity duration-150", 
                idx === 0 ? "w-10 bg-gradient-to-r from-purple-500 to-teal-500" : "w-1.5 bg-purple-500/30"
              )} 
            />
          ))}
        </div>

        {/* Card grid with optimized spacing and alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 relative mx-auto max-w-6xl">
          {CARDS.map((card, idx) => (
            <CardComponent key={card.id} card={card} index={idx} />
          ))}
        </div>
        
        {/* Footer section with consistent spacing */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 rounded mr-2">Limited spots</span>
            Only 50 new investor accounts available this quarter
          </p>
        </div>
      </div>
    </section>
  )
} 