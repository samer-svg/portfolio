'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="text-red-400 text-6xl">🚨</div>
            <h1 className="text-2xl font-bold text-red-400">Critical Error</h1>
            <p className="text-gray-400">
              Something went wrong with the application. Please try refreshing the page.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Refresh page
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 