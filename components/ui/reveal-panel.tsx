'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Eye } from 'lucide-react'
import { CTAButton } from './cta-button'
import { PriceDisplay } from './price-display'

interface RevealPanelProps {
  title: string
  image: string
  price: number
  quantity: number
  onQuantityChange: (quantity: number) => void
  onReveal: () => void
  isRevealing?: boolean
  revealedItem?: { name: string; rarity: string }
  className?: string
}

export function RevealPanel({
  title,
  image,
  price,
  quantity,
  onQuantityChange,
  onReveal,
  isRevealing = false,
  revealedItem,
  className = '',
}: RevealPanelProps) {
  const totalPrice = price * quantity

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero Image with Glow */}
      <motion.div
        className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-dark-panel border border-white/10 group"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Ambient Glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-accent-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{title}</h2>
        <p className="text-sm text-text-muted">Open for</p>
        <PriceDisplay price={price} className="justify-center text-xl" />
      </div>

      {/* Quantity Selector */}
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4].map((q) => (
          <motion.button
            key={q}
            onClick={() => onQuantityChange(q)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-12 h-12 rounded-lg font-bold transition-all duration-200
              ${quantity === q
                ? 'bg-accent-magenta text-white shadow-lg shadow-accent-magenta/50'
                : 'bg-dark-panel text-text-muted border border-white/10 hover:border-accent-magenta/50'
              }
            `}
          >
            {q}
          </motion.button>
        ))}
      </div>

      {/* Total Price */}
      <div className="text-center">
        <p className="text-sm text-text-muted mb-1">Total</p>
        <PriceDisplay price={totalPrice} className="justify-center text-2xl" />
      </div>

      {/* Primary Action Button */}
      <CTAButton
        label={`OPEN ${quantity} FOR ₿${totalPrice.toFixed(2)}`}
        onClick={onReveal}
        isLoading={isRevealing}
        size="lg"
        className="w-full"
      />

      {/* Utility Toggles */}
      <div className="flex gap-2 justify-center text-xs">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-panel border border-white/10 text-text-muted hover:text-accent-gold transition-colors"
        >
          <Zap size={14} />
          Fast Open
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-panel border border-white/10 text-text-muted hover:text-accent-magenta transition-colors"
        >
          <Eye size={14} />
          Demo Spin
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-panel border border-white/10 text-text-muted hover:text-accent-neon transition-colors"
        >
          <span>🔐</span>
          Fairness
        </motion.button>
      </div>

      {/* Revealed Item Display */}
      {revealedItem && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-lg bg-gradient-to-br from-accent-magenta/10 to-accent-purple/10 border border-accent-magenta/30 text-center"
        >
          <p className="text-sm text-text-muted">You revealed</p>
          <p className="text-lg font-bold text-text-primary mt-1">{revealedItem.name}</p>
          <p className="text-xs text-accent-magenta mt-1">{revealedItem.rarity}</p>
        </motion.div>
      )}
    </div>
  )
}
