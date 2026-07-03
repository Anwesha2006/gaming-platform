'use client'

import React from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  min?: number
  label?: string
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  min = 0,
  label,
  className = '',
}: ProgressBarProps) {
  const percentage = ((value - min) / (max - min)) * 100

  const getColor = (percent: number) => {
    if (percent < 33) return 'from-blue-500 to-blue-400'
    if (percent < 66) return 'from-accent-neon to-green-400'
    return 'from-accent-gold to-yellow-400'
  }

  return (
    <div className={className}>
      {label && <div className="text-xs text-text-muted font-medium mb-1">{label}</div>}
      <div className="w-full h-2 bg-dark-panel rounded-full overflow-hidden border border-white/5">
        <div
          className={`h-full bg-gradient-to-r ${getColor(percentage)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {min !== undefined || max !== undefined ? (
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{min.toFixed(2)}</span>
          <span>{max.toFixed(2)}</span>
        </div>
      ) : null}
    </div>
  )
}
