import { env } from '@/lib/env'

const LOCALHOST_APP_URL_PATTERN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/?$/i
const LOCALHOST_HOSTNAME_PATTERN = /^(localhost|127\.0\.0\.1)$/

export function shouldEnableUmami(hostname?: string) {
	if (process.env.NODE_ENV !== 'production') return false
	if (!env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) return false
	if (LOCALHOST_APP_URL_PATTERN.test(env.NEXT_PUBLIC_APP_URL)) return false
	if (hostname && LOCALHOST_HOSTNAME_PATTERN.test(hostname)) return false

	return true
}
