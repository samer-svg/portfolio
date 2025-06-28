"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface AnimationContextType {
  prefersReducedMotion: boolean
  animationsEnabled: boolean
  toggleAnimations: () => void
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  animationsEnabled: true,
  toggleAnimations: () => {},
})

export const useAnimations = () => useContext(AnimationContext)

interface AnimationProviderProps {
  children: React.ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  useEffect(() => {
    // Check for user's motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (e.matches) {
        setAnimationsEnabled(false)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    // Check localStorage for user preference
    const savedPreference = localStorage.getItem("animations-enabled")
    if (savedPreference !== null) {
      setAnimationsEnabled(JSON.parse(savedPreference))
    } else if (mediaQuery.matches) {
      setAnimationsEnabled(false)
    }

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem("animations-enabled", JSON.stringify(newValue))
  }

  // Apply CSS custom properties for animation control
  useEffect(() => {
    const root = document.documentElement
    if (!animationsEnabled || prefersReducedMotion) {
      root.style.setProperty("--animation-duration", "0s")
      root.style.setProperty("--animation-delay", "0s")
      root.style.setProperty("--transition-duration", "0s")
    } else {
      root.style.removeProperty("--animation-duration")
      root.style.removeProperty("--animation-delay")
      root.style.removeProperty("--transition-duration")
    }
  }, [animationsEnabled, prefersReducedMotion])

  return (
    <AnimationContext.Provider
      value={{
        prefersReducedMotion,
        animationsEnabled: animationsEnabled && !prefersReducedMotion,
        toggleAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}
