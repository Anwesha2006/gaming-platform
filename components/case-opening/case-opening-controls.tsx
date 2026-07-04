'use client'

import { motion } from 'framer-motion'
import { Zap, Target, Shield } from 'lucide-react'
import { CTAButton } from '@/components/ui/cta-button'
import { useState } from 'react'

interface CaseOpeningControlsProps {
  price: number
  quantity: number
  onQuantityChange: (q: number) => void
  onOpen: () => void
  isOpening: boolean
  fastOpen?: boolean
  onFastOpenChange?: (value: boolean) => void
}

export function CaseOpeningControls({
  price,
  quantity,
  onQuantityChange,
  onOpen,
  isOpening,
  fastOpen: fastOpenProp,
  onFastOpenChange,
}: CaseOpeningControlsProps) {
  const [fastOpenLocal, setFastOpenLocal] = useState(false)
  const fastOpen = fastOpenProp ?? fastOpenLocal
  const setFastOpen = onFastOpenChange ?? setFastOpenLocal
  const total = price * quantity

  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-dark-panel/80 border border-white/10 backdrop-blur-sm">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((q) => (
            <motion.button
              key={q}
              onClick={() => onQuantityChange(q)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-11 h-11 rounded-lg font-bold text-sm transition-all
                ${quantity === q
                  ? 'bg-gradient-to-br from-accent-purple to-accent-magenta text-white shadow-lg shadow-accent-purple/30'
                  : 'bg-dark-base text-text-muted border border-white/10 hover:border-accent-purple/40'
                }
              `}
            >
              {q}
            </motion.button>
          ))}
        </div>

        <CTAButton
          label={`OPEN ${quantity} FOR ₿${total.toFixed(2)}`}
          onClick={onOpen}
          isLoading={isOpening}
          size="lg"
          className="sm:min-w-[240px]"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-text-muted">
        <button
          onClick={() => setFastOpen(!fastOpen)}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
            fastOpen
              ? 'border-accent-purple/50 text-accent-purple bg-accent-purple/10'
              : 'border-white/10 hover:border-accent-purple/30'
          }`}
        >
          <Zap size={14} />
          Fast Open
          <span
            className={`w-8 h-4 rounded-full relative transition-colors ${
              fastOpen ? 'bg-accent-purple' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                fastOpen ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </span>
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-accent-purple/30 hover:text-accent-purple transition-colors">
          <Target size={14} />
          Demo Spin
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-accent-purple/30 hover:text-accent-purple transition-colors">
          <Shield size={14} />
          Fairness
        </button>
      </div>
    </div>
  )
}
