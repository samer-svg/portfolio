import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProjectCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700 animate-pulse">
      <CardHeader className="p-0">
        <div className="w-full h-48 bg-gray-700 rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-6 bg-gray-700 rounded mb-2" />
        <div className="h-4 bg-gray-700 rounded mb-4 w-3/4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-700 rounded w-20" />
          <div className="h-6 bg-gray-700 rounded w-14" />
        </div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-700 rounded w-12" />
          <div className="h-4 bg-gray-700 rounded w-12" />
        </div>
      </CardContent>
    </Card>
  )
}

export function SkillCardSkeleton() {
  return (
    <Card className="bg-gray-800/50 border-gray-700 animate-pulse">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-14 h-14 bg-gray-700 rounded-full" />
        <div className="h-6 bg-gray-700 rounded w-24 mx-auto" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-700 rounded" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function HeroSkeleton() {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="h-16 bg-gray-700 rounded mx-auto w-3/4" />
            <div className="h-12 bg-gray-700 rounded mx-auto w-1/2" />
          </div>
          <div className="h-6 bg-gray-700 rounded mx-auto w-2/3" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="h-12 bg-gray-700 rounded-full w-32" />
            <div className="h-12 bg-gray-700 rounded-full w-36" />
          </div>
          <div className="flex justify-center space-x-6 pt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
