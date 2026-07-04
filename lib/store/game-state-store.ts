import { create } from 'zustand'

export interface Case {
  id: string
  name: string
  image: string
  price: number
  odds: { rarity: string; percentage: number }[]
}

export interface Battle {
  id: string
  caseId: string
  players: { username: string; avatar: string }[]
  entryPrice: number
  prizePool: number
  status: 'open' | 'full' | 'completed'
}

interface GameState {
  currentCase: Case | null
  currentQuantity: number
  lastRevealResult: string | null
  battles: Battle[]
  coinflipLobbies: any[]
  rouletteSpinResult: number | null
}

interface GameStateStore extends GameState {
  setCurrentCase: (caseData: Case) => void
  setQuantity: (quantity: number) => void
  setRevealResult: (result: string) => void
  addBattle: (battle: Battle) => void
  setBattles: (battles: Battle[]) => void
  setRouletteSpin: (result: number) => void
}

const defaultCase: Case = {
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
}

const mockBattles: Battle[] = [
  {
    id: 'battle-1',
    caseId: 'case-1',
    players: [
      { username: 'Player1', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p1' },
      { username: 'Player2', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p2' },
    ],
    entryPrice: 5000,
    prizePool: 10000,
    status: 'open',
  },
  {
    id: 'battle-2',
    caseId: 'case-1',
    players: [
      { username: 'Player3', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=p3' },
    ],
    entryPrice: 3000,
    prizePool: 3000,
    status: 'open',
  },
]

export const useGameStateStore = create<GameStateStore>((set) => ({
  currentCase: defaultCase,
  currentQuantity: 1,
  lastRevealResult: null,
  battles: mockBattles,
  coinflipLobbies: [],
  rouletteSpinResult: null,
  setCurrentCase: (caseData) => set({ currentCase: caseData }),
  setQuantity: (quantity) => set({ currentQuantity: quantity }),
  setRevealResult: (result) => set({ lastRevealResult: result }),
  addBattle: (battle) =>
    set((state) => ({
      battles: [...state.battles, battle],
    })),
  setBattles: (battles) => set({ battles }),
  setRouletteSpin: (result) => set({ rouletteSpinResult: result }),
}))
