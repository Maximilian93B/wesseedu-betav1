import { memo, useMemo, useRef, useState, useCallback, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Types
export interface ImpactCategory {
  title: string;
  description: string;
  contentItems?: { 
    title: string; 
    content: string; 
  }[];
  backgroundImageUrl?: string;
  // Keep for backward compatibility
  header?: string;
  highlightWord?: string;
  phrases?: string[];
}

export interface PhraseListProps {
  phrases: string[];
  alignment?: "left" | "center" | "right";
  className?: string;
}

export interface CategorySectionProps {
  category: ImpactCategory;
  index: number;
  inView: boolean;
  isMobile: boolean;
  containerHeight: number;
  backgroundImageProps?: any;
}

// Optimized animation variants - defined outside component to prevent recreation on each render
const phraseItemVariants = {
  hidden: (alignment: "left" | "center" | "right") => ({ 
    opacity: 0, 
    x: alignment === "center" ? 0 : alignment === "right" ? 20 : -20,
    y: alignment === "center" ? 20 : 0 
  }),
  visible: {
    opacity: 1, 
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 150,
      mass: 0.8
    }
  }
};

const phraseListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const expandedContentVariants = {
  expanded: { 
    height: "auto", 
    opacity: 1,
    transition: { 
      height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.3, delay: 0.1 } 
    }
  },
  collapsed: { 
    height: 0, 
    opacity: 0,
    transition: { 
      height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
      opacity: { duration: 0.2 } 
    }
  }
};

// Optimized phrase item using memo
export const PhraseItem = memo(({ 
  phrase, 
  index, 
  alignment 
}: { 
  phrase: string; 
  index: number; 
  alignment: "left" | "center" | "right";
}) => {
  return (
    <motion.div
      key={index}
      className={cn(
        "relative group",
        alignment === "center" 
          ? "text-center px-4 sm:px-6 py-2 sm:py-3" 
          : alignment === "right"
            ? "text-right pr-3 sm:pr-4 border-r border-white/30 hover:border-white/50 transition-colors duration-300"
            : "text-left pl-3 sm:pl-4 border-l border-white/30 hover:border-white/50 transition-colors duration-300"
      )}
      custom={alignment}
      variants={phraseItemVariants}
    >
      {alignment === "center" && (
        <div 
          className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-md -z-10 overflow-hidden"
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-r from-purple-500/10 via-teal-500/10 to-purple-500/10 animate-shimmer"
          ></div>
        </div>
      )}
      <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-white/90 group-hover:text-white transition-colors duration-300 flex items-center">
        {alignment === "right" ? (
          <span className="ml-auto">
            {phrase}
            <div className="h-0.5 w-0 bg-gradient-to-r from-teal-500/70 to-purple-500/70 group-hover:w-full transition-all duration-500 ease-out ml-auto mt-1"></div>
          </span>
        ) : alignment === "center" ? (
          <span className="mx-auto">
            {phrase}
            <div className="h-0.5 w-0 bg-gradient-to-r from-purple-500/70 to-teal-500/70 group-hover:w-full transition-all duration-500 ease-out mx-auto mt-1"></div>
          </span>
        ) : (
          <span>
            {phrase}
            <div className="h-0.5 w-0 bg-gradient-to-r from-purple-500/70 to-teal-500/70 group-hover:w-full transition-all duration-500 ease-out mt-1"></div>
          </span>
        )}
      </span>
    </motion.div>
  );
});

PhraseItem.displayName = 'PhraseItem';

