import { create } from 'zustand'

export interface ChatMessage {
  id: string
  user: string
  avatar: string
  text: string
  timestamp: Date
  userColor: string
  level?: number
}

interface ChatStore {
  messages: ChatMessage[]
  addMessage: (message: Omit<ChatMessage, 'id'>) => void
  clearMessages: () => void
}

const colors = [
  'text-blue-400',
  'text-purple-400',
  'text-pink-400',
  'text-green-400',
  'text-yellow-400',
  'text-cyan-400',
]

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Maren',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maren',
    text: 'shall i help you?',
    timestamp: new Date(Date.now() - 120000),
    userColor: colors[0],
    level: 41,
  },
  {
    id: '2',
    user: 'Hanna',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hanna',
    text: 'alex please call bot',
    timestamp: new Date(Date.now() - 90000),
    userColor: colors[1],
    level: 40,
  },
  {
    id: '3',
    user: 'Aspen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aspen',
    text: 'hey everyone',
    timestamp: new Date(Date.now() - 60000),
    userColor: colors[2],
    level: 36,
  },
  {
    id: '4',
    user: 'Nolan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nolan',
    text: 'nice drop!',
    timestamp: new Date(Date.now() - 30000),
    userColor: colors[3],
    level: 94,
  },
]

export const useChatStore = create<ChatStore>((set) => ({
  messages: mockMessages,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Date.now().toString(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
}))
