"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setFadeIn(true), 100)
    }, 1500) // Simulate loading time

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <div className="fixed inset-0 bg-gray-950 z-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Loading Portfolio...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <div className={`transition-opacity duration-1000 ${fadeIn ? "opacity-100" : "opacity-0"}`}>{children}</div>
}
