import { cookies, headers } from 'next/headers'
import { IntlErrorCode } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, isValidLocale, LOCALE_COOKIE } from './config'
import { detectLocaleFromAcceptLanguage } from './detect-locale'
import { loadMessages } from './load-messages'

export default getRequestConfig(async () => {
	const cookieStore = await cookies()
	const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value

	let locale = isValidLocale(cookieLocale) ? cookieLocale : defaultLocale

	if (!isValidLocale(cookieLocale)) {
		const headerStore = await headers()
		locale = detectLocaleFromAcceptLanguage(headerStore.get('accept-language'))
	}

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
			const path = [namespace, key].filter((part) => part != null).join('.')

			if (error.code === IntlErrorCode.MISSING_MESSAGE) return path + ' is not yet translated'

			return 'Dear developer, please fix this message: ' + path
		},
	}
})
