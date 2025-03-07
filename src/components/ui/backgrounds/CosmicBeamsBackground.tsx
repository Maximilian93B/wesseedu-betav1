"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface CosmicBeamsBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: "subtle" | "medium" | "strong"
}

interface Beam {
  x: number
  y: number
  width: number
  length: number
  angle: number
  speed: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: angle,
    speed: 0.3 + Math.random() * 0.6, // Reduced speed for smoother movement
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.02, // Reduced pulse speed for smoother effect
  }
}

export function CosmicBeamsBackground({ 
  className, 
  intensity = "medium", 
  children 
}: CosmicBeamsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const MINIMUM_BEAMS = 20
  
  // Intensity settings for both beams and cosmic elements
  const opacityMap = {
    subtle: 0.5,
    medium: 0.7,
    strong: 1,
  }
  
  const cosmicOpacity = {
    subtle: 0.05,
    medium: 0.1,
    strong: 0.15,
  }
  
  // Enhanced parallax effect for cosmic elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  // Parallax values for floating orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -300])
  
  // Horizontal parallax for added dimension
  const orb1X = useTransform(scrollYProgress, [0, 1], [0, -50])
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, 50])
  const orb3X = useTransform(scrollYProgress, [0, 1], [0, -80])
  
  // Scale effects for depth
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.1])
  const orb3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.8, 1.2])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      const totalBeams = MINIMUM_BEAMS * 1.5
      beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(canvas.width, canvas.height))
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam

      const column = index % 3
      const spacing = canvas.width / 3

      beam.y = canvas.height + 100
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 100 + Math.random() * 100
      beam.speed = 0.3 + Math.random() * 0.4 // Reduced speed range for consistency
      beam.hue = 190 + (index * 70) / totalBeams
      beam.opacity = 0.2 + Math.random() * 0.1
      return beam
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam, deltaTime: number) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      // Calculate pulsing opacity with smoother transition
      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      // Enhanced gradient with multiple color stops for smoother transition
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`)
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`)
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    function animate(timestamp: number) {
      if (!canvas || !ctx) return

      // Calculate delta time for smooth animation regardless of frame rate
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = (timestamp - lastTimeRef.current) / 16.67 // Normalize to ~60fps
      lastTimeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(35px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        // Use delta time to ensure consistent speed regardless of frame rate
        beam.y -= beam.speed * deltaTime
        beam.pulse += beam.pulseSpeed * deltaTime

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams)
        }

        drawBeam(ctx, beam, deltaTime)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity])

  return (
    <div 
      ref={containerRef}
      className={cn("relative min-h-screen w-full overflow-hidden bg-black perspective-1000", className)}
    >
      {/* Cosmic background with stars */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"></div>
        
        {/* Star field effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars-sm" style={{ opacity: cosmicOpacity[intensity] * 1.5 }}></div>
          <div className="stars-md" style={{ opacity: cosmicOpacity[intensity] }}></div>
          <div className="stars-lg" style={{ opacity: cosmicOpacity[intensity] * 0.5 }}></div>
        </div>
      </div>
      
      {/* Floating orbs/planets with parallax */}
      <motion.div 
        className="fixed top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/5 blur-3xl -z-10"
        style={{ 
          y: orb1Y, 
          x: orb1X,
          scale: orb1Scale,
          opacity: cosmicOpacity[intensity]
        }}
      ></motion.div>
      
      <motion.div 
        className="fixed bottom-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/5 blur-3xl -z-10"
        style={{ 
          y: orb2Y, 
          x: orb2X,
          scale: orb2Scale,
          opacity: cosmicOpacity[intensity]
        }}
      ></motion.div>
      
      <motion.div 
        className="fixed top-2/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-teal-500/5 to-emerald-500/5 blur-2xl -z-10"
        style={{ 
          y: orb3Y,
          x: orb3X,
          scale: orb3Scale,
          opacity: cosmicOpacity[intensity]
        }}
      ></motion.div>
      
      {/* Canvas for beams - fixed position to cover entire viewport */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0" 
        style={{ filter: "blur(15px)" }} 
      />

      {/* Animated overlay */}
      <motion.div
        className="fixed inset-0 bg-neutral-950/5 z-0"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{
          backdropFilter: "blur(50px)",
        }}
      />

      {/* Content container - scrollable */}
      <div className="relative z-10 w-full">
        {children}
      </div>
      
      {/* Add CSS for star field effect */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .stars-sm {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(2px 2px at 20vw 30vh, white, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40vw 80vh, white, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 60vw 20vh, white, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 80vw 50vh, white, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 10vw 70vh, white, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 90vw 10vh, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200vw 200vh;
        }
        
        .stars-md {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(3px 3px at 25vw 15vh, white, rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 50vw 40vh, white, rgba(0,0,0,0)),
                            radial-gradient(3px 3px at 75vw 75vh, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200vw 200vh;
        }
        
        .stars-lg {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(4px 4px at 15vw 50vh, rgba(255,255,255,0.8), rgba(0,0,0,0)),
                            radial-gradient(4px 4px at 85vw 30vh, rgba(255,255,255,0.8), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200vw 200vh;
        }
      `}</style>
    </div>
  )
} 