import { useLocale } from 'next-intl'

import { defaultLocale, isValidLocale, type LocalesType } from '@/i18n/config'

export function useCurrentLocale(): LocalesType {
	const activeLocale = useLocale()

	return isValidLocale(activeLocale) ? activeLocale : defaultLocale
}
