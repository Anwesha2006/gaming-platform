'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CTAButton } from '@/components/ui/cta-button'
import { useUserStore } from '@/lib/store/user-store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const login = useUserStore((state) => state.login)

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    login({
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
    })

    setIsLoading(false)
    router.push('/cases')
  }

  return (
    <div className="min-h-screen bg-dark-base flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gradient-to-br from-accent-magenta to-accent-purple flex items-center justify-center text-3xl mb-4">
            ⚔️
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-text-primary">CSRuby</h1>
          <p className="text-text-muted mt-2">Welcome back, gamer</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-dark-panel border border-white/10 p-8 space-y-6"
        >
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm text-text-muted block">Email or Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or username"
              className="w-full bg-dark-base text-text-primary rounded-lg px-4 py-3 border border-white/10 focus:border-accent-magenta outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm text-text-muted block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-dark-base text-text-primary rounded-lg px-4 py-3 border border-white/10 focus:border-accent-magenta outline-none transition-colors"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text-muted hover:text-text-primary cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Remember me
            </label>
            <Link
              href="#"
              className="text-accent-magenta hover:text-accent-magenta/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <CTAButton
            label="Sign In"
            onClick={handleLogin}
            isLoading={isLoading}
            size="lg"
            className="w-full"
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-text-muted">OR</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 rounded-lg bg-dark-base border border-white/10 text-text-primary font-semibold text-sm hover:border-white/20 transition-colors"
            >
              Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 rounded-lg bg-dark-base border border-white/10 text-text-primary font-semibold text-sm hover:border-white/20 transition-colors"
            >
              Discord
            </motion.button>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-text-muted text-sm mt-6"
        >
          Don&apos;t have an account?{' '}
          <Link
            href="#"
            className="text-accent-magenta hover:text-accent-magenta/80 font-semibold transition-colors"
          >
            Sign up now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
