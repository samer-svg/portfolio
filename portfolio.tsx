"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, Linkedin } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "./components/page-transition"
import {
  LazyProjectsSection,
  LazySkillsSection,
  LazyContactSection,
  LazyAboutSection,
} from "./components/lazy-sections"
import { useOptimizedIntersectionObserver } from "./hooks/use-optimized-intersection-observer"
import { ResumeActions } from "./components/resume/pdf-generator"
import { AnimationProvider } from "./components/animations/animation-provider"
import { AnimatedElement } from "./components/animations/animated-element"
import { SimplePerformanceMonitor } from "./components/admin/simple-performance-monitor"
import { useEffect, useState, memo, useCallback } from "react"

// Memoized navigation component
const Navigation = memo(({ isScrolled }: { isScrolled: boolean }) => {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-500 ease-out ${
        isScrolled ? "bg-gray-950/90 border-gray-700 shadow-lg shadow-gray-900/20" : "bg-gray-950/80 border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
          <AnimatedElement
            animation="slideInLeft"
            delay={0.1}
            className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Samer Alyaghn
          </AnimatedElement>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <AnimatedElement key={item.href} animation="slideInDown" delay={0.2 + index * 0.1}>
                <Link
                  href={item.href}
                  className="relative hover:text-blue-400 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded px-2 py-1"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-[calc(100%-1rem)]" />
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
})

Navigation.displayName = "Navigation"

// Memoized social links
const SocialLinks = memo(({ className = "" }: { className?: string }) => {
  const socialLinks = [
    { href: "https://github.com/samer-svg", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/samer-al-yaghn-2a6b69234", icon: Linkedin, label: "LinkedIn" },
    { href: "mailto:sameralyaghn547@gmail.com", icon: Mail, label: "Email" },
  ]

  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      {socialLinks.map((social, index) => (
        <Link
          key={social.href}
          href={social.href}
          className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-lg p-2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit my ${social.label} profile`}
        >
          <social.icon className="w-6 h-6 animate-float" style={{ animationDelay: `${index * 0.2}s` }} />
        </Link>
      ))}
    </div>
  )
})

SocialLinks.displayName = "SocialLinks"

function PortfolioContent() {
  const { ref: heroRef, hasIntersected: heroVisible } = useOptimizedIntersectionObserver({ threshold: 0.1 })
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <AnimationProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Simple Performance monitoring (dev only) */}
        <SimplePerformanceMonitor />


        {/* Navigation */}
        <Navigation isScrolled={isScrolled} />

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="home"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center space-y-8 transition-all duration-1000 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-4">
                <AnimatedElement
                  animation="fadeInUp"
                  delay={0.3}
                  className="text-4xl sm:text-6xl lg:text-7xl font-bold"
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                    Frontend Developer
                  </span>
                </AnimatedElement>
                <AnimatedElement
                  animation="fadeInUp"
                  delay={0.5}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300"
                >
                  Learning Full Stack
                </AnimatedElement>
                <AnimatedElement animation="fadeInUp" delay={0.7} className="text-lg text-gray-400 max-w-md mx-auto">
                  📍 Lattakia, Syria
                </AnimatedElement>
              </div>
              <AnimatedElement
                animation="fadeInUp"
                delay={0.9}
                className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              >
                Self-taught frontend dev who loves crafting smooth, responsive UIs with React and Tailwind. Quick
                learner, team player, and always down to build cool stuff that users actually enjoy.
              </AnimatedElement>
              <AnimatedElement
                animation="fadeInUp"
                delay={1.1}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950"
                  onClick={scrollToProjects}
                >
                  View My Work
                </Button>
                <ResumeActions />
              </AnimatedElement>
              <AnimatedElement animation="fadeInUp" delay={1.3}>
                <SocialLinks className="pt-8" />
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Lazy Loaded Sections */}
        <LazyAboutSection />
        <LazyProjectsSection />
        <LazySkillsSection />
        <LazyContactSection />

        {/* Footer */}
        <footer className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800 mt-8 sm:mt-12 lg:mt-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <AnimatedElement animation="fadeInLeft" className="text-gray-400 text-center md:text-left">
                © {new Date().getFullYear()} Samer Alyaghn. All rights reserved.
              </AnimatedElement>
              <AnimatedElement animation="fadeInRight">
                <SocialLinks />
              </AnimatedElement>
            </div>
          </div>
        </footer>
      </div>
    </AnimationProvider>
  )
}

export default function Component() {
  return (
    <PageTransition>
      <PortfolioContent />
    </PageTransition>
  )
}
