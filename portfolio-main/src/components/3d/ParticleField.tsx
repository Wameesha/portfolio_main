'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

// Random points in 3D space
function generateSphere(count: number) {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 10
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
}

function ParticleSystem() {
    const ref = useRef<THREE.Points>(null)
    const { camera, mouse } = useThree()

    const particleCount = 2000
    const positions = useMemo(() => generateSphere(particleCount), [particleCount])

    useFrame((state, delta) => {
        if (ref.current) {
            // Rotate particles slowly
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
            ref.current.rotation.y += delta * 0.05

            // Mouse interaction
            const mouseInfluence = 0.1
            ref.current.rotation.x += mouse.y * mouseInfluence * delta
            ref.current.rotation.y += mouse.x * mouseInfluence * delta
        }
    })

    useEffect(() => {
        if (ref.current) {
            // GSAP animation for particle entrance
            gsap.fromTo(ref.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 2, ease: "power3.out" }
            )
        }
    }, [])

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#60a5fa"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    )
}

function FloatingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
        }
    })

    return (
        <mesh ref={meshRef} position={[4, 0, -2]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="#3b82f6"
                transparent
                opacity={0.3}
                wireframe
            />
        </mesh>
    )
}

export default function ParticleField() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <ParticleSystem />
                <FloatingGeometry />
            </Canvas>
        </div>
    )
}
