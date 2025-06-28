"use client"

import { lazy, Suspense } from "react"

// Optimized lazy loading with better chunking
const AboutSection = lazy(() => import("./sections/about-section").then((module) => ({ default: module.default })))

const OptimizedProjectsSection = lazy(() =>
  import("./sections/optimized-projects-section").then((module) => ({ default: module.default })),
)

const SkillsSection = lazy(() => import("./sections/skills-section").then((module) => ({ default: module.default })))

const ContactSection = lazy(() => import("./sections/contact-section").then((module) => ({ default: module.default })))

// Optimized skeleton with reduced DOM nodes
const OptimizedSkeleton = ({ type }: { type: "about" | "projects" | "skills" | "contact" }) => (
  <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 sm:mb-16">
        <div className="h-10 bg-gray-700 rounded mx-auto w-64 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-700 rounded mx-auto w-96 animate-pulse" />
      </div>
      <div
        className={`grid gap-6 sm:gap-8 ${
          type === "projects"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : type === "skills"
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {Array.from({ length: type === "projects" ? 6 : 3 }).map((_, index) => (
          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-4" />
            <div className="h-4 bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export function LazyAboutSection() {
  return (
    <Suspense fallback={<OptimizedSkeleton type="about" />}>
      <AboutSection />
    </Suspense>
  )
}

export function LazyProjectsSection() {
  return (
    <Suspense fallback={<OptimizedSkeleton type="projects" />}>
      <OptimizedProjectsSection />
    </Suspense>
  )
}

export function LazySkillsSection() {
  return (
    <Suspense fallback={<OptimizedSkeleton type="skills" />}>
      <SkillsSection />
    </Suspense>
  )
}

export function LazyContactSection() {
  return (
    <Suspense fallback={<OptimizedSkeleton type="contact" />}>
      <ContactSection />
    </Suspense>
  )
}
