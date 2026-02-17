'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Model } from './OldComputersModel'

interface ComputersSceneProps {
  className?: string;
}

export default function ComputersScene({ className }: ComputersSceneProps) {
  const sceneParams = {
    background: '#101010',
    environment: 'city'
  }

  const modelParams = {
    texColor: '#ffffff',
    screenColor: '#00ff00',
    animation: 0,
    position: [0, -1, 0] as [number, number, number],
    scale: 1
  }

  const lightsParams = {
    ambientIntensity: 0.5,
    directionalIntensity: 1,
    directionalColor: '#ffffff',
    directionalPosition: [5, 5, 5] as [number, number, number]
  }

  const effectsParams = {
    autoRotate: true,
    shadows: true
  }

  return (
    <div className={`w-full relative bg-black/5 rounded-xl overflow-hidden ${className || 'h-[500px]'}`}>
      <Canvas
        shadows={effectsParams.shadows}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 45 }}
      >
        <color attach="background" args={[sceneParams.background]} />
        
        <ambientLight intensity={lightsParams.ambientIntensity} />
        <directionalLight 
          position={lightsParams.directionalPosition} 
          intensity={lightsParams.directionalIntensity} 
          color={lightsParams.directionalColor}
          castShadow={effectsParams.shadows}
        />

        <Suspense fallback={null}>
          <Model 
            position={modelParams.position} 
            scale={modelParams.scale}
            texColor={modelParams.texColor}
            screenColor={modelParams.screenColor}
            animIndex={modelParams.animation}
          />
          <Environment preset={sceneParams.environment as any} />
        </Suspense>

        <OrbitControls 
            autoRotate={effectsParams.autoRotate} 
            autoRotateSpeed={0.5} 
            enableZoom={true} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0}
        />
      </Canvas>
    </div>
  )
}
