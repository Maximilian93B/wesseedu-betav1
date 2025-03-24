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
    animatables: Array<{animate: (time: number) => void}>;
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
    camera.position.set(0, 4, 9);
    
    // Use low pixel ratio for better performance
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true, // Always use antialiasing for clean edges
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Subtle and elegant lighting setup for good shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Key light for primary shadows
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(4, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -10;
    keyLight.shadow.camera.right = 10;
    keyLight.shadow.camera.top = 10;
    keyLight.shadow.camera.bottom = -10;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);
    
    // Fill light to soften shadows and illuminate details
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 8, 7);
    scene.add(fillLight);
    
    // Subtle rim light to highlight edges
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);
    
    // Additional soft light from below to illuminate bases
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.1);
    bottomLight.position.set(0, -3, 5);
    scene.add(bottomLight);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(40, 40);
    const groundMaterial = new THREE.ShadowMaterial({ 
      opacity: 0.25 // Subtle shadow visibility
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01; // Slightly below other objects
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Animatables collection for subtle movements
    const animatables: Array<{animate: (time: number) => void}> = [];

    // Create elegant box platform to match prototype image
    const createElegantBox = (width: number, height: number, depth: number, position: THREE.Vector3, 
                             tierData: TierInfo, isActive: boolean) => {
      // Create group to hold all parts
      const group = new THREE.Group();
      group.position.copy(position);
      
      // Extract colors from tierData
      const topColor = tierData.color;
      
      // Create base - match the green base from the prototype
      const baseWidth = width;
      const baseHeight = height * 0.65; // Base height is 65% of total
      const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, depth);
      
      // Green base material to match prototype
      const baseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x166534, // Darker green to match prototype
        metalness: 0.1,
        roughness: 0.7,
        reflectivity: 0.1,
        clearcoat: 0.2,
        clearcoatRoughness: 0.3
      });
      
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = baseHeight / 2; // Position at half height
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);
      
      // Create top colored section
      const topHeight = height * 0.25; // Top height is 25% of total
      const topGeometry = new THREE.BoxGeometry(width, topHeight, depth);
      
      // Create colored material for top section
      const topMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(topColor),
        metalness: 0.3,
        roughness: 0.3,
        reflectivity: 0.3,
        clearcoat: 0.6, 
        clearcoatRoughness: 0.1 // More glossy top like in prototype
      });
      
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = baseHeight + (topHeight / 2); // Position on top of base
      top.castShadow = true;
      top.receiveShadow = true;
      group.add(top);
      
      // Add WeSeedU logo on front of base - made larger to match prototype
      const logoSize = width * 0.25; // Larger logo to match prototype
      const logoGeometry = new THREE.CircleGeometry(logoSize, 32);
      const logoMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.95
      });
      
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);
      logo.position.set(0, baseHeight * 0.5, depth/2 * 0.99); // Center on front face
      logo.rotation.y = Math.PI;
      group.add(logo);
      
      // Add label text on front face of top section
      // In a real implementation, we'd use TextGeometry
      const labelWidth = width * 0.8;
      const labelHeight = topHeight * 0.6;
      const labelGeometry = new THREE.PlaneGeometry(labelWidth, labelHeight);
      
      // White label to match prototype
      const labelMaterial = new THREE.MeshBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.95
      });
      
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(0, baseHeight + topHeight/2, depth/2 * 0.99);
      label.rotation.y = Math.PI;
      group.add(label);
      
      // Create the plant
      // Plant group to hold all plant elements
      const plantGroup = new THREE.Group();
      plantGroup.position.set(0, baseHeight + topHeight, 0);
      group.add(plantGroup);
      
      // Stem
      const stemHeight = height * 0.7;
      const stemGeometry = new THREE.CylinderGeometry(0.03, 0.05, stemHeight, 8);
      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0x15803d, // Match prototype's stem color
        roughness: 0.6,
        metalness: 0.1
      });
      
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = stemHeight / 2;
      stem.castShadow = true;
      plantGroup.add(stem);
      
      // Create leaf colors based on tier
      const leafColor = tierData.label === "ROOT" ? "#0ea5e9" : 
                       tierData.label === "THRIVE" ? "#FDBA74" : "#166534";
                       
      // Secondary leaves are always green
      const secondaryLeafColor = "#22c55e";
      
      // Create stylized leaves
      // Main leaf - matches the tier color
      const createLeaf = (x: number, y: number, z: number, rotY: number, color: string) => {
        // Create a teardrop shape for the leaf
        const shape = new THREE.Shape();
        shape.moveTo(0, 0.5);
        shape.bezierCurveTo(0.25, 0.4, 0.3, 0, 0, -0.5);
        shape.bezierCurveTo(-0.3, 0, -0.25, 0.4, 0, 0.5);
        
        const leafGeometry = new THREE.ShapeGeometry(shape, 12);
        const leafMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          metalness: 0.1,
          roughness: 0.5
        });
        
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.scale.set(0.5, 0.5, 0.5);
        leaf.position.set(x, stemHeight - 0.1 + y, z);
        leaf.rotation.set(Math.PI/6, rotY, 0);
        leaf.castShadow = true;
        
        // Add central vein
        const veinGeometry = new THREE.PlaneGeometry(0.01, 0.4);
        const veinMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        
        const vein = new THREE.Mesh(veinGeometry, veinMaterial);
        vein.position.set(0, 0, 0.01);
        leaf.add(vein);
        
        plantGroup.add(leaf);
        return leaf;
      };
      
      // Create leaves with the prototype's arrangement
      // Center/front leaf with tier color
      createLeaf(0, 0, 0.1, 0, leafColor);
      // Left and right leaves in green
      createLeaf(0.1, 0.05, -0.1, 2, secondaryLeafColor);
      createLeaf(-0.1, -0.05, -0.1, 4, secondaryLeafColor);
      
      // Add subtle animation
      if (isActive) {
        const initialY = group.position.y;
        const animateGroup = (time: number) => {
          // Very subtle floating effect
          group.position.y = initialY + Math.sin(time * 0.5) * 0.01;
          // Very subtle plant sway
          plantGroup.rotation.y = Math.sin(time * 0.3) * 0.01;
        };
        
        animatables.push({ animate: animateGroup });
      }
      
      // Add to scene
      scene.add(group);
      
      return { group };
    };
    
    // Create the podium arrangement
    const createPodium = () => {
      // Arrange boxes side by side like in prototype
      const tierPositions = [
        { x: -3.5, y: 0, z: 0 },    // ROOT (left)
        { x: 0, y: 0, z: 0 },       // THRIVE (center)
        { x: 3.5, y: 0, z: 0 }      // IMPACT (right)
      ];
      
      // Tier dimensions - based on prototype image proportions
      // ROOT is smallest, THRIVE is medium, IMPACT is largest
      const tierSizes = [
        { width: 2.2, height: 1.0, depth: 2.2 },       // ROOT 
        { width: 2.5, height: 1.1, depth: 2.5 },       // THRIVE
        { width: 2.8, height: 1.2, depth: 2.8 }        // IMPACT
      ];
      
      const tiers = [];
      
      // Create all three tiers
      for (let i = 0; i < 3; i++) {
        const tierData = investmentTiers[i];
        const position = new THREE.Vector3(tierPositions[i].x, tierPositions[i].y, tierPositions[i].z);
        const size = tierSizes[i];
        const isActive = i <= 1; // ROOT and THRIVE are active
        
        const box = createElegantBox(
          size.width,
          size.height,
          size.depth,
          position,
          tierData,
          isActive
        );
        
        tiers.push(box);
      }
      
      return tiers;
    };
    
    // Create the podium
    const podium = createPodium();
    
    // Position camera for better view of side-by-side arrangement
    camera.position.set(0, 3, 12);
    camera.lookAt(new THREE.Vector3(0, 1.2, 0));
    
    // Setup camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.2; // Slightly adjusted to prevent looking too far down
    controls.minPolarAngle = Math.PI / 4.5; // Adjusted to prevent looking too far up
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;
    
    // Animation loop with time-based animations
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
      // Get current time
      const time = Date.now() * 0.001;
      
      // Update all animatables
      for (const animatable of animatables) {
        animatable.animate(time);
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