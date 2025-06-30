// Project URLs configuration
// Update these URLs after deploying to Vercel

export const projectUrls = {
  "blog-app": {
    github: "https://github.com/samer-svg/blog-app",
    demo: "https://blog-app-samer.vercel.app/",
  },
  "gemini-app": {
    github: "https://github.com/samer-svg/gemini-app",
    demo: "https://gemini-app-wheat.vercel.app/",
  },
  "nasa-project": {
    github: "https://github.com/samer-svg/nasa-app",
    demo: "https://nasa-app-samer.vercel.app/",
  },
  "movies": {
    github: "https://github.com/samer-svg/movies",
    demo: "https://movies-samer.vercel.app/",
  },
  "memory-card": {
    github: "https://github.com/samer-svg/Memory-Card-Game",
    demo: "https://memory-cards-samer.vercel.app/",
    currentDemo: "https://samer-svg.github.io/Memory-Card-Game/", 
  },
  "snake-game": {
    github: "https://github.com/samer-svg/Snake-Game",
    demo: "https://snake-game-samer.vercel.app/",
    currentDemo: "https://samer-svg.github.io/Snake-Game/", // Current GitHub Pages
  },
} as const

export type ProjectId = keyof typeof projectUrls

export function getProjectUrls(projectId: ProjectId) {
  return projectUrls[projectId]
}

// Helper function to check if all projects are deployed
export function getDeploymentStatus() {
  const projects = Object.entries(projectUrls)
  const total = projects.length

  return {
    total,
  }
}

// Suggested Vercel project names (URL-friendly)
export const suggestedProjectNames = {
  "blog-app": "blog-app-samer",
  "gemini-app": "gemini-app-wheat",
  "nasa-project": "nasa-app-samer",
  "movies": "movies-samer",
  "memory-card": "memory-card-samer",
  "snake-game": "snake-game-samer",
} as const
