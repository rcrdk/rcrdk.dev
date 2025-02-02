import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { v4 as uuid } from 'uuid'

import { routing } from './i18n/routing'

export default async function middleware(request: NextRequest) {
	// i18n
	const handleI18nRouting = createMiddleware(routing)
	const response = handleI18nRouting(request)
	response.headers.set('x-your-custom-locale', routing.defaultLocale)

	// caching ip checker
	const cacheKey = '@RCRDK.DEV-ip-cache-id-1.0.0'
	const expirationInSeconds = 60 * 60 * 12 // half-day
	const cacheValue = uuid()
	const cacheExists = request.cookies.get(cacheKey)?.value
	if (!cacheExists)
		response.cookies.set(cacheKey, cacheValue, { maxAge: expirationInSeconds })

	return response
}

export const config = {
	matcher: ['/', '/(pt-br|en)/:path*'],
}