// Optimized PhraseList component
export const PhraseList = memo(({ phrases, alignment = "left", className }: PhraseListProps) => {
  const listRef = useRef(null);
  const isInView = useInView(listRef, { 
    once: true, 
    amount: 0.2,
  });
  
  return (
    <motion.div
      ref={listRef}
      className={cn(
        "flex flex-col space-y-8 xs:space-y-10 sm:space-y-12 md:space-y-14",
        alignment === "center" ? "items-center" : 
        alignment === "right" ? "items-end" : "items-start",
        className
      )}
      variants={phraseListVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {phrases.map((phrase, index) => (
        <PhraseItem 
          key={index} 
          phrase={phrase} 
          index={index} 
          alignment={alignment} 
        />
      ))}
    </motion.div>
  );
});

PhraseList.displayName = 'PhraseList';

// Category header component with optimized animations and styling
export const CategoryHeader = memo(({ 
  category, 
  alignment = "left",
  className 
}: { 
  category: ImpactCategory; 
  alignment?: "left" | "center" | "right";
  className?: string;
}) => {
  // If we have the legacy header/highlightWord, use those
  if (category.header && category.highlightWord) {
    // Split the header into non-highlight and highlight parts - memoized
    const headerParts = useMemo(() => {
      const beforeHighlight = category.header!.split(category.highlightWord!)[0];
      return { beforeHighlight, highlight: category.highlightWord };
    }, [category.header, category.highlightWord]);
    
    // Determine initial animation based on alignment
    const initialAnimation = useMemo(() => {
      if (alignment === "center") return { y: 20, opacity: 0 };
      if (alignment === "right") return { x: 20, opacity: 0 };
      return { x: -20, opacity: 0 };
    }, [alignment]);
    
    return (
      <h3 
        className={cn(
          "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white relative",
          alignment === "center" ? "text-center" : 
          alignment === "right" ? "text-right" : "text-left",
          className
        )}
      >
        <span>{headerParts.beforeHighlight}</span>
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-br from-purple-300 via-purple-500 to-teal-500 bg-clip-text text-transparent">
            {headerParts.highlight}
          </span>
          <motion.span 
            className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-purple-500/70 to-teal-500/70 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </h3>
    );
  }
  
  // For new title-based approach
  return (
    <h3 
      className={cn(
        "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white relative",
        alignment === "center" ? "text-center" : 
        alignment === "right" ? "text-right" : "text-left",
        className
      )}
    >
      <span>{category.title}</span>
      <motion.span 
        className="absolute bottom-0 left-0 h-[4px] bg-gradient-to-r from-purple-500/70 to-teal-500/70 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          left: alignment === "center" ? "50%" : alignment === "right" ? "100%" : "0%",
          transform: alignment === "center" ? "translateX(-50%)" : alignment === "right" ? "translateX(-100%)" : "none",
          width: alignment === "center" ? "50%" : "70%"
        }}
      />
    </h3>
  );
});

CategoryHeader.displayName = 'CategoryHeader';

// Expansion indicator component - extracted for consistent styling and performance
const ExpandIndicator = memo(({ isExpanded }: { isExpanded: boolean }) => {
  // Simple animation variant
  const iconVariants = {
    expanded: { rotate: 180 },
    collapsed: { rotate: 0 }
  };

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-white/90 font-medium transition-all duration-300 mt-2 sm:mt-3 mb-1 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md relative group overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
      <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-300 rounded-md"></div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
      
      <span className="text-xs sm:text-sm relative z-10">{isExpanded ? "View less" : "Learn more"}</span>
      <motion.div
        variants={iconVariants}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center relative z-10 bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
      >
        <ArrowRight 
          className={cn(
            "w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300",
            isExpanded ? "rotate-90" : "-rotate-90"
          )}
        />
      </motion.div>
    </div>
  );
});

ExpandIndicator.displayName = 'ExpandIndicator';

