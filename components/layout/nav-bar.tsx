'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, Bell, LogOut } from 'lucide-react'
import { useUserStore } from '@/lib/store/user-store'
import { PriceDisplay } from '@/components/ui/price-display'
import { CTAButton } from '@/components/ui/cta-button'

interface NavBarProps {
  variant?: 'landing' | 'app'
}

export function NavBar({ variant = 'app' }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  const navLinks =
    variant === 'landing'
      ? [
          { label: 'Games', href: '/cases' },
          { label: 'Esports', href: '#' },
          { label: 'Creators', href: '#' },
          { label: 'News', href: '#' },
          { label: 'Community', href: '#' },
        ]
      : [
          { label: 'Cases', href: '/cases' },
          { label: 'Case Battles', href: '/case-battles' },
          { label: 'Coinflip', href: '/coinflip' },
          { label: 'Roulette', href: '/roulette' },
          { label: 'Clip-Roulette', href: '/clip-roulette' },
        ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-base/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-magenta to-accent-purple flex items-center justify-center text-white">
              ⚔️
            </div>
            <span className="hidden sm:inline text-text-primary">CSRuby</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-accent-magenta'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Balance Display */}
            {user.isLoggedIn && (
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-dark-panel border border-white/10">
                <span className="text-xs text-text-muted">Balance</span>
                <PriceDisplay price={user.balance} />
              </div>
            )}

            {/* Action Buttons */}
            {user.isLoggedIn && (
              <>
                <button className="hidden sm:block px-4 py-2 text-xs font-bold text-text-muted hover:text-text-primary transition-colors">
                  WITHDRAW
                </button>
                <button className="px-4 py-2 gradient-cta text-white rounded-lg font-bold text-xs transition-all shadow-md shadow-accent-purple/25 hover:shadow-accent-magenta/30">
                  DEPOSIT
                </button>
              </>
            )}

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-dark-panel transition-colors">
              <Bell size={20} className="text-text-muted" />
            </button>

            {/* User Menu */}
            {user.isLoggedIn ? (
              <div className="relative">
                <motion.button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-dark-panel transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-text-primary">
                    {user.username}
                  </span>
                </motion.button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-dark-panel border border-white/10 shadow-xl overflow-hidden"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-dark-base transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/inventory"
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-dark-base transition-colors"
                    >
                      Inventory
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-base transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <CTAButton label="Sign In" onClick={() => {}} size="sm" />
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-dark-panel transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} className="text-text-muted" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-text-primary hover:bg-dark-panel rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
