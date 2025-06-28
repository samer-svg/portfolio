"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Github, MapPin, GraduationCap, User, Code, Palette, Database } from "lucide-react"

interface ResumeTemplateProps {
  isPrintMode?: boolean
}

export default function ResumeTemplate({ isPrintMode = false }: ResumeTemplateProps) {
  const containerClass = isPrintMode
    ? "max-w-4xl mx-auto bg-white text-gray-900 p-8 min-h-screen"
    : "max-w-4xl mx-auto bg-gray-900 text-gray-100 p-8"

  const cardClass = isPrintMode ? "bg-gray-50 border-gray-200 mb-6" : "bg-gray-800/50 border-gray-700 mb-6"

  const textClass = isPrintMode ? "text-gray-900" : "text-gray-100"
  const mutedTextClass = isPrintMode ? "text-gray-600" : "text-gray-400"
  const accentClass = isPrintMode ? "text-blue-600" : "text-blue-400"

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${textClass}`}>Samer Alyaghn</h1>
        <div className={`flex flex-wrap justify-center items-center gap-4 text-sm ${mutedTextClass}`}>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            sameralyaghn547@gmail.com
          </div>
          <div className="flex items-center">
            <Github className="w-4 h-4 mr-1" />
            github.com/samer-svg
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Lattakia, Syria
          </div>
        </div>
      </div>

      {/* Summary */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center text-xl ${textClass}`}>
            <User className={`w-5 h-5 mr-2 ${accentClass}`} />
            Professional Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`leading-relaxed ${textClass}`}>
            Self-taught frontend developer who loves crafting smooth, responsive UIs with React and Tailwind. Quick
            learner, team player, and always down to build cool stuff that users actually enjoy. Currently expanding
            skills into full-stack development to become a more well-rounded developer.
          </p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center text-xl ${textClass}`}>
            <Code className={`w-5 h-5 mr-2 ${accentClass}`} />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className={`font-semibold mb-3 ${textClass} flex items-center`}>
                <Code className={`w-4 h-4 mr-1 ${accentClass}`} />
                Frontend
              </h3>
              <div className="flex flex-wrap gap-1">
                {[
                  "JavaScript",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "HTML5 & CSS3",
                  "Responsive Design",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-gray-200 text-gray-800 text-xs" : "border-gray-600 text-gray-300 text-xs"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`font-semibold mb-3 ${textClass} flex items-center`}>
                <Database className={`w-4 h-4 mr-1 ${accentClass}`} />
                Backend & Tools
              </h3>
              <div className="flex flex-wrap gap-1">
                {["Node.js", "Express", "PostgreSQL", "MongoDB", "Git & GitHub", "n8n"].map((skill) => (
                  <Badge
                    key={skill}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-gray-200 text-gray-800 text-xs" : "border-gray-600 text-gray-300 text-xs"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`font-semibold mb-3 ${textClass} flex items-center`}>
                <Palette className={`w-4 h-4 mr-1 ${accentClass}`} />
                Other
              </h3>
              <div className="flex flex-wrap gap-1">
                {["UI/UX Principles", "Redux Toolkit", "Zod Validation", "REST APIs"].map((skill) => (
                  <Badge
                    key={skill}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-gray-200 text-gray-800 text-xs" : "border-gray-600 text-gray-300 text-xs"
                    }
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className={cardClass}>
        <CardHeader>
          <CardTitle className={`flex items-center text-xl ${textClass}`}>
            <Code className={`w-5 h-5 mr-2 ${accentClass}`} />
            Featured Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className={`font-semibold ${textClass}`}>Blog App</h3>
              <p className={`text-sm ${mutedTextClass} mb-2`}>
                A modern React blog app with lazy loading, responsive design, and clean UI. Features blog post cards,
                navigation, and a beautiful dark theme with blue accents.
              </p>
              <div className="flex flex-wrap gap-1">
                {["React", "Tailwind CSS", "React Router", "JavaScript"].map((tech) => (
                  <Badge
                    key={tech}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-blue-100 text-blue-800 text-xs" : "border-blue-600 text-blue-400 text-xs"
                    }
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`font-semibold ${textClass}`}>Cosmic Tasks</h3>
              <p className={`text-sm ${mutedTextClass} mb-2`}>
                A beautiful, responsive todo list application with a cosmic purple theme and priority levels for task
                management.
              </p>
              <div className="flex flex-wrap gap-1">
                {["React", "JavaScript", "CSS3", "Responsive Design"].map((tech) => (
                  <Badge
                    key={tech}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-blue-100 text-blue-800 text-xs" : "border-blue-600 text-blue-400 text-xs"
                    }
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`font-semibold ${textClass}`}>Login Signup Page</h3>
              <p className={`text-sm ${mutedTextClass} mb-2`}>
                Auth UI with React + Redux: Smooth animated login/signup forms with Zod validation and stunning purple
                gradient design.
              </p>
              <div className="flex flex-wrap gap-1">
                {["React", "Redux", "Zod", "JavaScript"].map((tech) => (
                  <Badge
                    key={tech}
                    variant={isPrintMode ? "secondary" : "outline"}
                    className={
                      isPrintMode ? "bg-blue-100 text-blue-800 text-xs" : "border-blue-600 text-blue-400 text-xs"
                    }
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Languages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl ${textClass}`}>
              <GraduationCap className={`w-5 h-5 mr-2 ${accentClass}`} />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className={`font-semibold ${textClass}`}>B.S. in Computer Science</h3>
              <p className={`${mutedTextClass}`}>Lattakia University, Syria</p>
              <Badge
                variant={isPrintMode ? "secondary" : "outline"}
                className={
                  isPrintMode ? "bg-yellow-100 text-yellow-800 mt-2" : "border-yellow-600 text-yellow-400 mt-2"
                }
              >
                In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className={cardClass}>
          <CardHeader>
            <CardTitle className={`flex items-center text-xl ${textClass}`}>
              <MapPin className={`w-5 h-5 mr-2 ${accentClass}`} />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={textClass}>Arabic</span>
                <Badge
                  variant={isPrintMode ? "secondary" : "outline"}
                  className={isPrintMode ? "bg-green-100 text-green-800" : "border-green-600 text-green-400"}
                >
                  Native
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className={textClass}>English</span>
                <Badge
                  variant={isPrintMode ? "secondary" : "outline"}
                  className={isPrintMode ? "bg-blue-100 text-blue-800" : "border-blue-600 text-blue-400"}
                >
                  Advanced
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className={textClass}>Russian</span>
                <Badge
                  variant={isPrintMode ? "secondary" : "outline"}
                  className={isPrintMode ? "bg-yellow-100 text-yellow-800" : "border-yellow-600 text-yellow-400"}
                >
                  Learning
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      {isPrintMode && (
        <div className="text-center mt-8 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600">
            Portfolio: https://your-portfolio-url.vercel.app • Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  )
}
