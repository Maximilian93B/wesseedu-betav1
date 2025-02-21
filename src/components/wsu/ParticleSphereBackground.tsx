"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"

export function ParticleSphere() {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    const colors = new Float32Array(5000 * 3)
    const p = new THREE.Vector3()
    const color = new THREE.Color()
    const radius = 2

    // Rough continent coordinates (simplified)
    const continents = [
      // North America
      { lat: [30, 70], lng: [-170, -50], density: 0.7 },
      // South America
      { lat: [-60, 10], lng: [-80, -35], density: 0.7 },
      // Europe
      { lat: [35, 70], lng: [-10, 40], density: 0.7 },
      // Africa
      { lat: [-35, 35], lng: [-20, 50], density: 0.7 },
      // Asia
      { lat: [0, 75], lng: [60, 180], density: 0.7 },
      // Australia
      { lat: [-40, -10], lng: [110, 155], density: 0.7 },
    ]

    for (let i = 0; i < positions.length; i += 3) {
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(180)

      // Convert to lat/lng for easier continent checking
      const lat = phi
      const lng = theta

      // Check if point is in any continent
      const isContinent = continents.some(
        cont =>
          lat >= cont.lat[0] &&
          lat <= cont.lat[1] &&
          lng >= cont.lng[0] &&
          lng <= cont.lng[1]
      )

      p.setFromSphericalCoords(
        radius,
        THREE.MathUtils.degToRad(90 - phi), // Convert to proper spherical coordinates
        THREE.MathUtils.degToRad(theta)
      )

      positions[i] = p.x
      positions[i + 1] = p.y
      positions[i + 2] = p.z

      // Color based on whether point is on continent or ocean
      if (isContinent) {
        // Green for land
        color.setHSL(0.3 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3)
      } else {
        // Blue for water
        color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.6 + Math.random() * 0.3)
      }

      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={points} position={[2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particlesPosition.colors.length / 3}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        sizeAttenuation={true}
        depthWrite={false}
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default function ParticleSphereBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight color="#14B8A6" position={[5, 5, 5]} intensity={0.5} />
        <ParticleSphere />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

