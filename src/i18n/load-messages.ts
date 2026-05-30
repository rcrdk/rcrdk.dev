import type { AbstractIntlMessages } from 'next-intl'

import type { LocalesType } from '@/i18n/config'

const messageCache = new Map<LocalesType, AbstractIntlMessages>()
const pendingLoads = new Map<LocalesType, Promise<AbstractIntlMessages>>()

const fetchMessages = async (locale: LocalesType): Promise<AbstractIntlMessages> => {
	const module = await import(`./messages/${locale}`)
	return module.default
}

export const seedMessageCache = (locale: LocalesType, messages: AbstractIntlMessages) =>
	messageCache.set(locale, messages)

export const loadMessages = async (locale: LocalesType): Promise<AbstractIntlMessages> => {
	const cached = messageCache.get(locale)
	if (cached) return cached

	const pending = pendingLoads.get(locale)
	if (pending) return pending

	const load = fetchMessages(locale).then((messages) => {
		messageCache.set(locale, messages)
		pendingLoads.delete(locale)
		return messages
	})

	pendingLoads.set(locale, load)
	return load
}

export const prefetchMessages = (locale: LocalesType) => loadMessages(locale)
