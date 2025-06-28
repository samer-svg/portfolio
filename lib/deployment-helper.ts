// Helper functions for deployment process

export const deploymentConfig = {
  projects: [
    {
      id: "blog-app",
      name: "blog-app-samer",
      repo: "https://github.com/samer-svg/blog-app",
      type: "react",
      buildCommand: "npm run build",
      outputDirectory: "build",
    },
    {
      id: "todo-app-react",
      name: "cosmic-tasks-samer",
      repo: "https://github.com/samer-svg/Todo-app-react-",
      type: "react",
      buildCommand: "npm run build",
      outputDirectory: "build",
    },
    {
      id: "login-signup-page",
      name: "auth-ui-samer",
      repo: "https://github.com/samer-svg/login-signup-page",
      type: "react",
      buildCommand: "npm run build",
      outputDirectory: "build",
    },
    {
      id: "hangman-game",
      name: "hangman-game-samer",
      repo: "https://github.com/samer-svg/Hangman-Game",
      type: "static",
      buildCommand: "",
      outputDirectory: "./",
    },
    {
      id: "memory-card",
      name: "memory-card-samer",
      repo: "https://github.com/samer-svg/Memory-Card-Game",
      type: "static",
      buildCommand: "",
      outputDirectory: "./",
    },
    {
      id: "snake-game",
      name: "snake-game-samer",
      repo: "https://github.com/samer-svg/Snake-Game",
      type: "static",
      buildCommand: "",
      outputDirectory: "./",
    },
  ],
}

export function generateVercelConfig(projectType: "react" | "static") {
  if (projectType === "react") {
    return {
      rewrites: [{ source: "/(.*)", destination: "/index.html" }],
      cleanUrls: true,
      trailingSlash: false,
    }
  }

  return {
    cleanUrls: true,
    trailingSlash: false,
  }
}

export function generateDeploymentCommands(projectName: string) {
  return [`git clone https://github.com/samer-svg/${projectName}`, `cd ${projectName}`, `vercel`, `vercel --prod`]
}

export function getExpectedURL(projectName: string) {
  const config = deploymentConfig.projects.find((p) => p.repo.includes(projectName))
  return config ? `https://${config.name}.vercel.app` : null
}
