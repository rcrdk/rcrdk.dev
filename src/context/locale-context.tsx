'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import type { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl'

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type LocalesType } from '@/i18n/config'
import { loadMessages } from '@/i18n/load-messages'

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
	const [locale, setLocaleState] = useState(initialLocale)
	const [messages, setMessages] = useState(initialMessages)

	const setLocale = useCallback(
		async (nextLocale: LocalesType) => {
			if (nextLocale === locale) return

			const nextMessages = await loadMessages(nextLocale)
			setLocaleState(nextLocale)
			setMessages(nextMessages)
			document.documentElement.lang = nextLocale
			document.cookie = `${LOCALE_COOKIE}=${nextLocale};path=/;max-age=${LOCALE_COOKIE_MAX_AGE};SameSite=Lax`
		},
		[locale],
	)

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
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
