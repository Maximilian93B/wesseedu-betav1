import { memo } from "react";
import { cn } from "@/lib/utils";

interface SubtleGlowProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

/**
 * A reusable glow effect component with configurable intensity
 */
export const SubtleGlow = memo(({ className, intensity = "medium" }: SubtleGlowProps) => {
  const intensityMap = {
    low: { opacity: "opacity-10", blur: "blur-[10px]" },
    medium: { opacity: "opacity-20", blur: "blur-[15px]" },
    high: { opacity: "opacity-30", blur: "blur-[20px]" }
  };
  
  return (
    <div 
      className={cn(
        "absolute -inset-8 animate-pulse-subtle", 
        intensityMap[intensity].opacity,
        intensityMap[intensity].blur,
        className
      )}
      style={{
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(147,51,234,0.05) 40%, transparent 70%)',
        zIndex: -1
      }}
    />
  );
});

SubtleGlow.displayName = 'SubtleGlow'; 