'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { CasePageHeader } from '@/components/case-opening/case-page-header'
import { CaseScene3D, type CaseRevealPhase } from '@/components/case-opening/case-scene-3d'
import { CaseOpeningControls } from '@/components/case-opening/case-opening-controls'
import { LootItemCard } from '@/components/case-opening/loot-item-card'
import { useGameStateStore } from '@/lib/store/game-state-store'
import { useUserStore } from '@/lib/store/user-store'
import { TYCOON_LOOT, pickRandomLoot } from '@/lib/case-loot'
import type { RevealedLoot } from '@/components/case-opening/case-scene-3d'

const PHASE_TIMING = {
  charging: 600,
  opening: 900,
  revealedHold: 3500,
}

export default function CasesPage() {
  const [quantity, setQuantity] = useState(1)
  const [phase, setPhase] = useState<CaseRevealPhase>('idle')
  const [revealedItem, setRevealedItem] = useState<RevealedLoot | null>(null)
  const [fastOpen, setFastOpen] = useState(false)

  const currentCase = useGameStateStore((state) => state.currentCase)
  const updateBalance = useUserStore((state) => state.updateBalance)

  const resetReveal = useCallback(() => {
    setPhase('idle')
    setRevealedItem(null)
  }, [])

  const handleOpen = useCallback(() => {
    if (!currentCase || phase !== 'idle') return

    const totalCost = currentCase.price * quantity
    updateBalance(-totalCost)

    const won = pickRandomLoot()
    const loot: RevealedLoot = {
      name: won.name,
      rarity: won.rarity,
      image: won.image,
      price: won.price,
    }

    if (fastOpen) {
      setPhase('revealed')
      setRevealedItem(loot)
      setTimeout(resetReveal, PHASE_TIMING.revealedHold)
      return
    }

    setPhase('charging')
    setTimeout(() => {
      setPhase('opening')
      setTimeout(() => {
        setPhase('revealed')
        setRevealedItem(loot)
        setTimeout(resetReveal, PHASE_TIMING.revealedHold)
      }, PHASE_TIMING.opening)
    }, PHASE_TIMING.charging)
  }, [currentCase, phase, quantity, updateBalance, fastOpen, resetReveal])

  if (!currentCase) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-text-muted">
        Loading case...
      </div>
    )
  }

  const isOpening = phase !== 'idle'

  return (
    <div className="space-y-8 lg:space-y-10">
      <CasePageHeader />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <CaseScene3D
          caseImage={currentCase.image}
          caseName={currentCase.name}
          caseLabel="Official Case"
          phase={phase}
          revealedItem={revealedItem}
        />

        <CaseOpeningControls
          price={currentCase.price}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onOpen={handleOpen}
          isOpening={isOpening}
          fastOpen={fastOpen}
          onFastOpenChange={setFastOpen}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-5"
      >
        <div className="flex items-center gap-2.5">
          <Package size={20} className="text-accent-purple" />
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
            Found in this Case
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TYCOON_LOOT.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <LootItemCard item={item} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
