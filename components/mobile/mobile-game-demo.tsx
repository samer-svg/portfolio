"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ResponsiveGameContainer } from "./responsive-game-container"
import { MobileGameControls } from "./mobile-game-controls"
import { MobileViewportOptimizer } from "./mobile-viewport-optimizer"
import { useMobileTouch } from "../../lib/mobile-touch-handler"
import { Smartphone, Gamepad2, Zap, Target } from "lucide-react"

export function MobileGameDemo() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [direction, setDirection] = useState<string>("")
  const gameAreaRef = useRef<HTMLDivElement>(null)

  // Setup mobile touch handling
  useMobileTouch(gameAreaRef, {
    swipeThreshold: 30,
    preventScroll: true,
    enableHapticFeedback: true,
  })

  useEffect(() => {
    const gameArea = gameAreaRef.current
    if (!gameArea) return

    const handleSwipe = (e: CustomEvent) => {
      const { direction } = e.detail
      setDirection(direction)
      setScore((prev) => prev + 1)

      // Reset direction after animation
      setTimeout(() => setDirection(""), 500)
    }

    const handleTap = (e: CustomEvent) => {
      if (!isPlaying) {
        setIsPlaying(true)
        setScore(0)
      }
    }

    gameArea.addEventListener("mobileSwipe", handleSwipe as EventListener)
    gameArea.addEventListener("mobileTap", handleTap as EventListener)

    return () => {
      gameArea.removeEventListener("mobileSwipe", handleSwipe as EventListener)
      gameArea.removeEventListener("mobileTap", handleTap as EventListener)
    }
  }, [isPlaying])

  const handleDirectionPress = (dir: "up" | "down" | "left" | "right") => {
    setDirection(dir)
    setScore((prev) => prev + 1)

    if (!isPlaying) {
      setIsPlaying(true)
    }

    setTimeout(() => setDirection(""), 500)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setDirection("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <MobileViewportOptimizer optimizeForGames={true} />

      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-xl text-gray-100">
            <Smartphone className="w-5 h-5 text-blue-400" />
            Mobile Game Controls Demo
          </CardTitle>
          <p className="text-gray-400 text-sm">Experience optimized touch controls and responsive design</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Game Stats */}
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{score}</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-green-600 text-green-400">
                <Zap className="w-3 h-3 mr-1" />
                Touch Optimized
              </Badge>
              <Badge variant="outline" className="border-purple-600 text-purple-400">
                <Target className="w-3 h-3 mr-1" />
                Responsive
              </Badge>
            </div>
          </div>

          {/* Game Area */}
          <ResponsiveGameContainer aspectRatio="16:9" enableFullscreen={true}>
            <div
              ref={gameAreaRef}
              className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center relative overflow-hidden cursor-pointer"
            >
              {!isPlaying ? (
                <div className="text-center text-white">
                  <Gamepad2 className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-lg font-semibold mb-2">Tap or Swipe to Start</h3>
                  <p className="text-sm text-gray-300">Use touch controls or swipe gestures</p>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div
                    className={`text-6xl mb-4 transition-transform duration-300 ${
                      direction ? "scale-125" : "scale-100"
                    }`}
                  >
                    {direction === "up" && "⬆️"}
                    {direction === "down" && "⬇️"}
                    {direction === "left" && "⬅️"}
                    {direction === "right" && "➡️"}
                    {!direction && "🎮"}
                  </div>
                  <p className="text-lg font-semibold">
                    {direction ? `Moving ${direction.toUpperCase()}!` : "Swipe or use controls"}
                  </p>
                </div>
              )}

              {/* Touch indicator */}
              <div className="absolute bottom-4 left-4 text-xs text-gray-400">Touch Area</div>
            </div>
          </ResponsiveGameContainer>

          {/* Mobile Controls */}
          <div className="space-y-4">
            <h4 className="text-center text-gray-300 font-medium">Touch Controls</h4>
            <MobileGameControls
              onDirectionPress={handleDirectionPress}
              size="md"
              layout="cross"
              hapticFeedback={true}
            />
          </div>

          {/* Control Options */}
          <div className="flex gap-2 justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Reset Game
            </Button>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-200">Touch Features:</h5>
              <ul className="space-y-1 text-gray-400">
                <li>• Swipe gestures</li>
                <li>• Haptic feedback</li>
                <li>• Touch buttons</li>
                <li>• Tap to start</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-gray-200">Mobile Optimized:</h5>
              <ul className="space-y-1 text-gray-400">
                <li>• Responsive design</li>
                <li>• Fullscreen mode</li>
                <li>• Prevent zoom</li>
                <li>• Smooth animations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
