import { IntlErrorCode } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale

	if (!locale || !routing.locales.includes(locale as 'pt-br' | 'en')) locale = routing.defaultLocale

	return {
		locale,
		messages: {
			...(await import(`./${locale}/about.json`)).default,
			...(await import(`./${locale}/contact.json`)).default,
			...(await import(`./${locale}/default.json`)).default,
			...(await import(`./${locale}/game.json`)).default,
			...(await import(`./${locale}/hero.json`)).default,
			...(await import(`./${locale}/journey.json`)).default,
			...(await import(`./${locale}/projects.json`)).default,
			...(await import(`./${locale}/skills.json`)).default,
			...(await import(`./${locale}/seo.json`)).default,
			...(await import(`./${locale}/not-found.json`)).default,
		},
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
