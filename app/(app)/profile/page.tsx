'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/lib/store/user-store'
import { Settings, LogOut } from 'lucide-react'
import { CTAButton } from '@/components/ui/cta-button'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'activity' | 'settings'>('activity')
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  const mockActivity = [
    {
      id: '1',
      type: 'case_open',
      description: 'Opened 3 Sapphire Cases',
      amount: '-1234.50',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      type: 'battle_win',
      description: 'Won Case Battle',
      amount: '+2500.00',
      timestamp: new Date(Date.now() - 7200000),
    },
    {
      id: '3',
      type: 'coinflip',
      description: 'Coinflip - Tails',
      amount: '-500.00',
      timestamp: new Date(Date.now() - 10800000),
    },
    {
      id: '4',
      type: 'deposit',
      description: 'Deposited funds',
      amount: '+5000.00',
      timestamp: new Date(Date.now() - 86400000),
    },
  ]

  return (
    <div className="space-y-12">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-gradient-to-br from-accent-magenta/10 to-accent-purple/10 border border-white/10 p-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar */}
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full border-4 border-accent-magenta"
          />

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-text-primary">{user.username}</h1>
            <p className="text-text-muted mt-1">Member since {new Date().getFullYear()}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 px-6 rounded-lg bg-dark-panel border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-black text-accent-gold">{user.stats.itemsOwned}</p>
              <p className="text-xs text-text-muted mt-1">Items</p>
            </div>
            <div className="text-center border-l border-r border-white/10 px-4">
              <p className="text-2xl font-black text-accent-magenta">{user.stats.battlesWon}</p>
              <p className="text-xs text-text-muted mt-1">Battles</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-accent-neon">₿{user.stats.totalSpent.toFixed(0)}</p>
              <p className="text-xs text-text-muted mt-1">Spent</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="border-b border-white/10 flex gap-4"
      >
        {(['activity', 'settings'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            className={`
              px-4 py-3 font-semibold text-sm capitalize transition-all border-b-2
              ${
                activeTab === tab
                  ? 'border-accent-magenta text-accent-magenta'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }
            `}
          >
            {tab === 'activity' ? 'Recent Activity' : 'Settings'}
          </motion.button>
        ))}
      </motion.div>

      {/* Content */}
      {activeTab === 'activity' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {mockActivity.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="rounded-lg bg-dark-panel border border-white/10 p-4 flex items-center justify-between hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-magenta to-accent-purple flex items-center justify-center text-lg">
                  {activity.type === 'case_open' && '📦'}
                  {activity.type === 'battle_win' && '🏆'}
                  {activity.type === 'coinflip' && '🪙'}
                  {activity.type === 'deposit' && '💰'}
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{activity.description}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {activity.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              <p
                className={`font-bold text-sm ${
                  activity.amount.startsWith('+') ? 'text-accent-neon' : 'text-red-400'
                }`}
              >
                {activity.amount}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'settings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Settings Sections */}
          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary">Language</h3>
                <p className="text-sm text-text-muted mt-1">Change your preferred language</p>
              </div>
              <select className="px-3 py-2 rounded-lg bg-dark-base border border-white/10 text-text-primary text-sm outline-none">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>

          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary">Two-Factor Authentication</h3>
                <p className="text-sm text-text-muted mt-1">Add an extra layer of security</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-lg bg-accent-magenta text-white font-semibold text-sm hover:bg-accent-magenta/90 transition-colors"
              >
                Enable
              </motion.button>
            </div>
          </div>

          <div className="rounded-lg bg-dark-panel border border-white/10 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-text-primary">Email Notifications</h3>
                <p className="text-sm text-text-muted mt-1">Receive updates about your account</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-12 h-6 rounded-full bg-accent-magenta transition-colors flex items-center justify-end pr-1"
              >
                <div className="w-5 h-5 rounded-full bg-white" />
              </motion.button>
            </div>
          </div>

          {/* Logout Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <CTAButton
              label="Logout"
              onClick={logout}
              variant="secondary"
              size="lg"
              className="w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
