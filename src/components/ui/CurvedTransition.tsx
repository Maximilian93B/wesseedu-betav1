import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define variant options for the component using class-variance-authority
const curvedTransitionVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-8 sm:h-10 md:h-14",
        default: "h-12 sm:h-16 md:h-24",
        lg: "h-16 sm:h-20 md:h-28 lg:h-32",
      },
      direction: {
        down: "", // Default direction (curves down)
        up: "rotate-180", // Flipped version
      }
    },
    defaultVariants: {
      size: "default",
      direction: "down"
    },
  }
);

export interface CurvedTransitionProps extends VariantProps<typeof curvedTransitionVariants> {
  fillColor?: string;
  className?: string;
  curveType?: "wave" | "arc" | "pointed";
}

export function CurvedTransition({
  fillColor = "white",
  className,
  size,
  direction,
  curveType = "wave",
}: CurvedTransitionProps) {
  // SVG path definitions for different curve types
  const paths = {
    wave: "M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z",
    arc: "M0,0 C480,70 960,70 1440,0 L1440,74 L0,74 Z",
    pointed: "M0,50 L720,0 L1440,50 L1440,74 L0,74 Z"
  };

  const containerClasses = curvedTransitionVariants({ size, direction, className: className });

  return (
    <div className={containerClasses}>
      <svg 
        className={cn("absolute bottom-0 w-full h-full", direction === "up" ? "rotate-180" : "")} 
        preserveAspectRatio="none" 
        viewBox="0 0 1440 74"
      >
        <path d={paths[curveType]} fill={fillColor} />
      </svg>
    </div>
  );
} 