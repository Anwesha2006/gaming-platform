'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type StatItem = {
  label: string
  value: number
  prefix?: string
  suffix?: string
}

const STATS: StatItem[] = [
  { label: 'Active Players', value: 284000, suffix: '+' },
  { label: 'Tournaments Hosted', value: 1250, suffix: '+' },
  { label: 'Total Prize Pool', value: 48, prefix: '$', suffix: 'M' },
  { label: 'Creators Onboarded', value: 3200, suffix: '+' },
]

function formatStatValue(count: number, stat: StatItem) {
  if (stat.suffix === 'M') return `${stat.prefix ?? ''}${count}${stat.suffix}`
  if (stat.value >= 10000) return `${Math.round(count / 1000)}K${stat.suffix ?? ''}`
  return `${stat.prefix ?? ''}${count.toLocaleString()}${stat.suffix ?? ''}`
}

function AnimatedCounter({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let frame: number
    const duration = 2000
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * stat.value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, stat.value])

  return (
    <span className="tabular-nums">
      {formatStatValue(count, stat)}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-20 border-y border-white/5 bg-dark-panel/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 via-transparent to-accent-magenta/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-black tracking-[0.3em] text-accent-purple mb-12"
        >
          BY THE NUMBERS
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-text-primary via-accent-purple to-accent-magenta bg-clip-text text-transparent">
                <AnimatedCounter stat={stat} inView={inView} />
              </div>
              <p className="text-xs lg:text-sm text-text-muted font-semibold tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
