const CACHE_NAME = 'rcrdk-dev-__CACHE_NAME__'

const CURRENT_CACHES = [CACHE_NAME]

self.addEventListener('install', (event) => {
	self.skipWaiting()

	// const offlineRequest = new Request('offline.html')

	// event.waitUntil(
	// 	fetch(offlineRequest).then(async (response) => {
	// 		return caches.open(CACHE_NAME).then((cache) => {
	// 			return cache.put(offlineRequest, response)
	// 		})
	// 	}),
	// )
})

self.addEventListener('activate', (event) => {
	event.waitUntil(
		Promise.all([
			caches.keys().then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (!CURRENT_CACHES.includes(cacheName)) {
							return caches.delete(cacheName)
						}
					}),
				)
			}),
			self.clients.claim(),
		]),
	)
})

// self.addEventListener('fetch', (event) => {
// 	const { request } = event

// 	if (request.method === 'GET') {
// 		event.respondWith(
// 			fetch(request).catch(async () => {
// 				return caches.open(CACHE_NAME).then((cache) => {
// 					return cache.match('offline.html')
// 				})
// 			}),
// 		)
// 	}
// })
