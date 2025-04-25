const CACHE_NAME_DYNAMIC = 'rcrdk-dynamic-__CACHE_NAME__'
const CACHE_NAME_IMAGES = 'rcrdk-images-__CACHE_NAME__'

const CURRENT_CACHES = [CACHE_NAME_DYNAMIC, CACHE_NAME_IMAGES]

const URLS_TO_CACHE_DYNAMIC = '__CACHE_DYNAMIC_URLS__'

self.addEventListener('install', (event) => {
	self.skipWaiting()

	const initialStaticRequests = [new Request('/pt-br'), new Request('/en')]

	event.waitUntil(
		Promise.all([
			caches.open(CACHE_NAME_DYNAMIC).then(async (cache) => {
				await Promise.all(
					initialStaticRequests.map(async (request) => {
						const response = await fetch(request)
						if (response && response.ok) {
							await cache.put(request, response)
						}
					}),
				)
				await cache.addAll(URLS_TO_CACHE_DYNAMIC)
			}),
		]),
	)
})

self.addEventListener('activate', (event) => {
	async function cleanupOldCacheBuckets() {
		await caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!CURRENT_CACHES.includes(cacheName)) {
						return caches.delete(cacheName)
					}
				}),
			)
		})
	}

	event.waitUntil(Promise.all([cleanupOldCacheBuckets(), self.clients.claim()]))
})

self.addEventListener('fetch', (event) => {
	const { request } = event

	if (request.method === 'GET') {
		event.respondWith(
			caches.match(request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse
				}

				return fetch(request)
					.then((networkResponse) => {
						const isSameOrigin = new URL(request.url).origin === self.location.origin

						if (!isSameOrigin || !networkResponse.ok) {
							return networkResponse
						}

						const cacheName = request.url.includes('/_next/image') ? CACHE_NAME_IMAGES : CACHE_NAME_DYNAMIC

						return caches.open(cacheName).then((cache) => {
							cache.put(request, networkResponse.clone())
							return networkResponse
						})
					})
					.catch((error) => {
						console.error(error)
						return caches.match('/404?status=offline')
					})
			}),
		)
	}
})
