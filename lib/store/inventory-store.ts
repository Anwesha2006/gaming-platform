import { create } from 'zustand'

export interface InventoryItem {
  id: string
  name: string
  image: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  price: number
  wear: { min: number; max: number }
  acquiredAt: Date
}

interface InventoryStore {
  items: InventoryItem[]
  addItem: (item: InventoryItem) => void
  removeItem: (id: string) => void
  getTotal: () => number
}

const mockItems: InventoryItem[] = [
  {
    id: 'item-1',
    name: 'Sapphire Bayonet',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=item1',
    rarity: 'legendary',
    price: 4543.63,
    wear: { min: 0.02, max: 0.03 },
    acquiredAt: new Date(Date.now() - 86400000 * 5),
  },
  {
    id: 'item-2',
    name: 'Emerald Knife',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=item2',
    rarity: 'epic',
    price: 26932.83,
    wear: { min: 0.03, max: 0.04 },
    acquiredAt: new Date(Date.now() - 86400000 * 3),
  },
  {
    id: 'item-3',
    name: 'Sticker - Katowice',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=item3',
    rarity: 'legendary',
    price: 18118.75,
    wear: { min: 0.02, max: 0.05 },
    acquiredAt: new Date(Date.now() - 86400000),
  },
]

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  items: mockItems,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  getTotal: () => {
    const state = get()
    return state.items.reduce((sum, item) => sum + item.price, 0)
  },
}))
