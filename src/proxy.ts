import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

import { COOKIE_KEYS } from '@/config/keys'
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from '@/i18n/config'
import { detectLocaleFromAcceptLanguage } from '@/i18n/detect-locale'

const LESS_THAN_A_YEAR = 60 * 60 * 24 * 30 * 12

export default async function proxy(request: NextRequest & { ip?: string }) {
	const response = NextResponse.next()

	response.headers.set('x-forwarded-for', request.ip ?? '')

	const doesCookieExists = request.cookies.has(COOKIE_KEYS.userKey)

	if (!doesCookieExists)
		response.cookies.set(COOKIE_KEYS.userKey, uuid(), {
			maxAge: LESS_THAN_A_YEAR,
		})

	if (!request.cookies.has(LOCALE_COOKIE)) {
		const locale = detectLocaleFromAcceptLanguage(request.headers.get('accept-language'))
		response.cookies.set(LOCALE_COOKIE, locale, {
			path: '/',
			maxAge: LOCALE_COOKIE_MAX_AGE,
			sameSite: 'lax',
		})
	}

	return response
}

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
