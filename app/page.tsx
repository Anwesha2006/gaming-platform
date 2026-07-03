'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, ArrowRight, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = ['Games', 'Esports', 'Creators', 'News', 'Community']

  return (
    <div className="min-h-screen bg-dark-base text-text-primary overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 lg:px-12 lg:py-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center justify-between gap-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-magenta rounded flex items-center justify-center font-black">
              ◆
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black text-text-primary tracking-wider">NEXUS</div>
              <div className="text-xs text-text-muted font-semibold">GAMING</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === 'Community' ? '/community' : `/${item.toLowerCase()}`}
                className={`text-sm font-semibold transition-colors relative group ${
                  item === 'Community'
                    ? 'text-text-primary border-b-2 border-accent-purple'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {item}
                {item !== 'Community' && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-magenta group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Search size={20} />
            </button>
            <Link
              href="/login"
              className="hidden sm:block px-6 py-2.5 border border-accent-purple text-text-primary rounded-lg hover:bg-accent-purple/10 hover:border-accent-purple/80 transition-colors text-sm font-bold tracking-wide"
            >
              Join Nexus →
            </Link>
            <button
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-3"
          >
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === 'Community' ? '/community' : `/${item.toLowerCase()}`}
                className="block text-sm font-semibold text-text-muted hover:text-text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.nav>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative px-6 py-12 lg:px-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pt-6"
          >
            {/* Headline with accent bar */}
            <div className="flex gap-6 items-start">
              <motion.div
                className="w-1.5 bg-gradient-to-b from-accent-purple via-accent-magenta to-accent-purple rounded-full"
                initial={{ height: 0 }}
                animate={{ height: 240 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-black italic leading-tight text-balance"
              >
                PLAY BEYOND
                <br />
                THE LIMIT.
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-base text-accent-purple font-semibold">Your universe.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base text-accent-purple font-semibold">Your victory.</span>
                <ArrowRight size={18} className="text-accent-magenta" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Featured Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Featured Card */}
            <div className="relative group">
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/40 via-accent-magenta/20 to-transparent rounded-2xl blur-3xl group-hover:blur-4xl transition-all" />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-accent-purple/40 bg-dark-panel/60 backdrop-blur-xl p-6 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-accent-purple/30 text-accent-purple text-xs font-black tracking-wider">
                  FEATURED
                </div>

                {/* Hero Image */}
                <div className="relative w-full h-72 rounded-lg overflow-hidden bg-gradient-to-br from-accent-purple/30 to-accent-magenta/20">
                  <img
                    src="https://images.unsplash.com/photo-1538481527238-111187fdd524?w=600&h=500&fit=crop"
                    alt="Arena Protocol"
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-magenta/50 via-transparent to-transparent" />
                </div>

                {/* Text */}
                <div className="space-y-1">
                  <h3 className="font-black text-lg text-text-primary">Arena Protocol</h3>
                  <p className="text-sm text-accent-purple font-bold">Season 7</p>
                </div>
              </div>
            </div>

            {/* Promo Cards - Stacked Vertically */}
            <div className="space-y-4">
              {/* Championship Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/30 to-transparent rounded-xl blur-2xl group-hover:blur-3xl transition-all" />
                <div className="relative rounded-xl border border-accent-purple/30 bg-dark-panel/60 backdrop-blur-xl p-5 flex gap-4 group-hover:border-accent-purple/60 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="text-xs font-black text-accent-neon tracking-wider">⚡ LIVE NOW</div>
                    <h4 className="font-black text-text-primary text-sm">NEXUS CHAMPIONSHIP SERIES</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Elite squads. One ultimate prize.</p>
                    <Link
                      href="#"
                      className="text-xs text-accent-purple hover:text-accent-magenta font-black inline-flex items-center gap-1 mt-3 transition-colors"
                    >
                      Watch Live <ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent-purple/50 to-accent-magenta/30 flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">🏆</span>
                  </div>
                </div>
              </motion.div>

              {/* Creator Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-magenta/30 to-transparent rounded-xl blur-2xl group-hover:blur-3xl transition-all" />
                <div className="relative rounded-xl border border-accent-magenta/30 bg-dark-panel/60 backdrop-blur-xl p-5 flex gap-4 group-hover:border-accent-magenta/60 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="text-xs font-black text-accent-magenta tracking-wider">⚡ CREATOR SPOTLIGHT</div>
                    <h4 className="font-black text-text-primary text-sm">RIFTWALKER</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Strategy. Skills. Relentless.</p>
                    <Link
                      href="#"
                      className="text-xs text-accent-magenta hover:text-accent-purple font-black inline-flex items-center gap-1 mt-3 transition-colors"
                    >
                      View Profile <ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent-magenta/50 to-accent-purple/30 flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">⚙️</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          className="fixed bottom-8 left-8 w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-magenta flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl"
        >
          <ArrowRight size={24} className="rotate-45 text-text-primary" />
        </motion.div>
      </main>
    </div>
  )
}
