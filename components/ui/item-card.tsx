'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from './badge'
import { PriceDisplay } from './price-display'
import { ProgressBar } from './progress-bar'
import { Lock, Zap } from 'lucide-react'

type RarityType = 'common' | 'rare' | 'epic' | 'legendary'

interface ItemCardProps {
  image: string
  title: string
  subtitle?: string
  price: number
  change?: number
  rarity?: RarityType
  isOnline?: boolean
  wear?: { min: number; max: number }
  onClickUtility?: (type: 'lock' | 'lightning') => void
  onClick?: () => void
  className?: string
}

const rarityMap: Record<RarityType, 'rare' | 'epic' | 'legendary'> = {
  common: 'rare',
  rare: 'rare',
  epic: 'epic',
  legendary: 'legendary',
}

export function ItemCard({
  image,
  title,
  subtitle,
  price,
  change,
  rarity = 'common',
  isOnline = false,
  wear,
  onClickUtility,
  onClick,
  className = '',
}: ItemCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group relative cursor-pointer rounded-lg overflow-hidden
        bg-dark-panel border border-white/5
        hover:border-accent-magenta/30 transition-all duration-300
        ${className}
      `}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 20px rgba(255, 45, 109, 0)',
      }}
    >
      {/* Hover Glow Border */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent-magenta/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{
          borderRadius: 'inherit',
        }}
      />

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-dark-base">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Glow Effect on Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-panel/50" />

        {/* Status Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
          {rarity && <Badge label={rarity} variant={rarityMap[rarity]} />}
          {isOnline && <Badge label="Online" variant="online" />}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 relative z-10">
        {/* Title & Subtitle */}
        <div>
          <h3 className="font-bold text-text-primary text-sm md:text-base truncate">{title}</h3>
          {subtitle && <p className="text-xs text-text-muted truncate">{subtitle}</p>}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <PriceDisplay price={price} change={change} />
        </div>

        {/* Wear Bar */}
        {wear && <ProgressBar value={wear.min} min={wear.min} max={wear.max} />}

        {/* Utility Icons */}
        <div className="flex gap-2 justify-end pt-1">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onClickUtility?.('lock')
            }}
            className="p-1 text-text-muted hover:text-accent-magenta transition-colors"
          >
            <Lock size={16} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onClickUtility?.('lightning')
            }}
            className="p-1 text-text-muted hover:text-accent-gold transition-colors"
          >
            <Zap size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
