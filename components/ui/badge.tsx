'use client'

import React from 'react'

type BadgeVariant = 'online' | 'rare' | 'epic' | 'legendary' | 'featured' | 'default'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  className?: string
}

export function Badge({ label, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses: Record<BadgeVariant, string> = {
    online: 'bg-accent-neon/20 text-accent-neon border border-accent-neon/50',
    rare: 'bg-blue-500/20 text-blue-300 border border-blue-500/50',
    epic: 'bg-accent-purple/20 text-accent-purple border border-accent-purple/50',
    legendary: 'bg-accent-gold/20 text-accent-gold border border-accent-gold/50',
    featured: 'bg-accent-magenta/20 text-accent-magenta border border-accent-magenta/50',
    default: 'bg-dark-panel text-text-muted border border-white/10',
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1
        text-xs font-semibold rounded-full
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {variant === 'online' && <div className="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse" />}
      {label}
    </span>
  )
}
