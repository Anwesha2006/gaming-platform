'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface PriceDisplayProps {
  price: number
  change?: number
  className?: string
  showCoin?: boolean
}

export function PriceDisplay({ price, change, className = '', showCoin = true }: PriceDisplayProps) {
  const changeColor = change && change > 0 ? 'text-accent-neon' : change && change < 0 ? 'text-red-400' : 'text-text-muted'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showCoin && <div className="text-accent-gold text-lg">₿</div>}
      <motion.span
        className="coin-gold text-lg md:text-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {price.toFixed(2)}
      </motion.span>
      {change !== undefined && (
        <span className={`text-xs md:text-sm font-medium ${changeColor}`}>
          {change > 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      )}
    </div>
  )
}
