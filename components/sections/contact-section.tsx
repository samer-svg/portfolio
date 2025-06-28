"use client"

import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github } from "lucide-react"
import { useIntersectionObserver } from "../../hooks/use-intersection-observer"

export default function ContactSection() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      id="contact"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50 mt-4 sm:mt-6 lg:mt-8 section-spacing"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Let's Work Together</h2>
          <p className="text-gray-400 text-lg mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Let's connect and build something amazing
            together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-10 lg:mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => window.open("mailto:sameralyaghn547@gmail.com")}
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => window.open("https://www.linkedin.com/in/samer-al-yaghn-2a6b69234", "_blank")}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              Connect on LinkedIn
            </Button>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800/30 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact Information</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <a
                  href="mailto:sameralyaghn547@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  sameralyaghn547@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Github className="w-4 h-4 mr-3 text-blue-400" />
                <a
                  href="https://github.com/samer-svg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  github.com/samer-svg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
