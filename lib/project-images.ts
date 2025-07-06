// Project image configuration
export const projectImages = {
  "blog-app": "/images/projects/blog-app.png",
  "gemini-app": "/images/projects/gemini-app.png",
  "nasa-project": "/images/projects/nasa-project.png",
  "movies": "/images/projects/movies.png",
  "memory-card": "/images/projects/memory-card.png",
  "express-api": "/images/projects/express-api.png",
} as const

export type ProjectId = keyof typeof projectImages

export function getProjectImage(projectId: ProjectId): string {
  return projectImages[projectId] || "/placeholder.svg?height=400&width=600"
}

// Fallback images for development
export const fallbackImages = {
  "blog-app": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
  "gemini-app": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&crop=center",
  "nasa-project": "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop&crop=center",
  "movies": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop&crop=center",
  "memory-card": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop&crop=center",
  "express-api": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=center",
}
