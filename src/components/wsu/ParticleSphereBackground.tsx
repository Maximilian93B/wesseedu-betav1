"use client"
import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls } from "@react-three/drei"
import { MilkyWayBackground } from "./MilkyWay"

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

      const lat = phi
      const lng = theta

      const isContinent = continents.some(
        (cont) => lat >= cont.lat[0] && lat <= cont.lat[1] && lng >= cont.lng[0] && lng <= cont.lng[1],
      )

      p.setFromSphericalCoords(
        radius,
        THREE.MathUtils.degToRad(90 - phi),
        THREE.MathUtils.degToRad(theta),
      )

      positions[i] = p.x
      positions[i + 1] = p.y
      positions[i + 2] = p.z

      // Updated Color Scheme
      if (isContinent) {
        // Teal for land
        color.setHSL(0.5, 0.8, 0.5 + Math.random() * 0.3)
      } else {
        // Purple for water
        color.setHSL(0.75, 0.6, 0.4 + Math.random() * 0.3)
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
    <points ref={points} position={[0, 0, 0]}>
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
      <pointsMaterial size={0.03} vertexColors sizeAttenuation={true} depthWrite={false} transparent opacity={1} />
    </points>
  )
}

export default function ParticleSphereBackground() {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020714] via-[#0A1A3B]/95 to-[#020714] pointer-events-none" />
      <Canvas
        camera={{ position: [15, 10, 20], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="#FFFFFF" position={[5, 5, 5]} intensity={0.2} />
        <group position={[12, 4, 0]}>
          <MilkyWayBackground />
          <ParticleSphere />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

