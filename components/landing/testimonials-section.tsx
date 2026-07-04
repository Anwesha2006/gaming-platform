'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Testimonial = {
  quote: string
  name: string
  tag: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Nexus turned scrims into a real career path. The tournament infra is unmatched.',
    name: 'ShadowNova',
    tag: 'VALORANT',
    avatar: 'SN',
  },
  {
    quote: 'From zero viewers to partner in 8 months. The creator tools actually work.',
    name: 'PixelDrift',
    tag: 'APEX LEGENDS',
    avatar: 'PD',
  },
  {
    quote: 'Best prize pool transparency I have seen. Every bracket, every payout — on chain.',
    name: 'HexMancer',
    tag: 'CS2',
    avatar: 'HM',
  },
  {
    quote: 'The community events feel like LAN without leaving home. Pure adrenaline.',
    name: 'VoltRift',
    tag: 'FORTNITE',
    avatar: 'VR',
  },
  {
    quote: 'Arena Protocol Season 7 is the most polished competitive experience out there.',
    name: 'CatOps_32',
    tag: 'ARENA PROTOCOL',
    avatar: 'C3',
  },
]

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="testimonial-card flex-shrink-0 w-[320px] lg:w-[360px] rounded-xl border border-accent-purple/30 bg-dark-panel/80 backdrop-blur-xl p-6 space-y-4">
      <p className="text-sm text-text-primary leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-magenta flex items-center justify-center text-xs font-black text-text-primary">
          {item.avatar}
        </div>
        <div>
          <div className="text-sm font-black text-text-primary">{item.name}</div>
          <div className="text-xs text-accent-purple font-bold tracking-wider">{item.tag}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section ref={ref} className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent-purple/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <p className="text-sm font-black tracking-[0.3em] text-accent-magenta">COMMUNITY VOICES</p>
          <h2 className="text-3xl lg:text-4xl font-black italic">WHAT PLAYERS SAY</h2>
        </motion.div>
      </div>

      <div className="relative z-10 testimonial-mask">
        <div className="testimonial-track flex gap-6 w-max pl-6">
          {doubled.map((item, i) => (
            <TestimonialCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
