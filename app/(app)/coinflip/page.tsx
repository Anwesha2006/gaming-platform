'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CTAButton } from '@/components/ui/cta-button'

export default function CoinflipPage() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [betAmount, setBetAmount] = useState(100)

  const handleFlip = () => {
    setIsFlipping(true)
    setResult(null)

    setTimeout(() => {
      setResult(Math.random() > 0.5 ? 'heads' : 'tails')
      setIsFlipping(false)
    }, 2000)
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Coinflip</h1>
        <p className="text-text-muted mt-2">50/50 chance to double your bet</p>
      </motion.div>

      {/* Main Game Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Center: Coin Flip Game */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Coin Container */}
          <div className="flex justify-center">
            <motion.div
              animate={isFlipping ? { rotateY: [0, 1800] } : {}}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="w-48 h-48 rounded-full bg-gradient-to-br from-accent-gold to-yellow-600 shadow-2xl shadow-accent-gold/50 flex items-center justify-center cursor-pointer"
              onClick={handleFlip}
              style={{
                perspective: '1000px',
              }}
            >
              <motion.div className="text-6xl font-black text-dark-base">
                {result === 'heads' ? '🪙' : result === 'tails' ? '🪙' : '?'}
              </motion.div>
            </motion.div>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-2"
            >
              <p className="text-2xl font-bold text-accent-gold capitalize">{result}!</p>
              <p className="text-text-muted">You won ₿{(betAmount * 2).toFixed(2)}</p>
            </motion.div>
          )}

          {/* Bet Controls */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-text-muted block mb-2">Bet Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0)}
                  className="flex-1 bg-dark-base text-text-primary rounded-lg px-4 py-3 border border-white/10 focus:border-accent-magenta outline-none transition-colors"
                  disabled={isFlipping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 rounded-lg bg-dark-panel border border-white/10 text-text-muted hover:text-accent-magenta transition-colors"
                  disabled={isFlipping}
                >
                  1/2
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 rounded-lg bg-dark-panel border border-white/10 text-text-muted hover:text-accent-magenta transition-colors"
                  disabled={isFlipping}
                >
                  2x
                </motion.button>
              </div>
            </div>

            <CTAButton
              label={isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
              onClick={handleFlip}
              isLoading={isFlipping}
              disabled={isFlipping || betAmount <= 0}
              size="lg"
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Right: Recent Games */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4"
        >
          <h3 className="font-bold text-text-primary text-lg">Recent Flips</h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-dark-base border border-white/5"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-gold to-yellow-600 flex items-center justify-center text-sm">
                    {Math.random() > 0.5 ? 'H' : 'T'}
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">
                      {Math.random() > 0.5 ? 'Won' : 'Lost'} ₿{(Math.random() * 500 + 50).toFixed(2)}
                    </p>
                    <p className="text-xs text-text-muted opacity-70">2 min ago</p>
                  </div>
                </div>
                <div className={`text-xs font-bold ${Math.random() > 0.5 ? 'text-accent-neon' : 'text-red-400'}`}>
                  {Math.random() > 0.5 ? '+' : '-'}₿{(Math.random() * 500 + 50).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
