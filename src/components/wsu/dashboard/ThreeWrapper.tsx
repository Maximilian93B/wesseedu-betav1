import { useEffect, useRef, memo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type TierInfo = {
  amount: string;
  label: string;
  color: string;
  isActive: boolean;
};

export interface ThreeWrapperProps {
  investmentTiers: TierInfo[];
}

// Cache geometries that are reused
const boxGeometryCache = new Map<string, THREE.BoxGeometry>();
const getBoxGeometry = (size: number, height: number) => {
  const key = `${size}-${height}`;
  if (!boxGeometryCache.has(key)) {
    boxGeometryCache.set(key, new THREE.BoxGeometry(size, height, size));
  }
  return boxGeometryCache.get(key)!;
};

// Detect if browser supports WebGL
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const ThreeWrapper = memo(({ investmentTiers }: ThreeWrapperProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    animatables: Array<{animate: () => void}>;
    dispose: () => void;
  }>();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Check WebGL support
    if (!isWebGLSupported()) {
      console.warn('WebGL is not supported in this browser. Rendering fallback.');
      return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 10);
    
    // Use low pixel ratio for better performance
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: pixelRatio < 2, // Only use antialiasing for lower pixel ratios
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Lighting - simplified for better performance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    
    // Optimize shadow map settings
    directionalLight.shadow.mapSize.width = 512;  // Reduced from 1024
    directionalLight.shadow.mapSize.height = 512; // Reduced from 1024
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
    
    // Add subtle green point lights to create the emerald glow effect - reduced from 2 to 1
    const pointLight1 = new THREE.PointLight(0x10b981, 2, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    // Animatables collection
    const animatables: Array<{animate: () => void}> = [];

    // Create the reward boxes/platforms with fewer particles
    const createTierPlatform = (size: number, height: number, position: THREE.Vector3, color: string, isActive: boolean) => {
      // Platform geometry - use cached geometry
      const geometry = getBoxGeometry(size, height);
      
      // Create a glowing material using MeshStandardMaterial with emissive
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: isActive ? 0.4 : 0.1,
        metalness: 0.8,
        roughness: 0.2,
      });
      
      const platform = new THREE.Mesh(geometry, material);
      platform.position.copy(position);
      platform.castShadow = true;
      platform.receiveShadow = true;
      
      // Add a wireframe outline to the platform
      const wireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 })
      );
      platform.add(wireframe);
      
      scene.add(platform);
      
      // Add particle effects for active platforms - reduced number for better performance
      if (isActive) {
        const particleCount = 10; // Reduced from 20
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          particlePositions[i3] = (Math.random() - 0.5) * size;
          particlePositions[i3 + 1] = Math.random() * 2;
          particlePositions[i3 + 2] = (Math.random() - 0.5) * size;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
          color: new THREE.Color(color),
          size: 0.1,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.position.copy(position);
        scene.add(particles);
        
        // Animate particles
        const animateParticles = () => {
          const positions = particles.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += 0.02;
            if (positions[i3 + 1] > 2) {
              positions[i3 + 1] = 0;
            }
          }
          particles.geometry.attributes.position.needsUpdate = true;
        };
        
        animatables.push({ animate: animateParticles });
        return { platform, particles, animateParticles };
      }
      
      return { platform };
    };
    
    // Calculate the positions and sizes for the tier platforms
    let platforms: any[] = [];
    investmentTiers.forEach((tier, index) => {
      const size = 2 - index * 0.15; // Decreasing size as tiers increase
      const height = 0.5;
      const spacing = 0.2;
      const yPosition = index * (height + spacing);
      
      const platform = createTierPlatform(
        size,
        height,
        new THREE.Vector3(0, yPosition, 0),
        tier.color,
        tier.isActive
      );
      
      platforms.push(platform);
    });
    
    // Add a special highlight to the Impact tier
    const impactTierHighlight = () => {
      const geometry = new THREE.TorusGeometry(1.2, 0.05, 16, 50); // Reduced segments from 100 to 50
      const material = new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.7,
        metalness: 1,
        roughness: 0.3,
      });
      
      const torus = new THREE.Mesh(geometry, material);
      torus.position.set(0, 3 * (0.5 + 0.2), 0); // Position at the Impact tier
      torus.rotation.x = Math.PI / 2;
      scene.add(torus);
      
      // Animate the torus
      const animateTorus = () => {
        torus.rotation.z += 0.01;
      };
      
      animatables.push({ animate: animateTorus });
      return { torus, animateTorus };
    };
    
    const impactHighlight = impactTierHighlight();
    
    // Add a trophy or award model on top of the highest platform
    const createTrophy = () => {
      // Create a simple trophy-like shape using basic geometries
      const group = new THREE.Group();
      
      // Base
      const baseGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.1, 16); // Reduced segments from 32 to 16
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      group.add(base);
      
      // Stem
      const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8); // Reduced segments from 32 to 8
      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.3,
      });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.3;
      group.add(stem);
      
      // Cup
      const cupGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.4, 16); // Reduced segments from 32 to 16
      const cupMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 1,
        roughness: 0.2,
        emissive: 0xffd700,
        emissiveIntensity: 0.2,
      });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.position.y = 0.65;
      group.add(cup);
      
      // Position the trophy at the top of the stack
      const topPosition = 3 * (0.5 + 0.2) + 0.6; // Adjust based on the tier stack height
      group.position.set(0, topPosition, 0);
      group.scale.set(0.7, 0.7, 0.7);
      
      scene.add(group);
      
      // Add a subtle rotation animation
      const animateTrophy = () => {
        group.rotation.y += 0.01;
      };
      
      animatables.push({ animate: animateTrophy });
      return { trophy: group, animateTrophy };
    };
    
    const trophy = createTrophy();
    
    // Setup camera controls with limited rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 4;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    
    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
      // Update all animatable objects
      for (const animatable of animatables) {
        animatable.animate();
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Store scene references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      animatables,
      dispose: () => {
        window.removeEventListener('resize', handleResize);
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        
        // Dispose of geometries and materials
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
        
        renderer.dispose();
        controls.dispose();
      }
    };
    
    // Cleanup function
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, [investmentTiers]); // Only re-run if investmentTiers change
  
  return (
    <canvas ref={canvasRef} className="w-full h-full" />
  );
});

ThreeWrapper.displayName = 'ThreeWrapper';

export default ThreeWrapper; 