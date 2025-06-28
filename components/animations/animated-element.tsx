"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useAnimations } from "./animation-provider"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: React.ReactNode
  animation?:
    | "fadeIn"
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "slideInLeft"
    | "slideInRight"
    | "slideInUp"
    | "slideInDown"
    | "scaleIn"
    | "rotateIn"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
  role?: string
  "aria-label"?: string
}

export function AnimatedElement({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.1,
  triggerOnce = true,
  role,
  "aria-label": ariaLabel,
}: AnimatedElementProps) {
  const { animationsEnabled } = useAnimations()
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element || !animationsEnabled) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay * 1000)
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [delay, threshold, triggerOnce, hasAnimated, animationsEnabled])

  const getAnimationClasses = () => {
    if (!animationsEnabled) return ""

    const baseClasses = "transition-all ease-out"
    const durationClass = `duration-${Math.round(duration * 1000)}`

    if (!isVisible) {
      switch (animation) {
        case "fadeIn":
          return `${baseClasses} ${durationClass} opacity-0`
        case "fadeInUp":
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
        case "fadeInDown":
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`
        case "fadeInLeft":
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`
        case "fadeInRight":
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`
        case "slideInLeft":
          return `${baseClasses} ${durationClass} -translate-x-full`
        case "slideInRight":
          return `${baseClasses} ${durationClass} translate-x-full`
        case "slideInUp":
          return `${baseClasses} ${durationClass} translate-y-full`
        case "slideInDown":
          return `${baseClasses} ${durationClass} -translate-y-full`
        case "scaleIn":
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        case "rotateIn":
          return `${baseClasses} ${durationClass} opacity-0 rotate-12 scale-95`
        default:
          return `${baseClasses} ${durationClass} opacity-0`
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0`
    }
  }

  return (
    <div
      ref={elementRef}
      className={cn(getAnimationClasses(), className)}
      role={role}
      aria-label={ariaLabel}
      aria-hidden={!isVisible && animationsEnabled ? "true" : "false"}
    >
      {children}
    </div>
  )
}
