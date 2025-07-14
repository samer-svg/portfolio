"use client"

import { Button } from "@/components/ui/button"
import { Github, Mail, Linkedin, ChevronUp } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "./components/page-transition"
import {
  LazyProjectsSection,
  LazySkillsSection,
  LazyContactSection,
  LazyAboutSection,
} from "./components/lazy-sections"
import { useOptimizedIntersectionObserver } from "./hooks/use-optimized-intersection-observer"
import { AnimationProvider } from "./components/animations/animation-provider"
import { AnimatedElement } from "./components/animations/animated-element"
import { SimplePerformanceMonitor } from "./components/admin/simple-performance-monitor"
import { useEffect, useState, memo, useCallback, Suspense } from "react"
import { TypingEffect } from "./components/TypingEffect"
import { AnimatedBackground } from "./components/AnimatedBackground"
import { InteractiveIcons } from "./components/InteractiveIcons"

// Error boundary component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
    <div className="text-center space-y-4 max-w-md">
      <div className="text-red-400 text-6xl">⚠️</div>
      <h1 className="text-2xl font-bold text-red-400">Something went wrong</h1>
      <p className="text-gray-400">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Reload Page
      </button>
    </div>
  </div>
)

// Memoized navigation component
const Navigation = memo(({ isScrolled, activeSection }: { isScrolled: boolean, activeSection: string }) => {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Add smooth scrolling with offset for fixed navbar
      const navbarHeight = 80 // Approximate navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
      
      // Close mobile menu if open
      setIsMobileMenuOpen(false)
    }
  }

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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <AnimatedElement key={item.href} animation="slideInDown" delay={0.2 + index * 0.1}>
                <a
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative hover:text-blue-400 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded px-2 py-1 cursor-pointer ${
                    activeSection === item.href.replace('#', '') ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-[calc(100%-1rem)]" />
                </a>
              </AnimatedElement>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded p-2"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-gray-700">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`block px-4 py-3 text-gray-300 hover:text-blue-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === item.href.replace('#', '') ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {item.label}
              </a>
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

// Scroll to top button component
const ScrollToTop = memo(({ isVisible }: { isVisible: boolean }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-950 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
})

ScrollToTop.displayName = "ScrollToTop"

function PortfolioContent() {
  const { ref: heroRef, hasIntersected: heroVisible } = useOptimizedIntersectionObserver({ threshold: 0.1 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
    setShowScrollToTop(window.scrollY > 500)
    
    // Update active section based on scroll position
    const sections = ['home', 'about', 'projects', 'skills', 'contact']
    const navbarHeight = 80
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i])
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= navbarHeight + 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
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
        {process.env.NODE_ENV === 'development' && <SimplePerformanceMonitor />}

        {/* Navigation */}
        <Navigation isScrolled={isScrolled} activeSection={activeSection} />

        {/* Hero Section */}
        <section
          ref={heroRef}
          id="home"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 relative"
        >
          <AnimatedBackground />
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
                  <TypingEffect />
                </AnimatedElement>
                <AnimatedElement
                  animation="fadeInUp"
                  delay={0.5}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300"
                >
                  Learning Full Stack
                </AnimatedElement>
                <AnimatedElement animation="fadeInUp" delay={0.7} className="text-lg text-gray-400 max-w-md mx-auto">
                  📍 Dubai,UAE
                </AnimatedElement>
              </div>
              <AnimatedElement
                animation="fadeInUp"
                delay={1.1}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/25 active:scale-95 focus:outline-none focus:ring-offset-gray-950"
                  onClick={scrollToProjects}
                >
                  View My Work
                </Button>
              </AnimatedElement>
              <AnimatedElement animation="fadeInUp" delay={1.3}>
                <InteractiveIcons className="pt-8" />
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Lazy Loaded Sections */}
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
          <LazyAboutSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
          <LazyProjectsSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
          <LazySkillsSection />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
          <LazyContactSection />
        </Suspense>

        {/* Scroll to top button */}
        <ScrollToTop isVisible={showScrollToTop} />

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