// Memoized category section with elegant dropdown functionality
export const CategorySection = memo(({ 
  category, 
  index,
  inView, 
  isMobile,
  containerHeight,
  backgroundImageProps
}: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const expandableRef = useRef<HTMLDivElement>(null);
  
  // Use useLayoutEffect instead of useEffect to measure DOM before paint
  // This prevents updating state during render
  useLayoutEffect(() => {
    if (expandableRef.current) {
      setExpandedHeight(expandableRef.current.scrollHeight);
    }
  }, [category]); // Remove expandableRef from dependencies

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  // Simpler animation approach using Framer Motion's built-in features
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 * index 
      }
    }
  };

  // Get background image if available with simplified approach
  const bgImage = category.backgroundImageUrl ? { 
    src: category.backgroundImageUrl,
    alt: category.title || "Category background",
  } : null;

  // Generate paragraph content from content items
  const paragraphContent = useMemo(() => {
    if (!category.contentItems || category.contentItems.length === 0) {
      return category.description;
    }
    
    // Create a more readable paragraph with spacing between points
    const fullContent = category.contentItems.map(item => {
      // Format each point as a strong title followed by content
      return `**${item.title}:** ${item.content}`;
    }).join(' ');
    
    return fullContent;
  }, [category.contentItems, category.description]);

  return (
    <motion.div
      className={cn(
        "relative mb-8 md:mb-12 lg:mb-16 overflow-hidden",
        "rounded-xl md:rounded-2xl border border-white/10",
        "group/category backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
      )}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5 mix-blend-overlay opacity-60"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/category:opacity-20 transition-opacity duration-500"></div>
      
      {/* Accent borders */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>
      <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-teal-400/30 to-transparent"></div>
      
      {/* Card content container */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8">
        {/* Top section with title and description */}
        <div className="flex flex-col">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
            {category.title}
          </h3>
          
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-4 md:mb-6 max-w-prose">
            {category.description}
          </p>
          
          {/* Main content that can be expanded - simplified to a paragraph */}
          <div className="relative overflow-hidden transition-all duration-500 ease-in-out"
               style={{ 
                 maxHeight: isExpanded ? expandedHeight + 'px' : '0px',
               }}>
            <div ref={expandableRef} className="py-2">
              <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-black/30 to-transparent rounded-lg border-l-2 border-purple-500/50 hover:border-purple-500/80 transition-all duration-300 shadow-lg shadow-purple-900/5">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/2 via-transparent to-teal-500/2 rounded-lg mix-blend-overlay"></div>
                
                <div className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 relative z-10">
                  {category.contentItems?.map((item, index) => (
                    <p key={index} className="transition-opacity duration-500" style={{ transitionDelay: `${index * 50}ms` }}>
                      <span className="font-semibold text-white/90 bg-gradient-to-r from-purple-400/90 to-white/90 bg-clip-text text-transparent">{item.title}:</span>{' '}
                      {item.content}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Expand/Collapse button */}
          <div className="flex justify-center sm:justify-start mt-1 sm:mt-2" onClick={toggleExpand}>
            <ExpandIndicator isExpanded={isExpanded} />
          </div>
        </div>
      </div>
      
      {/* Background image if available - simplified approach */}
      {bgImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="w-full h-full relative">
            <Image
              src={bgImage.src}
              alt={bgImage.alt}
              fill
              sizes="100vw"
              className="object-cover mix-blend-overlay"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
});

CategorySection.displayName = 'CategorySection';

// Optimized BackgroundEffects with cleaner implementation
export const BackgroundEffects = memo(() => (
  <>
    {/* Base background layer */}
    <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>
    
    {/* Enhanced gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black/5 to-teal-900/10 pointer-events-none opacity-70"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-800/15 via-black/10 to-teal-800/15 pointer-events-none opacity-60"></div>
    
    {/* Radial gradients for depth with enhanced intensity */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.12),transparent_70%)] pointer-events-none"></div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(45,212,191,0.12),transparent_70%)] pointer-events-none"></div>
    
    {/* Enhanced starfield effect */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[url('/images/subtle-starfield.png')] opacity-20 bg-repeat"></div>
    
    {/* Decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal accent lines with increased vibrancy */}
      <div className="absolute w-full h-px top-[15%] bg-gradient-to-r from-transparent via-purple-500/25 to-transparent animate-pulse-subtle"></div>
      <div className="hidden sm:block absolute w-full h-px top-[45%] bg-gradient-to-r from-transparent via-teal-500/25 to-transparent animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
      <div className="absolute w-full h-px top-[75%] bg-gradient-to-r from-transparent via-purple-500/25 to-transparent animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
      
      {/* Vertical accent lines with enhanced glow */}
      <div 
        className="hidden md:block absolute w-px h-full left-1/5 top-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
      ></div>
      <div 
        className="hidden md:block absolute w-px h-full right-1/5 top-0 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent"
      ></div>
      
      {/* Atmospheric glow spots with enhanced size and blur */}
      <div className="absolute top-1/4 right-1/4 w-40 sm:w-56 md:w-72 lg:w-96 h-40 sm:h-56 md:h-72 lg:h-96 rounded-full bg-purple-500/8 blur-[100px] opacity-70 animate-pulse-subtle"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 sm:w-56 md:w-72 lg:w-96 h-40 sm:h-56 md:h-72 lg:h-96 rounded-full bg-teal-500/8 blur-[100px] opacity-80 animate-pulse-subtle" style={{ animationDelay: "2s" }}></div>
      
      {/* Additional central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-video rounded-full bg-gradient-to-tr from-purple-800/10 via-transparent to-teal-800/10 blur-[120px] opacity-40"></div>
      
      {/* Enhanced grid pattern */}
      <div className="absolute inset-0 opacity-15 bg-grid-pattern"></div>
    </div>
  </>
));

BackgroundEffects.displayName = 'BackgroundEffects';

// Footer CTA component with enhanced UI
export const FooterCTA = memo(() => (
  <div className="relative w-full rounded-xl md:rounded-2xl overflow-hidden group">
    {/* Gradient background overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-black/70 to-teal-600/20 group-hover:opacity-90 transition-opacity duration-500"></div>
    
    {/* Accent border */}
    <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 transition-colors duration-300 rounded-xl md:rounded-2xl"></div>
    
    {/* Glowing accents */}
    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 blur-[100px] opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500/10 blur-[100px] opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
    
    {/* Subtle grid pattern */}
    <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
    
    <div className="relative z-10 px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
          Ready to join our mission?
        </h3>
        
        <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Together, we can create a more sustainable future. Explore how you can get involved and make a difference with WeSeedu.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button 
            variant="default" 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 shadow-lg shadow-purple-900/20 border-none text-white min-w-[180px] relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center">
              Join Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"></div>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-black/30 text-white border-white/20 hover:bg-black/50 hover:border-white/30 min-w-[180px] relative overflow-hidden group/btn"
          >
            <span className="relative z-10">Learn More</span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer"></div>
          </Button>
        </div>
      </div>
    </div>
  </div>
));

FooterCTA.displayName = 'FooterCTA'; 