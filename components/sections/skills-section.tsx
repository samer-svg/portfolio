"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Palette } from "lucide-react"
import { useIntersectionObserver } from "../../hooks/use-intersection-observer"
import { useStaggeredLoading } from "../../hooks/use-loading"

const skills = [
  {
    name: "Frontend",
    icon: Code,
    items: [
      "JavaScript",
      "React",
      "Tailwind CSS",
      { name: "Next.js", stage: "intermediate" },
      { name: "TypeScript", stage: "beginner" },
      "HTML5 & CSS3",
      "Responsive Design",
    ],
  },
  {
    name: "Backend & Tools",
    icon: Database,
    items: [
      "Node.js",
      "Express",
      { name: "PostgreSQL", stage: "intermediate" },
      { name: "MongoDB", stage: "beginner" },
      "Git & GitHub",
      "n8n",
    ],
  },
  {
    name: "Design & Other",
    icon: Palette,
    items: [
      "UI/UX Principles",
      "Redux Toolkit",
      "Zod Validation",
      "REST APIs",
      "Problem Solving",
      "Team Collaboration",
    ],
  },
]

const renderSkillItem = (item: string | { name: string; stage: string }) => {
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
}

export default function SkillsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })
  const visibleSkills = useStaggeredLoading(skills, hasIntersected ? 200 : 0)

  return (
    <section
      ref={ref}
      id="skills"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 section-spacing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My current tech stack and the technologies I'm learning
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {skills.slice(0, visibleSkills).map((skillCategory, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms`, animationFillMode: "forwards" }}
            >
              <CardHeader className="text-center">
                <div
                  className="mx-auto mb-4 p-3 bg-blue-600/20 rounded-full w-fit opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 200 + 100}ms`, animationFillMode: "forwards" }}
                >
                  <skillCategory.icon className="w-8 h-8 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-gray-100">{skillCategory.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {skillCategory.items.map((item, itemIndex) => (
                    <Badge
                      key={itemIndex}
                      variant="outline"
                      className="border-gray-600 text-gray-300 justify-center py-2 opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${(index * 200) + (itemIndex * 100) + 200}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      {renderSkillItem(item)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
