import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { v4 as uuid } from 'uuid'

import { KEYS } from '@/config/keys'
import { routing } from './i18n/routing'

export default async function middleware(request: NextRequest & { ip?: string }) {
	// i18n
	const handleI18nRouting = createMiddleware(routing)
	const response = handleI18nRouting(request)
	response.headers.set('x-your-custom-locale', routing.defaultLocale)

	// forward ip
	response.headers.set('x-forwarded-for', request.ip ?? '')

	// userId cookie
	const doesCookieExists = request.cookies.has(KEYS.userKey)

	if (!doesCookieExists) {
		response.cookies.set(KEYS.userKey, uuid(), {
			maxAge: 60 * 60 * 24 * 30 * 12, // less than a year
		})
	}

	return response
}

export const config = {
	matcher: ['/', '/(pt-br|en)/:path*'],
}
