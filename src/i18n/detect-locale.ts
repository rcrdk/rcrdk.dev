import { defaultLocale, type LocalesType } from './config'

export function detectLocaleFromAcceptLanguage(acceptLanguage: string | null | undefined): LocalesType {
	if (!acceptLanguage) return defaultLocale

	const languages = acceptLanguage
		.split(',')
		.map((part) => part.trim().split(';')[0]?.toLowerCase())
		.filter(Boolean)

	for (const lang of languages) {
		if (lang === 'pt' || lang.startsWith('pt-')) return 'pt-br'
	}

	return defaultLocale
}
