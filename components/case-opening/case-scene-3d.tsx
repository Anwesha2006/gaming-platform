'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type CaseRevealPhase = 'idle' | 'charging' | 'opening' | 'revealed'

export type RevealedLoot = {
  name: string
  rarity: string
  image: string
  price: number
}

interface CaseScene3DProps {
  caseImage: string
  caseName: string
  caseLabel?: string
  phase: CaseRevealPhase
  revealedItem?: RevealedLoot | null
}

const PARTICLE_COUNT = 18

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function CaseScene3D({
  caseImage,
  caseName,
  caseLabel = 'Official Case',
  phase,
  revealedItem,
}: CaseScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 22 })
  const reducedMotion = usePrefersReducedMotion()

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || phase !== 'idle' || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(py * -30)
      rotateY.set(px * 30)
      mouseX.set(px)
      mouseY.set(py)
    },
    [phase, reducedMotion, rotateX, rotateY, mouseX, mouseY],
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(0)
    mouseY.set(0)
  }, [rotateX, rotateY, mouseX, mouseY])

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['42%', '58%'])
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${12 + ((i * 37) % 76)}%`,
        delay: (i * 0.35) % 4,
        duration: 3 + (i % 3),
        size: 2 + (i % 3),
      })),
    [],
  )

  const showCase = phase === 'idle' || phase === 'charging' || phase === 'opening'
  const showReveal = phase === 'revealed' && revealedItem

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Screen flash on open */}
      <AnimatePresence>
        {(phase === 'opening' || phase === 'revealed') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'opening' ? 0.6 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="case-flash-overlay"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Title block */}
      <div className="text-center mb-6 space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2">
          <span className="text-accent-purple text-lg">◆</span>
          <span className="text-sm font-semibold italic bg-gradient-to-r from-accent-purple to-accent-magenta bg-clip-text text-transparent">
            {caseLabel}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide text-text-primary uppercase">
          {caseName}
        </h1>
        <div className="flex justify-center gap-1 text-accent-purple/60">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={reducedMotion ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity }}
              className="text-xs"
            >
              ▼
            </motion.span>
          ))}
        </div>
      </div>

      {/* 3D Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="case-stage relative aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* Floor grid */}
        <div className="case-floor-grid absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[40%] pointer-events-none" aria-hidden />

        {/* Spotlight */}
        <motion.div
          className="case-spotlight absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[70%] h-[45%] pointer-events-none"
          style={{ x: reducedMotion ? 0 : useTransform(spotlightX, (v) => `calc(-50% + ${(parseFloat(v) - 50) * 0.3}px)`) }}
          aria-hidden
        />

        {/* Particles */}
        {!reducedMotion && phase === 'idle' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {particles.map((p) => (
              <span
                key={p.id}
                className="case-particle absolute rounded-full bg-accent-purple"
                style={{
                  left: p.left,
                  bottom: '20%',
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Case / Reveal */}
        <motion.div
          style={{
            rotateX: reducedMotion ? 0 : rotateX,
            rotateY: reducedMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          animate={
            reducedMotion
              ? {}
              : phase === 'idle'
                ? { y: [0, -12, 0], rotateZ: [-2, 2, -2] }
                : phase === 'charging'
                  ? { scale: 1.08, y: -8 }
                  : phase === 'opening'
                    ? { scale: 1.15, y: -12, rotateZ: 4 }
                    : { scale: 0.9, opacity: 0 }
          }
          transition={
            phase === 'idle'
              ? { y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }, rotateZ: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
              : { type: 'spring', stiffness: 200, damping: 18 }
          }
          className="relative z-20 w-[55%] max-w-[280px]"
        >
          <AnimatePresence mode="wait">
            {showCase && (
              <motion.div
                key="case"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.85, rotateX: 20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <motion.div
                  animate={
                    phase === 'charging' || phase === 'opening'
                      ? { filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1.2)'] }
                      : {}
                  }
                  transition={{ duration: 0.6, repeat: phase === 'charging' ? Infinity : 0, repeatType: 'reverse' }}
                  className={`case-image-shadow relative ${phase === 'charging' || phase === 'opening' ? 'case-glow-intense' : 'case-glow-idle'}`}
                >
                  <Image
                    src={caseImage}
                    alt={caseName}
                    width={320}
                    height={280}
                    className="w-full h-auto drop-shadow-2xl"
                    priority
                  />
                  {phase === 'opening' && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className="absolute inset-x-[10%] top-[18%] h-[3px] bg-accent-magenta/80 origin-center"
                      style={{ boxShadow: '0 0 20px rgba(255,45,109,0.8)' }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )}

            {showReveal && (
              <motion.div
                key="reveal"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative case-reveal-burst"
              >
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-accent-magenta/60 bg-dark-panel">
                  <Image
                    src={revealedItem.image}
                    alt={revealedItem.name}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-4 font-black text-lg text-text-primary"
                >
                  {revealedItem.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-center text-sm text-accent-purple font-bold uppercase tracking-wider"
                >
                  {revealedItem.rarity}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Screen shake wrapper applied via class on parent when opening */}
      <AnimatePresence>
        {phase === 'opening' && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[100]"
            initial={{ x: 0 }}
            animate={{ x: [0, -4, 4, -3, 3, 0] }}
            transition={{ duration: 0.4 }}
            aria-hidden
          />
        )}
      </AnimatePresence>
    </div>
  )
}
