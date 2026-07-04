'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, ChevronDown, MoreHorizontal, Smile } from 'lucide-react'
import { useChatStore } from '@/lib/store/chat-store'

interface SidebarChatProps {
  className?: string
}

const RAIN_REWARD = .98

export function SidebarChat({ className = '' }: SidebarChatProps) {
  const [newMessage, setNewMessage] = useState('')
  const [rainTimer, setRainTimer] = useState(5123)
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
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        user: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
        text: newMessage,
        timestamp: new Date(),
        userColor: 'text-accent-magenta',
        level: 44,
      })
      setNewMessage('')
    }
  }

  return (
    <div
      className={`
        h-full min-h-[calc(100vh-4rem)] bg-dark-panel border-r border-white/10
        flex flex-col
        ${className}
      `}
    >
      <div className="p-4 border-b border-white/10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">🇬🇧</span>
          <button className="flex items-center gap-1 text-sm text-text-primary font-bold hover:text-accent-purple transition-colors">
            English Chat
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="neon-online">
            <span className="text-text-muted font-semibold">543</span>
          </div>
        </div>
      </div>

      <div className="p-3 mx-3 mt-3 rounded-xl bg-dark-base/80 border border-white/10">
        <div className="flex items-start gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Cristofer"
            alt="Cristofer"
            className="w-8 h-8 rounded-full flex-shrink-0 border border-accent-purple/30"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-accent-purple/20 text-accent-purple">
                44
              </span>
              <span className="text-xs font-semibold text-text-primary">Cristofer</span>
            </div>
            <p className="text-xs text-text-muted mt-1">gg guys &lt;3</p>
          </div>
          <button className="text-text-muted hover:text-text-primary p-0.5">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="p-4 mx-3 mt-3 rounded-xl bg-gradient-to-br from-accent-purple/15 to-accent-magenta/10 border border-accent-purple/25">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold tracking-wider text-accent-purple uppercase">
            It&apos;s Raining
          </div>
          <div className="text-2xl font-black coin-gold">₿ {RAIN_REWARD.toFixed(2)}</div>
          <div className="text-[10px] text-text-muted uppercase tracking-wide">Next Rain</div>
          <div className="text-lg font-bold text-text-primary tabular-nums">{formatTime(rainTimer)}</div>
          <button className="w-full mt-2 py-2.5 gradient-cta text-white rounded-lg font-bold text-sm shadow-md shadow-accent-purple/20 hover:shadow-accent-magenta/25 transition-all">
            JOIN RAIN
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 mt-2">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2.5 group"
            >
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-7 h-7 rounded-full flex-shrink-0 border border-white/10"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {msg.level && (
                    <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-accent-purple/20 text-accent-purple leading-none">
                      {msg.level}
                    </span>
                  )}
                  <span className={`text-xs font-bold ${msg.userColor}`}>{msg.user}</span>
                </div>
                <p className="text-xs text-text-primary/90 mt-0.5 break-words leading-relaxed">
                  {msg.text}
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-text-primary p-0.5 transition-opacity">
                <MoreHorizontal size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-white/10 bg-dark-panel">
        <div className="flex items-center gap-2 bg-dark-base rounded-lg border border-white/10 px-3 py-2">
          <button className="text-text-muted hover:text-accent-purple transition-colors">
            <Smile size={16} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleSendMessage()
              }
            }}
            placeholder="Message"
            className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-muted"
          />
          <button className="text-text-muted hover:text-text-primary transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
