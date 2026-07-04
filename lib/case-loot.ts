import type { LootItem } from '@/components/case-opening/loot-item-card'

export const TYCOON_LOOT: LootItem[] = [
  {
    id: '1',
    name: 'Sapphire',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=sapphire&backgroundColor=1a1f2a',
    rarity: 'rare',
    price: 4543.63,
    wear: { min: 0.02, max: 0.03 },
    change: 11.5,
  },
  {
    id: '2',
    name: 'Emerald',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=emerald&backgroundColor=1a1f2a',
    rarity: 'legendary',
    price: 26932.83,
    wear: { min: 0.03, max: 0.04 },
    change: 8.2,
    isHighlighted: true,
  },
  {
    id: '3',
    name: 'HellRaisers | Katowice 2014',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=hellraisers&backgroundColor=1a1f2a',
    rarity: 'epic',
    price: 18118.75,
    change: -2.3,
  },
  {
    id: '4',
    name: 'Zirka',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=zirka&backgroundColor=1a1f2a',
    rarity: 'epic',
    price: 4543.63,
    wear: { min: 0.02, max: 0.03 },
    change: 5.1,
  },
]

export function pickRandomLoot(): LootItem {
  const weights = { common: 60, rare: 25, epic: 12, legendary: 3 }
  const roll = Math.random() * 100
  let cumulative = 0
  let targetRarity: LootItem['rarity'] = 'common'

  for (const [rarity, weight] of Object.entries(weights)) {
    cumulative += weight
    if (roll <= cumulative) {
      targetRarity = rarity as LootItem['rarity']
      break
    }
  }

  const pool = TYCOON_LOOT.filter((item) => item.rarity === targetRarity)
  if (pool.length > 0) {
    return pool[Math.floor(Math.random() * pool.length)]
  }
  return TYCOON_LOOT[Math.floor(Math.random() * TYCOON_LOOT.length)]
}
