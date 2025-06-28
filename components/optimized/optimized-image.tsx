"use client"

import Image from "next/image"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  sizes?: string
  fill?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width = 600,
  height = 400,
  className = "",
  priority = false,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  // Generate blur placeholder for better UX
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement("canvas")
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#1f2937"
      ctx.fillRect(0, 0, w, h)
    }
    return canvas.toDataURL()
  }

  if (hasError) {
    return (
      <div className={cn("bg-gray-800 flex items-center justify-center", className)}>
        <div className="text-center text-gray-400">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    )
  }

  const imageProps = {
    src: src || "/placeholder.svg",
    alt,
    className: cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className),
    onLoad: handleLoad,
    onError: handleError,
    priority,
    quality,
    sizes,
    placeholder: placeholder as "blur" | "empty",
    ...(blurDataURL && { blurDataURL }),
    ...(fill ? { fill: true } : { width, height }),
  }

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />
        </div>
      )}
      <Image {...imageProps} />
    </div>
  )
}
