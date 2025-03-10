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
      { value: '45+', label: 'Startups' },
      { value: '92%', label: 'Satisfaction' },
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
      { value: '18', label: 'Communities' },
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
      { value: '24/7', label: 'Monitoring' },
      { value: 'Real-time', label: 'Updates' }
    ],
    highlights: [
      'Portfolio performance tracker',
      'Impact measurement tools',
      'Founder update streams'
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
        "relative overflow-hidden rounded-3xl bg-black/80 p-6 sm:p-7 md:p-8 flex flex-col",
        "shadow-[0_0_20px_rgba(139,92,246,0.1)] will-change-transform transform-gpu",
        "hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-shadow duration-150",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/5 before:via-transparent before:to-teal-500/5 before:opacity-40 before:z-0",
        // Fast hover transform
        "hover:-translate-y-1 transition-transform duration-150 ease-out",
        // Dynamic sizing and scaling
        isFeatured 
          ? "flex-1 md:scale-110 md:shadow-[0_0_40px_rgba(139,92,246,0.2)] md:z-10"
          : "flex-1 md:scale-90 opacity-90 md:z-0",
        // Improved positioning for secondary cards
        card.id === 'investment' && "md:translate-x-6 md:-translate-y-2",
        card.id === 'security' && "md:-translate-x-6 md:-translate-y-2",
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
      
      {/* Card content with dynamic spacing system using flexbox */}
      <div className="relative flex flex-col h-full z-10">
        {/* Card main content area - uses flex-grow to fill available space */}
        <div className="flex-1 flex flex-col">
          {/* Card header - using relative units for spacing */}
          <div className="mb-5 sm:mb-6">
            <h3 className={cn(
              "font-semibold text-white group-hover:text-purple-300 transition-colors duration-100 leading-tight",
              isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl" 
            )}>
              {card.title}
            </h3>
            
            {card.description && (
              <p className={cn(
                "text-gray-300 mt-2", 
                isFeatured ? "text-sm sm:text-base" : "text-xs sm:text-sm",
                "line-clamp-3" 
              )}>
                {card.description}
              </p>
            )}
          </div>
          
          {/* Flexible spacer only if we have more content below */}
          {(!card.stats || isFeatured) && <div className="flex-grow" />}
        </div>
        
        {/* Stats positioned consistently across all cards */}
        {card.stats && (
          <div className={cn(
            "mb-5 sm:mb-6",
            isFeatured ? "" : "mt-auto" // Push stats down on non-featured cards
          )}>
            <div className={cn(
              "grid py-3 px-2",
              !isFeatured && "bg-gradient-to-r from-black/40 via-black/30 to-black/40 border border-purple-500/10 rounded-xl",
              isFeatured ? "bg-black/30 rounded-xl divide-x divide-gray-800/50" : "divide-x divide-gray-800/30",
              card.stats.length > 2 
                ? "grid-cols-3" 
                : "grid-cols-2"
            )}>
              {card.stats.map((stat, idx) => (
                <div key={stat.label} className={cn(
                  "flex flex-col items-center justify-center text-center px-2",
                  !isFeatured && "py-2"
                )}>
                  <p className={cn(
                    "font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent leading-none",
                    isFeatured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
                  )}>
                    {stat.value}
                  </p>
                  <p className={cn(
                    "text-xs mt-1.5 whitespace-nowrap",
                    isFeatured ? "text-gray-400" : "text-gray-300"
                  )}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom content area with proper spacing and alignment */}
        <div className={isFeatured ? "mt-0" : "mt-0"}>
          {/* Feature/Highlight lists with proportional spacing */}
          {isFeatured ? (
            <ul className="flex flex-col gap-3 mb-5 sm:mb-6">
              {FEATURE_ITEMS.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                  <div className="flex items-center justify-center h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500/20 to-teal-500/20 text-purple-400 mt-0.5">
                    <Check size={12} />
                  </div>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          ) : card.highlights ? (
            <ul className="flex flex-col gap-3 mb-5 sm:mb-6">
              {card.highlights.map((item, idx) => (
                <li key={item} className="flex items-start gap-2.5 text-xs text-gray-400">
                  <div className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400/50 to-teal-400/50 mt-1.5">
                  </div>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          
          {/* Image section with responsive aspect ratio */}
          {card.imageUrl && (
            <div className="mb-5 sm:mb-6 rounded-lg overflow-hidden transition-shadow duration-150 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <Image 
                    src={card.imageUrl} 
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out transform-gpu will-change-transform"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    priority={isFeatured}
                  />
                </div>
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
                    ? "py-4 md:py-5 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-500 hover:to-teal-500 text-base" 
                    : "py-3 md:py-4 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-black hover:bg-purple-900/40 text-sm"
                )}
                size="default"
              >
                <Link href={card.buttonHref || '#'} prefetch={false}>
                  <span className="relative z-10 flex items-center justify-center">
                    {card.buttonText} 
                    <ArrowRight className={cn(
                      "group-hover/button:translate-x-1 transition-transform duration-150 ease-out",
                      isFeatured ? "ml-2 h-4 w-4" : "ml-1.5 h-3.5 w-3.5"
                    )} />
                  </span>
                  {/* Fast hover effect overlay */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-teal-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-150 ease-out"></span>
                </Link>
              </Button>
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