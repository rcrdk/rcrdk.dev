import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { v4 as uuid } from 'uuid'

import { COOKIE_KEYS } from '@/config/keys'
import { routing } from './i18n/routing'

const LESS_THAN_A_YEAR = 60 * 60 * 24 * 30 * 12

export default async function proxy(request: NextRequest & { ip?: string }) {
	const handleI18nRouting = createMiddleware(routing)
	const response = handleI18nRouting(request)
	response.headers.set('x-your-custom-locale', routing.defaultLocale)

	response.headers.set('x-forwarded-for', request.ip ?? '')

	const doesCookieExists = request.cookies.has(COOKIE_KEYS.userKey)

	if (!doesCookieExists)
		response.cookies.set(COOKIE_KEYS.userKey, uuid(), {
			maxAge: LESS_THAN_A_YEAR,
		})

	return response
}

export const config = {
	matcher: ['/', '/(pt-br|en)/:path*'],
}
