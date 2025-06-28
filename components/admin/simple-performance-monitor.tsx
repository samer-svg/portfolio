"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Clock, Zap } from "lucide-react"
import { useState } from "react"
import { usePerformance } from "../../hooks/use-performance"

export function SimplePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const { loadTime, isLoading } = usePerformance()

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const formatTime = (time: number) => {
    if (time < 1000) return `${Math.round(time)}ms`
    return `${(time / 1000).toFixed(2)}s`
  }

  const getLoadTimeColor = () => {
    if (isLoading) return "border-gray-600 text-gray-400"
    if (loadTime < 1000) return "border-green-600 text-green-400"
    if (loadTime < 2000) return "border-yellow-600 text-yellow-400"
    return "border-red-600 text-red-400"
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800/90 border-gray-700 text-gray-300 hover:bg-gray-700/90 backdrop-blur-sm mb-2"
      >
        <Activity className="w-4 h-4 mr-2" />
        Performance
      </Button>

      {isVisible && (
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm w-64">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-400" />
              Performance Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Load Time
              </span>
              <Badge variant="outline" className={getLoadTimeColor()}>
                {isLoading ? "Loading..." : formatTime(loadTime)}
              </Badge>
            </div>

            <div className="pt-2 border-t border-gray-700">
              <Button size="sm" variant="ghost" className="text-xs h-6 w-full" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
