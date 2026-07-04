'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { BLUR_PLACEHOLDER, LANDING_IMAGES } from '@/lib/landing-images'

function useParallaxLayer(motionX: MotionValue<number>, motionY: MotionValue<number>, depth: number) {
  const x = useTransform(motionX, [-1, 1], [-depth, depth])
  const y = useTransform(motionY, [-1, 1], [-depth, depth])
  return { x, y }
}

function FeaturedCard({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 260, damping: 28 })
  const rotateY = useSpring(0, { stiffness: 260, damping: 28 })
  const { x: cardX, y: cardY } = useParallaxLayer(mouseX, mouseY, 18)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(py * -16)
      rotateY.set(px * 16)
    },
    [rotateX, rotateY],
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div style={{ x: cardX, y: cardY }} className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-br from-accent-purple/30 via-accent-magenta/15 to-transparent rounded-3xl blur-3xl opacity-70 will-change-transform" />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          willChange: 'transform',
        }}
        className="relative rounded-2xl overflow-hidden border border-accent-purple/40 bg-dark-panel/60 backdrop-blur-xl hero-card-float"
      >
        <div className="inline-block m-6 mb-0 px-3 py-1 rounded-full bg-accent-purple/30 text-accent-purple text-xs font-black tracking-wider">
          FEATURED
        </div>

        <div className="relative w-full h-80 mt-4 overflow-hidden">
          <Image
            src={LANDING_IMAGES.arenaHero}
            alt="Arena Protocol Season 7 — cat-helmet operator"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center scale-105 will-change-transform"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-base/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-magenta/10" />
        </div>

        <div className="relative p-6 pt-4 space-y-1">
          <h3 className="font-black text-lg text-text-primary">Arena Protocol</h3>
          <p className="text-sm text-accent-purple font-bold">Season 7</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ChampionshipCard({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const { x, y } = useParallaxLayer(mouseX, mouseY, 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative group"
      style={{ x, y }}
    >
      <div className="absolute -right-8 -top-8 w-48 h-48 opacity-20 pointer-events-none will-change-transform">
        <Image
          src={LANDING_IMAGES.trophy}
          alt=""
          fill
          sizes="192px"
          className="object-contain trophy-glow-accent"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          loading="lazy"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 to-transparent rounded-xl blur-2xl group-hover:blur-3xl transition-all" />
      <div className="relative rounded-xl border border-accent-purple/30 bg-dark-panel/60 backdrop-blur-xl p-5 flex gap-4 group-hover:border-accent-purple/60 transition-colors overflow-hidden">
        <div className="flex-1 space-y-2 relative z-10">
          <div className="text-xs font-black text-accent-neon tracking-wider">⚡ LIVE NOW</div>
          <h4 className="font-black text-text-primary text-sm">NEXUS CHAMPIONSHIP SERIES</h4>
          <p className="text-xs text-text-muted leading-relaxed">Elite squads. One ultimate prize.</p>
          <Link
            href="#"
            className="text-xs text-accent-purple hover:text-accent-magenta font-black inline-flex items-center gap-1 mt-3 transition-colors"
          >
            Watch Live <ArrowRight size={12} />
          </Link>
        </div>

        <div className="relative w-24 h-24 flex-shrink-0 z-10">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src={LANDING_IMAGES.trophy}
              alt="Nexus Championship trophy"
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_0_20px_rgba(124,92,255,0.6)]"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function CreatorCard({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const { x, y } = useParallaxLayer(mouseX, mouseY, 14)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative group"
      style={{ x, y }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-magenta/30 to-transparent rounded-xl blur-2xl group-hover:blur-3xl transition-all" />
      <div className="relative rounded-xl border border-accent-magenta/30 bg-dark-panel/60 backdrop-blur-xl p-5 flex gap-4 group-hover:border-accent-magenta/60 transition-colors">
        <div className="flex-1 space-y-2">
          <div className="text-xs font-black text-accent-magenta tracking-wider">⚡ CREATOR SPOTLIGHT</div>
          <h4 className="font-black text-text-primary text-sm">RIFTWALKER</h4>
          <p className="text-xs text-text-muted leading-relaxed">Strategy. Skills. Relentless.</p>
          <Link
            href="#"
            className="text-xs text-accent-magenta hover:text-accent-purple font-black inline-flex items-center gap-1 mt-3 transition-colors"
          >
            View Profile <ArrowRight size={12} />
          </Link>
        </div>

        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 duotone-purple">
          <Image
            src={LANDING_IMAGES.riftwalker}
            alt="Riftwalker — creator spotlight"
            fill
            sizes="96px"
            className="object-cover object-[center_20%]"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleSectionMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY],
  )

  const handleSectionMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  const { x: textX, y: textY } = useParallaxLayer(mouseX, mouseY, 24)
  const { x: bgX, y: bgY } = useParallaxLayer(mouseX, mouseY, 8)
  const bgX2 = useTransform(bgX, (v) => v * -0.5)
  const bgY2 = useTransform(bgY, (v) => v * -0.5)

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative px-6 py-12 lg:px-12 lg:py-20 overflow-hidden"
    >
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent-purple/20 blur-[100px] pointer-events-none will-change-transform"
        aria-hidden
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-magenta/10 blur-[120px] pointer-events-none will-change-transform"
        aria-hidden
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ x: textX, y: textY }}
          className="space-y-8 pt-6 relative"
        >
          <motion.div
            className="hero-drift-blob absolute -top-16 -left-20 w-72 h-72 rounded-full pointer-events-none will-change-transform"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />

          <div className="flex gap-6 items-stretch relative z-10">
            <motion.div
              className="w-1.5 flex-shrink-0 bg-gradient-to-b from-accent-purple via-accent-magenta to-accent-purple rounded-full"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ transformOrigin: 'top' }}
            />
            <div className="flex flex-col gap-6 lg:gap-8 min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-black italic leading-tight text-balance"
              >
                PLAY BEYOND
                <br />
                THE LIMIT.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col gap-4 leading-[1.6]"
              >
                <p className="text-lg lg:text-xl font-semibold tracking-wide hero-tagline-gradient">
                  Your universe.
                </p>
                <Link
                  href="/login"
                  className="hero-tagline-cta group inline-flex items-center gap-2.5 w-fit"
                >
                  <span className="text-lg lg:text-xl font-semibold tracking-wide hero-tagline-gradient">
                    Your victory.
                  </span>
                  <ArrowRight
                    size={20}
                    className="text-accent-magenta flex-shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:drop-shadow-[0_0_10px_rgba(255,45,109,0.55)]"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <FeaturedCard mouseX={mouseX} mouseY={mouseY} />

          <div className="space-y-4 relative">
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.12] pointer-events-none hidden lg:block will-change-transform">
              <Image
                src={LANDING_IMAGES.trophy}
                alt=""
                fill
                sizes="256px"
                className="object-contain trophy-glow-accent"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                loading="lazy"
                aria-hidden
              />
            </div>

            <ChampionshipCard mouseX={mouseX} mouseY={mouseY} />
            <CreatorCard mouseX={mouseX} mouseY={mouseY} />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
        className="fixed bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-magenta flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl z-50"
      >
        <ArrowRight size={24} className="rotate-45 text-text-primary" />
      </motion.div>
    </section>
  )
}
