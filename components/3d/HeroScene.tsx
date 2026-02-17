import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from './OldComputersModel'

interface HeroSceneProps {
  className?: string;
  scrollProgress?: number;
}

function SceneContent({ scrollProgress = 0 }: { scrollProgress: number }) {
  const { 
    modelX,
    modelY, 
    modelScale, 
    texColor, 
    screenColor, 
    ambientIntensity, 
    lightIntensity,
    startX,
    maxZoomX,
    startY,
    maxZoomY,
    startZ,
    maxZoomZ,
    lookAtY,
    zoomLimit,
    parallaxIntensity
  } = {
    modelX: 0,
    modelY: -2.0,
    modelScale: 1.35,
    texColor: '#1bd506',
    screenColor: '#010201',
    ambientIntensity: 2.0,
    lightIntensity: 3.8,
    startX: 0,
    maxZoomX: 0,
    startY: 2.0,
    maxZoomY: 2.0,
    startZ: 12,
    maxZoomZ: 0,
    lookAtY: 2,
    zoomLimit: 3.00,
    parallaxIntensity: 0.5
  }

  const { camera, mouse } = useThree()
  
  useFrame((state) => {
    const limitedProgress = Math.min(scrollProgress, zoomLimit)

    const targetX = THREE.MathUtils.lerp(startX, maxZoomX, limitedProgress)
    const targetY = THREE.MathUtils.lerp(startY, maxZoomY, limitedProgress)
    const targetZ = THREE.MathUtils.lerp(startZ, maxZoomZ, limitedProgress)
    
    const parallaxX = mouse.x * parallaxIntensity
    const parallaxY = mouse.y * parallaxIntensity

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX + parallaxX, 0.1)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY + parallaxY, 0.1)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1)
    
    state.camera.lookAt(modelX, lookAtY, 0)
  })

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={lightIntensity} 
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#1bd506" />

      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Model 
            position={[modelX, modelY, 0]} 
            scale={modelScale}
            texColor={texColor}
            screenColor={screenColor}
            animIndex={0}
          />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </>
  )
}

export default function HeroScene({ className, scrollProgress = 0 }: HeroSceneProps) {
  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 5, 12], fov: 45 }}
      >
        <color attach="background" args={['#000000']} />
        <SceneContent scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
