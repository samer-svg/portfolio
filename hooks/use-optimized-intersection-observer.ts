"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// Optimized intersection observer with shared instance
class SharedIntersectionObserver {
  private static instance: SharedIntersectionObserver
  private observer: IntersectionObserver | null = null
  private callbacks: Map<Element, (isIntersecting: boolean) => void> = new Map()

  static getInstance(): SharedIntersectionObserver {
    if (!SharedIntersectionObserver.instance) {
      SharedIntersectionObserver.instance = new SharedIntersectionObserver()
    }
    return SharedIntersectionObserver.instance
  }

  private createObserver() {
    if (typeof window === "undefined") return

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = this.callbacks.get(entry.target)
          if (callback) {
            callback(entry.isIntersecting)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )
  }

  observe(element: Element, callback: (isIntersecting: boolean) => void) {
    if (!this.observer) {
      this.createObserver()
    }

    if (this.observer) {
      this.callbacks.set(element, callback)
      this.observer.observe(element)
    }
  }

  unobserve(element: Element) {
    if (this.observer) {
      this.observer.unobserve(element)
      this.callbacks.delete(element)
    }
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect()
      this.callbacks.clear()
    }
  }
}

interface UseOptimizedIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useOptimizedIntersectionObserver({
  threshold = 0.1,
  rootMargin = "50px",
  triggerOnce = true,
}: UseOptimizedIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const handleIntersection = useCallback(
    (intersecting: boolean) => {
      setIsIntersecting(intersecting)

      if (intersecting && !hasIntersected) {
        setHasIntersected(true)
        if (triggerOnce && elementRef.current) {
          SharedIntersectionObserver.getInstance().unobserve(elementRef.current)
        }
      }
    },
    [hasIntersected, triggerOnce],
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = SharedIntersectionObserver.getInstance()
    observer.observe(element, handleIntersection)

    return () => {
      observer.unobserve(element)
    }
  }, [handleIntersection])

  return { ref: elementRef, isIntersecting, hasIntersected }
}
