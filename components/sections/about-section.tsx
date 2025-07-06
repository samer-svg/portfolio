"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin, Languages, User } from "lucide-react"
import { useIntersectionObserver } from "../../hooks/use-intersection-observer"

export default function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      id="about"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8 section-spacing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about my background, education, and what drives me as a developer
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8 transition-all duration-1000 ${
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Professional Summary Card (spans all columns) */}
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 lg:col-span-3 py-3">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-100">
                <User className="w-5 h-5 mr-2 text-blue-400" />
                Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed text-xl">
                Self-taught frontend developer who loves crafting smooth, responsive UIs with React and Tailwind. Quick
                learner, team player, and always down to build cool stuff that users actually enjoy. Currently expanding
                my skills into full-stack development to become a more well-rounded developer.
              </p>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-gray-100">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg">📍 Lattakia, Syria</p>
              <p className="text-gray-400 text-sm mt-2">Open to remote opportunities worldwide</p>
            </CardContent>
          </Card>

          {/* Languages Card */}
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 lg:col-span-2 ">
            <CardHeader>
              <CardTitle className="flex items-center justify-center text-xl text-gray-100">
                <Languages className="w-5 h-5 mr-2 text-blue-400" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl text-white">🇸🇾</div>
                  <h3 className="font-semibold text-gray-200 mb-2">Arabic</h3>
                  <Badge className="bg-green-600/20 text-green-400 border-green-600">Native</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-white">🇺🇸</div>
                  <h3 className="font-semibold text-gray-200 mb-2">English</h3>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-600">Advanced</Badge>
                </div>
                <div className="text-center">
                  <div className=" text-white text-2xl">🇷🇺</div>
                  <h3 className="font-semibold mb-2 text-gray-200">Russian</h3>
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600">Learning</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
