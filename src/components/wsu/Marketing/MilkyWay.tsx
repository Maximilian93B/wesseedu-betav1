"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const particleCount = 20000 // Reduced from 50000
const galaxyRadius = 20
const galaxyArms = 5

export function MilkyWayBackground() {
  const points = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * galaxyRadius
      const spinAngle = radius * 5
      const branchAngle = ((i % galaxyArms) / galaxyArms) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      // Updated Color Scheme
      const mixedColor = new THREE.Color()
      if (radius < 5) {
        // Core: Teal with slight variation
        mixedColor.setHSL(0.5, 0.8, 0.6 + Math.random() * 0.3) // Teal base
      } else {
        // Arms: Purple with variation
        mixedColor.setHSL(0.75, 0.6, 0.5 + Math.random() * 0.4) // Purple base
      }

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02} // Slightly increased size to compensate for fewer particles
        vertexColors
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        opacity={1}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

