const CACHE_NAME = "portfolio-games-v1.2.0"
const STATIC_CACHE_NAME = "portfolio-static-v1.2.0"
const DYNAMIC_CACHE_NAME = "portfolio-dynamic-v1.2.0"

// Assets to cache for offline gameplay
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/_next/static/css/app/layout.css",
  "/_next/static/css/app/globals.css",
  "/images/projects/blog-app.png",
  "/images/projects/todo-app-react.png",
  "/images/projects/login-signup-page.png",
  "/images/projects/hangman-game.png",
  "/images/projects/memory-card.png",
  "/images/projects/snake-game.png",
  // Add more game assets as needed
]

// Game-specific assets that should always be cached
const GAME_ASSETS = [
  "/games/snake/",
  "/games/memory-card/",
  "/games/hangman/",
  // Add actual game URLs when available
]

// Network-first resources (for dynamic content)
const NETWORK_FIRST_PATTERNS = [/\/api\//, /\/auth\//, /\/user\//]

// Cache-first resources (for static assets)
const CACHE_FIRST_PATTERNS = [
  /\/_next\/static\//,
  /\/images\//,
  /\/icons\//,
  /\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/,
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...")

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches
        .open(STATIC_CACHE_NAME)
        .then((cache) => {
          console.log("Service Worker: Caching static assets")
          return cache.addAll(STATIC_ASSETS)
        }),
      // Cache game assets
      caches
        .open(CACHE_NAME)
        .then((cache) => {
          console.log("Service Worker: Caching game assets")
          return cache.addAll(GAME_ASSETS.filter((url) => url !== undefined))
        }),
    ])
      .then(() => {
        console.log("Service Worker: Installation complete")
        // Force activation of new service worker
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("Service Worker: Installation failed", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...")

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("Service Worker: Activation complete")
        // Take control of all pages immediately
        return self.clients.claim()
      }),
  )
})

// Fetch event - handle requests with different strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith("http")) {
    return
  }

  // Handle different types of requests with appropriate strategies
  if (NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    // Network first strategy for dynamic content
    event.respondWith(networkFirst(request))
  } else if (CACHE_FIRST_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    // Cache first strategy for static assets
    event.respondWith(cacheFirst(request))
  } else {
    // Stale while revalidate for everything else
    event.respondWith(staleWhileRevalidate(request))
  }
})

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Network first: Network failed, trying cache", error)
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/offline.html") || new Response("Offline", { status: 503 })
    }

    throw error
  }
}

// Cache first strategy
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Cache first: Network failed", error)
    throw error
  }
}

// Stale while revalidate strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME)
  const cachedResponse = await cache.match(request)

  // Fetch from network in background
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
      }
      return networkResponse
    })
    .catch(() => {
      // Network failed, but we might have cache
      return null
    })

  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse
  }

  // Otherwise wait for network
  return networkResponsePromise || new Response("Offline", { status: 503 })
}

// Background sync for game scores (when online)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-game-scores") {
    event.waitUntil(syncGameScores())
  }
})

async function syncGameScores() {
  try {
    // Get stored game scores from IndexedDB
    const scores = await getStoredGameScores()

    if (scores.length > 0) {
      // Send scores to server when online
      await fetch("/api/sync-scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scores }),
      })

      // Clear stored scores after successful sync
      await clearStoredGameScores()
      console.log("Game scores synced successfully")
    }
  } catch (error) {
    console.error("Failed to sync game scores:", error)
  }
}

// Helper functions for game score storage
async function getStoredGameScores() {
  // This would integrate with IndexedDB in a real implementation
  return []
}

async function clearStoredGameScores() {
  // This would clear IndexedDB in a real implementation
  return Promise.resolve()
}

// Push notifications for game updates
self.addEventListener("push", (event) => {
  if (!event.data) return

  const data = event.data.json()
  const options = {
    body: data.body || "New game update available!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
    tag: "game-update",
    requireInteraction: true,
    actions: [
      {
        action: "play",
        title: "Play Now",
        icon: "/icons/play-icon.png",
      },
      {
        action: "later",
        title: "Later",
        icon: "/icons/later-icon.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification(data.title || "Portfolio Games", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "play") {
    event.waitUntil(clients.openWindow("/games"))
  }
})

// Periodic background sync for cache updates
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-game-cache") {
    event.waitUntil(updateGameCache())
  }
})

async function updateGameCache() {
  try {
    const cache = await caches.open(CACHE_NAME)

    // Update game assets in background
    for (const asset of GAME_ASSETS) {
      try {
        const response = await fetch(asset)
        if (response.ok) {
          await cache.put(asset, response)
        }
      } catch (error) {
        console.log(`Failed to update cache for ${asset}:`, error)
      }
    }

    console.log("Game cache updated successfully")
  } catch (error) {
    console.error("Failed to update game cache:", error)
  }
}
