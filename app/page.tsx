'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { LandingLayout } from '@/components/layout/landing-layout'
import { CTAButton } from '@/components/ui/cta-button'
import { ItemCard } from '@/components/ui/item-card'
import { ArrowRight } from 'lucide-react'

export default function Page() {
  const features = [
    {
      id: 'cases',
      title: 'Cases',
      subtitle: 'Open skins & items',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cases',
      href: '/cases',
    },
    {
      id: 'battles',
      title: 'Case Battles',
      subtitle: 'Compete with players',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=battles',
      href: '/case-battles',
    },
    {
      id: 'coinflip',
      title: 'Coinflip',
      subtitle: '50/50 chance games',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=coinflip',
      href: '/coinflip',
    },
    {
      id: 'roulette',
      title: 'Roulette',
      subtitle: 'Spin & win big',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=roulette',
      href: '/roulette',
    },
    {
      id: 'clip',
      title: 'Clip-Roulette',
      subtitle: 'Gaming clips & rewards',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clip',
      href: '/clip-roulette',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 space-y-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Accent Bar */}
            <div className="flex items-start gap-4">
              <motion.div
                className="w-1 h-20 rounded-full bg-gradient-to-b from-accent-magenta to-accent-purple"
                initial={{ height: 0 }}
                animate={{ height: 80 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-text-primary leading-tight">
                  PLAY BEYOND
                  <br />
                  THE LIMIT.
                </h1>
              </div>
            </div>

            {/* Subline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 text-text-muted"
            >
              <span className="text-sm md:text-base">Your universe. Your victory.</span>
              <ArrowRight size={16} className="text-accent-magenta" />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <CTAButton label="Get Started Now" size="lg" />
            </motion.div>
          </motion.div>

          {/* Right: Featured Card + Promos */}
          <div className="space-y-4">
            {/* Main Featured Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/20 to-accent-purple/20 rounded-2xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-accent-magenta/30 bg-dark-panel p-6 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-accent-magenta/20 text-accent-magenta text-xs font-bold">
                  FEATURED
                </div>
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=featured"
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-text-primary">Arena Protocol Season 7</h3>
                  <p className="text-sm text-text-muted mt-1">
                    Elite squads. One ultimate prize.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Promo Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Championship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl bg-dark-panel border border-white/10 p-4 space-y-3 hover:border-accent-magenta/30 transition-colors"
              >
                <div className="text-xs font-bold text-accent-neon flex items-center gap-1">
                  <span>⚡</span> LIVE NOW
                </div>
                <h4 className="font-bold text-text-primary text-sm">NEXUS CHAMPIONSHIP SERIES</h4>
                <p className="text-xs text-text-muted">Elite squads. One ultimate prize.</p>
                <Link
                  href="#"
                  className="text-xs text-accent-magenta hover:text-accent-magenta/80 font-medium inline-flex items-center gap-1"
                >
                  Watch Live <ArrowRight size={12} />
                </Link>
              </motion.div>

              {/* Creator Spotlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl bg-dark-panel border border-white/10 p-4 space-y-3 hover:border-accent-purple/30 transition-colors"
              >
                <div className="text-xs font-bold text-accent-purple flex items-center gap-1">
                  <span>⚡</span> CREATOR SPOTLIGHT
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=riftwalker"
                    alt="RiftWalker"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-text-primary text-sm">RIFTWALKER</h4>
                    <p className="text-xs text-text-muted">Strategy. Skills. Relentless.</p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-xs text-accent-purple hover:text-accent-purple/80 font-medium inline-flex items-center gap-1"
                >
                  View Profile <ArrowRight size={12} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Experience the Ultimate Gaming Platform</h2>
          <p className="text-text-muted">Choose your game and start playing now</p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.id} variants={itemVariants}>
              <Link href={feature.href}>
                <ItemCard
                  image={feature.image}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  price={0}
                  className="h-full"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 md:py-20 text-center space-y-6 bg-gradient-to-br from-accent-magenta/10 to-accent-purple/10 rounded-2xl p-8 border border-white/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Ready to Play?</h2>
        <p className="text-text-muted max-w-2xl mx-auto">
          Join thousands of players enjoying premium gaming experience
        </p>
        <CTAButton label="Start Playing Now" size="lg" />
      </motion.section>
    </LandingLayout>
  )
}
