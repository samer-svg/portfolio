// Project URLs configuration
// Update these URLs after deploying to Vercel

export const projectUrls = {
  "blog-app": {
    github: "https://github.com/samer-svg/blog-app",
    demo: "https://blog-app-samer.vercel.app/",
  },
  "todo-app-react": {
    github: "https://github.com/samer-svg/Todo-app-react-",
    demo: "https://cosmic-tasks-samer.vercel.app/",
  },
  "login-signup-page": {
    github: "https://github.com/samer-svg/login-signup-page",
    demo: "https://auth-ui-samer.vercel.app/", 
  },
  "hangman-game": {
    github: "https://github.com/samer-svg/Hangman-Game",
    demo: "https://hangman-game-samer.vercel.app/",
    currentDemo: "https://samer-svg.github.io/Hangman-Game/", 
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
  "todo-app-react": "cosmic-tasks-samer",
  "login-signup-page": "auth-ui-samer",
  "hangman-game": "hangman-game-samer",
  "memory-card": "memory-card-samer",
  "snake-game": "snake-game-samer",
} as const
