"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGameContainerProps {
  children: React.ReactNode
  className?: string
  aspectRatio?: "square" | "16:9" | "4:3" | "auto"
  maxWidth?: string
  enableFullscreen?: boolean
}

export function ResponsiveGameContainer({
  children,
  className,
  aspectRatio = "auto",
  maxWidth = "600px",
  enableFullscreen = true,
}: ResponsiveGameContainerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!enableFullscreen) return

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.warn("Fullscreen not supported:", error)
    }
  }

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "16:9":
        return "aspect-video"
      case "4:3":
        return "aspect-[4/3]"
      default:
        return ""
    }
  }

  return (
    <div
      className={cn("relative w-full mx-auto", isFullscreen ? "fixed inset-0 z-50 bg-gray-900" : "", className)}
      style={{
        maxWidth: isFullscreen ? "100%" : maxWidth,
      }}
    >
      {/* Fullscreen toggle button */}
      {enableFullscreen && !isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 z-10 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-white transition-colors"
          aria-label="Enter fullscreen"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>
      )}

      {/* Game container */}
      <div
        className={cn(
          "relative bg-gray-800 rounded-lg overflow-hidden",
          getAspectRatioClass(),
          isFullscreen ? "w-full h-full rounded-none" : "shadow-xl",
          isMobile ? "mx-2" : "",
        )}
      >
        {children}
      </div>

      {/* Mobile optimization indicator */}
      {isMobile && (
        <div className="mt-2 text-center text-xs text-gray-400">Optimized for mobile • Swipe or tap to play</div>
      )}
    </div>
  )
}
