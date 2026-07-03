'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronDown, Clock } from 'lucide-react'
import { useChatStore } from '@/lib/store/chat-store'

interface SidebarChatProps {
  className?: string
}

export function SidebarChat({ className = '' }: SidebarChatProps) {
  const [newMessage, setNewMessage] = useState('')
  const [rainTimer, setRainTimer] = useState(3599) // 59 min 59 sec
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messages = useChatStore((state) => state.messages)
  const addMessage = useChatStore((state) => state.addMessage)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const timer = setInterval(() => {
      setRainTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        user: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
        text: newMessage,
        timestamp: new Date(),
        userColor: 'text-accent-magenta',
      })
      setNewMessage('')
    }
  }

  return (
    <div
      className={`
        h-screen bg-dark-panel border-r border-white/10
        flex flex-col
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 space-y-3">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">🇬🇧</span>
          <button className="flex items-center gap-1 text-sm text-text-primary font-medium hover:text-accent-magenta transition-colors">
            English Chat
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Online Count */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-accent-neon animate-pulse" />
          <span className="text-text-muted">543</span>
        </div>
      </div>

      {/* Pinned Message */}
      <div className="p-4 border-b border-accent-magenta/30 bg-accent-magenta/5">
        <div className="flex items-start gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cristofer"
            alt="Cristofer"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div>
            <div className="text-xs font-semibold text-accent-magenta">Cristofer</div>
            <div className="text-xs text-text-muted mt-1">
              💰 IT'S RAINING! Collect free coins from the rain
            </div>
          </div>
        </div>
      </div>

      {/* Rain Card */}
      <div className="p-4 mx-3 mt-3 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
        <div className="text-center space-y-2">
          <div className="text-sm font-bold text-text-primary">IT'S RAINING</div>
          <div className="text-2xl font-bold text-accent-gold">₿ {(Math.random() * 2000 + 1000).toFixed(2)}</div>
          <div className="text-xs text-text-muted">Next Spin</div>
          <div className="text-lg font-bold text-orange-400">{formatTime(rainTimer)}</div>
          <button className="w-full mt-2 py-2 bg-accent-magenta text-white rounded font-bold text-sm hover:bg-accent-magenta/90 transition-colors">
            JOIN RAIN
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-3 group"
            >
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-6 h-6 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${msg.userColor}`}>{msg.user}</span>
                  <span className="text-xs text-text-muted">•</span>
                  <span className="text-xs text-text-muted">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-xs text-text-primary mt-0.5 break-words">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-dark-panel">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleSendMessage()
              }
            }}
            placeholder="Message..."
            className="flex-1 bg-dark-base text-text-primary text-sm rounded px-3 py-2 border border-white/10 focus:border-accent-magenta outline-none transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="p-2 rounded-lg bg-accent-magenta text-white hover:bg-accent-magenta/90 transition-colors"
          >
            <Send size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
