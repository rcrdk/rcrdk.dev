import { IntlErrorCode } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	if (!locale || !routing.locales.includes(locale as 'pt-br' | 'en')) {
		locale = routing.defaultLocale
	}

	return {
		locale,
		messages: (await import(`./content/${locale}.json`)).default,
		timeZone: 'America/Sao_Paulo',
		onError(error) {
			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				console.error(error)
			} else {
				// Other errors indicate a bug in the app and should be reported
				// reportToErrorTracking(error)
			}
		},

		getMessageFallback({ namespace, key, error }) {
			const path = [namespace, key].filter((part) => part != null).join('.')

			if (error.code === IntlErrorCode.MISSING_MESSAGE) {
				return path + ' is not yet translated'
			} else {
				return 'Dear developer, please fix this message: ' + path
			}
		},
	}
})
