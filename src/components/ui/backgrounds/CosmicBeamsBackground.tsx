"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js"

// Enhanced custom shader for crystal clear glow effect
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
      
      // Enhanced color adjustment with better cyan and blue tones
      color.r = color.r * 0.7; // Further reduce red for even cooler, more crystal-like tones
      color.g = min(color.g * 1.4, 1.0); // Enhance green channel for better cyan
      color.b = min(color.b * 1.3, 1.0); // Boost blue slightly
      
      // More pronounced edge falloff for crystal clear definition
      float dist = distance(vUv, vec2(0.5, 0.5));
      color.rgb *= 1.0 - smoothstep(0.3, 0.6, dist) * 0.6; // Sharper falloff
      
      // Subtle contrast enhancement
      color.rgb = pow(color.rgb, vec3(0.925));
      
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
    }, 100) // Further reduced from 200ms to 100ms for immediate appearance
    
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

    // Enhanced shader material with crystal clear glow
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
          
          // Position and parameters for the horizon
          float horizonY = -0.90;
          float ringRadius = 0.35;
          float thickness = 0.05; // Thinner for more crystal-like definition
          float glowStrength = 0.9; // Slightly stronger
          
          // Calculate distance to horizon line
          float dist = abs(uv.y - horizonY);
          
          // Calculate distance to ring
          vec2 ringCenter = vec2(0.0, horizonY);
          float ringDist = sdCircle(uv - ringCenter, ringRadius);
          
          // Black hole in the center
          float blackHoleRadius = ringRadius * 0.65;
          float blackHoleDist = sdCircle(uv - ringCenter, blackHoleRadius);
          
          // Enhanced pulse animation with multi-frequency
          float fastPulse = (sin(time * 1.1) * 0.04 + 0.96);
          float slowPulse = (sin(time * 0.4) * 0.05 + 0.95);
          float pulse = fastPulse * slowPulse;
          
          // Crystal clear glow effects with sharper falloff
          float horizonGlow = smoothstep(0.1, 0.0, dist) * 0.35;
          float ringGlow = smoothstep(thickness, 0.0, abs(ringDist)) * 0.8 * pulse;
          float centerGlow = smoothstep(0.1, 0.0, length(uv - ringCenter)) * 0.7;
          
          // Create black hole mask with cleaner edge
          float blackHoleMask = smoothstep(0.005, -0.005, blackHoleDist);
          
          // Enhanced colors for crystal clarity - crisper cyan and teal
          vec3 horizonColor = vec3(0.1, 0.5, 0.6) * horizonGlow * glowStrength;
          vec3 ringColor = vec3(0.35, 0.9, 0.85) * ringGlow * glowStrength;
          vec3 centerColor = vec3(0.05, 0.55, 0.5) * centerGlow * glowStrength * (1.0 - blackHoleMask * 0.95);
          
          // More focused ray effect
          float rayIntensity = pow(1.0 - abs(atan(uv.x, uv.y - horizonY) / 3.14159), 15.0) * 0.12 * pulse;
          vec3 rayColor = vec3(0.2, 0.8, 0.7) * rayIntensity;
          
          // Combine all effects
          vec3 finalColor = horizonColor + ringColor + centerColor + rayColor;
          
          // Apply black hole with cleaner edge
          finalColor *= mix(1.0, 0.05, blackHoleMask);
          
          // Additional intensity falloff for crystal clear definition
          float distFromCenter = length(uv - ringCenter);
          finalColor *= smoothstep(0.9, 0.2, distFromCenter);
          
          // Apply subtle contrast enhancement
          finalColor = pow(finalColor, vec3(0.9));
          
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

    // Enhanced bloom parameters for better glow quality
    const bloomParams = {
      exposure: 1,
      bloomStrength: 1.4,      // Slightly reduced for clarity
      bloomThreshold: 0.2,     // Keep threshold
      bloomRadius: 0.6,        // Tighter bloom radius for crystal clear edges
    }

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      bloomParams.bloomStrength,
      bloomParams.bloomRadius,
      bloomParams.bloomThreshold,
    )
    composer.addPass(bloomPass)

    // Enhanced glow shader pass
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
      className="fixed inset-0 w-full h-full" 
      aria-hidden="true"
      style={{
        opacity: opacity * 0.7, // Slightly reduced opacity for clarity
        transition: "opacity 400ms cubic-bezier(0.11, 0, 0.5, 0)",
        zIndex: -10,
        mixBlendMode: 'screen'
      }}
    >
      <div ref={containerRef} className="w-full h-full"></div>
      
      {/* Crisper overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.7) 100%)',
          mixBlendMode: 'multiply'
        }}
      ></div>
      
      {/* Subtle color enhancement overlay with more limited spread */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 80%, rgba(40,120,150,0.02) 0%, rgba(20,60,100,0.01) 30%, transparent 50%)',
          mixBlendMode: 'screen',
          opacity: 0.3
        }}
      ></div>
    </div>
  )
}
