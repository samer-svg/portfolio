"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

interface MobileGameControlsProps {
  onDirectionPress: (direction: "up" | "down" | "left" | "right") => void
  className?: string
  size?: "sm" | "md" | "lg"
  layout?: "cross" | "grid" | "linear"
  hapticFeedback?: boolean
}

export function MobileGameControls({
  onDirectionPress,
  className,
  size = "md",
  layout = "cross",
  hapticFeedback = true,
}: MobileGameControlsProps) {
  const handlePress = (direction: "up" | "down" | "left" | "right") => {
    // Haptic feedback
    if (hapticFeedback && "vibrate" in navigator) {
      navigator.vibrate(15)
    }

    onDirectionPress(direction)
  }

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-10 h-10 text-sm"
      case "lg":
        return "w-16 h-16 text-lg"
      default:
        return "w-12 h-12"
    }
  }

  const buttonClass = cn(
    "touch-manipulation select-none",
    "bg-gray-700/80 hover:bg-gray-600/80 active:bg-gray-500/80",
    "border-2 border-gray-600 hover:border-gray-500",
    "text-white font-semibold rounded-lg",
    "transition-all duration-150 ease-out",
    "active:scale-95 active:shadow-inner",
    getSizeClasses(),
  )

  if (layout === "cross") {
    return (
      <div className={cn("relative w-fit mx-auto", className)}>
        {/* Cross layout */}
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-fit">
          <div></div>
          <Button
            className={buttonClass}
            onTouchStart={() => handlePress("up")}
            onClick={() => handlePress("up")}
            aria-label="Move up"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
          <div></div>

          <Button
            className={buttonClass}
            onTouchStart={() => handlePress("left")}
            onClick={() => handlePress("left")}
            aria-label="Move left"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="w-12 h-12"></div>
          <Button
            className={buttonClass}
            onTouchStart={() => handlePress("right")}
            onClick={() => handlePress("right")}
            aria-label="Move right"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          <div></div>
          <Button
            className={buttonClass}
            onTouchStart={() => handlePress("down")}
            onClick={() => handlePress("down")}
            aria-label="Move down"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
          <div></div>
        </div>
      </div>
    )
  }

  if (layout === "linear") {
    return (
      <div className={cn("flex gap-2 justify-center", className)}>
        <Button
          className={buttonClass}
          onTouchStart={() => handlePress("left")}
          onClick={() => handlePress("left")}
          aria-label="Move left"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          className={buttonClass}
          onTouchStart={() => handlePress("up")}
          onClick={() => handlePress("up")}
          aria-label="Move up"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
        <Button
          className={buttonClass}
          onTouchStart={() => handlePress("down")}
          onClick={() => handlePress("down")}
          aria-label="Move down"
        >
          <ChevronDown className="w-5 h-5" />
        </Button>
        <Button
          className={buttonClass}
          onTouchStart={() => handlePress("right")}
          onClick={() => handlePress("right")}
          aria-label="Move right"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  // Grid layout
  return (
    <div className={cn("grid grid-cols-2 gap-2 max-w-32 mx-auto", className)}>
      <Button
        className={buttonClass}
        onTouchStart={() => handlePress("up")}
        onClick={() => handlePress("up")}
        aria-label="Move up"
      >
        <ChevronUp className="w-5 h-5" />
      </Button>
      <Button
        className={buttonClass}
        onTouchStart={() => handlePress("down")}
        onClick={() => handlePress("down")}
        aria-label="Move down"
      >
        <ChevronDown className="w-5 h-5" />
      </Button>
      <Button
        className={buttonClass}
        onTouchStart={() => handlePress("left")}
        onClick={() => handlePress("left")}
        aria-label="Move left"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        className={buttonClass}
        onTouchStart={() => handlePress("right")}
        onClick={() => handlePress("right")}
        aria-label="Move right"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  )
}
