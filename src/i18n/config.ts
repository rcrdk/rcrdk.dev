export const locales = ['pt-br', 'en'] as const
export const defaultLocale = 'en' as const

export type LocalesType = (typeof locales)[number]

export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const LOCALE_VALUES = new Set<string>(locales)

export const isValidLocale = (value: string | undefined | null): value is LocalesType =>
	Boolean(value) && LOCALE_VALUES.has(String(value))
