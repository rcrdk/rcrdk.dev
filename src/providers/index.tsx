'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

import { CartContextProvider } from '@/context/game-context'
import { queryClient } from '@/lib/react-query'

type Props = {
	children: React.ReactNode
	i18n: {
		locale: string
		messages: AbstractIntlMessages
	}
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function Providers({ children, i18n }: Props) {
	return (
		<NextIntlClientProvider messages={i18n.messages} locale={i18n.locale} timeZone={timeZone}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="data-mode">
					<CartContextProvider>{children}</CartContextProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</NextIntlClientProvider>
	)
}
