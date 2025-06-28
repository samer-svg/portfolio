"use client"

import { MobileGameDemo } from "../mobile/mobile-game-demo"
import { useIntersectionObserver } from "../../hooks/use-intersection-observer"

export default function MobileDemoSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section ref={ref} id="mobile-demo" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Mobile-First Game Development</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the advanced touch controls and responsive design optimizations I implement in mobile games
          </p>
        </div>

        <div
          className={`transition-all duration-1000 ${
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MobileGameDemo />
        </div>
      </div>
    </section>
  )
}
