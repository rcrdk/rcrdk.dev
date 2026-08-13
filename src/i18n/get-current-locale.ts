import { getLocale } from 'next-intl/server'

import { defaultLocale, isValidLocale, type LocalesType } from '@/i18n/config'

export const getCurrentLocale = async (): Promise<LocalesType> => {
	const activeLocale = await getLocale()

	return isValidLocale(activeLocale) ? activeLocale : defaultLocale
}
