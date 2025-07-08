"use client"

import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiNodedotjs, SiExpress, SiPostgresql, SiGit, SiRedux } from "react-icons/si"
import { useIntersectionObserver } from "../../hooks/use-intersection-observer"
import { useState } from "react"

const skillIcons = [
  { Icon: SiJavascript, color: '#f7df1e' }, // JS yellow
  { Icon: SiTypescript, color: '#3178c6' }, // TS blue
  { Icon: SiReact, color: '#61dafb' }, // React cyan
  { Icon: SiNextdotjs, color: '#ffffff' }, // Next.js white
  { Icon: SiTailwindcss, color: '#38bdf8' }, // Tailwind blue
  { Icon: SiHtml5, color: '#e34f26' }, // HTML orange
  { Icon: SiCss3, color: '#1572b6' }, // CSS blue
  { Icon: SiNodedotjs, color: '#339933' }, // Node green
  { Icon: SiExpress, color: '#ffffff' }, // Express white
  { Icon: SiPostgresql, color: '#336791' }, // PostgreSQL blue
  { Icon: SiGit, color: '#f05032' }, // Git orange
  { Icon: SiRedux, color: '#764abc' }, // Redux purple
]

export default function SkillsSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      id="skills"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 section-spacing"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My current tech stack and the technologies I'm learning
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
          {skillIcons.map(({ Icon, color }, idx) => (
            <div
              key={idx}
              className="bg-gray-800/60 rounded-2xl p-6 flex items-center justify-center shadow-lg transition-all duration-300 group opacity-0 animate-fade-in"
              style={{
                animationDelay: `${idx * 80}ms`,
                animationFillMode: "forwards",
                background: hoveredIdx === idx ? color + '22' : undefined, // light transparent bg
                boxShadow: hoveredIdx === idx ? `0 8px 32px 0 ${color}55` : undefined,
                transform: hoveredIdx === idx ? 'scale(1.12)' : undefined,
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Icon color={color} size={48} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
