"use client"

import { Github, ExternalLink, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { OptimizedImage } from "../optimized/optimized-image"
import { useOptimizedIntersectionObserver } from "../../hooks/use-optimized-intersection-observer"
import { getProjectUrls, type ProjectId } from "../../lib/project-urls"
import {
  MemoizedCard,
  MemoizedCardContent,
  MemoizedCardHeader,
  MemoizedCardTitle,
  MemoizedTechStack,
} from "../optimized/memoized-components"
import { memo, useMemo } from "react"

const projects = [
  {
    id: "blog-app" as ProjectId,
    title: "Blog App",
    description:
      "A modern React blog app with lazy loading, responsive design, and clean UI. Features blog post cards, navigation, and a beautiful dark theme with blue accents.",
    tech: ["React", "Tailwind CSS", "React Router", "JavaScript"],
    image: "/images/projects/blog-app.png",
  },
  {
    id: "nasa-project" as ProjectId,
    title: "NASA Project",
    description:
      "A visually stunning NASA explorer app built with React and Vite. Browse NASA's Astronomy Picture of the Day, search for space images, and enjoy a responsive, modern UI.",
    tech: ["React", "Vite", "JavaScript", "CSS3", "NASA API"],
    image: "/images/projects/nasa-project.png",
  },
  {
    id: "movies" as ProjectId,
    title: "Movies App",
    description:
      "A modern movie discovery app built with React and Vite. Features movie search, filtering, responsive design, and integration with a movie API. Clean UI with dark theme and smooth animations.",
    tech: ["React", "Vite", "JavaScript", "CSS3", "API Integration"],
    image: "/images/projects/movies.png",
  },
  {
    id: "gemini-app" as ProjectId,
    title: "Gemini App",
    description:
      "A Gemini AI chat clone built with React and Vite. Features conversational UI, prompt history, and a sleek, modern design with smooth animations.",
    tech: ["React", "Vite", "JavaScript", "CSS3", "gemini API"],
    image: "/images/projects/gemini-app.png",
  },
  {
    id: "memory-card" as ProjectId,
    title: "Memory Card Game",
    description:
      "Beautiful memory matching game with a stunning teal-to-blue gradient background and clean card grid layout. Features 16 cards in a 4x4 grid with smooth flip animations, intuitive gameplay, and modern UI design with rounded corners and visual feedback.",
    tech: ["JavaScript", "CSS3", "HTML5", "Grid Layout"],
    image: "/images/projects/memory-card.png",
  },
  {
    id: "express-api" as ProjectId,
    title: "User Management System",
    description:
      "A modern Express.js REST API with comprehensive user CRUD operations. Features a beautiful, responsive frontend interface with glass morphism design, real-time updates, and robust error handling.",
    tech: ["Express.js", "Node.js", "JavaScript", "REST API", "CRUD Operations"],
    image: "/images/projects/express-api.png",
  },
]

const DeploymentStatus = memo(({ status }: { status: string }) => {
  const statusConfig = useMemo(() => {
    switch (status) {
      case "deployed":
        return {
          icon: CheckCircle,
          text: "Live",
          className: "text-green-400",
        }
      case "pending":
        return {
          icon: AlertCircle,
          text: "Deploying",
          className: "text-yellow-400",
        }
      default:
        return null
    }
  }, [status])

  if (!statusConfig) return null

  const { icon: Icon, text, className } = statusConfig

  return (
    <div className={`flex items-center gap-1 ${className} text-xs`}>
      <Icon className="w-3 h-3" />
      <span>{text}</span>
    </div>
  )
})

DeploymentStatus.displayName = "DeploymentStatus"

const ProjectCard = memo(({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const urls = useMemo(() => getProjectUrls(project.id), [project.id])

  return (
    <MemoizedCard
      className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group opacity-0 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
    >
      <MemoizedCardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <OptimizedImage
            src={project.image}
            alt={`${project.title} - Screenshot showing the application interface`}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            priority={index < 3}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2">
              <Link
                href={urls.github}
                className="p-2 bg-gray-900/80 rounded-full text-white hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code`}
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href={urls.demo}
                className="p-2 bg-blue-600/80 rounded-full text-white hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </MemoizedCardHeader>
      <MemoizedCardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <MemoizedCardTitle className="text-xl text-gray-100 group-hover:text-blue-400 transition-colors">
            {project.title}
          </MemoizedCardTitle>
        </div>
        <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed text-sm">{project.description}</p>
        <MemoizedTechStack technologies={project.tech} delay={index * 150} />
        <div className="flex space-x-4 pt-2">
          <Link
            href={urls.github}
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 mr-1" />
            Source Code
          </Link>
          <Link
            href={urls.demo}
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Live Demo
          </Link>
        </div>
      </MemoizedCardContent>
    </MemoizedCard>
  )
})

ProjectCard.displayName = "ProjectCard"

export default function OptimizedProjectsSection() {
  const { ref, hasIntersected } = useOptimizedIntersectionObserver({ threshold: 0.1 })

  const visibleProjects = useMemo(() => {
    return hasIntersected ? projects : projects.slice(0, 3) // Show first 3 initially
  }, [hasIntersected])

  return (
    <section
      ref={ref}
      id="projects"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/50 mt-4 sm:mt-6 lg:mt-8 section-spacing"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects showcasing my journey from frontend to full-stack development
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
