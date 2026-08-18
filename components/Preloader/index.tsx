'use client';
import styles from './style.module.scss';
import { useEffect, useState, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Model, DEFAULT_SCREEN, SCREEN_LABELS } from '../3d/OldComputersModel';
import Image from 'next/image';
import { slideUp } from './anim';

interface PreloaderProps {
  onComplete?: () => void;
}

function PreloaderScene({ phase }: { phase: number }) {
  const { camera } = useThree();
  const startZ = useRef(16);
  const targetZ = useRef(16);

  useEffect(() => {
    if (phase >= 1) {
      targetZ.current = 10;
    }
  }, [phase]);

  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.02);
    camera.lookAt(0, 2, 0);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3.0} color="#ffffff" castShadow />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#1bd506" />

      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
          <Model
            position={[0, -2.0, 0]}
            scale={1.35}
            texColor="#1bd506"
            screenColor="#010201"
            animIndex={0}
            perScreenSettings={SCREEN_LABELS.map(() => ({ ...DEFAULT_SCREEN }))}
          />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Phase 0: 3D scene loads and fades in
  // Phase 1: Scene is visible, camera starts zooming
  // Phase 2: Logo fades in
  // Phase 3: Text fades in
  // Phase 4: Done — trigger exit

  useEffect(() => {
    const minLoadDelay = setTimeout(() => {
      setSceneReady(true);
    }, 800);
    return () => clearTimeout(minLoadDelay);
  }, []);

  useEffect(() => {
    if (!sceneReady) return;

    // Phase 1: scene visible → start zoom
    const t1 = setTimeout(() => setPhase(1), 300);
    // Phase 2: logo appears
    const t2 = setTimeout(() => setPhase(2), 1200);
    // Phase 3: text appears
    const t3 = setTimeout(() => setPhase(3), 2200);
    // Phase 4: complete
    const t4 = setTimeout(() => {
      setPhase(4);
      onComplete?.();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [sceneReady, onComplete]);

  return (
    <motion.div variants={slideUp} initial="initial" exit="exit" className={styles.introduction}>
      {/* 3D Scene Background */}
      <motion.div
        className={styles.sceneWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneReady ? 0.7 : 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 16], fov: 45 }}
        >
          <color attach="background" args={['#000000']} />
          <PreloaderScene phase={phase} />
        </Canvas>
      </motion.div>

      {/* Overlay content */}
      <div className={styles.overlay}>
        {/* Logo */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            phase >= 2
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.6 }
          }
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <Image
            src="/logo/logo.png"
            alt="KeyGEnCoders Logo"
            width={140}
            height={140}
            priority
            className={styles.logo}
          />
        </motion.div>

        {/* Text */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={
            phase >= 3
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          KeyGEnCoders
        </motion.h1>

        {/* Subtle loading indicator before scene is ready */}
        <motion.div
          className={styles.loadingDots}
          initial={{ opacity: 1 }}
          animate={{ opacity: sceneReady ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </motion.div>
      </div>

      {/* Scanline effect */}
      <div className={styles.scanlines} />
    </motion.div>
  );
};

export default Preloader;