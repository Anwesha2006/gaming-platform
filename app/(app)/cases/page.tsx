'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { CasePageHeader } from '@/components/case-opening/case-page-header'
import { CaseScene3D, type CaseRevealPhase } from '@/components/case-opening/case-scene-3d'
import { CaseOpeningControls } from '@/components/case-opening/case-opening-controls'
import { useGameStateStore, type Case } from '@/lib/store/game-state-store'
import { useUserStore } from '@/lib/store/user-store'
import { pickRandomLoot } from '@/lib/case-loot'
import type { RevealedLoot } from '@/components/case-opening/case-scene-3d'

const PHASE_TIMING = {
  charging: 600,
  opening: 900,
  revealedHold: 3500,
}

const caseOptions: Case[] = [
  {
    id: 'case-tycoon',
    name: 'TYCOON TREASURE',
    image: '/images/tycoon-case.svg',
    price: 0.48,
    odds: [
      { rarity: 'Common', percentage: 60 },
      { rarity: 'Rare', percentage: 25 },
      { rarity: 'Epic', percentage: 12 },
      { rarity: 'Legendary', percentage: 3 },
    ],
  },
  {
    id: 'case-nexus',
    name: 'NEXUS RIFT',
    image: '/images/nexus-trophy.png',
    price: 0.74,
    odds: [
      { rarity: 'Common', percentage: 55 },
      { rarity: 'Rare', percentage: 28 },
      { rarity: 'Epic', percentage: 13 },
      { rarity: 'Legendary', percentage: 4 },
    ],
  },
  {
    id: 'case-arena',
    name: 'ARENA PROTOCOL',
    image: '/images/arena-protocol-hero.png',
    price: 0.92,
    odds: [
      { rarity: 'Common', percentage: 50 },
      { rarity: 'Rare', percentage: 30 },
      { rarity: 'Epic', percentage: 15 },
      { rarity: 'Legendary', percentage: 5 },
    ],
  },
  {
    id: 'case-riftwalker',
    name: 'RIFTWALKER',
    image: '/images/riftwakernew.png',
    price: 1.18,
    odds: [
      { rarity: 'Common', percentage: 48 },
      { rarity: 'Rare', percentage: 32 },
      { rarity: 'Epic', percentage: 16 },
      { rarity: 'Legendary', percentage: 4 },
    ],
  },
  {
    id: 'case-aurora',
    name: 'AURORA PRIME',
    image: '/images/tycoon-case.svg',
    price: 1.46,
    odds: [
      { rarity: 'Common', percentage: 45 },
      { rarity: 'Rare', percentage: 35 },
      { rarity: 'Epic', percentage: 15 },
      { rarity: 'Legendary', percentage: 5 },
    ],
  },
  {
    id: 'case-void',
    name: 'VOID VIPER',
    image: '/images/nexus-trophy.png',
    price: 1.84,
    odds: [
      { rarity: 'Common', percentage: 40 },
      { rarity: 'Rare', percentage: 36 },
      { rarity: 'Epic', percentage: 18 },
      { rarity: 'Legendary', percentage: 6 },
    ],
  },
]

export default function CasesPage() {
  const [quantity, setQuantity] = useState(1)
  const [phase, setPhase] = useState<CaseRevealPhase>('idle')
  const [revealedItem, setRevealedItem] = useState<RevealedLoot | null>(null)
  const [fastOpen, setFastOpen] = useState(false)

  const currentCase = useGameStateStore((state) => state.currentCase)
  const setCurrentCase = useGameStateStore((state) => state.setCurrentCase)
  const updateBalance = useUserStore((state) => state.updateBalance)

  const selectedCase = currentCase ?? caseOptions[0]

  const resetReveal = useCallback(() => {
    setPhase('idle')
    setRevealedItem(null)
  }, [])

  const handleCaseSelect = useCallback(
    (caseData: Case) => {
      setCurrentCase(caseData)
      setPhase('idle')
      setRevealedItem(null)
    },
    [setCurrentCase],
  )

  const handleOpen = useCallback(() => {
    if (!selectedCase || phase !== 'idle') return

    const totalCost = selectedCase.price * quantity
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
  }, [selectedCase, phase, quantity, updateBalance, fastOpen, resetReveal])

  if (!selectedCase) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-text-muted">
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
          caseImage={selectedCase.image}
          caseName={selectedCase.name}
          caseLabel="Official Case"
          phase={phase}
          revealedItem={revealedItem}
        />

        <CaseOpeningControls
          price={selectedCase.price}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onOpen={handleOpen}
          isOpening={isOpening}
          fastOpen={fastOpen}
          onFastOpenChange={setFastOpen}
        />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-accent-purple">
                Case collection
              </p>
              <h2 className="text-xl font-bold text-text-primary sm:text-2xl">
                Choose your next drop
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-dark-panel/70 px-3 py-1.5 text-sm text-text-muted">
              <Sparkles size={16} className="text-accent-gold" />
              <span>Scroll to explore</span>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {caseOptions.map((caseData) => {
              const isActive = selectedCase.id === caseData.id

              return (
                <motion.button
                  key={caseData.id}
                  type="button"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 2300.98 }}
                  onClick={() => handleCaseSelect(caseData)}
                  className={`group min-h-[232px] min-w-[220px] max-w-[220px] shrink-0 rounded-2xl border p-3 text-left transition-all ${
                    isActive
                      ? 'border-accent-magenta bg-dark-panel shadow-[0_0_30px_rgba(255,45,109,0.2)]'
                      : 'border-white/10 bg-dark-panel/70 hover:border-accent-purple/40'
                  }`}
                >
                  <div className="relative mb-3 h-28 overflow-hidden rounded-xl bg-dark-base">
                    <img
                      src={caseData.image}
                      alt={caseData.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-panel/70 to-transparent" />
                    {isActive && (
                      <span className="absolute right-2 top-2 rounded-full bg-accent-magenta/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        Selected
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">
                        {caseData.name}
                      </h3>
                      <p className="text-xs text-text-muted">
                        Starting at ${caseData.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-white/5 px-2 py-1 text-text-muted">
                        {caseData.odds[0].rarity}
                      </span>
                      <span className="font-semibold text-accent-gold">
                        ${caseData.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.section>

    </div>
  )
}
