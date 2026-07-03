'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CTAButtonProps {
  label: string
  onClick?: () => void
  isLoading?: boolean
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export function CTAButton({
  label,
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
  size = 'md',
  variant = 'primary',
}: CTAButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-accent-magenta text-white hover:bg-accent-magenta/90',
    secondary: 'bg-accent-purple text-white hover:bg-accent-purple/90',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-full font-bold
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        ${className}
      `}
      style={{
        boxShadow: !disabled
          ? `0 0 20px ${variant === 'primary' ? 'rgba(255, 45, 109, 0.4)' : 'rgba(124, 92, 255, 0.4)'}`
          : undefined,
      }}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <motion.div
            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
          />
          Loading...
        </div>
      ) : (
        label
      )}
    </motion.button>
  )
}
