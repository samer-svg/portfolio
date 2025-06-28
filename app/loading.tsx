export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Loading Portfolio...
        </div>
        <div className="text-sm text-gray-400">
          Please wait while we prepare your experience
        </div>
      </div>
    </div>
  )
} 