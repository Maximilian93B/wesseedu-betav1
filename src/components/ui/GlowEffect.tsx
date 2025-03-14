import { cn } from "@/lib/utils"

interface GlowEffectProps {
  className?: string
  intensity?: "subtle" | "medium" | "strong"
}

export function GlowEffect({ className, intensity = "subtle" }: GlowEffectProps) {
  const opacityMap = {
    subtle: "opacity-20",
    medium: "opacity-30",
    strong: "opacity-40"
  }
  
  return (
    <div 
      className={cn(
        "absolute -inset-8 animate-pulse-subtle", 
        opacityMap[intensity],
        className
      )}
      style={{
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
        filter: 'blur(15px)',
        zIndex: -1
      }}
    />
  )
} 