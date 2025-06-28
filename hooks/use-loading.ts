"use client"

import { useState, useEffect } from "react"

export function useLoading(delay = 1000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}

export function useStaggeredLoading(items: any[], delay = 100) {
  const [visibleItems, setVisibleItems] = useState<number>(0)

  useEffect(() => {
    if (items.length === 0) return

    const timer = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev >= items.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, delay)

    return () => clearInterval(timer)
  }, [items.length, delay])

  return visibleItems
}
