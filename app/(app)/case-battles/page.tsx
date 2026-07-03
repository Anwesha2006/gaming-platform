'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ItemCard } from '@/components/ui/item-card'
import { Badge } from '@/components/ui/badge'
import { useGameStateStore } from '@/lib/store/game-state-store'

export default function CaseBattlesPage() {
  const [filter, setFilter] = useState<'active' | 'my' | 'completed'>('active')
  const battles = useGameStateStore((state) => state.battles)

  const mockBattleCards = battles.map((battle) => ({
    id: battle.id,
    title: `Battle ${battle.id}`,
    subtitle: `${battle.players.length} players`,
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + battle.id,
    price: battle.entryPrice,
    change: undefined,
    rarity: 'common' as const,
    isOnline: battle.status === 'open',
  }))

  const filters = [
    { label: 'Active', value: 'active' as const },
    { label: 'My Battles', value: 'my' as const },
    { label: 'Completed', value: 'completed' as const },
  ]

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Case Battles</h1>
        <p className="text-text-muted mt-2">Compete with other players and win big prizes</p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 overflow-x-auto pb-2"
      >
        {filters.map((f) => (
          <motion.button
            key={f.value}
            onClick={() => setFilter(f.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all
              ${
                filter === f.value
                  ? 'bg-accent-magenta text-white shadow-lg shadow-accent-magenta/30'
                  : 'bg-dark-panel text-text-muted border border-white/10 hover:border-accent-magenta/30'
              }
            `}
          >
            {f.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Battles Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {mockBattleCards.map((battle, idx) => (
          <motion.div
            key={battle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
            className="group rounded-lg overflow-hidden bg-dark-panel border border-white/10 hover:border-accent-magenta/30 transition-all cursor-pointer hover:shadow-xl hover:shadow-accent-magenta/10"
          >
            {/* Battle Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={battle.image}
                alt={battle.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-panel/50" />

              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <Badge
                  label={battle.isOnline ? 'Open' : 'Full'}
                  variant={battle.isOnline ? 'online' : 'default'}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-text-primary truncate">{battle.title}</h3>
                <p className="text-xs text-text-muted mt-1">{battle.subtitle}</p>
              </div>

              {/* Entry Cost */}
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <span className="text-xs text-text-muted">Entry</span>
                <div className="flex items-center gap-1">
                  <span className="text-accent-gold">₿</span>
                  <span className="font-bold text-text-primary">{battle.price.toFixed(0)}</span>
                </div>
              </div>

              {/* Join Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 rounded-lg bg-accent-magenta text-white font-bold text-sm hover:bg-accent-magenta/90 transition-colors"
              >
                Join Battle
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {mockBattleCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 space-y-4"
        >
          <p className="text-text-muted text-lg">No battles found in this category</p>
          <p className="text-text-muted text-sm">Try selecting a different filter or create a new battle</p>
        </motion.div>
      )}
    </div>
  )
}
