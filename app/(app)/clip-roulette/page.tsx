'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealPanel } from '@/components/ui/reveal-panel'
import { ItemCard } from '@/components/ui/item-card'

const mockClips = [
  {
    id: '1',
    title: 'Epic CS2 Ace',
    game: 'Counter-Strike 2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip1',
    price: 125.50,
    views: '2.3M',
    duration: '0:42',
    rarity: 'legendary' as const,
  },
  {
    id: '2',
    title: 'Insane Clutch',
    game: 'CS2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip2',
    price: 89.99,
    views: '1.8M',
    duration: '1:05',
    rarity: 'epic' as const,
  },
  {
    id: '3',
    title: 'Smoke Grenade Play',
    game: 'Counter-Strike 2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip3',
    price: 45.00,
    views: '892K',
    duration: '0:38',
    rarity: 'rare' as const,
  },
  {
    id: '4',
    title: 'Wallbang Shot',
    game: 'CS2',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip4',
    price: 156.25,
    views: '3.1M',
    duration: '0:25',
    rarity: 'legendary' as const,
  },
]

export default function ClipRoulettePage() {
  const [quantity, setQuantity] = useState(1)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealedItem, setRevealedItem] = useState<{
    name: string
    rarity: string
  } | null>(null)
  const [activeTab, setActiveTab] = useState<'clips' | 'saved'>('clips')

  const handleReveal = () => {
    setIsRevealing(true)
    setRevealedItem(null)

    setTimeout(() => {
      const randomClip = mockClips[Math.floor(Math.random() * mockClips.length)]
      setRevealedItem({
        name: randomClip.title,
        rarity: randomClip.game,
      })
      setIsRevealing(false)
    }, 2000)
  }

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary">Clip-Roulette</h1>
        <p className="text-text-muted mt-2">Discover amazing gaming clips and earn rewards</p>
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Reveal Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <RevealPanel
            title="Spin for Gaming Clips"
            image="https://api.dicebear.com/7.x/avataaars/svg?seed=cliproulette"
            price={50.0}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onReveal={handleReveal}
            isRevealing={isRevealing}
            revealedItem={revealedItem || undefined}
          />
        </motion.div>

        {/* Right: Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <h3 className="font-bold text-text-primary">How It Works</h3>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">1</span>
                <span>Spin to get random clips</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">2</span>
                <span>Earn rewards based on rarity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent-magenta font-bold">3</span>
                <span>Save clips to your collection</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-2">
            <p className="text-sm text-text-muted">Curated from top players</p>
            <p className="text-xs text-text-muted">
              All clips are verified authentic and feature legendary plays from competitive gaming.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Clips Section with Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {/* Tabs */}
        <div className="flex gap-2 border-b border-white/10">
          {(['clips', 'saved'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              className={`
                px-4 py-3 font-semibold text-sm capitalize transition-all border-b-2
                ${
                  activeTab === tab
                    ? 'border-accent-magenta text-accent-magenta'
                    : 'border-transparent text-text-muted hover:text-text-primary'
                }
              `}
            >
              {tab === 'clips' ? 'Recent Spins' : 'Saved Clips'}
            </motion.button>
          ))}
        </div>

        {/* Clips Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {mockClips.map((clip) => (
            <motion.div key={clip.id} whileHover={{ y: -4 }}>
              <div className="rounded-lg overflow-hidden bg-dark-panel border border-white/10 hover:border-accent-magenta/30 transition-all group cursor-pointer">
                {/* Clip Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={clip.image}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-panel/50" />

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-dark-base/80 text-xs font-bold text-text-primary">
                    {clip.duration}
                  </div>

                  {/* Play Button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent-magenta/80 flex items-center justify-center text-white">
                      ▶
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div>
                    <h4 className="font-bold text-text-primary text-sm truncate">{clip.title}</h4>
                    <p className="text-xs text-text-muted">{clip.game}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">{clip.views} views</span>
                    <span className="font-bold text-accent-gold">₿{clip.price.toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 rounded-lg bg-accent-magenta text-white font-bold text-xs hover:bg-accent-magenta/90 transition-colors"
                  >
                    {activeTab === 'saved' ? 'Remove' : 'Save'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  )
}
