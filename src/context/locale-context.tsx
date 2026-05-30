'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, locales, type LocalesType } from '@/i18n/config'
import { loadMessages, prefetchMessages, seedMessageCache } from '@/i18n/load-messages'

interface LocaleContextValue {
	locale: LocalesType
	setLocale: (locale: LocalesType) => Promise<void>
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

interface LocaleProviderProps {
	children: React.ReactNode
	initialLocale: LocalesType
	initialMessages: AbstractIntlMessages
}

export function LocaleProvider({ children, initialLocale, initialMessages }: Readonly<LocaleProviderProps>) {
	const [activeLocale, setActiveLocale] = useState(initialLocale)
	const [messages, setMessages] = useState(initialMessages)
	const [displayLocale, setDisplayLocale] = useState(initialLocale)
	const isSeededRef = useRef(false)

	if (!isSeededRef.current) {
		seedMessageCache(initialLocale, initialMessages)
		isSeededRef.current = true
	}

	useEffect(() => {
		locales.filter((nextLocale) => nextLocale !== initialLocale).forEach(prefetchMessages)
	}, [initialLocale])

	const setLocale = useCallback(
		async (nextLocale: LocalesType) => {
			if (nextLocale === displayLocale) return

			setDisplayLocale(nextLocale)
			document.documentElement.lang = nextLocale
			document.cookie = `${LOCALE_COOKIE}=${nextLocale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`

			const nextMessages = await loadMessages(nextLocale)
			setActiveLocale(nextLocale)
			setMessages(nextMessages)
		},
		[displayLocale],
	)

	return (
		<LocaleContext.Provider value={{ locale: displayLocale, setLocale }}>
			<NextIntlClientProvider locale={activeLocale} messages={messages} timeZone={timeZone}>
				{children}
			</NextIntlClientProvider>
		</LocaleContext.Provider>
	)
}

export function useLocaleSwitcher() {
	const value = useContext(LocaleContext)
	if (value == null) throw new Error('useLocaleSwitcher must be used within LocaleProvider')
	return value
}
