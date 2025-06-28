"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle, ExternalLink, Github } from "lucide-react"
import { getDeploymentStatus, projectUrls } from "../../lib/project-urls"

export function DeploymentStatus() {
  const status = getDeploymentStatus()

  const getStatusIcon = (projectStatus: string) => {
    switch (projectStatus) {
      case "deployed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (projectStatus: string) => {
    switch (projectStatus) {
      case "deployed":
        return "bg-green-600/20 text-green-400 border-green-600"
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-600"
      case "failed":
        return "bg-red-600/20 text-red-400 border-red-600"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600"
    }
  }

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 max-w-sm">
      <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Deployment Status</span>
            <Badge variant="outline" className={getStatusColor("deployed")}>
              {status.deployed}/{status.total}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(projectUrls).map(([id, config]) => (
            <div key={id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {getStatusIcon(config.status)}
                <span className="text-gray-300 capitalize">{id.replace("-", " ")}</span>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => window.open(config.github, "_blank")}
                >
                  <Github className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => window.open(config.demo, "_blank")}
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-700">
            <div className="text-xs text-gray-400">Progress: {status.percentage}% complete</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
