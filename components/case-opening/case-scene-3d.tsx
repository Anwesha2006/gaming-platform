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
const MAX_TILT = 15

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

  const spotlightOffset = useTransform(mouseX, [-0.5, 0.5], [-24, 24])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || phase !== 'idle' || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(py * -MAX_TILT)
      rotateY.set(px * MAX_TILT)
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

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${12 + ((i * 37) % 76)}%`,
        delay: (i * 0.35) % 4,
        duration: 3 + (i % 3),
        size: 2 + (i % 3),
        drift: `${(i % 5) * 4 - 8}px`,
      })),
    [],
  )

  const showCase = phase === 'idle' || phase === 'charging' || phase === 'opening'
  const showReveal = phase === 'revealed' && revealedItem
  const isAnimating = phase === 'charging' || phase === 'opening'

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence>
        {(phase === 'opening' || phase === 'revealed') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'opening' ? 0.55 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="case-flash-overlay"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <div className="text-center mb-6 space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2">
          <motion.span
            animate={reducedMotion ? {} : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-accent-purple text-lg"
          >
            ◆
          </motion.span>
          <span className="text-sm font-semibold italic hero-tagline-gradient">
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

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={
          phase === 'opening' && !reducedMotion
            ? { x: [0, -5, 5, -4, 4, -2, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.45 }}
        className="case-stage relative aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <div
          className="case-floor-grid absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[40%] pointer-events-none"
          aria-hidden
        />

        <motion.div
          className="case-spotlight absolute bottom-[8%] left-1/2 w-[70%] h-[45%] pointer-events-none"
          style={{
            x: reducedMotion ? 0 : spotlightOffset,
            translateX: '-50%',
          }}
          aria-hidden
        />

        {!reducedMotion && (phase === 'idle' || phase === 'charging') && (
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
                  // @ts-expect-error CSS custom property
                  '--drift': p.drift,
                }}
              />
            ))}
          </div>
        )}

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
                ? { y: [0, -14, 0], rotateZ: [-3, 3, -3] }
                : phase === 'charging'
                  ? { scale: 1.06, y: -10 }
                  : phase === 'opening'
                    ? { scale: 1.12, y: -14, rotateZ: 5 }
                    : { scale: 0.85, opacity: 0 }
          }
          transition={
            phase === 'idle'
              ? {
                  y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  rotateZ: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }
              : { type: 'spring', stiffness: 200, damping: 18 }
          }
          className="relative z-20 w-[55%] max-w-[300px]"
        >
          <AnimatePresence mode="wait">
            {showCase && (
              <motion.div
                key="case"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 25 }}
                transition={{ duration: 0.55 }}
                className="relative"
              >
                <motion.div
                  animate={
                    isAnimating
                      ? {
                          filter: [
                            'brightness(1) saturate(1)',
                            'brightness(1.5) saturate(1.2)',
                            'brightness(1.25) saturate(1.1)',
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: phase === 'charging' ? Infinity : 0,
                    repeatType: 'reverse',
                  }}
                  className={`case-image-shadow relative ${
                    isAnimating ? 'case-glow-intense' : 'case-glow-idle'
                  }`}
                >
                  <Image
                    src={caseImage}
                    alt={caseName}
                    width={320}
                    height={280}
                    className="w-full h-auto"
                    priority
                  />

                  {phase === 'opening' && (
                    <>
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-x-[8%] top-[22%] h-[2px] bg-gradient-to-r from-transparent via-accent-magenta to-transparent origin-center"
                        style={{ boxShadow: '0 0 24px rgba(255,45,109,0.9)' }}
                      />
                      <motion.div
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: -75, y: -20, opacity: 0.6 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="absolute inset-x-[5%] top-0 h-[35%] origin-bottom"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="w-full h-full bg-gradient-to-b from-[#6b4528]/80 to-transparent rounded-t-lg border-t border-accent-gold/30" />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}

            {showReveal && (
              <motion.div
                key="reveal"
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="relative case-reveal-burst"
              >
                <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-accent-magenta/60 bg-dark-panel shadow-[0_0_40px_rgba(124,92,255,0.4)]">
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
                  transition={{ delay: 0.15 }}
                  className="text-center mt-4 font-black text-lg text-text-primary"
                >
                  {revealedItem.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-sm text-accent-purple font-bold uppercase tracking-wider"
                >
                  {revealedItem.rarity}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-sm coin-gold mt-1"
                >
                  ₿{revealedItem.price.toFixed(2)}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}
