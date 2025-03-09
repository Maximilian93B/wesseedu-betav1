"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js"

// Simplified custom shader for the glow effect
const glowShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // Simplified color adjustment for better performance
      color.r = color.r * 0.7;
      color.g = min(color.g * 1.2, 1.0);
      color.b = min(color.b * 1.1, 1.0);
      
      gl_FragColor = color;
    }
  `,
}

export default function CosmicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  // Create refs for objects that need to be accessed in cleanup
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastRenderTimeRef = useRef<number>(0)
  // Add state for controlling the fade-in animation
  const [opacity, setOpacity] = useState(0)
  // Add state for tracking if component is visible
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Add a delayed fade-in effect
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1)
    }, 800) // Delay the start of fade-in by 800ms
    
    return () => clearTimeout(fadeInTimeout)
  }, [])

  // Visibility observer to pause rendering when not visible
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#000000")
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Renderer setup with optimized parameters
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump' // Use medium precision for better performance
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    // Limit pixel ratio for better performance
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5)
    renderer.setPixelRatio(pixelRatio)
    
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create the horizon plane with optimized geometry
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1) // Reduced segments
    geometryRef.current = geometry

    // Simplified shader material for the horizon glow
    const horizonMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;
        
        float sdCircle(vec2 p, float r) {
          return length(p) - r;
        }
        
        void main() {
          // Normalized pixel coordinates (from -1 to 1)
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= resolution.x / resolution.y;
          
          // Position and parameters for the horizon - at the bottom
          float horizonY = -0.90;
          float ringRadius = 0.35;
          float thickness = 0.07;
          float glowStrength = 0.8; // Reduced glow strength
          
          // Calculate distance to horizon line - simplified
          float dist = abs(uv.y - horizonY);
          
          // Calculate distance to ring
          vec2 ringCenter = vec2(0.0, horizonY);
          float ringDist = sdCircle(uv - ringCenter, ringRadius);
          
          // Black hole in the center
          float blackHoleRadius = ringRadius * 0.6;
          float blackHoleDist = sdCircle(uv - ringCenter, blackHoleRadius);
          
          // Combine for the final glow effect - simplified
          float horizonGlow = smoothstep(0.15, 0.0, dist) * 0.3;
          
          // Simplified pulse animation
          float pulse = (sin(time * 0.8) * 0.05 + 0.95);
          float ringGlow = smoothstep(thickness, 0.0, abs(ringDist)) * 0.7 * pulse;
          
          // Simplified center glow
          float centerGlow = smoothstep(0.15, 0.0, length(uv - ringCenter)) * 0.6;
          
          // Create black hole mask
          float blackHoleMask = smoothstep(0.01, -0.01, blackHoleDist);
          
          // Final color - simplified
          vec3 horizonColor = vec3(0.1, 0.4, 0.5) * horizonGlow * glowStrength;
          vec3 ringColor = vec3(0.4, 0.8, 0.7) * ringGlow * glowStrength;
          vec3 centerColor = vec3(0.05, 0.5, 0.4) * centerGlow * glowStrength * (1.0 - blackHoleMask * 0.9);
          
          // Combine all effects
          vec3 finalColor = horizonColor + ringColor + centerColor;
          
          // Apply black hole
          finalColor *= mix(1.0, 0.1, blackHoleMask);
          
          // Output
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
    materialRef.current = horizonMaterial

    const horizonMesh = new THREE.Mesh(geometry, horizonMaterial)
    scene.add(horizonMesh)

    // Post-processing with optimized settings
    const composer = new EffectComposer(renderer)
    composerRef.current = composer
    
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Add bloom pass with optimized settings
    const bloomParams = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0.2,
      bloomRadius: 0.8,
    }

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), // Reduced resolution
      bloomParams.bloomStrength,
      bloomParams.bloomRadius,
      bloomParams.bloomThreshold,
    )
    composer.addPass(bloomPass)

    // Add simplified shader pass
    const colorPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: null },
        },
        vertexShader: glowShader.vertexShader,
        fragmentShader: glowShader.fragmentShader,
      }),
    )
    composer.addPass(colorPass)

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      resizeTimeout = setTimeout(() => {
        if (!rendererRef.current || !composerRef.current) return
        
        const width = window.innerWidth
        const height = window.innerHeight

        camera.updateProjectionMatrix()
        rendererRef.current.setSize(width, height)
        composerRef.current.setSize(width, height)

        horizonMaterial.uniforms.resolution.value.set(width, height)
      }, 100); // 100ms throttle
    }

    window.addEventListener("resize", handleResize)

    // Animation loop with frame limiting
    const clock = new THREE.Clock()
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = () => {
      if (!composerRef.current || !materialRef.current) return
      
      const now = performance.now();
      const elapsed = now - lastRenderTimeRef.current;
      
      // Only render if component is visible and enough time has passed
      if (isVisible && elapsed > frameInterval) {
        const elapsedTime = clock.getElapsedTime()

        // Update uniforms
        materialRef.current.uniforms.time.value = elapsedTime

        // Render
        composerRef.current.render()
        
        // Update last render time
        lastRenderTimeRef.current = now - (elapsed % frameInterval);
      }

      // Store the animation frame ID for cleanup
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)
      
      // Cancel any pending animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      // Dispose of Three.js objects
      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current.forceContextLoss()
        rendererRef.current.domElement.remove()
        rendererRef.current = null
      }
      
      if (composerRef.current) {
        composerRef.current.dispose()
        composerRef.current = null
      }
      
      if (geometryRef.current) {
        geometryRef.current.dispose()
        geometryRef.current = null
      }
      
      if (materialRef.current) {
        materialRef.current.dispose()
        materialRef.current = null
      }
      
      // Clear the scene
      if (sceneRef.current) {
        sceneRef.current.clear()
        sceneRef.current = null
      }
    }
  }, [isVisible])

  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10" 
      aria-hidden="true"
      style={{
        opacity: opacity,
        transition: "opacity 1800ms cubic-bezier(0.16, 1, 0.3, 1)", // Use a smooth easing curve
        zIndex: -10 // Ensure it's behind everything
      }}
    >
      <div ref={containerRef} className="w-full h-full"></div>
      {/* Very dark overlay for maximum title clarity */}
      <div className="absolute inset-0 bg-black/90 pointer-events-none"></div>
    </div>
  )
}

