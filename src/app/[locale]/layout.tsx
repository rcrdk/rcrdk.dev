import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

import { Tracking } from '@/app/[locale]/tracking'
import { routing } from '@/i18n/routing'
import { env } from '@/lib/env'

type Props = {
	children: React.ReactNode
	params: Promise<{ locale: 'pt-br' | 'en' }>
}

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	applicationName: 'Ricardo Augusto Kowalski',
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
		{ media: '(prefers-color-scheme: light)', color: '#00a5bc' },
	],
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params

	if (!routing.locales.includes(locale)) {
		notFound()
	}

	setRequestLocale(locale)

	const messages = await getMessages()

	return (
		<html
			lang={locale}
			className="text-content-light dark:text-content-dark bg-white font-sans antialiased dark:bg-black"
			suppressHydrationWarning
		>
			<body>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="data-mode">{children}</ThemeProvider>

					<Tracking />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
