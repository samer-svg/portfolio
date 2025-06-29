// Project image configuration
export const projectImages = {
  "blog-app": "/images/projects/blog-app.png",
  "todo-app-react": "/images/projects/todo-app-react.png",
  "movies": "/images/projects/movies.png",
  "hangman-game": "/images/projects/hangman-game.png",
  "memory-card": "/images/projects/memory-card.png",
  "snake-game": "/images/projects/snake-game.png",
} as const

export type ProjectId = keyof typeof projectImages

export function getProjectImage(projectId: ProjectId): string {
  return projectImages[projectId] || "/placeholder.svg?height=400&width=600"
}

// Fallback images for development
export const fallbackImages = {
  "blog-app": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
  "todo-app-react": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
  "movies": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop&crop=center",
  "todo-app": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop&crop=center",
  "hangman-game": "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop&crop=center",
  "developer-portfolio":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
}
