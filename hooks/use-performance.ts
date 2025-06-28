"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  isLoading: boolean
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    isLoading: true,
  })

  useEffect(() => {
    const startTime = performance.now()

    // Measure render time
    const renderTime = performance.now() - startTime

    // Measure load time
    const handleLoad = () => {
      const loadTime = performance.now() - startTime
      setMetrics({
        loadTime,
        renderTime,
        isLoading: false,
      })
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad, { once: true })
    }

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, []) // Empty dependency array - runs only once

  return metrics
}
