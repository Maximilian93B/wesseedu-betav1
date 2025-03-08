"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { AnimatedTitle } from "@/components/ui/AnimatedTitle"

// Define card data outside component for better performance
const FEATURE_ITEMS = ['Exclusive opportunities', 'Sustainable focus', 'Vetted by experts', 'Direct founder access']

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
}

// Card data
const CARDS: CardData[] = [
  {
    id: 'platform',
    title: 'WeSeedU Platform',
    description: 'Access exclusive investment opportunities in sustainable startups, vetted by our team and aligned with UN SDGs.',
    className: 'group h-[600px] sm:h-[650px] md:h-[580px] lg:h-[620px] md:-mt-8 md:col-start-2 md:col-end-3 md:row-start-1 md:z-10 transform md:scale-105 md:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
    buttonText: 'Start Investing',
    buttonHref: '/auth/signup',
    featured: true
  },
  {
    id: 'investment',
    title: 'Platform View',
    className: 'group h-[440px] sm:h-[460px] md:h-[500px] lg:h-[520px] md:col-start-1 md:col-end-2 md:row-start-1 md:z-0 transform md:scale-95 md:translate-x-4 opacity-90',
    imageUrl: '/path/to/platform-screenshot1.png',
    buttonText: 'Explore Platform',
    buttonHref: '#'
  },
  {
    id: 'security',
    title: 'Dashboard View',
    className: 'group h-[440px] sm:h-[460px] md:h-[500px] lg:h-[520px] md:col-start-3 md:col-end-4 md:row-start-1 md:z-0 transform md:scale-95 md:-translate-x-4 opacity-90',
    imageUrl: '/path/to/platform-screenshot2.png',
    buttonText: 'View Dashboard',
    buttonHref: '#'
  }
]

// Simple card component
function CardComponent({ card }: { card: CardData }) {
  const isFeatured = card.featured;
  
  return (
    <div
      key={card.id}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-black/80 p-6 sm:p-8 flex flex-col",
        "shadow-[0_0_20px_rgba(139,92,246,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-700",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/5 before:via-transparent before:to-teal-500/5 before:opacity-40 before:z-0",
        card.className
      )}
    >
      {/* Cosmic accent elements - adjusted z-index */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl z-0"></div>
      
      {/* Subtle top edge highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent z-0"></div>
      
      {/* Card hover glow effect */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-b from-purple-500/10 via-transparent to-teal-500/10"></div>
      
      {/* Additional glow effects for featured card */}
      {isFeatured && (
        <>
          {/* Outer glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/15 via-teal-500/15 to-purple-500/15 rounded-[24px] blur-sm z-0 opacity-60"></div>
          
          {/* Corner accent glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl z-0 animate-glow-float"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-xl z-0 animate-glow-float-delayed"></div>
        </>
      )}
      
      {/* Card content - ensure highest z-index */}
      <div className="relative flex flex-col h-full z-10">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{card.title}</h3>
        
        {card.description && (
          <p className="text-gray-300 mb-6">{card.description}</p>
        )}
        
        {isFeatured && (
          <ul className="flex flex-col gap-3 mt-auto mb-8">
            {FEATURE_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-400 to-teal-400"></div>
                {item}
              </li>
            ))}
          </ul>
        )}
        
        {card.imageUrl && (
          <div className="mt-auto mb-6 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <Image 
              src={card.imageUrl} 
              alt={card.title}
              width={500}
              height={300}
              className="w-full h-auto object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        
        {card.buttonText && (
          <div className="mt-auto">
            <Button 
              asChild 
              className="w-full sm:w-auto bg-black hover:bg-purple-900/40 text-white transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.15)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              size="lg"
            >
              <Link href={card.buttonHref || '#'}>
                {card.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Add this to your CSS or in a style tag
const customStyles = `
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.3; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;

export function HeroSection() {
  return (
    <>
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes glow-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.7; }
        }
        .animate-glow-float {
          animation: glow-float 8s ease-in-out infinite;
        }
        
        @keyframes glow-float-delayed {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(10px) scale(1.05); opacity: 0.7; }
        }
        .animate-glow-float-delayed {
          animation: glow-float-delayed 8s ease-in-out infinite 2s;
        }
      `}</style>
      
      <div className="container px-4 sm:px-6 py-8 sm:py-12 md:py-20 lg:py-32 mx-auto">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-28 lg:mb-40">
          <div className="max-w-4xl mb-8 md:mb-10">
            <AnimatedTitle 
              words={["We", "Seed", "U"]}
              colors={[
                "bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent",
                "bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent",
                "bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent"
              ]}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
              delay={0.5}
              animationStyle="bounce"
              staggerDelay={0.2}
              letterSpacing="tight"
            />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl md:max-w-4xl">
           The Worlds best dedicated platform for sustainable startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 gap-6 md:gap-0 md:items-center">
          {CARDS.map(card => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  )
}

 
