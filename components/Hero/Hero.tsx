import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from '../3d/HeroScene'
import FuzzyText from '../FuzzyText'
import FuzzyImage from '../FuzzyImage'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)


export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [introPhase, setIntroPhase] = useState(0)

  const { scrollDistance, fadeOffset, fadeDuration } = {
    scrollDistance: 400,
    fadeOffset: 0.8,
    fadeDuration: 0.2
  }

  useEffect(() => {
    if (!containerRef.current || !heroRef.current) return

    ScrollTrigger.getAll().forEach(t => t.kill())

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollDistance}%`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        }
      }
    })

    tl.to('.hero-content', {
      opacity: 0,
      y: -50,
      duration: 0.3,
    }, 0)

    tl.to(heroRef.current, {
      opacity: 0,
      pointerEvents: 'none',
      duration: fadeDuration,
    }, fadeOffset)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [scrollDistance, fadeOffset, fadeDuration])

  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 400)
    const t2 = setTimeout(() => setIntroPhase(2), 2000)
    const t3 = setTimeout(() => setIntroPhase(3), 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full relative bg-black">
      <section ref={heroRef} className="hero-container fixed inset-0">
        <div className="hero-scene-wrapper">
          <HeroScene scrollProgress={scrollProgress} introPhase={introPhase} />
        </div>

        <div className="hero-content relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introPhase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="hero-title-wrapper flex justify-center">
              <FuzzyText 
                baseIntensity={0.2} 
                hoverIntensity={0.3} 
                gradient={['#22c55e', '#065f46']}
                className="hero-title"
              >
                KeyGEnCoders
              </FuzzyText>
            </div>
          </motion.div>

          <motion.div 
            className="hero-logo-wrapper mt-10 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={introPhase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
          >
            <FuzzyImage 
              src="/logo/logo.png" 
              width={150} 
              height={150} 
              baseIntensity={0.15} 
              hoverIntensity={0.3} 
              glitchMode={true}
              glitchInterval={3000}
            />
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <motion.div 
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1"
            initial={{ opacity: 0 }}
            animate={introPhase >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="w-1 h-2 bg-green-500 rounded-full" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
