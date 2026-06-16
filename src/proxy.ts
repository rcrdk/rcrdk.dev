import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from '@/i18n/config'
import { detectLocaleFromAcceptLanguage } from '@/i18n/detect-locale'

const NOINDEX_HEADER = 'noindex, nofollow, noarchive'
const STATIC_FILE_EXTENSION = /\.(avif|gif|ico|jpe?g|pdf|png|svg|webp)$/i

const isIgnorePagePath = (pathname: string) => {
	const projectPage = pathname.match(/^\/project\/([^/]+)$/)
	if (projectPage) return !STATIC_FILE_EXTENSION.test(projectPage[1])

	const companyProjectsPage = pathname.match(/^\/projects\/([^/]+)$/)
	if (companyProjectsPage) return !STATIC_FILE_EXTENSION.test(companyProjectsPage[1])

	return false
}

export default async function proxy(request: NextRequest & { ip?: string }) {
	const response = NextResponse.next()

	response.headers.set('x-forwarded-for', request.ip ?? '')

	if (isIgnorePagePath(request.nextUrl.pathname)) response.headers.set('X-Robots-Tag', NOINDEX_HEADER)

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
