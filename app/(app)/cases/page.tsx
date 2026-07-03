'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealPanel } from '@/components/ui/reveal-panel'
import { ItemCard } from '@/components/ui/item-card'
import { useGameStateStore } from '@/lib/store/game-state-store'
import { useUserStore } from '@/lib/store/user-store'

const mockCaseItems = [
  {
    id: '1',
    name: 'Sapphire Bayonet',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sapphire',
    rarity: 'legendary' as const,
    price: 4543.63,
    wear: { min: 0.02, max: 0.03 },
    change: 11.5,
  },
  {
    id: '2',
    name: 'Emerald Knife',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emerald',
    rarity: 'epic' as const,
    price: 26932.83,
    wear: { min: 0.03, max: 0.04 },
    change: 8.2,
  },
  {
    id: '3',
    name: 'Gold Sticker',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gold',
    rarity: 'rare' as const,
    price: 1200.50,
    wear: { min: 0.01, max: 0.02 },
    change: -2.3,
  },
  {
    id: '4',
    name: 'Zirka Skin',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zirka',
    rarity: 'epic' as const,
    price: 5432.15,
    wear: { min: 0.02, max: 0.05 },
    change: 5.1,
  },
]

export default function CasesPage() {
  const [quantity, setQuantity] = useState(1)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealedItem, setRevealedItem] = useState<{
    name: string
    rarity: string
  } | null>(null)

  const currentCase = useGameStateStore((state) => state.currentCase)
  const updateBalance = useUserStore((state) => state.updateBalance)

  const handleReveal = () => {
    setIsRevealing(true)
    setRevealedItem(null)

    // Simulate reveal animation
    setTimeout(() => {
      const randomItem = mockCaseItems[Math.floor(Math.random() * mockCaseItems.length)]
      setRevealedItem({
        name: randomItem.name,
        rarity: randomItem.rarity,
      })

      // Deduct balance
      const totalCost = (currentCase?.price || 0) * quantity
      updateBalance(-totalCost)

      setIsRevealing(false)
    }, 2000)
  }

  if (!currentCase) return <div>Loading...</div>

  return (
    <div className="space-y-8">
      {/* Main Content Area - Case Opening Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <RevealPanel
          title={currentCase.name}
          image={currentCase.image}
          price={currentCase.price}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onReveal={handleReveal}
          isRevealing={isRevealing}
          revealedItem={revealedItem || undefined}
        />
      </motion.div>

      {/* Found in this Case Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📦</span>
          <h2 className="text-2xl font-bold text-text-primary">Found in this Case</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockCaseItems.map((item) => (
            <motion.div key={item.id} whileHover={{ y: -4 }}>
              <ItemCard
                image={item.image}
                title={item.name}
                price={item.price}
                change={item.change}
                rarity={item.rarity}
                wear={item.wear}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
