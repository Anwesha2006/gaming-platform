'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavBar } from './nav-bar'
import { SidebarChat } from './sidebar-chat'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-dark-base">
      {/* NavBar */}
      <NavBar variant="app" />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Hidden on mobile, visible on md+ */}
        <div className="hidden md:block w-64 xl:w-72 flex-shrink-0 border-r border-white/10">
          <SidebarChat />
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed left-0 top-16 bottom-0 w-64 z-40 md:hidden"
            >
              <SidebarChat />
            </motion.div>
          </>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-20 right-4 z-20 p-2 bg-dark-panel rounded-lg border border-white/10 hover:border-accent-magenta/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>

          {/* Content Container */}
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
