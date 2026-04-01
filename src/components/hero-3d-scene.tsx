import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import * as THREE from "three"

function InteractiveSphere({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
  useFrame((state) => {
    if (meshRef.current && mouse.current) {
      const targetX = (mouse.current.x * viewport.width) / 4
      const targetY = (mouse.current.y * viewport.height) / 4
      
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        0.05
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.05
      )
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0.5, 0]} scale={1.2}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        roughness={0.1}
        metalness={0.8}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function FloatingTorus({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current && mouse.current) {
      const targetX = (-mouse.current.x * viewport.width) / 6
      const targetY = (-mouse.current.y * viewport.height) / 6
      
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX - 2.5,
        0.03
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY - 0.5,
        0.03
      )
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[-2.5, -0.5, -1]} scale={0.8}>
      <torusGeometry args={[1, 0.4, 32, 64]} />
      <MeshWobbleMaterial
        color="#06b6d4"
        roughness={0.2}
        metalness={0.6}
        factor={0.3}
        speed={1.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function FloatingOctahedron({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current && mouse.current) {
      const targetX = (mouse.current.x * viewport.width) / 8
      const targetY = (mouse.current.y * viewport.height) / 8
      
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX - 1,
        0.04
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY + 2,
        0.04
      )
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-1, 2, -2]} scale={0.6}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color="#f472b6"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function FloatingBox({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current && mouse.current) {
      const targetX = (-mouse.current.x * viewport.width) / 10
      const targetY = (-mouse.current.y * viewport.height) / 10
      
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX + 3,
        0.025
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY - 1.5,
        0.025
      )
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[3, -1.5, -1.5]} scale={0.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#fbbf24"
          roughness={0.4}
          metalness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const count = 100
  const particlesRef = useRef<THREE.Points>(null)
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#06b6d4" />
      
      <InteractiveSphere mouse={mouse} />
      <FloatingTorus mouse={mouse} />
      <FloatingOctahedron mouse={mouse} />
      <FloatingBox mouse={mouse} />
      <ParticleField />
    </>
  )
}

export function Hero3DScene() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      }
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouseRef} />
      </Canvas>
    </div>
  )
}
