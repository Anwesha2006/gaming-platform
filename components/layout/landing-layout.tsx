'use client'

import React from 'react'
import { NavBar } from './nav-bar'

interface LandingLayoutProps {
  children: React.ReactNode
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-dark-base">
      {/* NavBar */}
      <NavBar variant="landing" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </div>
      </div>
    </div>
  )
}
