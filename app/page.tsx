'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Menu } from 'lucide-react'
import { useState } from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { StatsSection } from '@/components/landing/stats-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { SiteFooter } from '@/components/landing/site-footer'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navItems = ['Games', 'Esports', 'Creators', 'News', 'Community']

  return (
    <div className="min-h-screen bg-dark-base text-text-primary overflow-hidden">
      <header className="border-b border-white/10 px-6 py-4 lg:px-12 lg:py-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center justify-between gap-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-magenta rounded flex items-center justify-center font-black">
              ◆
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-black text-text-primary tracking-wider">NEXUS</div>
              <div className="text-xs text-text-muted font-semibold">GAMING</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item}
                href="/login"
                className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-purple to-accent-magenta group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

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

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pt-4 border-t border-white/10 space-y-3"
          >
            {navItems.map((item) => (
              <Link
                key={item}
                href="/login"
                className="block text-sm font-semibold text-text-muted hover:text-text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.nav>
        )}
      </header>

      <HeroSection />
      <StatsSection />
      <TestimonialsSection />
      <SiteFooter />
    </div>
  )
}
