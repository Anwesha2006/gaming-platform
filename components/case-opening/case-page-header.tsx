'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Share2 } from 'lucide-react'
import { useState } from 'react'

export function CasePageHeader() {
  const [favorited, setFavorited] = useState(false)

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-purple transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <button
          onClick={() => setFavorited(!favorited)}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-magenta transition-colors"
        >
          <Star
            size={16}
            className={favorited ? 'fill-accent-gold text-accent-gold' : ''}
          />
          <span className="hidden sm:inline">Add to Favorite</span>
        </button>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg text-text-muted hover:text-accent-purple hover:bg-white/5 transition-colors"
        aria-label="Share"
      >
        <Share2 size={18} />
      </motion.button>
    </div>
  )
}
