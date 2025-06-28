"use client"

import { memo, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Memoized Badge component to prevent unnecessary re-renders
export const MemoizedBadge = memo(Badge)

// Memoized Card components
export const MemoizedCard = memo(Card)
export const MemoizedCardContent = memo(CardContent)
export const MemoizedCardHeader = memo(CardHeader)
export const MemoizedCardTitle = memo(CardTitle)

// Memoized skill item renderer
interface SkillItemProps {
  item: string | { name: string; stage: string }
}

export const MemoizedSkillItem = memo(({ item }: SkillItemProps) => {
  const content = useMemo(() => {
    if (typeof item === "object" && item.stage) {
      const stageConfig = {
        beginner: {
          color: "text-red-400",
          emoji: "⏳",
          animation: "animate-hourglass",
        },
        intermediate: {
          color: "text-yellow-400",
          emoji: "⚡",
          animation: "animate-lightning",
        },
        advanced: {
          color: "text-green-400",
          emoji: "🔥",
          animation: "animate-fire",
        },
      }

      const config = stageConfig[item.stage as keyof typeof stageConfig]

      return (
        <span className="flex items-center justify-center gap-1">
          {item.name}
          <span className={`${config.animation} ${config.color}`}>{config.emoji}</span>
        </span>
      )
    }
    return item as string
  }, [item])

  return <>{content}</>
})

MemoizedSkillItem.displayName = "MemoizedSkillItem"

// Memoized project tech stack
interface TechStackProps {
  technologies: string[]
  delay: number
}

export const MemoizedTechStack = memo(({ technologies, delay }: TechStackProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {technologies.map((tech, techIndex) => (
        <MemoizedBadge
          key={tech}
          variant="secondary"
          className="bg-gray-700/50 text-gray-300 hover:bg-blue-600/20 hover:text-blue-300 transition-colors opacity-0 animate-fade-in text-xs"
          style={{
            animationDelay: `${delay + techIndex * 50}ms`,
            animationFillMode: "forwards",
          }}
        >
          {tech}
        </MemoizedBadge>
      ))}
    </div>
  )
})

MemoizedTechStack.displayName = "MemoizedTechStack"
