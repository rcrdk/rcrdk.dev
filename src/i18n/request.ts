import { cookies, headers } from 'next/headers'
import { IntlErrorCode } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { isValidLocale, LOCALE_COOKIE } from './config'
import { detectLocaleFromAcceptLanguage } from './detect-locale'
import { loadMessages } from './load-messages'

const resolveLocale = async (cookieLocale: string | undefined) => {
	if (isValidLocale(cookieLocale)) return cookieLocale

	const headerStore = await headers()
	const detectedLocale = detectLocaleFromAcceptLanguage(headerStore.get('accept-language'))

	return detectedLocale
}

export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
	const locale = await resolveLocale(cookieLocale)

	return {
		locale,
		messages: await loadMessages(locale),
		timeZone: 'America/Sao_Paulo',
		now: new Date(),
		formats: {
			dateTime: {
				short: {
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				},
			},
			number: {
				precise: {
					maximumFractionDigits: 5,
				},
			},
		},
		onError(error) {
			if (error.code === IntlErrorCode.MISSING_MESSAGE) console.error(error)
		},

		getMessageFallback({ namespace, key, error }) {
			const path = [namespace, key].filter(Boolean).join('.')

			if (error.code === IntlErrorCode.MISSING_MESSAGE) return path + ' is not yet translated'

			return 'Dear developer, please fix this message: ' + path
		},
	}
})
