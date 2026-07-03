import { create } from 'zustand'

interface UserStats {
  totalSpent: number
  itemsOwned: number
  battlesWon: number
}

interface User {
  id: string
  username: string
  avatar: string
  balance: number
  stats: UserStats
  isLoggedIn: boolean
}

interface UserStore {
  user: User
  setUser: (user: User) => void
  updateBalance: (amount: number) => void
  updateStats: (stats: Partial<UserStats>) => void
  login: (user: User) => void
  logout: () => void
}

const defaultUser: User = {
  id: '1',
  username: 'CristoferGamer',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CristoferGamer',
  balance: 2500.42,
  stats: {
    totalSpent: 8250.5,
    itemsOwned: 47,
    battlesWon: 23,
  },
  isLoggedIn: true,
}

export const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  setUser: (user) => set({ user }),
  updateBalance: (amount) =>
    set((state) => ({
      user: {
        ...state.user,
        balance: Math.max(0, state.user.balance + amount),
      },
    })),
  updateStats: (stats) =>
    set((state) => ({
      user: {
        ...state.user,
        stats: {
          ...state.user.stats,
          ...stats,
        },
      },
    })),
  login: (user) =>
    set({
      user: {
        ...user,
        isLoggedIn: true,
      },
    }),
  logout: () =>
    set({
      user: {
        ...defaultUser,
        isLoggedIn: false,
      },
    }),
}))
