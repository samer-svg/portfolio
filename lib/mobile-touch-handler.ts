"use client"

import React from "react"

export interface TouchHandlerOptions {
  swipeThreshold?: number
  tapThreshold?: number
  preventScroll?: boolean
  enableHapticFeedback?: boolean
}

export interface SwipeDirection {
  direction: "up" | "down" | "left" | "right" | null
  distance: number
  velocity: number
}

export class MobileTouchHandler {
  private element: HTMLElement
  private options: Required<TouchHandlerOptions>
  private startTouch: Touch | null = null
  private startTime = 0
  private isScrolling = false

  constructor(element: HTMLElement, options: TouchHandlerOptions = {}) {
    this.element = element
    this.options = {
      swipeThreshold: 30,
      tapThreshold: 10,
      preventScroll: true,
      enableHapticFeedback: true,
      ...options,
    }

    this.setupTouchEvents()
  }

  private setupTouchEvents() {
    // Prevent default touch behaviors for better game control
    this.element.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: false })
    this.element.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: false })
    this.element.addEventListener("touchend", this.handleTouchEnd.bind(this), { passive: false })
    this.element.addEventListener("touchcancel", this.handleTouchCancel.bind(this))

    // Prevent context menu on long press
    this.element.addEventListener("contextmenu", (e) => e.preventDefault())
  }

  private handleTouchStart(e: TouchEvent) {
    if (this.options.preventScroll) {
      e.preventDefault()
    }

    this.startTouch = e.touches[0]
    this.startTime = Date.now()
    this.isScrolling = false

    // Haptic feedback for touch start
    if (this.options.enableHapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(10)
    }
  }

  private handleTouchMove(e: TouchEvent) {
    if (!this.startTouch) return

    if (this.options.preventScroll) {
      e.preventDefault()
    }

    const currentTouch = e.touches[0]
    const deltaX = Math.abs(currentTouch.clientX - this.startTouch.clientX)
    const deltaY = Math.abs(currentTouch.clientY - this.startTouch.clientY)

    // Determine if user is scrolling
    if (deltaX > 10 || deltaY > 10) {
      this.isScrolling = true
    }
  }

  private handleTouchEnd(e: TouchEvent) {
    if (!this.startTouch) return

    const endTouch = e.changedTouches[0]
    const deltaX = endTouch.clientX - this.startTouch.clientX
    const deltaY = endTouch.clientY - this.startTouch.clientY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const duration = Date.now() - this.startTime
    const velocity = distance / duration

    // Determine gesture type
    if (distance < this.options.tapThreshold && !this.isScrolling) {
      this.handleTap(endTouch)
    } else if (distance > this.options.swipeThreshold) {
      this.handleSwipe({ deltaX, deltaY, distance, velocity })
    }

    this.cleanup()
  }

  private handleTouchCancel() {
    this.cleanup()
  }

  private cleanup() {
    this.startTouch = null
    this.startTime = 0
    this.isScrolling = false
  }

  private handleTap(touch: Touch) {
    const event = new CustomEvent("mobileTap", {
      detail: {
        x: touch.clientX,
        y: touch.clientY,
        target: touch.target,
      },
    })
    this.element.dispatchEvent(event)
  }

  private handleSwipe({
    deltaX,
    deltaY,
    distance,
    velocity,
  }: {
    deltaX: number
    deltaY: number
    distance: number
    velocity: number
  }) {
    let direction: SwipeDirection["direction"] = null

    // Determine primary swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? "right" : "left"
    } else {
      direction = deltaY > 0 ? "down" : "up"
    }

    const event = new CustomEvent("mobileSwipe", {
      detail: {
        direction,
        distance,
        velocity,
        deltaX,
        deltaY,
      },
    })
    this.element.dispatchEvent(event)

    // Haptic feedback for swipe
    if (this.options.enableHapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(20)
    }
  }

  destroy() {
    this.element.removeEventListener("touchstart", this.handleTouchStart.bind(this))
    this.element.removeEventListener("touchmove", this.handleTouchMove.bind(this))
    this.element.removeEventListener("touchend", this.handleTouchEnd.bind(this))
    this.element.removeEventListener("touchcancel", this.handleTouchCancel.bind(this))
  }
}

// React hook for easy integration
export function useMobileTouch(ref: React.RefObject<HTMLElement>, options: TouchHandlerOptions = {}) {
  React.useEffect(() => {
    if (!ref.current) return

    const handler = new MobileTouchHandler(ref.current, options)

    return () => handler.destroy()
  }, [ref, options])
}
