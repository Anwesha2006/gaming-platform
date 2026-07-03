'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CTAButton } from '@/components/ui/cta-button'

const colors = ['red', 'red', 'black', 'red', 'black', 'black', 'red', 'gold']

export default function RoulettePage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [betAmount, setBetAmount] = useState(100)
  const [selectedColor, setSelectedColor] = useState<'red' | 'black' | 'gold' | null>(null)

  const handleSpin = () => {
    if (!selectedColor) return

    setIsSpinning(true)
    const newRotation = rotation + 360 * 5 + Math.random() * 360
    setRotation(newRotation)

    setTimeout(() => {
      setIsSpinning(false)
    }, 3000)
  }

  const colorMap = {
    red: 'from-red-600 to-red-500',
    black: 'from-slate-800 to-slate-700',
    gold: 'from-accent-gold to-yellow-500',
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Roulette</h1>
        <p className="text-text-muted mt-2">Spin the wheel and win big</p>
      </motion.div>

      {/* Main Game Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Center: Roulette */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Roulette Wheel */}
          <div className="flex justify-center">
            <div className="relative w-64 h-32 rounded-full overflow-hidden shadow-2xl">
              {/* Center Marker */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-10 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-accent-magenta" />

              {/* Roulette Strip */}
              <motion.div
                animate={isSpinning ? { x: [0, -9999] } : {}}
                transition={{ duration: 3, ease: 'easeInOut' }}
                className="flex h-full"
              >
                {[...Array(50)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-32 h-32 flex items-center justify-center text-white font-bold text-xl bg-gradient-to-b ${
                      colorMap[colors[i % colors.length] as keyof typeof colorMap]
                    }`}
                  >
                    {colors[i % colors.length].toUpperCase()[0]}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-4">
            <label className="text-sm text-text-muted block">Select Color</label>
            <div className="grid grid-cols-3 gap-3">
              {(['red', 'black', 'gold'] as const).map((color) => (
                <motion.button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    py-3 rounded-lg font-bold capitalize transition-all
                    ${
                      selectedColor === color
                        ? `bg-gradient-to-b ${colorMap[color]} text-white shadow-lg`
                        : 'bg-dark-panel border border-white/10 text-text-muted hover:border-white/30'
                    }
                  `}
                  disabled={isSpinning}
                >
                  {color}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bet Amount */}
          <div className="space-y-3">
            <label className="text-sm text-text-muted block">Bet Amount</label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-dark-base text-text-primary rounded-lg px-4 py-3 border border-white/10 focus:border-accent-magenta outline-none transition-colors"
              disabled={isSpinning}
            />
          </div>

          {/* Spin Button */}
          <CTAButton
            label={isSpinning ? 'SPINNING...' : 'SPIN ROULETTE'}
            onClick={handleSpin}
            isLoading={isSpinning}
            disabled={isSpinning || !selectedColor || betAmount <= 0}
            size="lg"
            className="w-full"
          />
        </motion.div>

        {/* Right: Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Win Rate */}
          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <h3 className="font-bold text-text-primary">Your Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Total Spins</span>
                <span className="font-bold text-text-primary">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Wins</span>
                <span className="font-bold text-accent-neon">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Win Rate</span>
                <span className="font-bold text-accent-magenta">57.1%</span>
              </div>
            </div>
          </div>

          {/* Color Stats */}
          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-3">
            <h3 className="font-bold text-text-primary text-sm">Last 5 Spins</h3>
            <div className="flex gap-2">
              {['red', 'black', 'gold', 'red', 'black'].map((color, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 h-12 rounded-lg bg-gradient-to-b ${colorMap[color as keyof typeof colorMap]}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
