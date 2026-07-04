'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Lock, Zap, BadgeCheck, MousePointer2 } from 'lucide-react'
import { PriceDisplay } from '@/components/ui/price-display'
import { ProgressBar } from '@/components/ui/progress-bar'

export type LootRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface LootItem {
  id: string
  name: string
  image: string
  rarity: LootRarity
  price: number
  change?: number
  wear?: { min: number; max: number }
  isHighlighted?: boolean
}

const rarityStyles: Record<
  LootRarity,
  { border: string; glow: string; badge: string }
> = {
  common: {
    border: 'border-white/10',
    glow: 'shadow-none',
    badge: 'text-text-muted',
  },
  rare: {
    border: 'border-blue-500/40',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    badge: 'text-blue-400',
  },
  epic: {
    border: 'border-accent-purple/50',
    glow: 'shadow-[0_0_24px_rgba(124,92,255,0.25)]',
    badge: 'text-accent-purple',
  },
  legendary: {
    border: 'border-accent-magenta/60',
    glow: 'shadow-[0_0_30px_rgba(255,45,109,0.35)]',
    badge: 'text-accent-magenta',
  },
}

export function LootItemCard({ item }: { item: LootItem }) {
  const style = rarityStyles[item.rarity]
  const highlighted = item.isHighlighted

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`
        group relative rounded-xl overflow-hidden bg-dark-panel border
        transition-all duration-300
        ${style.border} ${style.glow}
        ${highlighted ? 'loot-card-highlight border-accent-magenta/70' : ''}
      `}
    >
      {highlighted && (
        <div className="absolute -left-px top-4 bottom-4 w-1 bg-gradient-to-b from-accent-purple via-accent-magenta to-accent-purple rounded-full z-10" />
      )}

      {/* Rarity top glow */}
      <div
        className={`absolute top-0 inset-x-0 h-1 ${
          item.rarity === 'legendary'
            ? 'bg-gradient-to-r from-accent-purple via-accent-magenta to-accent-purple'
            : item.rarity === 'epic'
              ? 'bg-accent-purple/80'
              : item.rarity === 'rare'
                ? 'bg-blue-500/80'
                : 'bg-white/20'
        }`}
      />

      <div className="relative h-36 sm:h-40 bg-dark-base flex items-center justify-center overflow-hidden">
        <div
          className={`absolute inset-0 opacity-30 ${
            item.rarity === 'legendary'
              ? 'bg-[radial-gradient(circle_at_center,rgba(255,45,109,0.4),transparent_70%)]'
              : item.rarity === 'epic'
                ? 'bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.35),transparent_70%)]'
                : item.rarity === 'rare'
                  ? 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]'
                  : ''
          }`}
        />
        <Image
          src={item.image}
          alt={item.name}
          width={120}
          height={120}
          className="relative z-10 object-contain max-h-[80%] group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {highlighted && (
          <motion.div
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-2 right-2 z-20 text-white/80"
          >
            <MousePointer2 size={18} className="drop-shadow-lg" />
          </motion.div>
        )}
      </div>

      <div className="p-3 sm:p-4 space-y-2 relative z-10">
        <div>
          <h3 className="font-bold text-sm text-text-primary truncate">{item.name}</h3>
          {item.wear && (
            <p className="text-[10px] sm:text-xs text-text-muted mt-0.5">
              FN {item.wear.min.toFixed(2)} – {item.wear.max.toFixed(2)}
            </p>
          )}
        </div>

        <PriceDisplay price={item.price} change={item.change} className="text-sm" />

        {item.wear && (
          <ProgressBar value={item.wear.min} min={0} max={1} className="h-1" />
        )}

        <div className="flex items-center justify-end gap-1.5 pt-1">
          <button className="p-1 text-text-muted hover:text-accent-purple transition-colors" aria-label="Verified">
            <BadgeCheck size={14} />
          </button>
          <button className="p-1 text-text-muted hover:text-accent-purple transition-colors" aria-label="Lock">
            <Lock size={14} />
          </button>
          <button className="p-1 text-text-muted hover:text-accent-gold transition-colors" aria-label="Instant">
            <Zap size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
