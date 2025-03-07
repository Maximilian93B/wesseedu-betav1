"use client"

import type React from "react"
import { useEffect, useRef } from "react"
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

// Replace the createBeam function with this centered version
function createBeam(width: number, height: number): Beam {
  // More centered angle range (140-220 degrees for a more balanced spread)
  const angle = 140 + Math.random() * 80

  const hue = 230 + Math.random() * 60 // Blue to purple range (230-290)

  // Position beams more centrally across the screen
  return {
    x: width * (0.3 + Math.random() * 0.7), // Position beams from center to right side
    y: Math.random() * height, // Full height distribution
    width: 100 + Math.random() * 200,
    length: width * 2.5,
    angle: angle,
    speed: 0.2 + Math.random() * 0.3,
    opacity: 0.3 + Math.random() * 0.3,
    hue: hue,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.003 + Math.random() * 0.007,
  }
}

// Replace the resetBeam function with this centered version
function resetBeam(beam: Beam, index: number, totalBeams: number, width: number, height: number) {
  // Divide the screen height into sections for better beam distribution
  const section = height / (totalBeams / 5)
  const sectionIndex = index % (totalBeams / 5)

  // Create a more even distribution of beams across the screen
  if (index % 5 === 0) {
    beam.x = width * (0.5 + Math.random() * 0.5) // Center to right
    beam.y = sectionIndex * section
    beam.angle = 170 + Math.random() * 40 // More centered angle
  } else if (index % 5 === 1) {
    beam.x = width * (0.4 + Math.random() * 0.4) // Slightly left of center
    beam.y = height / 4 + (Math.random() - 0.5) * (height / 4)
    beam.angle = 150 + Math.random() * 40
  } else if (index % 5 === 2) {
    beam.x = width * (0.6 + Math.random() * 0.4) // Right side
    beam.y = height / 2 + (Math.random() - 0.5) * (height / 4)
    beam.angle = 190 + Math.random() * 40
  } else if (index % 5 === 3) {
    beam.x = width * (0.3 + Math.random() * 0.4) // Left side
    beam.y = (height * 3) / 4 + (Math.random() - 0.5) * (height / 4)
    beam.angle = 130 + Math.random() * 40
  } else {
    beam.x = width * (0.5 + Math.random() * 0.5) // Center to right
    beam.y = height - sectionIndex * section
    beam.angle = 160 + Math.random() * 40
  }

  beam.hue = 230 + Math.random() * 60
  beam.width = 100 + Math.random() * 200
  beam.speed = 0.2 + Math.random() * 0.3
  beam.opacity = 0.3 + Math.random() * 0.3
  return beam
}

export function CosmicBeamsBackground({ className, intensity = "medium", children }: CosmicBeamsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const beamsRef = useRef<Beam[]>([])
  const animationFrameRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const isVisibleRef = useRef<boolean>(false)

  // Update the MINIMUM_BEAMS constant to increase the number of beams
  const MINIMUM_BEAMS = intensity === "subtle" ? 30 : intensity === "medium" ? 45 : 60

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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -300])

  const orb1X = useTransform(scrollYProgress, [0, 1], [0, -50])
  const orb2X = useTransform(scrollYProgress, [0, 1], [0, 50])
  const orb3X = useTransform(scrollYProgress, [0, 1], [0, -80])

  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const orb2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 1.1])
  const orb3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 0.8, 1.2])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR at 2 for performance
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Reset beams when canvas size changes
      const totalBeams = MINIMUM_BEAMS
      beamsRef.current = Array.from({ length: totalBeams }, () => createBeam(window.innerWidth, window.innerHeight))
    }

    updateCanvasSize()

    let resizeTimeout: number
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = window.setTimeout(updateCanvasSize, 200)
    }

    window.addEventListener("resize", handleResize)

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam, deltaTime: number) {
      ctx.save()
      ctx.translate(beam.x, beam.y)
      ctx.rotate((beam.angle * Math.PI) / 180)

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity]

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)

      gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 65%, 0)`)
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 90%, 65%, ${pulsingOpacity * 0.7})`)
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 90%, 65%, ${pulsingOpacity * 1.2})`)
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 90%, 65%, ${pulsingOpacity * 1.2})`)
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 90%, 65%, ${pulsingOpacity * 0.7})`)
      gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 65%, 0)`)

      ctx.fillStyle = gradient
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
      ctx.restore()
    }

    let lastFrameTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    function animate(timestamp: number) {
      if (!canvas || !ctx) return

      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }

      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = (timestamp - lastTimeRef.current) / 16.67
      lastTimeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.filter = "blur(60px)"

      const totalBeams = beamsRef.current.length
      beamsRef.current.forEach((beam, index) => {
        beam.x -= beam.speed * deltaTime * 0.8
        beam.pulse += beam.pulseSpeed * deltaTime

        if (beam.x + beam.length < -100) {
          resetBeam(beam, index, totalBeams, window.innerWidth, window.innerHeight)
        }

        drawBeam(ctx, beam, deltaTime)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [intensity])

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-hidden bg-black", className)}>
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80"></div>
      </div>

      <motion.div
        className="fixed top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-teal-500/10 to-blue-500/5 blur-3xl -z-10"
        style={{
          y: orb1Y,
          x: orb1X,
          scale: orb1Scale,
          opacity: cosmicOpacity[intensity],
        }}
      ></motion.div>

      <motion.div
        className="fixed bottom-1/3 -right-20 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tl from-blue-500/10 to-purple-500/5 blur-3xl -z-10"
        style={{
          y: orb2Y,
          x: orb2X,
          scale: orb2Scale,
          opacity: cosmicOpacity[intensity],
        }}
      ></motion.div>

      <motion.div
        className="fixed top-2/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-teal-500/5 to-emerald-500/5 blur-2xl -z-10"
        style={{
          y: orb3Y,
          x: orb3X,
          scale: orb3Scale,
          opacity: cosmicOpacity[intensity],
        }}
      ></motion.div>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-0"
        style={{
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />

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

      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}

