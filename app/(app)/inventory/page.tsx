'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ItemCard } from '@/components/ui/item-card'
import { useInventoryStore } from '@/lib/store/inventory-store'

const sortOptions = [
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Recently Added', value: 'recent' },
  { label: 'Rarity', value: 'rarity' },
]

const rarityFilters = [
  { label: 'All Items', value: 'all' },
  { label: 'Common', value: 'common' },
  { label: 'Rare', value: 'rare' },
  { label: 'Epic', value: 'epic' },
  { label: 'Legendary', value: 'legendary' },
]

export default function InventoryPage() {
  const [sort, setSort] = useState('price-desc')
  const [rarityFilter, setRarityFilter] = useState('all')
  const items = useInventoryStore((state) => state.items)
  const total = useInventoryStore((state) => state.getTotal())

  const filteredItems =
    rarityFilter === 'all' ? items : items.filter((item) => item.rarity === rarityFilter)

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary">My Inventory</h1>
          <p className="text-text-muted mt-2">{items.length} items in your collection</p>
        </div>

        {/* Total Value Card */}
        <div className="rounded-lg bg-gradient-to-br from-accent-magenta/10 to-accent-purple/10 border border-accent-magenta/30 p-6">
          <p className="text-sm text-text-muted mb-2">Total Inventory Value</p>
          <p className="text-3xl md:text-4xl font-black text-text-primary">
            ₿{total.toFixed(2)}
          </p>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Rarity Filter */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted block">Filter by Rarity</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {rarityFilters.map((filter) => (
              <motion.button
                key={filter.value}
                onClick={() => setRarityFilter(filter.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all
                  ${
                    rarityFilter === filter.value
                      ? 'bg-accent-magenta text-white shadow-lg shadow-accent-magenta/30'
                      : 'bg-dark-panel text-text-muted border border-white/10 hover:border-accent-magenta/30'
                  }
                `}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-lg bg-dark-panel text-text-primary border border-white/10 focus:border-accent-magenta outline-none transition-colors text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              whileHover={{ y: -4 }}
            >
              <ItemCard
                image={item.image}
                title={item.name}
                subtitle={`Acquired ${new Date(item.acquiredAt).toLocaleDateString()}`}
                price={item.price}
                rarity={item.rarity}
                wear={item.wear}
              />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-text-muted">No items found in this category</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
